
import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Peeling the pixels...",
  "Applying digital sunlight...",
  "Consulting the Nano Banana...",
  "Crafting your vision...",
  "Bending light waves...",
  "Almost there, don't slip!",
  "Polishing the final result..."
];

const LoadingOverlay: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-md p-6">
      <div className="relative">
        {/* Animated Banana Icon */}
        <div className="w-24 h-24 bg-yellow-400 rounded-3xl flex items-center justify-center text-4xl shadow-2xl animate-bounce">
          🍌
        </div>
        <div className="absolute -inset-4 border-4 border-yellow-400/30 rounded-[2.5rem] animate-ping opacity-20" />
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Magic in Progress</h2>
        <p className="text-yellow-400 font-medium animate-pulse">
          {MESSAGES[messageIndex]}
        </p>
      </div>

      <div className="mt-12 w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-yellow-400 w-1/3 animate-[loading_2s_ease-in-out_infinite]" />
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
