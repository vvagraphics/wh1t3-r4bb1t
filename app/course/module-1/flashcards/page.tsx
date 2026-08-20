'use client';
import { useState, useEffect } from 'react';
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
      alert("No hard cards saved yet! Keep studying.");
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
    if (rating === 'Hard' || rating === 'Again') {
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
        alert("Deck Complete! Returning to terminal.");
        setMode('menu');
      }
    }, 200); // 200ms allows the card to flip face-down before the text swaps
  };

  // --- RENDER MENU ---
  if (mode === 'menu') {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-shadow-neon border-b-2 border-green-500 pb-2 text-center">
          SYSTEM_TRAINING_MODULE
        </h1>
        <div className="flex flex-col gap-6 w-full max-w-md">
          <button onClick={startRandomAll} className="p-4 md:p-6 text-lg md:text-xl border-2 border-green-500 hover:bg-green-500 hover:text-black transition-colors uppercase tracking-widest font-bold rounded-md">
            Execute: Random (All)
          </button>
          <button onClick={startBatchOf15} className="p-4 md:p-6 text-lg md:text-xl border-2 border-green-500 hover:bg-green-500 hover:text-black transition-colors uppercase tracking-widest font-bold rounded-md">
            Execute: Batch of 15
          </button>
          <button onClick={startReviewHard} className="p-4 md:p-6 text-lg md:text-xl border-2 border-green-500 hover:bg-green-500 hover:text-black transition-colors uppercase tracking-widest font-bold flex justify-between items-center rounded-md">
            <span>Review Hard</span>
            <span className="text-sm">[{hardCards.length} saved]</span>
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER STUDY MODE ---
  const currentCard = deck[currentIndex];

  return (
    // overflow-x-hidden prevents the horizontal scrollbar completely
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4 md:p-8">
      
      {/* Top Navigation & Progress */}
      <div className="w-full max-w-2xl mb-6 flex justify-between items-center border-b-2 border-green-800 pb-4">
        <button 
          onClick={() => setMode('menu')}
          className="text-base md:text-lg font-bold border border-green-500 px-4 py-2 hover:bg-green-500 hover:text-black transition-colors rounded"
        >
          &lt; TERMINATE SESSION
        </button>
        <span className="text-base md:text-lg font-bold">
          Card {currentIndex + 1} of {deck.length}
        </span>
      </div>

      {/* Flashcard Container - Fixed heights replace aspect ratios to prevent extreme stretching */}
      <div 
        className="relative w-full max-w-2xl h-[28rem] md:h-[32rem] cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`w-full h-full duration-500 preserve-3d relative ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front Face (Question) */}
          <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col justify-between p-6 md:p-10 border-2 border-green-500 bg-black shadow-[0_0_20px_rgba(0,255,65,0.2)] rounded-lg">
            {/* Top Category (No longer absolute positioned to prevent overlap bugs) */}
            <div className="text-sm md:text-base text-green-700 uppercase tracking-widest w-full text-left">
              {currentCard.category} // {currentCard.topic}
            </div>
            
            {/* Centered Question */}
            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-bold leading-relaxed text-shadow-neon text-center">
                {currentCard.question}
              </h2>
            </div>

            {/* Bottom Hint */}
            <div className="text-sm md:text-base text-green-800 animate-pulse text-center">
              [ Tap to Decrypt ]
            </div>
          </div>

          {/* Back Face (Answer & Context) */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col p-6 md:p-8 border-2 border-green-400 bg-[#021002] shadow-[0_0_25px_rgba(0,255,65,0.4)] rounded-lg overflow-y-auto overflow-x-hidden">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-8 text-center mt-4">
              {currentCard.answer}
            </h2>
            
            <div className="w-full space-y-6 text-base md:text-xl text-green-300 text-left bg-black p-6 border border-green-900 rounded-lg">
              <p className="break-words">
                <span className="font-bold text-green-500 block mb-2">LAYMAN:</span> 
                {currentCard.laymanExplanation}
              </p>
              <p className="break-words">
                <span className="font-bold text-green-500 block mb-2">EXAM TIP:</span> 
                {currentCard.examTip}
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Action Buttons - Thicker, brighter borders, 2x2 grid on mobile for fat fingers */}
      <div className={`w-full max-w-2xl mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
        {['Again', 'Hard', 'Good', 'Easy'].map((btn) => (
          <button 
            key={btn} 
            onClick={(e) => {
              e.stopPropagation(); 
              handleRating(btn);
            }}
            disabled={!isFlipped}
            className="py-4 md:py-5 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all uppercase font-bold text-base md:text-xl tracking-wider rounded-lg"
          >
            {btn}
          </button>
        ))}
      </div>

    </div>
  );
}