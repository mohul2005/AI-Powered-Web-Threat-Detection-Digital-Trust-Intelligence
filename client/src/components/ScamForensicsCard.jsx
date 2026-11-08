import React from 'react';
import {
  MessageSquare,
  AlertTriangle,
  ShieldAlert,
  Key,
  DollarSign,
  ExternalLink,
  Monitor,
  Building2,
  HelpCircle,
  Link2,
  Mail,
  Phone,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Scale
} from 'lucide-react';

export default function ScamForensicsCard({ scamForensics, type = 'message' }) {
  if (!scamForensics) return null;

  const {
    scamScore,
    threatLevel,
    primaryCategory,
    indicators = {},
    extractedEntities = {},
    module3ScamReport = null,
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

  // Module 3 status & boundary information
  const status = module3ScamReport?.status || (scamScore < 40 ? 'VERIFIED_EVIDENCE_OF_FRAUD' : (suspiciousLanguage.detected ? 'SUSPICIOUS_URGENT_LANGUAGE_NO_FRAUD_EVIDENCE' : 'BENIGN_COMMUNICATION'));
  const boundaryRule = module3ScamReport?.boundaryRule || {
    axiom: 'A message should not be labelled fraudulent solely because it contains urgent or persuasive language.',
    urgentLanguageDetected: suspiciousLanguage.detected,
    verifiedFraudEvidenceDetected: scamScore < 40,
    assessmentRationale: scamScore < 40
      ? 'Verified evidence of active fraud identified.'
      : (suspiciousLanguage.detected
        ? 'AI Boundary Rule Enforced: Urgent language present, but no verified evidence of fraud was identified.'
        : 'Communication exhibits benign characteristics.')
  };

  const urls = extractedEntities.urls || misleadingLinks.links || [];
  const emails = extractedEntities.emails || [];
  const phoneNumbers = extractedEntities.phoneNumbers || [];
  const paymentHandles = extractedEntities.paymentHandles || [];

  return (
    <div className="bg-[#0b2020] border border-[#174242] rounded-2xl p-5 shadow-card-dark space-y-4">
      {/* Module 3 Header & 3-Tier Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#163838]">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30">
                MODULE 3 DELIVERABLE
              </span>
              <h3 className="font-bold text-white text-sm">AI-Powered Scam & Message Analysis</h3>
            </div>
            <p className="text-[11px] text-[#80a4a2] font-mono">
              Social Engineering Detection • Entity Extraction • Threat Intel Correlation
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {status === 'VERIFIED_EVIDENCE_OF_FRAUD' && (
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/40 flex items-center space-x-1.5 shadow-[0_0_12px_rgba(244,63,94,0.25)]">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>VERIFIED EVIDENCE OF FRAUD</span>
            </span>
          )}

          {status === 'SUSPICIOUS_URGENT_LANGUAGE_NO_FRAUD_EVIDENCE' && (
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 flex items-center space-x-1.5 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>URGENT LANGUAGE (NO FRAUD EVIDENCE)</span>
            </span>
          )}

          {status === 'BENIGN_COMMUNICATION' && (
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>BENIGN COMMUNICATION</span>
            </span>
          )}

          {primaryCategory && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono text-[#a1c4c2] bg-[#061414] border border-[#174242]">
              {primaryCategory.title}
            </span>
          )}
        </div>
      </div>

      {/* CRUCIAL AI BOUNDARY RULE CALLOUT BANNER */}
      <div className={`p-4 rounded-xl border ${
        status === 'SUSPICIOUS_URGENT_LANGUAGE_NO_FRAUD_EVIDENCE'
          ? 'bg-[#1a140a] border-[#f59e0b]/40 text-[#f59e0b]'
          : status === 'VERIFIED_EVIDENCE_OF_FRAUD'
          ? 'bg-[#180a0d] border-[#f43f5e]/40 text-[#f43f5e]'
          : 'bg-[#061414] border-[#00f2c3]/30 text-[#00f2c3]'
      }`}>
        <div className="flex items-start space-x-3">
          <div className="p-1.5 rounded-lg bg-black/40 border border-current mt-0.5">
            <Scale className="w-4 h-4" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="font-bold text-xs uppercase tracking-wide flex items-center space-x-2 text-white">
                <span>Crucial AI Boundary Rule</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-normal bg-black/30 border border-white/10 text-[#a1c4c2]">
                  Section 4 • Module 3 Requirement
                </span>
              </h4>
              <div className="flex items-center space-x-3 text-[11px] font-mono">
                <span className="flex items-center space-x-1">
                  <span className="text-[#80a4a2]">Urgent Phrasing:</span>
                  <span className={`font-bold ${boundaryRule.urgentLanguageDetected ? 'text-[#f59e0b]' : 'text-[#10b981]'}`}>
                    {boundaryRule.urgentLanguageDetected ? 'YES' : 'NO'}
                  </span>
                </span>
                <span className="text-[#174242]">|</span>
                <span className="flex items-center space-x-1">
                  <span className="text-[#80a4a2]">Verified Fraud Evidence:</span>
                  <span className={`font-bold ${boundaryRule.verifiedFraudEvidenceDetected ? 'text-[#f43f5e]' : 'text-[#10b981]'}`}>
                    {boundaryRule.verifiedFraudEvidenceDetected ? 'CONFIRMED' : 'NONE'}
                  </span>
                </span>
              </div>
            </div>

            <p className="text-xs text-white/90 italic font-mono">
              "{boundaryRule.axiom}"
            </p>

            <p className="text-[11px] text-[#a1c4c2] font-mono leading-relaxed pt-0.5">
              {boundaryRule.assessmentRationale}
            </p>
          </div>
        </div>
      </div>

      {/* Extracted Indicators & Threat Intelligence Correlation Grid */}
      <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#163838]">
          <span className="text-xs font-mono font-bold text-white flex items-center space-x-2">
            <Link2 className="w-3.5 h-3.5 text-[#00f2c3]" />
            <span>Extracted Indicators & Threat Intelligence Correlation</span>
          </span>
          <span className="text-[11px] font-mono text-[#80a4a2]">
            Total Extracted: {urls.length + emails.length + phoneNumbers.length + paymentHandles.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs font-mono">
          {/* Extracted URLs */}
          <div className="p-2.5 rounded-lg bg-[#0b2020] border border-[#174242] space-y-1">
            <div className="flex items-center justify-between text-[#80a4a2]">
              <span className="flex items-center space-x-1 text-[11px]">
                <ExternalLink className="w-3 h-3 text-[#00f2c3]" />
                <span>URLs Extracted ({urls.length})</span>
              </span>
              {urls.some(u => u.isShortened) && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-[#f59e0b]/20 text-[#f59e0b]">SHORTENED</span>
              )}
            </div>
            {urls.length > 0 ? (
              <div className="space-y-1">
                {urls.slice(0, 2).map((u, i) => (
                  <div key={i} className="truncate text-white text-[11px] bg-black/30 px-1.5 py-0.5 rounded border border-[#163838]">
                    <span className="text-[#00f2c3]">{u.domain || u.url}</span>
                    {u.score < 40 && <span className="ml-1 text-[9px] text-[#f43f5e] font-bold">[DECEPTIVE]</span>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#80a4a2] italic">No hyperlinks found in message</p>
            )}
          </div>

          {/* Extracted Emails */}
          <div className="p-2.5 rounded-lg bg-[#0b2020] border border-[#174242] space-y-1">
            <div className="flex items-center justify-between text-[#80a4a2]">
              <span className="flex items-center space-x-1 text-[11px]">
                <Mail className="w-3 h-3 text-[#00f2c3]" />
                <span>Emails Extracted ({emails.length})</span>
              </span>
              {emails.some(e => e.isFreeWebmail) && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-[#f59e0b]/20 text-[#f59e0b]">FREE WEBMAIL</span>
              )}
            </div>
            {emails.length > 0 ? (
              <div className="space-y-1">
                {emails.slice(0, 2).map((e, i) => (
                  <div key={i} className="truncate text-white text-[11px] bg-black/30 px-1.5 py-0.5 rounded border border-[#163838]">
                    <span>{e.email}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#80a4a2] italic">No email addresses found</p>
            )}
          </div>

          {/* Extracted Phone Numbers */}
          <div className="p-2.5 rounded-lg bg-[#0b2020] border border-[#174242] space-y-1">
            <div className="flex items-center justify-between text-[#80a4a2]">
              <span className="flex items-center space-x-1 text-[11px]">
                <Phone className="w-3 h-3 text-[#00f2c3]" />
                <span>Helplines / Numbers ({phoneNumbers.length})</span>
              </span>
              {phoneNumbers.some(p => p.isTollFree) && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-[#00f2c3]/20 text-[#00f2c3]">TOLL-FREE</span>
              )}
            </div>
            {phoneNumbers.length > 0 ? (
              <div className="space-y-1">
                {phoneNumbers.slice(0, 2).map((p, i) => (
                  <div key={i} className="truncate text-white text-[11px] bg-black/30 px-1.5 py-0.5 rounded border border-[#163838]">
                    <span>{p.number}</span>
                    <span className="ml-1 text-[9px] text-[#80a4a2]">({p.type})</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#80a4a2] italic">No phone numbers detected</p>
            )}
          </div>

          {/* Extracted Payments / UPI */}
          <div className="p-2.5 rounded-lg bg-[#0b2020] border border-[#174242] space-y-1">
            <div className="flex items-center justify-between text-[#80a4a2]">
              <span className="flex items-center space-x-1 text-[11px]">
                <CreditCard className="w-3 h-3 text-[#00f2c3]" />
                <span>Payment Handles ({paymentHandles.length})</span>
              </span>
              {paymentHandles.length > 0 && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-[#f43f5e]/20 text-[#f43f5e]">SOLICITED</span>
              )}
            </div>
            {paymentHandles.length > 0 ? (
              <div className="space-y-1">
                {paymentHandles.slice(0, 2).map((pay, i) => (
                  <div key={i} className="truncate text-white text-[11px] bg-black/30 px-1.5 py-0.5 rounded border border-[#163838]">
                    <span className="text-[#f59e0b]">{pay.handle}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#80a4a2] italic">No payment handles found</p>
            )}
          </div>
        </div>
      </div>

      {/* The 6 Section C & Module 3 Forensic Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
        {/* Pillar 1: Suspicious Language & Urgency */}
        <div className={`p-3 rounded-xl border space-y-1.5 ${
          suspiciousLanguage.detected ? 'bg-[#180a0d] border-[#f43f5e]/40' : 'bg-[#061414] border-[#153a3a]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center space-x-1.5">
              <AlertTriangle className={`w-3.5 h-3.5 ${suspiciousLanguage.detected ? 'text-[#f59e0b]' : 'text-[#80a4a2]'}`} />
              <span>1. Urgency Manipulation</span>
            </span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              suspiciousLanguage.detected ? 'bg-[#f59e0b]/20 text-[#f59e0b]' : 'bg-[#10b981]/20 text-[#10b981]'
            }`}>
              {suspiciousLanguage.detected ? 'COERCIVE' : 'NORMAL'}
            </span>
          </div>
          <p className="text-[11px] text-[#80a4a2] leading-relaxed">
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
          <p className="text-[11px] text-[#80a4a2] leading-relaxed">
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
              <span>3. Payment Solicitations</span>
            </span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              unusualPayments.detected ? 'bg-[#f43f5e]/20 text-[#f43f5e]' : 'bg-[#10b981]/20 text-[#10b981]'
            }`}>
              {unusualPayments.detected ? 'IRREGULAR' : 'NORMAL'}
            </span>
          </div>
          <p className="text-[11px] text-[#80a4a2] leading-relaxed">
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
          <p className="text-[11px] text-[#80a4a2] leading-relaxed">
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
          <p className="text-[11px] text-[#80a4a2] leading-relaxed">
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
          <p className="text-[11px] text-[#80a4a2] leading-relaxed">
            {remoteAccessTools.detected
              ? remoteAccessTools.findings[0] || 'Attempts to install AnyDesk/TeamViewer software.'
              : 'No remote desktop exploitation tools requested.'}
          </p>
        </div>
      </div>

      {/* Understandable Plain-English Explanation */}
      {plainEnglishAssessment && (
        <div className="p-3.5 rounded-xl bg-[#061414] border border-[#153a3a] text-xs text-[#a1c4c2] font-mono leading-relaxed">
          <p className="font-bold text-white mb-1 flex items-center space-x-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#00f2c3]" />
            <span>Plain-English Assessment for Users & Teams:</span>
          </p>
          <p>{plainEnglishAssessment}</p>
        </div>
      )}
    </div>
  );
}
