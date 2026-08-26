'use client';

import React, { useState } from 'react';

interface HeaderItem {
  id: string;
  layer: number;
  label: string;
  type: 'header' | 'trailer';
  tag: string;
}

const INVENTORY: HeaderItem[] = [
  { id: 'h-l4', layer: 4, label: 'TCP Header (Port 80/443)', type: 'header', tag: 'Segment' },
  { id: 'h-l3', layer: 3, label: 'IP Header (Src/Dst IP)', type: 'header', tag: 'Packet' },
  { id: 'h-l2', layer: 2, label: 'Ethernet Header (Src/Dst MAC)', type: 'header', tag: 'Frame' },
  { id: 't-l2', layer: 2, label: 'FCS Trailer (CRC Checksum)', type: 'trailer', tag: 'Trailer' },
];

export default function PduEncapsulation() {
  const [currentLayer, setCurrentLayer] = useState<number>(4);
  const [attached, setAttached] = useState<HeaderItem[]>([]);
  const [payload] = useState<string>('HTTP: GET /api/v1/auth');
  const [statusMsg, setStatusMsg] = useState<string>('Attach the Layer 4 Transport Header');

  const handleAttach = (item: HeaderItem) => {
    if (item.layer !== currentLayer) {
      setStatusMsg(`Incorrect layer! Expected Layer ${currentLayer} PDU element.`);
      return;
    }

    const nextAttached = [...attached, item];
    setAttached(nextAttached);

    if (currentLayer === 4) {
      setCurrentLayer(3);
      setStatusMsg('Attached L4 TCP Header. Next: Attach L3 Network Header.');
    } else if (currentLayer === 3) {
      setCurrentLayer(2);
      setStatusMsg('Attached L3 IP Header. Next: Attach L2 Data Link Framing.');
    } else if (currentLayer === 2 && nextAttached.filter(i => i.layer === 2).length === 2) {
      setCurrentLayer(1);
      setStatusMsg('Fully Encapsulated! Ready for Physical Layer (L1) Bit Conversion.');
    }
  };

  const l2Header = attached.find(i => i.id === 'h-l2');
  const l3Header = attached.find(i => i.id === 'h-l3');
  const l4Header = attached.find(i => i.id === 'h-l4');
  const l2Trailer = attached.find(i => i.id === 't-l2');

  return (
    <div className="mx-auto max-w-4xl rounded-xl border border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-2xl">
      <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold tracking-wide text-emerald-400">PDU Encapsulation Engine</h2>
        <span className="rounded bg-slate-800 px-3 py-1 text-xs font-mono uppercase text-slate-300">
          Target: Layer {currentLayer}
        </span>
      </div>

      {/* Frame Visualizer Container */}
      <div className="mb-8 flex min-h-[140px] items-center justify-center rounded-lg bg-slate-900/80 p-4 border border-dashed border-slate-700 overflow-x-auto">
        {currentLayer === 1 ? (
          <div className="animate-pulse font-mono text-emerald-400 text-sm tracking-widest break-all">
            01001000 01010100 01010100 01010000 00100000 01000101 01001110 01000011
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {l2Header && <div className="rounded bg-amber-600/30 border border-amber-500 px-2 py-3 text-xs font-mono text-amber-300">[ETH HDR]</div>}
            {l3Header && <div className="rounded bg-sky-600/30 border border-sky-500 px-2 py-3 text-xs font-mono text-sky-300">[IP HDR]</div>}
            {l4Header && <div className="rounded bg-indigo-600/30 border border-indigo-500 px-2 py-3 text-xs font-mono text-indigo-300">[TCP HDR]</div>}
            
            <div className="rounded bg-emerald-950 border border-emerald-500/50 px-4 py-3 font-mono text-xs text-emerald-300">
              {payload}
            </div>

            {l2Trailer && <div className="rounded bg-amber-600/30 border border-amber-500 px-2 py-3 text-xs font-mono text-amber-300">[FCS TRLR]</div>}
          </div>
        )}
      </div>

      <p className="mb-4 text-sm font-medium text-slate-400">{statusMsg}</p>

      {/* Draggable/Selectable Header Inventory */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {INVENTORY.map(item => {
          const isUsed = attached.some(a => a.id === item.id);
          return (
            <button
              key={item.id}
              disabled={isUsed || currentLayer === 1}
              onClick={() => handleAttach(item)}
              className={`flex flex-col items-start rounded-lg border p-3 text-left transition-all ${
                isUsed
                  ? 'border-slate-800 bg-slate-900/30 opacity-40 cursor-not-allowed'
                  : 'border-slate-700 bg-slate-900 hover:border-emerald-500 hover:bg-slate-800 cursor-pointer'
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Layer {item.layer} - {item.tag}</span>
              <span className="mt-1 text-xs font-semibold text-slate-200">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}