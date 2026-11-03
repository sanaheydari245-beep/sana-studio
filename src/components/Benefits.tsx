import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import {
  Layers,
  ShieldCheck,
  Compass,
  LineChart,
  Sliders,
  WifiOff,
} from 'lucide-react';

interface BenefitsProps {
  lang: Language;
}

export const Benefits: React.FC<BenefitsProps> = ({ lang }) => {
  const t = translations[lang].benefits;

  const icons = [
    <Layers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    <Compass className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    <LineChart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    <Sliders className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    <WifiOff className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
  ];

  return (
    <section id="benefits" className="py-12 sm:py-16 md:py-20 relative">
      <div className="site-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 6 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 text-start">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#16241E] border border-slate-200/90 dark:border-emerald-500/15 shadow-xs hover:border-emerald-500/30 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-500/20 flex items-center justify-center">
                {icons[idx] || icons[0]}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
