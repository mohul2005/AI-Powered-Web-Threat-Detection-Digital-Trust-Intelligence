import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import ScanBar from './components/ScanBar.jsx';
import TrustGauge from './components/TrustGauge.jsx';
import ScanLogs from './components/ScanLogs.jsx';
import PhishingCard from './components/PhishingCard.jsx';
import CertTrustCard from './components/CertTrustCard.jsx';
import WebSecCard from './components/WebSecCard.jsx';
import ThreatGraphCard from './components/ThreatGraphCard.jsx';
import CollaborativeHub from './components/CollaborativeHub.jsx';
import PkiRadarView from './components/PkiRadarView.jsx';
import ReportModal from './components/ReportModal.jsx';
import { Download, Shield, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [activeScenarioId, setActiveScenarioId] = useState('emudhra-weak-key-incident');
  const [scanResult, setScanResult] = useState(null);
  const [scanLogs, setScanLogs] = useState([]);
  const [scenarioMeta, setScenarioMeta] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Fetch scenarios on initial load and run default scenario (eMudhra incident)
  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/scenarios');
      const data = await res.json();
      if (data.success) {
        setScenarios(data.scenarios);
        // Automatically load the eMudhra incident scenario as the starter showcase!
        triggerScenario('emudhra-weak-key-incident');
      }
    } catch (err) {
      console.error('Failed to load scenarios:', err);
    }
  };

  const triggerScan = async (url) => {
    setIsLoading(true);
    setActiveScenarioId(null);
    setScenarioMeta(null);
    setScanLogs([`[INIT] Launching real-time intelligence scan for ${url}...`]);

    try {
      const res = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.success) {
        setScanResult(data.result);
        setScanLogs(data.scanLogs);
      } else {
        setScanLogs(prev => [...prev, `[ERROR] Scan execution failed: ${data.error}`]);
      }
    } catch (err) {
      setScanLogs(prev => [...prev, `[ERROR] Network error connecting to scanner engine: ${err.message}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerScenario = async (scenarioId) => {
    setIsLoading(true);
    setActiveScenarioId(scenarioId);
    setScanLogs([`[INIT] Loading pre-configured incident scenario: ${scenarioId}...`]);

    try {
      const res = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId })
      });
      const data = await res.json();
      if (data.success) {
        setScanResult(data.result);
        setScanLogs(data.scanLogs);
        setScenarioMeta(data.scenarioMeta);
        setUrlInput(data.result.url);
        setActiveTab('scanner'); // switch to scanner to view results
      }
    } catch (err) {
      console.error('Failed to trigger scenario:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadDossier = () => {
    if (!scanResult) return;
    const jsonStr = JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        engine: 'TrustMatrix AI v2.0 Enterprise',
        dossier: scanResult
      },
      null,
      2
    );
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trustmatrix-security-dossier-${scanResult.domain}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top SOC Navbar */}
      <Header
        onOpenReportModal={() => setIsReportModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Render Tab Contents */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            {/* Top Scanning Input & Preset Launcher */}
            <ScanBar
              urlInput={urlInput}
              setUrlInput={setUrlInput}
              onScan={triggerScan}
              isLoading={isLoading}
              scenarios={scenarios}
              onSelectScenario={triggerScenario}
              activeScenarioId={activeScenarioId}
            />

            {/* Live Terminal Telemetry Output */}
            <ScanLogs logs={scanLogs} />

            {/* Overall Digital Trust Gauge */}
            {scanResult && (
              <TrustGauge result={scanResult} scenarioMeta={scenarioMeta} />
            )}

            {/* Deep Forensic Cards Grid */}
            {scanResult && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. AI Phishing & Brand Impersonation */}
                <PhishingCard aiPhishing={scanResult.aiPhishing} />

                {/* 2. Certificate & PKI Trust Infrastructure */}
                <CertTrustCard certTrust={scanResult.certTrust} />

                {/* 3. Web Application Security Posture */}
                <WebSecCard webSec={scanResult.webSec} />

                {/* 4. Collaborative Threat Graph & IOCs */}
                <ThreatGraphCard
                  collaborativeIntel={scanResult.collaborativeIntel}
                  domain={scanResult.domain}
                />
              </div>
            )}

            {/* Export Bar */}
            {scanResult && (
              <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md">
                <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>Dossier ready for compliance audit & SIEM ingestion</span>
                </div>
                <button
                  onClick={handleDownloadDossier}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Forensic Dossier (JSON)</span>
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pki-radar' && (
          <PkiRadarView onScanScenario={triggerScenario} />
        )}

        {activeTab === 'community' && (
          <CollaborativeHub onOpenReportModal={() => setIsReportModalOpen(true)} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
          <span>TrustMatrix AI © 2026 • AI-Powered Web Threat Detection & Digital Trust Intelligence</span>
          <span className="text-cyan-500/80">Addressing Phishing, PKI Subversion & eMudhra Incident Defense</span>
        </div>
      </footer>

      {/* Threat Report Submission Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReportSubmitted={() => {
          // If in community view, user will see the newly published report
        }}
      />
    </div>
  );
}
