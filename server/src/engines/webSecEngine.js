// Web Application Security & Header Posture Engine

export function analyzeWebSecurity(headers = {}, cookies = []) {
  const normHeaders = {};
  for (const [key, val] of Object.entries(headers)) {
    normHeaders[key.toLowerCase()] = val;
  }

  const results = {
    hsts: { status: 'MISSING', risk: 'HIGH', note: 'No HTTP Strict Transport Security (HSTS) header' },
    csp: { status: 'MISSING', risk: 'HIGH', note: 'No Content-Security-Policy (CSP) protecting against XSS' },
    xFrameOptions: { status: 'MISSING', risk: 'MEDIUM', note: 'Missing X-Frame-Options allows clickjacking in iframes' },
    xContentTypeOptions: { status: 'MISSING', risk: 'LOW', note: 'Missing X-Content-Type-Options: nosniff allows MIME confusion attacks' },
    referrerPolicy: { status: 'MISSING', risk: 'LOW', note: 'Referrer information may leak to third parties' }
  };

  let earnedPoints = 0;
  const maxPoints = 100;

  // 1. HSTS Check
  if (normHeaders['strict-transport-security']) {
    const val = normHeaders['strict-transport-security'];
    earnedPoints += 25;
    const hasPreload = val.includes('preload');
    const hasSubdomains = val.includes('includesubdomains');
    results.hsts = {
      status: 'PRESENT',
      risk: 'NONE',
      value: val,
      note: `Active HSTS (${hasSubdomains ? 'with subdomains' : 'base domain'}${hasPreload ? ', preloaded' : ''})`
    };
  }

  // 2. CSP Check
  if (normHeaders['content-security-policy']) {
    const val = normHeaders['content-security-policy'];
    const isUnsafe = val.includes('unsafe-inline') || val.includes('unsafe-eval');
    if (isUnsafe) {
      earnedPoints += 15;
      results.csp = {
        status: 'UNSAFE',
        risk: 'MEDIUM',
        value: val.substring(0, 80) + '...',
        note: 'CSP is configured but allows unsafe-inline or unsafe-eval execution'
      };
    } else {
      earnedPoints += 30;
      results.csp = {
        status: 'PRESENT',
        risk: 'NONE',
        value: val.substring(0, 80) + '...',
        note: 'Strict Content-Security-Policy enforcing script origin isolation'
      };
    }
  }

  // 3. X-Frame-Options Check
  if (normHeaders['x-frame-options']) {
    earnedPoints += 15;
    results.xFrameOptions = {
      status: 'PRESENT',
      risk: 'NONE',
      value: normHeaders['x-frame-options'],
      note: `Protected against Clickjacking (${normHeaders['x-frame-options']})`
    };
  }

  // 4. X-Content-Type-Options
  if (normHeaders['x-content-type-options']) {
    earnedPoints += 15;
    results.xContentTypeOptions = {
      status: 'PRESENT',
      risk: 'NONE',
      value: normHeaders['x-content-type-options'],
      note: 'MIME sniffing prevention active (nosniff)'
    };
  }

  // 5. Referrer-Policy
  if (normHeaders['referrer-policy']) {
    earnedPoints += 10;
    results.referrerPolicy = {
      status: 'PRESENT',
      risk: 'NONE',
      value: normHeaders['referrer-policy'],
      note: 'Referrer policy explicitly bounded'
    };
  }

  // Server fingerprinting penalty
  let serverFingerprint = 'Protected / Hidden';
  if (normHeaders['server']) {
    serverFingerprint = normHeaders['server'];
    if (/\d+\.\d+/.test(serverFingerprint)) {
      earnedPoints = Math.max(0, earnedPoints - 5);
    }
  }
  if (normHeaders['x-powered-by']) {
    serverFingerprint += ` | Leaking X-Powered-By: ${normHeaders['x-powered-by']}`;
    earnedPoints = Math.max(0, earnedPoints - 5);
  }

  // Cookie audit
  const analyzedCookies = [];
  if (Array.isArray(cookies) && cookies.length > 0) {
    for (const c of cookies) {
      const isSecure = c.secure ?? false;
      const isHttpOnly = c.httpOnly ?? false;
      const sameSite = c.sameSite || 'None';
      if (!isSecure || !isHttpOnly) {
        earnedPoints = Math.max(0, earnedPoints - 5);
      }
      analyzedCookies.push({
        name: c.name,
        secure: isSecure,
        httpOnly: isHttpOnly,
        sameSite
      });
    }
  }

  const score = Math.min(100, Math.max(10, earnedPoints));

  let grade = 'F';
  if (score >= 90) grade = 'A+';
  else if (score >= 80) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 50) grade = 'C';
  else if (score >= 35) grade = 'D';

  return {
    score,
    grade,
    headers: results,
    serverFingerprint,
    cookies: analyzedCookies
  };
}
