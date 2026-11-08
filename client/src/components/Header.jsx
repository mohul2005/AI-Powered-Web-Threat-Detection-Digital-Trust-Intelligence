import React from 'react';
import { Shield, Sparkles, BookOpen, BarChart3, Radio, PlusCircle, FileCode2, Binary, Award, Building2, QrCode, Printer, FileCheck, Database } from 'lucide-react';

export default function Header({
  onOpenReportModal,
  activeTab,
  setActiveTab,
  matrixMode,
  setMatrixMode,
  viewMode,
  setViewMode
}) {
  const handleExportStix = () => {
    window.open('http://localhost:5000/api/intel/export/stix', '_blank');
  };

  const toggleMatrix = () => {
    if (matrixMode === 'subtle') setMatrixMode('cinema');
    else if (matrixMode === 'cinema') setMatrixMode('off');
    else setMatrixMode('subtle');
  };

  return (
    <header className="border-b border-[#143535] bg-[#071717]/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#00f2c3]/20 to-[#0e3b38]/40 border border-[#00f2c3]/40 shadow-neon-sm">
            <Shield className="w-5 h-5 text-[#00f2c3]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold tracking-wide text-white">
                TrustMatrix <span className="text-[#00f2c3]">Nexus</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3] font-mono font-bold">
                SOC v2.0
              </span>
            </div>
            <p className="text-[11px] text-[#7d9e9c]">
              Real-Time Threat Intelligence & Digital Trust
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-[#091d1d] p-1 rounded-xl border border-[#143838] overflow-x-auto">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'scanner'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#85a8a6] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Threat Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab('mechanism')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'mechanism'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#85a8a6] hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Working Mechanism</span>
          </button>

          <button
            onClick={() => setActiveTab('deliverables')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'deliverables'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#85a8a6] hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Expected Deliverables</span>
          </button>

          <button
            onClick={() => setActiveTab('validation')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'validation'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#85a8a6] hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Validation & Benchmarks</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'community'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#85a8a6] hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Community Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('extensions')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'extensions'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#85a8a6] hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Advanced Extensions</span>
          </button>

          <button
            onClick={() => setActiveTab('org-dashboard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'org-dashboard'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#85a8a6] hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Org Security</span>
          </button>

          <button
            onClick={() => setActiveTab('pdf-guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'pdf-guide'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#85a8a6] hover:text-white'
            }`}
            title="Open printable Beginner Architecture Guide (PDF View)"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Beginner PDF</span>
          </button>

          <button
            onClick={() => setActiveTab('verification-pdf')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'verification-pdf'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#85a8a6] hover:text-white'
            }`}
            title="Open official Verification Dossier & Compliance Audit Report (PDF View)"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Verification PDF</span>
          </button>

          <button
            onClick={() => setActiveTab('database-pdf')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'database-pdf'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#85a8a6] hover:text-white'
            }`}
            title="Open Database Architecture & Persistence Documentation (PDF View)"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database PDF</span>
          </button>
        </nav>

        {/* Quick Actions with Cyber Matrix Rain Toggle */}
        <div className="flex items-center space-x-2">
          {/* Simple vs Expert Mode Switch */}
          {setViewMode && (
            <button
              onClick={() => setViewMode(viewMode === 'simple' ? 'expert' : 'simple')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                viewMode === 'simple'
                  ? 'bg-[#00f2c3]/20 border-[#00f2c3] text-[#00f2c3] shadow-neon-sm font-bold'
                  : 'bg-[#061414] border-[#184242] text-[#80a4a2] hover:text-white'
              }`}
              title="Toggle between Simple Beginner Mode and Expert SOC Mode"
            >
              <span>{viewMode === 'simple' ? '💡 Simple Mode' : '🔬 Expert Mode'}</span>
            </button>
          )}

          {/* Matrix Rain Mode Switch */}
          <button
            onClick={toggleMatrix}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              matrixMode === 'cinema'
                ? 'bg-[#00f2c3]/20 border-[#00f2c3] text-[#00f2c3] shadow-neon-sm font-bold'
                : matrixMode === 'subtle'
                ? 'bg-[#0b2222] border-[#184242] text-[#00f2c3] hover:border-[#00f2c3]/50'
                : 'bg-[#061414] border-[#143535] text-[#5c807e] hover:text-[#80a4a2]'
            }`}
            title="Toggle Hacker Cyber Green Rain Background (Subtle / Cinema / Off)"
          >
            <Binary className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Rain:</span>
            <span className="capitalize">{matrixMode}</span>
          </button>

          <button
            onClick={handleExportStix}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0b2222] hover:bg-[#112f2f] border border-[#184242] text-[#a1c4c2] text-xs font-medium transition-colors"
            title="Download STIX 2.1 Threat Intel Bundle"
          >
            <FileCode2 className="w-3.5 h-3.5 text-[#00f2c3]" />
            <span>STIX 2.1</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-[#00f2c3]/15 hover:bg-[#00f2c3]/25 border border-[#00f2c3]/40 text-[#00f2c3] text-xs font-bold transition-all shadow-neon-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Report Threat</span>
          </button>
        </div>
      </div>
    </header>
  );
}
