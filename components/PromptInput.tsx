
import React, { useState } from 'react';

interface PromptInputProps {
  onSend: (prompt: string) => void;
  disabled?: boolean;
}

const SUGGESTIONS = [
  "Add a retro 80s filter",
  "Remove the background",
  "Turn this into a pencil sketch",
  "Make it look like a rainy night",
  "Add a dramatic sunset glow",
  "Change the sky to a galaxy"
];

const PromptInput: React.FC<PromptInputProps> = ({ onSend, disabled }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !disabled) {
      onSend(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
      <div className="mb-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
          Suggestions
        </label>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              className="text-xs bg-slate-100 hover:bg-yellow-100 text-slate-600 hover:text-yellow-700 px-3 py-1.5 rounded-lg border border-transparent hover:border-yellow-200 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input 
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Make the grass purple' or 'Add a neon sign'..."
          disabled={disabled}
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 pl-6 pr-16 focus:outline-none focus:border-yellow-400 transition-colors text-slate-800 font-medium placeholder:text-slate-400 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !prompt.trim()}
          className="absolute right-3 top-3 bottom-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-slate-200 text-yellow-900 disabled:text-slate-400 px-6 rounded-xl font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center"
        >
          {disabled ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
        </button>
      </form>
      <p className="text-[10px] text-slate-400 mt-4 text-center">
        Nano Banana AI works best with descriptive prompts. Try describing the style, lighting, or specific objects to change.
      </p>
    </div>
  );
};

export default PromptInput;
