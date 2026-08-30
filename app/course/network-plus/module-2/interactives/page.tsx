"use client";

import InteractiveViewer, { Simulation } from "@/components/InteractiveViewer";
import OsiTcpIpExplorer from "@/components/Interactives/Module2/OsiTcpIpExplorer";

export default function Module2InteractivesPage() {
  const simulations: Simulation[] = [
    {
      id: "osi-tcpip",
      label: "01_OSI_TCPIP_EXPLORER",
      component: <OsiTcpIpExplorer />,
    },
    {
      id: "binary-decoder",
      label: "02_BIN_DECODER",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">
            [ SIMULATOR 02: BINARY DECODER ]
          </p>
          <span className="text-xs text-gray-500">
            Awaiting module documentation to wire the sub-component.
          </span>
        </div>
      ),
    },
    {
      id: "ipv6-condenser",
      label: "03_IPV6_COMPRESS",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">
            [ SIMULATOR 03: IPV6 COMPRESSION ENGINE ]
          </p>
          <span className="text-xs text-gray-500">
            Awaiting module documentation to wire the sub-component.
          </span>
        </div>
      ),
    },
    {
      id: "ip-triage",
      label: "04_IP_TRIAGE",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">
            [ SIMULATOR 04: IP TRIAGE TERMINAL ]
          </p>
          <span className="text-xs text-gray-500">
            Awaiting module documentation to wire the sub-component.
          </span>
        </div>
      ),
    },
    {
      id: "nat-pat",
      label: "05_NAT_PAT_SIM",
      component: (
        <div className="h-96 w-full flex flex-col items-center justify-center border border-dashed border-[#00ff41]/30 p-8 text-[#00ff41]/70 font-mono text-center">
          <p className="text-lg font-bold uppercase tracking-wider mb-2">
            [ SIMULATOR 05: NAT/PAT SIMULATOR ]
          </p>
          <span className="text-xs text-gray-500">
            Awaiting module documentation to wire the sub-component.
          </span>
        </div>
      ),
    },
  ];

  return (
    <InteractiveViewer
      title="Sector 02 // Interactive Simulations"
      description="Select a protocol simulator below to begin interactive network models and hands-on exercises."
      backLink="/course/network-plus/module-2"
      backLabel="Return to Sector 02 Menu"
      simulations={simulations}
    />
  );
}