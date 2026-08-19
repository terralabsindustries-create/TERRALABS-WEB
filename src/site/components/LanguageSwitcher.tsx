import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="language-switcher-btn"
        aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      >
        <Globe className="globe-icon" size={18} />
        <span className="language-code">{language === 'en' ? 'EN' : 'AR'}</span>
        <span className="language-name">{language === 'en' ? 'English' : 'العربية'}</span>
      </button>
    </div>
  );
}
