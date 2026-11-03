import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import type { Language } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { AppPreview } from './components/AppPreview';
import { Benefits } from './components/Benefits';
import { Download } from './components/Download';
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
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 bg-[#F8FAFC] dark:bg-[#0B1310] text-slate-900 dark:text-slate-100 ${
        lang === 'fa' ? 'text-right' : 'text-left'
      }`}
    >
      {/* Sticky Glassmorphism Header */}
      <Navbar lang={lang} onLanguageChange={handleLanguageChange} />

      {/* Main Single Page Content */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero lang={lang} />

        {/* Section 2: Features */}
        <Features lang={lang} />

        {/* Section 3: How It Works */}
        <HowItWorks lang={lang} />

        {/* Section 4: Interactive App Preview */}
        <AppPreview lang={lang} />

        {/* Section 5: Benefits */}
        <Benefits lang={lang} />

        {/* Section 6: Direct Download Section */}
        <Download lang={lang} />

        {/* Section 7: Frequently Asked Questions */}
        <FAQ lang={lang} />

        {/* Section 8: Contact & Feedback Form */}
        <Contact lang={lang} />
      </main>

      {/* Section 9: Footer */}
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
