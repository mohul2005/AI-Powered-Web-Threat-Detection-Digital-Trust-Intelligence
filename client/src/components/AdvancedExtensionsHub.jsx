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
  ArrowRight
} from 'lucide-react';
import { API_BASE } from '../config/api.js';

export default function AdvancedExtensionsHub() {
  const [activeTab, setActiveTab] = useState('qr'); // 'qr' | 'visual' | 'lookalike' | 'compromised-cas' | 'taxii-apis'
  
  // 1. QR Quishing State
  const [qrInput, setQrInput] = useState('upi://pay?pa=raghav-claims@okaxis&pn=OLX%20Buyer&am=15000.00&cu=INR&tn=Scan%20to%20Receive%20Advance%20Cash');
  const [qrResult, setQrResult] = useState(null);
  const [qrScenarios, setQrScenarios] = useState([]);
  const [isQrLoading, setIsQrLoading] = useState(false);

  // 2. Visual Impersonation State
  const [visualTarget, setVisualTarget] = useState('https://sbi-yono-pan-kyc-update.top/login.php');
  const [visualResult, setVisualResult] = useState(null);
  const [visualScenarios, setVisualScenarios] = useState([]);
  const [isVisualLoading, setIsVisualLoading] = useState(false);

  // 3. Lookalike Radar State
  const [lookalikeInput, setLookalikeInput] = useState('sbi.co.in');
  const [lookalikeResult, setLookalikeResult] = useState(null);
  const [isLookalikeLoading, setIsLookalikeLoading] = useState(false);

  // 4. Compromised CA State
  const [compromisedCAs, setCompromisedCAs] = useState([]);

  // Fetch scenarios and directories on mount
  useEffect(() => {
    // QR Scenarios
    fetch(`${API_BASE}/api/extensions/qr/scenarios`)
      .then(r => r.json())
      .then(d => { if (d.success) setQrScenarios(d.scenarios); })
      .catch(console.error);

    // Visual Scenarios
    fetch(`${API_BASE}/api/extensions/visual/scenarios`)
      .then(r => r.json())
      .then(d => { if (d.success) setVisualScenarios(d.scenarios); })
      .catch(console.error);

    // Compromised CAs
    fetch(`${API_BASE}/api/extensions/compromised-cas`)
      .then(r => r.json())
      .then(d => { if (d.success) setCompromisedCAs(d.compromisedCAs); })
      .catch(console.error);

    // Initial QR Analysis
    handleAnalyzeQR('upi://pay?pa=raghav-claims@okaxis&pn=OLX%20Buyer&am=15000.00&cu=INR&tn=Scan%20to%20Receive%20Advance%20Cash');
  }, []);

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
      if (data.success) {
        setQrResult(data.result);
      }
    } catch (err) {
      console.error('Failed to analyze QR:', err);
    } finally {
      setIsQrLoading(false);
    }
  };

  const handleAnalyzeVisual = async (scenarioData = null) => {
    setIsVisualLoading(true);
    const body = scenarioData || {
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
      if (data.success) {
        setVisualResult(data.result);
      }
    } catch (err) {
      console.error('Failed to analyze visual impersonation:', err);
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
      if (data.success) {
        setLookalikeResult(data.result);
      }
    } catch (err) {
      console.error('Failed to generate lookalikes:', err);
    } finally {
      setIsLookalikeLoading(false);
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
                {qrResult.indicators.length === 0 ? (
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
              <div className="p-3 rounded-lg bg-[#061414] border border-[#143535] space-y-1.5">
                <span className="text-[11px] font-bold text-[#00f2c3] block">Recommended Safety Actions:</span>
                {qrResult.recommendedActions.map((act, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-[10.5px] text-[#a1c4c2]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2c3] shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SCREENSHOT-BASED WEBSITE IMPERSONATION */}
      {/* ========================================================================= */}
      {activeTab === 'visual' && (
        <div className="space-y-4">
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
                      Authentic Domains: [{visualResult.topMatch.officialDomains.join(', ')}]
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
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-white block">Visual Comparison Evidence Edges:</span>
                {visualResult.topMatch?.matchReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-[10.5px] text-[#a1c4c2] bg-[#061414] p-2 rounded border border-[#143535]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2c3] shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
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
                  {lookalikeResult.criticalThreatsCount} Critical Spoofs
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
                    {lookalikeResult.permutations.map((perm, idx) => (
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
        <div className="p-5 rounded-xl bg-[#091f1f] border border-[#164242] space-y-4">
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
              <a
                href={`${API_BASE}/api/intel/taxii`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 py-1.5 px-3 rounded-lg bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30 hover:bg-[#00f2c3]/25 font-bold flex items-center justify-center space-x-1 transition-all text-xs"
              >
                <span>Query TAXII 2.1</span>
                <ExternalLink className="w-3 h-3" />
              </a>
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
              <a
                href={`${API_BASE}/api/intel/export/stix`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 py-1.5 px-3 rounded-lg bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30 hover:bg-[#00f2c3]/25 font-bold flex items-center justify-center space-x-1 transition-all text-xs"
              >
                <span>Download STIX 2.1</span>
                <ExternalLink className="w-3 h-3" />
              </a>
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
              <a
                href={`${API_BASE}/api/intel/export/iocs`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 py-1.5 px-3 rounded-lg bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30 hover:bg-[#00f2c3]/25 font-bold flex items-center justify-center space-x-1 transition-all text-xs"
              >
                <span>View IOC Feed</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
