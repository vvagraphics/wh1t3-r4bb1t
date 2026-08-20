'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// SRS Data Structure
type Flashcard = {
  id: string;
  front: string;
  back: string;
  nextReview: number; 
  interval: number;   
  ease: number;       
};

// Default Sec+/Net+ Data
const defaultCards: Flashcard[] = [
  { id: '1', front: 'What port does SSH use?', back: 'Port 22', nextReview: 0, interval: 0, ease: 2.5 },
  { id: '2', front: 'What is the purpose of a SIEM?', back: 'Security Information and Event Management: Log aggregation and threat detection.', nextReview: 0, interval: 0, ease: 2.5 },
  { id: '3', front: 'Define Phishing', back: 'Social engineering attack using deceptive emails to steal credentials.', nextReview: 0, interval: 0, ease: 2.5 },
];

export default function FlashcardsPage() {
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedDeck = localStorage.getItem('matrix_flashcards_mod1');
    if (savedDeck) {
      setDeck(JSON.parse(savedDeck));
    } else {
      setDeck(defaultCards);
    }
    setMounted(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (deck.length > 0) {
      localStorage.setItem('matrix_flashcards_mod1', JSON.stringify(deck));
    }
  }, [deck]);

  const dueCards = deck.filter(card => card.nextReview <= Date.now());
  const currentCard = dueCards[currentIndex];

  const masteredCount = deck.filter(c => c.interval > 14).length;
  const learningCount = deck.filter(c => c.interval > 0 && c.interval <= 14).length;
  const newCount = deck.filter(c => c.interval === 0).length;

  const handleGrade = useCallback((grade: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;
    
    const updatedDeck = [...deck];
    const cardIndex = deck.findIndex(c => c.id === currentCard.id);
    let card = { ...updatedDeck[cardIndex] };

    const now = Date.now();
    const dayInMs = 86400000;

    switch (grade) {
      case 'again':
        card.interval = 0;
        card.ease = Math.max(1.3, card.ease - 0.2);
        card.nextReview = now + 60000; // 1 min
        break;
      case 'hard':
        card.interval = Math.max(1, card.interval * 1.2);
        card.ease = Math.max(1.3, card.ease - 0.15);
        card.nextReview = now + (card.interval * dayInMs);
        break;
      case 'good':
        card.interval = Math.max(1, (card.interval === 0 ? 1 : card.interval * card.ease));
        card.nextReview = now + (card.interval * dayInMs);
        break;
      case 'easy':
        card.interval = Math.max(4, card.interval * card.ease * 1.3);
        card.ease += 0.15;
        card.nextReview = now + (card.interval * dayInMs);
        break;
    }

    updatedDeck[cardIndex] = card;
    setDeck(updatedDeck);
    setIsFlipped(false);

    if (currentIndex + 1 >= dueCards.length - 1) {
      setSessionComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  }, [deck, currentCard, currentIndex, dueCards.length]);

  // Hardened Keyboard Bindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in a form field elsewhere
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (sessionComplete || !currentCard) return;

      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
        return;
      }

      if (isFlipped) {
        if (e.key === '1') { e.preventDefault(); handleGrade('again'); }
        if (e.key === '2') { e.preventDefault(); handleGrade('hard'); }
        if (e.key === '3') { e.preventDefault(); handleGrade('good'); }
        if (e.key === '4') { e.preventDefault(); handleGrade('easy'); }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, sessionComplete, currentCard, handleGrade]);

  if (!mounted) return null;

  if (sessionComplete || !currentCard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-[#00FF41] font-mono p-6">
        <h1 className="text-2xl sm:text-4xl mb-6 tracking-widest text-center" style={{ textShadow: '0 0 10px #00FF41' }}>
          SYSTEM.REVIEW_COMPLETE
        </h1>
        <p className="text-gray-400 mb-8 text-center sm:text-lg">No active threats detected. All modules verified.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-10 text-sm sm:text-base border border-[#00FF41] p-6" style={{ backgroundColor: '#001100' }}>
          <div><span className="text-blue-400">NEW:</span> {newCount}</div>
          <div><span className="text-yellow-500">LEARNING:</span> {learningCount}</div>
          <div><span className="text-[#00FF41]">MASTERED:</span> {masteredCount}</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link 
            href="/course/module-1"
            className="flex-1 text-center px-6 py-4 border border-gray-500 text-gray-500 hover:border-[#00FF41] hover:text-[#00FF41] transition-colors"
          >
            [ ESC ] RETURN
          </Link>
          <button 
            onClick={() => {
              const resetDeck = deck.map(c => ({...c, nextReview: 0}));
              setDeck(resetDeck);
              setSessionComplete(false);
              setCurrentIndex(0);
            }}
            className="flex-1 px-6 py-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors"
          >
            FORCE RESTART
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-[#00FF41] p-4 sm:p-8 font-mono w-full overflow-hidden">
      
      <div className="w-full max-w-3xl mx-auto flex flex-col relative z-10 min-h-[85vh]">
        
        {/* Prominent Escape Hatch */}
        <div className="w-full mb-6 flex justify-between items-center">
          <Link 
            href="/course/module-1" 
            className="inline-block px-4 py-2 border border-gray-700 text-gray-400 hover:border-[#00FF41] hover:text-[#00FF41] transition-colors text-xs sm:text-sm tracking-widest"
          >
            [&lt;] RETURN TO MODULE
          </Link>
        </div>

        {/* HUD */}
        <div className="w-full mb-6">
          <div className="flex justify-between items-end mb-3 text-xs sm:text-sm">
            <div>
              <span className="hidden sm:inline-block text-gray-500 mr-2">DECK STATUS //</span>
              <span className="mr-3"><span className="text-blue-400">N:</span>{newCount}</span>
              <span className="mr-3"><span className="text-yellow-500">L:</span>{learningCount}</span>
              <span><span className="text-[#00FF41]">M:</span>{masteredCount}</span>
            </div>
            <div className="text-right">
              <span>{currentIndex + 1} / {dueCards.length} DUE</span>
            </div>
          </div>
          <div className="w-full h-1 bg-gray-900 overflow-hidden">
            <div 
              className="h-full bg-[#00FF41] transition-all duration-300" 
              style={{ width: `${((currentIndex) / dueCards.length) * 100}%`, boxShadow: '0 0 10px #00FF41' }}
            ></div>
          </div>
        </div>

        {/* Rigid Card Container */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full flex-1 min-h-[350px] sm:min-h-[450px] cursor-pointer mt-4"
          style={{ perspective: '1000px' }}
        >
          <div 
            className="w-full h-full absolute transition-transform duration-500"
            style={{ 
              transformStyle: 'preserve-3d', 
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
            }}
          >
            
            {/* Front */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-12 border-2 border-[#00FF41] hover:shadow-[0_0_30px_rgba(0,255,65,0.2)] transition-shadow"
              style={{ backfaceVisibility: 'hidden', backgroundColor: '#000000' }}
            >
              <h2 className="text-2xl sm:text-4xl text-[#00FF41] text-center leading-relaxed font-bold">
                {currentCard.front}
              </h2>
              <div className="absolute bottom-6 text-xs sm:text-sm text-gray-500 animate-pulse tracking-widest">
                [ PRESS SPACE OR TAP TO DECRYPT ]
              </div>
            </div>

            {/* Back */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-12 border-2 border-[#00FF41]"
              style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'rotateY(180deg)',
                backgroundColor: '#001100',
                boxShadow: '0 0 25px rgba(0,255,65,0.2)' 
              }}
            >
              <h2 className="text-xl sm:text-3xl text-[#00FF41] text-center leading-relaxed">
                {currentCard.back}
              </h2>
            </div>

          </div>
        </div>

        {/* SRS Controls */}
        <div className={`mt-8 w-full transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            <button onClick={(e) => { e.stopPropagation(); handleGrade('again'); }} className="py-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black uppercase text-sm sm:text-base tracking-widest transition-colors flex flex-col items-center" style={{ backgroundColor: '#000000' }}>
              <span>[1] Again</span>
              <span className="text-[10px] sm:text-xs opacity-70 mt-1">Forgot It (&lt;1m)</span>
            </button>
            
            <button onClick={(e) => { e.stopPropagation(); handleGrade('hard'); }} className="py-4 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black uppercase text-sm sm:text-base tracking-widest transition-colors flex flex-col items-center" style={{ backgroundColor: '#000000' }}>
              <span>[2] Hard</span>
              <span className="text-[10px] sm:text-xs opacity-70 mt-1">Barely Knew It</span>
            </button>
            
            <button onClick={(e) => { e.stopPropagation(); handleGrade('good'); }} className="py-4 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black uppercase text-sm sm:text-base tracking-widest transition-colors flex flex-col items-center shadow-[0_0_10px_rgba(0,255,65,0.1)]" style={{ backgroundColor: '#001100' }}>
              <span>[3] Good</span>
              <span className="text-[10px] sm:text-xs opacity-70 mt-1">Remembered</span>
            </button>
            
            <button onClick={(e) => { e.stopPropagation(); handleGrade('easy'); }} className="py-4 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black uppercase text-sm sm:text-base tracking-widest transition-colors flex flex-col items-center" style={{ backgroundColor: '#000000' }}>
              <span>[4] Easy</span>
              <span className="text-[10px] sm:text-xs opacity-70 mt-1">Too Simple</span>
            </button>
          </div>
        </div>

        {/* Terminal Instructions Overlay */}
        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-gray-500 text-xs sm:text-sm font-mono tracking-widest">
            SYSTEM.CONTROLS: <span className="text-gray-300">[SPACE]</span> = FLIP CARD &nbsp;//&nbsp; <span className="text-gray-300">[1-4]</span> = GRADE RECALL
          </p>
        </div>

      </div>
    </div>
  );
}