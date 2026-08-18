"use client";

import { useState } from "react";
import Link from "next/link";
// ⚠️ Updated path to include src!
import cardData from "@/src/data/module1-cards.json"; 

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Failsafe in case the JSON hasn't loaded yet
  if (!cardData || cardData.length === 0) {
    return <div className="p-8 text-white text-center">Loading encrypted databanks...</div>;
  }

  const currentCard = cardData[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cardData.length);
    }, 150); 
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
    }, 150);
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto flex flex-col">
      <Link href="/course/module-1" className="text-[#00ff41] hover:underline text-sm mb-8">
        &lt; Back to Module 01 Hub
      </Link>

      <div className="flex justify-between items-end mb-8 border-b border-[#00ff41]/30 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Spaced Repetition</h1>
          <p className="text-gray-400 mt-2">Active recall sequence initiated.</p>
        </div>
        <span className="text-[#00ff41] font-mono border border-[#00ff41]/30 px-3 py-1 bg-[#00ff41]/10 rounded">
          Card {currentIndex + 1} / {cardData.length}
        </span>
      </div>

      {/* The Flashcard */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="flex-grow cursor-pointer relative min-h-[450px] border border-gray-700 bg-black/60 hover:border-[#00ff41]/50 transition-all p-8 flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(0,255,65,0.05)] rounded-lg"
      >
        {!isFlipped ? (
          // FRONT OF CARD
          <div className="space-y-6 w-full max-w-2xl px-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">[{currentCard.category}]</span>
              <span className="text-sm text-[#00ff41] font-bold uppercase tracking-widest">{currentCard.topic}</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight py-4">
              {currentCard.question}
            </h2>
            
            <p className="text-gray-600 text-xs font-mono uppercase mt-8 animate-pulse">
              [ Click to Decrypt Answer ]
            </p>
          </div>
        ) : (
          // BACK OF CARD
          <div className="space-y-6 w-full max-w-3xl px-4 animate-in fade-in duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-white border-b border-gray-800 pb-6">
              {currentCard.answer}
            </h3>
            
            {currentCard.laymanExplanation && (
              <div className="text-left bg-gray-900/80 p-5 border-l-2 border-[#00ff41] rounded-r">
                <span className="text-[#00ff41] text-[10px] font-bold tracking-widest uppercase block mb-2">
                  Layman Translation
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {currentCard.laymanExplanation}
                </p>
              </div>
            )}

            {currentCard.examTip && (
              <div className="text-left text-sm text-yellow-500/90 mt-4 bg-yellow-950/20 p-4 border border-yellow-900/50 rounded">
                <span className="font-bold uppercase tracking-wider text-xs block mb-1">⚠️ OPSEC / Exam Tip:</span> 
                {currentCard.examTip}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-between mt-8">
        <button 
          onClick={prevCard} 
          className="px-6 py-3 font-mono text-sm border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-all rounded"
        >
          &lt; PREVIOUS
        </button>
        <button 
          onClick={nextCard} 
          className="px-8 py-3 font-mono font-bold text-sm bg-[#00ff41]/10 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] transition-all rounded uppercase tracking-widest"
        >
          NEXT CARD &gt;
        </button>
      </div>
    </div>
  );
}