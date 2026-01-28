
import React, { useEffect, useRef } from 'react';
import { NOTICES } from '../constants';
import { Language } from '../types';

interface NoticeProps {
  language: Language;
}

const Notice: React.FC<NoticeProps> = ({ language }) => {
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

    const reveals = containerRef.current?.querySelectorAll('.reveal-list');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="notice" className="py-40 bg-[#050505] overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <h2 className="text-[11px] font-black text-[#FF003C] tracking-[0.5em] uppercase mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-[#FF003C] mr-4"></span>
              {language === 'KR' ? '최신 소식' : 'Latest Updates'}
            </h2>
            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
              {language === 'KR' ? "CM스토리의\n진행형 기록" : "The Ongoing\nRecords"}
            </h3>
          </div>
          <button className="px-8 py-4 glass text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-full">
            {language === 'KR' ? '전체 보기' : 'View All'}
          </button>
        </div>

        <div className="space-y-4">
          <style>{`
            .reveal-list {
              opacity: 0;
              transform: translateX(-30px);
              transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .reveal-list.active {
              opacity: 1;
              transform: translateX(0);
            }
          `}</style>
          
          {NOTICES.map((notice, idx) => (
            <div 
              key={notice.id} 
              className="reveal-list group relative flex flex-col md:flex-row md:items-center justify-between p-8 md:p-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer rounded-2xl"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 flex-grow">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-white/30 tracking-widest uppercase w-20">
                    {notice.date}
                  </span>
                  <span className={`px-3 py-1 text-[9px] font-black tracking-widest rounded-full border ${
                    notice.isNew ? 'border-[#FF003C] text-[#FF003C]' : 'border-white/10 text-white/40'
                  }`}>
                    {notice.category[language]}
                  </span>
                </div>
                
                <h4 className="text-lg md:text-xl font-bold text-white/80 group-hover:text-white transition-colors">
                  {notice.title[language]}
                  {notice.isNew && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF003C] ml-3 mb-1 animate-pulse"></span>}
                </h4>
              </div>

              <div className="mt-6 md:mt-0 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                <svg className="w-6 h-6 text-[#FF003C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Notice;
