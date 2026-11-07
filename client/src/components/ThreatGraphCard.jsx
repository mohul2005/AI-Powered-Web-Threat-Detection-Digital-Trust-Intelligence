import React, { useState } from 'react';
import { Users, Network, ThumbsUp, ThumbsDown, ShieldAlert, Copy, Check, Share2 } from 'lucide-react';

export default function ThreatGraphCard({ collaborativeIntel, domain }) {
  const [copiedIoc, setCopiedIoc] = useState(null);

  if (!collaborativeIntel) return null;

  const { reputationScore, communityVotes, matchingThreatClusters, iocs, graph } = collaborativeIntel;

  const copyIoc = (ioc) => {
    navigator.clipboard.writeText(ioc);
    setCopiedIoc(ioc);
    setTimeout(() => setCopiedIoc(null), 2000);
  };

  const getNodeColor = (type, risk) => {
    if (risk === 'critical' || risk === 'high') return 'bg-rose-500/20 border-rose-500 text-rose-300';
    if (risk === 'medium') return 'bg-amber-500/20 border-amber-500 text-amber-300';
    if (risk === 'info') return 'bg-indigo-500/20 border-indigo-500 text-indigo-300';
    return 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-md shadow-lg flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Collaborative Threat Graph & IOCs</h3>
              <p className="text-[11px] text-slate-400 font-mono">Consensus Voting & Infrastructure Clustering</p>
            </div>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
              reputationScore < 50
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {reputationScore}/100 Rep
          </span>
        </div>

        {/* Community Consensus Bar */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 mb-4 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
            <Users className="w-4 h-4 text-purple-400" />
            <span>Community Consensus:</span>
          </span>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="flex items-center space-x-1 text-rose-400 font-bold">
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>{communityVotes.malicious} Flagged</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center space-x-1 text-emerald-400 font-bold">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{communityVotes.benign} Vouched</span>
            </span>
          </div>
        </div>

        {/* Matching Campaign Clusters */}
        {matchingThreatClusters && matchingThreatClusters.length > 0 && (
          <div className="mb-4 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Correlated Attack Campaign:
            </span>
            {matchingThreatClusters.map((cluster, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 font-mono text-xs">
                <div className="flex items-center justify-between text-rose-300 font-bold mb-1">
                  <span>⚠️ {cluster.type}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-200 border border-rose-800">
                    {cluster.domainsCount} Active Domains
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  <span>Shared Infrastructure: <strong className="text-slate-200">{cluster.sharedAsn}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Visual Graph Topology */}
        {graph && graph.nodes && (
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2 flex items-center space-x-1.5">
              <Share2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Threat Infrastructure Topology:</span>
            </span>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap gap-2 items-center justify-center font-mono text-xs">
              {graph.nodes.map((node) => (
                <div
                  key={node.id}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 ${getNodeColor(node.type, node.risk)}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  <span className="truncate max-w-[150px]">{node.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IOC List with 1-click copy */}
        {iocs && iocs.length > 0 && (
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
              Extracted Indicators of Compromise (IOCs):
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              {iocs.map((ioc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                >
                  <span className="truncate mr-2">{ioc}</span>
                  <button
                    onClick={() => copyIoc(ioc)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors shrink-0"
                    title="Copy IOC"
                  >
                    {copiedIoc === ioc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
