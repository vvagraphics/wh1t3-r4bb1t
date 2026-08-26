import Link from 'next/link';

export default function Module3Hub() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Module 3: Network Media, Topologies & Devices</h1>
      <p className="mb-8 text-gray-600">
        Master the physical components of networking, from copper and fiber cabling to logical topologies and core infrastructure devices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/course/network-plus/module-3/cheatsheets" className="p-6 border rounded-lg hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Cheatsheets</h2>
          <p className="text-sm text-gray-500">Quick-reference guides for cable standards, connector types, and topology maps.</p>
        </Link>

        <Link href="/course/network-plus/module-3/flashcards" className="p-6 border rounded-lg hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Flashcards</h2>
          <p className="text-sm text-gray-500">Test your recall on media types, hardware functions, and 802.11 standards.</p>
        </Link>

        <Link href="/course/network-plus/module-3/interactives" className="p-6 border rounded-lg hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Interactives</h2>
          <p className="text-sm text-gray-500">Practice matching topologies to scenarios and configuring basic firewall ACLs.</p>
        </Link>

        <Link href="/course/network-plus/module-3/media" className="p-6 border rounded-lg hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Media & Diagrams</h2>
          <p className="text-sm text-gray-500">Visual breakdowns of Spine-Leaf architecture and fiber optic cores.</p>
        </Link>
      </div>
    </div>
  );
}