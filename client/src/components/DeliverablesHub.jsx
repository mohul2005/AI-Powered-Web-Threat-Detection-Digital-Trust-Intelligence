import React, { useState } from 'react';
import EvaluationScorecard from './EvaluationScorecard.jsx';
import ScopeBoundariesCharter from './ScopeBoundariesCharter.jsx';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Cpu, 
  Shield, 
  Blocks, 
  FileText, 
  Terminal, 
  PlayCircle, 
  ArrowRight,
  GitBranch,
  Layers,
  Sparkles,
  Lock,
  Globe
} from 'lucide-react';

export default function DeliverablesHub({ onSelectScenario, setActiveTab }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const runAiDemo = () => {
    if (onSelectScenario) onSelectScenario('scenario-4');
    if (setActiveTab) setActiveTab('scanner');
  };

  const runCyberDemo = () => {
    if (onSelectScenario) onSelectScenario('scenario-1');
    if (setActiveTab) setActiveTab('scanner');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3] text-xs font-mono font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>HackMatrix Section 10 Deliverables Dossier</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Expected Deliverables & Verification Hub
        </h2>
        <p className="text-[#80a4a2] text-sm max-w-2xl mx-auto leading-relaxed">
          Comprehensive compliance dossier addressing all 9 mandated deliverables across the Triad of <strong>Artificial Intelligence</strong>, <strong>Cybersecurity PKI</strong>, and <strong>Web3 Decentralized Attestations</strong>.
        </p>
      </div>

      {/* Deliverables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
        
        {/* 1. Working Prototype */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#00f2c3]/40 shadow-card-dark flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] text-[10px] font-bold">DELIVERABLE 1</span>
              <span className="flex items-center space-x-1 text-[#00f2c3] text-[10px]">
                <CheckCircle2 className="w-3 h-3" />
                <span>OPERATIONAL</span>
              </span>
            </div>
            <h3 className="font-bold text-white text-sm">Working Prototype</h3>
            <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
              Functioning web application with multi-modal URL, domain, phishing email, and SMS investigation engines running live on Express and Vite.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('scanner')}
            className="w-full py-2 px-3 rounded-xl bg-[#00f2c3] text-[#051715] font-bold hover:bg-[#00f2c3]/90 flex items-center justify-center space-x-1.5 transition-all shadow-neon-sm"
          >
            <span>Launch Threat Scanner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2. Public GitHub Repository */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] text-[10px] font-bold">DELIVERABLE 2</span>
              <span className="flex items-center space-x-1 text-[#00f2c3] text-[10px]">
                <GitBranch className="w-3 h-3" />
                <span>main branch</span>
              </span>
            </div>
            <h3 className="font-bold text-white text-sm">Public GitHub Repository</h3>
            <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
              Complete source code, Docker Compose orchestration, setup instructions, and reproduction scripts committed to GitHub.
            </p>
            <div className="p-2.5 rounded-lg bg-[#061414] border border-[#153a3a] text-[10px] text-[#80a4a2] truncate">
              git clone https://github.com/mohul2005/AI-Powered-Web-Threat-Detection-Digital-Trust-Intelligence.git
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => copyToClipboard('https://github.com/mohul2005/AI-Powered-Web-Threat-Detection-Digital-Trust-Intelligence.git', 'repo')}
              className="flex-1 py-2 px-2.5 rounded-xl bg-[#061414] border border-[#174242] text-[#e2f1f0] hover:border-[#00f2c3] flex items-center justify-center space-x-1"
            >
              {copiedKey === 'repo' ? <Check className="w-3.5 h-3.5 text-[#00f2c3]" /> : <Copy className="w-3.5 h-3.5 text-[#00f2c3]" />}
              <span>{copiedKey === 'repo' ? 'Copied' : 'Copy URL'}</span>
            </button>
            <a
              href="https://github.com/mohul2005/AI-Powered-Web-Threat-Detection-Digital-Trust-Intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-[#0e2727] text-[#00f2c3] border border-[#00f2c3]/40 hover:bg-[#00f2c3]/10 flex items-center justify-center"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3. AI Demonstration */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#00f2c3]/40 shadow-card-dark flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] text-[10px] font-bold">DELIVERABLE 3</span>
              <span className="text-[10px] text-[#00f2c3] flex items-center space-x-1">
                <Cpu className="w-3 h-3" />
                <span>AI NLP / RAG</span>
              </span>
            </div>
            <h3 className="font-bold text-white text-sm">AI Scam Demonstration</h3>
            <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
              Demonstrates Module 3 AI Boundary Rule, AnyDesk remote control tool detection, money mule UPI extraction, and MITRE T1566 plain-English synthesis.
            </p>
          </div>
          <button
            onClick={runAiDemo}
            className="w-full py-2 px-3 rounded-xl bg-[#0e2727] text-[#00f2c3] border border-[#00f2c3]/40 hover:bg-[#00f2c3]/20 font-bold flex items-center justify-center space-x-1.5 transition-all"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Run AI Demonstration</span>
          </button>
        </div>

        {/* 4. Cybersecurity Demonstration */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#10b981]/40 shadow-card-dark flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] text-[10px] font-bold">DELIVERABLE 4</span>
              <span className="text-[10px] text-[#10b981] flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>PKI & TLS</span>
              </span>
            </div>
            <h3 className="font-bold text-white text-sm">Cybersecurity & TLS Demo</h3>
            <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
              Demonstrates Section B TLS Ordinary vs Compromised Trust, crt.sh CT log query, duplicate RSA key modulus detection, and NIST SP 800-30 veto overrides.
            </p>
          </div>
          <button
            onClick={runCyberDemo}
            className="w-full py-2 px-3 rounded-xl bg-[#061414] text-[#10b981] border border-[#10b981]/40 hover:bg-[#10b981]/15 font-bold flex items-center justify-center space-x-1.5 transition-all"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Run Cyber Demonstration</span>
          </button>
        </div>

        {/* 5. Web3 Demonstration */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#2dd4bf]/40 shadow-card-dark flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#2dd4bf]/20 text-[#2dd4bf] text-[10px] font-bold">DELIVERABLE 5</span>
              <span className="text-[10px] text-[#2dd4bf] flex items-center space-x-1">
                <Blocks className="w-3 h-3" />
                <span>Solidity ^0.8.20</span>
              </span>
            </div>
            <h3 className="font-bold text-white text-sm">Web3 Smart Contract</h3>
            <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
              <code>TrustMatrixRegistry.sol</code> deployed on Ethereum Sepolia / Polygon EVM with EAS structured schemas, dispute tracking, and provenance chains.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#061414] border border-[#153a3a] text-[10px] text-[#2dd4bf]">
            Sepolia Chain ID: 11155111 • EAS Schema
          </div>
        </div>

        {/* 6. Verification Evidence */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#2dd4bf]/40 shadow-card-dark flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#2dd4bf]/20 text-[#2dd4bf] text-[10px] font-bold">DELIVERABLE 6</span>
              <span className="text-[10px] text-[#2dd4bf]">EAS Schema Active</span>
            </div>
            <h3 className="font-bold text-white text-sm">Verification Evidence</h3>
            <div className="space-y-1.5 text-[10.5px]">
              <div className="p-2 rounded bg-[#061414] border border-[#153a3a] flex items-center justify-between">
                <span className="text-[#80a4a2] truncate mr-2">0x71C8A336c1eB7Fa855d4715494B4E38A49c25920</span>
                <button
                  onClick={() => copyToClipboard('0x71C8A336c1eB7Fa855d4715494B4E38A49c25920', 'contract')}
                  className="text-[#00f2c3] shrink-0"
                >
                  {copiedKey === 'contract' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[#80a4a2] text-[10px]">
                Tx: 0x8f2d5a1b... | IPFS: bafybeih...
              </p>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#061414] border border-[#153a3a] text-[10px] text-[#00f2c3] text-center">
            Off-Chain Privacy Preserved (SHA-256 Only)
          </div>
        </div>

        {/* 7. Technical Documentation */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] text-[10px] font-bold">DELIVERABLE 7</span>
              <span className="text-[10px] text-[#00f2c3]">README.md + DELIVERABLES.md</span>
            </div>
            <h3 className="font-bold text-white text-sm">Technical Documentation</h3>
            <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
              Exhaustive documentation of Triad architecture, analysis pipelines, 6 threat intelligence sources, and Bayesian NIST SP 800-30 scoring.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('mechanism')}
            className="w-full py-2 px-3 rounded-xl bg-[#061414] border border-[#174242] text-[#00f2c3] hover:border-[#00f2c3] font-bold flex items-center justify-center space-x-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Read Working Mechanism</span>
          </button>
        </div>

        {/* 8. Testing Report */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#00f2c3]/40 shadow-card-dark flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] text-[10px] font-bold">DELIVERABLE 8</span>
              <span className="text-[10px] text-[#00f2c3] font-bold">262/262 (100%)</span>
            </div>
            <h3 className="font-bold text-white text-sm">Testing Report</h3>
            <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
              Documented legitimate (Cloudflare, SBI) vs suspicious test cases (YONO phish, AnyDesk smish, eMudhra CA collision, Permit2 drainer, SSRF).
            </p>
          </div>
          <button
            onClick={() => setActiveTab('validation')}
            className="w-full py-2 px-3 rounded-xl bg-[#0e2727] text-[#00f2c3] border border-[#00f2c3]/40 hover:bg-[#00f2c3]/20 font-bold flex items-center justify-center space-x-1.5 transition-all"
          >
            <span>View Validation Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 9. Live Demonstration */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#00f2c3] shadow-card-dark flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#00f2c3] text-[#051715] text-[10px] font-bold">DELIVERABLE 9</span>
              <span className="text-[10px] text-[#00f2c3] font-bold">5-Step Workflow</span>
            </div>
            <h3 className="font-bold text-white text-sm">Live Demonstration</h3>
            <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
              Step-by-step interactive workflow guided by <code>WorkflowStepper.jsx</code>: <strong>Submit &rarr; Investigate &rarr; Analyse &rarr; Assess &rarr; Report & Verify</strong>.
            </p>
          </div>
          <button
            onClick={runCyberDemo}
            className="w-full py-2 px-3 rounded-xl bg-[#00f2c3] text-[#051715] font-bold hover:bg-[#00f2c3]/90 flex items-center justify-center space-x-1.5 transition-all shadow-neon-sm"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Launch Live Demo</span>
          </button>
        </div>

      </div>

      {/* Section 11: Official Evaluation Criteria Scorecard */}
      <EvaluationScorecard
        setActiveTab={setActiveTab}
        onSelectScenario={onSelectScenario}
      />

      {/* Section 13: Scope Boundaries & Ethical Charter */}
      <ScopeBoundariesCharter />

      {/* Terminal Command for Reproduction */}
      <div className="p-4 rounded-xl bg-[#061414] border border-[#174242] flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-2 text-[#00f2c3]">
          <Terminal className="w-4 h-4 shrink-0" />
          <span>One-Command HackMatrix Deliverables Verification:</span>
          <code className="px-2 py-0.5 rounded bg-[#091f1f] text-white">node server/test-section10-deliverables.js</code>
        </div>
        <button
          onClick={() => copyToClipboard('node server/test-section10-deliverables.js', 'cmd')}
          className="px-3 py-1.5 rounded-lg bg-[#0e2727] text-[#00f2c3] border border-[#00f2c3]/40 hover:bg-[#00f2c3]/20 flex items-center space-x-1.5 whitespace-nowrap"
        >
          {copiedKey === 'cmd' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedKey === 'cmd' ? 'Copied' : 'Copy Test Command'}</span>
        </button>
      </div>
    </div>
  );
}
