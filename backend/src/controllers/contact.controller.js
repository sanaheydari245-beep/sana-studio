const { sendContactEmail } = require('../services/email.service');
const { acquireIdempotencyLock } = require('../services/idempotency.service');

/**
 * Handle contact form submission with Concurrency-Safe Idempotency Protection
 */
async function submitContactForm(req, res, next) {
  const sanitizedData = req.sanitized;
  const clientKey = req.headers['idempotency-key'] || req.headers['x-idempotency-key'] || '';

  // 1. Attempt to acquire an execution lock or retrieve already-completed / in-flight request
  const lock = acquireIdempotencyLock(clientKey, sanitizedData);

  // Case A: Request was ALREADY completed previously
  if (lock.status === 'completed') {
    console.log('⚡ [Idempotency] Returning previously completed response (Replay)');
    return res.status(lock.record.status).json({
      ...lock.record.response,
      idempotentReplay: true,
    });
  }

  // Case B: Another identical request is CURRENTLY in flight (race condition)
  if (lock.status === 'in_flight') {
    console.log('⏳ [Idempotency] Concurrent duplicate request detected. Awaiting ongoing dispatch...');
    try {
      const ongoingResult = await lock.promise;
      return res.status(ongoingResult.status).json({
        ...ongoingResult.response,
        idempotentReplay: true,
      });
    } catch (ongoingErr) {
      // If the ongoing operation failed, return the exact failure to the waiting caller
      const failureStatus = ongoingErr.status || 500;
      return res.status(failureStatus).json({
        success: false,
        error: ongoingErr.name || 'SubmissionFailed',
        message: ongoingErr.message || 'The email operation failed. Please try again.',
      });
    }
  }

  // Case C: Lock acquired - this request has exclusive right to execute dispatch
  try {
    const info = await sendContactEmail(sanitizedData);

    const responseBody = {
      success: true,
      message: 'Your message has been sent successfully.',
      messageFa: 'پیام شما با موفقیت ارسال شد.',
      messageId: process.env.NODE_ENV === 'development' ? info.messageId : undefined,
    };

    // Release lock and mark as completed
    if (lock.release) {
      lock.release(true, 200, responseBody);
    }

    return res.status(200).json(responseBody);
  } catch (error) {
    const safeErrMsg = (error.message || '').replace(/(pass(word)?|secret|token|key|auth)\s*[:=]\s*[^\s]+/gi, '$1=[REDACTED]');
    console.error('[Contact Controller Error]', safeErrMsg);

    // Release lock as failed so user can retry cleanly
    if (lock.release) {
      lock.release(false, error.responseCode || 500, { message: error.message });
    }

    if (error.code === 'EAUTH' || error.responseCode === 535) {
      return res.status(503).json({
        success: false,
        error: 'MailServiceUnavailable',
        message: 'The email service is temporarily unable to authenticate. Please try again or use direct email.',
        messageFa: 'سرویس ارسال ایمیل موقتاً با مشکل اعتبارسنجی مواجه شده است. لطفاً مستقیماً ایمیل بزنید.',
      });
    }

    return next(error);
  }
}

module.exports = {
  submitContactForm,
};
