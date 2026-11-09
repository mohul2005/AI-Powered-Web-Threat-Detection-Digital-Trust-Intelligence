import net from 'net';
import dns from 'dns';
import http from 'http';
import https from 'https';
import { URL } from 'url';

/**
 * Section 9: Security and Privacy Requirements
 * Pillar 1: Safe URL Inspection & SSRF Defense
 * 
 * Mandates:
 * 1. Protect against SSRF and internal network access.
 * 2. Validate redirects and destination IP addresses at each hop.
 * 3. Avoid executing scripts or downloading potentially malicious files.
 * 4. Use isolated environments for website inspection.
 * 5. Apply request limits and timeouts (5000ms max, 2MB body cap).
 */

// Forbidden IP Blocks (IPv4 and IPv6)
const RESERVED_IPV4_RANGES = [
  { name: 'Loopback', prefix: '127.', mask: 8 },
  { name: 'Private Class A', prefix: '10.', mask: 8 },
  { name: 'Private Class B', rangeStart: [172, 16, 0, 0], rangeEnd: [172, 31, 255, 255] },
  { name: 'Private Class C', prefix: '192.168.', mask: 16 },
  { name: 'Link-Local / Cloud Metadata (AWS/GCP/Azure)', prefix: '169.254.', mask: 16 },
  { name: 'Current Network ("This host")', prefix: '0.', mask: 8 },
  { name: 'Broadcast', prefix: '255.255.255.255' },
  { name: 'Carrier-Grade NAT', rangeStart: [100, 64, 0, 0], rangeEnd: [100, 127, 255, 255] },
  { name: 'Documentation / Testnet', prefix: '198.51.100.' },
  { name: 'Documentation / Testnet', prefix: '203.0.113.' },
  { name: 'Benchmark Network', rangeStart: [198, 18, 0, 0], rangeEnd: [198, 19, 255, 255] }
];

const FORBIDDEN_HOST_PATTERNS = [
  /^localhost$/i,
  /\.localhost$/i,
  /\.local$/i,
  /\.internal$/i,
  /\.lan$/i,
  /\.intranet$/i,
  /\.corp$/i,
  /^metadata\.google\.internal$/i,
  /^instance-data$/i,
  /^169\.254\.169\.254$/
];

const DANGEROUS_EXTENSIONS = [
  '.exe', '.dll', '.bat', '.cmd', '.sh', '.bin', '.msi',
  '.apk', '.dmg', '.vbs', '.ps1', '.scr', '.elf', '.iso', '.jar'
];

const DANGEROUS_MIME_TYPES = [
  'application/x-msdownload',
  'application/x-dosexec',
  'application/x-executable',
  'application/x-sharedlib',
  'application/x-mach-binary',
  'application/vnd.android.package-archive',
  'application/x-bat',
  'application/x-sh'
];

/**
 * Checks if an IPv4 or IPv6 string is private, loopback, or reserved.
 */
