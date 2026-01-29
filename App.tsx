
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Language, Page } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

// 대형 컴포넌트들을 지연 로딩(Lazy Loading)으로 전환
const Company = lazy(() => import('./components/Company'));
const Products = lazy(() => import('./components/Products'));
const Solutions = lazy(() => import('./components/Solutions'));
const Notice = lazy(() => import('./components/Notice'));
const IPCert = lazy(() => import('./components/IPCert'));
const Contact = lazy(() => import('./components/Contact'));
const AIAnalyzer = lazy(() => import('./components/AIAnalyzer'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#FF003C] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('KR');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const philosophyRef = useRef<HTMLElement>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Reveal Animation Effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-only').forEach(el => observer.observe(el));
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [currentPage]);

  const renderContent = () => {
    return (
      <Suspense fallback={<LoadingFallback />}>
        {(() => {
          switch (currentPage) {
            case 'home':
              return (
                <>
                  <Hero language={language} onNavigate={setCurrentPage} />
                  
                  <section ref={philosophyRef} className="py-24 md:py-32 bg-black border-y border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-5 pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-6">
                      <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
                        <div className="lg:col-span-7 fade-only">
                          <div className="flex items-center space-x-4 mb-6">
                            <span className="w-8 h-[1px] bg-[#FF003C]"></span>
                            <h2 className="mono text-[9px] font-black text-[#FF003C] tracking-[0.5em] uppercase">
                              {language === 'KR' ? 'CM STORY는 무엇을 만드는 회사인가?' : 'WHAT DOES CM STORY CREATE?'}
                            </h2>
                          </div>
                          
                          <h3 className="heading-premium text-sm md:text-base text-white/90 leading-relaxed tracking-widest mb-10 whitespace-pre-line">
                            {language === 'KR' 
                              ? "CM STORY는 스포츠를 '참여형 콘텐츠'로 재정의합니다.\n실제 타격과 플레이가 일어나는 현장에 집중합니다.\n기술과 데이터로 스포츠 경험을 연결합니다.\n지속 가능한 비즈니스 생태계를 구축합니다." 
                              : "CM STORY redefines sports as 'interactive content.'\nWe focus on the field where real action happens.\nWe connect experiences through tech and data.\nWe build a sustainable business ecosystem."}
                          </h3>

                          <div className="space-y-4 mb-10">
                            <div className="flex items-center space-x-4">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FF003C]"></div>
                              <p className="text-[11px] font-bold text-white/60 tracking-wider">
                                {language === 'KR' ? '현장에서 수익이 발생하는 스포츠 하드웨어' : 'Hardware generating revenue on-site'}
                              </p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FF003C]"></div>
                              <p className="text-[11px] font-bold text-white/60 tracking-wider">
                                {language === 'KR' ? '사람과 팀을 연결하는 매칭 플랫폼' : 'Matching platforms connecting athletes'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-5 fade-only" style={{ transitionDelay: '0.3s' }}>
                          <div className="border-l border-white/10 pl-10 space-y-8">
                            <p className="text-[10px] md:text-[11px] text-white/30 leading-loose font-medium tracking-wider">
                              {language === 'KR' 
                                ? "두 축이 만나 하나의 생태계를 구성합니다.\n장비 제조를 넘어 비즈니스 솔루션을 제공합니다."
                                : "Two pillars form a single ecosystem.\nWe provide solutions beyond manufacturing."}
                            </p>
                            <button 
                              onClick={() => setCurrentPage('company')}
                              className="group flex items-center space-x-4 text-white/40 hover:text-[#FF003C] transition-colors"
                            >
                              <span className="mono text-[8px] font-black tracking-[0.4em] uppercase transition-colors">
                                {language === 'KR' ? '회사소개' : 'VIEW_ORIGIN'}
                              </span>
                              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FF003C] group-hover:border-[#FF003C] transition-all">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              );
            case 'company':
              return <Company language={language} />;
            case 'products':
              return <Products language={language} />;
            case 'solutions':
              return <Solutions language={language} onNavigate={setCurrentPage} />;
            case 'notice':
              return <Notice language={language} />;
            case 'ipcert':
              return <IPCert language={language} />;
            case 'contact':
              return <Contact language={language} />;
            default:
              return <Hero language={language} onNavigate={setCurrentPage} />;
          }
        })()}
      </Suspense>
    );
  };

  return (
    <div className="antialiased font-sans relative min-h-screen bg-black">
      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <main>
        {renderContent()}
      </main>

      <Footer 
        language={language} 
        onNavigate={setCurrentPage}
        customLogo={null}
      />
    </div>
  );
};

export default App;
