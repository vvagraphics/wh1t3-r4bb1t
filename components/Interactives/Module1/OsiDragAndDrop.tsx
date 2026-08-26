'use client';

import React, { useState } from 'react';

interface Scenario {
  id: string;
  title: string;
  symptom: string;
  cliOutput: string;
  correctLayer: number;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    title: 'Switch Port Link Failure',
    symptom: 'Workstation loses all network access. RJ-45 activity LED on the NIC is completely dark.',
    cliOutput: '$ ethtool eth0\nSpeed: Unknown!\nDuplex: Unknown!\nLink detected: no',
    correctLayer: 1,
    explanation: 'Dark LEDs and no link pulse indicate a physical layer (Layer 1) fault: unplugged cable, bad patch, or damaged pinout.',
  },
  {
    id: 's2',
    title: 'Inter-VLAN Gateway Timeout',
    symptom: 'Host can reach local peers on 192.168.1.0/24, but cannot route traffic to 10.0.5.1.',
    cliOutput: '$ ping 10.0.5.1\nFrom 192.168.1.1 icmp_seq=1 Destination Host Unreachable',
    correctLayer: 3,
    explanation: 'ICMP Host Unreachable and routing boundary issues isolate directly to the Network Layer (Layer 3) routing table or default gateway misconfiguration.',
  },
  {
    id: 's3',
    title: 'Web Server API Error',
    symptom: 'Client receives response payloads containing status code 502 Bad Gateway.',
    cliOutput: 'HTTP/1.1 502 Bad Gateway\nContent-Type: text/html\nServer: nginx/1.24.0',
    correctLayer: 7,
    explanation: 'HTTP status codes (4xx, 5xx) operate entirely at the Application Layer (Layer 7), representing reverse-proxy/upstream application process failures.',
  },
];

const OSI_LAYERS = [
  { num: 7, name: 'Application' },
  { num: 6, name: 'Presentation' },
  { num: 5, name: 'Session' },
  { num: 4, name: 'Transport' },
  { num: 3, name: 'Network' },
  { num: 2, name: 'Data Link' },
  { num: 1, name: 'Physical' },
];

export default function OsiDragAndDrop() {
  const [index, setIndex] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [status, setStatus] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [streak, setStreak] = useState(0);

  const current = SCENARIOS[index];

  const handleSelect = (layerNum: number) => {
    if (status !== 'unanswered') return;
    setSelectedLayer(layerNum);

    if (layerNum === current.correctLayer) {
      setStatus('correct');
      setStreak(s => s + 1);
    } else {
      setStatus('incorrect');
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelectedLayer(null);
    setStatus('unanswered');
    setIndex((index + 1) % SCENARIOS.length);
  };

  return (
    <div className="mx-auto max-w-4xl rounded-xl border border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-2xl">
      {/* Header / Stats */}
      <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-amber-400">OSI Incident Triage Console</h2>
          <p className="text-xs text-slate-400">Isolate the root-cause failure layer</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 font-mono text-xs">
          <span className="text-slate-400">STREAK:</span>
          <span className="font-bold text-amber-400">{streak}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Ticket & Terminal Output */}
        <div className="space-y-4 md:col-span-7">
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Incident #{current.id.toUpperCase()}</span>
            <h3 className="mt-1 text-sm font-semibold text-slate-200">{current.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{current.symptom}</p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-black/80 p-3 font-mono text-xs">
            <div className="mb-1 text-[10px] text-slate-500">// Diagnostic Telemetry</div>
            <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">{current.cliOutput}</pre>
          </div>

          {/* Feedback Display */}
          {status !== 'unanswered' && (
            <div className={`rounded-lg border p-4 ${status === 'correct' ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300' : 'border-rose-500/50 bg-rose-950/40 text-rose-300'}`}>
              <div className="font-bold text-xs uppercase tracking-wide">
                {status === 'correct' ? 'Correct Layer Identified' : 'Triage Error'}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">{current.explanation}</p>
              <button
                onClick={handleNext}
                className="mt-3 rounded bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200 hover:bg-slate-700"
              >
                Next Ticket &rarr;
              </button>
            </div>
          )}
        </div>

        {/* OSI Vertical Stack Selector */}
        <div className="flex flex-col gap-1.5 md:col-span-5">
          {OSI_LAYERS.map(l => {
            let btnStyle = 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300';
            if (selectedLayer === l.num) {
              btnStyle = l.num === current.correctLayer
                ? 'border-emerald-500 bg-emerald-950/80 text-emerald-300'
                : 'border-rose-500 bg-rose-950/80 text-rose-300';
            }

            return (
              <button
                key={l.num}
                onClick={() => handleSelect(l.num)}
                disabled={status !== 'unanswered'}
                className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-xs font-mono transition-all ${btnStyle}`}
              >
                <span className="font-bold">L{l.num}</span>
                <span className="font-sans font-medium">{l.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}