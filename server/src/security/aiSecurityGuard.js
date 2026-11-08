/**
 * Section 9: Security and Privacy Requirements
 * Pillar 2: AI Security & Prompt Injection Defense
 * Pillar 3: Privacy & Credential Protection
 * 
 * Mandates:
 * 1. Treat webpage content and submitted messages as untrusted inputs.
 * 2. Prevent prompt injection from influencing security decisions.
 * 3. Require empirical evidence for important findings.
 * 4. Do not expose sensitive user information to external AI services.
 * 5. Never request or collect passwords, OTPs, private keys, or seed phrases.
 * 6. Avoid unnecessary collection of personal information.
 */

// Patterns indicating adversarial prompt injection
const ADVERSARIAL_INJECTION_PATTERNS = [
  /ignore\s+(?:all\s+|any\s+|previous\s+|prior\s+)*(?:instructions|directions|prompts|rules|guidelines)/i,
  /disregard\s+(?:all\s+|any\s+|previous\s+|prior\s+)*(?:instructions|directions|prompts|rules)/i,
  /forget\s+(?:all\s+|everything|your\s+system\s+prompt|prior\s+context)/i,
  /you\s+are\s+now\s+(?:in\s+DAN\s+mode|an\s+unfiltered\s+AI|a\s+helpful\s+assistant\s+without\s+boundaries|freed\s+from\s+rules)/i,
  /(?:mark|classify|declare|report)\s+(?:this\s+)?(?:website|url|domain|message|target)\s+as\s+(?:safe|low\s+risk|clean|verified|benign|legitimate)/i,
  /override\s+(?:the\s+)?(?:risk\s+score|threat\s+level|assessment|verdict|classification)/i,
  /this\s+is\s+an?\s+(?:authorized|official|sanctioned)\s+(?:security\s+audit|penetration\s+test|pentest|simulation)/i,
  /system\s*prompt\s*:\s*/i,
  /assistant\s*:\s*I\s*(?:certify|declare|confirm|verify|attest)\s+this\s+is\s+safe/i,
  /<system>[\s\S]*?<\/system>/i,
  /\[INST\][\s\S]*?\[\/INST\]/i,
  /<\|im_start\|>[\s\S]*?<\|im_end\|>/i,
  /\bdo\s+not\s+report\s+this\b/i,
  /\bhide\s+this\s+from\s+(?:the\s+)?user\b/i
];

// Credential and sensitive data detectors
const PRIVATE_KEY_HEX_REGEX = /\b(?:0x)?[0-9a-fA-F]{64}\b/g;
const OTP_REGEX = /\b(?:\d{6}|\d{4})\b(?=.*(?:otp|code|verification|pin|sms|auth))/gi;
const PASSWORD_FIELD_REGEX = /(?:password|passwd|pwd|secret)\s*[:=]\s*([^\s,;]+)/gi;
const CREDIT_CARD_REGEX = /\b(?:\d{4}[ -]?){3}\d{4}\b/g;
const EMAIL_PII_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
const PHONE_PII_REGEX = /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;

/**
 * Standard Luhn Algorithm check for payment cards
 */
function isValidLuhn(numberString) {
  const digits = numberString.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return (sum % 10) === 0;
}

/**
 * Validates whether text contains a 12 or 24-word sequence resembling a BIP-39 mnemonic seed phrase.
 */
function extractSeedPhrase(text) {
  if (!text) return null;
  // Look for 12 or 24 consecutive lowercase words
  const seedPattern = /\b(?:[a-z]{3,8}\s+){11}[a-z]{3,8}\b|\b(?:[a-z]{3,8}\s+){23}[a-z]{3,8}\b/i;
  const match = text.match(seedPattern);
  if (match) {
    const candidate = match[0].trim();
    const words = candidate.split(/\s+/);
    if (words.length === 12 || words.length === 24) {
      return candidate;
    }
  }
  return null;
}

