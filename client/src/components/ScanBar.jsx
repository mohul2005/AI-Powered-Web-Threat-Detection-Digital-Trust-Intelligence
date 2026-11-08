import React, { useState } from 'react';
import { Search, Loader2, Sparkles, Globe, Mail, MessageSquare, Blocks } from 'lucide-react';

export default function ScanBar({
  urlInput,
  setUrlInput,
  onScan,
  isLoading,
  scenarios,
  onSelectScenario,
  activeScenarioId,
  scanMode,
  setScanMode
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onScan(urlInput.trim(), scanMode);
    }
  };

  const getCleanLabel = (scenario) => {
    if (scenario.id.includes('emudhra')) return { name: 'eMudhra Rogue Key Incident', badge: 'PKI Anomaly', color: 'rose' };
    if (scenario.id.includes('drainer')) return { name: 'Uniswap Permit2 Drainer', badge: 'Web3 Drainer', color: 'rose' };
    if (scenario.id.includes('parcel')) return { name: 'India Post Delivery Scam', badge: 'Parcel / Fee', color: 'rose' };
    if (scenario.id.includes('admission') || scenario.id.includes('exam')) return { name: 'NTA Exam Fee Scam', badge: 'Education', color: 'rose' };
    if (scenario.id.includes('echallan') || scenario.id.includes('traffic')) return { name: 'Parivahan e-Challan Scam', badge: 'Government', color: 'rose' };
    if (scenario.id.includes('job') || scenario.id.includes('internship')) return { name: 'Google Careers Job Scam', badge: 'Recruitment', color: 'rose' };
    if (scenario.id.includes('instagram') || scenario.id.includes('recovery')) return { name: 'Instagram Copyright Phish', badge: 'Account Theft', color: 'rose' };
    if (scenario.id.includes('shortened') || scenario.id.includes('redirect')) return { name: 'Nested Open Redirect Chain', badge: 'Redirect Chain', color: 'rose' };
    if (scenario.id.includes('sbi-bank')) return { name: 'Fake SBI Netbanking', badge: 'Phishing', color: 'rose' };
    if (scenario.id.includes('smishing') || scenario.type === 'message') return { name: 'SBI YONO KYC Smishing', badge: 'SMS Scam', color: 'amber' };
    return { name: 'Legitimate Site (GitHub)', badge: 'Safe Baseline', color: 'emerald' };
  };

  const getPlaceholder = () => {
    if (scanMode === 'email') return "Paste suspicious email body, headers, or sender text (e.g. wire transfer alert, invoice, or tax refund notice)...";
    if (scanMode === 'message') return "Paste suspicious SMS, WhatsApp, or Telegram message (e.g. 'Your YONO account will be blocked. Click to update PAN...')...";
    return "Enter any website URL or domain (e.g. https://yourbank.com or suspicious crypto link)...";
  };

  return (
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-4 sm:p-5 shadow-card-dark space-y-4">
      {/* 3 Submission Modality Tabs: URL | Email | SMS Message */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#143838] pb-3">
        <div className="flex items-center space-x-1.5 bg-[#061414] p-1 rounded-xl border border-[#174242]">
          <button
            type="button"
            onClick={() => setScanMode('url')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              scanMode === 'url'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#80a4a2] hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Website / URL</span>
          </button>

          <button
            type="button"
            onClick={() => setScanMode('email')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              scanMode === 'email'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#80a4a2] hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Phishing Email</span>
          </button>

          <button
            type="button"
            onClick={() => setScanMode('message')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              scanMode === 'message'
                ? 'bg-[#00f2c3] text-[#051715] shadow-neon-sm font-bold'
                : 'text-[#80a4a2] hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>SMS / Smishing</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#00f2c3] flex items-center space-x-1">
          <Blocks className="w-3.5 h-3.5" />
          <span>AI + Cybersecurity + Web3 Powered</span>
        </span>
      </div>

      {/* Input Form (Textarea or Input based on mode) */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative w-full">
          {scanMode === 'url' ? (
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#5c8280] absolute left-4" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={getPlaceholder()}
                className="w-full pl-11 pr-4 py-3 bg-[#061414] border border-[#184242] rounded-xl text-white placeholder-[#5c8280] text-sm focus:outline-none focus:ring-2 focus:ring-[#00f2c3] focus:border-[#00f2c3] font-mono shadow-inner"
                disabled={isLoading}
              />
            </div>
          ) : (
            <textarea
              rows={3}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={getPlaceholder()}
              className="w-full p-3.5 bg-[#061414] border border-[#184242] rounded-xl text-white placeholder-[#5c8280] text-xs focus:outline-none focus:ring-2 focus:ring-[#00f2c3] focus:border-[#00f2c3] font-mono shadow-inner leading-relaxed"
              disabled={isLoading}
            />
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !urlInput.trim()}
            className="w-full sm:w-auto px-7 py-2.5 bg-[#00f2c3] hover:bg-[#2dd4bf] text-[#041513] font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-neon-sm disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#041513]" />
                <span>Forensic Investigation in Progress...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#041513]" />
                <span>Investigate Digital Threat</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* 1-Click Interactive Demos */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#143838]">
        <span className="text-xs text-[#80a4a2] font-medium mr-1">Pre-Loaded Test Scenarios:</span>
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
