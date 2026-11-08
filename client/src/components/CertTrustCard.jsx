import React from 'react';
import { Lock, ShieldAlert, Key, CheckCircle, AlertOctagon, GitCommit, FileCheck, CheckCircle2, AlertTriangle, Info, Globe } from 'lucide-react';

export default function CertTrustCard({ certTrust }) {
  if (!certTrust) return null;

  const {
    score,
    verdict,
    anomalyClassification = 'AUTHENTIC_AND_CRYPTOGRAPHICALLY_SOUND',
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

  // Visual distinction between Ordinary Configuration Problem vs Compromised Trust Incident
  const getClassificationBadge = () => {
    if (anomalyClassification === 'COMPROMISED_CRYPTOGRAPHIC_TRUST_INCIDENT' || caTrustIncidentDetails) {
      return {
        label: 'Security Incident: Compromised Cryptographic Trust',
        badge: 'bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/40',
        text: 'text-[#f43f5e]',
        note: 'Triggered via Trusted Security Intelligence (CA/B Forum & Root Store incident disclosures)'
      };
    }
    if (anomalyClassification === 'ORDINARY_CERTIFICATE_CONFIG_ISSUE' || isFlawed) {
      return {
        label: 'Ordinary Certificate Configuration Problem',
        badge: 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40',
        text: 'text-[#f59e0b]',
        note: 'Expired validity, hostname mismatch, self-signed root, or suboptimal key parameters'
      };
    }
    return {
      label: 'Cryptographically Sound & Verified Trust',
      badge: 'bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/40',
      text: 'text-[#00f2c3]',
      note: 'Verified root authority, strong 2048+ bit cryptography, and valid CT log proofs'
    };
  };

  const classification = getClassificationBadge();

  return (
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-5 shadow-card-dark flex flex-col justify-between space-y-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#163838] mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Website Certificates & Digital Trust</h3>
              <p className="text-[11px] text-[#80a4a2] font-mono">TLS Handshake, Cryptographic Keys, CT Logs & CA Verification</p>
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

        {/* Section B Diagnostic Classification Bar: Ordinary Config vs Compromised Trust */}
        <div className="mb-3.5 p-2.5 rounded-xl bg-[#061414] border border-[#153a3a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg ${classification.badge}`}>
              {classification.label}
            </span>
          </div>
          <span className="text-[10px] text-[#80a4a2] font-mono">
            {classification.note}
          </span>
        </div>

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

        {/* Hostname & Identity Match Check (Section B Requirement) */}
        {hostnameMatch && (
          <div className={`p-2.5 rounded-xl mb-3 flex items-center justify-between text-xs font-mono border ${
            hostnameMatch.matches
              ? 'bg-[#061414] border-[#153a3a] text-[#80a4a2]'
              : 'bg-[#180a0d] border-[#f43f5e]/40 text-[#f43f5e]'
          }`}>
            <span className="flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-[#00f2c3]" />
              <span className="text-white font-medium">Hostname Match:</span>
            </span>
            <span className="font-bold text-[11px]">
              {hostnameMatch.matches ? '✅ Subject Alt Names (SAN) Verified' : '⚠️ Hostname & Cert Identity Mismatch'}
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
            <span>Certificate Transparency (CT):</span>
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
              PKI Forensic Diagnostics:
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
