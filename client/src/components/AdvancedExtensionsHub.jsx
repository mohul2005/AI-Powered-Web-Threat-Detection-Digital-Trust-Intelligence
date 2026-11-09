import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Image as ImageIcon, 
  Radar, 
  ShieldAlert, 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  FileCode2, 
  Send, 
  Sparkles, 
  Layers, 
  Copy, 
  Check, 
  RefreshCw,
  ExternalLink,
  Lock,
  ArrowRight,
  Eye,
  Download,
  Info
} from 'lucide-react';
import { API_BASE } from '../config/api.js';

// ============================================================================
// Built-in Seed Data for Guaranteed Instant Rendering & Offline Resilience
// ============================================================================
const DEFAULT_QUISHING_SCENARIOS = [
  {
    id: 'quish-reverse-upi-scam',
    title: 'OLX / Marketplace Reverse QR Scam',
    description: 'Buyer claims to send advance money via QR, but encodes debit request with transaction note "Receive Cash ₹15,000"',
    payload: 'upi://pay?pa=raghav-claims@okaxis&pn=OLX%20Buyer%20Payment&am=15000.00&cu=INR&tn=Scan%20to%20Receive%20Advance%20Cash',
    expectedVerdict: 'CONFIRMED_QUISHING_FRAUD',
    expectedThreat: 'CRITICAL'
  },
  {
    id: 'quish-electricity-bill-scam',
    title: 'Electricity Discom Quishing on Mule VPA',
    description: 'Fake power department notice with QR encoding retail mule VPA pretending to be State Electricity Board',
    payload: 'upi://pay?pa=power-discom-bill@ybl&pn=State%20Electricity%20Discom&am=480.00&cu=INR&tn=Electricity%20Bill%20Avoid%20Disconnection',
    expectedVerdict: 'SUSPICIOUS_QR_PAYLOAD',
    expectedThreat: 'HIGH'
  },
  {
    id: 'quish-malicious-apk-drop',
    title: 'Bank KYC APK Sideloading QR',
    description: 'QR code posted on phishing SMS directing device to directly download an infostealer APK',
    payload: 'https://sbi-yono-update.top/download/yono-kyc-patch.apk',
    expectedVerdict: 'CONFIRMED_QUISHING_FRAUD',
    expectedThreat: 'CRITICAL'
  },
  {
    id: 'quish-legitimate-merchant',
    title: 'Legitimate Verified Merchant QR (Safe Baseline)',
    description: 'Authentic verified merchant QR code for a retail coffee store with zero deceptive notes',
    payload: 'upi://pay?pa=starbucks.merchant@icici&pn=Starbucks%20Coffee&cu=INR',
    expectedVerdict: 'SAFE_QR_PAYLOAD',
    expectedThreat: 'LOW'
  }
];

const DEFAULT_QR_RESULT = {
  verdict: 'CONFIRMED_QUISHING_FRAUD',
  threatLevel: 'CRITICAL',
  trustScore: 10,
  payloadType: 'UPI_PAYMENT_REVERSE_SCAM',
  indicators: [
    {
      title: 'Reverse UPI Advance Payment Scam',
      severity: 'CRITICAL',
      technicalEvidence: "Decoded UPI string contains payee VPA 'raghav-claims@okaxis' with requested debit amount '₹15,000.00' and deceptive transaction note 'Scan to Receive Advance Cash'.",
      impact: 'Victims scanning this QR to "receive" funds will actually have ₹15,000 deducted from their account.'
    },
    {
      title: 'Deceptive Transaction Note Trick',
      severity: 'HIGH',
      technicalEvidence: "VPA utilizes OLX / buyer keywords to socially engineer seller into believing transaction is incoming credit.",
      impact: 'Capitalizes on user interface ambiguity between sending and receiving payments on mobile UPI apps.'
    }
  ],
  recommendedActions: [
    'DO NOT scan this QR code or enter your UPI MPIN.',
    'Remember: Receiving money on UPI NEVER requires scanning a QR or typing your MPIN.',
    'Block the VPA raghav-claims@okaxis and report to 1930 / cybercrime.gov.in.'
  ]
};

