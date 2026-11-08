// Module 4 Intelligent Threat Correlation Test Suite
import { correlateThreatIndicators, computeJaccardSimilarity, KNOWN_THREAT_CAMPAIGNS } from './src/engines/correlationEngine.js';

console.log('=== TESTING MODULE 4: INTELLIGENT THREAT CORRELATION ===\n');

// TEST 1: Multiple Users Reporting Different URLs Sharing the Same Bank and Infrastructure
// Target: 'sbi-yono-pan-kyc-update.top', resolving to IP 149.28.18.232 and ASN AS20473
const incident1 = {
  url: 'https://sbi-yono-pan-kyc-update.top/login',
  domain: 'sbi-yono-pan-kyc-update.top',
  content: 'Dear SBI Customer, your YONO account will be blocked within 24 hours. Update KYC at https://sbi-yono-pan-kyc-update.top/login',
  ip: '149.28.18.232',
  asn: 'AS20473 (Choopa / Vultr Proxy)',
  impersonatedBrand: 'State Bank of India',
  extractedEntities: {
    paymentHandles: [{ handle: 'sbi-kyc-verify@oksbi', type: 'UPI_HANDLE' }]
  }
};

const res1 = correlateThreatIndicators(incident1);

console.log('--- TEST 1: Multi-User Banking Phishing Correlation ---');
console.log('Target Domain:', res1.targetDomain);
console.log('Correlation Status:', res1.correlationStatus);
console.log('Attributed Campaign:', res1.campaignAttribution?.name);
console.log('Campaign ID:', res1.campaignAttribution?.campaignId);
console.log('Total Deterministic Connections:', res1.deterministicConnections.totalConnections);
console.log('Verified Evidence Edges:');
res1.deterministicConnections.connectionsList.forEach((c, i) => {
  console.log(`  [${i + 1}] ${c.edgeType} (${c.strength}): ${c.evidence}`);
});
console.log('Colocated Domains:', res1.infrastructureCorrelation.colocatedDomains);
console.log('Reused Payment Handles:', res1.infrastructureCorrelation.reusedPaymentHandles);
console.log('Graph Nodes Count:', res1.threatGraph.nodesCount);
console.log('AI Campaign Summary:', res1.aiCampaignSummary);

if (
  res1.correlationStatus === 'CAMPAIGN_CORRELATED' &&
  res1.campaignAttribution?.campaignId === 'CAMPAIGN-FINPHISH-IND-88' &&
  res1.deterministicConnections.totalConnections >= 3 &&
  res1.threatGraph.nodesCount >= 4
) {
  console.log('✅ TEST 1 PASSED: Multi-user banking reports successfully correlated with shared ASN, IP, and campaign!\n');
} else {
  console.error('❌ TEST 1 FAILED!', res1);
  process.exit(1);
}

// TEST 2: Jaccard Lexical Similarity between Phishing Message Templates
const msgA = 'Dear customer your SBI YONO netbanking account will be blocked within 24 hours due to pending KYC verification';
const msgB = 'Attention customer your SBI YONO account is blocked within 24 hours please complete KYC verification immediately';
const similarity = computeJaccardSimilarity(msgA, msgB);

console.log('--- TEST 2: Jaccard Message Template Similarity ---');
console.log('Message A:', msgA);
console.log('Message B:', msgB);
console.log('Jaccard Similarity Score:', (similarity * 100).toFixed(1) + '%');

if (similarity >= 0.40) {
  console.log('✅ TEST 2 PASSED: Phishing message similarity accurately detected via deterministic n-gram matching!\n');
} else {
  console.error('❌ TEST 2 FAILED! Similarity too low:', similarity);
  process.exit(1);
}

// TEST 3: Reused UPI Payment Destination Correlation (KBC Lottery Syndicate)
const incident3 = {
  url: 'http://bit.ly/kbc-claims-new',
  domain: 'bit.ly',
  content: 'Congratulations! You won ₹25,00,000 in KBC Lucky Draw. Deposit ₹12,500 tax to upi kbcmanager-tax@apl to claim.',
  impersonatedBrand: 'Kaun Banega Crorepati',
  extractedEntities: {
    paymentHandles: [{ handle: 'kbcmanager-tax@apl', type: 'UPI_HANDLE' }]
  }
};

const res3 = correlateThreatIndicators(incident3);

console.log('--- TEST 3: Reused Payment Destination (KBC Lottery) ---');
console.log('Attributed Campaign:', res3.campaignAttribution?.name);
console.log('Reused UPI:', res3.infrastructureCorrelation.reusedPaymentHandles);
console.log('Connections Found:', res3.deterministicConnections.connectionsList.map(c => c.edgeType));

if (
  res3.campaignAttribution?.campaignId === 'CAMPAIGN-KBC-LOTTERY-ADVANCE-FEE' &&
  res3.deterministicConnections.connectionsList.some(c => c.edgeType === 'REUSED_PAYMENT_DESTINATION')
) {
  console.log('✅ TEST 3 PASSED: Disparate shortlink correlated through reused UPI payment destination!\n');
} else {
  console.error('❌ TEST 3 FAILED!', res3);
  process.exit(1);
}

// TEST 4: Isolated Benign Platform (Zero False Campaign Corroboration)
const incident4 = {
  url: 'https://github.com',
  domain: 'github.com',
  content: 'GitHub is where over 100 million developers build software together.',
  ip: '140.82.121.4',
  asn: 'AS36459 (GitHub, Inc.)',
  impersonatedBrand: null,
  extractedEntities: { paymentHandles: [] }
};

const res4 = correlateThreatIndicators(incident4);

console.log('--- TEST 4: Isolated Platform Correlation ---');
console.log('Correlation Status:', res4.correlationStatus);
console.log('Campaign Attribution:', res4.campaignAttribution);

if (res4.correlationStatus === 'ISOLATED_INCIDENT' && !res4.campaignAttribution) {
  console.log('✅ TEST 4 PASSED: Clean enterprise baseline correctly treated as isolated incident with zero hallucinated campaigns!\n');
} else {
  console.error('❌ TEST 4 FAILED!', res4);
  process.exit(1);
}

console.log('🎉 ALL MODULE 4 INTELLIGENT THREAT CORRELATION TESTS PASSED WITH 100% SUCCESS!');