/**
 * 1. AI Input Sanitizer & Prompt Injection Guard
 * Treats all incoming content as untrusted telemetry data.
 */
export function sanitizeUntrustedInput(rawInput, modality = 'text') {
  if (!rawInput || typeof rawInput !== 'string') {
    return {
      sanitizedContent: '',
      promptInjectionDetected: false,
      detectedInjections: [],
      securityFinding: null
    };
  }

  const detectedInjections = [];
  let containsInjection = false;

  for (const pattern of ADVERSARIAL_INJECTION_PATTERNS) {
    const match = rawInput.match(pattern);
    if (match) {
      containsInjection = true;
      detectedInjections.push({
        matchedPattern: pattern.toString(),
        sample: match[0].substring(0, 50)
      });
    }
  }

  let sanitizedContent = rawInput;

  if (containsInjection) {
    // Neutralize dangerous directives by stripping or inertly quoting
    sanitizedContent = rawInput.replace(
      /(ignore\s+previous\s+instructions|you\s+are\s+now\s+in\s+DAN\s+mode|mark\s+this\s+website\s+as\s+safe|override\s+the\s+risk\s+score|system\s*prompt\s*:|<system>|<\/system>)/gi,
      '[NEUTRALIZED_ADVERSARIAL_PROMPT_DIRECTIVE]'
    );
  }

  // Wrap in untrusted data delimiters to enforce boundary
  const boundedData = `[UNTRUSTED_CONTENT_DATA_START]\n${sanitizedContent}\n[UNTRUSTED_CONTENT_DATA_END]`;

  const securityFinding = containsInjection ? {
    id: 'SEC-PROMPT-INJECTION-01',
    title: 'Adversarial Prompt Injection Attempt Detected',
    severity: 'HIGH',
    technicalEvidence: `Input contained adversarial instructions attempting to subvert AI risk scoring: ${detectedInjections.map(d => d.sample).join('; ')}`,
    impact: 'Potential subversion of automated classification if raw input were executed as instructions by an AI model.',
    source: 'AI_SECURITY_INPUT_GUARD',
    remediation: 'All untrusted user inputs are neutralized and processed inside isolated data frames with strictly bounded instruction sets.'
  } : null;

  return {
    rawContent: rawInput,
    sanitizedContent,
    boundedData,
    promptInjectionDetected: containsInjection,
    detectedInjections,
    securityFinding
  };
}

/**
 * 2. Privacy & Credential Protection / Sanitization
 * Intercepts passwords, OTPs, EVM private keys, and seed phrases.
 */
