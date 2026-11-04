/**
 * HTML Sanitizer & Stripper
 * Removes HTML tags, script blocks, style blocks, and cleans control characters
 */
function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove <script>...</script>
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')   // Remove <style>...</style>
    .replace(/<[^>]*>/g, '')                                            // Strip remaining HTML tags
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')           // Strip non-printable ASCII
    .trim();
}

/**
 * Strips newlines and carriage returns to prevent CRLF Email Header Injection
 * for single-line headers (Name, Subject).
 */
function sanitizeSingleLine(str) {
  return sanitizeText(str).replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Standard email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validation Middleware for Contact Form
 */
function validateContactRequest(req, res, next) {
  const { name, email, subject, message, honeypot, _gotcha } = req.body || {};

  // 1. Honeypot check: If bot filled either honeypot field, stop silently
  const botTrap = (honeypot || _gotcha || '').toString().trim();
  if (botTrap.length > 0) {
    // Pretend success to fool spam bots without sending actual email
    return res.status(200).json({
      success: true,
      message: 'Message processed successfully',
    });
  }

  const errors = {};

  // Clean values: enforce single-line stripping on headers to neutralize header injection
  const cleanName = sanitizeSingleLine(name);
  const cleanEmail = (email || '').toString().trim();
  const cleanSubject = sanitizeSingleLine(subject);
  const cleanMessage = sanitizeText(message);

  // Validate Name
  if (!cleanName) {
    errors.name = 'Name is required / نام الزامی است';
  } else if (cleanName.length < 2) {
    errors.name = 'Name must be at least 2 characters / نام باید حداقل ۲ کاراکتر باشد';
  } else if (cleanName.length > 80) {
    errors.name = 'Name must not exceed 80 characters / نام نباید بیشتر از ۸۰ کاراکتر باشد';
  }

  // Validate Email
  if (!cleanEmail) {
    errors.email = 'Email address is required / نشانی ایمیل الزامی است';
  } else if (!EMAIL_REGEX.test(cleanEmail)) {
    errors.email = 'Email format is invalid / قالب نشانی ایمیل معتبر نیست';
  } else if (cleanEmail.length > 120) {
    errors.email = 'Email must not exceed 120 characters / ایمیل نباید بیشتر از ۱۲۰ کاراکتر باشد';
  }

  // Validate Subject
  if (!cleanSubject) {
    errors.subject = 'Subject is required / موضوع پیام الزامی است';
  } else if (cleanSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters / موضوع باید حداقل ۳ کاراکتر باشد';
  } else if (cleanSubject.length > 150) {
    errors.subject = 'Subject must not exceed 150 characters / موضوع نباید بیشتر از ۱۵۰ کاراکتر باشد';
  }

  // Validate Message
  if (!cleanMessage) {
    errors.message = 'Message text is required / متن پیام الزامی است';
  } else if (cleanMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters / متن پیام باید حداقل ۱۰ کاراکتر باشد';
  } else if (cleanMessage.length > 3000) {
    errors.message = 'Message must not exceed 3000 characters / متن پیام نباید بیشتر از ۳۰۰۰ کاراکتر باشد';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors,
    });
  }

  // Attach sanitized fields to req.sanitized for controller consumption
  req.sanitized = {
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
  };

  next();
}

module.exports = {
  sanitizeText,
  sanitizeSingleLine,
  validateContactRequest,
};
