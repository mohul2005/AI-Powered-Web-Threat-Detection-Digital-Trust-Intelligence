import assert from 'assert';
import {
  evaluateStandardRiskClassification,
  CLASSIFICATION_TIERS
} from './src/engines/riskClassificationEngine.js';

console.log('🧪 Starting Section 6: Risk Classification Test Suite...\n');

// TEST 1: The 5 Consistent Classification Tiers Exist & Match Specification
console.log('--- TEST 1: Verify 5 Canonical Classification Tiers ---');
const expectedTiers = [
  'Confirmed Malicious',
  'High Risk',
  'Suspicious',
  'Low Risk',
  'Inconclusive'
];

for (const tierName of expectedTiers) {
  const found = Object.values(CLASSIFICATION_TIERS).find(t => t.tier === tierName);
  assert(found, `Classification tier '${tierName}' must exist in CLASSIFICATION_TIERS`);
  assert(found.description, `Tier '${tierName}' must have a formal description`);
}
console.log('✅ All 5 canonical classification tiers verified with formal definitions.');

// TEST 2: Tier Evaluation - Confirmed Malicious
console.log('\n--- TEST 2: Confirmed Malicious Evaluation ---');
const maliciousAssessment = evaluateStandardRiskClassification({
  trustScore: 12,
  url: 'https://secure-yono-login-sbi.top',
  domain: 'secure-yono-login-sbi.top',
  aiPhishing: {
    signals: ['Domain mimics official SBI YONO banking portal', 'Credential harvesting form detected'],
    impersonatedBrand: 'State Bank of India',
    entropy: 4.1,
    formFields: ['username', 'password', 'otp']
  },
  collaborativeIntel: {
    matchingThreatClusters: [{ clusterId: 'CLUSTER-FINPHISH-01', type: 'Banking Phish', sharedAsn: 'AS20473', domainsCount: 12 }],
    reputationScore: 8,
    communityVotes: { malicious: 180, benign: 0 }
  }
});

assert.strictEqual(maliciousAssessment.overallRiskClassification.tier, 'Confirmed Malicious');
assert.strictEqual(
  maliciousAssessment.overallRiskClassification.description,
  'Supported by authoritative threat intelligence or sufficiently validated evidence'
);
console.log('✅ Confirmed Malicious correctly assigned with authoritative threat matches.');

// TEST 3: Tier Evaluation - High Risk
console.log('\n--- TEST 3: High Risk Evaluation ---');
const highRiskAssessment = evaluateStandardRiskClassification({
  trustScore: 40,
  url: 'https://pay-merchant-gateway.xyz',
  domain: 'pay-merchant-gateway.xyz',
  aiPhishing: {
    signals: ['High-risk TLD .xyz', 'Brand keywords present in domain'],
    impersonatedBrand: 'Razorpay',
    entropy: 3.8
  },
  certTrust: {
    signals: ['Missing public Certificate Transparency SCT proof'],
    ctLogs: { present: false }
  },
  webSec: { grade: 'F' }
});

assert.strictEqual(highRiskAssessment.overallRiskClassification.tier, 'High Risk');
assert.strictEqual(
  highRiskAssessment.overallRiskClassification.description,
  'Multiple significant indicators suggest a substantial security threat'
);
console.log('✅ High Risk correctly assigned with multiple significant indicators.');

// TEST 4: Tier Evaluation - Suspicious
console.log('\n--- TEST 4: Suspicious Evaluation ---');
const suspiciousAssessment = evaluateStandardRiskClassification({
  trustScore: 65,
  url: 'https://new-tech-portal.online',
  domain: 'new-tech-portal.online',
  aiPhishing: {
    signals: ['Urgent countdown clock text detected in HTML'],
    entropy: 3.1
  }
});

assert.strictEqual(suspiciousAssessment.overallRiskClassification.tier, 'Suspicious');
assert.strictEqual(
  suspiciousAssessment.overallRiskClassification.description,
  'One or more indicators require further investigation'
);
console.log('✅ Suspicious correctly assigned for single anomaly requiring further review.');

// TEST 5: Tier Evaluation - Low Risk
console.log('\n--- TEST 5: Low Risk Evaluation ---');
const lowRiskAssessment = evaluateStandardRiskClassification({
  trustScore: 96,
  url: 'https://github.com',
  domain: 'github.com',
  aiPhishing: { signals: [] },
  certTrust: {
    issuer: { commonName: 'DigiCert TLS RSA SHA256 2020 CA1' },
    keyDetails: { keySize: 2048 },
    ctLogs: { present: true },
    signals: []
  },
  dnsInfo: { ipAddresses: ['140.82.121.4'], signals: [] },
  webSec: { grade: 'A+' }
});

