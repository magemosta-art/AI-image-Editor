
import React from 'react';
import { EditHistoryItem } from '../types';

interface HistoryPanelProps {
  history: EditHistoryItem[];
  onSelect: (item: EditHistoryItem) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full max-h-[600px] lg:max-h-screen lg:sticky lg:top-24">
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Edit History
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-xs text-slate-400">No edits yet. Start by typing a prompt below!</p>
          </div>
        ) : (
          history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="w-full group text-left bg-slate-50 hover:bg-yellow-50 rounded-2xl p-3 border border-slate-100 hover:border-yellow-200 transition-all"
            >
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-3 bg-slate-200">
                <img src={item.resultUrl} alt={item.prompt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-xs font-semibold text-slate-700 line-clamp-2 leading-relaxed">
                "{item.prompt}"
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
