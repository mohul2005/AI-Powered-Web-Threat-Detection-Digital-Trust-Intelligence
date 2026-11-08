// Module 5 Website Security Assessment Test Suite
import { analyzeWebSecurity } from './src/engines/webSecEngine.js';

console.log('=== TESTING MODULE 5: WEBSITE SECURITY ASSESSMENT ===\n');

// TEST 1: Insecure Deficient Target (Missing HSTS, Missing CSP, Leaked Apache Version, Insecure Cookies)
const deficientHeaders = {
  'server': 'Apache/2.4.29 (Ubuntu)',
  'x-powered-by': 'PHP/7.4.3'
};
const deficientCookies = [
  { name: 'session_id', secure: false, httpOnly: false, sameSite: 'None' }
];

const res1 = analyzeWebSecurity(deficientHeaders, deficientCookies, 'vulnerable-portal.example');

console.log('--- TEST 1: Deficient Host Security Posture ---');
console.log('Score:', res1.score);
console.log('Grade:', res1.grade);
console.log('Assessment Mode:', res1.module5AssessmentReport.assessmentMode);
console.log('Regulatory Mandate:', res1.module5AssessmentReport.authorizationGate.regulatoryMandate);
console.log('Total Findings:', res1.findings.length);

// Verify that EVERY finding contains all 6 required items
let all6Present = true;
for (const f of res1.findings) {
  const hasIssue = !!f.issue;
  const hasEvidence = !!f.technicalEvidence;
  const hasImpact = !!f.potentialImpact;
  const hasSeverity = !!f.severity && ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL'].includes(f.severity);
  const hasRemediation = !!f.remediation;
  const hasLimitations = !!f.limitations;

  if (!hasIssue || !hasEvidence || !hasImpact || !hasSeverity || !hasRemediation || !hasLimitations) {
    all6Present = false;
    console.error('Finding missing required deliverable:', f);
    break;
  }
}

if (all6Present && res1.findings.length >= 4) {
  console.log('✅ TEST 1 PASSED: All findings rigorously include all 6 required deliverables!');
  console.log('Sample Finding 1:');
  console.log('  Issue:', res1.findings[0].issue);
  console.log('  Evidence:', res1.findings[0].technicalEvidence);
  console.log('  Impact:', res1.findings[0].potentialImpact);
  console.log('  Severity:', res1.findings[0].severity);
  console.log('  Remediation:', res1.findings[0].remediation.split('\n')[0]);
  console.log('  Limitations:', res1.findings[0].limitations);
  console.log('');
} else {
  console.error('❌ TEST 1 FAILED! Some findings do not have all 6 deliverables.');
  process.exit(1);
}

// TEST 2: Hardened Enterprise Baseline (e.g. GitHub with Strict HSTS, CSP, XFO, nosniff)
const hardenedHeaders = {
  'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
  'content-security-policy': "default-src 'self'; script-src 'self'; object-src 'none';",
  'x-frame-options': 'DENY',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'server': 'GitHub Gateway'
};
const hardenedCookies = [
  { name: '__Host-user_session', secure: true, httpOnly: true, sameSite: 'Lax' }
];

const res2 = analyzeWebSecurity(hardenedHeaders, hardenedCookies, 'github.com');

console.log('--- TEST 2: Hardened Enterprise Host ---');
console.log('Score:', res2.score);
console.log('Grade:', res2.grade);
console.log('Overall Status:', res2.module5AssessmentReport.overallPosture.status);

if (res2.score >= 90 && ['A+', 'A'].includes(res2.grade)) {
  console.log('✅ TEST 2 PASSED: Hardened enterprise site accurately receives top security grade!\n');
} else {
  console.error('❌ TEST 2 FAILED! Expected score >= 90 but got:', res2.score);
  process.exit(1);
}

// TEST 3: Ethical Scope & Non-Exploitative Authorization Mandate
console.log('--- TEST 3: Ethical Scope & Authorization Verification ---');
const gate = res2.module5AssessmentReport.authorizationGate;
console.log('Scope:', gate.scope);
console.log('Active Exploitation Attempted:', gate.activeExploitationAttempted);
console.log('Regulatory Rule:', gate.regulatoryMandate);

if (gate.activeExploitationAttempted === false && gate.scope === 'PUBLIC_SECURITY_METADATA_INSPECTION') {
  console.log('✅ TEST 3 PASSED: Non-exploitative passive constraint strictly verified!\n');
} else {
  console.error('❌ TEST 3 FAILED! Authorization gate violated.');
  process.exit(1);
}

console.log('🎉 ALL MODULE 5 WEBSITE SECURITY ASSESSMENT TESTS PASSED WITH 100% SUCCESS!');
