const config = require('../config/env');

/**
 * Cloudflare Turnstile Server-Side Verification Middleware
 * 
 * Verifies Turnstile token with Cloudflare's siteverify endpoint:
 * https://challenges.cloudflare.com/turnstile/v0/siteverify
 * 
 * Explicit Modes:
 * - 'disabled': Explicitly bypasses Turnstile check (honeypot + IP rate limiting remain active).
 * - 'required': Enforces strict token presence and Cloudflare siteverify validation.
 *   If the secret key is missing when required, fails closed safely with HTTP 503.
 */
async function verifyTurnstile(req, res, next) {
  const turnstileConfig = config.turnstile;

  // 1. Explicitly disabled mode
  if (turnstileConfig.mode === 'disabled') {
    return next();
  }

  // 2. Required mode: Fail closed if secret key is missing
  if (!turnstileConfig.secretKey) {
    console.error('[Turnstile Security Error] Turnstile is required but TURNSTILE_SECRET_KEY is not configured.');
    return res.status(503).json({
      success: false,
      error: 'CaptchaConfigurationError',
      message: 'Bot protection is required but misconfigured on server.',
      messageFa: 'سرویس اعتبارسنجی امنیتی روی سرور پیکربندی نشده است.',
    });
  }

  // 3. Extract token from body or headers
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
      message: 'Bot verification token is missing. Please complete the verification challenge.',
      messageFa: 'کد اعتبارسنجی امنیتی یافت نشد. لطفاً چالش امنیتی را تکمیل فرمایید.',
    });
  }

  // 4. Validate with Cloudflare siteverify API with timeout
  try {
    const formData = new URLSearchParams();
    formData.append('secret', turnstileConfig.secretKey);
    formData.append('response', token);
    if (req.ip) {
      formData.append('remoteip', req.ip);
    }

    const response = await fetch(turnstileConfig.siteverifyUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      signal: AbortSignal.timeout(turnstileConfig.timeoutMs),
    });

    if (!response.ok) {
      console.error('[Turnstile HTTP Error]', response.status);
      return res.status(503).json({
        success: false,
        error: 'CaptchaServiceUnavailable',
        message: 'Bot verification service is temporarily unavailable.',
      });
    }

    const outcome = await response.json().catch(() => null);

    if (!outcome || outcome.success !== true) {
      const errorCodes = outcome?.['error-codes'] || ['invalid_token'];
      console.warn('[Turnstile Validation Failed]', {
        ip: req.ip,
        errorCodes,
      });

      if (errorCodes.includes('timeout-or-duplicate')) {
        return res.status(403).json({
          success: false,
          error: 'CaptchaTokenExpiredOrReused',
          message: 'Verification token has expired or was already used. Please refresh and try again.',
          messageFa: 'اعتبارسنجی امنیتی منقضی شده یا قبلاً استفاده شده است. لطفاً صفحه را بازنشانی فرمایید.',
        });
      }

      return res.status(403).json({
        success: false,
        error: 'CaptchaVerificationFailed',
        message: 'Bot verification failed. Please try again.',
        messageFa: 'اعتبارسنجی امنیتی ناموفق بود. لطفاً مجدداً تلاش فرمایید.',
      });
    }

    // 5. Verify action match if configured
    if (turnstileConfig.expectedAction && outcome.action) {
      if (outcome.action !== turnstileConfig.expectedAction) {
        console.warn(`[Turnstile Action Mismatch] Expected '${turnstileConfig.expectedAction}', received '${outcome.action}'`);
        return res.status(403).json({
          success: false,
          error: 'CaptchaActionMismatch',
          message: 'Security action verification mismatch.',
        });
      }
    }

    // 6. Verify hostname match if configured
    if (turnstileConfig.expectedHostname && outcome.hostname) {
      if (outcome.hostname !== turnstileConfig.expectedHostname) {
        console.warn(`[Turnstile Hostname Mismatch] Expected '${turnstileConfig.expectedHostname}', received '${outcome.hostname}'`);
        return res.status(403).json({
          success: false,
          error: 'CaptchaHostnameMismatch',
          message: 'Security hostname verification mismatch.',
        });
      }
    }

    // Verification succeeded
    return next();
  } catch (err) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      console.error('[Turnstile Timeout]', `Exceeded ${turnstileConfig.timeoutMs}ms`);
      return res.status(504).json({
        success: false,
        error: 'CaptchaTimeout',
        message: 'Security verification service timed out. Please try again.',
      });
    }

    console.error('[Turnstile Service Error]', err.message);
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
