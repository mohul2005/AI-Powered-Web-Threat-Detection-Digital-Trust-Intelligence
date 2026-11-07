import React from 'react';
import { Search, Loader2, Sparkles, AlertOctagon, KeyRound, Building, CreditCard, ShieldCheck } from 'lucide-react';

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

  const getScenarioIcon = (id) => {
    if (id.includes('emudhra')) return <KeyRound className="w-3.5 h-3.5 text-amber-400" />;
    if (id.includes('sbi')) return <Building className="w-3.5 h-3.5 text-rose-400" />;
    if (id.includes('recruitment')) return <AlertOctagon className="w-3.5 h-3.5 text-orange-400" />;
    if (id.includes('payment')) return <CreditCard className="w-3.5 h-3.5 text-purple-400" />;
    return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Decorative backdrop elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Main input form */}
      <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            <Search className="w-5 h-5 text-cyan-400" />
          </div>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Inspect any URL, domain or payment portal (e.g. https://onlinesbi.sbi or suspicious site)..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-950/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all font-mono text-sm shadow-inner"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !urlInput.trim()}
          className="w-full md:w-auto px-7 py-3.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all transform active:scale-95"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              <span>Analyzing Threat Vector...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Deep Analyze</span>
            </>
          )}
        </button>
      </form>

      {/* Quick 1-Click Pre-configured Demo Scenarios */}
      <div className="mt-4 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>High-Impact Real-World Scenarios (1-Click Incident Testing)</span>
          </span>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            Includes real eMudhra CA audit case & credential skimmers
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {scenarios.map((sc) => {
            const isSelected = activeScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => onSelectScenario(sc.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                {getScenarioIcon(sc.id)}
                <span>{sc.title.split(':')[0]}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                    sc.severity === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : sc.severity === 'HIGH'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {sc.severity}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
