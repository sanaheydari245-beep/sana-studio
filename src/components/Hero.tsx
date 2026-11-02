import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Database,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Flame,
  BarChart3,
  Layers,
  Smartphone,
} from 'lucide-react';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang].hero;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 64;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const ArrowIcon = lang === 'fa' ? ArrowLeft : ArrowRight;

  return (
    <section
      id="hero"
      className="relative pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[650px] h-[320px] glow-electric-blue pointer-events-none rounded-full blur-3xl opacity-50 -z-10" />

      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.02] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#3563F5 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            {/* Top Brand Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCE5FF] dark:bg-[#35496F] text-[#3563F5] dark:text-[#D5DFF2] border border-[#3563F5]/20 dark:border-[#52678D] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#3563F5] dark:text-[#A9B8D4]" />
              <span>{t.badge}</span>
            </div>

            {/* Main Headline - Responsive and balanced */}
            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#101B3D] dark:text-[#F8FAFF] leading-tight md:leading-[1.22] tracking-tight mb-3">
              {lang === 'fa' ? (
                <>
                  ایده‌ها را به{' '}
                  <span className="text-[#3563F5] relative inline-block">
                    محصول
                    <svg
                      className="absolute left-0 -bottom-1 w-full h-1.5 text-[#3563F5]/30"
                      viewBox="0 0 100 12"
                      preserveAspectRatio="none"
                    >
                      <path d="M0,7 Q50,0 100,7" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  </span>{' '}
                  تبدیل می‌کنیم.
                </>
              ) : (
                <>
                  Transforming Ideas into{' '}
                  <span className="text-[#3563F5] relative inline-block">
                    Digital Products.
                    <svg
                      className="absolute left-0 -bottom-1 w-full h-1.5 text-[#3563F5]/30"
                      viewBox="0 0 100 12"
                      preserveAspectRatio="none"
                    >
                      <path d="M0,7 Q50,0 100,7" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle with standard typography scale */}
            <p className="text-sm sm:text-base md:text-[16px] text-[#3D4C6F] dark:text-[#D5DFF2] leading-relaxed max-w-xl mb-6">
              {t.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto mb-6">
              <button
                onClick={() => scrollTo('products')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#3563F5] hover:bg-[#2650DE] text-white text-sm font-semibold shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5] active:scale-[0.98]"
              >
                <span>{t.ctaProducts}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('about')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-[#2A3B60] hover:bg-[#DCE5FF] dark:hover:bg-[#35496F] text-[#101B3D] dark:text-[#F8FAFF] border border-[#3563F5]/15 dark:border-[#52678D] text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5]"
              >
                <span>{t.ctaAbout}</span>
              </button>
            </div>

            {/* Three Foundational Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full pt-3 border-t border-[#3563F5]/10 dark:border-[#52678D]/30">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/10 dark:border-[#52678D]/40">
                <div className="p-1.5 rounded-lg bg-[#3563F5]/10 dark:bg-[#35496F] text-[#3563F5] dark:text-[#A9B8D4]">
                  <Database className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11.5px] font-bold text-[#101B3D] dark:text-[#F8FAFF]">
                    {t.statLocalFirst}
                  </span>
                  <span className="text-[10px] text-[#5D6D93] dark:text-[#B7C7E4]">
                    {t.statLocalFirstSub}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/10 dark:border-[#52678D]/40">
                <div className="p-1.5 rounded-lg bg-[#3563F5]/10 dark:bg-[#35496F] text-[#3563F5] dark:text-[#A9B8D4]">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11.5px] font-bold text-[#101B3D] dark:text-[#F8FAFF]">
                    {t.statScalable}
                  </span>
                  <span className="text-[10px] text-[#5D6D93] dark:text-[#B7C7E4]">
                    {t.statScalableSub}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-[#2A3B60] border border-[#3563F5]/10 dark:border-[#52678D]/40">
                <div className="p-1.5 rounded-lg bg-[#3563F5]/10 dark:bg-[#35496F] text-[#3563F5] dark:text-[#A9B8D4]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11.5px] font-bold text-[#101B3D] dark:text-[#F8FAFF]">
                    {t.statPrivacy}
                  </span>
                  <span className="text-[10px] text-[#5D6D93] dark:text-[#B7C7E4]">
                    {t.statPrivacySub}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Right Column Preview */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl p-4 bg-white dark:bg-[#2A3B60] border border-[#3563F5]/15 dark:border-[#52678D] shadow-md">
              {/* Card Header - Android App Indicator */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[#3563F5]/10 dark:border-[#52678D]/40 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3563F5] dark:text-[#A9B8D4]">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{lang === 'fa' ? 'اپلیکیشن اختصاصی اندروید' : 'Android Application'}</span>
                </div>
                <span className="text-[10.5px] font-mono text-[#5D6D93] dark:text-[#B7C7E4] font-semibold">
                  Android • Local-First
                </span>
              </div>

              {/* Verified Product Mini Card */}
              <div className="p-3 rounded-xl bg-[#F5F7FF] dark:bg-[#202F50] border border-[#3563F5]/10 dark:border-[#52678D]/40 mb-3">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <img
                    src="/assets/emerald-life-icon.png"
                    alt="Emerald Life"
                    className="w-9 h-9 rounded-xl shadow-sm border border-[#3563F5]/20 object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#101B3D] dark:text-[#F8FAFF]">
                        Emerald Life
                      </span>
                      <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/25">
                        {lang === 'fa' ? 'در حال توسعه' : 'In Dev'}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-[#5D6D93] dark:text-[#B7C7E4]">
                      {lang === 'fa' ? 'اپلیکیشن اندرویدی مدیریت درس و مطالعه' : 'Android Study & Life Management'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] text-[#3D4C6F] dark:text-[#D5DFF2]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3563F5] dark:text-[#3563F5]" />
                    <span>{lang === 'fa' ? 'پایگاه‌داده محلی آفلاین (Local SQLite)' : '100% Offline SQLite Engine'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3563F5] dark:text-[#3563F5]" />
                    <span>{lang === 'fa' ? 'تایمر پومودورو و اصوات تمرکز' : 'Pomodoro focus timer & audio'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3563F5] dark:text-[#3563F5]" />
                    <span>{lang === 'fa' ? 'ردیابی زنجیره استمرار عادات (Streak)' : 'Habit streak consistency'}</span>
                  </div>
                </div>
              </div>

              {/* Subsystems List */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#35496F] border border-[#3563F5]/10 dark:border-[#52678D]/30">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded bg-[#3563F5]/10 dark:bg-[#2A3B60] text-[#3563F5] dark:text-[#D5DFF2]">
                      <Calendar className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#101B3D] dark:text-[#F8FAFF]">
                      {lang === 'fa' ? 'برنامه هفتگی و تقویم درسی' : 'Timetable & Academic Calendar'}
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono text-[#5D6D93] dark:text-[#B7C7E4]">
                    table_calendar
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#35496F] border border-[#3563F5]/10 dark:border-[#52678D]/30">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded bg-[#3563F5]/10 dark:bg-[#2A3B60] text-[#3563F5] dark:text-[#D5DFF2]">
                      <Flame className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#101B3D] dark:text-[#F8FAFF]">
                      {lang === 'fa' ? 'مدیریت وظایف بر پایه اولویت' : 'Priority Task Management'}
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono text-[#5D6D93] dark:text-[#B7C7E4]">
                    Riverpod 2.6
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#35496F] border border-[#3563F5]/10 dark:border-[#52678D]/30">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded bg-[#3563F5]/10 dark:bg-[#2A3B60] text-[#3563F5] dark:text-[#D5DFF2]">
                      <BarChart3 className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#101B3D] dark:text-[#F8FAFF]">
                      {lang === 'fa' ? 'داشبورد تحلیل ساعات مطالعه' : 'Study Trends & Analytics'}
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono text-[#5D6D93] dark:text-[#B7C7E4]">
                    sqflite
                  </span>
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-2.5 pt-2 border-t border-[#3563F5]/10 dark:border-[#52678D]/30 flex items-center justify-between text-[10px] text-[#5D6D93] dark:text-[#B7C7E4]">
                <span>{lang === 'fa' ? 'سیستم‌عامل مقصد:' : 'Target Platform:'}</span>
                <span className="font-mono text-[#3563F5] dark:text-[#A9B8D4] font-semibold">Android (Flutter • Dart • SQLite)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
