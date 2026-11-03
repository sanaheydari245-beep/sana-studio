import React, { useEffect } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
  lang: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type, lang }) => {
  const content =
    type === 'privacy'
      ? translations[lang].privacyModal
      : translations[lang].termsModal;

  const Icon = type === 'privacy' ? ShieldCheck : FileText;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-[#16241E] rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-2xl z-10 flex flex-col text-start">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-emerald-500/15 dark:border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {content.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {content.lastUpdated}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-5 pe-2 custom-scrollbar">
          {content.sections.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              <h4 className="text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-400">
                {section.heading}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-emerald-500/15 dark:border-emerald-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
          >
            {lang === 'fa' ? 'متوجه شدم' : 'I Understand'}
          </button>
        </div>
      </div>
    </div>
  );
};
