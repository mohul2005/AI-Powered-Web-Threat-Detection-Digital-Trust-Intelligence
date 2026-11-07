import React from 'react';
import { Lock, ShieldAlert, Key, CheckCircle, AlertOctagon, GitCommit, FileCheck } from 'lucide-react';

export default function CertTrustCard({ certTrust }) {
  if (!certTrust) return null;

  const {
    score,
    verdict,
    issuer,
    subject,
    keyDetails,
    validity,
    ctLogs,
    caTrustIncidentDetails,
    chain,
    signals
  } = certTrust;

  const isFlawed = score < 50;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-md shadow-lg flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Digital Trust & PKI Chain Inspector</h3>
              <p className="text-[11px] text-slate-400 font-mono">TLS Handshake, Cryptographic Keys & CT Logs</p>
            </div>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
              isFlawed
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {score}/100
          </span>
        </div>

        {/* eMudhra / CA Trust Incident Critical Banner */}
        {caTrustIncidentDetails && (
          <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-rose-950/60 to-red-900/40 border border-rose-500/50 shadow-md">
            <div className="flex items-start space-x-2.5">
              <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black text-rose-300 uppercase tracking-wide">
                    {caTrustIncidentDetails.incidentName}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-200 border border-rose-500/40">
                    {caTrustIncidentDetails.cveOrAlert}
                  </span>
                </div>
                <p className="text-xs text-rose-200/90 mt-1 leading-snug">
                  {caTrustIncidentDetails.impact}
                </p>
                <p className="text-[11px] text-rose-300 font-mono mt-1 font-semibold">
                  Action: {caTrustIncidentDetails.recommendation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cryptographic Key & Issuer Summary */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase block mb-0.5">CA Authority (Issuer)</span>
            <span className="text-slate-200 font-semibold truncate block" title={issuer.commonName}>
              {issuer.commonName || 'Unknown'}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase block mb-0.5">Public Key Strength</span>
            <span className={`font-semibold flex items-center space-x-1 ${keyDetails.keySize < 2048 ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
              <Key className="w-3 h-3" />
              <span>{keyDetails.keySize ? `${keyDetails.keySize}-bit ${keyDetails.algorithm}` : 'None'}</span>
            </span>
          </div>
        </div>

        {/* Certificate Transparency (CT) Status */}
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 mb-4 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center space-x-1.5">
            <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Certificate Transparency:</span>
          </span>
          <span className={`font-bold ${ctLogs.present ? 'text-emerald-400' : 'text-amber-400'}`}>
            {ctLogs.status}
          </span>
        </div>

        {/* Certificate Trust Chain Visual Hierarchy */}
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2 flex items-center space-x-1.5">
            <GitCommit className="w-3.5 h-3.5 text-indigo-400" />
            <span>X.509 Certificate Chain Hierarchy:</span>
          </span>

          <div className="space-y-1.5 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 font-mono text-[11px]">
            {chain && chain.length > 0 ? (
              chain.map((node, idx) => (
                <div key={idx} className="flex items-center space-x-2 pl-1">
                  <span className="text-slate-600">{idx === 0 ? '┌' : idx === chain.length - 1 ? '└' : '├'}─</span>
                  <span className="text-slate-300 font-medium truncate flex-1">{node.name}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded ${
                      node.valid
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {node.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-slate-500 italic">No TLS chain presented</div>
            )}
          </div>
        </div>

        {/* Signals */}
        {signals && signals.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              PKI Diagnostics:
            </span>
            <ul className="space-y-1 text-xs text-slate-300">
              {signals.map((sig, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">{sig}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
