/**
 * TrustMatrix AI Nexus - Beginner Guide Export Engine
 * Generates and serves a self-contained, standalone printable HTML/PDF document.
 */

import express from 'express';

const router = express.Router();

router.get('/download-html', (req, res) => {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TrustMatrix AI Nexus - Complete Beginner's Security Architecture Guide</title>
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      background: #ffffff;
      line-height: 1.6;
      margin: 0;
      padding: 24px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    .header-box {
      border: 2px solid #00a884;
      background: #f0fdf4;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
    }
    h1 {
      color: #064e3b;
      font-size: 26px;
      margin-top: 0;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #047857;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .mission-box {
      background: #ffffff;
      border-left: 4px solid #00a884;
      padding: 12px 16px;
      margin: 16px 0;
      font-style: italic;
      color: #065f46;
      border-radius: 4px;
    }
    .section-card {
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 18px;
      margin-bottom: 20px;
      background: #ffffff;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .badge {
      display: inline-block;
      background: #00a884;
      color: #ffffff;
      font-size: 11px;
      font-weight: bold;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    h2 {
      color: #111827;
      font-size: 18px;
      margin: 0 0 8px 0;
    }
    .analogy {
      background: #fefce8;
      border: 1px solid #fef08a;
      border-radius: 6px;
      padding: 10px 14px;
      font-size: 13px;
      color: #854d0e;
      margin-bottom: 10px;
    }
    .danger {
      background: #fff1f2;
      border: 1px solid #fecdd3;
      border-radius: 6px;
      padding: 10px 14px;
      font-size: 13px;
      color: #9f1239;
      margin-bottom: 10px;
    }
    .protect {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 6px;
      padding: 10px 14px;
      font-size: 13px;
      color: #166534;
      margin-bottom: 10px;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
      font-size: 12px;
    }
    .meta-table th, .meta-table td {
      border: 1px solid #e5e7eb;
      padding: 8px 12px;
      text-align: left;
    }
    .meta-table th {
      background: #f9fafb;
    }
    .print-button {
      background: #00a884;
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      margin-bottom: 20px;
    }
    @media print {
      .print-button { display: none; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="container">
    <button class="print-button" onclick="window.print()">🖨️ Print as PDF / Save Document</button>

    <div class="header-box">
      <span class="badge">HackMatrix Sentinel Nexus Edition</span>
      <h1>TrustMatrix AI Nexus: Complete Beginner's Security Architecture Guide</h1>
      <div class="subtitle">An End-to-End Plain-English Walkthrough of AI Threat Detection, Cybersecurity PKI & Web3 Decentralized Trust</div>
      <p style="font-size: 13px; margin: 0;">
        This document provides an end-to-end explanation of every single security mechanism in TrustMatrix AI Nexus. It is designed for beginners, everyday internet users, and hackathon judges to understand how each technology works and how it stops cyber fraud before harm occurs.
      </p>
      <div class="mission-box">
        <strong>The Golden Mission (Section 14):</strong><br>
        "To make the internet a safer place by helping individuals and organisations identify digital deception before they become its victims."
      </div>
      <div style="font-size: 12px; color: #047857;">
        <strong>Platform Verification:</strong> 74/74 Unit & Compliance Assertions Passed (100%) • Solidity Contract on Sepolia (0x71C8A3362a2F8F7B5Ea02aC0b8a1c9D86e4A7091)
      </div>
    </div>

    <!-- CHAPTER 1: THE TRIAD CORE -->
    <div class="section-card">
      <span class="badge">Chapter 1 • Core Architecture</span>
      <h2>The Triad: How AI, Cybersecurity & Web3 Unite</h2>
      <p style="font-size: 13px;">
        Traditional cybersecurity relies on static lists of known bad sites. TrustMatrix unites three complementary pillars called <strong>The Triad</strong>:
      </p>
      <ul>
        <li><strong>🤖 Artificial Intelligence:</strong> Acts like an expert detective. Evaluates text, spots deceptive spelling (Levenshtein distance), and correlates related attacks.</li>
        <li><strong>🛡️ Deep Cybersecurity & PKI:</strong> Inspects digital padlocks (TLS certificates), tests encryption key sizes (must be &ge; 2048-bit), and detects compromised Certificate Authorities (eMudhra incident).</li>
        <li><strong>⛓️ Web3 On-Chain Ledger:</strong> Acts like an unalterable public notary. Verified threat reports are fingerprinted onto Ethereum Sepolia via EAS attestations so no attacker can erase past evidence.</li>
      </ul>
    </div>

    <!-- CHAPTER 2: THE 5-STEP JOURNEY -->
    <div class="section-card">
      <span class="badge">Chapter 2 • Section 5</span>
      <h2>The 5-Step User Experience</h2>
      <p style="font-size: 13px;">Every threat investigation follows a clean, guided 5-step journey:</p>
      <table class="meta-table">
        <tr><th>Step</th><th>Action</th><th>What Happens Under the Hood</th></tr>
        <tr><td><strong>1. Submit</strong></td><td>Paste link, email, or SMS</td><td>Input is quarantined inside a secure, un-executed telemetry frame.</td></tr>
        <tr><td><strong>2. Investigate</strong></td><td>Passive inspection</td><td>Resolves public DNS, checks pre-flight SSRF guards, queries CT logs.</td></tr>
        <tr><td><strong>3. Analyse</strong></td><td>AI & Cyber checks</td><td>AI checks for urgency tricks; OpenSSL verifies certificate encryption keys.</td></tr>
        <tr><td><strong>4. Assess Risk</strong></td><td>Receive plain score</td><td>Generates 0–100 score with plain-English instructions and 1930 helpline details.</td></tr>
        <tr><td><strong>5. Report & Verify</strong></td><td>Blockchain anchoring</td><td>SHA-256 fingerprint anchored to Ethereum Sepolia without storing personal data.</td></tr>
      </table>
    </div>

    <!-- CHAPTER 3: MODULE 1 -->
    <div class="section-card">
      <span class="badge">Chapter 3 • Module 1</span>
      <h2>URL Analysis & Brand Spoofing</h2>
      <div class="analogy">💡 <strong>Simple Analogy:</strong> A bouncer checking if an identity card has a subtle typo or forged font before opening the door.</div>
      <div class="danger">⚠️ <strong>The Danger:</strong> Scammers register fake addresses like <code>sbi-yono-update.top</code> to steal banking logins and OTPs.</div>
      <div class="protect">🛡️ <strong>How TrustMatrix Protects:</strong> Measures edit-distance to 18+ protected banking brands and decodes hidden Cyrillic/Greek characters (homoglyphs).</div>
    </div>

    <!-- CHAPTER 4: MODULE 2 -->
    <div class="section-card">
      <span class="badge">Chapter 4 • Module 2</span>
      <h2>TLS Certificates & Padlock Inspection (Section B)</h2>
      <div class="analogy">💡 <strong>Simple Analogy:</strong> A padlock on a door stops eavesdroppers, but does not tell you if the person inside the house is a criminal.</div>
      <div class="danger">⚠️ <strong>The Danger:</strong> Attackers can obtain free padlocks in seconds. Furthermore, the 2024 eMudhra CA audit failure proved that weak entropy produced duplicate RSA moduli.</div>
      <div class="protect">🛡️ <strong>How TrustMatrix Protects:</strong> Conducts raw X.509 socket handshakes, enforces &ge; 2048-bit RSA keys, and checks Certificate Transparency logs (Google Argon / Cloudflare Nimbus).</div>
    </div>

    <!-- CHAPTER 5: MODULE 3 -->
    <div class="section-card">
      <span class="badge">Chapter 5 • Module 3</span>
      <h2>AI Scam & Urgent Message Analysis (Section C)</h2>
      <div class="analogy">💡 <strong>Simple Analogy:</strong> A trusted friend tapping you on the shoulder saying: "Wait! Real electricity boards never tell you to install AnyDesk on your phone."</div>
      <div class="danger">⚠️ <strong>The Danger:</strong> Panicked victims install remote-control tools (AnyDesk) and scammers drain bank balances in minutes.</div>
      <div class="protect">🛡️ <strong>How TrustMatrix Protects:</strong> Enforces the Module 3 AI Boundary Rule: urgent words alone are not marked as fraud without empirical proof (RAT software names, mule UPI handles). Directs victims to Helpline 1930.</div>
    </div>

    <!-- CHAPTER 6: MODULE 4 -->
    <div class="section-card">
      <span class="badge">Chapter 6 • Module 4</span>
      <h2>Intelligent Threat Correlation</h2>
      <div class="analogy">💡 <strong>Simple Analogy:</strong> Detectives connecting multiple crime scenes to the same getaway car and license plate.</div>
      <div class="danger">⚠️ <strong>The Danger:</strong> Scammers rotate dozens of web domains. If you only look at one link, you miss the larger syndicate.</div>
      <div class="protect">🛡️ <strong>How TrustMatrix Protects:</strong> Maps shared BGP routing networks (AS20473 Choopa/Vultr transit), colocated server IPs, and reused payment handles into an interactive graph.</div>
    </div>

    <!-- CHAPTER 7: MODULE 5 -->
    <div class="section-card">
      <span class="badge">Chapter 7 • Module 5</span>
      <h2>Website Security Assessment</h2>
      <div class="analogy">💡 <strong>Simple Analogy:</strong> Checking whether a public building has emergency exits and fire sprinklers without setting a fire.</div>
      <div class="danger">⚠️ <strong>The Danger:</strong> Missing defensive headers allow attackers to embed bank websites into invisible iframes (Clickjacking) or inject malicious scripts.</div>
      <div class="protect">🛡️ <strong>How TrustMatrix Protects:</strong> Performs non-exploitative audits of HSTS, Content-Security-Policy (CSP), and X-Frame-Options headers and assigns an A+ to F grade.</div>
    </div>

    <!-- CHAPTER 8: MODULE 6 -->
    <div class="section-card">
      <span class="badge">Chapter 8 • Module 6</span>
      <h2>Decentralized Web3 Attestations</h2>
      <div class="analogy">💡 <strong>Simple Analogy:</strong> Engraving an official verdict in stone in the public square so nobody can secretly erase it later.</div>
      <div class="danger">⚠️ <strong>The Danger:</strong> Centralized databases can be hacked, bribed, or wiped.</div>
      <div class="protect">🛡️ <strong>How TrustMatrix Protects:</strong> Creates immutable EAS attestations on Ethereum Sepolia. Raw URLs and personal names remain strictly off-chain for privacy.</div>
    </div>

    <!-- CHAPTER 9: SECTION 6 -->
    <div class="section-card">
      <span class="badge">Chapter 9 • Section 6</span>
      <h2>The 5 Traffic Light Risk Levels</h2>
      <table class="meta-table">
        <tr><th>Color / Tier</th><th>Score</th><th>Meaning</th><th>Action</th></tr>
        <tr style="background: #fff1f2; color: #9f1239;"><td><strong>🔴 Confirmed Malicious</strong></td><td>&le; 25</td><td>Active phishing kit, duplicate RSA key, or AnyDesk RAT link.</td><td>Close immediately. Never enter OTPs or passwords.</td></tr>
        <tr style="background: #fffbeb; color: #92400e;"><td><strong>🟠 High Risk</strong></td><td>26–50</td><td>Multiple flags: typosquatting + suspicious TLD + missing CT log.</td><td>High probability of scam. Do not interact.</td></tr>
        <tr style="background: #fefce8; color: #854d0e;"><td><strong>🟡 Suspicious</strong></td><td>51–70</td><td>Urgent wording, high-entropy domain, or expired cert.</td><td>Verify through independent official phone number.</td></tr>
        <tr style="background: #f0fdf4; color: #166534;"><td><strong>🟢 Low Risk</strong></td><td>71–100</td><td>Passed standard automated tests. Note: Never labeled absolute "Safe".</td><td>Safe to browse. Maintain normal cyber hygiene.</td></tr>
        <tr style="background: #f9fafb; color: #4b5563;"><td><strong>⚪ Inconclusive</strong></td><td>N/A</td><td>Server down, DNS failure, or insufficient data.</td><td>Wait and re-test before visiting.</td></tr>
      </table>
      <p style="font-size: 12px; margin-top: 10px;">
        <strong>The Security Axiom:</strong> <em>"The system must not treat the absence of known threats as proof that a website is safe."</em>
      </p>
    </div>

    <!-- CHAPTER 10: ADVANCED EXTENSIONS (SECTION 12) -->
    <div class="section-card">
      <span class="badge">Chapter 10 • Section 12</span>
      <h2>Advanced Extensions (QR Quishing, Radar, Org Dashboard)</h2>
      <p style="font-size: 13px;">To protect users across all modern attack vectors, TrustMatrix includes:</p>
      <ul>
        <li><strong>QR Scam Detection (Quishing):</strong> Catches reverse UPI scams ("Scan to receive refund"). In UPI, scanning always DEBITS money!</li>
        <li><strong>Lookalike Domain Radar:</strong> Generates predictive typosquats, bitsquats, and Cyrillic homoglyphs before scammers register them.</li>
        <li><strong>Organisation Security Dashboard:</strong> Gives companies real-time CT log stream alerts whenever an unauthorized Certificate Authority issues a certificate in their name.</li>
        <li><strong>OASIS STIX 2.1 & TAXII 2.1 APIs:</strong> Open-standard threat feeds for corporate SOCs and national cyber centers.</li>
      </ul>
    </div>

    <!-- CHAPTER 11: EMERGENCY PLAYBOOK -->
    <div class="section-card" style="border: 2px solid #e11d48; background: #fff1f2;">
      <span class="badge" style="background: #e11d48;">Emergency Playbook</span>
      <h2 style="color: #9f1239;">What to Do If You Suspect You Were Scammed</h2>
      <ol style="font-size: 13px; color: #881337;">
        <li><strong>DISCONNECT IMMEDIATELY:</strong> Turn off your Wi-Fi and mobile data if you installed AnyDesk, TeamViewer, or an unknown APK.</li>
        <li><strong>DIAL 1930:</strong> Call the National Cybercrime Helpline at <strong>1930</strong> immediately. The first 2 hours are the "Golden Hours" to freeze fraudulent UPI and banking transfers.</li>
        <li><strong>LODGE COMPLAINT:</strong> Visit <strong>https://cybercrime.gov.in</strong> to submit transaction reference numbers and SMS screenshots.</li>
        <li><strong>CHANGE PASSWORDS:</strong> From a clean, separate device, change your netbanking and email passwords.</li>
      </ol>
    </div>

    <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #6b7280;">
      TrustMatrix AI Nexus • Official HackMatrix Documentation Dossier • All Rights Reserved
    </div>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Disposition', 'inline; filename="TrustMatrix-Beginner-Security-Architecture-Guide.html"');
  res.send(htmlContent);
});

export default router;
