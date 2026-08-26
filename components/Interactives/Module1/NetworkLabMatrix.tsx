"use client";

import React, { useState } from "react";

// --- Types & Data ---
type TabType = "matrix" | "encapsulation" | "handshake" | "arp_dora";

interface LayerData {
  layerNum: number;
  osiName: string;
  tcpIpLayer: string;
  pdu: string;
  altPdu: string;
  hardware: string;
  description: string;
  example: string;
}

const OSI_LAYERS: LayerData[] = [
  {
    layerNum: 7,
    osiName: "Application",
    tcpIpLayer: "Application",
    pdu: "Data",
    altPdu: "Message / Payload",
    hardware: "Gateway / Host / Proxy",
    description: "User-facing services and protocols interacting directly with software.",
    example: "HTTP, HTTPS, DNS, DHCP, FTP, SMTP",
  },
  {
    layerNum: 6,
    osiName: "Presentation",
    tcpIpLayer: "Application",
    pdu: "Data",
    altPdu: "Payload (Upper-layer)",
    hardware: "Operating System / Libraries",
    description: "Translation, compression, and encryption/formatting (SSL/TLS, ASCII).",
    example: "TLS/SSL, JPEG, ASCII, PNG",
  },
  {
    layerNum: 5,
    osiName: "Session",
    tcpIpLayer: "Application",
    pdu: "Data",
    altPdu: "Session Stream",
    hardware: "Operating System / APIs",
    description: "Sets up, manages, coordinates, and tears down communication sessions.",
    example: "RPC, NetBIOS, API Tokens, Sockets",
  },
  {
    layerNum: 4,
    osiName: "Transport",
    tcpIpLayer: "Transport",
    pdu: "Segment (TCP) / Datagram (UDP)",
    altPdu: "Transport Stream",
    hardware: "Load Balancer / Multilayer Switch",
    description: "End-to-end delivery, segmentation, virtual port multiplexing, and reliability.",
    example: "TCP (Handshake/ACK), UDP, Ports 0-65535",
  },
  {
    layerNum: 3,
    osiName: "Network",
    tcpIpLayer: "Internet",
    pdu: "Packet",
    altPdu: "IP Datagram / L3 PDU",
    hardware: "Router / Layer 3 Switch",
    description: "Logical addressing (IP), route discovery, and forwarding across networks/hops.",
    example: "IPv4, IPv6, ICMP (Ping/Tracert), Routers",
  },
  {
    layerNum: 2,
    osiName: "Data Link",
    tcpIpLayer: "Network Access",
    pdu: "Frame",
    altPdu: "Ethernet Frame / L2 PDU",
    hardware: "Managed/Unmanaged Switch, NIC, Bridge",
    description: "Local physical addressing (MACs), frame assembly, VLANs, and error checking (CRC).",
    example: "Ethernet (802.3), Wi-Fi (802.11), MAC Address, ARP",
  },
  {
    layerNum: 1,
    osiName: "Physical",
    tcpIpLayer: "Network Access",
    pdu: "Bits",
    altPdu: "Signals / Voltage / Pulses",
    hardware: "Hub, Cables (Cat6/Fiber), Transceiver, RJ-45",
    description: "Raw signal transmission via electricity, light pulses, or RF radio waves.",
    example: "1000BASE-T, Fiber Optic, Radio Waves, RJ-45 pins",
  },
];

