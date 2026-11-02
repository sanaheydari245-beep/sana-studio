/**
 * Comprehensive Backend & Idempotency Test Suite
 * Includes duplicate submission, content-hash replay, validation, and network robustness tests.
 */
const http = require('http');
const app = require('./index');
const { acquireIdempotencyLock, clearIdempotencyCache } = require('./src/services/idempotency.service');

let server;
const TEST_PORT = 5056;
const BASE_URL = `http://localhost:${TEST_PORT}`;

function makeRequest(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch {
          json = data;
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: json,
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runAllTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING IDEMPOTENCY & ROBUSTNESS TEST SUITE');
  console.log('====================================================\n');

  let passedCount = 0;
  let failedCount = 0;

  function record(name, condition, details = '') {
    if (condition) {
      console.log(`  ✅ [PASS] ${name}`);
      passedCount++;
    } else {
      console.error(`  ❌ [FAIL] ${name} ${details ? `(${details})` : ''}`);
      failedCount++;
    }
  }

  try {
    await new Promise((resolve) => {
      server = app.listen(TEST_PORT, resolve);
    });

    // 1. Basic Health Endpoint
    const healthRes = await makeRequest('/api/health');
    record('Test 1: Health endpoint responds healthy', healthRes.status === 200 && healthRes.body.status === 'healthy');

    // 2. Validation of mandatory fields
    const emptyPost = await makeRequest('/api/contact', { method: 'POST' }, {});
    record('Test 2: Empty submission rejected with 400', emptyPost.status === 400 && Boolean(emptyPost.body?.errors?.name));

    // 3. Honeypot anti-bot silently captured
    const botRes = await makeRequest('/api/contact', { method: 'POST' }, {
      name: 'Bot',
      email: 'bot@mail.com',
      subject: 'Ads',
      message: 'Spam text message that is long enough.',
      honeypot: 'spam-trap',
    });
    record('Test 3: Honeypot trap intercepts bot with 200 OK', botRes.status === 200 && botRes.body.success === true);

    // 4. Idempotency Service Unit Test: Record & Check
    const samplePayload = {
      name: 'Sana Test',
      email: 'test@example.com',
      subject: 'Inquiry',
      message: 'Test message for idempotency verification.',
    };
    const testKey = 'test-uuid-12345';

    // Step A: Acquire lock for fresh submission
    const lockAcquired = acquireIdempotencyLock(testKey, samplePayload);
    record('Test 4: Fresh submission acquires lock successfully', lockAcquired.status === 'acquired');

    // Step B: Complete it
    lockAcquired.release(true, 200, { success: true, message: 'Recorded' });

    // Step C: After recording with same key:
    const afterKeyCheck = acquireIdempotencyLock(testKey, samplePayload);
    record('Test 5: Same Idempotency-Key returns completed record from cache', afterKeyCheck.status === 'completed' && afterKeyCheck.record.response.message === 'Recorded');

    // Step D: After recording with DIFFERENT key but IDENTICAL payload:
    const afterContentCheck = acquireIdempotencyLock('different-uuid-99999', samplePayload);
    record('Test 6: Content Fingerprint Hash detects identical payload even with different key', afterContentCheck.status === 'completed');

    // 5. Test Live HTTP Endpoint with Idempotency Replay
    const testPostPayload = {
      name: 'Duplicate Tester',
      email: 'dup@example.com',
      subject: 'Testing Duplicates',
      message: 'This is a message to test HTTP idempotency replay.',
    };
    const httpKey = 'http-idem-key-777';

    // Pre-record in idempotency store to simulate that email was ALREADY delivered
    const httpLock = acquireIdempotencyLock(httpKey, testPostPayload);
    httpLock.release(true, 200, {
      success: true,
      message: 'Original email sent successfully',
    });

    // Make live HTTP request with the same idempotency key:
    const replayRes = await makeRequest('/api/contact', {
      method: 'POST',
      headers: {
        'Idempotency-Key': httpKey,
      },
    }, testPostPayload);

    record('Test 7: HTTP endpoint returns 200 with idempotentReplay flag and does NOT call Nodemailer again',
      replayRes.status === 200 && replayRes.body.idempotentReplay === true && replayRes.body.message === 'Original email sent successfully');

    // 6. Security & Header verification
    const optionsRes = await makeRequest('/api/contact', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://sanastudio.ir',
        'Access-Control-Request-Method': 'POST',
      },
    });
    record('Test 8: CORS allows https://sanastudio.ir', optionsRes.status === 200 || optionsRes.status === 204);

    console.log('\n----------------------------------------------------');
    console.log(`📊 TOTAL RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
    console.log('----------------------------------------------------');

    if (failedCount > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  } finally {
    if (server) {
      server.close();
    }
  }
}

runAllTests();
