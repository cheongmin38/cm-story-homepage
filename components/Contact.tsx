
import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../constants';
import { Language } from '../types';

interface ContactProps { language: Language; }

const Contact: React.FC<ContactProps> = ({ language }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('active'));
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => { setFormStatus('success'); setTimeout(() => setFormStatus('idle'), 3000); }, 1500);
  };

  const contactTypes = [{ KR: "제품 도입/설치", EN: "Installation" }, { KR: "운영/정산", EN: "Operation" }, { KR: "광고/콘텐츠", EN: "Ad/Content" }, { KR: "파트너십/제조", EN: "Partnership" }, { KR: "기타", EN: "Other" }];

  return (
    <section id="contact" className="py-32 bg-[#0A0A0A] text-white overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-5 reveal">
            <h2 className="text-[11px] font-black text-[#FF003C] tracking-[0.4em] uppercase mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-[#FF003C] mr-4"></span>
              {language === 'KR' ? '문의하기' : 'Connect'}
            </h2>
            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-12">
              {language === 'KR' ? "비즈니스의\n새로운 진화" : "Start the Next\nEvolution"}
            </h3>
            
            <div className="space-y-12">
              {[
                { label: language === 'KR' ? '주소' : 'Address', value: COMPANY_INFO.address, icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
                { label: language === 'KR' ? '대표 번호' : 'Phone', value: COMPANY_INFO.phone, icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                { label: language === 'KR' ? '이메일' : 'Email', value: COMPANY_INFO.email, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
              ].map((item, i) => (
                <div key={i} className="group">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">{item.label}</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:bg-[#FF003C] group-hover:border-[#FF003C] transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                    </div>
                    <p className="text-xl font-black tracking-tight">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 reveal" style={{ transitionDelay: '0.2s' }}>
             <form onSubmit={handleSubmit} className="bg-[#111111] p-12 border border-white/5 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="border-b border-white/10 focus-within:border-[#FF003C] transition-colors pb-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{language === 'KR' ? '성함' : 'Full Name'}</label>
                    <input required type="text" className="w-full bg-transparent text-xl font-bold focus:outline-none" />
                  </div>
                  <div className="border-b border-white/10 focus-within:border-[#FF003C] transition-colors pb-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{language === 'KR' ? '연락처' : 'Contact Number'}</label>
                    <input required type="tel" className="w-full bg-transparent text-xl font-bold focus:outline-none" />
                  </div>
                </div>
                <div className="border-b border-white/10 focus-within:border-[#FF003C] transition-colors pb-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                    {language === 'KR' ? '이메일 주소' : 'E-mail Address'}
                  </label>
                  <input required type="email" className="w-full bg-transparent text-xl font-bold focus:outline-none" />
                </div>
                <div className="border-b border-white/10 focus-within:border-[#FF003C] transition-colors pb-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{language === 'KR' ? '문의 분야' : 'Project Category'}</label>
                  <select className="w-full bg-transparent text-xl font-bold focus:outline-none appearance-none cursor-pointer">
                    {contactTypes.map((type, i) => <option key={i} className="bg-black">{type[language]}</option>)}
                  </select>
                </div>
                <div className="border-b border-white/10 focus-within:border-[#FF003C] transition-colors pb-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{language === 'KR' ? '문의 상세 내용' : 'Brief Details'}</label>
                  <textarea rows={3} className="w-full bg-transparent text-xl font-bold focus:outline-none resize-none" />
                </div>
                
                <div className="flex items-center space-x-3 pt-4">
                  <input required type="checkbox" id="privacy" className="w-4 h-4 accent-[#FF003C]" />
                  <label htmlFor="privacy" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {language === 'KR' ? '개인정보 수집 및 이용에 동의합니다' : 'I agree to the privacy policy'}
                  </label>
                </div>
                
                <button 
                  disabled={formStatus === 'submitting'}
                  className={`w-full py-6 font-black uppercase tracking-[0.4em] text-xs transition-all border ${
                    formStatus === 'success' 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'bg-black text-white border-[#FF003C]/50 hover:bg-[#FF003C] hover:border-[#FF003C]'
                  }`}
                >
                  {formStatus === 'submitting' ? (language === 'KR' ? '처리 중...' : 'Processing...') : formStatus === 'success' ? (language === 'KR' ? '전송 완료' : 'Request Sent') : (language === 'KR' ? '상담 신청하기' : 'Execute Inquiry')}
                </button>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
