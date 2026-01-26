
import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  return (
    <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
      <button
        onClick={() => setLanguage('KR')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          language === 'KR' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
        }`}
      >
        KR
      </button>
      <button
        onClick={() => setLanguage('EN')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          language === 'EN' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
