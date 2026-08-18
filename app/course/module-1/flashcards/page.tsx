"use client"; // Required because we are using interactive state (flipping cards)

import { useState } from "react";
import Link from "next/link";
// Importing your JSON directly!
import cardData from "@/data/module1-cards.json"; 

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cardData[currentIndex];

  const nextCard = () => {
    setIsFlipped(false); // Reset flip state
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cardData.length);
    }, 150); // Slight delay for the animation
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

      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-bold text-white">Spaced Repetition</h1>
        <span className="text-gray-500 text-sm">Card {currentIndex + 1} of {cardData.length}</span>
      </div>

      {/* The Flashcard */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="flex-grow cursor-pointer relative perspective-1000 min-h-[400px] border border-gray-700 bg-black/50 hover:border-[#00ff41]/50 transition-colors p-8 flex flex-col justify-center items-center text-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
      >
        {!isFlipped ? (
          // FRONT OF CARD
          <div className="space-y-4">
            <span className="text-xs text-[#00ff41] uppercase tracking-widest">{currentCard.topic}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{currentCard.question}</h2>
            <p className="text-gray-500 text-sm mt-8 animate-pulse">[ Click to Decrypt ]</p>
          </div>
        ) : (
          // BACK OF CARD
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-4">{currentCard.answer}</h3>
            
            <div className="text-left bg-gray-900/50 p-4 border-l-2 border-[#00ff41]">
              <span className="text-[#00ff41] text-xs uppercase block mb-1">Layman Translation</span>
              <p className="text-gray-300">{currentCard.laymanExplanation}</p>
            </div>

            {currentCard.examTip && (
              <div className="text-left text-sm text-yellow-500/80 mt-4">
                <span className="font-bold">⚠️ OPSEC Tip:</span> {currentCard.examTip}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-between mt-8">
        <button onClick={prevCard} className="px-6 py-2 border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-all">
          &lt; Previous
        </button>
        <button onClick={nextCard} className="px-6 py-2 bg-[#00ff41]/10 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all font-bold tracking-wider">
          Next Card &gt;
        </button>
      </div>
    </div>
  );
}