
import React from 'react';
import { COMPANY_INFO, NAV_ITEMS } from '../constants';
import { Language, Page } from '../types';
import { DefaultLogoSVG } from './Navbar';

interface FooterProps {
  language: Language;
  customLogo: string | null;
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ language, customLogo, onNavigate }) => {
  return (
    <footer className="bg-black text-white/30 py-40 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-20 pb-32">
          <div className="md:col-span-6">
            <div className="mb-8 cursor-pointer" onClick={() => onNavigate('home')}>
              {customLogo ? (
                <div className="flex items-center space-x-4">
                  <img src={customLogo} alt="Logo" className="h-16 w-auto object-contain" />
                </div>
              ) : (
                <DefaultLogoSVG className="h-20" />
              )}
            </div>
            <p className="text-lg leading-relaxed max-w-md font-medium text-white/20">
               {language === 'KR' 
                 ? "제조 기반의 스포츠 테크 기업. 독보적인 인터랙티브 하드웨어와 데이터 플랫폼으로 새로운 가치를 창출합니다." 
                 : "Sports content tech company based on manufacturing. We create new value with unique hardware and data platforms."}
            </p>
          </div>
          
          <div className="md:col-span-3">
             <h5 className="text-white font-black mb-10 uppercase text-[10px] tracking-[0.5em] opacity-40">
               {language === 'KR' ? '기업 정보' : 'Company'}
             </h5>
             <ul className="text-sm space-y-4 font-bold">
               <li className="flex items-center border-b border-white/5 pb-2">
                 <span className="text-white/20 uppercase tracking-widest text-[9px] w-8">
                   {language === 'KR' ? '대표' : 'CEO'}
                 </span> 
                 <span className="text-white/60 ml-0.5">: {COMPANY_INFO.representative}</span>
               </li>
               <li className="flex flex-col space-y-1 border-b border-white/5 pb-2">
                 <span className="text-white/20 uppercase tracking-widest text-[9px]">{language === 'KR' ? '본사' : 'HQ'}</span> 
                 <span className="text-white/60 text-xs leading-relaxed">{COMPANY_INFO.address}</span>
               </li>
               <li className="text-white/60">{COMPANY_INFO.phone}</li>
               <li className="text-white/60">{COMPANY_INFO.email}</li>
             </ul>
          </div>

          <div className="md:col-span-3">
             <h5 className="text-white font-black mb-10 uppercase text-[10px] tracking-[0.5em] opacity-40">
               {language === 'KR' ? '메뉴' : 'Explore'}
             </h5>
             <ul className="text-sm space-y-4 font-bold">
               {NAV_ITEMS.map(item => (
                 <li key={item.id}>
                    <button 
                      onClick={() => onNavigate(item.id)}
                      className="hover:text-[#FF003C] transition-colors uppercase tracking-widest text-[10px]"
                    >
                      {item.label[language]}
                    </button>
                 </li>
               ))}
             </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-[0.5em]">
           <div>&copy; {new Date().getFullYear()} CM STORY INC. PRECISION ENGINEERING.</div>
           <div className="mt-6 md:mt-0 text-white/10">MADE WITH CORE TECH</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
