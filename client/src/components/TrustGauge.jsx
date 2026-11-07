import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, ExternalLink } from 'lucide-react';

export default function TrustGauge({ result, scenarioMeta }) {
  if (!result) return null;

  const { trustScore, threatLevel, url, domain, aiPhishing, certTrust, webSec, collaborativeIntel } = result;

  const getVerdictTheme = () => {
    if (trustScore < 25) {
      return {
        text: 'text-rose-400',
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/40',
        badge: 'bg-rose-500 text-slate-950',
        title: 'DANGEROUS: High Risk of Data Theft or Fraud',
        summary: 'This site exhibits severe red flags including deceptive brand impersonation, defective cryptographic keys, or active credential harvesting.',
        icon: <ShieldX className="w-10 h-10 text-rose-500 shrink-0" />
      };
    }
    if (trustScore < 50) {
      return {
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/40',
        badge: 'bg-amber-500 text-slate-950',
        title: 'SUSPICIOUS: Exercise Extreme Caution',
        summary: 'Multiple security anomalies detected. Unverified domain ownership, weak transport security, or recent malicious community reports.',
        icon: <ShieldAlert className="w-10 h-10 text-amber-500 shrink-0" />
      };
    }
    if (trustScore < 75) {
      return {
        text: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/40',
        badge: 'bg-yellow-500 text-slate-950',
        title: 'MODERATE: Suboptimal Security Standards',
        summary: 'The site is functional but lacks standard security headers (HSTS, CSP) or uses basic domain validation.',
        icon: <AlertTriangle className="w-10 h-10 text-yellow-500 shrink-0" />
      };
    }
    return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/40',
      badge: 'bg-emerald-500 text-slate-950',
      title: 'VERIFIED SAFE: Authentic Platform',
      summary: 'Verified organization ownership, strong 2048+ bit TLS cryptography, public CT logs, and hardened security headers.',
      icon: <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
    };
  };

  const theme = getVerdictTheme();

  return (
    <div className={`rounded-2xl border ${theme.border} ${theme.bg} p-5 sm:p-6 shadow-xl transition-all`}>
      {/* Top Banner: Score & Plain English Assessment */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 pb-5 border-b border-slate-800">
        <div className="flex items-center sm:items-start space-x-4 text-center sm:text-left">
          {theme.icon}
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase font-mono ${theme.badge}`}>
                {threatLevel}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Target: <strong className="text-slate-200">{domain}</strong>
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black ${theme.text}`}>
              {theme.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              {theme.summary}
            </p>
          </div>
        </div>

        {/* Circular Score Badge */}
        <div className="w-24 h-24 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center shrink-0 shadow-inner">
          <span className={`text-3xl font-black font-mono tracking-tighter ${theme.text}`}>
            {trustScore}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
            / 100 Score
          </span>
        </div>
      </div>

      {/* 4 Multi-Factor Sub-Scores Progress */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-5">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 font-medium">1. AI Phishing</span>
            <span className="font-mono font-bold text-slate-200">{aiPhishing.score}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${aiPhishing.score < 50 ? 'bg-rose-500' : 'bg-cyan-400'}`}
              style={{ width: `${aiPhishing.score}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block truncate">
            {aiPhishing.impersonatedBrand ? `Targets ${aiPhishing.impersonatedBrand}` : 'No brand mismatch'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 font-medium">2. PKI Certificate</span>
            <span className="font-mono font-bold text-slate-200">{certTrust.score}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${certTrust.score < 50 ? 'bg-rose-500' : 'bg-indigo-400'}`}
              style={{ width: `${certTrust.score}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block truncate">
            {certTrust.keyDetails.keySize ? `${certTrust.keyDetails.keySize}-bit key` : 'Unencrypted'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 font-medium">3. Web AppSec</span>
            <span className="font-mono font-bold text-slate-200">{webSec.score}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${webSec.score < 50 ? 'bg-rose-500' : 'bg-emerald-400'}`}
              style={{ width: `${webSec.score}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block truncate">
            Grade {webSec.grade} Security
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 font-medium">4. Collab Intel</span>
            <span className="font-mono font-bold text-slate-200">{collaborativeIntel.reputationScore}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${collaborativeIntel.reputationScore < 50 ? 'bg-rose-500' : 'bg-purple-400'}`}
              style={{ width: `${collaborativeIntel.reputationScore}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block truncate">
            {collaborativeIntel.communityVotes.malicious} Flagged
          </span>
        </div>
      </div>
    </div>
  );
}
