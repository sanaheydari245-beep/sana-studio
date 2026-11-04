const config = require('../config/env');

/**
 * Cloudflare Turnstile Server-Side Verification Middleware
 * 
 * Verifies Turnstile token with Cloudflare's siteverify endpoint:
 * https://challenges.cloudflare.com/turnstile/v0/siteverify
 * 
 * Behavior:
 * - If TURNSTILE_SECRET_KEY is configured in backend environment:
 *   Enforces token verification. Missing or invalid tokens result in HTTP 400/403.
 * - If TURNSTILE_SECRET_KEY is NOT configured:
 *   Safely bypasses verification and passes to next middleware, allowing
 *   seamless operation in environments without Cloudflare keys while preserving
 *   honeypot and rate limiting layers.
 */
async function verifyTurnstile(req, res, next) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile secret is not configured, fall through to honeypot & rate limiters
  if (!secretKey) {
    return next();
  }

  const token = (
    req.body?.['cf-turnstile-response'] ||
    req.body?.turnstileToken ||
    req.headers['cf-turnstile-response'] ||
    ''
  ).toString().trim();

  if (!token) {
    return res.status(400).json({
      success: false,
      error: 'CaptchaTokenMissing',
      message: 'Bot verification token is missing. Please complete the verification.',
      messageFa: 'کد اعتبارسنجی امنیتی یافت نشد. لطفاً مجدداً تلاش فرمایید.',
    });
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (req.ip) {
      formData.append('remoteip', req.ip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const outcome = await response.json().catch(() => null);

    if (outcome && outcome.success) {
      return next();
    }

    console.warn('[Turnstile Verification Failed]', {
      ip: req.ip,
      errorCodes: outcome?.['error-codes'] || ['invalid_token'],
    });

    return res.status(403).json({
      success: false,
      error: 'CaptchaVerificationFailed',
      message: 'Bot verification failed or token has expired. Please try again.',
      messageFa: 'اعتبارسنجی امنیتی ناموفق بود یا منقضی شده است. لطفاً صفحه را بازنشانی کرده و مجدداً تلاش نمایید.',
    });
  } catch (err) {
    console.error('[Turnstile Network Error]', err.message);
    return res.status(503).json({
      success: false,
      error: 'CaptchaServiceUnavailable',
      message: 'Security verification service is temporarily unavailable.',
    });
  }
}

module.exports = {
  verifyTurnstile,
};
