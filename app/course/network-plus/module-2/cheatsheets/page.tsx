import CheatsheetViewer, { Cheatsheet } from "@/components/CheatsheetViewer";

const mod2Cheatsheets: Cheatsheet[] = [
  {
    id: "m2-mac-vs-ip",
    title: "01: MAC vs IP Anatomy",
    description: "Architectural comparison of 48-bit hardware MAC vs 32-bit logical IPv4 addressing.",
    imageUrl: "/media/module-2/mac-vs-ip-anatomy.jpg",
  },
  {
    id: "m2-nat-pat-flow",
    title: "02: NAT/PAT Socket Translation",
    description: "Stateful translation map of RFC 1918 private IPs routing through PAT gateway sockets.",
    imageUrl: "/media/module-2/nat-pat-translation-flow.jpg",
  },
  {
    id: "m2-ipv6-compression",
    title: "03: IPv6 Structure & Rules",
    description: "128-bit hextet structure, leading zero suppression, and double colon compression rules.",
    imageUrl: "/media/module-2/ipv6-structure-compression.jpg",
  },
  {
    id: "m2-lan-vs-wan",
    title: "04: LAN vs WAN Connectivity",
    description: "Local area vs wide area topologies, default gateways, and modem ISP bridging.",
    imageUrl: "/media/module-2/lan-vs-wan-connectivity.jpg",
  },
];

export default function Module2Cheatsheets() {
  return (
    <CheatsheetViewer
      moduleTitle="MOD 02 // ADDRESSING FUNDAMENTALS"
      returnHref="/course/network-plus/module-2"
      cheatsheets={mod2Cheatsheets}
    />
  );
}