assert.strictEqual(lowRiskAssessment.overallRiskClassification.tier, 'Low Risk');
assert.strictEqual(
  lowRiskAssessment.overallRiskClassification.description,
  'No significant malicious indicators identified within the available checks'
);
console.log('✅ Low Risk correctly assigned for clean enterprise baseline.');

// TEST 6: Tier Evaluation - Inconclusive
console.log('\n--- TEST 6: Inconclusive Evaluation ---');
const inconclusiveAssessment = evaluateStandardRiskClassification({
  trustScore: 50,
  url: 'https://unreachable-host-example.xyz',
  domain: 'unreachable-host-example.xyz',
  isUnreachable: true
});

assert.strictEqual(inconclusiveAssessment.overallRiskClassification.tier, 'Inconclusive');
assert.strictEqual(
  inconclusiveAssessment.overallRiskClassification.description,
  'Insufficient data or unavailable verification sources'
);
console.log('✅ Inconclusive correctly assigned when data sources are unavailable.');

// TEST 7: All 8 Mandated Deliverables Present in Every Assessment
console.log('\n--- TEST 7: Verification of the 8 Mandated Deliverables ---');
const testAssessments = [maliciousAssessment, highRiskAssessment, suspiciousAssessment, lowRiskAssessment, inconclusiveAssessment];

for (let i = 0; i < testAssessments.length; i++) {
  const ass = testAssessments[i];
  // 1. Overall risk classification
  assert(ass.overallRiskClassification, `Assessment #${i+1} missing overallRiskClassification`);
  assert(ass.overallRiskClassification.tier, `Assessment #${i+1} missing tier`);
  assert(ass.overallRiskClassification.description, `Assessment #${i+1} missing description`);

  // 2. Identified threat indicators
  assert(Array.isArray(ass.identifiedThreatIndicators), `Assessment #${i+1} missing identifiedThreatIndicators array`);

  // 3. Supporting technical evidence
  assert(Array.isArray(ass.supportingTechnicalEvidence), `Assessment #${i+1} missing supportingTechnicalEvidence array`);
  assert(ass.supportingTechnicalEvidence[0].technicalEvidence, `Assessment #${i+1} missing technicalEvidence string`);

  // 4. Source of each important finding
  assert(Array.isArray(ass.sourceOfFindings), `Assessment #${i+1} missing sourceOfFindings array`);
  assert(ass.sourceOfFindings[0].source, `Assessment #${i+1} missing finding source origin`);

  // 5. Analysis timestamp
  assert(ass.analysisTimestamp, `Assessment #${i+1} missing analysisTimestamp`);
  assert(!isNaN(Date.parse(ass.analysisTimestamp)), `Assessment #${i+1} timestamp is invalid ISO string`);

  // 6. Confidence or evidence coverage
  assert(ass.confidenceAndEvidenceCoverage, `Assessment #${i+1} missing confidenceAndEvidenceCoverage`);
  assert(ass.confidenceAndEvidenceCoverage.coveragePercentage, `Assessment #${i+1} missing coveragePercentage`);

  // 7. Recommended actions
  assert(Array.isArray(ass.recommendedActions), `Assessment #${i+1} missing recommendedActions array`);
  assert(ass.recommendedActions.length >= 1, `Assessment #${i+1} recommendedActions empty`);

  // 8. Limitations and unavailable checks
  assert(Array.isArray(ass.limitationsAndUnavailableChecks), `Assessment #${i+1} missing limitationsAndUnavailableChecks`);
  assert(ass.limitationsAndUnavailableChecks.length >= 3, `Assessment #${i+1} must list at least 3 concrete limitations`);
}
console.log('✅ All 8 mandated deliverables confirmed present across all 5 risk tiers.');

// TEST 8: The Security Axiom
console.log('\n--- TEST 8: Core Security Axiom Enforcement ---');
assert(lowRiskAssessment.absenceOfThreatsRule, 'Assessment must contain absenceOfThreatsRule');
assert.strictEqual(
  lowRiskAssessment.absenceOfThreatsRule.axiom,
  'The system must not treat the absence of known threats as proof that a website is safe.'
);
console.log('✅ Core Security Axiom verified:');
console.log(`   "${lowRiskAssessment.absenceOfThreatsRule.axiom}"`);

console.log('\n🎉 ALL SECTION 6 RISK CLASSIFICATION TESTS PASSED WITH 100% SUCCESS!\n');
