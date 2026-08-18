"use client";

import Link from "next/link";
// 1. Import your interactive component here. 
// Change "OsiSimulator" to whatever your actual file is named!
import OsiDragAndDrop from "@/components/Interactives/Module1/OsiDragAndDrop";
import TrafficTypeSimulator from "@/components/Interactives/Module1/TrafficTypeSimulator";
import PduEncapsulation from "@/components/Interactives/Module1/PduEncapsulation";

export default function InteractivesPage() {
  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto flex flex-col">
      <Link href="/course/module-1" className="text-[#00ff41] hover:underline text-sm mb-8">
        &lt; Back to Module 01 Hub
      </Link>

      <div className="mb-12 border-b border-[#00ff41]/30 pb-4">
        <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Interactive Protocols</h1>
        <p className="text-gray-400 mt-2">Execute simulation environments to test theoretical knowledge.</p>
      </div>

      <div className="space-y-16">
        {/* 2. Render your component by wrapping it in brackets like an HTML tag */}
        <section className="bg-black/50 border border-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-[#00ff41] mb-4"> Simulation 01: OSI Layer Mapping</h2>
          <OsiDragAndDrop /> 
        </section>

        {/* You can stack as many interactives as you generated here */}
        <section className="bg-black/50 border border-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-[#00ff41] mb-4"> Simulation 02: Network Traffic Flow</h2>
          <TrafficTypeSimulator />
        </section>
        <section className="bg-black/50 border border-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-[#00ff41] mb-4"> Simulation 03: PDU Encapsulation</h2>
          <PduEncapsulation />
        </section>
      </div>

    </div>
  );
}