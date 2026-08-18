import Link from "next/link";

export default function CourseDashboard() {
  return (
    <div className="min-h-screen p-8 md:p-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#00ff41]/30 pb-4 mb-8">
        <h1 className="text-3xl font-bold tracking-widest text-[#00ff41] uppercase">
          System Dashboard
        </h1>
        <p className="text-sm text-gray-400 mt-2">Select a module to initiate training.</p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Module 1 (Active) */}
        <Link 
          href="/course/module-1" 
          className="group block border border-[#00ff41]/50 p-6 bg-black/50 hover:bg-[#00ff41]/10 hover:border-[#00ff41] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-[#00ff41] text-black text-xs font-bold px-2 py-1 uppercase">Active</div>
          <h2 className="text-2xl font-bold text-white group-hover:text-[#00ff41] transition-colors mb-2">Module 01</h2>
          <p className="text-gray-400 text-sm">Course Intro, Safety & Core Networking Models</p>
        </Link>

        {/* Module 2 (Locked Placeholder) */}
        <div className="border border-gray-800 p-6 bg-black/20 opacity-50 cursor-not-allowed">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-gray-600">Module 02</h2>
            <span className="text-gray-600 text-xs font-bold uppercase">Locked</span>
          </div>
          <p className="text-gray-600 text-sm">Cabling & Wireless Data (Pending)</p>
        </div>

      </div>
    </div>
  );
}