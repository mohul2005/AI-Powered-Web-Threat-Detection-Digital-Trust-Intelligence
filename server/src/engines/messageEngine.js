import { analyzeSocialEngineering } from './scamEngine.js';

// AI-Powered Smishing & Scam Message Investigation Engine (SMS, WhatsApp, Telegram)
// Implements Section C: Online Scams, Remote-Access, OTP Harvesting, and Deceptive Communications

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

  const scamAnalysis = analyzeSocialEngineering(messageContent);

  return {
    type: 'MESSAGE',
    trustScore: scamAnalysis.scamScore,
    threatLevel: scamAnalysis.threatLevel,
    primaryCategory: scamAnalysis.primaryCategory,
    detectedCategories: scamAnalysis.detectedCategories,
    indicators: scamAnalysis.indicators,
    plainEnglishAssessment: scamAnalysis.plainEnglishAssessment,
    evidence: scamAnalysis.evidenceFindings,
    actionableGuidance: scamAnalysis.actionableGuidance,
    extractedUrls: scamAnalysis.indicators.misleadingLinks.links.map(l => l.url),
    highestUrlRisk: scamAnalysis.indicators.misleadingLinks.links.find(l => l.score < 40) || null
  };
}
