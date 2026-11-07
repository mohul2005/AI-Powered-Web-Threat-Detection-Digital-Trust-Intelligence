// Collaborative Threat Intelligence Repository & In-Memory Store
import { verifyThreatMultiSource } from '../engines/intelVerificationEngine.js';

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
  }
];

class ThreatStore {
  constructor() {
    this.reports = [...INITIAL_COMMUNITY_REPORTS];
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
      ]
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
