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
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-5 shadow-card-dark flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#163838] mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Digital Trust & PKI Chain Inspector</h3>
              <p className="text-[11px] text-[#80a4a2] font-mono">TLS Handshake, Cryptographic Keys & CT Logs</p>
            </div>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
              isFlawed
                ? 'bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30'
                : 'bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/30'
            }`}
          >
            {score}/100
          </span>
        </div>

        {/* eMudhra / CA Trust Incident Critical Banner */}
        {caTrustIncidentDetails && (
          <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-[#1c080d] to-[#120508] border border-[#f43f5e]/50 shadow-md">
            <div className="flex items-start space-x-2.5">
              <AlertOctagon className="w-5 h-5 text-[#f43f5e] shrink-0 mt-0.5 animate-pulse" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black text-[#f43f5e] uppercase tracking-wide">
                    {caTrustIncidentDetails.incidentName}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/40 font-bold">
                    {caTrustIncidentDetails.cveOrAlert}
                  </span>
                </div>
                <p className="text-xs text-white/90 mt-1 leading-snug">
                  {caTrustIncidentDetails.impact}
                </p>
                <p className="text-[11px] text-[#f43f5e] font-mono mt-1 font-semibold">
                  Action: {caTrustIncidentDetails.recommendation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cryptographic Key & Issuer Summary */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-[#061414] border border-[#153a3a]">
            <span className="text-[#5c8280] text-[10px] uppercase block mb-0.5">CA Authority (Issuer)</span>
            <span className="text-white font-semibold truncate block" title={issuer.commonName}>
              {issuer.commonName || 'Unknown'}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#061414] border border-[#153a3a]">
            <span className="text-[#5c8280] text-[10px] uppercase block mb-0.5">Public Key Strength</span>
            <span className={`font-semibold flex items-center space-x-1 ${keyDetails.keySize < 2048 ? 'text-[#f43f5e] font-bold' : 'text-[#00f2c3]'}`}>
              <Key className="w-3 h-3" />
              <span>{keyDetails.keySize ? `${keyDetails.keySize}-bit ${keyDetails.algorithm}` : 'None'}</span>
            </span>
          </div>
        </div>

        {/* Certificate Transparency (CT) Status */}
        <div className="p-2.5 rounded-lg bg-[#061414] border border-[#153a3a] mb-4 flex items-center justify-between text-xs font-mono">
          <span className="text-[#80a4a2] flex items-center space-x-1.5">
            <FileCheck className="w-3.5 h-3.5 text-[#00f2c3]" />
            <span>Certificate Transparency:</span>
          </span>
          <span className={`font-bold ${ctLogs.present ? 'text-[#00f2c3]' : 'text-[#f59e0b]'}`}>
            {ctLogs.status}
          </span>
        </div>

        {/* Certificate Trust Chain Visual Hierarchy */}
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#80a4a2] block mb-2 flex items-center space-x-1.5">
            <GitCommit className="w-3.5 h-3.5 text-[#00f2c3]" />
            <span>X.509 Certificate Chain Hierarchy:</span>
          </span>

          <div className="space-y-1.5 bg-[#061414] p-2.5 rounded-xl border border-[#153a3a] font-mono text-[11px]">
            {chain && chain.length > 0 ? (
              chain.map((node, idx) => (
                <div key={idx} className="flex items-center space-x-2 pl-1">
                  <span className="text-[#3b5e5c]">{idx === 0 ? '┌' : idx === chain.length - 1 ? '└' : '├'}─</span>
                  <span className="text-white font-medium truncate flex-1">{node.name}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                      node.valid
                        ? 'bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30'
                        : 'bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30'
                    }`}
                  >
                    {node.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-[#5c8280] italic">No TLS chain presented</div>
            )}
          </div>
        </div>

        {/* Signals */}
        {signals && signals.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#80a4a2] block mb-1">
              PKI Diagnostics:
            </span>
            <ul className="space-y-1 text-xs text-[#a1c4c2]">
              {signals.map((sig, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#f59e0b] shrink-0 mt-0.5" />
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
