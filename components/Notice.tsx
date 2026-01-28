
import React, { useEffect, useRef, useState } from 'react';
import { NOTICES } from '../constants';
import { Language } from '../types';

interface NoticeProps {
  language: Language;
}

const Notice: React.FC<NoticeProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Derive categories from data
  const categories = ['ALL', ...new Set(NOTICES.map(n => n.category[language].toUpperCase()))];

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
  }, [searchQuery, selectedCategory]); 

  const filteredNotices = NOTICES.filter((notice) => {
    const query = searchQuery.toLowerCase();
    const title = notice.title[language].toLowerCase();
    const categoryName = notice.category[language].toLowerCase();
    
    const matchesQuery = title.includes(query) || categoryName.includes(query);
    const matchesCategory = selectedCategory === 'ALL' || notice.category[language].toUpperCase() === selectedCategory;
    
    return matchesQuery && matchesCategory;
  });

  return (
    <section id="notice" className="py-40 bg-[#050505] overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <h2 className="label-engineered mb-8">
              {language === 'KR' ? '최신 소식' : 'LATEST UPDATES'}
            </h2>
            <h3 className="text-5xl md:text-7xl font-[900] text-white tracking-tighter uppercase leading-none">
              {language === 'KR' ? "CM스토리의\n진행형 기록" : "THE ONGOING\nRECORDS"}
            </h3>
          </div>
        </div>

        {/* Filters Area */}
        <div className="mb-20 space-y-10 reveal-list">
          {/* Search Bar - Industrial Glass Style */}
          <div className="relative group max-w-2xl">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'KR' ? "검색어를 입력하세요 (제목, 카테고리)" : "SEARCH BY TITLE OR CATEGORY..."}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-sm font-bold tracking-tight text-white focus:outline-none focus:border-[#FF003C]/50 focus:bg-white/[0.05] transition-all placeholder:text-white/10"
            />
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20 group-focus-within:text-[#FF003C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Chips - Refined UI */}
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-[#FF003C] border-[#FF003C] text-white shadow-[0_10px_30px_rgba(255,0,60,0.3)]' 
                    : 'bg-white/[0.03] border-white/5 text-white/40 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
          
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice, idx) => (
              <div 
                key={notice.id} 
                className="reveal-list group relative flex flex-col md:flex-row md:items-center justify-between p-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#FF003C]/30 transition-all cursor-pointer rounded-[32px]"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 flex-grow">
                  <div className="flex items-center gap-6">
                    <span className="text-[11px] font-black text-white/20 tracking-[0.2em] uppercase w-24">
                      {notice.date}
                    </span>
                    <span className={`px-4 py-1.5 text-[9px] font-black tracking-widest rounded-full border ${
                      notice.isNew ? 'bg-[#FF003C]/10 border-[#FF003C] text-[#FF003C]' : 'border-white/10 text-white/30'
                    }`}>
                      {notice.category[language]}
                    </span>
                  </div>
                  
                  <h4 className="text-xl md:text-2xl font-[800] text-white/70 group-hover:text-white transition-colors tracking-tight leading-tight">
                    {notice.title[language]}
                    {notice.isNew && <span className="inline-block w-2 h-2 rounded-full bg-[#FF003C] ml-4 mb-1 shadow-[0_0_10px_#FF003C] animate-pulse"></span>}
                  </h4>
                </div>

                <div className="mt-8 md:mt-0 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <div className="w-12 h-12 rounded-full bg-[#FF003C] flex items-center justify-center shadow-lg shadow-[#FF003C]/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-32 text-center border border-dashed border-white/10 rounded-[40px] bg-white/[0.01]">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-white/20 text-lg font-black uppercase tracking-[0.3em]">
                {language === 'KR' ? "검색 결과가 없습니다." : "NO RESULTS FOUND."}
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                className="mt-8 text-xs font-black text-[#FF003C] uppercase tracking-[0.4em] hover:text-white transition-colors"
              >
                {language === 'KR' ? '필터 초기화' : 'CLEAR ALL FILTERS'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Notice;
