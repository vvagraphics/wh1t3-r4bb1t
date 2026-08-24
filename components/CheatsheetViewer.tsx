"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface Cheatsheet {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface CheatsheetViewerProps {
  moduleTitle: string;
  returnHref: string;
  cheatsheets: Cheatsheet[];
}

export default function CheatsheetViewer({ moduleTitle, returnHref, cheatsheets }: CheatsheetViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const activeSheet = cheatsheets[activeIndex];

  return (
    <div className="min-h-screen bg-black text-white font-mono p-6 md:p-12 lg:p-16 max-w-6xl mx-auto flex flex-col">
      {/* Return Link */}
      <Link href={returnHref} className="text-[#00ff41] hover:underline text-xs md:text-sm mb-8 tracking-wider">
        &lt; RETURN_TO_DIRECTORY
      </Link>

      {/* Header */}
      <div className="mb-8 border-b border-[#00ff41]/30 pb-4">
        <h1 className="text-3xl md:text-5xl font-bold text-[#00ff41] uppercase tracking-widest text-shadow-neon">
          {moduleTitle} // Cheatsheets
        </h1>
        <p className="text-gray-400 mt-2 tracking-wide">Visual reference guides for rapid knowledge retrieval.</p>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap gap-4 mb-8">
        {cheatsheets.map((sheet, index) => (
          <button
            key={sheet.id}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              activeIndex === index
                ? "bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]"
                : "border border-green-900 text-[#00ff41] hover:bg-green-950/30"
            }`}
          >
            {sheet.title}
          </button>
        ))}
      </div>

      {/* IMAGE DISPLAY CONTAINER */}
      <div className="bg-black/60 border border-green-900 p-4 md:p-6 shadow-[0_0_30px_rgba(0,255,65,0.05)] flex flex-col min-h-[500px] md:min-h-[600px] relative">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-green-500 uppercase tracking-widest">FILE // {activeSheet.id}</span>
          <div className="flex gap-4">
            {/* Zoom Button */}
            <button 
              onClick={() => setIsZoomed(true)}
              className="text-xs text-[#00ff41] border border-[#00ff41] px-3 py-1 hover:bg-[#00ff41] hover:text-black transition-colors uppercase"
            >
              [ ENLARGE ]
            </button>
            {/* Download Button */}
            <a 
              href={activeSheet.imageUrl} 
              download={`${activeSheet.id}.jpg`}
              className="text-xs text-[#00ff41] border border-[#00ff41] px-3 py-1 hover:bg-[#00ff41] hover:text-black transition-colors uppercase"
            >
              [ DOWNLOAD ]
            </a>
          </div>
        </div>

        {/* The Image */}
        <div className="relative w-full flex-grow border border-green-950/50 bg-black flex items-center justify-center overflow-hidden cursor-zoom-in" onClick={() => setIsZoomed(true)}>
          <Image
            src={activeSheet.imageUrl}
            alt={activeSheet.title}
            fill
            className="object-contain"
          />
        </div>
        <p className="text-center text-gray-500 text-xs mt-4 uppercase tracking-widest">{activeSheet.description}</p>
      </div>

      {/* FULLSCREEN ZOOM MODAL */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out" onClick={() => setIsZoomed(false)}>
          <div className="absolute top-6 right-6 text-[#00ff41] font-bold text-xl uppercase tracking-widest">
            [ CLOSE_X ]
          </div>
          <div className="relative w-full h-full max-w-7xl max-h-screen">
            <Image
              src={activeSheet.imageUrl}
              alt={activeSheet.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}