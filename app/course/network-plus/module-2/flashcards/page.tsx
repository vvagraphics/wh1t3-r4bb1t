import FlashcardViewer from "@/components/FlashcardViewer";
import module2Cards from '@/data/network-plus/module2-cards.json'; // Your new JSON file

export default function Module2Flashcards() {
  return (
    <FlashcardViewer 
      cardsData={module2Cards} 
      moduleTitle="MOD 02 // ADDRESSING FUNDAMENTALS" 
      returnHref="/course/network-plus/module-2"
      storageKey="matrixHardCards_mod2" // Unique key so it tracks progress separately!
    />
  );
}