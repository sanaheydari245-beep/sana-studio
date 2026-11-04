import React, { useState, useEffect } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import {
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onLanguageChange }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, openAuthModal, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
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

  const navItems = [
    { id: 'hero', label: t.home },
    { id: 'features', label: t.features },
    { id: 'screenshots', label: t.screenshots },
    { id: 'how-it-works', label: t.howItWorks },
    { id: 'values', label: t.values },
    { id: 'faq', label: t.faq },
    { id: 'contact', label: t.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-surface shadow-sm py-2.5 sm:py-3'
          : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="site-container">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5"
            aria-label="Emerald Life Home"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links (14-15px font size) */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 dark:bg-emerald-950/40 border border-emerald-500/15 dark:border-emerald-500/20 px-3 py-1.5 rounded-full shadow-xs">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1 text-sm font-medium rounded-full text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors focus:outline-none"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls: Language, Theme, Account */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(lang === 'fa' ? 'en' : 'fa')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-emerald-500/20 dark:border-emerald-500/30 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              title={lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{lang === 'fa' ? 'EN' : 'فا'}</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-emerald-500/20 dark:border-emerald-500/30 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label={t.themeToggle}
              title={theme === 'dark' ? 'حالت روشن' : 'حالت تاریک'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-600" />
              )}
            </button>

            {/* Google / Account Button */}
            <div className="relative">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/15 transition-all"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                      {user.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/20 shadow-lg p-2 text-start z-50">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate px-2 py-1">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate px-2 mb-2">
                        {user.email}
                      </p>
                      <div className="border-t border-slate-200 dark:border-slate-800 pt-1">
                        <button
                          onClick={signOut}
                          className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>{t.signOut}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl border border-emerald-500/20 dark:border-emerald-500/30 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all"
                >
                  <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.account}</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-emerald-500/20 dark:border-emerald-500/30 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900"
              aria-label={t.themeToggle}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-600" />
              )}
            </button>

            <button
              onClick={() => onLanguageChange(lang === 'fa' ? 'en' : 'fa')}
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-emerald-500/20 dark:border-emerald-500/30 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900"
            >
              {lang === 'fa' ? 'EN' : 'فا'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-emerald-500/20 dark:border-emerald-500/30 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900"
              aria-label={mobileMenuOpen ? t.menuClose : t.menuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-[60px] bottom-0 bg-slate-900/40 backdrop-blur-md z-50 lg:hidden animate-fade-in">
            <div className="bg-white dark:bg-[#111D18] border-b border-emerald-500/20 p-5 space-y-4 shadow-xl">
              <nav className="flex flex-col gap-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-start px-3.5 py-2.5 text-sm font-medium rounded-xl text-slate-800 dark:text-slate-100 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="pt-3 border-t border-slate-200 dark:border-emerald-500/20 space-y-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 text-slate-800 dark:text-slate-100 text-xs font-semibold bg-slate-50 dark:bg-emerald-950/40"
                >
                  <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{isAuthenticated ? user?.name : t.account}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
