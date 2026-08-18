import Link from "next/link";

export default function ModuleOneHub() {
  return (
    <div className="min-h-screen p-8 md:p-16 max-w-5xl mx-auto">
      
      {/* Navigation Breadcrumb */}
      <Link href="/course" className="text-[#00ff41] hover:underline text-sm mb-8 inline-block">
        &lt; Return to System Dashboard
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Module 01: Core Networking</h1>
        <p className="text-gray-400">Select your training protocol.</p>
      </div>

      {/* Feature Tabs / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Flashcards Link */}
        <Link 
          href="/course/module-1/flashcards"
          className="border border-gray-700 p-8 hover:border-[#00ff41] hover:bg-[#00ff41]/5 transition-all group"
        >
          <h3 className="text-xl font-bold text-white group-hover:text-[#00ff41] mb-2"> Flashcards</h3>
          <p className="text-sm text-gray-400">Anki-style spaced repetition for terms, acronyms, and OSI models.</p>
        </Link>

        {/* Interactives Link */}
        <Link 
          href="/course/module-1/interactives"
          className="border border-gray-700 p-8 hover:border-[#00ff41] hover:bg-[#00ff41]/5 transition-all group"
        >
          <h3 className="text-xl font-bold text-white group-hover:text-[#00ff41] mb-2"> Interactives</h3>
          <p className="text-sm text-gray-400">Drag-and-drop simulators and PDU packaging labs.</p>
        </Link>

        {/* Cheatsheets Link */}
        <Link 
          href="/course/module-1/cheatsheets"
          className="border border-gray-700 p-8 hover:border-[#00ff41] hover:bg-[#00ff41]/5 transition-all group"
        >
          <h3 className="text-xl font-bold text-white group-hover:text-[#00ff41] mb-2"> Cheatsheets</h3>
          <p className="text-sm text-gray-400">High-yield Markdown tables and port number references.</p>
        </Link>

        {/* Media Link */}
        <Link 
          href="/course/module-1/media"
          className="border border-gray-700 p-8 hover:border-[#00ff41] hover:bg-[#00ff41]/5 transition-all group"
        >
          <h3 className="text-xl font-bold text-white group-hover:text-[#00ff41] mb-2"> Media Archives</h3>
          <p className="text-sm text-gray-400">Custom infographics, diagrams, and video explanations.</p>
        </Link>

      </div>
    </div>
  );
}