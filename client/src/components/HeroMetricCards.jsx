import React from 'react';
import { ShieldAlert, Radio, Activity, ShieldCheck, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function HeroMetricCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
      {/* Card 1: Critical Threats */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0e2727] to-[#091b1b] border border-[#184242] shadow-card-dark relative overflow-hidden group hover:border-[#00f2c3]/50 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-xl bg-[#f43f5e]/10 border border-[#f43f5e]/20 text-[#f43f5e]">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono text-[#f43f5e] flex items-center space-x-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>+12%</span>
          </span>
        </div>
        <span className="text-xs text-[#80a4a2] font-medium block">Critical Threats</span>
        <div className="text-2xl font-black text-white font-mono mt-0.5 tracking-tight">5–10</div>
        <span className="text-[10px] text-[#5c807e] font-mono mt-1 block">Active Critical Severity Threats</span>
      </div>

      {/* Card 2: New IOCs */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0e2727] to-[#091b1b] border border-[#184242] shadow-card-dark relative overflow-hidden group hover:border-[#00f2c3]/50 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-xl bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
            <Radio className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono text-[#00f2c3] flex items-center space-x-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>+05%</span>
          </span>
        </div>
        <span className="text-xs text-[#80a4a2] font-medium block">Verified IOCs</span>
        <div className="text-2xl font-black text-white font-mono mt-0.5 tracking-tight">10–15</div>
        <span className="text-[10px] text-[#5c807e] font-mono mt-1 block">Indicators in Last 24h</span>
      </div>

      {/* Card 3: Active Campaigns */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0e2727] to-[#091b1b] border border-[#184242] shadow-card-dark relative overflow-hidden group hover:border-[#00f2c3]/50 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-xl bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 text-[#2dd4bf]">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono text-[#80a4a2] flex items-center space-x-0.5">
            <ArrowDownRight className="w-3 h-3 text-[#f59e0b]" />
            <span>-03%</span>
          </span>
        </div>
        <span className="text-xs text-[#80a4a2] font-medium block">Active Campaigns</span>
        <div className="text-2xl font-black text-white font-mono mt-0.5 tracking-tight">06–10</div>
        <span className="text-[10px] text-[#5c807e] font-mono mt-1 block">Ongoing Attack Clusters</span>
      </div>

      {/* Card 4: Global Trust Index */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0e2727] to-[#091b1b] border border-[#184242] shadow-card-dark relative overflow-hidden group hover:border-[#00f2c3]/50 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono text-[#10b981] flex items-center space-x-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>98.4%</span>
          </span>
        </div>
        <span className="text-xs text-[#80a4a2] font-medium block">Validation Accuracy</span>
        <div className="text-2xl font-black text-[#00f2c3] font-mono mt-0.5 tracking-tight">100.0%</div>
        <span className="text-[10px] text-[#5c807e] font-mono mt-1 block">NIST SP 800-30 Calibrated</span>
      </div>
    </div>
  );
}
