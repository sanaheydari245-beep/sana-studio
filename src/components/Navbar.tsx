import React, { useState, useEffect } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';
import { Sun, Moon, Globe, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onLanguageChange }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
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
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navItems = [
    { id: 'about', label: t.about },
    { id: 'products', label: t.products },
    { id: 'principles', label: t.principles },
    { id: 'vision', label: t.roadmap },
    { id: 'faq', label: t.faq },
    { id: 'contact', label: t.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 bg-[#F5F7FF]/92 dark:bg-[#182541]/92 backdrop-blur-md shadow-sm border-b border-[#3563F5]/10 dark:border-[#52678D]/40'
          : 'py-3 sm:py-3.5 bg-transparent'
      }`}
    >
      <div className="site-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5] rounded-xl p-0.5"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-[#101B3D]/80 dark:text-[#D5DFF2] hover:text-[#3563F5] dark:hover:text-[#F8FAFF] hover:bg-[#3563F5]/5 dark:hover:bg-[#35496F]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Header Controls (Theme, Language, CTA) */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(lang === 'fa' ? 'en' : 'fa')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-[#3563F5]/15 dark:border-[#52678D] hover:border-[#3563F5] text-[#101B3D] dark:text-[#F8FAFF] bg-white dark:bg-[#2A3B60] hover:bg-[#DCE5FF] dark:hover:bg-[#35496F] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5]"
              title={lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
            >
              <Globe className="w-3.5 h-3.5 text-[#3563F5] dark:text-[#A9B8D4]" />
              <span>{lang === 'fa' ? 'EN' : 'فا'}</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[#3563F5]/15 dark:border-[#52678D] hover:border-[#3563F5] text-[#101B3D] dark:text-[#F8FAFF] bg-white dark:bg-[#2A3B60] hover:bg-[#DCE5FF] dark:hover:bg-[#35496F] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5]"
              aria-label={t.themeToggle}
              title={theme === 'dark' ? 'حالت روشن' : 'حالت تاریک'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#3563F5]" />
              )}
            </button>

            {/* Quick Action Button */}
            <button
              onClick={() => scrollToSection('products')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#3563F5] hover:bg-[#2650DE] text-white shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5] active:scale-[0.98]"
            >
              <span>{t.products}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${lang === 'fa' ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>

          {/* Mobile Hamburger & Quick Theme */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[#3563F5]/15 dark:border-[#52678D] text-[#101B3D] dark:text-[#F8FAFF] bg-white dark:bg-[#2A3B60]"
              aria-label={t.themeToggle}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#3563F5]" />
              )}
            </button>

            <button
              onClick={() => onLanguageChange(lang === 'fa' ? 'en' : 'fa')}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-[#3563F5]/15 dark:border-[#52678D] text-[#101B3D] dark:text-[#F8FAFF] bg-white dark:bg-[#2A3B60]"
            >
              {lang === 'fa' ? 'EN' : 'فا'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-[#3563F5] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3563F5]"
              aria-label={mobileMenuOpen ? t.menuClose : t.menuOpen}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[56px] z-40 bg-[#080E20]/80 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="bg-[#F5F7FF] dark:bg-[#182541] border-b border-[#3563F5]/20 dark:border-[#52678D]/50 px-5 py-5 shadow-xl max-h-[calc(100vh-56px)] overflow-y-auto">
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-start px-3.5 py-2.5 text-sm font-medium rounded-xl text-[#101B3D] dark:text-[#F8FAFF] hover:bg-[#DCE5FF] dark:hover:bg-[#2A3B60] hover:text-[#3563F5] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-[#3563F5]/10 dark:border-[#52678D]/30 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onLanguageChange(lang === 'fa' ? 'en' : 'fa');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#3563F5]/25 dark:border-[#52678D] text-xs font-semibold text-[#101B3D] dark:text-[#F8FAFF]"
              >
                <Globe className="w-3.5 h-3.5 text-[#3563F5] dark:text-[#A9B8D4]" />
                <span>{lang === 'fa' ? 'Switch to English' : 'تغییر زبان به فارسی'}</span>
              </button>

              <button
                onClick={() => scrollToSection('products')}
                className="w-full py-2.5 rounded-xl bg-[#3563F5] text-white font-semibold text-center text-xs shadow-sm"
              >
                {t.products}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
