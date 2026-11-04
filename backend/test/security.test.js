const { test, describe, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

// Configure test environment
process.env.NODE_ENV = 'test';
process.env.TRUST_PROXY = '1';

const app = require('../index');
const { sanitizeSingleLine, sanitizeText } = require('../src/middleware/validator');
const { escapeHtml } = require('../src/services/email.service');
const { clearIdempotencyCache, acquireIdempotencyLock } = require('../src/services/idempotency.service');

let server;
let baseUrl;
let testIpCounter = 1;

function getFreshIpHeader() {
  testIpCounter += 1;
  // With trustProxy=1, the client IP is the address immediately preceding the trusted proxy hop
  return { 'X-Forwarded-For': `198.51.100.${testIpCounter}` };
}

before(() => new Promise((resolve) => {
  server = http.createServer(app);
  server.listen(0, '127.0.0.1', () => {
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
    resolve();
  });
}));

after(() => new Promise((resolve) => {
  if (server) {
    server.close(resolve);
  } else {
    resolve();
  }
}));

beforeEach(() => {
  clearIdempotencyCache();
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
});

describe('2. Base API & Health Endpoints', () => {
  test('GET / returns API info', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.name, 'Sana Studio API');
    assert.equal(data.status, 'running');
  });

  test('GET /api/health returns healthy status and uptime', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.status, 'healthy');
    assert.ok(typeof data.uptimeSeconds === 'number');
  });

  test('GET /api/health/mailer in production returns 403 Forbidden', async () => {
    const originalEnv = process.env.NODE_ENV;
    const config = require('../src/config/env');
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
    assert.ok(data.errors.name, 'Name error required');
    assert.ok(data.errors.email, 'Email error required');
    assert.ok(data.errors.subject, 'Subject error required');
    assert.ok(data.errors.message, 'Message error required');
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
      _gotcha: 'bot-trap', // Use honeypot so no SMTP send is attempted
    });

    // Make 5 requests (should succeed with 200)
    for (let i = 0; i < 5; i++) {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...fixedIpHeaders },
        body: validBody,
      });
      assert.equal(res.status, 200, `Request ${i + 1} of 5 should succeed`);
    }

    // 6th request from the same IP must be rejected with 429 Too Many Requests
    const resBlocked = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...fixedIpHeaders },
      body: validBody,
    });
    assert.equal(resBlocked.status, 429, '6th request from same IP must return 429');
    const blockedData = await resBlocked.json();
    assert.equal(blockedData.error, 'Too many requests');
  });
});

describe('10. Idempotency & In-Flight Concurrency Locking', () => {
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

describe('11. Error Redaction & Secrets Leak Prevention', () => {
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
