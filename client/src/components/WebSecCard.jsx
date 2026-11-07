import React from 'react';
import { Globe, ShieldCheck, ShieldAlert, Server, Cookie, HelpCircle } from 'lucide-react';

export default function WebSecCard({ webSec }) {
  if (!webSec) return null;

  const { score, grade, headers, serverFingerprint, cookies } = webSec;

  const getHeaderPill = (item) => {
    if (item.status === 'PRESENT') {
      return (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          PROTECTED
        </span>
      );
    }
    if (item.status === 'UNSAFE') {
      return (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
          WEAK
        </span>
      );
    }
    return (
      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
        MISSING
      </span>
    );
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-md shadow-lg flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Web Application Security Posture</h3>
              <p className="text-[11px] text-slate-400 font-mono">Defensive Headers, Transport & Cookies</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-mono">Grade</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-black ${
                ['A+', 'A'].includes(grade)
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : ['B', 'C'].includes(grade)
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}
            >
              {grade} ({score}/100)
            </span>
          </div>
        </div>

        {/* Security Headers Breakdown Table */}
        <div className="space-y-2 mb-4 font-mono text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
            <div>
              <span className="text-slate-200 font-bold block">Strict-Transport-Security (HSTS)</span>
              <span className="text-[10px] text-slate-400">{headers.hsts.note || 'Forces HTTPS transport'}</span>
            </div>
            {getHeaderPill(headers.hsts)}
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
            <div>
              <span className="text-slate-200 font-bold block">Content-Security-Policy (CSP)</span>
              <span className="text-[10px] text-slate-400">{headers.csp.note || 'Guards against XSS and data exfiltration'}</span>
            </div>
            {getHeaderPill(headers.csp)}
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
            <div>
              <span className="text-slate-200 font-bold block">X-Frame-Options</span>
              <span className="text-[10px] text-slate-400">{headers.xFrameOptions.note || 'Prevents Clickjacking'}</span>
            </div>
            {getHeaderPill(headers.xFrameOptions)}
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
            <div>
              <span className="text-slate-200 font-bold block">X-Content-Type-Options</span>
              <span className="text-[10px] text-slate-400">nosniff protection</span>
            </div>
            {getHeaderPill(headers.xContentTypeOptions)}
          </div>
        </div>

        {/* Server Technology Leakage */}
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 mb-4 text-xs font-mono">
          <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-slate-300">Server Banner / Technology Exposure:</span>
          </div>
          <span className="text-slate-300 break-all block">{serverFingerprint}</span>
        </div>

        {/* Cookies Audit */}
        {cookies && cookies.length > 0 && (
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <div className="flex items-center space-x-1.5 text-slate-400 mb-1.5">
              <Cookie className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-slate-300">Captured Cookies Security Flags:</span>
            </div>
            <div className="space-y-1">
              {cookies.map((c, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-slate-200">{c.name}</span>
                  <div className="flex space-x-1">
                    <span className={c.secure ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                      {c.secure ? 'Secure' : 'NoSecure'}
                    </span>
                    <span>•</span>
                    <span className={c.httpOnly ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                      {c.httpOnly ? 'HttpOnly' : 'NoHttpOnly'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
