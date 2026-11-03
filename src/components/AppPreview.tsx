import React, { useState } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import {
  Flame,
  BarChart3,
  Sparkles,
} from 'lucide-react';

interface AppPreviewProps {
  lang: Language;
}

export const AppPreview: React.FC<AppPreviewProps> = ({ lang }) => {
  const t = translations[lang].preview;
  const [activeTab, setActiveTab] = useState<string>('home');

  const currentTab = t.tabs.find((tab) => tab.id === activeTab) || t.tabs[0];

  return (
    <section id="preview" className="py-12 sm:py-16 md:py-20 relative bg-slate-50/60 dark:bg-[#111D18]/70 border-y border-emerald-500/10">
      <div className="site-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {t.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap transition-all focus:outline-none ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'bg-white dark:bg-[#16241E] text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-emerald-500/20 hover:border-emerald-500/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Display Container (Mockup Preview + Feature Breakdown) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-start">
          {/* Interactive Screen Preview Box (7 cols) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-[480px] p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#16241E] border border-emerald-500/20 shadow-xl shadow-emerald-950/5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="font-mono text-xs text-slate-400">
                  Android • {currentTab.label}
                </span>
              </div>

              {/* Dynamic Mockup Content Based on Active Tab */}
              {activeTab === 'home' && (
                <div className="space-y-3 font-sans">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white space-y-2">
                    <span className="text-[11px] text-emerald-300 font-semibold block">
                      {lang === 'fa' ? 'امروز، ۵ شنبه' : 'Thursday Focus'}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold">
                      {lang === 'fa' ? '۴ تسک فعال • ۲ ساعت مطالعه ثبت‌شده' : '4 Active Tasks • 2h Study Logged'}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 text-[10px] block">{lang === 'fa' ? 'تکمیل تسک‌ها' : 'Task Ratio'}</span>
                      <span className="font-bold text-emerald-600 text-sm">75%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 text-[10px] block">{lang === 'fa' ? 'زنجیره عادت‌ها' : 'Habit Streak'}</span>
                      <span className="font-bold text-amber-500 text-sm">{lang === 'fa' ? '۱۲ روز' : '12 Days'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tasks' && (
                <div className="space-y-2">
                  {[
                    { title: lang === 'fa' ? 'مطالعه فصل ۴ هوش مصنوعی' : 'Read Chapter 4 AI', priority: 'High', color: 'bg-red-500/20 text-red-500' },
                    { title: lang === 'fa' ? 'ارسال تمرین ریاضی مهندسی' : 'Submit Calculus Homework', priority: 'Med', color: 'bg-amber-500/20 text-amber-500' },
                    { title: lang === 'fa' ? 'مرور واژگان تافل' : 'Review TOEFL Flashcards', priority: 'Normal', color: 'bg-emerald-500/20 text-emerald-500' },
                  ].map((tItem, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{tItem.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tItem.color}`}>{tItem.priority}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'habits' && (
                <div className="space-y-3">
                  {[
                    { name: lang === 'fa' ? 'مطالعه روزانه ۳۰ دقیقه' : 'Daily 30m Reading', days: 18 },
                    { name: lang === 'fa' ? 'ورزش و پیاده‌روی' : 'Morning Workout', days: 7 },
                  ].map((hItem, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-800 dark:text-slate-200">{hItem.name}</span>
                        <span className="text-amber-500 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5" />
                          {hItem.days} {lang === 'fa' ? 'روز استمرار' : 'Days Streak'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(hItem.days / 21) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'study' && (
                <div className="text-center py-6 space-y-3 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="w-24 h-24 mx-auto rounded-full border-4 border-emerald-500 flex items-center justify-center font-mono text-2xl font-black text-slate-900 dark:text-white">
                    25:00
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                      {lang === 'fa' ? 'بازه تمرکز پومودورو' : 'Pomodoro Interval'}
                    </h5>
                    <p className="text-xs text-slate-500">{lang === 'fa' ? 'استراحت کوتاه: ۵ دقیقه' : 'Short Break: 5 min'}</p>
                  </div>
                </div>
              )}

              {(activeTab === 'schedule' || activeTab === 'analytics' || activeTab === 'settings') && (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                  <BarChart3 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">{currentTab.title}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">{currentTab.desc}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Key Details & Metrics (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                {currentTab.label}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {currentTab.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {currentTab.desc}
              </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {currentTab.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white dark:bg-[#16241E] border border-slate-200/90 dark:border-emerald-500/20 shadow-xs"
                >
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">
                    {m.label}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
