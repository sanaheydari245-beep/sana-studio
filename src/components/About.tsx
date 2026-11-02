import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { Info, Sparkles, Sliders, Shield } from 'lucide-react';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = translations[lang].about;
  const pillarIcons = [Sparkles, Sliders, Shield];

  return (
    <section id="about" className="py-10 md:py-12 relative">
      <div className="site-container">
        {/* Section Header */}
        <div className="max-w-xl mb-5 sm:mb-6 text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCE5FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#D5DFF2] border border-[#3563F5]/20 dark:border-[#52678D] mb-2.5">
            <Info className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-[28px] md:text-[30px] font-bold text-[#101B3D] dark:text-[#F8FAFF] tracking-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base font-medium text-[#3563F5] dark:text-[#A9B8D4] mt-2">
            {t.lead}
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start mb-6">
          <div className="lg:col-span-7 space-y-3.5 text-start">
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/12 dark:border-[#52678D] shadow-sm">
              <p className="mb-3 text-sm sm:text-[15px] text-[#101B3D] dark:text-[#F8FAFF] font-medium leading-relaxed">
                {t.p1}
              </p>
              <p className="mb-3 text-xs sm:text-sm text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed">
                {t.p2}
              </p>
              <p className="text-xs sm:text-sm text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed">
                {t.p3}
              </p>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5 text-start">
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/15 dark:border-[#52678D] shadow-sm">
              <h3 className="text-sm sm:text-base font-bold text-[#101B3D] dark:text-[#F8FAFF] mb-2.5">
                {lang === 'fa' ? 'چرخه طراحی در استودیو سنا' : 'Design Philosophy at Sana'}
              </h3>
              <p className="text-xs sm:text-sm text-[#3D4C6F] dark:text-[#D5DFF2] mb-4 leading-relaxed">
                {lang === 'fa'
                  ? 'هر ابزار از یک ضرورت واقعی برای یادگیری یا انضباط فردی آغاز می‌شود؛ با تمرکز مستقیم بر بهینه‌سازی تجربه کاربری و حفظ حریم خصوصی کاربر.'
                  : 'Every tool stems from an authentic necessity for focus. Our priority rests on zero-friction UX and local-first data ownership.'}
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F7FF] dark:bg-[#35496F] border border-[#3563F5]/10 dark:border-[#52678D]/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3563F5] dark:bg-[#93C5FD]" />
                  <span className="text-xs font-semibold text-[#101B3D] dark:text-[#F8FAFF]">
                    {lang === 'fa' ? 'تعریف مسئله بدون ادعاهای کاذب' : 'Problem Definition without False Claims'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F7FF] dark:bg-[#35496F] border border-[#3563F5]/10 dark:border-[#52678D]/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3563F5] dark:bg-[#93C5FD]" />
                  <span className="text-xs font-semibold text-[#101B3D] dark:text-[#F8FAFF]">
                    {lang === 'fa' ? 'معماری داده‌های آفلاین و محلی (SQLite)' : 'Local-First Offline Architecture (SQLite)'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F5F7FF] dark:bg-[#35496F] border border-[#3563F5]/10 dark:border-[#52678D]/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3563F5] dark:bg-[#93C5FD]" />
                  <span className="text-xs font-semibold text-[#101B3D] dark:text-[#F8FAFF]">
                    {lang === 'fa' ? 'تست مداوم روی دستگاه واقعی قبل از انتشار' : 'Continuous Device Testing Before Release'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="text-start">
          <h3 className="text-sm sm:text-base font-bold text-[#101B3D] dark:text-[#F8FAFF] mb-3">
            {t.pillarsTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {t.pillars.map((pillar, idx) => {
              const Icon = pillarIcons[idx % pillarIcons.length];
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/10 dark:border-[#52678D]/50 shadow-sm transition-all hover:border-[#3563F5]/40 dark:hover:border-[#3563F5] group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#DCE5FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#A9B8D4] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#101B3D] dark:text-[#F8FAFF] mb-1.5">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
