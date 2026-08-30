import FlashcardViewer from "@/components/FlashcardViewer";
import module3Cards from "@/data/network-plus/module3-cards.json";

export default function Module3Flashcards() {
  return (
    <FlashcardViewer 
      cardsData={module3Cards} 
      moduleTitle="MOD 03 // NETWORK MEDIA, TOPOLOGIES & DEVICES" 
      returnHref="/course/network-plus/module-3"
      storageKey="matrixHardCards_mod3"
    />
  );
}