import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center p-8 bg-black font-mono">
      
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 z-0 object-cover w-full h-full opacity-40 pointer-events-none"
      >
        <source src="/rabbit-tunnel.mp4" type="video/mp4" />
      </video>

      {/* Shadow gradient overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030303_100%)] pointer-events-none" />

      {/* Main Content */}
      <div className="space-y-8 max-w-3xl z-10 relative">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Follow the white rabbit.
        </h1>
        
        <p className="text-lg md:text-xl text-[#00ff41] animate-pulse">
          Wake up... The Network awaits.
        </p>

        <div className="pt-12">
          <Link 
            href="/course" 
            className="matrix-glow-btn inline-block px-8 py-4 uppercase tracking-widest font-bold text-sm md:text-base rounded-none"
          >
            Access Mainframe
          </Link>
        </div>
      </div>
    </div>
  );
}