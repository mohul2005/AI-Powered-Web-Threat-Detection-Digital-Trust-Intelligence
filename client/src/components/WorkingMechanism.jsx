import React from 'react';
import { Shield, Lock, Cpu, Globe, Users, KeyRound, Layers, Blocks, Terminal } from 'lucide-react';

export default function WorkingMechanism() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3] text-xs font-mono font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Core Triad Architecture</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          How TrustMatrix AI Converges AI, Cybersecurity & Web3
        </h2>
        <p className="text-[#80a4a2] text-sm max-w-2xl mx-auto leading-relaxed">
          Rather than simply tagging websites as "safe" or "malicious", TrustMatrix unites <strong>Artificial Intelligence</strong>, <strong>Cybersecurity PKI</strong>, and <strong>Web3 Decentralized Ledgers</strong> to produce evidence-based risk assessments.
        </p>
      </div>

      {/* The Triad: AI + Cybersecurity + Web3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: AI */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#00f2c3]/40 shadow-card-dark space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#00f2c3]/15 text-[#00f2c3] flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#00f2c3] block uppercase tracking-wider">Pillar 1</span>
          <h3 className="font-bold text-white text-base">Artificial Intelligence</h3>
          <p className="text-xs text-[#80a4a2] leading-relaxed">
            Heuristic NLP content classifiers, Levenshtein brand edit-distance calculation, Shannon entropy scoring, and automated form harvesting analyzers for URLs, emails, and SMS.
          </p>
        </div>

        {/* Pillar 2: Cybersecurity */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#10b981]/40 shadow-card-dark space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#10b981] block uppercase tracking-wider">Pillar 2</span>
          <h3 className="font-bold text-white text-base">Cybersecurity & PKI</h3>
          <p className="text-xs text-[#80a4a2] leading-relaxed">
            Real TLS socket negotiation, <strong>eMudhra-style weak key / duplicate modulus checks</strong>, Certificate Transparency (CT) log audits, and defensive HTTP security headers (HSTS, CSP).
          </p>
        </div>

        {/* Pillar 3: Web3 */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#2dd4bf]/40 shadow-card-dark space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#2dd4bf]/15 text-[#2dd4bf] flex items-center justify-center">
            <Blocks className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#2dd4bf] block uppercase tracking-wider">Pillar 3</span>
          <h3 className="font-bold text-white text-base">Web3 On-Chain Ledger</h3>
          <p className="text-xs text-[#80a4a2] leading-relaxed">
            Decentralized threat registry smart contracts (Solidity), tamper-proof EAS on-chain attestations, and active detection of malicious crypto wallet drainers (Permit2 / setApprovalForAll).
          </p>
        </div>
      </div>

      {/* Multi-Modal Ingestion Flow */}
      <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#00f2c3]" />
            <span>Multi-Input Threat Assessment Architecture</span>
          </h3>
          <p className="text-xs text-[#80a4a2] mt-1">
            Accepts <strong>URLs & Domains</strong>, <strong>Phishing Emails</strong>, or <strong>Smishing SMS Messages</strong> and extracts embedded threats automatically.
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-[#061414] border border-[#174242] font-mono text-xs text-[#00f2c3] font-semibold whitespace-nowrap shadow-neon-sm">
          URL / Domain • Email Headers • SMS / Smishing Text
        </div>
      </div>

      {/* 4 Deep-Dive Modules */}
      <div className="space-y-4">
        {/* Module 1: AI Heuristics */}
        <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">1. AI Threat & Content Investigation</h3>
              <p className="text-xs text-[#80a4a2] font-mono">Levenshtein distance, Punycode/IDN homoglyphs, and form scraping</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
              <span className="font-bold text-[#00f2c3] block">Brand Homoglyphs</span>
              <p className="text-[#80a4a2]">Detects deceptive lookalike characters across Cyrillic and Greek alphabets.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
              <span className="font-bold text-[#00f2c3] block">Email Header Forgery</span>
              <p className="text-[#80a4a2]">Flags mismatched From vs Reply-To headers and urgent social engineering cues.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
              <span className="font-bold text-[#00f2c3] block">Smishing Shortlink Resolvers</span>
              <p className="text-[#80a4a2]">Unpacks bit.ly/tinyurl obfuscations targeting mobile telecom banking users.</p>
            </div>
          </div>
        </div>

        {/* Module 2: The eMudhra PKI Incident */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0e2c2c] via-[#091f1f] to-[#071717] border border-[#00f2c3]/40 shadow-card-dark space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-base">2. Cryptographic Validation & The eMudhra Incident</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 font-bold">
                  PKI Integrity
                </span>
              </div>
              <p className="text-xs text-[#80a4a2] font-mono">Why HTTPS green padlocks can lie: Defective entropy and rogue certificates</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] text-xs text-[#a1c4c2] leading-relaxed space-y-2">
            <p>
              In the eMudhra incident, flaws in Certificate Authority key generation produced duplicate RSA moduli, allowing unauthorized certificates to be generated. TrustMatrix directly checks for <strong>RSA &ge; 2048-bit standards</strong>, scans for <strong>duplicate public key moduli</strong>, and verifies <strong>Certificate Transparency (CT) log proofs</strong> in Google Argon and Cloudflare Nimbus.
            </p>
          </div>
        </div>

        {/* Module 3: Web3 Security & On-Chain Ledger */}
        <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#2dd4bf]/15 border border-[#2dd4bf]/30 text-[#2dd4bf]">
              <Blocks className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">3. Web3 Threat Vectors & Decentralized Trust Ledger</h3>
              <p className="text-xs text-[#80a4a2] font-mono">Malicious Permit2 drainer detection and immutable smart contract attestations</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
              <span className="font-bold text-[#2dd4bf] block">Wallet Drainer Signatures</span>
              <p className="text-[#80a4a2]">
                Identifies deceptive <code>setApprovalForAll</code> and <code>Permit2</code> signature requests trying to siphon tokens and NFTs.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
              <span className="font-bold text-[#2dd4bf] block">On-Chain Smart Contract Ledger</span>
              <p className="text-[#80a4a2]">
                Every verified assessment is cryptographically hashed and recorded on our Ethereum/Polygon Sepolia smart contract (<code>TrustMatrixRegistry.sol</code>).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
