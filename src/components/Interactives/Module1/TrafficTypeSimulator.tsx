'use client';

import React, { useState } from 'react';

type CastMode = 'unicast' | 'broadcast' | 'multicast' | 'anycast';

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  subscribed: boolean;
  distance: number;
}

const INITIAL_NODES: Node[] = [
  { id: 'n1', name: 'Node A', x: 320, y: 40, subscribed: true, distance: 15 },
  { id: 'n2', name: 'Node B', x: 350, y: 110, subscribed: false, distance: 42 },
  { id: 'n3', name: 'Node C', x: 350, y: 190, subscribed: true, distance: 28 },
  { id: 'n4', name: 'Node D', x: 320, y: 260, subscribed: false, distance: 10 },
];

export default function TrafficTypeSimulator() {
  const [mode, setMode] = useState<CastMode>('multicast');
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [unicastTarget, setUnicastTarget] = useState<string>('n1');
  const [activePackets, setActivePackets] = useState<string[]>([]);

  const handleTransmit = () => {
    let targets: string[] = [];
    if (mode === 'unicast') targets = [unicastTarget];
    if (mode === 'broadcast') targets = nodes.map(n => n.id);
    if (mode === 'multicast') targets = nodes.filter(n => n.subscribed).map(n => n.id);
    if (mode === 'anycast') {
      const closest = [...nodes].sort((a, b) => a.distance - b.distance)[0];
      targets = [closest.id];
    }
    setActivePackets(targets);
    setTimeout(() => setActivePackets([]), 1800);
  };

  return (
    <div className="mx-auto max-w-4xl rounded-xl border border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-2xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-sky-400">Network Routing & Traffic Cast Visualizer</h2>
        <div className="flex gap-2">
          {(['unicast', 'broadcast', 'multicast', 'anycast'] as CastMode[]).map(t => (
            <button
              key={t}
              onClick={() => setMode(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                mode === t ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-72 w-full rounded-lg bg-slate-900 border border-slate-800">
        <svg className="absolute inset-0 h-full w-full">
          {/* Path definitions from Switch (x:180, y:150) to nodes */}
          {nodes.map(n => (
            <g key={n.id}>
              <line x1={40} y1={150} x2={180} y2={150} stroke="#334155" strokeWidth="2" />
              <line x1={180} y1={150} x2={n.x} y2={n.y} stroke="#334155" strokeWidth="2" />
              {activePackets.includes(n.id) && (
                <circle r="4" fill="#38bdf8" className="transition-all">
                  <animateMotion path={`M 40 150 L 180 150 L ${n.x} ${n.y}`} dur="1.5s" fill="freeze" />
                </circle>
              )}
            </g>
          ))}
        </svg>

        {/* Sender Node */}
        <div className="absolute left-6 top-[132px] rounded-lg border border-emerald-500 bg-emerald-950/80 px-2.5 py-1.5 text-xs font-mono text-emerald-300">
          SRC: Host
        </div>

        {/* Switch/Router */}
        <div className="absolute left-[155px] top-[130px] rounded-lg border border-sky-500 bg-sky-950 px-3 py-2 text-xs font-bold text-sky-300">
          Router
        </div>

        {/* Receiver Endpoints */}
        {nodes.map(n => (
          <div
            key={n.id}
            style={{ left: `${n.x}px`, top: `${n.y - 18}px` }}
            className={`absolute flex items-center gap-2 rounded border px-2 py-1 text-[11px] font-mono ${
              activePackets.includes(n.id)
                ? 'border-sky-400 bg-sky-950/90 text-sky-200'
                : 'border-slate-700 bg-slate-950 text-slate-400'
            }`}
          >
            <span>{n.name}</span>
            {mode === 'multicast' && (
              <span className={`text-[9px] px-1 rounded ${n.subscribed ? 'bg-indigo-900 text-indigo-300' : 'bg-slate-800 text-slate-500'}`}>
                {n.subscribed ? 'Subscribed' : 'Ignored'}
              </span>
            )}
            {mode === 'anycast' && <span className="text-[9px] text-amber-400">{n.distance}ms</span>}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {mode === 'unicast' && 'Single path target delivery.'}
          {mode === 'broadcast' && 'Pushes copies to all nodes in the subnet broadcast domain.'}
          {mode === 'multicast' && 'Forwarded only to subscribed group members.'}
          {mode === 'anycast' && 'Routed to the topologically nearest node (lowest latency/cost).'}
        </span>
        <button
          onClick={handleTransmit}
          className="rounded-lg bg-sky-500 px-4 py-2 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20"
        >
          Send Packet
        </button>
      </div>
    </div>
  );
}