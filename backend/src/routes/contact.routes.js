const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contact.controller');
const { validateContactRequest } = require('../middleware/validator');
const { contactLimiter } = require('../middleware/rateLimiter');
const { verifyTurnstile } = require('../middleware/turnstile');

/**
 * POST /api/contact
 * Handles contact message submissions with rate limiting, optional Turnstile bot protection,
 * honeypot, and strict server-side validation
 */
router.post('/contact', contactLimiter, verifyTurnstile, validateContactRequest, submitContactForm);

module.exports = router;
