import FlashcardViewer from "@/components/FlashcardViewer";
import module4Cards from "@/data/network-plus/module4-cards.json";

export default function Module4Flashcards() {
  return (
    <FlashcardViewer 
      cardsData={module4Cards} 
      moduleTitle="MOD 04 // PHYSICAL LAYER & INSTALLATION CONSIDERATIONS" 
      returnHref="/course/network-plus/module-4"
      storageKey="matrixHardCards_mod4"
    />
  );
}