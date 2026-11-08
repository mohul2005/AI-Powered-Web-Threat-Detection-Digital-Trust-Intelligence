/**
 * TrustMatrix AI Nexus - Module 12: Advanced Extensions
 * Engine 4: Detection of Lookalike, Homoglyph & Typosquatted Domains
 *
 * Implements:
 * 1. Homoglyph / Mixed-Script Permutations (Cyrillic, Greek, Latin)
 * 2. Punycode Encoding (IDN Homograph Attacks)
 * 3. Bitsquatting (1-bit DNS memory flip candidates)
 * 4. Hyphenation, TLD Swapping, Omission & Repetition Heuristics
 * 5. Proactive Brand Radar & Risk Classification
 */

import { HOMOGLYPH_MAP } from '../data/brands.js';

// Suspicious / Disposable TLDs favored by phishing campaigns
const RISKY_TLDS = ['.top', '.xyz', '.cc', '.ru', '.site', '.club', '.shop', '.buzz', '.icu', '.work'];

// Common keyword prefixes and suffixes used in banking/auth phishing
const DECEPTIVE_AFFIXES = ['login', 'secure', 'verify', 'update', 'kyc', 'online', 'auth', 'support', 'portal'];

// Cyrillic Lookalikes for standard Latin characters
const CYRILLIC_SUBSTITUTES = {
  'a': '\u0430', // Cyrillic Small Letter A
  'c': '\u0441', // Cyrillic Small Letter Es
  'e': '\u0435', // Cyrillic Small Letter Ie
  'i': '\u0456', // Cyrillic Small Letter Byelorussian-Ukrainian I
  'j': '\u0458', // Cyrillic Small Letter Je
  'o': '\u043E', // Cyrillic Small Letter O
  'p': '\u0440', // Cyrillic Small Letter Er
  's': '\u0455', // Cyrillic Small Letter Dze
  'x': '\u0445', // Cyrillic Small Letter Ha
  'y': '\u0443'  // Cyrillic Small Letter U
};

/**
 * Converts unicode text to ASCII Punycode representation (IDN homograph simulator)
 */
function toPunycodeSimulation(domain) {
  let hasNonAscii = false;
  for (let i = 0; i < domain.length; i++) {
    if (domain.charCodeAt(i) > 127) {
      hasNonAscii = true;
      break;
    }
  }
  if (!hasNonAscii) return domain;
  
  // Deterministic hex hash encoding simulation for punycode preview
  const encoded = Buffer.from(domain, 'utf8').toString('hex').substring(0, 8);
  return `xn--${encoded}.com`;
}

/**
 * Generates Bitsquatting candidates (1-bit flips in ASCII character codes)
 */
function generateBitsquats(baseName) {
  const candidates = [];
  const validChars = 'abcdefghijklmnopqrstuvwxyz0123456789-';

  for (let i = 0; i < baseName.length; i++) {
    const charCode = baseName.charCodeAt(i);
    // 8-bit flips
    for (let bit = 0; bit < 8; bit++) {
      const flipped = charCode ^ (1 << bit);
      const flippedChar = String.fromCharCode(flipped).toLowerCase();
      if (validChars.includes(flippedChar) && flippedChar !== baseName[i]) {
        const candidate = baseName.substring(0, i) + flippedChar + baseName.substring(i + 1);
        if (candidate.length === baseName.length && !candidates.includes(candidate)) {
          candidates.push(candidate);
        }
      }
    }
  }
  return candidates.slice(0, 6); // Top 6 bitsquats
}

/**
 * Generates comprehensive lookalike radar for a given target brand or domain
 * @param {string} targetDomain - Target domain to audit (e.g. sbi.co.in, hdfcbank.com, paypal.com)
 * @returns {object} Lookalike Radar Dossier
 */
