const express = require('express');
const router = express.Router();
const config = require('../config/env');
const { verifyConnection } = require('../config/mailer');

/**
 * GET /api/health
 * Used by Chabokan health probes and status monitoring
 */
router.get('/health', async (req, res) => {
  const uptimeSeconds = Math.floor(process.uptime());

  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'sana-studio-backend',
    environment: config.env,
    uptimeSeconds,
  });
});

/**
 * GET /api/health/mailer
 * Diagnostics endpoint to verify SMTP credentials safely without exposing internal details
 * Available in development mode only, or restricted to internal health checks.
 */
router.get('/health/mailer', async (req, res) => {
  if (config.env === 'production') {
    return res.status(403).json({
      status: 'forbidden',
      message: 'SMTP diagnostic probe is disabled in production environment.',
    });
  }

  const result = await verifyConnection();

  if (result.success) {
    return res.status(200).json({
      status: 'connected',
      service: 'smtp',
      message: 'SMTP connection verified successfully',
    });
  }

  return res.status(503).json({
    status: 'error',
    service: 'smtp',
    error: 'Failed to authenticate with SMTP server. Verify credentials.',
  });
});

module.exports = router;
