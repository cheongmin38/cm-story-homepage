
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
        {/* 움직이지 않는 페이드 인 효과 적용 */}
        <div className="fade-only mb-12">
          <div className="flex items-center space-x-4 mb-8">
            <span className="w-10 h-[1px] bg-[#FF003C]"></span>
            <span className="mono text-[10px] font-bold text-[#FF003C] tracking-[0.5em] uppercase">
              {language === 'KR' ? '스포츠 테크놀로지의 정점' : 'PEAK SPORTS ENGINEERING'}
            </span>
          </div>
          
          {/* 타이틀 폰트 크기 1/3 축소: text-6xl -> text-2xl, text-[8.5rem] -> text-[2.8rem] */}
          <h1 className="heading-premium text-2xl md:text-[2.8rem] text-white tracking-tighter mb-10 leading-[1.2] mix-blend-difference">
            {HERO_CONTENT.title[language].split('\n').map((line, i) => (
              <span key={i} className="block text-gradient transition-all duration-1000 hover:tracking-normal cursor-default">
                {line}
              </span>
            ))}
          </h1>
          
          <div className="max-w-xl border-l border-white/10 pl-10 mb-16">
            <p className="text-sm md:text-base text-white/40 leading-relaxed font-light">
              {HERO_CONTENT.subtitle[language]}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-10">
            <button 
              onClick={() => onNavigate('products')}
              className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-500 hover:bg-[#FF003C] hover:text-white"
            >
              <span className="relative z-10">{language === 'KR' ? '하드웨어 라인업' : 'HARDWARE LINEUP'}</span>
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-10 py-5 border border-white/10 text-white/60 font-black uppercase tracking-[0.3em] text-[10px] hover:border-white hover:text-white transition-all duration-500"
            >
              {language === 'KR' ? '비즈니스 협력' : 'INQUIRY'}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 fade-only opacity-10 hidden md:block z-10" style={{ transitionDelay: '0.5s' }}>
        <div className="mono text-[8px] tracking-[0.8em] uppercase text-white mb-3">SYSTEM SPECIFICATIONS</div>
        <div className="flex space-x-12 text-[8px] font-bold tracking-widest text-white/40">
          <span className="flex items-center"><span className="w-1 h-1 bg-[#FF003C] mr-2"></span>KC CERTIFIED</span>
          <span className="flex items-center"><span className="w-1 h-1 bg-[#FF003C] mr-2"></span>SENSING_ACCURACY_99.9%</span>
          <span className="flex items-center"><span className="w-1 h-1 bg-[#FF003C] mr-2"></span>REVENUE_ENGINE_V2.5</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
