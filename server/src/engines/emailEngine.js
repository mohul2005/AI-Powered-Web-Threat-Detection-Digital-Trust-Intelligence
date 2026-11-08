import { analyzePhishing } from './phishingEngine.js';
import { analyzeSocialEngineering } from './scamEngine.js';

// AI-Powered Email Threat & Phishing Investigation Engine
// Implements Module 3: AI-Powered Scam and Message Analysis & Section C Requirements

export function analyzeEmailThreat(emailContent) {
  if (!emailContent || emailContent.trim().length === 0) {
    return {
      score: 50,
      trustScore: 50,
      verdict: 'EMPTY_INPUT',
      riskLevel: 'UNKNOWN',
      evidence: ['No email content provided'],
      actionableGuidance: ['Please paste the suspicious email body or headers to scan.'],
      module3ScamReport: null
    };
  }

  // 1. Run Core Social Engineering Forensic Engine (Module 3)
  const scamAnalysis = analyzeSocialEngineering(emailContent);

  const evidence = [...scamAnalysis.evidenceFindings];
  let headerPenalty = 0;
  let hasHeaderSpoof = false;

  // 2. Sender Domain & Header Spoofing Checks (From vs Reply-To)
  const fromMatch = emailContent.match(/From:\s*([^<\n\r]+<)?([^>\n\r]+)>?/i);
  const replyToMatch = emailContent.match(/Reply-To:\s*([^<\n\r]+<)?([^>\n\r]+)>?/i);

  if (fromMatch && replyToMatch) {
    const fromAddress = fromMatch[2].trim().toLowerCase();
    const replyToAddress = replyToMatch[2].trim().toLowerCase();
    const fromDomain = fromAddress.split('@')[1];
    const replyToDomain = replyToAddress.split('@')[1];

    if (fromDomain && replyToDomain && fromDomain !== replyToDomain) {
      hasHeaderSpoof = true;
      evidence.unshift(`Header Discrepancy (CEO/Sender Spoof): Sender From header '${fromDomain}' does not match Reply-To header '${replyToDomain}'`);
      headerPenalty += 45;
    }
  }

  // 3. Extract Embedded Links and Correlate Threat Intelligence
  const urlRegex = /(https?:\/\/[^\s"'<>]+)/gi;
  const extractedUrls = emailContent.match(urlRegex) || [];
  let highestUrlRisk = null;

  if (extractedUrls.length > 0) {
    for (const link of extractedUrls.slice(0, 3)) {
      const urlAnalysis = analyzePhishing(link);
      if (urlAnalysis.score < 40) {
        highestUrlRisk = { url: link, ...urlAnalysis };
        evidence.unshift(`Malicious Hyperlink Detected: Embedded link '${link}' was identified as deceptive (${urlAnalysis.verdict})`);
        headerPenalty += 40;
        break;
      }
    }
  }

  // Calculate final score with Module 3 boundary integrity
  let finalScore = scamAnalysis.scamScore;
  let threatLevel = scamAnalysis.threatLevel;

  if (hasHeaderSpoof || highestUrlRisk) {
    // Confirmed verified evidence of fraud
    finalScore = Math.max(5, Math.min(25, scamAnalysis.scamScore - headerPenalty));
    threatLevel = 'CRITICAL';
    if (scamAnalysis.module3ScamReport) {
      scamAnalysis.module3ScamReport.status = 'VERIFIED_EVIDENCE_OF_FRAUD';
      scamAnalysis.module3ScamReport.boundaryRule.verifiedFraudEvidenceDetected = true;
      scamAnalysis.module3ScamReport.boundaryRule.assessmentRationale = 'Verified evidence of active fraud confirmed through sender header spoofing or malicious link payload.';
    }
  }

  const actionableGuidance = [...scamAnalysis.actionableGuidance];
  if (threatLevel === 'CRITICAL' || threatLevel === 'HIGH') {
    actionableGuidance.unshift('DO NOT click any links, download attachments, or reply to this email.');
    actionableGuidance.unshift('Inspect the sender address carefully in your email client header view.');
  }

  return {
    type: 'EMAIL',
    trustScore: finalScore,
    threatLevel,
    primaryCategory: scamAnalysis.primaryCategory,
    detectedCategories: scamAnalysis.detectedCategories,
    indicators: scamAnalysis.indicators,
    extractedEntities: scamAnalysis.extractedEntities,
    module3ScamReport: scamAnalysis.module3ScamReport,
    plainEnglishAssessment: scamAnalysis.plainEnglishAssessment,
    evidence,
    actionableGuidance,
    extractedUrls,
    highestUrlRisk
  };
}
