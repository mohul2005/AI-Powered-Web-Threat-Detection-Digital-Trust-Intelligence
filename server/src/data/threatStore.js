// Collaborative Threat Intelligence Repository & In-Memory Store
import { verifyThreatMultiSource } from '../engines/intelVerificationEngine.js';
import { generateOnChainAttestation } from '../engines/web3Engine.js';

export const INITIAL_COMMUNITY_REPORTS = [
  {
    id: 'REP-2026-901',
    targetUrl: 'https://onlinesbi.sbi-retailbanking-verify.xyz/login.php',
    domain: 'onlinesbi.sbi-retailbanking-verify.xyz',
    threatCategory: 'Phishing',
    targetEntity: 'State Bank of India',
    reporterHandle: 'sec_hunter_99',
    reputation: 'Vetted CERT Lead',
    summary: 'Active banking credential harvester targeting Indian retail banking users via SMS smishing links.',
    tags: ['banking', 'sbi', 'sms-phish', 'credential-harvest'],
    status: 'VERIFIED_MALICIOUS_MULTI_SOURCE',
    upvotes: 312,
    downvotes: 0,
    timestamp: '2026-11-06T15:30:00.000Z',
    verificationProof: {
      feedsChecked: ['PhishTank', 'URLhaus', 'Spamhaus DBL'],
      confidence: '99.4%',
      dnsProbe: 'Active Host (149.28.18.232)',
      antiPoisoningCheck: 'PASSED'
    },
    iocList: [
      { type: 'domain', value: 'onlinesbi.sbi-retailbanking-verify.xyz' },
      { type: 'ip', value: '149.28.18.232' },
      { type: 'telegram_bot', value: 'bot7128912:AAH98...exfiltration' }
    ]
  },
  {
    id: 'REP-2026-902',
    targetUrl: 'https://secure-login.gov-verify.in',
    domain: 'secure-login.gov-verify.in',
    threatCategory: 'Certificate Anomaly & PKI Subversion',
    targetEntity: 'e-Governance India',
    reporterHandle: 'pki_sentinel',
    reputation: 'Cryptographic Auditor',
    summary: 'Rogue certificate issued by flawed eMudhra sub-CA with weak 1024-bit RSA key and missing CT logs.',
    tags: ['emudhra', 'pki', 'weak-key', 'rogue-ca', 'ct-violation'],
    status: 'VERIFIED_MALICIOUS_MULTI_SOURCE',
    upvotes: 184,
    downvotes: 2,
    timestamp: '2026-11-05T10:15:00.000Z',
    verificationProof: {
      feedsChecked: ['Certificate Transparency crt.sh', 'CAB-Forum Audit Alert'],
      confidence: '98.8%',
      dnsProbe: 'Active Host (198.51.100.42)',
      antiPoisoningCheck: 'PASSED'
    },
    iocList: [
      { type: 'cert_fingerprint', value: 'E3:5B:C9:22:91:FA:B1:00:19:D8:74:AC:4F:99:31:02:44:88:99:AA' },
      { type: 'ip', value: '198.51.100.42' }
    ]
  },
  {
    id: 'REP-2026-903',
    targetUrl: 'https://careers-google-hiring-portal.online/application',
    domain: 'careers-google-hiring-portal.online',
    threatCategory: 'Recruitment Fraud',
    targetEntity: 'Google Careers',
    reporterHandle: 'fraud_watch_global',
    reputation: 'Threat Analyst',
    summary: 'Advance fee recruitment scam asking candidates for refundable equipment charges.',
    tags: ['recruitment-scam', 'google-impersonation', 'advance-fee'],
    status: 'VERIFIED_MALICIOUS',
    upvotes: 97,
    downvotes: 1,
    timestamp: '2026-11-04T12:00:00.000Z',
    verificationProof: {
      feedsChecked: ['OpenPhish', 'Spamhaus DBL'],
      confidence: '95.2%',
      dnsProbe: 'Active Host (AS46603)',
      antiPoisoningCheck: 'PASSED'
    },
    iocList: [
      { type: 'domain', value: 'careers-google-hiring-portal.online' },
      { type: 'upi', value: 'hradmin-corporate@okaxis' }
    ]
  },
  {
    id: 'REP-2026-904',
    targetUrl: 'https://pay-merchant-gateway-secure.top/checkout',
    domain: 'pay-merchant-gateway-secure.top',
    threatCategory: 'Payment Gateway Interception',
    targetEntity: 'Razorpay / Visa',
    reporterHandle: 'fintech_shield',
    reputation: 'Security Lead',
    summary: 'Injected checkout skimmer harvesting CVV and credit card data over covert WebSockets.',
    tags: ['payment-skimmer', 'razorpay', 'magecart', 'cvv-theft'],
    status: 'VERIFIED_MALICIOUS_MULTI_SOURCE',
    upvotes: 240,
    downvotes: 3,
    timestamp: '2026-11-03T18:45:00.000Z',
    verificationProof: {
      feedsChecked: ['URLhaus (Abuse.ch)', 'Spamhaus DBL'],
      confidence: '97.5%',
      dnsProbe: 'Active Host (AS57523)',
      antiPoisoningCheck: 'PASSED'
    },
    iocList: [
      { type: 'domain', value: 'pay-merchant-gateway-secure.top' },
      { type: 'websocket', value: 'wss://log.pay-merchant-gateway-secure.top/stream' }
    ]
  },
  {
    id: 'REP-2026-905',
    targetUrl: 'https://sbi-yono-pan-kyc-update.top/login',
    domain: 'sbi-yono-pan-kyc-update.top',
    threatCategory: 'Phishing',
    targetEntity: 'State Bank of India',
    reporterHandle: 'cyber_citizen_42',
    reputation: 'Verified Reporter',
    summary: 'Received urgent SMS warning that YONO access will be blocked within 24 hours. Form harvests Netbanking username, password, and profile password.',
    tags: ['banking', 'sbi', 'sms-phish', 'yono-kyc'],
    status: 'VERIFIED_MALICIOUS_MULTI_SOURCE',
    upvotes: 198,
    downvotes: 1,
    timestamp: '2026-11-07T08:20:00.000Z',
    verificationProof: {
      feedsChecked: ['PhishTank', 'URLhaus', 'Spamhaus DBL'],
      confidence: '99.1%',
      dnsProbe: 'Active Host (149.28.18.232 / AS20473)',
      antiPoisoningCheck: 'PASSED'
    },
    iocList: [
      { type: 'domain', value: 'sbi-yono-pan-kyc-update.top' },
      { type: 'ip', value: '149.28.18.232' },
      { type: 'asn', value: 'AS20473' },
      { type: 'upi', value: 'sbi-kyc-verify@oksbi' }
    ]
  },
  {
    id: 'REP-2026-906',
    targetUrl: 'https://secure-yono-login-sbi.top/auth',
    domain: 'secure-yono-login-sbi.top',
    threatCategory: 'Phishing',
    targetEntity: 'State Bank of India',
    reporterHandle: 'mumbai_infosec',
    reputation: 'Senior Analyst',
    summary: 'Third distinct domain reported in 48 hours mimicking SBI. Resolves to the same Choopa/Vultr IP (149.28.18.232) and uses identical credential-drop scripts.',
    tags: ['banking', 'sbi', 'shared-infra', 'yono'],
    status: 'VERIFIED_MALICIOUS_MULTI_SOURCE',
    upvotes: 165,
    downvotes: 0,
    timestamp: '2026-11-07T14:45:00.000Z',
    verificationProof: {
      feedsChecked: ['PhishTank', 'Spamhaus DBL'],
      confidence: '98.9%',
      dnsProbe: 'Active Host (149.28.18.232)',
      antiPoisoningCheck: 'PASSED'
    },
    iocList: [
      { type: 'domain', value: 'secure-yono-login-sbi.top' },
      { type: 'ip', value: '149.28.18.232' },
      { type: 'asn', value: 'AS20473' }
    ]
  },
  {
    id: 'REP-2026-907',
    targetUrl: 'http://bit.ly/kbc-prize-claim-2026',
    domain: 'bit.ly',
    threatCategory: 'Advance Fee Fraud',
    targetEntity: 'Kaun Banega Crorepati (KBC)',
    reporterHandle: 'telecom_scam_hunter',
    reputation: 'DoT Contributor',
    summary: 'WhatsApp message claiming ₹25 Lakh lottery win. Shortlink redirects to kbc-all-india-lucky-draw-2026.top and solicits ₹12,500 advance tax via UPI kbcmanager-tax@apl.',
    tags: ['kbc', 'lottery', 'advance-fee', 'whatsapp-scam'],
    status: 'VERIFIED_MALICIOUS_MULTI_SOURCE',
    upvotes: 289,
    downvotes: 0,
    timestamp: '2026-11-06T19:10:00.000Z',
    verificationProof: {
      feedsChecked: ['OpenPhish', 'URLhaus'],
      confidence: '99.5%',
      dnsProbe: 'Active Relay (AS57523)',
      antiPoisoningCheck: 'PASSED'
    },
    iocList: [
      { type: 'shortlink', value: 'bit.ly/kbc-prize-claim-2026' },
      { type: 'destination_domain', value: 'kbc-all-india-lucky-draw-2026.top' },
      { type: 'upi', value: 'kbcmanager-tax@apl' },
      { type: 'ip', value: '185.220.101.5' }
    ]
  },
  {
    id: 'REP-2026-908',
    targetUrl: 'https://echallan-parivahan-traffic-pay.top/fine',
    domain: 'echallan-parivahan-traffic-pay.top',
    threatCategory: 'Government Service Impersonation',
    targetEntity: 'Parivahan e-Challan',
    reporterHandle: 'traffic_alert_delhi',
    reputation: 'Civic Reporter',
    summary: 'Fake SMS alleging pending vehicle challan with threat of court summons. Also hosted on Choopa ASN AS20473 (149.28.18.232).',
    tags: ['government', 'parivahan', 'echallan', 'traffic-fine'],
    status: 'VERIFIED_MALICIOUS_MULTI_SOURCE',
    upvotes: 172,
    downvotes: 1,
    timestamp: '2026-11-07T11:00:00.000Z',
    verificationProof: {
      feedsChecked: ['URLhaus', 'Spamhaus DBL'],
      confidence: '98.4%',
      dnsProbe: 'Active Host (149.28.18.232)',
      antiPoisoningCheck: 'PASSED'
    },
    iocList: [
      { type: 'domain', value: 'echallan-parivahan-traffic-pay.top' },
      { type: 'ip', value: '149.28.18.232' },
      { type: 'asn', value: 'AS20473' },
      { type: 'upi', value: 'traffic-challan-pay@upi' }
    ]
  }
];

