const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

// Configure test environment
process.env.NODE_ENV = 'test';
process.env.TRUST_PROXY = '1';
process.env.TURNSTILE_MODE = 'disabled'; // Default to disabled for general suite

const app = require('../index');
const config = require('../src/config/env');
const { getTransporter } = require('../src/config/mailer');
const { sanitizeSingleLine, sanitizeText } = require('../src/middleware/validator');
const { escapeHtml } = require('../src/services/email.service');
const { clearIdempotencyCache, acquireIdempotencyLock } = require('../src/services/idempotency.service');

let server;
let baseUrl;
let mockTurnstileServer;
let mockTurnstileUrl;
let mockTurnstileHandler = null;
let testIpCounter = 1;

function getFreshIpHeader() {
  testIpCounter += 1;
  return { 'X-Forwarded-For': `198.51.100.${testIpCounter}` };
}

before(async () => {
  // 1. Start Main Express Test Server
  await new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });

  // 2. Start Local Mock Cloudflare Siteverify Server
  await new Promise((resolve) => {
    mockTurnstileServer = http.createServer((req, res) => {
      if (mockTurnstileHandler) {
        mockTurnstileHandler(req, res);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, action: 'contact', hostname: 'sanastudio.ir' }));
      }
    });
    mockTurnstileServer.listen(0, '127.0.0.1', () => {
      const port = mockTurnstileServer.address().port;
      mockTurnstileUrl = `http://127.0.0.1:${port}/siteverify`;
      resolve();
    });
  });
});

after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
  if (mockTurnstileServer) await new Promise((resolve) => mockTurnstileServer.close(resolve));
});

beforeEach(() => {
  clearIdempotencyCache();
  mockTurnstileHandler = null;
  config.turnstile.mode = 'disabled';
  config.turnstile.siteverifyUrl = mockTurnstileUrl;
});

describe('1. Nodemailer Version & Package Integrity', () => {
  test('Nodemailer version is >= 10.3.1 (secure against known advisories)', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
    const nodemailerPkg = require('../node_modules/nodemailer/package.json');
    
    assert.match(pkg.dependencies.nodemailer, /\^?10\./, 'package.json specifies Nodemailer 10.x');
    assert.ok(nodemailerPkg.version.startsWith('10.'), `Installed version is ${nodemailerPkg.version}`);
    
    const [maj, min, patch] = nodemailerPkg.version.split('.').map(Number);
    assert.ok(
      maj > 10 || (maj === 10 && (min > 3 || (min === 3 && patch >= 1))),
      `Nodemailer version must be >= 10.3.1, got ${nodemailerPkg.version}`
    );
  });

  test('SMTP transporter enforces TLS verification, timeouts, and fixed credentials', () => {
    const transporter = getTransporter();
    assert.equal(transporter.options.host, config.mail.host);
    assert.equal(transporter.options.port, config.mail.port);
    assert.equal(transporter.options.secure, true);
    assert.equal(transporter.options.connectionTimeout, 5000);
    assert.equal(transporter.options.greetingTimeout, 5000);
    assert.equal(transporter.options.socketTimeout, 10000);
    assert.equal(transporter.options.tls.rejectUnauthorized, true);
  });
});

