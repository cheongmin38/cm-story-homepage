
import React, { useEffect, useRef } from 'react';
import { HERO_CONTENT } from '../constants';
import { Language, Page } from '../types';
import ThreeBackground from './ThreeBackground';

interface HeroProps { 
  language: Language; 
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ language, onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    containerRef.current?.querySelectorAll('.fade-only').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden pt-20"
    >
      <ThreeBackground />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60 z-[1] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="fade-only mb-12">
          <div className="flex items-center space-x-4 mb-8">
            <span className="w-12 h-[2px] bg-[#FF003C]"></span>
            <span className="label-engineered">
              {language === 'KR' ? '스포츠 테크놀로지의 정점' : 'PEAK SPORTS ENGINEERING'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-[4.5rem] font-[900] text-white tracking-[-0.05em] mb-12 leading-[0.9] mix-blend-difference">
            {HERO_CONTENT.title[language].split('\n').map((line, i) => (
              <span key={i} className="block text-gradient">
                {line}
              </span>
            ))}
          </h1>
          
          <div className="max-w-2xl border-l-2 border-white/5 pl-12 mb-20">
            <p className="text-base md:text-xl text-white/40 leading-relaxed font-medium whitespace-pre-wrap tracking-tight">
              {HERO_CONTENT.subtitle[language]}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6">
            <button 
              onClick={() => onNavigate('products')}
              className="group relative px-12 py-6 bg-black text-white border border-[#FF003C]/60 font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-500 hover:bg-[#FF003C] hover:border-[#FF003C] shadow-[0_0_30px_rgba(255,0,60,0.15)] hover:shadow-[0_0_50px_rgba(255,0,60,0.4)]"
            >
              <span className="relative z-10">{language === 'KR' ? '하드웨어 라인업' : 'HARDWARE LINEUP'}</span>
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-12 py-6 border border-white/10 bg-black text-white/50 font-black uppercase tracking-[0.4em] text-[11px] hover:border-white/20 hover:text-white transition-all duration-500"
            >
              {language === 'KR' ? '비즈니스 협력' : 'INQUIRY'}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-16 fade-only opacity-20 hidden lg:block z-10" style={{ transitionDelay: '0.5s' }}>
        <div className="mono text-[9px] font-black tracking-[1em] uppercase text-white/60 mb-4">ENGINEERING_SPEC_V2.5</div>
        <div className="flex space-x-16 text-[10px] font-extrabold tracking-[0.2em] text-white/30 uppercase">
          <span className="flex items-center"><span className="w-1.5 h-1.5 bg-[#FF003C] mr-3"></span>KC_CERT_STABLE</span>
          <span className="flex items-center"><span className="w-1.5 h-1.5 bg-[#FF003C] mr-3"></span>SENSING_PRECISION_99.9%</span>
          <span className="flex items-center"><span className="w-1.5 h-1.5 bg-[#FF003C] mr-3"></span>MODULAR_MFG_CORE</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
