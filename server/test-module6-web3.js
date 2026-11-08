import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  generateOnChainAttestation,
  verifyReportIntegrity,
  recordReportDispute,
  computeReportCommitmentHash
} from './src/engines/web3Engine.js';
import { threatStore } from './src/data/threatStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Starting Module 6: Decentralized Threat Intelligence Test Suite...\n');

// TEST 1: Cryptographic Commitment & On-Chain Attestation Generation
console.log('--- TEST 1: Cryptographic Commitment & On-Chain Attestation Generation ---');
const testDomain = 'sbi-yono-kyc-verify.top';
const rawMaliciousUrl = 'https://sbi-yono-kyc-verify.top/login.php?victim_token=secret_session_token_12345&user=victim@gmail.com';
const testCategory = 'Phishing & Brand Impersonation';
const testEntity = 'State Bank of India';
const testSummary = 'Credential harvester collecting YONO passwords and OTPs';

const attestation = generateOnChainAttestation(
  rawMaliciousUrl,
  10, // high risk
  testCategory,
  ['URLhaus: #984210', 'Passive DNS A Record: 149.28.18.232'],
  { targetEntity: testEntity, summary: testSummary }
);

assert(attestation, 'Attestation must be generated');
assert.strictEqual(attestation.module, 'Module 6: Decentralized Threat Intelligence');
assert(attestation.reportCommitmentHash.startsWith('0x'), 'Commitment hash must be hex');
assert.strictEqual(attestation.reportCommitmentHash.length, 66, 'Commitment hash must be 32 bytes (64 hex chars + 0x)');
assert(attestation.evidenceIpfsCid.startsWith('bafybeih'), 'Evidence CID must have IPFS format');
assert(attestation.reporterAddress.startsWith('0x'), 'Reporter address must be Ethereum format');
assert(attestation.txHash.startsWith('0x'), 'TxHash must be hex');
assert(attestation.blockNumber > 21000000, 'Block number must be realistic');
assert.strictEqual(attestation.validationStatus, 'VERIFIED_MULTI_SOURCE');

console.log('✅ Attestation successfully generated with valid cryptographic commitments.');
console.log(`   - Commitment Hash: ${attestation.reportCommitmentHash}`);
console.log(`   - Evidence IPFS CID: ${attestation.evidenceIpfsCid}`);
console.log(`   - Reporter Address: ${attestation.reporterAddress}`);
console.log(`   - Block Number: ${attestation.blockNumber}`);

// TEST 2: Off-Chain Privacy Boundary Rule Verification
console.log('\n--- TEST 2: Off-Chain Privacy Boundary Verification ---');
assert.strictEqual(attestation.privacyAndPiiRule.rawUrlsKeptOffChain, true, 'Raw URLs must remain off-chain');
assert.strictEqual(attestation.privacyAndPiiRule.piiSanitized, true, 'PII must be sanitized');
assert.strictEqual(attestation.privacyAndPiiRule.passwordsStripped, true, 'Passwords/tokens must be stripped');

// Verify that the on-chain sanitized identifier does NOT contain the secret query parameters or protocol
assert(!attestation.sanitizedIdentifier.includes('secret_session_token_12345'), 'Secret query token leaked!');
assert(!attestation.sanitizedIdentifier.includes('victim@gmail.com'), 'Victim email PII leaked!');
assert(!attestation.sanitizedIdentifier.includes('https://'), 'Protocol prefix should be normalized');
assert.strictEqual(attestation.sanitizedIdentifier, 'sbi-yono-kyc-verify.top/login.php', 'Sanitized identifier matches expected clean target');

console.log('✅ Off-Chain Privacy Boundary rigorously enforced:');
console.log(`   - Input Raw URL: ${rawMaliciousUrl}`);
console.log(`   - On-Chain Sanitized Identifier: ${attestation.sanitizedIdentifier}`);
console.log(`   - Boundary Rule: "${attestation.privacyAndPiiRule.ruleText}"`);

// TEST 3: Epistemological Integrity Axiom Compliance
console.log('\n--- TEST 3: Epistemological Axiom Compliance ---');
assert.strictEqual(attestation.epistemologicalAxiom.integrityProven, true, 'Integrity must be proven on-chain');
assert(attestation.epistemologicalAxiom.ruleText.includes('integrity and history of a report, not the truth of the report itself'));
console.log('✅ Epistemological Axiom verified:');
console.log(`   - Axiom: "${attestation.epistemologicalAxiom.ruleText}"`);

// TEST 4: Verifiable Reporting History
console.log('\n--- TEST 4: Verifiable Reporting History ---');
assert(Array.isArray(attestation.verifiableHistory), 'verifiableHistory must be an array');
assert.strictEqual(attestation.verifiableHistory.length, 1, 'Initial history has 1 event');
assert.strictEqual(attestation.verifiableHistory[0].event, 'INITIAL_REGISTRATION');
assert.strictEqual(attestation.verifiableHistory[0].commitmentHash, attestation.reportCommitmentHash);
console.log('✅ Verifiable Reporting History initialized with immutable audit event:');
console.log(`   - Event: ${attestation.verifiableHistory[0].event} at Block #${attestation.verifiableHistory[0].blockNumber}`);

