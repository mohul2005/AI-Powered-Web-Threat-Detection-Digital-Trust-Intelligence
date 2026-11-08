import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, ExternalLink, HelpCircle, Scale } from 'lucide-react';

export default function TrustGauge({ result, scenarioMeta }) {
  if (!result) return null;

  const { trustScore, threatLevel, url, domain, aiPhishing, certTrust, webSec, collaborativeIntel, section6RiskReport, riskClassification } = result;

  const section6Tier = riskClassification?.tier || section6RiskReport?.overallRiskClassification?.tier || (
    trustScore <= 25 ? 'Confirmed Malicious' :
    trustScore <= 50 ? 'High Risk' :
    trustScore <= 70 ? 'Suspicious' : 'Low Risk'
  );

  const getVerdictTheme = () => {
    if (section6Tier === 'Confirmed Malicious' || trustScore < 25) {
      return {
        tier: 'Confirmed Malicious',
        text: 'text-[#f43f5e]',
        bg: 'bg-[#150a10]',
        border: 'border-[#f43f5e]/40',
        badge: 'bg-[#f43f5e] text-white',
        title: 'Confirmed Malicious',
        summary: 'Supported by authoritative threat intelligence or sufficiently validated evidence (confirmed brand impersonation, defective cryptographic keys, or unauthorized data exfiltration).',
        icon: <ShieldX className="w-10 h-10 text-[#f43f5e] shrink-0" />
      };
    }
    if (section6Tier === 'High Risk' || trustScore < 50) {
      return {
        tier: 'High Risk',
        text: 'text-[#f59e0b]',
        bg: 'bg-[#16120b]',
        border: 'border-[#f59e0b]/40',
        badge: 'bg-[#f59e0b] text-[#081a17]',
        title: 'High Risk',
        summary: 'Multiple significant indicators suggest a substantial security threat (unverified domain ownership, weak transport encryption, or suspicious homoglyph patterns).',
        icon: <ShieldAlert className="w-10 h-10 text-[#f59e0b] shrink-0" />
      };
    }
    if (section6Tier === 'Suspicious' || trustScore < 75) {
      return {
        tier: 'Suspicious',
        text: 'text-[#eab308]',
        bg: 'bg-[#161408]',
        border: 'border-[#eab308]/40',
        badge: 'bg-[#eab308] text-[#051715]',
        title: 'Suspicious',
        summary: 'One or more indicators require further investigation (suboptimal security headers, domain registration anomalies, or urgency-based persuasion triggers).',
        icon: <AlertTriangle className="w-10 h-10 text-[#eab308] shrink-0" />
      };
    }
    if (section6Tier === 'Inconclusive') {
      return {
        tier: 'Inconclusive',
        text: 'text-[#80a4a2]',
        bg: 'bg-[#0a1818]',
        border: 'border-[#5c8280]/40',
        badge: 'bg-[#5c8280] text-white',
        title: 'Inconclusive',
        summary: 'Insufficient data or unavailable verification sources. Further investigation required before establishing safety baseline.',
        icon: <HelpCircle className="w-10 h-10 text-[#80a4a2] shrink-0" />
      };
    }
    return {
      tier: 'Low Risk',
      text: 'text-[#00f2c3]',
      bg: 'bg-[#081d1d]',
      border: 'border-[#00f2c3]/40',
      badge: 'bg-[#00f2c3] text-[#051715] font-black',
      title: 'Low Risk',
      summary: 'No significant malicious indicators identified within the available checks (verified identity, strong TLS cryptography, and public CT logging).',
      icon: <ShieldCheck className="w-10 h-10 text-[#00f2c3] shrink-0" />
    };
  };

  const theme = getVerdictTheme();

  return (
    <div className={`rounded-2xl border ${theme.border} ${theme.bg} p-5 sm:p-6 shadow-card-dark transition-all space-y-4 font-mono`}>
      {/* Top Banner: Score & Consistent Section 6 Classification */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 pb-5 border-b border-[#163838]">
        <div className="flex items-center sm:items-start space-x-4 text-center sm:text-left">
          {theme.icon}
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30 font-bold">
                SECTION 6 CLASSIFICATION
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase font-mono ${theme.badge}`}>
                {theme.tier}
              </span>
              <span className="text-xs text-[#80a4a2] font-mono">
                Domain: <strong className="text-white">{domain}</strong>
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black ${theme.text}`}>
              {theme.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#a1c4c2] mt-1 max-w-xl leading-relaxed">
              {theme.summary}
            </p>

            {/* Pre-Click Decision Guidance */}
            {aiPhishing && aiPhishing.preClickRecommendation && (
              <div className="mt-3 p-2.5 rounded-xl bg-[#061414] border border-[#174242] flex items-center space-x-2 text-xs font-mono">
                <span className="text-[#00f2c3] text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-[#00f2c3]/15 border border-[#00f2c3]/30 shrink-0">
                  Pre-Click Advisory
                </span>
                <span className={`font-bold ${trustScore < 50 ? 'text-[#f43f5e]' : 'text-[#00f2c3]'}`}>
                  {aiPhishing.preClickRecommendation}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Circular Score Badge in Sentinel Neon Style */}
        <div className="w-24 h-24 rounded-2xl bg-[#061414] border border-[#174242] flex flex-col items-center justify-center shrink-0 shadow-inner">
          <span className={`text-3xl font-black font-mono tracking-tighter ${theme.text}`}>
            {trustScore}
          </span>
          <span className="text-[10px] text-[#5c8280] uppercase tracking-widest font-semibold">
            / 100 Index
          </span>
        </div>
      </div>

      {/* Critical Security Axiom Notification */}
      <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2 text-[#f59e0b]">
          <Scale className="w-4 h-4 shrink-0" />
          <span className="font-bold text-[11px]">Core Security Axiom:</span>
          <span className="text-white text-[11px] italic">
            "The system must not treat the absence of known threats as proof that a website is safe."
          </span>
        </div>
        {section6RiskReport?.confidenceAndEvidenceCoverage && (
          <span className="text-[10px] text-[#00f2c3] bg-[#00f2c3]/10 px-2 py-0.5 rounded border border-[#00f2c3]/30 shrink-0">
            Coverage: {section6RiskReport.confidenceAndEvidenceCoverage.coveragePercentage} ({section6RiskReport.confidenceAndEvidenceCoverage.totalLayersEvaluated} Layers Active)
          </span>
        )}
      </div>

      {/* 4 Multi-Factor Sub-Scores in Sentinel Emerald Theme */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-[#071616] border border-[#174242]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[#80a4a2] font-medium">1. AI Phishing</span>
            <span className="font-mono font-bold text-white">{aiPhishing.score}%</span>
          </div>
          <div className="w-full bg-[#0c2424] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${aiPhishing.score < 50 ? 'bg-[#f43f5e]' : 'bg-[#00f2c3]'}`}
              style={{ width: `${aiPhishing.score}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-[#5c8280] font-mono mt-1 block truncate">
            {aiPhishing.impersonatedBrand ? `Impersonates ${aiPhishing.impersonatedBrand}` : 'Clean domain'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#071616] border border-[#174242]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[#80a4a2] font-medium">2. PKI Certificate</span>
            <span className="font-mono font-bold text-white">{certTrust.score}%</span>
          </div>
          <div className="w-full bg-[#0c2424] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${certTrust.score < 50 ? 'bg-[#f43f5e]' : 'bg-[#00f2c3]'}`}
              style={{ width: `${certTrust.score}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-[#5c8280] font-mono mt-1 block truncate">
            {certTrust.keyDetails.keySize ? `${certTrust.keyDetails.keySize}-bit key` : 'Unencrypted'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#071616] border border-[#174242]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[#80a4a2] font-medium">3. Web AppSec</span>
            <span className="font-mono font-bold text-white">{webSec.score}%</span>
          </div>
          <div className="w-full bg-[#0c2424] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${webSec.score < 50 ? 'bg-[#f43f5e]' : 'bg-[#10b981]'}`}
              style={{ width: `${webSec.score}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-[#5c8280] font-mono mt-1 block truncate">
            Grade {webSec.grade} Posture
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[#071616] border border-[#174242]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[#80a4a2] font-medium">4. Collab Intel</span>
            <span className="font-mono font-bold text-white">{collaborativeIntel.reputationScore}%</span>
          </div>
          <div className="w-full bg-[#0c2424] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${collaborativeIntel.reputationScore < 50 ? 'bg-[#f43f5e]' : 'bg-[#2dd4bf]'}`}
              style={{ width: `${collaborativeIntel.reputationScore}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-[#5c8280] font-mono mt-1 block truncate">
            {collaborativeIntel.communityVotes.malicious} Flagged
          </span>
        </div>
      </div>
    </div>
  );
}
