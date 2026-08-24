import React, { useState } from 'react';

interface LayerInfo {
  osiNum: number;
  osiName: string;
  tcpNum: number;
  tcpName: string;
  pdu: string;
  hardware: string;
  protocols: string[];
  description: string;
  encapsulationNote: string;
}

const LAYERS_DATA: LayerInfo[] = [
  {
    osiNum: 7,
    osiName: 'Application',
    tcpNum: 4,
    tcpName: 'Application',
    pdu: 'Data',
    hardware: 'Hosts, Firewalls, Gateways',
    protocols: ['HTTP/HTTPS', 'DNS', 'SSH', 'FTP', 'SMTP', 'DHCP'],
    description: 'Direct interface for end-user network applications and communication services.',
    encapsulationNote: 'Generates raw message data payload.',
  },
  {
    osiNum: 6,
    osiName: 'Presentation',
    tcpNum: 4,
    tcpName: 'Application',
    pdu: 'Data',
    hardware: 'End Devices (OS / Runtimes)',
    protocols: ['TLS/SSL', 'JPEG', 'JSON', 'ASCII', 'MIME'],
    description: 'Data formatting, syntax translation, compression, and encryption/decryption.',
    encapsulationNote: 'Formats and encrypts the raw application payload.',
  },
  {
    osiNum: 5,
    osiName: 'Session',
    tcpNum: 4,
    tcpName: 'Application',
    pdu: 'Data',
    hardware: 'End Devices (OS Sockets)',
    protocols: ['NetBIOS', 'RPC', 'PPTP', 'Sockets'],
    description: 'Establishes, manages, coordinates, and terminates connections between applications.',
    encapsulationNote: 'Maintains session state and connection dialogues.',
  },
  {
    osiNum: 4,
    osiName: 'Transport',
    tcpNum: 3,
    tcpName: 'Transport',
    pdu: 'Segment (TCP) / Datagram (UDP)',
    hardware: 'Load Balancers, Security Appliances',
    protocols: ['TCP', 'UDP', 'QUIC', 'SCTP'],
    description: 'End-to-end communication, segmentation, flow control, port addressing, and error recovery.',
    encapsulationNote: 'Adds Source & Destination Port headers to form a Segment.',
  },
  {
    osiNum: 3,
    osiName: 'Network',
    tcpNum: 2,
    tcpName: 'Internet',
    pdu: 'Packet',
    hardware: 'Routers, Layer 3 Switches',
    protocols: ['IPv4', 'IPv6', 'ICMP', 'OSPF', 'BGP', 'ARP'],
    description: 'Logical device addressing (IP) and best-path routing across distinct networks.',
    encapsulationNote: 'Adds Source & Destination IP addresses to form a Packet.',
  },
  {
    osiNum: 2,
    osiName: 'Data Link',
    tcpNum: 1,
    tcpName: 'Network Access (Link)',
    pdu: 'Frame',
    hardware: 'Switches, Bridges, NICs, Wireless APs',
    protocols: ['Ethernet (802.3)', 'Wi-Fi (802.11)', 'PPP', 'VLAN (802.1Q)'],
    description: 'Node-to-node transfer on the same local network, MAC addressing, and frame error checks.',
    encapsulationNote: 'Adds MAC Header & Trailer (FCS/CRC error check) to form a Frame.',
  },
  {
    osiNum: 1,
    osiName: 'Physical',
    tcpNum: 1,
    tcpName: 'Network Access (Link)',
    pdu: 'Bits',
    hardware: 'Cables (Cat6/Fiber), Hubs, Transceivers, Repeaters',
    protocols: ['1000BASE-T', 'DOCSIS', 'DSL', 'Bluetooth PHY'],
    description: 'Unstructured raw bitstream transmission over physical electrical, optical, or radio media.',
    encapsulationNote: 'Encodes frames into electrical voltages, light pulses, or radio waves.',
  },
];

