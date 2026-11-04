const nodemailer = require('nodemailer');
const config = require('./env');

let transporter = null;

/**
 * Get or initialize the Nodemailer transporter singleton
 */
function getTransporter() {
  if (!transporter) {
    if (!config.mail.pass) {
      console.warn('⚠️ [Mailer Config] SMTP_PASS is empty. Outgoing email will fail until credentials are configured.');
    }

    transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: config.mail.secure, // true for 465, false for 587
      auth: {
        user: config.mail.user,
        pass: config.mail.pass,
      },
      connectionTimeout: 5000, // 5s connection timeout
      greetingTimeout: 5000,   // 5s greeting timeout
      socketTimeout: 10000,    // 10s socket timeout
      tls: {
        rejectUnauthorized: true,
      },
    });
  }

  return transporter;
}

/**
 * Verify SMTP connection credentials
 */
async function verifyConnection() {
  try {
    const client = getTransporter();
    await client.verify();
    return { success: true };
  } catch (error) {
    const sanitizedError = (error.message || '').replace(/(pass(word)?|secret|token|key|auth)\s*[:=]\s*[^\s]+/gi, '$1=[REDACTED]');
    return { success: false, error: sanitizedError };
  }
}

module.exports = {
  getTransporter,
  verifyConnection,
};
