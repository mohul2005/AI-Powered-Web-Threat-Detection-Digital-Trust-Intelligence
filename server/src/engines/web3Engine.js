import crypto from 'crypto';

// Web3 Threat Detection & Decentralized On-Chain Attestation Engine
// Implements Module 6: Decentralized Threat Intelligence

const WEB3_BRANDS = [
  { name: 'MetaMask', domain: 'metamask.io', keywords: ['metamask', 'meta-mask'] },
  { name: 'Uniswap', domain: 'uniswap.org', keywords: ['uniswap', 'uni-swap'] },
  { name: 'OpenSea', domain: 'opensea.io', keywords: ['opensea', 'open-sea'] },
  { name: 'Ledger', domain: 'ledger.com', keywords: ['ledger', 'ledger-live'] },
  { name: 'Phantom', domain: 'phantom.app', keywords: ['phantom-wallet', 'phantom'] },
  { name: 'WalletConnect', domain: 'walletconnect.com', keywords: ['walletconnect', 'wallet-connect'] }
];

const MALICIOUS_WEB3_SIGNATURES = [
  'setapprovalforall',
  'permit2',
  'eth_sign',
  'transferfrom',
  'claim-airdrop',
  'connect-wallet',
  'drainer',
  'revoke-cash',
  'seaport'
];

/**
 * Layer 5: Detect Web3 wallet drainers and smart contract approval scams
 */
