
import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  return (
    <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
      <button
        onClick={() => setLanguage('KR')}
        className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all duration-500 ${
          language === 'KR' ? 'bg-[#FF003C] text-white shadow-lg shadow-[#FF003C]/20' : 'text-white/30 hover:text-white/60'
        }`}
      >
        KR
      </button>
      <button
        onClick={() => setLanguage('EN')}
        className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all duration-500 ${
          language === 'EN' ? 'bg-[#FF003C] text-white shadow-lg shadow-[#FF003C]/20' : 'text-white/30 hover:text-white/60'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
