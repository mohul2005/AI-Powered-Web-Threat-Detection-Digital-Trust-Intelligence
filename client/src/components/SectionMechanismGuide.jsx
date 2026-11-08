import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Blocks, 
  Globe, 
  KeyRound, 
  MessageSquare, 
  Network, 
  Lock, 
  Scale, 
  QrCode, 
  Eye, 
  Terminal, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2,
  BookOpen,
  Building2,
  UserCheck
} from 'lucide-react';

export default function SectionMechanismGuide({ onSelectScenario, setActiveTab }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedSection, setExpandedSection] = useState(1);
  const [simpleModeOnly, setSimpleModeOnly] = useState(true);

  const sections = [
    {
      id: 1,
      number: "Module 1",
      title: "Intelligent URL & Website Analysis",
      category: "ai",
      icon: Globe,
      badge: "Phishing & Fake Brands",
      scenarioId: "scenario-1",
      simpleExplanation: "Checks if a website link is pretending to be a trusted brand (like State Bank of India, PayPal, or Google) using sneaky spelling tricks or fake login pages designed to steal passwords.",
      analogy: "Like a bouncer checking whether a VIP pass has a misspelling or fake logo before letting you in.",
      dangerToUser: "Entering your username or password on a fake site gives hackers full access to your account or funds.",
      howTrustMatrixProtects: "Calculates brand distance (Levenshtein algorithm), detects hidden characters (IDN homoglyphs), and finds hidden forms waiting to capture OTPs or passwords.",
      technicalMechanism: "Heuristic NLP content classifiers, Levenshtein edit-distance against 18+ banking/corporate brands, Shannon entropy scoring, and DOM input scraping.",
      testPrompt: "https://sbi-yono-pan-kyc-update.top"
    },
    {
      id: 2,
      number: "Module 2",
      title: "TLS Certificates & Digital Trust (Section B)",
      category: "cyber",
      icon: KeyRound,
      badge: "Padlock & Encryption Audit",
      scenarioId: "emudhra-weak-key-incident",
      simpleExplanation: "Inspects the website's digital padlock (HTTPS certificate). Just having a green padlock does NOT mean a site is honest—hackers can get cheap padlocks too! We inspect who created the padlock and check if it has weak cryptographic keys.",
      analogy: "A padlock on a door keeps eavesdroppers from listening, but it doesn't tell you whether the person inside the house is a robber or a banker.",
      dangerToUser: "Weak encryption allows attackers to intercept credit card numbers, passwords, and private messages in transit.",
      howTrustMatrixProtects: "Directly performs a live TLS handshake, checks the encryption key size (must be 2048-bit or higher), and checks against the eMudhra duplicate key modulus incident.",
      technicalMechanism: "Live TLS socket handshake, X.509 certificate chain validation, key length & entropy audit, and Certificate Transparency (CT) log verification (Google Argon / Cloudflare Nimbus).",
      testPrompt: "https://secure-login.gov-verify.in"
    },
    {
      id: 3,
      number: "Module 3",
      title: "AI Scam & Smishing Analysis (Section C)",
      category: "ai",
      icon: MessageSquare,
      badge: "SMS, WhatsApp & Email Scams",
      scenarioId: "scenario-4",
      simpleExplanation: "Evaluates suspicious messages claiming your electricity will be disconnected, you won a lottery, or your parcel is held up. It identifies social engineering tricks and warns you before you call the scammer or install remote-control apps.",
      analogy: "Like a smart advisor standing next to you whispering: 'Stop! Genuine electricity companies never ask you to install AnyDesk or transfer fees via personal UPI.'",
      dangerToUser: "Scammers use urgency to make you panic, trick you into installing remote-screen apps (AnyDesk) to empty your bank accounts.",
      howTrustMatrixProtects: "Enforces the Module 3 AI Boundary Rule: urgent language alone does not trigger a false alert; it requires concrete evidence like RAT tool names, shortlinks, or unverified money-mule UPI handles.",
      technicalMechanism: "Contextual RAG synthesis over MITRE ATT&CK techniques (T1219 Remote Access Software, T1566 Spearphishing), entity extraction, and plain-English safety steps.",
      testPrompt: "Urgent KYC suspension. Install AnyDesk from http://sbi-kyc.top"
    },
    {
      id: 4,
      number: "Module 4",
      title: "Intelligent Threat Correlation",
      category: "ai",
      icon: Network,
      badge: "Syndicate & Infrastructure Mapping",
      scenarioId: "scenario-1",
      simpleExplanation: "Connects isolated scam reports together! It reveals whether a fake website is part of a larger organized scam syndicate using the same hosting servers or money-mule payment accounts.",
      analogy: "Like detectives connecting multiple burglary cases to the same getaway car and license plate.",
      dangerToUser: "Individual scams look harmless in isolation; syndicate correlation exposes the real criminal enterprise behind them.",
      howTrustMatrixProtects: "Maps relationships between domains, server IP addresses, BGP routing networks, and reused payment handles to display an interactive attack graph.",
      technicalMechanism: "Deterministic graph clustering across shared BGP Autonomous System Numbers (AS20473), colocated hosting IPs, Jaccard token similarity over phishing templates, and syndicate money mule UPI handles.",
      testPrompt: "Correlates sbi-yono-pan-kyc-update.top with AS20473 (Choopa / Vultr)"
    },
    {
      id: 5,
      number: "Module 5",
      title: "Website Security Assessment",
      category: "cyber",
      icon: Lock,
      badge: "Security Headers & Posture",
      scenarioId: "scenario-1",
      simpleExplanation: "Examines a website's defensive armor (security headers) to verify if it protects visitors against being tricked by fake popup windows (Clickjacking) or downgrading to unencrypted HTTP.",
      analogy: "Checking whether a building has fire extinguishers, secure locks, and reinforced windows.",
      dangerToUser: "Missing headers leave you vulnerable to having malicious scripts injected or having your banking session stolen while you browse.",
      howTrustMatrixProtects: "Conducts passive, read-only checks of HSTS, Content-Security-Policy (CSP), and X-Frame-Options headers without attempting any offensive exploitation.",
      technicalMechanism: "Automated HTTP header audit calculating a unified posture score (A+ to F) and providing exact nginx/Apache remediation guidelines.",
      testPrompt: "Audits Strict-Transport-Security, CSP, and X-Frame-Options"
    },
    {
      id: 6,
      number: "Module 6",
      title: "Decentralized Threat Intelligence (Web3)",
      category: "web3",
      icon: Blocks,
      badge: "Tamper-Proof Blockchain Ledger",
      scenarioId: "uniswap-permit2-drainer",
      simpleExplanation: "Stores a permanent, tamper-proof record of verified threats on the blockchain (Ethereum Sepolia). No scammer or company can delete or alter past scam reports.",
      analogy: "Engraving a record in stone on a public square so everyone can verify it independently forever, while keeping private names and passwords completely hidden.",
      dangerToUser: "Centralized databases can be censored, altered, or wiped during cyber attacks. Blockchains guarantee report history integrity.",
      howTrustMatrixProtects: "Creates an Ethereum Attestation Service (EAS) attestation with a 32-byte SHA-256 fingerprint. Sensitive passwords and raw URLs remain strictly off-chain for privacy.",
      technicalMechanism: "Solidity smart contract (TrustMatrixRegistry.sol) on Ethereum Sepolia, on-chain dispute resolution, and independent offline hash verification.",
      testPrompt: "Contract 0x71C8A336c1eB7Fa855d4715494B4E38A49c25920"
    },
    {
      id: 7,
      number: "Section 5",
      title: "The 5-Step User Experience",
      category: "ux",
      icon: Sparkles,
      badge: "Simple 5-Step Workflow",
      scenarioId: "scenario-4",
      simpleExplanation: "A guided 5-step journey that anyone can follow: 1. Paste link/message -> 2. System investigates -> 3. AI analyzes -> 4. View clear score & safety instructions -> 5. Report on blockchain.",
      analogy: "Like a medical checkup: Check in -> Take vitals -> Lab test -> Doctor's diagnosis in plain English -> Medical record saved.",
      dangerToUser: "Complicated tools cause user confusion and mistakes. The 5-step stepper makes cybersecurity simple and actionable.",
      howTrustMatrixProtects: "Interactive WorkflowStepper component guides the user through each phase with visual progress indicators.",
      technicalMechanism: "Event-driven asynchronous workflow executing pre-flight SSRF guards, DNS lookups, TLS extraction, and NIST Bayesian risk calculation.",
      testPrompt: "WorkflowStepper.jsx: Submit -> Investigate -> Analyse -> Assess -> Report"
    },
    {
      id: 8,
      number: "Section 6",
      title: "Consistent Risk Classification",
      category: "scoring",
      icon: Scale,
      badge: "5 Universal Risk Tiers",
      scenarioId: "scenario-1",
      simpleExplanation: "Categorizes threats into 5 easy-to-understand colors: Green (Low Risk), Yellow (Suspicious), Orange (High Risk), Red (Confirmed Malicious), and Gray (Inconclusive - not enough info).",
      analogy: "Traffic lights for the internet: Green = proceed carefully, Yellow = double-check, Red = stop immediately!",
      dangerToUser: "Binary 'Safe vs Malicious' systems are dangerous because zero-day scams might not be known yet. We never claim a site is 100% safe just because it passed automated checks.",
      howTrustMatrixProtects: "Enforces the Security Axiom: absence of evidence is not proof of safety. Clean sites are marked 'Low Risk' with cautious advice.",
      technicalMechanism: "Bayesian Multi-Layered Threat Model (35% AI Phishing + 30% PKI + 20% Collab Intel + 15% AppSec) with non-linear veto overrides.",
      testPrompt: "Confirmed Malicious (<=25) | High Risk (26-50) | Suspicious (51-70) | Low Risk (71-100)"
    },
    {
      id: 9,
      number: "Section 9",
      title: "Security & Privacy Guardrails",
      category: "security",
      icon: ShieldCheck,
      badge: "Zero-Risk Platform Guarantee",
      scenarioId: "scenario-1",
      simpleExplanation: "The Golden Rule: 'The security platform must not become a security risk itself.' TrustMatrix never runs dangerous code, never asks for your password or OTP, and scrubs private keys.",
      analogy: "A doctor who always wears sterile gloves and masks so they never pass infections to the patient.",
      dangerToUser: "Poorly built scanners can be tricked into attacking internal corporate networks (SSRF) or leaking user passwords.",
      howTrustMatrixProtects: "Blocks all private IP addresses (127.0.0.1, 10.0.0.0/8), neutralizes AI prompt injections, and automatically scrubs credit card numbers and seed phrases.",
      technicalMechanism: "Pre-flight SSRF resolver (ssrfGuard.js), prompt injection tokenizer (promptInjectionGuard.js), and automated PII scrubber (credentialScrubber.js).",
      testPrompt: "Blocks loopback, RFC1918, and AWS metadata 169.254.169.254"
    },
    {
      id: 10,
      number: "Section 12",
      title: "QR Code Scam Detection (Quishing)",
      category: "extensions",
      icon: QrCode,
      badge: "UPI & Payment Fraud",
      scenarioId: "quish-reverse-upi-scam",
      simpleExplanation: "Detects scams where fraudsters ask you to 'Scan this QR code to RECEIVE money or a refund'. In UPI, scanning a QR code ALWAYS sends money out of your account, never in!",
      analogy: "A QR code on UPI is a check you are signing, not a check someone is giving you.",
      dangerToUser: "Victims scan expecting a refund of ₹5,000, enter their UPI PIN, and instantly lose ₹5,000 from their bank.",
      howTrustMatrixProtects: "Decodes UPI payloads, flags deceptive keywords like 'Receive', 'Refund', 'Prize', and checks for unverified money-mule accounts.",
      technicalMechanism: "UPI URI parsing (upi://pay), regex analysis of transaction notes & payee handles, APK sideloading URL scanner (qrScamEngine.js).",
      testPrompt: "upi://pay?pa=mule@okaxis&pn=Refund&am=5000&tn=Scan_To_Receive_Refund"
    },
    {
      id: 11,
      number: "Section 12",
      title: "Lookalike & Homoglyph Domain Radar",
      category: "extensions",
      icon: Eye,
      badge: "Typosquatting & Fake Domains",
      scenarioId: "scenario-1",
      simpleExplanation: "Discovers fake website addresses that look nearly identical to real brands before scammers even use them (e.g. replacing English 'a' with Russian 'а' or swapping letters).",
      analogy: "Spotting a counterfeit watch before the scammer sells it by noticing the logo is 1 millimeter off.",
      dangerToUser: "To the human eye on a phone screen, `sbi.co.in` and `sbі.co.in` look identical, tricking even smart users.",
      howTrustMatrixProtects: "Generates Punycode (`xn--`), bitsquats, and deceptive affixes (e.g. `sbi-kyc-login.top`) so organizations can block them proactively.",
      technicalMechanism: "Cyrillic/Greek Unicode homoglyph generation, Punycode RFC 3492 conversion, 1-bit memory flip simulation (lookalikeEngine.js).",
      testPrompt: "Generates lookalikes for paypal.com, sbi.co.in, google.com"
    },
    {
      id: 12,
      number: "Section 12",
      title: "Organisation Security Dashboard",
      category: "extensions",
      icon: Building2,
      badge: "Enterprise Posture & CT Logs",
      scenarioId: "scenario-1",
      simpleExplanation: "A specialized command center for businesses and security chiefs (CISO). It continuously monitors their public websites and gives an overall security health grade.",
      analogy: "A 24/7 security guard monitoring all doors, windows, and cameras of an office building.",
      dangerToUser: "Unmonitored company websites can have unauthorized certificates issued in their name by rogue certificate authorities without their knowledge.",
      howTrustMatrixProtects: "Monitors Certificate Transparency logs (Google Argon / Cloudflare Nimbus) in real-time and alerts if an unauthorized CA issues a certificate for a registered domain.",
      technicalMechanism: "Continuous CT log event evaluator, external attack surface discovery, CISO executive scorecard, and STIX 2.1 threat feed exports.",
      testPrompt: "Monitors sbi.co.in against unauthorized Let's Encrypt issuance"
    },
    {
      id: 13,
      number: "Section 13",
      title: "Scope Boundaries & Ethical Charter",
      category: "governance",
      icon: Scale,
      badge: "Safe, Focused & Ethical",
      scenarioId: "scenario-1",
      simpleExplanation: "Clearly defines what TrustMatrix does and what it deliberately DOES NOT do: It focuses on web threats, does not pretend to be an antivirus, never exploits servers, and respects privacy.",
      analogy: "A certified home inspector who thoroughly inspects structural safety without breaking windows or picking locks.",
      dangerToUser: "Unbounded tools often over-promise, conduct illegal hacking, or give false assurances of safety.",
      howTrustMatrixProtects: "Adheres to all 8 HackMatrix scope boundaries and focuses with precision on the mandated intended outcome.",
      technicalMechanism: "Verified via server/test-section13-scope.js covering all 8 hackathon scope boundaries with 100% test passage.",
      testPrompt: "12/12 boundary checks passing automated verification"
    },
    {
      id: 14,
      number: "Section 14",
      title: "Final Objective & Capstone Mission",
      category: "mission",
      icon: UserCheck,
      badge: "Pre-Victim Scam Prevention",
      scenarioId: "scenario-4",
      simpleExplanation: "The Golden Mission: 'To make the internet a safer place by helping people identify digital deception before they become its victims.'",
      analogy: "A shield that deflects the arrow before it hits you.",
      dangerToUser: "Most security solutions only report scams after people have already lost their money. TrustMatrix acts beforehand.",
      howTrustMatrixProtects: "Unites Artificial Intelligence, Deep Cybersecurity, and Web3 to protect everyday individuals and enterprise organizations.",
      technicalMechanism: "Verified via server/test-section14-final-objective.js (11/11 checks) completing the 74/74 full platform audit.",
      testPrompt: "Full Triad synthesis: AI + Cybersecurity + Web3"
    }
  ];

  const filteredSections = activeCategory === 'all' 
    ? sections 
    : sections.filter(s => s.category === activeCategory);

  const handleTestSection = (sec) => {
    if (onSelectScenario && sec.scenarioId) {
      onSelectScenario(sec.scenarioId);
    }
    if (setActiveTab) {
      setActiveTab('scanner');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Title & Beginner Switch */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#061414] via-[#0b2222] to-[#041010] border border-[#00f2c3]/40 shadow-neon-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3] text-xs font-mono font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Beginner-Friendly Platform Guide</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              How Each Section Works in Plain English
            </h2>
            <p className="text-[#80a4a2] text-sm max-w-2xl leading-relaxed">
              Cybersecurity can look complex with all its acronyms and technical terms. This guide breaks down <strong>all 14 sections</strong> into everyday language so anyone can understand what they do, why they matter, and how they protect you.
            </p>
          </div>

          {/* Simple vs Technical View Switch */}
          <div className="p-1 rounded-xl bg-[#061414] border border-[#174242] flex items-center space-x-1 shrink-0 font-mono text-xs">
            <button
              onClick={() => setSimpleModeOnly(true)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center space-x-1.5 ${
                simpleModeOnly 
                  ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm' 
                  : 'text-[#80a4a2] hover:text-white'
              }`}
            >
              <span>💡 Simple (Beginners)</span>
            </button>
            <button
              onClick={() => setSimpleModeOnly(false)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center space-x-1.5 ${
                !simpleModeOnly 
                  ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm' 
                  : 'text-[#80a4a2] hover:text-white'
              }`}
            >
              <span>🔬 Include Technical Details</span>
            </button>
          </div>
        </div>

        {/* 3 Simple Questions Every User Asks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-[#041010]/80 border border-[#174242] space-y-1">
            <span className="text-[#00f2c3] font-bold font-mono">1. Is this link or message safe?</span>
            <p className="text-[#80a4a2] leading-relaxed">
              We run live checks against 6 intelligence feeds, verify the digital padlock, and detect brand impersonation.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#041010]/80 border border-[#174242] space-y-1">
            <span className="text-[#00f2c3] font-bold font-mono">2. What tricks are attackers using?</span>
            <p className="text-[#80a4a2] leading-relaxed">
              We expose urgency pressure, hidden forms stealing OTPs, fake logos, and remote-control apps like AnyDesk.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#041010]/80 border border-[#174242] space-y-1">
            <span className="text-[#00f2c3] font-bold font-mono">3. What should I do right now?</span>
            <p className="text-[#80a4a2] leading-relaxed">
              Every scan gives you plain-English instructions and direct 1-click access to National Cybercrime Helpline 1930.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-mono">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-[#00f2c3]/20 border-[#00f2c3] text-[#00f2c3] font-bold'
              : 'bg-[#0b2020] border-[#174242] text-[#80a4a2] hover:text-white'
          }`}
        >
          All 14 Sections ({sections.length})
        </button>
        <button
          onClick={() => setActiveCategory('ai')}
          className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
            activeCategory === 'ai'
              ? 'bg-[#00f2c3]/20 border-[#00f2c3] text-[#00f2c3] font-bold'
              : 'bg-[#0b2020] border-[#174242] text-[#80a4a2] hover:text-white'
          }`}
        >
          🤖 Artificial Intelligence
        </button>
        <button
          onClick={() => setActiveCategory('cyber')}
          className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
            activeCategory === 'cyber'
              ? 'bg-[#00f2c3]/20 border-[#00f2c3] text-[#00f2c3] font-bold'
              : 'bg-[#0b2020] border-[#174242] text-[#80a4a2] hover:text-white'
          }`}
        >
          🛡️ Cybersecurity & PKI
        </button>
        <button
          onClick={() => setActiveCategory('web3')}
          className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
            activeCategory === 'web3'
              ? 'bg-[#00f2c3]/20 border-[#00f2c3] text-[#00f2c3] font-bold'
              : 'bg-[#0b2020] border-[#174242] text-[#80a4a2] hover:text-white'
          }`}
        >
          ⛓️ Web3 Blockchain
        </button>
        <button
          onClick={() => setActiveCategory('extensions')}
          className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
            activeCategory === 'extensions'
              ? 'bg-[#00f2c3]/20 border-[#00f2c3] text-[#00f2c3] font-bold'
              : 'bg-[#0b2020] border-[#174242] text-[#80a4a2] hover:text-white'
          }`}
        >
          ⚡ Advanced Tools (QR, Radar, Org)
        </button>
      </div>

      {/* Accordion List of Sections */}
      <div className="space-y-3.5">
        {filteredSections.map((sec) => {
          const isExpanded = expandedSection === sec.id;
          const IconComp = sec.icon;

          return (
            <div 
              key={sec.id}
              className={`rounded-2xl transition-all border ${
                isExpanded 
                  ? 'bg-[#0b2020] border-[#00f2c3]/60 shadow-card-dark' 
                  : 'bg-[#081a1a] border-[#153a3a] hover:border-[#1e4e4e]'
              }`}
            >
              {/* Card Header (Click to expand) */}
              <div 
                onClick={() => setExpandedSection(isExpanded ? null : sec.id)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2.5 rounded-xl border ${
                    isExpanded 
                      ? 'bg-[#00f2c3]/20 border-[#00f2c3] text-[#00f2c3]' 
                      : 'bg-[#061414] border-[#174242] text-[#80a4a2]'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-[#00f2c3]/15 text-[#00f2c3] text-[10px] font-mono font-bold">
                        {sec.number}
                      </span>
                      <h3 className="text-white font-bold text-sm sm:text-base">
                        {sec.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#80a4a2] mt-0.5 line-clamp-1">
                      {sec.simpleExplanation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-[#061414] border border-[#174242] text-[10px] font-mono text-[#00f2c3]">
                    {sec.badge}
                  </span>
                  <div className="p-1 rounded-lg text-[#80a4a2]">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-[#00f2c3]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Card Body (Details & Mechanism) */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-5 space-y-4 border-t border-[#143838] pt-4 animate-fade-in text-xs">
                  
                  {/* Everyday Analogy */}
                  <div className="p-3.5 rounded-xl bg-[#061414] border border-[#174242] flex items-start space-x-2.5">
                    <span className="text-base shrink-0">💡</span>
                    <div>
                      <span className="font-bold text-[#00f2c3] block mb-0.5">Simple Everyday Analogy:</span>
                      <p className="text-[#a1c4c2] leading-relaxed">
                        {sec.analogy}
                      </p>
                    </div>
                  </div>

                  {/* 2-Column Grid: Danger vs Protection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-3.5 rounded-xl bg-[#140a0e] border border-[#f43f5e]/30 space-y-1">
                      <span className="text-[#f43f5e] font-bold block flex items-center space-x-1.5">
                        <span>⚠️</span>
                        <span>Why does this matter? (The Danger):</span>
                      </span>
                      <p className="text-[#e2a8b5] leading-relaxed">
                        {sec.dangerToUser}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#071917] border border-[#00f2c3]/30 space-y-1">
                      <span className="text-[#00f2c3] font-bold block flex items-center space-x-1.5">
                        <span>🛡️</span>
                        <span>How TrustMatrix Protects You:</span>
                      </span>
                      <p className="text-[#a1c4c2] leading-relaxed">
                        {sec.howTrustMatrixProtects}
                      </p>
                    </div>
                  </div>

                  {/* Technical Mechanism (Visible if !simpleModeOnly or expandable) */}
                  {!simpleModeOnly && (
                    <div className="p-3.5 rounded-xl bg-[#030e0e] border border-[#174242] space-y-1.5 font-mono text-[11px]">
                      <span className="text-[#38bdf8] font-bold block flex items-center space-x-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Under the Hood (Technical Mechanism):</span>
                      </span>
                      <p className="text-[#80a4a2] leading-relaxed">
                        {sec.technicalMechanism}
                      </p>
                    </div>
                  )}

                  {/* Interactive "Try It Live" Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#143838]">
                    <div className="text-[11px] font-mono text-[#80a4a2] truncate">
                      <span className="text-[#5c807e]">Example tested: </span>
                      <span className="text-white">{sec.testPrompt}</span>
                    </div>
                    <button
                      onClick={() => handleTestSection(sec)}
                      className="py-1.5 px-3 rounded-xl bg-[#00f2c3] text-[#051715] font-bold hover:bg-[#00f2c3]/90 flex items-center space-x-1.5 transition-all text-xs shadow-neon-sm font-mono"
                    >
                      <span>Try This in Scanner</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}