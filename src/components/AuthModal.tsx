import React, { useEffect } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { useAuth } from '../context/AuthContext';
import { X, ShieldCheck, AlertCircle, LogOut, User } from 'lucide-react';

interface AuthModalProps {
  lang: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({ lang }) => {
  const { user, isModalOpen, closeAuthModal, signInWithGoogle, signOut, authError } = useAuth();
  const t = translations[lang].authModal;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, closeAuthModal]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={closeAuthModal} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#16241E] rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-2xl z-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 end-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content for Logged In User */}
        {user ? (
          <div className="text-center pt-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4 overflow-hidden border-2 border-emerald-500">
              {user.picture ? (
                <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>

            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 mb-2">
              {t.statusActive}
            </span>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {user.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
              {user.email}
            </p>

            <button
              onClick={() => {
                signOut();
                closeAuthModal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-950/40 text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 font-semibold text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{lang === 'fa' ? 'خروج از حساب کاربری' : 'Sign Out'}</span>
            </button>
          </div>
        ) : (
          /* Content for Guest User */
          <div className="text-center pt-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 mb-6 leading-relaxed">
              {t.subtitle}
            </p>

            {/* Error banner if present */}
            {authError && (
              <div className="p-3.5 mb-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-500/30 text-start flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                  {authError}
                </p>
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              onClick={signInWithGoogle}
              className="w-full inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-sm border border-slate-300 dark:border-slate-700 shadow-sm transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{t.googleBtn}</span>
            </button>

            {/* Privacy note */}
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
              {t.privacyNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
