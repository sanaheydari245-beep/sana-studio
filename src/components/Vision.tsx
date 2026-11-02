import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { Compass, Sparkles } from 'lucide-react';

interface VisionProps {
  lang: Language;
}

export const Vision: React.FC<VisionProps> = ({ lang }) => {
  const t = translations[lang].vision;

  return (
    <section id="vision" className="py-10 md:py-12 relative">
      <div className="site-container">
        <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/15 dark:border-[#52678D] shadow-sm relative overflow-hidden">
          {/* Header */}
          <div className="max-w-xl mb-5 relative z-10 text-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCE5FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#D5DFF2] border border-[#3563F5]/20 dark:border-[#52678D] mb-2.5">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-[#101B3D] dark:text-[#F8FAFF] tracking-tight">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base font-medium text-[#3563F5] dark:text-[#A9B8D4] mt-2 mb-2">
              {t.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 relative z-10 text-start">
            {t.points.map((point, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#F5F7FF] dark:bg-[#35496F] border border-[#3563F5]/10 dark:border-[#52678D]/40"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#3563F5] text-white flex items-center justify-center font-bold text-[11px]">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#3563F5] dark:text-[#A9B8D4]">
                    {lang === 'fa' ? 'فاز توسعه' : 'Phase'}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#101B3D] dark:text-[#F8FAFF] mb-1.5">
                  {point.title}
                </h3>
                <p className="text-xs text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-5 pt-3.5 border-t border-[#3563F5]/10 dark:border-[#52678D]/30 flex items-center gap-2 text-xs text-[#5D6D93] dark:text-[#B7C7E4] relative z-10 text-start">
            <Sparkles className="w-3.5 h-3.5 text-[#3563F5] flex-shrink-0" />
            <span className="text-xs">
              {lang === 'fa'
                ? 'تعهد ما: تمرکز مستمر بر کیفیت سورس کد، بهینه‌سازی مداوم و دوری از ساخت ویژگی‌های غیرضروری.'
                : 'Our pledge: sustained focus on code excellence, continuous optimizations, and zero bloat.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
