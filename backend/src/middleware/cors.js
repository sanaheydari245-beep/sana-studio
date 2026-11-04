const cors = require('cors');
const config = require('../config/env');

const corsOptions = {
  origin: function (origin, callback) {
    // 1. Allow requests with no origin (e.g. mobile apps, curl, automated uptime probes)
    if (!origin) {
      return callback(null, true);
    }

    // 2. Strict matching against explicitly allowed origins
    const isAllowed = config.cors.allowedOrigins.some(allowed => {
      // Direct exact match
      if (allowed === origin) return true;
      // Exact host & protocol match (e.g. handles trailing slash differences)
      try {
        const allowedUrl = new URL(allowed);
        const reqUrl = new URL(origin);
        return allowedUrl.origin === reqUrl.origin;
      } catch {
        return false;
      }
    });

    if (isAllowed) {
      return callback(null, true);
    }

    // Disallowed origin: deny by passing false (suppresses Access-Control-Allow-Origin header)
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Idempotency-Key',
    'X-Idempotency-Key',
    'CF-Turnstile-Response',
  ],
  credentials: true,
  maxAge: 86400, // 24 hours preflight cache
};

module.exports = cors(corsOptions);
