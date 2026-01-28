
import React, { useState } from 'react';
import { FAQS } from '../constants';
import { Language } from '../types';

interface FAQProps {
  language: Language;
}

const FAQ: React.FC<FAQProps> = ({ language }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section className="py-40 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="label-engineered mb-8">
            {language === 'KR' ? '자주 묻는 질문' : 'SUPPORT & FAQ'}
          </h2>
          <h3 className="text-5xl md:text-6xl font-[900] text-white tracking-tighter uppercase leading-none">
            {language === 'KR' ? '무엇을 도와드릴까요?' : 'HOW CAN WE HELP?'}
          </h3>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`glass rounded-[32px] overflow-hidden transition-all duration-500 border ${
                activeIndex === idx ? 'border-[#FF003C]/50 bg-white/[0.05]' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <button 
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center px-10 py-8 text-left transition-colors"
              >
                <div className="flex items-center space-x-6">
                  <span className={`text-[10px] font-black transition-colors ${activeIndex === idx ? 'text-[#FF003C]' : 'text-white/20'}`}>
                    Q{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className={`text-lg font-bold tracking-tight transition-colors ${activeIndex === idx ? 'text-white' : 'text-white/60'}`}>
                    {faq.question[language]}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                  activeIndex === idx ? 'bg-[#FF003C] border-[#FF003C] rotate-180' : 'border-white/10 text-white/30'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div className={`transition-all duration-700 ease-in-out ${activeIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-10 pb-10 pt-2">
                  <div className="w-full h-[1px] bg-white/5 mb-8"></div>
                  <p className="text-white/40 text-lg leading-relaxed font-medium tracking-tight border-l-2 border-[#FF003C]/30 pl-8">
                    {faq.answer[language]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
