import React from 'react';
import { Globe, Server, Cookie } from 'lucide-react';

export default function WebSecCard({ webSec }) {
  if (!webSec) return null;

  const { score, grade, headers, serverFingerprint, cookies } = webSec;

  const getHeaderPill = (item) => {
    if (item.status === 'PRESENT') {
      return (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30 font-bold">
          PROTECTED
        </span>
      );
    }
    if (item.status === 'UNSAFE') {
      return (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30 font-bold">
          WEAK
        </span>
      );
    }
    return (
      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30 font-bold">
        MISSING
      </span>
    );
  };

  return (
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-5 shadow-card-dark flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#163838] mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Web Application Security Posture</h3>
              <p className="text-[11px] text-[#80a4a2] font-mono">Defensive Headers, Transport & Cookies</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#80a4a2] font-mono">Grade</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-black ${
                ['A+', 'A'].includes(grade)
                  ? 'bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3]/30'
                  : ['B', 'C'].includes(grade)
                  ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30'
                  : 'bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30'
              }`}
            >
              {grade} ({score}/100)
            </span>
          </div>
        </div>

        {/* Security Headers Breakdown Table */}
        <div className="space-y-2 mb-4 font-mono text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#061414] border border-[#153a3a]">
            <div>
              <span className="text-white font-bold block">Strict-Transport-Security (HSTS)</span>
              <span className="text-[10px] text-[#80a4a2]">{headers.hsts.note || 'Forces HTTPS transport'}</span>
            </div>
            {getHeaderPill(headers.hsts)}
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-[#061414] border border-[#153a3a]">
            <div>
              <span className="text-white font-bold block">Content-Security-Policy (CSP)</span>
              <span className="text-[10px] text-[#80a4a2]">{headers.csp.note || 'Guards against XSS'}</span>
            </div>
            {getHeaderPill(headers.csp)}
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-[#061414] border border-[#153a3a]">
            <div>
              <span className="text-white font-bold block">X-Frame-Options</span>
              <span className="text-[10px] text-[#80a4a2]">{headers.xFrameOptions.note || 'Prevents Clickjacking'}</span>
            </div>
            {getHeaderPill(headers.xFrameOptions)}
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-[#061414] border border-[#153a3a]">
            <div>
              <span className="text-white font-bold block">X-Content-Type-Options</span>
              <span className="text-[10px] text-[#80a4a2]">nosniff MIME protection</span>
            </div>
            {getHeaderPill(headers.xContentTypeOptions)}
          </div>
        </div>

        {/* Server Technology Leakage */}
        <div className="p-2.5 rounded-lg bg-[#061414] border border-[#153a3a] mb-4 text-xs font-mono">
          <div className="flex items-center space-x-1.5 text-[#80a4a2] mb-1">
            <Server className="w-3.5 h-3.5 text-[#00f2c3]" />
            <span className="font-semibold text-white">Server Banner / Technology Exposure:</span>
          </div>
          <span className="text-[#a1c4c2] break-all block">{serverFingerprint}</span>
        </div>

        {/* Cookies Audit */}
        {cookies && cookies.length > 0 && (
          <div className="p-2.5 rounded-lg bg-[#061414] border border-[#153a3a] text-xs font-mono">
            <div className="flex items-center space-x-1.5 text-[#80a4a2] mb-1.5">
              <Cookie className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span className="font-semibold text-white">Captured Cookies Security Flags:</span>
            </div>
            <div className="space-y-1">
              {cookies.map((c, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] text-[#80a4a2]">
                  <span className="text-white">{c.name}</span>
                  <div className="flex space-x-1">
                    <span className={c.secure ? 'text-[#00f2c3]' : 'text-[#f43f5e] font-bold'}>
                      {c.secure ? 'Secure' : 'NoSecure'}
                    </span>
                    <span>•</span>
                    <span className={c.httpOnly ? 'text-[#00f2c3]' : 'text-[#f43f5e] font-bold'}>
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