export function isPrivateOrReservedIP(ipAddress) {
  if (!ipAddress) return false;
  const ip = String(ipAddress).trim();

  // If not a valid IP address (e.g. domain name), it is not a private IP
  if (!net.isIP(ip)) {
    return false;
  }

  // IPv6 Check
  if (ip.includes(':')) {
    const cleanIpv6 = ip.toLowerCase();
    if (cleanIpv6 === '::1' || cleanIpv6 === '::') return true; // Loopback or Unspecified
    if (cleanIpv6.startsWith('fc') || cleanIpv6.startsWith('fd')) return true; // Unique Local (fc00::/7)
    if (cleanIpv6.startsWith('fe80:')) return true; // Link-Local (fe80::/10)
    if (cleanIpv6.startsWith('::ffff:')) {
      // IPv4 mapped into IPv6
      const mappedIpv4 = cleanIpv6.replace('::ffff:', '');
      return isPrivateOrReservedIP(mappedIpv4);
    }
    return false;
  }

  // IPv4 Check
  const octets = ip.split('.').map(Number);
  if (octets.length !== 4 || octets.some(o => isNaN(o) || o < 0 || o > 255)) {
    return true; // Malformed IP is treated as unsafe
  }

  // Exact match or prefix match
  if (ip === '127.0.0.1' || ip === '0.0.0.0' || ip === '255.255.255.255') return true;
  if (octets[0] === 127) return true; // 127.0.0.0/8
  if (octets[0] === 10) return true;  // 10.0.0.0/8
  if (octets[0] === 0) return true;   // 0.0.0.0/8
  if (octets[0] === 192 && octets[1] === 168) return true; // 192.168.0.0/16
  if (octets[0] === 169 && octets[1] === 254) return true; // 169.254.0.0/16 (Cloud Metadata)
  if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return true; // 172.16.0.0/12
  if (octets[0] === 100 && octets[1] >= 64 && octets[1] <= 127) return true; // Carrier Grade NAT

  for (const range of RESERVED_IPV4_RANGES) {
    if (range.prefix && ip.startsWith(range.prefix)) return true;
    if (range.rangeStart && range.rangeEnd) {
      const inRange = octets.every((o, idx) => o >= range.rangeStart[idx] && o <= range.rangeEnd[idx]);
      if (inRange) return true;
    }
  }

  return false;
}

/**
 * Validates target URL against SSRF and internal network access rules.
 */
export async function validateUrlSafety(rawUrl) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch (err) {
    return {
      safe: false,
      blocked: true,
      code: 'INVALID_URL_SYNTAX',
      reason: 'The submitted target could not be parsed as a valid URL.'
    };
  }

  // 1. Strict Protocol Gate: http and https only
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return {
      safe: false,
      blocked: true,
      code: 'DISALLOWED_PROTOCOL',
      reason: `Protocol '${parsed.protocol}' is forbidden. Only HTTP and HTTPS are permitted.`
    };
  }

  const hostname = parsed.hostname;

  // 2. Forbidden Hostname / Internal Network Name Check
  for (const pattern of FORBIDDEN_HOST_PATTERNS) {
    if (pattern.test(hostname)) {
      return {
        safe: false,
        blocked: true,
        code: 'SSRF_INTERNAL_HOST_BLOCKED',
        reason: `Access to internal host '${hostname}' is strictly blocked under SSRF defense rules.`
      };
    }
  }

  // 3. Direct IP Check (ONLY if hostname is already an IP address)
  if (net.isIP(hostname) && isPrivateOrReservedIP(hostname)) {
    return {
      safe: false,
      blocked: true,
      code: 'SSRF_PRIVATE_IP_BLOCKED',
      reason: `Access to private/internal IP address '${hostname}' is strictly prohibited.`
    };
  }

  // 4. DNS Pre-Resolution & Destination IP Verification
  try {
    const lookupResults = await dns.promises.lookup(hostname, { all: true });
    if (!lookupResults || lookupResults.length === 0) {
      // Graceful offline fallback: allow heuristic analysis for simulation / unresolvable domains
      return {
        safe: true,
        blocked: false,
        isUnreachable: true,
        code: 'DNS_RESOLUTION_FAILED',
        reason: `Could not resolve hostname '${hostname}'. Proceeding with offline heuristic analysis.`,
        hostname,
        resolvedIps: []
      };
    }

    const resolvedIps = lookupResults.map(r => r.address);
    for (const ip of resolvedIps) {
      if (isPrivateOrReservedIP(ip)) {
        return {
          safe: false,
          blocked: true,
          code: 'SSRF_DNS_REBINDING_BLOCKED',
          reason: `DNS resolution for '${hostname}' returned forbidden internal IP '${ip}'.`,
          resolvedIps
        };
      }
    }

    return {
      safe: true,
      blocked: false,
      hostname,
      resolvedIps
    };
  } catch (dnsErr) {
    // If public domain (e.g. offline simulation or dead phish), allow offline heuristic analysis
    return {
      safe: true,
      blocked: false,
      isUnreachable: true,
      code: 'DNS_NXDOMAIN',
      reason: `DNS resolution error: ${dnsErr.message}`,
      hostname,
      resolvedIps: []
    };
  }
}

