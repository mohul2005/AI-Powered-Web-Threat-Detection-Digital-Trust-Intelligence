// Pre-configured High-Impact Security Intelligence Scenarios (Cybersecurity + AI + Web3)
export const PRECONFIGURED_SCENARIOS = [
  {
    id: 'emudhra-weak-key-incident',
    title: 'eMudhra TLS Incident: Rogue Certificate & Weak Key Anomaly',
    category: 'PKI & Trust Infrastructure',
    type: 'url',
    targetUrl: 'https://secure-login.gov-verify.in',
    description: 'Simulates the critical real-world eMudhra CA incident: An untrusted/weak intermediate CA generated flawed RSA keys with deficient entropy (duplicate modulus fingerprint) without verified Certificate Transparency (CT) proofs, attempting to impersonate a government portal.',
    severity: 'CRITICAL',
    expectedVerdict: 'MALICIOUS_PKI_SUBVERSION',
    mockData: {
      url: 'https://secure-login.gov-verify.in',
      domain: 'secure-login.gov-verify.in',
      trustScore: 12,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 28,
        verdict: 'SUSPICIOUS_GOV_IMPERSONATION',
        impersonatedBrand: 'Government of India (Digital Services)',
        signals: [
          'Domain mimics official gov.in namespace using hyphenated lookalike (gov-verify.in)',
          'High urgency text detected: "Aadhaar e-Sign Certificate expired - Immediate re-verification required"',
          'Presence of rogue KYC verification input harvesting citizen biometric tokens'
        ],
        entropy: 3.84,
        punycodeDetected: false,
        formFields: ['aadhaar_no', 'otp', 'pki_token_pin']
      },
      certTrust: {
        score: 5,
        verdict: 'COMPROMISED_CA_OR_WEAK_CRYPTO',
        issuer: {
          commonName: 'eMudhra Sub-CA Global Issuance 2024 (Untrusted / Flagged)',
          organization: 'eMudhra Technologies Ltd',
          country: 'IN'
        },
        subject: {
          commonName: 'secure-login.gov-verify.in',
          organization: 'National Digital Identity Gateway (Unverified)'
        },
        keyDetails: {
          algorithm: 'RSA',
          keySize: 1024,
          fingerprint256: 'E3:5B:C9:22:91:FA:B1:00:19:D8:74:AC:4F:99:31:02:44:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66',
          entropyRating: 'DEFICIENT_ENTROPY_DUPLICATE_MODULUS'
        },
        validity: {
          validFrom: '2026-11-01T00:00:00.000Z',
          validTo: '2026-12-01T00:00:00.000Z',
          daysRemaining: 24,
          isSelfSigned: false,
          isExpired: false
        },
        ctLogs: {
          present: false,
          verifiedSCTs: 0,
          status: 'UNLOGGED_IN_PUBLIC_CT_LOGS'
        },
        caTrustIncidentDetails: {
          incidentName: 'eMudhra CA Duplicate Key & Broken Entropy Audit Failure',
          cveOrAlert: 'CAB-FORUM-2024-ALERT-09',
          impact: 'CA key generation algorithm produced collision-vulnerable RSA moduli. Certificate not logged in Google Argon or Cloudflare Nimbus CT logs.',
          recommendation: 'Immediate revocation and root CA untrust enforcement.'
        },
        chain: [
          { name: 'Root CA: eMudhra Root PKI G2 (Flagged for Oversight)', valid: false, status: 'Under Review' },
          { name: 'Intermediate: eMudhra Sub-CA Global Issuance 2024', valid: false, status: 'Key Collision Detected' },
          { name: 'Leaf: secure-login.gov-verify.in', valid: false, status: 'Deficient 1024-bit RSA Key' }
        ]
      },
      webSec: {
        score: 22,
        grade: 'F',
        headers: {
          hsts: { status: 'MISSING', risk: 'HIGH', note: 'No HTTP Strict Transport Security header' },
          csp: { status: 'MISSING', risk: 'HIGH', note: 'Allows arbitrary script injection' },
          xFrameOptions: { status: 'MISSING', risk: 'MEDIUM', note: 'Clickjacking vulnerability' },
          xContentTypeOptions: { status: 'MISSING', risk: 'LOW' }
        },
        serverFingerprint: 'Apache/2.4.29 (Vulnerable legacy version exposed)',
        cookies: [{ name: 'AUTH_SESSION', secure: false, httpOnly: false, sameSite: 'None' }]
      },
      web3Security: {
        isWeb3Target: false,
        score: 100,
        riskLevel: 'LOW',
        drainerDetected: false,
        findings: ['Standard web infrastructure — zero crypto wallet interaction']
      },
      collaborativeIntel: {
        reputationScore: 8,
        communityVotes: { malicious: 184, benign: 2 },
        matchingThreatClusters: [
          { clusterId: 'CLUSTER-EMUDHRA-ROGUE-01', type: 'Rogue PKI Infrastructure', domainsCount: 14, sharedAsn: 'AS13335' }
        ],
        iocs: ['SHA256: e35bc92291fab10019d874ac4f993102448899aabbccddeeff00112233445566', 'IP: 198.51.100.42']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x3f98a12e84c98129038471209384719283749182374918273948172938471293',
        txHash: '0x9e4f1a2384719283749182739481729384712938471928374918273948172938',
        ipfsCid: 'bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku',
        blockNumber: 21094821,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Cryptographic Flaw', detail: 'Deficient 1024-bit RSA key length with verified duplicate modulus collision.' },
        { title: 'Certificate Transparency', detail: 'Zero public CT log receipts found in Google Argon or Cloudflare Nimbus.' },
        { title: 'Government Spoofing', detail: 'Deceptive domain suffix mimicking the official Indian National Portal.' }
      ],
      actionableGuidance: [
        'DO NOT download digital certificates or sign any document through this gateway.',
        'Add domain to enterprise DNS blocking filters immediately.',
        'Report rogue certificate serial to the CA/Browser Forum and CERT-In.'
      ]
    }
  },
  {
    id: 'web3-wallet-drainer-scam',
    title: 'Web3 Scam: Uniswap Airdrop Phishing & Permit2 Wallet Drainer',
    category: 'Web3 & Crypto Security',
    type: 'url',
    targetUrl: 'https://uniswap-airdrop-reward-claim.eth.limo',
    description: 'Impersonates Uniswap v4 on an IPFS/ENS gateway (.eth.limo). Injects malicious Permit2 and setApprovalForAll signatures to drain all ERC-20 and NFT tokens from connected Web3 wallets.',
    severity: 'CRITICAL',
    expectedVerdict: 'ACTIVE_WEB3_WALLET_DRAINER',
    mockData: {
      url: 'https://uniswap-airdrop-reward-claim.eth.limo',
      domain: 'uniswap-airdrop-reward-claim.eth.limo',
      trustScore: 9,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 12,
        verdict: 'CONFIRMED_WEB3_PHISHING',
        impersonatedBrand: 'Uniswap Labs',
        signals: [
          'Unauthorized use of Uniswap trademark on unverified decentralized ENS gateway',
          'Urgency trigger: "Season 3 Retroactive Airdrop Expires in 02:45:00"',
          'Fake wallet connection dialog simulating MetaMask, Phantom, and Coinbase'
        ],
        entropy: 3.96,
        punycodeDetected: false,
        formFields: ['wallet_address', 'seed_phrase_recovery']
      },
      certTrust: {
        score: 45,
        verdict: 'GATEWAY_WILDCARD_CERT',
        issuer: { commonName: 'Cloudflare Inc ECC CA-3', organization: 'Cloudflare', country: 'US' },
        subject: { commonName: '*.eth.limo' },
        keyDetails: { algorithm: 'ECDSA', keySize: 256, fingerprint256: '88:AA:11:BB:22:CC:33:DD:44:EE:55:FF:66:00:77:11:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77' },
        validity: { validFrom: '2026-09-01T00:00:00.000Z', validTo: '2027-09-01T00:00:00.000Z', daysRemaining: 290, isSelfSigned: false, isExpired: false },
        ctLogs: { present: true, verifiedSCTs: 2, status: 'LOGGED_WILDCARD' },
        chain: [{ name: 'Cloudflare Root', valid: true, status: 'Trusted' }, { name: 'Leaf: *.eth.limo', valid: true, status: 'Shared Proxy' }]
      },
      webSec: {
        score: 30,
        grade: 'D',
        headers: {
          hsts: { status: 'PRESENT', risk: 'NONE', note: 'Gateway HSTS' },
          csp: { status: 'MISSING', risk: 'HIGH', note: 'Allows external websocket drainer telemetry' }
        },
        serverFingerprint: 'Cloudflare Decentralized Gateway',
        cookies: []
      },
      web3Security: {
        isWeb3Target: true,
        score: 8,
        riskLevel: 'CRITICAL',
        impersonatedWeb3Brand: 'Uniswap',
        drainerDetected: true,
        findings: [
          'Malicious Permit2 Signature Trap: Injects eth_sign and Permit signature requesting unlimited spending allowance',
          'Fake Airdrop Lure: Unverified smart contract address 0x98f2...b18a attempting ERC-20 transferFrom',
          'Hosted on decentralized storage (IPFS / ENS) to evade ICANN domain takedowns'
        ]
      },
      collaborativeIntel: {
        reputationScore: 6,
        communityVotes: { malicious: 298, benign: 1 },
        matchingThreatClusters: [
          { clusterId: 'CLUSTER-DRAINER-PERMIT-09', type: 'Inferno / Pink Drainer Web3 Kit', domainsCount: 84, sharedAsn: 'AS13335' }
        ],
        iocs: ['CONTRACT: 0x98f281290381290384712093847129384712b18a', 'DOMAIN: uniswap-airdrop-reward-claim.eth.limo']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x88921bca91823749182739481729384712938471928374918273948172938471',
        txHash: '0x12a9f98237491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeih4982734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094890,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Web3 Wallet Drainer', detail: 'Script executes unauthorized Permit2 signature requests targeting token balances.' },
        { title: 'Decentralized IPFS Host', detail: 'Exploits ENS reverse-resolution proxy to bypass traditional DNS takedowns.' },
        { title: 'Brand Deception', detail: 'Unauthorized use of Uniswap trademark logos and interface design.' }
      ],
      actionableGuidance: [
        'DO NOT connect your MetaMask, Phantom, or hardware wallet to this website.',
        'If you signed any transaction on this site, go immediately to revoke.cash to revoke all token approvals.',
        'Transfer remaining crypto assets to a fresh, uncompromised wallet address.'
      ]
    }
  },
  {
    id: 'sbi-bank-credential-harvester',
    title: 'Financial Phishing: SBI Online Banking Homoglyph & OTP Harvester',
    category: 'Phishing & Brand Impersonation',
    type: 'url',
    targetUrl: 'https://onlinesbi.sbi-retailbanking-verify.xyz/login.php',
    description: 'Impersonates State Bank of India with a cloned netbanking layout, punycode lookalike, and aggressive credential harvesting fields capturing username, password, profile password, and SMS OTP.',
    severity: 'HIGH',
    expectedVerdict: 'ACTIVE_CREDENTIAL_HARVESTER',
    mockData: {
      url: 'https://onlinesbi.sbi-retailbanking-verify.xyz/login.php',
      domain: 'onlinesbi.sbi-retailbanking-verify.xyz',
      trustScore: 8,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 6,
        verdict: 'CONFIRMED_BANKING_PHISHING',
        impersonatedBrand: 'State Bank of India (SBI)',
        signals: [
          'Typosquatting domain using brand prefix on untrusted TLD (.xyz)',
          'Form action submits plaintext credentials to a foreign telegram bot webhook',
          'CSS & Favicon direct hotlinking from legitimate bank server',
          'Fake virtual keyboard overlay capturing keylogs'
        ],
        entropy: 4.12,
        punycodeDetected: true,
        formFields: ['username', 'password', 'profile_password', 'otp', 'card_cvv']
      },
      certTrust: {
        score: 35,
        verdict: 'LOW_ASSURANCE_DV_CERT',
        issuer: { commonName: "Let's Encrypt Authority X3", organization: 'ISRG', country: 'US' },
        subject: { commonName: 'onlinesbi.sbi-retailbanking-verify.xyz' },
        keyDetails: { algorithm: 'RSA', keySize: 2048, fingerprint256: '9A:44:11:88:FE:10:98:C1:22:90:33:11:AA:FF:CC:00' },
        validity: { validFrom: '2026-11-06T14:10:00.000Z', validTo: '2027-02-06T14:10:00.000Z', daysRemaining: 90, isSelfSigned: false, isExpired: false },
        ctLogs: { present: true, verifiedSCTs: 2, status: 'LOGGED_RECENTLY' },
        chain: [{ name: 'ISRG Root X1', valid: true, status: 'Trusted Root' }, { name: 'Leaf: onlinesbi.sbi-retailbanking-verify.xyz', valid: false, status: 'Age < 24 Hours' }]
      },
      webSec: {
        score: 18,
        grade: 'F',
        headers: { hsts: { status: 'MISSING', risk: 'HIGH', note: 'No HSTS' }, csp: { status: 'MISSING', risk: 'HIGH' } },
        serverFingerprint: 'nginx/1.18.0 (Ubuntu)',
        cookies: []
      },
      web3Security: {
        isWeb3Target: false,
        score: 100,
        riskLevel: 'LOW',
        drainerDetected: false,
        findings: ['Traditional banking phishing vector']
      },
      collaborativeIntel: {
        reputationScore: 4,
        communityVotes: { malicious: 312, benign: 0 },
        matchingThreatClusters: [
          { clusterId: 'CLUSTER-FINPHISH-IND-88', type: 'Banking Phish Kit V4', domainsCount: 68, sharedAsn: 'AS20473 (Choopa)' }
        ],
        iocs: ['DOMAIN: onlinesbi.sbi-retailbanking-verify.xyz', 'IP: 149.28.18.232']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x5518293847192837491827394817293847129384719283749182739481729384',
        txHash: '0x7728192837491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeih99182734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094850,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Brand Typosquatting', detail: 'Registered on .xyz domain with homoglyphic imitation of onlinesbi.sbi.' },
        { title: 'Credential Exfiltration', detail: 'Harvests netbanking passwords, OTPs, and card CVVs directly to external Telegram endpoint.' }
      ],
      actionableGuidance: [
        'DO NOT enter username, password, or OTP.',
        'Access netbanking exclusively via the official URL: https://onlinesbi.sbi.',
        'Report this phishing URL to the bank at report.phishing@sbi.co.in.'
      ]
    }
  },
  {
    id: 'sbi-smishing-sms-message',
    title: 'Smishing SMS: Fake SBI YONO Account Suspension Panic Lure',
    category: 'SMS & Smishing Fraud',
    type: 'message',
    targetUrl: 'Dear Customer, Your SBI YONO account will be blocked today! Please update your PAN immediately to avoid suspension. Click: http://bit.ly/sbi-pan-kyc-verify',
    description: 'Simulates a real-world telecom smishing message threatening immediate account block and coercing users into clicking an obfuscated shortlink to harvest PAN and banking credentials.',
    severity: 'HIGH',
    expectedVerdict: 'CONFIRMED_SMISHING_SMS',
    mockData: {
      type: 'MESSAGE',
      url: 'http://bit.ly/sbi-pan-kyc-verify',
      domain: 'bit.ly (Redirecting to rogue harvester)',
      trustScore: 7,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 8,
        verdict: 'CONFIRMED_SMISHING_ATTACK',
        impersonatedBrand: 'State Bank of India',
        signals: [
          'High urgency panic trigger: "Account will be blocked today"',
          'Obfuscated URL shortener used to bypass mobile telecom spam filters',
          'Unsolicited request to submit PAN and banking KYC credentials'
        ],
        entropy: 3.8,
        punycodeDetected: false,
        formFields: ['pan_number', 'yono_password', 'otp']
      },
      certTrust: { score: 20, verdict: 'HTTP_REDIRECT', issuer: { commonName: 'None' }, keyDetails: { keySize: 0, algorithm: 'None' }, ctLogs: { present: false, status: 'UNPROTECTED' }, chain: [] },
      webSec: { score: 10, grade: 'F', headers: { hsts: { status: 'MISSING' }, csp: { status: 'MISSING' } }, cookies: [] },
      web3Security: { isWeb3Target: false, score: 100, riskLevel: 'LOW', drainerDetected: false, findings: ['SMS telecommunication fraud'] },
      collaborativeIntel: {
        reputationScore: 5,
        communityVotes: { malicious: 412, benign: 0 },
        matchingThreatClusters: [{ clusterId: 'CLUSTER-SMISH-IND-24', type: 'SMS KYC Gang', domainsCount: 110, sharedAsn: 'Telecom Bulk SMS' }],
        iocs: ['SHORTLINK: bit.ly/sbi-pan-kyc-verify', 'LURE: YONO Account Suspension']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x2218293847192837491827394817293847129384719283749182739481729384',
        txHash: '0x4428192837491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeih66182734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094895,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Deceptive Shortlink', detail: 'Uses bit.ly redirection to conceal malicious landing page.' },
        { title: 'Regulatory Impersonation', detail: 'Falsely cites mandatory PAN-Aadhaar linking to induce compliance.' }
      ],
      actionableGuidance: [
        'NEVER share OTP, CVV, or passwords in response to an SMS.',
        'Banks never ask you to update KYC via bit.ly or third-party links.',
        'Report this smishing number immediately to 1930 / cybercrime.gov.in.'
      ]
    }
  },
  {
    id: 'github-enterprise-legitimate-baseline',
    title: 'Enterprise Baseline: Legitimate Verified Platform (GitHub)',
    category: 'Verified Digital Trust',
    type: 'url',
    targetUrl: 'https://github.com',
    description: 'Demonstrates a secure, fully compliant digital platform with EV/OV certificate transparency, hardened HTTP security headers, strong cryptography, and an authoritative trust rating.',
    severity: 'SAFE',
    expectedVerdict: 'VERIFIED_TRUSTED_ORGANIZATION',
    mockData: {
      url: 'https://github.com',
      domain: 'github.com',
      trustScore: 98,
      threatLevel: 'SAFE',
      aiPhishing: {
        score: 99,
        verdict: 'OFFICIAL_AUTHENTIC_PLATFORM',
        impersonatedBrand: null,
        signals: [
          'Authoritative verified domain matching official brand identity',
          'Clean structural DOM with zero fraudulent credential harvesting redirects',
          'Strict TLS enforcement and subresource integrity checks'
        ],
        entropy: 2.82,
        punycodeDetected: false,
        formFields: ['login', 'password']
      },
      certTrust: {
        score: 98,
        verdict: 'HARDENED_ENTERPRISE_CERTIFICATE',
        issuer: { commonName: 'DigiCert Global G2 TLS RSA SHA256 2020 CA1', organization: 'DigiCert Inc', country: 'US' },
        subject: { commonName: 'github.com', organization: 'GitHub, Inc.', country: 'US' },
        keyDetails: { algorithm: 'RSA', keySize: 2048, fingerprint256: '3E:8F:A1:7B:99:4C:12:00:88:F2:AA:BC:DE:F0:12:34' },
        validity: { validFrom: '2026-03-01T00:00:00.000Z', validTo: '2027-03-15T23:59:59.000Z', daysRemaining: 128, isSelfSigned: false, isExpired: false },
        ctLogs: { present: true, verifiedSCTs: 3, status: 'COMPREHENSIVE_CT_LOG_PROOF' },
        chain: [{ name: 'DigiCert Global Root G2', valid: true, status: 'Trusted Root CA' }, { name: 'Leaf: github.com', valid: true, status: 'EV Validated' }]
      },
      webSec: {
        score: 96,
        grade: 'A+',
        headers: {
          hsts: { status: 'PRESENT', risk: 'NONE', value: 'max-age=31536000; includeSubDomains; preload' },
          csp: { status: 'PRESENT', risk: 'NONE', value: 'default-src \'none\'' },
          xFrameOptions: { status: 'PRESENT', risk: 'NONE', value: 'DENY' }
        },
        serverFingerprint: 'GitHub Gateway (Hardened, banners stripped)',
        cookies: [{ name: '_gh_sess', secure: true, httpOnly: true, sameSite: 'Lax' }]
      },
      web3Security: {
        isWeb3Target: false,
        score: 100,
        riskLevel: 'SAFE',
        drainerDetected: false,
        findings: ['Clean verified developer platform']
      },
      collaborativeIntel: {
        reputationScore: 99,
        communityVotes: { malicious: 1, benign: 4890 },
        matchingThreatClusters: [],
        iocs: []
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x1182938471928374918273948172938471293847192837491827394817293847',
        txHash: '0x3328192837491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeih11182734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094800,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Legitimate Ownership', detail: 'Verified Organization Validated certificate issued to GitHub, Inc.' },
        { title: 'Hardened Transport', detail: 'HSTS preloaded with comprehensive Content Security Policy.' }
      ],
      actionableGuidance: [
        'This website is authentic and cryptographically verified.',
        'Ensure you keep 2-Factor Authentication (2FA) active on your account.'
      ]
    }
  }
];
