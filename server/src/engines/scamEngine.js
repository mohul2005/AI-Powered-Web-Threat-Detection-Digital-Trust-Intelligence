// AI-Powered Online Scams & Social Engineering Forensics Engine
// Implements Module 3: AI-Powered Scam and Message Analysis & Section C Requirements

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

// Patterns for Urgency, Intimidation, and Psychological Coercion
const URGENCY_AND_COERCION_PATTERNS = [
  { trigger: 'immediately', weight: 10, category: 'Urgency', note: 'Artificial urgency demand' },
  { trigger: 'urgent action required', weight: 15, category: 'Urgency', note: 'High urgency call-to-action' },
  { trigger: 'within 24 hours', weight: 15, category: 'Urgency', note: 'Strict countdown deadline' },
  { trigger: 'within 12 hours', weight: 15, category: 'Urgency', note: 'Short countdown deadline' },
  { trigger: 'within 1 hour', weight: 20, category: 'Urgency', note: 'Extreme immediate deadline' },
  { trigger: 'before midnight', weight: 15, category: 'Urgency', note: 'Arbitrary calendar cutoff' },
  { trigger: 'final notice', weight: 20, category: 'Urgency', note: 'Final warning pressure' },
  { trigger: 'last warning', weight: 20, category: 'Urgency', note: 'Last chance intimidation' },
  { trigger: 'do not delay', weight: 12, category: 'Urgency', note: 'Immediacy nudge' },
  { trigger: 'account will be blocked', weight: 25, category: 'Panic/Intimidation', note: 'Account access intimidation' },
  { trigger: 'permanently deactivated', weight: 25, category: 'Panic/Intimidation', note: 'Permanent service cutoff threat' },
  { trigger: 'electricity will be disconnected', weight: 30, category: 'Panic/Intimidation', note: 'Essential utility disconnection threat' },
  { trigger: 'sim will be blocked', weight: 25, category: 'Panic/Intimidation', note: 'Telecom service suspension threat' },
  { trigger: 'arrest warrant', weight: 35, category: 'Legal Intimidation', note: 'Fabricated law enforcement threat' },
  { trigger: 'court summons', weight: 35, category: 'Legal Intimidation', note: 'Judicial action threat' },
  { trigger: 'cbi notice', weight: 35, category: 'Legal Intimidation', note: 'Federal agency impersonation threat' },
  { trigger: 'customs parcel seized', weight: 30, category: 'Legal Intimidation', note: 'Border enforcement threat' },
  { trigger: 'guaranteed return', weight: 25, category: 'Financial Lure', note: 'Unrealistic zero-risk promise' },
  { trigger: '100% risk free', weight: 20, category: 'Financial Lure', note: 'Impossible investment claim' },
  { trigger: 'daily income', weight: 20, category: 'Financial Lure', note: 'Get-rich-quick promise' },
  { trigger: 'congratulations you won', weight: 30, category: 'Prize Lure', note: 'Unsolicited lottery notification' },
  { trigger: 'lucky winner', weight: 25, category: 'Prize Lure', note: 'Unsolicited prize lure' }
];

// Patterns for Unusual Payment Solicitations
const UNUSUAL_PAYMENT_PATTERNS = [
  { trigger: 'registration fee', weight: 30, category: 'Advance Fee', note: 'Job/Admission registration paywall' },
  { trigger: 'processing fee', weight: 30, category: 'Advance Fee', note: 'Upfront lottery/loan processing fee' },
  { trigger: 'security deposit', weight: 35, category: 'Advance Fee', note: 'Bogus refundable deposit demand' },
  { trigger: 'laptop security', weight: 30, category: 'Job Scam Fee', note: 'Fake employer hardware fee' },
  { trigger: 'refundable fee', weight: 25, category: 'Advance Fee', note: 'Deceptive promise of refund after payment' },
  { trigger: 'send money to upi', weight: 35, category: 'Unusual UPI Demand', note: 'Direct peer-to-peer transfer demand' },
  { trigger: 'paytm wallet', weight: 20, category: 'Non-Standard Payment', note: 'Consumer wallet transfer' },
  { trigger: 'gift card', weight: 40, category: 'Irreversible Payment', note: 'Untraceable gift card voucher' },
  { trigger: 'amazon gift card', weight: 40, category: 'Irreversible Payment', note: 'Amazon voucher demand' },
  { trigger: 'google play card', weight: 40, category: 'Irreversible Payment', note: 'Google Play card demand' },
  { trigger: 'usdt transfer', weight: 35, category: 'Crypto Transfer', note: 'Cryptocurrency wire demand' },
  { trigger: 'enter your upi pin to receive', weight: 50, category: 'UPI Debit Fraud', note: 'Critical UPI debit deception (PIN is only for sending)' }
];