/**
 * Checks if target URL or Content-Type represents potentially malicious binary files.
 */
export function checkMaliciousPayloadRisk(urlStr, contentType = '') {
  let pathname = '';
  try {
    pathname = new URL(urlStr).pathname.toLowerCase();
  } catch (e) {
    pathname = String(urlStr).toLowerCase();
  }

  for (const ext of DANGEROUS_EXTENSIONS) {
    if (pathname.endsWith(ext)) {
      return {
        isMaliciousPayload: true,
        risk: 'EXECUTABLE_BINARY_DOWNLOAD_ATTEMPT',
        reason: `URL targets potentially hazardous executable/script file type (${ext}). Automated download aborted to preserve operational safety.`
      };
    }
  }

  const cleanContentType = String(contentType).toLowerCase();
  for (const mime of DANGEROUS_MIME_TYPES) {
    if (cleanContentType.includes(mime)) {
      return {
        isMaliciousPayload: true,
        risk: 'EXECUTABLE_MIME_TYPE_DETECTED',
        reason: `Server returned executable binary Content-Type (${cleanContentType}). Content parsing aborted.`
      };
    }
  }

  return { isMaliciousPayload: false };
}

/**
 * Safe URL Inspector Client
 * Features:
 * - SSRF pre-flight validation
 * - Strict redirect validation (validates destination IP before each hop)
 * - Max redirects: 3
 * - Strict timeout: 4000ms
 * - Max response size: 2MB cap
 * - File extension / MIME rejection
 * - Passive non-evaluating sandbox
 */
export async function safeInspectUrl(targetUrl, options = {}) {
  const maxRedirects = options.maxRedirects || 3;
  const timeoutMs = options.timeoutMs || 4000;
  const maxBytes = options.maxBytes || 2 * 1024 * 1024; // 2MB max cap

  let currentUrl = targetUrl;
  let redirectCount = 0;
  const redirectHistory = [];

  while (redirectCount <= maxRedirects) {
    // 1. File payload check
    const payloadRisk = checkMaliciousPayloadRisk(currentUrl);
    if (payloadRisk.isMaliciousPayload) {
      return {
        success: false,
        blocked: true,
        code: 'DANGEROUS_PAYLOAD_ABORTED',
        reason: payloadRisk.reason,
        redirectHistory
      };
    }

    // 2. SSRF & IP validation
    const safety = await validateUrlSafety(currentUrl);
    if (safety.blocked) {
      return {
        success: false,
        blocked: true,
        code: safety.code,
        reason: safety.reason,
        redirectHistory
      };
    }

    if (safety.isUnreachable) {
      return {
        success: false,
        unreachable: true,
        reason: safety.reason,
        redirectHistory
      };
    }

    // 3. Make safe single-hop HTTP/HTTPS request
    const hopResult = await executeSingleHop(currentUrl, timeoutMs, maxBytes);

    if (hopResult.isRedirect && hopResult.redirectLocation) {
      redirectCount++;
      if (redirectCount > maxRedirects) {
        return {
          success: false,
          blocked: true,
          code: 'MAX_REDIRECTS_EXCEEDED',
          reason: `Redirect chain exceeded safe limit of ${maxRedirects} hops. Possible redirect loop or evasion attempt.`,
          redirectHistory
        };
      }

      // Resolve relative redirect against current URL
      let nextUrl;
      try {
        nextUrl = new URL(hopResult.redirectLocation, currentUrl).toString();
      } catch (err) {
        return {
          success: false,
          blocked: true,
          code: 'INVALID_REDIRECT_LOCATION',
          reason: 'Received malformed redirect location from upstream server.',
          redirectHistory
        };
      }

      redirectHistory.push({
        from: currentUrl,
        to: nextUrl,
        statusCode: hopResult.statusCode
      });

      currentUrl = nextUrl;
      continue;
    }

    // Finished without redirect
    return {
      success: true,
      finalUrl: currentUrl,
      statusCode: hopResult.statusCode,
      headers: hopResult.headers,
      body: hopResult.body,
      contentType: hopResult.contentType,
      redirectCount,
      redirectHistory,
      resolvedIps: safety.resolvedIps
    };
  }

  return {
    success: false,
    blocked: true,
    code: 'REDIRECT_LIMIT_EXCEEDED',
    reason: 'Exceeded maximum allowable redirect depth.'
  };
}

