
import React from 'react';
import { BUSINESS_MODELS } from '../constants';
import { Language, Page } from '../types';

interface SolutionsProps { 
  language: Language; 
  onNavigate: (page: Page) => void;
}

const Solutions: React.FC<SolutionsProps> = ({ language, onNavigate }) => {
  return (
    <section id="solutions" className="py-40 bg-black min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-32">
          <h2 className="label-engineered mb-8">
            {language === 'KR' ? '비즈니스 생태계' : 'BUSINESS ECOSYSTEM'}
          </h2>
          <h3 className="text-5xl md:text-[5.5rem] font-[900] tracking-[-0.04em] text-gradient leading-[1] uppercase">
             {language === 'KR' ? "수익과 플랫폼의\n완벽한 만남." : "PROFIT MEETS\nPLATFORM."}
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUSINESS_MODELS.map((model, idx) => (
            <div key={idx} className="bento-card p-14 rounded-[48px] flex flex-col justify-between group">
              <div>
                <div className="text-[11px] font-black text-[#FF003C]/60 mb-10 uppercase tracking-[0.4em]">
                  {language === 'KR' ? `모델 0${idx + 1}` : `MODEL 0${idx + 1}`}
                </div>
                <h4 className="text-2xl font-[900] mb-8 uppercase leading-tight tracking-tight text-white/90 group-hover:text-white transition-colors">
                  {model.title[language]}
                </h4>
                <p className="text-white/40 text-[15px] leading-relaxed font-medium tracking-tight whitespace-pre-line">
                  {model.desc[language]}
                </p>
              </div>
              <div className="mt-14 w-12 h-[3px] bg-white/5 group-hover:bg-[#FF003C] group-hover:w-full transition-all duration-1000 ease-in-out"></div>
            </div>
          ))}
        </div>

        <div className="mt-32 glass rounded-[80px] p-24 flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FF003C] opacity-[0.05] blur-[120px] pointer-events-none"></div>
          <div className="max-w-2xl">
            <h4 className="text-4xl md:text-6xl font-[900] mb-10 uppercase tracking-[-0.03em] leading-none">
              {language === 'KR' ? "비즈니스\n컨설팅" : "STRATEGY\nCONSULTING"}
            </h4>
            <p className="text-white/40 text-xl leading-relaxed font-medium tracking-tight whitespace-pre-line">
              {language === 'KR' 
                ? "단순 제조를 넘어선 솔루션을 제공합니다.\n설치부터 운영까지 파트너십을 보장합니다.\nCM스토리만의 전문적인 가이드를 경험하세요." 
                : "We provide solutions beyond manufacturing.\nWe guarantee partnership from start to finish.\nExperience CM Story's professional guidance."}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('contact')}
            className="px-20 py-10 bg-black text-white border border-[#FF003C]/60 font-black uppercase tracking-[0.4em] text-[12px] hover:bg-[#FF003C] hover:scale-105 transition-all rounded-full shadow-[0_20px_50px_rgba(255,0,60,0.2)]"
          >
            {language === 'KR' ? '전략 상담 신청' : 'REQUEST STRATEGY'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
