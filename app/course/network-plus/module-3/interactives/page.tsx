"use client";
import InteractiveViewer, { Simulation } from "@/components/InteractiveViewer";

export default function Module3InteractivesPage() {
  const simulations: Simulation[] = [
    {
      id: "media-connector",
      label: "01_CABLE_TERMINATOR",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">[ SIMULATOR 01: MEDIA & CONNECTOR LAB ]</p>
          <span className="text-xs text-gray-500">Awaiting component wiring for UTP/Fiber matching.</span>
        </div>
      ),
    },
    {
      id: "topology-architect",
      label: "02_TOPOLOGY_ARCHITECT",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">[ SIMULATOR 02: SPINE-LEAF BUILDER ]</p>
          <span className="text-xs text-gray-500">Awaiting component wiring for topology mapping.</span>
        </div>
      ),
    },
    {
      id: "mac-learning",
      label: "03_MAC_LEARNING",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">[ SIMULATOR 03: SWITCH MAC ENGINE ]</p>
          <span className="text-xs text-gray-500">Awaiting component wiring for Layer 2 forwarding.</span>
        </div>
      ),
    },
    {
      id: "firewall-acl",
      label: "04_FIREWALL_ACL",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">[ SIMULATOR 04: ACL CONFIGURATOR ]</p>
          <span className="text-xs text-gray-500">Awaiting component wiring for packet filtering rules.</span>
        </div>
      ),
    }
  ];

  return (
    <InteractiveViewer
      title="Sector 03 // Interactives"
      description="Apply your knowledge of cabling, network design, and device logic."
      backLink="/course/network-plus/module-3"
      backLabel="Return to Sector 03 Menu"
      simulations={simulations}
    />
  );
}