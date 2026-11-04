const config = require('../config/env');

/**
 * Centralized API Error Handling Middleware
 * Prevents stack traces and internal secrets from leaking in HTTP responses
 */
function errorHandler(err, req, res, next) {
  // If headers were already sent, delegate to Express default handler
  if (res.headersSent) {
    return next(err);
  }

  const isProd = config.env === 'production';

  // Redact potential secrets or passwords from server logs
  const safeMessage = (err.message || '')
    .replace(/(pass(word)?|secret|token|key|auth)\s*[:=]\s*[^\s]+/gi, '$1=[REDACTED]');

  // Log error internally on server console without exposing sensitive data
  console.error('[API Error]', {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    message: safeMessage,
    stack: !isProd ? err.stack : undefined,
  });

  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: err.name || 'InternalServerError',
    message: isProd && statusCode === 500
      ? 'An unexpected error occurred. Please try again later.'
      : safeMessage || 'Server error',
  });
}

/**
 * 404 Route Not Found Middleware
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: 'NotFound',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
