import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, ExternalLink } from 'lucide-react';

export default function TrustGauge({ result, scenarioMeta }) {
  if (!result) return null;

  const { trustScore, threatLevel, url, domain, aiPhishing, certTrust, webSec, collaborativeIntel } = result;

  const getVerdictTheme = () => {
    if (trustScore < 25) {
      return {
        text: 'text-[#f43f5e]',
        bg: 'bg-[#150a10]',
        border: 'border-[#f43f5e]/40',
        badge: 'bg-[#f43f5e] text-white',
        title: 'CRITICAL THREAT: Active Risk of Credential Theft',
        summary: 'Catastrophic security anomalies detected. Confirmed brand impersonation, defective cryptographic keys (eMudhra-style weak moduli), or unauthorized data exfiltration.',
        icon: <ShieldX className="w-10 h-10 text-[#f43f5e] shrink-0" />
      };
    }
    if (trustScore < 50) {
      return {
        text: 'text-[#f59e0b]',
        bg: 'bg-[#16120b]',
        border: 'border-[#f59e0b]/40',
        badge: 'bg-[#f59e0b] text-[#081a17]',
        title: 'HIGH RISK: Suspicious Entity Anomalies',
        summary: 'Multiple security inconsistencies detected. Unverified domain ownership, weak transport encryption, or verified community fraud alerts.',
        icon: <ShieldAlert className="w-10 h-10 text-[#f59e0b] shrink-0" />
      };
    }
    if (trustScore < 75) {
      return {
        text: 'text-[#2dd4bf]',
        bg: 'bg-[#091f1f]',
        border: 'border-[#2dd4bf]/40',
        badge: 'bg-[#2dd4bf] text-[#051715]',
        title: 'MODERATE: Suboptimal Security Standards',
        summary: 'The target resolves and operates normally, but lacks defensive security headers (HSTS, CSP) or uses basic automated domain validation.',
        icon: <AlertTriangle className="w-10 h-10 text-[#2dd4bf] shrink-0" />
      };
    }
    return {
      text: 'text-[#00f2c3]',
      bg: 'bg-[#081d1d]',
      border: 'border-[#00f2c3]/40',
      badge: 'bg-[#00f2c3] text-[#051715] font-black',
      title: 'VERIFIED SAFE: Authentic Platform',
      summary: 'Verified organization identity, strong 2048+ bit TLS cryptography, public CT logs (Google Argon/Cloudflare), and hardened defensive headers.',
      icon: <ShieldCheck className="w-10 h-10 text-[#00f2c3] shrink-0" />
    };
  };

  const theme = getVerdictTheme();

  return (
    <div className={`rounded-2xl border ${theme.border} ${theme.bg} p-5 sm:p-6 shadow-card-dark transition-all`}>
      {/* Top Banner: Score & Assessment */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 pb-5 border-b border-[#163838]">
        <div className="flex items-center sm:items-start space-x-4 text-center sm:text-left">
          {theme.icon}
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase font-mono ${theme.badge}`}>
                {threatLevel}
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

      {/* 4 Multi-Factor Sub-Scores in Sentinel Emerald Theme */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-5">
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
