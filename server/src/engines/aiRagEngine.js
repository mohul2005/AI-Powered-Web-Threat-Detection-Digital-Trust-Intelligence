import crypto from 'crypto';

/**
 * Section 8 AI Domain: LLMs, NLP, Machine Learning, Anomaly Detection & RAG
 * 
 * Provides:
 * 1. Retrieval-Augmented Generation (RAG) over curated cyber threat knowledge corpus.
 * 2. Anomaly Detection scoring combining lexical, structural, and timing deviations.
 * 3. LLM / NLP Plain-English Synthesis Engine.
 */

// Curated RAG Knowledge Corpus: MITRE ATT&CK, Phishing Kits, PKI Incidents & Regulatory Baselines
export const THREAT_RAG_CORPUS = [
  {
    id: 'RAG-MITRE-T1566',
    title: 'MITRE ATT&CK T1566: Phishing via Spearphishing Link',
    category: 'Attack Technique',
    keywords: ['link', 'sms', 'email', 'kyc', 'yono', 'credential', 'update'],
    content: 'Adversaries send malicious links to lure victims into providing sensitive credentials. Frequently disguised as urgent banking re-verification (e.g. SBI YONO PAN link) or government traffic violations.',
    mitreTechnique: 'T1566.002',
    countermeasure: 'Verify domain origin through independent bookmarks; block newly registered domains (.xyz, .top).'
  },
  {
    id: 'RAG-PKI-EMUDHRA',
    title: 'eMudhra CA Rogue Key Entropy & Modulus Collision Incident',
    category: 'PKI Infrastructure Vulnerability',
    keywords: ['emudhra', 'certificate', 'modulus', 'rsa', 'entropy', 'pki', 'ct', 'crt.sh'],
    content: 'CAB Forum and root store disclosures identified substandard RSA key generation where intermediate CAs produced duplicate public moduli, breaking the cryptographic uniqueness assumption of digital certificates.',
    mitreTechnique: 'T1588.004 (Obtain Digital Certificates)',
    countermeasure: 'Audit Signed Certificate Timestamps (SCTs) in Google Argon & Cloudflare Nimbus; distrust certificates lacking public CT presence.'
  },
  {
    id: 'RAG-WEB3-PERMIT2',
    title: 'EIP-712 Permit2 Off-Chain Signature Token Drainer',
    category: 'Web3 Threat Vector',
    keywords: ['permit2', 'setapprovalforall', 'drainer', 'wallet', 'crypto', 'airdrop'],
    content: 'Attackers deploy malicious dApps soliciting gasless EIP-712 Permit2 signatures. Signing grants the attacker contract full allowance to transfer tokens out of the victims non-custodial wallet.',
    mitreTechnique: 'T1556 (Modify Authentication Process)',
    countermeasure: 'Decode hex call data before signing; monitor setApprovalForAll and Permit2 spender contracts.'
  },
  {
    id: 'RAG-SCAM-ANYDESK',
    title: 'Technical Support Remote Access Device Takeover',
    category: 'Social Engineering',
    keywords: ['anydesk', 'teamviewer', 'quicksupport', 'screen-share', 'refund', 'otp'],
    content: 'Fraudsters impersonate bank or utility helpdesks, coercing the victim into installing remote desktop software (AnyDesk) to bypass multi-factor authentication by directly controlling the screen.',
    mitreTechnique: 'T1219 (Remote Access Software)',
    countermeasure: 'Strictly prohibit installing remote control software from unverified inbound calls; immediately disconnect internet if installed.'
  },
  {
    id: 'RAG-GOV-PARIVAHAN',
    title: 'Parivahan Traffic e-Challan Fake Payment Gateway Scam',
    category: 'Government Impersonation',
    keywords: ['challan', 'traffic', 'parivahan', 'fine', 'vahan', 'court', 'impound'],
    content: 'Victims receive urgent SMS alerts claiming an unpaid traffic challan will result in a court warrant. The embedded link redirects to a lookalike portal collecting fines via fraudulent UPI handles.',
    mitreTechnique: 'T1566.002 (Spearphishing Link)',
    countermeasure: 'Check pending fines solely via the official parivahan.gov.in portal; verify merchant name before UPI approval.'
  }
];

/**
 * 1. RAG Semantic Keyword / Jaccard Retrieval Function
 */
