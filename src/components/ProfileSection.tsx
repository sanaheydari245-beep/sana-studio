import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { UserCheck, Clock, CheckCircle2, Palette, Bell, Shield, Sliders } from 'lucide-react';

interface ProfileSectionProps {
  lang: Language;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ lang }) => {
  const t = translations[lang].profileSection;

  const featureIcons = [
    <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    <Palette className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
  ];

  return (
    <section id="profile" className="py-12 sm:py-14 md:py-16 relative">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 mb-3">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-[23px] sm:text-[26px] md:text-[28px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Profile Showcase Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-[#16241E] border border-emerald-500/20 shadow-xl overflow-hidden p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Phone Mockup Frame housing the authentic profile.jpg screenshot */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[260px] sm:max-w-[280px]">
                {/* Outer Glow Halo */}
                <div className="absolute inset-0 bg-emerald-500/15 rounded-[40px] blur-xl transform scale-95" />

                {/* Bezel */}
                <div className="relative rounded-[36px] p-2.5 bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-slate-700/80 shadow-2xl shadow-emerald-950/30">
                  <div className="rounded-[28px] overflow-hidden bg-black flex items-center justify-center aspect-[9/19]">
                    <img
                      src="/images/profile.jpg"
                      alt="Emerald Life My Profile Screen"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Overview Details & Capabilities */}
            <div className="lg:col-span-7 text-start space-y-5">
              {/* Stat Highlights from Profile Screen */}
              <div className="grid grid-cols-2 gap-3 pb-2">
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-500/20">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {t.totalStudyLabel}
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    {t.totalStudyValue}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-500/20">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t.tasksDoneLabel}
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    {t.tasksDoneValue}
                  </span>
                </div>
              </div>

              {/* Feature Points */}
              <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800">
                {t.features.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {featureIcons[idx] || <Sliders className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <div>
                      <h4 className="text-[15px] sm:text-[16px] font-bold text-slate-900 dark:text-slate-100 mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
