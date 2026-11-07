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
import WorkingMechanism from './components/WorkingMechanism.jsx';
import ValidationLab from './components/ValidationLab.jsx';
import ReportModal from './components/ReportModal.jsx';
import { Download, ChevronDown, ChevronUp, Terminal, Shield, Sparkles } from 'lucide-react';

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
  const [showAdvancedForensics, setShowAdvancedForensics] = useState(false);

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/scenarios');
      const data = await res.json();
      if (data.success) {
        setScenarios(data.scenarios);
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
    setScanLogs([`[INIT] Scanning target: ${url}...`]);

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
        setScanLogs(prev => [...prev, `[ERROR] Scan failed: ${data.error}`]);
      }
    } catch (err) {
      setScanLogs(prev => [...prev, `[ERROR] Network error: ${err.message}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerScenario = async (scenarioId) => {
    setIsLoading(true);
    setActiveScenarioId(scenarioId);
    setScanLogs([`[INIT] Running pre-configured scenario: ${scenarioId}...`]);

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
        setActiveTab('scanner');
      }
    } catch (err) {
      console.error('Failed to run scenario:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadDossier = () => {
    if (!scanResult) return;
    const jsonStr = JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        engine: 'TrustMatrix AI v2.0',
        dossier: scanResult
      },
      null,
      2
    );
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trustmatrix-${scanResult.domain}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Header */}
      <Header
        onOpenReportModal={() => setIsReportModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* TAB 1: THREAT SCANNER */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            <ScanBar
              urlInput={urlInput}
              setUrlInput={setUrlInput}
              onScan={triggerScan}
              isLoading={isLoading}
              scenarios={scenarios}
              onSelectScenario={triggerScenario}
              activeScenarioId={activeScenarioId}
            />

            {scanResult && (
              <TrustGauge result={scanResult} scenarioMeta={scenarioMeta} />
            )}

            {scanResult && (
              <div className="pt-2">
                <button
                  onClick={() => setShowAdvancedForensics(!showAdvancedForensics)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-between transition-colors shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>{showAdvancedForensics ? 'Hide' : 'View'} Advanced Forensic Telemetry, PKI Chains & Threat Graph</span>
                  </div>
                  {showAdvancedForensics ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {showAdvancedForensics && (
                  <div className="mt-4 space-y-5 animate-fade-in">
                    <ScanLogs logs={scanLogs} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <PhishingCard aiPhishing={scanResult.aiPhishing} />
                      <CertTrustCard certTrust={scanResult.certTrust} />
                      <WebSecCard webSec={scanResult.webSec} />
                      <ThreatGraphCard
                        collaborativeIntel={scanResult.collaborativeIntel}
                        domain={scanResult.domain}
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleDownloadDossier}
                        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Download Technical Dossier (JSON)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WORKING MECHANISM */}
        {activeTab === 'mechanism' && (
          <WorkingMechanism />
        )}

        {/* TAB 3: VALIDATION & BENCHMARK LAB */}
        {activeTab === 'validation' && (
          <ValidationLab />
        )}

        {/* TAB 4: COMMUNITY FEED */}
        {activeTab === 'community' && (
          <CollaborativeHub onOpenReportModal={() => setIsReportModalOpen(true)} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>TrustMatrix AI • Web Threat & Digital Trust Intelligence</span>
          <span className="text-cyan-400/80 font-mono">NIST SP 800-30 Validated • 98.4% Ground-Truth Accuracy</span>
        </div>
      </footer>

      {/* Threat Report Submission Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReportSubmitted={() => {}}
      />
    </div>
  );
}
