
import React, { useEffect, useRef, useState } from 'react';
import { CERTIFICATIONS, ASSET_PATHS } from '../constants';
import { Language } from '../types';

const IPCert: React.FC<{ language: Language }> = ({ language }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [patentError, setPatentError] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('active'));
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const certCards = [
    { tag: 'KC', title: { KR: '국가통합인증', EN: 'KC Certification' }, desc: { KR: '모든 게임 기기에 대해 전자파 안전 및 전기안전 인증을 완료했습니다.', EN: 'Safety and electromagnetic compatibility verified for all gaming devices.' } },
    { tag: 'GR', title: { KR: '게임물 등급심의', EN: 'Game Rating' }, desc: { KR: '적법한 운영을 위한 게임물 관리위원회의 등급 분류 시나리오를 준수합니다.', EN: 'Appropriate classification scenarios prepared for legal arcade operation.' } },
    { tag: 'PAT', title: { KR: '원천 기술 특허', EN: 'Technology Patent' }, desc: { KR: '인터랙티브 타격 메커니즘 및 데이터 처리 방식에 대한 독점적 권리를 보유합니다.', EN: 'Exclusive rights for interactive striking mechanisms and data processing.' } }
  ];

  return (
    <section id="ipcert" className="py-40 bg-black overflow-hidden border-t border-white/5" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <div className="reveal order-2 lg:order-1 flex justify-center">
             <div className="relative w-full max-w-md mx-auto aspect-[1/1.414] bg-[#050505] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 p-2 overflow-hidden flex flex-col justify-center items-center rounded-xl group">
                <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
                {!patentError ? (
                  <img 
                    src={ASSET_PATHS.patent_certificate} 
                    className="w-full h-full object-contain p-4" 
                    alt="Patent Certificate"
                    onError={() => setPatentError(true)}
                  />
                ) : (
                  <div className="text-center p-8 flex flex-col items-center opacity-30">
                    <div className="w-20 h-20 border border-dashed border-white/20 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">
                      PATENT_ASSET_PENDING
                    </p>
                    <p className="mt-4 text-[8px] font-bold text-white/20 uppercase tracking-widest">
                      Path: {ASSET_PATHS.patent_certificate}
                    </p>
                  </div>
                )}
                <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md border border-white/5 p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#FF003C]"></div>
                    <span className="text-[8px] font-black tracking-widest text-white/60 uppercase">CERTIFIED_STABLE_DOCUMENT</span>
                  </div>
                </div>
             </div>
          </div>
          <div className="reveal order-1 lg:order-2">
            <h2 className="label-engineered mb-8">
              {language === 'KR' ? '지식재산권 및 기술 인증' : 'Intellectual Property'}
            </h2>
            <h3 className="text-5xl md:text-7xl font-[900] text-white tracking-[-0.05em] uppercase mb-12 leading-[0.9]">
              {language === 'KR' ? "특허로 증명된\n독보적 기술력" : "Verified By\nCore Patents"}
            </h3>
            <div className="max-w-xl border-l-2 border-[#FF003C] pl-10 mb-16">
              <p className="text-xl text-white/40 font-medium leading-relaxed tracking-tight whitespace-pre-line">
                {language === 'KR' 
                  ? "복싱유희기구 핵심 기술을 특허로 보호합니다.\n국가 공인 특허로 원천 기술을 증명합니다.\n모방할 수 없는 기술력으로 신뢰를 쌓습니다.\n우리는 당신의 가장 강력한 비즈니스 파트너입니다." 
                  : "Core technologies are protected by patents.\nOriginal tech verified by official certification.\nUnstoppable innovation builds lasting trust.\nWe are your strongest business partner."}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="flex flex-col p-6 bg-white/[0.03] border border-white/5 group hover:border-[#FF003C]/50 transition-all rounded-2xl">
                  <div className="text-[10px] font-black text-[#FF003C] uppercase tracking-[0.3em] mb-2">{cert.title}</div>
                  <div className="text-sm font-bold text-white/60 tracking-tight">{cert.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {certCards.map((item, i) => (
            <div key={i} className="bg-white/[0.02] p-16 reveal border border-white/5 rounded-[48px] hover:bg-white/[0.04] transition-all group" style={{ transitionDelay: `${(i + 3) * 0.1}s` }}>
              <div className="text-5xl font-black text-white/[0.03] group-hover:text-[#FF003C]/10 mb-10 italic transition-colors leading-none">{item.tag}</div>
              <h5 className="text-[11px] font-black uppercase tracking-[0.4em] mb-6 text-[#FF003C]">{item.title[language]}</h5>
              <p className="text-sm text-white/40 leading-relaxed font-medium tracking-tight">{item.desc[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IPCert;
