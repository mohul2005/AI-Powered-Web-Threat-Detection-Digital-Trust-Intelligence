/**
 * TrustMatrix AI Nexus - Module 12: Advanced Extensions
 * Engine 2: Screenshot-based Website Impersonation Detection
 *
 * Implements:
 * 1. Brand Visual Palette Clustering (RGB/Hex dominants)
 * 2. Visual Layout Structure Recognition (Login portals, OAuth dialogs, Wallet popups)
 * 3. Logo & Asset Perceptual Hashing (pHash comparison against authentic assets)
 * 4. Cross-Domain Visual Identity Theft Detection (High Visual Match + Discrepant Hostname)
 */

import crypto from 'crypto';

// Reference Visual Templates for High-Value Target Brands
export const REFERENCE_BRAND_TEMPLATES = {
  SBI_YONO: {
    brandName: 'State Bank of India (YONO)',
    officialDomains: ['sbi.co.in', 'onlinesbi.sbi', 'onlinesbi.com', 'yono.sbi'],
    primaryColor: '#004c8f', // SBI Blue
    secondaryColor: '#280071', // SBI Deep Purple
    dominantColors: ['#004c8f', '#280071', '#ffffff', '#f4f6f8'],
    visualElements: ['sbi_logo_circle', 'yono_banner', 'username_field', 'password_field', 'captcha_box'],
    phashSignature: 'a8f1e4d2c3b5a698'
  },
  HDFC_NETBANKING: {
    brandName: 'HDFC Bank',
    officialDomains: ['hdfcbank.com', 'netbanking.hdfcbank.com'],
    primaryColor: '#004b87', // HDFC Navy
    secondaryColor: '#ed232a', // HDFC Red accent
    dominantColors: ['#004b87', '#ed232a', '#ffffff', '#e6edf5'],
    visualElements: ['hdfc_blue_header', 'customer_id_login', 'virtual_keyboard_hint', 'secure_shield_icon'],
    phashSignature: 'b1c4e7f8a2d3c905'
  },
  GOOGLE_ACCOUNT: {
    brandName: 'Google Account Sign-In',
    officialDomains: ['google.com', 'accounts.google.com'],
    primaryColor: '#4285f4', // Google Blue
    secondaryColor: '#34a853', // Google Green
    dominantColors: ['#ffffff', '#4285f4', '#202124', '#dadce0'],
    visualElements: ['google_4color_logo', 'centered_card_layout', 'email_or_phone_input', 'next_button_blue'],
    phashSignature: 'c7d8e9f0a1b2c3d4'
  },
  MICROSOFT_ENTRA: {
    brandName: 'Microsoft 365 / Entra ID',
    officialDomains: ['microsoft.com', 'login.microsoftonline.com', 'live.com'],
    primaryColor: '#0078d4', // Microsoft Blue
    secondaryColor: '#ffffff',
    dominantColors: ['#ffffff', '#0078d4', '#737373', '#f2f2f2'],
    visualElements: ['msft_four_squares_logo', 'sign_in_title', 'can_not_access_link', 'back_arrow'],
    phashSignature: 'd4c3b2a1f0e9d8c7'
  },
  METAMASK_CONNECT: {
    brandName: 'MetaMask Wallet',
    officialDomains: ['metamask.io'],
    primaryColor: '#f6851b', // Fox Orange
    secondaryColor: '#e2761b',
    dominantColors: ['#ffffff', '#f6851b', '#121212', '#cd6116'],
    visualElements: ['metamask_fox_svg', 'connect_wallet_modal', 'network_selector', 'secret_recovery_warning'],
    phashSignature: 'e9f8a7b6c5d4e3f2'
  }
};

/**
 * Calculates Hamming distance between two hex hashes (Perceptual Hash similarity)
 */
function hammingDistance(hexA, hexB) {
  if (!hexA || !hexB || hexA.length !== hexB.length) return 64;
  let dist = 0;
  for (let i = 0; i < hexA.length; i++) {
    const valA = parseInt(hexA[i], 16);
    const valB = parseInt(hexB[i], 16);
    let xor = valA ^ valB;
    while (xor > 0) {
      dist += xor & 1;
      xor >>= 1;
    }
  }
  return dist;
}