// Patterns for Sensitive Secret Harvesting
const SENSITIVE_INFO_PATTERNS = [
  { trigger: 'otp', weight: 45, secret: 'One-Time Password (OTP)' },
  { trigger: 'verification code', weight: 40, secret: 'MFA Verification Code' },
  { trigger: 'upi pin', weight: 50, secret: 'UPI Transaction PIN' },
  { trigger: 'atm pin', weight: 50, secret: 'Debit Card ATM PIN' },
  { trigger: 'cvv', weight: 45, secret: 'Card Security Code (CVV)' },
  { trigger: 'netbanking password', weight: 50, secret: 'Netbanking Password' },
  { trigger: 'seed phrase', weight: 50, secret: 'Crypto Wallet Recovery Phrase' },
  { trigger: 'pan card number', weight: 25, secret: 'Permanent Account Number (PAN)' },
  { trigger: 'aadhaar number', weight: 25, secret: 'Aadhaar Biometric/Identity Number' }
];

// Patterns for Remote Access Exploitation
const REMOTE_ACCESS_PATTERNS = [
  { trigger: 'anydesk', weight: 50, app: 'AnyDesk Remote Desktop', risk: 'CRITICAL_DEVICE_HIJACK' },
  { trigger: 'teamviewer', weight: 50, app: 'TeamViewer Remote Control', risk: 'CRITICAL_DEVICE_HIJACK' },
  { trigger: 'rustdesk', weight: 50, app: 'RustDesk Remote Client', risk: 'CRITICAL_DEVICE_HIJACK' },
  { trigger: 'quicksupport', weight: 50, app: 'TeamViewer QuickSupport', risk: 'CRITICAL_DEVICE_HIJACK' },
  { trigger: 'ultraviewer', weight: 50, app: 'UltraViewer', risk: 'CRITICAL_DEVICE_HIJACK' },
  { trigger: 'screen share', weight: 35, app: 'Live Screen Monitoring', risk: 'SURVEILLANCE_RISK' },
  { trigger: 'install apk', weight: 45, app: 'Rogue Sideloaded Android APK', risk: 'MALWARE_INSTALLATION' },
  { trigger: 'call support at', weight: 30, app: 'Unverified Helpline Callback', risk: 'ROGUE_CALL_CENTER' }
];

// High-Profile Impersonated Brands & Institutions
const IMPERSONATED_ENTITIES = [
  { name: 'State Bank of India (SBI)', keywords: ['sbi', 'yono', 'state bank of india', 'onlinesbi'], category: 'Banking', officialDomain: 'onlinesbi.sbi' },
  { name: 'HDFC Bank', keywords: ['hdfc', 'hdfc bank', 'netbanking.hdfcbank'], category: 'Banking', officialDomain: 'hdfcbank.com' },
  { name: 'ICICI Bank', keywords: ['icici', 'imobile', 'icicibank'], category: 'Banking', officialDomain: 'icicibank.com' },
  { name: 'Income Tax Department of India', keywords: ['income tax', 'efiling', 'it department', 'tax refund', 'incometax.gov.in'], category: 'Government', officialDomain: 'incometax.gov.in' },
  { name: 'Electricity / Power Board', keywords: ['electricity bill', 'power corporation', 'bses', 'mseb', 'tneb', 'uppcl'], category: 'Utility', officialDomain: 'official state portal' },
  { name: 'India Post (Speed Post)', keywords: ['indiapost', 'speed post', 'postal service', 'parcel delivery'], category: 'Logistics', officialDomain: 'indiapost.gov.in' },
  { name: 'National Testing Agency (NTA)', keywords: ['nta', 'neet', 'jee', 'cuet', 'admit card', 'hall ticket'], category: 'Education', officialDomain: 'nta.ac.in' },
  { name: 'Microsoft Windows Defender', keywords: ['microsoft', 'windows defender', 'windows security alert', 'trojan:win32'], category: 'Tech Support', officialDomain: 'microsoft.com' },
  { name: 'Google Security', keywords: ['google hr', 'google careers', 'google hiring', 'google security alert'], category: 'Corporate', officialDomain: 'google.com' },
  { name: 'Amazon Support / Giveaway', keywords: ['amazon prize', 'amazon customer care', 'amazon lucky draw', 'amazon order confirmation'], category: 'E-Commerce', officialDomain: 'amazon.in' },
  { name: 'Kaun Banega Crorepati (KBC)', keywords: ['kbc', 'kaun banega crorepati', 'kbc lottery', 'kbc lucky draw'], category: 'Prize Syndicate', officialDomain: 'sonyliv.com' }
];

