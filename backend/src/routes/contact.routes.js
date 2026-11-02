const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contact.controller');
const { validateContactRequest } = require('../middleware/validator');
const { contactLimiter } = require('../middleware/rateLimiter');

/**
 * POST /api/contact
 * Handles contact message submissions with rate limiting, honeypot & server-side validation
 */
router.post('/contact', contactLimiter, validateContactRequest, submitContactForm);

module.exports = router;
