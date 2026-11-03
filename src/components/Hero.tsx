import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import {
  Download,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Smartphone,
  Flame,
} from 'lucide-react';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang].hero;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="hero" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
      {/* Background Emerald Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 glow-emerald pointer-events-none -z-10" />

      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 text-start space-y-5 sm:space-y-6">
            {/* Emerald Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.25]">
              {t.title}{' '}
              <span className="text-emerald-600 dark:text-emerald-400 block sm:inline">
                {t.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection('download')}
                className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>{t.downloadBtn}</span>
              </button>

              <button
                onClick={() => scrollToSection('features')}
                className="h-12 px-6 rounded-xl border border-emerald-500/25 dark:border-emerald-500/30 text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-semibold text-sm transition-all flex items-center justify-center gap-2 focus:outline-none"
              >
                <span>{t.exploreBtn}</span>
                <ArrowRight className={`w-4 h-4 text-emerald-600 dark:text-emerald-400 ${lang === 'fa' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>{t.platformNotice}</span>
            </div>

            {/* Stat Highlights (3 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200 dark:border-emerald-500/20">
              <div className="p-3 rounded-xl bg-white dark:bg-[#16241E] border border-emerald-500/15">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {t.stats.tasksLabel}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  {t.stats.tasksSub}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#16241E] border border-emerald-500/15">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  {t.stats.habitsLabel}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  {t.stats.habitsSub}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#16241E] border border-emerald-500/15">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  {t.stats.studyLabel}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  {t.stats.studySub}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Android Phone Mockup (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-emerald-500/20 rounded-[44px] blur-2xl transform scale-95" />

              {/* Physical Android Frame */}
              <div className="relative rounded-[40px] p-3 bg-gradient-to-b from-slate-800 to-slate-950 border-4 border-slate-700/80 shadow-2xl shadow-emerald-950/40">
                {/* Camera Hole Punch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border border-slate-800 z-30" />

                {/* Inner Screen */}
                <div className="rounded-[30px] overflow-hidden bg-slate-950 text-slate-100 border border-emerald-500/30 p-4 space-y-3.5 text-start font-sans">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                    <span>{lang === 'fa' ? '۰۹:۴۱' : '09:41'}</span>
                    <div className="flex items-center gap-1.5">
                      <Smartphone className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px]">100%</span>
                    </div>
                  </div>

                  {/* App Header Inside Mockup */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] font-semibold text-emerald-400 block">
                        {lang === 'fa' ? 'روز بخیر' : 'Good Morning'}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {lang === 'fa' ? 'امروز، برنامه‌ها مرتب است' : "Today's Schedule"}
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                      <img src="/assets/emerald-life-icon.png" alt="App Icon" className="w-6 h-6 rounded-md object-cover" />
                    </div>
                  </div>

                  {/* Widget 1: Focus Study Clock */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {lang === 'fa' ? 'تایمر مطالعه جاری' : 'Active Study Timer'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {lang === 'fa' ? 'در حال تمرکز' : 'Focus Mode'}
                      </span>
                    </div>
                    <div className="text-center py-1">
                      <span className="font-mono text-2xl font-black text-white tracking-widest">
                        {lang === 'fa' ? '۲۵:۰۰' : '25:00'}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {lang === 'fa' ? 'مبحث: ریاضی مهندسی • فصل ۳' : 'Topic: Chapter 3 • Calculus'}
                      </span>
                    </div>
                  </div>

                  {/* Widget 2: Habit Streaks */}
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-200 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-500" />
                        {lang === 'fa' ? 'عادت روزانه: مرور لغات' : 'Daily Habit: Vocab'}
                      </span>
                      <span className="text-[10px] font-bold text-amber-400">
                        {lang === 'fa' ? '۱۴ روز متوالی' : '14 Day Streak'}
                      </span>
                    </div>
                    {/* Dots indicator */}
                    <div className="flex items-center justify-between gap-1 pt-1">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div
                          key={day}
                          className={`flex-1 h-2 rounded-full ${
                            day <= 6 ? 'bg-emerald-500' : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Widget 3: Task Checkoff */}
                  <div className="space-y-1.5 pt-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {lang === 'fa' ? 'وظایف اولویت بالا' : 'High Priority Tasks'}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-md bg-emerald-500/30 border border-emerald-500 flex items-center justify-center">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                        </div>
                        <span className="text-[11px] text-slate-200">
                          {lang === 'fa' ? 'ارائه پروژه پایانی' : 'Final Project Submission'}
                        </span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                        {lang === 'fa' ? 'فوری' : 'Urgent'}
                      </span>
                    </div>
                  </div>

                  {/* Mini Bottom Nav */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-slate-500 text-[9px]">
                    <span className="text-emerald-400 font-bold">{lang === 'fa' ? 'خانه' : 'Home'}</span>
                    <span>{lang === 'fa' ? 'تسک‌ها' : 'Tasks'}</span>
                    <span>{lang === 'fa' ? 'مطالعه' : 'Study'}</span>
                    <span>{lang === 'fa' ? 'آمار' : 'Stats'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
