const express = require('express');
const helmet = require('helmet');
const config = require('./src/config/env');
const corsMiddleware = require('./src/middleware/cors');
const { generalLimiter } = require('./src/middleware/rateLimiter');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');

// Route imports
const healthRoutes = require('./src/routes/health.routes');
const contactRoutes = require('./src/routes/contact.routes');

const app = express();

// 1. Trust proxy configuration
// Narrow trust proxy configuration (clamped against spoofing, defaults to loopback or 1 hop on Chabokan)
if (config.trustProxy !== false) {
  app.set('trust proxy', config.trustProxy);
}

// 2. Security HTTP headers with Helmet tailored for JSON REST API
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
  frameguard: { action: 'deny' },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  noSniff: true,
  referrerPolicy: { policy: 'no-referrer' },
}));

// 3. CORS Policy
app.use(corsMiddleware);

// 4. Request Body Parsers (strict size limits to prevent payload abuse)
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

// 5. Global Rate Limiter for general endpoints
app.use(generalLimiter);

// 6. Base Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Emerald Life API',
    version: '1.0.0',
    status: 'running',
    health: '/api/health',
  });
});

// 7. API Routes Registration
app.use('/api', healthRoutes);
app.use('/api', contactRoutes);

// 8. 404 & Centralized Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// 9. Server Initialization
if (require.main === module) {
  const PORT = config.port;
  const server = app.listen(PORT, () => {
    console.log(`🚀 Emerald Life Backend running on port ${PORT} [${config.env}]`);
    console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
    console.log(`👉 Contact endpoint: http://localhost:${PORT}/api/contact`);
  });

  // Graceful shutdown handling
  const shutdown = (signal) => {
    console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);
    server.close(() => {
      console.log('✅ Server closed cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

module.exports = app;
