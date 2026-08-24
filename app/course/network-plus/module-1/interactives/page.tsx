"use client";

import { useState } from "react";
import Link from "next/link";
import OsiDragAndDrop from "@/src/components/Interactives/Module1/OsiDragAndDrop";
import TrafficTypeSimulator from "@/src/components/Interactives/Module1/TrafficTypeSimulator";
import PduEncapsulation from "@/src/components/Interactives/Module1/PduEncapsulation"; 
import NetworkLabMatrix from "@/src/components/Interactives/Module1/NetworkLabMatrix";
import SubnetCalculator from "@/src/components/Interactives/Module1/SubnetCalculator";

export default function InteractivesPage() {
  // This state tracks which tab is currently active (default is 1)
  const [activeSim, setActiveSim] = useState(1);

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto flex flex-col">
      <Link href="/course/network-plus/module-1" className="text-[#00ff41] hover:underline text-sm mb-8">
        &lt; Back to Module 01 Hub
      </Link>

      <div className="mb-8 border-b border-[#00ff41]/30 pb-4">
        <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Interactive Protocols</h1>
        <p className="text-gray-400 mt-2">Execute simulation environments to test theoretical knowledge.</p>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveSim(1)}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
            activeSim === 1 
              ? 'bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]' 
              : 'border border-gray-700 text-[#00ff41] hover:border-[#00ff41]'
          }`}
        >
          01: OSI Layer Triage
        </button>
        <button
          onClick={() => setActiveSim(2)}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
            activeSim === 2 
              ? 'bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]' 
              : 'border border-gray-700 text-[#00ff41] hover:border-[#00ff41]'
          }`}
        >
          02: Traffic Flow
        </button>
        <button
          onClick={() => setActiveSim(3)}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
            activeSim === 3 
              ? 'bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]' 
              : 'border border-gray-700 text-[#00ff41] hover:border-[#00ff41]'
          }`}
        >
          03: PDU Encapsulation
        </button>
        <button
          onClick={() => setActiveSim(4)}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
            activeSim === 4 
              ? 'bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]' 
              : 'border border-gray-700 text-[#00ff41] hover:border-[#00ff41]'
          }`}
        >
          04: Network Lab Matrix
        </button>
        <button
          onClick={() => setActiveSim(5)}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
            activeSim === 5 
              ? 'bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]' 
              : 'border border-gray-700 text-[#00ff41] hover:border-[#00ff41]'
          }`}
        >
          05: Subnet Calculator
        </button>
      </div>

      {/* ACTIVE SIMULATION DISPLAY */}
      <div className="bg-black/40 border border-gray-800 p-2 md:p-8 rounded-lg shadow-[0_0_30px_rgba(0,255,65,0.05)] min-h-[500px]">
        {activeSim === 1 && <OsiDragAndDrop />}
        {activeSim === 2 && <TrafficTypeSimulator />}
        {activeSim === 3 && <PduEncapsulation />}
        {activeSim === 4 && <NetworkLabMatrix />}
        {activeSim === 5 && <SubnetCalculator />}
      </div>

    </div>
  );
}