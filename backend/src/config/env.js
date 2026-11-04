require('dotenv').config();

// Resolve execution environment safely
const rawEnv = (process.env.NODE_ENV || '').trim().toLowerCase();

// Safe fail-closed resolution:
// If unset or unrecognized, default strictly to 'production' (never default to open 'development')
let resolvedEnv = 'production';
if (rawEnv === 'development' || rawEnv === 'test') {
  resolvedEnv = rawEnv;
} else if (rawEnv === 'production') {
  resolvedEnv = 'production';
} else if (rawEnv) {
  console.warn(`⚠️ [Security Alert] Unrecognized NODE_ENV='${rawEnv}'. Enforcing strict 'production' mode.`);
  resolvedEnv = 'production';
}

const isProduction = resolvedEnv === 'production';

// Strict CORS Origins resolution
const productionDefaultOrigins = [
  'https://sanastudio.ir',
  'https://www.sanastudio.ir',
];

const developmentDefaultOrigins = [
  'https://sanastudio.ir',
  'https://www.sanastudio.ir',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

let allowedOrigins;
if (process.env.ALLOWED_ORIGINS) {
  allowedOrigins = process.env.ALLOWED_ORIGINS
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
  
  // In production, reject any wildcards or insecure localhost origins
  if (isProduction) {
    allowedOrigins = allowedOrigins.filter(origin => {
      if (origin === '*' || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        console.warn(`⚠️ [CORS Policy] Stripped insecure origin '${origin}' in production environment.`);
        return false;
      }
      return true;
    });
    // Ensure production defaults remain present if custom list is empty
    if (allowedOrigins.length === 0) {
      allowedOrigins = [...productionDefaultOrigins];
    }
  }
} else {
  allowedOrigins = isProduction ? [...productionDefaultOrigins] : [...developmentDefaultOrigins];
}

const config = {
  env: resolvedEnv,
  isProduction,
  port: parseInt(process.env.PORT || '5000', 10),

  // Reverse Proxy Trust Configuration:
  // - 'loopback': Only trusts loopback proxy (127.0.0.1 / ::1) - safest baseline.
  // - 1: Trusts exactly 1 upstream proxy hop (e.g. Chabokan Traefik/Nginx edge router).
  // - 'true': INSECURE because Express trusts the leftmost client-injected IP. We clamp to 1 hop with a warning.
  trustProxy: (() => {
    const val = (process.env.TRUST_PROXY || '').trim().toLowerCase();
    if (val === 'false') return false;
    if (val === 'true') {
      console.warn('⚠️ [Security Warning] TRUST_PROXY=true blindly trusts arbitrary client-supplied X-Forwarded-For headers. Clamping to 1 hop for safety.');
      return 1;
    }
    if (val === 'loopback') return 'loopback';
    if (/^\d+$/.test(val)) return parseInt(val, 10);
    // Narrowest safe default
    return 'loopback';
  })(),

  cors: {
    allowedOrigins,
  },

  mail: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
    user: process.env.SMTP_USER || 'sanaheydari245@gmail.com',
    pass: process.env.SMTP_PASS || '',
    to: process.env.MAIL_TO || 'sanaheydari245@gmail.com',
    fromName: process.env.MAIL_FROM_NAME || 'Sana Studio Contact Form',
  },
};

/**
 * Validates critical production configuration at startup
 */
function validateProductionConfig() {
  if (config.isProduction) {
    if (!config.mail.pass) {
      console.warn('⚠️ [Production Warning] SMTP_PASS is unset. Contact form email delivery will fail until credentials are provided in Chabokan dashboard.');
    }
    if (config.cors.allowedOrigins.some(o => o.includes('*'))) {
      throw new Error('Fatal: Wildcard CORS origin (*) is forbidden in production with credentials.');
    }
  }
}

validateProductionConfig();

module.exports = config;
