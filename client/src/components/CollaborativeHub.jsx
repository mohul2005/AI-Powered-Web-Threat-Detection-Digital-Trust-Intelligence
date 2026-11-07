import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Search, ExternalLink, Filter, PlusCircle, ShieldCheck } from 'lucide-react';

export default function CollaborativeHub({ onOpenReportModal }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const fetchReports = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/intel/reports');
      const data = await res.json();
      if (data.success) {
        setReports(data.reports);
      }
    } catch (err) {
      console.error('Failed to fetch reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleVote = async (reportId, type) => {
    try {
      const res = await fetch('http://localhost:5000/api/intel/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, type })
      });
      const data = await res.json();
      if (data.success) {
        setReports((prev) =>
          prev.map((r) => (r.id === reportId ? { ...r, upvotes: data.report.upvotes, downvotes: data.report.downvotes } : r))
        );
      }
    } catch (err) {
      console.error('Failed to register vote:', err);
    }
  };

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.targetUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.targetEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'ALL' || r.threatCategory.toLowerCase().includes(categoryFilter.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Feed Controls in Sentinel Dark Grey-Green */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0b2020] p-4 rounded-2xl border border-[#174242] shadow-card-dark">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#5c8280] absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search verified community threats..."
            className="w-full pl-9 pr-4 py-2 bg-[#061414] border border-[#174242] rounded-xl text-xs text-white placeholder-[#5c8280] focus:outline-none focus:ring-1 focus:ring-[#00f2c3] font-mono"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-[#5c8280] shrink-0" />
          {['ALL', 'Phishing', 'Certificate', 'Recruitment', 'Payment'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-[#00f2c3]/20 text-[#00f2c3] border border-[#00f2c3] shadow-neon-sm font-bold'
                  : 'bg-[#061414] text-[#80a4a2] border border-[#184242] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={onOpenReportModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#00f2c3]/20 border border-[#00f2c3]/40 text-[#00f2c3] hover:bg-[#00f2c3]/30 text-xs font-bold shrink-0 shadow-neon-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Submit IOC</span>
          </button>
        </div>
      </div>

      {/* Reports Feed in Deep Emerald Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="p-5 rounded-2xl bg-[#0b2020] border border-[#174242] shadow-card-dark flex flex-col justify-between hover:border-[#00f2c3]/40 transition-all"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30 uppercase font-bold">
                    {report.threatCategory}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5">
                    Target: {report.targetEntity}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-[#5c8280]">
                  {new Date(report.timestamp).toLocaleDateString()}
                </span>
              </div>

              {/* URL */}
              <div className="mb-2 text-xs font-mono text-[#00f2c3] break-all bg-[#061414] p-2 rounded-lg border border-[#153a3a] flex items-center justify-between">
                <span className="truncate mr-2">{report.targetUrl}</span>
                <a
                  href={report.targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#5c8280] hover:text-[#00f2c3]"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>

              {/* Multi-Source Verification Badge */}
              {report.verificationProof && (
                <div className="mb-2.5 p-2 rounded-lg bg-[#061414] border border-[#00f2c3]/30 flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center space-x-1.5 text-[#00f2c3] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified: {report.verificationProof.confidence} Confidence</span>
                  </span>
                  <span className="text-[10px] text-[#80a4a2]">
                    Feeds: {report.verificationProof.feedsChecked.join(', ')}
                  </span>
                </div>
              )}

              {/* Summary */}
              <p className="text-xs text-[#a1c4c2] leading-relaxed mb-3">
                {report.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {report.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#061414] text-[#80a4a2] border border-[#153a3a]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer with Upvote / Downvote and Reporter */}
            <div className="pt-3 border-t border-[#143838] flex items-center justify-between text-xs font-mono">
              <span className="text-[11px] text-[#5c8280]">
                Reporter: <strong className="text-[#a1c4c2]">{report.reporterHandle}</strong>
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleVote(report.id, 'up')}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#061414] hover:bg-[#112a2a] text-[#f43f5e] border border-[#184242] transition-colors"
                  title="Confirm Malicious (Flag)"
                >
                  <ThumbsDown className="w-3 h-3" />
                  <span>{report.upvotes}</span>
                </button>
                <button
                  onClick={() => handleVote(report.id, 'down')}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#061414] hover:bg-[#112a2a] text-[#00f2c3] border border-[#184242] transition-colors"
                  title="Dispute (Mark Benign)"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{report.downvotes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
