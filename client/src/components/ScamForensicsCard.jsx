import React from 'react';
import { MessageSquare, AlertTriangle, ShieldAlert, Key, DollarSign, ExternalLink, Monitor, Building2, HelpCircle } from 'lucide-react';

export default function ScamForensicsCard({ scamForensics, type = 'message' }) {
  if (!scamForensics) return null;

  const {
    scamScore,
    threatLevel,
    primaryCategory,
    indicators = {},
    plainEnglishAssessment
  } = scamForensics;

  const {
    suspiciousLanguage = { detected: false, findings: [] },
    impersonation = { detected: false, entity: null, findings: [] },
    unusualPayments = { detected: false, findings: [] },
    misleadingLinks = { detected: false, findings: [] },
    sensitiveInfoHarvest = { detected: false, findings: [] },
    remoteAccessTools = { detected: false, findings: [] }
  } = indicators;

  return (
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-5 shadow-card-dark space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#163838]">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Online Scam & Social Engineering Forensics</h3>
            <p className="text-[11px] text-[#80a4a2] font-mono">Deceptive Messaging, Remote Access & Psychological Lures</p>
          </div>
        </div>

        {primaryCategory && (
          <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/40">
            {primaryCategory.title}
          </span>
        )}
      </div>

      {/* Plain English Assessment */}
      {plainEnglishAssessment && (
        <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] text-xs text-[#a1c4c2] font-mono leading-relaxed">
          <p>{plainEnglishAssessment}</p>
        </div>
      )}

      {/* The 5 Section C Forensic Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
        {/* Pillar 1: Suspicious Language & Urgency */}
        <div className={`p-3 rounded-xl border space-y-1.5 ${
          suspiciousLanguage.detected ? 'bg-[#180a0d] border-[#f43f5e]/40' : 'bg-[#061414] border-[#153a3a]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center space-x-1.5">
              <AlertTriangle className={`w-3.5 h-3.5 ${suspiciousLanguage.detected ? 'text-[#f43f5e]' : 'text-[#80a4a2]'}`} />
              <span>1. Language & Urgency</span>
            </span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              suspiciousLanguage.detected ? 'bg-[#f43f5e]/20 text-[#f43f5e]' : 'bg-[#10b981]/20 text-[#10b981]'
            }`}>
              {suspiciousLanguage.detected ? 'COERCIVE' : 'NORMAL'}
            </span>
          </div>
          <p className="text-[11px] text-[#80a4a2]">
            {suspiciousLanguage.detected
              ? suspiciousLanguage.findings[0] || 'Urgent deadlines or intimidation cues detected.'
              : 'No aggressive emotional coercion or fake deadlines found.'}
          </p>
        </div>

        {/* Pillar 2: Impersonation Indicators */}
        <div className={`p-3 rounded-xl border space-y-1.5 ${
          impersonation.detected ? 'bg-[#180a0d] border-[#f43f5e]/40' : 'bg-[#061414] border-[#153a3a]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center space-x-1.5">
              <Building2 className={`w-3.5 h-3.5 ${impersonation.detected ? 'text-[#f43f5e]' : 'text-[#80a4a2]'}`} />
              <span>2. Impersonation</span>
            </span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              impersonation.detected ? 'bg-[#f43f5e]/20 text-[#f43f5e]' : 'bg-[#10b981]/20 text-[#10b981]'
            }`}>
              {impersonation.detected ? 'SPOOFED' : 'CLEAR'}
            </span>
          </div>
          <p className="text-[11px] text-[#80a4a2]">
            {impersonation.detected
              ? `Mimics '${impersonation.entity}' without authentic verification.`
              : 'No unauthorized organization impersonation detected.'}
          </p>
        </div>

        {/* Pillar 3: Unusual Payment Demands */}
        <div className={`p-3 rounded-xl border space-y-1.5 ${
          unusualPayments.detected ? 'bg-[#180a0d] border-[#f43f5e]/40' : 'bg-[#061414] border-[#153a3a]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center space-x-1.5">
              <DollarSign className={`w-3.5 h-3.5 ${unusualPayments.detected ? 'text-[#f43f5e]' : 'text-[#80a4a2]'}`} />
              <span>3. Payment Demands</span>
            </span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              unusualPayments.detected ? 'bg-[#f43f5e]/20 text-[#f43f5e]' : 'bg-[#10b981]/20 text-[#10b981]'
            }`}>
              {unusualPayments.detected ? 'IRREGULAR' : 'NORMAL'}
            </span>
          </div>
          <p className="text-[11px] text-[#80a4a2]">
            {unusualPayments.detected
              ? unusualPayments.findings[0] || 'Advance fee, personal UPI, or gift card requested.'
              : 'No unusual payment solicitations identified.'}
          </p>
        </div>

        {/* Pillar 4: Misleading Links & Obfuscation */}
        <div className={`p-3 rounded-xl border space-y-1.5 ${
          misleadingLinks.detected ? 'bg-[#180a0d] border-[#f43f5e]/40' : 'bg-[#061414] border-[#153a3a]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center space-x-1.5">
              <ExternalLink className={`w-3.5 h-3.5 ${misleadingLinks.detected ? 'text-[#f43f5e]' : 'text-[#80a4a2]'}`} />
              <span>4. Misleading Links</span>
            </span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              misleadingLinks.detected ? 'bg-[#f43f5e]/20 text-[#f43f5e]' : 'bg-[#10b981]/20 text-[#10b981]'
            }`}>
              {misleadingLinks.detected ? 'OBFUSCATED' : 'CLEAN'}
            </span>
          </div>
          <p className="text-[11px] text-[#80a4a2]">
            {misleadingLinks.detected
              ? misleadingLinks.findings[0] || 'Shortlinks (bit.ly/tinyurl) hiding final destination.'
              : 'No obfuscated or deceptive hyperlinks found.'}
          </p>
        </div>

        {/* Pillar 5: Sensitive Info Solicitation (OTP / PIN) */}
        <div className={`p-3 rounded-xl border space-y-1.5 ${
          sensitiveInfoHarvest.detected ? 'bg-[#180a0d] border-[#f43f5e]/40' : 'bg-[#061414] border-[#153a3a]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center space-x-1.5">
              <Key className={`w-3.5 h-3.5 ${sensitiveInfoHarvest.detected ? 'text-[#f43f5e]' : 'text-[#80a4a2]'}`} />
              <span>5. Secrets & OTPs</span>
            </span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              sensitiveInfoHarvest.detected ? 'bg-[#f43f5e]/20 text-[#f43f5e]' : 'bg-[#10b981]/20 text-[#10b981]'
            }`}>
              {sensitiveInfoHarvest.detected ? 'SOLICITED' : 'SECURE'}
            </span>
          </div>
          <p className="text-[11px] text-[#80a4a2]">
            {sensitiveInfoHarvest.detected
              ? sensitiveInfoHarvest.findings[0] || 'Requests OTP, UPI PIN, or bank passwords.'
              : 'No requests for authentication secrets detected.'}
          </p>
        </div>

        {/* Pillar 6: Remote Access Software Alert */}
        <div className={`p-3 rounded-xl border space-y-1.5 ${
          remoteAccessTools.detected ? 'bg-[#180a0d] border-[#f43f5e]/40' : 'bg-[#061414] border-[#153a3a]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center space-x-1.5">
              <Monitor className={`w-3.5 h-3.5 ${remoteAccessTools.detected ? 'text-[#f43f5e]' : 'text-[#80a4a2]'}`} />
              <span>6. Remote Access</span>
            </span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              remoteAccessTools.detected ? 'bg-[#f43f5e]/20 text-[#f43f5e]' : 'bg-[#10b981]/20 text-[#10b981]'
            }`}>
              {remoteAccessTools.detected ? 'DANGEROUS' : 'NONE'}
            </span>
          </div>
          <p className="text-[11px] text-[#80a4a2]">
            {remoteAccessTools.detected
              ? remoteAccessTools.findings[0] || 'Attempts to install AnyDesk/TeamViewer software.'
              : 'No remote desktop exploitation tools requested.'}
          </p>
        </div>
      </div>
    </div>
  );
}
