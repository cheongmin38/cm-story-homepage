
import React from 'react';
import { BUSINESS_MODELS } from '../constants';
import { Language } from '../types';

interface SolutionsProps { language: Language; }

const Solutions: React.FC<SolutionsProps> = ({ language }) => {
  return (
    <section id="solutions" className="py-40 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-32">
          <h2 className="text-[11px] font-black text-[#FF003C] tracking-[0.5em] uppercase mb-8">
            {language === 'KR' ? '비즈니스 생태계' : 'Ecosystem'}
          </h2>
          <h3 className="text-6xl md:text-7xl font-black tracking-tighter text-gradient leading-tight">
             {language === 'KR' ? "수익과 플랫폼의\n완벽한 만남." : "Profit Meets\nPlatform."}
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BUSINESS_MODELS.map((model, idx) => (
            <div key={idx} className="bento-card p-12 rounded-[40px] flex flex-col justify-between group">
              <div>
                <div className="text-[10px] font-black text-[#FF003C] mb-8 uppercase tracking-widest">
                  {language === 'KR' ? `모델 0${idx + 1}` : `Model 0${idx + 1}`}
                </div>
                <h4 className="text-2xl font-black mb-6 uppercase leading-tight">{model.title[language]}</h4>
                <p className="text-white/40 text-sm leading-relaxed font-medium">
                  {model.desc[language]}
                </p>
              </div>
              <div className="mt-12 w-8 h-[2px] bg-white/10 group-hover:bg-[#FF003C] group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>

        <div className="mt-20 glass rounded-[60px] p-20 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FF003C] opacity-[0.03] blur-[100px] pointer-events-none"></div>
          <div className="max-w-2xl">
            <h4 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">
              {language === 'KR' ? "비즈니스 컨설팅" : "Global Consulting"}
            </h4>
            <p className="text-white/40 text-lg leading-relaxed font-light">
              {language === 'KR' 
                ? "단순 제조를 넘어, 설치부터 운영까지 CM스토리만의 전문적인 파트너십을 제공합니다." 
                : "Beyond manufacturing, we provide professional partnerships from installation to operation."}
            </p>
          </div>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-16 py-8 bg-[#FF003C] text-white font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform rounded-full shadow-[0_20px_40px_rgba(255,0,60,0.3)]"
          >
            {language === 'KR' ? '전략 상담 신청' : 'Request Strategy'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
