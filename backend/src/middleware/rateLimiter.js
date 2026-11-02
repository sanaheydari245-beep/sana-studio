const rateLimit = require('express-rate-limit');

/**
 * Contact form rate limiter:
 * Limits each IP address to 5 contact submissions per 15-minute window.
 * Respects standard X-Forwarded-For headers when trust proxy is configured.
 */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 contact submissions per IP per window
  standardHeaders: true, // Return standard RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* legacy headers
  message: {
    success: false,
    error: 'Too many requests',
    message: 'Too many contact submissions from this IP address. Please wait 15 minutes before trying again.',
    messageFa: 'تعداد درخواست‌های ارسالی از این آدرس بیش از حد مجاز است. لطفاً ۱۵ دقیقه دیگر تلاش فرمایید.',
  },
  skipFailedRequests: false,
});

/**
 * General API rate limiter:
 * Protects health and general endpoints from DDoS or scraping.
 */
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 120, // 120 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  contactLimiter,
  generalLimiter,
};
