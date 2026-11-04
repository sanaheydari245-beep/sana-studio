import React, { useState } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { Smartphone, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface AppScreenshotsProps {
  lang: Language;
}

export const AppScreenshots: React.FC<AppScreenshotsProps> = ({ lang }) => {
  const t = translations[lang].screenshots;
  const [selectedId, setSelectedId] = useState<string>('home');

  const activeIndex = t.items.findIndex((item) => item.id === selectedId);
  const activeItem = t.items[activeIndex >= 0 ? activeIndex : 0];

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + t.items.length) % t.items.length;
    setSelectedId(t.items[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % t.items.length;
    setSelectedId(t.items[nextIdx].id);
  };

  return (
    <section id="screenshots" className="py-14 sm:py-16 md:py-20 relative bg-slate-50/60 dark:bg-[#111D18]/70 border-y border-emerald-500/10">
      {/* Anchor for preview section link */}
      <div id="preview" className="-top-24 relative" />

      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-[22px] sm:text-[25px] md:text-[27px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-[15px] md:text-[16px] text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Tab Pills for Fast Switching */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {t.items.map((item) => {
            const isActive = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#16241E] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-emerald-500/20 hover:border-emerald-500/40'
                }`}
              >
                {item.tag}
              </button>
            );
          })}
        </div>

        {/* Featured Showcase Card (Main Screenshot + Descriptive Panel) */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-[#16241E] border border-emerald-500/20 shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 items-center">
            {/* Screenshot Frame (5 cols on md+) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[260px] sm:max-w-[280px] rounded-[36px] p-2.5 bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-slate-700/80 shadow-2xl shadow-emerald-950/30">
                {/* Genuine Screenshot Display */}
                <div className="rounded-[28px] overflow-hidden bg-black flex items-center justify-center aspect-[9/19]">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Description & Context (7 cols on md+) */}
            <div className="md:col-span-7 text-start space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{activeItem.tag}</span>
              </div>

              <h3 className="text-[18px] sm:text-[19px] md:text-[21px] font-bold text-slate-900 dark:text-slate-100">
                {activeItem.title}
              </h3>

              <p className="text-sm sm:text-[15px] md:text-[16px] text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeItem.desc}
              </p>

              {/* Navigation Arrows for Quick Carousel Browsing */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors focus:outline-none"
                  aria-label="Previous Screenshot"
                >
                  <ChevronRight className={`w-4 h-4 ${lang === 'fa' ? '' : 'rotate-180'}`} />
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {activeIndex + 1} / {t.items.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors focus:outline-none"
                  aria-label="Next Screenshot"
                >
                  <ChevronLeft className={`w-4 h-4 ${lang === 'fa' ? '' : 'rotate-180'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid of all 5 Screenshots */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 text-start">
          {t.items.map((item) => {
            const isCurrent = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-3 rounded-2xl bg-white dark:bg-[#16241E] border text-start transition-all duration-200 focus:outline-none flex flex-col justify-between ${
                  isCurrent
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                    : 'border-slate-200/90 dark:border-emerald-500/15 hover:border-emerald-500/35'
                }`}
              >
                <div className="rounded-xl overflow-hidden bg-black aspect-[9/19] mb-3 border border-slate-800/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                    {item.tag}
                  </span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {item.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
