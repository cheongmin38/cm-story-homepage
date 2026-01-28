
import React, { useState, useEffect, useRef } from 'react';
import { Language, Page } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Company from './components/Company';
import Products from './components/Products';
import Solutions from './components/Solutions';
import Notice from './components/Notice';
import IPCert from './components/IPCert';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { saveToDB, getFromDB } from './db';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('KR');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const philosophyRef = useRef<HTMLElement>(null);

  // States for images
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [customPatent, setCustomPatent] = useState<string | null>(null);
  const [customBoxingImage, setCustomBoxingImage] = useState<string | null>(null);
  const [customFootballImage, setCustomFootballImage] = useState<string | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Reveal Animation Effect (Fade-only to avoid movement)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-only').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [currentPage]);

  // Persistent Data Loading
  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const [logo, patent, boxing, football] = await Promise.all([
          getFromDB('logo'),
          getFromDB('patent'),
          getFromDB('boxing'),
          getFromDB('football')
        ]);
        
        if (logo) setCustomLogo(logo);
        if (patent) setCustomPatent(patent);
        if (boxing) setCustomBoxingImage(boxing);
        if (football) setCustomFootballImage(football);
      } catch (err) {
        console.error("Failed to load data from IndexedDB:", err);
      }
    };
    loadPersistedData();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setCustomLogo(base64);
        await saveToDB('logo', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenericUpload = async (file: File, key: string, setter: (val: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setter(base64);
      await saveToDB(key, base64);
    };
    reader.readAsDataURL(file);
  };

  const renderContent = () => {
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
                    
                    <h3 className="heading-premium text-sm md:text-base text-white/90 leading-relaxed tracking-widest mb-10">
                      {language === 'KR' 
                        ? "CM STORY는 스포츠를 단순한 운동이 아닌 ‘참여형 콘텐츠’로 재정의하는 기업입니다.\n우리는 실제 타격, 실제 플레이, 실제 경쟁이 일어나는 현장 중심의 스포츠 경험을 기술과 데이터로 연결하여 지속 가능한 플랫폼으로 발전시키고 있습니다." 
                        : "CM STORY redefines sports not just as exercise, but as 'interactive content.' We connect field-based sports experiences—where real striking, real play, and real competition occur—with technology and data to develop them into sustainable platforms."}
                    </h3>

                    <div className="space-y-4 mb-10">
                      <div className="flex items-center space-x-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF003C]"></div>
                        <p className="text-[11px] font-bold text-white/60 tracking-wider">
                          {language === 'KR' ? '현장에서 바로 수익이 발생하는 스포츠 하드웨어' : 'Sports hardware generating immediate revenue on-site'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF003C]"></div>
                        <p className="text-[11px] font-bold text-white/60 tracking-wider">
                          {language === 'KR' ? '사람과 팀을 연결하는 스포츠 매칭 플랫폼' : 'Sports matching platforms connecting people and teams'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 fade-only" style={{ transitionDelay: '0.3s' }}>
                    <div className="border-l border-white/10 pl-10 space-y-8">
                      <p className="text-[10px] md:text-[11px] text-white/30 leading-loose font-medium tracking-wider">
                        {language === 'KR' 
                          ? "이 두 축이 만나 하나의 생태계를 구성합니다. CM스토리는 장비 제조를 넘어 비즈니스의 정점에 도달할 수 있는 솔루션을 제공합니다."
                          : "These two pillars meet to form a single ecosystem. CM Story provides solutions to reach the peak of business beyond equipment manufacturing."}
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
        return (
          <Products 
            language={language} 
            customBoxingImage={customBoxingImage}
            customFootballImage={customFootballImage}
            onBoxingUpload={(e) => e.target.files?.[0] && handleGenericUpload(e.target.files[0], 'boxing', setCustomBoxingImage)}
            onFootballUpload={(e) => e.target.files?.[0] && handleGenericUpload(e.target.files[0], 'football', setCustomFootballImage)}
          />
        );
      case 'solutions':
        return <Solutions language={language} onNavigate={setCurrentPage} />;
      case 'notice':
        return <Notice language={language} />;
      case 'ipcert':
        return (
          <IPCert 
            language={language} 
            customPatent={customPatent} 
            onPatentUpload={(e) => e.target.files?.[0] && handleGenericUpload(e.target.files[0], 'patent', setCustomPatent)}
          />
        );
      case 'contact':
        return <Contact language={language} />;
      default:
        return <Hero language={language} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="antialiased font-sans relative min-h-screen bg-black">
      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        customLogo={customLogo} 
        onLogoUpload={handleLogoUpload}
      />
      
      <main>
        {renderContent()}
      </main>

      <Footer 
        language={language} 
        customLogo={customLogo} 
        onNavigate={setCurrentPage}
      />
    </div>
  );
};

export default App;
