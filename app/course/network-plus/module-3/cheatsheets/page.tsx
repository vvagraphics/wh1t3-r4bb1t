import CheatsheetViewer, { Cheatsheet } from "@/components/CheatsheetViewer";

const mod3Cheatsheets: Cheatsheet[] = [
  {
    id: "m3-copper-fiber",
    title: "01: Copper vs Fiber Media",
    description: "UTP/STP shielding, categories, and Single-Mode vs Multi-Mode fiber core comparisons.",
    imageUrl: "/media/module-3/copper-vs-fiber-media.jpg",
  },
  {
    id: "m3-connectors",
    title: "02: Network Connectors Reference",
    description: "Visual standard guide for RJ-45, RJ-11, F-Type, BNC, LC, SC, and MPO/MTP connectors.",
    imageUrl: "/media/module-3/network-connectors-guide.jpg",
  },
  {
    id: "m3-topologies",
    title: "03: Network Topologies Architecture",
    description: "Star, Hub-and-Spoke, Mesh, Point-to-Point, and modern Spine-and-Leaf data center designs.",
    imageUrl: "/media/module-3/network-topologies-overview.jpg",
  },
  {
    id: "m3-network-devices",
    title: "04: Core Infrastructure Devices",
    description: "Layer 2 vs Layer 3 devices: Switches, Routers, Firewalls, and Wireless Access Points (WAPs).",
    imageUrl: "/media/module-3/core-network-devices.jpg",
  },
];

export default function Module3Cheatsheets() {
  return (
    <CheatsheetViewer
      moduleTitle="MOD 03 // NETWORK MEDIA, TOPOLOGIES & DEVICES"
      returnHref="/course/network-plus/module-3"
      cheatsheets={mod3Cheatsheets}
    />
  );
}