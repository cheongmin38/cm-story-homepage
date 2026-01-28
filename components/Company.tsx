
import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_DETAILS, ASSET_PATHS } from '../constants';
import { Language } from '../types';

interface CompanyProps {
  language: Language;
}

const Company: React.FC<CompanyProps> = ({ language }) => {
  const [imageError, setImageError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    { title: { KR: "연구개발", EN: "R&D" }, desc: { KR: "핵심 메커니즘 설계 및 최적화", EN: "Core Mechanism Design" } },
    { title: { KR: "시제품 제작", EN: "Prototype" }, desc: { KR: "현장 가동 테스트 및 피드백 수렴", EN: "Field Testing & Feedback" } },
    { title: { KR: "정식 인증", EN: "Certification" }, desc: { KR: "KC 안전 인증 및 등급 심의 완료", EN: "KC Safety & Ratings" } },
    { title: { KR: "정밀 양산", EN: "Production" }, desc: { KR: "자체 공정 기반 표준화 모델 제조", EN: "Standardized Manufacturing" } },
    { title: { KR: "운영 솔루션", EN: "Operation" }, desc: { KR: "실시간 데이터 관제 및 정산 시스템", EN: "Data & Settlement Systems" } },
  ];

  return (
    <section id="company" className="py-32 bg-black overflow-hidden border-t border-white/5" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-6 reveal">
            <h2 className="text-[11px] font-black text-[#FF003C] tracking-[0.4em] uppercase mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-[#FF003C] mr-4"></span>
              The Manufacturing Origin
            </h2>
            <h3 className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-10 uppercase">
              {language === 'KR' ? "제조의 정밀함,\n가치로 증명하다" : "Precision MFG,\nProven by Value"}
            </h3>
            
            {/* Stable Asset Frame */}
            <div className="w-full aspect-video bg-[#0A0A0A] overflow-hidden group mb-10 border border-white/10 rounded-2xl relative flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 bg-grid opacity-10"></div>
              
              {!imageError ? (
                <img 
                  src={ASSET_PATHS.intro_scene} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  alt="Real Factory Scene"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="relative z-10 flex flex-col items-center opacity-40">
                   <div className="w-20 h-20 border border-dashed border-[#FF003C]/50 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-[#FF003C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                   </div>
                   <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white text-center">
                     {language === 'KR' ? '실제 기기 아카이브 준비 중' : 'ARCHIVE ASSET PENDING'}
                   </span>
                   <p className="mt-4 text-[8px] font-bold text-white/20 uppercase tracking-widest">
                     Target: {ASSET_PATHS.intro_scene}
                   </p>
                </div>
              )}

              <div className="absolute top-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#FF003C] animate-pulse"></span>
                <span className="text-[8px] font-black tracking-widest text-white uppercase">OFFICIAL_ASSET_VERIFIED</span>
              </div>
            </div>

            <p className="text-xs font-bold text-white/20 uppercase tracking-[0.3em] mb-4">
               {language === 'KR' ? '투명한 제조 공정 및 기술적 무결성' : 'TRANSPARENT PROCESS & TECHNICAL INTEGRITY'}
            </p>
          </div>
          
          <div className="md:col-span-6 md:pt-24 reveal" style={{ transitionDelay: '0.2s' }}>
            <p className="text-xl text-white/60 leading-relaxed font-medium mb-16 border-l-4 border-[#FF003C] pl-10 whitespace-pre-line tracking-tight">
              {COMPANY_DETAILS.description[language]}
            </p>
            
            <div className="grid grid-cols-1 gap-6">
              {steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="group relative flex items-center justify-between p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-[#FF003C]/40 transition-all duration-500 hover:translate-x-6 cursor-default rounded-2xl overflow-hidden"
                >
                  {/* Subtle Red Vertical Progress Indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FF003C]/10 group-hover:bg-[#FF003C] transition-all duration-700"></div>
                  
                  <div className="flex items-center space-x-10">
                    <div className="relative flex-shrink-0">
                      <span className="text-sm font-black text-white/10 group-hover:text-[#FF003C] transition-colors duration-500 z-10 relative">
                        STEP_0{idx + 1}
                      </span>
                      <div className="absolute inset-0 bg-[#FF003C]/20 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-xl font-black uppercase tracking-tight text-white/60 group-hover:text-white transition-colors duration-500">
                        {step.title[language]}
                      </span>
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-1.5 group-hover:text-white/40 transition-colors">
                        {step.desc[language]}
                      </span>
                    </div>
                  </div>

                  {/* Active Intent Visual Indicator */}
                  <div className="flex items-center">
                    <div className="w-16 h-[1px] bg-white/5 group-hover:bg-[#FF003C]/30 transition-all duration-700 scale-x-0 group-hover:scale-x-100 origin-right"></div>
                    <div className="w-4 h-4 rounded-full border-2 border-white/5 group-hover:border-[#FF003C] group-hover:bg-[#FF003C]/10 transition-all duration-700 ml-6 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/5 group-hover:bg-[#FF003C] transition-all duration-700 shadow-[0_0_15px_rgba(255,0,60,0.4)]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;
