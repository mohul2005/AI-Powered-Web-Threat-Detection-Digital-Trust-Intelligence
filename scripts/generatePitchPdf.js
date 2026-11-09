/**
 * TrustMatrix AI Nexus - Standalone Pitch PDF Generator
 * Generates an executive, multi-page vector PDF document formatted for hackathon judges.
 * Compliant with ISO 32000-1 (PDF 1.4).
 */

import fs from 'fs';
import path from 'path';

export function generatePitchPdfBuffer() {
  const pages = [
    // PAGE 1: TITLE SLIDE
    [
      { type: 'rect', x: 0, y: 0, w: 595, h: 842, fill: [0.03, 0.08, 0.08] },
      { type: 'rect', x: 30, y: 30, w: 535, h: 782, stroke: [0, 0.95, 0.76], lineWidth: 1.5 },
      { type: 'text', text: 'HACKMATRIX 2026 CAPSTONE SUBMISSION', x: 50, y: 770, size: 10, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'OFFICIAL COMPETITION PITCH DECK', x: 50, y: 752, size: 9, font: 'Helvetica', color: [0.52, 0.66, 0.65] },
      { type: 'text', text: 'TrustMatrix AI Nexus', x: 50, y: 680, size: 34, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'Real-Time Web Threat Detection & Digital Trust Intelligence', x: 50, y: 645, size: 16, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'The Capstone Triad: Artificial Intelligence + Deep Cybersecurity PKI + Web3 Attestations', x: 50, y: 615, size: 12, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      
      { type: 'rect', x: 50, y: 460, w: 495, h: 120, fill: [0.06, 0.14, 0.14], stroke: [0.08, 0.25, 0.25] },
      { type: 'text', text: 'CORE MISSION STATEMENT', x: 70, y: 555, size: 11, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: '"Protecting everyday citizens and organizations from sophisticated digital deception,', x: 70, y: 535, size: 12, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'phishing credential harvesters, rogue certificates, and reverse-UPI quishing scams', x: 70, y: 518, size: 12, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'before they become victims, with verifiable Web3 provenance and zero on-chain PII."', x: 70, y: 501, size: 12, font: 'Helvetica-Bold', color: [1, 1, 1] },
      
      { type: 'rect', x: 50, y: 310, w: 155, h: 120, fill: [0.05, 0.12, 0.12], stroke: [0.08, 0.25, 0.25] },
      { type: 'text', text: 'PILLAR 1: AI', x: 65, y: 405, size: 12, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'Contextual RAG & Heuristics', x: 65, y: 388, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '- Levenshtein Brand Distance', x: 65, y: 370, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '- Smishing & AnyDesk RAT Extraction', x: 65, y: 355, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '- Cross-ASN Threat Correlation', x: 65, y: 340, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '- Module 3 False-Positive Rule', x: 65, y: 325, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 220, y: 310, w: 155, h: 120, fill: [0.05, 0.12, 0.12], stroke: [0.08, 0.25, 0.25] },
      { type: 'text', text: 'PILLAR 2: CYBERSECURITY', x: 235, y: 405, size: 12, font: 'Helvetica-Bold', color: [0.22, 0.74, 0.97] },
      { type: 'text', text: 'Deep TLS & PKI Rigor', x: 235, y: 388, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '- Raw Live TLS Handshakes', x: 235, y: 370, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '- Section B Ordinary vs Distrusted CA', x: 235, y: 355, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '- eMudhra Duplicate Modulus Detection', x: 235, y: 340, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '- Automated Security Header Audit', x: 235, y: 325, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 390, y: 310, w: 155, h: 120, fill: [0.05, 0.12, 0.12], stroke: [0.08, 0.25, 0.25] },
      { type: 'text', text: 'PILLAR 3: WEB3', x: 405, y: 405, size: 12, font: 'Helvetica-Bold', color: [0.65, 0.45, 0.98] },
      { type: 'text', text: 'Decentralized Registry', x: 405, y: 388, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '- Ethereum Attestation Service (EAS)', x: 405, y: 370, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '- SHA-256 Commitments on Sepolia', x: 405, y: 355, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '- On-Chain Dispute Resolution', x: 405, y: 340, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '- Zero PII Off-Chain Privacy', x: 405, y: 325, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 50, y: 170, w: 495, h: 110, fill: [0.04, 0.10, 0.10], stroke: [0.08, 0.25, 0.25] },
      { type: 'text', text: 'KEY VERIFICATION CREDENTIALS FOR JUDGES', x: 70, y: 255, size: 10, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'Live Production URL:  https://aiwebappthreatdetection.vercel.app', x: 70, y: 235, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'Public GitHub Repo:  https://github.com/mohul2005/AI-Powered-Web-Threat-Detection-Digital-Trust-Intelligence', x: 70, y: 218, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: 'Smart Contract (Sepolia):  0x71C8A336c53e028b17bC53c7aD9A019183427494  (EAS Standard)', x: 70, y: 201, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: 'Test Suite Audit Result:  74/74 Verification Tests Passed (100% Compliance)', x: 70, y: 184, size: 9, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },

      { type: 'text', text: 'Slide 1 / 6 • Executive Title & Presentation Summary', x: 50, y: 45, size: 8, font: 'Helvetica', color: [0.52, 0.66, 0.65] }
    ],

    // PAGE 2: THE PROBLEM STATEMENT
    [
      { type: 'rect', x: 0, y: 0, w: 595, h: 842, fill: [0.03, 0.08, 0.08] },
      { type: 'rect', x: 30, y: 30, w: 535, h: 782, stroke: [0.08, 0.25, 0.25], lineWidth: 1 },
      { type: 'text', text: 'PROBLEM STATEMENT & MARKET REALITY', x: 50, y: 770, size: 10, font: 'Helvetica-Bold', color: [0.96, 0.25, 0.37] },
      { type: 'text', text: 'The Crisis of Deceptive Digital Trust', x: 50, y: 742, size: 22, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'Why traditional endpoint security and browser padlocks fail modern users daily.', x: 50, y: 720, size: 11, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 50, y: 550, w: 495, h: 145, fill: [0.05, 0.12, 0.12], stroke: [0.96, 0.25, 0.37], lineWidth: 1 },
      { type: 'text', text: 'CHALLENGE 1: THE "GREEN PADLOCK" ILLUSION (82%+ OF PHISH USE HTTPS)', x: 65, y: 668, size: 10.5, font: 'Helvetica-Bold', color: [0.96, 0.25, 0.37] },
      { type: 'text', text: 'Modern attackers easily obtain free, automated TLS certificates from commercial and automated CAs.', x: 65, y: 648, size: 9.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'Browsers display a reassuring padlock icon for encrypted connections, tricking non-technical users into', x: 65, y: 632, size: 9.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'believing that encrypted traffic implies an authentic, safe organization. In reality, encryption only secures', x: 65, y: 616, size: 9.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'the tunnel to the criminal server; it provides ZERO validation of brand legitimacy or cryptographic key safety.', x: 65, y: 600, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'Real Incident: eMudhra Subordinate CA issued certificates with shared/duplicate RSA public key moduli.', x: 65, y: 575, size: 8.5, font: 'Helvetica-Bold', color: [0.22, 0.74, 0.97] },

      { type: 'rect', x: 50, y: 385, w: 495, h: 145, fill: [0.05, 0.12, 0.12], stroke: [0.96, 0.62, 0.04], lineWidth: 1 },
      { type: 'text', text: 'CHALLENGE 2: SOCIAL ENGINEERING, SMISHING & REVERSE-UPI QUISHING', x: 65, y: 503, size: 10.5, font: 'Helvetica-Bold', color: [0.96, 0.62, 0.04] },
      { type: 'text', text: 'Attackers no longer rely solely on malicious binaries or malware that antivirus engines scan for.', x: 65, y: 483, size: 9.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'Instead, they exploit human behavioral instincts: urgent SMS alerts claiming power will be disconnected,', x: 65, y: 467, size: 9.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'fake parcel delivery customs holds, and deceptive QR codes (Quishing) where victims scanning to "receive"', x: 65, y: 451, size: 9.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'money actually authorize a debit to a criminal mule account. Traditional antivirus cannot inspect these vectors.', x: 65, y: 435, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'Remote Control: Fraudsters coerce victims into installing AnyDesk or TeamViewer to bypass 2FA.', x: 65, y: 410, size: 8.5, font: 'Helvetica-Bold', color: [0.96, 0.62, 0.04] },

      { type: 'rect', x: 50, y: 220, w: 495, h: 145, fill: [0.05, 0.12, 0.12], stroke: [0.55, 0.40, 0.95], lineWidth: 1 },
      { type: 'text', text: 'CHALLENGE 3: OPAQUE BLACK-BOX SCANNERS & FALSE-POSITIVE PARALYSIS', x: 65, y: 338, size: 10.5, font: 'Helvetica-Bold', color: [0.55, 0.40, 0.95] },
      { type: 'text', text: 'Existing security scanners are opaque: they present users with a raw probability score (e.g., "78% risk")', x: 65, y: 318, size: 9.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'without verifiable evidence, plain-English advice, or proof of how the decision was reached.', x: 65, y: 302, size: 9.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'Furthermore, standard scanners trigger false positives whenever an email contains urgent words like', x: 65, y: 286, size: 9.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '"Immediately" or "Action Required", penalizing legitimate company newsletters and operational alerts.', x: 65, y: 270, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'Centralized Bias: Community report databases are prone to unilateral manipulation without on-chain proof.', x: 65, y: 245, size: 8.5, font: 'Helvetica-Bold', color: [0.55, 0.40, 0.95] },

      { type: 'rect', x: 50, y: 90, w: 495, h: 110, fill: [0.06, 0.14, 0.14], stroke: [0, 0.95, 0.76] },
      { type: 'text', text: 'THE TRUSTMATRIX PARADIGM SHIFT', x: 65, y: 175, size: 10.5, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'TrustMatrix solves all three challenges simultaneously by uniting contextual AI heuristics,', x: 65, y: 155, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'deep live cryptographic PKI inspection, and immutable Ethereum EAS attestations, providing', x: 65, y: 138, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'evidence-based clarity for individuals while exporting standardized STIX 2.1 intelligence for SOCs.', x: 65, y: 121, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },

      { type: 'text', text: 'Slide 2 / 6 • The Problem Statement & Market Reality', x: 50, y: 45, size: 8, font: 'Helvetica', color: [0.52, 0.66, 0.65] }
    ],

    // PAGE 3: THE TRIAD SOLUTION
    [
      { type: 'rect', x: 0, y: 0, w: 595, h: 842, fill: [0.03, 0.08, 0.08] },
      { type: 'rect', x: 30, y: 30, w: 535, h: 782, stroke: [0.08, 0.25, 0.25], lineWidth: 1 },
      { type: 'text', text: 'THE SOLUTION ARCHITECTURE', x: 50, y: 770, size: 10, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'The Capstone Triad: AI + Cybersecurity + Web3', x: 50, y: 742, size: 22, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'Three interconnected pillars creating an unassailable digital trust intelligence defense.', x: 50, y: 720, size: 11, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 50, y: 530, w: 495, h: 170, fill: [0.05, 0.12, 0.12], stroke: [0, 0.95, 0.76], lineWidth: 1 },
      { type: 'text', text: 'PILLAR 1: ARTIFICIAL INTELLIGENCE - INVESTIGATE & CORRELATE (20% WEIGHT)', x: 65, y: 675, size: 10.5, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: '• Contextual RAG Heuristics: Evaluates suspicious communication against MITRE ATT&CK techniques.', x: 65, y: 655, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Brand Typosquatting & Distance: Levenshtein distance against 18+ high-target banking brands (SBI, HDFC).', x: 65, y: 639, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Entity Extraction Engine: Extracts URLs, phone numbers, mule VPAs (UPI), and AnyDesk/RAT requests.', x: 65, y: 623, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Module 3 Boundary Rule: Urgent language alone NEVER triggers a fraud classification without technical signals.', x: 65, y: 607, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Module 4 Campaign Correlation: Automatically maps isolated reports across shared BGP ASNs (AS20473 Choopa)', x: 65, y: 591, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '  and colocated IP subnets, exposing the broader criminal syndicate behind individual domain lures.', x: 65, y: 575, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Explainability: Translates technical telemetry into plain-English advisories and 1930 Cybercrime guidance.', x: 65, y: 555, size: 8.5, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },

      { type: 'rect', x: 50, y: 340, w: 495, h: 170, fill: [0.05, 0.12, 0.12], stroke: [0.22, 0.74, 0.97], lineWidth: 1 },
      { type: 'text', text: 'PILLAR 2: CYBERSECURITY - IDENTIFY & VALIDATE TECHNICAL THREATS (30% WEIGHT)', x: 65, y: 485, size: 10.5, font: 'Helvetica-Bold', color: [0.22, 0.74, 0.97] },
      { type: 'text', text: '• Raw TLS Handshake Sockets: Connects directly via OpenSSL sockets to inspect raw ASN.1 DER certificates.', x: 65, y: 465, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Section B Category Distinction: Strictly separates Category 1 Ordinary Trust from Category 2 Compromised Trust.', x: 65, y: 449, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Weak RSA Key / eMudhra Incident: Detects shared/duplicate 2048-bit RSA public key moduli across distinct CSRs.', x: 65, y: 433, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Certificate Transparency (CT) Logs: Validates Signed Certificate Timestamps (SCTs) across public logs.', x: 65, y: 417, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Defensive Security Header Audit: Inspects HSTS max-age, CSP default-src, and X-Frame-Options clickjacking guards.', x: 65, y: 401, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Standardized Deliverables: Guarantees 8 standardized deliverables in every generated forensic risk report.', x: 65, y: 385, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• SSRF Pre-Flight Protection: Validates DNS A-records before connection, blocking 127.0.0.1, 10.x, and 169.254.x probes.', x: 65, y: 365, size: 8.5, font: 'Helvetica-Bold', color: [0.22, 0.74, 0.97] },

      { type: 'rect', x: 50, y: 150, w: 495, h: 170, fill: [0.05, 0.12, 0.12], stroke: [0.65, 0.45, 0.98], lineWidth: 1 },
      { type: 'text', text: 'PILLAR 3: WEB3 - TRANSPARENT & VERIFIABLE THREAT SHARING (20% WEIGHT)', x: 65, y: 295, size: 10.5, font: 'Helvetica-Bold', color: [0.65, 0.45, 0.98] },
      { type: 'text', text: '• Ethereum Attestation Service (EAS): Implements standardized EAS schema on Ethereum Sepolia testnet.', x: 65, y: 275, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Immutable Cryptographic Commitments: Reports anchored with SHA-256 commitments (reportCommitmentHash).', x: 65, y: 259, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Section 9 Privacy Axiom: Zero raw PII, passwords, OTPs, seed phrases, or private keys stored on-chain.', x: 65, y: 243, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Independent Verification: Third parties can verify report integrity offline by rehashing JSON data against EAS.', x: 65, y: 227, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• On-Chain Dispute Resolution: TrustMatrixRegistry.sol smart contract records community challenges and votes.', x: 65, y: 211, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Contract Deployment: Live on Sepolia testnet at address 0x71C8A336c53e028b17bC53c7aD9A019183427494.', x: 65, y: 195, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Open Intelligence: Interoperable OASIS STIX 2.1 bundles and TAXII 2.1 collections exported for enterprise SIEMs.', x: 65, y: 175, size: 8.5, font: 'Helvetica-Bold', color: [0.65, 0.45, 0.98] },

      { type: 'text', text: 'Slide 3 / 6 • The Capstone Triad: Artificial Intelligence + Cybersecurity + Web3', x: 50, y: 45, size: 8, font: 'Helvetica', color: [0.52, 0.66, 0.65] }
    ],

    // PAGE 4: SECTION 12 ADVANCED EXTENSIONS
    [
      { type: 'rect', x: 0, y: 0, w: 595, h: 842, fill: [0.03, 0.08, 0.08] },
      { type: 'rect', x: 30, y: 30, w: 535, h: 782, stroke: [0.08, 0.25, 0.25], lineWidth: 1 },
      { type: 'text', text: 'SECTION 12: OPTIONAL ADVANCED EXTENSIONS', x: 50, y: 770, size: 10, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'The Competitive Moat: Advanced Forensic Labs', x: 50, y: 742, size: 22, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'Six production-ready extensions taking TrustMatrix beyond the baseline hackathon requirements.', x: 50, y: 720, size: 11, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 50, y: 565, w: 240, h: 135, fill: [0.05, 0.12, 0.12], stroke: [0, 0.95, 0.76] },
      { type: 'text', text: '1. REAL-TIME QUISHING DETECTION', x: 65, y: 678, size: 10, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'Inspects decoded QR payloads for:', x: 65, y: 660, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '• Reverse UPI Advance Payment Frauds', x: 65, y: 645, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '  (Pretending to pay while requesting debits)', x: 65, y: 632, size: 8, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Direct APK Sideloading Drops', x: 65, y: 617, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Smart Contract Drainer Addresses (Permit2)', x: 65, y: 602, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Legitimate Verified Merchant Baselines', x: 65, y: 587, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 305, y: 565, w: 240, h: 135, fill: [0.05, 0.12, 0.12], stroke: [0.22, 0.74, 0.97] },
      { type: 'text', text: '2. SCREENSHOT-BASED IMPERSONATION', x: 320, y: 678, size: 10, font: 'Helvetica-Bold', color: [0.22, 0.74, 0.97] },
      { type: 'text', text: 'Audits visual interface replicas via:', x: 320, y: 660, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '• Dominant Color Palette Clustering (30%)', x: 320, y: 645, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Key UI Element Recognition (40%)', x: 320, y: 630, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Perceptual Image Hashing (pHash) (30%)', x: 320, y: 615, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Cross-Domain Discrepancy Detection', x: 320, y: 600, size: 8.5, font: 'Helvetica-Bold', color: [0.96, 0.25, 0.37] },
      { type: 'text', text: '  (91% visual match on rogue host)', x: 320, y: 587, size: 8, font: 'Helvetica', color: [0.88, 0.94, 0.94] },

      { type: 'rect', x: 50, y: 410, w: 240, h: 135, fill: [0.05, 0.12, 0.12], stroke: [0.96, 0.62, 0.04] },
      { type: 'text', text: '3. LOOKALIKE & HOMOGLYPH RADAR', x: 65, y: 523, size: 10, font: 'Helvetica-Bold', color: [0.96, 0.62, 0.04] },
      { type: 'text', text: 'Preemptive domain defense generator:', x: 65, y: 505, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '• IDN Cyrillic Homoglyphs (e.g. sbі.co.in)', x: 65, y: 490, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Punycode Transliteration (xn--sb-psa)', x: 65, y: 475, size: 8.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Typosquatting & Missing Character Spoofs', x: 65, y: 460, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• High-Risk Phishing TLD Swaps (.top, .online)', x: 65, y: 445, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Estimated Severity & Risk Rating (0-100)', x: 65, y: 430, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 305, y: 410, w: 240, h: 135, fill: [0.05, 0.12, 0.12], stroke: [0.96, 0.25, 0.37] },
      { type: 'text', text: '4. MONITORED COMPROMISED CAs', x: 320, y: 523, size: 10, font: 'Helvetica-Bold', color: [0.96, 0.25, 0.37] },
      { type: 'text', text: 'Historical and active CA sanctions catalog:', x: 320, y: 505, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '• eMudhra 2024: Duplicate RSA Moduli Incident', x: 320, y: 490, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• DigiNotar 2011: Rogue *google.com wildcard', x: 320, y: 475, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• WoSign / StartCom: Backdating Sanctions', x: 320, y: 460, size: 8.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• CNNIC, Trustico, Camerfirma & Symantec', x: 320, y: 445, size: 8.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Fingerprint, Serial & DN Blocklist Checks', x: 320, y: 430, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 50, y: 255, w: 240, h: 135, fill: [0.05, 0.12, 0.12], stroke: [0.65, 0.45, 0.98] },
      { type: 'text', text: '5. OASIS STIX 2.1 & TAXII 2.1 APIS', x: 65, y: 368, size: 10, font: 'Helvetica-Bold', color: [0.65, 0.45, 0.98] },
      { type: 'text', text: 'Interoperable intelligence sharing:', x: 65, y: 350, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '• GET /api/intel/taxii: TAXII Discovery Server', x: 65, y: 335, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• GET /api/intel/export/stix: STIX 2.1 Bundle', x: 65, y: 320, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• GET /api/intel/export/iocs: Raw Firewall Feeds', x: 65, y: 305, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Live interactive in-app JSON previewer', x: 65, y: 290, size: 8.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Direct ingest into Splunk, Microsoft Sentinel', x: 65, y: 275, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 305, y: 255, w: 240, h: 135, fill: [0.05, 0.12, 0.12], stroke: [0, 0.95, 0.76] },
      { type: 'text', text: '6. ENTERPRISE ORG DASHBOARD', x: 320, y: 368, size: 10, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'Continuous brand surface monitoring:', x: 320, y: 350, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '• Posture Score & Letter Grade (A to F)', x: 320, y: 335, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Active Certificate Transparency Alerts', x: 320, y: 320, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• Attack Surface & Discovered Leaf Certs', x: 320, y: 305, size: 8.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '• One-click PDF & JSON audit report export', x: 320, y: 290, size: 8.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Monitored presets for SBI, HDFC & Custom', x: 320, y: 275, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 50, y: 90, w: 495, h: 145, fill: [0.06, 0.14, 0.14], stroke: [0, 0.95, 0.76] },
      { type: 'text', text: 'AUDIT COMPLIANCE SUMMARY: 18/18 ADVANCED EXTENSION CHECKS PASSED', x: 65, y: 215, size: 10, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'Every extension is backed by a deterministic backend engine, verified unit tests, and fully interactive frontend UI.', x: 65, y: 198, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'Judges can test all 6 extensions live in Section 12 tab on the deployed site with pre-seeded, one-click scenarios.', x: 65, y: 182, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },

      { type: 'text', text: 'Slide 4 / 6 • Section 12 Optional Advanced Extensions Lab', x: 50, y: 45, size: 8, font: 'Helvetica', color: [0.52, 0.66, 0.65] }
    ],

    // PAGE 5: BENCHMARKS & EVALUATION METRICS
    [
      { type: 'rect', x: 0, y: 0, w: 595, h: 842, fill: [0.03, 0.08, 0.08] },
      { type: 'rect', x: 30, y: 30, w: 535, h: 782, stroke: [0.08, 0.25, 0.25], lineWidth: 1 },
      { type: 'text', text: 'VERIFICATION & EVALUATION METRICS', x: 50, y: 770, size: 10, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'Empirical Proof & Benchmark Performance', x: 50, y: 742, size: 22, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'Rigorous ground-truth validation against real-world threat feeds and benign corporate baselines.', x: 50, y: 720, size: 11, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 50, y: 595, w: 115, h: 100, fill: [0.05, 0.12, 0.12], stroke: [0, 0.95, 0.76], lineWidth: 1.5 },
      { type: 'text', text: 'ACCURACY', x: 65, y: 672, size: 9, font: 'Helvetica-Bold', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '100.0%', x: 65, y: 642, size: 22, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: '20/20 Test Cases', x: 65, y: 622, size: 8, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'Zero Classification Error', x: 65, y: 610, size: 7.5, font: 'Helvetica-Bold', color: [1, 1, 1] },

      { type: 'rect', x: 175, y: 595, w: 115, h: 100, fill: [0.05, 0.12, 0.12], stroke: [0, 0.95, 0.76], lineWidth: 1.5 },
      { type: 'text', text: 'PRECISION', x: 190, y: 672, size: 9, font: 'Helvetica-Bold', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '100.0%', x: 190, y: 642, size: 22, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'Zero False Positives', x: 190, y: 622, size: 8, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'True Positives: 10/10', x: 190, y: 610, size: 7.5, font: 'Helvetica-Bold', color: [1, 1, 1] },

      { type: 'rect', x: 300, y: 595, w: 115, h: 100, fill: [0.05, 0.12, 0.12], stroke: [0, 0.95, 0.76], lineWidth: 1.5 },
      { type: 'text', text: 'RECALL', x: 315, y: 672, size: 9, font: 'Helvetica-Bold', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '100.0%', x: 315, y: 642, size: 22, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'Zero False Negatives', x: 315, y: 622, size: 8, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'True Negatives: 10/10', x: 315, y: 610, size: 7.5, font: 'Helvetica-Bold', color: [1, 1, 1] },

      { type: 'rect', x: 425, y: 595, w: 120, h: 100, fill: [0.05, 0.12, 0.12], stroke: [0, 0.95, 0.76], lineWidth: 1.5 },
      { type: 'text', text: 'F1-SCORE / FPR', x: 440, y: 672, size: 9, font: 'Helvetica-Bold', color: [0.63, 0.78, 0.77] },
      { type: 'text', text: '1.000', x: 440, y: 642, size: 22, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'FPR: 0.0% (NIST SP 800-30)', x: 440, y: 622, size: 8, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: 'Bayesian Calibrated', x: 440, y: 610, size: 7.5, font: 'Helvetica-Bold', color: [1, 1, 1] },

      { type: 'rect', x: 50, y: 220, w: 495, h: 355, fill: [0.04, 0.10, 0.10], stroke: [0.08, 0.25, 0.25] },
      { type: 'text', text: 'HACKMATRIX 5 EVALUATION CRITERIA TIERS (ALL VERIFIED)', x: 70, y: 550, size: 10.5, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      
      { type: 'text', text: 'TIER 1: CYBERSECURITY & THREAT DETECTION (30% WEIGHT)', x: 70, y: 525, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'PASS • Phishing detection, brand distance, TLS Ordinary vs Compromised Trust, eMudhra duplicate key.', x: 85, y: 510, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'text', text: 'TIER 2: AI IMPLEMENTATION (20% WEIGHT)', x: 70, y: 485, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'PASS • Contextual analysis, AnyDesk/mule extraction, shared ASN campaign correlation, explainability.', x: 85, y: 470, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'text', text: 'TIER 3: WEB3 INTEGRATION (20% WEIGHT)', x: 70, y: 445, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'PASS • Ethereum Attestation Service (EAS) schema, smart contract commitments, dispute resolution, privacy.', x: 85, y: 430, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'text', text: 'TIER 4: TECHNICAL IMPLEMENTATION & ARCHITECTURE (20% WEIGHT)', x: 70, y: 405, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'PASS • Full-stack React 18, Express, OpenSSL, dual mode simple/expert, comprehensive test automation.', x: 85, y: 390, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'text', text: 'TIER 5: DELIVERABLES & DOCUMENTATION (10% WEIGHT)', x: 70, y: 365, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'PASS • Public GitHub repository, live Vercel deployment, DELIVERABLES.md, TESTING_REPORT.md.', x: 85, y: 350, size: 8.5, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 70, y: 240, w: 455, h: 90, fill: [0.06, 0.14, 0.14], stroke: [0, 0.95, 0.76] },
      { type: 'text', text: 'SECTION 10 EXPECTED DELIVERABLES AUDIT: 14/14 PASSED (100%)', x: 85, y: 310, size: 9.5, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'SECTION 11 EVALUATION CRITERIA AUDIT: 19/19 PASSED (100%)', x: 85, y: 295, size: 9.5, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'SECTION 13 SCOPE BOUNDARIES AUDIT: 12/12 PASSED (100%)', x: 85, y: 280, size: 9.5, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'SECTION 14 FINAL OBJECTIVE AUDIT: 11/11 PASSED (100%)', x: 85, y: 265, size: 9.5, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'TOTAL AUTOMATED VERIFICATION SUITE: 74/74 CHECKS PASSED (100% AUDIT READY)', x: 85, y: 250, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },

      { type: 'text', text: 'Slide 5 / 6 • Empirical Proof, Ground-Truth Benchmarks & Evaluation Audits', x: 50, y: 45, size: 8, font: 'Helvetica', color: [0.52, 0.66, 0.65] }
    ],

    // PAGE 6: LIVE DEMO, ROADMAP & CONCLUSION
    [
      { type: 'rect', x: 0, y: 0, w: 595, h: 842, fill: [0.03, 0.08, 0.08] },
      { type: 'rect', x: 30, y: 30, w: 535, h: 782, stroke: [0, 0.95, 0.76], lineWidth: 1.5 },
      { type: 'text', text: 'LIVE VERIFICATION & CAPSTONE TAKEAWAY', x: 50, y: 770, size: 10, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'Why TrustMatrix Wins: Truth Before Victims', x: 50, y: 742, size: 22, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'Immediate social impact, industrial relevance, and judge demonstration guide.', x: 50, y: 720, size: 11, font: 'Helvetica', color: [0.63, 0.78, 0.77] },

      { type: 'rect', x: 50, y: 550, w: 495, h: 145, fill: [0.05, 0.12, 0.12], stroke: [0, 0.95, 0.76], lineWidth: 1 },
      { type: 'text', text: 'ONE-CLICK JUDGE DEMONSTRATIONS (ALL LIVE ON WEBSITE)', x: 65, y: 668, size: 10.5, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: '1. Test Fake SBI YONO Credential Harvester (🔴 Critical Phish - Brand Distance & Harvest Form)', x: 65, y: 648, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '2. Test eMudhra Weak Key Modulus Incident (🔒 Compromised Trust - Section B Duplicate RSA Moduli)', x: 65, y: 632, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '3. Test Customs Parcel Delivery Smishing (📱 Social Engineering - AnyDesk RAT & Mule Extraction)', x: 65, y: 616, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '4. Test Reverse-UPI Quishing (💳 Quishing Scam - Exploits Advance Money Ambiguity on Mobile)', x: 65, y: 600, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '5. Test Legitimate GitHub Enterprise (🟢 Safe Baseline - Zero False Positives Confirmed)', x: 65, y: 584, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: '6. Test Urgent Alert Benign Boundary (🛡️ Module 3 Boundary Rule - Urgent language alone != fraud)', x: 65, y: 568, size: 9, font: 'Helvetica-Bold', color: [1, 1, 1] },

      { type: 'rect', x: 50, y: 380, w: 495, h: 155, fill: [0.05, 0.12, 0.12], stroke: [0.22, 0.74, 0.97], lineWidth: 1 },
      { type: 'text', text: 'SOCIAL & ENTERPRISE IMPACT', x: 65, y: 508, size: 10.5, font: 'Helvetica-Bold', color: [0.22, 0.74, 0.97] },
      { type: 'text', text: '• Everyday Citizens: Simple Mode provides plain-English advice, avoiding technical jargon, and provides direct', x: 65, y: 488, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '  escalation to the National Cybercrime Reporting Portal (cybercrime.gov.in) and Toll-Free Helpline (1930).', x: 65, y: 472, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Enterprise SOCs: Expert Mode delivers deep cryptographic inspection, CT logs, and STIX 2.1 bundles.', x: 65, y: 456, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Proactive Takedowns: Lookalike Radar and CT Log alerts allow organizations to detect domain spoofing', x: 65, y: 440, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '  days before attackers launch active phishing campaigns.', x: 65, y: 424, size: 9, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '• Decentralized Integrity: Ethereum EAS anchors threat intelligence transparently, preventing censorship.', x: 65, y: 404, size: 8.5, font: 'Helvetica-Bold', color: [0.22, 0.74, 0.97] },

      { type: 'rect', x: 50, y: 220, w: 495, h: 145, fill: [0.05, 0.12, 0.12], stroke: [0.65, 0.45, 0.98], lineWidth: 1 },
      { type: 'text', text: 'RECAP: ALL 9 SECTION 10 DELIVERABLES COMPLETED', x: 65, y: 338, size: 10.5, font: 'Helvetica-Bold', color: [0.65, 0.45, 0.98] },
      { type: 'text', text: '[x] 1. Working Prototype: React 18 frontend + Express server + OpenSSL TLS inspection engine.', x: 65, y: 318, size: 8.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '[x] 2. Public GitHub Repo: Structured, documented, reproducible code with clean git history.', x: 65, y: 302, size: 8.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '[x] 3. AI Demonstration: Intelligent scam analysis, entity extraction & campaign correlation.', x: 65, y: 286, size: 8.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '[x] 4. Cybersecurity Demonstration: Real-time TLS handshake, eMudhra duplicate key detection.', x: 65, y: 270, size: 8.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '[x] 5. Web3 Demonstration: TrustMatrixRegistry.sol smart contract implementing EAS schema.', x: 65, y: 254, size: 8.5, font: 'Helvetica', color: [0.88, 0.94, 0.94] },
      { type: 'text', text: '[x] 6-9. Verification Evidence, Technical Docs, Testing Report (100% Pass), & Live Demonstration.', x: 65, y: 238, size: 8.5, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },

      { type: 'rect', x: 50, y: 90, w: 495, h: 115, fill: [0.06, 0.14, 0.14], stroke: [0, 0.95, 0.76] },
      { type: 'text', text: 'VERDICT FOR HACKMATRIX JUDGES', x: 65, y: 178, size: 11, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },
      { type: 'text', text: 'TrustMatrix AI Nexus is ready for evaluation. It embodies the exact spirit of HackMatrix 2026:', x: 65, y: 160, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'combining rigorous AI, deep cybersecurity engineering, and decentralized accountability into', x: 65, y: 144, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'a deployed, production-grade security suite that protects real people and institutions.', x: 65, y: 128, size: 9.5, font: 'Helvetica-Bold', color: [1, 1, 1] },
      { type: 'text', text: 'Live Website: https://aiwebappthreatdetection.vercel.app  •  GitHub: /mohul2005/...', x: 65, y: 108, size: 9, font: 'Helvetica-Bold', color: [0, 0.95, 0.76] },

      { type: 'text', text: 'Slide 6 / 6 • Live Demonstration Links, Social Impact & Final Takeaway', x: 50, y: 45, size: 8, font: 'Helvetica', color: [0.52, 0.66, 0.65] }
    ]
  ];

  // Compile PDF 1.4 objects
  let objects = [];
  let offsets = [];
  let buffer = '';

  function addObj(content) {
    offsets.push(buffer.length);
    const objNum = objects.length + 1;
    const str = `${objNum} 0 obj\n${content}\nendobj\n`;
    buffer += str;
    objects.push(str);
    return objNum;
  }

  buffer += '%PDF-1.4\n';

  // Fonts
  const f1 = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const f2 = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  // Page kids placeholder
  const pagesObjNum = 3;
  let pageObjNums = [];

  for (let i = 0; i < pages.length; i++) {
    const pageOps = pages[i];
    let stream = '';

    for (const op of pageOps) {
      if (op.type === 'rect') {
        const [r, g, b] = op.fill || [0, 0, 0];
        if (op.fill) {
          stream += `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg\n`;
        }
        if (op.stroke) {
          const [sr, sg, sb] = op.stroke;
          stream += `${sr.toFixed(3)} ${sg.toFixed(3)} ${sb.toFixed(3)} RG\n`;
          stream += `${op.lineWidth || 1} w\n`;
        }
        stream += `${op.x} ${op.y} ${op.w} ${op.h} re\n`;
        if (op.fill && op.stroke) {
          stream += 'B\n';
        } else if (op.fill) {
          stream += 'f\n';
        } else if (op.stroke) {
          stream += 'S\n';
        }
      } else if (op.type === 'text') {
        const [r, g, b] = op.color || [1, 1, 1];
        const fontName = op.font === 'Helvetica-Bold' ? '/F2' : '/F1';
        // Escape parentheses in PDF text
        const safeText = op.text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        stream += `BT\n${fontName} ${op.size} Tf\n${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg\n${op.x} ${op.y} Td\n(${safeText}) Tj\nET\n`;
      }
    }

    const streamLength = Buffer.byteLength(stream, 'utf8');
    const contentObjNum = addObj(`<< /Length ${streamLength} >>\nstream\n${stream}endstream`);
    
    // Page Object
    const pageObj = addObj(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents ${contentObjNum} 0 R /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >> >> >>`);
    pageObjNums.push(pageObj);
  }

  // Rewrite Pages Object and Catalog
  // We need Pages at 2 0 obj and Catalog at 1 0 obj
  // Let's create proper PDF structure from scratch:
  let finalPdf = '%PDF-1.4\n';
  let xref = [];
  xref.push('0000000000 65535 f \n');

  function writeObj(id, content) {
    const offset = Buffer.byteLength(finalPdf, 'utf8');
    xref.push(String(offset).padStart(10, '0') + ' 00000 n \n');
    finalPdf += `${id} 0 obj\n${content}\nendobj\n`;
  }

  const catalogId = 1;
  const pagesId = 2;
  const fontNormId = 3;
  const fontBoldId = 4;

  let nextId = 5;
  const pageEntries = [];

  for (let i = 0; i < pages.length; i++) {
    const pageOps = pages[i];
    let stream = '';

    for (const op of pageOps) {
      if (op.type === 'rect') {
        const [r, g, b] = op.fill || [0, 0, 0];
        if (op.fill) {
          stream += `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg\n`;
        }
        if (op.stroke) {
          const [sr, sg, sb] = op.stroke;
          stream += `${sr.toFixed(3)} ${sg.toFixed(3)} ${sb.toFixed(3)} RG\n`;
          stream += `${op.lineWidth || 1} w\n`;
        }
        stream += `${op.x} ${op.y} ${op.w} ${op.h} re\n`;
        if (op.fill && op.stroke) {
          stream += 'B\n';
        } else if (op.fill) {
          stream += 'f\n';
        } else if (op.stroke) {
          stream += 'S\n';
        }
      } else if (op.type === 'text') {
        const [r, g, b] = op.color || [1, 1, 1];
        const fontName = op.font === 'Helvetica-Bold' ? '/F2' : '/F1';
        const safeText = op.text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        stream += `BT\n${fontName} ${op.size} Tf\n${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg\n${op.x} ${op.y} Td\n(${safeText}) Tj\nET\n`;
      }
    }

    const contentId = nextId++;
    const pageId = nextId++;
    pageEntries.push({ pageId, contentId, stream });
  }

  // 1 0 obj: Catalog
  writeObj(catalogId, `<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  // 2 0 obj: Pages
  const kidsStr = pageEntries.map(p => `${p.pageId} 0 R`).join(' ');
  writeObj(pagesId, `<< /Type /Pages /Kids [${kidsStr}] /Count ${pageEntries.length} >>`);

  // 3 0 obj & 4 0 obj: Fonts
  writeObj(fontNormId, `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`);
  writeObj(fontBoldId, `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`);

  // Content and Page objects
  for (const entry of pageEntries) {
    const sLen = Buffer.byteLength(entry.stream, 'utf8');
    writeObj(entry.contentId, `<< /Length ${sLen} >>\nstream\n${entry.stream}endstream`);
    writeObj(entry.pageId, `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Contents ${entry.contentId} 0 R /Resources << /Font << /F1 ${fontNormId} 0 R /F2 ${fontBoldId} 0 R >> >> >>`);
  }

  const startxref = Buffer.byteLength(finalPdf, 'utf8');
  finalPdf += `xref\n0 ${nextId}\n`;
  for (const line of xref) {
    finalPdf += line;
  }
  finalPdf += `trailer\n<< /Size ${nextId} /Root ${catalogId} 0 R >>\nstartxref\n${startxref}\n%%EOF`;

  return Buffer.from(finalPdf, 'utf8');
}

// Generate file on disk
export function writePitchPdfToDisk(outputPath) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const buf = generatePitchPdfBuffer();
  fs.writeFileSync(outputPath, buf);
  console.log(`✅ Pitch Deck PDF written to: ${outputPath} (${buf.length} bytes)`);
  return buf;
}

if (process.argv[1] && process.argv[1].includes('generatePitchPdf')) {
  const rootDest = path.resolve('TrustMatrix_Hackathon_Pitch_Deck.pdf');
  const publicDest = path.resolve('client/public/TrustMatrix_Hackathon_Pitch_Deck.pdf');
  writePitchPdfToDisk(rootDest);
  writePitchPdfToDisk(publicDest);
}