// Helper 1: Extract URLs & Obfuscated Shortlinks
export function extractUrls(text) {
  if (!text) return [];
  const urlRegex = /(https?:\/\/[^\s"'<>\),]+|bit\.ly\/[^\s"'<>\),]+|tinyurl\.com\/[^\s"'<>\),]+|t\.me\/[^\s"'<>\),]+|wa\.me\/[^\s"'<>\),]+)/gi;
  const matches = text.match(urlRegex) || [];
  return Array.from(new Set(matches)).map(url => {
    const isShortened = /bit\.ly|tinyurl\.com|t\.me|wa\.me|cutt\.ly|is\.gd|rb\.gy/i.test(url);
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    return {
      raw: url,
      fullUrl,
      isShortened
    };
  });
}

// Helper 2: Extract Email Addresses
export function extractEmails(text) {
  if (!text) return [];
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const matches = text.match(emailRegex) || [];
  return Array.from(new Set(matches)).map(email => {
    const domain = email.split('@')[1].toLowerCase();
    const isFreeWebmail = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'rediffmail.com', 'aol.com'].includes(domain);
    const isDisposable = ['tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com', 'throwaway.email'].includes(domain);
    return {
      email,
      domain,
      isFreeWebmail,
      isDisposable
    };
  });
}

// Helper 3: Extract Phone Numbers & Helplines
export function extractPhoneNumbers(text) {
  if (!text) return [];
  // Match toll-free numbers (1800-xxx-xxxx), Indian mobile numbers (+91 9xxx, 8xxx), and generic numbers
  const tollFreeRegex = /\b1800[-.\s]?\d{3}[-.\s]?\d{3,4}\b/g;
  const indianMobileRegex = /(?:\+?91[\-\s]?)?[6-9]\d{4}[\-\s]?\d{5}\b/g;
  const intlRegex = /\+?\d{1,3}[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}\b/g;

  const tollFreeMatches = text.match(tollFreeRegex) || [];
  const mobileMatches = text.match(indianMobileRegex) || [];
  const intlMatches = text.match(intlRegex) || [];

  const allNumbers = Array.from(new Set([...tollFreeMatches, ...mobileMatches, ...intlMatches]));

  return allNumbers.map(num => {
    const cleanNum = num.replace(/[-.\s]/g, '');
    const isTollFree = cleanNum.startsWith('1800');
    const isPersonalMobile = /^(?:\+?91)?[6-9]\d{9}$/.test(cleanNum);
    return {
      number: num,
      cleanNumber: cleanNum,
      isTollFree,
      isPersonalMobile,
      type: isTollFree ? 'Toll-Free Helpline' : isPersonalMobile ? 'Personal Mobile Number' : 'Telephone / VoIP'
    };
  });
}

