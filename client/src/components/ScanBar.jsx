import React from 'react';
import { Search, Loader2, Sparkles } from 'lucide-react';

export default function ScanBar({
  urlInput,
  setUrlInput,
  onScan,
  isLoading,
  scenarios,
  onSelectScenario,
  activeScenarioId
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onScan(urlInput.trim());
    }
  };

  const getCleanLabel = (scenario) => {
    if (scenario.id.includes('emudhra')) return { name: 'eMudhra Rogue Key Incident', badge: 'PKI Incident', color: 'rose' };
    if (scenario.id.includes('sbi')) return { name: 'Fake SBI Netbanking', badge: 'Phishing', color: 'rose' };
    if (scenario.id.includes('recruitment')) return { name: 'Google Job Scam', badge: 'Fraud', color: 'amber' };
    if (scenario.id.includes('payment')) return { name: 'Fake Payment Gateway', badge: 'Card Skimmer', color: 'rose' };
    return { name: 'Legitimate Site (GitHub)', badge: 'Safe Baseline', color: 'emerald' };
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2.5">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter any URL (e.g., https://yourbank.com or suspicious link)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !urlInput.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Scan Website</span>
            </>
          )}
        </button>
      </form>

      {/* 1-Click Interactive Demos */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
        <span className="text-xs text-slate-400 font-medium mr-1">Quick Demos:</span>
        {scenarios.map((sc) => {
          const info = getCleanLabel(sc);
          const isSelected = activeScenarioId === sc.id;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => onSelectScenario(sc.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{info.name}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                  info.color === 'rose'
                    ? 'bg-rose-500/20 text-rose-300'
                    : info.color === 'amber'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {info.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
