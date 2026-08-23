import React, { useState, useMemo } from 'react';

// --- Bitwise & IP Conversion Helpers ---

function ipToInt(ip: string): number {
  return ip
    .split('.')
    .reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
}

function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join('.');
}

function cidrToMaskInt(cidr: number): number {
  return cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
}

export default function SubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.64');
  const [cidr, setCidr] = useState(26);

  const calc = useMemo(() => {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
    const isValid = ipRegex.test(ip.trim());

    if (!isValid) return null;

    const ipInt = ipToInt(ip.trim());
    const maskInt = cidrToMaskInt(cidr);
    const wildcardInt = (~maskInt) >>> 0;

    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | wildcardInt) >>> 0;

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

    const firstUsableInt = cidr >= 31 ? networkInt : networkInt + 1;
    const lastUsableInt = cidr >= 31 ? broadcastInt : broadcastInt - 1;

    // Bitwise Breakdown array for 32 bit rendering
    const octets = ip.trim().split('.').map(Number);
    const binaryOctets = octets.map((octet, octIdx) => {
      const binStr = octet.toString(2).padStart(8, '0');
      return binStr.split('').map((bit, bitIdx) => {
        const globalBitIndex = octIdx * 8 + bitIdx;
        const isNetwork = globalBitIndex < cidr;
        return { bit, isNetwork };
      });
    });

    // Subnet calculation details
    const interestingOctetIndex = Math.floor((cidr - 1) / 8);
    const bitsInInterestingOctet = cidr - interestingOctetIndex * 8;
    const blockSize = Math.pow(2, 8 - bitsInInterestingOctet);

    return {
      mask: intToIp(maskInt),
      networkId: intToIp(networkInt),
      broadcast: intToIp(broadcastInt),
      firstUsable: intToIp(firstUsableInt),
      lastUsable: intToIp(lastUsableInt),
      totalHosts,
      usableHosts,
      octets,
      binaryOctets,
      hostBits: 32 - cidr,
      blockSize,
      interestingOctetNum: interestingOctetIndex + 1,
      bitsInInterestingOctet,
    };
  }, [ip, cidr]);

  return (
    <div style={{ backgroundColor: '#0c0f12', color: '#e2e8f0', padding: '32px', fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '720px', margin: '0 auto', borderRadius: '16px', border: '1px solid #1e2630' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 600, margin: '0 0 24px 0', color: '#f8fafc' }}>IPv4 Subnet Calculator</h1>

      {/* 32-Bit Binary Breakdown */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '12px' }}>
          32-BIT BINARY BREAKDOWN (NETWORK VS HOST)
        </div>
        {calc ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {calc.binaryOctets.map((bits, octIndex) => (
              <div key={octIndex} style={{ backgroundColor: '#141a23', border: '1px solid #243042', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  {calc.octets[octIndex]}
                </div>
                <div style={{ display: 'flex', gap: '3px', justifyContent: 'center' }}>
                  {bits.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      style={{
                        width: '13px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 600,
                        borderRadius: '3px',
                        backgroundColor: b.isNetwork ? '#1e3a8a' : '#27272a',
                        color: b.isNetwork ? '#93c5fd' : '#71717a',
                      }}
                    >
                      {b.bit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: '#ef4444', fontSize: '13px' }}>Invalid IP address</div>
        )}
      </div>

      {/* Subnet Calculation Walkthrough */}
      {calc && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '12px' }}>
            SUBNET CALCULATION WALKTHROUGH
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ backgroundColor: '#141a23', border: '1px solid #243042', borderRadius: '8px', padding: '12px 16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#93c5fd', marginBottom: '4px' }}>
                Step 1: Subnet Mask & Block Size
              </div>
              <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                Prefix /{cidr} gives {cidr} network bits. Subnet Mask: {calc.mask}. Block size in Octet {calc.interestingOctetNum} is 2^({8 - calc.bitsInInterestingOctet}) = {calc.blockSize}.
              </div>
            </div>

            <div style={{ backgroundColor: '#141a23', border: '1px solid #243042', borderRadius: '8px', padding: '12px 16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#93c5fd', marginBottom: '4px' }}>
                Step 2: Determine Network ID
              </div>
              <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                Bitwise AND of IP ({ip}) and Mask ({calc.mask}) gives Network ID: {calc.networkId}.
              </div>
            </div>

            <div style={{ backgroundColor: '#141a23', border: '1px solid #243042', borderRadius: '8px', padding: '12px 16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#93c5fd', marginBottom: '4px' }}>
                Step 3: Determine Broadcast Address
              </div>
              <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                Set all host bits ({calc.hostBits} bits) to 1 gives Broadcast Address: {calc.broadcast}.
              </div>
            </div>

            <div style={{ backgroundColor: '#141a23', border: '1px solid #243042', borderRadius: '8px', padding: '12px 16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#93c5fd', marginBottom: '4px' }}>
                Step 4: Host Capacity
              </div>
              <div style={{ fontSize: '13px', color: '#cbd5e1' }}>
                Total IP addresses: 2^{calc.hostBits} = {calc.totalHosts.toLocaleString()}. Usable hosts: {calc.usableHosts.toLocaleString()} ({calc.firstUsable} to {calc.lastUsable}).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Landmark Stats Summary */}
      {calc && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center', marginBottom: '32px', borderTop: '1px solid #1e2630', paddingTop: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em' }}>NETWORK ID</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '4px' }}>{calc.networkId}</div>
          </div>
          <div style={{ borderLeft: '1px solid #1e2630', borderRight: '1px solid #1e2630' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em' }}>BROADCAST</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '4px' }}>{calc.broadcast}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em' }}>USABLE HOSTS</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginTop: '4px' }}>{calc.usableHosts.toLocaleString()}</div>
          </div>
        </div>
      )}

      {/* Control Inputs & Slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '220px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#e2e8f0', whiteSpace: 'nowrap' }}>IPv4 Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            style={{ width: '100%', backgroundColor: '#141a23', border: '1px solid #243042', borderRadius: '8px', color: '#f8fafc', padding: '8px 12px', fontSize: '14px', outline: 'none' }}
            placeholder="192.168.1.64"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1.2, minWidth: '260px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#e2e8f0', whiteSpace: 'nowrap' }}>CIDR Prefix</label>
          <input
            type="range"
            min={1}
            max={30}
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            style={{ flex: 1, accentColor: '#ffffff', cursor: 'pointer' }}
          />
          <div style={{ backgroundColor: '#141a23', border: '1px solid #243042', borderRadius: '8px', padding: '8px 16px', fontSize: '14px', fontWeight: 600, minWidth: '32px', textAlign: 'center' }}>
            {cidr}
          </div>
        </div>
      </div>
    </div>
  );
}