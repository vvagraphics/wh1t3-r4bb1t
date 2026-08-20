'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import flashcardsData from '@/src/data/module1-cards.json'; 

export default function Flashcards() {
  const [mode, setMode] = useState('menu');
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hardCards, setHardCards] = useState([]);

  // Load saved "Hard" cards from Local Storage on mount
  useEffect(() => {
    const savedHardCards = localStorage.getItem('matrixHardCards');
    if (savedHardCards) {
      setHardCards(JSON.parse(savedHardCards));
    }
  }, []);

  // --- DECK GENERATION LOGIC ---
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startRandomAll = () => {
    setDeck(shuffleArray(flashcardsData));
    setCurrentIndex(0);
    setIsFlipped(false);
    setMode('study');
  };

  const startBatchOf15 = () => {
    const shuffled = shuffleArray(flashcardsData);
    setDeck(shuffled.slice(0, 15));
    setCurrentIndex(0);
    setIsFlipped(false);
    setMode('study');
  };

  const startReviewHard = () => {
    const reviewDeck = flashcardsData.filter(card => hardCards.includes(card.id));
    if (reviewDeck.length === 0) {
      alert(">> NO CORRUPTED DATA FOUND. KEEP STUDYING.");
      return;
    }
    setDeck(shuffleArray(reviewDeck));
    setCurrentIndex(0);
    setIsFlipped(false);
    setMode('study');
  };

  // --- CARD INTERACTION LOGIC ---
  const handleRating = (rating) => {
    const currentCardId = deck[currentIndex].id;
    let updatedHardCards = [...hardCards];

    // Save if Hard/Again; Remove if Good/Easy
    if (rating === 'Again' || rating === 'Hard') {
      if (!updatedHardCards.includes(currentCardId)) {
        updatedHardCards.push(currentCardId);
      }
    } else {
      updatedHardCards = updatedHardCards.filter(id => id !== currentCardId);
    }

    setHardCards(updatedHardCards);
    localStorage.setItem('matrixHardCards', JSON.stringify(updatedHardCards));

    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex + 1 < deck.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        alert(">> SEQUENCE COMPLETE. RETURNING TO TERMINAL.");
        setMode('menu');
      }
    }, 200);
  };

  // --- REUSABLE BUTTON CLASS (Tactile Terminal Key Effect) ---
  const tactileBtnClass = "border-2 border-green-500 bg-black text-green-500 hover:bg-green-900 transition-all uppercase tracking-widest font-bold rounded-sm shadow-[4px_4px_0_rgb(34,197,94)] hover:shadow-[2px_2px_0_rgb(34,197,94)] hover:translate-y-[2px] hover:translate-x-[2px] active:shadow-none active:translate-y-[4px] active:translate-x-[4px]";

  // --- RENDER MENU ---
  if (mode === 'menu') {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
        
        {/* Navigation */}
        <div className="w-full max-w-md mb-8 flex justify-start">
          <Link 
            href="/course/module-1" 
            className="text-green-600 hover:text-green-400 font-bold text-sm transition-colors flex items-center gap-2"
          >
            &lt; RETURN_TO_DIRECTORY
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-shadow-neon border-b-2 border-green-500 pb-2 text-center w-full max-w-md">
          SYS_TRAINING_MOD
        </h1>

        {/* Instructions / Manual */}
        <div className="w-full max-w-md border border-green-800 bg-[#000a00] p-4 mb-8 rounded-sm text-sm md:text-base shadow-[inset_0_0_15px_rgba(0,255,65,0.05)]">
          <h2 className="text-green-400 font-bold mb-2 border-b border-green-800 pb-1">:: SYS_MANUAL ::</h2>
          <ul className="space-y-2 text-green-600">
            <li>&gt; Tap a data card to decrypt the answer.</li>
            <li>&gt; Rate your memory retrieval to train the algorithm:</li>
            <li className="pl-4">- <span className="text-green-400 font-bold">AGAIN / HARD:</span> Flags data for Review.</li>
            <li className="pl-4">- <span className="text-green-400 font-bold">GOOD / EASY:</span> Clears data from Review.</li>
          </ul>
        </div>

        {/* Menu Controls */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          <button onClick={startRandomAll} className={`p-4 md:p-6 text-lg md:text-xl ${tactileBtnClass}`}>
            Execute: Random (All)
          </button>
          <button onClick={startBatchOf15} className={`p-4 md:p-6 text-lg md:text-xl ${tactileBtnClass}`}>
            Execute: Batch of 15
          </button>
          <button onClick={startReviewHard} className={`p-4 md:p-6 text-lg md:text-xl flex justify-between items-center ${tactileBtnClass}`}>
            <span>Review Hard</span>
            <span className="text-sm border border-green-500 px-2 py-1 bg-green-950">[{hardCards.length} saved]</span>
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER STUDY MODE ---
  const currentCard = deck[currentIndex];

  return (
    <div className="min-h-screen w-full bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4 md:p-8">
      
      {/* Top Navigation & Progress */}
      <div className="w-full max-w-2xl mb-6 flex justify-between items-center border-b-2 border-green-800 pb-4">
        <button 
          onClick={() => setMode('menu')}
          className="text-xs md:text-sm font-bold border border-green-500 px-3 py-1 hover:bg-green-500 hover:text-black transition-colors rounded-sm"
        >
          &lt; ABORT
        </button>
        <span className="text-sm md:text-base font-bold bg-green-950 border border-green-800 px-3 py-1 rounded-sm shadow-[inset_0_0_10px_rgba(0,255,65,0.2)]">
          DATA: {currentIndex + 1} / {deck.length}
        </span>
      </div>

      {/* Flashcard Container */}
      <div 
        className="relative w-full max-w-2xl h-[28rem] md:h-[32rem] cursor-pointer [perspective:1000px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className={`w-full h-full duration-500 [transform-style:preserve-3d] relative ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          
          {/* Front Face (Question) */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] flex flex-col justify-between p-6 md:p-10 border-2 border-green-500 bg-black shadow-[0_0_20px_rgba(0,255,65,0.2)] rounded-sm">
            <div className="text-xs md:text-sm text-green-700 uppercase tracking-widest w-full text-left">
              {currentCard.category} // {currentCard.topic}
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-bold leading-relaxed text-shadow-neon text-center">
                {currentCard.question}
              </h2>
            </div>

            <div className="text-sm md:text-base text-green-800 animate-pulse text-center">
              [ TAP_TO_DECRYPT ]
            </div>
          </div>

          {/* Back Face (Answer & Context) */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col p-6 md:p-8 border-2 border-green-400 bg-[#021002] shadow-[0_0_25px_rgba(0,255,65,0.4)] rounded-sm overflow-y-auto custom-scrollbar">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-8 text-center mt-4">
              {currentCard.answer}
            </h2>
            
            <div className="w-full space-y-6 text-sm md:text-lg text-green-300 text-left bg-black p-6 border border-green-900 rounded-sm">
              <p className="break-words">
                <span className="font-bold text-green-500 block mb-2">&gt; LAYMAN_TERMS:</span> 
                {currentCard.laymanExplanation}
              </p>
              <p className="break-words">
                <span className="font-bold text-green-500 block mb-2">&gt; EXAM_OVERRIDE:</span> 
                {currentCard.examTip}
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Action Buttons (Tactile Feedback) */}
      <div className={`w-full max-w-2xl mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {['Again', 'Hard', 'Good', 'Easy'].map((btn) => (
          <button 
            key={btn} 
            onClick={(e) => {
              e.stopPropagation(); 
              handleRating(btn);
            }}
            disabled={!isFlipped}
            className={`py-3 md:py-4 text-sm md:text-lg ${tactileBtnClass}`}
          >
            {btn}
          </button>
        ))}
      </div>

    </div>
  );
}