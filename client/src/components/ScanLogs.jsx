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
    if (line.includes('[INIT]')) return <span className="text-cyan-400 font-semibold">{line}</span>;
    if (line.includes('[PHISH_AI]')) return <span className="text-sky-300">{line}</span>;
    if (line.includes('[TLS_HANDSHAKE]')) return <span className="text-indigo-300">{line}</span>;
    if (line.includes('[PKI_AUDIT]')) return <span className="text-amber-400 font-bold">{line}</span>;
    if (line.includes('[APP_SEC]')) return <span className="text-emerald-300">{line}</span>;
    if (line.includes('[INTEL_GRAPH]')) return <span className="text-purple-300">{line}</span>;
    if (line.includes('[COMPLETE]')) return <span className="text-emerald-400 font-bold">{line}</span>;
    if (line.includes('WARNING') || line.includes('ALERT') || line.includes('FLAW')) {
      return <span className="text-rose-400 font-bold">{line}</span>;
    }
    return <span className="text-slate-300">{line}</span>;
  };

  return (
    <div className="bg-slate-950/90 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
            Real-Time Threat Detection Telemetry
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 text-slate-400 hover:text-slate-200 transition-colors"
          title="Copy Telemetry"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div
        ref={logContainerRef}
        className="p-3.5 max-h-40 overflow-y-auto space-y-1 scrollbar-thin text-slate-300 selection:bg-cyan-500 selection:text-black leading-relaxed"
      >
        {logs && logs.length > 0 ? (
          logs.map((log, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-slate-600 select-none">{String(index + 1).padStart(2, '0')}</span>
              <div className="break-all">{formatLogLine(log)}</div>
            </div>
          ))
        ) : (
          <div className="text-slate-600 italic">Awaiting target initialization...</div>
        )}
      </div>
    </div>
  );
}
