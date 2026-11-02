import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import type { Language } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { Principles } from './components/Principles';
import { Vision } from './components/Vision';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const SinglePageLayout: React.FC<{ lang: Language }> = ({ lang }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'fa' ? 'rtl' : 'ltr';

    if (lang === 'fa') {
      document.title = 'Sana Studio | استودیو سنا - توسعه نرم‌افزار و ابزارهای دیجیتال';
    } else {
      document.title = 'Sana Studio | Transforming Ideas into Digital Products';
    }
  }, [lang]);

  const handleLanguageChange = (newLang: Language) => {
    navigate(`/${newLang}`, { replace: false });
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 bg-[#F5F7FF] dark:bg-[#182541] text-[#101B3D] dark:text-[#F8FAFF] ${
        lang === 'fa' ? 'text-right' : 'text-left'
      }`}
    >
      {/* Sticky Glassmorphism Navbar */}
      <Navbar lang={lang} onLanguageChange={handleLanguageChange} />

      {/* Main Single Page Content */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero lang={lang} />

        {/* Section 2: Products Catalog */}
        <Products lang={lang} />

        {/* Section 3: Brand Intro & 3 Pillars */}
        <About lang={lang} />

        {/* Section 5: Brand Principles & Values */}
        <Principles lang={lang} />

        {/* Section 6: Future Vision & Trajectory */}
        <Vision lang={lang} />

        {/* Section 7: Frequently Asked Questions (Accordion) */}
        <FAQ lang={lang} />

        {/* Section 8: Contact Form with Validation & Transparency */}
        <Contact lang={lang} />
      </main>

      {/* Section 9: Footer */}
      <Footer lang={lang} onLanguageChange={handleLanguageChange} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/fa" element={<SinglePageLayout lang="fa" />} />
      <Route path="/en" element={<SinglePageLayout lang="en" />} />
      <Route path="/" element={<Navigate to="/fa" replace />} />
      <Route path="*" element={<Navigate to="/fa" replace />} />
    </Routes>
  );
};

export default App;
