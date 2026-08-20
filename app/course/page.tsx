import Link from "next/link";

export default function CourseDashboard() {
  return (
    <div className="min-h-screen bg-black text-white font-mono p-6 sm:p-8 md:p-12 lg:p-16 max-w-6xl mx-auto flex flex-col justify-between select-none">
      
      <div className="w-full">
        {/* Top Header Controls - Safe padding and clean vertical stacking */}
        <div className="mb-12 flex flex-col items-start gap-4 border-b border-green-950 pb-6 pt-2">
          
          {/* Power Button with safe margin from top-left */}
          <Link 
            href="/" 
            className="matrix-glow-btn text-xs md:text-sm font-bold px-4 py-2 uppercase tracking-widest flex items-center gap-2"
          >
            <span className="text-base">⏻</span>
            <span>POWER_OFF</span>
          </Link>

          {/* Subordinate System Status Line - Pushed down cleanly */}
          <div className="flex items-center gap-2.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
            <span className="text-xs text-green-700 tracking-widest">
              CORE_SYS // ONLINE
            </span>
          </div>
        </div>

        {/* Dashboard Title */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-[#00ff41] uppercase text-shadow-neon">
            System Dashboard
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-2 tracking-wide">
            &gt; Select an unlocked sector below to initialize neural training.
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Module 1 (Active) */}
          <Link 
            href="/course/module-1" 
            className="group relative block border border-white/20 bg-black/60 p-6 transition-all duration-150 hover:bg-[#00ff41]/5 hover:border-l-4 hover:border-l-[#00ff41] hover:pl-7 hover:shadow-[0_0_20px_rgba(0,255,65,0.25)]"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-400 group-hover:text-green-500 tracking-widest font-semibold transition-colors">
                SECTOR // 01
              </span>
              {/* Red Neon Alert Status - Inline padding fixed to prevent text overflow */}
              <span className="badge-red-online text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest whitespace-nowrap">
                ONLINE
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white group-hover:text-[#00ff41] transition-colors mb-3 tracking-wide">
              Module 01
            </h2>

            <p className="text-gray-400 group-hover:text-green-300 text-xs md:text-sm leading-relaxed mb-6 transition-colors">
              Course Intro, Safety &amp; Core Networking Models
            </p>

            <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#00ff41] group-hover:translate-x-1.5 transition-all">
              <span>INITIALIZE</span>
              <span>&rarr;</span>
            </div>
          </Link>

          {/* Module 2 (Encrypted) */}
          <div className="border border-green-950/60 p-6 bg-black/20 opacity-40 cursor-not-allowed">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-green-900 tracking-widest">
                SECTOR // 02
              </span>
              <span className="bg-green-950 text-green-700 text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest border border-green-900/40 whitespace-nowrap">
                ENCRYPTED
              </span>
            </div>

            <h2 className="text-2xl font-bold text-green-900 mb-3 tracking-wide">
              Module 02
            </h2>

            <p className="text-green-950 text-xs md:text-sm leading-relaxed mb-6">
              Cabling &amp; Wireless Data (Access Restricted)
            </p>

            <div className="text-xs text-green-950 font-bold uppercase tracking-wider">
              [ LOCKED ]
            </div>
          </div>

          {/* Module 3 (Encrypted) */}
          <div className="border border-green-950/60 p-6 bg-black/20 opacity-40 cursor-not-allowed">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-green-900 tracking-widest">
                SECTOR // 03
              </span>
              <span className="bg-green-950 text-green-700 text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest border border-green-900/40 whitespace-nowrap">
                ENCRYPTED
              </span>
            </div>

            <h2 className="text-2xl font-bold text-green-900 mb-3 tracking-wide">
              Module 03
            </h2>

            <p className="text-green-950 text-xs md:text-sm leading-relaxed mb-6">
              Network Architecture &amp; Operations (Pending)
            </p>

            <div className="text-xs text-green-950 font-bold uppercase tracking-wider">
              [ LOCKED ]
            </div>
          </div>

        </div>
      </div>

      {/* Footer System Status */}
      <div className="mt-16 pt-4 border-t border-green-950 text-[11px] text-green-900 flex flex-col md:flex-row justify-between items-center gap-2">
        <span>SECURITY_PROTOCOL: LEVEL_1</span>
        <span>ROOT@MATRIX_TERMINAL:~#</span>
      </div>

    </div>
  );
}