// Pre-configured High-Impact Scenarios Aligned with Problem Statement Section A:
// 1. Fake banking/payment 2. University/Exam 3. Government/Tax 4. Parcel delivery 5. Job portal 6. Social media recovery 7. Open redirect chain 8. PKI eMudhra 9. Web3 Drainer

export const PRECONFIGURED_SCENARIOS = [
  {
    id: 'emudhra-weak-key-incident',
    title: 'eMudhra TLS Incident: Rogue Certificate & Weak Key Anomaly',
    category: 'PKI & Trust Infrastructure',
    type: 'url',
    targetUrl: 'https://secure-login.gov-verify.in',
    description: 'Simulates the eMudhra CA incident: An untrusted/weak intermediate CA generated flawed RSA keys with deficient entropy (duplicate modulus fingerprint) without verified Certificate Transparency (CT) proofs.',
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
        officialBrandDomain: 'india.gov.in',
        identityMismatch: true,
        signals: [
          'Domain mimics official gov.in namespace using hyphenated lookalike (gov-verify.in)',
          'High urgency text: "Aadhaar e-Sign Certificate expired - Immediate re-verification required"',
          'Presence of rogue KYC verification input harvesting citizen biometric tokens'
        ],
        entropy: 3.84,
        punycodeDetected: false,
        formFields: ['aadhaar_no', 'otp', 'pki_token_pin'],
        embeddedRedirects: [],
        preClickRecommendation: '🛑 DO NOT OPEN: Cryptographic PKI subversion and government identity mismatch.'
      },
      certTrust: {
        score: 5,
        verdict: 'COMPROMISED_CA_OR_WEAK_CRYPTO',
        issuer: { commonName: 'eMudhra Sub-CA Global Issuance 2024 (Untrusted / Flagged)', organization: 'eMudhra Technologies Ltd', country: 'IN' },
        subject: { commonName: 'secure-login.gov-verify.in', organization: 'National Digital Identity Gateway (Unverified)' },
        keyDetails: { algorithm: 'RSA', keySize: 1024, fingerprint256: 'E3:5B:C9:22:91:FA:B1:00:19:D8:74:AC:4F:99:31:02:44:88:99:AA', entropyRating: 'DEFICIENT_ENTROPY_DUPLICATE_MODULUS' },
        validity: { validFrom: '2026-11-01T00:00:00.000Z', validTo: '2026-12-01T00:00:00.000Z', daysRemaining: 24, isSelfSigned: false, isExpired: false },
        ctLogs: { present: false, verifiedSCTs: 0, status: 'UNLOGGED_IN_PUBLIC_CT_LOGS' },
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
        headers: { hsts: { status: 'MISSING', risk: 'HIGH', note: 'No HSTS' }, csp: { status: 'MISSING', risk: 'HIGH' } },
        serverFingerprint: 'Apache/2.4.29 (Vulnerable legacy version exposed)',
        cookies: []
      },
      web3Security: { isWeb3Target: false, score: 100, riskLevel: 'LOW', drainerDetected: false, findings: [] },
      collaborativeIntel: {
        reputationScore: 8,
        communityVotes: { malicious: 184, benign: 2 },
        matchingThreatClusters: [{ clusterId: 'CLUSTER-EMUDHRA-ROGUE-01', type: 'Rogue PKI Infrastructure', domainsCount: 14, sharedAsn: 'AS13335' }],
        iocs: ['SHA256: e35bc92291fab10019d874ac4f993102448899aabbccddeeff00112233445566', 'IP: 198.51.100.42']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x3f98a12e84c98129038471209384719283749182374918273948172938471293',
        txHash: '0x9e4f1a2384719283749182739481729384719283749182739481729384712938',
        ipfsCid: 'bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku',
        blockNumber: 21094821,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Cryptographic Flaw', detail: 'Deficient 1024-bit RSA key length with verified duplicate modulus collision.' },
        { title: 'Certificate Transparency', detail: 'Zero public CT log receipts found in Google Argon or Cloudflare Nimbus.' },
        { title: 'Identity Mismatch', detail: 'Claims identity of official Indian Government portal but hosted on rogue domain.' }
      ],
      actionableGuidance: [
        'DO NOT download digital certificates or sign any document through this gateway.',
        'Add domain to enterprise DNS blocking filters immediately.',
        'Report rogue certificate serial to the CA/Browser Forum and CERT-In.'
      ]
    }
  },
  {
    id: 'parcel-delivery-customs-scam',
    title: 'Parcel Delivery Scam: India Post / FedEx Redelivery Phish',
    category: 'Parcel Delivery & Logistics',
    type: 'url',
    targetUrl: 'https://indiapost-speedpost-customs-pay.xyz/track?redirect=https://payment-card-vault.top',
    description: 'Simulates fake package delivery link claiming a parcel is held at the sorting hub due to missing address or unpaid customs fee, embedding an external redirect to exfiltrate credit card data.',
    severity: 'CRITICAL',
    expectedVerdict: 'CONFIRMED_PARCEL_DELIVERY_SCAM',
    mockData: {
      url: 'https://indiapost-speedpost-customs-pay.xyz/track?redirect=https://payment-card-vault.top',
      domain: 'indiapost-speedpost-customs-pay.xyz',
      trustScore: 8,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 6,
        verdict: 'CONFIRMED_PARCEL_DELIVERY_SCAM',
        impersonatedBrand: 'India Post',
        officialBrandDomain: 'indiapost.gov.in',
        identityMismatch: true,
        signals: [
          'Identity Mismatch: Claims to be India Post (official: indiapost.gov.in) on untrusted .xyz domain',
          'Embedded Redirect Parameter: Contains query parameter ?redirect= targeting external unverified domain',
          'Delivery lure: "Package #IN-88912 detained due to unpaid customs fee of ₹25"'
        ],
        entropy: 3.92,
        punycodeDetected: false,
        formFields: ['recipient_name', 'card_number', 'expiry', 'cvv', 'card_pin'],
        embeddedRedirects: [{ param: 'redirect', destination: 'https://payment-card-vault.top', isExternal: true }],
        preClickRecommendation: '🛑 DO NOT OPEN: Dangerous parcel fee skimmer harvesting payment cards.'
      },
      certTrust: {
        score: 30,
        verdict: 'ANONYMOUS_DV_CERT',
        issuer: { commonName: "Let's Encrypt Authority", organization: 'ISRG', country: 'US' },
        subject: { commonName: 'indiapost-speedpost-customs-pay.xyz' },
        keyDetails: { algorithm: 'RSA', keySize: 2048, fingerprint256: '11:22:33:44:55:66:77:88:99:00:AA:BB:CC:DD:EE:FF' },
        validity: { validFrom: '2026-11-05T00:00:00.000Z', validTo: '2027-02-05T00:00:00.000Z', daysRemaining: 88, isSelfSigned: false, isExpired: false },
        ctLogs: { present: true, verifiedSCTs: 2, status: 'LOGGED' },
        chain: [{ name: 'Let\'s Encrypt Intermediate', valid: true, status: 'Active' }, { name: 'Leaf: indiapost-speedpost-customs-pay.xyz', valid: false, status: 'Recent Domain < 48h' }]
      },
      webSec: {
        score: 15,
        grade: 'F',
        headers: { hsts: { status: 'MISSING', risk: 'HIGH', note: 'No HSTS' }, csp: { status: 'MISSING', risk: 'HIGH' } },
        serverFingerprint: 'LiteSpeed / Nginx',
        cookies: []
      },
      web3Security: { isWeb3Target: false, score: 100, riskLevel: 'LOW', drainerDetected: false, findings: [] },
      collaborativeIntel: {
        reputationScore: 5,
        communityVotes: { malicious: 382, benign: 0 },
        matchingThreatClusters: [{ clusterId: 'CLUSTER-PARCEL-GANG-44', type: 'SpeedPost Card Skimmer Gang', domainsCount: 52, sharedAsn: 'AS46603' }],
        iocs: ['DOMAIN: indiapost-speedpost-customs-pay.xyz', 'REDIRECT: payment-card-vault.top']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x4481928374918273948172938471293847192837491827394817293847129384',
        txHash: '0x6628192837491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeih88182734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094892,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Identity Spoofing', detail: 'Claims India Post identity (official: indiapost.gov.in) but hosted on disposable .xyz TLD.' },
        { title: 'Embedded Open Redirect', detail: 'Redirects payment card submission to third-party vault domain payment-card-vault.top.' },
        { title: 'Payment Skimmer Form', detail: 'Harvests full credit card number, CVV, and ATM PIN.' }
      ],
      actionableGuidance: [
        'DO NOT enter debit or credit card details on this link.',
        'Postal services NEVER demand small ₹25 delivery fee payments via SMS/WhatsApp links.',
        'Track parcels exclusively via the official website: https://indiapost.gov.in.'
      ]
    }
  },
  {
    id: 'university-admission-exam-scam',
    title: 'University / Exam Fraud: NTA NEET-JEE Admit Card Fee Phish',
    category: 'Education & Examination Portals',
    type: 'url',
    targetUrl: 'https://nta-neet-admissions-hallticket.site/download',
    description: 'Impersonates the National Testing Agency (NTA) for university admissions and exams. Coerces students into paying a "mandatory exam hall-ticket release fee".',
    severity: 'HIGH',
    expectedVerdict: 'CONFIRMED_EXAM_PORTAL_FRAUD',
    mockData: {
      url: 'https://nta-neet-admissions-hallticket.site/download',
      domain: 'nta-neet-admissions-hallticket.site',
      trustScore: 11,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 10,
        verdict: 'CONFIRMED_EXAM_PORTAL_FRAUD',
        impersonatedBrand: 'National Testing Agency (NTA)',
        officialBrandDomain: 'nta.ac.in',
        identityMismatch: true,
        signals: [
          'Identity Mismatch: Claims NTA identity (official: nta.ac.in) on .site domain',
          'Exam Fee Extortion: Requests payment for student admit card/hall ticket download',
          'Harvests candidate roll numbers, date of birth, and parents mobile numbers'
        ],
        entropy: 3.86,
        punycodeDetected: false,
        formFields: ['application_number', 'dob', 'parent_phone', 'upi_pay'],
        embeddedRedirects: [],
        preClickRecommendation: '🛑 DO NOT OPEN: Fraudulent examination fee portal.'
      },
      certTrust: { score: 35, verdict: 'LOW_REPUTATION_DV', issuer: { commonName: 'cPanel Inc CA' }, keyDetails: { algorithm: 'RSA', keySize: 2048 }, ctLogs: { present: true, status: 'LOGGED' }, chain: [] },
      webSec: { score: 20, grade: 'F', headers: { hsts: { status: 'MISSING' }, csp: { status: 'MISSING' } }, cookies: [] },
      web3Security: { isWeb3Target: false, score: 100, riskLevel: 'LOW', drainerDetected: false, findings: [] },
      collaborativeIntel: {
        reputationScore: 8,
        communityVotes: { malicious: 215, benign: 0 },
        matchingThreatClusters: [{ clusterId: 'CLUSTER-EXAM-FRAUD-26', type: 'Fake Admit Card Syndicate', domainsCount: 31, sharedAsn: 'AS20473' }],
        iocs: ['DOMAIN: nta-neet-admissions-hallticket.site']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x9981928374918273948172938471293847192837491827394817293847129384',
        txHash: '0x1128192837491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeih77182734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094894,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Academic Entity Spoof', detail: 'Falsely mimics official National Testing Agency examination systems.' },
        { title: 'Admit Card Paywall', detail: 'Demands unauthorized payment to release government exam credentials.' }
      ],
      actionableGuidance: [
        'Do not pay any fee on this website. Official admit cards are always released free on nta.ac.in.',
        'Verify exam notifications only at https://nta.ac.in.',
        'Report this URL to the NTA cyber grievance cell.'
      ]
    }
  },
  {
    id: 'government-echallan-traffic-fine',
    title: 'Government Service: Fake Parivahan e-Challan Traffic Fine Portal',
    category: 'Government & Tax Portals',
    type: 'url',
    targetUrl: 'https://echallan-parivahan-traffic-pay.top/fine',
    description: 'Impersonates the Ministry of Road Transport Parivahan e-Challan portal. Threatens vehicle seizure or court summons unless a fake traffic penalty is paid immediately.',
    severity: 'CRITICAL',
    expectedVerdict: 'CONFIRMED_GOV_CHALLAN_FRAUD',
    mockData: {
      url: 'https://echallan-parivahan-traffic-pay.top/fine',
      domain: 'echallan-parivahan-traffic-pay.top',
      trustScore: 9,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 7,
        verdict: 'CONFIRMED_GOV_CHALLAN_FRAUD',
        impersonatedBrand: 'Parivahan e-Challan (Traffic Fines)',
        officialBrandDomain: 'echallan.parivahan.gov.in',
        identityMismatch: true,
        signals: [
          'Identity Mismatch: Claims Parivahan (official: echallan.parivahan.gov.in) on .top domain',
          'Urgency threat: "Fine unpaid. Arrest warrant issued in 48 hours unless paid"',
          'Payment Gateway routes to personal scammer UPI IDs'
        ],
        entropy: 3.94,
        punycodeDetected: false,
        formFields: ['vehicle_reg_no', 'chassis_no', 'upi_pin'],
        embeddedRedirects: [],
        preClickRecommendation: '🛑 DO NOT OPEN: Fake traffic fine portal routing funds to scammers.'
      },
      certTrust: { score: 30, verdict: 'CHEAP_DV', issuer: { commonName: 'ZeroSSL CA' }, keyDetails: { algorithm: 'ECDSA', keySize: 256 }, ctLogs: { present: true, status: 'LOGGED' }, chain: [] },
      webSec: { score: 15, grade: 'F', headers: { hsts: { status: 'MISSING' }, csp: { status: 'MISSING' } }, cookies: [] },
      web3Security: { isWeb3Target: false, score: 100, riskLevel: 'LOW', drainerDetected: false, findings: [] },
      collaborativeIntel: {
        reputationScore: 6,
        communityVotes: { malicious: 260, benign: 0 },
        matchingThreatClusters: [{ clusterId: 'CLUSTER-CHALLAN-GANG-12', type: 'Fake Traffic Fine Syndicate', domainsCount: 44, sharedAsn: 'AS57523' }],
        iocs: ['DOMAIN: echallan-parivahan-traffic-pay.top', 'UPI: trafficfines-morth@ibl']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x3381928374918273948172938471293847192837491827394817293847129384',
        txHash: '0x5528192837491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeih55182734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094893,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Government Impersonation', detail: 'Falsely incorporates Ministry of Road Transport emblems and keywords.' },
        { title: 'Fake Penalty Demand', detail: 'Threatens vehicle confiscation and directs UPI payments to private accounts.' }
      ],
      actionableGuidance: [
        'DO NOT make any payment on this portal.',
        'Check genuine challans exclusively on the official government website: https://echallan.parivahan.gov.in.',
        'Forward this scam URL to 1930 / cybercrime.gov.in.'
      ]
    }
  },
  {
    id: 'instagram-copyright-recovery-phish',
    title: 'Social Media / Account Recovery: Instagram Copyright Appeal Phish',
    category: 'Social Media & Account Recovery',
    type: 'url',
    targetUrl: 'https://instagram-copyright-appeal-center.cam/verify?next=https://malicious-token-sniff.top',
    description: 'Impersonates Instagram Security and Copyright Support. Informs influencers their account will be deleted in 24 hours for copyright infringement, capturing passwords and 2FA backup codes.',
    severity: 'CRITICAL',
    expectedVerdict: 'CONFIRMED_SOCIAL_MEDIA_PHISHING',
    mockData: {
      url: 'https://instagram-copyright-appeal-center.cam/verify?next=https://malicious-token-sniff.top',
      domain: 'instagram-copyright-appeal-center.cam',
      trustScore: 7,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 6,
        verdict: 'CONFIRMED_SOCIAL_MEDIA_PHISHING',
        impersonatedBrand: 'Instagram',
        officialBrandDomain: 'instagram.com',
        identityMismatch: true,
        signals: [
          'Identity Mismatch: Claims Instagram identity on suspicious .cam TLD',
          'Copyright coercion: "Account scheduled for permanent deletion in 24 hours"',
          'Embedded Redirect Parameter: Embeds parameter ?next= targeting malicious external token sniffer'
        ],
        entropy: 3.98,
        punycodeDetected: false,
        formFields: ['username', 'password', '2fa_backup_code'],
        embeddedRedirects: [{ param: 'next', destination: 'https://malicious-token-sniff.top', isExternal: true }],
        preClickRecommendation: '🛑 DO NOT OPEN: Account takeover phish targeting Instagram credentials.'
      },
      certTrust: { score: 35, verdict: 'CHEAP_DV', issuer: { commonName: 'Let\'s Encrypt' }, keyDetails: { algorithm: 'RSA', keySize: 2048 }, ctLogs: { present: true, status: 'LOGGED' }, chain: [] },
      webSec: { score: 15, grade: 'F', headers: { hsts: { status: 'MISSING' }, csp: { status: 'MISSING' } }, cookies: [] },
      web3Security: { isWeb3Target: false, score: 100, riskLevel: 'LOW', drainerDetected: false, findings: [] },
      collaborativeIntel: {
        reputationScore: 5,
        communityVotes: { malicious: 290, benign: 0 },
        matchingThreatClusters: [{ clusterId: 'CLUSTER-IG-TAKEOVER-99', type: 'Influencer Account Takeover Syndicate', domainsCount: 65, sharedAsn: 'AS20473' }],
        iocs: ['DOMAIN: instagram-copyright-appeal-center.cam', 'NEXT_DEST: malicious-token-sniff.top']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x2281928374918273948172938471293847192837491827394817293847129384',
        txHash: '0x8828192837491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeih22182734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094896,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Social Media Takeover', detail: 'Simulates Instagram security warning to hijack accounts and 2FA recovery codes.' },
        { title: 'Embedded External Redirect', detail: 'Chains authentication credentials directly into external token collector.' }
      ],
      actionableGuidance: [
        'DO NOT enter your Instagram password or 2FA codes.',
        'Meta/Instagram never issues copyright notices via third-party websites or DMs.',
        'Review official copyright notices exclusively inside the Instagram App -> Settings -> Help -> Support Requests.'
      ]
    }
  },
  {
    id: 'web3-wallet-drainer-scam',
    title: 'Web3 Crypto Scam: Uniswap Airdrop Phishing & Permit2 Wallet Drainer',
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
        impersonatedBrand: 'Uniswap Protocol',
        officialBrandDomain: 'uniswap.org',
        identityMismatch: true,
        signals: [
          'Unauthorized use of Uniswap trademark on unverified decentralized ENS gateway',
          'Urgency trigger: "Season 3 Retroactive Airdrop Expires in 02:45:00"',
          'Fake wallet connection dialog simulating MetaMask, Phantom, and Coinbase'
        ],
        entropy: 3.96,
        punycodeDetected: false,
        formFields: ['wallet_address', 'seed_phrase_recovery'],
        embeddedRedirects: [],
        preClickRecommendation: '🛑 DO NOT OPEN: Malicious Web3 smart contract wallet drainer.'
      },
      certTrust: { score: 45, verdict: 'GATEWAY_WILDCARD_CERT', issuer: { commonName: 'Cloudflare Inc ECC CA-3' }, keyDetails: { algorithm: 'ECDSA', keySize: 256 }, ctLogs: { present: true, status: 'LOGGED_WILDCARD' }, chain: [] },
      webSec: { score: 30, grade: 'D', headers: { hsts: { status: 'PRESENT' }, csp: { status: 'MISSING' } }, cookies: [] },
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
        matchingThreatClusters: [{ clusterId: 'CLUSTER-DRAINER-PERMIT-09', type: 'Inferno / Pink Drainer Web3 Kit', domainsCount: 84, sharedAsn: 'AS13335' }],
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
        { title: 'Decentralized IPFS Host', detail: 'Exploits ENS reverse-resolution proxy to bypass traditional DNS takedowns.' }
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
    category: 'Banking & Payment Gateways',
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
        impersonatedBrand: 'State Bank of India',
        officialBrandDomain: 'onlinesbi.sbi',
        identityMismatch: true,
        signals: [
          'Typosquatting domain using brand prefix on untrusted TLD (.xyz)',
          'Form action submits plaintext credentials to a foreign telegram bot webhook',
          'CSS & Favicon direct hotlinking from legitimate bank server'
        ],
        entropy: 4.12,
        punycodeDetected: true,
        formFields: ['username', 'password', 'profile_password', 'otp', 'card_cvv'],
        embeddedRedirects: [],
        preClickRecommendation: '🛑 DO NOT OPEN: Cloned banking portal stealing passwords and SMS OTPs.'
      },
      certTrust: { score: 35, verdict: 'LOW_ASSURANCE_DV_CERT', issuer: { commonName: "Let's Encrypt Authority" }, keyDetails: { algorithm: 'RSA', keySize: 2048 }, ctLogs: { present: true, status: 'LOGGED' }, chain: [] },
      webSec: { score: 18, grade: 'F', headers: { hsts: { status: 'MISSING' }, csp: { status: 'MISSING' } }, cookies: [] },
      web3Security: { isWeb3Target: false, score: 100, riskLevel: 'LOW', drainerDetected: false, findings: [] },
      collaborativeIntel: {
        reputationScore: 4,
        communityVotes: { malicious: 312, benign: 0 },
        matchingThreatClusters: [{ clusterId: 'CLUSTER-FINPHISH-IND-88', type: 'Banking Phish Kit V4', domainsCount: 68, sharedAsn: 'AS20473' }],
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
    id: 'tech-support-anydesk-scam',
    title: 'Tech Support Scam: Windows Defender Alert & AnyDesk Remote Access',
    category: 'Tech Support & Remote Access',
    type: 'message',
    targetUrl: 'CRITICAL ALERT from Microsoft Windows Defender: Trojan:Win32/Zeus virus detected on your PC. System security compromised. Call Toll-Free Helpline: 1800-419-0122 immediately or install AnyDesk for certified technician support.',
    description: 'Simulates a technical support deception tricking users into believing their computer is infected with a Trojan, coercing them into calling a rogue call center and installing AnyDesk remote-access software.',
    severity: 'CRITICAL',
    expectedVerdict: 'CONFIRMED_TECH_SUPPORT_SCAM',
    mockData: {
      type: 'MESSAGE',
      url: 'CRITICAL ALERT from Microsoft Windows Defender: Trojan:Win32/Zeus...',
      domain: 'Tech Support Fraud',
      trustScore: 6,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 5,
        verdict: 'CONFIRMED_TECH_SUPPORT_SCAM',
        impersonatedBrand: 'Microsoft Windows Defender',
        officialBrandDomain: 'microsoft.com',
        identityMismatch: true,
        signals: [
          'High-threat coercion: False virus infection alert claiming "Trojan:Win32/Zeus"',
          'Remote desktop exploitation: Directs victim to install AnyDesk remote control software',
          'Rogue call center: Demands immediate call to fake toll-free helpline 1800-419-0122'
        ],
        entropy: 3.82,
        punycodeDetected: false,
        formFields: [],
        embeddedRedirects: [],
        preClickRecommendation: '🛑 DO NOT CALL / DO NOT INSTALL: High-risk tech support scam seeking remote control of your computer.'
      },
      certTrust: { score: 100, verdict: 'N/A_SMS', issuer: { commonName: 'Direct Communication' }, keyDetails: { algorithm: 'N/A', keySize: 0 }, ctLogs: { present: true, status: 'N/A' }, chain: [] },
      webSec: { score: 100, grade: 'A', headers: { hsts: { status: 'PRESENT' } }, cookies: [] },
      web3Security: { isWeb3Target: false, score: 100, riskLevel: 'LOW', drainerDetected: false, findings: [] },
      collaborativeIntel: {
        reputationScore: 4,
        communityVotes: { malicious: 680, benign: 0 },
        matchingThreatClusters: [{ clusterId: 'CLUSTER-TECH-SUPPORT-SYNDICATE-09', type: 'AnyDesk Remote Hijacking Syndicate', domainsCount: 140, sharedAsn: 'N/A' }],
        iocs: ['HELPLINE: 1800-419-0122', 'TOOL: AnyDesk Remote Access']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x9991928374918273948172938471293847192837491827394817293847129384',
        txHash: '0xaaa8192837491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeih99982734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094901,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Remote Access Threat', detail: 'Instructs victim to install AnyDesk, granting scammers unrestricted remote keyboard and file control.' },
        { title: 'Microsoft Support Impersonation', detail: 'Microsoft never sends text popups demanding phone calls or third-party remote software installation.' }
      ],
      actionableGuidance: [
        'DO NOT call the number or install AnyDesk / TeamViewer.',
        'If already installed, disconnect from Wi-Fi immediately and uninstall the remote desktop application.',
        'Report the rogue helpline to 1930 / cybercrime.gov.in.'
      ],
      scamForensics: {
        scamScore: 6,
        threatLevel: 'CRITICAL',
        primaryCategory: { id: 'TECH_SUPPORT_REMOTE_ACCESS', title: 'Fake Tech Support & Remote-Access Scam' },
        indicators: {
          suspiciousLanguage: { detected: true, findings: ['False virus infection alert claiming "Trojan:Win32/Zeus" to induce severe panic.'] },
          impersonation: { detected: true, entity: 'Microsoft Windows Defender', findings: ['Impersonates official Microsoft Windows security alerts.'] },
          unusualPayments: { detected: false, findings: [] },
          misleadingLinks: { detected: false, findings: [] },
          sensitiveInfoHarvest: { detected: false, findings: [] },
          remoteAccessTools: { detected: true, findings: ['Instructs victim to install AnyDesk remote access software to hijack screen and files.'] }
        },
        plainEnglishAssessment: 'CRITICAL REMOTE ACCESS SCAM: The alert is entirely fraudulent. Scammers use scareware to convince you that your PC is infected, directing you to install AnyDesk so they can remotely compromise your device.'
      }
    }
  },
  {
    id: 'kbc-lottery-prize-scam',
    title: 'Prize & Giveaway Fraud: KBC Lucky Draw ₹25 Lakh WhatsApp Lottery',
    category: 'Giveaway & Prize Fraud',
    type: 'message',
    targetUrl: 'Dear Customer, Congratulations! Your mobile number has won ₹25,00,000 cash prize in KBC All India Lucky Draw 2026. Deposit refundable tax fee of ₹12,500 via UPI to Manager Rajesh Sharma to release funds: http://bit.ly/kbc-prize-claim-2026',
    description: 'Impersonates Kaun Banega Crorepati (KBC) lottery. Informs victims their phone number won a ₹25 lakh cash award, demanding an upfront "refundable registration tax" via UPI.',
    severity: 'CRITICAL',
    expectedVerdict: 'CONFIRMED_ADVANCE_FEE_FRAUD',
    mockData: {
      type: 'MESSAGE',
      url: 'Dear Customer, Congratulations! Your mobile number has won ₹25,00,000...',
      domain: 'KBC Lottery Syndicate',
      trustScore: 7,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 6,
        verdict: 'CONFIRMED_ADVANCE_FEE_FRAUD',
        impersonatedBrand: 'KBC All India Lucky Draw',
        officialBrandDomain: 'sonyliv.com',
        identityMismatch: true,
        signals: [
          'Advance Fee Fraud: Mandates upfront ₹12,500 "refundable tax fee" to release nonexistent prize',
          'Fake lottery notification: Unsolicited prize claiming ₹25,00,000 lottery win',
          'Shortened tracking link: Obfuscates destination using bit.ly/kbc-prize-claim-2026'
        ],
        entropy: 3.91,
        punycodeDetected: false,
        formFields: [],
        embeddedRedirects: [],
        preClickRecommendation: '🛑 DO NOT OPEN / DO NOT PAY: Advance fee fraud stealing upfront registration deposits.'
      },
      certTrust: { score: 100, verdict: 'N/A_SMS', issuer: { commonName: 'Telecom SMS' }, keyDetails: { algorithm: 'N/A', keySize: 0 }, ctLogs: { present: true, status: 'N/A' }, chain: [] },
      webSec: { score: 100, grade: 'A', headers: { hsts: { status: 'PRESENT' } }, cookies: [] },
      web3Security: { isWeb3Target: false, score: 100, riskLevel: 'LOW', drainerDetected: false, findings: [] },
      collaborativeIntel: {
        reputationScore: 5,
        communityVotes: { malicious: 890, benign: 0 },
        matchingThreatClusters: [{ clusterId: 'CLUSTER-KBC-LOTTERY-FRAUD-55', type: 'KBC Advance Fee Syndicate', domainsCount: 220, sharedAsn: 'N/A' }],
        iocs: ['SHORTLINK: bit.ly/kbc-prize-claim-2026', 'UPI: kbcmanager-tax@apl']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0xbbb1928374918273948172938471293847192837491827394817293847129384',
        txHash: '0xccc8192837491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeihbbb82734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094902,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Advance Fee Fraud', detail: 'Demands ₹12,500 advance deposit via personal UPI ID to release fictitious lottery winnings.' },
        { title: 'Unsolicited Prize Lure', detail: 'You cannot win a lottery you never purchased a ticket for.' }
      ],
      actionableGuidance: [
        'NEVER pay money to claim a prize or lottery. Legitimate contests deduct applicable tax at source (TDS).',
        'Delete and block the message immediately.',
        'Forward the sender number to the Department of Telecommunications Chakshu portal (sancharsaathi.gov.in).'
      ],
      scamForensics: {
        scamScore: 7,
        threatLevel: 'CRITICAL',
        primaryCategory: { id: 'FAKE_GIVEAWAY_PRIZE', title: 'Fake Giveaway & Prize Notification' },
        indicators: {
          suspiciousLanguage: { detected: true, findings: ['Unsolicited prize claiming ₹25,00,000 lottery win without entering a contest.'] },
          impersonation: { detected: true, entity: 'KBC All India Lucky Draw', findings: ['Impersonates Kaun Banega Crorepati TV franchise.'] },
          unusualPayments: { detected: true, findings: ['Demands ₹12,500 advance "refundable tax deposit" via personal UPI ID.'] },
          misleadingLinks: { detected: true, findings: ['Shortened link bit.ly/kbc-prize-claim-2026 hides actual destination.'] },
          sensitiveInfoHarvest: { detected: false, findings: [] },
          remoteAccessTools: { detected: false, findings: [] }
        },
        plainEnglishAssessment: 'CRITICAL ADVANCE-FEE LOTTERY SCAM: You cannot win a lottery you never bought a ticket for. Fraudsters demand upfront processing taxes to steal your money.'
      }
    }
  },
  {
    id: 'crypto-investment-roi-scam',
    title: 'Investment Scam: Guaranteed 500% Weekly Crypto ROI & Cloud Mining Fraud',
    category: 'Investment & Cryptocurrency Scams',
    type: 'url',
    targetUrl: 'https://vip-binance-crypto-roi.top/deposit',
    description: 'Promotes an exclusive VIP cryptocurrency investment portal promising 100% guaranteed 500% weekly ROI with zero risk, routing USDT deposits directly into scammer wallets.',
    severity: 'CRITICAL',
    expectedVerdict: 'CONFIRMED_CRYPTO_INVESTMENT_SCAM',
    mockData: {
      url: 'https://vip-binance-crypto-roi.top/deposit',
      domain: 'vip-binance-crypto-roi.top',
      trustScore: 8,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 6,
        verdict: 'CONFIRMED_CRYPTO_INVESTMENT_SCAM',
        impersonatedBrand: 'Binance',
        officialBrandDomain: 'binance.com',
        identityMismatch: true,
        signals: [
          'Unrealistic financial return: Promises "guaranteed 500% weekly ROI" with "zero risk"',
          'Brand typosquatting: Incorporates Binance trademark on untrusted .top TLD',
          'Cryptocurrency deposit trap: Directs USDT TRC-20 transfers to unverified non-custodial address'
        ],
        entropy: 4.18,
        punycodeDetected: false,
        formFields: ['usdt_deposit_address', 'wallet_seed_phrase'],
        embeddedRedirects: [],
        preClickRecommendation: '🛑 DO NOT OPEN / DO NOT DEPOSIT: High-yield investment fraud (Ponzi/Pig-Butchering scam).'
      },
      certTrust: { score: 30, verdict: 'CHEAP_DV', issuer: { commonName: 'Let\'s Encrypt' }, keyDetails: { algorithm: 'RSA', keySize: 2048 }, ctLogs: { present: true, status: 'LOGGED' }, chain: [] },
      webSec: { score: 15, grade: 'F', headers: { hsts: { status: 'MISSING' } }, cookies: [] },
      web3Security: { isWeb3Target: true, score: 0, riskLevel: 'CRITICAL', drainerDetected: true, findings: ['Direct solicitation of 12-word wallet seed phrase in deposit modal.'] },
      collaborativeIntel: {
        reputationScore: 5,
        communityVotes: { malicious: 490, benign: 0 },
        matchingThreatClusters: [{ clusterId: 'CLUSTER-CRYPTO-PONZI-88', type: 'VIP Crypto Signal Syndicate', domainsCount: 82, sharedAsn: 'AS57523' }],
        iocs: ['DOMAIN: vip-binance-crypto-roi.top', 'USDT_TRC20: TJx7923487192384719238471923']
      },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0xddd1928374918273948172938471293847192837491827394817293847129384',
        txHash: '0xeee8192837491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeihddd82734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094903,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'Ponzi Investment Scheme', detail: 'Any scheme promising guaranteed 500% returns in days is mathematically fraudulent.' },
        { title: 'Seed Phrase Harvester', detail: 'The deposit modal prompts users to enter their 12-word recovery phrase to "verify wallet".' }
      ],
      actionableGuidance: [
        'NEVER share your 12-word crypto seed phrase with any website. No legitimate entity ever requests it.',
        'Do not transfer USDT or crypto to investment links found on Telegram or WhatsApp.',
        'File an immediate report at cybercrime.gov.in.'
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
        officialBrandDomain: 'github.com',
        identityMismatch: false,
        signals: [
          'Authoritative verified domain matching official brand identity',
          'Clean structural DOM with zero fraudulent credential harvesting redirects',
          'Strict TLS enforcement and subresource integrity checks'
        ],
        entropy: 2.82,
        punycodeDetected: false,
        formFields: ['login', 'password'],
        embeddedRedirects: [],
        preClickRecommendation: '✅ SAFE TO OPEN: Authenticated enterprise domain with verified identity.'
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
        headers: { hsts: { status: 'PRESENT', risk: 'NONE', value: 'max-age=31536000; preload' }, csp: { status: 'PRESENT', risk: 'NONE' }, xFrameOptions: { status: 'PRESENT', risk: 'NONE' } },
        serverFingerprint: 'GitHub Gateway (Hardened)',
        cookies: [{ name: '_gh_sess', secure: true, httpOnly: true, sameSite: 'Lax' }]
      },
      web3Security: { isWeb3Target: false, score: 100, riskLevel: 'SAFE', drainerDetected: false, findings: [] },
      collaborativeIntel: { reputationScore: 99, communityVotes: { malicious: 1, benign: 4890 }, matchingThreatClusters: [], iocs: [] },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0x1182938471928374918273948172938471928374918273948172938471928374',
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
  },
  {
    id: 'urgent-alert-benign-boundary',
    title: 'Module 3 Benchmark: Urgent Legitimate Alert (AI Boundary Rule Enforced)',
    category: 'Module 3: AI Boundary Verification',
    type: 'message',
    targetUrl: 'URGENT: Flight AI-102 boarding gates close in 15 minutes. All passengers must proceed immediately to Gate 14 with their boarding pass. Mandatory security check before departure.',
    description: 'Demonstrates the Module 3 Boundary Rule: The notification contains urgent and deadline-oriented language ("URGENT", "close in 15 minutes", "proceed immediately"), but contains zero verified evidence of fraud. Under Module 3 rules, it is not labelled fraudulent.',
    severity: 'SAFE',
    expectedVerdict: 'SUSPICIOUS_URGENT_LANGUAGE_NO_FRAUD_EVIDENCE',
    mockData: {
      type: 'MESSAGE',
      url: 'URGENT: Flight AI-102 boarding gates close in 15 minutes...',
      domain: 'Air India Flight Operations',
      trustScore: 82,
      threatLevel: 'MODERATE',
      aiPhishing: {
        score: 85,
        verdict: 'URGENT_LANGUAGE_NO_FRAUD_EVIDENCE',
        impersonatedBrand: null,
        signals: ['Contains urgent deadline phrasing: "URGENT", "close in 15 minutes", "proceed immediately"'],
        entropy: 3.1,
        punycodeDetected: false,
        formFields: []
      },
      certTrust: { score: 100, verdict: 'N/A_SMS', issuer: { commonName: 'Airline SMS Gateway' }, keyDetails: { algorithm: 'N/A', keySize: 0 }, ctLogs: { present: true, status: 'N/A' }, chain: [] },
      webSec: { score: 100, grade: 'A', headers: { hsts: { status: 'PRESENT' } }, cookies: [] },
      web3Security: { isWeb3Target: false, score: 100, riskLevel: 'SAFE', drainerDetected: false, findings: [] },
      collaborativeIntel: { reputationScore: 88, communityVotes: { malicious: 0, benign: 420 }, matchingThreatClusters: [], iocs: [] },
      web3Attestation: {
        contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
        network: 'Ethereum Sepolia / Polygon POS',
        targetHash: '0xabc1928374918273948172938471293847192837491827394817293847129384',
        txHash: '0xdef8192837491827394817293847129384719283749182739481729384712938',
        ipfsCid: 'bafybeihabc82734981729384712938471928374918273948172938471quvyku',
        blockNumber: 21094910,
        attestationStandard: 'EAS-THREAT-INTEL-EIP712',
        status: 'ATTESTED_ON_CHAIN'
      },
      evidenceDossier: [
        { title: 'AI Boundary Rule Enforced', detail: 'Message contains urgent operational deadlines, but zero verified technical evidence of fraud was detected.' },
        { title: 'Zero Malicious Payloads', detail: 'No deceptive hyperlinks, no credential harvesting, no AnyDesk remote access, and no fake payment demands.' }
      ],
      actionableGuidance: [
        'Proceed with normal airport boarding protocol.',
        'No malicious cyber threat indicators identified.'
      ],
      scamForensics: {
        scamScore: 82,
        trustScore: 82,
        threatLevel: 'MODERATE',
        primaryCategory: null,
        detectedCategories: [],
        indicators: {
          suspiciousLanguage: { detected: true, findings: ['Contains coercive phrase "immediately"', 'Contains strict countdown deadline "within 15 minutes"'] },
          impersonation: { detected: false, entity: null, findings: [] },
          unusualPayments: { detected: false, findings: [] },
          misleadingLinks: { detected: false, links: [], findings: [] },
          sensitiveInfoHarvest: { detected: false, findings: [] },
          remoteAccessTools: { detected: false, findings: [] }
        },
        extractedEntities: { urls: [], emails: [], phoneNumbers: [], paymentHandles: [] },
        module3ScamReport: {
          module: 'Module 3: AI-Powered Scam and Message Analysis',
          status: 'SUSPICIOUS_URGENT_LANGUAGE_NO_FRAUD_EVIDENCE',
          boundaryRule: {
            axiom: 'A message should not be labelled fraudulent solely because it contains urgent or persuasive language.',
            urgentLanguageDetected: true,
            verifiedFraudEvidenceDetected: false,
            assessmentRationale: 'AI Boundary Rule Enforced: The communication exhibits urgent or persuasive phrasing ("URGENT", "close in 15 minutes", "proceed immediately"), but contains NO verified technical evidence of fraud. Under Module 3 rules, it is NOT labelled fraudulent.'
          },
          socialEngineeringPatterns: {
            urgencyManipulation: { detected: true, count: 2, findings: ['Urgent deadline phrasing detected'] },
            impersonationAttempts: { detected: false, findings: [] },
            paymentDemands: { detected: false, findings: [] },
            credentialHarvesting: { detected: false, findings: [] },
            remoteAccessExploitation: { detected: false, findings: [] }
          },
          extractedEntities: { urls: [], emails: [], phoneNumbers: [], paymentHandles: [] },
          threatIntelligenceCorrelation: { totalEntitiesExtracted: 0, suspiciousLinksCount: 0, reputationSummary: 'No hostile indicators correlated with active threat feeds.' },
          plainEnglishAssessment: 'CAUTIONARY COMMUNICATION (NOT FRAUDULENT): This message contains urgent operational language ("URGENT", "proceed immediately"). However, rigorous inspection revealed ZERO technical evidence of fraud (no credential harvesting, no malware links, no AnyDesk remote access, and no fake payment requests). Under Module 3 rules, it is not classified as fraudulent.',
          recommendedSafetyMeasures: [
            'Urgent language was detected, but no fraudulent links, OTP demands, or payment requests were found.',
            'Verify the communication directly through the official provider if unsure.',
            'No cyber security threat identified.'
          ]
        },
        plainEnglishAssessment: 'CAUTIONARY COMMUNICATION (NOT FRAUDULENT): This message contains urgent operational language ("URGENT", "proceed immediately"). However, rigorous inspection revealed ZERO technical evidence of fraud.'
      }
    }
  }
];
