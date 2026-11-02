import React, { useState } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { HelpCircle, ChevronDown, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';

interface FAQProps {
  lang: Language;
}

export const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = translations[lang].faq;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const navOffset = 70;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const ArrowIcon = lang === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <section id="faq" className="py-10 md:py-12 relative">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Header & Quick Assistance Column */}
          <div className="lg:col-span-5 text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCE5FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#D5DFF2] border border-[#3563F5]/20 dark:border-[#52678D] mb-2.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-[#101B3D] dark:text-[#F8FAFF] tracking-tight">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#3D4C6F] dark:text-[#D5DFF2] mt-2 mb-5 leading-relaxed">
              {t.subtitle}
            </p>

            {/* Quick Contact Prompt Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/15 dark:border-[#52678D] shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#3563F5] dark:text-[#A9B8D4]">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-bold text-[#101B3D] dark:text-[#F8FAFF]">
                  {lang === 'fa' ? 'سؤال دیگری در ذهن دارید؟' : 'Have a different question?'}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#5D6D93] dark:text-[#D5DFF2] leading-relaxed mb-3.5">
                {lang === 'fa'
                  ? 'اگر پاسخ پرسش خود را اینجا پیدا نکردید، از طریق فرم تماس یا ایمیل مستقیم با ما در میان بگذارید.'
                  : "If your question isn't answered here, feel free to reach out via our contact form or direct email."}
              </p>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3563F5] dark:text-[#A9B8D4] hover:underline focus:outline-none"
              >
                <span>{lang === 'fa' ? 'ارسال پیام به استودیو' : 'Send message to studio'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Accordion List Column */}
          <div className="lg:col-span-7 space-y-2.5">
            {t.items.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/10 dark:border-[#52678D]/50 overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between p-3.5 sm:p-4 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[#101B3D] dark:text-[#F8FAFF] pe-3">
                      {item.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg bg-[#F5F7FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#D5DFF2] flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed border-t border-[#3563F5]/10 dark:border-[#52678D]/30 animate-fade-in text-start">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
