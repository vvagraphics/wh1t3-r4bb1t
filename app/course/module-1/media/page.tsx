"use client";

import Link from "next/link";

export default function MediaArchivesPage() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto flex flex-col">
      <Link href="/course/module-1" className="text-[#00ff41] hover:underline text-sm mb-8">
        &lt; Back to Module 01 Hub
      </Link>

      <div className="mb-12 border-b border-[#00ff41]/30 pb-4">
        <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Media Archives</h1>
        <p className="text-gray-400 mt-2">Video lectures, demonstrations, and external databanks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* YOUTUBE EMBED BLOCK */}
        <div className="flex flex-col">
          <h2 className="text-[#00ff41] font-mono mb-3 uppercase tracking-wider"> External Archive: HTB Networking Intro</h2>
          <div className="relative w-full pb-[56.25%] border border-gray-700 rounded-lg overflow-hidden shadow-lg bg-black">
            {/* The standard YouTube embed iframe */}
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/cLuIbQkx0qo" 
              title="Intro to Networking : HTB part 1" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-xs text-gray-500 mt-3 font-mono">Source: stuffy24 [00:00:14 - 00:48:00]</p>
        </div>

        {/* HOSTINGER PLACEHOLDER BLOCK */}
        <div className="flex flex-col">
          <h2 className="text-gray-500 font-mono mb-3 uppercase tracking-wider"> Internal Archive: Custom Walkthrough</h2>
          <div className="relative w-full pb-[56.25%] border border-dashed border-gray-800 rounded-lg overflow-hidden bg-black/40 flex items-center justify-center">
            
            <div className="text-center p-6">
              <svg className="w-12 h-12 text-gray-700 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <h3 className="text-gray-500 font-bold uppercase tracking-widest mb-2">Transmission Pending</h3>
              <p className="text-xs text-gray-600 font-mono max-w-xs mx-auto">
                Awaiting media upload from primary host (mr3anderson.pro/assets/). 
                <br/><br/>
                /* To activate, replace this div with the standard HTML5 video tag */
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}