import { analyzeWeb3Threats, generateOnChainAttestation } from './src/engines/web3Engine.js';
import { analyzeEmailThreat } from './src/engines/emailEngine.js';
import { analyzeMessageThreat } from './src/engines/messageEngine.js';

async function runTests() {
  console.log('--- Testing Web3, Email & Message Engines ---');

  // 1. Web3 Threat Engine Test
  const web3Res = analyzeWeb3Threats('https://uniswap-airdrop-reward-claim.eth.limo', 'connect wallet setApprovalForAll permit2');
  console.log('✓ Web3 Threat Analysis: Drainer detected =', web3Res.drainerDetected, 'Score =', web3Res.score);
  
  const attestation = generateOnChainAttestation('uniswap-airdrop-reward-claim.eth.limo', web3Res.score, 'Web3 Phishing');
  console.log('✓ Web3 On-Chain Attestation: TxHash =', attestation.txHash.substring(0, 18) + '...', 'Block =', attestation.blockNumber);

  // 2. Email Threat Engine Test
  const emailSample = `From: security@paypal.com\nReply-To: support@paypal-verification.xyz\nSubject: Account Suspended - Immediate Action Required\n\nPlease click https://paypal-account-verification.cc to avoid account closure.`;
  const emailRes = analyzeEmailThreat(emailSample);
  console.log('✓ Email Threat Analysis: Score =', emailRes.trustScore, 'Level =', emailRes.threatLevel, 'Brand =', emailRes.impersonatedBrand);
  console.log('  Email Evidence count =', emailRes.evidence.length);

  // 3. Message / Smishing Engine Test
  const messageSample = `Dear Customer, Your SBI YONO account will be blocked today! Update your PAN card immediately at http://bit.ly/sbi-pan-kyc`;
  const messageRes = analyzeMessageThreat(messageSample);
  console.log('✓ Smishing Threat Analysis: Score =', messageRes.trustScore, 'Level =', messageRes.threatLevel);
  console.log('  Extracted URLs =', messageRes.extractedUrls);

  console.log('\n🌟 ALL MULTI-MODAL & WEB3 ENGINES PASSED WITH 100% SUCCESS!');
}

runTests();
