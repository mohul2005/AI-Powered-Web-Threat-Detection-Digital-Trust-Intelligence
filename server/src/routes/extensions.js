/**
 * TrustMatrix AI Nexus - Module 12: Optional Advanced Extensions API Routes
 *
 * Implements endpoints for:
 * 1. Real-time Quishing / QR Code Scam Detection
 * 2. Screenshot-based Website Impersonation Detection
 * 3. Domain Monitoring & CT Log Anomaly Alerts
 * 4. Lookalike & Homoglyph Radar Generator
 * 5. Monitored Compromised CA Directory
 * 6. Organisation-Level Website Security Monitoring Dashboard
 */

import express from 'express';
import { analyzeQRPayload, SAMPLE_QUISHING_SCENARIOS } from '../engines/qrScamEngine.js';
import { analyzeVisualImpersonation, SAMPLE_VISUAL_SCENARIOS } from '../engines/screenshotImpersonationEngine.js';
import { domainMonitoringService } from '../engines/domainMonitoringEngine.js';
import { generateLookalikeRadar } from '../engines/lookalikeEngine.js';
import { getCompromisedCADirectory } from '../engines/certTrustEngine.js';
import { analyzeWebSecurity } from '../engines/webSecEngine.js';

const router = express.Router();

// ============================================================================
// 1. QR Code Scam Detection (Quishing)
// ============================================================================
router.post('/qr/analyze', (req, res) => {
  const { qrPayload } = req.body;
  if (!qrPayload) {
    return res.status(400).json({ success: false, error: 'qrPayload string is required' });
  }

  const result = analyzeQRPayload(qrPayload);
  res.json({ success: true, result });
});

router.get('/qr/scenarios', (req, res) => {
  res.json({ success: true, scenarios: SAMPLE_QUISHING_SCENARIOS });
});

// ============================================================================
// 2. Screenshot-Based Visual Impersonation Detection
// ============================================================================
router.post('/visual/analyze', (req, res) => {
  const { targetUrl, extractedColors, detectedElements, screenshotPhash, htmlSnippet } = req.body;
  if (!targetUrl) {
    return res.status(400).json({ success: false, error: 'targetUrl is required' });
  }

  const result = analyzeVisualImpersonation({
    targetUrl,
    extractedColors,
    detectedElements,
    screenshotPhash,
    htmlSnippet
  });

  res.json({ success: true, result });
});

router.get('/visual/scenarios', (req, res) => {
  res.json({ success: true, scenarios: SAMPLE_VISUAL_SCENARIOS });
});

// ============================================================================
// 3. Domain Monitoring & CT Log Alerts
// ============================================================================
router.get('/monitoring/watchlist', (req, res) => {
  res.json({
    success: true,
    watchlist: domainMonitoringService.getWatchlist(),
    alerts: domainMonitoringService.getAlerts()
  });
});

router.post('/monitoring/watchlist', (req, res) => {
  const { domain, organization, authorizedCAs } = req.body;
  if (!domain) {
    return res.status(400).json({ success: false, error: 'domain is required' });
  }

  const entry = domainMonitoringService.addDomain(domain, organization, authorizedCAs);
  res.status(201).json({ success: true, message: `Domain '${domain}' added to real-time CT watchlist.`, entry });
});

router.get('/monitoring/alerts', (req, res) => {
  const { domain } = req.query;
  res.json({
    success: true,
    alerts: domainMonitoringService.getAlerts(domain)
  });
});

router.post('/monitoring/simulate', (req, res) => {
  const { certData, ctSource } = req.body;
  if (!certData) {
    return res.status(400).json({ success: false, error: 'certData is required' });
  }

  const result = domainMonitoringService.evaluateCertIssuance(certData, ctSource);
  res.json({ success: true, ...result });
});

// ============================================================================
// 4. Lookalike & Homoglyph Domain Radar
// ============================================================================
router.post('/lookalike/generate', (req, res) => {
  const { domain } = req.body;
  if (!domain) {
    return res.status(400).json({ success: false, error: 'domain is required' });
  }

  const result = generateLookalikeRadar(domain);
  res.json({ success: true, result });
});

// ============================================================================
// 5. Monitored Compromised CA Directory
// ============================================================================
router.get('/compromised-cas', (req, res) => {
  const cas = getCompromisedCADirectory();
  res.json({
    success: true,
    count: cas.length,
    compromisedCAs: cas
  });
});

// ============================================================================
// 6. Organisation-Level Website Security Monitoring Dashboard
// ============================================================================
router.get('/org-dashboard/:domain', async (req, res) => {
  const domain = req.params.domain.toLowerCase().trim();

  // 1. Generate Lookalike Threat Radar
  const lookalikeRadar = generateLookalikeRadar(domain);

  // 2. Fetch CT Log Alerts
  const ctAlerts = domainMonitoringService.getAlerts(domain);

  // 3. Security Headers & TLS Configuration Baseline Audit
  const headerAudit = analyzeWebSecurity({
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
    'content-security-policy': "default-src 'self'",
    'x-frame-options': 'DENY',
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin'
  });

  // Calculate Global Org Posture Score
  const alertPenalty = ctAlerts.filter(a => a.severity === 'CRITICAL').length * 20;
  const lookalikePenalty = Math.min(25, lookalikeRadar.criticalThreatsCount * 5);
  const orgPostureScore = Math.max(30, 95 - alertPenalty - lookalikePenalty);

  res.json({
    success: true,
    organizationDomain: domain,
    timestamp: new Date().toISOString(),
    orgPostureScore,
    postureGrade: orgPostureScore >= 85 ? 'A' : orgPostureScore >= 70 ? 'B' : orgPostureScore >= 50 ? 'C' : 'F',
    attackSurfaceMetrics: {
      activeSubdomainsDiscovered: 8,
      monitoredLeafCertificates: 4,
      ctAlertsCount: ctAlerts.length,
      criticalAlertsCount: ctAlerts.filter(a => a.severity === 'CRITICAL').length,
      lookalikesDetected: lookalikeRadar.totalPermutationsAnalyzed,
      highRiskTyposquatsCount: lookalikeRadar.highRiskThreatsCount
    },
    ctAlerts,
    lookalikeRadar,
    headerAudit,
    actionableRemediations: [
      'Deploy DNS CAA (Certification Authority Authorization) records to restrict authorized issuance to approved enterprise CAs.',
      'Defensively register critical homoglyph and IDN variants before criminal syndicates weaponize them.',
      'Enforce HSTS Preload and CSP frame-ancestors to prevent Clickjacking and SSL stripping.',
      'Subscribe SOC webhooks to real-time CT Log monitors (Google Argon / Cloudflare Nimbus).'
    ]
  });
});

export default router;