class ThreatStore {
  constructor() {
    this.reports = INITIAL_COMMUNITY_REPORTS.map(r => ({
      ...r,
      onChainAttestation: r.onChainAttestation || generateOnChainAttestation(
        r.domain,
        r.status.includes('MALICIOUS') ? 15 : 50,
        r.threatCategory,
        [r.targetUrl, r.summary],
        { targetEntity: r.targetEntity, summary: r.summary }
      )
    }));
  }

  getAllReports() {
    return this.reports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  addReport(reportData) {
    const domain = reportData.domain || new URL(reportData.targetUrl).hostname;
    
    // Run automated active multi-source verification probe
    const multiVerification = verifyThreatMultiSource(domain, reportData.targetUrl);

    const newReport = {
      id: `REP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      targetUrl: reportData.targetUrl,
      domain,
      threatCategory: reportData.threatCategory || 'Phishing',
      targetEntity: reportData.targetEntity || 'Unknown Entity',
      reporterHandle: reportData.reporterHandle || 'anonymous_defender',
      reputation: 'Community Member',
      summary: reportData.summary || 'User-submitted suspicious website report',
      tags: reportData.tags || ['user-submitted'],
      status: multiVerification.verified ? 'VERIFIED_MALICIOUS_MULTI_SOURCE' : 'INVESTIGATING',
      upvotes: 1,
      downvotes: 0,
      timestamp: new Date().toISOString(),
      verificationProof: {
        feedsChecked: multiVerification.matchedFeeds.map(f => f.feedName),
        confidence: multiVerification.verificationConfidence,
        dnsProbe: multiVerification.automatedActiveProbe.dnsA_Record,
        antiPoisoningCheck: multiVerification.automatedActiveProbe.poisonDefenseResult
      },
      iocList: [
        { type: 'url', value: reportData.targetUrl },
        { type: 'verification_proof', value: multiVerification.cryptographicProofHash }
      ],
      onChainAttestation: generateOnChainAttestation(
        domain,
        multiVerification.verified ? 10 : 45,
        reportData.threatCategory || 'Phishing',
        [reportData.targetUrl, reportData.summary],
        { targetEntity: reportData.targetEntity, summary: reportData.summary }
      )
    };
    this.reports.unshift(newReport);
    return newReport;
  }

  vote(reportId, type) {
    const report = this.reports.find(r => r.id === reportId);
    if (!report) return null;
    if (type === 'up') report.upvotes += 1;
    if (type === 'down') report.downvotes += 1;
    return report;
  }

  findByDomain(domain) {
    const cleanDomain = domain.toLowerCase().replace(/^www\./, '');
    return this.reports.filter(r => r.domain.toLowerCase().includes(cleanDomain));
  }

  exportSTIX() {
    const objects = [];
    const timestamp = new Date().toISOString();

    for (const report of this.reports) {
      const indicatorId = `indicator--${report.id.toLowerCase().replace(/[^a-z0-9-]/g, '')}`;
      objects.push({
        type: 'indicator',
        spec_version: '2.1',
        id: indicatorId,
        created: report.timestamp,
        modified: timestamp,
        name: `${report.threatCategory} - ${report.targetEntity}`,
        description: report.summary,
        indicator_types: ['malicious-activity'],
        pattern: `[url:value = '${report.targetUrl}']`,
        pattern_type: 'stix',
        valid_from: report.timestamp,
        labels: report.tags,
        confidence: Math.min(99, Math.max(10, Math.floor((report.upvotes / (report.upvotes + report.downvotes + 1)) * 100)))
      });
    }

    return {
      type: 'bundle',
      id: `bundle--${Math.random().toString(36).substring(2, 15)}`,
      objects
    };
  }
}

export const threatStore = new ThreatStore();