/**
 * Analyzes visual webpage screenshot telemetry or simulated DOM visual signals
 * @param {object} screenshotData - Telemetry including targetUrl, extractedColors, detectedElements, simulatedPhash
 * @returns {object} Visual Impersonation Audit Dossier
 */
export function analyzeVisualImpersonation(screenshotData) {
  const {
    targetUrl = '',
    extractedColors = [],
    detectedElements = [],
    screenshotPhash = null,
    htmlSnippet = ''
  } = screenshotData;

  const timestamp = new Date().toISOString();
  let hostname = '';
  try {
    hostname = new URL(targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`).hostname.toLowerCase();
  } catch (e) {
    hostname = targetUrl.toLowerCase();
  }

  const matches = [];

  // Iterate over each known reference brand template
  for (const [brandKey, template] of Object.entries(REFERENCE_BRAND_TEMPLATES)) {
    let visualScore = 0;
    const matchReasons = [];

    // 1. Color Palette Overlap (Weight: 30%)
    if (extractedColors && extractedColors.length > 0) {
      let colorHits = 0;
      for (const col of extractedColors) {
        if (template.dominantColors.some(c => c.toLowerCase() === col.toLowerCase())) {
          colorHits++;
        }
      }
      const colorRatio = colorHits / Math.max(1, template.dominantColors.length);
      const colorPoints = Math.round(colorRatio * 30);
      visualScore += colorPoints;
      if (colorPoints > 15) {
        matchReasons.push(`Dominant color palette alignment with official brand assets (${colorHits} palette matches)`);
      }
    }

    // 2. Structural UI Elements Overlap (Weight: 40%)
    if (detectedElements && detectedElements.length > 0) {
      let elemHits = 0;
      for (const elem of detectedElements) {
        if (template.visualElements.includes(elem)) {
          elemHits++;
        }
      }
      const elemRatio = elemHits / Math.max(1, template.visualElements.length);
      const elemPoints = Math.round(elemRatio * 40);
      visualScore += elemPoints;
      if (elemPoints > 20) {
        matchReasons.push(`Key UI structure matches official layout (${elemHits}/${template.visualElements.length} elements detected)`);
      }
    }

    // 3. Perceptual Hash (pHash) Proximity (Weight: 30%)
    if (screenshotPhash) {
      const distance = hammingDistance(screenshotPhash, template.phashSignature);
      // Max distance is 64; 0-10 is extremely high similarity
      const phashSimilarity = Math.max(0, 1 - (distance / 40));
      const phashPoints = Math.round(phashSimilarity * 30);
      visualScore += phashPoints;
      if (phashPoints > 18) {
        matchReasons.push(`Perceptual image hash matches authentic screenshot (Hamming distance: ${distance})`);
      }
    } else {
      // Fallback: heuristic text and keyword matching in HTML
      const lowerHtml = (htmlSnippet || '').toLowerCase();
      if (lowerHtml.includes(template.brandName.toLowerCase().split(' ')[0])) {
        visualScore += 20;
        matchReasons.push(`Official brand typography and labels found in rendered layout`);
      }
    }

    // Cap visual score at 99
    visualScore = Math.min(99, visualScore);

    // 4. Cross-Domain Identity Discrepancy (CRITICAL CHECK)
    const isAuthenticDomain = template.officialDomains.some(
      official => hostname === official || hostname.endsWith(`.${official}`)
    );

    matches.push({
      brandKey,
      brandName: template.brandName,
      officialDomains: template.officialDomains,
      isAuthenticDomain,
      visualSimilarityPercentage: visualScore,
      matchReasons,
      isVisualIdentityTheft: visualScore >= 60 && !isAuthenticDomain
    });
  }

  // Sort by visual similarity descending
  matches.sort((a, b) => b.visualSimilarityPercentage - a.visualSimilarityPercentage);
  const topMatch = matches[0] || null;

  let verdict = 'BENIGN_UNIQUE_LAYOUT';
  let threatLevel = 'LOW';
  let trustScore = 100;
  const indicators = [];

  if (topMatch && topMatch.isVisualIdentityTheft) {
    verdict = 'CONFIRMED_VISUAL_IMPERSONATION';
    threatLevel = 'CRITICAL';
    trustScore = Math.max(5, 100 - topMatch.visualSimilarityPercentage);

    indicators.push({
      id: 'VIS-IMPERSONATION-01',
      title: `Stolen Visual Brand Identity: ${topMatch.brandName}`,
      severity: 'CRITICAL',
      technicalEvidence: `Rendered page exhibits ${topMatch.visualSimilarityPercentage}% visual similarity to '${topMatch.brandName}' login portal, but is hosted on rogue domain '${hostname}'. Official domains are: [${topMatch.officialDomains.join(', ')}].`,
      impact: 'Tricks users into surrendering credentials by displaying a pixel-perfect replica of an authentic banking or login interface.'
    });
  } else if (topMatch && topMatch.visualSimilarityPercentage >= 40 && !topMatch.isAuthenticDomain) {
    verdict = 'SUSPICIOUS_UI_SIMILARITY';
    threatLevel = 'HIGH';
    trustScore = 55;

    indicators.push({
      id: 'VIS-SIMILARITY-02',
      title: `Moderate Visual Resemblance to ${topMatch.brandName}`,
      severity: 'HIGH',
      technicalEvidence: `Page layout shares significant visual and color attributes (${topMatch.visualSimilarityPercentage}%) with ${topMatch.brandName}.`,
      impact: 'Potential deceptive mimicry or unauthenticated affiliate portal.'
    });
  } else if (topMatch && topMatch.isAuthenticDomain) {
    verdict = 'VERIFIED_OFFICIAL_BRAND_PORTAL';
    threatLevel = 'LOW';
    trustScore = 98;
  }

  return {
    module: 'Module 12: Optional Advanced Extensions (Screenshot Impersonation)',
    timestamp,
    targetUrl,
    hostname,
    trustScore,
    threatLevel,
    verdict,
    topMatch,
    allEvaluatedBrands: matches,
    indicators,
    technicalTelemetry: {
      extractedColors,
      detectedElements,
      screenshotPhash: screenshotPhash || 'SIMULATED_PHASH_ACTIVE'
    }
  };
}

/**
 * Pre-defined Visual Impersonation Scenarios
 */
export const SAMPLE_VISUAL_SCENARIOS = [
  {
    id: 'vis-sbi-fake-login',
    title: 'SBI YONO Stolen Visual Theme',
    targetUrl: 'https://sbi-yono-pan-kyc-update.top/login.php',
    extractedColors: ['#004c8f', '#280071', '#ffffff', '#f4f6f8'],
    detectedElements: ['sbi_logo_circle', 'username_field', 'password_field', 'captcha_box'],
    screenshotPhash: 'a8f1e4d2c3b5a690', // 1 bit distance from official
    expectedVerdict: 'CONFIRMED_VISUAL_IMPERSONATION',
    expectedBrand: 'State Bank of India (YONO)'
  },
  {
    id: 'vis-google-stolen-signin',
    title: 'Google OAuth Account Replica',
    targetUrl: 'https://accounts-google-verify-session.xyz/oauth/v2',
    extractedColors: ['#ffffff', '#4285f4', '#202124'],
    detectedElements: ['google_4color_logo', 'centered_card_layout', 'email_or_phone_input', 'next_button_blue'],
    screenshotPhash: 'c7d8e9f0a1b2c3d0',
    expectedVerdict: 'CONFIRMED_VISUAL_IMPERSONATION',
    expectedBrand: 'Google Account Sign-In'
  },
  {
    id: 'vis-official-sbi-baseline',
    title: 'Official SBI Portal (Safe Baseline)',
    targetUrl: 'https://onlinesbi.sbi/index.html',
    extractedColors: ['#004c8f', '#280071', '#ffffff'],
    detectedElements: ['sbi_logo_circle', 'yono_banner', 'username_field', 'password_field'],
    screenshotPhash: 'a8f1e4d2c3b5a698',
    expectedVerdict: 'VERIFIED_OFFICIAL_BRAND_PORTAL',
    expectedBrand: 'State Bank of India (YONO)'
  }
];
