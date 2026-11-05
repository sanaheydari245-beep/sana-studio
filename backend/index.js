const path = require('path');
const fs = require('fs');
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
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://challenges.cloudflare.com'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'blob:'],
      fontSrc: ["'self'", 'data:'],
      connectSrc: ["'self'", 'https://challenges.cloudflare.com'],
      frameSrc: ['https://challenges.cloudflare.com'],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
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

// 6. API Routes Registration
app.use('/api', healthRoutes);
app.use('/api', contactRoutes);

// Explicit 404 handler for unmatched /api/* requests:
// Guarantees API consumers always receive JSON error responses, never HTML
app.use('/api', notFoundHandler);

// 7. Frontend Static Asset Serving & SPA Routing
// Determine frontend static directory with priority:
// 1. Bundled backend/public (Chabokan production deployment or local mirrored build)
// 2. Monorepo root ../dist (local development fallback)
const bundledPublicDir = path.resolve(__dirname, 'public');
const localDistDir = path.resolve(__dirname, '../dist');

let DIST_DIR = null;
let INDEX_HTML = null;

if (fs.existsSync(path.join(bundledPublicDir, 'index.html'))) {
  DIST_DIR = bundledPublicDir;
  INDEX_HTML = path.join(bundledPublicDir, 'index.html');
} else if (fs.existsSync(path.join(localDistDir, 'index.html'))) {
  DIST_DIR = localDistDir;
  INDEX_HTML = path.join(localDistDir, 'index.html');
}

const hasDist = Boolean(DIST_DIR && INDEX_HTML && fs.existsSync(INDEX_HTML));

if (hasDist) {
  // Serve static assets (JS, CSS, images, fonts, APK, robots.txt, sitemap.xml)
  app.use(express.static(DIST_DIR, {
    index: false, // Root handled explicitly to enforce no-cache on index.html
    maxAge: config.isProduction ? '1d' : 0,
    setHeaders: (res, filePath) => {
      // Never cache index.html so updates are immediately loaded by browsers
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    },
  }));

  // SPA client-side routing fallback:
  // Non-API routes without file extensions serve the frontend index.html
  app.get('*', (req, res, next) => {
    if (path.extname(req.path)) {
      return next();
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(INDEX_HTML, (err) => {
      if (err) next(err);
    });
  });
} else {
  console.warn('⚠️ [Frontend Warning] Production build not found at:', DIST_DIR);
  app.get('/', (req, res) => {
    res.status(200).json({
      name: 'Emerald Life API',
      version: '1.0.0',
      status: 'running',
      health: '/api/health',
      warning: 'Frontend production build not found at dist/. Please run `npm run build`.',
    });
  });
}

// 8. 404 & Centralized Error Handlers
// Catches non-GET unmatched routes (e.g. POST /unknown-route)
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
