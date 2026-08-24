"use client";

import { useState } from "react";
import Link from "next/link";
// IMPORT YOUR GENERATED COMPONENTS HERE ONCE CREATED:
// import BinaryDecoder from "./components/BinaryDecoder";
// import IPv6Condenser from "./components/IPv6Condenser";
// import IPTriage from "./components/IPTriage";
// import NATSimulator from "./components/NATSimulator";

export default function Module2Interactives() {
  const [activeTab, setActiveTab] = useState("binary");

  return (
    <div className="min-h-screen bg-black text-white font-mono p-6 md:p-12 lg:p-16 max-w-6xl mx-auto flex flex-col select-none">
      
      {/* Navigation Return */}
      <div className="mb-8">
        <Link 
          href="/course/network-plus/module-2" 
          className="text-xs md:text-sm font-bold text-gray-400 hover:text-[#00ff41] transition-colors uppercase tracking-wider"
        >
          &lt; Return to Sector 02 Menu
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 border-b border-green-950 pb-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-[#00ff41] uppercase text-shadow-neon">
          Interactive Simulations
        </h1>
        <p className="text-xs md:text-sm text-gray-400 mt-2 tracking-wide">
          &gt; Select a protocol simulator to begin hands-on routing exercises.
        </p>
      </div>

      {/* Terminal UI Container */}
      <div className="flex-grow flex flex-col border border-green-900/50 bg-black/60 shadow-[0_0_15px_rgba(0,255,65,0.1)]">
        
        {/* Tab Navigation */}
        <div className="flex border-b border-green-900/50 bg-green-950/20 overflow-x-auto hide-scrollbar">
          {[
            { id: "binary", label: "01_BIN_DECODER" },
            { id: "ipv6", label: "02_IPV6_COMPRESS" },
            { id: "triage", label: "03_IP_TRIAGE" },
            { id: "nat", label: "04_NAT_PAT_SIM" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? "text-[#00ff41] border-b-2 border-[#00ff41] bg-black" 
                  : "text-green-800 hover:text-green-500 hover:bg-green-900/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Content Area */}
        <div className="flex-grow p-6 md:p-8 relative">
          {activeTab === "binary" && (
            <div className="h-full w-full flex items-center justify-center border border-dashed border-green-900/30 p-8 text-green-700">
              {/* <BinaryDecoder /> */}
              [ SIMULATOR 01: BINARY DECODER COMPONENT INJECTED HERE ]
            </div>
          )}
          {activeTab === "ipv6" && (
            <div className="h-full w-full flex items-center justify-center border border-dashed border-green-900/30 p-8 text-green-700">
              {/* <IPv6Condenser /> */}
              [ SIMULATOR 02: IPV6 ENGINE COMPONENT INJECTED HERE ]
            </div>
          )}
          {activeTab === "triage" && (
            <div className="h-full w-full flex items-center justify-center border border-dashed border-green-900/30 p-8 text-green-700">
              {/* <IPTriage /> */}
              [ SIMULATOR 03: IP TRIAGE COMPONENT INJECTED HERE ]
            </div>
          )}
          {activeTab === "nat" && (
            <div className="h-full w-full flex items-center justify-center border border-dashed border-green-900/30 p-8 text-green-700">
              {/* <NATSimulator /> */}
              [ SIMULATOR 04: NAT/PAT TERMINAL COMPONENT INJECTED HERE ]
            </div>
          )}
        </div>

      </div>
    </div>
  );
}