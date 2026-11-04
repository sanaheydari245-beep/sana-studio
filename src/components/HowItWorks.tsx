import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { Settings2, CalendarClock, Flame, BookOpen, TrendingUp, Route } from 'lucide-react';

interface HowItWorksProps {
  lang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang }) => {
  const t = translations[lang].howItWorks;

  const stepIcons = [
    <Settings2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    <CalendarClock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    <Flame className="w-5 h-5 text-amber-500" />,
    <BookOpen className="w-5 h-5 text-teal-500" />,
    <TrendingUp className="w-5 h-5 text-emerald-400" />,
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-16 md:py-20 relative">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <Route className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-[22px] sm:text-[25px] md:text-[27px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-[15px] md:text-[16px] text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Step Progression (Horizontal Flow on Desktop, Vertical on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 text-start">
          {t.steps.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-white dark:bg-[#16241E] border border-emerald-500/15 dark:border-emerald-500/20 shadow-xs hover:border-emerald-500/35 transition-all duration-200 space-y-3 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-2xl font-black text-emerald-600/30 dark:text-emerald-400/30 group-hover:text-emerald-600 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-500/20 flex items-center justify-center">
                    {stepIcons[index] || stepIcons[0]}
                  </div>
                </div>

                <h3 className="text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-slate-100 leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-[13px] md:text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
