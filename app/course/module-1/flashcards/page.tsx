'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// 1. SRS Data Structure
type Flashcard = {
  id: string;
  front: string;
  back: string;
  nextReview: number; 
  interval: number;   
  ease: number;       
};

// Expanded Sec+/Net+ Data for testing limits
const defaultCards: Flashcard[] = [
  { id: '1', front: 'What port does SSH use?', back: 'Port 22', nextReview: 0, interval: 0, ease: 2.5 },
  { id: '2', front: 'What is the purpose of a SIEM?', back: 'Security Information and Event Management: Log aggregation and threat detection.', nextReview: 0, interval: 0, ease: 2.5 },
  { id: '3', front: 'Define Phishing', back: 'Social engineering attack using deceptive emails to steal credentials.', nextReview: 0, interval: 0, ease: 2.5 },
  { id: '4', front: 'What port does HTTPS use?', back: 'Port 443', nextReview: 0, interval: 0, ease: 2.5 },
  { id: '5', front: 'What is a zero-day exploit?', back: 'An attack that targets a previously unknown vulnerability before a patch is available.', nextReview: 0, interval: 0, ease: 2.5 },
  { id: '6', front: 'Explain the Principle of Least Privilege', back: 'Users should only have the minimum access necessary to perform their job functions.', nextReview: 0, interval: 0, ease: 2.5 },
];

