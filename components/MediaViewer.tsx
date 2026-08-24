"use client";

import { useState } from "react";
import Link from "next/link";

export interface MediaVideo {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  sourceUrl: string;
}

interface MediaViewerProps {
  currentModuleId: string;
  returnHref: string;
  videos: MediaVideo[];
}

export default function MediaViewer({ currentModuleId, returnHref, videos }: MediaViewerProps) {
  // Find the video for the current module, default to the first one if not found
  const initialVideo = videos.find(v => v.moduleId === currentModuleId) || videos[0];
  const [activeVideo, setActiveVideo] = useState<MediaVideo>(initialVideo);

  return (
    <div className="min-h-screen bg-black text-white font-mono p-6 md:p-12 lg:p-16 max-w-7xl mx-auto flex flex-col">
      {/* Return Link */}
      <Link href={returnHref} className="text-[#00ff41] hover:underline text-xs md:text-sm mb-8 tracking-wider">
        &lt; RETURN_TO_DIRECTORY
      </Link>

      {/* Header */}
      <div className="mb-10 border-b border-[#00ff41]/30 pb-4">
        <h1 className="text-3xl md:text-5xl font-bold text-[#00ff41] uppercase tracking-widest text-shadow-neon">
          Global Media Archive
        </h1>
        <p className="text-gray-400 mt-2 tracking-wide">Accessing external databanks and video feeds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT/TOP: MAIN VIDEO PLAYER */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[#00ff41] font-bold text-xl uppercase tracking-wider">
              {activeVideo.title}
            </h2>
            <span className="text-[10px] bg-green-950 text-green-400 px-2 py-1 border border-green-800 uppercase">
              STREAM // ACTIVE
            </span>
          </div>
          
          <div className="relative w-full pb-[56.25%] border-2 border-green-900 rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.1)] bg-black">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={activeVideo.sourceUrl}
              title={activeVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed">
            <span className="text-green-500 font-bold">&gt; DESC:</span> {activeVideo.description}
          </p>
        </div>

        {/* RIGHT/BOTTOM: PLAYLIST INDEX */}
        <div className="flex flex-col border border-green-900 bg-[#020a02] p-4 h-fit">
          <h3 className="text-green-500 font-bold mb-4 border-b border-green-800 pb-2 uppercase tracking-widest">
            :: Archive Index ::
          </h3>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] custom-scrollbar">
            {videos.map((vid) => (
              <button
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className={`text-left p-3 text-sm transition-all border-l-2 ${
                  activeVideo.id === vid.id
                    ? "border-[#00ff41] bg-green-950/40 text-white shadow-[inset_0_0_10px_rgba(0,255,65,0.2)]"
                    : "border-transparent text-gray-500 hover:border-green-800 hover:text-green-400 hover:bg-black/50"
                }`}
              >
                <span className="block text-[10px] font-bold mb-1 opacity-70">MODULE {vid.moduleId}</span>
                {vid.title}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}