// Module 3 AI Boundary Rule Test Suite
import { analyzeSocialEngineering } from './src/engines/scamEngine.js';
import { analyzeMessageThreat } from './src/engines/messageEngine.js';
import { analyzeEmailThreat } from './src/engines/emailEngine.js';

console.log('=== TESTING MODULE 3: AI-POWERED SCAM & MESSAGE ANALYSIS ===\n');

// TEST 1: Urgent Legitimate Alert (Crucial AI Boundary Rule)
const urgentBenignText = 'URGENT: Flight AI-102 boarding gates close in 15 minutes. All passengers must proceed immediately to Gate 14 with their boarding pass.';
const res1 = analyzeMessageThreat(urgentBenignText);

console.log('--- TEST 1: Urgent Legitimate Alert (AI Boundary Rule) ---');
console.log('Input:', urgentBenignText);
console.log('Status:', res1.module3ScamReport?.status);
console.log('Score:', res1.trustScore);
console.log('Threat Level:', res1.threatLevel);
console.log('Urgent Language Detected:', res1.module3ScamReport?.boundaryRule.urgentLanguageDetected);
console.log('Verified Fraud Detected:', res1.module3ScamReport?.boundaryRule.verifiedFraudEvidenceDetected);
console.log('Rationale:', res1.module3ScamReport?.boundaryRule.assessmentRationale);

if (
  res1.module3ScamReport?.status === 'SUSPICIOUS_URGENT_LANGUAGE_NO_FRAUD_EVIDENCE' &&
  res1.trustScore >= 70 &&
  res1.threatLevel !== 'CRITICAL'
) {
  console.log('✅ TEST 1 PASSED: Message with urgent phrasing correctly NOT labelled fraudulent!\n');
} else {
  console.error('❌ TEST 1 FAILED: Boundary rule violated!', res1);
  process.exit(1);
}

// TEST 2: Active Fraud with Malicious Link and Remote Access AnyDesk
const fraudText = 'Dear SBI Customer, your YONO account will be blocked within 24 hours. Download AnyDesk app or update immediately at: http://sbi-kyc-quick.top. Helpline: 1800-419-0122';
const res2 = analyzeMessageThreat(fraudText);

console.log('--- TEST 2: Active Fraud with Malicious Link & AnyDesk ---');
console.log('Status:', res2.module3ScamReport?.status);
console.log('Score:', res2.trustScore);
console.log('Threat Level:', res2.threatLevel);
console.log('Extracted URLs:', res2.extractedEntities?.urls.map(u => u.url));
console.log('Extracted Phone Numbers:', res2.extractedEntities?.phoneNumbers.map(p => p.number));
console.log('Remote Access Alert:', res2.indicators.remoteAccessTools.findings);

if (
  res2.module3ScamReport?.status === 'VERIFIED_EVIDENCE_OF_FRAUD' &&
  res2.trustScore <= 25 &&
  res2.threatLevel === 'CRITICAL' &&
  res2.extractedEntities?.urls.length > 0 &&
  res2.indicators.remoteAccessTools.detected
) {
  console.log('✅ TEST 2 PASSED: Active fraud correctly verified with extracted IOCs!\n');
} else {
  console.error('❌ TEST 2 FAILED!', res2);
  process.exit(1);
}

// TEST 3: Advance Fee UPI Lottery Scam
const upiLotteryText = 'Congratulations! You won ₹25,00,000 in KBC Lucky Draw. Send ₹12,500 tax to upi kbcmanager@apl to claim your cash: http://bit.ly/kbc2026';
const res3 = analyzeMessageThreat(upiLotteryText);

console.log('--- TEST 3: Advance Fee UPI Lottery Scam ---');
console.log('Status:', res3.module3ScamReport?.status);
console.log('Payment Handles:', res3.extractedEntities?.paymentHandles.map(p => p.handle));
console.log('Extracted Shortlinks:', res3.extractedEntities?.urls.map(u => u.url));

if (
  res3.module3ScamReport?.status === 'VERIFIED_EVIDENCE_OF_FRAUD' &&
  res3.extractedEntities?.paymentHandles.some(p => p.handle.includes('kbcmanager@apl')) &&
  res3.extractedEntities?.urls.some(u => u.isShortened)
) {
  console.log('✅ TEST 3 PASSED: Payment handle and shortlink extracted and verified as fraud!\n');
} else {
  console.error('❌ TEST 3 FAILED!', res3);
  process.exit(1);
}

// TEST 4: Completely Benign Communication
const benignText = 'Hello team, the weekly sync meeting is scheduled for tomorrow at 10 AM in the conference room. Have a great evening.';
const res4 = analyzeMessageThreat(benignText);

console.log('--- TEST 4: Completely Benign Communication ---');
console.log('Status:', res4.module3ScamReport?.status);
console.log('Score:', res4.trustScore);
console.log('Threat Level:', res4.threatLevel);

if (
  res4.module3ScamReport?.status === 'BENIGN_COMMUNICATION' &&
  res4.trustScore >= 90 &&
  res4.threatLevel === 'SAFE'
) {
  console.log('✅ TEST 4 PASSED: Benign message recognized as safe!\n');
} else {
  console.error('❌ TEST 4 FAILED!', res4);
  process.exit(1);
}

console.log('🎉 ALL MODULE 3 AI BOUNDARY RULE TESTS PASSED WITH 100% SUCCESS!');
