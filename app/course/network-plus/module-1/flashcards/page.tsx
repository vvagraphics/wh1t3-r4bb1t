import FlashcardViewer from "@/components/FlashcardViewer";
// Note: Ensure your json file aligns with the updated interface (adding laymanExplanation and examTip)
import module1Cards from '@/data/network-plus/module2-cards.json';

export default function Module1Flashcards() {
  return (
    <FlashcardViewer 
      cardsData={module1Cards} 
      moduleTitle="MOD 01 // CORE NETWORKING" 
      returnHref="/course/network-plus/module-1"
      storageKey="matrixHardCards_mod1" 
    />
  );
}