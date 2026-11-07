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
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-4 sm:p-5 shadow-card-dark space-y-4">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2.5">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#5c8280] absolute left-4 top-3.5" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter any URL to test threat level (e.g. https://yourbank.com or suspicious link)..."
            className="w-full pl-11 pr-4 py-3 bg-[#061414] border border-[#184242] rounded-xl text-white placeholder-[#5c8280] text-sm focus:outline-none focus:ring-2 focus:ring-[#00f2c3] focus:border-[#00f2c3] font-mono shadow-inner"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !urlInput.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-[#00f2c3] hover:bg-[#2dd4bf] text-[#041513] font-extrabold rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-neon-sm disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#041513]" />
              <span>Scanning Target...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#041513]" />
              <span>Scan Target</span>
            </>
          )}
        </button>
      </form>

      {/* 1-Click Interactive Demos */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#143838]">
        <span className="text-xs text-[#80a4a2] font-medium mr-1">Quick Incident Demos:</span>
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
                  ? 'bg-[#00f2c3]/20 border-[#00f2c3] text-[#00f2c3] shadow-neon-sm'
                  : 'bg-[#061414] border-[#184242] text-[#93b5b3] hover:border-[#225757] hover:text-white'
              }`}
            >
              <span>{info.name}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                  info.color === 'rose'
                    ? 'bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30'
                    : info.color === 'amber'
                    ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30'
                    : 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30'
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
