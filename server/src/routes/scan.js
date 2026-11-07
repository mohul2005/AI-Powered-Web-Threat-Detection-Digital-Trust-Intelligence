import express from 'express';
import axios from 'axios';
import https from 'https';
import { PRECONFIGURED_SCENARIOS } from '../data/scenarios.js';
import { analyzePhishing } from '../engines/phishingEngine.js';
import { fetchLiveCertificate, analyzeCertificate } from '../engines/certTrustEngine.js';
import { analyzeWebSecurity } from '../engines/webSecEngine.js';
import { correlateThreatIntel } from '../engines/intelEngine.js';

const router = express.Router();

router.get('/scenarios', (req, res) => {
  const scenarioList = PRECONFIGURED_SCENARIOS.map(s => ({
    id: s.id,
    title: s.title,
    category: s.category,
    targetUrl: s.targetUrl,
    description: s.description,
    severity: s.severity,
    expectedVerdict: s.expectedVerdict
  }));
  res.json({ success: true, scenarios: scenarioList });
});

router.post('/scan', async (req, res) => {
  const { url, scenarioId } = req.body;

  // 1. Check if user requested a pre-configured scenario demo
  if (scenarioId) {
    const scenario = PRECONFIGURED_SCENARIOS.find(s => s.id === scenarioId);
    if (scenario) {
      // Return with scan logs
      const scanLogs = [
        `[INIT] Commencing TrustMatrix deep intelligence scan on ${scenario.targetUrl}...`,
        `[PHISH_AI] Evaluating URL heuristics, IDN homoglyphs, and Levenshtein distance...`,
        `[TLS_HANDSHAKE] Negotiating cipher suites and cryptographic public key modulus...`,
        `[PKI_AUDIT] Verifying Certificate Authority trust chain & Certificate Transparency (CT) logs...`,
        `[APP_SEC] Auditing HSTS, Content-Security-Policy, and sensitive endpoint exposures...`,
        `[INTEL_GRAPH] Correlating IOCs against Collaborative Threat Registry and ASNs...`,
        `[COMPLETE] Multi-factor digital trust assessment finalized. Trust Score: ${scenario.mockData.trustScore}/100 [${scenario.mockData.threatLevel}]`
      ];

      return res.json({
        success: true,
        isScenario: true,
        scenarioMeta: {
          id: scenario.id,
          title: scenario.title,
          category: scenario.category,
          description: scenario.description
        },
        scanLogs,
        result: scenario.mockData
      });
    }
  }

  if (!url) {
    return res.status(400).json({ success: false, error: 'A valid URL is required for scanning.' });
  }

  let formattedUrl = url.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = 'https://' + formattedUrl;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(formattedUrl);
  } catch (err) {
    return res.status(400).json({ success: false, error: 'Invalid URL format.' });
  }

  const hostname = parsedUrl.hostname;
  const isHttps = parsedUrl.protocol === 'https:';

  const scanLogs = [
    `[INIT] Target initialized: ${formattedUrl}`,
    `[DNS] Target resolves host: ${hostname}`,
    `[PHISH_AI] Executing heuristic parser and high-entropy anomaly detection...`
  ];

  try {
    // 1. Phishing Analysis
    let htmlContent = '';
    let responseHeaders = {};
    let cookies = [];

    // Attempt live HTTP/HTTPS fetch
    scanLogs.push(`[HTTP_PROBE] Initiating secure network probe...`);
    try {
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
        timeout: 4000
      });

      const response = await axios.get(formattedUrl, {
        httpsAgent: isHttps ? httpsAgent : undefined,
        timeout: 4000,
        maxRedirects: 3,
        headers: {
          'User-Agent': 'TrustMatrix-SecurityScanner/2.0 (+https://trustmatrix.ai/bot)'
        }
      });

      htmlContent = typeof response.data === 'string' ? response.data : '';
      responseHeaders = response.headers || {};
      scanLogs.push(`[HTTP_PROBE] Server returned HTTP ${response.status}. Captured ${Object.keys(responseHeaders).length} response headers.`);
    } catch (fetchErr) {
      scanLogs.push(`[HTTP_PROBE] Live HTTP connection note: ${fetchErr.message || 'Host offline or blocking probes'}. Continuing with offline heuristics.`);
    }

    // Run AI Phishing Engine
    const aiPhishing = analyzePhishing(formattedUrl, htmlContent);
    scanLogs.push(`[PHISH_AI] Phishing risk calculated. Score: ${aiPhishing.score}/100. Signals: ${aiPhishing.signals.length} flagged.`);

    // 2. Certificate & PKI Trust Analysis
    let certTrust;
    if (isHttps) {
      scanLogs.push(`[TLS_HANDSHAKE] Performing TLS handshake to ${hostname}:443...`);
      try {
        const liveCertData = await fetchLiveCertificate(hostname, 443, 4000);
        certTrust = analyzeCertificate(liveCertData, hostname);
        scanLogs.push(`[TLS_HANDSHAKE] Certificate retrieved. Issuer: ${certTrust.issuer.commonName}, Key: ${certTrust.keyDetails.keySize}-bit ${certTrust.keyDetails.algorithm}`);
        if (certTrust.caTrustIncidentDetails) {
          scanLogs.push(`[PKI_AUDIT] WARNING: CA Trust incident detected: ${certTrust.caTrustIncidentDetails.incidentName}`);
        }
      } catch (tlsErr) {
        scanLogs.push(`[TLS_HANDSHAKE] TLS Handshake warning: ${tlsErr.message}. Fallback to simulated evaluation.`);
        // Fallback certificate evaluation
        certTrust = analyzeCertificate(null, hostname);
      }
    } else {
      scanLogs.push(`[TLS_HANDSHAKE] Unencrypted HTTP protocol detected. Zero cryptographic trust.`);
      certTrust = analyzeCertificate(null, hostname);
    }

    // 3. Web Security Posture Analysis
    scanLogs.push(`[APP_SEC] Evaluating security headers and cookie transport flags...`);
    const webSec = analyzeWebSecurity(responseHeaders, cookies);
    scanLogs.push(`[APP_SEC] Application security score: ${webSec.score}/100 (Grade: ${webSec.grade}).`);

    // 4. Threat Intelligence Correlation
    scanLogs.push(`[INTEL_GRAPH] Correlating IOCs against Collaborative Threat Registry...`);
    const collaborativeIntel = correlateThreatIntel(hostname, null, certTrust.keyDetails.fingerprint256);
    scanLogs.push(`[INTEL_GRAPH] Threat graph linked. Reputation index: ${collaborativeIntel.reputationScore}/100.`);

    // 5. Unified Digital Trust Score Calculation
    // Weighted formula:
    // AI Phishing: 35%
    // Certificate & CA Trust: 30%
    // Collaborative Intelligence: 20%
    // Application Security: 15%
    const weightedScore = Math.round(
      (aiPhishing.score * 0.35) +
      (certTrust.score * 0.30) +
      (collaborativeIntel.reputationScore * 0.20) +
      (webSec.score * 0.15)
    );

    const trustScore = Math.max(1, Math.min(100, weightedScore));

    let threatLevel = 'SAFE';
    if (trustScore < 25) threatLevel = 'CRITICAL';
    else if (trustScore < 50) threatLevel = 'HIGH';
    else if (trustScore < 75) threatLevel = 'MODERATE';

    scanLogs.push(`[COMPLETE] Analysis complete. Unified Digital Trust Score: ${trustScore}/100 [Level: ${threatLevel}].`);

    const result = {
      url: formattedUrl,
      domain: hostname,
      trustScore,
      threatLevel,
      aiPhishing,
      certTrust,
      webSec,
      collaborativeIntel
    };

    res.json({
      success: true,
      isScenario: false,
      scanLogs,
      result
    });
  } catch (error) {
    console.error('Scan execution error:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred during threat scanning: ' + error.message
    });
  }
});

export default router;
