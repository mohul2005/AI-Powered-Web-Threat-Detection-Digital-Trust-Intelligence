import React, { useState, useEffect } from 'react';
import { Radio, ThumbsUp, ThumbsDown, ShieldAlert, Search, FileCode2, ExternalLink, Filter, PlusCircle } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Feed Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search verified community threats..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          {['ALL', 'Phishing', 'Certificate', 'Recruitment', 'Payment'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={onOpenReportModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600/30 text-xs font-semibold shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Submit IOC</span>
          </button>
        </div>
      </div>

      {/* Reports Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase font-bold">
                    {report.threatCategory}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100 mt-1.5">
                    Target: {report.targetEntity}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  {new Date(report.timestamp).toLocaleDateString()}
                </span>
              </div>

              {/* URL */}
              <div className="mb-2 text-xs font-mono text-cyan-400 break-all bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="truncate mr-2">{report.targetUrl}</span>
                <a
                  href={report.targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-cyan-300"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>

              {/* Summary */}
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {report.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {report.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer with Upvote / Downvote and Reporter */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-[11px] text-slate-500">
                Reporter: <strong className="text-slate-400">{report.reporterHandle}</strong>
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleVote(report.id, 'up')}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-rose-400 border border-slate-800 transition-colors"
                  title="Confirm Malicious (Flag)"
                >
                  <ThumbsDown className="w-3 h-3" />
                  <span>{report.upvotes}</span>
                </button>
                <button
                  onClick={() => handleVote(report.id, 'down')}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 transition-colors"
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
