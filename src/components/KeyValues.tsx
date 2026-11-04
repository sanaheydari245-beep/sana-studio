import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { Sparkles, Compass, Shield, Flame, Target, TrendingUp } from 'lucide-react';

interface KeyValuesProps {
  lang: Language;
}

export const KeyValues: React.FC<KeyValuesProps> = ({ lang }) => {
  const t = translations[lang].values;

  // The 5 key value icons
  const leftIcons = [
    <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  ];

  const centerIcon = (
    <Flame className="w-7 h-7 text-emerald-500 animate-pulse" />
  );

  const rightIcons = [
    <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  ];

  const leftItems = [t.items[0], t.items[1]];
  const centerItem = t.items[2];
  const rightItems = [t.items[3], t.items[4]];

  return (
    <section id="values" className="py-14 sm:py-16 md:py-20 relative">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-[24px] sm:text-[27px] md:text-[30px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-[15px] md:text-[16px] text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 
          Balanced 5-Card Layout:
          - Desktop (lg+): 3 Columns
            * Column 1: 2 items with moderate spacing (space-y-6)
            * Column 2: 1 center anchor item, visually centered between left and right groups
            * Column 3: 2 items with moderate spacing (space-y-6)
          - Mobile / Tablet (<lg): Clean responsive flow
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch text-start">
          {/* Group 1: 2 Cards (Left in LTR / Right in RTL) */}
          <div className="flex flex-col gap-6 justify-between">
            {leftItems.map((item, idx) => (
              <div
                key={idx}
                className="flex-1 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#16241E] border border-emerald-500/15 dark:border-emerald-500/20 shadow-xs hover:border-emerald-500/35 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/20 flex items-center justify-center">
                      {leftIcons[idx]}
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Group 2: The Center Anchor Item (Positioned exactly in the center of the composition) */}
          <div className="flex flex-col justify-center md:col-span-2 lg:col-span-1">
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-white via-emerald-50/40 to-white dark:from-[#16241E] dark:via-[#1B2D25] dark:to-[#16241E] border-2 border-emerald-500/30 dark:border-emerald-500/40 shadow-lg shadow-emerald-950/5 dark:shadow-black/40 relative overflow-hidden flex flex-col justify-between h-full">
              {/* Subtle emerald highlight strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    {centerIcon}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    {centerItem.tag}
                  </span>
                </div>

                <h3 className="text-[18px] sm:text-[20px] font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {centerItem.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-slate-700 dark:text-slate-200 leading-relaxed">
                  {centerItem.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-emerald-500/15 dark:border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>{lang === 'fa' ? 'پیشرفت روزانه با تکرار مداوم' : 'Daily progress through sustained repetition'}</span>
              </div>
            </div>
          </div>

          {/* Group 3: 2 Cards (Right in LTR / Left in RTL) */}
          <div className="flex flex-col gap-6 justify-between md:col-span-2 lg:col-span-1">
            {rightItems.map((item, idx) => (
              <div
                key={idx}
                className="flex-1 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#16241E] border border-emerald-500/15 dark:border-emerald-500/20 shadow-xs hover:border-emerald-500/35 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/20 flex items-center justify-center">
                      {rightIcons[idx]}
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-[17px] sm:text-[18px] font-bold text-slate-900 dark:text-slate-100 mb-2">
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
      </div>
    </section>
  );
};