describe('2. Frontend Static Serving & Health Endpoints', () => {
  test('GET / returns the frontend HTML', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /text\/html/);
    const html = await res.text();
    assert.ok(html.includes('<title>Emerald Life'), 'Contains Emerald Life title');
    assert.ok(html.includes('<div id="root"></div>'), 'Contains root mounting point');
  });

  test('Frontend JavaScript and CSS assets are accessible', async () => {
    const distAssetsDir = path.resolve(__dirname, '../../dist/assets');
    const files = fs.readdirSync(distAssetsDir);
    const jsFile = files.find(f => f.endsWith('.js'));
    const cssFile = files.find(f => f.endsWith('.css'));

    assert.ok(jsFile, 'Compiled JS bundle exists');
    assert.ok(cssFile, 'Compiled CSS bundle exists');

    const jsRes = await fetch(`${baseUrl}/assets/${jsFile}`);
    assert.equal(jsRes.status, 200);
    assert.match(jsRes.headers.get('content-type'), /(javascript|ecmascript)/);

    const cssRes = await fetch(`${baseUrl}/assets/${cssFile}`);
    assert.equal(cssRes.status, 200);
    assert.match(cssRes.headers.get('content-type'), /text\/css/);
  });

  test('React Router routes return the frontend entry point', async () => {
    const routes = ['/fa', '/en', '/contact', '/privacy'];
    for (const r of routes) {
      const res = await fetch(`${baseUrl}${r}`);
      assert.equal(res.status, 200, `Route ${r} should return 200`);
      assert.match(res.headers.get('content-type'), /text\/html/);
      const html = await res.text();
      assert.ok(html.includes('<div id="root"></div>'), `Route ${r} serves index.html`);
    }
  });

  test('GET /api/health still returns the expected JSON response', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.status, 'healthy');
    assert.ok(typeof data.uptimeSeconds === 'number');
  });

  test('GET /api/health/mailer in production returns 403 Forbidden', async () => {
    const originalEnv = config.env;
    config.env = 'production';

    try {
      const res = await fetch(`${baseUrl}/api/health/mailer`);
      assert.equal(res.status, 403);
      const data = await res.json();
      assert.equal(data.status, 'forbidden');
    } finally {
      config.env = originalEnv;
    }
  });

  test('Unknown API routes return the expected API 404 response (never frontend HTML)', async () => {
    const resGet = await fetch(`${baseUrl}/api/nonexistent-route-12345`);
    assert.equal(resGet.status, 404);
    assert.match(resGet.headers.get('content-type'), /application\/json/);
    const dataGet = await resGet.json();
    assert.equal(dataGet.success, false);
    assert.equal(dataGet.error, 'NotFound');

    const resPost = await fetch(`${baseUrl}/api/unknown/action`, { method: 'POST' });
    assert.equal(resPost.status, 404);
    assert.match(resPost.headers.get('content-type'), /application\/json/);
    const dataPost = await resPost.json();
    assert.equal(dataPost.success, false);
    assert.equal(dataPost.error, 'NotFound');
  });

  test('Missing static file with extension returns 404, not frontend HTML', async () => {
    const res = await fetch(`${baseUrl}/assets/missing-asset-file.js`);
    assert.equal(res.status, 404);
    assert.match(res.headers.get('content-type'), /application\/json/);
  });
});

describe('3. Contact API Validation & Anti-Relay Protections', () => {
  test('Rejects non-object or array payload', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify(['malicious', 'array']),
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.match(data.error, /Expected a JSON object/i);
  });

  test('Explicitly rejects client-supplied recipient fields (to, cc, bcc)', async () => {
    const relayPayloads = [
      { name: 'Attacker', email: 'a@test.com', subject: 'Relay', message: 'Hello world test message', to: 'victim@target.com' },
      { name: 'Attacker', email: 'a@test.com', subject: 'Relay', message: 'Hello world test message', cc: 'victim@target.com' },
      { name: 'Attacker', email: 'a@test.com', subject: 'Relay', message: 'Hello world test message', bcc: 'victim@target.com' },
    ];

    for (const body of relayPayloads) {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
        body: JSON.stringify(body),
      });
      assert.equal(res.status, 400, `Payload with recipient field must be rejected`);
      const data = await res.json();
      assert.match(data.error, /Recipient fields/i);
    }
  });

  test('Rejects non-string types for input fields (NoSQL / type injection defense)', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: { $ne: null },
        email: 'test@example.com',
        subject: 'Valid Subject',
        message: 'Valid message content 12345',
      }),
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.match(data.error, /Field 'name' must be a string/i);
  });

  test('Rejects missing or invalid fields with field-specific errors', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'A', // too short (<2)
        email: 'invalid-email-format',
        subject: 'Hi', // too short (<3)
        message: 'Short', // too short (<10)
      }),
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.errors.name);
    assert.ok(data.errors.email);
    assert.ok(data.errors.subject);
    assert.ok(data.errors.message);
  });

  test('Rejects fields exceeding maximum allowed length', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'A'.repeat(85), // max 80
        email: `${'a'.repeat(115)}@test.com`, // max 120
        subject: 'S'.repeat(155), // max 150
        message: 'M'.repeat(3050), // max 3000
      }),
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.errors.name);
    assert.ok(data.errors.email);
    assert.ok(data.errors.subject);
    assert.ok(data.errors.message);
  });
});

