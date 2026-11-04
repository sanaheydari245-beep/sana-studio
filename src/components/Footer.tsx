import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { Logo } from './Logo';
import { ArrowUp, ShieldCheck } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onLanguageChange,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 70;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 border-t border-emerald-500/15 dark:border-emerald-500/20 bg-white dark:bg-[#0B1310] transition-colors duration-200">
      <div className="site-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start mb-12 text-start">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="mb-4">
              <Logo size="md" />
            </div>
            <p className="text-sm sm:text-[15px] font-medium text-emerald-700 dark:text-emerald-400 mb-3">
              {t.tagline}
            </p>
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mb-6">
              {t.reserved}
            </p>

            {/* Language Switcher in Footer */}
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400">
                {lang === 'fa' ? 'زبان وب‌سایت:' : 'Language:'}
              </span>
              <button
                onClick={() => onLanguageChange('fa')}
                className={`px-3 py-1.5 text-xs sm:text-[13px] font-semibold rounded-xl border transition-all ${
                  lang === 'fa'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                فارسی
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 text-xs sm:text-[13px] font-semibold rounded-xl border transition-all ${
                  lang === 'en'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Quick Nav Links (14-15px) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              {t.navTitle}
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-[15px]">
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {nav.features}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('screenshots')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {nav.screenshots}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {nav.howItWorks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('values')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {nav.values}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faq')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {nav.faq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Information Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              {t.legalTitle}
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-[15px]">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{t.privacy}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span>{t.terms}</span>
                </button>
              </li>
            </ul>
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 pt-2 leading-relaxed">
              {lang === 'fa'
                ? 'اپلیکیشن اختصاصی اندروید با ساختار کاملاً امن و محلی.'
                : 'Dedicated Android application with a secure local-first architecture.'}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-slate-500 dark:text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-start">
            <p>{t.copyright}</p>
            <span className="hidden sm:inline opacity-40">•</span>
            <p className="font-medium text-emerald-600 dark:text-emerald-400">{t.designedBy}</p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 p-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Back to top"
          >
            <span>{lang === 'fa' ? 'بازگشت به بالا' : 'Back to Top'}</span>
            <ArrowUp className="w-4 h-4 text-emerald-500" />
          </button>
        </div>
      </div>
    </footer>
  );
};
