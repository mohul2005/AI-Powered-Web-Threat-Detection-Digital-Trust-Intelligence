import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  ArrowLeft, 
  Database, 
  Server, 
  Cpu, 
  FileCode, 
  Layers, 
  Lock, 
  HardDrive, 
  Blocks, 
  ExternalLink,
  BookOpen,
  FileCheck,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Network,
  CheckCircle2
} from 'lucide-react';

export default function DatabaseDocsPdfView({ 
  onBackToScanner, 
  onSwitchToBeginnerGuide, 
  onSwitchToVerification 
}) {
  const [paperTheme, setPaperTheme] = useState('dark'); // 'dark' | 'whitepaper'
  const [zoomScale, setZoomScale] = useState(1);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadOfflineHtml = () => {
    window.open('http://localhost:5000/api/guide/download-db-docs-html', '_blank');
  };

  return (
    <div className={`space-y-6 max-w-4xl mx-auto py-4 transition-all ${
      paperTheme === 'whitepaper' 
        ? 'bg-white text-gray-900 p-6 sm:p-10 rounded-2xl shadow-xl' 
        : 'text-[#e2f1f0]'
    }`} style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top center' }}>
      
      {/* =================================================================== */}
      {/* ACTION & VIEWER TOOLBAR (Hidden in Print) */}
      {/* =================================================================== */}
      <div className="no-print p-4 sm:p-5 rounded-2xl bg-[#081d1d] border border-[#174242] flex flex-wrap items-center justify-between gap-3 shadow-card-dark font-mono text-xs">
        <div className="flex items-center space-x-2">
          {onBackToScanner && (
            <button
              onClick={onBackToScanner}
              className="px-3 py-1.5 rounded-lg bg-[#061414] border border-[#174242] text-[#80a4a2] hover:text-white flex items-center space-x-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Scanner</span>
            </button>
          )}

          {onSwitchToVerification && (
            <button
              onClick={onSwitchToVerification}
              className="px-3 py-1.5 rounded-lg bg-[#0b2525] border border-[#184444] text-[#80a4a2] hover:text-white flex items-center space-x-1.5 transition-colors"
              title="Switch to the Official Verification Dossier"
            >
              <FileCheck className="w-3.5 h-3.5 text-[#00f2c3]" />
              <span className="hidden sm:inline">Verification PDF</span>
            </button>
          )}

          {onSwitchToBeginnerGuide && (
            <button
              onClick={onSwitchToBeginnerGuide}
              className="px-3 py-1.5 rounded-lg bg-[#0b2525] border border-[#184444] text-[#80a4a2] hover:text-white flex items-center space-x-1.5 transition-colors"
              title="Switch to the 14-Section Beginner Architecture Guide"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#00f2c3]" />
              <span className="hidden sm:inline">Beginner PDF</span>
            </button>
          )}

          <div className="hidden lg:flex items-center space-x-1 text-[#00f2c3] font-bold pl-2 border-l border-[#174242]">
            <Database className="w-4 h-4" />
            <span>Database Architecture (PDF View)</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center space-x-1 bg-[#061414] p-1 rounded-lg border border-[#174242]">
            <button
              onClick={() => setZoomScale(Math.max(0.85, zoomScale - 0.05))}
              className="p-1 hover:text-[#00f2c3] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-[10px] px-1 font-mono">{Math.round(zoomScale * 100)}%</span>
            <button
              onClick={() => setZoomScale(Math.min(1.15, zoomScale + 0.05))}
              className="p-1 hover:text-[#00f2c3] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
            {zoomScale !== 1 && (
              <button
                onClick={() => setZoomScale(1)}
                className="p-1 text-[#80a4a2] hover:text-white"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Toggle Whitepaper / Dark preview */}
          <button
            onClick={() => setPaperTheme(paperTheme === 'dark' ? 'whitepaper' : 'dark')}
            className="px-3 py-1.5 rounded-lg bg-[#0b2525] border border-[#184444] text-[#a1c4c2] hover:text-white transition-colors"
            title="Toggle between Sentinel Dark and Printable Whitepaper mode"
          >
            <span>{paperTheme === 'dark' ? '☀️ Whitepaper' : '🌙 Dark'}</span>
          </button>

          {/* Download Offline HTML */}
          <button
            onClick={handleDownloadOfflineHtml}
            className="px-3 py-1.5 rounded-lg bg-[#0b2525] border border-[#184444] text-[#00f2c3] hover:border-[#00f2c3] flex items-center space-x-1.5 transition-colors font-bold"
            title="Download an offline, self-contained HTML database documentation file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
            <span>PDF/HTML</span>
          </button>

          {/* Print as PDF Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-lg bg-[#00f2c3] text-[#051715] font-black hover:bg-[#00f2c3]/90 flex items-center space-x-1.5 transition-all shadow-neon-sm"
            title="Print or Save this document as a clean PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Save as PDF / Print</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* COVER / OFFICIAL DATABASE HEADER */}
      {/* =================================================================== */}
      <div className={`p-8 rounded-2xl border relative overflow-hidden ${
        paperTheme === 'whitepaper' 
          ? 'bg-gradient-to-r from-sky-50 via-cyan-50 to-sky-50 border-sky-300 text-gray-900' 
          : 'bg-gradient-to-br from-[#061414] via-[#082225] to-[#041010] border-[#00f2c3]/40 shadow-neon-sm'
      } print-page-break`}>
        {/* Verification Stamp */}
        <div className={`absolute top-6 right-6 border-2 border-dashed px-3 py-1.5 rounded-xl font-mono text-xs font-black tracking-widest uppercase transform rotate-2 ${
          paperTheme === 'whitepaper'
            ? 'border-sky-600 text-sky-700 bg-white/80'
            : 'border-[#00f2c3] text-[#00f2c3] bg-[#00f2c3]/10 shadow-neon-sm'
        }`}>
          DATABASE BLUEPRINT
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wide uppercase bg-[#00f2c3]/20 border border-[#00f2c3]/40 text-[#00f2c3]">
              Section 8 Database Architecture
            </span>
            <span className="text-xs font-mono text-[#80a4a2]">
              Doc ID: TM-DB-DOCS-2026-V1
            </span>
          </div>

          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            paperTheme === 'whitepaper' ? 'text-gray-900' : 'text-white'
          }`}>
            TrustMatrix AI Nexus Database Documentation
          </h1>

          <p className={`text-sm ${paperTheme === 'whitepaper' ? 'text-gray-700' : 'text-[#a1c4c2]'}`}>
            Technical blueprint of the 5-tier hybrid persistence model: PostgreSQL relational schema, MongoDB NoSQL STIX 2.1 document models, 
            Redis high-performance caching layer, threat knowledge graph, and Ethereum Sepolia on-chain attestation registry.
          </p>

          {/* Architecture Metrics Grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t ${
            paperTheme === 'whitepaper' ? 'border-sky-200' : 'border-[#174242]'
          } font-mono text-xs`}>
            <div>
              <span className="text-[10px] uppercase text-[#7d9e9c] block">Relational DB</span>
              <span className="font-bold text-[#00f2c3] text-sm">PostgreSQL 16</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7d9e9c] block">Document Store</span>
              <span className="font-bold text-white text-sm">MongoDB STIX 2.1</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7d9e9c] block">Cache Engine</span>
              <span className="font-bold text-white text-sm">Redis 7 (TTL 300s)</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7d9e9c] block">Blockchain Ledger</span>
              <span className="font-bold text-[#00f2c3] text-sm">Ethereum Sepolia</span>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CHAPTER 1: THE 5-TIER HYBRID PERSISTENCE MODEL */}
      {/* =================================================================== */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        paperTheme === 'whitepaper' ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#081a1a] border-[#153d3d]'
      } space-y-4 print-page-break`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-[#00f2c3]" />
            <h2 className="text-base sm:text-lg font-bold">1. The 5-Tier Hybrid Persistence Model</h2>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2c3]/20 text-[#00f2c3]">
            Polyglot Storage Strategy
          </span>
        </div>

        <p className={`text-xs ${paperTheme === 'whitepaper' ? 'text-gray-600' : 'text-[#80a4a2]'}`}>
          Modern web threat detection requires handling structured relational queries, polymorphic threat intelligence feeds, 
          sub-millisecond DNS caching, and decentralized blockchain immutability. No single database fits all four requirements, 
          so TrustMatrix AI Nexus pairs 5 specialized persistence tiers:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className={`border-b ${paperTheme === 'whitepaper' ? 'bg-gray-100 border-gray-300 text-gray-700' : 'bg-[#061414] border-[#174242] text-[#80a4a2]'}`}>
                <th className="p-2.5 font-bold">Persistence Tier</th>
                <th className="p-2.5 font-bold">Technology</th>
                <th className="p-2.5 font-bold">Stored Data & Primary Purpose</th>
                <th className="p-2.5 font-bold">Code Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#174242]/40 font-mono text-[11px]">
              <tr>
                <td className="p-2.5 font-bold text-[#00f2c3]">1. Fast Cache</td>
                <td className="p-2.5">Redis 7 & Memory Store</td>
                <td className="p-2.5">DNS lookups, TLS socket handshakes, and rate limit counters</td>
                <td className="p-2.5 text-[#00f2c3]"><code>server/src/db/redisCache.js</code></td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#00f2c3]">2. Relational DB</td>
                <td className="p-2.5">PostgreSQL 16</td>
                <td className="p-2.5">Structured reports, attestations, campaigns, and indicators</td>
                <td className="p-2.5 text-[#00f2c3]"><code>server/src/db/schema.sql</code></td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#00f2c3]">3. Document Store</td>
                <td className="p-2.5">MongoDB Mongoose</td>
                <td className="p-2.5">OASIS STIX 2.1 Threat Intel packages & verifiable history</td>
                <td className="p-2.5 text-[#00f2c3]"><code>server/src/db/mongoSchema.js</code></td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#00f2c3]">4. Threat Graph</td>
                <td className="p-2.5">In-Memory Graph Store</td>
                <td className="p-2.5">Active community reports, BGP ASN edges, IPs, and mule VPAs</td>
                <td className="p-2.5 text-[#00f2c3]"><code>server/src/data/threatStore.js</code></td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-[#00f2c3]">5. Blockchain</td>
                <td className="p-2.5">Ethereum Sepolia EAS</td>
                <td className="p-2.5">Immutable SHA-256 commitments & dispute records (zero PII)</td>
                <td className="p-2.5 text-[#00f2c3]"><code>TrustMatrixRegistry.sol</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CHAPTER 2: POSTGRESQL RELATIONAL SCHEMA */}
      {/* =================================================================== */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        paperTheme === 'whitepaper' ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#081a1a] border-[#153d3d]'
      } space-y-4 print-page-break`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HardDrive className="w-5 h-5 text-[#00f2c3]" />
            <h2 className="text-base sm:text-lg font-bold">2. PostgreSQL Relational Schema (schema.sql)</h2>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2c3]/20 text-[#00f2c3]">
            ANSI SQL DDL
          </span>
        </div>

        <p className={`text-xs ${paperTheme === 'whitepaper' ? 'text-gray-600' : 'text-[#80a4a2]'}`}>
          Implements strict referential integrity, foreign key cascading, score boundary constraints (0–100), and B-Tree indexes:
        </p>

        <div className="bg-[#050e0e] border border-[#174242] p-4 rounded-xl font-mono text-[11px] text-[#00f2c3] space-y-2 overflow-x-auto">
          <div><span className="text-[#7d9e9c]">-- 1. Threat Reports Table</span></div>
          <div className="text-white">CREATE TABLE IF NOT EXISTS threat_reports (</div>
          <div className="pl-4">id VARCHAR(64) PRIMARY KEY,</div>
          <div className="pl-4">target_url TEXT NOT NULL,</div>
          <div className="pl-4">sanitized_domain VARCHAR(255) NOT NULL,</div>
          <div className="pl-4">threat_category VARCHAR(100) NOT NULL,</div>
          <div className="pl-4">trust_score SMALLINT NOT NULL CHECK (trust_score &gt;= 0 AND trust_score &lt;= 100),</div>
          <div className="pl-4">threat_level VARCHAR(32) NOT NULL,</div>
          <div className="pl-4">validation_status VARCHAR(64) NOT NULL DEFAULT 'PENDING_REVIEW',</div>
          <div className="pl-4">upvotes INT DEFAULT 0, downvotes INT DEFAULT 0,</div>
          <div className="pl-4">created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP</div>
          <div className="text-white">);</div>

          <div className="pt-2"><span className="text-[#7d9e9c]">-- 2. On-Chain Attestations Table (Relational Link to EVM)</span></div>
          <div className="text-white">CREATE TABLE IF NOT EXISTS onchain_attestations (</div>
          <div className="pl-4">id SERIAL PRIMARY KEY,</div>
          <div className="pl-4">report_id VARCHAR(64) REFERENCES threat_reports(id) ON DELETE CASCADE,</div>
          <div className="pl-4">target_hash VARCHAR(66) NOT NULL,</div>
          <div className="pl-4">commitment_hash VARCHAR(66) NOT NULL,</div>
          <div className="pl-4">evidence_ipfs_cid VARCHAR(128) NOT NULL,</div>
          <div className="pl-4">contract_address VARCHAR(42) NOT NULL,</div>
          <div className="pl-4">tx_hash VARCHAR(66) NOT NULL,</div>
          <div className="pl-4">block_number BIGINT NOT NULL</div>
          <div className="text-white">);</div>

          <div className="pt-2"><span className="text-[#7d9e9c]">-- High-Performance Indexes for Millisecond Lookups</span></div>
          <div>CREATE INDEX IF NOT EXISTS idx_threat_reports_domain ON threat_reports(sanitized_domain);</div>
          <div>CREATE INDEX IF NOT EXISTS idx_attestations_commitment ON onchain_attestations(commitment_hash);</div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CHAPTER 3: MONGODB MONGOOSE DOCUMENT MODEL */}
      {/* =================================================================== */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        paperTheme === 'whitepaper' ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#081a1a] border-[#153d3d]'
      } space-y-4 print-page-break`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileCode className="w-5 h-5 text-[#00f2c3]" />
            <h2 className="text-base sm:text-lg font-bold">3. MongoDB Mongoose Schemas (mongoSchema.js)</h2>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2c3]/20 text-[#00f2c3]">
            NoSQL STIX 2.1 Store
          </span>
        </div>

        <p className={`text-xs ${paperTheme === 'whitepaper' ? 'text-gray-600' : 'text-[#80a4a2]'}`}>
          Why NoSQL? Cyber threat intelligence uses the OASIS STIX 2.1 standard, which contains complex polymorphic objects 
          (observed-data, indicator, attack-pattern, relationship). MongoDB allows storing complete STIX 2.1 JSON packages natively:
        </p>

        <div className="bg-[#050e0e] border border-[#174242] p-4 rounded-xl font-mono text-[11px] text-[#00f2c3] space-y-2 overflow-x-auto">
          <div><span className="text-[#7d9e9c]">// ThreatReportSchemaDefinition in server/src/db/mongoSchema.js</span></div>
          <div className="text-white">export const ThreatReportSchemaDefinition = &#123;</div>
          <div className="pl-4">reportId: &#123; type: String, required: true, unique: true, index: true &#125;,</div>
          <div className="pl-4">targetUrl: &#123; type: String, required: true &#125;,</div>
          <div className="pl-4">domain: &#123; type: String, required: true, index: true &#125;,</div>
          <div className="pl-4">threatCategory: &#123; type: String, required: true &#125;,</div>
          <div className="pl-4">trustScore: &#123; type: Number, min: 0, max: 100, required: true &#125;,</div>
          <div className="pl-4">stixBundle: &#123; type: Object, default: &#123;&#125; &#125;, <span className="text-[#7d9e9c]">// Full OASIS STIX 2.1 Package</span></div>
          <div className="pl-4">onChainAttestation: &#123;</div>
          <div className="pl-8">targetHash: &#123; type: String, required: true &#125;,</div>
          <div className="pl-8">reportCommitmentHash: &#123; type: String, required: true &#125;,</div>
          <div className="pl-8">contractAddress: &#123; type: String &#125;,</div>
          <div className="pl-8">txHash: &#123; type: String &#125;</div>
          <div className="pl-4">&#125;,</div>
          <div className="pl-4">createdAt: &#123; type: Date, default: Date.now, index: true &#125;</div>
          <div className="text-white">&#125;;</div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CHAPTER 4: REDIS HIGH-PERFORMANCE CACHE */}
      {/* =================================================================== */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        paperTheme === 'whitepaper' ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#081a1a] border-[#153d3d]'
      } space-y-4 print-page-break`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#00f2c3]" />
            <h2 className="text-base sm:text-lg font-bold">4. Redis Cache & Memory Fallback (redisCache.js)</h2>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2c3]/20 text-[#00f2c3]">
            Sub-Millisecond Read Engine
          </span>
        </div>

        <p className={`text-xs ${paperTheme === 'whitepaper' ? 'text-gray-600' : 'text-[#80a4a2]'}`}>
          Live scans perform network-heavy operations (DNS resolution, TLS handshake, threat feed queries). 
          The Redis cache layer ensures identical targets resolve in under 2ms without re-triggering slow network I/O:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className={`border-b ${paperTheme === 'whitepaper' ? 'bg-gray-100 border-gray-300 text-gray-700' : 'bg-[#061414] border-[#174242] text-[#80a4a2]'}`}>
                <th className="p-2 font-bold">Namespace</th>
                <th className="p-2 font-bold">Key Pattern</th>
                <th className="p-2 font-bold">TTL</th>
                <th className="p-2 font-bold">Integration Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#174242]/40 font-mono text-[11px]">
              <tr>
                <td className="p-2 font-bold text-white">DNS Resolutions</td>
                <td className="p-2"><code>dns:&#123;hostname&#125;</code></td>
                <td className="p-2 text-[#00f2c3]">300s (5 min)</td>
                <td className="p-2"><code>server/src/engines/dnsEngine.js</code></td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-white">TLS Handshakes</td>
                <td className="p-2"><code>tls:&#123;domain&#125;:&#123;port&#125;</code></td>
                <td className="p-2 text-[#00f2c3]">600s (10 min)</td>
                <td className="p-2"><code>server/src/engines/certTrustEngine.js</code></td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-white">Threat Intel Queries</td>
                <td className="p-2"><code>intel:&#123;domain&#125;</code></td>
                <td className="p-2 text-[#00f2c3]">180s (3 min)</td>
                <td className="p-2"><code>server/src/engines/intelEngine.js</code></td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-white">Rate Limiting</td>
                <td className="p-2"><code>rate:&#123;ip&#125;</code></td>
                <td className="p-2 text-[#00f2c3]">60s (1 min)</td>
                <td className="p-2">Express Rate Limiting Guard</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CHAPTER 5: IN-MEMORY THREAT REPOSITORY & GRAPH */}
      {/* =================================================================== */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        paperTheme === 'whitepaper' ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#081a1a] border-[#153d3d]'
      } space-y-4 print-page-break`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-[#00f2c3]" />
            <h2 className="text-base sm:text-lg font-bold">5. Threat Repository & Knowledge Graph (threatStore.js)</h2>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2c3]/20 text-[#00f2c3]">
            Campaign Attribution Graph
          </span>
        </div>

        <p className={`text-xs ${paperTheme === 'whitepaper' ? 'text-gray-600' : 'text-[#80a4a2]'}`}>
          The active threat repository connects isolated reports into an interactive knowledge graph in <code>correlationEngine.js</code>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className={`p-3.5 rounded-xl border ${paperTheme === 'whitepaper' ? 'bg-gray-50 border-gray-200' : 'bg-[#061414] border-[#174242]'}`}>
            <span className="font-bold text-white block mb-1">Graph Node Types Traversed:</span>
            <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-[#80a4a2]">
              <li><code>Domain Node:</code> Target suspicious hostname (e.g. sbi-yono-pan-kyc-update.top)</li>
              <li><code>ASN Node:</code> BGP Transit provider (e.g. Choopa / Vultr AS20473)</li>
              <li><code>Host IP Node:</code> Server colocation IP (149.28.18.232)</li>
              <li><code>Payment Node:</code> Fraudulent UPI VPA handle (sbi-kyc-verify@oksbi)</li>
              <li><code>RAT Tool Node:</code> Remote desktop APK link (AnyDesk Remote Desktop)</li>
            </ul>
          </div>

          <div className={`p-3.5 rounded-xl border ${paperTheme === 'whitepaper' ? 'bg-gray-50 border-gray-200' : 'bg-[#061414] border-[#174242]'}`}>
            <span className="font-bold text-white block mb-1">Active Backend API Routes:</span>
            <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-[#80a4a2]">
              <li><code>GET /api/community/reports:</code> Retrieves all reports with EAS attestation proofs</li>
              <li><code>POST /api/report:</code> Adds report, triggers multi-source verification, anchors hash</li>
              <li><code>POST /api/community/vote:</code> Updates consensus upvote / downvote counters</li>
              <li><code>POST /api/dispute:</code> Registers a community dispute against false-positives</li>
            </ul>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CHAPTER 6: PRODUCTION DOCKER INFRASTRUCTURE */}
      {/* =================================================================== */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        paperTheme === 'whitepaper' ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#081a1a] border-[#153d3d]'
      } space-y-4 print-page-break`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-[#00f2c3]" />
            <h2 className="text-base sm:text-lg font-bold">6. Production Docker Compose Topology</h2>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00f2c3]/20 text-[#00f2c3]">
            Container Isolation
          </span>
        </div>

        <p className={`text-xs ${paperTheme === 'whitepaper' ? 'text-gray-600' : 'text-[#80a4a2]'}`}>
          In production, the application runs as 3 containerized microservices managed via <code>docker-compose.yml</code>:
        </p>

        <div className="bg-[#050e0e] border border-[#174242] p-4 rounded-xl font-mono text-[11px] text-[#00f2c3] space-y-2 overflow-x-auto">
          <div><span className="text-[#7d9e9c]"># docker-compose.yml Services Overview:</span></div>
          <div>1. <span className="text-white font-bold">trustmatrix-app:</span> Node.js + React 18 multi-stage build on port 5000</div>
          <div>2. <span className="text-white font-bold">trustmatrix-redis:</span> Redis 7 Alpine cache with persistent volume (redis-data:/data)</div>
          <div>3. <span className="text-white font-bold">trustmatrix-postgres:</span> PostgreSQL 16 Alpine with init DDL script (pg-data:/var/lib/postgresql/data)</div>
          <div className="pt-2"><span className="text-[#7d9e9c]"># To spin up the production stack:</span></div>
          <div className="text-white">docker-compose up -d</div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* CHAPTER 7: SECTION 9 PRIVACY GUARANTEES */}
      {/* =================================================================== */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        paperTheme === 'whitepaper' ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#081a1a] border-[#153d3d]'
      } space-y-4 print-page-break`}>
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-[#00f2c3]" />
          <h2 className="text-base sm:text-lg font-bold">7. Section 9 Privacy Axiom: Zero On-Chain PII</h2>
        </div>

        <div className={`p-4 rounded-xl border ${paperTheme === 'whitepaper' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-[#00f2c3]/10 border-[#00f2c3]/30 text-[#e2f1f0]'}`}>
          <span className="font-bold block mb-1">🔒 Core Privacy Principle:</span>
          <p className="text-[11px] leading-relaxed">
            "The security platform must not become a security risk itself." 
            Under Section 9, raw passwords, victim OTP codes, private keys, seed phrases, and personal identity data 
            <strong>are strictly prohibited from being written to the database or public blockchain</strong>. 
            Only irreversible SHA-256 cryptographic commitments are registered on Ethereum Sepolia.
          </p>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SIGN-OFF & CERTIFICATION FOOTER */}
      {/* =================================================================== */}
      <div className={`p-6 rounded-2xl border text-center space-y-2 ${
        paperTheme === 'whitepaper' ? 'bg-gray-50 border-gray-300 text-gray-700' : 'bg-[#061414] border-[#174242] text-[#80a4a2]'
      } text-xs font-mono`}>
        <div className="flex items-center justify-center space-x-2 text-[#00f2c3] font-bold">
          <Database className="w-4 h-4" />
          <span>TrustMatrix AI Nexus Database Documentation • Certified for HackMatrix Sentinel Nexus</span>
        </div>
        <p className="text-[11px]">
          Repository: <a href="https://github.com/mohul2005/AI-Powered-Web-Threat-Detection-Digital-Trust-Intelligence.git" target="_blank" rel="noreferrer" className="underline hover:text-[#00f2c3]">github.com/mohul2005/AI-Powered-Web-Threat-Detection-Digital-Trust-Intelligence</a>
        </p>
      </div>
    </div>
  );
}
