/**
 * TrustMatrix AI Nexus - Module 12: Advanced Extensions
 * Engine 1: QR Code Scam Detection (Quishing & Rogue Payment Heuristics)
 *
 * Implements:
 * 1. UPI Payment QR Inspection (Reverse QR Fraud, Mule Accounts, Coerced Amounts)
 * 2. Phishing URL QR Detection (Shortened links, Brand Spoofing via QR)
 * 3. Malicious APK / Sideloading QR Payloads
 * 4. Cryptocurrency Address QR Scams
 */

import crypto from 'crypto';
import { analyzePhishing } from './phishingEngine.js';

// Suspicious UPI Payee handles known to be used by fraud syndicates
const HIGH_RISK_UPI_DOMAINS = [
  'okaxis', 'ybl', 'okhdfcbank', 'paytm', 'ibl', 'axl', 'apl'
];

/**
 * Parses and analyzes a raw QR code string payload
 * @param {string} qrPayload - Decoded text from QR code (e.g. upi://pay?... or https://...)
 * @returns {object} Full Quishing Forensics Dossier
 */
export function analyzeQRPayload(qrPayload) {
  if (!qrPayload || typeof qrPayload !== 'string' || qrPayload.trim().length === 0) {
    return {
      isValid: false,
      riskScore: 50,
      verdict: 'EMPTY_PAYLOAD',
      error: 'No QR code payload provided for analysis.'
    };
  }

  const raw = qrPayload.trim();
  const lower = raw.toLowerCase();
  const timestamp = new Date().toISOString();
  const indicators = [];
  let riskScore = 100; // Starts clean (100 = safe, 0 = critical threat)
  let payloadType = 'UNKNOWN';
  let details = {};

  // =========================================================================
  // 1. UPI Payment QR Analysis (Quishing / Rogue Collection)
  // =========================================================================
  if (lower.startsWith('upi://pay') || lower.startsWith('upi://') || lower.includes('pa=') && lower.includes('&pn=')) {
    payloadType = 'UPI_PAYMENT_QR';
    
    // Parse UPI Query Parameters
    let parsedParams = {};
    try {
      const urlLike = raw.includes('?') ? raw : `upi://pay?${raw.replace(/^upi:\/\//, '')}`;
      const urlObj = new URL(urlLike.startsWith('upi://') ? urlLike.replace('upi://', 'http://placeholder/') : urlLike);
      urlObj.searchParams.forEach((val, key) => {
        parsedParams[key] = val;
      });
    } catch (e) {
      // Fallback regex parsing
      const paMatch = raw.match(/[?&]pa=([^&]+)/i);
      const pnMatch = raw.match(/[?&]pn=([^&]+)/i);
      const amMatch = raw.match(/[?&]am=([^&]+)/i);
      const cuMatch = raw.match(/[?&]cu=([^&]+)/i);
      const tnMatch = raw.match(/[?&]tn=([^&]+)/i);
      if (paMatch) parsedParams.pa = decodeURIComponent(paMatch[1]);
      if (pnMatch) parsedParams.pn = decodeURIComponent(pnMatch[1]);
      if (amMatch) parsedParams.am = decodeURIComponent(amMatch[1]);
      if (cuMatch) parsedParams.cu = decodeURIComponent(cuMatch[1]);
      if (tnMatch) parsedParams.tn = decodeURIComponent(tnMatch[1]);
    }

    const payeeHandle = parsedParams.pa || '';
    const payeeName = parsedParams.pn || '';
    const requestedAmount = parsedParams.am ? parseFloat(parsedParams.am) : null;
    const transactionNote = parsedParams.tn || '';

    details = {
      payeeHandle,
      payeeName,
      requestedAmount,
      currency: parsedParams.cu || 'INR',
      transactionNote
    };

    // A. REVERSE QR SCAM DETECTION:
    // Fraudsters tell victims: "Scan this QR code to RECEIVE your lottery prize / refund / buyer payment"
    // In UPI protocol, scanning a QR code ALWAYS DEBITS the scanner's account!
    const noteLower = transactionNote.toLowerCase();
    const nameLower = payeeName.toLowerCase();
    if (
      noteLower.includes('receive') || noteLower.includes('credit') || noteLower.includes('refund') ||
      noteLower.includes('cashback') || noteLower.includes('lottery') || noteLower.includes('winner') ||
      noteLower.includes('claim') || nameLower.includes('refund')
    ) {
      riskScore -= 65;
      indicators.push({
        id: 'QUISH-REVERSE-01',
        title: 'Reverse QR Payment Scam Detected',
        severity: 'CRITICAL',
        technicalEvidence: `Transaction note '${transactionNote}' or name '${payeeName}' falsely promises credit/refund. UPI QR codes strictly authorize DEBITS.`,
        impact: 'Victim will have funds deducted immediately instead of receiving money.'
      });
    }

    // B. MULE ACCOUNT IMPERSONATION:
    // Personal handles pretending to be official institutions
    if (
      (nameLower.includes('electricity') || nameLower.includes('discom') || nameLower.includes('challan') ||
       nameLower.includes('police') || nameLower.includes('bank') || nameLower.includes('sbi') || nameLower.includes('hdfc')) &&
      (payeeHandle.includes('@okaxis') || payeeHandle.includes('@ybl') || payeeHandle.includes('@paytm'))
    ) {
      riskScore -= 45;
      indicators.push({
        id: 'QUISH-MULE-02',
        title: 'Impersonated Utility / Bank on Personal VPA',
        severity: 'HIGH',
        technicalEvidence: `Payee name claims to be '${payeeName}', but handle '${payeeHandle}' is a retail/consumer UPI account rather than a verified merchant merchant ID.`,
        impact: 'Payment will be routed to a money mule account with zero audit trail.'
      });
    }

    // C. SUSPICIOUS HIGH / FORCED AMOUNT:
    if (requestedAmount && requestedAmount > 10000) {
      riskScore -= 20;
      indicators.push({
        id: 'QUISH-AMT-03',
        title: 'Unusually High Pre-Set Payment Amount',
        severity: 'MEDIUM',
        technicalEvidence: `QR code enforces a non-negotiable transfer of ₹${requestedAmount}.`,
        impact: 'Immediate high-value transfer upon PIN entry.'
      });
    }
  }

  // =========================================================================
  // 2. URL-based QR Code Analysis (Web Quishing)
  // =========================================================================
  else if (lower.startsWith('http://') || lower.startsWith('https://')) {
    payloadType = 'URL_QUISHING';
    
    // Check for shortener masking
    const isShortener = /(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|rb\.gy|qrco\.de|qr\.io)/i.test(raw);
    if (isShortener) {
      riskScore -= 30;
      indicators.push({
        id: 'QUISH-SHORTENER-01',
        title: 'Obfuscated Shortened URL in QR Code',
        severity: 'HIGH',
        technicalEvidence: `Target URL '${raw}' uses URL shortening services to mask true destination from visual inspection.`,
        impact: 'Bypasses user visual domain inspection before scanning.'
      });
    }

    // Check for direct APK / Executable download
    if (/\.(apk|exe|dmg|sh|bat|bin)$/i.test(raw) || lower.includes('download.php?app=') || lower.includes('update.apk')) {
      riskScore -= 50;
      indicators.push({
        id: 'QUISH-MALWARE-02',
        title: 'Direct Malicious Binary Download via QR',
        severity: 'CRITICAL',
        technicalEvidence: `QR directs device to directly fetch executable installer: '${raw}'.`,
        impact: 'Installation of Android remote access trojan (RAT) or spyware.'
      });
    }

    // Run underlying phishing heuristics
    const phishEval = analyzePhishing(raw);
    if (phishEval && phishEval.score < 50) {
      riskScore -= (50 - phishEval.score);
      indicators.push({
        id: 'QUISH-PHISH-03',
        title: `Phishing Brand Impersonation: ${phishEval.impersonatedBrand || 'Deceptive Domain'}`,
        severity: 'CRITICAL',
        technicalEvidence: `Underlying domain failed heuristic brand distance and entropy verification: ${phishEval.signals.join('; ')}`,
        impact: 'Credential harvesting and identity theft.'
      });
    }

    details = {
      targetUrl: raw,
      isShortener,
      phishVerdict: phishEval ? phishEval.verdict : 'N/A'
    };
  }

  // =========================================================================
  // 3. Cryptographic Wallet / Drainer Address QR
  // =========================================================================
  else if (lower.startsWith('ethereum:') || lower.startsWith('bitcoin:') || /^(0x[0-9a-f]{40}|[13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[a-z0-9]{39,59})$/i.test(raw)) {
    payloadType = 'CRYPTO_WALLET_QR';
    const isKnownDrainer = lower.includes('0x71c8') || lower.includes('drainer') || lower.includes('permit2');
    
    if (isKnownDrainer) {
      riskScore = 15;
      indicators.push({
        id: 'QUISH-CRYPTO-01',
        title: 'Known Smart Contract Drainer / Phishing Address',
        severity: 'CRITICAL',
        technicalEvidence: `QR encodes cryptocurrency transfer or approval to flagged wallet address: '${raw}'.`,
        impact: 'Total liquidation of native tokens and ERC-20 token balances.'
      });
    }

    details = {
      walletAddress: raw,
      blockchain: lower.startsWith('0x') ? 'Ethereum / EVM' : 'Bitcoin / UTXO'
    };
  }

  // =========================================================================
  // 4. Raw Text / VCard / Wi-Fi QR
  // =========================================================================
  else {
    payloadType = 'TEXT_OR_DATA_QR';
    if (lower.startsWith('wifi:')) {
      details = { type: 'Wi-Fi Configuration' };
    } else {
      details = { snippet: raw.substring(0, 100) };
    }
  }

  // Normalize final score (0 to 100)
  const normalizedScore = Math.max(5, Math.min(100, riskScore));

  let verdict = 'SAFE_QR_PAYLOAD';
  let threatLevel = 'LOW';
  if (normalizedScore <= 35) {
    verdict = 'CONFIRMED_QUISHING_FRAUD';
    threatLevel = 'CRITICAL';
  } else if (normalizedScore <= 65) {
    verdict = 'SUSPICIOUS_QR_PAYLOAD';
    threatLevel = 'HIGH';
  } else if (normalizedScore <= 85) {
    verdict = 'MODERATE_RISK_ANOMALY';
    threatLevel = 'MEDIUM';
  }

  // Standardized Actionable Safety Precautions
  const recommendedActions = [];
  if (threatLevel === 'CRITICAL' || threatLevel === 'HIGH') {
    recommendedActions.push('🛑 DO NOT SCAN / PAY: Never scan a QR code expecting to receive money. In UPI, QR codes ONLY pay out.');
    recommendedActions.push('🚫 BLOCK SENDER: Block and report the communication source on WhatsApp / SMS.');
    recommendedActions.push('📞 REPORT FRAUD: Dial National Cybercrime Helpline 1930 if UPI PIN was entered.');
  } else {
    recommendedActions.push('✅ Standard QR Payload: Verify merchant name on your UPI app screen before entering UPI PIN.');
  }

  return {
    module: 'Module 12: Optional Advanced Extensions (QR Scam Detection)',
    timestamp,
    qrPayload: raw,
    payloadType,
    trustScore: normalizedScore,
    threatLevel,
    verdict,
    indicators,
    details,
    recommendedActions,
    cryptographicHash: `0x${crypto.createHash('sha256').update(raw).digest('hex')}`
  };
}

/**
 * Pre-defined Quishing Test Scenarios for Demonstration and Automated Benchmarks
 */
export const SAMPLE_QUISHING_SCENARIOS = [
  {
    id: 'quish-reverse-upi-scam',
    title: 'OLX / Marketplace Reverse QR Scam',
    description: 'Buyer claims to send advance money via QR, but encodes debit request with transaction note "Receive Cash ₹15,000"',
    payload: 'upi://pay?pa=raghav-claims@okaxis&pn=OLX%20Buyer%20Payment&am=15000.00&cu=INR&tn=Scan%20to%20Receive%20Advance%20Cash',
    expectedVerdict: 'CONFIRMED_QUISHING_FRAUD',
    expectedThreat: 'CRITICAL'
  },
  {
    id: 'quish-electricity-bill-scam',
    title: 'Electricity Discom Quishing on Mule VPA',
    description: 'Fake power department notice with QR encoding retail mule VPA pretending to be State Electricity Board',
    payload: 'upi://pay?pa=power-discom-bill@ybl&pn=State%20Electricity%20Discom&am=480.00&cu=INR&tn=Electricity%20Bill%20Avoid%20Disconnection',
    expectedVerdict: 'SUSPICIOUS_QR_PAYLOAD',
    expectedThreat: 'HIGH'
  },
  {
    id: 'quish-malicious-apk-drop',
    title: 'Bank KYC APK Sideloading QR',
    description: 'QR code posted on phishing SMS directing device to directly download an infostealer APK',
    payload: 'https://sbi-yono-update.top/download/yono-kyc-patch.apk',
    expectedVerdict: 'CONFIRMED_QUISHING_FRAUD',
    expectedThreat: 'CRITICAL'
  },
  {
    id: 'quish-legitimate-merchant',
    title: 'Legitimate Verified Merchant QR (Safe Baseline)',
    description: 'Authentic verified merchant QR code for a retail coffee store with zero deceptive notes',
    payload: 'upi://pay?pa=starbucks.merchant@icici&pn=Starbucks%20Coffee&cu=INR',
    expectedVerdict: 'SAFE_QR_PAYLOAD',
    expectedThreat: 'LOW'
  }
];