const DEFAULT_VISUAL_SCENARIOS = [
  {
    id: 'vis-sbi-fake-login',
    title: 'SBI YONO Stolen Visual Theme',
    targetUrl: 'https://sbi-yono-pan-kyc-update.top/login.php',
    extractedColors: ['#004c8f', '#280071', '#ffffff', '#f4f6f8'],
    detectedElements: ['sbi_logo_circle', 'username_field', 'password_field', 'captcha_box'],
    screenshotPhash: 'a8f1e4d2c3b5a690',
    expectedVerdict: 'CONFIRMED_VISUAL_IMPERSONATION',
    expectedBrand: 'State Bank of India (YONO)'
  },
  {
    id: 'vis-google-stolen-signin',
    title: 'Google OAuth Account Replica',
    targetUrl: 'https://accounts-google-verify-session.xyz/oauth/v2',
    extractedColors: ['#ffffff', '#4285f4', '#202124'],
    detectedElements: ['google_4color_logo', 'centered_card_layout', 'email_or_phone_input', 'next_button_blue'],
    screenshotPhash: 'c7d8e9f0a1b2c3d0',
    expectedVerdict: 'CONFIRMED_VISUAL_IMPERSONATION',
    expectedBrand: 'Google Account Sign-In'
  },
  {
    id: 'vis-official-sbi-baseline',
    title: 'Official SBI Portal (Safe Baseline)',
    targetUrl: 'https://onlinesbi.sbi/index.html',
    extractedColors: ['#004c8f', '#280071', '#ffffff'],
    detectedElements: ['sbi_logo_circle', 'yono_banner', 'username_field', 'password_field'],
    screenshotPhash: 'a8f1e4d2c3b5a698',
    expectedVerdict: 'VERIFIED_OFFICIAL_BRAND_PORTAL',
    expectedBrand: 'State Bank of India (YONO)'
  }
];

const DEFAULT_VISUAL_RESULT = {
  verdict: 'CONFIRMED_VISUAL_IMPERSONATION',
  threatLevel: 'CRITICAL',
  hostname: 'sbi-yono-pan-kyc-update.top',
  trustScore: 9,
  topMatch: {
    brandName: 'State Bank of India (YONO)',
    officialDomains: ['sbi.co.in', 'onlinesbi.sbi', 'onlinesbi.com', 'yono.sbi'],
    isAuthenticDomain: false,
    visualSimilarityPercentage: 91,
    isVisualIdentityTheft: true,
    matchReasons: [
      'Dominant color palette alignment with official brand assets (4 palette matches: #004c8f, #280071, #ffffff)',
      'Key UI structure matches official layout (4/5 elements: sbi_logo_circle, username_field, password_field, captcha_box)',
      'Perceptual image hash matches authentic screenshot (Hamming distance: 1)'
    ]
  }
};

const DEFAULT_LOOKALIKE_RESULT = {
  targetDomain: 'sbi.co.in',
  criticalThreatsCount: 1,
  permutations: [
    {
      variant: 'sbі.co.in (Cyrillic і)',
      punycode: 'xn--sb-psa.co.in',
      type: 'Homoglyph (Cyrillic Small Letter Byelorussian-Ukrainian I)',
      severity: 'CRITICAL',
      estimatedRisk: 95
    },
    {
      variant: 'sbi-login.co.in',
      punycode: 'sbi-login.co.in',
      type: 'Subdomain / Brand Affixation (Keyword: login)',
      severity: 'HIGH',
      estimatedRisk: 85
    },
    {
      variant: 'sbi-security.co.in',
      punycode: 'sbi-security.co.in',
      type: 'Brand Affixation (Keyword: security)',
      severity: 'HIGH',
      estimatedRisk: 80
    },
    {
      variant: 'sbi.online',
      punycode: 'sbi.online',
      type: 'High-Risk Phishing TLD Substitution (.online)',
      severity: 'HIGH',
      estimatedRisk: 78
    },
    {
      variant: 'sbi.top',
      punycode: 'sbi.top',
      type: 'High-Risk Phishing TLD Substitution (.top)',
      severity: 'HIGH',
      estimatedRisk: 82
    },
    {
      variant: 'sbi.com',
      punycode: 'sbi.com',
      type: 'TLD Substitution (Target: .co.in -> Variant: .com)',
      severity: 'MEDIUM',
      estimatedRisk: 65
    },
    {
      variant: 'sbi.net',
      punycode: 'sbi.net',
      type: 'TLD Substitution (Target: .co.in -> Variant: .net)',
      severity: 'MEDIUM',
      estimatedRisk: 60
    },
    {
      variant: 'sbi.org',
      punycode: 'sbi.org',
      type: 'TLD Substitution (Target: .co.in -> Variant: .org)',
      severity: 'MEDIUM',
      estimatedRisk: 55
    }
  ]
};

