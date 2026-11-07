import React, { useState } from 'react';
import { Shield, Lock, Cpu, Globe, Users, AlertTriangle, KeyRound, CheckCircle, ArrowRight, Layers, FileCheck, HelpCircle } from 'lucide-react';

export default function WorkingMechanism() {
  const [activeStep, setActiveStep] = useState('all');

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Title & Introduction */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Under the Hood</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          How TrustMatrix AI Works
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Traditional security tools check blacklists. TrustMatrix AI runs a <strong>multi-layer forensic inspection</strong> on every website across AI content, cryptographic certificates, server headers, and community intelligence.
        </p>
      </div>

      {/* 4-Step Pipeline Visual Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2 relative">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono font-bold text-cyan-400 block uppercase">Layer 1 (35%)</span>
          <h4 className="font-bold text-slate-100 text-sm">AI Phishing Scan</h4>
          <p className="text-xs text-slate-400 leading-snug">
            Checks domain lookalikes, homoglyphs & credential forms.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/30 text-center space-y-2 relative">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono font-bold text-indigo-400 block uppercase">Layer 2 (30%)</span>
          <h4 className="font-bold text-slate-100 text-sm">PKI & CA Trust</h4>
          <p className="text-xs text-slate-400 leading-snug">
            Inspects SSL keys, CA trust chain & eMudhra-style weak keys.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2 relative">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 block uppercase">Layer 3 (15%)</span>
          <h4 className="font-bold text-slate-100 text-sm">Web AppSec</h4>
          <p className="text-xs text-slate-400 leading-snug">
            Verifies security headers (HSTS, CSP) and cookie safety.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2 relative">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono font-bold text-purple-400 block uppercase">Layer 4 (20%)</span>
          <h4 className="font-bold text-slate-100 text-sm">Collab Intel</h4>
          <p className="text-xs text-slate-400 leading-snug">
            Community consensus votes & shared infrastructure clusters.
          </p>
        </div>
      </div>

      {/* Trust Score Formula Explanation */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>The Unified Digital Trust Formula (0 to 100)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Every layer contributes a weighted score. A score below 50 indicates high risk; below 25 triggers a critical threat block.
          </p>
        </div>
        <div className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 font-semibold whitespace-nowrap">
          Score = (35% × AI) + (30% × PKI) + (20% × Intel) + (15% × AppSec)
        </div>
      </div>

      {/* Deep-Dive Accordion / Sections */}
      <div className="space-y-4">
        {/* Module 1: AI Phishing Detection */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                1. AI Phishing & Brand Impersonation Engine
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Detecting visual & structural deception before users enter credentials
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <span className="font-bold text-cyan-300 block">🔡 Typosquatting & Levenshtein</span>
              <p className="text-slate-400 leading-relaxed">
                Calculates edit distance against 150+ official banks, tech firms, and government portals (e.g. catches <code>onlinesbi.sbi-verify.xyz</code> mimicking <code>onlinesbi.sbi</code>).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <span className="font-bold text-cyan-300 block">🔤 Homoglyph & Punycode (IDN)</span>
              <p className="text-slate-400 leading-relaxed">
                Identifies deceptive unicode characters that look identical to human eyes (like Cyrillic 'а' or zero-width spaces in <code>xn--gogle-pqa.com</code>).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
              <span className="font-bold text-cyan-300 block">📋 Form Credential Harvesting</span>
              <p className="text-slate-400 leading-relaxed">
                Inspects DOM inputs for password fields, CVVs, Aadhaar/SSN, or OTP tokens submitting to unauthorized third-party destinations.
              </p>
            </div>
          </div>
        </div>

        {/* Module 2: The eMudhra TLS Incident & PKI Validation */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-900 border border-indigo-500/40 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-100 text-base">
                  2. Digital Trust, PKI & The eMudhra Incident
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  Critical Incident Case Study
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Why HTTPS green padlocks can lie: Key entropy, rogue CAs, and Certificate Transparency
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs leading-relaxed text-slate-300">
            <p>
              <strong className="text-amber-300">The Problem (What happened in the eMudhra Incident):</strong> Digital certificates verify website identity. However, audits revealed that flawed key generation entropy in Certificate Authorities allowed <em>duplicate cryptographic keys and weak 1024-bit RSA moduli</em> to be created. This means an attacker could obtain or calculate a private key that impersonates a legitimate organization without triggering browser warnings.
            </p>
            <p>
              <strong className="text-cyan-300">How TrustMatrix Solves This:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
              <li><strong className="text-slate-200">Key Entropy & Modulus Verification:</strong> Tests RSA key lengths (&ge; 2048-bit required) and flags duplicate public key moduli.</li>
              <li><strong className="text-slate-200">Certificate Transparency (CT) Audits:</strong> Checks if Signed Certificate Timestamps (SCTs) were published to public logs (Google Argon / Cloudflare Nimbus). Rogue certificates issued covertly lack these proofs.</li>
              <li><strong className="text-slate-200">CA Authority Reputation:</strong> Flags certificates issued by CAs with known compliance failures or audit sanctions (eMudhra, WoSign, StartCom).</li>
            </ul>
          </div>
        </div>

        {/* Module 3: Web Application Security Posture */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                3. Application Security Posture (AppSec)
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Auditing defensive HTTP headers, session security, and data leakage
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-bold text-emerald-300 block">🛡️ Defensive Security Headers</span>
              <p className="text-slate-400 leading-relaxed">
                Checks <strong>HSTS</strong> (prevents SSL-stripping downgrades), <strong>CSP</strong> (blocks malicious injected scripts), and <strong>X-Frame-Options</strong> (blocks hidden iframe Clickjacking attacks).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-bold text-emerald-300 block">🍪 Cookie & Server Leakage Auditing</span>
              <p className="text-slate-400 leading-relaxed">
                Verifies that session cookies carry <code>HttpOnly</code> and <code>Secure</code> flags, and verifies that server banners (e.g. vulnerable Apache/Nginx version disclosures) are suppressed.
              </p>
            </div>
          </div>
        </div>

        {/* Module 4: Collaborative Threat Intelligence */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                4. Collaborative Threat Intelligence & STIX 2.1
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Crowdsourced consensus, infrastructure clustering & standard threat sharing
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-bold text-purple-300 block">🕸️ Threat Infrastructure Clustering</span>
              <p className="text-slate-400 leading-relaxed">
                Correlates target domains against shared IP ranges, bulletproof hosters (ASNs), and known phishing toolkits (e.g. linked banking phish clusters).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-bold text-purple-300 block">📜 OASIS STIX 2.1 Compatibility</span>
              <p className="text-slate-400 leading-relaxed">
                Every verified IOC and report can be exported in standardized STIX 2.1 JSON, allowing security teams to import threat feeds straight into their SIEM or firewall.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
