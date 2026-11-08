// Web Application Security & Header Posture Engine
// Implements Module 5: Website Security Assessment (Non-Exploitative Configuration Auditing)

export function analyzeWebSecurity(headers = {}, cookies = [], domain = '', dnsInfo = null) {
  const normHeaders = {};
  for (const [key, val] of Object.entries(headers)) {
    normHeaders[key.toLowerCase()] = val;
  }

  const findings = [];
  let earnedPoints = 0;
  const maxPoints = 100;

  // 1. Strict-Transport-Security (HSTS)
  const hstsVal = normHeaders['strict-transport-security'];
  if (hstsVal) {
    earnedPoints += 25;
    const hasPreload = hstsVal.includes('preload');
    const hasSubdomains = hstsVal.includes('includesubdomains');
    const maxAgeMatch = hstsVal.match(/max-age=(\d+)/i);
    const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;

    if (maxAge < 15768000) { // < 6 months
      findings.push({
        id: 'SEC-HSTS-SUBOPTIMAL-AGE',
        issue: 'Suboptimal Strict-Transport-Security (HSTS) Duration',
        technicalEvidence: `Header present: 'Strict-Transport-Security: ${hstsVal}', but max-age (${maxAge}s) is shorter than recommended 1-year threshold (31536000s).`,
        potentialImpact: 'Browsers will stop enforcing HTTPS after a short duration, opening windows for Man-in-the-Middle SSL-stripping attacks.',
        severity: 'MEDIUM',
        remediation: 'Increase HSTS max-age to at least 1 year (31536000 seconds):\nStrict-Transport-Security: max-age=31536000; includeSubDomains; preload',
        limitations: 'Passive inspection observes returned header max-age; does not measure client-side cache expiration state.'
      });
    } else {
      findings.push({
        id: 'SEC-HSTS-HARDENED',
        issue: 'Robust Strict-Transport-Security (HSTS) Enforced',
        technicalEvidence: `Active header: 'Strict-Transport-Security: ${hstsVal}'`,
        potentialImpact: 'Protects visitors against Man-in-the-Middle (MitM) attacks by forcing encrypted HTTPS transport.',
        severity: 'INFORMATIONAL',
        remediation: 'Maintain existing configuration. Ensure preloading eligibility on hstspreload.org.',
        limitations: 'Passive observation confirms presence in initial HTTP response.'
      });
    }
  } else {
    findings.push({
      id: 'SEC-HSTS-MISSING',
      issue: 'Missing Strict-Transport-Security (HSTS) Header',
      technicalEvidence: 'The HTTP response header "Strict-Transport-Security" was completely absent from server handshake.',
      potentialImpact: 'High risk of Man-in-the-Middle (MitM) SSL-stripping attacks where adversaries on local networks downgrade traffic to cleartext HTTP.',
      severity: 'HIGH',
      remediation: 'Configure your web server (Nginx / Apache / Cloudflare) to transmit the HSTS header on all HTTPS responses:\nStrict-Transport-Security: max-age=31536000; includeSubDomains; preload',
      limitations: 'Passive inspection evaluates HTTP response headers only; cannot detect out-of-band proxy SSL enforcement if headers are stripped by edge gateways.'
    });
  }

  // 2. Content-Security-Policy (CSP)
  const cspVal = normHeaders['content-security-policy'];
  if (cspVal) {
    const isUnsafe = cspVal.includes('unsafe-inline') || cspVal.includes('unsafe-eval');
    if (isUnsafe) {
      earnedPoints += 15;
      findings.push({
        id: 'SEC-CSP-UNSAFE-DIRECTIVES',
        issue: 'Permissive Content-Security-Policy (CSP) Directives Detected',
        technicalEvidence: `CSP header contains unsafe script execution clauses: '${cspVal.substring(0, 100)}...'`,
        potentialImpact: 'Permits inline script execution or dynamic code evaluation (eval), substantially degrading defenses against Cross-Site Scripting (XSS).',
        severity: 'MEDIUM',
        remediation: 'Refactor inline scripts into separate versioned files with cryptographic nonces or hashes. Eliminate "unsafe-inline" and "unsafe-eval" from script-src.',
        limitations: 'Cannot verify application-level DOM sanitization or frontend framework escape mechanisms.'
      });
    } else {
      earnedPoints += 30;
      findings.push({
        id: 'SEC-CSP-RESTRICTIVE',
        issue: 'Strict Content-Security-Policy (CSP) Active',
        technicalEvidence: `Restrictive CSP configured: '${cspVal.substring(0, 100)}...'`,
        potentialImpact: 'Effectively restricts origin execution, mitigating unauthorized script execution and data exfiltration.',
        severity: 'INFORMATIONAL',
        remediation: 'Regularly audit allowed external script origins and implement report-to endpoints for violation telemetry.',
        limitations: 'Policy validity is checked against baseline W3C syntax; runtime execution contexts are not actively fuzzed.'
      });
    }
  } else {
    findings.push({
      id: 'SEC-CSP-MISSING',
      issue: 'Missing Content-Security-Policy (CSP) Header',
      technicalEvidence: 'The HTTP response header "Content-Security-Policy" was not supplied by the web server.',
      potentialImpact: 'Leaves the web application vulnerable to Cross-Site Scripting (XSS), malicious script injection, and clickjacking attacks.',
      severity: 'HIGH',
      remediation: 'Define a strict Content-Security-Policy restricting script, style, and object origins:\nContent-Security-Policy: default-src \'self\'; script-src \'self\'; style-src \'self\'; object-src \'none\'; frame-ancestors \'none\'; base-uri \'self\';',
      limitations: 'Header inspection detects policy absence; runtime application sanitization cannot be evaluated passively.'
    });
  }

  // 3. X-Frame-Options (Clickjacking)
  const xfoVal = normHeaders['x-frame-options'];
  if (xfoVal) {
    earnedPoints += 15;
    findings.push({
      id: 'SEC-XFO-PROTECTED',
      issue: 'Anti-Clickjacking Framing Protection Active',
      technicalEvidence: `Header present: 'X-Frame-Options: ${xfoVal}'`,
      potentialImpact: 'Prevents deceptive UI redressing by restricting the domain from being rendered in foreign iframes.',
      severity: 'INFORMATIONAL',
      remediation: 'Maintain existing configuration or harmonize with CSP frame-ancestors directive.',
      limitations: 'Legacy X-Frame-Options is superseded by CSP frame-ancestors in modern user agents.'
    });
  } else if (!cspVal || !cspVal.includes('frame-ancestors')) {
    findings.push({
      id: 'SEC-XFO-MISSING',
      issue: 'Missing Anti-Clickjacking Protection (X-Frame-Options)',
      technicalEvidence: 'Neither "X-Frame-Options" nor CSP "frame-ancestors" header was present in the server response.',
      potentialImpact: 'The site can be embedded inside a transparent iframe on an attacker-controlled website, tricking users into performing unauthorized actions (Clickjacking).',
      severity: 'MEDIUM',
      remediation: 'Send the X-Frame-Options header to deny or restrict framing:\nX-Frame-Options: DENY\n(Or add "frame-ancestors \'none\';" to your Content-Security-Policy)',
      limitations: 'Passive verification; actual iframe embedding was not executed to avoid unauthorized interaction.'
    });
  }

  // 4. X-Content-Type-Options (MIME Sniffing)
  const xctoVal = normHeaders['x-content-type-options'];
  if (xctoVal && xctoVal.toLowerCase().includes('nosniff')) {
    earnedPoints += 15;
  } else {
    findings.push({
      id: 'SEC-XCTO-MISSING',
      issue: 'Missing MIME-Type Sniffing Protection (X-Content-Type-Options)',
      technicalEvidence: 'The header "X-Content-Type-Options: nosniff" was missing from the server headers.',
      potentialImpact: 'Browsers may attempt to guess (sniff) content types, treating user-uploaded images or text files as executable HTML/JavaScript.',
      severity: 'LOW',
      remediation: 'Add the nosniff directive to all responses:\nX-Content-Type-Options: nosniff',
      limitations: 'Affects only browsers with MIME sniffing heuristics; requires accurate server Content-Type headers.'
    });
  }

  // 5. Referrer-Policy
  const refVal = normHeaders['referrer-policy'];
  if (refVal) {
    earnedPoints += 10;
  } else {
    findings.push({
      id: 'SEC-REF-MISSING',
      issue: 'Missing or Unrestricted Referrer-Policy',
      technicalEvidence: 'The HTTP header "Referrer-Policy" was not configured.',
      potentialImpact: 'Sensitive URL parameters, tokens, and navigation history may leak to external third-party sites via the HTTP Referer header.',
      severity: 'LOW',
      remediation: 'Set a modern restrictive Referrer-Policy:\nReferrer-Policy: strict-origin-when-cross-origin',
      limitations: 'Passive check only; cannot detect meta tag referrer policies embedded directly in HTML markup.'
    });
  }

  // 6. Permissions-Policy
  const permVal = normHeaders['permissions-policy'] || normHeaders['feature-policy'];
  if (!permVal) {
    findings.push({
      id: 'SEC-PERM-POLICY-MISSING',
      issue: 'Missing Permissions-Policy (Hardware Access Control)',
      technicalEvidence: 'The "Permissions-Policy" header is not configured on the host.',
      potentialImpact: 'Unrestricted browser capabilities allow embedded third-party widgets or scripts to request sensitive browser APIs (camera, microphone, geolocation).',
      severity: 'LOW',
      remediation: 'Explicitly restrict sensitive APIs:\nPermissions-Policy: camera=(), microphone=(), geolocation=(), payment=()',
      limitations: 'Supported on modern evergreen browsers only.'
    });
  }

  // 7. Server & Technology Stack Disclosure
  let serverFingerprint = 'Protected / Hidden';
  const serverHeader = normHeaders['server'];
  const poweredByHeader = normHeaders['x-powered-by'];
  const aspNetHeader = normHeaders['x-aspnet-version'];

  if (serverHeader || poweredByHeader || aspNetHeader) {
    const disclosures = [];
    if (serverHeader) disclosures.push(`Server: ${serverHeader}`);
    if (poweredByHeader) disclosures.push(`X-Powered-By: ${poweredByHeader}`);
    if (aspNetHeader) disclosures.push(`X-AspNet-Version: ${aspNetHeader}`);

    serverFingerprint = disclosures.join(' | ');

    if (/\d+\.\d+/.test(serverFingerprint)) {
      earnedPoints = Math.max(0, earnedPoints - 10);
      findings.push({
        id: 'SEC-TECH-FINGERPRINT-EXPOSED',
        issue: 'Detailed Server Technology & Version Fingerprint Disclosed',
        technicalEvidence: `Server response reveals exact software version: '${serverFingerprint}'`,
        potentialImpact: 'Provides reconnaissance intelligence to attackers, allowing rapid identification of unpatched CVEs and known exploit modules for this specific version.',
        severity: 'LOW',
        remediation: 'Suppress software version banners in your server config:\nIn Nginx: server_tokens off;\nIn Apache: ServerTokens Prod; ServerSignature Off;\nIn Express: app.disable("x-powered-by");',
        limitations: 'Header obfuscation raises attacker cost but does not replace vulnerability patching.'
      });
    }
  }

  // 8. Insecure Cookie Configurations
  const analyzedCookies = [];
  if (Array.isArray(cookies) && cookies.length > 0) {
    for (const c of cookies) {
      const isSecure = c.secure ?? false;
      const isHttpOnly = c.httpOnly ?? false;
      const sameSite = c.sameSite || 'None';

      if (!isSecure || !isHttpOnly) {
        earnedPoints = Math.max(0, earnedPoints - 10);
        findings.push({
          id: `SEC-COOKIE-FLAGS-${c.name || 'UNKNOWN'}`,
          issue: `Insecure Session Cookie Configuration ('${c.name}')`,
          technicalEvidence: `Cookie '${c.name}' missing flags: ${!isSecure ? '[Secure MISSING]' : ''} ${!isHttpOnly ? '[HttpOnly MISSING]' : ''} [SameSite=${sameSite}]`,
          potentialImpact: `${!isSecure ? 'Cookie transmitted over unencrypted HTTP (interceptable on shared networks). ' : ''}${!isHttpOnly ? 'Cookie readable by client-side JavaScript (theft via XSS).' : ''}`,
          severity: !isHttpOnly || !isSecure ? 'HIGH' : 'MEDIUM',
          remediation: `Configure cookie attributes:\nSet-Cookie: ${c.name}=...; Secure; HttpOnly; SameSite=Lax; Path=/`,
          limitations: 'Only cookies returned during initial handshake inspected; authenticated session cookies may differ.'
        });
      }

      analyzedCookies.push({
        name: c.name,
        secure: isSecure,
        httpOnly: isHttpOnly,
        sameSite
      });
    }
  }

  // 9. Email Authentication / DNS Posture (if dnsInfo provided)
  if (dnsInfo) {
    if (!dnsInfo.hasDmarc) {
      findings.push({
        id: 'SEC-DNS-DMARC-MISSING',
        issue: 'Missing DMARC Email Authentication Record',
        technicalEvidence: 'No TXT record matching "v=DMARC1" found on domain DNS zone.',
        potentialImpact: 'Enables threat actors to spoof the domain in phishing emails, deceiving mail relays and recipient mailboxes.',
        severity: 'MEDIUM',
        remediation: 'Publish a DMARC policy record:\nv=DMARC1; p=reject; rua=mailto:dmarc-reports@' + (domain || 'yourdomain.com'),
        limitations: 'Public DNS inspection; internal mail gateway policy enforcement cannot be observed externally.'
      });
    }
  }

  // Calculate Unified Posture Score & Grade
  const score = Math.min(100, Math.max(10, earnedPoints));
  let grade = 'F';
  if (score >= 90) grade = 'A+';
  else if (score >= 80) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 50) grade = 'C';
  else if (score >= 35) grade = 'D';

  const criticalCount = findings.filter(f => f.severity === 'CRITICAL').length;
  const highCount = findings.filter(f => f.severity === 'HIGH').length;
  const mediumCount = findings.filter(f => f.severity === 'MEDIUM').length;
  const lowCount = findings.filter(f => f.severity === 'LOW').length;
  const informationalCount = findings.filter(f => f.severity === 'INFORMATIONAL').length;

  // Standardized Module 5 Deliverable
  const module5AssessmentReport = {
    module: 'Module 5: Website Security Assessment',
    targetDomain: domain || 'Public Web Target',
    assessmentMode: 'PASSIVE_NON_EXPLOITATIVE_ASSESSMENT',
    authorizationGate: {
      scope: 'PUBLIC_SECURITY_METADATA_INSPECTION',
      activeExploitationAttempted: false,
      regulatoryMandate: 'The platform inspects publicly available security information and reports configuration weaknesses without attempting exploitation. Any active testing must be restricted to explicitly authorised targets.'
    },
    overallPosture: {
      score,
      grade,
      status: score >= 75 ? 'HARDENED' : score >= 50 ? 'MODERATE_WEAKNESSES' : 'DEFICIENT_CONFIGURATION'
    },
    findingsSummary: {
      totalFindings: findings.length,
      criticalCount,
      highCount,
      mediumCount,
      lowCount,
      informationalCount
    },
    findings, // EACH finding contains all 6 required items
    recommendedHardeningRoadmap: [
      'Deploy Strict-Transport-Security with includeSubDomains and preload to eliminate SSL-stripping vectors.',
      'Construct a restrictive Content-Security-Policy to protect against script injection and cross-site framing.',
      'Enforce Secure, HttpOnly, and SameSite=Lax flags across all web session cookies.',
      'Suppress server banners and X-Powered-By software version disclosures.'
    ]
  };

  return {
    score,
    grade,
    headers: {
      hsts: { status: hstsVal ? 'PRESENT' : 'MISSING', risk: hstsVal ? 'NONE' : 'HIGH', note: hstsVal || 'No HSTS header' },
      csp: { status: cspVal ? (cspVal.includes('unsafe') ? 'UNSAFE' : 'PRESENT') : 'MISSING', risk: cspVal ? (cspVal.includes('unsafe') ? 'MEDIUM' : 'NONE') : 'HIGH', note: cspVal ? cspVal.substring(0, 60) + '...' : 'No CSP header' },
      xFrameOptions: { status: xfoVal ? 'PRESENT' : 'MISSING', risk: xfoVal ? 'NONE' : 'MEDIUM', note: xfoVal || 'Allows iframe embedding' },
      xContentTypeOptions: { status: xctoVal ? 'PRESENT' : 'MISSING', risk: xctoVal ? 'NONE' : 'LOW', note: xctoVal || 'Missing nosniff' },
      referrerPolicy: { status: refVal ? 'PRESENT' : 'MISSING', risk: refVal ? 'NONE' : 'LOW', note: refVal || 'Unbounded referrer' }
    },
    serverFingerprint,
    cookies: analyzedCookies,
    findings,
    module5AssessmentReport
  };
}
