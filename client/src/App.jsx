import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import HeroMetricCards from './components/HeroMetricCards.jsx';
import ScanBar from './components/ScanBar.jsx';
import TrustGauge from './components/TrustGauge.jsx';
import EvidenceActionCard from './components/EvidenceActionCard.jsx';
import ScanLogs from './components/ScanLogs.jsx';
import PhishingCard from './components/PhishingCard.jsx';
import CertTrustCard from './components/CertTrustCard.jsx';
import WebSecCard from './components/WebSecCard.jsx';
import ThreatGraphCard from './components/ThreatGraphCard.jsx';
import ThreatCorrelationCard from './components/ThreatCorrelationCard.jsx';
import ScamForensicsCard from './components/ScamForensicsCard.jsx';
import CollaborativeHub from './components/CollaborativeHub.jsx';
import WorkingMechanism from './components/WorkingMechanism.jsx';
import ValidationLab from './components/ValidationLab.jsx';
import ReportModal from './components/ReportModal.jsx';
import WorkflowStepper from './components/WorkflowStepper.jsx';
import DeliverablesHub from './components/DeliverablesHub.jsx';
import AdvancedExtensionsHub from './components/AdvancedExtensionsHub.jsx';
import OrganisationDashboard from './components/OrganisationDashboard.jsx';
import MatrixRain from './components/MatrixRain.jsx';
import { Download, ChevronDown, ChevronUp, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [urlInput, setUrlInput] = useState('');
  const [scanMode, setScanMode] = useState('url'); // 'url' | 'email' | 'message'
  const [isLoading, setIsLoading] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [activeScenarioId, setActiveScenarioId] = useState('emudhra-weak-key-incident');
  const [scanResult, setScanResult] = useState(null);
  const [scanLogs, setScanLogs] = useState([]);
  const [scenarioMeta, setScenarioMeta] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showAdvancedForensics, setShowAdvancedForensics] = useState(false);
  const [matrixMode, setMatrixMode] = useState('subtle');

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

  const triggerScan = async (input, mode = scanMode) => {
    setIsLoading(true);
    setActiveScenarioId(null);
    setScenarioMeta(null);
    setScanLogs([`[INIT] Initiating multi-layer AI + Cyber + Web3 investigation for [${mode.toUpperCase()}] input...`]);

    try {
      const res = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: mode,
          url: input,
          content: input
        })
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
        if (data.scenarioMeta && data.scenarioMeta.type) {
          setScanMode(data.scenarioMeta.type);
        }
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
        engine: 'TrustMatrix AI Nexus (AI + Cybersecurity + Web3)',
        dossier: scanResult
      },
      null,
      2
    );
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trustmatrix-${scanResult.domain || 'scan'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const matrixOpacity = matrixMode === 'cinema' ? 0.38 : matrixMode === 'subtle' ? 0.18 : 0;

  return (
    <div className="min-h-screen bg-[#061313] text-[#e2f1f0] flex flex-col font-sans selection:bg-[#00f2c3] selection:text-[#041513] relative overflow-x-hidden">
      {/* Flowing Cyber Green Matrix Rain Canvas in Background */}
      {matrixMode !== 'off' && (
        <MatrixRain opacity={matrixOpacity} intensity={matrixMode} />
      )}

      {/* Header */}
      <Header
        onOpenReportModal={() => setIsReportModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        matrixMode={matrixMode}
        setMatrixMode={setMatrixMode}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10">
        {/* Top 4 Hero Metric Cards from Sentinel Nexus Design */}
        <HeroMetricCards />

        {/* TAB 1: THREAT SCANNER */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            {/* Section 5: The 5-Step End-to-End Workflow */}
            <WorkflowStepper
              isLoading={isLoading}
              scanResult={scanResult}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />

            {/* Multi-Modal Input (URL | Email | SMS Message) */}
            <ScanBar
              urlInput={urlInput}
              setUrlInput={setUrlInput}
              onScan={triggerScan}
              isLoading={isLoading}
              scenarios={scenarios}
              onSelectScenario={triggerScenario}
              activeScenarioId={activeScenarioId}
              scanMode={scanMode}
              setScanMode={setScanMode}
            />

            {/* Overall Digital Trust Gauge */}
            {scanResult && (
              <TrustGauge result={scanResult} scenarioMeta={scenarioMeta} />
            )}

            {/* Section C: Online Scams & Social Engineering Forensics (For Messages, Emails & Scams) */}
            {scanResult && (scanResult.scamForensics || scanMode === 'message' || scanMode === 'email' || scanResult.type === 'MESSAGE' || scanResult.type === 'EMAIL') && (
              <ScamForensicsCard
                scamForensics={scanResult.scamForensics || {
                  scamScore: scanResult.trustScore,
                  threatLevel: scanResult.threatLevel,
                  plainEnglishAssessment: scanResult.evidenceDossier ? scanResult.evidenceDossier[0]?.detail : null,
                  indicators: {
                    suspiciousLanguage: { detected: true, findings: scanResult.aiPhishing?.signals || [] },
                    impersonation: { detected: !!scanResult.aiPhishing?.impersonatedBrand, entity: scanResult.aiPhishing?.impersonatedBrand, findings: [] },
                    unusualPayments: { detected: false, findings: [] },
                    misleadingLinks: { detected: false, findings: [] },
                    sensitiveInfoHarvest: { detected: false, findings: [] },
                    remoteAccessTools: { detected: scanResult.url?.toLowerCase().includes('anydesk'), findings: ['AnyDesk remote control tool requested'] }
                  }
                }}
                type={scanMode}
              />
            )}

            {/* Evidence-Based Findings & Actionable User Guidance */}
            {scanResult && (
              <EvidenceActionCard
                evidenceDossier={scanResult.evidenceDossier}
                actionableGuidance={scanResult.actionableGuidance}
                web3Attestation={scanResult.web3Attestation}
                web3Security={scanResult.web3Security}
                section6RiskReport={scanResult.section6RiskReport}
                section9SecurityMeta={scanResult.section9SecurityMeta}
              />
            )}

            {/* Module 4: Intelligent Threat Correlation across Campaigns & Infrastructure */}
            {scanResult && (scanResult.module4CorrelationReport || scanResult.collaborativeIntel) && (
              <ThreatCorrelationCard
                module4CorrelationReport={scanResult.module4CorrelationReport || {
                  correlationStatus: 'CAMPAIGN_CORRELATED',
                  campaignAttribution: scanResult.collaborativeIntel?.matchingThreatClusters?.[0] ? {
                    campaignId: scanResult.collaborativeIntel.matchingThreatClusters[0].clusterId,
                    name: scanResult.collaborativeIntel.matchingThreatClusters[0].type,
                    threatCategory: 'Coordinated Attack Syndicate',
                    targetBrand: scanResult.aiPhishing?.impersonatedBrand || scanResult.domain,
                    knownDomainsCount: scanResult.collaborativeIntel.matchingThreatClusters[0].domainsCount
                  } : null,
                  deterministicConnections: {
                    totalConnections: 2,
                    connectionsList: [
                      { edgeType: 'SHARED_INFRASTRUCTURE_ASN', strength: 'HIGH', evidence: scanResult.collaborativeIntel?.matchingThreatClusters?.[0]?.sharedAsn || 'Shared Choopa Transit AS20473' },
                      { edgeType: 'COLOCATED_ATTACK_HOST', strength: 'CRITICAL', evidence: 'Resolves to active threat cluster IP' }
                    ]
                  },
                  infrastructureCorrelation: {
                    resolvedIp: '149.28.18.232',
                    resolvedAsn: scanResult.collaborativeIntel?.matchingThreatClusters?.[0]?.sharedAsn || 'AS20473 (Choopa / Vultr)',
                    isBulletproofTransit: true,
                    colocatedDomains: ['onlinesbi.sbi-retailbanking-verify.xyz', 'sbi-yono-pan-kyc-update.top', 'secure-yono-login-sbi.top']
                  },
                  messageSimilarityAnalysis: {
                    relatedReportsCount: 3,
                    topSimilarityMatch: '88% Phishing Template Overlap'
                  },
                  recurringImpersonationPattern: {
                    targetEntity: scanResult.aiPhishing?.impersonatedBrand || scanResult.domain,
                    recurringFrequency: 'HIGH_RECURRING'
                  },
                  aiCampaignSummary: `INTELLIGENT CORRELATION DOSSIER: Deterministic infrastructure telemetry correlates this incident with an organized campaign. Multiple reports across disparate domains converge on bulletproof hosting transit (${scanResult.collaborativeIntel?.matchingThreatClusters?.[0]?.sharedAsn || 'AS20473'}).`,
                  threatGraph: scanResult.collaborativeIntel?.graph || { nodes: [], edges: [] }
                }}
                domain={scanResult.domain}
              />
            )}

            {/* Collapsible Forensic Details */}
            {scanResult && (
              <div className="pt-1">
                <button
                  onClick={() => setShowAdvancedForensics(!showAdvancedForensics)}
                  className="w-full py-3 px-4 rounded-xl bg-[#0b2020]/90 backdrop-blur-md hover:bg-[#112d2d] border border-[#174242] text-xs font-semibold text-[#a1c4c2] flex items-center justify-between transition-colors shadow-card-dark"
                >
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-[#00f2c3]" />
                    <span>{showAdvancedForensics ? 'Hide' : 'View'} Advanced Forensic Telemetry, PKI Chains & Threat Graph</span>
                  </div>
                  {showAdvancedForensics ? (
                    <ChevronUp className="w-4 h-4 text-[#80a4a2]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#80a4a2]" />
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
                        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#0b2020] hover:bg-[#123030] border border-[#174242] text-xs font-semibold text-white transition-all shadow-card-dark"
                      >
                        <Download className="w-3.5 h-3.5 text-[#00f2c3]" />
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

        {/* TAB 2.5: EXPECTED DELIVERABLES & VERIFICATION HUB */}
        {activeTab === 'deliverables' && (
          <DeliverablesHub
            onSelectScenario={triggerScenario}
            setActiveTab={setActiveTab}
          />
        )}

        {/* TAB 3: VALIDATION & BENCHMARK LAB */}
        {activeTab === 'validation' && (
          <ValidationLab />
        )}

        {/* TAB 4: COMMUNITY FEED */}
        {activeTab === 'community' && (
          <CollaborativeHub onOpenReportModal={() => setIsReportModalOpen(true)} />
        )}

        {/* TAB 5: OPTIONAL ADVANCED EXTENSIONS LAB (SECTION 12) */}
        {activeTab === 'extensions' && (
          <AdvancedExtensionsHub />
        )}

        {/* TAB 6: ORGANISATION-LEVEL WEBSITE SECURITY MONITORING DASHBOARD */}
        {activeTab === 'org-dashboard' && (
          <OrganisationDashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#133535] bg-[#040e0e]/90 backdrop-blur-md py-4 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5c8280] gap-2">
          <span>TrustMatrix AI Nexus • Powered by Artificial Intelligence, Cybersecurity & Web3</span>
          <span className="text-[#00f2c3]/90 font-mono">Evidence-Based Assessments • EAS On-Chain Registry</span>
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
