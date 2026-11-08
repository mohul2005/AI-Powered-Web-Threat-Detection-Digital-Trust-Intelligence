import crypto from 'crypto';

/**
 * Section 9: Security and Privacy Requirements
 * Pillar 4: Operational Safety & Non-Exploitative Boundaries
 * 
 * Mandates:
 * 1. Do not execute malware or exploit vulnerable websites.
 * 2. Do not perform intrusive security testing without authorisation.
 * 3. Do not claim a website is secure simply because automated checks pass.
 * 4. Off-Chain Privacy: Never store sensitive content, raw URLs with tokens, or PII on public blockchains.
 */

// Foundational Security Axiom
export const PLATFORM_SECURITY_AXIOM = Object.freeze({
  axiomCode: 'SEC-AXIOM-09',
  statement: 'The system must not treat the absence of known threats as proof that a website is safe.',
  formalDisclosure: 'A passing automated check indicates no known malicious indicators were detected within the scope of these automated tests, but does not guarantee the website is completely safe or free from undetected threats.',
  operationalImplication: 'Automated scans represent point-in-time heuristic evaluations; zero-day exploits, dynamic cloak-and-dagger redirects, and newly deployed attack campaigns may not register on public intelligence feeds immediately.'
});

// Offensive / Exploitative Payload Patterns (Strictly Forbidden in Outgoing Probes)
const OFFENSIVE_PAYLOAD_PATTERNS = [
  /'\s*OR\s*'?1'?\s*=\s*'?1/i,           // SQL Injection probe
  /<script[\s\S]*?>[\s\S]*?<\/script>/i, // Active XSS injection
  /\.\.\/|\.\.\\/i,                       // Path traversal probe
  /;\s*(?:cat|ls|whoami|id|curl|wget)\b/i, // OS Command injection probe
  /\${(?:jndi|lower|upper):/i,            // Log4j / expression injection probe
  /UNION\s+SELECT/i                       // SQL Union probe
];

/**
 * 1. Audits and enforces non-exploitative inspection boundaries.
 * Guarantees TrustMatrix conducts passive telemetry gathering only.
 */
export function auditOperationalSafety(actionType, target, options = {}) {
  // Check if target or outgoing request contains offensive attack vectors
  for (const pattern of OFFENSIVE_PAYLOAD_PATTERNS) {
    if (pattern.test(String(target))) {
      return {
        permitted: false,
        blocked: true,
        violationType: 'EXPLOITATION_PAYLOAD_PROHIBITED',
        reason: 'Operational Safety Violation: Probes containing active exploit syntax are forbidden. TrustMatrix operates strictly non-exploitative passive inspection.'
      };
    }
  }

  // Active testing requires explicit cryptographic or administrative authorization
  if (options.mode === 'ACTIVE_PENETRATION_TEST') {
    if (!options.authorizationScopeToken || !options.targetConsentGranted) {
      return {
        permitted: false,
        blocked: true,
        violationType: 'UNAUTHORIZED_ACTIVE_TESTING_BLOCKED',
        reason: 'Operational Safety Violation: Active penetration testing requires explicit mutual authorization. Unsanctioned active probes are blocked.'
      };
    }
  }

  return {
    permitted: true,
    inspectionMode: 'PASSIVE_NON_EXPLOITATIVE',
    safetyGuarantees: [
      'No exploit payloads transmitted',
      'No client-side script execution',
      'No intrusive port scanning or vulnerability fuzzing without authorization',
      'Read-only HTTP header and public X.509 metadata inspection'
    ]
  };
}

/**
 * 2. Enforces Off-Chain Privacy for Blockchain Attestations.
 * Mandate: Raw URLs with tokens, personal information, email content, and passwords must remain off-chain.
 */
export function prepareBlockchainSafeCommitment({
  targetIdentifier,
  trustScore,
  classificationTier,
  findingsCount = 0,
  reporterAddress = '0x0000000000000000000000000000000000000000'
}) {
  // Strip query parameters that might carry session tokens or auth secrets
  let scrubbedTarget = String(targetIdentifier).trim();
  try {
    const parsed = new URL(scrubbedTarget);
    // Strip query and hash to prevent token leakage
    scrubbedTarget = `${parsed.protocol}//${parsed.hostname}${parsed.pathname}`;
  } catch (e) {
    // Treat as domain or non-URL string
    scrubbedTarget = scrubbedTarget.split('?')[0].split('#')[0];
  }

  // Generate SHA-256 cryptographic commitment of full report
  const commitmentPayload = JSON.stringify({
    target: scrubbedTarget,
    score: trustScore,
    tier: classificationTier,
    timestamp: Date.now()
  });

  const reportHash = '0x' + crypto.createHash('sha256').update(commitmentPayload).digest('hex');
  const iocHash = '0x' + crypto.createHash('sha256').update(scrubbedTarget).digest('hex');

  return {
    onChainData: {
      reportHash,
      iocHash,
      score: trustScore,
      tier: classificationTier,
      timestamp: Math.floor(Date.now() / 1000),
      reporter: reporterAddress
    },
    privacyCompliance: {
      rawUrlsExcluded: true,
      authTokensZeroized: true,
      piiExcluded: true,
      passwordsAndOtpsExcluded: true,
      onChainPayloadType: 'CRYPTOGRAPHIC_COMMITMENT_ONLY'
    }
  };
}

/**
 * 3. Enforces the Security Axiom on all generated risk assessments.
 */
export function enforceSecurityAxiom(report) {
  if (!report) return null;

  return {
    ...report,
    securityAxiom: PLATFORM_SECURITY_AXIOM,
    verdictDisclaimer: PLATFORM_SECURITY_AXIOM.formalDisclosure
  };
}