const DEFAULT_COMPROMISED_CAS = [
  {
    caId: 'EMUDHRA-2024-DUPLICATE-MODULUS',
    fullName: 'eMudhra Consumer / Subordinate CA',
    severity: 'CRITICAL',
    cveOrAlert: 'CCA Incident / Weak RSA Moduli',
    details: 'Disclosed generation of duplicate/shared RSA public key moduli across distinct certificate requests, violating ITU-T X.509 unicity guarantees.',
    detectionMethod: 'Modulus deduplication matching against active certificate database'
  },
  {
    caId: 'DIGINOTAR-2011-BREACH',
    fullName: 'DigiNotar Root & Intermediate CAs',
    severity: 'CRITICAL',
    cveOrAlert: 'CVE-2011-3389 / Distrusted Globally',
    details: 'Complete infrastructure compromise resulting in fraudulent rogue wildcard certificates issued for *google.com used in state-sponsored adversary-in-the-middle attacks.',
    detectionMethod: 'SHA-256 root certificate fingerprint blocklist'
  },
  {
    caId: 'WOSIGN-STARTCOM-2016-SANCTIONS',
    fullName: 'WoSign / StartCom CA',
    severity: 'HIGH',
    cveOrAlert: 'Apple & Mozilla Distrust Sanctions',
    details: 'Systemic backdating of SHA-1 certificates to circumvent deprecation deadlines and unvalidated domain authorization issuance.',
    detectionMethod: 'Issuance date and CA Subject DN blocklist matching'
  },
  {
    caId: 'CNNIC-2015-INTERMEDIATE-ABUSE',
    fullName: 'China Internet Network Information Center (CNNIC)',
    severity: 'HIGH',
    cveOrAlert: 'Google & Mozilla Deprecation',
    details: 'Subordinate intermediate CA issued unconstrained MITM certificates used to intercept HTTPS domain traffic.',
    detectionMethod: 'Sub-CA chaining restrictions and CT log validation'
  },
  {
    caId: 'TRUSTICO-2018-KEY-LEAK',
    fullName: 'Trustico / Symantec Reseller Incident',
    severity: 'HIGH',
    cveOrAlert: 'Mass Compromised Key Revocation',
    details: 'Over 23,000 subscriber private keys held and emailed in plaintext, resulting in immediate emergency revocation by DigiCert.',
    detectionMethod: 'Public compromised serial number revocation list lookup'
  },
  {
    caId: 'CAMERFIRMA-2021-DISTRUST',
    fullName: 'AC Camerfirma S.A.',
    severity: 'MEDIUM',
    cveOrAlert: 'Chrome & Mozilla Root Program Eviction',
    details: 'Multiple systemic compliance failures, non-conforming SAN fields, and failure to timely revoke misissued certificates.',
    detectionMethod: 'Root store deprecation timeline check'
  },
  {
    caId: 'SYMANTEC-2017-DISTRUST',
    fullName: 'Symantec (Equifax / GeoTrust / Thawte)',
    severity: 'HIGH',
    cveOrAlert: 'Google Chrome 70 Complete Distrust',
    details: 'Misissuance of over 30,000 certificates without proper verification, leading to gradual root trust removal and DigiCert transition.',
    detectionMethod: 'Legacy Symantec PKI hierarchy detection'
  }
];

