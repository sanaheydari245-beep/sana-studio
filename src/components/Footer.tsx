import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { Logo } from './Logo';
import { ArrowUp, Mail } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onLanguageChange }) => {
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
    <footer className="mt-8 border-t border-[#3563F5]/12 dark:border-[#52678D]/40 bg-white dark:bg-[#141F36] transition-colors duration-200">
      <div className="site-container py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start mb-6 text-start">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="mb-3">
              <Logo size="md" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#3563F5] dark:text-[#A9B8D4] mb-2">
              {t.brandTagline}
            </p>
            <p className="text-xs text-[#5D6D93] dark:text-[#D5DFF2] leading-relaxed max-w-sm mb-5">
              {t.privacyNote}
            </p>

            {/* Language Switcher in Footer */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#5D6D93] dark:text-[#B7C7E4]">
                {t.languageLabel}
              </span>
              <button
                onClick={() => onLanguageChange('fa')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  lang === 'fa'
                    ? 'bg-[#3563F5] text-white border-[#3563F5]'
                    : 'border-[#3563F5]/15 dark:border-[#52678D] text-[#101B3D] dark:text-[#F8FAFF] hover:bg-[#DCE5FF] dark:hover:bg-[#2A3B60]'
                }`}
              >
                فارسی
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  lang === 'en'
                    ? 'bg-[#3563F5] text-white border-[#3563F5]'
                    : 'border-[#3563F5]/15 dark:border-[#52678D] text-[#101B3D] dark:text-[#F8FAFF] hover:bg-[#DCE5FF] dark:hover:bg-[#2A3B60]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101B3D] dark:text-[#F8FAFF] mb-3">
              {t.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="text-[#3D4C6F] dark:text-[#D5DFF2] hover:text-[#3563F5] dark:hover:text-[#F8FAFF] transition-colors"
                >
                  {nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('products')}
                  className="text-[#3D4C6F] dark:text-[#D5DFF2] hover:text-[#3563F5] dark:hover:text-[#F8FAFF] transition-colors"
                >
                  {nav.products}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('principles')}
                  className="text-[#3D4C6F] dark:text-[#D5DFF2] hover:text-[#3563F5] dark:hover:text-[#F8FAFF] transition-colors"
                >
                  {nav.principles}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('vision')}
                  className="text-[#3D4C6F] dark:text-[#D5DFF2] hover:text-[#3563F5] dark:hover:text-[#F8FAFF] transition-colors"
                >
                  {nav.roadmap}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faq')}
                  className="text-[#3D4C6F] dark:text-[#D5DFF2] hover:text-[#3563F5] dark:hover:text-[#F8FAFF] transition-colors"
                >
                  {nav.faq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="text-[#3D4C6F] dark:text-[#D5DFF2] hover:text-[#3563F5] dark:hover:text-[#F8FAFF] transition-colors"
                >
                  {nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101B3D] dark:text-[#F8FAFF] mb-3">
              {t.productsTitle}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F7FF] dark:bg-[#202F50] border border-[#3563F5]/10 dark:border-[#52678D]/40">
                <div className="flex flex-col">
                  <span className="font-bold text-[#101B3D] dark:text-[#F8FAFF]">
                    Emerald Life
                  </span>
                  <span className="text-[11px] text-[#5D6D93] dark:text-[#B7C7E4]">
                    {lang === 'fa' ? 'اپلیکیشن اندرویدی مدیریت درس و مطالعه' : 'Android Study & Life App'}
                  </span>
                </div>
                <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/25">
                  {lang === 'fa' ? 'در حال توسعه اندروید' : 'In Dev for Android'}
                </span>
              </div>
            </div>

            {/* Official Clickable Email Link */}
            <div className="mt-4 pt-3 border-t border-[#3563F5]/10 dark:border-[#52678D]/30">
              <span className="text-[11px] text-[#5D6D93] dark:text-[#B7C7E4] block mb-1">
                {lang === 'fa' ? 'ارتباط مستقیم با توسعه‌دهنده:' : 'Direct Developer Contact:'}
              </span>
              <a
                href="mailto:sanaheydari245@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs text-[#3563F5] dark:text-[#A9B8D4] hover:underline font-mono font-bold transition-colors"
                title="Send Email"
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span>sanaheydari245@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 border-t border-[#3563F5]/10 dark:border-[#52678D]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5D6D93] dark:text-[#B7C7E4]">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 text-center sm:text-start">
            <span>© {new Date().getFullYear()} {t.copyright}</span>
            <span className="hidden sm:inline">•</span>
            <span>{t.allRightsReserved}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#DCE5FF] dark:bg-[#2A3B60] hover:bg-[#3563F5] hover:text-white dark:hover:bg-[#3563F5] text-[#101B3D] dark:text-[#F8FAFF] border border-[#3563F5]/10 dark:border-[#52678D] transition-all"
          >
            <span>{lang === 'fa' ? 'بازگشت به بالا' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
