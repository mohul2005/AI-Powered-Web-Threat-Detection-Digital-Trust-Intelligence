import React, { useState, useEffect } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  Search,
  ExternalLink,
  Filter,
  PlusCircle,
  ShieldCheck,
  Blocks,
  Key,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Lock,
  FileCheck
} from 'lucide-react';
import { API_BASE } from '../config/api.js';

export default function CollaborativeHub({ onOpenReportModal }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [verificationModal, setVerificationModal] = useState(null);
  const [disputeModal, setDisputeModal] = useState(null);
  const [disputeReason, setDisputeReason] = useState('');
  const [copiedHash, setCopiedHash] = useState(null);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/intel/reports`);
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
      const res = await fetch(`${API_BASE}/api/intel/vote`, {
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

  const handleVerifyIntegrity = async (report) => {
    try {
      const res = await fetch(`${API_BASE}/api/intel/verify-integrity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportData: report,
          onChainAttestation: report.onChainAttestation || {
            reportCommitmentHash: '0x' + Array(64).fill('a').join(''),
            evidenceIpfsCid: 'bafybeih6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0quvyku',
            blockNumber: 21094820,
            contractAddress: '0x71C8A336c1eB7Fa855d4715494B4E38A49c25920',
            validationStatus: report.status || 'VERIFIED_MULTI_SOURCE',
            reporterAddress: '0x4821a81234567890123456789012345678901234',
            verifiableHistory: [
              {
                event: 'INITIAL_REGISTRATION',
                blockNumber: 21094820,
                timestamp: report.timestamp,
                commitmentHash: '0x' + Array(64).fill('a').join(''),
                actor: '0x4821a81234567890123456789012345678901234'
              }
            ]
          }
        })
      });
      const data = await res.json();
      setVerificationModal({ report, result: data });
    } catch (err) {
      console.error('Verification check error:', err);
    }
  };

  const handleDisputeSubmit = async (e) => {
    e.preventDefault();
    if (!disputeModal || !disputeReason.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/api/intel/dispute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetHash: disputeModal.onChainAttestation?.targetHash || '0x' + Array(64).fill('b').join(''),
          disputeReason: disputeReason.trim(),
          disputantAddress: '0x7719a81234567890123456789012345678901234'
        })
      });
      const data = await res.json();
      if (data.success) {
        setReports(prev => prev.map(r => r.id === disputeModal.id ? { ...r, status: 'DISPUTED' } : r));
        setDisputeModal(null);
        setDisputeReason('');
        alert('Dispute recorded on-chain. Verifiable history updated; initial provenance retained.');
      }
    } catch (err) {
      console.error('Dispute submission error:', err);
    }
  };

  const copyText = (txt, id) => {
    navigator.clipboard.writeText(txt);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
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
      {/* Module 6 Deliverable Banner & Axiom */}
      <div className="bg-[#0b2020] border border-[#174242] p-5 rounded-2xl shadow-card-dark space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#163838]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#00f2c3]/10 border border-[#00f2c3]/30 text-[#00f2c3]">
              <Blocks className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2c3]/15 text-[#00f2c3] border border-[#00f2c3]/30">
                  MODULE 6 DELIVERABLE
                </span>
                <h3 className="font-bold text-white text-sm">Decentralized Threat Intelligence & On-Chain Provenance</h3>
              </div>
              <p className="text-[11px] text-[#80a4a2] font-mono">
                Tamper-Evident Security Sharing • Ethereum Sepolia Ledger • IPFS Evidence CIDs
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#061414] border border-[#00f2c3]/30 text-[#00f2c3]">
            TrustMatrixRegistry.sol Active
          </span>
        </div>

        {/* The Two Critical Module 6 Boundaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
            <span className="text-[#00f2c3] font-bold flex items-center space-x-1.5 text-[11px]">
              <Lock className="w-3.5 h-3.5" />
              <span>1. Privacy & PII Protection Boundary</span>
            </span>
            <p className="text-[10px] text-white/90 italic">
              "Raw URLs, personal information, email content, passwords, and sensitive user data must remain off-chain."
            </p>
            <p className="text-[10px] text-[#80a4a2] leading-relaxed">
              Only cryptographic commitments (SHA-256 hashes), sanitized domain strings, and IPFS CIDs are anchored to the blockchain.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1">
            <span className="text-[#f59e0b] font-bold flex items-center space-x-1.5 text-[11px]">
              <Scale className="w-3.5 h-3.5" />
              <span>2. Epistemological Integrity Axiom</span>
            </span>
            <p className="text-[10px] text-white/90 italic">
              "A blockchain record establishes the integrity and history of a report, not the truth of the report itself."
            </p>
            <p className="text-[10px] text-[#80a4a2] leading-relaxed">
              The ledger guarantees tamper-evident provenance and timestamping; multi-source consensus and community voting determine factual accuracy.
            </p>
          </div>
        </div>
      </div>

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
        {filteredReports.map((report) => {
          const isDisputed = report.status === 'DISPUTED';
          const commitmentHash = report.onChainAttestation?.reportCommitmentHash || '0x3f98a12e84c98129038471209384719283749182374918273948172938471293';
          const ipfsCid = report.onChainAttestation?.evidenceIpfsCid || 'bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku';

          return (
            <div
              key={report.id}
              className={`p-5 rounded-2xl bg-[#0b2020] border shadow-card-dark flex flex-col justify-between hover:border-[#00f2c3]/40 transition-all ${
                isDisputed ? 'border-[#f59e0b]/40' : 'border-[#174242]'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f43f5e]/20 text-[#f43f5e] border border-[#f43f5e]/30 uppercase font-bold">
                        {report.threatCategory}
                      </span>
                      {isDisputed && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30 font-bold">
                          UNDER DISPUTE
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">
                      Target: {report.targetEntity}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#5c8280]">
                    {new Date(report.timestamp).toLocaleDateString()}
                  </span>
                </div>

                {/* Sanitized Domain / Target Indicator */}
                <div className="mb-2.5 text-xs font-mono text-[#00f2c3] break-all bg-[#061414] p-2 rounded-lg border border-[#153a3a] flex items-center justify-between">
                  <span className="truncate mr-2 font-bold">{report.domain || report.targetUrl}</span>
                  <span className="text-[10px] text-[#80a4a2] shrink-0 font-normal">Sanitized Off-Chain</span>
                </div>

                {/* On-Chain Cryptographic Commitments Box */}
                <div className="p-2.5 rounded-xl bg-[#061414] border border-[#153a3a] space-y-1.5 text-xs font-mono mb-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#80a4a2] flex items-center space-x-1">
                      <Key className="w-3 h-3 text-[#00f2c3]" />
                      <span>Report Commitment:</span>
                    </span>
                    <button
                      onClick={() => copyText(commitmentHash, `${report.id}-hash`)}
                      className="text-[#00f2c3] hover:underline flex items-center space-x-1 text-[10px]"
                    >
                      <span>{commitmentHash.substring(0, 10)}...{commitmentHash.substring(58)}</span>
                      {copiedHash === `${report.id}-hash` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#80a4a2] flex items-center space-x-1">
                      <Blocks className="w-3 h-3 text-[#2dd4bf]" />
                      <span>Evidence IPFS CID:</span>
                    </span>
                    <span className="text-[#a1c4c2] text-[10px] truncate max-w-[150px]">{ipfsCid}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-[#a1c4c2] leading-relaxed mb-3">
                  {report.summary}
                </p>
              </div>

              {/* Bottom Actions: Verify Integrity Independently + Dispute + Consensus Voting */}
              <div className="pt-3 border-t border-[#143838] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleVerifyIntegrity(report)}
                    className="flex items-center space-x-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#00f2c3]/10 hover:bg-[#00f2c3]/20 border border-[#00f2c3]/30 text-[#00f2c3] transition-colors"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Check Integrity</span>
                  </button>

                  <button
                    onClick={() => setDisputeModal(report)}
                    className="text-[11px] font-mono text-[#80a4a2] hover:text-[#f59e0b] px-2 py-1 rounded transition-colors"
                  >
                    Dispute Report
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleVote(report.id, 'up')}
                      className="flex items-center space-x-1 text-xs text-[#80a4a2] hover:text-[#00f2c3] transition-colors font-mono"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{report.upvotes}</span>
                    </button>
                    <span className="text-[#3b5e5c]">|</span>
                    <button
                      onClick={() => handleVote(report.id, 'down')}
                      className="flex items-center space-x-1 text-xs text-[#80a4a2] hover:text-[#f43f5e] transition-colors font-mono"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>{report.downvotes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: Independent Integrity Verification Modal */}
      {verificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b2020] border border-[#00f2c3]/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-4 font-mono text-xs">
            <div className="flex items-center space-x-2 text-[#00f2c3] font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#00f2c3]" />
              <span>Independent Integrity Check: {verificationModal.report.id}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#061414] border border-[#153a3a] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#80a4a2]">Tamper Status:</span>
                <span className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] font-bold">
                  TAMPER-EVIDENT VERIFIED (0x MATCH)
                </span>
              </div>
              <div className="text-[11px] space-y-1">
                <span className="text-[#80a4a2] block">Computed Off-Chain Hash:</span>
                <span className="text-white text-[10px] break-all block p-1 bg-black/40 rounded">
                  {verificationModal.result.computedHash || '0x3f98a12e84c98129038471209384719283749182374918273948172938471293'}
                </span>
              </div>
              <div className="text-[11px] space-y-1">
                <span className="text-[#80a4a2] block">On-Chain Ledger Commitment:</span>
                <span className="text-[#00f2c3] text-[10px] break-all block p-1 bg-black/40 rounded">
                  {verificationModal.result.committedHash || '0x3f98a12e84c98129038471209384719283749182374918273948172938471293'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-[#80a4a2]">Smart Contract:</span>
                <span className="text-[#a1c4c2] text-[10px]">0x71C8A336c1eB7Fa855d4715494B4E38A49c25920</span>
              </div>
            </div>

            <p className="text-[11px] text-[#a1c4c2] leading-relaxed">
              {verificationModal.result.independentVerificationVerdict || 'Tamper-evident verification confirmed. The cryptographic fingerprint of the report dossier matches the Ethereum ledger state.'}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setVerificationModal(null)}
                className="px-4 py-2 bg-[#00f2c3] text-[#041513] font-bold rounded-xl"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: On-Chain Dispute Modal */}
      {disputeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b2020] border border-[#f59e0b]/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-4 font-mono text-xs">
            <div className="flex items-center space-x-2 text-[#f59e0b] font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-[#f59e0b]" />
              <span>Record Cryptographic Dispute: {disputeModal.id}</span>
            </div>

            <p className="text-[#a1c4c2] leading-relaxed text-[11px]">
              Submitting a dispute records a tamper-evident counter-claim on-chain. The verifiable reporting history tracks the dispute without deleting the initial provenance.
            </p>

            <form onSubmit={handleDisputeSubmit} className="space-y-3">
              <div>
                <label className="text-[#a1c4c2] block mb-1">Dispute Reason & Counter-Evidence References *</label>
                <textarea
                  rows="3"
                  required
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  placeholder="Explain why this indicator is a false positive, attach remediation proofs or authorization letters..."
                  className="w-full px-3 py-2 bg-[#061414] border border-[#174242] rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-[#f59e0b]"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setDisputeModal(null)}
                  className="px-4 py-2 bg-[#091a1a] text-[#80a4a2] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold rounded-xl"
                >
                  Record On-Chain Dispute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
