import React, { useRef, useEffect } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

export default function ScanLogs({ logs }) {
  const [copied, setCopied] = React.useState(false);
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const copyToClipboard = () => {
    if (!logs) return;
    navigator.clipboard.writeText(logs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatLogLine = (line) => {
    if (line.includes('[INIT]')) return <span className="text-[#00f2c3] font-semibold">{line}</span>;
    if (line.includes('[PHISH_AI]')) return <span className="text-[#2dd4bf]">{line}</span>;
    if (line.includes('[TLS_HANDSHAKE]')) return <span className="text-[#5eead4]">{line}</span>;
    if (line.includes('[PKI_AUDIT]')) return <span className="text-[#f59e0b] font-bold">{line}</span>;
    if (line.includes('[APP_SEC]')) return <span className="text-[#10b981]">{line}</span>;
    if (line.includes('[INTEL_GRAPH]')) return <span className="text-[#00d2aa]">{line}</span>;
    if (line.includes('[COMPLETE]')) return <span className="text-[#00f2c3] font-bold">{line}</span>;
    if (line.includes('WARNING') || line.includes('ALERT') || line.includes('FLAW') || line.includes('VETO')) {
      return <span className="text-[#f43f5e] font-bold">{line}</span>;
    }
    return <span className="text-[#a1c4c2]">{line}</span>;
  };

  return (
    <div className="bg-[#061414] border border-[#174242] rounded-xl overflow-hidden font-mono text-xs shadow-card-dark">
      <div className="flex items-center justify-between px-4 py-2 bg-[#091f1f] border-b border-[#174242] text-[#80a4a2]">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-[#00f2c3]" />
          <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
            Real-Time Threat Detection Telemetry
          </span>
          <span className="w-2 h-2 rounded-full bg-[#00f2c3] animate-pulse"></span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 text-[#80a4a2] hover:text-[#00f2c3] transition-colors"
          title="Copy Telemetry"
        >
          {copied ? <Check className="w-3 h-3 text-[#00f2c3]" /> : <Copy className="w-3 h-3" />}
          <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div
        ref={logContainerRef}
        className="p-3.5 max-h-40 overflow-y-auto space-y-1 scrollbar-thin text-[#a1c4c2] selection:bg-[#00f2c3] selection:text-[#041412] leading-relaxed"
      >
        {logs && logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-[#3b5e5c] select-none">{String(index + 1).padStart(2, '0')}</span>
              <div className="break-all">{formatLogLine(log)}</div>
            </div>
          ))
        ) : (
          <div className="text-[#5c8280] italic">Awaiting target initialization...</div>
        )}
      </div>
    </div>
  );
}
