"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CheatsheetsPage() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto flex flex-col">
      <Link href="/course/network-plus/module-1" className="text-[#00ff41] hover:underline text-sm mb-8">
        &lt; Back to Module 01 Hub
      </Link>

      <div className="mb-8 border-b border-[#00ff41]/30 pb-4">
        <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Technical Cheatsheets</h1>
        <p className="text-gray-400 mt-2">Visual reference guides for rapid knowledge retrieval.</p>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveTab(1)}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
            activeTab === 1 
              ? 'bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]' 
              : 'border border-gray-700 text-[#00ff41] hover:border-[#00ff41]'
          }`}
        >
          OSI vs TCP/IP Map
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
            activeTab === 2 
              ? 'bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]' 
              : 'border border-gray-700 text-[#00ff41] hover:border-[#00ff41]'
          }`}
        >
          Traffic Delivery Types
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
            activeTab === 3 
              ? 'bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.6)]' 
              : 'border border-gray-700 text-[#00ff41] hover:border-[#00ff41]'
          }`}
        >
          Environmental Sensors
        </button>
      </div>

      {/* ACTIVE IMAGE DISPLAY */}
      <div className="bg-black/60 border border-gray-800 p-4 md:p-8 rounded-lg shadow-[0_0_30px_rgba(0,255,65,0.05)] flex justify-center items-center min-h-[600px] relative">
        
        {activeTab === 1 && (
          <div className="relative w-full max-w-4xl h-[600px]">
            {/* Note: Ensure this matches the exact filename in your public/media/module-1 folder */}
            <Image 
              src="/media/module-1/m1-osi-model-layers.jpg" 
              alt="OSI and TCP/IP Model Layers" 
              fill
              className="object-contain"
            />
          </div>
        )}

        {activeTab === 2 && (
          <div className="relative w-full max-w-4xl h-[600px]">
            <Image 
              src="/media/module-1/traffic_types_module_1.jpg" 
              alt="Network Traffic Delivery Types" 
              fill
              className="object-contain"
            />
          </div>
        )}

        {activeTab === 3 && (
          <div className="relative w-full max-w-4xl h-[600px]">
            <Image 
              src="/media/module-1/environmental hazards_sensors.jpg" 
              alt="Environmental Hazard Management" 
              fill
              className="object-contain"
            />
          </div>
        )}

      </div>
    </div>
  );
}