describe('4. CRLF Header Injection & HTML Email Escaping', () => {
  test('CRLF characters in single-line headers are stripped to single space', () => {
    const dirtyName = 'Alice\r\nBcc: victim@target.com\n\rBob';
    const cleanName = sanitizeSingleLine(dirtyName);
    assert.equal(cleanName.includes('\r'), false, 'No CR characters permitted');
    assert.equal(cleanName.includes('\n'), false, 'No LF characters permitted');
    assert.equal(cleanName, 'Alice Bcc: victim@target.com Bob');
  });

  test('Dangerous HTML / script tags are escaped', () => {
    const dirty = '<script>alert("XSS")</script>&<"test">';
    const clean = escapeHtml(dirty);
    assert.equal(clean.includes('<script>'), false);
    assert.equal(clean.includes('&lt;script&gt;'), true);
    assert.equal(clean.includes('&amp;'), true);
    assert.equal(clean.includes('&quot;'), true);
  });
});

describe('5. Honeypot Anti-Bot Behavior', () => {
  test('Returns 200 generic success when honeypot is populated without sending mail', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Spam Bot',
        email: 'bot@spam.com',
        subject: 'Buy Watches',
        message: 'Spam message content 12345',
        _gotcha: 'http://spam-link.com',
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.message, 'Message processed successfully');
  });
});

describe('6. Request Body Size Limit', () => {
  test('Payload exceeding 64KB is rejected with 413 Payload Too Large', async () => {
    const hugeMessage = 'A'.repeat(70 * 1024); // 70KB
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Valid Name',
        email: 'valid@example.com',
        subject: 'Valid Subject',
        message: hugeMessage,
      }),
    });

    assert.equal(res.status, 413, 'Express body parser must reject payloads > 64KB');
  });
});

describe('7. CORS Allowlist & Preflight Behavior', () => {
  test('Allowed origin receives Access-Control-Allow-Origin', async () => {
    const res = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: 'https://sanastudio.ir' },
    });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('access-control-allow-origin'), 'https://sanastudio.ir');
    assert.equal(res.headers.get('access-control-allow-credentials'), 'true');
  });

  test('Blocked unauthorized origin does NOT receive Access-Control-Allow-Origin', async () => {
    const res = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: 'https://malicious-attacker-website.com' },
    });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('access-control-allow-origin'), null);
  });

  test('Request with no Origin header succeeds (server-to-server / health probe)', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
  });

  test('OPTIONS preflight request returns 204 with allowed headers & methods', async () => {
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://sanastudio.ir',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Idempotency-Key',
      },
    });

    assert.equal(res.status, 204);
    assert.equal(res.headers.get('access-control-allow-origin'), 'https://sanastudio.ir');
    assert.match(res.headers.get('access-control-allow-headers'), /Idempotency-Key/i);
    assert.match(res.headers.get('access-control-allow-methods'), /POST/i);
  });
});

