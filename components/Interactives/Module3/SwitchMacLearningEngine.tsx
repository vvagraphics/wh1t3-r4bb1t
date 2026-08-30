"use client";
import React, { useState } from 'react';

interface MacEntry {
  port: number;
  mac: string;
}

interface Device {
  id: string;
  mac: string;
  port: number;
}

const DEVICES: Device[] = [
  { id: 'PC-A', mac: 'AA:AA:AA:AA:AA:AA', port: 1 },
  { id: 'PC-B', mac: 'BB:BB:BB:BB:BB:BB', port: 2 },
  { id: 'PC-C', mac: 'CC:CC:CC:CC:CC:CC', port: 3 },
  { id: 'SERVER', mac: 'DD:DD:DD:DD:DD:DD', port: 4 },
];

export default function SwitchMacLearningEngine() {
  const [macTable, setMacTable] = useState<MacEntry[]>([]);
  const [log, setLog] = useState<string[]>(['[SYSTEM] Switch initialized. MAC table is empty.']);
  const [sourceId, setSourceId] = useState<string>('PC-A');
  const [destId, setDestId] = useState<string>('PC-B');

  const addLog = (msg: string) => setLog((prev) => [...prev, msg].slice(-6));

  const handleTransmit = () => {
    const src = DEVICES.find(d => d.id === sourceId);
    const dst = DEVICES.find(d => d.id === destId);
    if (!src || !dst) return;
    if (src.id === dst.id) {
      addLog(`[ERROR] Source and Destination cannot be the same.`);
      return;
    }

    addLog(`[TX] ${src.id} sends frame to ${dst.id}.`);
    
    // Step 1: Switch Learns Source MAC
    const existingEntry = macTable.find(e => e.mac === src.mac);
    if (!existingEntry) {
      setMacTable(prev => [...prev, { port: src.port, mac: src.mac }]);
      addLog(`[LEARN] Switch mapped ${src.mac} to Port ${src.port}.`);
    } else {
      addLog(`[CACHE] Switch already knows ${src.mac} is on Port ${src.port}.`);
    }

    // Step 2: Switch Forwards or Floods
    const knownDest = macTable.find(e => e.mac === dst.mac) || (existingEntry?.mac === dst.mac ? { port: src.port, mac: src.mac } : null);
    
    setTimeout(() => {
      if (knownDest) {
        addLog(`[FORWARD] Destination MAC known. Frame sent only out Port ${knownDest.port}.`);
      } else {
        addLog(`[FLOOD] Destination MAC unknown. Frame flooded out all ports except Port ${src.port}.`);
      }
    }, 1000);
  };

  const resetSwitch = () => {
    setMacTable([]);
    setLog(['[SYSTEM] Switch memory wiped. MAC table cleared.']);
  };

  return (
    <div style={{ backgroundColor: '#0c0f12', color: '#00ff41', padding: '32px', fontFamily: 'monospace', maxWidth: '820px', margin: '0 auto', borderRadius: '16px', border: '1px solid #1e2630' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', borderBottom: '1px solid #00ff41', paddingBottom: '8px' }}>
        L2 FORWARDING LOGIC SIMULATOR
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Network Topo */}
        <div style={{ border: '1px dashed #00ff41', padding: '16px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '12px', color: '#e2e8f0' }}>NETWORK TOPOLOGY</h3>
          {DEVICES.map(dev => (
            <div key={dev.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span>Port {dev.port}: {dev.id}</span>
              <span style={{ color: '#94a3b8' }}>{dev.mac}</span>
            </div>
          ))}
          
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label>Source Device:</label>
            <select value={sourceId} onChange={(e) => setSourceId(e.target.value)} style={{ background: '#141a23', color: '#00ff41', padding: '4px', border: '1px solid #00ff41' }}>
              {DEVICES.map(d => <option key={`src-${d.id}`} value={d.id}>{d.id}</option>)}
            </select>
            
            <label>Destination Device:</label>
            <select value={destId} onChange={(e) => setDestId(e.target.value)} style={{ background: '#141a23', color: '#00ff41', padding: '4px', border: '1px solid #00ff41' }}>
              {DEVICES.map(d => <option key={`dst-${d.id}`} value={d.id}>{d.id}</option>)}
            </select>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button onClick={handleTransmit} style={{ flex: 1, padding: '8px', background: '#00ff41', color: '#000', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>TRANSMIT FRAME</button>
              <button onClick={resetSwitch} style={{ padding: '8px', background: 'transparent', color: '#00ff41', border: '1px solid #00ff41', cursor: 'pointer' }}>RESET</button>
            </div>
          </div>
        </div>

        {/* MAC Table & Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ border: '1px solid #1e2630', padding: '16px', borderRadius: '8px', background: '#141a23', minHeight: '150px' }}>
            <h3 style={{ marginBottom: '12px', color: '#e2e8f0' }}>SWITCH MAC TABLE</h3>
            <table style={{ width: '100%', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ color: '#94a3b8' }}>
                  <th>PORT</th>
                  <th>MAC ADDRESS</th>
                </tr>
              </thead>
              <tbody>
                {macTable.length === 0 ? (
                  <tr><td colSpan={2} style={{ paddingTop: '8px', color: '#64748b' }}>Table is empty.</td></tr>
                ) : (
                  macTable.map((entry, idx) => (
                    <tr key={idx}>
                      <td style={{ paddingTop: '4px' }}>{entry.port}</td>
                      <td style={{ paddingTop: '4px' }}>{entry.mac}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div style={{ border: '1px solid #1e2630', padding: '16px', borderRadius: '8px', background: '#0a0a0a', flex: 1 }}>
            <h3 style={{ marginBottom: '12px', color: '#e2e8f0' }}>TERMINAL OUTPUT</h3>
            <div style={{ fontSize: '12px', color: '#00ff41', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {log.map((msg, i) => (
                <span key={i}>{msg}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}