import React, { useState } from 'react';
import {
  Globe,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Server,
  Cookie,
  AlertTriangle,
  Info,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Lock,
  ChevronDown,
  ChevronUp,
  Scale
} from 'lucide-react';

export default function WebSecCard({ webSec }) {
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [expandedFinding, setExpandedFinding] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  if (!webSec) return null;

  const {
    score = 50,
    grade = 'C',
    headers = {},
    serverFingerprint = 'Protected',
    cookies = [],
    findings = [],
    module5AssessmentReport = null
  } = webSec;

  const report = module5AssessmentReport || {
    authorizationGate: {
      regulatoryMandate: 'The platform inspects publicly available security information and reports configuration weaknesses without attempting exploitation. Any active testing must be restricted to explicitly authorised targets.'
    },
    findingsSummary: {
      totalFindings: findings.length,
      highCount: findings.filter(f => f.severity === 'HIGH').length,
      mediumCount: findings.filter(f => f.severity === 'MEDIUM').length,
      lowCount: findings.filter(f => f.severity === 'LOW').length,
      informationalCount: findings.filter(f => f.severity === 'INFORMATIONAL').length
    }
  };

  const copyRemediation = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFindings = findings.filter(f => {
    if (selectedSeverity === 'ALL') return true;
    return f.severity === selectedSeverity;
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/40">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f43f5e]/15 text-[#f43f5e] border border-[#f43f5e]/30">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40">MEDIUM</span>;
      case 'LOW':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30">LOW</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/30">INFO</span>;
    }
  };

  const getHeaderPill = (item) => {
    if (!item) return null;
    if (item.status === 'PRESENT') {
      return (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30 font-bold">
          PROTECTED
        </span>
      );
    }
    if (item.status === 'UNSAFE') {
      return (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30 font-bold">
          WEAK
        </span>
      );
    }
    return (
      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30 font-bold">
        MISSING
      </span>
    );
  };

  return (
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-5 shadow-card-dark space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#163838]">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30">
                MODULE 5 DELIVERABLE
              </span>
              <h3 className="font-bold text-white text-sm">Website Security Assessment</h3>
            </div>
            <p className="text-[11px] text-[#80a4a2] font-mono">
              Passive Header Reconnaissance • Security Posture & Configuration Weaknesses
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#061414] border border-[#174242] text-[#80a4a2]">
            Posture: <strong className="text-white">{score}/100</strong>
          </span>
          <span
            className={`px-3 py-1 rounded-xl text-xs font-mono font-black ${
              ['A+', 'A'].includes(grade)
                ? 'bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/30 shadow-[0_0_12px_rgba(0,242,195,0.2)]'
                : ['B', 'C'].includes(grade)
                ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30'
                : 'bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
            }`}
          >
            GRADE {grade}
          </span>
        </div>
      </div>

      {/* MANDATORY ETHICAL SCOPE & AUTHORIZATION NOTICE (Module 5 Requirement) */}
      <div className="p-3.5 rounded-xl bg-[#061414] border border-[#00f2c3]/30 space-y-2">
        <div className="flex items-center space-x-2 text-[#00f2c3] font-bold text-xs uppercase tracking-wide">
          <Scale className="w-4 h-4 shrink-0" />
          <span>Non-Exploitative Assessment Scope & Regulatory Boundary</span>
        </div>
        <p className="text-xs text-white/90 italic font-mono">
          "{report.authorizationGate?.regulatoryMandate || 'The platform inspects publicly available security information and reports configuration weaknesses without attempting exploitation. Any active testing must be restricted to explicitly authorised targets.'}"
        </p>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-[#80a4a2] pt-0.5">
          <span className="px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] font-bold">
            ✓ PASSIVE RECONNAISSANCE ONLY
          </span>
          <span>•</span>
          <span>No intrusive payload injection, SQLi fuzzing, or stress tests attempted</span>
        </div>
      </div>

      {/* Findings Severity Filter Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <div className="flex items-center space-x-1.5">
          {['ALL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL'].map(sev => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedSeverity === sev
                  ? 'bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3] font-bold shadow-neon-sm'
                  : 'bg-[#061414] text-[#80a4a2] border border-[#174242] hover:text-white'
              }`}
            >
              {sev} {sev === 'ALL' ? `(${findings.length})` : `(${findings.filter(f => f.severity === sev).length})`}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-[#80a4a2]">
          {filteredFindings.length} issue(s) displayed
        </span>
      </div>

      {/* STANDARDIZED FINDINGS LIST: EACH FINDING INCLUDES ALL 6 DELIVERABLES */}
      <div className="space-y-3">
        {filteredFindings.map((finding, idx) => {
          const isExpanded = expandedFinding === finding.id || (idx === 0 && expandedFinding === null);

          return (
            <div
              key={finding.id || idx}
              className={`rounded-xl border transition-all ${
                finding.severity === 'HIGH' || finding.severity === 'CRITICAL'
                  ? 'bg-[#180a0d] border-[#f43f5e]/40'
                  : finding.severity === 'MEDIUM'
                  ? 'bg-[#1a140a] border-[#f59e0b]/40'
                  : 'bg-[#061414] border-[#153a3a]'
              }`}
            >
              {/* Finding Header (Deliverable 1: Identified Issue + Deliverable 4: Severity) */}
              <div
                onClick={() => setExpandedFinding(isExpanded ? false : finding.id)}
                className="p-3.5 flex items-start justify-between cursor-pointer gap-2"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    {getSeverityBadge(finding.severity)}
                    <h4 className="font-bold text-white text-xs">{finding.issue}</h4>
                  </div>
                  <p className="text-[11px] text-[#a1c4c2] font-mono line-clamp-1">
                    {finding.potentialImpact}
                  </p>
                </div>
                <div className="text-[#80a4a2] hover:text-white p-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded 6-Item Technical Dossier */}
              {isExpanded && (
                <div className="px-3.5 pb-3.5 pt-1 border-t border-black/40 space-y-2.5 font-mono text-xs">
                  {/* Deliverable 2: Technical Evidence */}
                  <div className="space-y-1">
                    <span className="text-[#80a4a2] text-[10px] uppercase font-bold tracking-wider block">
                      1. Technical Evidence:
                    </span>
                    <div className="p-2 rounded bg-black/40 border border-white/10 text-[#00f2c3] text-[11px] break-all">
                      <code>{finding.technicalEvidence}</code>
                    </div>
                  </div>

                  {/* Deliverable 3: Potential Impact */}
                  <div className="space-y-1">
                    <span className="text-[#80a4a2] text-[10px] uppercase font-bold tracking-wider block">
                      2. Potential Attack Impact:
                    </span>
                    <p className="text-[#d1e7e5] text-[11px] leading-relaxed bg-[#0b2020] p-2 rounded border border-[#174242]">
                      {finding.potentialImpact}
                    </p>
                  </div>

                  {/* Deliverable 5: Recommended Remediation with 1-click Copy */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[#00f2c3] text-[10px] uppercase font-bold tracking-wider">
                        3. Recommended Remediation Directives:
                      </span>
                      <button
                        onClick={() => copyRemediation(finding.id, finding.remediation)}
                        className="text-[10px] text-[#80a4a2] hover:text-[#00f2c3] flex items-center space-x-1"
                        title="Copy configuration snippet"
                      >
                        {copiedId === finding.id ? <Check className="w-3 h-3 text-[#00f2c3]" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === finding.id ? 'Copied' : 'Copy Config'}</span>
                      </button>
                    </div>
                    <pre className="p-2 rounded bg-black/50 border border-[#00f2c3]/30 text-[#e2f1f0] text-[11px] overflow-x-auto whitespace-pre-wrap font-mono">
                      {finding.remediation}
                    </pre>
                  </div>

                  {/* Deliverable 6: Relevant Limitations */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[#80a4a2] text-[10px] uppercase font-bold tracking-wider block">
                      4. Scope & Assessment Limitations:
                    </span>
                    <p className="text-[10px] text-[#80a4a2] italic">
                      {finding.limitations}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Defensive Headers Quick Telemetry Overview */}
      <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] space-y-2">
        <span className="text-xs font-mono font-bold text-white flex items-center space-x-2">
          <Shield className="w-3.5 h-3.5 text-[#00f2c3]" />
          <span>Core Defensive Headers Baseline</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2 rounded bg-[#0b2020] border border-[#174242] flex items-center justify-between">
            <span className="text-white text-[11px]">HSTS</span>
            {getHeaderPill(headers.hsts)}
          </div>
          <div className="p-2 rounded bg-[#0b2020] border border-[#174242] flex items-center justify-between">
            <span className="text-white text-[11px]">CSP</span>
            {getHeaderPill(headers.csp)}
          </div>
          <div className="p-2 rounded bg-[#0b2020] border border-[#174242] flex items-center justify-between">
            <span className="text-white text-[11px]">X-Frame-Options</span>
            {getHeaderPill(headers.xFrameOptions)}
          </div>
          <div className="p-2 rounded bg-[#0b2020] border border-[#174242] flex items-center justify-between">
            <span className="text-white text-[11px]">nosniff</span>
            {getHeaderPill(headers.xContentTypeOptions)}
          </div>
        </div>
      </div>

      {/* Server Technology & Cookies Footprint */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
          <span className="text-[#80a4a2] flex items-center space-x-1.5 text-[11px]">
            <Server className="w-3 h-3 text-[#00f2c3]" />
            <span className="font-bold text-white">Disclosed Server Technology Banner:</span>
          </span>
          <p className="text-[#a1c4c2] text-[11px] truncate bg-black/30 p-1.5 rounded border border-[#174242]">
            {serverFingerprint}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
          <span className="text-[#80a4a2] flex items-center space-x-1.5 text-[11px]">
            <Cookie className="w-3 h-3 text-[#f59e0b]" />
            <span className="font-bold text-white">Captured Session Cookies Flags:</span>
          </span>
          {cookies && cookies.length > 0 ? (
            <div className="space-y-1">
              {cookies.slice(0, 2).map((c, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] bg-black/30 p-1 rounded border border-[#174242]">
                  <span className="text-white truncate max-w-[120px]">{c.name}</span>
                  <span className={`text-[10px] ${c.secure && c.httpOnly ? 'text-[#00f2c3]' : 'text-[#f43f5e] font-bold'}`}>
                    {c.secure ? 'Secure' : 'NoSecure'} • {c.httpOnly ? 'HttpOnly' : 'NoHttpOnly'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-[#80a4a2] italic bg-black/30 p-1.5 rounded border border-[#174242]">
              No session cookies captured during handshake
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
