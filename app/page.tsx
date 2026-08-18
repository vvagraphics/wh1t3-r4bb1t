import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center p-8">
      
      {/* Background GIF with a dark overlay to maintain the Matrix vibe */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/rabbit-tunnel.gif')" }}
      />
      {/* Additional gradient to fade the edges into the void */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030303_100%)]" />

      <div className="space-y-8 max-w-3xl z-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Follow the white rabbit.
        </h1>
        <p className="text-lg md:text-xl text-[#00ff41] animate-pulse">
          Wake up... The Network awaits.
        </p>

        <div className="pt-12">
          <Link 
            href="/course" 
            className="inline-block px-8 py-4 border border-[#00ff41] text-[#00ff41] uppercase tracking-widest hover:bg-[#00ff41] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,65,0.4)] hover:shadow-[0_0_25px_rgba(0,255,65,0.8)] backdrop-blur-sm"
          >
            Access Mainframe
          </Link>
        </div>
      </div>
    </div>
  );
}