export default function NetworkLabMatrix() {
  const [activeTab, setActiveTab] = useState<TabType>("encapsulation");

  // Encapsulation Interactive State
  const [encapStep, setEncapStep] = useState<number>(0);
  const [isDecapsulating, setIsDecapsulating] = useState<boolean>(false);

  // 3-Way Handshake State
  const [handshakeStep, setHandshakeStep] = useState<number>(0);
  const [activeProtocol, setActiveProtocol] = useState<"TCP" | "UDP">("TCP");

  // DORA & ARP Simulator State
  const [doraStep, setDoraStep] = useState<number>(0);
  const [arpTriggered, setArpTriggered] = useState<boolean>(false);

  // PBQ Matching State
  const [selectedPduMatches, setSelectedPduMatches] = useState<Record<number, string>>({});
  const [selectedHwMatches, setSelectedHwMatches] = useState<Record<number, string>>({});
  const [matrixChecked, setMatrixChecked] = useState<boolean>(false);

  const pduOptions = ["Data", "Segment / Datagram", "Packet", "Frame", "Bits"];
  const hwOptions = [
    "Router / Layer 3 Switch",
    "Managed Switch / NIC",
    "Cables / Hubs / Transceiver",
    "Load Balancer / Gateway",
    "Host Application / OS",
  ];

  const handlePduSelect = (layerNum: number, value: string) => {
    setSelectedPduMatches((prev) => ({ ...prev, [layerNum]: value }));
  };

  const handleHwSelect = (layerNum: number, value: string) => {
    setSelectedHwMatches((prev) => ({ ...prev, [layerNum]: value }));
  };

  const resetMatrixQuiz = () => {
    setSelectedPduMatches({});
    setSelectedHwMatches({});
    setMatrixChecked(false);
  };

  const getPduCorrectness = (layerNum: number): boolean => {
    const val = selectedPduMatches[layerNum];
    if (!val) return false;
    if (layerNum >= 5 && val === "Data") return true;
    if (layerNum === 4 && val === "Segment / Datagram") return true;
    if (layerNum === 3 && val === "Packet") return true;
    if (layerNum === 2 && val === "Frame") return true;
    if (layerNum === 1 && val === "Bits") return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 md:p-8 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-6xl mb-6 border-b border-gray-800 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#00ff41] animate-pulse"></span>
              <h1 className="text-xl md:text-2xl font-black tracking-wider text-white">
                CYBERPREP // <span className="text-[#00ff41]">NET+ INTERACTIVE ENGINE</span>
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              CompTIA Network+ Day 2 Simulator: OSI/TCP-IP, PDUs, Encapsulation & Protocol Flows
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-gray-950 border border-gray-800 px-3 py-1.5 rounded">
            <span className="text-gray-400">LAB STATUS:</span>
            <span className="text-[#00ff41] font-bold">ONLINE (PROMISCUOUS MODE)</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setActiveTab("encapsulation")}
            className={`px-4 py-2 text-xs font-bold uppercase transition-all rounded border ${
              activeTab === "encapsulation"
                ? "bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]"
                : "bg-gray-950 text-gray-400 border-gray-800 hover:border-gray-700"
            }`}
          >
            1. Encapsulation & Decapsulation
          </button>
          <button
            onClick={() => setActiveTab("handshake")}
            className={`px-4 py-2 text-xs font-bold uppercase transition-all rounded border ${
              activeTab === "handshake"
                ? "bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]"
                : "bg-gray-950 text-gray-400 border-gray-800 hover:border-gray-700"
            }`}
          >
            2. TCP 3-Way Handshake & UDP
          </button>
          <button
            onClick={() => setActiveTab("arp_dora")}
            className={`px-4 py-2 text-xs font-bold uppercase transition-all rounded border ${
              activeTab === "arp_dora"
                ? "bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]"
                : "bg-gray-950 text-gray-400 border-gray-800 hover:border-gray-700"
            }`}
          >
            3. ARP & DHCP (DORA) Engine
          </button>
          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-4 py-2 text-xs font-bold uppercase transition-all rounded border ${
              activeTab === "matrix"
                ? "bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]"
                : "bg-gray-950 text-gray-400 border-gray-800 hover:border-gray-700"
            }`}
          >
            4. OSI vs TCP/IP PBQ Matrix
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-6xl space-y-6">
        {/* ========================================================================= */}
        {/* TAB 1: ENCAPSULATION & DECAPSULATION (THE BUCKET BRIGADE)               */}
        {/* ========================================================================= */}
        {activeTab === "encapsulation" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-gray-950 border border-gray-800 rounded-lg p-5">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
                <div>
                  <h2 className="text-sm font-bold text-[#00ff41]">
                    PACKET PACKAGING & BUCKET BRIGADE SIMULATOR
                  </h2>
                  <p className="text-xs text-gray-400">
                    Watch how Data becomes a Segment, Packet, Frame, and Bits via header attachment.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsDecapsulating(false);
                      setEncapStep(0);
                    }}
                    className="text-xs px-2.5 py-1 bg-gray-900 border border-gray-700 text-gray-300 rounded hover:border-gray-500"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      if (!isDecapsulating) {
                        if (encapStep < 4) setEncapStep((prev) => prev + 1);
                        else setIsDecapsulating(true);
                      } else {
                        if (encapStep > 0) setEncapStep((prev) => prev - 1);
                        else setIsDecapsulating(false);
                      }
                    }}
                    className="text-xs px-3 py-1 bg-[#00ff41] text-black font-bold rounded hover:bg-[#00ff41]/90"
                  >
                    {!isDecapsulating
                      ? encapStep < 4
                        ? "Next: Encapsulate ↓"
                        : "Switch to Decapsulate ↑"
                      : encapStep > 0
                      ? "Next: Decapsulate ↑"
                      : "Restart Flow"}
                  </button>
                </div>
              </div>

              {/* Visual Packet Builder */}
              <div className="space-y-4 my-6">
                <div className="text-xs text-gray-400 flex items-center justify-between">
                  <span>Current Phase: <strong className="text-white">{isDecapsulating ? "RECEIVER (Decapsulation - Moving Up)" : "SENDER (Encapsulation - Moving Down)"}</strong></span>
                  <span>Active PDU: <strong className="text-[#00ff41]">
                    {encapStep === 0 && "DATA (Layers 7, 6, 5)"}
                    {encapStep === 1 && "SEGMENT (Layer 4 - Transport)"}
                    {encapStep === 2 && "PACKET (Layer 3 - Network)"}
                    {encapStep === 3 && "FRAME (Layer 2 - Data Link)"}
                    {encapStep === 4 && "BITS / PHYSICAL (Layer 1 - Physical)"}
                  </strong></span>
                </div>

                {/* Packet Structure Visualizer */}
                <div className="border border-gray-800 bg-black p-4 rounded-lg flex flex-col items-center justify-center min-h-[180px] overflow-x-auto">
                  {encapStep === 4 ? (
                    <div className="text-center space-y-2 py-4">
                      <div className="text-[#00ff41] text-xs animate-pulse tracking-widest font-mono break-all">
                        01001000 01010100 01010100 01010000 00101111 00110001 00101110 00110001 00100000 00110010 00110000 00110000 00100000 01001111 01001011
                      </div>
                      <p className="text-xs text-gray-400">
                        ⚡ Converted to electrical pulses, light flashes, or RF signals for wire/air transport.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      {/* Layer 2 Frame Header */}
                      {encapStep >= 3 && (
                        <div className="bg-purple-950/80 border border-purple-500 text-purple-200 px-3 py-4 rounded text-center animate-fadeIn">
                          <div className="text-[10px] text-purple-400 uppercase font-bold">L2 Frame Hdr</div>
                          <div className="font-bold text-white mt-1">Dst MAC: 00:1A:2B:3C:4D:5E</div>
                          <div className="text-[10px] text-gray-300">Src MAC: A5:22:98:11:F2:01</div>
                        </div>
                      )}

                      {/* Layer 3 IP Packet Header */}
                      {encapStep >= 2 && (
                        <div className="bg-blue-950/80 border border-blue-500 text-blue-200 px-3 py-4 rounded text-center animate-fadeIn">
                          <div className="text-[10px] text-blue-400 uppercase font-bold">L3 IP Packet Hdr</div>
                          <div className="font-bold text-white mt-1">Src IP: 192.168.1.100</div>
                          <div className="text-[10px] text-gray-300">Dst IP: 142.250.190.46</div>
                        </div>
                      )}

                      {/* Layer 4 TCP Segment Header */}
                      {encapStep >= 1 && (
                        <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-200 px-3 py-4 rounded text-center animate-fadeIn">
                          <div className="text-[10px] text-emerald-400 uppercase font-bold">L4 TCP Segment Hdr</div>
                          <div className="font-bold text-white mt-1">Src Port: 52341 (Ephemeral)</div>
                          <div className="text-[10px] text-gray-300">Dst Port: 443 (HTTPS) | Seq #101</div>
                        </div>
                      )}

                      {/* Upper Layers Payload (Data) */}
                      <div className="bg-gray-900 border border-gray-700 text-gray-200 px-4 py-4 rounded text-center shadow-lg">
                        <div className="text-[10px] text-yellow-400 uppercase font-bold">L5-L7 Payload (Data)</div>
                        <div className="font-bold text-[#00ff41] mt-1">GET /index.html HTTP/1.1</div>
                        <div className="text-[10px] text-gray-400">Host: google.com</div>
                      </div>

                      {/* Layer 2 Frame Trailer (CRC / FCS) */}
                      {encapStep >= 3 && (
                        <div className="bg-red-950/80 border border-red-500 text-red-200 px-3 py-4 rounded text-center animate-fadeIn">
                          <div className="text-[10px] text-red-400 uppercase font-bold">L2 Trailer</div>
                          <div className="font-bold text-white mt-1">FCS / CRC Checksum</div>
                          <div className="text-[10px] text-gray-300">0x3F8A99C2 (Error Check)</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Deep Dive Breakdown for Active Step */}
              <div className="bg-black/50 border border-gray-800 p-4 rounded text-xs space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <span className="text-[#00ff41]">▶</span>
                  {encapStep === 0 && "Step 1: Application Data Generation (Layers 7, 6, 5)"}
                  {encapStep === 1 && "Step 2: Transport Layer Encapsulation (Layer 4)"}
                  {encapStep === 2 && "Step 3: Network Layer Encapsulation (Layer 3)"}
                  {encapStep === 3 && "Step 4: Data Link Frame Creation + CRC Checksum (Layer 2)"}
                  {encapStep === 4 && "Step 5: Physical Layer Signal Encoding (Layer 1)"}
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {encapStep === 0 && "Upper layers (Application, Presentation, Session) produce pure user data. On the CompTIA exam, data at these 3 layers is simply called 'Data' or 'Payload'."}
                  {encapStep === 1 && "The Transport Layer breaks data into chunks (segmentation), assigns sequence numbers, and tacks on Source/Destination Port Numbers (e.g., Ephemeral Port 52341 -> HTTPS Port 443). PDU: Segment (TCP) or Datagram (UDP)."}
                  {encapStep === 2 && "The Network Layer wraps the Segment with Source & Destination IP addresses (Network ID + Host ID). Routers inspect this header to calculate the next hop across different subnets. PDU: Packet."}
                  {encapStep === 3 && "The Data Link layer adds physical MAC addresses for local hop switching, PLUS a Trailer with the Cyclic Redundancy Check (CRC / FCS). If even 1 bit corrupts on the wire, the receiver drops the frame! PDU: Frame."}
                  {encapStep === 4 && "The Physical layer converts the complete Ethernet frame into bits (0s and 1s) transmitted as electrical voltage, radio frequencies (Wi-Fi), or light pulses (fiber optic)."}
                </p>
              </div>
            </div>

            {/* Side Card: The Bucket Brigade Rule */}
            <div className="lg:col-span-4 bg-gray-950 border border-gray-800 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="text-[#00ff41]">●</span> The Bucket Brigade Concept
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Why do we have both IP and MAC addresses?
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-black border border-gray-800 rounded">
                    <div className="text-[#00ff41] font-bold">1. IP Address = Constant (End-to-End)</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">
                      Like the destination mailing address on an envelope. Stays identical across all router hops.
                    </div>
                  </div>

                  <div className="p-3 bg-black border border-gray-800 rounded">
                    <div className="text-purple-400 font-bold">2. MAC Address = Changes at Every Hop</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">
                      Like passing a bucket down a line. Each router strips the old MAC header, calculates the next hop, and stamps the next router&apos;s MAC address!
                    </div>
                  </div>

                  <div className="p-3 bg-black border border-gray-800 rounded">
                    <div className="text-red-400 font-bold">3. CRC / FCS Trailer = Corrupted? Toss it.</div>
                    <div className="text-gray-400 text-[11px] mt-0.5">
                      The receiver calculates the checksum. If math doesn&apos;t match the trailer, it is discarded immediately.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] text-gray-500">
                💡 CompTIA Trap: Upper layers (5-7) do NOT have individual Segment/Packet PDUs. They are always termed <strong>Data</strong>.
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: TCP 3-WAY HANDSHAKE & UDP COMPARATOR                             */}
        {/* ========================================================================= */}
        {activeTab === "handshake" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-gray-950 border border-gray-800 rounded-lg p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-3 mb-4 gap-2">
                <div>
                  <h2 className="text-sm font-bold text-[#00ff41]">
                    TRANSPORT LAYER: TCP 3-WAY HANDSHAKE VS UDP
                  </h2>
                  <p className="text-xs text-gray-400">
                    Step through the reliable SYN / SYN-ACK / ACK sequence or observe UDP fire-and-forget datagrams.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setActiveProtocol("TCP");
                      setHandshakeStep(0);
                    }}
                    className={`text-xs px-3 py-1 rounded border font-bold ${
                      activeProtocol === "TCP"
                        ? "bg-[#00ff41] text-black border-[#00ff41]"
                        : "bg-gray-900 text-gray-400 border-gray-700"
                    }`}
                  >
                    TCP Mode
                  </button>
                  <button
                    onClick={() => {
                      setActiveProtocol("UDP");
                      setHandshakeStep(0);
                    }}
                    className={`text-xs px-3 py-1 rounded border font-bold ${
                      activeProtocol === "UDP"
                        ? "bg-yellow-400 text-black border-yellow-400"
                        : "bg-gray-900 text-gray-400 border-gray-700"
                    }`}
                  >
                    UDP Mode
                  </button>
                </div>
              </div>

              {activeProtocol === "TCP" ? (
                <div>
                  {/* Sequence Animation Container */}
                  <div className="bg-black border border-gray-800 rounded p-4 my-4">
                    <div className="grid grid-cols-3 text-center border-b border-gray-800 pb-2 mb-4 text-xs font-bold">
                      <div className="text-blue-400">CLIENT (Initiator)<br/><span className="text-[10px] text-gray-500">192.168.1.100:54123</span></div>
                      <div className="text-gray-500 flex items-center justify-center text-[11px]">TRANSMISSION CHANNEL</div>
                      <div className="text-emerald-400">WEB SERVER (Listener)<br/><span className="text-[10px] text-gray-500">142.250.190.46:443</span></div>
                    </div>

                    <div className="space-y-4 py-2">
                      {/* Step 1: SYN */}
                      <div className={`flex items-center justify-between text-xs p-2 rounded transition-all ${handshakeStep >= 1 ? "bg-blue-950/40 border border-blue-800" : "opacity-30"}`}>
                        <span className="font-bold text-blue-400">1. SYN (Seq=300)</span>
                        <div className="flex-1 mx-4 flex items-center">
                          <div className="w-full border-t-2 border-dashed border-blue-400 relative">
                            <span className="absolute right-0 top-[-6px] text-blue-400 text-xs">▶</span>
                          </div>
                        </div>
                        <span className="text-[11px] text-gray-400">"Hey, are you open for connection?"</span>
                      </div>

                      {/* Step 2: SYN-ACK */}
                      <div className={`flex items-center justify-between text-xs p-2 rounded transition-all ${handshakeStep >= 2 ? "bg-yellow-950/40 border border-yellow-800" : "opacity-30"}`}>
                        <span className="text-[11px] text-gray-400">"Yes! I hear you. Acknowledged!"</span>
                        <div className="flex-1 mx-4 flex items-center">
                          <div className="w-full border-t-2 border-dashed border-yellow-400 relative">
                            <span className="absolute left-0 top-[-6px] text-yellow-400 text-xs">◀</span>
                          </div>
                        </div>
                        <span className="font-bold text-yellow-400">2. SYN-ACK (Seq=700, Ack=301)</span>
                      </div>

                      {/* Step 3: ACK */}
                      <div className={`flex items-center justify-between text-xs p-2 rounded transition-all ${handshakeStep >= 3 ? "bg-emerald-950/40 border border-emerald-800" : "opacity-30"}`}>
                        <span className="font-bold text-emerald-400">3. ACK (Ack=701)</span>
                        <div className="flex-1 mx-4 flex items-center">
                          <div className="w-full border-t-2 border-dashed border-emerald-400 relative">
                            <span className="absolute right-0 top-[-6px] text-emerald-400 text-xs">▶</span>
                          </div>
                        </div>
                        <span className="text-[11px] text-gray-400">"Great! Handshake complete. Data flow starts."</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-xs">
                      <span className="text-gray-400">
                        Socket Status:{" "}
                        <strong className={handshakeStep === 3 ? "text-[#00ff41]" : "text-yellow-400"}>
                          {handshakeStep === 0 && "CLOSED / LISTEN"}
                          {handshakeStep === 1 && "SYN_SENT"}
                          {handshakeStep === 2 && "SYN_RECEIVED"}
                          {handshakeStep === 3 && "ESTABLISHED (Ready for TLS & HTTP)"}
                        </strong>
                      </span>
                      <button
                        onClick={() => {
                          if (handshakeStep < 3) setHandshakeStep((prev) => prev + 1);
                          else setHandshakeStep(0);
                        }}
                        className="px-3 py-1 bg-[#00ff41] text-black font-bold rounded text-xs"
                      >
                        {handshakeStep < 3 ? `Advance Flag Step (${handshakeStep + 1}/3) →` : "Reset Handshake"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* UDP Visualizer */
                <div className="bg-black border border-gray-800 rounded p-4 my-4 space-y-4">
                  <div className="text-xs text-yellow-400 font-bold">
                    ⚡ UDP (User Datagram Protocol) - The "Fire & Forget" Stream
                  </div>
                  <p className="text-xs text-gray-300">
                    No handshake, no sequence numbers, no ACK receipts. Packets are blasted onto the network at maximum speed. If a packet is lost in transit, it is permanently dropped.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 bg-gray-900 border border-gray-800 rounded">
                      <div className="text-[#00ff41] font-bold">VoIP / Discord Voice</div>
                      <div className="text-[10px] text-gray-400 mt-1">Losing 5ms of audio is better than stalling the entire conversation.</div>
                    </div>
                    <div className="p-3 bg-gray-900 border border-gray-800 rounded">
                      <div className="text-[#00ff41] font-bold">Live Streaming Video</div>
                      <div className="text-[10px] text-gray-400 mt-1">Skip corrupted pixel frames immediately rather than freezing.</div>
                    </div>
                    <div className="p-3 bg-gray-900 border border-gray-800 rounded">
                      <div className="text-[#00ff41] font-bold">DNS Query / DHCP</div>
                      <div className="text-[10px] text-gray-400 mt-1">Single request-response lightweight overhead.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Port Number Hierarchy Visualizer */}
              <div className="mt-6 border-t border-gray-800 pt-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Layer 4 Virtual Port Ranges (Total: 65,535 Ports)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 bg-black border border-gray-800 rounded">
                    <div className="text-[#00ff41] font-bold">Well-Known Ports (0 - 1,023)</div>
                    <div className="text-gray-400 text-[11px]">Reserved for system services (HTTP 80, HTTPS 443, SSH 22, DNS 53).</div>
                  </div>
                  <div className="p-2.5 bg-black border border-gray-800 rounded">
                    <div className="text-blue-400 font-bold">Registered (1,024 - 49,151)</div>
                    <div className="text-gray-400 text-[11px]">Vendor applications (MySQL 3306, RDP 3389, OpenVPN 1194).</div>
                  </div>
                  <div className="p-2.5 bg-black border border-gray-800 rounded">
                    <div className="text-purple-400 font-bold">Dynamic / Ephemeral (49,152 - 65,535)</div>
                    <div className="text-gray-400 text-[11px]">Temporary return addresses client devices create on-the-fly.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Card: Transport Troubleshooting Traps */}
            <div className="lg:col-span-4 bg-gray-950 border border-gray-800 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="text-[#00ff41]">●</span> Exam Diagnostic Traps
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-2.5 bg-black border border-gray-800 rounded">
                    <div className="text-yellow-400 font-bold">Connection Timed Out</div>
                    <p className="text-gray-400 text-[11px] mt-1">
                      Client sent a <strong>SYN</strong>, but received neither <strong>SYN-ACK</strong> nor <strong>RST</strong> (firewall dropped the packet silently or target is offline).
                    </p>
                  </div>
                  <div className="p-2.5 bg-black border border-gray-800 rounded">
                    <div className="text-red-400 font-bold">Connection Refused (RST)</div>
                    <p className="text-gray-400 text-[11px] mt-1">
                      Target server is online, but no application is listening on that specific destination port number.
                    </p>
                  </div>
                  <div className="p-2.5 bg-black border border-gray-800 rounded">
                    <div className="text-blue-400 font-bold">Out-of-Order Packets</div>
                    <p className="text-gray-400 text-[11px] mt-1">
                      Packets took different paths across the internet. TCP buffer holds them until missing sequence segments arrive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] text-gray-500">
                Memory Tip: <br/>
                <strong>SYN</strong> = "Hello?"<br/>
                <strong>SYN/ACK</strong> = "Hey, I hear you!"<br/>
                <strong>ACK</strong> = "Great, let's talk!"
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ARP & DHCP (DORA) ENGINE                                         */}
        {/* ========================================================================= */}
        {activeTab === "arp_dora" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-gray-950 border border-gray-800 rounded-lg p-5">
              <div className="border-b border-gray-800 pb-3 mb-4">
                <h2 className="text-sm font-bold text-[#00ff41]">
                  LOCAL RESOLUTION & AUTO-CONFIGURATION ENGINE
                </h2>
                <p className="text-xs text-gray-400">
                  Simulate DHCP 4-step DORA leasing and ARP local MAC Address Resolution.
                </p>
              </div>

              {/* DHCP DORA Stepper */}
              <div className="bg-black border border-gray-800 rounded p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white uppercase">DHCP D.O.R.A. Sequence</span>
                  <button
                    onClick={() => {
                      if (doraStep < 4) setDoraStep((prev) => prev + 1);
                      else setDoraStep(0);
                    }}
                    className="text-xs px-3 py-1 bg-[#00ff41] text-black font-bold rounded"
                  >
                    {doraStep < 4 ? `Step ${doraStep + 1}: Advance DORA →` : "Restart DORA"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  <div className={`p-3 rounded border transition-all ${doraStep >= 1 ? "bg-emerald-950/50 border-emerald-500 text-white" : "bg-gray-900 border-gray-800 text-gray-500"}`}>
                    <div className="font-bold text-[#00ff41]">1. DISCOVER</div>
                    <div className="text-[10px] text-yellow-400 font-bold uppercase mt-0.5">[Broadcast]</div>
                    <p className="text-[10px] text-gray-400 mt-1">"Hey everyone! Is there a DHCP server here? I need an IP!"</p>
                  </div>

                  <div className={`p-3 rounded border transition-all ${doraStep >= 2 ? "bg-emerald-950/50 border-emerald-500 text-white" : "bg-gray-900 border-gray-800 text-gray-500"}`}>
                    <div className="font-bold text-[#00ff41]">2. OFFER</div>
                    <div className="text-[10px] text-blue-400 font-bold uppercase mt-0.5">[Unicast]</div>
                    <p className="text-[10px] text-gray-400 mt-1">"I'm here! I offer IP 192.168.1.15 for 24 hours. Want it?"</p>
                  </div>

                  <div className={`p-3 rounded border transition-all ${doraStep >= 3 ? "bg-emerald-950/50 border-emerald-500 text-white" : "bg-gray-900 border-gray-800 text-gray-500"}`}>
                    <div className="font-bold text-[#00ff41]">3. REQUEST</div>
                    <div className="text-[10px] text-yellow-400 font-bold uppercase mt-0.5">[Broadcast]</div>
                    <p className="text-[10px] text-gray-400 mt-1">"I accept the offer for 192.168.1.15! Notifying all servers."</p>
                  </div>

                  <div className={`p-3 rounded border transition-all ${doraStep >= 4 ? "bg-emerald-950/50 border-emerald-500 text-white" : "bg-gray-900 border-gray-800 text-gray-500"}`}>
                    <div className="font-bold text-[#00ff41]">4. ACKNOWLEDGE</div>
                    <div className="text-[10px] text-blue-400 font-bold uppercase mt-0.5">[Unicast]</div>
                    <p className="text-[10px] text-gray-400 mt-1">"Locked in. Here is your Subnet Mask, Gateway, and DNS!"</p>
                  </div>
                </div>
              </div>

              {/* ARP Table & Broadcast Engine */}
              <div className="bg-black border border-gray-800 rounded p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold text-white uppercase">ARP (Address Resolution Protocol) Simulator</span>
                    <p className="text-[11px] text-gray-400">Resolves known IP address $\rightarrow$ physical MAC address on local subnet.</p>
                  </div>
                  <button
                    onClick={() => setArpTriggered(!arpTriggered)}
                    className={`text-xs px-3 py-1 rounded font-bold ${
                      arpTriggered ? "bg-red-500 text-white" : "bg-blue-600 text-white"
                    }`}
                  >
                    {arpTriggered ? "Clear ARP Cache" : "Trigger ARP Broadcast"}
                  </button>
                </div>

                {arpTriggered ? (
                  <div className="space-y-3 animate-fadeIn text-xs">
                    <div className="p-2.5 bg-yellow-950/30 border border-yellow-800 rounded text-yellow-200">
                      <strong>📢 ARP Request (Broadcast):</strong> "Who has IP 192.168.1.50? Tell 192.168.1.100 at 00:1A:2B:3C:4D:5E!"
                    </div>
                    <div className="p-2.5 bg-emerald-950/30 border border-emerald-800 rounded text-emerald-200">
                      <strong>📩 ARP Reply (Unicast):</strong> "192.168.1.50 is at MAC A5:22:98:44:12:09!"
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px] border border-gray-800 mt-2">
                        <thead className="bg-gray-900 text-gray-400">
                          <tr>
                            <th className="p-2">Internet (IP) Address</th>
                            <th className="p-2">Physical (MAC) Address</th>
                            <th className="p-2">Type</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          <tr>
                            <td className="p-2 text-[#00ff41]">192.168.1.1 (Gateway)</td>
                            <td className="p-2 text-gray-300">00-14-22-01-23-45</td>
                            <td className="p-2 text-gray-400">Dynamic</td>
                          </tr>
                          <tr>
                            <td className="p-2 text-[#00ff41]">192.168.1.50 (Target)</td>
                            <td className="p-2 text-gray-300">A5-22-98-44-12-09</td>
                            <td className="p-2 text-[#00ff41]">Dynamic (Cached)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-gray-500 border border-dashed border-gray-800 rounded">
                    ARP cache empty. Click "Trigger ARP Broadcast" to resolve MAC addresses on the local wire.
                  </div>
                )}
              </div>
            </div>

            {/* Side Card: Addressing Cheat Sheet */}
            <div className="lg:col-span-4 bg-gray-950 border border-gray-800 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="text-[#00ff41]">●</span> Addressing Architecture
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-2.5 bg-black border border-gray-800 rounded">
                    <div className="text-purple-400 font-bold">MAC Address (Layer 2)</div>
                    <div className="text-gray-300 text-[11px]">48 bits (6 bytes) in Hexadecimal</div>
                    <div className="text-gray-500 text-[10px] mt-0.5">First 24 bits: OUI (Vendor) | Last 24 bits: Device ID</div>
                  </div>

                  <div className="p-2.5 bg-black border border-gray-800 rounded">
                    <div className="text-blue-400 font-bold">IPv4 Address (Layer 3)</div>
                    <div className="text-gray-300 text-[11px]">32 bits (4 bytes) in Dotted Decimal</div>
                    <div className="text-gray-500 text-[10px] mt-0.5">Split into: Network ID + Host ID by Subnet Mask</div>
                  </div>

                  <div className="p-2.5 bg-black border border-gray-800 rounded">
                    <div className="text-[#00ff41] font-bold">IPv6 Address (Layer 3)</div>
                    <div className="text-gray-300 text-[11px]">128 bits (16 bytes) in Hexadecimal</div>
                    <div className="text-gray-500 text-[10px] mt-0.5">Leading zeros compressed; :: used once per address</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] text-gray-400">
                ⚡ <strong>Traffic Types:</strong><br/>
                • <strong>Unicast:</strong> One-to-One<br/>
                • <strong>Multicast:</strong> One-to-Many (IGMP)<br/>
                • <strong>Broadcast:</strong> One-to-All (FF:FF:FF:FF:FF:FF)
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: COMPTIA PERFORMANCE-BASED (PBQ) MASTER MATRIX                    */}
        {/* ========================================================================= */}
        {activeTab === "matrix" && (
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-3 mb-4 gap-2">
              <div>
                <h2 className="text-sm font-bold text-[#00ff41]">
                  COMPTIA PBQ SIMULATOR: OSI vs TCP/IP & PDU MATRIX
                </h2>
                <p className="text-xs text-gray-400">
                  Match each OSI layer to its Primary PDU packaging and corresponding hardware device.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={resetMatrixQuiz}
                  className="text-xs px-3 py-1 bg-gray-900 border border-gray-700 text-gray-300 rounded hover:border-gray-500"
                >
                  Reset Matrix
                </button>
                <button
                  onClick={() => setMatrixChecked(true)}
                  className="text-xs px-4 py-1 bg-[#00ff41] text-black font-bold rounded hover:bg-[#00ff41]/90"
                >
                  Validate Answers
                </button>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-gray-800">
                <thead className="bg-gray-900 text-gray-300 uppercase text-[11px]">
                  <tr>
                    <th className="p-3 border-b border-gray-800">#</th>
                    <th className="p-3 border-b border-gray-800">OSI Layer</th>
                    <th className="p-3 border-b border-gray-800">TCP/IP Equivalent</th>
                    <th className="p-3 border-b border-gray-800">Select PDU</th>
                    <th className="p-3 border-b border-gray-800">Layer Function / Device</th>
                    {matrixChecked && <th className="p-3 border-b border-gray-800">Score</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-mono">
                  {OSI_LAYERS.map((layer) => {
                    const isPduCorrect = getPduCorrectness(layer.layerNum);

                    return (
                      <tr key={layer.layerNum} className="hover:bg-gray-900/30">
                        <td className="p-3 font-bold text-gray-400">L{layer.layerNum}</td>
                        <td className="p-3 font-bold text-white">{layer.osiName}</td>
                        <td className="p-3 text-[#00ff41]">{layer.tcpIpLayer}</td>
                        <td className="p-3">
                          <select
                            value={selectedPduMatches[layer.layerNum] || ""}
                            onChange={(e) => handlePduSelect(layer.layerNum, e.target.value)}
                            className={`bg-black border text-xs px-2 py-1 rounded w-full focus:outline-none ${
                              matrixChecked
                                ? isPduCorrect
                                  ? "border-[#00ff41] text-[#00ff41]"
                                  : "border-red-500 text-red-400"
                                : "border-gray-700 text-gray-200 focus:border-[#00ff41]"
                            }`}
                          >
                            <option value="">-- Choose PDU --</option>
                            {pduOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-3 text-gray-400 text-[11px] max-w-xs">
                          {layer.description}
                          <div className="text-gray-500 text-[10px] mt-0.5">
                            Hardware/Protocols: <span className="text-gray-300">{layer.hardware}</span>
                          </div>
                        </td>
                        {matrixChecked && (
                          <td className="p-3 text-xs font-bold">
                            {isPduCorrect ? (
                              <span className="text-[#00ff41]">✓ PASS</span>
                            ) : (
                              <span className="text-red-500">✗ {layer.pdu}</span>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Quick Answer Key Summary */}
            <div className="mt-6 p-4 bg-black border border-gray-800 rounded-lg text-xs space-y-2">
              <div className="font-bold text-[#00ff41] uppercase tracking-wider">
                💡 The PDU "Cheat Code" for the Exam:
              </div>
              <div className="text-gray-300 grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1 text-[11px]">
                <div className="p-2 bg-gray-950 border border-gray-800 rounded">
                  <span className="text-[#00ff41]">L7, 6, 5:</span> <strong>Data</strong> (Payload)
                </div>
                <div className="p-2 bg-gray-950 border border-gray-800 rounded">
                  <span className="text-[#00ff41]">L4:</span> <strong>Segment</strong> / Datagram
                </div>
                <div className="p-2 bg-gray-950 border border-gray-800 rounded">
                  <span className="text-[#00ff41]">L3:</span> <strong>Packet</strong> (Routers)
                </div>
                <div className="p-2 bg-gray-950 border border-gray-800 rounded">
                  <span className="text-[#00ff41]">L2:</span> <strong>Frame</strong> (MAC/Switch)
                </div>
                <div className="p-2 bg-gray-950 border border-gray-800 rounded">
                  <span className="text-[#00ff41]">L1:</span> <strong>Bits</strong> (Cables/Signals)
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mt-8 pt-4 border-t border-gray-800 text-center text-xs text-gray-500">
        CyberPrep Interactive Engine // CompTIA Network+ Exam Prep // Ready for Day 3 Topics
      </footer>
    </div>
  );
}