
import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS } from '../constants';
import { Language } from '../types';
import LanguageToggle from './LanguageToggle';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  customLogo: string | null;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DefaultLogoSVG = ({ className = "h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="50" rx="12" fill="#FF003C" />
    <path d="M14 16H36V22H24V28H34V34H24V40H36V46H14V16Z" fill="white" />
    <text x="65" y="42" fontFamily="Inter, sans-serif" fontSize="30" fontWeight="900" fill="white" letterSpacing="-1.5">CM STORY</text>
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage, customLogo, onLogoUpload }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 py-4`}>
      <div className={`max-w-6xl mx-auto flex justify-between items-center px-8 py-3 rounded-full transition-all duration-500 ${isScrolled ? 'glass py-4 shadow-2xl' : 'bg-transparent'}`}>
        <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
          <input type="file" ref={fileInputRef} onChange={onLogoUpload} className="hidden" accept="image/*" />
          {customLogo ? (
            <img src={customLogo} alt="CM Story" className="h-10 w-auto object-contain transition-transform group-hover:scale-110" />
          ) : (
            <DefaultLogoSVG className="h-8" />
          )}
          <span className="text-sm font-black tracking-tighter uppercase hidden sm:block">CM STORY</span>
        </div>

        <div className="hidden md:flex items-center space-x-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#FF003C] transition-colors"
            >
              {item.label[language]}
            </button>
          ))}
          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>

        <div className="md:hidden flex items-center space-x-4">
           <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
