import Link from "next/link";

export default function Module2Menu() {
  const sections = [
    {
      title: "Flashcards",
      description: "Spaced repetition for IPv4/IPv6 formats, NAT types, and private IP ranges.",
      href: "/course/network-plus/module-2/flashcards",
    },
    {
      title: "Interactives",
      description: "Binary-to-decimal decoders and CIDR/Subnetting sandboxes.",
      href: "/course/network-plus/module-2/interactives",
    },
    {
      title: "Cheatsheets",
      description: "High-yield CIDR tables, VLSM charts, and IPv6 formatting rules.",
      href: "/course/network-plus/module-2/cheatsheets",
    },
    {
      title: "Media Archives",
      description: "Visual subnetting breakdowns and NAT/PAT translation diagrams.",
      href: "/course/network-plus/module-2/media",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono p-6 md:p-12 lg:p-16 max-w-5xl mx-auto flex flex-col justify-between select-none">
      
      <div>
        <div className="mb-8">
          <Link 
            href="/course/network-plus" 
            className="text-xs md:text-sm font-bold text-gray-400 hover:text-[#00ff41] transition-colors uppercase tracking-wider"
          >
            &lt; Return to System Dashboard
          </Link>
        </div>

        <div className="mb-10 border-b border-green-950 pb-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-[#00ff41] uppercase text-shadow-neon">
            Module 02: Addressing Fundamentals
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-2 tracking-wide">
            Select your training protocol.
          </p>
        </div>

        <div className="flex flex-col border border-white/20 divide-y divide-white/20 bg-black/40">
          {sections.map((sec) => (
            <Link
              key={sec.title}
              href={sec.href}
              className="group p-6 transition-all duration-150 hover:bg-[#00ff41]/5 hover:border-l-4 hover:border-l-[#00ff41] hover:pl-7"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00ff41] transition-colors mb-2">
                {sec.title}
              </h2>
              <p className="text-gray-400 group-hover:text-green-300 text-xs md:text-sm transition-colors">
                {sec.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16 pt-4 border-t border-green-950 text-[11px] text-green-900 flex justify-between items-center">
        <span>SECTOR: 02 // ACTIVE</span>
        <span>PROTOCOL: READY</span>
      </div>

    </div>
  );
}