describe('8. Security HTTP Headers (Helmet)', () => {
  test('Verifies presence of required Helmet security headers', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);

    assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(res.headers.get('x-frame-options'), 'DENY');
    assert.match(res.headers.get('strict-transport-security'), /max-age=31536000/);
    assert.equal(res.headers.get('cross-origin-resource-policy'), 'cross-origin');
    assert.equal(res.headers.get('referrer-policy'), 'no-referrer');
    assert.match(res.headers.get('content-security-policy'), /default-src 'none'/);
  });
});

describe('9. Rate Limiting & Spoofing Protection', () => {
  test('Enforces 5 requests per 15 min limit and returns HTTP 429 on 6th request', async () => {
    const fixedIpHeaders = { 'X-Forwarded-For': '203.0.113.88' };
    const validBody = JSON.stringify({
      name: 'Valid Name',
      email: 'user@example.com',
      subject: 'Rate Limit Test',
      message: 'Testing that rate limits trigger correctly',
      _gotcha: 'bot-trap',
    });

    for (let i = 0; i < 5; i++) {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...fixedIpHeaders },
        body: validBody,
      });
      assert.equal(res.status, 200, `Request ${i + 1} of 5 should succeed`);
    }

    const resBlocked = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...fixedIpHeaders },
      body: validBody,
    });
    assert.equal(resBlocked.status, 429, '6th request from same IP must return 429');
    const blockedData = await resBlocked.json();
    assert.equal(blockedData.error, 'Too many requests');
  });

  test('Attacker attempting to spoof X-Forwarded-For cannot bypass 1-hop rate limiter', async () => {
    // In Express with trust proxy = 1, the client IP is determined by the last hop
    // An attacker prefixing fake IPs: "fake-ip-1, real-attacker-ip" will still be resolved as "real-attacker-ip"
    const realAttackerIp = '198.51.100.99';
    const body = JSON.stringify({
      name: 'Spoof Test',
      email: 'spoof@example.com',
      subject: 'Spoof Header Test',
      message: 'Testing that spoofed prefixes do not change resolved IP',
      _gotcha: 'trap',
    });

    for (let i = 0; i < 5; i++) {
      await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': `1.2.3.${i}, ${realAttackerIp}`,
        },
        body,
      });
    }

    // 6th request with yet another spoofed leftmost IP should still hit the rate limit for realAttackerIp
    const blockedRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': `9.9.9.9, ${realAttackerIp}`,
      },
      body,
    });

    assert.equal(blockedRes.status, 429, 'Spoofed leftmost IP must not bypass rate limit when trust proxy = 1');
  });
});

