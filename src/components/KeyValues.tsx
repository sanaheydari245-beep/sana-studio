import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { Sparkles, Compass, Shield, Flame, Target, TrendingUp } from 'lucide-react';

interface KeyValuesProps {
  lang: Language;
}

export const KeyValues: React.FC<KeyValuesProps> = ({ lang }) => {
  const t = translations[lang].values;

  const icons = [
    <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    <Flame className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  ];

  return (
    <section id="values" className="py-14 sm:py-16 md:py-20 relative">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-[22px] sm:text-[25px] md:text-[27px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-[15px] md:text-[16px] text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 
          Consistent, balanced & symmetrical 5-card layout:
          All 5 cards share identical dimensions, padding, border styles, typography hierarchy, and icon wrappers.
          - Desktop (lg): Top row has 3 uniform cards, bottom row has 2 matching cards centered symmetrically.
          - Tablet (sm): Balanced 2-column grid.
          - Mobile: Single column with uniform spacing.
        */}
        <div className="flex flex-wrap justify-center gap-6 text-start">
          {t.items.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#16241E] border border-emerald-500/15 dark:border-emerald-500/20 shadow-xs hover:border-emerald-500/35 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/20 flex items-center justify-center">
                    {icons[index]}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
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
