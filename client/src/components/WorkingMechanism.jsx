import React from 'react';
import { Shield, Lock, Cpu, Globe, Users, KeyRound, Layers, Blocks, Terminal, AlertTriangle, AlertOctagon, CheckCircle2, Info, Scale } from 'lucide-react';

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
    </div>
  );
}
