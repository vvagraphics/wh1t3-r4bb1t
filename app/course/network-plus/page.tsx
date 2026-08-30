import Link from "next/link";

export default function NetworkPlusDashboard() {
  return (
    <div className="min-h-screen bg-black text-white font-mono p-6 sm:p-8 md:p-12 lg:p-16 max-w-6xl mx-auto flex flex-col justify-between select-none">
      <div className="w-full">
        {/* Header Controls */}
        <div className="mb-12 flex flex-col items-start gap-4 border-b border-green-950 pb-6 pt-2">
          <Link
            href="/course"
            className="matrix-glow-btn text-xs md:text-sm font-bold px-4 py-2 uppercase tracking-widest flex items-center gap-2"
          >
            <span>&larr;</span>
            <span>BACK_TO_PROGRAMS</span>
          </Link>
          <div className="flex items-center gap-2.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
            <span className="text-xs text-green-700 tracking-widest">
              NETWORK+_SYS // ONLINE
            </span>
          </div>
        </div>

        {/* Dashboard Title */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-[#00ff41] uppercase text-shadow-neon">
            Network+ Modules
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-2 tracking-wide">
            &gt; Select an unlocked sector below to initialize neural training.
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 1 (Active) */}
          <Link
            href="/course/network-plus/module-1"
            className="group relative block border border-white/20 bg-black/60 p-6 transition-all duration-150 hover:bg-[#00ff41]/5 hover:border-l-4 hover:border-l-[#00ff41] hover:pl-7 hover:shadow-[0_0_20px_rgba(0,255,65,0.25)]"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-400 group-hover:text-green-500 tracking-widest font-semibold transition-colors">
                SECTOR // 01
              </span>
              <span className="badge-red-online text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest whitespace-nowrap">
                ONLINE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white group-hover:text-[#00ff41] transition-colors mb-3 tracking-wide">
              Module 01
            </h2>
            <p className="text-gray-400 group-hover:text-green-300 text-xs md:text-sm leading-relaxed mb-6 transition-colors">
              Course Introduction, Safety, and Core Networking Models
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#00ff41] group-hover:translate-x-1.5 transition-all">
              <span>INITIALIZE</span>
              <span>&rarr;</span>
            </div>
          </Link>

          {/* Module 2 (Active) */}
          <Link
            href="/course/network-plus/module-2"
            className="group relative block border border-white/20 bg-black/60 p-6 transition-all duration-150 hover:bg-[#00ff41]/5 hover:border-l-4 hover:border-l-[#00ff41] hover:pl-7 hover:shadow-[0_0_20px_rgba(0,255,65,0.25)]"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-400 group-hover:text-green-500 tracking-widest font-semibold transition-colors">
                SECTOR // 02
              </span>
              <span className="badge-red-online text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest whitespace-nowrap">
                ONLINE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white group-hover:text-[#00ff41] transition-colors mb-3 tracking-wide">
              Module 02
            </h2>
            <p className="text-gray-400 group-hover:text-green-300 text-xs md:text-sm leading-relaxed mb-6 transition-colors">
              Addressing Fundamentals
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#00ff41] group-hover:translate-x-1.5 transition-all">
              <span>INITIALIZE</span>
              <span>&rarr;</span>
            </div>
          </Link>

          {/* Module 3 (Active) */}
          <Link
            href="/course/network-plus/module-3"
            className="group relative block border border-white/20 bg-black/60 p-6 transition-all duration-150 hover:bg-[#00ff41]/5 hover:border-l-4 hover:border-l-[#00ff41] hover:pl-7 hover:shadow-[0_0_20px_rgba(0,255,65,0.25)]"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-400 group-hover:text-green-500 tracking-widest font-semibold transition-colors">
                SECTOR // 03
              </span>
              <span className="badge-red-online text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest whitespace-nowrap">
                ONLINE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white group-hover:text-[#00ff41] transition-colors mb-3 tracking-wide">
              Module 03
            </h2>
            <p className="text-gray-400 group-hover:text-green-300 text-xs md:text-sm leading-relaxed mb-6 transition-colors">
              Network Media, Topologies & Devices
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#00ff41] group-hover:translate-x-1.5 transition-all">
              <span>INITIALIZE</span>
              <span>&rarr;</span>
            </div>
          </Link>

          {/* Module 4 (Active) */}
          <Link
            href="/course/network-plus/module-4"
            className="group relative block border border-white/20 bg-black/60 p-6 transition-all duration-150 hover:bg-[#00ff41]/5 hover:border-l-4 hover:border-l-[#00ff41] hover:pl-7 hover:shadow-[0_0_20px_rgba(0,255,65,0.25)]"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-400 group-hover:text-green-500 tracking-widest font-semibold transition-colors">
                SECTOR // 04
              </span>
              <span className="badge-red-online text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest whitespace-nowrap">
                ONLINE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white group-hover:text-[#00ff41] transition-colors mb-3 tracking-wide">
              Module 04
            </h2>
            <p className="text-gray-400 group-hover:text-green-300 text-xs md:text-sm leading-relaxed mb-6 transition-colors">
              Physical Layer & Installation Considerations
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#00ff41] group-hover:translate-x-1.5 transition-all">
              <span>INITIALIZE</span>
              <span>&rarr;</span>
            </div>
          </Link>

          {/* Locked Modules Mapping */}
          {[
            { id: "05", title: "Subnetting & Small Network Design" },
            { id: "06", title: "WLAN Concepts & Secure Configuration" },
            { id: "07", title: "Switching & Routing Implementations" },
            { id: "08", title: "Network Operations & Services" },
            { id: "09", title: "Security Hardening" },
            { id: "10", title: "Modern Network Environments" },
            { id: "11", title: "Troubleshooting Methodology" }
          ].map((mod) => (
            <div key={mod.id} className="border border-green-950/60 p-6 bg-black/20 opacity-40 cursor-not-allowed">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-green-900 tracking-widest">
                  SECTOR // {mod.id}
                </span>
                <span className="bg-green-950 text-green-700 text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest border border-green-900/40 whitespace-nowrap">
                  ENCRYPTED
                </span>
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-3 tracking-wide">
                Module {mod.id}
              </h2>
              <p className="text-green-950 text-xs md:text-sm leading-relaxed mb-6">
                {mod.title}
              </p>
              <div className="text-xs text-green-950 font-bold uppercase tracking-wider">
                [ LOCKED ]
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 pt-4 border-t border-green-950 text-[11px] text-green-900 flex flex-col md:flex-row justify-between items-center gap-2">
        <span>SECURITY_PROTOCOL: LEVEL_1</span>
        <span>ROOT@MATRIX_TERMINAL:~#</span>
      </div>
    </div>
  );
}