import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Layers, ExternalLink, Link2, Copy, Check, Blocks } from 'lucide-react';

export default function EvidenceActionCard({ evidenceDossier, actionableGuidance, web3Attestation, web3Security }) {
  const [copiedHash, setCopiedHash] = useState(false);

  const copyTx = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Left: Evidence-Based Forensic Findings */}
      <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2.5 pb-3 border-b border-[#163838] mb-3.5">
            <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Evidence-Based Risk Findings</h3>
              <p className="text-[11px] text-[#80a4a2] font-mono">Validated indicators explaining the assessment</p>
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {evidenceDossier && evidenceDossier.length > 0 ? (
              evidenceDossier.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#00f2c3] font-bold text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-3 rounded-xl bg-[#061414] text-[#80a4a2] italic">
                No adverse indicators detected. Target conforms to trusted baseline standards.
              </div>
            )}

            {/* Web3 Drainer Alert if applicable */}
            {web3Security && web3Security.isWeb3Target && (
              <div className="p-3 rounded-xl bg-[#0e2727] border border-[#00f2c3]/40 space-y-1">
                <div className="flex items-center space-x-1.5 text-[#00f2c3] font-bold text-[11px]">
                  <Blocks className="w-3.5 h-3.5" />
                  <span>Web3 Threat Vector Analysis</span>
                </div>
                <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
                  {web3Security.findings[0] || 'Web3 token approval & smart contract parameters inspected.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Web3 On-Chain Ledger Anchor Footer */}
        {web3Attestation && (
          <div className="mt-4 pt-3 border-t border-[#143838] flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center space-x-1.5 text-[#00f2c3]">
              <Blocks className="w-3.5 h-3.5" />
              <span>On-Chain Ledger:</span>
              <span className="text-[#80a4a2]">Block #{web3Attestation.blockNumber}</span>
            </div>
            <button
              onClick={() => copyTx(web3Attestation.txHash)}
              className="text-[#80a4a2] hover:text-[#00f2c3] flex items-center space-x-1"
              title="Copy Smart Contract Attestation Hash"
            >
              {copiedHash ? <Check className="w-3 h-3 text-[#00f2c3]" /> : <Copy className="w-3 h-3" />}
              <span>{copiedHash ? 'Hash Copied' : 'EAS Attest Hash'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Right: Actionable Guidance & Decision Support */}
      <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2.5 pb-3 border-b border-[#163838] mb-3.5">
            <div className="p-2 rounded-lg bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Actionable Security Decision Guide</h3>
              <p className="text-[11px] text-[#80a4a2] font-mono">Concrete steps to protect your credentials & assets</p>
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {actionableGuidance && actionableGuidance.length > 0 ? (
              actionableGuidance.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#061414] border border-[#153a3a]">
                  <span className="w-5 h-5 rounded-full bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/40 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-[#e2f1f0] text-[11px] leading-relaxed">
                    {step}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-3 rounded-xl bg-[#061414] text-[#80a4a2] italic">
                Standard security precautions apply.
              </div>
            )}
          </div>
        </div>

        {/* Emergency Escalation Pill */}
        <div className="mt-4 pt-3 border-t border-[#143838] flex items-center justify-between text-[11px] font-mono text-[#80a4a2]">
          <span>National Incident Helpline: <strong className="text-white">1930</strong></span>
          <span className="text-[#00f2c3]">cybercrime.gov.in</span>
        </div>
      </div>
    </div>
  );
}
