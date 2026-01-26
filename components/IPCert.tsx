
import React, { useEffect, useRef } from 'react';
import { CERTIFICATIONS } from '../constants';
import { Language } from '../types';

interface IPCertProps { 
  language: Language; 
  customPatent: string | null;
  onPatentUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PatentCertificate: React.FC<{ 
  customPatent: string | null; 
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ customPatent, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[1/1.414] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] border border-slate-200 p-2 overflow-hidden group">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onUpload} 
        className="hidden" 
        accept="image/*"
      />
      
      <div 
        className="relative w-full h-full bg-[#FCFCFC] overflow-hidden flex flex-col cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {customPatent ? (
          <div className="relative w-full h-full">
            <img 
              src={customPatent} 
              alt="Uploaded Patent" 
              className="w-full h-full object-contain" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
               <div className="bg-white/90 text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-2xl border border-black/10">
                 이미지 교체하기
               </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 group-hover:border-[#FF003C] transition-colors bg-slate-50/50">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-slate-400 group-hover:text-[#FF003C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-600 group-hover:text-[#FF003C] text-center leading-relaxed">
              직접 준비하신<br/>특허증 이미지를 업로드하세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const IPCert: React.FC<IPCertProps> = ({ language, customPatent, onPatentUpload }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
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
    <section id="ipcert" className="py-32 bg-slate-50 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <div className="reveal order-2 lg:order-1">
             <PatentCertificate customPatent={customPatent} onUpload={onPatentUpload} />
          </div>
          
          <div className="reveal order-1 lg:order-2">
            <h2 className="text-[11px] font-black text-[#FF003C] tracking-[0.4em] uppercase mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-[#FF003C] mr-4"></span>
              {language === 'KR' ? '지식재산권 및 기술 인증' : 'Intellectual Property'}
            </h2>
            <h3 className="text-5xl md:text-6xl font-black text-black tracking-tighter uppercase mb-8 leading-[0.95]">
              {language === 'KR' ? "특허로 증명된\n독보적 기술력" : "Verified By\nCore Patents"}
            </h3>
            <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed max-w-xl">
              {language === 'KR' 
                ? "CM스토리는 '복싱유희기구(제 10-2863896 호)'를 비롯한 핵심 하드웨어 기술을 국가 공인 특허로 보호받고 있습니다. 고객님의 신뢰를 위해 투명하게 기술력을 공개합니다." 
                : "CM Story's core hardware technologies, including 'Boxing Play Apparatus (No. 10-2863896)', are protected by official patents. We transparently demonstrate our technological prowess for your trust."}
            </p>
            
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="flex items-center space-x-6 p-4 bg-white border border-slate-200 group hover:border-black transition-all">
                  <div className="w-2 h-2 bg-[#FF003C]"></div>
                  <div>
                    <div className="text-xs font-black text-black uppercase tracking-tight">{cert.title}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cert.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {certCards.map((item, i) => (
            <div key={i} className="bg-white p-12 reveal" style={{ transitionDelay: `${(i + 3) * 0.1}s` }}>
              <div className="text-4xl font-black text-slate-100 mb-8 italic">{item.tag}</div>
              <h5 className="text-sm font-black uppercase tracking-widest mb-4">{item.title[language]}</h5>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IPCert;
