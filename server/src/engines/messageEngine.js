import { analyzePhishing } from './phishingEngine.js';

// AI-Powered Smishing & Scam Message Investigation Engine (SMS, WhatsApp, Telegram)

const SMISHING_PATTERNS = [
  { trigger: 'account blocked', risk: 35, category: 'Banking Panic' },
  { trigger: 'yono', risk: 30, category: 'SBI Smishing' },
  { trigger: 'pan card', risk: 25, category: 'KYC Extortion' },
  { trigger: 'electricity will be disconnected', risk: 40, category: 'Utility Threat Scam' },
  { trigger: 'lottery', risk: 35, category: 'Advance Fee Fraud' },
  { trigger: 'part time job', risk: 30, category: 'Job Extortion' },
  { trigger: 'daily salary', risk: 25, category: 'Telegram Task Scam' },
  { trigger: 'upi pin', risk: 45, category: 'Credential Theft' },
  { trigger: 'claim reward', risk: 25, category: 'Reward Phish' }
];

export function analyzeMessageThreat(messageContent) {
  if (!messageContent || messageContent.trim().length === 0) {
    return {
      score: 50,
      verdict: 'EMPTY_INPUT',
      riskLevel: 'UNKNOWN',
      evidence: ['No message content provided'],
      actionableGuidance: ['Please paste the suspicious SMS or WhatsApp message to scan.']
    };
  }

  const text = messageContent.toLowerCase();
  const evidence = [];
  let riskPenalty = 0;

  // 1. Extract shortlinks or URLs
  const urlRegex = /(https?:\/\/[^\s"'<>]+|bit\.ly\/[^\s"'<>]+|tinyurl\.com\/[^\s"'<>]+|t\.me\/[^\s"'<>]+)/gi;
  const rawUrls = messageContent.match(urlRegex) || [];

  const extractedUrls = rawUrls.map(u => u.startsWith('http') ? u : `https://${u}`);
  let highestUrlRisk = null;

  if (extractedUrls.length > 0) {
    evidence.push(`Shortlink Identified: Message embeds external link '${extractedUrls[0]}'`);
    const linkAnalysis = analyzePhishing(extractedUrls[0]);
    if (linkAnalysis.score < 45 || extractedUrls[0].includes('bit.ly') || extractedUrls[0].includes('tinyurl')) {
      highestUrlRisk = { url: extractedUrls[0], ...linkAnalysis };
      evidence.push(`Deceptive Redirect Risk: URL uses URL shortening/obfuscation commonly used to bypass telecom anti-spam filters`);
      riskPenalty += 40;
    }
  }

  // 2. Scan Smishing Patterns
  const matchedPatterns = [];
  for (const p of SMISHING_PATTERNS) {
    if (text.includes(p.trigger)) {
      matchedPatterns.push(p);
      riskPenalty += p.risk;
    }
  }

  if (matchedPatterns.length > 0) {
    evidence.push(`Smishing Lures Identified: Detected threats [${matchedPatterns.map(m => m.trigger).join(', ')}] typical of SMS cyber fraud`);
  }

  // 3. Sensitive Data Exfiltration Warnings
  if (text.includes('otp') || text.includes('cvv') || text.includes('pin')) {
    evidence.push(`Financial Asset Harvesting: Message requests confidential authentication secrets (OTP/PIN)`);
    riskPenalty += 40;
  }

  const score = Math.max(5, Math.min(100, 100 - riskPenalty));

  let threatLevel = 'SAFE';
  if (score < 30) threatLevel = 'CRITICAL';
  else if (score < 60) threatLevel = 'HIGH';
  else if (score < 80) threatLevel = 'MODERATE';

  // Actionable Guidance
  const actionableGuidance = [];
  if (threatLevel === 'CRITICAL' || threatLevel === 'HIGH') {
    actionableGuidance.push('NEVER share your OTP, UPI PIN, or bank passwords over message or phone call.');
    actionableGuidance.push('Do not tap on shortened links (bit.ly, t.me). Banks and government bodies never send SMS links to update KYC.');
    actionableGuidance.push('Block the sender number and report the scam to the National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in).');
  } else if (threatLevel === 'MODERATE') {
    actionableGuidance.push('Exercise caution. Contact the supposed sender through known official phone numbers before taking action.');
  } else {
    actionableGuidance.push('No obvious smishing patterns detected.');
  }

  return {
    type: 'MESSAGE',
    trustScore: score,
    threatLevel,
    extractedUrls,
    highestUrlRisk,
    evidence,
    actionableGuidance
  };
}
