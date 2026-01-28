
import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AIAnalyzerProps {
  language: Language;
}

const AIAnalyzer: React.FC<AIAnalyzerProps> = ({ language }) => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis('');
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setAnalysis('');

    try {
      // Create a new instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: (process.env.API_KEY as string) });
      const base64Data = image.split(',')[1];
      
      const prompt = language === 'KR' 
        ? "이 이미지(스포츠 장비, 로고 또는 제조 관련)를 정밀하게 분석해주세요. CM스토리의 기술적 관점에서 기기의 구조, 내구성, 디자인 아이덴티티 및 개선 가능한 기술적 통찰을 포함하여 상세히 설명해주세요."
        : "Please analyze this image (sports equipment, logo, or manufacturing related) precisely. Provide a detailed explanation from CM Story's technical perspective, including the device's structure, durability, design identity, and technical insights for improvement.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
            { text: prompt }
          ]
        }
      });

      setAnalysis(response.text || 'No analysis available.');
    } catch (error) {
      console.error("Analysis Error:", error);
      setAnalysis(language === 'KR' ? "분석 중 오류가 발생했습니다. 나중에 다시 시도해주세요." : "An error occurred during analysis. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-40 pb-20 bg-black overflow-hidden relative">
      {/* 배경 데코레이션 */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF003C]/10 blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-[11px] font-black text-[#FF003C] tracking-[0.5em] uppercase mb-6 flex items-center justify-center">
            <span className="w-8 h-[2px] bg-[#FF003C] mr-4"></span>
            {language === 'KR' ? '미래 기술 연구소' : 'AI TECHNOLOGY LAB'}
            <span className="w-8 h-[2px] bg-[#FF003C] ml-4"></span>
          </h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-tight">
            {language === 'KR' ? "비전 AI로 분석하는\n제조의 미래" : "Vision AI Analysis\nFuture of MFG"}
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 업로드 섹션 */}
          <div className="glass rounded-[40px] p-10 relative overflow-hidden group border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF003C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*" 
            />

            <div 
              className={`aspect-square rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden ${
                image ? 'border-white/20' : 'border-[#FF003C]/30 hover:border-[#FF003C]'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-xs font-black uppercase tracking-widest text-white">{language === 'KR' ? '사진 교체' : 'Replace Photo'}</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-12">
                  <div className="w-20 h-20 bg-[#FF003C]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-[#FF003C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-white/40 uppercase tracking-widest">
                    {language === 'KR' ? '분석할 이미지를 드래그하거나 클릭하세요' : 'Drag or click to upload image'}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={analyzeImage}
              disabled={!image || loading}
              className={`w-full mt-10 py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs transition-all flex items-center justify-center space-x-4 border ${
                image && !loading 
                  ? 'bg-black text-white border-[#FF003C]/50 shadow-[0_10px_30px_rgba(255,0,60,0.1)] hover:bg-[#FF003C] hover:border-[#FF003C] hover:shadow-[0_20px_40px_rgba(255,0,60,0.3)] hover:scale-105 active:scale-95' 
                  : 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>{language === 'KR' ? '분석 중...' : 'ANALYZING...'}</span>
                </>
              ) : (
                <span>{language === 'KR' ? 'AI 정밀 분석 실행' : 'EXECUTE AI ANALYSIS'}</span>
              )}
            </button>
          </div>

          {/* 결과 섹션 */}
          <div className="min-h-[500px] flex flex-col">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#FF003C] animate-pulse"></div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                {language === 'KR' ? 'GEMINI 3 PRO PREVIEW 분석 결과' : 'GEMINI 3 PRO PREVIEW OUTPUT'}
              </h4>
            </div>

            <div className="flex-grow glass rounded-[40px] p-10 relative overflow-hidden border border-white/5">
               {loading && (
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF003C] to-transparent animate-[shimmer_2s_infinite]"></div>
               )}
               
               <style>{`
                 @keyframes shimmer {
                   0% { transform: translateX(-100%); }
                   100% { transform: translateX(100%); }
                 }
               `}</style>

               <div className="prose prose-invert max-w-none">
                 {analysis ? (
                    <div className="whitespace-pre-wrap text-white/70 leading-relaxed font-medium text-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
                      {analysis}
                    </div>
                 ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20">
                      <svg className="w-16 h-16 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 21V20m0-18a9 9 0 110 18 9 9 0 010-18z" />
                      </svg>
                      <p className="text-xs font-black uppercase tracking-[0.3em]">
                        {language === 'KR' ? '이미지를 분석하면 이곳에 결과가 표시됩니다' : 'Results will appear here after analysis'}
                      </p>
                    </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAnalyzer;
