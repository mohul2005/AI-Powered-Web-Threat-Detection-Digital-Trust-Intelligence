import { TARGET_BRANDS, SUSPICIOUS_TLDS, SUSPICIOUS_KEYWORDS, HOMOGLYPH_MAP, REDIRECT_PARAM_KEYS } from '../data/brands.js';

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
          matrix[j - 1][i] + 1,
          matrix[j][i - 1] + 1,
          matrix[j - 1][i - 1] + 1
        );
      }
    }
  }
  return matrix[bn][an];
}

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

function isDirectIp(domain) {
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  const hexPattern = /^0x[0-9a-fA-F]+$/;
  return ipv4Pattern.test(domain) || hexPattern.test(domain);
}

// Inspect for embedded redirect parameters (Open Redirect & Cloaked Links)
function detectEmbeddedRedirects(parsedUrl) {
  const redirectFindings = [];
  const searchParams = parsedUrl.searchParams;

  for (const key of REDIRECT_PARAM_KEYS) {
    if (searchParams.has(key)) {
      const targetVal = searchParams.get(key);
      if (targetVal && (targetVal.startsWith('http://') || targetVal.startsWith('https://') || targetVal.includes('.'))) {
        redirectFindings.push({
          param: key,
          destination: targetVal,
          isExternal: !targetVal.includes(parsedUrl.hostname)
        });
      }
    }
  }

  return redirectFindings;
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
      formFields: [],
      embeddedRedirects: [],
      identityMismatch: false,
      preClickRecommendation: '🛑 DO NOT OPEN: Malformed or deceptive link.'
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const path = parsedUrl.pathname.toLowerCase();
  const fullHref = parsedUrl.href.toLowerCase();

  const signals = [];
  let riskPenalty = 0;
  let impersonatedBrand = null;
  let officialBrandDomain = null;

  // 1. IP in URL check
  if (isDirectIp(hostname)) {
    signals.push(`Direct IP Address Host: URL uses bare IP (${hostname}) instead of a qualified domain name to bypass reputation filters`);
    riskPenalty += 40;
  }

  // 2. Punycode & Homoglyph detection
  const homoglyph = detectHomoglyphs(hostname);
  if (homoglyph.detected) {
    signals.push(`Homograph Attack / Deceptive Character: ${homoglyph.type}`);
    riskPenalty += 35;
  }

  // 3. Subdomain depth and suspicious TLD
  const domainParts = hostname.split('.');
  const tld = domainParts.length > 1 ? domainParts[domainParts.length - 1] : '';
  if (domainParts.length > 3) {
    signals.push(`Excessive Subdomain Stacking (${domainParts.length} levels): Obfuscates true destination`);
    riskPenalty += 20;
  }

  if (SUSPICIOUS_TLDS.has(tld)) {
    signals.push(`High-Risk TLD ('.${tld}'): Frequently abused for disposable phishing campaigns`);
    riskPenalty += 25;
  }

  // 4. Shannon Entropy analysis
  const entropy = calculateEntropy(hostname);
  if (entropy > 3.9) {
    signals.push(`High Domain Entropy (${entropy} bits): Suggests DGA (Domain Generation Algorithm) or randomized subdomain`);
    riskPenalty += 20;
  }

  // 5. Embedded Redirect Parameters & Chain Detection
  const embeddedRedirects = detectEmbeddedRedirects(parsedUrl);
  if (embeddedRedirects.length > 0) {
    for (const r of embeddedRedirects) {
      if (r.isExternal) {
        signals.push(`Open Redirect / Cloaked Destination: Embeds external parameter '?${r.param}=' pointing to '${r.destination}'`);
        riskPenalty += 35;
      } else {
        signals.push(`Internal Redirect Parameter: Contains query parameter '?${r.param}='`);
        riskPenalty += 10;
      }
    }
  }

  // 6. Brand Impersonation & Typosquatting checks
  for (const brand of TARGET_BRANDS) {
    const isOfficial = hostname === brand.domain || hostname.endsWith(`.${brand.domain}`);
    if (isOfficial) {
      impersonatedBrand = brand.name;
      officialBrandDomain = brand.domain;
      break;
    }

    // Check if brand keywords are contained within an unofficial domain
    for (const kw of brand.keywords) {
      if (hostname.includes(kw) && !isOfficial) {
        impersonatedBrand = brand.name;
        officialBrandDomain = brand.domain;
        signals.push(`Identity Mismatch & Brand Impersonation: Claims identity of '${brand.name}' but actual host is '${hostname}'`);
        riskPenalty += 45;
        break;
      }
    }

    if (impersonatedBrand && !isOfficial) break;

    // Fuzzy typosquatting Levenshtein check
    const mainLabel = domainParts.length >= 2 ? domainParts[domainParts.length - 2] : domainParts[0];
    const brandLabel = brand.domain.split('.')[0];
    const dist = levenshtein(mainLabel, brandLabel);

    if (dist > 0 && dist <= 2 && Math.abs(mainLabel.length - brandLabel.length) <= 2) {
      impersonatedBrand = brand.name;
      officialBrandDomain = brand.domain;
      signals.push(`Typosquatting Alert: Label '${mainLabel}' is edit-distance ${dist} from official '${brandLabel}' (${brand.name})`);
      riskPenalty += 40;
      break;
    }
  }

  // Check if claimed entity differs from actual domain
  const identityMismatch = impersonatedBrand !== null && hostname !== officialBrandDomain && !hostname.endsWith(`.${officialBrandDomain}`);

  // 7. Suspicious Keywords in Path / Query
  const matchedKeywords = SUSPICIOUS_KEYWORDS.filter(kw => fullHref.includes(kw));
  if (matchedKeywords.length > 0) {
    signals.push(`Social Engineering Keywords: [${matchedKeywords.slice(0, 4).join(', ')}]`);
    riskPenalty += Math.min(25, matchedKeywords.length * 8);
  }

  // 8. HTML DOM Credential Form Harvesting
  const formFields = [];
  if (htmlContent) {
    const lowerHtml = htmlContent.toLowerCase();
    if (lowerHtml.includes('type="password"') || lowerHtml.includes("type='password'")) {
      formFields.push('password');
      signals.push('Credential Harvesting Form: Password input detected in page structure');
      riskPenalty += 20;
    }

    if (lowerHtml.includes('name="otp"') || lowerHtml.includes('name="cvv"') || lowerHtml.includes('name="pan"') || lowerHtml.includes('name="card"')) {
      formFields.push('sensitive_credentials');
      signals.push('Sensitive Financial / PII Harvest: OTP, CVV, or PAN inputs found');
      riskPenalty += 30;
    }
  }

  const score = Math.max(0, Math.min(100, 100 - riskPenalty));

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

  // Pre-Click Link Recommendation
  let preClickRecommendation = '✅ SAFE TO OPEN: Authenticated enterprise domain with verified identity.';
  if (score < 25) {
    preClickRecommendation = '🛑 DO NOT OPEN: High risk of credential harvesting or malware redirection.';
  } else if (score < 60) {
    preClickRecommendation = '⚠️ EXTREME CAUTION: Potential identity mismatch or unverified redirect parameters.';
  } else if (score < 80) {
    preClickRecommendation = 'ℹ️ PROCEED WITH CAUTION: Suboptimal security standards or basic validation.';
  }

  return {
    score,
    verdict,
    impersonatedBrand,
    officialBrandDomain,
    identityMismatch,
    signals: signals.length > 0 ? signals : ['No deceptive brand impersonation or malicious URL heuristics identified'],
    entropy,
    punycodeDetected: homoglyph.detected,
    formFields,
    embeddedRedirects,
    preClickRecommendation
  };
}
