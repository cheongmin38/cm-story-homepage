
import React, { useEffect, useRef } from 'react';
import { COMPANY_DETAILS } from '../constants';
import { Language } from '../types';

interface CompanyProps {
  language: Language;
}

const Company: React.FC<CompanyProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null);

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

    const reveals = containerRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    { title: { KR: "연구개발", EN: "R&D" }, desc: { KR: "핵심 기술 설계", EN: "Tech Design" } },
    { title: { KR: "시제품", EN: "Prototype" }, desc: { KR: "현장 피드백", EN: "Feedback" } },
    { title: { KR: "인증", EN: "Cert" }, desc: { KR: "KC/심의 대응", EN: "Compliance" } },
    { title: { KR: "양산", EN: "Production" }, desc: { KR: "최적 공정", EN: "Manufacturing" } },
    { title: { KR: "운영", EN: "Operation" }, desc: { KR: "수익 관리", EN: "Revenue" } },
  ];

  return (
    <section id="company" className="py-32 bg-white overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-6 reveal">
            <h2 className="text-[11px] font-black text-[#FF003C] tracking-[0.4em] uppercase mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-[#FF003C] mr-4"></span>
              The Origin
            </h2>
            <h3 className="text-5xl md:text-6xl font-black text-black leading-[1.1] tracking-tighter mb-10 uppercase">
              {language === 'KR' ? "제조 그 이상의\n가치를 설계하다" : "Engineering Value\nBeyond Tools"}
            </h3>
            <div className="w-full aspect-video bg-[#0A0A0A] overflow-hidden group mb-10">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 transition-transform duration-1000"
                alt="Factory"
              />
            </div>
          </div>
          
          <div className="md:col-span-6 md:pt-24 reveal" style={{ transitionDelay: '0.2s' }}>
            <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12 border-l-4 border-black pl-8">
              {COMPANY_DETAILS.description[language]}
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              {steps.map((step, idx) => (
                <div key={idx} className="group flex items-center justify-between p-6 border border-slate-100 hover:border-black transition-all hover:translate-x-4 cursor-default">
                  <div className="flex items-center space-x-6">
                    <span className="text-sm font-black text-slate-300 group-hover:text-[#FF003C] transition-colors">0{idx + 1}</span>
                    <span className="text-lg font-black uppercase tracking-tight">{step.title[language]}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    {step.desc[language]}
                  </span>
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
