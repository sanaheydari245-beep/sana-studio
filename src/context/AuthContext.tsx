import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture?: string;
  joinedAt?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => void;
  signOut: () => void;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'emerald_life_user_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_USER);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore parse error
      }
    }
    return null;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Check if redirected back with OAuth code / token or error in URL query
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const errorParam = params.get('auth_error');
      if (errorParam) {
        setAuthError(decodeURIComponent(errorParam));
        setIsModalOpen(true);
      }
    }
  }, []);

  const openAuthModal = () => {
    setAuthError(null);
    setIsModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsModalOpen(false);
    setAuthError(null);
  };

  const signInWithGoogle = () => {
    const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (apiBaseUrl) {
      // Production path: redirect to dedicated Node.js OAuth endpoint
      window.location.href = `${apiBaseUrl}/api/auth/google`;
      return;
    }

    if (googleClientId) {
      // Standard OAuth 2.0 flow direct redirect
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
      const scope = encodeURIComponent('openid profile email');
      const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=select_account`;
      window.location.href = oauthUrl;
      return;
    }

    // Explicitly notify user about configuration requirements without fake logins
    setAuthError(
      'شناسه Google OAuth (VITE_GOOGLE_CLIENT_ID) هنوز در متغیرهای محیطی یا سرور چابکان پیکربندی نشده است. لطفاً راهنمای راه‌اندازی را در کنسول گوگل کلود تکمیل فرمایید.'
    );
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isModalOpen,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signOut,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
