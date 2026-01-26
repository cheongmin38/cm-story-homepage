
import React from 'react';
import { HERO_CONTENT } from '../constants';
import { Language } from '../types';

interface HeroProps { language: Language; }

const Hero: React.FC<HeroProps> = ({ language }) => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 bg-black overflow-hidden"
    >
      {/* 고정된 위치에서 부드럽게 박동하는 배경 글로우 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[800px] pointer-events-none z-0">
        <div 
          className="w-full h-full animate-glow-pulse opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 60, 0.4) 0%, rgba(255, 0, 60, 0.1) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        ></div>
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        .animate-glow-pulse {
          animation: glowPulse 6s ease-in-out infinite;
        }
      `}</style>

      {/* 정적인 배경 장식 요소 */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-5xl px-6">
        <div className="inline-block mb-8 py-2 px-4 rounded-full glass border border-white/10">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF003C]">
             {language === 'KR' ? '혁신적인 스포츠 기술력' : 'Premium Sports Technology'}
           </span>
        </div>
        
        <h1 className="text-xl md:text-[2.33rem] font-black leading-tight tracking-tighter uppercase mb-12 text-gradient">
          {HERO_CONTENT.title[language].split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h1>
        
        <p className="text-base md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light mb-16">
          {HERO_CONTENT.subtitle[language]}
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-[#FF003C] hover:text-white transition-all duration-500 rounded-full shadow-2xl"
          >
            {language === 'KR' ? '기술 혁신 살펴보기' : 'Explore Innovations'}
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-5 glass text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-500 rounded-full"
          >
            {language === 'KR' ? '비즈니스 파트너십' : 'Partner with Us'}
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30 pointer-events-none">
        <div className="text-[9px] font-bold uppercase tracking-[0.4em] mb-4">
          {language === 'KR' ? '더 알아보기' : 'Discover More'}
        </div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
