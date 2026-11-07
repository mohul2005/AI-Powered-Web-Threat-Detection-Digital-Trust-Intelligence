import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, ShieldX, ExternalLink, Globe, Lock, Cpu, Users } from 'lucide-react';

export default function TrustGauge({ result, scenarioMeta }) {
  if (!result) return null;

  const { trustScore, threatLevel, url, domain, aiPhishing, certTrust, webSec, collaborativeIntel } = result;

  const getVerdictTheme = () => {
    if (trustScore < 25) {
      return {
        text: 'text-rose-400',
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        glow: 'glow-danger',
        label: 'CRITICAL THREAT: MALICIOUS SITE',
        badgeBg: 'bg-rose-500 text-slate-950',
        icon: <ShieldX className="w-8 h-8 text-rose-500 animate-bounce" />,
        progressColor: 'from-rose-600 to-red-500'
      };
    }
    if (trustScore < 50) {
      return {
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        glow: 'shadow-lg shadow-amber-500/20',
        label: 'HIGH RISK: SUSPICIOUS ANOMALIES',
        badgeBg: 'bg-amber-500 text-slate-950',
        icon: <ShieldAlert className="w-8 h-8 text-amber-500" />,
        progressColor: 'from-amber-600 to-orange-500'
      };
    }
    if (trustScore < 75) {
      return {
        text: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        glow: 'shadow-lg shadow-yellow-500/20',
        label: 'MODERATE CAUTION: DEFICIENT POLICIES',
        badgeBg: 'bg-yellow-500 text-slate-950',
        icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
        progressColor: 'from-yellow-600 to-amber-500'
      };
    }
    return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      glow: 'glow-success',
      label: 'VERIFIED PLATFORM: TRUSTWORTHY',
      badgeBg: 'bg-emerald-500 text-slate-950',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      progressColor: 'from-emerald-500 to-cyan-400'
    };
  };

  const theme = getVerdictTheme();

  return (
    <div className={`rounded-2xl border ${theme.border} ${theme.bg} p-6 ${theme.glow} backdrop-blur-xl transition-all relative overflow-hidden`}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Overall Trust Score Gauge */}
        <div className="flex items-center space-x-6 w-full lg:w-auto justify-center lg:justify-start">
          <div className="relative flex items-center justify-center">
            {/* Circular Gauge Representation */}
            <div className="w-32 h-32 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center bg-slate-950/80 shadow-2xl relative">
              <span className={`text-4xl font-extrabold font-mono tracking-tighter ${theme.text}`}>
                {trustScore}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                / 100
              </span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">Trust Index</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider uppercase font-mono ${theme.badgeBg}`}>
                {threatLevel}
              </span>
              {scenarioMeta && (
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                  {scenarioMeta.category}
                </span>
              )}
            </div>

            <h2 className={`text-xl font-bold mt-1.5 ${theme.text}`}>
              {theme.label}
            </h2>

            <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1 font-mono break-all">
              <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Target: <strong className="text-slate-200">{domain}</strong></span>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 transition-colors inline-flex items-center"
              >
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: 4 Dimensional Sub-scores Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-7/12">
          {/* 1. AI Phishing Score */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Phishing</span>
              </span>
              <span className="font-mono font-bold text-slate-200">{aiPhishing.score}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${aiPhishing.score < 40 ? 'from-rose-500 to-red-600' : 'from-cyan-500 to-blue-500'}`}
                style={{ width: `${aiPhishing.score}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1.5 truncate font-mono">
              {aiPhishing.verdict.replace(/_/g, ' ')}
            </span>
          </div>

          {/* 2. Certificate & PKI Trust */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>PKI Trust</span>
              </span>
              <span className="font-mono font-bold text-slate-200">{certTrust.score}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${certTrust.score < 40 ? 'from-rose-500 to-amber-500' : 'from-indigo-500 to-cyan-400'}`}
                style={{ width: `${certTrust.score}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1.5 truncate font-mono">
              {certTrust.keyDetails.keySize ? `${certTrust.keyDetails.keySize}-bit ${certTrust.keyDetails.algorithm}` : 'No Cert'}
            </span>
          </div>

          {/* 3. Application Security Posture */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>App Security</span>
              </span>
              <span className="font-mono font-bold text-slate-200">{webSec.score}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${webSec.score < 40 ? 'from-rose-500 to-red-500' : 'from-emerald-500 to-teal-400'}`}
                style={{ width: `${webSec.score}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1.5 truncate font-mono">
              Grade {webSec.grade} Posture
            </span>
          </div>

          {/* 4. Collaborative Intel Score */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>Collab Intel</span>
              </span>
              <span className="font-mono font-bold text-slate-200">{collaborativeIntel.reputationScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${collaborativeIntel.reputationScore < 40 ? 'from-rose-500 to-purple-600' : 'from-purple-500 to-indigo-400'}`}
                style={{ width: `${collaborativeIntel.reputationScore}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1.5 truncate font-mono">
              {collaborativeIntel.communityVotes.malicious} Reports
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
