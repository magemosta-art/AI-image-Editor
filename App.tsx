
import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import ImageDisplay from './components/ImageDisplay';
import PromptInput from './components/PromptInput';
import LoadingOverlay from './components/LoadingOverlay';
import HistoryPanel from './components/HistoryPanel';
import { ImageData, EditHistoryItem } from './types';
import { editImage } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<EditHistoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        const imageData: ImageData = {
          base64,
          mimeType: file.type,
          url: base64,
        };
        setOriginalImage(imageData);
        setCurrentImage(base64);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (prompt: string) => {
    if (!originalImage) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Use the *last* current image as the basis for sequential edits
      // or use original for fresh edits. Here we use original + prompt
      // but users often want sequential. Let's use currentImage as reference.
      const referenceImage: ImageData = {
        base64: currentImage!,
        mimeType: originalImage.mimeType,
        url: currentImage!,
      };

      const resultUrl = await editImage(referenceImage, prompt);
      
      setCurrentImage(resultUrl);
      
      const newHistoryItem: EditHistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        prompt,
        resultUrl,
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (err: any) {
      setError(err.message || "Something went wrong while editing your image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (originalImage) {
      setCurrentImage(originalImage.url);
      setError(null);
    }
  };

  const handleNewSession = () => {
    setOriginalImage(null);
    setCurrentImage(null);
    setHistory([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header onNewSession={handleNewSession} />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6">
          {/* Main Workspace */}
          {!originalImage ? (
            <div className="flex-1 flex flex-col items-center justify-center border-4 border-dashed border-slate-200 rounded-3xl bg-white p-12 text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready to Peel some Pixels?</h2>
              <p className="text-slate-500 mb-8 max-w-md">Upload an image and tell our Nano Banana AI how you'd like to edit it.</p>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Upload Image
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-6">
              <div className="relative group">
                <ImageDisplay 
                  url={currentImage!} 
                  originalUrl={originalImage.url} 
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={handleReset}
                    className="bg-white/90 backdrop-blur hover:bg-white text-slate-800 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors"
                  >
                    Reset to Original
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              <PromptInput onSend={handleEdit} disabled={isProcessing} />
            </div>
          )}
        </div>

        {/* Sidebar History */}
        <div className="lg:w-80 shrink-0">
          <HistoryPanel history={history} onSelect={(item) => setCurrentImage(item.resultUrl)} />
        </div>
      </main>

      {isProcessing && <LoadingOverlay />}
    </div>
  );
};

export default App;
