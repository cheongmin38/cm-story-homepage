
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
    <footer className="bg-black text-white/30 py-40 border-t border-white/5 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-20 pb-32">
          <div className="md:col-span-6">
            <div className="mb-12 cursor-pointer inline-block" onClick={() => onNavigate('home')}>
              {customLogo ? (
                <img src={customLogo} alt="Logo" className="h-20 w-auto object-contain" />
              ) : (
                <DefaultLogoSVG className="h-24" />
              )}
            </div>
            <p className="text-xl leading-relaxed max-w-md font-[600] text-white/20 tracking-tight">
               {language === 'KR' 
                 ? "제조 기반의 스포츠 테크 기업. 독보적인 인터랙티브 하드웨어와 데이터 플랫폼으로 새로운 가치를 창출합니다." 
                 : "Sports content tech company based on manufacturing. We create new value with unique hardware and data platforms."}
            </p>
          </div>
          
          <div className="md:col-span-3">
             <h5 className="text-white/40 font-black mb-12 uppercase text-[11px] tracking-[0.5em]">
               {language === 'KR' ? '기업 정보' : 'CORPORATE'}
             </h5>
             <ul className="space-y-6">
               <li className="flex flex-col space-y-2 border-b border-white/5 pb-4">
                 <span className="text-white/10 uppercase tracking-[0.3em] text-[10px] font-black">
                   {language === 'KR' ? '대표자' : 'CEO'}
                 </span> 
                 <span className="text-white/60 font-bold text-lg">{COMPANY_INFO.representative}</span>
               </li>
               <li className="flex flex-col space-y-2 border-b border-white/5 pb-4">
                 <span className="text-white/10 uppercase tracking-[0.3em] text-[10px] font-black">{language === 'KR' ? '본사 소재지' : 'HEADQUARTERS'}</span> 
                 <span className="text-white/60 font-bold text-[15px] leading-relaxed">{COMPANY_INFO.address}</span>
               </li>
               <li className="flex flex-col space-y-2">
                 <span className="text-white/10 uppercase tracking-[0.3em] text-[10px] font-black">{language === 'KR' ? '연락처' : 'CONTACT'}</span>
                 <span className="text-white/60 font-bold">{COMPANY_INFO.phone}</span>
                 <span className="text-white/60 font-bold">{COMPANY_INFO.email}</span>
               </li>
             </ul>
          </div>

          <div className="md:col-span-3">
             <h5 className="text-white/40 font-black mb-12 uppercase text-[11px] tracking-[0.5em]">
               {language === 'KR' ? '메뉴' : 'NAVIGATION'}
             </h5>
             <ul className="space-y-4">
               {NAV_ITEMS.map(item => (
                 <li key={item.id}>
                    <button 
                      onClick={() => onNavigate(item.id)}
                      className="text-white/40 hover:text-[#FF003C] transition-all uppercase tracking-[0.3em] text-[11px] font-black py-1"
                    >
                      {item.label[language]}
                    </button>
                 </li>
               ))}
             </ul>
          </div>
        </div>
        
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.6em]">
           <div className="text-white/20">&copy; {new Date().getFullYear()} CM STORY INC. ALL RIGHTS RESERVED.</div>
           <div className="mt-8 md:mt-0 text-[#FF003C] opacity-50 flex items-center">
             <span className="w-10 h-[1px] bg-[#FF003C] mr-4"></span>
             PRECISION SPORTS ENGINEERING
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
