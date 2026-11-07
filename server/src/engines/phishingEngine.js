import { TARGET_BRANDS, SUSPICIOUS_TLDS, SUSPICIOUS_KEYWORDS, HOMOGLYPH_MAP } from '../data/brands.js';

// Calculate Shannon Entropy of a string
function calculateEntropy(str) {
  if (!str) return 0;
  const len = str.length;
  const frequencies = {};
  for (let i = 0; i < len; i++) {
    const char = str[i];
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  let entropy = 0;
  for (const char in frequencies) {
    const p = frequencies[char] / len;
    entropy -= p * Math.log2(p);
  }
  return Number(entropy.toFixed(2));
}

// Levenshtein distance between two strings
function levenshtein(a, b) {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = Array.from({ length: bn + 1 }, () => Array(an + 1).fill(0));
  for (let i = 0; i <= an; i++) matrix[0][i] = i;
  for (let j = 0; j <= bn; j++) matrix[j][0] = j;

  for (let j = 1; j <= bn; j++) {
    for (let i = 1; i <= an; i++) {
      if (b[j - 1] === a[i - 1]) {
        matrix[j][i] = matrix[j - 1][i - 1];
      } else {
        matrix[j][i] = Math.min(
          matrix[j - 1][i] + 1, // deletion
          matrix[j][i - 1] + 1, // insertion
          matrix[j - 1][i - 1] + 1 // substitution
        );
      }
    }
  }
  return matrix[bn][an];
}

// Detect Punycode or Homoglyphs
function detectHomoglyphs(domain) {
  if (domain.startsWith('xn--') || domain.includes('.xn--')) {
    return { detected: true, type: 'Punycode (IDN Homograph candidate)' };
  }
  for (const char of domain) {
    if (HOMOGLYPH_MAP[char]) {
      return { detected: true, type: `Mixed-script homoglyph character ('${char}')` };
    }
  }
  return { detected: false };
}

// Check IP address format
function isDirectIp(domain) {
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  const hexPattern = /^0x[0-9a-fA-F]+$/;
  return ipv4Pattern.test(domain) || hexPattern.test(domain);
}

export function analyzePhishing(targetUrl, htmlContent = '') {
  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
  } catch (err) {
    return {
      score: 10,
      verdict: 'MALFORMED_URL',
      impersonatedBrand: null,
      signals: ['Invalid URL format'],
      entropy: 0,
      punycodeDetected: false,
      formFields: []
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const path = parsedUrl.pathname.toLowerCase();
  const fullHref = parsedUrl.href.toLowerCase();

  const signals = [];
  let riskPenalty = 0;
  let impersonatedBrand = null;

  // 1. IP in URL check
  if (isDirectIp(hostname)) {
    signals.push(`Direct IP address host used (${hostname}) instead of a qualified domain name`);
    riskPenalty += 40;
  }

  // 2. Punycode & Homoglyph detection
  const homoglyph = detectHomoglyphs(hostname);
  if (homoglyph.detected) {
    signals.push(`IDN / Punycode homoglyph detected: ${homoglyph.type}`);
    riskPenalty += 35;
  }

  // 3. Subdomain depth and suspicious TLD
  const domainParts = hostname.split('.');
  const tld = domainParts.length > 1 ? domainParts[domainParts.length - 1] : '';
  if (domainParts.length > 3) {
    signals.push(`Excessive subdomain nesting (${domainParts.length} levels) indicates evasion attempt`);
    riskPenalty += 20;
  }

  if (SUSPICIOUS_TLDS.has(tld)) {
    signals.push(`Domain registered on high-abuse TLD ('.${tld}') commonly abused for ephemeral phishing`);
    riskPenalty += 25;
  }

  // 4. Shannon Entropy analysis
  const entropy = calculateEntropy(hostname);
  if (entropy > 3.9) {
    signals.push(`High Shannon entropy (${entropy}) detected: suggestive of Domain Generation Algorithm (DGA) or obfuscated domain`);
    riskPenalty += 20;
  }

  // 5. Brand Impersonation & Typosquatting checks
  for (const brand of TARGET_BRANDS) {
    const isOfficial = hostname === brand.domain || hostname.endsWith(`.${brand.domain}`);
    if (isOfficial) {
      // Legitimate official domain!
      impersonatedBrand = brand.name;
      break;
    }

    // Check if brand keywords or domain are contained within an unofficial domain
    for (const kw of brand.keywords) {
      if (hostname.includes(kw) && !isOfficial) {
        impersonatedBrand = brand.name;
        signals.push(`Targeted brand impersonation: Domain unauthorizedly incorporates brand keyword '${kw}'`);
        riskPenalty += 45;
        break;
      }
    }

    if (impersonatedBrand) break;

    // Fuzzy typosquatting Levenshtein check on the main domain label
    const mainLabel = domainParts.length >= 2 ? domainParts[domainParts.length - 2] : domainParts[0];
    const brandLabel = brand.domain.split('.')[0];
    const dist = levenshtein(mainLabel, brandLabel);

    if (dist > 0 && dist <= 2 && Math.abs(mainLabel.length - brandLabel.length) <= 2) {
      impersonatedBrand = brand.name;
      signals.push(`Typosquatting alert: '${mainLabel}' is within edit-distance ${dist} of '${brandLabel}' (${brand.name})`);
      riskPenalty += 40;
      break;
    }
  }

  // 6. Suspicious phishing keywords in URL path / query
  const matchedKeywords = SUSPICIOUS_KEYWORDS.filter(kw => fullHref.includes(kw));
  if (matchedKeywords.length > 0) {
    signals.push(`High-risk credential/phishing keywords present: [${matchedKeywords.slice(0, 4).join(', ')}]`);
    riskPenalty += Math.min(25, matchedKeywords.length * 8);
  }

  // 7. HTML Content & DOM inspection (if content provided)
  const formFields = [];
  if (htmlContent) {
    const lowerHtml = htmlContent.toLowerCase();

    // Check password & credential inputs
    if (lowerHtml.includes('type="password"') || lowerHtml.includes("type='password'")) {
      formFields.push('password');
      signals.push('Credential harvesting input: Password input field identified in DOM');
      riskPenalty += 20;
    }

    if (lowerHtml.includes('name="otp"') || lowerHtml.includes('name="cvv"') || lowerHtml.includes('name="card"')) {
      formFields.push('otp_or_card_field');
      signals.push('Sensitive financial or 2FA token harvesting fields found in page structure');
      riskPenalty += 30;
    }

    // Check for suspicious external form actions
    const formActionMatch = lowerHtml.match(/action=["'](https?:\/\/[^"']+)["']/i);
    if (formActionMatch) {
      const actionHost = new URL(formActionMatch[1]).hostname;
      if (actionHost !== hostname) {
        signals.push(`External exfiltration risk: Form action posts credentials to remote host (${actionHost})`);
        riskPenalty += 35;
      }
    }
  }

  // Calculate final AI Phishing Score (100 is completely safe, 0 is definitively malicious)
  let score = Math.max(0, Math.min(100, 100 - riskPenalty));

  let verdict = 'SAFE';
  if (score < 25) {
    verdict = impersonatedBrand ? `CONFIRMED_${impersonatedBrand.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_PHISHING` : 'MALICIOUS_PHISHING_SITE';
  } else if (score < 60) {
    verdict = 'SUSPICIOUS_HIGH_RISK';
  } else if (score < 85) {
    verdict = 'MODERATE_RISK_ANOMALIES';
  } else {
    verdict = impersonatedBrand ? 'OFFICIAL_AUTHENTIC_PLATFORM' : 'BENIGN_DOMAIN';
  }

  return {
    score,
    verdict,
    impersonatedBrand,
    signals: signals.length > 0 ? signals : ['No deceptive brand impersonation or malicious URL heuristics identified'],
    entropy,
    punycodeDetected: homoglyph.detected,
    formFields
  };
}
