
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Company from './components/Company';
import Products from './components/Products';
import Solutions from './components/Solutions';
import IPCert from './components/IPCert';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { GoogleGenAI } from "@google/genai";
import { saveToDB, getFromDB } from './db';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('KR');
  const [isProcessing, setIsProcessing] = useState(false);

  // States for images
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [customPatent, setCustomPatent] = useState<string | null>(null);
  const [customBoxingImage, setCustomBoxingImage] = useState<string | null>(null);
  const [customFootballImage, setCustomFootballImage] = useState<string | null>(null);

  // Vercel deployment safety: Check if process and process.env exist before accessing
  const getApiKey = (): string => {
    try {
      if (typeof window !== 'undefined' && (window as any).process?.env?.API_KEY) {
        return (window as any).process.env.API_KEY;
      }
      if (typeof process !== 'undefined' && process.env?.API_KEY) {
        return process.env.API_KEY;
      }
    } catch (e) {
      console.warn("Could not access process.env.API_KEY");
    }
    return '';
  };

  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const logo = await getFromDB('logo');
        const patent = await getFromDB('patent');
        const boxing = await getFromDB('boxing');
        const football = await getFromDB('football');
        
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

  const processLogoWithAI = async (base64: string): Promise<string> => {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn("API_KEY is not set in Environment Variables. AI processing skipped.");
      return base64;
    }

    try {
      setIsProcessing(true);
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `
        CRITICAL TASK: BACKGROUND REMOVAL & LOGO ISOLATION
        1. Extract the main logo symbol and the brand name text "CM STORY" or "씨엠스토리".
        2. Remove 100% of all background pixels. 
        3. The resulting image MUST have an ALPHA CHANNEL with 100% transparency.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64.split(',')[1], mimeType: 'image/png' } },
            { text: prompt }
          ]
        }
      });

      let processedBase64 = base64;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            processedBase64 = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }
      return processedBase64;
    } catch (error) {
      console.error("AI Logo Refining Error:", error);
      return base64; 
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const originalBase64 = reader.result as string;
        const cleanedLogo = await processLogoWithAI(originalBase64);
        setCustomLogo(cleanedLogo);
        await saveToDB('logo', cleanedLogo);
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

  return (
    <div className="antialiased font-sans relative">
      {isProcessing && (
        <div className="fixed inset-0 z-[999] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center text-white text-center px-6">
          <div className="w-24 h-24 border-t-4 border-r-4 border-[#FF003C] rounded-full animate-spin mb-10 shadow-[0_0_80px_rgba(255,0,60,0.7)]"></div>
          <h2 className="text-3xl font-black uppercase tracking-[0.4em] mb-4 animate-pulse">AI 배경 제거 중</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Vercel 환경 변수에 API_KEY가 설정되어 있어야 합니다.</p>
        </div>
      )}

      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        customLogo={customLogo} 
        onLogoUpload={handleLogoUpload}
      />
      
      <main>
        <Hero language={language} />
        <Company language={language} />
        <Products 
          language={language} 
          customBoxingImage={customBoxingImage}
          customFootballImage={customFootballImage}
          onBoxingUpload={(e) => e.target.files?.[0] && handleGenericUpload(e.target.files[0], 'boxing', setCustomBoxingImage)}
          onFootballUpload={(e) => e.target.files?.[0] && handleGenericUpload(e.target.files[0], 'football', setCustomFootballImage)}
        />
        <Solutions language={language} />
        <IPCert 
          language={language} 
          customPatent={customPatent} 
          onPatentUpload={(e) => e.target.files?.[0] && handleGenericUpload(e.target.files[0], 'patent', setCustomPatent)}
        />
        <FAQ language={language} />
        <Contact language={language} />
      </main>

      <Footer language={language} customLogo={customLogo} />
    </div>
  );
};

export default App;
