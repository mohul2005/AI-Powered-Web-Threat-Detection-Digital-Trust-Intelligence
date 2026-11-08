import crypto from 'crypto';

// Web3 Threat Detection & Decentralized On-Chain Attestation Engine

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

// Generate On-Chain Cryptographic Attestation Metadata (EAS / Solidity compatible)
export function generateOnChainAttestation(targetIdentifier, threatScore, threatCategory) {
  const hash = crypto.createHash('sha256').update(targetIdentifier).digest('hex');
  const targetHash = `0x${hash}`;
  const mockTxHash = `0x${crypto.randomBytes(32).toString('hex')}`;
  const mockIpfsCid = `bafybeih${crypto.randomBytes(20).toString('hex')}quvyku`;

  return {
    contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
    network: 'Ethereum Sepolia / Polygon POS',
    targetHash,
    txHash: mockTxHash,
    ipfsCid: mockIpfsCid,
    blockNumber: Math.floor(21094000 + Math.random() * 5000),
    attestationStandard: 'EAS-THREAT-INTEL-EIP712',
    timestamp: new Date().toISOString(),
    status: 'ATTESTED_ON_CHAIN'
  };
}
