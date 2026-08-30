"use client";
import InteractiveViewer, { Simulation } from "@/components/InteractiveViewer";

export default function Module4InteractivesPage() {
  const simulations: Simulation[] = [
    {
      id: "t568-wiring",
      label: "01_RJ45_CRIMPER",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">[ SIMULATOR 01: T568A/B WIRING LAB ]</p>
          <span className="text-xs text-gray-500">Awaiting component wiring for pinout configuration.</span>
        </div>
      ),
    },
    {
      id: "cable-tester",
      label: "02_WIREMAP_TESTER",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">[ SIMULATOR 02: CABLE DIAGNOSTICS ]</p>
          <span className="text-xs text-gray-500">Awaiting component wiring for fault detection.</span>
        </div>
      ),
    },
    {
      id: "rack-builder",
      label: "03_MDF_RACK_BUILD",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">[ SIMULATOR 03: DATA CENTER RACK ]</p>
          <span className="text-xs text-gray-500">Awaiting component wiring for physical layout.</span>
        </div>
      ),
    },
    {
      id: "poe-budget",
      label: "04_POE_CALCULATOR",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">[ SIMULATOR 04: POE WATTAGE BUDGET ]</p>
          <span className="text-xs text-gray-500">Awaiting component wiring for power allocation.</span>
        </div>
      ),
    }
  ];

  return (
    <InteractiveViewer
      title="Sector 04 // Interactives"
      description="Hands-on cabling, testing, and facility management simulations."
      backLink="/course/network-plus/module-4"
      backLabel="Return to Sector 04 Menu"
      simulations={simulations}
    />
  );
}