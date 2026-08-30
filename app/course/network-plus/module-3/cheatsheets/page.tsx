"use client";
import CheatsheetViewer from "@/components/CheatsheetViewer";

export default function Module3CheatsheetPage() {
  const sections = [
    {
      title: "Copper vs. Fiber Media",
      content: "UTP: Unshielded Twisted Pair (Cat5e, Cat6). STP: Shielded for high EMI.\nSMF: Single-mode Fiber (Yellow, narrow core, long distance).\nMMF: Multimode Fiber (Aqua/Orange, larger core, shorter distance)."
    },
    {
      title: "Connectors",
      content: "RJ-45: Standard Ethernet copper.\nLC: Small form factor fiber (Little Connector).\nSC: Snap-in fiber (Square Connector).\nMPO: Multi-fiber for high density."
    },
    {
      title: "Topologies",
      content: "Star: Central switch (common LAN).\nSpine-Leaf: Modern Data Center standard (predictable latency).\nHub-and-Spoke: Central hub linking branch offices (WANs).\nMesh: High redundancy/reliability."
    },
    {
      title: "Network Devices",
      content: "Switch (L2): MAC address learning, VLANs, STP.\nRouter (L3): IP forwarding, WANs, static/dynamic routing.\nFirewall: Packet filtering, stateful/stateless, ACLs.\nWAP: Wireless access point, standalone vs controller-based."
    }
  ];

  return (
    <CheatsheetViewer
      title="Sector 03 // Cheatsheets"
      description="Quick reference for media, connectors, and topologies."
      backLink="/course/network-plus/module-3"
      backLabel="Return to Sector 03 Menu"
      sections={sections}
    />
  );
}