/**
 * Low-level single-hop HTTP/HTTPS request with body cap & timeout
 */
function executeSingleHop(targetUrl, timeoutMs, maxBytes) {
  return new Promise((resolve) => {
    let parsedUrl;
    try {
      parsedUrl = new URL(targetUrl);
    } catch (e) {
      return resolve({ success: false, error: 'Malformed URL' });
    }

    const isHttps = parsedUrl.protocol === 'https:';
    const client = isHttps ? https : http;

    const reqOptions = {
      method: 'GET',
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        'User-Agent': 'TrustMatrix-SecurityScanner/2.0 (SSRF-Hardened-Inspector; HackMatrix2026)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      timeout: timeoutMs
    };

    let resolved = false;
    const finish = (result) => {
      if (!resolved) {
        resolved = true;
        resolve(result);
      }
    };

    const req = client.request(reqOptions, (res) => {
      const statusCode = res.statusCode || 200;
      const headers = res.headers || {};
      const contentType = headers['content-type'] || '';

      // Check for Redirects (301, 302, 303, 307, 308)
      if ([301, 302, 303, 307, 308].includes(statusCode) && headers.location) {
        res.resume(); // Discard body
        return finish({
          isRedirect: true,
          statusCode,
          redirectLocation: headers.location,
          headers
        });
      }

      // Check MIME for hazardous binaries
      const mimeCheck = checkMaliciousPayloadRisk(targetUrl, contentType);
      if (mimeCheck.isMaliciousPayload) {
        res.destroy();
        return finish({
          success: false,
          blocked: true,
          code: 'EXECUTABLE_MIME_REJECTED',
          reason: mimeCheck.reason
        });
      }

      // Check Content-Length header if present
      const contentLength = parseInt(headers['content-length'] || '0', 10);
      if (contentLength > maxBytes) {
        res.destroy();
        return finish({
          success: false,
          blocked: true,
          code: 'PAYLOAD_OVERSIZE_ABORTED',
          reason: `Content-Length (${contentLength} bytes) exceeds maximum safe inspection limit (${maxBytes} bytes).`
        });
      }

      let receivedBytes = 0;
      let bodyData = '';

      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        receivedBytes += Buffer.byteLength(chunk, 'utf8');
        if (receivedBytes > maxBytes) {
          res.destroy();
          return finish({
            success: false,
            blocked: true,
            code: 'PAYLOAD_STREAM_CAP_EXCEEDED',
            reason: `Downloaded stream exceeded safety boundary (${maxBytes} bytes).`
          });
        }
        bodyData += chunk;
      });

      res.on('end', () => {
        finish({
          success: true,
          isRedirect: false,
          statusCode,
          headers,
          contentType,
          body: bodyData
        });
      });

      res.on('error', (err) => {
        finish({
          success: false,
          error: err.message
        });
      });
    });

    req.on('timeout', () => {
      req.destroy();
      finish({
        success: false,
        error: `Request timed out after ${timeoutMs}ms (Request Limit Enforced).`
      });
    });

    req.on('error', (err) => {
      finish({
        success: false,
        error: err.message
      });
    });

    req.end();
  });
}
