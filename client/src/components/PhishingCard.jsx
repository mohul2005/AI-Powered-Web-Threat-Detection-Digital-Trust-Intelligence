import React from 'react';
import { Cpu, AlertTriangle, CheckCircle, ShieldAlert, Binary, FormInput, Target } from 'lucide-react';

export default function PhishingCard({ aiPhishing }) {
  if (!aiPhishing) return null;

  const { score, verdict, impersonatedBrand, signals, entropy, punycodeDetected, formFields } = aiPhishing;

  const isDangerous = score < 50;

  return (
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-5 shadow-card-dark flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#163838] mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">AI Phishing & Brand Intelligence</h3>
              <p className="text-[11px] text-[#80a4a2] font-mono">NLP Content, Homoglyphs & Form Scrutiny</p>
            </div>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
              isDangerous
                ? 'bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30'
                : 'bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/30'
            }`}
          >
            {score}/100
          </span>
        </div>

        {/* Impersonated Brand Banner */}
        {impersonatedBrand && (
          <div className="mb-4 p-3 rounded-xl bg-[#f43f5e]/10 border border-[#f43f5e]/30 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Target className="w-4 h-4 text-[#f43f5e] shrink-0" />
              <div>
                <span className="text-[11px] text-[#f43f5e] uppercase font-bold tracking-wider">Impersonation Target</span>
                <p className="text-sm font-extrabold text-white">{impersonatedBrand}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e070c] text-[#f43f5e] border border-[#f43f5e]/40 font-bold">
              UNAUTHORIZED
            </span>
          </div>
        )}

        {/* Technical Signal Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-[#061414] border border-[#153a3a] flex items-center justify-between">
            <span className="text-[#80a4a2] flex items-center space-x-1.5">
              <Binary className="w-3.5 h-3.5 text-[#00f2c3]" />
              <span>Entropy:</span>
            </span>
            <span className={`font-bold ${entropy > 3.8 ? 'text-[#f59e0b]' : 'text-white'}`}>
              {entropy} bits
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#061414] border border-[#153a3a] flex items-center justify-between">
            <span className="text-[#80a4a2] flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#2dd4bf]" />
              <span>Homoglyph:</span>
            </span>
            <span className={`font-bold ${punycodeDetected ? 'text-[#f43f5e]' : 'text-[#00f2c3]'}`}>
              {punycodeDetected ? 'DETECTED' : 'CLEAR'}
            </span>
          </div>
        </div>

        {/* Harvesting Form Inputs */}
        {formFields && formFields.length > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-[#f59e0b] mb-1.5">
              <FormInput className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Sensitive Harvesting Form Inputs Found:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formFields.map((field, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1204] text-[#f59e0b] border border-[#f59e0b]/30">
                  ⚠️ {field}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Explainable Signals */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#80a4a2] block mb-2">
            AI Detected Threat Vectors:
          </span>
          <ul className="space-y-1.5 text-xs text-[#a1c4c2]">
            {signals.map((sig, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                {isDangerous ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-[#f43f5e] shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5 text-[#00f2c3] shrink-0 mt-0.5" />
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