export default function OsiTcpIpExplorer() {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);
  const [flowDirection, setFlowDirection] = useState<'encapsulation' | 'decapsulation'>('encapsulation');

  const currentLayer = LAYERS_DATA[selectedLayerIndex];

  return (
    <div
      style={{
        backgroundColor: '#0c0f12',
        color: '#e2e8f0',
        padding: '32px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '820px',
        margin: '0 auto',
        borderRadius: '16px',
        border: '1px solid #1e2630',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, margin: 0, color: '#f8fafc' }}>
          OSI vs. TCP/IP Model Explorer
        </h1>

        {/* Direction Toggle */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#141a23', padding: '3px', borderRadius: '8px', border: '1px solid #243042' }}>
          <button
            onClick={() => setFlowDirection('encapsulation')}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: flowDirection === 'encapsulation' ? '#2563eb' : 'transparent',
              color: flowDirection === 'encapsulation' ? '#ffffff' : '#94a3b8',
            }}
          >
            ⬇ Encapsulation (Send)
          </button>
          <button
            onClick={() => setFlowDirection('decapsulation')}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: flowDirection === 'decapsulation' ? '#2563eb' : 'transparent',
              color: flowDirection === 'decapsulation' ? '#ffffff' : '#94a3b8',
            }}
          >
            ⬆ Decapsulation (Receive)
          </button>
        </div>
      </div>

      {/* Model Stacks Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {/* OSI Stack */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '8px' }}>
            OSI 7-LAYER MODEL
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {LAYERS_DATA.map((layer, index) => {
              const isSelected = selectedLayerIndex === index;
              return (
                <button
                  key={layer.osiNum}
                  onClick={() => setSelectedLayerIndex(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: isSelected ? '1px solid #3b82f6' : '1px solid #1e2630',
                    backgroundColor: isSelected ? '#1e3a8a' : '#141a23',
                    color: isSelected ? '#ffffff' : '#cbd5e1',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>
                    L{layer.osiNum}: {layer.osiName}
                  </span>
                  <span style={{ fontSize: '11px', color: isSelected ? '#93c5fd' : '#64748b' }}>
                    {layer.pdu}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TCP/IP Stack */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '8px' }}>
            TCP/IP 4-LAYER MODEL
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', height: 'calc(100% - 24px)' }}>
            {/* TCP Layer 4 */}
            <div
              onClick={() => setSelectedLayerIndex(0)}
              style={{
                flex: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '6px',
                border: currentLayer.tcpNum === 4 ? '1px solid #3b82f6' : '1px solid #1e2630',
                backgroundColor: currentLayer.tcpNum === 4 ? '#172554' : '#141a23',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: currentLayer.tcpNum === 4 ? '#93c5fd' : '#94a3b8' }}>
                4. Application (L5-L7)
              </span>
            </div>

            {/* TCP Layer 3 */}
            <div
              onClick={() => setSelectedLayerIndex(3)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '6px',
                border: currentLayer.tcpNum === 3 ? '1px solid #3b82f6' : '1px solid #1e2630',
                backgroundColor: currentLayer.tcpNum === 3 ? '#172554' : '#141a23',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: currentLayer.tcpNum === 3 ? '#93c5fd' : '#94a3b8' }}>
                3. Transport (L4)
              </span>
            </div>

            {/* TCP Layer 2 */}
            <div
              onClick={() => setSelectedLayerIndex(4)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '6px',
                border: currentLayer.tcpNum === 2 ? '1px solid #3b82f6' : '1px solid #1e2630',
                backgroundColor: currentLayer.tcpNum === 2 ? '#172554' : '#141a23',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: currentLayer.tcpNum === 2 ? '#93c5fd' : '#94a3b8' }}>
                2. Internet (L3)
              </span>
            </div>

            {/* TCP Layer 1 */}
            <div
              onClick={() => setSelectedLayerIndex(5)}
              style={{
                flex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '6px',
                border: currentLayer.tcpNum === 1 ? '1px solid #3b82f6' : '1px solid #1e2630',
                backgroundColor: currentLayer.tcpNum === 1 ? '#172554' : '#141a23',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: currentLayer.tcpNum === 1 ? '#93c5fd' : '#94a3b8' }}>
                1. Network Access (L1-L2)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Layer Detail Card */}
      <div style={{ backgroundColor: '#141a23', border: '1px solid #243042', borderRadius: '10px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.05em' }}>
              OSI LAYER {currentLayer.osiNum} ➔ TCP/IP LAYER {currentLayer.tcpNum}
            </span>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
              {currentLayer.osiName} Layer
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>DATA UNIT (PDU)</span>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#fbbf24' }}>{currentLayer.pdu}</div>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.5', margin: '0 0 16px 0' }}>
          {currentLayer.description}
        </p>

        {/* Data flow insight */}
        <div style={{ backgroundColor: '#0f172a', borderLeft: '3px solid #3b82f6', padding: '10px 14px', borderRadius: '4px', marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#93c5fd' }}>
            {flowDirection === 'encapsulation' ? 'DATA PACKING (DOWNSTREAM)' : 'DATA UNPACKING (UPSTREAM)'}:
          </span>
          <div style={{ fontSize: '13px', color: '#e2e8f0', marginTop: '2px' }}>{currentLayer.encapsulationNote}</div>
        </div>

        {/* Hardware & Protocols Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ backgroundColor: '#0c0f12', padding: '12px', borderRadius: '6px', border: '1px solid #1e2630' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>HARDWARE & DEVICES</div>
            <div style={{ fontSize: '13px', color: '#f1f5f9', fontWeight: 500 }}>{currentLayer.hardware}</div>
          </div>

          <div style={{ backgroundColor: '#0c0f12', padding: '12px', borderRadius: '6px', border: '1px solid #1e2630' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>KEY PROTOCOLS / FORMATS</div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {currentLayer.protocols.map((proto) => (
                <span
                  key={proto}
                  style={{
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: '#1e293b',
                    color: '#38bdf8',
                    fontWeight: 500,
                  }}
                >
                  {proto}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}