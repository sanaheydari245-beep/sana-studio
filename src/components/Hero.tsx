import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Flame,
  LayoutGrid,
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
    <section id="hero" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-18 overflow-hidden">
      {/* Background Emerald Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 glow-emerald pointer-events-none -z-10" />

      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 text-start space-y-4 sm:space-y-5">
            {/* Emerald Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.badge}</span>
            </div>

            {/* Main Headline (28-34px on mobile, 36-44px on desktop) */}
            <h1 className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.2]">
              {t.title}{' '}
              <span className="text-emerald-600 dark:text-emerald-400 block sm:inline">
                {t.titleHighlight}
              </span>
            </h1>

            {/* Subtitle (15-17px) */}
            <p className="text-[15px] sm:text-[16px] md:text-[17px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>

            {/* Action Buttons (14-16px) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection('features')}
                className="h-11 sm:h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-[15px] shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-[0.98]"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>{t.exploreBtn}</span>
              </button>

              <button
                onClick={() => scrollToSection('screenshots')}
                className="h-11 sm:h-12 px-6 rounded-xl border border-emerald-500/25 dark:border-emerald-500/30 text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-semibold text-sm sm:text-[15px] transition-all flex items-center justify-center gap-2 focus:outline-none"
              >
                <span>{t.screenshotsBtn}</span>
                <ArrowRight className={`w-4 h-4 text-emerald-600 dark:text-emerald-400 ${lang === 'fa' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Platform & Trust Notice (13-14px) */}
            <div className="pt-2 flex items-center gap-2 text-xs sm:text-[13px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>{t.platformNotice}</span>
            </div>

            {/* Stat Highlights (3 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200 dark:border-emerald-500/20">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#16241E] border border-emerald-500/15">
                <span className="text-[13px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {t.stats.tasksLabel}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  {t.stats.tasksSub}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#16241E] border border-emerald-500/15">
                <span className="text-[13px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  {t.stats.habitsLabel}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  {t.stats.habitsSub}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#16241E] border border-emerald-500/15">
                <span className="text-[13px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  {t.stats.studyLabel}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  {t.stats.studySub}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Genuine Android App Phone Display (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[310px]">
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 bg-emerald-500/20 rounded-[44px] blur-2xl transform scale-95" />

              {/* Physical Phone Frame housing the genuine screenshot */}
              <div className="relative rounded-[38px] p-2.5 sm:p-3 bg-gradient-to-b from-slate-800 to-slate-950 border-4 border-slate-700/80 shadow-2xl shadow-emerald-950/40">
                {/* Genuine Home Screen Screenshot */}
                <div className="rounded-[28px] overflow-hidden bg-black aspect-[9/19] flex items-center justify-center">
                  <img
                    src="/images/home.jpg"
                    alt="Emerald Life Android Dashboard"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
