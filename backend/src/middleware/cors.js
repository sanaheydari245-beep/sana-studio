const cors = require('cors');
const config = require('../config/env');

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser requests (e.g. mobile apps, curl, health probes) where origin is undefined
    if (!origin) {
      return callback(null, true);
    }

    const isAllowed = config.cors.allowedOrigins.some(allowed => {
      // Direct exact match
      if (allowed === origin) return true;
      // Also allow subdomain match if applicable
      try {
        const allowedHost = new URL(allowed).host;
        const reqHost = new URL(origin).host;
        return allowedHost === reqHost;
      } catch {
        return false;
      }
    });

    if (isAllowed || config.env === 'development') {
      return callback(null, true);
    }

    return callback(new Error(`CORS Error: Origin '${origin}' is not allowed by policy.`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Idempotency-Key', 'X-Idempotency-Key'],
  credentials: true,
  maxAge: 86400, // 24 hours preflight cache
};

module.exports = cors(corsOptions);