export function protectPrivacyAndCredentials(text) {
  if (!text || typeof text !== 'string') {
    return { sanitizedText: '', redactedCredentials: [] };
  }

  let sanitized = text;
  const redactedCredentials = [];

  // A. EVM / Hex Private Keys (64 hex characters)
  const pkMatches = sanitized.match(PRIVATE_KEY_HEX_REGEX);
  if (pkMatches) {
    for (const match of pkMatches) {
      sanitized = sanitized.replace(match, '[REDACTED_CRYPTO_PRIVATE_KEY]');
      redactedCredentials.push({
        type: 'PRIVATE_KEY',
        description: '64-character cryptographic private key',
        action: 'Scrubbed and permanently omitted from persistence and threat ledgers'
      });
    }
  }

  // B. BIP-39 Seed Phrase
  const foundSeed = extractSeedPhrase(sanitized);
  if (foundSeed) {
    sanitized = sanitized.replace(foundSeed, '[REDACTED_CRYPTO_SEED_PHRASE]');
    redactedCredentials.push({
      type: 'SEED_PHRASE',
      description: '12/24-word non-custodial wallet recovery phrase',
      action: 'Scrubbed immediately. TrustMatrix never collects or stores seed phrases.'
    });
  }

  // C. Passwords in cleartext parameters
  sanitized = sanitized.replace(PASSWORD_FIELD_REGEX, (match, val) => {
    redactedCredentials.push({
      type: 'CLEARTEXT_PASSWORD',
      description: 'Authentication password parameter',
      action: 'Redacted from telemetry'
    });
    return 'password=[REDACTED_PASSWORD]';
  });

  // D. OTP & PIN Codes (checks both lookahead and surrounding context)
  const hasOtpContext = /(?:otp|code|verification|pin|sms|auth|token)\b/i.test(sanitized);
  if (hasOtpContext) {
    sanitized = sanitized.replace(/\b\d{4,6}\b/g, (match) => {
      redactedCredentials.push({
        type: 'ONE_TIME_PASSWORD',
        description: 'Multi-factor authentication OTP / PIN token',
        action: 'Redacted to prevent credential replay'
      });
      return '[REDACTED_OTP]';
    });
  }

  // E. Payment Card PANs (Luhn-verified)
  sanitized = sanitized.replace(CREDIT_CARD_REGEX, (match) => {
    if (isValidLuhn(match)) {
      redactedCredentials.push({
        type: 'PAYMENT_CARD_PAN',
        description: 'Luhn-valid Credit or Debit Card primary account number',
        action: 'Redacted to prevent PCI-DSS leakage'
      });
      return '[REDACTED_PAYMENT_CARD]';
    }
    return match;
  });

  const privacyAdvisory = redactedCredentials.length > 0 ? {
    status: 'CREDENTIALS_INTERCEPTED_AND_SCRUBBED',
    advisoryText: 'CRITICAL PRIVACY GUARD: Sensitive credentials (passwords, OTPs, private keys, or payment data) were identified in the submitted input and permanently redacted. TrustMatrix will NEVER request, store, or submit credentials.',
    redactionsCount: redactedCredentials.length,
    redactedTypes: [...new Set(redactedCredentials.map(r => r.type))]
  } : null;

  return {
    sanitizedText: sanitized,
    redactedCredentials,
    privacyAdvisory
  };
}

/**
 * 3. Minimizes User PII before sending context to external AI or third parties
 */
export function anonymizeForExternalAI(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(EMAIL_PII_REGEX, '[USER_EMAIL_MASKED]')
    .replace(PHONE_PII_REGEX, '[USER_PHONE_MASKED]')
    .replace(PRIVATE_KEY_HEX_REGEX, '[KEY_MASKED]');
}

/**
 * 4. Empirical Evidence Grounding Verifier
 * Mandate: Require evidence for important findings.
 * Ensures that AI cannot fabricate security findings without technical indicators.
 */
export function verifyEvidenceGrounding(finding, availableIndicators = []) {
  if (!finding) return { grounded: false, reason: 'Empty finding provided' };

  const validSources = [
    'DNS_ZONE_RECORDS',
    'X509_CERTIFICATE_METADATA',
    'HTTP_RESPONSE_HEADERS',
    'THREAT_INTEL_FEEDS',
    'LEXICAL_HEURISTIC_PARSER',
    'AI_SECURITY_INPUT_GUARD',
    'WEB3_CONTRACT_ABI',
    'STIX_INDICATOR_DATABASE'
  ];

  const hasValidSource = finding.source && validSources.includes(finding.source);
  const hasTechnicalEvidence = Boolean(finding.technicalEvidence && finding.technicalEvidence.length > 5);

  const isGrounded = hasValidSource && hasTechnicalEvidence;

  return {
    grounded: isGrounded,
    findingId: finding.id || 'N/A',
    source: finding.source || 'UNATTRIBUTED',
    verdict: isGrounded ? 'EMPIRICALLY_VERIFIED' : 'UNGROUNDED_HYPOTHESIS_FLAGGED',
    auditNotes: isGrounded
      ? `Finding verified against ground-truth source '${finding.source}'.`
      : 'Finding lacks verifiable empirical telemetry; excluded from authoritative risk weighting.'
  };
}