describe('10. Cloudflare Turnstile Server-Side Verification', () => {
  test('Explicitly disabled mode allows contact submission without Turnstile token', async () => {
    config.turnstile.mode = 'disabled';
    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Disabled Mode User',
        email: 'user@example.com',
        subject: 'Disabled Turnstile Test',
        message: 'Testing submission when Turnstile is explicitly disabled',
        _gotcha: 'trap',
      }),
    });
    assert.equal(res.status, 200);
  });

  test('Required mode: Rejects request with 400 when Turnstile token is missing', async () => {
    config.turnstile.mode = 'required';
    config.turnstile.secretKey = 'test_secret_key';

    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Missing Token User',
        email: 'user@example.com',
        subject: 'Missing Token Test',
        message: 'Testing submission without Turnstile token when required',
      }),
    });

    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.error, 'CaptchaTokenMissing');
  });

  test('Required mode: Rejects request with 503 if secret key is not configured on server', async () => {
    config.turnstile.mode = 'required';
    config.turnstile.secretKey = ''; // Intentionally missing

    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Misconfigured Server User',
        email: 'user@example.com',
        subject: 'Misconfigured Test',
        message: 'Testing missing secret key safety',
        turnstileToken: 'any_token',
      }),
    });

    assert.equal(res.status, 503);
    const data = await res.json();
    assert.equal(data.error, 'CaptchaConfigurationError');
  });

  test('Required mode: Accepts request when Cloudflare siteverify confirms token', async () => {
    config.turnstile.mode = 'required';
    config.turnstile.secretKey = 'test_secret_key';
    config.turnstile.expectedAction = 'contact';
    config.turnstile.expectedHostname = 'sanastudio.ir';

    mockTurnstileHandler = (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        action: 'contact',
        hostname: 'sanastudio.ir',
      }));
    };

    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Valid Turnstile User',
        email: 'valid@example.com',
        subject: 'Valid Turnstile Test',
        message: 'Testing successful verification against siteverify',
        turnstileToken: 'valid_mock_token_123',
        _gotcha: 'trap',
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
  });

  test('Required mode: Rejects invalid token with 403 CaptchaVerificationFailed', async () => {
    config.turnstile.mode = 'required';
    config.turnstile.secretKey = 'test_secret_key';

    mockTurnstileHandler = (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        'error-codes': ['invalid-input-response'],
      }));
    };

    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Invalid Token User',
        email: 'invalid@example.com',
        subject: 'Invalid Token Test',
        message: 'Testing rejected invalid token',
        turnstileToken: 'invalid_token_999',
      }),
    });

    assert.equal(res.status, 403);
    const data = await res.json();
    assert.equal(data.error, 'CaptchaVerificationFailed');
  });

  test('Required mode: Rejects expired or reused token with 403 CaptchaTokenExpiredOrReused', async () => {
    config.turnstile.mode = 'required';
    config.turnstile.secretKey = 'test_secret_key';

    mockTurnstileHandler = (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        'error-codes': ['timeout-or-duplicate'],
      }));
    };

    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Reused Token User',
        email: 'reused@example.com',
        subject: 'Reused Token Test',
        message: 'Testing rejected reused/expired token',
        turnstileToken: 'reused_token_999',
      }),
    });

    assert.equal(res.status, 403);
    const data = await res.json();
    assert.equal(data.error, 'CaptchaTokenExpiredOrReused');
  });

  test('Required mode: Rejects action mismatch with 403 CaptchaActionMismatch', async () => {
    config.turnstile.mode = 'required';
    config.turnstile.secretKey = 'test_secret_key';
    config.turnstile.expectedAction = 'contact';

    mockTurnstileHandler = (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        action: 'login', // Incorrect action
        hostname: 'sanastudio.ir',
      }));
    };

    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Action Mismatch User',
        email: 'action@example.com',
        subject: 'Action Mismatch Test',
        message: 'Testing rejected action mismatch',
        turnstileToken: 'wrong_action_token',
      }),
    });

    assert.equal(res.status, 403);
    const data = await res.json();
    assert.equal(data.error, 'CaptchaActionMismatch');
  });

  test('Required mode: Rejects hostname mismatch with 403 CaptchaHostnameMismatch', async () => {
    config.turnstile.mode = 'required';
    config.turnstile.secretKey = 'test_secret_key';
    config.turnstile.expectedHostname = 'sanastudio.ir';

    mockTurnstileHandler = (req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        action: 'contact',
        hostname: 'evil-phishing-domain.com', // Incorrect hostname
      }));
    };

    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Hostname Mismatch User',
        email: 'host@example.com',
        subject: 'Hostname Mismatch Test',
        message: 'Testing rejected hostname mismatch',
        turnstileToken: 'wrong_host_token',
      }),
    });

    assert.equal(res.status, 403);
    const data = await res.json();
    assert.equal(data.error, 'CaptchaHostnameMismatch');
  });

  test('Required mode: Handles Cloudflare service unavailable (HTTP 500) safely with 503', async () => {
    config.turnstile.mode = 'required';
    config.turnstile.secretKey = 'test_secret_key';

    mockTurnstileHandler = (req, res) => {
      res.writeHead(500);
      res.end('Cloudflare Edge Error');
    };

    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Service Unavailable User',
        email: 'down@example.com',
        subject: 'Service Down Test',
        message: 'Testing siteverify 500 error handling',
        turnstileToken: 'token_during_outage',
      }),
    });

    assert.equal(res.status, 503);
    const data = await res.json();
    assert.equal(data.error, 'CaptchaServiceUnavailable');
  });

  test('Required mode: Handles Cloudflare timeout safely with 504', async () => {
    config.turnstile.mode = 'required';
    config.turnstile.secretKey = 'test_secret_key';
    config.turnstile.timeoutMs = 100; // Fast timeout for test

    mockTurnstileHandler = (req, res) => {
      // Intentionally do not respond, simulating network stall
      setTimeout(() => {
        try {
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
        } catch {}
      }, 300);
    };

    const res = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getFreshIpHeader() },
      body: JSON.stringify({
        name: 'Timeout User',
        email: 'timeout@example.com',
        subject: 'Timeout Test',
        message: 'Testing siteverify timeout handling',
        turnstileToken: 'token_timing_out',
      }),
    });

    assert.equal(res.status, 504);
    const data = await res.json();
    assert.equal(data.error, 'CaptchaTimeout');
  });
});

