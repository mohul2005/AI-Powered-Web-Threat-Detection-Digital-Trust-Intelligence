import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Radio, FileCode2, PlusCircle, Activity } from 'lucide-react';

export default function Header({ onOpenReportModal, activeTab, setActiveTab }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleExportStix = () => {
    window.open('http://localhost:5000/api/intel/export/stix', '_blank');
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 shadow-lg shadow-cyan-500/10">
            <Shield className="w-7 h-7 text-cyan-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                TRUSTMATRIX <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono">v2.0</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              AI Web Threat & Digital Trust Intelligence Platform
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'scanner'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Threat Scanner
          </button>
          <button
            onClick={() => setActiveTab('pki-radar')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'pki-radar'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>eMudhra & PKI Radar</span>
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'community'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-rose-400" />
            <span>Collaborative Feed</span>
          </button>
        </nav>

        {/* Actions & Live Telemetry */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-slate-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>SOC UTC:</span>
            <span className="text-cyan-400 font-semibold">{time}</span>
          </div>

          <button
            onClick={handleExportStix}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white transition-colors"
            title="Download Cyber Threat Intelligence Bundle in OASIS STIX 2.1 standard"
          >
            <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium">STIX 2.1</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 hover:text-rose-200 transition-colors shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="font-semibold">Report Threat</span>
          </button>
        </div>
      </div>
    </header>
  );
}
