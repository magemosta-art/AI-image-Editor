
import React from 'react';

interface HeaderProps {
  onNewSession: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewSession }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shadow-inner">
            <span className="text-xl">🍌</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Nano Banana</h1>
            <p className="text-[10px] text-yellow-600 font-bold uppercase tracking-widest">Powered by YSF KAIROS XQ</p>
          </div>
        </div>
        
        <button 
          onClick={onNewSession}
          className="text-slate-500 hover:text-slate-800 font-medium text-sm px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          New Project
        </button>
      </div>
    </header>
  );
};

export default Header;
