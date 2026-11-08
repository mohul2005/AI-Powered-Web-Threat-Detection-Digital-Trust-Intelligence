import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  Globe, 
  BellRing, 
  RefreshCw, 
  Download, 
  Lock, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export default function OrganisationDashboard() {
  const [selectedDomain, setSelectedDomain] = useState('sbi.co.in');
  const [customDomain, setCustomDomain] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'lookalikes' | 'ct-alerts' | 'headers'

  const enterprisePresets = [
    { domain: 'sbi.co.in', name: 'State Bank of India', sector: 'Public Sector Banking' },
    { domain: 'hdfcbank.com', name: 'HDFC Bank', sector: 'Private Commercial Banking' },
    { domain: 'antigravity.io', name: 'Antigravity Labs', sector: 'Decentralized Tech' }
  ];

  const fetchDashboard = async (domainToFetch) => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/extensions/org-dashboard/${domainToFetch}`);
      const data = await res.json();
      if (data.success) {
        setDashboardData(data);
      }
    } catch (err) {
      console.error('Failed to load org dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard(selectedDomain);
  }, [selectedDomain]);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customDomain.trim()) {
      setSelectedDomain(customDomain.trim());
      setCustomDomain('');
    }
  };

  const handleDownloadReport = () => {
    if (!dashboardData) return;
    const blob = new Blob([JSON.stringify(dashboardData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `org-security-audit-${dashboardData.organizationDomain}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-mono text-xs animate-fade-in">
      {/* Top Banner & Domain Selector */}
      <div className="p-6 rounded-2xl bg-[#091f1f] border border-[#164242] shadow-card-dark flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-[#00f2c3]/15 border border-[#00f2c3]/40 text-[#00f2c3]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white tracking-wide">Enterprise Security & Brand Protection Center</h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/40 font-bold">
                  SOC Extension
                </span>
              </div>
              <p className="text-[#85a8a6] text-xs">
                Continuous external attack surface auditing, Certificate Transparency log alerts & lookalike radar
              </p>
            </div>
          </div>
        </div>

        {/* Monitored Presets & Custom Domain Input */}
        <div className="flex flex-wrap items-center gap-2">
          {enterprisePresets.map((preset) => (
            <button
              key={preset.domain}
              onClick={() => setSelectedDomain(preset.domain)}
              className={`px-3 py-1.5 rounded-xl border text-xs transition-all ${
                selectedDomain === preset.domain
                  ? 'bg-[#00f2c3] text-[#051715] font-bold border-[#00f2c3] shadow-neon-sm'
                  : 'bg-[#061414] text-[#80a4a2] border-[#153a3a] hover:border-[#1e4a4a]'
              }`}
            >
              {preset.domain}
            </button>
          ))}

          <form onSubmit={handleCustomSubmit} className="flex items-center space-x-1.5">
            <input
              type="text"
              placeholder="e.g. company.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className="bg-[#061414] border border-[#153a3a] rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-[#5c7a78] focus:outline-none focus:border-[#00f2c3]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-[#00f2c3]/20 hover:bg-[#00f2c3]/30 border border-[#00f2c3]/40 text-[#00f2c3] text-xs font-bold transition-all"
            >
              Monitor
            </button>
          </form>
        </div>
      </div>

      {isLoading && (
        <div className="p-12 text-center text-[#80a4a2] flex items-center justify-center space-x-2">
          <RefreshCw className="w-4 h-4 animate-spin text-[#00f2c3]" />
          <span>Auditing enterprise digital attack surface for {selectedDomain}...</span>
        </div>
      )}

      {dashboardData && !isLoading && (
        <>
          {/* Executive Posture KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Posture Score */}
            <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] shadow-card-dark space-y-1">
              <span className="text-[10px] text-[#80a4a2] uppercase tracking-wider block">Security Posture Score</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{dashboardData.orgPostureScore}<span className="text-xs text-[#80a4a2]">/100</span></span>
                <span className={`text-xs px-2 py-0.5 rounded font-bold border ${
                  dashboardData.postureGrade === 'A' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : dashboardData.postureGrade === 'B'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  Grade {dashboardData.postureGrade}
                </span>
              </div>
              <p className="text-[10px] text-[#80a4a2] pt-1">Automated non-linear risk rating</p>
            </div>

            {/* CT Log Alerts */}
            <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] shadow-card-dark space-y-1">
              <span className="text-[10px] text-[#80a4a2] uppercase tracking-wider block">Active CT Log Alerts</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-[#00f2c3]">{dashboardData.attackSurfaceMetrics.ctAlertsCount}</span>
                <span className="text-xs px-2 py-0.5 rounded font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                  {dashboardData.attackSurfaceMetrics.criticalAlertsCount} Critical
                </span>
              </div>
              <p className="text-[10px] text-[#80a4a2] pt-1">Suspicious cert issuances detected</p>
            </div>

            {/* Lookalike Radar */}
            <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] shadow-card-dark space-y-1">
              <span className="text-[10px] text-[#80a4a2] uppercase tracking-wider block">Lookalike Radar</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{dashboardData.attackSurfaceMetrics.lookalikesDetected}</span>
                <span className="text-xs px-2 py-0.5 rounded font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  {dashboardData.attackSurfaceMetrics.highRiskTyposquatsCount} High Risk
                </span>
              </div>
              <p className="text-[10px] text-[#80a4a2] pt-1">Homoglyphs, bitsquats & TLD swaps</p>
            </div>

            {/* Attack Surface Coverage */}
            <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] shadow-card-dark space-y-1">
              <span className="text-[10px] text-[#80a4a2] uppercase tracking-wider block">Attack Surface Assets</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">{dashboardData.attackSurfaceMetrics.activeSubdomainsDiscovered}</span>
                <span className="text-xs px-2 py-0.5 rounded font-bold bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30">
                  {dashboardData.attackSurfaceMetrics.monitoredLeafCertificates} Active Certs
                </span>
              </div>
              <p className="text-[10px] text-[#80a4a2] pt-1">Public zone discovery</p>
            </div>
          </div>

          {/* Subtabs Navigation */}
          <div className="flex items-center space-x-2 border-b border-[#143838] pb-2">
            {[
              { id: 'overview', label: 'Executive Posture & Remediations' },
              { id: 'ct-alerts', label: `Certificate Transparency Alerts (${dashboardData.attackSurfaceMetrics.ctAlertsCount})` },
              { id: 'lookalikes', label: `Lookalike Domain Radar (${dashboardData.attackSurfaceMetrics.lookalikesDetected})` },
              { id: 'headers', label: 'Security Header Posture' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  activeSubTab === tab.id
                    ? 'bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/40 font-bold'
                    : 'text-[#80a4a2] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <div className="ml-auto">
              <button
                onClick={handleDownloadReport}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#061414] hover:bg-[#0c2222] border border-[#174242] text-[#80a4a2] hover:text-white transition-all text-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#00f2c3]" />
                <span>Export Dossier</span>
              </button>
            </div>
          </div>

          {/* Subtab 1: Executive Overview & Remediations */}
          {activeSubTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] space-y-3">
                <div className="flex items-center space-x-2 text-[#00f2c3]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-bold text-white text-xs">CISO Actionable Remediation Checklist</span>
                </div>
                <div className="space-y-2">
                  {dashboardData.actionableRemediations.map((rem, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[11px] text-[#a1c4c2] bg-[#061414] p-2.5 rounded-lg border border-[#143535]">
                      <span className="text-[#00f2c3] font-bold shrink-0">{idx + 1}.</span>
                      <span>{rem}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] space-y-3">
                <div className="flex items-center space-x-2 text-[#00f2c3]">
                  <Globe className="w-4 h-4" />
                  <span className="font-bold text-white text-xs">Live Monitored Digital Footprint</span>
                </div>
                <div className="space-y-2 text-[11px] text-[#80a4a2]">
                  <div className="flex justify-between py-1 border-b border-[#143535]">
                    <span>Primary Root Domain:</span>
                    <span className="text-white font-bold">{dashboardData.organizationDomain}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#143535]">
                    <span>CT Log Surveillance Stream:</span>
                    <span className="text-[#00f2c3]">Google Argon & Cloudflare Nimbus (Active)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#143535]">
                    <span>Homoglyph / Punycode Defense:</span>
                    <span className="text-emerald-400">Automated Radar Synced</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Audit Compliance Timestamp:</span>
                    <span className="text-white">{new Date(dashboardData.timestamp).toLocaleTimeString()} UTC</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subtab 2: Certificate Transparency Alerts */}
          {activeSubTab === 'ct-alerts' && (
            <div className="space-y-3">
              {dashboardData.ctAlerts.length === 0 ? (
                <div className="p-8 text-center bg-[#091f1f] border border-[#164242] rounded-xl text-[#80a4a2]">
                  No suspicious certificate issuances logged in the last 24 hours.
                </div>
              ) : (
                dashboardData.ctAlerts.map((alert, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-xl bg-[#091f1f] border ${
                      alert.severity === 'CRITICAL' 
                        ? 'border-rose-500/40 bg-rose-500/5' 
                        : alert.severity === 'HIGH'
                        ? 'border-amber-500/40 bg-amber-500/5'
                        : 'border-[#164242]'
                    } space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className={`w-4 h-4 ${alert.severity === 'CRITICAL' ? 'text-rose-400' : 'text-amber-400'}`} />
                        <span className="font-bold text-white text-xs">{alert.anomalyType}</span>
                        <span className={`text-[10px] px-2 py-0.2 rounded font-bold border ${
                          alert.severity === 'CRITICAL'
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#80a4a2]">{alert.ctLogSource} • {new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>

                    <p className="text-[11px] text-[#e2f1f0]">{alert.alertMessage}</p>

                    <div className="p-2.5 rounded-lg bg-[#061414] border border-[#143535] text-[10.5px] text-[#80a4a2] grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <span className="text-[#5c7a78] block">Subject CN:</span>
                        <span className="text-white font-mono break-all">{alert.leafCert.subjectCN}</span>
                      </div>
                      <div>
                        <span className="text-[#5c7a78] block">Issuer CA:</span>
                        <span className="text-[#00f2c3] font-mono">{alert.leafCert.issuerCA}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Subtab 3: Lookalike Domain Radar */}
          {activeSubTab === 'lookalikes' && (
            <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-xs">Permutation Radar Matrix</h3>
                  <p className="text-[#80a4a2] text-[11px]">Proactively identifies typosquatting, IDN homoglyphs, and TLD swap vectors</p>
                </div>
                <span className="text-[11px] text-[#00f2c3] font-bold">
                  {dashboardData.lookalikeRadar.totalPermutationsAnalyzed} permutations tracked
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-[#143535] text-[#80a4a2]">
                      <th className="py-2 px-3">Variant Domain</th>
                      <th className="py-2 px-3">Punycode (IDN)</th>
                      <th className="py-2 px-3">Attack Technique</th>
                      <th className="py-2 px-3">Threat Tier</th>
                      <th className="py-2 px-3 text-right">Risk Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#143535]">
                    {dashboardData.lookalikeRadar.permutations.map((perm, idx) => (
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

          {/* Subtab 4: Security Headers */}
          {activeSubTab === 'headers' && (
            <div className="p-4 rounded-xl bg-[#091f1f] border border-[#164242] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-xs">Automated Security Header Compliance Audit</h3>
                  <p className="text-[#80a4a2] text-[11px]">Passive posture inspection of protective HTTP transport headers</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/40 font-bold">
                  Audit Score: {dashboardData.headerAudit.score}/100
                </span>
              </div>

              <div className="space-y-2">
                {dashboardData.headerAudit.findings.map((f, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#061414] border border-[#143535] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-[11px]">{f.issue}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold border ${
                        f.severity === 'INFORMATIONAL'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : f.severity === 'HIGH'
                          ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      }`}>
                        {f.severity}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-[#80a4a2]">{f.technicalEvidence}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