// TEST 5: Independent Integrity Checking (Intact Report vs Tampered Report)
console.log('\n--- TEST 5: Independent Integrity Checking ---');
const originalReport = {
  domain: attestation.sanitizedIdentifier,
  threatCategory: testCategory,
  targetEntity: testEntity,
  summary: testSummary
};

// Check genuine report
const checkValid = verifyReportIntegrity(originalReport, attestation);
assert.strictEqual(checkValid.isIntact, true, 'Original report must pass integrity check');
assert(checkValid.independentVerificationVerdict.includes('TAMPER_EVIDENT_PROOF_VERIFIED'));
console.log('✅ Untouched report verification: PASSED (Hashes match identically)');
console.log(`   - Verdict: ${checkValid.independentVerificationVerdict}`);

// Check tampered report (adversary alters summary to hide threat)
const tamperedReport = {
  ...originalReport,
  summary: 'BENIGN FALSE POSITIVE: Website is completely safe official bank portal'
};
const checkTampered = verifyReportIntegrity(tamperedReport, attestation);
assert.strictEqual(checkTampered.isIntact, false, 'Tampered report must FAIL integrity check');
assert(checkTampered.independentVerificationVerdict.includes('INTEGRITY_VIOLATION_DETECTED'));
console.log('✅ Tampered report detection: PASSED (Cryptographic mismatch caught)');
console.log(`   - Computed Hash: ${checkTampered.computedHash}`);
console.log(`   - Committed Hash: ${checkTampered.committedHash}`);
console.log(`   - Verdict: ${checkTampered.independentVerificationVerdict}`);

// TEST 6: Dispute Tracking & Status Transition
console.log('\n--- TEST 6: Dispute Tracking & Status Lifecycle ---');
const disputeResult = recordReportDispute(
  attestation.targetHash,
  'Reported domain was acquired by a legitimate non-profit organization post-takedown',
  '0x7777a81234567890123456789012345678901234'
);
assert.strictEqual(disputeResult.newValidationStatus, 'DISPUTED');
assert(disputeResult.disputeEvidenceCid.startsWith('bafybei'));
assert(disputeResult.statusNotice.includes('Dispute recorded on-chain'));
console.log('✅ Dispute tracking successfully recorded:');
console.log(`   - New Validation Status: ${disputeResult.newValidationStatus}`);
console.log(`   - Dispute CID: ${disputeResult.disputeEvidenceCid}`);
console.log(`   - TxHash: ${disputeResult.txHash}`);

// TEST 7: Smart Contract TrustMatrixRegistry.sol Validation
console.log('\n--- TEST 7: Smart Contract TrustMatrixRegistry.sol Interface Check ---');
const contractPath = path.join(__dirname, 'src', 'contracts', 'TrustMatrixRegistry.sol');
const contractCode = fs.readFileSync(contractPath, 'utf8');

const requiredContractKeywords = [
  'reportCommitmentHash',
  'evidenceIpfsCid',
  'ValidationStatus',
  'PENDING_REVIEW',
  'VERIFIED_MULTI_SOURCE',
  'DISPUTED',
  'RESOLVED_REVOKED',
  'recordReportCommitment',
  'reviseReport',
  'disputeReport',
  'verifyReportIntegrity',
  'ReportCommitmentRecorded',
  'ReportRevised',
  'ReportDisputed',
  'ReportStatusUpdated'
];

for (const kw of requiredContractKeywords) {
  assert(contractCode.includes(kw), `Smart contract missing required keyword: ${kw}`);
}
console.log(`✅ TrustMatrixRegistry.sol contains all 13 required Web3 Module 6 primitives.`);

// TEST 8: Threat Store Community Reports Integration
console.log('\n--- TEST 8: Threat Store Integration Check ---');
const allReports = threatStore.getAllReports();
assert(allReports.length >= 7, 'Threat store must have community reports');

for (const r of allReports) {
  assert(r.onChainAttestation, `Report ${r.id} missing onChainAttestation`);
  assert(r.onChainAttestation.reportCommitmentHash, `Report ${r.id} missing reportCommitmentHash`);
  assert(r.onChainAttestation.evidenceIpfsCid, `Report ${r.id} missing evidenceIpfsCid`);
  assert(r.onChainAttestation.verifiableHistory.length >= 1, `Report ${r.id} missing verifiableHistory`);
  assert.strictEqual(r.onChainAttestation.privacyAndPiiRule.rawUrlsKeptOffChain, true);
  assert.strictEqual(r.onChainAttestation.epistemologicalAxiom.integrityProven, true);
}
console.log(`✅ All ${allReports.length} community threat reports carry valid Module 6 on-chain attestations.`);

console.log('\n🎉 ALL MODULE 6 TESTS COMPLETED AND PASSED WITH 100% SUCCESS!\n');
