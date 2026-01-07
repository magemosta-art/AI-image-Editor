
import React, { useState } from 'react';

interface ImageDisplayProps {
  url: string;
  originalUrl: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ url, originalUrl }) => {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="relative aspect-video lg:aspect-auto lg:min-h-[500px] w-full flex items-center justify-center bg-slate-900 rounded-2xl overflow-hidden group">
        <img 
          src={showOriginal ? originalUrl : url} 
          alt="Work in progress" 
          className="max-h-full max-w-full object-contain transition-opacity duration-300"
        />
        
        {/* Comparison Toggle */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button 
             onMouseDown={() => setShowOriginal(true)}
             onMouseUp={() => setShowOriginal(false)}
             onMouseLeave={() => setShowOriginal(false)}
             className="px-6 py-2 rounded-full text-xs font-bold text-white uppercase tracking-wider hover:bg-white/10"
           >
             Hold to see Original
           </button>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center px-2">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
          {showOriginal ? 'Viewing Original' : 'AI Enhanced'}
        </span>
        <a 
          href={url} 
          download="nano-banana-edit.png"
          className="text-yellow-600 hover:text-yellow-700 text-sm font-bold flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Save Result
        </a>
      </div>
    </div>
  );
};

export default ImageDisplay;