export default function FlashcardsPage() {
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [studyQueue, setStudyQueue] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // App States: 'setup' | 'studying' | 'complete'
  const [appState, setAppState] = useState<'setup' | 'studying' | 'complete'>('setup');
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

  // Sync to LocalStorage
  useEffect(() => {
    if (deck.length > 0) {
      localStorage.setItem('matrix_flashcards_mod1', JSON.stringify(deck));
    }
  }, [deck]);

  // Derived Stats
  const dueCards = deck.filter(card => card.nextReview <= Date.now());
  const masteredCount = deck.filter(c => c.interval > 14).length;
  const learningCount = deck.filter(c => c.interval > 0 && c.interval <= 14).length;
  const newCount = deck.filter(c => c.interval === 0).length;

  const currentCard = studyQueue[currentIndex];

  // Initialize a study session
  const startSession = (limit: number, cramAll: boolean = false) => {
    let pool = cramAll ? [...deck] : [...dueCards];
    
    // Shuffle the pool for variety
    pool = pool.sort(() => Math.random() - 0.5);
    
    // Apply limit if not "All"
    if (limit > 0 && pool.length > limit) {
      pool = pool.slice(0, limit);
    }

    setStudyQueue(pool);
    setCurrentIndex(0);
    setIsFlipped(false);
    
    if (pool.length === 0) {
      setAppState('complete');
    } else {
      setAppState('studying');
    }
  };

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

    if (currentIndex + 1 >= studyQueue.length) {
      setAppState('complete');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  }, [deck, currentCard, currentIndex, studyQueue.length]);

  // Hardened Keyboard Bindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)) return;
      if (appState !== 'studying' || !currentCard) return;

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
  }, [isFlipped, appState, currentCard, handleGrade]);

  if (!mounted) return null;

  // ----------------------------------------------------------------
  // VIEW: SETUP
  // ----------------------------------------------------------------
  if (appState === 'setup') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-[#00FF41] font-mono p-4">
        <div className="w-full max-w-2xl border border-[#00FF41] p-6 sm:p-10 bg-[#000500] shadow-[0_0_15px_rgba(0,255,65,0.15)]">
          <h1 className="text-2xl sm:text-4xl mb-2 tracking-widest font-bold">SYSTEM.INITIALIZE</h1>
          <p className="text-gray-400 mb-8 text-sm sm:text-base">Select review batch parameters.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 text-sm sm:text-base border border-gray-800 p-4">
            <div><span className="text-blue-400">NEW:</span> {newCount}</div>
            <div><span className="text-yellow-500">LEARNING:</span> {learningCount}</div>
            <div><span className="text-[#00FF41]">MASTERED:</span> {masteredCount}</div>
            <div className="ml-auto text-white">TOTAL DUE: {dueCards.length}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={() => startSession(5)} className="p-4 border border-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-colors text-lg">
              QUICK REVIEW (5)
            </button>
            <button onClick={() => startSession(15)} className="p-4 border border-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-colors text-lg">
              STANDARD (15)
            </button>
            <button onClick={() => startSession(0)} className="p-4 border border-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-colors text-lg">
              ALL DUE ({dueCards.length})
            </button>
            <button onClick={() => startSession(0, true)} className="p-4 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors text-lg">
              CRAM OVERRIDE (ALL DECK)
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/course/module-1" className="text-gray-500 hover:text-[#00FF41] transition-colors text-sm">
              [ ESC ] CANCEL
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // VIEW: COMPLETE
  // ----------------------------------------------------------------
  if (appState === 'complete') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-[#00FF41] font-mono p-6">
        <h1 className="text-3xl sm:text-5xl mb-6 tracking-widest text-center" style={{ textShadow: '0 0 10px #00FF41' }}>
          SESSION.TERMINATED
        </h1>
        <p className="text-gray-400 mb-10 text-center sm:text-lg">Queue empty. Data successfully committed to memory.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link 
            href="/course/module-1"
            className="flex-1 text-center px-6 py-4 border border-gray-500 text-gray-500 hover:border-[#00FF41] hover:text-[#00FF41] transition-colors"
          >
            [ ESC ] RETURN
          </Link>
          <button 
            onClick={() => setAppState('setup')}
            className="flex-1 px-6 py-4 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-colors"
          >
            NEW SESSION
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // VIEW: STUDYING
  // ----------------------------------------------------------------
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-[#00FF41] p-4 sm:p-8 font-mono w-full overflow-hidden">
      <div className="w-full max-w-4xl mx-auto flex flex-col relative z-10 min-h-[85vh]">
        
        <div className="w-full mb-4 flex justify-between items-center">
          <button 
            onClick={() => setAppState('setup')}
            className="inline-block px-4 py-2 border border-gray-800 text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors text-xs sm:text-sm tracking-widest"
          >
            [ ABORT SESSION ]
          </button>
        </div>

        <div className="w-full mb-8">
          <div className="flex justify-between items-end mb-2 text-xs sm:text-sm">
            <div className="text-gray-500">
              MODULE 01 // ACTIVE QUEUE
            </div>
            <div className="text-right font-bold text-lg">
              {currentIndex + 1} / {studyQueue.length}
            </div>
          </div>
          <div className="w-full h-1 bg-gray-900 overflow-hidden">
            <div 
              className="h-full bg-[#00FF41] transition-all duration-300" 
              style={{ width: `${((currentIndex) / studyQueue.length) * 100}%`, boxShadow: '0 0 10px #00FF41' }}
            ></div>
          </div>
        </div>

        {/* BULLETPROOF CARD LAYOUT */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full flex-1 min-h-[400px] sm:min-h-[500px] cursor-pointer"
          style={{ perspective: '1200px' }}
        >
          <div 
            className="w-full h-full absolute transition-transform duration-700"
            style={{ 
              transformStyle: 'preserve-3d', 
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
            }}
          >
            
            {/* Front */}
            <div 
              className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 border-2 border-[#00FF41] bg-black hover:shadow-[0_0_30px_rgba(0,255,65,0.2)] transition-shadow"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="h-8"></div> {/* Spacer to push text to center */}
              
              <h2 className="text-3xl sm:text-5xl text-[#00FF41] text-center leading-tight font-bold">
                {currentCard.front}
              </h2>
              
              <div className="h-8 flex items-end justify-center">
                <span className="text-xs sm:text-sm text-gray-600 animate-pulse tracking-widest">
                  [ PRESS SPACE TO DECRYPT ]
                </span>
              </div>
            </div>

            {/* Back */}
            <div 
              className="absolute inset-0 flex flex-col justify-center items-center p-6 sm:p-12 border-2 border-[#00FF41] bg-[#000a00]"
              style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'rotateY(180deg)',
                boxShadow: '0 0 25px rgba(0,255,65,0.15)' 
              }}
            >
              <h2 className="text-xl sm:text-4xl text-[#00FF41] text-center leading-relaxed font-light">
                {currentCard.back}
              </h2>
            </div>

          </div>
        </div>

        {/* SRS Controls Container */}
        <div className="mt-6 min-h-[100px]">
          <div className={`w-full grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <button onClick={(e) => { e.stopPropagation(); handleGrade('again'); }} className="py-4 border border-gray-800 text-red-500 hover:bg-red-500 hover:text-black uppercase text-sm sm:text-base tracking-widest transition-colors flex flex-row sm:flex-col justify-between sm:justify-center items-center px-4 bg-black">
              <span>[1] AGAIN</span>
              <span className="text-xs opacity-70 sm:mt-1">&lt; 1m</span>
            </button>
            
            <button onClick={(e) => { e.stopPropagation(); handleGrade('hard'); }} className="py-4 border border-gray-800 text-yellow-500 hover:bg-yellow-500 hover:text-black uppercase text-sm sm:text-base tracking-widest transition-colors flex flex-row sm:flex-col justify-between sm:justify-center items-center px-4 bg-black">
              <span>[2] HARD</span>
              <span className="text-xs opacity-70 sm:mt-1">10m</span>
            </button>
            
            <button onClick={(e) => { e.stopPropagation(); handleGrade('good'); }} className="py-4 border border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black uppercase text-sm sm:text-base tracking-widest transition-colors flex flex-row sm:flex-col justify-between sm:justify-center items-center px-4 bg-[#001100] shadow-[0_0_10px_rgba(0,255,65,0.1)]">
              <span>[3] GOOD</span>
              <span className="text-xs opacity-70 sm:mt-1">1d</span>
            </button>
            
            <button onClick={(e) => { e.stopPropagation(); handleGrade('easy'); }} className="py-4 border border-gray-800 text-blue-400 hover:bg-blue-400 hover:text-black uppercase text-sm sm:text-base tracking-widest transition-colors flex flex-row sm:flex-col justify-between sm:justify-center items-center px-4 bg-black">
              <span>[4] EASY</span>
              <span className="text-xs opacity-70 sm:mt-1">4d</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}