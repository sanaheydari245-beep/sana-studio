import React, { useState, useEffect } from 'react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange?: (newLang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang }) => {
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

  // Close menus on Escape key
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
    { id: 'profile', label: t.profile },
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

          {/* Desktop Navigation Links (Visible on lg and larger screens) */}
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

          {/* Mobile & Tablet Hamburger Button (Visible on screens smaller than lg) */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-emerald-500/20 dark:border-emerald-500/30 text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-[#16241E]/80 backdrop-blur-sm hover:border-emerald-500/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label={mobileMenuOpen ? t.menuClose : t.menuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown (< lg) */}
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
