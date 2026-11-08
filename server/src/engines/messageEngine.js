import { analyzeSocialEngineering } from './scamEngine.js';

// AI-Powered Smishing & Scam Message Investigation Engine (SMS, WhatsApp, Telegram)
// Implements Module 3: AI-Powered Scam and Message Analysis & Section C Requirements

export function analyzeMessageThreat(messageContent) {
  if (!messageContent || messageContent.trim().length === 0) {
    return {
      score: 50,
      trustScore: 50,
      verdict: 'EMPTY_INPUT',
      riskLevel: 'UNKNOWN',
      evidence: ['No message content provided'],
      actionableGuidance: ['Please paste the suspicious SMS or WhatsApp message to scan.'],
      module3ScamReport: null
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
    extractedEntities: scamAnalysis.extractedEntities,
    module3ScamReport: scamAnalysis.module3ScamReport,
    plainEnglishAssessment: scamAnalysis.plainEnglishAssessment,
    evidence: scamAnalysis.evidenceFindings,
    actionableGuidance: scamAnalysis.actionableGuidance,
    extractedUrls: scamAnalysis.indicators.misleadingLinks.links.map(l => l.url),
    highestUrlRisk: scamAnalysis.indicators.misleadingLinks.links.find(l => l.score < 40) || null
  };
}
