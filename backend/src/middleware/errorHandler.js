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

  // Log error internally on server console
  console.error('[API Error]', {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    message: err.message,
    stack: config.env === 'development' ? err.stack : undefined,
  });

  const statusCode = err.status || err.statusCode || 500;
  const isProd = config.env === 'production';

  res.status(statusCode).json({
    success: false,
    error: err.name || 'InternalServerError',
    message: isProd && statusCode === 500
      ? 'An unexpected error occurred. Please try again later.'
      : err.message || 'Server error',
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
