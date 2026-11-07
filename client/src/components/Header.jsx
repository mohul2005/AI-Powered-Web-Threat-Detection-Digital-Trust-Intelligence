import React from 'react';
import { Shield, Sparkles, BookOpen, BarChart3, Radio, PlusCircle, FileCode2 } from 'lucide-react';

export default function Header({ onOpenReportModal, activeTab, setActiveTab }) {
  const handleExportStix = () => {
    window.open('http://localhost:5000/api/intel/export/stix', '_blank');
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 shadow-md shadow-cyan-500/10">
            <Shield className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-black tracking-wide text-white">
                TrustMatrix <span className="text-cyan-400">AI</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Web Threat Detection & Digital Trust Intelligence
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'scanner'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Threat Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab('mechanism')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'mechanism'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Working Mechanism</span>
          </button>

          <button
            onClick={() => setActiveTab('validation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'validation'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-cyan-400/90 hover:text-cyan-300'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Validation & Benchmark Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'community'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Community Feed</span>
          </button>
        </nav>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportStix}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium transition-colors"
            title="Download Cyber Threat Intelligence Bundle in OASIS STIX 2.1 standard"
          >
            <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>STIX 2.1</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Report Site</span>
          </button>
        </div>
      </div>
    </header>
  );
}
