
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
      {/* 자동으로 일정하게 박동하는 프리미엄 배경 글로우 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] pointer-events-none z-0">
        <div 
          className="w-full h-full animate-glow-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 60, 0.3) 0%, rgba(255, 0, 60, 0.05) 45%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        ></div>
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.1); }
        }
        .animate-glow-pulse {
          animation: glowPulse 8s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF003C] opacity-[0.03] blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF003C] opacity-[0.02] blur-[120px] rounded-full"></div>
      </div>
      
      {/* 텍스트는 이제 움직이지 않고 고정되어 가독성을 높임 */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        <div className="inline-block mb-8 py-2 px-4 rounded-full glass border border-white/10 animate-fade-in">
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
            className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-[#FF003C] hover:text-white transition-all duration-500 rounded-full shadow-lg"
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
