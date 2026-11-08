// AI-Powered Online Scams & Social Engineering Forensics Engine
// Implements Section C: Online Scams, Social Engineering, Remote-Access Threats, and Deceptive Communication

import { analyzePhishing } from './phishingEngine.js';

// 9 Comprehensive Scam Categories Defined in Section C
export const SCAM_CATEGORIES = {
  FAKE_JOB_INTERNSHIP: {
    id: 'FAKE_JOB_INTERNSHIP',
    title: 'Fake Job & Internship Offer',
    description: 'Deceptive remote employment or internship lure requiring upfront registration, security deposits, or Telegram rating tasks.'
  },
  INVESTMENT_CRYPTO_SCAM: {
    id: 'INVESTMENT_CRYPTO_SCAM',
    title: 'Investment & Cryptocurrency Scam',
    description: 'Promises unrealistic guaranteed returns, crypto doubling schemes, VIP trading signals, or fraudulent cloud mining.'
  },
  FAKE_GIVEAWAY_PRIZE: {
    id: 'FAKE_GIVEAWAY_PRIZE',
    title: 'Fake Giveaway & Prize Notification',
    description: 'Unsolicited lottery wins, lucky draw gifts, or rewards requiring processing fees to release winnings.'
  },
  FRAUDULENT_REFUND_CASHBACK: {
    id: 'FRAUDULENT_REFUND_CASHBACK',
    title: 'Fraudulent Refund & Cashback Scam',
    description: 'Fake tax refunds, utility bill reversals, or UPI cashback schemes that deceive victims into approving debits.'
  },
  ORGANIZATION_IMPERSONATION: {
    id: 'ORGANIZATION_IMPERSONATION',
    title: 'Impersonation of Banks, Universities & Corporations',
    description: 'Mimics trusted public institutions or corporations to exploit institutional trust.'
  },
  FAKE_CUSTOMER_SUPPORT: {
    id: 'FAKE_CUSTOMER_SUPPORT',
    title: 'Fake Customer Support Communication',
    description: 'Fraudulent helpline numbers or fake support agents claiming to assist with flight cancellations, parcels, or bank accounts.'
  },
  CREDENTIAL_OTP_HARVESTING: {
    id: 'CREDENTIAL_OTP_HARVESTING',
    title: 'Requests for OTPs, Passwords & Credentials',
    description: 'Explicit solicitation of multi-factor authentication tokens, ATM PINs, netbanking passwords, or CVVs.'
  },
  FRAUDULENT_KYC_VERIFICATION: {
    id: 'FRAUDULENT_KYC_VERIFICATION',
    title: 'Fraudulent KYC & Account Verification',
    description: 'Urgent threats of account freezing or SIM card deactivation unless PAN/Aadhaar details are submitted immediately.'
  },
  TECH_SUPPORT_REMOTE_ACCESS: {
    id: 'TECH_SUPPORT_REMOTE_ACCESS',
    title: 'Fake Tech Support & Remote-Access Scam',
    description: 'False malware alerts instructing victims to call bogus toll-free numbers or install remote desktop software (AnyDesk, TeamViewer).'
  }
};

// Heuristic keyword definitions for the 5 Section C investigation pillars
const SUSPICIOUS_LANGUAGE_PATTERNS = [
  { trigger: 'immediately', weight: 10, note: 'Artificial urgency' },
  { trigger: 'within 24 hours', weight: 15, note: 'Strict deadline coercion' },
  { trigger: 'account will be blocked', weight: 25, note: 'Panic-inducing intimidation' },
  { trigger: 'permanently deactivated', weight: 25, note: 'Service cutoff threat' },
  { trigger: 'electricity will be disconnected', weight: 30, note: 'Essential utility cutoff threat' },
  { trigger: 'arrest warrant', weight: 35, note: 'Legal intimidation' },
  { trigger: 'court summons', weight: 35, note: 'Legal intimidation' },
  { trigger: 'guaranteed return', weight: 30, note: 'Unrealistic financial promise' },
  { trigger: '100% risk free', weight: 25, note: 'Unrealistic safety claim' },
  { trigger: 'daily income', weight: 20, note: 'Get-rich-quick promise' },
  { trigger: 'congratulations you won', weight: 30, note: 'Advance fee lure' },
  { trigger: 'lucky winner', weight: 25, note: 'Advance fee lure' }
];

