import CheatsheetViewer, { Cheatsheet } from "@/components/CheatsheetViewer";

const mod1Cheatsheets: Cheatsheet[] = [
  {
    id: "m1-osi-tcpip-map",
    title: "01: OSI vs TCP/IP Model",
    description: "Architectural comparison of the 7-layer OSI model and 4-layer TCP/IP protocol suite.",
    imageUrl: "/media/module-1/m1-osi-model-layers.jpg",
  },
  {
    id: "m1-traffic-types",
    title: "02: Traffic Delivery Types",
    description: "Visual breakdown of Unicast, Broadcast, Multicast, and Anycast network communication flows.",
    imageUrl: "/media/module-1/traffic_types_module_1.jpg",
  },
  {
    id: "m1-environmental-sensors",
    title: "03: Environmental Hazards & Sensors",
    description: "Datacenter environmental thresholds, temperature, humidity, and ESD monitoring best practices.",
    imageUrl: "/media/module-1/environmental hazards_sensors.jpg",
  },
  {
    id: "m1-traffic_types_module_2",
    title: "04: Network Topologies",
    description: "Overview of physical and logical topologies including Star, Mesh, Bus, and Ring structures.",
    imageUrl: "/media/module-1/traffic_types_module_2.jpg",
  },
  {
    id: "m1-osi-tcpip-map2",
    title: "04: Network Topologies",
    description: "Overview of physical and logical topologies including Star, Mesh, Bus, and Ring structures.",
    imageUrl: "/media/module-1/m1-osi-tcpip-map.jpg",
  },
  {
    id: "m1-encapsulation-flow",
    title: "04: Network Topologies",
    description: "Overview of physical and logical topologies including Star, Mesh, Bus, and Ring structures.",
    imageUrl: "/media/module-1/m1-encapsulation-flow.jpg",
  }
];

export default function Module1Cheatsheets() {
  return (
    <CheatsheetViewer
      moduleTitle="MOD 01 // CORE NETWORKING"
      returnHref="/course/network-plus/module-1"
      cheatsheets={mod1Cheatsheets}
    />
  );
}