export function generateLookalikeRadar(targetDomain) {
  if (!targetDomain) {
    return { error: 'No target domain provided' };
  }

  const clean = targetDomain.toLowerCase().trim().replace(/^https?:\/\//, '').split('/')[0];
  const parts = clean.split('.');
  const baseName = parts[0];
  const originalTld = parts.length > 1 ? `.${parts.slice(1).join('.')}` : '.com';

  const permutations = [];

  // =========================================================================
  // 1. Homoglyphs / IDN Cyrillic Spoofs
  // =========================================================================
  let homoglyphVariant = '';
  for (let char of baseName) {
    homoglyphVariant += (CYRILLIC_SUBSTITUTES[char] || char);
  }
  if (homoglyphVariant !== baseName) {
    const punycode = toPunycodeSimulation(homoglyphVariant + originalTld);
    permutations.push({
      variant: homoglyphVariant + originalTld,
      punycode,
      type: 'HOMOGLYPH_IDN_ATTACK',
      severity: 'CRITICAL',
      similarityScore: 99,
      status: 'HIGH_RISK_CANDIDATE',
      attackTechnique: 'Cyrillic / Unicode glyph substitution visually indistinguishable in URL bar',
      estimatedRisk: 95
    });
  }

  // =========================================================================
  // 2. High-Risk Phishing TLD Swaps
  // =========================================================================
  for (const tld of RISKY_TLDS.slice(0, 4)) {
    permutations.push({
      variant: `${baseName}${tld}`,
      punycode: `${baseName}${tld}`,
      type: 'TLD_SWAP_PERMUTATION',
      severity: 'HIGH',
      similarityScore: 90,
      status: 'SUSPICIOUS_REGISTRATION_ZONE',
      attackTechnique: 'Registration on bulletproof or disposable top-level domain',
      estimatedRisk: 85
    });
  }

  // =========================================================================
  // 3. Deceptive Hyphenation & Keyword Affixes
  // =========================================================================
  for (const affix of DECEPTIVE_AFFIXES.slice(0, 4)) {
    permutations.push({
      variant: `${baseName}-${affix}${originalTld}`,
      punycode: `${baseName}-${affix}${originalTld}`,
      type: 'DECEPTIVE_HYPHENATION',
      severity: 'HIGH',
      similarityScore: 85,
      status: 'ACTIVE_PHISHING_VECTOR',
      attackTechnique: `Appends security keyword '${affix}' to mislead mobile users into trusting login link`,
      estimatedRisk: 88
    });
    permutations.push({
      variant: `${affix}-${baseName}${originalTld}`,
      punycode: `${affix}-${baseName}${originalTld}`,
      type: 'DECEPTIVE_PREFIX',
      severity: 'HIGH',
      similarityScore: 85,
      status: 'ACTIVE_PHISHING_VECTOR',
      attackTechnique: `Prepends '${affix}' for deceptive credential portal naming`,
      estimatedRisk: 84
    });
  }

  // =========================================================================
  // 4. Character Omission / Duplication (Fat-Finger Typosquatting)
  // =========================================================================
  if (baseName.length > 4) {
    // Omit 2nd char
    const omitted = baseName.substring(0, 1) + baseName.substring(2) + originalTld;
    permutations.push({
      variant: omitted,
      punycode: omitted,
      type: 'OMISSION_TYPOSQUAT',
      severity: 'MEDIUM',
      similarityScore: 82,
      status: 'CANDIDATE_TYPO_DOM',
      attackTechnique: 'Fat-finger mistyped letter omission',
      estimatedRisk: 75
    });

    // Duplicate 2nd char
    const duplicated = baseName.substring(0, 2) + baseName[1] + baseName.substring(2) + originalTld;
    permutations.push({
      variant: duplicated,
      punycode: duplicated,
      type: 'REPETITION_TYPOSQUAT',
      severity: 'MEDIUM',
      similarityScore: 80,
      status: 'CANDIDATE_TYPO_DOM',
      attackTechnique: 'Fat-finger key double-strike repetition',
      estimatedRisk: 72
    });
  }

  // =========================================================================
  // 5. Bitsquatting (1-bit Memory Flip)
  // =========================================================================
  const bitsquats = generateBitsquats(baseName);
  for (const b of bitsquats.slice(0, 3)) {
    permutations.push({
      variant: `${b}${originalTld}`,
      punycode: `${b}${originalTld}`,
      type: 'BITSQUATTING_CANDIDATE',
      severity: 'LOW',
      similarityScore: 78,
      status: 'PASSIVE_EXPLOIT_VECTOR',
      attackTechnique: 'Targets hardware memory bit-flips in caching recursive DNS resolvers',
      estimatedRisk: 65
    });
  }

  // Sort by estimated risk descending
  permutations.sort((a, b) => b.estimatedRisk - a.estimatedRisk);

  return {
    module: 'Module 12: Optional Advanced Extensions (Lookalike Domain Radar)',
    targetDomain: clean,
    baseName,
    originalTld,
    totalPermutationsAnalyzed: permutations.length,
    criticalThreatsCount: permutations.filter(p => p.severity === 'CRITICAL').length,
    highRiskThreatsCount: permutations.filter(p => p.severity === 'HIGH').length,
    permutations
  };
}
