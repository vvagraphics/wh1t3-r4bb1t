import MediaViewer, { MediaVideo } from "@/components/MediaViewer";

const globalVideoArchive: MediaVideo[] = [
  {
    id: "vid-mod1",
    moduleId: "01",
    title: "Intro to Networking",
    description: "Core networking concepts, OSI model, and TCP/IP overview.",
    sourceUrl: "https://www.youtube.com/embed/cLuIbQkx0qo",
  },
  {
    id: "vid-mod2",
    moduleId: "02",
    title: "Addressing Fundamentals",
    description: "Deep dive into MAC, IPv4, IPv6, Subnetting, and NAT/PAT.",
    sourceUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "vid-mod3",
    moduleId: "03",
    title: "Network Topologies",
    description:
      "Professor Messer covers Star, Hub-and-Spoke, Mesh, Hybrid, Spine and Leaf, and Point-to-Point topologies.",
    sourceUrl: "https://www.youtube.com/embed/3ARTjvpZCoQ",
  },
  {
    id: "vid-mod4-1",
    moduleId: "04",
    title: "Copper Cabling - CompTIA Network+ N10-009 - 1.5",
    description:
      "Professor Messer reviews twisted pair (UTP/STP), coaxial, twinaxial, and plenum-rated cable standards.",
    sourceUrl: "https://www.youtube.com/embed/zoefzxHIfPc",
  },
  {
    id: "vid-mod4-2",
    moduleId: "04",
    title: "Copper Connectors - CompTIA Network+ N10-009 - 1.5",
    description:
      "Deep dive into copper connector types including RJ11, RJ45, F-connectors, and BNC connectors.",
    sourceUrl: "https://www.youtube.com/embed/Ca6rzoQm15w",
  },
];

export default function Module4Media() {
  return (
    <MediaViewer
      currentModuleId="04"
      returnHref="/course/network-plus/module-4"
      videos={globalVideoArchive}
    />
  );
}