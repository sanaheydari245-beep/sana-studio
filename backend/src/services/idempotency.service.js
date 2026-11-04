/**
 * Enhanced Idempotency & In-Flight Lock Store for Contact Submissions
 * 
 * Capabilities:
 * 1. Atomic In-Flight Locking: Prevents race conditions when concurrent duplicate requests arrive.
 * 2. Completion Recording: Stores completed responses for replay on retries.
 * 3. Dual Indexing: Indexed by client-provided Idempotency-Key and Content Hash.
 * 4. Automatic TTL Purge: Evicts records older than 10 minutes.
 * 
 * Limitations (Documented per architecture requirements):
 * - Single-Process In-Memory Store: State is local to this Node.js process instance.
 * - Server Restarts: If the Node.js process restarts, the in-memory Map resets.
 * - Multi-Instance (Cluster / Horizontal Scaling): In a multi-replica setup behind a load balancer,
 *   subsequent requests must hit the same instance, or an external store (Redis) would be needed.
 *   For the current single-instance Chabokan Node.js hosting setup, this zero-dependency in-memory
 *   approach provides maximum speed and zero operational overhead.
 */

const crypto = require('crypto');

const IDEMPOTENCY_TTL_MS = 10 * 60 * 1000; // 10 minutes window
const MAX_CACHE_ENTRIES = 5000;            // Upper bound to prevent memory exhaustion

// Store format:
// Map<string, {
//   state: 'in_flight' | 'completed' | 'failed',
//   timestamp: number,
//   status?: number,
//   response?: object,
//   promise?: Promise<any>
// }>
const processedSubmissions = new Map();

/**
 * Periodically purge stale entries from memory and enforce capacity bound
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of processedSubmissions.entries()) {
    if (record.state !== 'in_flight' && now - record.timestamp > IDEMPOTENCY_TTL_MS) {
      processedSubmissions.delete(key);
    }
  }

  // If cache exceeds maximum limit, evict oldest entries
  if (processedSubmissions.size > MAX_CACHE_ENTRIES) {
    const keysToEvict = Array.from(processedSubmissions.keys()).slice(0, 500);
    for (const k of keysToEvict) {
      processedSubmissions.delete(k);
    }
  }
}, 60 * 1000).unref();

/**
 * Generate a content fingerprint from message data
 */
function createContentHash(data) {
  const { name, email, subject, message } = data;
  const normalized = `${(name || '').trim().toLowerCase()}|${(email || '').trim().toLowerCase()}|${(subject || '').trim()}|${(message || '').trim()}`;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Attempt to acquire an execution lock or retrieve existing result
 * Returns:
 * - { status: 'completed', record } -> Already completed, return cached response
 * - { status: 'in_flight', promise } -> Currently processing another concurrent request with same key/hash; await it
 * - { status: 'acquired', release } -> Lock acquired, caller must execute dispatch and call release(success, result)
 */
function acquireIdempotencyLock(clientKey, payload) {
  const contentHash = createContentHash(payload);
  const primaryKey = clientKey ? `key:${clientKey}` : `hash:${contentHash}`;
  const now = Date.now();

  const existing = processedSubmissions.get(primaryKey) || processedSubmissions.get(`hash:${contentHash}`);

  if (existing) {
    // If completed and not expired, return completed result
    if (existing.state === 'completed' && (now - existing.timestamp < IDEMPOTENCY_TTL_MS)) {
      return { status: 'completed', record: existing };
    }

    // If currently in-flight, return the active lock Promise.
    // The lock is held as long as the operation is actively running and settles only when released.
    if (existing.state === 'in_flight') {
      return { status: 'in_flight', promise: existing.promise };
    }
  }

  // Acquire new in-flight lock
  let resolveLock;
  let rejectLock;
  const lockPromise = new Promise((resolve, reject) => {
    resolveLock = resolve;
    rejectLock = reject;
  });
  // Prevent unhandled promise rejection crash if rejected when no concurrent caller is waiting
  lockPromise.catch(() => {});

  const inFlightRecord = {
    state: 'in_flight',
    timestamp: now,
    promise: lockPromise,
  };

  if (clientKey) processedSubmissions.set(`key:${clientKey}`, inFlightRecord);
  processedSubmissions.set(`hash:${contentHash}`, inFlightRecord);

  const release = (success, statusCode, responseData) => {
    const finalRecord = {
      state: success ? 'completed' : 'failed',
      timestamp: Date.now(),
      status: statusCode,
      response: responseData,
    };

    if (success) {
      if (clientKey) processedSubmissions.set(`key:${clientKey}`, finalRecord);
      processedSubmissions.set(`hash:${contentHash}`, finalRecord);
      resolveLock(finalRecord);
    } else {
      // On failure, delete locks so immediate valid retry is allowed
      if (clientKey) processedSubmissions.delete(`key:${clientKey}`);
      processedSubmissions.delete(`hash:${contentHash}`);
      const err = new Error(responseData?.message || 'Processing failed');
      err.status = statusCode;
      rejectLock(err);
    }
  };

  return { status: 'acquired', release };
}

/**
 * Clear all cache entries (used for testing server restart simulation)
 */
function clearIdempotencyCache() {
  processedSubmissions.clear();
}

module.exports = {
  acquireIdempotencyLock,
  createContentHash,
  clearIdempotencyCache,
  IDEMPOTENCY_TTL_MS,
};