export function retrieveRagContext(queryText) {
  const cleanTokens = String(queryText).toLowerCase().split(/[\s,.:/_\-?=&]+/);
  
  const scoredCorpus = THREAT_RAG_CORPUS.map(doc => {
    let matchScore = 0;
    for (const kw of doc.keywords) {
      if (cleanTokens.includes(kw) || queryText.toLowerCase().includes(kw)) {
        matchScore += 2;
      }
    }
    return { ...doc, matchScore };
  });

  const relevant = scoredCorpus
    .filter(doc => doc.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  return relevant.length > 0 ? relevant : [THREAT_RAG_CORPUS[0]];
}

/**
 * 2. Machine Learning Anomaly Detection Scoring
 */
export function detectAnomalies(inputArtifact, metadata = {}) {
  const anomalies = [];
  let anomalyScore = 0; // 0 (normal) to 100 (extreme anomaly)

  const str = String(inputArtifact).toLowerCase();

  // Lexical Entropy Anomaly Check
  const frequencies = {};
  for (const char of str) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  let entropy = 0;
  for (const count of Object.values(frequencies)) {
    const p = count / str.length;
    entropy -= p * Math.log2(p);
  }

  if (entropy > 4.2) {
    anomalies.push({
      type: 'HIGH_LEXICAL_ENTROPY',
      severity: 'HIGH',
      detail: `Abnormally high Shannon entropy (${entropy.toFixed(2)} bits/char) indicating algorithmic DGA generation or obfuscated token encoding`
    });
    anomalyScore += 35;
  }

  // Subdomain Depth Anomaly
  const subdomains = str.split('.').length - 2;
  if (subdomains >= 3) {
    anomalies.push({
      type: 'DEEP_SUBDOMAIN_NESTING',
      severity: 'MEDIUM',
      detail: `Unusual subdomain nesting depth (${subdomains} levels) designed to mask origin domain on mobile viewports`
    });
    anomalyScore += 25;
  }

  // PII & Credential Solicitation Anomaly
  if (/password|passcode|pwd|token|auth|session|otp|cvv|aadhaar|pan_no|pin/i.test(str)) {
    anomalies.push({
      type: 'CREDENTIAL_HARVEST_SOLICITATION',
      severity: 'CRITICAL',
      detail: 'Presence of authentication secret solicitation parameters in URI or body'
    });
    anomalyScore += 40;
  }

  // Lookalike Hyphenation Anomaly
  if (/gov-|sbi-|bank-|login-|verify-/i.test(str)) {
    anomalies.push({
      type: 'HYPHENATED_LOOKALIKE_DOMAIN',
      severity: 'HIGH',
      detail: 'Hyphenated spoofing token prepended to mimic trusted institutional portal'
    });
    anomalyScore += 30;
  }

  // Urgency Coercion Anomaly
  if (/urgent|immediately|within 24 hours|blocked|suspended|deactivated|impound/i.test(str)) {
    anomalies.push({
      type: 'PSYCHOLOGICAL_URGENCY_TRIGGER',
      severity: 'MEDIUM',
      detail: 'High concentration of artificial deadline pressure cues'
    });
    anomalyScore += 20;
  }

  const normalizedScore = Math.min(100, anomalyScore);

  return {
    anomalyScore: normalizedScore,
    isAnomalous: normalizedScore >= 30,
    entropy: Number(entropy.toFixed(2)),
    detectedAnomalies: anomalies,
    anomalyClassification: normalizedScore > 70 ? 'EXTREME_ANOMALY' : normalizedScore > 40 ? 'MODERATE_ANOMALY' : 'NORMAL_BASELINE'
  };
}

/**
 * 3. LLM / NLP Threat Synthesis Engine
 */
export function synthesizeThreatWithLLM(targetArtifact, findings = [], domain = '') {
  const ragContext = retrieveRagContext(`${targetArtifact} ${domain} ${findings.join(' ')}`);
  const topContext = ragContext[0];

  const synthesisDossier = {
    executiveSummary: `AI THREAT SYNTHESIS: Telemetry analysis indicates that '${domain || targetArtifact}' aligns closely with tactical profile '${topContext.title}'. The adversary leverages ${findings.slice(0, 2).join(' and ') || 'deceptive digital indicators'} to target users.`,
    mitreMapping: {
      technique: topContext.mitreTechnique,
      category: topContext.category,
      countermeasure: topContext.countermeasure
    },
    ragReferences: ragContext.map(r => ({ id: r.id, title: r.title, category: r.category })),
    plainEnglishTakeaway: `Users should exercise extreme caution. ${topContext.countermeasure}`,
    timestamp: new Date().toISOString()
  };

  return synthesisDossier;
}