describe('11. Idempotency & In-Flight Concurrency Locking', () => {
  test('Simultaneous requests with identical key/hash do not trigger multiple dispatches', async () => {
    const clientKey = `test_key_${Date.now()}`;
    const payload = {
      name: 'Concurrent User',
      email: 'concurrent@example.com',
      subject: 'Race Condition Test',
      message: 'Testing concurrent in-flight locking behavior',
    };

    const lock1 = acquireIdempotencyLock(clientKey, payload);
    assert.equal(lock1.status, 'acquired');

    const lock2 = acquireIdempotencyLock(clientKey, payload);
    assert.equal(lock2.status, 'in_flight', 'Second concurrent request must receive in_flight status');

    lock1.release(true, 200, { success: true, message: 'Delivered' });

    const result2 = await lock2.promise;
    assert.equal(result2.status, 200);
    assert.equal(result2.response.success, true);

    const lock3 = acquireIdempotencyLock(clientKey, payload);
    assert.equal(lock3.status, 'completed');
    assert.equal(lock3.record.status, 200);
  });

  test('Failed execution releases lock so user can retry safely', async () => {
    const clientKey = `fail_key_${Date.now()}`;
    const payload = {
      name: 'Retry User',
      email: 'retry@example.com',
      subject: 'Failure Retry Test',
      message: 'Testing lock release on dispatch failure',
    };

    const lock1 = acquireIdempotencyLock(clientKey, payload);
    assert.equal(lock1.status, 'acquired');

    lock1.release(false, 503, { message: 'SMTP Auth Error' });

    const lock2 = acquireIdempotencyLock(clientKey, payload);
    assert.equal(lock2.status, 'acquired', 'Should acquire fresh lock after previous failure');
    lock2.release(true, 200, { success: true });
  });
});

describe('12. Error Redaction & Secrets Leak Prevention', () => {
  test('Centralized error handler redacts password and secret strings from logs', () => {
    const { errorHandler } = require('../src/middleware/errorHandler');
    
    let loggedOutput = null;
    const origError = console.error;
    console.error = (label, data) => { loggedOutput = data; };

    try {
      const fakeReq = { method: 'POST', originalUrl: '/api/contact', ip: '127.0.0.1' };
      const fakeRes = {
        headersSent: false,
        status(code) { this.statusCode = code; return this; },
        json(body) { this.body = body; return this; },
      };
      const fakeErr = new Error('Authentication failed for user: test with pass=supersecretpassword123');
      fakeErr.status = 500;

      errorHandler(fakeErr, fakeReq, fakeRes, () => {});

      assert.ok(loggedOutput);
      assert.equal(loggedOutput.message.includes('supersecretpassword123'), false, 'Password must be redacted from logs');
      assert.match(loggedOutput.message, /pass=\[REDACTED\]/);
    } finally {
      console.error = origError;
    }
  });
});