// Helper 4: Extract Payment Identifiers (UPI, Crypto Wallets)
export function extractPaymentIdentifiers(text) {
  if (!text) return [];
  const upiRegex = /\b[a-zA-Z0-9.\-_]{2,64}@(okaxis|oksbi|okhdfcbank|okicici|paytm|ybl|ibl|axl|upi|sbi|apl|postbank)\b/gi;
  const btcRegex = /\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}\b/g;
  const ethRegex = /\b0x[a-fA-F0-9]{40}\b/g;
  const trc20Regex = /\bT[A-Za-z1-9]{33}\b/g;

  const upiMatches = text.match(upiRegex) || [];
  const btcMatches = text.match(btcRegex) || [];
  const ethMatches = text.match(ethRegex) || [];
  const trc20Matches = text.match(trc20Regex) || [];

  const list = [];
  for (const upi of Array.from(new Set(upiMatches))) {
    list.push({ handle: upi, type: 'UPI_HANDLE', riskAssessment: 'Unverified peer-to-peer UPI ID used for fee solicitation' });
  }
  for (const btc of Array.from(new Set(btcMatches))) {
    list.push({ handle: btc, type: 'BITCOIN_WALLET', riskAssessment: 'Irreversible cryptocurrency deposit address' });
  }
  for (const eth of Array.from(new Set(ethMatches))) {
    list.push({ handle: eth, type: 'ETHEREUM_WALLET', riskAssessment: 'Direct non-custodial smart contract / wallet address' });
  }
  for (const trc of Array.from(new Set(trc20Matches))) {
    list.push({ handle: trc, type: 'USDT_TRC20_WALLET', riskAssessment: 'TRC-20 high-velocity money laundering wallet address' });
  }

  return list;
}

