import React from 'react';
import { Shield, Lock, Cpu, Globe, Users, KeyRound, Layers } from 'lucide-react';

export default function WorkingMechanism() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3] text-xs font-mono font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Architecture & Core Logic</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          How TrustMatrix AI Works
        </h2>
        <p className="text-[#80a4a2] text-sm max-w-2xl mx-auto leading-relaxed">
          Traditional security tools rely purely on reactive blacklists. TrustMatrix AI runs an <strong>active multi-layer forensic inspection</strong> on every website across AI content, cryptographic certificates, server headers, and verified community intelligence.
        </p>
      </div>

      {/* 4-Step Pipeline Visual Flow in Deep Emerald Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#0b2020] border border-[#174242] text-center space-y-2 relative shadow-card-dark">
          <div className="w-10 h-10 rounded-xl bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3] flex items-center justify-center mx-auto">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#00f2c3] block uppercase">Layer 1 (35%)</span>
          <h4 className="font-bold text-white text-sm">AI Phishing Scan</h4>
          <p className="text-xs text-[#80a4a2] leading-snug">
            Checks domain lookalikes, homoglyphs & credential harvesting forms.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0b2020] border border-[#00f2c3]/40 text-center space-y-2 relative shadow-card-dark">
          <div className="w-10 h-10 rounded-xl bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3] flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#00f2c3] block uppercase">Layer 2 (30%)</span>
          <h4 className="font-bold text-white text-sm">PKI & CA Trust</h4>
          <p className="text-xs text-[#80a4a2] leading-snug">
            Inspects SSL keys, CA trust chains & eMudhra-style weak keys.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0b2020] border border-[#174242] text-center space-y-2 relative shadow-card-dark">
          <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] flex items-center justify-center mx-auto">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#10b981] block uppercase">Layer 3 (15%)</span>
          <h4 className="font-bold text-white text-sm">Web AppSec</h4>
          <p className="text-xs text-[#80a4a2] leading-snug">
            Verifies security headers (HSTS, CSP) and cookie safety.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0b2020] border border-[#174242] text-center space-y-2 relative shadow-card-dark">
          <div className="w-10 h-10 rounded-xl bg-[#2dd4bf]/15 border border-[#2dd4bf]/30 text-[#2dd4bf] flex items-center justify-center mx-auto">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#2dd4bf] block uppercase">Layer 4 (20%)</span>
          <h4 className="font-bold text-white text-sm">Collab Intel</h4>
          <p className="text-xs text-[#80a4a2] leading-snug">
            Multi-source consensus (PhishTank/URLhaus) & active probes.
          </p>
        </div>
      </div>

      {/* Trust Score Formula Explanation */}
      <div className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#00f2c3]" />
            <span>The Unified Digital Trust Formula (0 to 100)</span>
          </h3>
          <p className="text-xs text-[#80a4a2] mt-1">
            Every layer contributes a weighted score, calibrated with NIST SP 800-30 Rev 1 and protected with Non-Linear Veto Overrides.
          </p>
        </div>
        <div className="px-4 py-2.5 rounded-xl bg-[#061414] border border-[#174242] font-mono text-xs text-[#00f2c3] font-semibold whitespace-nowrap shadow-neon-sm">
          Score = (35% × AI) + (30% × PKI) + (20% × Intel) + (15% × AppSec)
        </div>
      </div>

      {/* Deep-Dive Sections */}
      <div className="space-y-4">
        {/* Module 1: AI Phishing Detection */}
        <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                1. AI Phishing & Brand Impersonation Engine
              </h3>
              <p className="text-xs text-[#80a4a2] font-mono">
                Detecting visual & structural deception before users enter credentials
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
              <span className="font-bold text-[#00f2c3] block">🔡 Typosquatting & Levenshtein</span>
              <p className="text-[#80a4a2] leading-relaxed">
                Calculates edit distance against 150+ official banks, tech firms, and government portals (e.g. catches <code>onlinesbi.sbi-verify.xyz</code> mimicking <code>onlinesbi.sbi</code>).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
              <span className="font-bold text-[#00f2c3] block">🔤 Homoglyph & Punycode (IDN)</span>
              <p className="text-[#80a4a2] leading-relaxed">
                Identifies deceptive unicode characters that look identical to human eyes (like Cyrillic 'а' or zero-width spaces in <code>xn--gogle-pqa.com</code>).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5">
              <span className="font-bold text-[#00f2c3] block">📋 Form Credential Harvesting</span>
              <p className="text-[#80a4a2] leading-relaxed">
                Inspects DOM inputs for password fields, CVVs, Aadhaar/SSN, or OTP tokens submitting to unauthorized third-party destinations.
              </p>
            </div>
          </div>
        </div>

        {/* Module 2: The eMudhra TLS Incident & PKI Validation */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0e2c2c] via-[#091f1f] to-[#071717] border border-[#00f2c3]/40 shadow-card-dark space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3]">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-base">
                  2. Digital Trust, PKI & The eMudhra Incident
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 font-bold">
                  Critical Incident Case Study
                </span>
              </div>
              <p className="text-xs text-[#80a4a2] font-mono">
                Why HTTPS green padlocks can lie: Key entropy, rogue CAs, and Certificate Transparency
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] space-y-2 text-xs leading-relaxed text-[#a1c4c2]">
            <p>
              <strong className="text-[#f59e0b]">The Problem (What happened in the eMudhra Incident):</strong> Digital certificates verify website identity. However, audits revealed that flawed key generation entropy in Certificate Authorities allowed <em>duplicate cryptographic keys and weak 1024-bit RSA moduli</em> to be created. This means an attacker could obtain or calculate a private key that impersonates a legitimate organization without triggering browser warnings.
            </p>
            <p>
              <strong className="text-[#00f2c3]">How TrustMatrix Solves This:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[#80a4a2]">
              <li><strong className="text-white">Key Entropy & Modulus Verification:</strong> Tests RSA key lengths (&ge; 2048-bit required) and flags duplicate public key moduli.</li>
              <li><strong className="text-white">Certificate Transparency (CT) Audits:</strong> Checks if Signed Certificate Timestamps (SCTs) were published to public logs (Google Argon / Cloudflare Nimbus). Rogue certificates issued covertly lack these proofs.</li>
              <li><strong className="text-white">CA Authority Reputation:</strong> Flags certificates issued by CAs with known compliance failures or audit sanctions (eMudhra, WoSign, StartCom).</li>
            </ul>
          </div>
        </div>

        {/* Module 3: Web Application Security Posture */}
        <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                3. Application Security Posture (AppSec)
              </h3>
              <p className="text-xs text-[#80a4a2] font-mono">
                Auditing defensive HTTP headers, session security, and data leakage
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
              <span className="font-bold text-[#10b981] block">🛡️ Defensive Security Headers</span>
              <p className="text-[#80a4a2] leading-relaxed">
                Checks <strong>HSTS</strong> (prevents SSL-stripping downgrades), <strong>CSP</strong> (blocks malicious injected scripts), and <strong>X-Frame-Options</strong> (blocks hidden iframe Clickjacking attacks).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
              <span className="font-bold text-[#10b981] block">🍪 Cookie & Server Leakage Auditing</span>
              <p className="text-[#80a4a2] leading-relaxed">
                Verifies that session cookies carry <code>HttpOnly</code> and <code>Secure</code> flags, and verifies that server banners (e.g. vulnerable Apache/Nginx version disclosures) are suppressed.
              </p>
            </div>
          </div>
        </div>

        {/* Module 4: Collaborative Threat Intelligence */}
        <div className="p-6 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#2dd4bf]/15 border border-[#2dd4bf]/30 text-[#2dd4bf]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                4. Collaborative Threat Intelligence & STIX 2.1
              </h3>
              <p className="text-xs text-[#80a4a2] font-mono">
                Crowdsourced consensus, infrastructure clustering & standard threat sharing
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
              <span className="font-bold text-[#2dd4bf] block">🕸️ Threat Infrastructure Clustering</span>
              <p className="text-[#80a4a2] leading-relaxed">
                Correlates target domains against shared IP ranges, bulletproof hosters (ASNs), and known phishing toolkits (e.g. linked banking phish clusters).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
              <span className="font-bold text-[#2dd4bf] block">📜 OASIS STIX 2.1 Compatibility</span>
              <p className="text-[#80a4a2] leading-relaxed">
                Every verified IOC and report can be exported in standardized STIX 2.1 JSON, allowing security teams to import threat feeds straight into their SIEM or firewall.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
