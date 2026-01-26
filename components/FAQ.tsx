
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
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase">FAQ</h3>
          <p className="text-slate-500">
            {language === 'KR' ? '도입 전 궁금하신 사항들을 확인해 보세요.' : 'Commonly asked questions.'}
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden transition-all">
              <button 
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center px-6 py-5 bg-white hover:bg-slate-50 transition-colors text-left"
              >
                <span className="font-bold text-slate-800 pr-4">{faq.question[language]}</span>
                <svg 
                  className={`w-5 h-5 text-slate-400 transition-transform ${activeIndex === idx ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${activeIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 py-5 bg-slate-50 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                  {faq.answer[language]}
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
