"use client";

import { useState } from "react";
import Link from "next/link";

export interface Simulation {
  id: string;
  label: string;
  component: React.ReactNode;
}

interface InteractiveViewerProps {
  title: string;
  description: string;
  backLink: string;
  backLabel: string;
  simulations: Simulation[];
}

export default function InteractiveViewer({
  title,
  description,
  backLink,
  backLabel,
  simulations,
}: InteractiveViewerProps) {
  // Track active tab by the array index
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto flex flex-col">
      <Link href={backLink} className="text-[#00ff41] hover:underline text-sm mb-8">
        &lt; {backLabel}
      </Link>

      <div className="mb-8 border-b border-[#00ff41]/30 pb-4">
        <h1 className="text-3xl font-bold text-white uppercase tracking-widest">{title}</h1>
        <p className="text-gray-400 mt-2">{description}</p>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap gap-4 mb-8">
        {simulations.map((sim, index) => (
          <button
            key={sim.id}
            onClick={() => setActiveIndex(index)}
            className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
              activeIndex === index
                ? 'bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]'
                : 'border border-gray-700 text-[#00ff41] hover:border-[#00ff41]'
            }`}
          >
            {sim.label}
          </button>
        ))}
      </div>

      {/* ACTIVE SIMULATION DISPLAY */}
      <div className="bg-black/40 border border-gray-800 p-2 md:p-8 rounded-lg shadow-[0_0_30px_rgba(0,255,65,0.05)] min-h-[500px]">
        {simulations[activeIndex]?.component}
      </div>
    </div>
  );
}