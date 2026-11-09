import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Blocks, 
  UserCheck, 
  Building2, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowRight,
  HeartHandshake
} from 'lucide-react';

export default function FinalObjectiveCharter({ setActiveTab, onSelectScenario }) {
  const [copied, setCopied] = useState(false);

  const copyTestCommand = () => {
    navigator.clipboard.writeText('node server/test-section14-final-objective.js');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Hero Capstone Mission Card */}
      <div className="relative overflow-hidden p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#061414] via-[#0b2222] to-[#041010] border border-[#00f2c3]/40 shadow-neon-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2c3]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3] text-xs font-mono font-bold">
            <Target className="w-3.5 h-3.5" />
            <span>Section 14: HackMatrix Final Objective & Capstone Mission</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Making the Internet Safer by Stopping Digital Deception Before Harm Occurs
          </h2>

          <blockquote className="text-[#a1c4c2] text-sm md:text-base leading-relaxed italic border-l-4 border-[#00f2c3] pl-4 py-1">
            "Build an accessible, intelligent digital security platform that helps individuals and organisations identify potentially malicious websites, avoid phishing attacks, recognise online scams, and understand the security risks associated with the websites they interact with."
          </blockquote>

          <div className="p-4 rounded-xl bg-[#041010]/80 border border-[#174242] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-white text-xs font-semibold">
              <HeartHandshake className="w-4 h-4 text-[#00f2c3] shrink-0" />
              <span>Core Mission: "Help people identify digital deception before they become its victims."</span>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#00f2c3]/20 text-[#00f2c3] text-[11px] font-mono font-bold shrink-0">
              100% OBJECTIVE FULFILLED
            </span>
          </div>
        </div>
      </div>

      {/* The Triad Pillars Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
        
        {/* Pillar 1: AI */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] hover:border-[#00f2c3]/50 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] text-[10px] font-bold">TRIAD PILLAR 1</span>
              <Cpu className="w-4 h-4 text-[#00f2c3]" />
            </div>
            <h3 className="font-bold text-white text-sm">Artificial Intelligence</h3>
            <p className="text-[#00f2c3] text-[11px] font-semibold">
              Investigate & Correlate Suspicious Activity
            </p>
            <p className="text-[#80a4a2] text-[11px] leading-relaxed">
              • Deterministic Levenshtein brand distance (18+ institutions)<br/>
              • Contextual RAG over MITRE ATT&CK techniques<br/>
              • Forensic extraction of shortlinks, mule VPAs & AnyDesk RATs<br/>
              • Multi-incident campaign correlation across shared BGP ASNs
            </p>
          </div>
          <button
            onClick={() => {
              if (onSelectScenario) onSelectScenario('parcel-delivery-customs-scam');
              if (setActiveTab) setActiveTab('scanner');
            }}
            className="w-full py-2 px-3 rounded-xl bg-[#061414] border border-[#174242] text-[#00f2c3] hover:border-[#00f2c3] font-bold flex items-center justify-center space-x-1.5 transition-all text-[11px]"
          >
            <span>Inspect AI Smishing Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pillar 2: Cybersecurity */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] hover:border-[#00f2c3]/50 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] text-[10px] font-bold">TRIAD PILLAR 2</span>
              <ShieldCheck className="w-4 h-4 text-[#00f2c3]" />
            </div>
            <h3 className="font-bold text-white text-sm">Deep Cybersecurity</h3>
            <p className="text-[#00f2c3] text-[11px] font-semibold">
              Identify & Validate Technical Threats
            </p>
            <p className="text-[#80a4a2] text-[11px] leading-relaxed">
              • Direct X.509 raw TLS handshake & certificate chain analysis<br/>
              • Section B: Ordinary vs Compromised CA Trust distinction<br/>
              • Detection of eMudhra weak key generation duplicate moduli<br/>
              • Automated audit for HSTS, CSP & Clickjacking defensive headers
            </p>
          </div>
          <button
            onClick={() => {
              if (onSelectScenario) onSelectScenario('sbi-bank-credential-harvester');
              if (setActiveTab) setActiveTab('scanner');
            }}
            className="w-full py-2 px-3 rounded-xl bg-[#061414] border border-[#174242] text-[#00f2c3] hover:border-[#00f2c3] font-bold flex items-center justify-center space-x-1.5 transition-all text-[11px]"
          >
            <span>Inspect PKI Security Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pillar 3: Web3 */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] hover:border-[#00f2c3]/50 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] text-[10px] font-bold">TRIAD PILLAR 3</span>
              <Blocks className="w-4 h-4 text-[#00f2c3]" />
            </div>
            <h3 className="font-bold text-white text-sm">Web3 Attestations</h3>
            <p className="text-[#00f2c3] text-[11px] font-semibold">
              Transparent & Verifiable Threat Sharing
            </p>
            <p className="text-[#80a4a2] text-[11px] leading-relaxed">
              • Ethereum Sepolia EAS smart contract (<code className="text-[#00f2c3]">0x71C8...</code>)<br/>
              • Cryptographic SHA-256 report commitments on-chain<br/>
              • Independent offline tamper verification<br/>
              • Off-chain privacy preservation (zero PII / passwords on-chain)
            </p>
          </div>
          <button
            onClick={() => setActiveTab && setActiveTab('threat-map')}
            className="w-full py-2 px-3 rounded-xl bg-[#061414] border border-[#174242] text-[#00f2c3] hover:border-[#00f2c3] font-bold flex items-center justify-center space-x-1.5 transition-all text-[11px]"
          >
            <span>Inspect On-Chain Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Dual Persona Showcase: Individuals vs Organisations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
        
        {/* For Individuals */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] space-y-3">
          <div className="flex items-center space-x-2 text-[#00f2c3]">
            <UserCheck className="w-4 h-4" />
            <h4 className="font-bold text-white text-sm">For Individuals: Everyday Scam Defense</h4>
          </div>
          <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
            Everyday users gain immediate, plain-English protection before clicking deceptive links, scanning malicious QR codes, or transferring funds:
          </p>
          <ul className="space-y-1.5 text-[#80a4a2] text-[11px]">
            <li className="flex items-start space-x-1.5">
              <span className="text-[#00f2c3]">&#10003;</span>
              <span><strong>Multi-Modal Ingestion:</strong> Check suspicious URLs, phishing emails, SMS/WhatsApp texts, and UPI QR codes.</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <span className="text-[#00f2c3]">&#10003;</span>
              <span><strong>Plain-English Explainability:</strong> Clear explanations of deception mechanics without confusing technical jargon.</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <span className="text-[#00f2c3]">&#10003;</span>
              <span><strong>National Helpline Escalation:</strong> Immediate 1-click advice to dial National Cybercrime Helpline <strong>1930</strong> or visit <strong>cybercrime.gov.in</strong>.</span>
            </li>
          </ul>
        </div>

        {/* For Organisations */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] space-y-3">
          <div className="flex items-center space-x-2 text-[#00f2c3]">
            <Building2 className="w-4 h-4" />
            <h4 className="font-bold text-white text-sm">For Organisations: Enterprise Threat Posture</h4>
          </div>
          <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
            Enterprises and security operations teams (SOC/CISO) monitor external attack surfaces and protect customer brand trust:
          </p>
          <ul className="space-y-1.5 text-[#80a4a2] text-[11px]">
            <li className="flex items-start space-x-1.5">
              <span className="text-[#00f2c3]">&#10003;</span>
              <span><strong>CT Log Stream Monitoring:</strong> Real-time surveillance for unauthorized certificates issued for enterprise domains.</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <span className="text-[#00f2c3]">&#10003;</span>
              <span><strong>Lookalike Domain Radar:</strong> Preemptively detects typosquatting, Cyrillic homoglyphs (<code className="text-[#00f2c3]">xn--</code>), and bitsquats.</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <span className="text-[#00f2c3]">&#10003;</span>
              <span><strong>Open Threat Sharing:</strong> REST APIs exporting OASIS STIX 2.1 bundles, TAXII 2.1 collections, and SIEM IOC lists.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Terminal Verification Command */}
      <div className="p-4 rounded-xl bg-[#061414] border border-[#174242] flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-2 text-[#00f2c3]">
          <Terminal className="w-4 h-4 shrink-0" />
          <span>Verify Section 14 Final Objective Suite:</span>
          <code className="px-2 py-0.5 rounded bg-[#091f1f] text-white">node server/test-section14-final-objective.js</code>
        </div>
        <button
          onClick={copyTestCommand}
          className="px-3 py-1.5 rounded-lg bg-[#0e2727] text-[#00f2c3] border border-[#00f2c3]/40 hover:bg-[#00f2c3]/20 flex items-center space-x-1.5 whitespace-nowrap"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Test Command'}</span>
        </button>
      </div>
    </div>
  );
}