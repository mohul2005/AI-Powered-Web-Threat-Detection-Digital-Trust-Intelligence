import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function ReportModal({ isOpen, onClose, onReportSubmitted }) {
  const [targetUrl, setTargetUrl] = useState('');
  const [threatCategory, setThreatCategory] = useState('Phishing & Brand Impersonation');
  const [targetEntity, setTargetEntity] = useState('');
  const [summary, setSummary] = useState('');
  const [reporterHandle, setReporterHandle] = useState('threat_hunter');
  const [tags, setTags] = useState('phishing, credential-harvest');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/intel/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl: targetUrl.trim(),
          threatCategory,
          targetEntity: targetEntity.trim() || 'Unspecified Target',
          reporterHandle: reporterHandle.trim() || 'anonymous_defender',
          summary: summary.trim() || 'Community reported threat',
          tags: tags.split(',').map(t => t.trim()).filter(Boolean)
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        if (onReportSubmitted) onReportSubmitted(data.report);
        setTimeout(() => {
          setSuccess(false);
          setTargetUrl('');
          setTargetEntity('');
          setSummary('');
          onClose();
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to submit report:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0b2020] border border-[#174242] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative shadow-neon-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#80a4a2] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 mb-4">
          <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Submit Threat to Collaborative Registry</h3>
            <p className="text-xs text-[#80a4a2] font-mono">Protected by automated DNS & TLS anti-poisoning probes</p>
          </div>
        </div>

        {success ? (
          <div className="p-6 text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-[#00f2c3] mx-auto animate-bounce" />
            <h4 className="font-bold text-white">Report Successfully Logged!</h4>
            <p className="text-xs text-[#80a4a2] font-mono">IOC verified & published to community threat graph and STIX feed.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-mono">
            <div>
              <label className="text-[#a1c4c2] font-semibold block mb-1">Target URL / Malicious Link *</label>
              <input
                type="text"
                required
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://malicious-login-portal.xyz/verify"
                className="w-full px-3 py-2 bg-[#061414] border border-[#174242] rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#00f2c3]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#a1c4c2] font-semibold block mb-1">Threat Category</label>
                <select
                  value={threatCategory}
                  onChange={(e) => setThreatCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#061414] border border-[#174242] rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#00f2c3]"
                >
                  <option value="Phishing & Brand Impersonation">Phishing & Brand Impersonation</option>
                  <option value="PKI Subversion & Rogue CA">PKI Subversion & Rogue CA</option>
                  <option value="Recruitment & Job Scam">Recruitment & Job Scam</option>
                  <option value="Payment Gateway Skimmer">Payment Gateway Skimmer</option>
                  <option value="Credential Harvester">Credential Harvester</option>
                </select>
              </div>

              <div>
                <label className="text-[#a1c4c2] font-semibold block mb-1">Impersonated Entity</label>
                <input
                  type="text"
                  value={targetEntity}
                  onChange={(e) => setTargetEntity(e.target.value)}
                  placeholder="e.g. State Bank of India, Google"
                  className="w-full px-3 py-2 bg-[#061414] border border-[#174242] rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#00f2c3]"
                />
              </div>
            </div>

            <div>
              <label className="text-[#a1c4c2] font-semibold block mb-1">Threat Analysis & Behavior Summary</label>
              <textarea
                rows="2"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Observed credential harvesting, fake SMS redirects, stolen favicons..."
                className="w-full px-3 py-2 bg-[#061414] border border-[#174242] rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#00f2c3]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[#a1c4c2] font-semibold block mb-1">Your Analyst Handle</label>
                <input
                  type="text"
                  value={reporterHandle}
                  onChange={(e) => setReporterHandle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#061414] border border-[#174242] rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#00f2c3]"
                />
              </div>

              <div>
                <label className="text-[#a1c4c2] font-semibold block mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 bg-[#061414] border border-[#174242] rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#00f2c3]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#091a1a] hover:bg-[#112a2a] text-[#80a4a2] rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !targetUrl.trim()}
                className="px-5 py-2 bg-[#00f2c3] hover:bg-[#2dd4bf] text-[#041513] font-extrabold rounded-xl flex items-center space-x-1.5 transition-all shadow-neon-sm disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Publish IOC</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
