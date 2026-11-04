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
    <section id="faq" className="py-14 sm:py-16 md:py-20 relative">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Header & Quick Assistance Column */}
          <div className="lg:col-span-5 text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-[24px] sm:text-[27px] md:text-[30px] font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t.title}
            </h2>

            <p className="text-sm sm:text-[15px] md:text-[16px] text-slate-600 dark:text-slate-300 mt-2.5 mb-6 leading-relaxed">
              {t.subtitle}
            </p>

            {/* Quick Contact Prompt Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#16241E] border border-emerald-500/15 dark:border-emerald-500/25 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm sm:text-[15px] font-bold text-slate-900 dark:text-white">
                  {lang === 'fa' ? 'سؤال دیگری در ذهن دارید؟' : 'Have a different question?'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {lang === 'fa'
                  ? 'اگر پاسخ پرسش خود را اینجا نیافتید، با کمال میل از طریق فرم تماس اختصاصی با ما در ارتباط باشید.'
                  : "If your question isn't answered here, feel free to reach out via our contact form."}
              </p>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 focus:outline-none group"
              >
                <span>{lang === 'fa' ? 'ارسال پیام به تیم توسعه' : 'Send message to team'}</span>
                <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Accordion List Column */}
          <div className="lg:col-span-7 space-y-3">
            {t.items.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white dark:bg-[#16241E] border border-emerald-500/15 dark:border-emerald-500/20 overflow-hidden transition-all duration-200 shadow-xs"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[14px] sm:text-[15px] font-bold text-slate-900 dark:text-white pe-3">
                      {item.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-emerald-500/10 dark:border-emerald-500/20 animate-fade-in text-start">
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
