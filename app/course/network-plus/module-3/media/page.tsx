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
    title: "Network Topologies - CompTIA Network+ N10-009 - 1.6",
    description:
      "Professor Messer covers Star, Hub-and-Spoke, Mesh, Hybrid, Spine and Leaf, and Point-to-Point topologies.",
    sourceUrl: "https://www.youtube.com/embed/3ARTjvpZCoQ",
  },
];

export default function Module3Media() {
  return (
    <MediaViewer
      currentModuleId="03"
      returnHref="/course/network-plus/module-3"
      videos={globalVideoArchive}
    />
  );
}