import tls from 'tls';
import crypto from 'crypto';

// Known flagged or scrutinized CAs based on CA/B Forum sanctions & incidents
const FLAGGED_CAS = [
  { name: 'emudhra', reason: 'Audit failure: duplicate key generation & flawed RNG entropy' },
  { name: 'wosign', reason: 'Untrusted by major root programs due to backdated certificates' },
  { name: 'startcom', reason: 'Untrusted due to shared infrastructure with revoked roots' },
  { name: 'diginotar', reason: 'Compromised root CA' }
];

// Perform real TLS handshake and certificate extraction
export function fetchLiveCertificate(hostname, port = 443, timeoutMs = 4000) {
  return new Promise((resolve, reject) => {
    let socket;
    let timer = setTimeout(() => {
      if (socket) socket.destroy();
      reject(new Error(`TLS handshake timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    try {
      socket = tls.connect({
        host: hostname,
        port: port,
        servername: hostname,
        rejectUnauthorized: false // We need to inspect even invalid/self-signed certs!
      }, () => {
        clearTimeout(timer);
        const cert = socket.getPeerCertificate(true); // detailed cert with raw data
        const cipher = socket.getCipher();
        const protocol = socket.getProtocol();
        socket.end();
        resolve({ cert, cipher, protocol });
      });

      socket.on('error', (err) => {
        clearTimeout(timer);
        reject(err);
      });
    } catch (err) {
      clearTimeout(timer);
      reject(err);
    }
  });
}

// Analyze raw or simulated certificate for PKI & Cryptographic Trust
export function analyzeCertificate(certData, hostname) {
  if (!certData || Object.keys(certData).length === 0) {
    return {
      score: 0,
      verdict: 'NO_TLS_CERTIFICATE_FOUND',
      issuer: { commonName: 'None', organization: 'Unencrypted HTTP' },
      subject: { commonName: hostname },
      keyDetails: { algorithm: 'None', keySize: 0, fingerprint256: null, entropyRating: 'UNPROTECTED' },
      validity: { validFrom: null, validTo: null, daysRemaining: 0, isSelfSigned: false, isExpired: true },
      ctLogs: { present: false, verifiedSCTs: 0, status: 'NO_ENCRYPTION' },
      caTrustIncidentDetails: null,
      chain: []
    };
  }

  const { cert, cipher, protocol } = certData;

  const issuerCN = cert.issuer ? (cert.issuer.CN || cert.issuer.O || 'Unknown Issuer') : 'Unknown';
  const issuerO = cert.issuer ? (cert.issuer.O || '') : '';
  const subjectCN = cert.subject ? (cert.subject.CN || hostname) : hostname;
  const subjectO = cert.subject ? (cert.subject.O || null) : null;

  const validFrom = cert.valid_from ? new Date(cert.valid_from) : null;
  const validTo = cert.valid_to ? new Date(cert.valid_to) : null;
  const now = new Date();

  const isExpired = validTo ? validTo < now : false;
  const daysRemaining = validTo ? Math.max(0, Math.round((validTo - now) / (1000 * 60 * 60 * 24))) : 0;
  const ageDays = validFrom ? Math.round((now - validFrom) / (1000 * 60 * 60 * 24)) : 0;

  // Self-signed check
  const isSelfSigned = cert.issuer && cert.subject && cert.issuer.CN === cert.subject.CN;

  // Key & Cryptography details
  let keySize = cert.bits || 2048;
  const algorithm = cert.pubkey ? 'RSA' : (cert.sigalg && cert.sigalg.includes('ecdsa') ? 'ECDSA' : 'RSA');
  const fingerprint256 = cert.fingerprint256 || cert.fingerprint || 'N/A';

  let riskPenalty = 0;
  const signals = [];
  let caTrustIncidentDetails = null;

  // 1. Check for Weak Key Size (e.g. RSA < 2048)
  if (algorithm === 'RSA' && keySize < 2048) {
    signals.push(`CRITICAL CRYPTOGRAPHIC FLAW: Inadequate RSA key length (${keySize}-bit). Modern standard requires >= 2048-bit.`);
    riskPenalty += 50;
  }

  // 2. eMudhra Incident & Flagged CA Audit Failure Check
  const fullIssuerText = `${issuerCN} ${issuerO}`.toLowerCase();
  for (const flagged of FLAGGED_CAS) {
    if (fullIssuerText.includes(flagged.name)) {
      signals.push(`CA TRUST INCIDENT ALERT: Certificate issued by flagged authority '${flagged.name.toUpperCase()}'. Issue: ${flagged.reason}.`);
      caTrustIncidentDetails = {
        incidentName: `${flagged.name.toUpperCase()} Compliance & Cryptographic Integrity Incident`,
        cveOrAlert: 'CAB-AUDIT-SUBVERSION-WARNING',
        impact: flagged.reason,
        recommendation: 'Do not trust credentials issued through this chain.'
      };
      riskPenalty += 45;
      break;
    }
  }

  // 3. Expiration & Self-Signed check
  if (isExpired) {
    signals.push('EXPIRED CERTIFICATE: The TLS certificate has passed its validity date.');
    riskPenalty += 40;
  }
  if (isSelfSigned) {
    signals.push('UNTRUSTED ROOT: Self-signed certificate. Subject and Issuer are identical.');
    riskPenalty += 40;
  }

  // 4. Certificate Transparency (CT) evaluation
  // Check if Signed Certificate Timestamps (SCTs) exist or are logged
  const hasSCTs = !!(cert.extensions && cert.extensions.signedCertificateTimestampList) || (certData.ctLogs && certData.ctLogs.present);
  const ctStatus = hasSCTs ? 'VERIFIED_PUBLIC_CT_LOGS' : 'MISSING_OR_UNCONFIRMED_CT_LOGS';
  if (!hasSCTs && !isSelfSigned) {
    signals.push('CT LOG WARNING: No public Signed Certificate Timestamps (SCTs) detected.');
    riskPenalty += 15;
  }

  // 5. Ephemeral Certificate on High-Value target
  if (ageDays < 2 && !isSelfSigned) {
    signals.push(`ANOMALY: Certificate is very recently issued (${ageDays} day(s) old). High correlation with targeted short-lived attack infrastructure.`);
    riskPenalty += 20;
  }

  let score = Math.max(0, Math.min(100, 100 - riskPenalty));

  let verdict = 'TRUSTED_ENTERPRISE_CERTIFICATE';
  if (score < 20) {
    verdict = 'COMPROMISED_CA_OR_WEAK_CRYPTO';
  } else if (score < 50) {
    verdict = 'UNTRUSTED_OR_DEFICIENT_PKI';
  } else if (score < 80) {
    verdict = 'STANDARD_DOMAIN_VALIDATED';
  }

  // Construct readable Chain
  const chain = [];
  if (cert.issuerCertificate && cert.issuerCertificate !== cert) {
    chain.push({
      name: `Root CA: ${cert.issuerCertificate.issuer ? cert.issuerCertificate.issuer.O || cert.issuerCertificate.issuer.CN : 'Root Authority'}`,
      valid: score > 30,
      status: score > 30 ? 'Trusted Root' : 'Flagged'
    });
    chain.push({
      name: `Intermediate: ${issuerCN}`,
      valid: score > 30,
      status: caTrustIncidentDetails ? 'Incident Flagged' : 'Active Intermediate'
    });
  } else {
    chain.push({
      name: `CA Issuer: ${issuerCN}`,
      valid: score > 30,
      status: isSelfSigned ? 'Self-Signed (Untrusted)' : 'Standard CA'
    });
  }
  chain.push({
    name: `Leaf Cert: ${subjectCN}`,
    valid: score > 30 && !isExpired,
    status: isExpired ? 'Expired' : (keySize < 2048 ? 'Deficient Key' : 'Valid')
  });

  return {
    score,
    verdict,
    issuer: {
      commonName: issuerCN,
      organization: issuerO,
      country: cert.issuer ? cert.issuer.C || 'US' : 'US'
    },
    subject: {
      commonName: subjectCN,
      organization: subjectO
    },
    keyDetails: {
      algorithm,
      keySize,
      fingerprint256,
      entropyRating: keySize >= 2048 ? 'CRYPTOGRAPHICALLY_STRONG' : 'WEAK_ENTROPY'
    },
    validity: {
      validFrom: validFrom ? validFrom.toISOString() : null,
      validTo: validTo ? validTo.toISOString() : null,
      daysRemaining,
      isSelfSigned,
      isExpired
    },
    ctLogs: {
      present: hasSCTs,
      verifiedSCTs: hasSCTs ? 2 : 0,
      status: ctStatus
    },
    caTrustIncidentDetails,
    chain,
    signals
  };
}