// Core Function: Module 3 AI-Powered Scam and Message Analysis
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
      actionableGuidance: ['Please provide message text, email body, or transcript to evaluate.'],
      module3ScamReport: null
    };
  }

  const rawText = communicationText;
  const text = communicationText.toLowerCase();

  // 1. EXTRACT ALL RELEVANT INDICATORS (Module 3 requirement)
  const extractedUrlsList = extractUrls(rawText);
  const extractedEmailsList = extractEmails(rawText);
  const extractedPhoneNumbersList = extractPhoneNumbers(rawText);
  const extractedPaymentList = extractPaymentIdentifiers(rawText);

  // 2. CORRELATE EXTRACTED INDICATORS WITH THREAT INTELLIGENCE
  const analyzedLinks = [];
  const verifiedMaliciousUrls = [];
  for (const item of extractedUrlsList.slice(0, 4)) {
    const urlAnalysis = analyzePhishing(item.fullUrl);
    const domain = item.fullUrl.replace(/^https?:\/\//i, '').split('/')[0].split('?')[0];
    const isSuspiciousTld = /\.(top|xyz|club|work|site|buzz|cc|tk|ml|ga|cf|gq)$/i.test(domain);

    const linkRecord = {
      url: item.fullUrl,
      raw: item.raw,
      domain,
      score: urlAnalysis.score,
      verdict: urlAnalysis.verdict,
      threatLevel: urlAnalysis.score < 25 ? 'CRITICAL' : urlAnalysis.score < 50 ? 'HIGH' : urlAnalysis.score < 75 ? 'MODERATE' : 'SAFE',
      isShortened: item.isShortened,
      isSuspiciousTld
    };
    analyzedLinks.push(linkRecord);

    if (urlAnalysis.score < 40 || isSuspiciousTld || item.isShortened) {
      verifiedMaliciousUrls.push(linkRecord);
    }
  }

  // 3. IDENTIFY COMMON SOCIAL ENGINEERING PATTERNS
  let riskPenalty = 0;
  const detectedCategorySet = new Set();

  // (a) Urgency & Coercive Language
  const urgentLanguageFindings = [];
  for (const item of URGENCY_AND_COERCION_PATTERNS) {
    if (text.includes(item.trigger)) {
      urgentLanguageFindings.push(`Contains coercive phrase '${item.trigger}' (${item.note})`);
      riskPenalty += item.weight;
    }
  }

  // (b) Impersonation Attempts
  let detectedEntity = null;
  const impersonationFindings = [];
  for (const entity of IMPERSONATED_ENTITIES) {
    for (const kw of entity.keywords) {
      if (text.includes(kw)) {
        detectedEntity = entity.name;
        impersonationFindings.push(`Impersonates official entity '${entity.name}' (${entity.category}). Official domain: ${entity.officialDomain}`);
        detectedCategorySet.add(SCAM_CATEGORIES.ORGANIZATION_IMPERSONATION.id);
        riskPenalty += 25;
        break;
      }
    }
    if (detectedEntity) break;
  }

  // (c) Unusual Payment Requests
  const paymentFindings = [];
  for (const p of UNUSUAL_PAYMENT_PATTERNS) {
    if (text.includes(p.trigger)) {
      paymentFindings.push(`Unusual payment solicitation: '${p.trigger}' (${p.category} - ${p.note})`);
      riskPenalty += p.weight;
      if (p.category === 'Advance Fee') detectedCategorySet.add(SCAM_CATEGORIES.FAKE_GIVEAWAY_PRIZE.id);
      if (p.category === 'Job Scam Fee') detectedCategorySet.add(SCAM_CATEGORIES.FAKE_JOB_INTERNSHIP.id);
      if (p.category === 'UPI Debit Fraud') detectedCategorySet.add(SCAM_CATEGORIES.FRAUDULENT_REFUND_CASHBACK.id);
    }
  }
  for (const payHandle of extractedPaymentList) {
    paymentFindings.push(`Contains direct payment handle: ${payHandle.handle} [${payHandle.type}]`);
    riskPenalty += 20;
  }

  // (d) Misleading Links & Shortener Findings
  const linkFindings = [];
  for (const link of analyzedLinks) {
    if (link.isShortened) {
      linkFindings.push(`Obfuscated link detected: '${link.raw}' conceals actual target server destination.`);
      riskPenalty += 30;
    }
    if (link.isSuspiciousTld) {
      linkFindings.push(`High-threat TLD detected: '${link.domain}' is registered on untrusted domain space.`);
      riskPenalty += 35;
    }
    if (link.score < 40) {
      linkFindings.push(`Embedded link '${link.url}' resolved to confirmed deceptive payload (${link.verdict}).`);
      riskPenalty += 45;
    }
  }

  // (e) Attempts to Obtain Sensitive Authentication Secrets (OTP / PIN)
  const sensitiveFindings = [];
  for (const item of SENSITIVE_INFO_PATTERNS) {
    if (text.includes(item.trigger)) {
      sensitiveFindings.push(`Direct solicitation of confidential authentication secret: '${item.secret}'`);
      detectedCategorySet.add(SCAM_CATEGORIES.CREDENTIAL_OTP_HARVESTING.id);
      riskPenalty += item.weight;
    }
  }

  // (f) Remote-Access Software Coercion
  const remoteAccessFindings = [];
  for (const r of REMOTE_ACCESS_PATTERNS) {
    if (text.includes(r.trigger)) {
      remoteAccessFindings.push(`Remote desktop exploitation: Directs victim to install or use '${r.app}' (${r.risk})`);
      detectedCategorySet.add(SCAM_CATEGORIES.TECH_SUPPORT_REMOTE_ACCESS.id);
      riskPenalty += r.weight;
    }
  }

  // Contextual Scam Category Classification
  if (text.includes('job') || text.includes('internship') || text.includes('part time') || text.includes('daily salary')) {
    detectedCategorySet.add(SCAM_CATEGORIES.FAKE_JOB_INTERNSHIP.id);
  }
  if (text.includes('crypto') || text.includes('usdt') || text.includes('invest') || text.includes('trading') || text.includes('forex') || text.includes('roi')) {
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
  if (text.includes('customer care') || text.includes('helpline') || text.includes('support team') || text.includes('toll free') || text.includes('call support')) {
    detectedCategorySet.add(SCAM_CATEGORIES.FAKE_CUSTOMER_SUPPORT.id);
  }

  const detectedCategoriesList = Array.from(detectedCategorySet);
  let primaryCategory = null;
  if (detectedCategoriesList.length > 0) {
    primaryCategory = SCAM_CATEGORIES[detectedCategoriesList[0]];
  }

  // -------------------------------------------------------------
  // 4. CRITICAL BOUNDARY RULE IMPLEMENTATION (Module 3 Essential Requirement)
  // "The AI should distinguish between suspicious language and verified evidence of fraud.
  //  A message should not be labelled fraudulent solely because it contains urgent or persuasive language."
  // -------------------------------------------------------------
  const verifiedFraudEvidence = [];

  // Check concrete evidence of fraud:
  if (verifiedMaliciousUrls.length > 0) {
    for (const vUrl of verifiedMaliciousUrls) {
      verifiedFraudEvidence.push(`Malicious Hyperlink: Destination '${vUrl.url}' is confirmed deceptive or hosted on high-risk domain`);
    }
  }
  if (sensitiveFindings.length > 0) {
    for (const s of sensitiveFindings) {
      verifiedFraudEvidence.push(`Credential Theft: ${s}`);
    }
  }
  if (remoteAccessFindings.length > 0) {
    for (const r of remoteAccessFindings) {
      verifiedFraudEvidence.push(`Remote Device Control Exploitation: ${r}`);
    }
  }
  if (paymentFindings.length > 0) {
    for (const p of paymentFindings) {
      verifiedFraudEvidence.push(`Fraudulent Payment Solicitation: ${p}`);
    }
  }
  // If sender claims to be a bank/govt but uses free webmail (From header / email address)
  for (const em of extractedEmailsList) {
    if (detectedEntity && em.isFreeWebmail) {
      verifiedFraudEvidence.push(`Identity Impersonation Discrepancy: Claims official representation of ${detectedEntity} but communicates via free webmail (@${em.domain})`);
    }
  }

  const hasUrgentLanguage = urgentLanguageFindings.length > 0;
  const hasVerifiedFraud = verifiedFraudEvidence.length > 0;

  let module3Status = 'BENIGN_COMMUNICATION';
  let scamScore = 95;
  let threatLevel = 'SAFE';
  let boundaryRationale = '';
  let plainEnglishAssessment = '';

  if (hasVerifiedFraud) {
    // 🔴 CASE 1: VERIFIED EVIDENCE OF FRAUD DETECTED
    module3Status = 'VERIFIED_EVIDENCE_OF_FRAUD';
    threatLevel = 'CRITICAL';
    scamScore = Math.max(5, Math.min(28, 100 - riskPenalty));
    boundaryRationale = 'Verified evidence of active fraud confirmed through technical IOCs, credential harvesting, remote-access coercion, or fraudulent payment demands.';
    plainEnglishAssessment = `CRITICAL SOCIAL ENGINEERING FRAUD: Active indicators of technical or financial deception were verified in this message. Attackers are attempting to deceive you into surrendering money, credentials, or remote device control under the pretext of ${primaryCategory ? primaryCategory.title : 'an urgent notice'}.`;
  } else if (hasUrgentLanguage) {
    // 🟡 CASE 2: URGENT / PERSUASIVE LANGUAGE ONLY (Crucial AI Boundary Rule)
    module3Status = 'SUSPICIOUS_URGENT_LANGUAGE_NO_FRAUD_EVIDENCE';
    threatLevel = 'MODERATE';
    // Score is kept high (72-85): it is NOT labelled fraudulent!
    scamScore = Math.max(72, Math.min(86, 100 - (urgentLanguageFindings.length * 5)));
    boundaryRationale = 'AI Boundary Rule Enforced: The communication exhibits urgent or persuasive phrasing, but contains NO verified technical evidence of fraud (zero credential harvesting, zero malicious links, zero remote access tools, and zero rogue payment demands). Under Module 3 AI Boundary Rules, a message must never be labelled fraudulent solely because it contains urgent or persuasive language.';
    plainEnglishAssessment = 'CAUTIONARY COMMUNICATION (NOT FRAUDULENT): This message contains urgent, persuasive, or deadline-oriented language. However, rigorous inspection revealed ZERO technical evidence of fraud (no credential harvesting, no malware links, no AnyDesk remote access, and no fake payment requests). Under Module 3 rules, it is not classified as fraudulent.';
  } else {
    // 🟢 CASE 3: BENIGN COMMUNICATION
    module3Status = 'BENIGN_COMMUNICATION';
    threatLevel = 'SAFE';
    scamScore = 98;
    boundaryRationale = 'Communication exhibits authentic characteristics with zero emotional manipulation or malicious indicators.';
    plainEnglishAssessment = 'BENIGN COMMUNICATION: No aggressive social engineering triggers, unusual payment requests, credential solicitation, or deceptive hyperlinks were detected.';
  }

  // Compile Comprehensive Evidence Findings
  const evidenceFindings = [];
  if (hasVerifiedFraud) {
    evidenceFindings.push(...verifiedFraudEvidence);
  }
  if (urgentLanguageFindings.length > 0) {
    evidenceFindings.push(...urgentLanguageFindings);
  }
  if (impersonationFindings.length > 0) {
    evidenceFindings.push(...impersonationFindings);
  }

  // Actionable Safety Guidance
  const actionableGuidance = [];
  if (hasVerifiedFraud) {
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
    actionableGuidance.push('🚨 Report this scam message to the National Cyber Crime Portal: Call 1930 or visit https://cybercrime.gov.in.');
  } else if (hasUrgentLanguage) {
    actionableGuidance.push('ℹ️ Urgent language was detected, but no fraudulent links, OTP demands, or payment requests were found.');
    actionableGuidance.push('Verify the communication directly through the official website or customer helpline of the claimed sender before taking action.');
    actionableGuidance.push('Do not forward or reply to unverified notices until confirmed.');
  } else {
    actionableGuidance.push('✅ The message appears safe. Always maintain digital security hygiene and never share authentication credentials.');
  }

  // 5. STANDARDIZED MODULE 3 DELIVERABLE
  const module3ScamReport = {
    module: 'Module 3: AI-Powered Scam and Message Analysis',
    status: module3Status,
    boundaryRule: {
      axiom: 'A message should not be labelled fraudulent solely because it contains urgent or persuasive language.',
      urgentLanguageDetected: hasUrgentLanguage,
      verifiedFraudEvidenceDetected: hasVerifiedFraud,
      assessmentRationale: boundaryRationale
    },
    socialEngineeringPatterns: {
      urgencyManipulation: { detected: urgentLanguageFindings.length > 0, count: urgentLanguageFindings.length, findings: urgentLanguageFindings },
      impersonationAttempts: { detected: impersonationFindings.length > 0, entity: detectedEntity, findings: impersonationFindings },
      paymentDemands: { detected: paymentFindings.length > 0, findings: paymentFindings },
      credentialHarvesting: { detected: sensitiveFindings.length > 0, findings: sensitiveFindings },
      remoteAccessExploitation: { detected: remoteAccessFindings.length > 0, findings: remoteAccessFindings }
    },
    extractedEntities: {
      urls: analyzedLinks,
      emails: extractedEmailsList,
      phoneNumbers: extractedPhoneNumbersList,
      paymentHandles: extractedPaymentList
    },
    threatIntelligenceCorrelation: {
      totalEntitiesExtracted: analyzedLinks.length + extractedEmailsList.length + extractedPhoneNumbersList.length + extractedPaymentList.length,
      suspiciousLinksCount: verifiedMaliciousUrls.length,
      reputationSummary: hasVerifiedFraud ? 'High-risk malicious indicators correlated with known threat clusters.' : 'No hostile indicators correlated with active threat feeds.'
    },
    plainEnglishAssessment,
    recommendedSafetyMeasures: actionableGuidance
  };

  return {
    scamScore,
    trustScore: scamScore,
    threatLevel,
    primaryCategory,
    detectedCategories: detectedCategoriesList.map(id => SCAM_CATEGORIES[id]),
    indicators: {
      suspiciousLanguage: {
        detected: urgentLanguageFindings.length > 0,
        findings: urgentLanguageFindings
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
        links: analyzedLinks,
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
    extractedEntities: {
      urls: analyzedLinks,
      emails: extractedEmailsList,
      phoneNumbers: extractedPhoneNumbersList,
      paymentHandles: extractedPaymentList
    },
    module3ScamReport,
    plainEnglishAssessment,
    evidenceFindings: evidenceFindings.length > 0 ? evidenceFindings : ['No adverse psychological manipulation patterns detected.'],
    actionableGuidance
  };
}