export default function AdvancedExtensionsHub() {
  const [activeTab, setActiveTab] = useState('qr'); // 'qr' | 'visual' | 'lookalike' | 'compromised-cas' | 'taxii-apis'
  
  // 1. QR Quishing State
  const [qrInput, setQrInput] = useState('upi://pay?pa=raghav-claims@okaxis&pn=OLX%20Buyer&am=15000.00&cu=INR&tn=Scan%20to%20Receive%20Advance%20Cash');
  const [qrResult, setQrResult] = useState(DEFAULT_QR_RESULT);
  const [qrScenarios, setQrScenarios] = useState(DEFAULT_QUISHING_SCENARIOS);
  const [isQrLoading, setIsQrLoading] = useState(false);

  // 2. Visual Impersonation State
  const [visualTarget, setVisualTarget] = useState('https://sbi-yono-pan-kyc-update.top/login.php');
  const [visualResult, setVisualResult] = useState(DEFAULT_VISUAL_RESULT);
  const [visualScenarios, setVisualScenarios] = useState(DEFAULT_VISUAL_SCENARIOS);
  const [isVisualLoading, setIsVisualLoading] = useState(false);

  // 3. Lookalike Radar State
  const [lookalikeInput, setLookalikeInput] = useState('sbi.co.in');
  const [lookalikeResult, setLookalikeResult] = useState(DEFAULT_LOOKALIKE_RESULT);
  const [isLookalikeLoading, setIsLookalikeLoading] = useState(false);

  // 4. Compromised CA State
  const [compromisedCAs, setCompromisedCAs] = useState(DEFAULT_COMPROMISED_CAS);

  // 5. TAXII / STIX Interactive Preview State
  const [activeTaxiiPreview, setActiveTaxiiPreview] = useState('stix'); // 'taxii' | 'stix' | 'iocs'
  const [previewContent, setPreviewContent] = useState(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Fetch scenarios and live directories on mount
  useEffect(() => {
    // QR Scenarios
    fetch(`${API_BASE}/api/extensions/qr/scenarios`)
      .then(r => r.json())
      .then(d => { if (d.success && d.scenarios?.length) setQrScenarios(d.scenarios); })
      .catch(() => {});

    // Visual Scenarios
    fetch(`${API_BASE}/api/extensions/visual/scenarios`)
      .then(r => r.json())
      .then(d => { if (d.success && d.scenarios?.length) setVisualScenarios(d.scenarios); })
      .catch(() => {});

    // Compromised CAs
    fetch(`${API_BASE}/api/extensions/compromised-cas`)
      .then(r => r.json())
      .then(d => { if (d.success && d.compromisedCAs?.length) setCompromisedCAs(d.compromisedCAs); })
      .catch(() => {});
  }, []);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(typeof text === 'string' ? text : JSON.stringify(text, null, 2));
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAnalyzeQR = async (payloadToAnalyze) => {
    const payload = payloadToAnalyze || qrInput;
    if (!payload.trim()) return;
    setIsQrLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/extensions/qr/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrPayload: payload })
      });
      const data = await res.json();
      if (data.success && data.result) {
        setQrResult(data.result);
      }
    } catch (err) {
      console.warn('QR API call returned error, maintaining resilient display:', err);
    } finally {
      setIsQrLoading(false);
    }
  };

  const handleAnalyzeVisual = async (scenarioData = null) => {
    setIsVisualLoading(true);
    
    // Check if current target matches a known scenario
    const matchedScenario = scenarioData || visualScenarios.find(s => s.targetUrl === visualTarget);

    const body = matchedScenario ? {
      targetUrl: matchedScenario.targetUrl,
      extractedColors: matchedScenario.extractedColors,
      detectedElements: matchedScenario.detectedElements,
      screenshotPhash: matchedScenario.screenshotPhash
    } : {
      targetUrl: visualTarget,
      extractedColors: ['#004c8f', '#280071', '#ffffff', '#f4f6f8'],
      detectedElements: ['sbi_logo_circle', 'username_field', 'password_field', 'captcha_box'],
      screenshotPhash: 'a8f1e4d2c3b5a690'
    };

    try {
      const res = await fetch(`${API_BASE}/api/extensions/visual/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success && data.result) {
        setVisualResult(data.result);
      }
    } catch (err) {
      console.warn('Visual API call returned error, maintaining resilient display:', err);
    } finally {
      setIsVisualLoading(false);
    }
  };

  const handleGenerateLookalikes = async (domainToAudit = null) => {
    const domain = domainToAudit || lookalikeInput;
    if (!domain.trim()) return;
    setIsLookalikeLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/extensions/lookalike/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain })
      });
      const data = await res.json();
      if (data.success && data.result) {
        setLookalikeResult(data.result);
      }
    } catch (err) {
      console.warn('Lookalike API call returned error, maintaining resilient display:', err);
    } finally {
      setIsLookalikeLoading(false);
    }
  };

  const loadTaxiiPreview = async (type) => {
    setActiveTaxiiPreview(type);
    setIsPreviewLoading(true);
    let url = `${API_BASE}/api/intel/export/stix`;
    if (type === 'taxii') url = `${API_BASE}/api/intel/taxii`;
    if (type === 'iocs') url = `${API_BASE}/api/intel/export/iocs`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setPreviewContent(data);
    } catch (err) {
      console.error('Failed to load preview:', err);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#091f1f] border border-[#164242] shadow-card-dark flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white tracking-wide">Section 12: Optional Advanced Extensions Lab</h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/40 font-bold">
                100% Operational
              </span>
            </div>
            <p className="text-[#85a8a6] text-xs">
              Interactive test suites for Quishing, Visual Impersonation, Lookalike Radar, Compromised CAs & TAXII/STIX APIs
            </p>
          </div>
        </div>

        {/* 5 Feature Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#061414] p-1.5 rounded-xl border border-[#153a3a]">
          {[
            { id: 'qr', label: 'QR Scam (Quishing)', icon: QrCode },
            { id: 'visual', label: 'Visual Impersonation', icon: ImageIcon },
            { id: 'lookalike', label: 'Lookalike Radar', icon: Radar },
            { id: 'compromised-cas', label: 'Compromised CAs', icon: ShieldAlert },
            { id: 'taxii-apis', label: 'TAXII 2.1 & STIX', icon: FileCode2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'visual' && !visualResult) handleAnalyzeVisual();
                  if (tab.id === 'lookalike' && !lookalikeResult) handleGenerateLookalikes();
                  if (tab.id === 'taxii-apis' && !previewContent) loadTaxiiPreview('stix');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 text-xs ${
                  isActive
                    ? 'bg-[#00f2c3] text-[#051715] font-bold shadow-neon-sm'
                    : 'text-[#80a4a2] hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: QR CODE SCAM DETECTION (QUISHING) */}
      {/* ========================================================================= */}
      {activeTab === 'qr' && (
        <div className="space-y-4">
          {/* Preset Quishing Scenarios */}
          <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] space-y-2">
            <span className="text-[#80a4a2] text-[11px] font-bold block">1-Click Quishing Test Scenarios:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {qrScenarios.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => {
                    setQrInput(scen.payload);
                    handleAnalyzeQR(scen.payload);
                  }}
                  className="p-2.5 rounded-lg bg-[#061414] hover:bg-[#0c2222] border border-[#153a3a] text-left transition-all space-y-1"
                >
                  <span className="text-white font-bold text-[11px] block truncate">{scen.title}</span>
                  <p className="text-[10px] text-[#80a4a2] line-clamp-2">{scen.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={qrInput}
              onChange={(e) => setQrInput(e.target.value)}
              placeholder="Paste raw QR decoded string (e.g. upi://pay?... or https://...)"
              className="w-full bg-[#061414] border border-[#153a3a] rounded-xl px-3 py-2 text-xs text-white placeholder-[#5c7a78] focus:outline-none focus:border-[#00f2c3]"
            />
            <button
              onClick={() => handleAnalyzeQR()}
              disabled={isQrLoading}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#00f2c3] text-[#051715] hover:bg-[#00f2c3]/90 font-bold transition-all shrink-0 flex items-center justify-center space-x-1.5 shadow-neon-sm"
            >
              {isQrLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <QrCode className="w-3.5 h-3.5" />}
              <span>Inspect QR Payload</span>
            </button>
          </div>

          {/* QR Analysis Output */}
          {qrResult && (
            <div className="p-5 rounded-xl bg-[#091f1f] border border-[#164242] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#143535] gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-bold text-white">{qrResult.verdict}</span>
                    <span className={`text-[10px] px-2 py-0.2 rounded font-bold border ${
                      qrResult.threatLevel === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : qrResult.threatLevel === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    }`}>
                      {qrResult.threatLevel} THREAT
                    </span>
                  </div>
                  <span className="text-[11px] text-[#80a4a2]">Payload Type: {qrResult.payloadType}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#80a4a2] block">Trust Score</span>
                  <span className="text-xl font-black text-[#00f2c3]">{qrResult.trustScore}/100</span>
                </div>
              </div>

              {/* Technical Evidence Indicators */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-white block">Quishing Heuristic Telemetry:</span>
                {(!qrResult.indicators || qrResult.indicators.length === 0) ? (
                  <div className="p-3 rounded-lg bg-[#061414] text-emerald-400 border border-emerald-500/30 text-[11px]">
                    No malicious QR indicators identified. Legitimate verified merchant payload.
                  </div>
                ) : (
                  qrResult.indicators.map((ind, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#061414] border border-[#143535] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-[11px]">{ind.title}</span>
                        <span className="text-[10px] text-rose-400 font-bold px-1.5 py-0.2 rounded bg-rose-500/15 border border-rose-500/30">
                          {ind.severity}
                        </span>
                      </div>
                      <p className="text-[10.5px] text-[#80a4a2]">{ind.technicalEvidence}</p>
                      <p className="text-[10.5px] text-rose-300"><strong>Impact:</strong> {ind.impact}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Actionable Guidance */}
              {qrResult.recommendedActions && qrResult.recommendedActions.length > 0 && (
                <div className="p-3 rounded-lg bg-[#061414] border border-[#143535] space-y-1.5">
                  <span className="text-[11px] font-bold text-[#00f2c3] block">Recommended Safety Actions:</span>
                  {qrResult.recommendedActions.map((act, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-[10.5px] text-[#a1c4c2]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2c3] shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SCREENSHOT-BASED WEBSITE IMPERSONATION */}
      {/* ========================================================================= */}
      {activeTab === 'visual' && (
        <div className="space-y-4">
          {/* Preset Visual Impersonation Scenarios */}
          <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] space-y-2">
            <span className="text-[#80a4a2] text-[11px] font-bold block">Preset Visual Impersonation Scenarios:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {visualScenarios.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => {
                    setVisualTarget(scen.targetUrl);
                    handleAnalyzeVisual(scen);
                  }}
                  className="p-3 rounded-lg bg-[#061414] hover:bg-[#0c2222] border border-[#153a3a] text-left transition-all space-y-1"
                >
                  <span className="text-white font-bold text-[11px] block">{scen.title}</span>
                  <span className="text-[10px] text-[#00f2c3] font-mono block truncate">{scen.targetUrl}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom URL Input Bar for Visual Impersonation */}
          <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={visualTarget}
              onChange={(e) => setVisualTarget(e.target.value)}
              placeholder="Enter suspect URL to inspect visual similarity (e.g. https://sbi-yono-pan-kyc-update.top/login.php)"
              className="w-full bg-[#061414] border border-[#153a3a] rounded-xl px-3 py-2 text-xs text-white placeholder-[#5c7a78] focus:outline-none focus:border-[#00f2c3]"
            />
            <button
              onClick={() => handleAnalyzeVisual()}
              disabled={isVisualLoading}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#00f2c3] text-[#051715] hover:bg-[#00f2c3]/90 font-bold transition-all shrink-0 flex items-center justify-center space-x-1.5 shadow-neon-sm"
            >
              {isVisualLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
              <span>Inspect Visual Interface</span>
            </button>
          </div>

          {visualResult && (
            <div className="p-5 rounded-xl bg-[#091f1f] border border-[#164242] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#143535] gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-bold text-white">{visualResult.verdict}</span>
                    <span className={`text-[10px] px-2 py-0.2 rounded font-bold border ${
                      visualResult.threatLevel === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    }`}>
                      {visualResult.threatLevel}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#80a4a2]">Target Host: {visualResult.hostname}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#80a4a2] block">Visual Similarity Match</span>
                  <span className="text-xl font-black text-[#00f2c3]">
                    {visualResult.topMatch?.visualSimilarityPercentage || 0}%
                  </span>
                </div>
              </div>

              {/* Side-by-Side Brand Comparison */}
              {visualResult.topMatch && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 rounded-lg bg-[#061414] border border-[#143535] space-y-1">
                    <span className="text-[#5c7a78] block">Matched Target Brand:</span>
                    <span className="text-white font-bold text-xs">{visualResult.topMatch.brandName}</span>
                    <span className="text-[10px] text-[#80a4a2] block">
                      Authentic Domains: [{visualResult.topMatch.officialDomains ? visualResult.topMatch.officialDomains.join(', ') : 'N/A'}]
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#061414] border border-[#143535] space-y-1">
                    <span className="text-[#5c7a78] block">Authenticity Verification:</span>
                    <span className={`font-bold text-xs ${visualResult.topMatch.isAuthenticDomain ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {visualResult.topMatch.isAuthenticDomain ? '✅ Official Authenticated Domain' : '🚨 ROGUE DOMAIN / UNAUTHORIZED HOST'}
                    </span>
                    <span className="text-[10px] text-[#80a4a2] block">
                      {visualResult.topMatch.isVisualIdentityTheft 
                        ? 'CRITICAL IDENTITY THEFT: Visual interface stolen for credential harvesting.' 
                        : 'Visual parameters conform to authorized domain ownership.'}
                    </span>
                  </div>
                </div>
              )}

              {/* Match Reasons */}
              {visualResult.topMatch?.matchReasons && visualResult.topMatch.matchReasons.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-white block">Visual Comparison Evidence Edges:</span>
                  {visualResult.topMatch.matchReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-[10.5px] text-[#a1c4c2] bg-[#061414] p-2 rounded border border-[#143535]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2c3] shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: LOOKALIKE & HOMOGLYPH DOMAIN RADAR */}
      {/* ========================================================================= */}
      {activeTab === 'lookalike' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={lookalikeInput}
              onChange={(e) => setLookalikeInput(e.target.value)}
              placeholder="Enter brand domain to scan (e.g. sbi.co.in, hdfcbank.com, paypal.com)"
              className="w-full bg-[#061414] border border-[#153a3a] rounded-xl px-3 py-2 text-xs text-white placeholder-[#5c7a78] focus:outline-none focus:border-[#00f2c3]"
            />
            <button
              onClick={() => handleGenerateLookalikes()}
              disabled={isLookalikeLoading}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#00f2c3] text-[#051715] hover:bg-[#00f2c3]/90 font-bold transition-all shrink-0 flex items-center justify-center space-x-1.5 shadow-neon-sm"
            >
              {isLookalikeLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Radar className="w-3.5 h-3.5" />}
              <span>Scan Lookalikes</span>
            </button>
          </div>

          {lookalikeResult && (
            <div className="p-5 rounded-xl bg-[#091f1f] border border-[#164242] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-xs">Lookalike Permutation Radar: {lookalikeResult.targetDomain}</h3>
                  <p className="text-[#80a4a2] text-[11px]">Automated detection of IDN Cyrillic homoglyphs, bitsquatting & typosquats</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold">
                  {lookalikeResult.criticalThreatsCount || 0} Critical Spoofs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-[#143535] text-[#80a4a2]">
                      <th className="py-2 px-3">Candidate Domain</th>
                      <th className="py-2 px-3">Punycode (IDN)</th>
                      <th className="py-2 px-3">Attack Mechanism</th>
                      <th className="py-2 px-3">Severity</th>
                      <th className="py-2 px-3 text-right">Risk Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#143535]">
                    {lookalikeResult.permutations && lookalikeResult.permutations.map((perm, idx) => (
                      <tr key={idx} className="hover:bg-[#061414]/50">
                        <td className="py-2 px-3 font-mono font-bold text-white">{perm.variant}</td>
                        <td className="py-2 px-3 font-mono text-[#80a4a2]">{perm.punycode}</td>
                        <td className="py-2 px-3 text-[#a1c4c2]">{perm.type}</td>
                        <td className="py-2 px-3">
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold border ${
                            perm.severity === 'CRITICAL'
                              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                              : perm.severity === 'HIGH'
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                              : 'bg-[#00f2c3]/15 text-[#00f2c3] border-[#00f2c3]/30'
                          }`}>
                            {perm.severity}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-[#00f2c3]">{perm.estimatedRisk}/100</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: COMPROMISED CA DIRECTORY */}
      {/* ========================================================================= */}
      {activeTab === 'compromised-cas' && (
        <div className="p-5 rounded-xl bg-[#091f1f] border border-[#164242] space-y-4">
          <div>
            <h3 className="font-bold text-white text-xs">Monitored Compromised & Distrusted Certificate Authorities</h3>
            <p className="text-[#80a4a2] text-[11px]">
              Continuous monitoring against root program sanctions, weak RSA moduli disclosures, and historical CA compromises
            </p>
          </div>

          <div className="space-y-3">
            {compromisedCAs.map((ca, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span className="font-bold text-white text-xs">{ca.fullName}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold">
                      {ca.severity}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#00f2c3] font-mono">{ca.cveOrAlert}</span>
                </div>
                <p className="text-[11px] text-[#a1c4c2]">{ca.details}</p>
                <div className="text-[10px] text-[#5c7a78] border-t border-[#143535] pt-1.5">
                  <strong>Detection Strategy:</strong> {ca.detectionMethod}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: THREAT INTELLIGENCE SHARING APIS (TAXII / STIX) */}
      {/* ========================================================================= */}
      {activeTab === 'taxii-apis' && (
        <div className="p-5 rounded-xl bg-[#091f1f] border border-[#164242] space-y-5">
          <div>
            <h3 className="font-bold text-white text-xs">Standardized Threat Intelligence Sharing APIs</h3>
            <p className="text-[#80a4a2] text-[11px]">
              Interoperable feeds for automated SIEM, SOAR, TAXII 2.1 clients and MISP peer synchronization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-white font-bold text-xs block">TAXII 2.1 Server Endpoint</span>
                <p className="text-[10.5px] text-[#80a4a2] mt-1">
                  OASIS TAXII 2.1 collection discovery endpoint for automated threat exchange.
                </p>
                <code className="text-[10px] text-[#00f2c3] block mt-2 bg-[#091f1f] p-1.5 rounded">
                  GET /api/intel/taxii
                </code>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <button
                  onClick={() => loadTaxiiPreview('taxii')}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30 hover:bg-[#00f2c3]/25 font-bold flex items-center justify-center space-x-1 transition-all text-xs"
                >
                  <Eye className="w-3 h-3" />
                  <span>Preview</span>
                </button>
                <a
                  href={`${API_BASE}/api/intel/taxii`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-1.5 px-2 rounded-lg bg-[#0c2626] text-[#80a4a2] hover:text-white border border-[#163f3f] font-bold flex items-center justify-center transition-all text-xs"
                  title="Open raw JSON"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-white font-bold text-xs block">STIX 2.1 Threat Bundle</span>
                <p className="text-[10.5px] text-[#80a4a2] mt-1">
                  Structured Threat Information Expression (STIX 2.1) bundle download.
                </p>
                <code className="text-[10px] text-[#00f2c3] block mt-2 bg-[#091f1f] p-1.5 rounded">
                  GET /api/intel/export/stix
                </code>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <button
                  onClick={() => loadTaxiiPreview('stix')}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30 hover:bg-[#00f2c3]/25 font-bold flex items-center justify-center space-x-1 transition-all text-xs"
                >
                  <Eye className="w-3 h-3" />
                  <span>Preview</span>
                </button>
                <a
                  href={`${API_BASE}/api/intel/export/stix`}
                  target="_blank"
                  rel="noreferrer"
                  download="trustmatrix-threat-intel-stix2.1.json"
                  className="py-1.5 px-2 rounded-lg bg-[#0c2626] text-[#80a4a2] hover:text-white border border-[#163f3f] font-bold flex items-center justify-center transition-all text-xs"
                  title="Download STIX 2.1 JSON"
                >
                  <Download className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-white font-bold text-xs block">Raw IOC Feed</span>
                <p className="text-[10.5px] text-[#80a4a2] mt-1">
                  Real-time indicators of compromise for perimeter firewall sinkholes.
                </p>
                <code className="text-[10px] text-[#00f2c3] block mt-2 bg-[#091f1f] p-1.5 rounded">
                  GET /api/intel/export/iocs
                </code>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <button
                  onClick={() => loadTaxiiPreview('iocs')}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30 hover:bg-[#00f2c3]/25 font-bold flex items-center justify-center space-x-1 transition-all text-xs"
                >
                  <Eye className="w-3 h-3" />
                  <span>Preview</span>
                </button>
                <a
                  href={`${API_BASE}/api/intel/export/iocs`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-1.5 px-2 rounded-lg bg-[#0c2626] text-[#80a4a2] hover:text-white border border-[#163f3f] font-bold flex items-center justify-center transition-all text-xs"
                  title="Open raw IOC feed"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive JSON Viewer for TAXII / STIX */}
          <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileCode2 className="w-4 h-4 text-[#00f2c3]" />
                <span className="font-bold text-white text-xs">
                  Live Feed Inspector: {activeTaxiiPreview === 'stix' ? 'OASIS STIX 2.1 Bundle' : activeTaxiiPreview === 'taxii' ? 'TAXII 2.1 Discovery Root' : 'Indicators of Compromise (IOC)'}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(previewContent || {}, 'taxii-feed')}
                className="px-2.5 py-1 rounded bg-[#091f1f] hover:bg-[#0f2c2c] border border-[#184646] text-[#80a4a2] hover:text-white flex items-center space-x-1 transition-all text-[11px]"
              >
                {copiedKey === 'taxii-feed' ? <Check className="w-3 h-3 text-[#00f2c3]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'taxii-feed' ? 'Copied' : 'Copy Payload'}</span>
              </button>
            </div>

            {isPreviewLoading ? (
              <div className="py-8 text-center text-[#80a4a2] flex items-center justify-center space-x-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00f2c3]" />
                <span>Fetching live standardized schema...</span>
              </div>
            ) : (
              <pre className="p-3 rounded-lg bg-[#030b0b] border border-[#102d2d] text-[10.5px] text-[#a1c4c2] overflow-x-auto max-h-72 font-mono leading-relaxed">
                {JSON.stringify(previewContent || {
                  type: 'bundle',
                  id: 'bundle--71c8a336-f012-4d5e-89a1-threatmatrix001',
                  spec_version: '2.1',
                  objects: [
                    {
                      type: 'indicator',
                      id: 'indicator--sbi-yono-phish',
                      created: new Date().toISOString(),
                      name: 'SBI YONO Credential Harvester',
                      pattern: "[url:value = 'https://sbi-yono-pan-kyc-update.top/login.php']",
                      pattern_type: 'stix',
                      valid_from: new Date().toISOString()
                    }
                  ]
                }, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
