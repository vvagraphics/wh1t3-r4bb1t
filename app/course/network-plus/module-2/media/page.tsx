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
    sourceUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your Module 2 video link
  },
  // You can easily add Module 3, 4, etc. here later!
];

export default function Module2Media() {
  return (
    <MediaViewer 
      currentModuleId="02"
      returnHref="/course/network-plus/module-2"
      videos={globalVideoArchive}
    />
  );
}