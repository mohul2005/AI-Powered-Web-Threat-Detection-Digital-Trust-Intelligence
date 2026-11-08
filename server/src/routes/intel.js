import express from 'express';
import { threatStore } from '../data/threatStore.js';
import { KNOWN_THREAT_CAMPAIGNS } from '../engines/correlationEngine.js';
import { generateOnChainAttestation, verifyReportIntegrity, recordReportDispute } from '../engines/web3Engine.js';

const router = express.Router();

// Get active threat campaigns (Module 4)
router.get('/campaigns', (req, res) => {
  res.json({
    success: true,
    count: KNOWN_THREAT_CAMPAIGNS.length,
    campaigns: KNOWN_THREAT_CAMPAIGNS
  });
});

// Module 6: Verify Report Integrity independently against on-chain cryptographic commitment
router.post('/verify-integrity', (req, res) => {
  const { reportData, onChainAttestation } = req.body;
  if (!onChainAttestation) {
    return res.status(400).json({ success: false, error: 'onChainAttestation is required for independent verification' });
  }

  const verificationResult = verifyReportIntegrity(reportData || {}, onChainAttestation);
  res.json({
    success: true,
    ...verificationResult
  });
});

// Module 6: Submit a Dispute against an existing threat attestation
router.post('/dispute', (req, res) => {
  const { targetHash, disputeReason, disputantAddress } = req.body;
  if (!targetHash || !disputeReason) {
    return res.status(400).json({ success: false, error: 'targetHash and disputeReason are required' });
  }

  const disputeResult = recordReportDispute(targetHash, disputeReason, disputantAddress);
  res.json({
    success: true,
    message: 'Dispute recorded on-chain in verifiable reporting history.',
    dispute: disputeResult
  });
});

// Get all community threat reports
router.get('/reports', (req, res) => {
  res.json({
    success: true,
    count: threatStore.getAllReports().length,
    reports: threatStore.getAllReports()
  });
});

// Submit a new threat report
router.post('/reports', (req, res) => {
  const { targetUrl, threatCategory, targetEntity, reporterHandle, summary, tags } = req.body;

  if (!targetUrl) {
    return res.status(400).json({ success: false, error: 'targetUrl is required' });
  }

  const created = threatStore.addReport({
    targetUrl,
    threatCategory,
    targetEntity,
    reporterHandle,
    summary,
    tags
  });

  res.status(201).json({
    success: true,
    message: 'Threat intelligence report published to collaborative registry.',
    report: created
  });
});

// Upvote or downvote a report
router.post('/vote', (req, res) => {
  const { reportId, type } = req.body;
  if (!reportId || !['up', 'down'].includes(type)) {
    return res.status(400).json({ success: false, error: 'Invalid vote parameters' });
  }

  const updated = threatStore.vote(reportId, type);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Report not found' });
  }

  res.json({
    success: true,
    report: updated
  });
});

// Export STIX 2.1 Threat Intelligence Bundle
router.get('/export/stix', (req, res) => {
  const stixBundle = threatStore.exportSTIX();
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="trustmatrix-threat-intel-stix2.1.json"');
  res.json(stixBundle);
});

// Export IOC List
router.get('/export/iocs', (req, res) => {
  const reports = threatStore.getAllReports();
  const allIocs = [];
  for (const r of reports) {
    if (r.iocList) {
      allIocs.push(...r.iocList.map(item => ({ ...item, sourceReport: r.id, threat: r.threatCategory })));
    }
  }
  res.json({
    success: true,
    count: allIocs.length,
    timestamp: new Date().toISOString(),
    iocs: allIocs
  });
});

// TAXII 2.1 Threat Sharing API Discovery & Collection Endpoint
router.get('/taxii', (req, res) => {
  res.setHeader('Content-Type', 'application/vnd.oasis.taxii+json;version=2.1');
  res.json({
    title: 'TrustMatrix Nexus TAXII 2.1 Server',
    description: 'Decentralized STIX/TAXII 2.1 automated threat intelligence sharing service',
    contact: 'soc-intel@trustmatrix.nexus',
    default: 'https://trustmatrix.nexus/api/intel/taxii/collections/active-threats',
    api_roots: ['https://trustmatrix.nexus/api/intel/taxii/v2.1'],
    collections: [
      {
        id: 'col-active-phishing-campaigns',
        title: 'Active Phishing & Smishing Campaigns',
        description: 'Verified fraudulent URLs, shortlinks, and remote-access APK drops',
        can_read: true,
        can_write: true,
        media_types: ['application/stix+json;version=2.1']
      },
      {
        id: 'col-compromised-pki-indicators',
        title: 'Compromised TLS & Certificate Anomalies',
        description: 'Weak RSA moduli, unlogged CT certificates, and rogue CA issuances',
        can_read: true,
        can_write: true,
        media_types: ['application/stix+json;version=2.1']
      }
    ]
  });
});

// Threat Intelligence Ingestion / Sharing API for SIEM / SOC Integration
router.post('/share', (req, res) => {
  const { indicator, type, threatCategory, targetBrand, confidence = 85, evidenceSource = 'SIEM_PEER_INGEST' } = req.body;

  if (!indicator || !type) {
    return res.status(400).json({
      success: false,
      error: 'indicator (e.g. domain/URL/IP) and type (e.g. DOMAIN, IP, UPI) are required'
    });
  }

  const created = threatStore.addReport({
    targetUrl: type === 'URL' || indicator.startsWith('http') ? indicator : `https://${indicator}`,
    threatCategory: threatCategory || 'Phishing / Malware Relay',
    targetEntity: targetBrand || 'Shared Threat Target',
    reporterHandle: `peer-soc-${evidenceSource.toLowerCase()}`,
    summary: `Threat intelligence shared via API: [${type}] ${indicator}`,
    tags: [type.toLowerCase(), 'api-shared', evidenceSource.toLowerCase()]
  });

  res.status(201).json({
    success: true,
    message: 'Threat indicator successfully ingested and broadcast to peer threat store.',
    attestationReference: created.web3Attestation?.txHash || '0x' + Buffer.from(indicator).toString('hex').padEnd(64, '0'),
    report: created
  });
});

export default router;