const UNUSUAL_PAYMENT_PATTERNS = [
  { trigger: 'registration fee', weight: 30, category: 'Advance Fee' },
  { trigger: 'processing fee', weight: 30, category: 'Advance Fee' },
  { trigger: 'security deposit', weight: 35, category: 'Advance Fee' },
  { trigger: 'laptop security', weight: 30, category: 'Job Scam Fee' },
  { trigger: 'refundable fee', weight: 25, category: 'Advance Fee' },
  { trigger: 'send money to upi', weight: 35, category: 'Unusual UPI Demand' },
  { trigger: 'paytm wallet', weight: 20, category: 'Non-Standard Payment' },
  { trigger: 'gift card', weight: 40, category: 'Irreversible Payment' },
  { trigger: 'usdt transfer', weight: 35, category: 'Crypto Transfer' },
  { trigger: 'enter your upi pin to receive', weight: 50, category: 'UPI Debit Fraud' }
];

const SENSITIVE_INFO_PATTERNS = [
  { trigger: 'otp', weight: 40, secret: 'One-Time Password (OTP)' },
  { trigger: 'verification code', weight: 35, secret: 'MFA Verification Code' },
  { trigger: 'upi pin', weight: 45, secret: 'UPI Transaction PIN' },
  { trigger: 'atm pin', weight: 45, secret: 'Debit Card ATM PIN' },
  { trigger: 'cvv', weight: 40, secret: 'Card CVV Code' },
  { trigger: 'netbanking password', weight: 45, secret: 'Banking Password' },
  { trigger: 'pan card number', weight: 25, secret: 'Identity Document (PAN)' },
  { trigger: 'aadhaar', weight: 25, secret: 'National Identity (Aadhaar)' }
];

const REMOTE_ACCESS_PATTERNS = [
  { trigger: 'anydesk', weight: 50, app: 'AnyDesk' },
  { trigger: 'teamviewer', weight: 50, app: 'TeamViewer' },
  { trigger: 'rustdesk', weight: 50, app: 'RustDesk' },
  { trigger: 'quicksupport', weight: 50, app: 'QuickSupport' },
  { trigger: 'ultraviewer', weight: 50, app: 'UltraViewer' },
  { trigger: 'screen share', weight: 35, app: 'Remote Screen Monitoring' },
  { trigger: 'call support at', weight: 30, app: 'Rogue Call Center' },
  { trigger: 'toll free', weight: 20, app: 'Fake Helpdesk' }
];

const IMPERSONATED_ENTITIES = [
  { name: 'State Bank of India', keywords: ['sbi', 'yono', 'state bank'], category: 'Banking' },
  { name: 'HDFC Bank', keywords: ['hdfc', 'netbanking'], category: 'Banking' },
  { name: 'ICICI Bank', keywords: ['icici', 'imobile'], category: 'Banking' },
  { name: 'Income Tax Department', keywords: ['income tax', 'efiling', 'it department', 'tax refund'], category: 'Government' },
  { name: 'Electricity Department', keywords: ['electricity bill', 'power corporation', 'bses', 'mseb'], category: 'Utility' },
  { name: 'India Post', keywords: ['indiapost', 'speed post', 'postal service'], category: 'Logistics' },
  { name: 'National Testing Agency', keywords: ['nta', 'neet', 'jee', 'admit card'], category: 'Education' },
  { name: 'Microsoft Support', keywords: ['microsoft', 'windows defender', 'windows security'], category: 'Tech' },
  { name: 'Google Recruitment', keywords: ['google hr', 'google careers', 'google hiring'], category: 'Corporate' },
  { name: 'Amazon Support / Lottery', keywords: ['amazon prize', 'amazon customer care', 'amazon lucky draw'], category: 'E-Commerce' },
  { name: 'KBC Lottery', keywords: ['kbc', 'kaun banega crorepati', 'kbc lottery'], category: 'Prize Syndicate' }
];

