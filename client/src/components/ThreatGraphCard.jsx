import React, { useState } from 'react';
import { Users, Network, ThumbsUp, ThumbsDown, Copy, Check, Share2 } from 'lucide-react';

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
    if (risk === 'critical' || risk === 'high') return 'bg-[#f43f5e]/15 border-[#f43f5e] text-[#f43f5e]';
    if (risk === 'medium') return 'bg-[#f59e0b]/15 border-[#f59e0b] text-[#f59e0b]';
    if (risk === 'info') return 'bg-[#2dd4bf]/15 border-[#2dd4bf] text-[#2dd4bf]';
    return 'bg-[#00f2c3]/15 border-[#00f2c3] text-[#00f2c3]';
  };

  return (
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-5 shadow-card-dark flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#163838] mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Collaborative Threat Graph & IOCs</h3>
              <p className="text-[11px] text-[#80a4a2] font-mono">Consensus Voting & Infrastructure Clustering</p>
            </div>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
              reputationScore < 50
                ? 'bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30'
                : 'bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/30'
            }`}
          >
            {reputationScore}/100 Rep
          </span>
        </div>

        {/* Community Consensus Bar */}
        <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] mb-4 flex items-center justify-between">
          <span className="text-xs font-mono text-[#80a4a2] flex items-center space-x-1.5">
            <Users className="w-4 h-4 text-[#00f2c3]" />
            <span>Community Consensus:</span>
          </span>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="flex items-center space-x-1 text-[#f43f5e] font-bold">
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>{communityVotes.malicious} Flagged</span>
            </span>
            <span className="text-[#3b5e5c]">|</span>
            <span className="flex items-center space-x-1 text-[#00f2c3] font-bold">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{communityVotes.benign} Vouched</span>
            </span>
          </div>
        </div>

        {/* Matching Campaign Clusters */}
        {matchingThreatClusters && matchingThreatClusters.length > 0 && (
          <div className="mb-4 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#80a4a2] block">
              Correlated Attack Campaign:
            </span>
            {matchingThreatClusters.map((cluster, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#f43f5e]/10 border border-[#f43f5e]/30 font-mono text-xs">
                <div className="flex items-center justify-between text-[#f43f5e] font-bold mb-1">
                  <span>⚠️ {cluster.type}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1c080d] text-[#f43f5e] border border-[#f43f5e]/40 font-bold">
                    {cluster.domainsCount} Active Domains
                  </span>
                </div>
                <div className="text-[11px] text-[#80a4a2]">
                  <span>Shared Infrastructure: <strong className="text-white">{cluster.sharedAsn}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Visual Graph Topology */}
        {graph && graph.nodes && (
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#80a4a2] block mb-2 flex items-center space-x-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#00f2c3]" />
              <span>Threat Infrastructure Topology:</span>
            </span>
            <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] flex flex-wrap gap-2 items-center justify-center font-mono text-xs">
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
            <span className="text-xs font-semibold uppercase tracking-wider text-[#80a4a2] block mb-1.5">
              Extracted Indicators of Compromise (IOCs):
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              {iocs.map((ioc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#061414] border border-[#153a3a] text-[#a1c4c2]"
                >
                  <span className="truncate mr-2">{ioc}</span>
                  <button
                    onClick={() => copyIoc(ioc)}
                    className="text-[#5c8280] hover:text-[#00f2c3] transition-colors shrink-0"
                    title="Copy IOC"
                  >
                    {copiedIoc === ioc ? <Check className="w-3.5 h-3.5 text-[#00f2c3]" /> : <Copy className="w-3.5 h-3.5" />}
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
