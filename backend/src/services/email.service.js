const { getTransporter } = require('../config/mailer');
const config = require('../config/env');

/**
 * Escapes HTML characters for safe template rendering
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sends a contact message email to the official studio recipient
 * @param {Object} data - Cleaned sender data { name, email, subject, message }
 * @returns {Promise<Object>} - Nodemailer send result
 */
async function sendContactEmail(data) {
  const { name, email, subject, message } = data;
  const transporter = getTransporter();

  const formattedDate = new Date().toLocaleString('fa-IR', {
    timeZone: 'Asia/Tehran',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const mailOptions = {
    from: `"${config.mail.fromName}" <${config.mail.user}>`,
    to: config.mail.to,
    replyTo: `"${name}" <${email}>`,
    subject: `[Emerald Life Contact] ${subject}`,
    text: `پیام جدید از فرم تماس وب‌سایت Emerald Life\n\n` +
          `نام فرستنده: ${name}\n` +
          `نشانی ایمیل: ${email}\n` +
          `موضوع: ${subject}\n` +
          `زمان ثبت: ${formattedDate}\n\n` +
          `متن پیام:\n${message}\n`,
    html: `
      <!DOCTYPE html>
      <html lang="fa" dir="rtl">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Tahoma, Arial, sans-serif; background-color: #f4f6fc; margin: 0; padding: 20px; color: #182541; direction: rtl; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #dce5ff; overflow: hidden; box-shadow: 0 4px 12px rgba(24,37,65,0.06); }
          .header { background: #182541; color: #ffffff; padding: 24px; text-align: center; }
          .header h2 { margin: 0; font-size: 20px; font-weight: bold; color: #ffffff; }
          .badge { display: inline-block; background: #059669; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 11px; margin-top: 8px; font-weight: bold; }
          .content { padding: 24px; }
          .field { margin-bottom: 16px; border-bottom: 1px dashed #e8ecf8; padding-bottom: 12px; }
          .field:last-child { border-bottom: none; }
          .label { font-weight: bold; font-size: 13px; color: #52678d; margin-bottom: 4px; display: block; }
          .value { font-size: 14px; color: #101b3d; }
          .message-box { background: #f8faff; border: 1px solid #dce5ff; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 14px; line-height: 1.8; white-space: pre-wrap; word-break: break-word; color: #101b3d; }
          .footer { background: #f8faff; padding: 16px; text-align: center; font-size: 12px; color: #52678d; border-top: 1px solid #dce5ff; }
          .reply-hint { background: #dce5ff; color: #047857; padding: 8px 12px; border-radius: 6px; font-size: 12px; margin-top: 16px; font-weight: bold; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>فرم تماس وب‌سایت Emerald Life</h2>
            <div class="badge">پیام جدید کاربری</div>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">نام و نام خانوادگی فرستنده:</span>
              <span class="value">${escapeHtml(name)}</span>
            </div>
            <div class="field">
              <span class="label">نشانی ایمیل فرستنده:</span>
              <span class="value" dir="ltr" style="font-family: monospace; font-weight: bold; color: #059669;">${escapeHtml(email)}</span>
            </div>
            <div class="field">
              <span class="label">موضوع پیام:</span>
              <span class="value">${escapeHtml(subject)}</span>
            </div>
            <div class="field">
              <span class="label">زمان ثبت در سیستم:</span>
              <span class="value">${escapeHtml(formattedDate)}</span>
            </div>
            <div class="field">
              <span class="label">متن پیام ارسالی:</span>
              <div class="message-box">${escapeHtml(message)}</div>
            </div>
            <div class="reply-hint">
              💡 با کلیک روی Reply در ایمیل خود، پاسخ مستقیماً به فرستنده (${escapeHtml(email)}) ارسال می‌شود.
            </div>
          </div>
          <div class="footer">
            این پیام به صورت خودکار از طریق سرور اختصاصی Emerald Life ارسال شده است.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return await transporter.sendMail(mailOptions);
}

module.exports = {
  sendContactEmail,
  escapeHtml,
};