export function analyzeSocialEngineering(communicationText) {
  if (!communicationText || communicationText.trim().length === 0) {
    return {
      scamScore: 50,
      threatLevel: 'UNKNOWN',
      primaryCategory: null,
      detectedCategories: [],
      indicators: {
        suspiciousLanguage: { detected: false, findings: [] },
        impersonation: { detected: false, entity: null, findings: [] },
        unusualPayments: { detected: false, findings: [] },
        misleadingLinks: { detected: false, links: [], findings: [] },
        sensitiveInfoHarvest: { detected: false, findings: [] },
        remoteAccessTools: { detected: false, findings: [] }
      },
      plainEnglishAssessment: 'No communication text provided for social engineering analysis.',
      evidenceFindings: [],
      actionableGuidance: ['Please provide message text, email body, or transcript to evaluate.']
    };
  }

  const text = communicationText.toLowerCase();
  let riskPenalty = 0;
  const evidenceFindings = [];
  const detectedCategorySet = new Set();

  // 1. Indicator 1: Suspicious Language & Urgency
  const languageFindings = [];
  for (const item of SUSPICIOUS_LANGUAGE_PATTERNS) {
    if (text.includes(item.trigger)) {
      languageFindings.push(`Contains coercive phrase '${item.trigger}' (${item.note})`);
      riskPenalty += item.weight;
    }
  }

  // 2. Indicator 2: Impersonation Indicators
  let detectedEntity = null;
  const impersonationFindings = [];
  for (const entity of IMPERSONATED_ENTITIES) {
    for (const kw of entity.keywords) {
      if (text.includes(kw)) {
        detectedEntity = entity.name;
        impersonationFindings.push(`Impersonates official entity '${entity.name}' (${entity.category})`);
        detectedCategorySet.add(SCAM_CATEGORIES.ORGANIZATION_IMPERSONATION.id);
        riskPenalty += 25;
        break;
      }
    }
    if (detectedEntity) break;
  }

  // 3. Indicator 3: Unusual Payment Requests
  const paymentFindings = [];
  for (const p of UNUSUAL_PAYMENT_PATTERNS) {
    if (text.includes(p.trigger)) {
      paymentFindings.push(`Unusual payment solicitation: '${p.trigger}' (${p.category})`);
      riskPenalty += p.weight;
      if (p.category === 'Advance Fee') detectedCategorySet.add(SCAM_CATEGORIES.FAKE_JOB_INTERNSHIP.id);
      if (p.category === 'UPI Debit Fraud') detectedCategorySet.add(SCAM_CATEGORIES.FRAUDULENT_REFUND_CASHBACK.id);
    }
  }

  // 4. Indicator 4: Misleading Links & URL Obfuscation
  const linkFindings = [];
  const urlRegex = /(https?:\/\/[^\s"'<>]+|bit\.ly\/[^\s"'<>]+|tinyurl\.com\/[^\s"'<>]+|t\.me\/[^\s"'<>]+|wa\.me\/[^\s"'<>]+)/gi;
  const extractedUrls = communicationText.match(urlRegex) || [];
  const scannedLinks = [];

  for (const rawUrl of extractedUrls.slice(0, 3)) {
    const fullUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
    const urlAnalysis = analyzePhishing(fullUrl);
    scannedLinks.push({ url: fullUrl, score: urlAnalysis.score, verdict: urlAnalysis.verdict });

    if (rawUrl.includes('bit.ly') || rawUrl.includes('tinyurl') || rawUrl.includes('t.me') || rawUrl.includes('wa.me')) {
      linkFindings.push(`Shortened/Messaging link '${rawUrl}' obfuscates actual web server destination`);
      riskPenalty += 30;
    }
    if (urlAnalysis.score < 40) {
      linkFindings.push(`Embedded link '${fullUrl}' resolved to malicious payload: ${urlAnalysis.verdict}`);
      riskPenalty += 45;
    }
  }

  // 5. Indicator 5: Attempts to Obtain Sensitive Secrets (OTP / PIN)
  const sensitiveFindings = [];
  for (const item of SENSITIVE_INFO_PATTERNS) {
    if (text.includes(item.trigger)) {
      sensitiveFindings.push(`Direct solicitation of confidential authentication secret: '${item.secret}'`);
      detectedCategorySet.add(SCAM_CATEGORIES.CREDENTIAL_OTP_HARVESTING.id);
      riskPenalty += item.weight;
    }
  }

  // 6. Indicator 6: Remote-Access Software Coercion
  const remoteAccessFindings = [];
  for (const r of REMOTE_ACCESS_PATTERNS) {
    if (text.includes(r.trigger)) {
      remoteAccessFindings.push(`Remote desktop exploitation: Directs victim to install or use '${r.app}'`);
      detectedCategorySet.add(SCAM_CATEGORIES.TECH_SUPPORT_REMOTE_ACCESS.id);
      riskPenalty += r.weight;
    }
  }

  // Contextual Category Mapping based on Text Analysis
  if (text.includes('job') || text.includes('internship') || text.includes('part time') || text.includes('daily salary')) {
    detectedCategorySet.add(SCAM_CATEGORIES.FAKE_JOB_INTERNSHIP.id);
  }
  if (text.includes('crypto') || text.includes('usdt') || text.includes('invest') || text.includes('trading') || text.includes('forex') || text.includes('bitcoin')) {
    detectedCategorySet.add(SCAM_CATEGORIES.INVESTMENT_CRYPTO_SCAM.id);
  }
  if (text.includes('lottery') || text.includes('won') || text.includes('prize') || text.includes('lucky draw') || text.includes('kbc')) {
    detectedCategorySet.add(SCAM_CATEGORIES.FAKE_GIVEAWAY_PRIZE.id);
  }
  if (text.includes('refund') || text.includes('cashback') || text.includes('tax refund') || text.includes('bill reversal')) {
    detectedCategorySet.add(SCAM_CATEGORIES.FRAUDULENT_REFUND_CASHBACK.id);
  }
  if (text.includes('kyc') || text.includes('pan card') || text.includes('sim deactivat') || text.includes('yono account blocked') || text.includes('aadhaar link')) {
    detectedCategorySet.add(SCAM_CATEGORIES.FRAUDULENT_KYC_VERIFICATION.id);
  }
  if (text.includes('customer care') || text.includes('helpline') || text.includes('support team') || text.includes('toll free')) {
    detectedCategorySet.add(SCAM_CATEGORIES.FAKE_CUSTOMER_SUPPORT.id);
  }

  // Select Primary Category
  const detectedCategoriesList = Array.from(detectedCategorySet);
  let primaryCategory = null;
  if (detectedCategoriesList.length > 0) {
    primaryCategory = SCAM_CATEGORIES[detectedCategoriesList[0]];
  } else if (riskPenalty > 40) {
    primaryCategory = SCAM_CATEGORIES.ORGANIZATION_IMPERSONATION;
  }

  // Calculate Unified Social Engineering Score
  const scamScore = Math.max(5, Math.min(100, 100 - riskPenalty));

  let threatLevel = 'SAFE';
  if (scamScore < 25) threatLevel = 'CRITICAL';
  else if (scamScore < 55) threatLevel = 'HIGH';
  else if (scamScore < 75) threatLevel = 'MODERATE';

  // Construct Plain-English Assessment
  let plainEnglishAssessment = '';
  if (threatLevel === 'CRITICAL') {
    plainEnglishAssessment = `CRITICAL SOCIAL ENGINEERING SCAM: The message exhibits high-threat deception characteristics typical of a ${primaryCategory ? primaryCategory.title : 'cyber extortion scheme'}. Attackers are attempting to manipulate your emotions or panic you into surrendering credentials, money, or remote device access.`;
  } else if (threatLevel === 'HIGH') {
    plainEnglishAssessment = `HIGH-RISK SUSPICIOUS COMMUNICATION: Detected multiple manipulation indicators including ${languageFindings.length > 0 ? 'urgent coercive language' : 'unusual requests'} and unverified sender claims.`;
  } else if (threatLevel === 'MODERATE') {
    plainEnglishAssessment = 'MODERATE CAUTION: The communication contains minor social engineering patterns or non-standard web links. Exercise care before taking requested actions.';
  } else {
    plainEnglishAssessment = 'BENIGN COMMUNICATION: No aggressive social engineering triggers, unusual payment requests, or credential solicitation patterns were detected.';
  }

  // Compile Comprehensive Evidence Findings
  if (languageFindings.length > 0) evidenceFindings.push(...languageFindings);
  if (impersonationFindings.length > 0) evidenceFindings.push(...impersonationFindings);
  if (paymentFindings.length > 0) evidenceFindings.push(...paymentFindings);
  if (linkFindings.length > 0) evidenceFindings.push(...linkFindings);
  if (sensitiveFindings.length > 0) evidenceFindings.push(...sensitiveFindings);
  if (remoteAccessFindings.length > 0) evidenceFindings.push(...remoteAccessFindings);

  // Generate Actionable Safety Guidance
  const actionableGuidance = [];
  if (sensitiveFindings.length > 0) {
    actionableGuidance.push('🛑 NEVER share your OTP, UPI PIN, or bank passwords with anyone. Banks and official agencies will NEVER ask for these.');
  }
  if (remoteAccessFindings.length > 0) {
    actionableGuidance.push('⚠️ DO NOT install AnyDesk, TeamViewer, or QuickSupport. Scammers use these apps to take complete control of your phone or computer.');
  }
  if (paymentFindings.length > 0) {
    actionableGuidance.push('💳 DO NOT make advance fee payments or UPI transfers. Genuine jobs, prizes, and government refunds never charge processing fees.');
  }
  if (linkFindings.length > 0) {
    actionableGuidance.push('🔗 DO NOT click shortened links (bit.ly, t.me). Access official portals only by typing the known address directly into your browser.');
  }
  if (detectedEntity) {
    actionableGuidance.push(`🏛️ Contact ${detectedEntity} directly via verified official phone numbers or portals to confirm the legitimacy of this communication.`);
  }
  actionableGuidance.push('🚨 Report this scam message to the National Cyber Crime Portal: Call 1930 or visit https://cybercrime.gov.in.');

  return {
    scamScore,
    threatLevel,
    primaryCategory,
    detectedCategories: detectedCategoriesList.map(id => SCAM_CATEGORIES[id]),
    indicators: {
      suspiciousLanguage: {
        detected: languageFindings.length > 0,
        findings: languageFindings
      },
      impersonation: {
        detected: impersonationFindings.length > 0,
        entity: detectedEntity,
        findings: impersonationFindings
      },
      unusualPayments: {
        detected: paymentFindings.length > 0,
        findings: paymentFindings
      },
      misleadingLinks: {
        detected: linkFindings.length > 0,
        links: scannedLinks,
        findings: linkFindings
      },
      sensitiveInfoHarvest: {
        detected: sensitiveFindings.length > 0,
        findings: sensitiveFindings
      },
      remoteAccessTools: {
        detected: remoteAccessFindings.length > 0,
        findings: remoteAccessFindings
      }
    },
    plainEnglishAssessment,
    evidenceFindings: evidenceFindings.length > 0 ? evidenceFindings : ['No adverse psychological manipulation patterns detected.'],
    actionableGuidance
  };
}
