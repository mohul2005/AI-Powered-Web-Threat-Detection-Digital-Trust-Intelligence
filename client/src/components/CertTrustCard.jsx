import React from 'react';
import { Lock, ShieldAlert, Key, CheckCircle, AlertOctagon, GitCommit, FileCheck, CheckCircle2, AlertTriangle, Info, Globe, ShieldX } from 'lucide-react';

export default function CertTrustCard({ certTrust }) {
  if (!certTrust) return null;

  const {
    score,
    verdict,
    anomalyClassification = 'AUTHENTIC_AND_CRYPTOGRAPHICALLY_SOUND',
    tlsConfigurationStatus = 'VALID',
    statusSummary,
    issuer,
    subject,
    keyDetails,
    validity,
    hostnameMatch,
    ctLogs,
    caTrustIncidentDetails,
    chain,
    signals,
    methodologyDisclaimer
  } = certTrust;

  const isFlawed = score < 50;

  // 3-Tier Module 2 Configuration Status
  const getStatusTheme = () => {
    if (tlsConfigurationStatus === 'POTENTIALLY_COMPROMISED' || caTrustIncidentDetails || anomalyClassification === 'COMPROMISED_CRYPTOGRAPHIC_TRUST_INCIDENT') {
      return {
        badge: 'bg-[#f43f5e] text-white font-extrabold',
        border: 'border-[#f43f5e]/50',
        label: 'POTENTIALLY COMPROMISED',
        icon: <ShieldX className="w-4 h-4 text-[#f43f5e]" />,
        textColor: 'text-[#f43f5e]'
      };
    }
    if (tlsConfigurationStatus === 'SUSPICIOUS' || isFlawed || anomalyClassification === 'ORDINARY_CERTIFICATE_CONFIG_ISSUE') {
      return {
        badge: 'bg-[#f59e0b] text-[#061414] font-extrabold',
        border: 'border-[#f59e0b]/50',
        label: 'SUSPICIOUS CONFIGURATION',
        icon: <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />,
        textColor: 'text-[#f59e0b]'
      };
    }
    return {
      badge: 'bg-[#00f2c3] text-[#051715] font-extrabold',
      border: 'border-[#00f2c3]/50',
      label: 'VALID CONFIGURATION',
      icon: <CheckCircle2 className="w-4 h-4 text-[#00f2c3]" />,
      textColor: 'text-[#00f2c3]'
    };
  };

  const statusTheme = getStatusTheme();

  return (
    <div className={`bg-[#0b2020] border ${statusTheme.border} rounded-2xl p-5 shadow-card-dark flex flex-col justify-between space-y-4`}>
      <div>
        {/* Module 2 Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#163838] mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Module 2: TLS Certificate and Web Trust Security Report</h3>
              <p className="text-[11px] text-[#80a4a2] font-mono">X.509 Chain Inspection, Cryptographic Keys, CT Logs & CA Intelligence</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono uppercase tracking-wider ${statusTheme.badge}`}>
              {statusTheme.label}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[#061414] border border-[#174242] text-white">
              {score}/100
            </span>
          </div>
        </div>

        {/* Security Axiom Callout (Explicit Module 2 Rule) */}
        <div className="mb-3.5 p-2.5 rounded-xl bg-[#061414] border border-[#153a3a] flex items-center space-x-2 text-xs font-mono text-[#a1c4c2]">
          <span className="text-[#00f2c3] text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-[#00f2c3]/15 border border-[#00f2c3]/30 shrink-0">
            Security Axiom
          </span>
          <span className="text-[11px] font-semibold text-white">
            A valid TLS certificate must never be treated as proof that the website itself is safe from fraud.
          </span>
        </div>

        {/* Explanation Summary */}
        {statusSummary && (
          <div className="mb-3.5 p-3 rounded-xl bg-[#061414] border border-[#153a3a] text-xs font-mono leading-relaxed text-[#a1c4c2]">
            <p className={statusTheme.textColor}>{statusSummary}</p>
          </div>
        )}

        {/* eMudhra / Distrusted CA Incident Critical Banner */}
        {caTrustIncidentDetails && (
          <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-[#1c080d] to-[#120508] border border-[#f43f5e]/50 shadow-md">
            <div className="flex items-start space-x-2.5">
              <AlertOctagon className="w-5 h-5 text-[#f43f5e] shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black text-[#f43f5e] uppercase tracking-wide">
                    {caTrustIncidentDetails.incidentName}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/40 font-bold">
                    {caTrustIncidentDetails.cveOrAlert}
                  </span>
                </div>
                <p className="text-xs text-white/90 leading-snug">
                  {caTrustIncidentDetails.impact}
                </p>
                {caTrustIncidentDetails.detectionMethod && (
                  <p className="text-[10px] text-[#2dd4bf] font-mono">
                    <strong>Detection Vector:</strong> {caTrustIncidentDetails.detectionMethod}
                  </p>
                )}
                <p className="text-[11px] text-[#f43f5e] font-mono font-semibold">
                  Action: {caTrustIncidentDetails.recommendation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hostname & SAN Identity Match Check */}
        {hostnameMatch && (
          <div className={`p-2.5 rounded-xl mb-3 flex items-center justify-between text-xs font-mono border ${
            hostnameMatch.matches
              ? 'bg-[#061414] border-[#153a3a] text-[#80a4a2]'
              : 'bg-[#180a0d] border-[#f43f5e]/40 text-[#f43f5e]'
          }`}>
            <span className="flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-[#00f2c3]" />
              <span className="text-white font-medium">Domain Identity & SAN:</span>
            </span>
            <span className="font-bold text-[11px]">
              {hostnameMatch.matches ? '✅ Verified in Subject Alternative Names (SAN)' : '⚠️ Hostname and Certificate Identity Mismatch'}
            </span>
          </div>
        )}

        {/* Cryptographic Key & Issuer Summary */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs font-mono">
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

        {/* Certificate Transparency (CT) & Unexpected Issuance */}
        <div className="p-2.5 rounded-lg bg-[#061414] border border-[#153a3a] mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono gap-1">
          <span className="text-[#80a4a2] flex items-center space-x-1.5">
            <FileCheck className="w-3.5 h-3.5 text-[#00f2c3]" />
            <span>Certificate Transparency (CT Logs):</span>
          </span>
          <span className={`font-bold ${ctLogs.present ? 'text-[#00f2c3]' : 'text-[#f59e0b]'}`}>
            {ctLogs.status}
          </span>
        </div>

        {/* Certificate Trust Chain Visual Hierarchy */}
        <div className="mb-3">
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
          <div className="space-y-1 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#80a4a2] block mb-1">
              PKI Diagnostics:
            </span>
            <ul className="space-y-1 text-xs text-[#a1c4c2] font-mono">
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

      {/* Crucial Section B Engineering Methodology Notice */}
      <div className="pt-3 border-t border-[#143838] flex items-start space-x-2 text-[10px] font-mono text-[#80a4a2] bg-[#071717] p-2.5 rounded-xl border border-[#153a3a]">
        <Info className="w-4 h-4 text-[#00f2c3] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Forensic Principle:</strong> TrustMatrix identifies CA-level incidents by cross-referencing certificate chains against authoritative root store intelligence (CA/B Forum, Mozilla, Chromium). It does not claim to independently derive internal CA key-generation weaknesses purely from an isolated URL handshake.
        </p>
      </div>
    </div>
  );
}