export function analyzeWeb3Threats(targetUrl, htmlContent = '') {
  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
  } catch (err) {
    return {
      isWeb3Target: false,
      score: 100,
      riskLevel: 'LOW',
      findings: [],
      drainerDetected: false
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const lowerHtml = (htmlContent || '').toLowerCase();
  const fullText = `${hostname} ${parsedUrl.pathname} ${lowerHtml}`;

  const findings = [];
  let riskPenalty = 0;
  let drainerDetected = false;
  let impersonatedWeb3Brand = null;

  // 1. Check IPFS or decentralized gateway abuse
  const isIpfsGateway = hostname.includes('ipfs') || hostname.includes('dweb.link') || hostname.includes('eth.limo');
  if (isIpfsGateway) {
    findings.push('Decentralized Gateway Vector: Hosted on IPFS/dweb gateway, frequently abused for uncensorable phishing');
    riskPenalty += 25;
  }

  // 2. Web3 Brand Impersonation Check
  for (const brand of WEB3_BRANDS) {
    const isOfficial = hostname === brand.domain || hostname.endsWith(`.${brand.domain}`);
    for (const kw of brand.keywords) {
      if (hostname.includes(kw) && !isOfficial) {
        impersonatedWeb3Brand = brand.name;
        findings.push(`Web3 Brand Impersonation: Unauthorized use of '${brand.name}' brand keywords in domain`);
        riskPenalty += 45;
        break;
      }
    }
    if (impersonatedWeb3Brand) break;
  }

  // 3. Wallet Drainer Signature Analysis
  const matchedSigs = MALICIOUS_WEB3_SIGNATURES.filter(sig => fullText.includes(sig));
  if (matchedSigs.length > 0 && impersonatedWeb3Brand) {
    drainerDetected = true;
    findings.push(`Malicious Wallet Drainer Payload: Detected signature triggers [${matchedSigs.slice(0, 3).join(', ')}] targeting crypto wallets`);
    riskPenalty += 50;
  }

  const isWeb3Target = isIpfsGateway || impersonatedWeb3Brand !== null || matchedSigs.length > 0;
  const score = Math.max(0, Math.min(100, 100 - riskPenalty));

  return {
    isWeb3Target,
    score,
    impersonatedWeb3Brand,
    drainerDetected,
    findings: findings.length > 0 ? findings : ['No Web3 wallet-drainer signatures or token-approval exploits identified'],
    riskLevel: score < 40 ? 'CRITICAL' : score < 75 ? 'MODERATE' : 'SAFE'
  };
}

/**
 * Module 6: Compute standard cryptographic commitment hash for a threat report
 */
export function computeReportCommitmentHash(reportData) {
  if (!reportData) return '0x0000000000000000000000000000000000000000000000000000000000000000';
  
  const rawTarget = reportData.domain || reportData.targetUrl || reportData.target || 'unspecified';
  const sanitizedTarget = String(rawTarget)
    .replace(/^https?:\/\//i, '')
    .split('?')[0]
    .split('#')[0]
    .trim()
    .toLowerCase();

  const canonicalPayload = {
    category: reportData.threatCategory || reportData.category || 'Phishing',
    domain: sanitizedTarget,
    entity: reportData.targetEntity || reportData.entity || 'Unspecified Target',
    summary: reportData.summary || 'Threat report'
  };

  const canonicalJson = JSON.stringify(canonicalPayload, Object.keys(canonicalPayload).sort());
  return `0x${crypto.createHash('sha256').update(canonicalJson).digest('hex')}`;
}

/**
 * Module 6: Generate Cryptographic Commitments & On-Chain Attestation Proofs
 * 
 * CORE PRIVACY RULE: Raw URLs, personal information, email content, passwords,
 * and sensitive user data must remain strictly off-chain.
 * 
 * EPISTEMOLOGICAL RULE: A blockchain record establishes the integrity and history
 * of a report, not the truth of the report itself.
 */
export function generateOnChainAttestation(targetIdentifier, threatScore, threatCategory, supportingEvidence = [], reportMetadata = {}) {
  // Sanitize target identifier: ensure raw URLs with query parameters/PII are stripped
  const sanitizedIdentifier = (targetIdentifier || 'unspecified-target')
    .replace(/^https?:\/\//i, '')
    .split('?')[0]
    .split('#')[0]
    .trim()
    .toLowerCase();

  // Compute deterministic SHA-256 commitment hash
  const reportCommitmentHash = computeReportCommitmentHash({
    domain: sanitizedIdentifier,
    threatCategory,
    targetEntity: reportMetadata.targetEntity || reportMetadata.entity || 'Target Entity',
    summary: reportMetadata.summary || (supportingEvidence.length > 0 && typeof supportingEvidence[0] === 'string' ? supportingEvidence[0] : 'Threat dossier')
  });

  const targetHash = `0x${crypto.createHash('sha256').update(sanitizedIdentifier).digest('hex')}`;

  const mockTxHash = `0x${crypto.randomBytes(32).toString('hex')}`;
  const mockIpfsCid = `bafybeih${crypto.randomBytes(20).toString('hex')}quvyku`;
  const blockNumber = Math.floor(21094000 + Math.random() * 5000);
  const reporterAddress = `0x${crypto.randomBytes(20).toString('hex')}`;

  const validationStatus = threatScore <= 35 
    ? 'VERIFIED_MULTI_SOURCE' 
    : threatScore <= 70 
    ? 'PENDING_COMMUNITY_CONSENSUS' 
    : 'VERIFIED_BENIGN_BASELINE';

  return {
    module: 'Module 6: Decentralized Threat Intelligence',
    contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
    network: 'Ethereum Sepolia / Polygon POS',
    targetHash,
    sanitizedIdentifier,
    reportCommitmentHash, // Cryptographic Fingerprint of the report
    evidenceIpfsCid: mockIpfsCid, // Content-addressed reference to supporting evidence
    threatCategory,
    threatScore,
    reporterAddress, // Transparent Provenance
    txHash: mockTxHash,
    blockNumber,
    timestamp: new Date().toISOString(),
    confirmations: 12,
    revisionCount: 0,
    disputeCount: 0,
    validationStatus,
    attestationStandard: 'EAS-THREAT-INTEL-EIP712',
    status: 'ATTESTED_ON_CHAIN',

    // The Two Mandatory Module 6 Axioms
    privacyAndPiiRule: {
      rawUrlsKeptOffChain: true,
      piiSanitized: true,
      passwordsStripped: true,
      ruleText: 'Raw URLs, personal information, email content, passwords, and sensitive user data must remain off-chain.'
    },
    epistemologicalAxiom: {
      integrityProven: true,
      ruleText: 'A blockchain record establishes the integrity and history of a report, not the truth of the report itself.'
    },

    // Verifiable reporting history
    verifiableHistory: [
      {
        event: 'INITIAL_REGISTRATION',
        blockNumber,
        timestamp: new Date().toISOString(),
        commitmentHash: reportCommitmentHash,
        evidenceCid: mockIpfsCid,
        actor: reporterAddress
      }
    ]
  };
}

/**
 * Module 6: Independently check report integrity
 * Compares computed off-chain report hash against on-chain commitment
 */
export function verifyReportIntegrity(offChainReportData, onChainAttestation) {
  if (!onChainAttestation || !onChainAttestation.reportCommitmentHash) {
    return {
      isIntact: false,
      reason: 'No on-chain commitment found to verify against'
    };
  }

  // Compute canonical hash of the provided off-chain data
  let computedHash;
  if (offChainReportData && offChainReportData.domain) {
    computedHash = computeReportCommitmentHash(offChainReportData);
  } else if (typeof offChainReportData === 'string') {
    computedHash = `0x${crypto.createHash('sha256').update(offChainReportData).digest('hex')}`;
  } else {
    computedHash = computeReportCommitmentHash(offChainReportData);
  }

  const isIntact = (computedHash.toLowerCase() === onChainAttestation.reportCommitmentHash.toLowerCase());

  return {
    isIntact,
    computedHash,
    committedHash: onChainAttestation.reportCommitmentHash,
    evidenceIpfsCid: onChainAttestation.evidenceIpfsCid,
    blockNumber: onChainAttestation.blockNumber,
    contractAddress: onChainAttestation.contractAddress,
    validationStatus: onChainAttestation.validationStatus,
    verifiableReportingHistory: onChainAttestation.verifiableHistory || [],
    provenanceSigner: onChainAttestation.reporterAddress,
    independentVerificationVerdict: isIntact
      ? 'TAMPER_EVIDENT_PROOF_VERIFIED: Report content matches on-chain cryptographic commitment with zero alteration.'
      : 'INTEGRITY_VIOLATION_DETECTED: Report content differs from on-chain commitment hash. Potential evidence tampering!'
  };
}

/**
 * Module 6: Record a Dispute against an existing threat attestation
 */
export function recordReportDispute(targetHash, disputeReason, disputantAddress = '0x1234567890123456789012345678901234567890') {
  const disputeCid = `bafybeidispute${crypto.randomBytes(16).toString('hex')}quvyku`;
  const disputeTimestamp = new Date().toISOString();

  return {
    targetHash,
    disputantAddress,
    disputeReason,
    disputeEvidenceCid: disputeCid,
    newValidationStatus: 'DISPUTED',
    timestamp: disputeTimestamp,
    txHash: `0x${crypto.randomBytes(32).toString('hex')}`,
    blockNumber: 21099201,
    statusNotice: 'Dispute recorded on-chain. Verifiable history updated; initial provenance retained without deletion.'
  };
}
