import React from 'react';
import { ShieldAlert, KeyRound, AlertOctagon, CheckCircle2, ShieldCheck, Database, GitBranch, RefreshCw } from 'lucide-react';

export default function PkiRadarView({ onScanScenario }) {
  return (
    <div className="space-y-6">
      {/* Hero Banner on eMudhra Incident */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 p-6 relative overflow-hidden backdrop-blur-xl">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <KeyRound className="w-4 h-4" />
            <span>Digital Trust Infrastructure Case Study</span>
          </div>
          <h2 className="text-2xl font-black text-slate-100 mb-2">
            The eMudhra TLS Certificate Incident & PKI Integrity
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Recent security disclosures and Certificate Authority (CA) browser audits uncovered critical vulnerabilities in key generation pipelines, where deficient entropy allowed duplicate RSA moduli to be generated. This weakness compromises TLS encryption, enables rogue website impersonation, and threatens the web's root trust fabric.
          </p>

          <button
            onClick={() => onScanScenario('emudhra-weak-key-incident')}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Simulate eMudhra Rogue Key Incident (Live Diagnostic)</span>
          </button>
        </div>
      </div>

      {/* Comparative Defense Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Rogue / Weak CA Vector */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-rose-500/30 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Vulnerable / Subverted CA Characteristics</h3>
              <p className="text-xs text-rose-400 font-mono">eMudhra / WoSign Legacy Weaknesses</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-slate-300 font-mono">
            <li className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-bold">✕</span>
              <div>
                <strong className="text-slate-100 block">Flawed Random Number Generation (RNG):</strong>
                <span>CAs using biased or low-entropy key generation engines produce duplicate moduli across different subscribers.</span>
              </div>
            </li>

            <li className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-bold">✕</span>
              <div>
                <strong className="text-slate-100 block">Bypassed Certificate Transparency (CT):</strong>
                <span>Certificates minted without valid SCTs submitted to Google Argon or Cloudflare Nimbus logs to avoid detection.</span>
              </div>
            </li>

            <li className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-bold">✕</span>
              <div>
                <strong className="text-slate-100 block">Unverified Domain Impersonation:</strong>
                <span>Issuance of DV certificates with high-profile brand prefixes (.gov-verify.in, sbi-auth) without EV/OV vetting.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: TrustMatrix Mitigation Engine */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/30 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">TrustMatrix Real-Time PKI Defenses</h3>
              <p className="text-xs text-cyan-400 font-mono">Cryptographic Verification Pipeline</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-slate-300 font-mono">
            <li className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-cyan-400 font-bold">✓</span>
              <div>
                <strong className="text-slate-100 block">Cryptographic Key Modulus Verification:</strong>
                <span>Enforces strict RSA &ge; 2048-bit and ECC P-256 standards, scanning public key fingerprints for shared prime collisions.</span>
              </div>
            </li>

            <li className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-cyan-400 font-bold">✓</span>
              <div>
                <strong className="text-slate-100 block">Public CT Log Consistency Audits:</strong>
                <span>Validates embedded SCT proofs from multiple independent log monitors, flagging hidden or unlogged certificates instantly.</span>
              </div>
            </li>

            <li className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-cyan-400 font-bold">✓</span>
              <div>
                <strong className="text-slate-100 block">CA Authority Trust Matrix:</strong>
                <span>Continuous cross-referencing against CA/Browser Forum audit revocations and browser root store inclusion lists.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
