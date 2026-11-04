import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import type { Language } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AppScreenshots } from './components/AppScreenshots';
import { HowItWorks } from './components/HowItWorks';
import { KeyValues } from './components/KeyValues';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { LegalModal } from './components/LegalModal';

const SinglePageLayout: React.FC<{ lang: Language }> = ({ lang }) => {
  const navigate = useNavigate();
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'terms';
  }>({
    isOpen: false,
    type: 'privacy',
  });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'fa' ? 'rtl' : 'ltr';

    if (lang === 'fa') {
      document.title = 'Emerald Life | مدیریت هوشمند زندگی و مطالعه در اندروید';
    } else {
      document.title = 'Emerald Life | Android Life & Study Management OS';
    }
  }, [lang]);

  const handleLanguageChange = (newLang: Language) => {
    navigate(`/${newLang}`, { replace: false });
  };

  const openPrivacyModal = () => {
    setLegalModalState({ isOpen: true, type: 'privacy' });
  };

  const openTermsModal = () => {
    setLegalModalState({ isOpen: true, type: 'terms' });
  };

  const closeLegalModal = () => {
    setLegalModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 bg-[#F8FAFC] dark:bg-[#0B1310] text-slate-900 dark:text-slate-100 ${
        lang === 'fa' ? 'text-right' : 'text-left'
      }`}
    >
      {/* Sticky Glassmorphism Header */}
      <Navbar lang={lang} onLanguageChange={handleLanguageChange} />

      {/* Main Single Page Content */}
      <main className="flex-1">
        {/* Section 1: Hero Section */}
        <Hero lang={lang} />

        {/* Section 2: Features Section */}
        <Features lang={lang} />

        {/* Section 3: App Screenshots Showcase */}
        <AppScreenshots lang={lang} />

        {/* Section 4: How It Works */}
        <HowItWorks lang={lang} />

        {/* Section 5: Our Key Values (Exactly 5 items in balanced 2-1-2 layout) */}
        <KeyValues lang={lang} />

        {/* Section 6: Frequently Asked Questions */}
        <FAQ lang={lang} />

        {/* Section 7: Updated Contact Form (5 fields) with backend integration */}
        <Contact lang={lang} />
      </main>

      {/* Section 8: Footer */}
      <Footer
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenPrivacy={openPrivacyModal}
        onOpenTerms={openTermsModal}
      />

      {/* Google Authentication Dialog Modal */}
      <AuthModal lang={lang} />

      {/* Privacy Policy & Terms of Service Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={closeLegalModal}
        type={legalModalState.type}
        lang={lang}
      />
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
