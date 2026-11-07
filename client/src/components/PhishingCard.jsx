import React from 'react';
import { Cpu, AlertTriangle, CheckCircle, ShieldAlert, Binary, FormInput, Target } from 'lucide-react';

export default function PhishingCard({ aiPhishing }) {
  if (!aiPhishing) return null;

  const { score, verdict, impersonatedBrand, signals, entropy, punycodeDetected, formFields } = aiPhishing;

  const isDangerous = score < 50;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-md shadow-lg flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">AI Phishing & Brand Intelligence</h3>
              <p className="text-[11px] text-slate-400 font-mono">NLP Content, Homoglyphs & Form Scrutiny</p>
            </div>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
              isDangerous
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {score}/100
          </span>
        </div>

        {/* Impersonated Brand Banner */}
        {impersonatedBrand && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Target className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <span className="text-[11px] text-rose-300 uppercase font-bold tracking-wider">Impersonation Target</span>
                <p className="text-sm font-extrabold text-white">{impersonatedBrand}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-200 border border-rose-800">
              UNAUTHORIZED
            </span>
          </div>
        )}

        {/* Technical Signal Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center space-x-1.5">
              <Binary className="w-3.5 h-3.5 text-cyan-400" />
              <span>Entropy:</span>
            </span>
            <span className={`font-bold ${entropy > 3.8 ? 'text-amber-400' : 'text-slate-200'}`}>
              {entropy} bits
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
              <span>Homoglyph:</span>
            </span>
            <span className={`font-bold ${punycodeDetected ? 'text-rose-400' : 'text-emerald-400'}`}>
              {punycodeDetected ? 'DETECTED' : 'CLEAR'}
            </span>
          </div>
        </div>

        {/* Harvesting Form Inputs */}
        {formFields && formFields.length > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300 mb-1.5">
              <FormInput className="w-3.5 h-3.5 text-amber-400" />
              <span>Sensitive Harvesting Form Inputs Found:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formFields.map((field, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-200 border border-amber-800/80">
                  ⚠️ {field}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Explainable Signals */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            AI Detected Threat Vectors:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {signals.map((sig, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                {isDangerous ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <span className="leading-tight">{sig}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
