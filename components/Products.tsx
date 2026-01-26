
import React, { useState, useRef } from 'react';
import { PRODUCTS } from '../constants';
import { Language, ProductItem } from '../types';

interface ProductsProps { 
  language: Language; 
  customBoxingImage: string | null;
  customFootballImage: string | null;
  onBoxingUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFootballUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Products: React.FC<ProductsProps> = ({ 
  language, 
  customBoxingImage, 
  customFootballImage,
  onBoxingUpload, 
  onFootballUpload 
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const boxingInputRef = useRef<HTMLInputElement>(null);
  const footballInputRef = useRef<HTMLInputElement>(null);

  const getProductImage = (productId: string) => {
    if (productId === 'boxing') return customBoxingImage || `https://picsum.photos/seed/boxing/1200/1200`;
    if (productId === 'football') return customFootballImage || `https://picsum.photos/seed/football/1200/1200`;
    return `https://picsum.photos/seed/${productId}/1200/1200`;
  };

  const handleUploadClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (productId === 'boxing') boxingInputRef.current?.click();
    if (productId === 'football') footballInputRef.current?.click();
  };

  return (
    <section id="products" className="py-40 bg-black text-white px-6">
      <input type="file" ref={boxingInputRef} onChange={onBoxingUpload} className="hidden" accept="image/*" />
      <input type="file" ref={footballInputRef} onChange={onFootballUpload} className="hidden" accept="image/*" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <h2 className="text-[11px] font-black text-[#FF003C] tracking-[0.5em] uppercase mb-8">ICT 하드웨어 & 축구 플렛폼</h2>
          <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-gradient">PROJECTS</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className="bento-card group relative rounded-[40px] p-12 overflow-hidden flex flex-col min-h-[700px] cursor-pointer border border-white/5 hover:border-[#FF003C]/30 transition-all duration-500"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative z-10">
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF003C] mb-4 block">
                    {product.subtitle[language]}
                 </span>
                 <h4 className="text-4xl font-black uppercase mb-6 leading-tight">{product.title[language]}</h4>
              </div>

              <div className="flex-grow flex items-center justify-center relative mt-12 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-radial-gradient from-[#FF003C]/10 to-transparent opacity-30 z-0"></div>
                <img 
                  src={getProductImage(product.id)} 
                  alt={product.title[language]} 
                  className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105 z-10" 
                />
                
                <button 
                  onClick={(e) => handleUploadClick(e, product.id)}
                  className="absolute bottom-6 right-6 z-20 flex items-center space-x-2 bg-white/10 hover:bg-[#FF003C] backdrop-blur-md px-5 py-3 rounded-full border border-white/10 transition-all opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">
                    {language === 'KR' ? '이미지 업로드' : 'Upload Image'}
                  </span>
                </button>
              </div>

              <div className="mt-12 flex justify-between items-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  {language === 'KR' ? '상세 내용 보기' : 'See Details'}
                </span>
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl animate-fade-in" onClick={() => setSelectedProduct(null)}>
          <div 
            className="bg-black w-full max-w-5xl rounded-[50px] border border-white/10 p-12 md:p-20 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedProduct(null)} className="absolute top-12 right-12 text-white/30 hover:text-white transition-all transform hover:rotate-90">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="grid md:grid-cols-2 gap-20">
              <div className="relative group/modal">
                <img 
                  src={getProductImage(selectedProduct.id)} 
                  className="w-full aspect-square object-contain rounded-[40px] bg-white/5" 
                  alt="Product"
                />
                <button 
                  onClick={(e) => handleUploadClick(e, selectedProduct.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/modal:opacity-100 transition-opacity rounded-[40px]"
                >
                  <div className="bg-white text-black px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest">
                    {language === 'KR' ? '사진 변경하기' : 'Change Photo'}
                  </div>
                </button>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF003C] mb-6">{selectedProduct.subtitle[language]}</span>
                <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">{selectedProduct.title[language]}</h4>
                <div className="space-y-6 mb-12">
                   {selectedProduct.features[language].map((f, i) => (
                      <div key={i} className="flex items-start space-x-6 group/item">
                         <div className="w-2 h-2 rounded-full bg-[#FF003C] mt-2 group-hover/item:scale-150 transition-transform"></div>
                         <p className="text-lg text-white/60 font-medium group-hover/item:text-white transition-colors">{f}</p>
                      </div>
                   ))}
                </div>
                <button 
                  onClick={() => { setSelectedProduct(null); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full py-6 bg-white text-black font-black uppercase rounded-full tracking-widest text-xs hover:bg-[#FF003C] hover:text-white transition-all shadow-xl"
                >
                  {language === 'KR' ? '도입 문의하기' : 'Inquire Now'}
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
