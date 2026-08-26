import CheatsheetViewer from '@/components/CheatsheetViewer';

export default function Module3Cheatsheets() {
  // You can point this to a markdown file or JSON data object later
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Module 3 Cheatsheets</h1>
      <CheatsheetViewer module="module-3" />
    </div>
  );
}