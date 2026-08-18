import OsiDragAndDrop from '@/src/components/Interactives/Module1/OsiDragAndDrop';

export default function Module1InteractivesPage() {
  return (
    <div>
      <h1>Module 1: Interactive Practice</h1>
      {/* This drops the interactive game right onto the page */}
      <OsiDragAndDrop /> 
    </div>
  );
}