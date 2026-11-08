import { analyzePhishing } from './phishingEngine.js';

// AI-Powered Email Threat & Phishing Investigation Engine

const URGENCY_TRIGGERS = [
  'account suspended', 'immediate action required', 'wire transfer', 'payroll update',
  'invoice overdue', 'password expired', 'unauthorized login detected', 'tax refund',
  'verify identity within 24 hours', 'kyc pending', 'final notice', 'fund transfer'
];

export function analyzeEmailThreat(emailContent) {
  if (!emailContent || emailContent.trim().length === 0) {
    return {
      score: 50,
      verdict: 'EMPTY_INPUT',
      riskLevel: 'UNKNOWN',
      evidence: ['No email content provided'],
      actionableGuidance: ['Please paste the suspicious email body or headers to scan.']
    };
  }

  const text = emailContent.toLowerCase();
  const evidence = [];
  let riskPenalty = 0;
  let impersonatedBrand = null;

  // 1. Extract embedded links from email text
  const urlRegex = /(https?:\/\/[^\s"'<>]+)/gi;
  const extractedUrls = emailContent.match(urlRegex) || [];

  let highestUrlRisk = null;
  if (extractedUrls.length > 0) {
    evidence.push(`Embedded Links Found: Identified ${extractedUrls.length} external URL(s) inside message body`);
    for (const link of extractedUrls.slice(0, 3)) {
      const urlAnalysis = analyzePhishing(link);
      if (urlAnalysis.score < 40) {
        highestUrlRisk = { url: link, ...urlAnalysis };
        evidence.push(`Malicious Hyperlink Detected: Embedded link '${link}' was identified as deceptive (${urlAnalysis.verdict})`);
        riskPenalty += 45;
        break;
      }
    }
  } else {
    evidence.push('Hyperlink Inspection: No external URLs detected in email body');
  }

  // 2. Sender Domain & Header Spoofing Checks (From vs Reply-To)
  const fromMatch = emailContent.match(/From:\s*([^<\n\r]+<)?([^>\n\r]+)>?/i);
  const replyToMatch = emailContent.match(/Reply-To:\s*([^<\n\r]+<)?([^>\n\r]+)>?/i);

  if (fromMatch && replyToMatch) {
    const fromAddress = fromMatch[2].trim().toLowerCase();
    const replyToAddress = replyToMatch[2].trim().toLowerCase();
    const fromDomain = fromAddress.split('@')[1];
    const replyToDomain = replyToAddress.split('@')[1];

    if (fromDomain && replyToDomain && fromDomain !== replyToDomain) {
      evidence.push(`Header Discrepancy (CEO/Phish Spoof): Sender From header '${fromDomain}' does not match Reply-To header '${replyToDomain}'`);
      riskPenalty += 40;
    }
  }

  // 3. Social Engineering & Urgency Cues
  const matchedUrgency = URGENCY_TRIGGERS.filter(trigger => text.includes(trigger));
  if (matchedUrgency.length > 0) {
    evidence.push(`Psychological Urgency Lures: Detected coercion tactics [${matchedUrgency.slice(0, 3).join(', ')}] designed to induce panic`);
    riskPenalty += Math.min(30, matchedUrgency.length * 10);
  }

  // 4. Impersonated Organization Detection
  if (text.includes('paypal')) impersonatedBrand = 'PayPal';
  else if (text.includes('state bank') || text.includes('sbi')) impersonatedBrand = 'State Bank of India';
  else if (text.includes('microsoft') || text.includes('office 365')) impersonatedBrand = 'Microsoft 365';
  else if (text.includes('netflix')) impersonatedBrand = 'Netflix';
  else if (text.includes('income tax')) impersonatedBrand = 'Income Tax Department';

  if (impersonatedBrand && riskPenalty > 20) {
    evidence.push(`Brand Impersonation: Content mimics official communications from '${impersonatedBrand}'`);
  }

  const score = Math.max(5, Math.min(100, 100 - riskPenalty));

  let threatLevel = 'SAFE';
  if (score < 30) threatLevel = 'CRITICAL';
  else if (score < 60) threatLevel = 'HIGH';
  else if (score < 80) threatLevel = 'MODERATE';

  // Plain-English Actionable Guidance
  const actionableGuidance = [];
  if (threatLevel === 'CRITICAL' || threatLevel === 'HIGH') {
    actionableGuidance.push('DO NOT click any links, open attachments, or reply to this email.');
    actionableGuidance.push('Verify the sender directly by visiting the official website through a fresh browser tab.');
    actionableGuidance.push('Forward this email as an attachment to your security operations team or abuse@cert-in.org.in.');
  } else if (threatLevel === 'MODERATE') {
    actionableGuidance.push('Exercise caution. Verify the sender address and inspect any requested actions before replying.');
  } else {
    actionableGuidance.push('No obvious social engineering triggers or deceptive links were identified.');
  }

  return {
    type: 'EMAIL',
    trustScore: score,
    threatLevel,
    impersonatedBrand,
    extractedUrls,
    highestUrlRisk,
    evidence,
    actionableGuidance
  };
}
