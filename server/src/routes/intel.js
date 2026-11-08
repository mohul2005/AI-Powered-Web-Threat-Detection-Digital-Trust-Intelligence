import express from 'express';
import { threatStore } from '../data/threatStore.js';
import { KNOWN_THREAT_CAMPAIGNS } from '../engines/correlationEngine.js';

const router = express.Router();

// Get active threat campaigns (Module 4)
router.get('/campaigns', (req, res) => {
  res.json({
    success: true,
    count: KNOWN_THREAT_CAMPAIGNS.length,
    campaigns: KNOWN_THREAT_CAMPAIGNS
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

export default router;
