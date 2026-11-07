// Pre-configured High-Impact Security Intelligence Scenarios
export const PRECONFIGURED_SCENARIOS = [
  {
    id: 'emudhra-weak-key-incident',
    title: 'eMudhra TLS Incident: Rogue Certificate & Weak Key Anomaly',
    category: 'PKI & Trust Infrastructure',
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
          keySize: 1024, // Deficient key size!
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
          status: 'UNLOGGED_IN_PUBLIC_CT_LOGS' // Violation of CT requirements!
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
          csp: { status: 'MISSING', risk: 'HIGH', note: 'Allows arbitrary script injection and inline payloads' },
          xFrameOptions: { status: 'MISSING', risk: 'MEDIUM', note: 'Site can be embedded in an iframe for Clickjacking' },
          xContentTypeOptions: { status: 'MISSING', risk: 'LOW' }
        },
        serverFingerprint: 'Apache/2.4.29 (Vulnerable legacy version exposed)',
        cookies: [{ name: 'AUTH_SESSION', secure: false, httpOnly: false, sameSite: 'None' }]
      },
      collaborativeIntel: {
        reputationScore: 8,
        communityVotes: { malicious: 184, benign: 2 },
        matchingThreatClusters: [
          { clusterId: 'CLUSTER-EMUDHRA-ROGUE-01', type: 'Rogue PKI Infrastructure', domainsCount: 14, sharedAsn: 'AS13335 (Misused Transit)' }
        ],
        iocs: ['SHA256: e35bc92291fab10019d874ac4f993102448899aabbccddeeff00112233445566', 'IP: 198.51.100.42']
      }
    }
  },
  {
    id: 'sbi-bank-credential-harvester',
    title: 'Financial Phishing: SBI Online Banking Homoglyph & Credential Harvester',
    category: 'Phishing & Brand Impersonation',
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
        issuer: {
          commonName: "Let's Encrypt Authority X3",
          organization: 'Internet Security Research Group',
          country: 'US'
        },
        subject: {
          commonName: 'onlinesbi.sbi-retailbanking-verify.xyz',
          organization: null
        },
        keyDetails: {
          algorithm: 'RSA',
          keySize: 2048,
          fingerprint256: '9A:44:11:88:FE:10:98:C1:22:90:33:11:AA:FF:CC:00:88:77:66:55:44:33:22:11:00:99:88:77:66:55:44:33',
          entropyRating: 'STANDARD'
        },
        validity: {
          validFrom: '2026-11-06T14:10:00.000Z', // Brand new cert!
          validTo: '2027-02-06T14:10:00.000Z',
          daysRemaining: 90,
          isSelfSigned: false,
          isExpired: false
        },
        ctLogs: {
          present: true,
          verifiedSCTs: 2,
          status: 'LOGGED_RECENTLY'
        },
        caTrustIncidentDetails: {
          incidentName: 'Automated DV Issuance on High-Value Brand Target',
          cveOrAlert: 'PHISH-ALERT-FINANCIAL-TARGET',
          impact: 'Free DV certificate issued without organizational validation (OV/EV) for banking brand impersonation.',
          recommendation: 'Block at DNS/browser gateway.'
        },
        chain: [
          { name: 'ISRG Root X1', valid: true, status: 'Trusted Root' },
          { name: "R3 Intermediate (Let's Encrypt)", valid: true, status: 'Active' },
          { name: 'Leaf: onlinesbi.sbi-retailbanking-verify.xyz', valid: false, status: 'Age < 24 Hours / Flagged Subject' }
        ]
      },
      webSec: {
        score: 18,
        grade: 'F',
        headers: {
          hsts: { status: 'MISSING', risk: 'HIGH', note: 'No HSTS' },
          csp: { status: 'MISSING', risk: 'HIGH', note: 'No CSP protection' },
          xFrameOptions: { status: 'MISSING', risk: 'HIGH', note: 'Clickjacking possible' },
          xContentTypeOptions: { status: 'MISSING', risk: 'LOW' }
        },
        serverFingerprint: 'nginx/1.18.0 (Ubuntu)',
        cookies: []
      },
      collaborativeIntel: {
        reputationScore: 4,
        communityVotes: { malicious: 312, benign: 0 },
        matchingThreatClusters: [
          { clusterId: 'CLUSTER-FINPHISH-IND-88', type: 'Banking Phish Kit V4', domainsCount: 68, sharedAsn: 'AS20473 (Choopa)' }
        ],
        iocs: ['DOMAIN: onlinesbi.sbi-retailbanking-verify.xyz', 'IP: 149.28.18.232']
      }
    }
  },
  {
    id: 'fake-recruitment-scam',
    title: 'Recruitment Fraud: Impersonated Tech Hiring & Fee Extortion Portal',
    category: 'Scam & Social Engineering',
    targetUrl: 'https://careers-google-hiring-portal.online/application',
    description: 'Deceptive employment portal mimicking Google and Microsoft recruitment processes. Collects resumes, bank account details, and charges a "mandatory registration and laptop security deposit fee".',
    severity: 'HIGH',
    expectedVerdict: 'EMPLOYMENT_EXTORTION_SCAM',
    mockData: {
      url: 'https://careers-google-hiring-portal.online/application',
      domain: 'careers-google-hiring-portal.online',
      trustScore: 19,
      threatLevel: 'HIGH',
      aiPhishing: {
        score: 14,
        verdict: 'CONFIRMED_RECRUITMENT_FRAUD',
        impersonatedBrand: 'Google Careers / Alphabet',
        signals: [
          'High risk brand impersonation in domain (google-hiring-portal)',
          'Advance-fee fraud keyword indicators: "Laptop security deposit", "Offer letter dispatch charge"',
          'Payment gateway integration routing to personal UPI handles'
        ],
        entropy: 3.91,
        punycodeDetected: false,
        formFields: ['full_name', 'pan_card', 'bank_account_number', 'ifsc_code', 'upi_transaction_id']
      },
      certTrust: {
        score: 42,
        verdict: 'LOW_REPUTATION_HOSTING_CERT',
        issuer: {
          commonName: 'cPanel, Inc. Certification Authority',
          organization: 'cPanel, Inc.',
          country: 'US'
        },
        subject: {
          commonName: 'careers-google-hiring-portal.online'
        },
        keyDetails: {
          algorithm: 'RSA',
          keySize: 2048,
          fingerprint256: 'AA:11:44:88:BB:22:55:99:CC:33:66:00:DD:44:77:11:EE:55:88:22:FF:66:99:33:00:77:AA:44:11:88:BB:22',
          entropyRating: 'STANDARD'
        },
        validity: {
          validFrom: '2026-10-25T08:00:00.000Z',
          validTo: '2027-01-25T08:00:00.000Z',
          daysRemaining: 78,
          isSelfSigned: false,
          isExpired: false
        },
        ctLogs: {
          present: true,
          verifiedSCTs: 2,
          status: 'LOGGED'
        },
        caTrustIncidentDetails: null,
        chain: [
          { name: 'Sectigo Root', valid: true, status: 'Trusted' },
          { name: 'cPanel Intermediate CA', valid: true, status: 'Active' },
          { name: 'Leaf: careers-google-hiring-portal.online', valid: true, status: 'Unverified Org' }
        ]
      },
      webSec: {
        score: 35,
        grade: 'D',
        headers: {
          hsts: { status: 'MISSING', risk: 'HIGH', note: 'No HSTS' },
          csp: { status: 'UNSAFE', risk: 'HIGH', note: "unsafe-inline and unsafe-eval allowed" },
          xFrameOptions: { status: 'PRESENT', risk: 'NONE', value: 'SAMEORIGIN' },
          xContentTypeOptions: { status: 'PRESENT', risk: 'NONE', value: 'nosniff' }
        },
        serverFingerprint: 'LiteSpeed Web Server',
        cookies: []
      },
      collaborativeIntel: {
        reputationScore: 12,
        communityVotes: { malicious: 97, benign: 1 },
        matchingThreatClusters: [
          { clusterId: 'CLUSTER-JOBFRAUD-2026', type: 'Fake HR Camp', domainsCount: 23, sharedAsn: 'AS46603' }
        ],
        iocs: ['UPI: hradmin-corporate@okaxis', 'DOMAIN: careers-google-hiring-portal.online']
      }
    }
  },
  {
    id: 'malicious-payment-gateway-spoof',
    title: 'E-Commerce: Rogue Razorpay / Stripe Payment Gateway Redirect',
    category: 'Payment Interception',
    targetUrl: 'https://pay-merchant-gateway-secure.top/checkout?invoice=INV9812',
    description: 'Intercepts e-commerce transactions by presenting a deceptive payment screen simulating Razorpay & card gateways, exfiltrating CVV and debit card numbers via hidden WebSocket channels.',
    severity: 'HIGH',
    expectedVerdict: 'PAYMENT_INTERCEPTION_SPOOF',
    mockData: {
      url: 'https://pay-merchant-gateway-secure.top/checkout?invoice=INV9812',
      domain: 'pay-merchant-gateway-secure.top',
      trustScore: 15,
      threatLevel: 'CRITICAL',
      aiPhishing: {
        score: 11,
        verdict: 'PAYMENT_SKIMMER_AND_SPOOF',
        impersonatedBrand: 'Razorpay / Visa / Mastercard',
        signals: [
          'High-risk payment keywords embedded in cheap TLD (.top)',
          'JavaScript keylogger attached to credit card number and CVV input fields',
          'Hidden WebSocket connection sending keystrokes in real-time to dark-web endpoint',
          'Cloned Razorpay modal iframe'
        ],
        entropy: 3.98,
        punycodeDetected: false,
        formFields: ['card_holder', 'card_number', 'expiry_month', 'expiry_year', 'cvv', 'atm_pin']
      },
      certTrust: {
        score: 30,
        verdict: 'ANONYMOUS_SHORT_LIVED_CERT',
        issuer: {
          commonName: 'ZeroSSL ECC Domain Secure Site CA',
          organization: 'ZeroSSL',
          country: 'AT'
        },
        subject: {
          commonName: 'pay-merchant-gateway-secure.top'
        },
        keyDetails: {
          algorithm: 'ECDSA',
          keySize: 256,
          fingerprint256: 'B1:C2:D3:E4:F5:01:12:23:34:45:56:67:78:89:90:AB:CD:EF:01:23:45:67:89:AB:CD:EF:01:23:45:67:89:AB',
          entropyRating: 'STANDARD'
        },
        validity: {
          validFrom: '2026-11-04T00:00:00.000Z',
          validTo: '2027-02-04T00:00:00.000Z',
          daysRemaining: 88,
          isSelfSigned: false,
          isExpired: false
        },
        ctLogs: {
          present: true,
          verifiedSCTs: 2,
          status: 'LOGGED'
        },
        caTrustIncidentDetails: null,
        chain: [
          { name: 'USERTrust ECC Root', valid: true, status: 'Trusted Root' },
          { name: 'ZeroSSL ECC Intermediate', valid: true, status: 'Active' },
          { name: 'Leaf: pay-merchant-gateway-secure.top', valid: true, status: 'Untrusted Domain History' }
        ]
      },
      webSec: {
        score: 28,
        grade: 'F',
        headers: {
          hsts: { status: 'MISSING', risk: 'HIGH', note: 'No HSTS header present' },
          csp: { status: 'MISSING', risk: 'HIGH', note: 'Allows external websocket exfiltration' },
          xFrameOptions: { status: 'MISSING', risk: 'HIGH', note: 'Permits iframe nesting' },
          xContentTypeOptions: { status: 'MISSING', risk: 'LOW' }
        },
        serverFingerprint: 'Cloudflare (Origin IP Exposed via DNS History)',
        cookies: []
      },
      collaborativeIntel: {
        reputationScore: 10,
        communityVotes: { malicious: 240, benign: 3 },
        matchingThreatClusters: [
          { clusterId: 'CLUSTER-MAGE-SKIM-99', type: 'Magecart E-Commerce Skimmer', domainsCount: 42, sharedAsn: 'AS57523' }
        ],
        iocs: ['DOM_HASH: a4f8b92d6e3c1a7e', 'WS_ENDPOINT: wss://log.pay-merchant-gateway-secure.top/stream']
      }
    }
  },
  {
    id: 'github-enterprise-legitimate-baseline',
    title: 'Enterprise Baseline: Legitimate Verified Platform (GitHub)',
    category: 'Verified Digital Trust',
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
        issuer: {
          commonName: 'DigiCert Global G2 TLS RSA SHA256 2020 CA1',
          organization: 'DigiCert Inc',
          country: 'US'
        },
        subject: {
          commonName: 'github.com',
          organization: 'GitHub, Inc.',
          locality: 'San Francisco',
          state: 'California',
          country: 'US'
        },
        keyDetails: {
          algorithm: 'RSA',
          keySize: 2048,
          fingerprint256: '3E:8F:A1:7B:99:4C:12:00:88:F2:AA:BC:DE:F0:12:34:56:78:9A:BC:DE:F0:12:34:56:78:9A:BC:DE:F0:12:34',
          entropyRating: 'CRYPTOGRAPHICALLY_STRONG'
        },
        validity: {
          validFrom: '2026-03-01T00:00:00.000Z',
          validTo: '2027-03-15T23:59:59.000Z',
          daysRemaining: 128,
          isSelfSigned: false,
          isExpired: false
        },
        ctLogs: {
          present: true,
          verifiedSCTs: 3,
          status: 'COMPREHENSIVE_CT_LOG_PROOF (Google Argon & Cloudflare Nimbus)'
        },
        caTrustIncidentDetails: null,
        chain: [
          { name: 'DigiCert Global Root G2', valid: true, status: 'Trusted Root CA' },
          { name: 'DigiCert Global G2 TLS RSA SHA256 2020 CA1', valid: true, status: 'Active Intermediate' },
          { name: 'Leaf: github.com', valid: true, status: 'Organization Validated' }
        ]
      },
      webSec: {
        score: 96,
        grade: 'A+',
        headers: {
          hsts: { status: 'PRESENT', risk: 'NONE', value: 'max-age=31536000; includeSubDomains; preload' },
          csp: { status: 'PRESENT', risk: 'NONE', value: 'default-src \'none\'; script-src https://github.githubassets.com' },
          xFrameOptions: { status: 'PRESENT', risk: 'NONE', value: 'DENY' },
          xContentTypeOptions: { status: 'PRESENT', risk: 'NONE', value: 'nosniff' },
          referrerPolicy: { status: 'PRESENT', risk: 'NONE', value: 'origin-when-cross-origin, strict-origin-when-cross-origin' }
        },
        serverFingerprint: 'GitHub Gateway (Hardened, banners stripped)',
        cookies: [{ name: '_gh_sess', secure: true, httpOnly: true, sameSite: 'Lax' }]
      },
      collaborativeIntel: {
        reputationScore: 99,
        communityVotes: { malicious: 1, benign: 4890 },
        matchingThreatClusters: [],
        iocs: []
      }
    }
  }
];
