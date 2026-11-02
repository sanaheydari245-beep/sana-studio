import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import {
  Mail,
  Send,
  AlertCircle,
  CheckCircle,
  Copy,
  Check,
  ShieldCheck,
  Info,
  Loader2,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';

interface ContactProps {
  lang: Language;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-bot honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const OFFICIAL_EMAIL = 'sanaheydari245@gmail.com';
const COOLDOWN_SECONDS = 60;
const STORAGE_KEY_LAST_SENT = 'sana_contact_last_sent_timestamp';

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = translations[lang].contact;

  // Dedicated backend base URL (e.g. https://api.sanastudio.ir or http://localhost:5000)
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

  // Environment variables for EmailJS (preserved as reliable fallback)
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  const isEmailJSConfigured = Boolean(
    serviceId.trim() && templateId.trim() && publicKey.trim()
  );

  // Ready if either the dedicated backend or EmailJS is configured
  const isBackendConfigured = Boolean(apiBaseUrl);
  const isAnyServiceConfigured = isBackendConfigured || isEmailJSConfigured;

  // Active idempotency key for the current submission attempt
  // Reused across retries if network fails, regenerated only on brand-new input / reset
  const [currentIdempotencyKey, setCurrentIdempotencyKey] = useState<string>('');

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Rate limiting / cooldown timer
  const [remainingCooldown, setRemainingCooldown] = useState<number>(0);

  useEffect(() => {
    const checkCooldown = () => {
      try {
        const lastSentStr = localStorage.getItem(STORAGE_KEY_LAST_SENT);
        if (lastSentStr) {
          const lastSentTime = parseInt(lastSentStr, 10);
          const elapsedSec = Math.floor((Date.now() - lastSentTime) / 1000);
          if (elapsedSec < COOLDOWN_SECONDS) {
            setRemainingCooldown(COOLDOWN_SECONDS - elapsedSec);
          } else {
            setRemainingCooldown(0);
          }
        }
      } catch {
        // LocalStorage might be disabled in private mode
      }
    };

    checkCooldown();
    const interval = setInterval(() => {
      setRemainingCooldown((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sanitize text by removing potentially harmful tags and excessive spacing
  const sanitize = (val: string): string => {
    return val.replace(/<[^>]*>?/gm, '').trim();
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const cleanName = sanitize(formData.name);
    const cleanEmail = formData.email.trim();
    const cleanSubject = sanitize(formData.subject);
    const cleanMessage = sanitize(formData.message);

    // Name validation
    if (!cleanName) {
      newErrors.name = t.validationErrors.nameRequired;
    } else if (cleanName.length < 2) {
      newErrors.name = t.validationErrors.nameMin;
    } else if (cleanName.length > 80) {
      newErrors.name = t.validationErrors.nameMax;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail) {
      newErrors.email = t.validationErrors.emailRequired;
    } else if (!emailRegex.test(cleanEmail)) {
      newErrors.email = t.validationErrors.emailInvalid;
    } else if (cleanEmail.length > 120) {
      newErrors.email = t.validationErrors.emailMax;
    }

    // Subject validation
    if (!cleanSubject) {
      newErrors.subject = t.validationErrors.subjectRequired;
    } else if (cleanSubject.length < 3) {
      newErrors.subject = t.validationErrors.subjectMin;
    } else if (cleanSubject.length > 150) {
      newErrors.subject = t.validationErrors.subjectMax;
    }

    // Message validation
    if (!cleanMessage) {
      newErrors.message = t.validationErrors.messageRequired;
    } else if (cleanMessage.length < 10) {
      newErrors.message = t.validationErrors.messageMin;
    } else if (cleanMessage.length > 3000) {
      newErrors.message = t.validationErrors.messageMax;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit cooldown
    if (remainingCooldown > 0) {
      return;
    }

    if (!validate()) return;

    // Honeypot check: If bot filled the hidden honeypot field, simulate success without dispatching
    if (formData.honeypot.trim() !== '') {
      setStatus('submitting');
      setTimeout(() => {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          honeypot: '',
        });
      }, 800);
      return;
    }

    // If neither dedicated backend nor EmailJS is configured, redirect to direct mailto
    if (!isAnyServiceConfigured) {
      handleDirectMail();
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const cleanName = sanitize(formData.name);
    const cleanEmail = formData.email.trim();
    const cleanSubject = sanitize(formData.subject);
    const cleanMessage = sanitize(formData.message);

    // Reuse existing key if retrying the same attempt after network failure;
    // generate a new key only for the first attempt of this submission.
    let idempotencyKey = currentIdempotencyKey;
    if (!idempotencyKey) {
      idempotencyKey = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `key_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      setCurrentIdempotencyKey(idempotencyKey);
    }

    // Primary: Attempt delivery via dedicated Node.js Chabokan Backend if configured
    if (isBackendConfigured) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Idempotency-Key': idempotencyKey,
          },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            subject: cleanSubject,
            message: cleanMessage,
            honeypot: '',
          }),
        });

        const data = await response.json().catch(() => null);

        if (response.ok && data?.success) {
          setStatus('success');
          setCurrentIdempotencyKey(''); // Clear key on successful delivery
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            honeypot: '',
          });
          setErrors({});

          try {
            localStorage.setItem(STORAGE_KEY_LAST_SENT, Date.now().toString());
            setRemainingCooldown(COOLDOWN_SECONDS);
          } catch {
            // ignore storage error
          }
          return;
        }

        // If backend returned rate limit or validation error, report error and DO NOT fall back to EmailJS
        if (response.status === 429) {
          setStatus('error');
          setErrorMessage(data?.messageFa || data?.message || t.rateLimitWarning);
          return;
        }

        if (response.status === 400 && data?.errors) {
          setStatus('error');
          const firstErr = Object.values(data.errors)[0] as string;
          setErrorMessage(firstErr || t.errorMessage);
          return;
        }

        // Backend returned explicit 5xx error (e.g. 503 SMTP unavailable)
        // If EmailJS is NOT available, throw to report error
        if (!isEmailJSConfigured) {
          throw new Error(data?.messageFa || data?.message || t.errorMessage);
        }

        console.warn('Dedicated backend returned server error, falling back to EmailJS...');
      } catch (backendErr: unknown) {
        // Network timeout / connection dropped.
        // NOTE: If the request reached the backend and sent the email, re-sending via EmailJS
        // could produce a duplicate. If EmailJS is configured, we proceed to EmailJS only
        // if user explicitly submits again or if the backend was completely unreachable.
        console.warn('Primary backend delivery attempt failed (network/server):', backendErr);
        if (!isEmailJSConfigured) {
          setStatus('error');
          const errObj = backendErr as { message?: string };
          setErrorMessage(errObj?.message || t.errorMessage);
          return;
        }
      }
    }

    // Secondary / Fallback: EmailJS integration
    if (isEmailJSConfigured) {
      try {
        const templateParams = {
          from_name: cleanName,
          reply_to: cleanEmail,
          subject: cleanSubject,
          message: cleanMessage,
          to_email: OFFICIAL_EMAIL,
          sent_at: new Date().toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US', {
            dateStyle: 'full',
            timeStyle: 'medium',
          }),
        };

        const response = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          {
            publicKey: publicKey,
          }
        );

        if (response.status === 200) {
          setStatus('success');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            honeypot: '',
          });
          setErrors({});

          try {
            localStorage.setItem(STORAGE_KEY_LAST_SENT, Date.now().toString());
            setRemainingCooldown(COOLDOWN_SECONDS);
          } catch {
            // ignore storage error
          }
        } else {
          setStatus('error');
          setErrorMessage(response.text || t.errorMessage);
        }
      } catch (err: unknown) {
        setStatus('error');
        const errObj = err as { text?: string; message?: string };
        setErrorMessage(errObj?.text || errObj?.message || t.errorMessage);
      }
    }
  };

  const handleDirectMail = () => {
    const encodedSubject = encodeURIComponent(
      `[Sana Studio Contact] ${formData.subject.trim() || 'New Inquiry'}`
    );
    const senderInfo =
      formData.name.trim() || formData.email.trim()
        ? `فرستنده / Sender: ${formData.name.trim()} (${formData.email.trim()})\n\n`
        : '';
    const encodedBody = encodeURIComponent(
      `${senderInfo}${formData.message.trim()}`
    );

    window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OFFICIAL_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResetForm = () => {
    setStatus('idle');
    setErrors({});
    setCurrentIdempotencyKey('');
  };

  return (
    <section id="contact" className="py-10 md:py-12 relative">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCE5FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#D5DFF2] border border-[#3563F5]/20 dark:border-[#52678D] mb-2.5">
            <Mail className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-[#101B3D] dark:text-[#F8FAFF] tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#3D4C6F] dark:text-[#D5DFF2] mt-2 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start text-start">
          {/* Form Column (7 cols desktop) */}
          <div className="lg:col-span-7">
            {/* If neither backend nor EmailJS is configured, show helpful setup note */}
            {!isAnyServiceConfigured && (
              <div className="mb-4 p-3.5 sm:p-4 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-[#101B3D] dark:text-[#F8FAFF]">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-amber-800 dark:text-amber-300">
                      {t.unconfiguredNotice}
                    </p>
                    <p className="text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed">
                      {t.unconfiguredSetupHint}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Success State Banner */}
            {status === 'success' ? (
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#2A3B60] border border-emerald-500/30 dark:border-emerald-500/40 shadow-md text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#101B3D] dark:text-[#F8FAFF]">
                    {t.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3D4C6F] dark:text-[#D5DFF2] mt-1.5 leading-relaxed max-w-md mx-auto">
                    {t.successMessage}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3563F5] hover:bg-[#2650DE] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all focus:outline-none"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.sendAnotherBtn}</span>
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-5 sm:p-6 md:p-7 rounded-2xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/15 dark:border-[#52678D] shadow-md space-y-4 sm:space-y-4.5"
              >
                {/* Honeypot field for anti-bot protection (hidden from humans) */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    zIndex: -1,
                    height: 0,
                    width: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                  }}
                >
                  <label htmlFor="contact-hp">Leave this field blank</label>
                  <input
                    id="contact-hp"
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) =>
                      setFormData({ ...formData, honeypot: e.target.value })
                    }
                  />
                </div>

                {/* Error Banner (Form preserved) */}
                {status === 'error' && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-[#101B3D] dark:text-[#F8FAFF] text-xs">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold text-red-600 dark:text-red-400">
                          {t.errorTitle}
                        </p>
                        <p className="text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed">
                          {errorMessage || t.errorMessage}
                        </p>
                        <div className="pt-1.5 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={handleDirectMail}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-700 dark:text-red-300 font-medium transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{t.fallbackMailBtn}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cooldown Warning Notice */}
                {remainingCooldown > 0 && (
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#101B3D] dark:text-[#F8FAFF] text-xs flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#3563F5] flex-shrink-0" />
                    <span>
                      {t.rateLimitWarning} ({remainingCooldown}{' '}
                      {lang === 'fa' ? 'ثانیه باقی مانده' : 'seconds remaining'})
                    </span>
                  </div>
                )}

                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs sm:text-[13px] font-bold text-[#101B3D] dark:text-[#F8FAFF] mb-2"
                    >
                      {t.nameLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      maxLength={80}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder={t.namePlaceholder}
                      className={`w-full h-11 sm:h-12 px-3.5 rounded-xl bg-[#F5F7FF] dark:bg-[#182541] border text-xs sm:text-sm text-[#101B3D] dark:text-[#F8FAFF] placeholder-[#5D6D93]/60 dark:placeholder-[#B7C7E4]/50 focus:bg-white dark:focus:bg-[#202F50] focus:outline-none transition-all ${
                        errors.name
                          ? 'border-red-500 ring-2 ring-red-500/20'
                          : 'border-[#3563F5]/15 dark:border-[#52678D] focus:border-[#3563F5] focus:ring-2 focus:ring-[#3563F5]/25'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs sm:text-[13px] font-bold text-[#101B3D] dark:text-[#F8FAFF] mb-2"
                    >
                      {t.emailLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      maxLength={120}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email)
                          setErrors({ ...errors, email: undefined });
                      }}
                      placeholder={t.emailPlaceholder}
                      className={`w-full h-11 sm:h-12 px-3.5 rounded-xl bg-[#F5F7FF] dark:bg-[#182541] border text-xs sm:text-sm text-[#101B3D] dark:text-[#F8FAFF] placeholder-[#5D6D93]/60 dark:placeholder-[#B7C7E4]/50 focus:bg-white dark:focus:bg-[#202F50] focus:outline-none transition-all ${
                        errors.email
                          ? 'border-red-500 ring-2 ring-red-500/20'
                          : 'border-[#3563F5]/15 dark:border-[#52678D] focus:border-[#3563F5] focus:ring-2 focus:ring-[#3563F5]/25'
                      }`}
                      dir="ltr"
                    />
                    {errors.email && (
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Subject Field */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs sm:text-[13px] font-bold text-[#101B3D] dark:text-[#F8FAFF] mb-2"
                  >
                    {t.subjectLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    maxLength={150}
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject)
                        setErrors({ ...errors, subject: undefined });
                    }}
                    placeholder={t.subjectPlaceholder}
                    className={`w-full h-11 sm:h-12 px-3.5 rounded-xl bg-[#F5F7FF] dark:bg-[#182541] border text-xs sm:text-sm text-[#101B3D] dark:text-[#F8FAFF] placeholder-[#5D6D93]/60 dark:placeholder-[#B7C7E4]/50 focus:bg-white dark:focus:bg-[#202F50] focus:outline-none transition-all ${
                      errors.subject
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-[#3563F5]/15 dark:border-[#52678D] focus:border-[#3563F5] focus:ring-2 focus:ring-[#3563F5]/25'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Row 3: Message Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs sm:text-[13px] font-bold text-[#101B3D] dark:text-[#F8FAFF]"
                    >
                      {t.messageLabel} <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#5D6D93] dark:text-[#B7C7E4] font-mono">
                      {formData.message.length}/3000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={4}
                    maxLength={3000}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message)
                        setErrors({ ...errors, message: undefined });
                    }}
                    placeholder={t.messagePlaceholder}
                    className={`w-full min-h-[130px] sm:min-h-[140px] p-3.5 rounded-xl bg-[#F5F7FF] dark:bg-[#182541] border text-xs sm:text-sm text-[#101B3D] dark:text-[#F8FAFF] placeholder-[#5D6D93]/60 dark:placeholder-[#B7C7E4]/50 focus:bg-white dark:focus:bg-[#202F50] focus:outline-none transition-all resize-y ${
                      errors.message
                        ? 'border-red-500 ring-2 ring-red-500/20'
                        : 'border-[#3563F5]/15 dark:border-[#52678D] focus:border-[#3563F5] focus:ring-2 focus:ring-[#3563F5]/25'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-red-500">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit and Action Buttons */}
                <div className="pt-1 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || remainingCooldown > 0}
                    className="flex-1 h-11 sm:h-12 flex items-center justify-center gap-2 rounded-xl bg-[#3563F5] hover:bg-[#2650DE] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.submittingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>
                          {remainingCooldown > 0
                            ? `${t.rateLimitWarning.slice(0, 20)}... (${remainingCooldown}s)`
                            : isAnyServiceConfigured
                            ? t.submitBtn
                            : t.fallbackMailBtn}
                        </span>
                      </>
                    )}
                  </button>

                  {/* If configured, offer secondary direct mail option if preferred */}
                  {isAnyServiceConfigured && (
                    <button
                      type="button"
                      onClick={handleDirectMail}
                      title={t.fallbackMailBtn}
                      className="px-4 h-11 sm:h-12 flex items-center justify-center gap-1.5 rounded-xl border border-[#3563F5]/20 dark:border-[#52678D] hover:bg-[#F5F7FF] dark:hover:bg-[#182541] text-[#3563F5] dark:text-[#A9B8D4] text-xs font-semibold transition-colors focus:outline-none"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{t.fallbackMailBtn}</span>
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Contact Details Column (5 cols desktop) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/15 dark:border-[#52678D] shadow-sm">
              <span className="text-xs font-bold text-[#5D6D93] dark:text-[#B7C7E4] block mb-2">
                {t.directEmailLabel}
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F7FF] dark:bg-[#182541] border border-[#3563F5]/15 dark:border-[#52678D]">
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="font-mono text-xs sm:text-sm font-bold text-[#3563F5] dark:text-[#A9B8D4] hover:underline"
                  title="ارسال مستقیم ایمیل"
                >
                  {OFFICIAL_EMAIL}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg hover:bg-[#DCE5FF] dark:hover:bg-[#35496F] text-[#101B3D] dark:text-[#F8FAFF] transition-colors focus:outline-none"
                  title="کپی نشانی ایمیل"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-[#5D6D93] dark:text-[#B7C7E4] mt-2.5">
                {t.statusNote}
              </p>
            </div>

            {/* Privacy Transparency Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/15 dark:border-[#52678D] shadow-sm">
              <h3 className="text-xs sm:text-sm font-bold text-[#101B3D] dark:text-[#F8FAFF] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3563F5]" />
                <span>
                  {lang === 'fa' ? 'حفظ حریم خصوصی و امنیت' : 'Security & Privacy'}
                </span>
              </h3>
              <p className="text-xs text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed mb-3">
                {t.clientActionNotice}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#3563F5] dark:text-[#A9B8D4] font-semibold">
                <Info className="w-3.5 h-3.5" />
                <span>
                  {lang === 'fa'
                    ? 'ارسال امن بدون واسطه‌های ناامن'
                    : 'Encrypted direct dispatch to official inbox'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
