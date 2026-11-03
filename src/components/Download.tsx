import React from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { Download as DownloadIcon, Smartphone, CheckCircle, ShieldCheck, HardDrive, Info } from 'lucide-react';

interface DownloadProps {
  lang: Language;
}

export const Download: React.FC<DownloadProps> = ({ lang }) => {
  const t = translations[lang].download;

  return (
    <section id="download" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 md:p-14 bg-gradient-to-b from-white to-emerald-50/40 dark:from-[#16241E] dark:to-[#0B1310] border border-emerald-500/20 dark:border-emerald-500/30 shadow-2xl shadow-emerald-950/10 dark:shadow-black/50">
          <div className="text-center max-w-2xl mx-auto mb-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 mb-4">
              <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Download Action Area */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="/emerald-life.apk"
              download="emerald-life.apk"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <DownloadIcon className="w-5 h-5" />
              <span>{t.apkBtn}</span>
            </a>
          </div>

          {/* Specs / Meta Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-10 pb-8 border-b border-emerald-500/15 dark:border-emerald-500/20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>{t.versionInfo}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-medium">
              <HardDrive className="w-4 h-4 text-emerald-500" />
              <span>{t.sizeInfo}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'fa' ? 'عاری از تبلیغات و ردیاب' : 'Zero Ads & Zero Trackers'}</span>
            </div>
          </div>

          {/* Android Installation Instructions */}
          <div className="bg-white/80 dark:bg-black/30 rounded-2xl p-6 sm:p-7 border border-emerald-500/15 dark:border-emerald-500/20">
            <div className="flex items-center gap-2 mb-4 text-emerald-700 dark:text-emerald-400 font-bold text-sm sm:text-base">
              <Info className="w-5 h-5 flex-shrink-0" />
              <span>{t.instructionsTitle}</span>
            </div>
            <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-decimal list-inside">
              {t.instructions.map((step, idx) => (
                <li key={idx} className="ps-1">
                  <span className="font-medium">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{t.notice}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
