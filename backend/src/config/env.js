require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  // Trust proxy resolution:
  // If Chabokan reverse-proxy exact hops are unknown, 'loopback' is the safest baseline.
  // It only trusts 127.0.0.1 / ::1 / local loopback, preventing spoofed X-Forwarded-For headers from the outside.
  // Can be overridden via TRUST_PROXY env variable ('loopback', '1', 'true', 'false', or specific subnet).
  trustProxy: (() => {
    const val = (process.env.TRUST_PROXY || '').trim().toLowerCase();
    if (val === 'false') return false;
    if (val === 'true') return true;
    if (val === 'loopback') return 'loopback';
    if (/^\d+$/.test(val)) return parseInt(val, 10);
    // Safe default if not specified: 'loopback'
    return 'loopback';
  })(),
  cors: {
    allowedOrigins: (process.env.ALLOWED_ORIGINS || 'https://sanastudio.ir,https://www.sanastudio.ir,http://localhost:5173')
      .split(',')
      .map(origin => origin.trim())
      .filter(Boolean),
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

module.exports = config;
