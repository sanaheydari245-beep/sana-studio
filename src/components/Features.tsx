import React, { useState } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import {
  CheckSquare,
  Flame,
  Calendar,
  Clock,
  BarChart3,
  Bell,
  Palette,
  Check,
} from 'lucide-react';

interface FeaturesProps {
  lang: Language;
}

export const Features: React.FC<FeaturesProps> = ({ lang }) => {
  const t = translations[lang].features;
  const [activeFeature, setActiveFeature] = useState<string>('tasks');

  const iconMap: Record<string, React.ReactNode> = {
    tasks: <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    habits: <Flame className="w-5 h-5 text-amber-500" />,
    schedule: <Calendar className="w-5 h-5 text-emerald-500" />,
    study: <Clock className="w-5 h-5 text-teal-500" />,
    analytics: <BarChart3 className="w-5 h-5 text-emerald-400" />,
    notifications: <Bell className="w-5 h-5 text-emerald-600" />,
    personalization: <Palette className="w-5 h-5 text-emerald-500" />,
  };

  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 relative bg-slate-50/60 dark:bg-[#111D18]/70 border-y border-emerald-500/10">
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 text-start">
          {t.items.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveFeature(item.id)}
              className={`p-5 sm:p-6 rounded-2xl transition-all duration-300 border cursor-pointer relative overflow-hidden group ${
                activeFeature === item.id
                  ? 'bg-white dark:bg-[#16241E] border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                  : 'bg-white/80 dark:bg-[#16241E]/80 border-slate-200/90 dark:border-emerald-500/15 hover:border-emerald-500/40 hover:bg-white dark:hover:bg-[#16241E]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-500/20 flex items-center justify-center">
                  {iconMap[item.id] || <CheckSquare className="w-5 h-5 text-emerald-500" />}
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-emerald-300 border border-slate-200 dark:border-emerald-500/30">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {item.desc}
              </p>

              {/* Bullet Highlights */}
              <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
