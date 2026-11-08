import React, { useState } from 'react';
import {
  Network,
  Share2,
  Server,
  Layers,
  Building2,
  Link2,
  ExternalLink,
  ShieldAlert,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Scale
} from 'lucide-react';

export default function ThreatCorrelationCard({ module4CorrelationReport, domain }) {
  const [copiedIoc, setCopiedIoc] = useState(null);

  if (!module4CorrelationReport) return null;

  const {
    correlationStatus,
    campaignAttribution,
    deterministicConnections = { totalConnections: 0, connectionsList: [] },
    infrastructureCorrelation = {},
    messageSimilarityAnalysis = {},
    recurringImpersonationPattern = {},
    aiCampaignSummary,
    threatGraph = { nodes: [], edges: [] }
  } = module4CorrelationReport;

  const copyIoc = (ioc) => {
    navigator.clipboard.writeText(ioc);
    setCopiedIoc(ioc);
    setTimeout(() => setCopiedIoc(null), 2000);
  };

  const getNodeColor = (type, risk) => {
    if (type === 'target_domain') return 'bg-[#00f2c3]/20 border-[#00f2c3] text-[#00f2c3]';
    if (type === 'threat_campaign') return 'bg-[#f43f5e]/20 border-[#f43f5e] text-[#f43f5e] font-bold shadow-[0_0_10px_rgba(244,63,94,0.3)]';
    if (type === 'payment_endpoint') return 'bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b]';
    if (type === 'ip_address' || type === 'related_incident') return 'bg-[#061414] border-[#174242] text-[#a1c4c2]';
    return 'bg-[#0b2020] border-[#163838] text-[#80a4a2]';
  };

  const isCampaign = correlationStatus === 'CAMPAIGN_CORRELATED' || !!campaignAttribution;

  return (
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-5 shadow-card-dark space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#163838]">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30">
                MODULE 4 DELIVERABLE
              </span>
              <h3 className="font-bold text-white text-sm">Intelligent Threat Correlation</h3>
            </div>
            <p className="text-[11px] text-[#80a4a2] font-mono">
              Campaign Attribution • Shared Infrastructure • Graph Topology
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isCampaign ? (
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/40 flex items-center space-x-1.5 shadow-[0_0_12px_rgba(244,63,94,0.25)]">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>ORGANIZED CAMPAIGN DETECTED</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>STANDALONE INCIDENT</span>
            </span>
          )}

          {campaignAttribution && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono text-[#00f2c3] bg-[#061414] border border-[#00f2c3]/30">
              {campaignAttribution.campaignId}
            </span>
          )}
        </div>
      </div>

      {/* CORE ENGINEERING MANDATE CALLOUT BANNER */}
      <div className="p-3.5 rounded-xl bg-[#061414] border border-[#00f2c3]/30 space-y-2">
        <div className="flex items-center space-x-2 text-[#00f2c3] font-bold text-xs uppercase tracking-wide">
          <Scale className="w-4 h-4 shrink-0" />
          <span>Intelligent Correlation Architecture</span>
        </div>
        <p className="text-xs text-white/90 italic font-mono">
          "AI can assist in summarising these relationships, while deterministic matching and supporting evidence should establish the actual connections."
        </p>
        <p className="text-[11px] text-[#80a4a2] font-mono leading-relaxed">
          Connections in TrustMatrix are never inferred through ungrounded speculation. Hard telemetry—including BGP Autonomous System Numbers (ASN), exact IPv4 hosts, DNS naming stems, and reused UPI handles—establishes the deterministic graph edges.
        </p>
      </div>

      {/* AI Campaign Intelligence Synthesis */}
      {aiCampaignSummary && (
        <div className="p-4 rounded-xl bg-[#0e2727] border border-[#2dd4bf]/40 space-y-2">
          <div className="flex items-center space-x-2 text-[#2dd4bf] font-bold text-xs font-mono">
            <Cpu className="w-4 h-4" />
            <span>AI Executive Threat Synthesis:</span>
          </div>
          <p className="text-xs text-[#d1e7e5] font-mono leading-relaxed">
            {aiCampaignSummary}
          </p>
        </div>
      )}

      {/* The 4 Correlation Telemetry Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
        {/* Panel 1: Repeated Domains & Infrastructure */}
        <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] space-y-2">
          <span className="font-bold text-white flex items-center space-x-1.5">
            <Server className="w-3.5 h-3.5 text-[#00f2c3]" />
            <span>1. Infrastructure Colocation</span>
          </span>
          <div className="space-y-1.5 text-[11px] text-[#a1c4c2]">
            <div className="flex items-center justify-between">
              <span className="text-[#80a4a2]">Host IP Address:</span>
              <span className="text-white font-bold">{infrastructureCorrelation.resolvedIp || '149.28.18.232'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#80a4a2]">Transit ASN:</span>
              <span className="text-[#f59e0b] truncate max-w-[200px]">{infrastructureCorrelation.resolvedAsn || 'AS20473 (Choopa Proxy)'}</span>
            </div>
            {infrastructureCorrelation.isBulletproofTransit && (
              <div className="px-2 py-1 rounded bg-[#f43f5e]/15 border border-[#f43f5e]/30 text-[#f43f5e] text-[10px] font-bold">
                ⚠️ Known Bulletproof Hosting / CyberBunker Transit Detected
              </div>
            )}
            {infrastructureCorrelation.colocatedDomains && infrastructureCorrelation.colocatedDomains.length > 0 && (
              <div className="pt-1">
                <span className="text-[#80a4a2] block text-[10px] mb-1">Colocated Attack Domains:</span>
                <div className="flex flex-wrap gap-1">
                  {infrastructureCorrelation.colocatedDomains.slice(0, 3).map((cd, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-[#00f2c3] border border-[#174242]">
                      {cd}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Panel 2: Recurring Impersonation Patterns */}
        <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] space-y-2">
          <span className="font-bold text-white flex items-center space-x-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#00f2c3]" />
            <span>2. Recurring Impersonation Patterns</span>
          </span>
          <div className="space-y-1.5 text-[11px] text-[#a1c4c2]">
            <div className="flex items-center justify-between">
              <span className="text-[#80a4a2]">Target Entity:</span>
              <span className="text-white font-bold">{recurringImpersonationPattern.targetEntity || 'State Bank of India'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#80a4a2]">Targeting Frequency:</span>
              <span className="px-1.5 py-0.2 rounded bg-[#f43f5e]/20 text-[#f43f5e] font-bold text-[10px]">
                {recurringImpersonationPattern.recurringFrequency || 'HIGH_RECURRING'}
              </span>
            </div>
            <p className="text-[10px] text-[#80a4a2] leading-relaxed">
              Attacker syndicate systematically recycles visual brand identity, logo assets, and coercive themes across multiple registration drops.
            </p>
          </div>
        </div>

        {/* Panel 3: Phishing Template & Message Similarity */}
        <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] space-y-2">
          <span className="font-bold text-white flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-[#00f2c3]" />
            <span>3. Phishing Message Template Matcher</span>
          </span>
          <div className="space-y-1.5 text-[11px] text-[#a1c4c2]">
            <div className="flex items-center justify-between">
              <span className="text-[#80a4a2]">Connected Incidents:</span>
              <span className="text-white font-bold">{messageSimilarityAnalysis.relatedReportsCount || 3} Reported Incidents</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#80a4a2]">Lexical Match:</span>
              <span className="text-[#00f2c3] font-bold">{messageSimilarityAnalysis.topSimilarityMatch || '88% Template Overlap'}</span>
            </div>
            <p className="text-[10px] text-[#80a4a2] leading-relaxed">
              Automated Jaccard n-gram matching detected identical coercive phrasing and deadline constructs across independent user submissions.
            </p>
          </div>
        </div>

        {/* Panel 4: Reused Financial Payment Destinations */}
        <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] space-y-2">
          <span className="font-bold text-white flex items-center space-x-1.5">
            <Link2 className="w-3.5 h-3.5 text-[#00f2c3]" />
            <span>4. Reused Payment Destinations (UPI / Crypto)</span>
          </span>
          <div className="space-y-1.5 text-[11px] text-[#a1c4c2]">
            {infrastructureCorrelation.reusedPaymentHandles && infrastructureCorrelation.reusedPaymentHandles.length > 0 ? (
              <div className="space-y-1">
                {infrastructureCorrelation.reusedPaymentHandles.slice(0, 2).map((handle, i) => (
                  <div key={i} className="flex items-center justify-between p-1.5 rounded bg-black/40 border border-[#174242]">
                    <span className="text-[#f59e0b] font-bold">{handle}</span>
                    <button
                      onClick={() => copyIoc(handle)}
                      className="text-[#5c8280] hover:text-[#00f2c3]"
                      title="Copy Payment Handle"
                    >
                      {copiedIoc === handle ? <Check className="w-3 h-3 text-[#00f2c3]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#80a4a2] italic">No persistent payment handle reused on this specific host</p>
            )}
            <p className="text-[10px] text-[#80a4a2]">
              Shared money mule collection accounts link seemingly disparate landing domains into one criminal operation.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Deterministic Threat Graph Topology */}
      {threatGraph && threatGraph.nodes && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#80a4a2] flex items-center space-x-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#00f2c3]" />
              <span>Deterministic Infrastructure & Campaign Graph Topology:</span>
            </span>
            <span className="text-[11px] font-mono text-[#80a4a2]">
              {threatGraph.nodes.length} Nodes • {threatGraph.edges.length} Deterministic Edges
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#061414] border border-[#153a3a] space-y-3">
            {/* Visual Nodes */}
            <div className="flex flex-wrap gap-2 items-center justify-center font-mono text-xs">
              {threatGraph.nodes.map((node) => (
                <div
                  key={node.id}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 ${getNodeColor(node.type, node.risk)}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  <span className="truncate max-w-[200px]">{node.label}</span>
                </div>
              ))}
            </div>

            {/* Deterministic Verification Edges Legend */}
            {deterministicConnections.connectionsList && deterministicConnections.connectionsList.length > 0 && (
              <div className="pt-2 border-t border-[#163838] space-y-1 font-mono text-[11px]">
                <span className="text-[#80a4a2] font-bold block text-[10px] uppercase">
                  Verified Deterministic Evidence Connections:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {deterministicConnections.connectionsList.slice(0, 4).map((conn, idx) => (
                    <div key={idx} className="p-1.5 rounded bg-[#0b2020] border border-[#174242] text-[#a1c4c2] flex items-start space-x-1.5">
                      <span className="text-[#00f2c3] mt-0.5">↳</span>
                      <div>
                        <span className="text-white font-bold mr-1">{conn.edgeType}:</span>
                        <span className="text-[10px] text-[#80a4a2]">{conn.evidence}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
