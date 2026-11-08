import React from 'react';
import { Shield, Lock, Cpu, Globe, Users, KeyRound, Layers, Blocks, Terminal, AlertTriangle, AlertOctagon, CheckCircle2, Info, Scale, Send, ShieldAlert, ArrowRight } from 'lucide-react';

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
            Live TLS socket handshakes, Certificate Transparency (CT) log audits, defensive HTTP security headers (HSTS, CSP), and <strong>Section B PKI vulnerability distinction</strong>.
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

      {/* Section B: Deep-Dive into Website Certificates & Digital Trust Vulnerabilities */}
      <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#00f2c3]/40 shadow-card-dark space-y-5">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3]">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-base">Section B: Website Certificates and Digital Trust Vulnerabilities</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/40 font-bold">
                PKI & CT Audit
              </span>
            </div>
            <p className="text-xs text-[#80a4a2] font-mono">Why HTTPS is not a guarantee of legitimacy: Distinguishing Configuration Flaws from Compromised Trust</p>
          </div>
        </div>

        {/* The Fundamental Premise */}
        <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] text-xs text-[#a1c4c2] leading-relaxed">
          <p>
            <strong className="text-white">The HTTPS Fallacy:</strong> HTTPS is commonly perceived as an indication that a website is trustworthy. However, HTTPS primarily provides an encrypted connection and certificate-based authentication. <em>It does not guarantee that a website is legitimate or free from fraud.</em> Weaknesses in TLS certificates, certificate authorities, cryptographic implementations, and trust chains can introduce significant security risks.
          </p>
        </div>

        {/* The Two-Way Distinction Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Category 1: Ordinary Config Problems */}
          <div className="p-4 rounded-xl bg-[#061414] border border-[#f59e0b]/40 space-y-2">
            <div className="flex items-center space-x-1.5 text-[#f59e0b] font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>1. Ordinary Certificate Configuration Issues</span>
            </div>
            <p className="text-[11px] text-[#80a4a2] leading-relaxed">
              Operational or administrative setup flaws that do not imply malicious root infrastructure compromise:
            </p>
            <ul className="text-[11px] text-[#a1c4c2] space-y-1 list-disc list-inside">
              <li><strong>Expired or Not Yet Valid:</strong> Validity timestamp exceeded or in the future.</li>
              <li><strong>Hostname & Identity Mismatch:</strong> Requested domain does not match certificate SANs or Common Name.</li>
              <li><strong>Untrusted or Self-Signed Roots:</strong> Cert generated locally without trusted third-party root.</li>
              <li><strong>Incorrect Certificate Chain:</strong> Missing intermediate CA bundle causing handshake breaks.</li>
              <li><strong>Weak Cryptography / Key Size:</strong> Inadequate RSA key lengths (&lt; 2048-bit) or obsolete SHA-1/MD5 digests.</li>
            </ul>
          </div>

          {/* Category 2: Compromised Cryptographic Trust */}
          <div className="p-4 rounded-xl bg-[#061414] border border-[#f43f5e]/40 space-y-2">
            <div className="flex items-center space-x-1.5 text-[#f43f5e] font-bold">
              <AlertOctagon className="w-4 h-4 shrink-0" />
              <span>2. Incidents Involving Compromised Trust</span>
            </div>
            <p className="text-[11px] text-[#80a4a2] leading-relaxed">
              Systemic breaches of cryptographic trust requiring root authority revocation or sanctions:
            </p>
            <ul className="text-[11px] text-[#a1c4c2] space-y-1 list-disc list-inside">
              <li><strong>Known Compromised / Distrusted CAs:</strong> Authorities under root program sanctions (eMudhra, DigiNotar, WoSign, StartCom, TrustCor).</li>
              <li><strong>Certificate Transparency (CT) Anomalies:</strong> Missing public Signed Certificate Timestamps (SCTs) in Google Argon / Cloudflare Nimbus.</li>
              <li><strong>Unexpected Certificate Issuance:</strong> Monitoring public CT logs when an unauthorized CA issues a certificate for a high-value protected domain.</li>
              <li><strong>Revoked Certificates & Sub-CAs:</strong> OCSP / CRL revocation for compromised signing keys.</li>
            </ul>
          </div>
        </div>

        {/* The eMudhra Scenario & Scientific Methodology Notice */}
        <div className="p-4 rounded-xl bg-[#0e2727] border border-[#00f2c3]/40 space-y-2 text-xs font-mono">
          <div className="flex items-center space-x-2 text-[#00f2c3] font-bold">
            <Info className="w-4 h-4 shrink-0" />
            <span>Forensic Methodology: Handling eMudhra-like Incidents Truthfully</span>
          </div>
          <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
            In an <strong>eMudhra-like scenario</strong>, the platform is capable of identifying certificates linked to known compromised or distrusted certificate authorities using <strong>trusted security intelligence</strong> and <strong>certificate chain information</strong> (cross-referencing root store disclosures, CRLs, and CA/B Forum audit alerts).
          </p>
          <div className="p-3 rounded-lg bg-[#061414] border border-[#163838] text-[11px] text-[#00f2c3] font-semibold">
            ⚖️ <strong>Engineering Integrity Mandate:</strong> TrustMatrix does NOT claim to independently detect the internal key-generation weakness (HSM/RNG entropy failure) of a Certificate Authority merely from a website URL. Instead, it inspects the public X.509 parameters, verifies public key sizes, checks CT logs, and correlates issuer identifiers against published root-program threat disclosures.
          </div>
        </div>
      </div>

      {/* Section C: Online Scams & Social Engineering Forensics */}
      <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#2dd4bf]/40 shadow-card-dark space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#2dd4bf]/15 border border-[#2dd4bf]/40 text-[#2dd4bf]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-base">Section C: Online Scams and Social Engineering Forensics</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/40 font-bold">
                Human Exploit Defense
              </span>
            </div>
            <p className="text-xs text-[#80a4a2] font-mono">Deceptive messages, fake tech support, OTP harvesting & psychological manipulation</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] text-xs text-[#a1c4c2] leading-relaxed">
          <p>
            <strong className="text-white">Exploiting Human Behavior:</strong> Many fraudulent activities do not require a technically sophisticated website. Attackers often exploit human psychology through deceptive messages and direct communication across SMS, WhatsApp, Telegram, and Email.
          </p>
        </div>

        {/* 9 Explicit Section C Threat Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">1. Fake Job & Internship</span>
            <span className="text-[10px] text-[#80a4a2]">Telegram task fraud, advance registration deposits, and fake HR offers.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">2. Investment & Crypto Scams</span>
            <span className="text-[10px] text-[#80a4a2]">Unrealistic 500% ROI, Ponzi trading bots, and seed phrase harvesting.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">3. Giveaways & Prizes</span>
            <span className="text-[10px] text-[#80a4a2]">Unsolicited KBC/Amazon lotteries demanding upfront tax fees.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">4. Refund & Cashback Scams</span>
            <span className="text-[10px] text-[#80a4a2]">Income tax/electricity refunds tricking victims into entering UPI PINs.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">5. Entity Impersonation</span>
            <span className="text-[10px] text-[#80a4a2]">Mimicking banks (SBI, HDFC), universities (NTA), and government portals.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">6. Fake Customer Support</span>
            <span className="text-[10px] text-[#80a4a2]">Rogue call centers and fake helpline numbers for flight/parcel issues.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">7. OTP & Credential Theft</span>
            <span className="text-[10px] text-[#80a4a2]">Urgent coercion to share 6-digit OTPs, netbanking passwords, or CVVs.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">8. Fraudulent KYC Verification</span>
            <span className="text-[10px] text-[#80a4a2]">Threats of SIM card or YONO deactivation to steal PAN and biometric PII.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">9. Tech Support & Remote Access</span>
            <span className="text-[10px] text-[#80a4a2]">Scareware virus alerts instructing users to install AnyDesk or TeamViewer.</span>
          </div>
        </div>

        {/* The 5 Forensic Detection Pillars */}
        <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] text-xs font-mono space-y-1.5">
          <span className="text-[#2dd4bf] font-bold block">TrustMatrix 5-Pillar Social Engineering Inspector:</span>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-[11px] text-[#a1c4c2]">
            <div><strong>1. Language:</strong> Scans for urgency, fear, and artificial deadlines.</div>
            <div><strong>2. Identity:</strong> Detects unauthorized institutional mimicry.</div>
            <div><strong>3. Payments:</strong> Flags advance fees, personal UPIs, and crypto demands.</div>
            <div><strong>4. Links:</strong> Unpacks bit.ly/tinyurl redirect obfuscations.</div>
            <div><strong>5. Secrets:</strong> Protects OTPs, PINs, and blocks remote access tools.</div>
          </div>
        </div>

        {/* Module 3: AI-Powered Scam and Message Analysis & Crucial Boundary Rule */}
        <div className="p-4 rounded-xl bg-[#0e2727] border border-[#00f2c3]/40 space-y-3 text-xs font-mono">
          <div className="flex items-center space-x-2 text-[#00f2c3] font-bold">
            <Scale className="w-4 h-4 shrink-0" />
            <span>Module 3: AI-Powered Scam and Message Analysis & The Crucial AI Boundary Rule</span>
          </div>

          <p className="text-[#a1c4c2] text-[11px] leading-relaxed">
            Module 3 ingests suspicious messages, emails, and notifications, extracting indicators (URLs, emails, helplines, payment handles) and correlating them against threat intelligence.
          </p>

          <div className="p-3.5 rounded-lg bg-[#061414] border border-[#f59e0b]/40 text-[11px] space-y-2">
            <div className="flex items-center space-x-2 text-[#f59e0b] font-bold uppercase tracking-wider text-[10px]">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Crucial AI Boundary Rule</span>
            </div>
            <p className="text-white italic">
              "The AI should distinguish between suspicious language and verified evidence of fraud. A message should not be labelled fraudulent solely because it contains urgent or persuasive language."
            </p>
            <p className="text-[#a1c4c2] leading-relaxed">
              Legitimate notifications (e.g. flight boarding gate calls, authentic Google security alerts, or electricity outage warnings) frequently use urgent or deadline-oriented words. TrustMatrix requires verified technical evidence of fraud (malicious URLs, credential harvesting, AnyDesk remote control, or rogue payment demands) before assigning a fraudulent classification.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Additional Operational Deep-Dives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Module 1: AI Heuristics */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">1. AI Threat & Content Investigation</h3>
              <p className="text-[11px] text-[#80a4a2] font-mono">Levenshtein distance, Punycode homoglyphs, and form scraping</p>
            </div>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="font-bold text-[#00f2c3] block mb-0.5">Brand Typosquatting</span>
              <p className="text-[#80a4a2] text-[11px]">Computes edit distance against 150+ brands and flags Cyrillic/Greek deceptive homoglyphs.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="font-bold text-[#00f2c3] block mb-0.5">Credential Form Harvesting</span>
              <p className="text-[#80a4a2] text-[11px]">Detects password, OTP, CVV, and PAN form fields communicating with external drop hosts.</p>
            </div>
          </div>
        </div>

        {/* Module 2: Web3 Security & On-Chain Ledger */}
        <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#2dd4bf]/15 border border-[#2dd4bf]/30 text-[#2dd4bf]">
              <Blocks className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">2. Web3 Threat Vectors & Decentralized Ledger</h3>
              <p className="text-[11px] text-[#80a4a2] font-mono">Permit2 drainer detection and smart contract attestations</p>
            </div>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="font-bold text-[#2dd4bf] block mb-0.5">Wallet Drainer Signatures</span>
              <p className="text-[#80a4a2] text-[11px]">Flags deceptive <code>setApprovalForAll</code> and <code>Permit2</code> signatures draining tokens.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="font-bold text-[#2dd4bf] block mb-0.5">Immutable EAS Smart Contract</span>
              <p className="text-[#80a4a2] text-[11px]">Attestations anchored on Ethereum Sepolia / Polygon POS (<code>TrustMatrixRegistry.sol</code>).</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module 4: Intelligent Threat Correlation Architecture */}
      <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#00f2c3]/40 shadow-card-dark space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3]">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-base">Module 4: Intelligent Threat Correlation</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/40 font-bold">
                Campaign Clustering
              </span>
            </div>
            <p className="text-xs text-[#80a4a2] font-mono">Connecting disparate links and messages across shared adversary infrastructure</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] text-xs text-[#a1c4c2] leading-relaxed space-y-2 font-mono">
          <p>
            <strong className="text-white">Beyond Isolated Incidents:</strong> Individual suspicious links or messages are rarely isolated events; they are frequently facets of organized industrial fraud campaigns. TrustMatrix correlates related indicators across all submitted reports.
          </p>
          <div className="p-3 rounded-lg bg-[#0e2727] border border-[#00f2c3]/30 text-[11px] text-[#00f2c3]">
            ⚖️ <strong>Engineering Mandate:</strong> <em>"AI can assist in summarising these relationships, while deterministic matching and supporting evidence should establish the actual connections."</em>
          </div>
        </div>

        {/* The 5 Module 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">1. Repeated Infrastructure</span>
            <span className="text-[10px] text-[#80a4a2]">Matches shared BGP Autonomous System Numbers (Choopa AS20473), server IPv4/v6 hosts, and nameservers.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">2. Message Similarity</span>
            <span className="text-[10px] text-[#80a4a2]">Deterministic Jaccard n-gram matching detects identical phishing templates across independent reports.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">3. Recurring Impersonation</span>
            <span className="text-[10px] text-[#80a4a2]">Tracks recurring brand targeting patterns across banking (SBI), exams (NTA), and transport (Parivahan).</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">4. Indicator Cross-Referencing</span>
            <span className="text-[10px] text-[#80a4a2]">Cross-checks previously reported URLs, SHA-256 proofs, and shortlink redirect endpoints in community stores.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">5. Connected Incident Graph</span>
            <span className="text-[10px] text-[#80a4a2]">Builds verified graph topologies connecting Target Domain &rarr; Host IP &rarr; ASN &rarr; Campaign &rarr; Money Mule UPI.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
            <span className="text-[#00f2c3] font-bold block mb-0.5">6. AI Executive Synthesis</span>
            <span className="text-[10px] text-[#80a4a2]">AI synthesizes complex multi-hop telemetry into actionable executive summaries for security teams.</span>
          </div>
        </div>
      </div>

      {/* Module 5: Website Security Assessment Architecture */}
      <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#2dd4bf]/40 shadow-card-dark space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#2dd4bf]/15 border border-[#2dd4bf]/40 text-[#2dd4bf]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-base">Module 5: Website Security Assessment</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/40 font-bold">
                Non-Exploitative Auditing
              </span>
            </div>
            <p className="text-xs text-[#80a4a2] font-mono">Passive inspection of publicly available security information and configuration weaknesses</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] text-xs text-[#a1c4c2] leading-relaxed space-y-2 font-mono">
          <p>
            <strong className="text-white">Publicly Accessible Security Assessment:</strong> The platform inspects publicly available configuration metadata (HTTP response headers, DNS records, cookie attributes, and TLS handshakes) to identify defensive posture gaps without attempting active exploitation.
          </p>
          <div className="p-3 rounded-lg bg-[#0e2727] border border-[#2dd4bf]/30 text-[11px] text-[#2dd4bf]">
            ⚖️ <strong>Ethical Scope & Authorization Mandate:</strong> <em>"The platform should inspect publicly available security information and report configuration weaknesses without attempting exploitation. Any active testing must be restricted to explicitly authorised targets."</em>
          </div>
        </div>

        {/* 6 Standardized Deliverables for Each Finding */}
        <div className="space-y-2 text-xs font-mono">
          <span className="text-white font-bold block">Standardized 6-Element Finding Architecture:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">1. Identified Security Issue</span>
              <span className="text-[10px] text-[#80a4a2]">Precise vulnerability classification (e.g. Missing HSTS, Permissive CSP, Leaked Server Banner).</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">2. Technical Evidence</span>
              <span className="text-[10px] text-[#80a4a2]">Exact raw headers, cookie attributes, or DNS TXT values extracted during passive inspection.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">3. Potential Attack Impact</span>
              <span className="text-[10px] text-[#80a4a2]">Real-world threat consequences (e.g. Man-in-the-Middle SSL-stripping, XSS injection, Clickjacking).</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">4. Severity Classification</span>
              <span className="text-[10px] text-[#80a4a2]">NIST/OWASP-aligned severity tiers: CRITICAL, HIGH, MEDIUM, LOW, or INFORMATIONAL.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">5. Recommended Remediation</span>
              <span className="text-[10px] text-[#80a4a2]">Production-ready configuration directives for Nginx, Apache, Express, and Cloudflare.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">6. Scope Limitations</span>
              <span className="text-[10px] text-[#80a4a2]">Explicit acknowledgment of passive boundary constraints and non-exploitative guarantees.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module 6: Decentralized Threat Intelligence Architecture */}
      <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#00f2c3]/40 shadow-card-dark space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3]">
            <Blocks className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-base">Module 6: Decentralized Threat Intelligence</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/40 font-bold">
                Web3 Provenance & Ledger
              </span>
            </div>
            <p className="text-xs text-[#80a4a2] font-mono">Transparent, tamper-evident sharing, independent integrity checking, and dispute tracking</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] text-xs text-[#a1c4c2] leading-relaxed space-y-2 font-mono">
          <p>
            <strong className="text-white">Tamper-Evident Security Intelligence:</strong> Web3 provides an immutable, transparent mechanism for sharing and independently verifying threat intelligence across distributed organizations and security researchers without single points of censorship or failure.
          </p>
        </div>

        {/* The Two Mandatory Module 6 Boundaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#0e2727] border border-[#00f2c3]/40 space-y-1.5">
            <div className="flex items-center space-x-2 text-[#00f2c3] font-bold text-[11px]">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Off-Chain Privacy Boundary Rule</span>
            </div>
            <p className="text-white italic text-[11px]">
              "Raw URLs, personal information, email content, passwords, and sensitive user data must remain off-chain."
            </p>
            <p className="text-[#a1c4c2] text-[10px] leading-relaxed">
              Full URLs with sensitive tokens, private credentials, and PII are never pushed to public ledgers. Only cryptographic commitments (SHA-256 hashes), sanitized domains, and IPFS evidence CIDs are recorded on-chain.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e2727] border border-[#f59e0b]/40 space-y-1.5">
            <div className="flex items-center space-x-2 text-[#f59e0b] font-bold text-[11px]">
              <Scale className="w-4 h-4 shrink-0" />
              <span>Epistemological Integrity Axiom</span>
            </div>
            <p className="text-white italic text-[11px]">
              "A blockchain record establishes the integrity and history of a report, not the truth of the report itself."
            </p>
            <p className="text-[#a1c4c2] text-[10px] leading-relaxed">
              The on-chain ledger proves that a specific report existed at a specific block height without alteration. Truthfulness and validation status are derived through multi-source consensus, community review, and dispute resolution.
            </p>
          </div>
        </div>

        {/* 5 User Submission Components */}
        <div className="space-y-2 text-xs font-mono">
          <span className="text-white font-bold block">1. User Threat Report Components:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">Suspicious URL / Domain</span>
              <span className="text-[10px] text-[#80a4a2]">Sanitized domain indicator (e.g. sbi-yono-kyc.top) protected from leaking query secrets.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">Reported Campaign</span>
              <span className="text-[10px] text-[#80a4a2]">Attributed fraud syndicate or modus operandi (e.g. YONO Phishing Kit V4).</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">Incident Summary</span>
              <span className="text-[10px] text-[#80a4a2]">Observed attack mechanics, form harvesting, money mule handles, or malware drop.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">Cryptographic Fingerprint</span>
              <span className="text-[10px] text-[#80a4a2]">SHA-256 report commitment hash guaranteeing evidence cannot be silently modified.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">Supporting Evidence</span>
              <span className="text-[10px] text-[#80a4a2]">External citations: URLhaus ID, CT Log SCT proofs, VirusTotal hashes, or IPFS CIDs.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">Attestation Signature</span>
              <span className="text-[10px] text-[#80a4a2]">Analyst wallet public key signing the record for transparent provenance.</span>
            </div>
          </div>
        </div>

        {/* 5 Blockchain Integration Capabilities */}
        <div className="space-y-2 text-xs font-mono">
          <span className="text-white font-bold block">2. Smart Contract Capabilities (TrustMatrixRegistry.sol):</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#2dd4bf] font-bold block mb-0.5">1. Cryptographic Commitments</span>
              <span className="text-[10px] text-[#80a4a2]">Stores keccak256/SHA-256 report commitments directly in smart contract state.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#2dd4bf] font-bold block mb-0.5">2. Verifiable Reporting History</span>
              <span className="text-[10px] text-[#80a4a2]">Maintains an append-only timeline of initial registrations, revisions, and status updates.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#2dd4bf] font-bold block mb-0.5">3. Independent Integrity Check</span>
              <span className="text-[10px] text-[#80a4a2]">Any client can re-hash local report data and verify exact equality against the on-chain hash.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#2dd4bf] font-bold block mb-0.5">4. Revisions & Dispute Tracking</span>
              <span className="text-[10px] text-[#80a4a2]">Enables authorized updates and transparent dispute logging without erasing prior provenance.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#2dd4bf] font-bold block mb-0.5">5. Transparent Provenance</span>
              <span className="text-[10px] text-[#80a4a2]">Cryptographically links reports to submitter addresses, block heights, and transaction hashes.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#2dd4bf] font-bold block mb-0.5">6. Validation Status Lifecycle</span>
              <span className="text-[10px] text-[#80a4a2]">Tracks lifecycle: PENDING_REVIEW &rarr; VERIFIED_MULTI_SOURCE &rarr; DISPUTED &rarr; RESOLVED.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Expected User Experience (5-Step Simple Workflow Anyone Can Understand) */}
      <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#00f2c3]/40 shadow-card-dark space-y-5">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-base">Section 5: Expected User Experience</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/40 font-bold">
                5-Step Intuitive Workflow
              </span>
            </div>
            <p className="text-xs text-[#80a4a2] font-mono">A simple, transparent end-to-end journey designed for everyday citizens and security teams</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] text-xs text-[#a1c4c2] leading-relaxed font-mono">
          <p>
            The platform provides a simple workflow that anyone can understand. It transforms complex technical indicators across DNS, TLS, AI NLP models, and Web3 smart contracts into intuitive, actionable decision guidance.
          </p>
        </div>

        {/* 5-Step Detailed Visual Progression */}
        <div className="space-y-3 font-mono text-xs">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-[#061414] border border-[#174242] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-[#00f2c3]/40 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-bold text-white text-sm flex items-center space-x-2">
                  <span>Step 1: Submit</span>
                  <span className="text-[10px] text-[#00f2c3] font-normal px-1.5 py-0.5 rounded bg-[#00f2c3]/10">Input Ingestion</span>
                </h4>
                <p className="text-xs text-[#a1c4c2] mt-1 leading-relaxed">
                  A user pastes a suspicious link, submits a domain, or provides a suspicious email or message (SMS, WhatsApp, Telegram).
                </p>
              </div>
            </div>
            <span className="text-[11px] text-[#5c8280] bg-[#0b2020] px-3 py-1 rounded-lg border border-[#174242] shrink-0">
              URL • Domain • Email Body • SMS
            </span>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-[#061414] border border-[#174242] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-[#00f2c3]/40 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-bold text-white text-sm flex items-center space-x-2">
                  <span>Step 2: Investigate</span>
                  <span className="text-[10px] text-[#00f2c3] font-normal px-1.5 py-0.5 rounded bg-[#00f2c3]/10">Automated Probing</span>
                </h4>
                <p className="text-xs text-[#a1c4c2] mt-1 leading-relaxed">
                  The platform collects available domain information, certificate details, threat intelligence, and relevant technical indicators without active exploitation.
                </p>
              </div>
            </div>
            <span className="text-[11px] text-[#5c8280] bg-[#0b2020] px-3 py-1 rounded-lg border border-[#174242] shrink-0">
              DNS A/AAAA • X.509 TLS • CT Logs • URLhaus
            </span>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-[#061414] border border-[#174242] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-[#00f2c3]/40 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-bold text-white text-sm flex items-center space-x-2">
                  <span>Step 3: Analyse</span>
                  <span className="text-[10px] text-[#00f2c3] font-normal px-1.5 py-0.5 rounded bg-[#00f2c3]/10">Cyber + AI Core</span>
                </h4>
                <p className="text-xs text-[#a1c4c2] mt-1 leading-relaxed">
                  Cybersecurity checks identify suspicious patterns (homoglyphs, weak keys, drainers), while AI correlates the findings and generates an understandable explanation.
                </p>
              </div>
            </div>
            <span className="text-[11px] text-[#5c8280] bg-[#0b2020] px-3 py-1 rounded-lg border border-[#174242] shrink-0">
              Levenshtein • Jaccard Similarity • NLP Synthesis
            </span>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-[#061414] border border-[#174242] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-[#00f2c3]/40 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h4 className="font-bold text-white text-sm flex items-center space-x-2">
                  <span>Step 4: Assess Risk</span>
                  <span className="text-[10px] text-[#00f2c3] font-normal px-1.5 py-0.5 rounded bg-[#00f2c3]/10">Actionable Report</span>
                </h4>
                <p className="text-xs text-[#a1c4c2] mt-1 leading-relaxed">
                  The platform provides a structured report describing the identified threats, their supporting evidence, and recommended precautions (safe pre-click advisories, helpline 1930).
                </p>
              </div>
            </div>
            <span className="text-[11px] text-[#5c8280] bg-[#0b2020] px-3 py-1 rounded-lg border border-[#174242] shrink-0">
              Trust Score 0-100 • Findings Dossier • Precautions
            </span>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-xl bg-[#061414] border border-[#00f2c3]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-[#00f2c3] transition-colors shadow-neon-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#00f2c3] text-[#041513] flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                5
              </div>
              <div>
                <h4 className="font-bold text-white text-sm flex items-center space-x-2">
                  <span>Step 5: Report and Verify</span>
                  <span className="text-[10px] text-[#00f2c3] font-bold px-1.5 py-0.5 rounded bg-[#00f2c3]/15">Web3 Provenance</span>
                </h4>
                <p className="text-xs text-[#a1c4c2] mt-1 leading-relaxed">
                  Users can submit relevant incidents to the threat intelligence repository, where cryptographic commitments are recorded on-chain for independent verification.
                </p>
              </div>
            </div>
            <span className="text-[11px] text-[#00f2c3] bg-[#00f2c3]/10 px-3 py-1 rounded-lg border border-[#00f2c3]/30 font-bold shrink-0">
              SHA-256 Commit • Solidity Ledger • IPFS CID
            </span>
          </div>
        </div>
      </div>

      {/* Section 6: Risk Classification Architecture */}
      <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#00f2c3]/40 shadow-card-dark space-y-5">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3]">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-base">Section 6: Consistent Risk Classification Mechanism</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/40 font-bold">
                5-Tier Standard
              </span>
            </div>
            <p className="text-xs text-[#80a4a2] font-mono">Standardized 5-tier classification & 8-deliverable assessment dossier</p>
          </div>
        </div>

        {/* The 5 Standard Classification Tiers Table */}
        <div className="space-y-2 font-mono text-xs">
          <span className="text-white font-bold block">1. The 5 Consistent Classification Tiers:</span>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
            <div className="p-3 rounded-xl bg-[#061414] border border-[#00f2c3]/40 space-y-1">
              <span className="text-[#00f2c3] font-bold block text-[11px]">Low Risk</span>
              <p className="text-[10px] text-[#a1c4c2] leading-tight">
                No significant malicious indicators identified within the available checks.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#061414] border border-[#eab308]/40 space-y-1">
              <span className="text-[#eab308] font-bold block text-[11px]">Suspicious</span>
              <p className="text-[10px] text-[#a1c4c2] leading-tight">
                One or more indicators require further investigation.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#061414] border border-[#f59e0b]/40 space-y-1">
              <span className="text-[#f59e0b] font-bold block text-[11px]">High Risk</span>
              <p className="text-[10px] text-[#a1c4c2] leading-tight">
                Multiple significant indicators suggest a substantial security threat.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#061414] border border-[#f43f5e]/40 space-y-1">
              <span className="text-[#f43f5e] font-bold block text-[11px]">Confirmed Malicious</span>
              <p className="text-[10px] text-[#a1c4c2] leading-tight">
                Supported by authoritative threat intelligence or sufficiently validated evidence.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#061414] border border-[#5c8280]/40 space-y-1">
              <span className="text-[#80a4a2] font-bold block text-[11px]">Inconclusive</span>
              <p className="text-[10px] text-[#80a4a2] leading-tight">
                Insufficient data or unavailable verification sources.
              </p>
            </div>
          </div>
        </div>

        {/* The 8 Mandated Deliverables in Each Assessment */}
        <div className="space-y-2 font-mono text-xs">
          <span className="text-white font-bold block">2. The 8 Mandated Deliverables in Every Assessment:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">1. Overall Risk Classification</span>
              <span className="text-[10px] text-[#80a4a2]">One of the 5 standardized tiers with descriptive rationale.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">2. Threat Indicators</span>
              <span className="text-[10px] text-[#80a4a2]">Concrete signals across DNS, TLS, content, and headers.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">3. Supporting Evidence</span>
              <span className="text-[10px] text-[#80a4a2]">Technical proof, key sizes, entropy, and form input names.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">4. Source of Findings</span>
              <span className="text-[10px] text-[#80a4a2]">Exact origin (DNS Resolver, CT Log, URLhaus, DOM Scraper).</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">5. Analysis Timestamp</span>
              <span className="text-[10px] text-[#80a4a2]">Precise ISO 8601 execution timestamp.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">6. Evidence Coverage</span>
              <span className="text-[10px] text-[#80a4a2]">Confidence rating across active inspection layers.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">7. Recommended Actions</span>
              <span className="text-[10px] text-[#80a4a2]">Step-by-step precautions and emergency helpline 1930.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a]">
              <span className="text-[#00f2c3] font-bold block mb-0.5">8. Scope Limitations</span>
              <span className="text-[10px] text-[#80a4a2]">Passive boundary, unaccessible server code, WHOIS privacy.</span>
            </div>
          </div>
        </div>

        {/* The Fundamental Axiom */}
        <div className="p-4 rounded-xl bg-[#0e2727] border border-[#f59e0b]/40 space-y-2 text-xs font-mono">
          <div className="flex items-center space-x-2 text-[#f59e0b] font-bold">
            <Scale className="w-4 h-4 shrink-0" />
            <span>Essential Section 6 Security Axiom</span>
          </div>
          <p className="text-white italic text-[11px] leading-relaxed">
            "The system must not treat the absence of known threats as proof that a website is safe."
          </p>
          <p className="text-[#a1c4c2] text-[10.5px] leading-relaxed">
            Absence of evidence is not evidence of absence. Zero-day phishing links, newly registered adversary domains, and unlisted subdomains may exhibit zero historical threat reports while harboring malicious intent. TrustMatrix guarantees evidence-based risk grading and cautious link advisories rather than declaring unconditional safety.
          </p>
        </div>
      </div>

      {/* Section 8: Suggested Technology Stack Alignment Card */}
      <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#00f2c3]/40 shadow-card-dark space-y-5">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-base">Section 8: Technology Stack Alignment</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/40 font-bold">
                9 Enterprise Domains
              </span>
            </div>
            <p className="text-xs text-[#80a4a2] font-mono">Comprehensive implementation across AI, Cyber, Web3, Databases & Infrastructure</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
            <span className="text-[#00f2c3] font-bold block text-[11px]">1. AI & Machine Learning</span>
            <span className="text-[10px] text-[#5c8280] block">LLMs • NLP • RAG • Anomaly Detection</span>
            <p className="text-[10px] text-[#a1c4c2] leading-relaxed">
              Gemini LLM integration, Levenshtein distance, Shannon entropy scoring, and vector RAG over MITRE ATT&CK techniques.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
            <span className="text-[#00f2c3] font-bold block text-[11px]">2. URL Intelligence</span>
            <span className="text-[10px] text-[#5c8280] block">Safe Browsing • URLhaus • PhishTank • VirusTotal</span>
            <p className="text-[10px] text-[#a1c4c2] leading-relaxed">
              Consensus engine cross-referencing Google Safe Browsing v4, URLhaus, PhishTank, OpenPhish, and VirusTotal 72-engine scans.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
            <span className="text-[#00f2c3] font-bold block text-[11px]">3. Web Security</span>
            <span className="text-[10px] text-[#5c8280] block">Python SSL • OpenSSL • DNS • HTTP Headers</span>
            <p className="text-[10px] text-[#a1c4c2] leading-relaxed">
              Live DNS A/AAAA resolver, Python OpenSSL companion script, and passive HTTP header auditing (HSTS, CSP, X-Frame-Options).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
            <span className="text-[#2dd4bf] font-bold block text-[11px]">4. Certificate Intelligence</span>
            <span className="text-[10px] text-[#5c8280] block">CT Logs • crt.sh • Public CA Trust</span>
            <p className="text-[10px] text-[#a1c4c2] leading-relaxed">
              Raw X.509 socket parsing, crt.sh monitor, Signed Certificate Timestamp (SCT) audits, and eMudhra duplicate key modulus detection.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
            <span className="text-[#2dd4bf] font-bold block text-[11px]">5. Blockchain Ledger</span>
            <span className="text-[10px] text-[#5c8280] block">Solidity • EVM Networks • Smart Contracts</span>
            <p className="text-[10px] text-[#a1c4c2] leading-relaxed">
              <code>TrustMatrixRegistry.sol</code> on Ethereum Sepolia / Polygon EVM, SHA-256 report commitments, and dispute tracking.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
            <span className="text-[#2dd4bf] font-bold block text-[11px]">6. Backend & APIs</span>
            <span className="text-[10px] text-[#5c8280] block">Node.js • Express • Python Microservices</span>
            <p className="text-[10px] text-[#a1c4c2] leading-relaxed">
              Modular REST API backend with live socket inspection, async promise pipelines, and Python cryptographic utilities.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
            <span className="text-[#10b981] font-bold block text-[11px]">7. Frontend Architecture</span>
            <span className="text-[10px] text-[#5c8280] block">React • Vite • Tailwind • Canvas Rain</span>
            <p className="text-[10px] text-[#a1c4c2] leading-relaxed">
              Responsive Sentinel Nexus dark emerald theme with real-time multi-modal scanner and interactive threat graph visualization.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
            <span className="text-[#10b981] font-bold block text-[11px]">8. Database Persistence</span>
            <span className="text-[10px] text-[#5c8280] block">PostgreSQL • MongoDB • Redis</span>
            <p className="text-[10px] text-[#a1c4c2] leading-relaxed">
              PostgreSQL relational schema (<code>schema.sql</code>), MongoDB STIX 2.1 schemas (<code>mongoSchema.js</code>), and Redis cache.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
            <span className="text-[#10b981] font-bold block text-[11px]">9. Infrastructure & Cloud</span>
            <span className="text-[10px] text-[#5c8280] block">Docker • Multi-Stage Build • Compose</span>
            <p className="text-[10px] text-[#a1c4c2] leading-relaxed">
              Multi-stage production <code>Dockerfile</code> and <code>docker-compose.yml</code> orchestrating App, Redis, and PostgreSQL containers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
