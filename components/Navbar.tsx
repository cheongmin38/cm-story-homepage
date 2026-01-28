
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, ASSET_PATHS } from '../constants';
import { Language, Page } from '../types';
import LanguageToggle from './LanguageToggle';

/**
 * CM STORY Precision Character Logo (High Fidelity SVG)
 * Used as fallback if the stable asset path logo.png is missing.
 */
export const DefaultLogoSVG = ({ className = "h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M42 45C42 35 55 28 68 28C81 28 92 35 92 45V75H42V45Z" fill="#1A1A1A" opacity="0.5"/>
    <path d="M92 28H140V75H92V28Z" fill="#1A1A1A" opacity="0.5"/>
    <g transform="translate(40, 25)">
      <circle cx="25" cy="25" r="25" fill="#E63946"/>
      <path d="M25 50C38.8071 50 50 38.8071 50 25H40C40 33.2843 33.2843 40 25 40V50Z" fill="#B91C1C"/>
      <path d="M0 25C0 11.1929 11.1929 0 25 0V10C16.7157 10 10 16.7157 10 25H0Z" fill="#EF4444"/>
      <circle cx="32" cy="20" r="9" fill="white" stroke="#1A1A1A" strokeWidth="2"/>
      <circle cx="32" cy="20" r="4" fill="black"/>
      <circle cx="15" cy="20" r="9" fill="white" stroke="#1A1A1A" strokeWidth="2"/>
      <circle cx="15" cy="20" r="4" fill="black"/>
    </g>
    <g transform="translate(90, 25)">
      <path d="M0 0H50V50H40V15L25 35L10 15V50H0V0Z" fill="#FFB703"/>
      <path d="M15 35C15 35 25 45 35 35" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round"/>
    </g>
    <g transform="translate(42, 85)">
      <path d="M12 0C7 0 4 3 4 7C4 11 10 10 10 14C10 16 8 17 6 17C4 17 3 15 3 15L0 18C2 21 5 23 8 23C13 23 16 20 16 15C16 11 10 11 10 7C10 5 11 4 12 4C14 4 15 6 15 6L18 3C16 1 15 0 12 0Z" fill="#FFB703" stroke="#1A1A1A" strokeWidth="1.5"/>
      <path d="M25 2V8H21V11H25V18C25 21 26 23 29 23C30 23 31 23 32 22V19H31C30 19 30 18 30 17V11H34V8H30V2H25Z" fill="#FFB703" stroke="#1A1A1A" strokeWidth="1.5"/>
      <path d="M45 8C41 8 38 11 38 15C38 20 41 23 45 23C49 23 52 20 52 15C52 11 49 8 45 8ZM45 19C43 19 42 18 42 15C42 12 43 11 45 11C47 11 48 12 48 15C48 18 47 19 45 19Z" fill="#FFB703" stroke="#1A1A1A" strokeWidth="1.5"/>
      <path d="M60 8V11C61 9 63 8 66 8V12H64C61 12 60 14 60 17V23H56V8H60Z" fill="#FFB703" stroke="#1A1A1A" strokeWidth="1.5"/>
      <path d="M72 8L76 18L80 8H85L78 24V30H74V24L68 8H72Z" fill="#FFB703" stroke="#1A1A1A" strokeWidth="1.5"/>
    </g>
  </svg>
);

const Navbar: React.FC<{ language: Language; setLanguage: (l: Language) => void; currentPage: Page; setCurrentPage: (p: Page) => void }> = ({ 
  language, 
  setLanguage, 
  currentPage, 
  setCurrentPage 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = isScrolled || currentPage !== 'home';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 py-6`}>
      <div 
        className={`max-w-[1200px] mx-auto flex justify-between items-center px-10 py-2 rounded-full transition-all duration-500 relative overflow-hidden ${
          isActive 
            ? 'bg-[#050505]/95 backdrop-blur-3xl border border-white/5 py-3 shadow-[0_30px_60px_rgba(0,0,0,0.6)]' 
            : 'bg-transparent border border-transparent'
        }`}
      >
        <div 
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#FF003C] transition-all duration-1000 ease-in-out ${
            isActive ? 'w-[50%] opacity-100' : 'w-0 opacity-0'
          }`}
        />

        <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setCurrentPage('home')}>
          {!logoError ? (
            <img 
              src={ASSET_PATHS.logo} 
              alt="CM Story Logo" 
              className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="flex items-center transform transition-transform group-hover:scale-105 active:scale-95">
              <DefaultLogoSVG className="h-14" />
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`text-[11px] font-[900] uppercase tracking-[0.25em] transition-all duration-300 relative group/nav`}
            >
              <span className={`${currentPage === item.id ? 'text-[#FF003C]' : 'text-white/40 hover:text-white'}`}>
                {item.label[language]}
              </span>
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#FF003C] transition-all duration-500 ${currentPage === item.id ? 'w-full' : 'w-0 group-hover/nav:w-full'}`}></span>
            </button>
          ))}
          <div className="h-5 w-[1px] bg-white/10 mx-2"></div>
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
