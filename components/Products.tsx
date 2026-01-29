
import React, { useState } from 'react';
import { PRODUCTS, ASSET_PATHS, BASE64_ASSETS } from '../constants';
import { Language, ProductItem } from '../types';

interface ProductImageProps {
  id: string;
  language: Language;
}

const ProductImage: React.FC<ProductImageProps> = ({ id, language }) => {
  const [error, setError] = useState(false);
  
  // 데이터가 있으면 Base64 데이터 상수를, 없으면 경로 상수를 참조합니다.
  const path = id === 'boxing' ? ASSET_PATHS.boxing_machine : ASSET_PATHS.football_platform;
  const isBase64 = path.startsWith('data:image');

  if (error || (!isBase64 && !path)) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#080808] rounded-[40px] border border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-grid opacity-5"></div>
        <div className="relative z-10 flex flex-col items-center text-center p-12">
          <div className="w-24 h-24 mb-10 border border-[#FF003C]/20 rounded-full flex items-center justify-center text-[#FF003C]/20 group-hover:text-[#FF003C] group-hover:border-[#FF003C] transition-all duration-500">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/40 mb-3">
            {language === 'KR' ? '기기 이미지 대기' : 'PENDING STABLE ASSET'}
          </p>
          <div className="px-6 py-2 bg-white/5 rounded-full">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 truncate max-w-[200px]">
              {isBase64 ? 'Embedded Base64 Data' : path}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full p-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-radial-gradient from-[#FF003C]/10 to-transparent opacity-30 z-0"></div>
      <img 
        src={path} 
        alt="Product Device" 
        className="w-full h-full object-contain transition-transform duration-[1.5s] ease-out group-hover:scale-110 z-10" 
        onError={() => setError(true)}
      />
    </div>
  );
};

const Products: React.FC<{ language: Language }> = ({ language }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  return (
    <section id="products" className="py-40 bg-black text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <h2 className="label-engineered mb-8">
            {language === 'KR' ? 'ICT 제조 & 플랫폼 개발' : 'ICT MANUFACTURING & PLATFORM DEVELOPMENT'}
          </h2>
          <h3 className="text-7xl md:text-[9rem] font-[900] uppercase tracking-[-0.05em] text-gradient leading-none">PROJECT</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className="bento-card group relative rounded-[60px] p-16 overflow-hidden flex flex-col min-h-[850px] cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative z-10">
                 <span className="text-[11px] font-[900] uppercase tracking-[0.4em] text-[#FF003C] mb-6 block">
                    {product.subtitle[language]}
                 </span>
                 <h4 className="text-4xl font-[900] uppercase mb-8 leading-[1.1] tracking-[-0.02em]">{product.title[language]}</h4>
              </div>

              <div className="flex-grow flex items-center justify-center relative mt-16 overflow-hidden rounded-[40px] bg-white/[0.01] border border-white/5">
                <ProductImage id={product.id} language={language} />
              </div>

              <div className="mt-16 flex justify-between items-center">
                <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-colors">
                  {language === 'KR' ? '상세 스펙 보기' : 'VIEW TECHNICAL SPEC'}
                </span>
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:bg-[#FF003C] group-hover:border-[#FF003C] transition-all duration-500">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/98 backdrop-blur-3xl animate-fade-in" onClick={() => setSelectedProduct(null)}>
          <div 
            className="bg-black w-full max-w-6xl rounded-[80px] border border-white/10 p-16 md:p-24 relative max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(255,0,60,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedProduct(null)} className="absolute top-16 right-16 text-white/30 hover:text-white transition-all transform hover:rotate-90">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative aspect-square">
                 <ProductImage id={selectedProduct.id} language={language} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-[900] uppercase tracking-[0.6em] text-[#FF003C] mb-10">{selectedProduct.subtitle[language]}</span>
                <h4 className="text-5xl md:text-7xl font-[900] uppercase tracking-[-0.04em] mb-12 leading-none text-white">{selectedProduct.title[language]}</h4>
                <div className="space-y-10 mb-16">
                   {selectedProduct.features[language].map((f, i) => (
                      <div key={i} className="flex items-start space-x-8 group/item">
                         <div className="w-3 h-3 rounded-full bg-[#FF003C] mt-2.5 shadow-[0_0_10px_#FF003C]"></div>
                         <p className="text-xl text-white/40 font-semibold tracking-tight leading-relaxed group-hover/item:text-white transition-colors">{f}</p>
                      </div>
                   ))}
                </div>
                <button 
                  onClick={() => { setSelectedProduct(null); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full py-10 bg-[#FF003C] text-white font-black uppercase rounded-full tracking-[0.5em] text-[13px] hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,0,60,0.3)]"
                >
                  {language === 'KR' ? '도입 및 견적 문의' : 'REQUEST QUOTATION'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
