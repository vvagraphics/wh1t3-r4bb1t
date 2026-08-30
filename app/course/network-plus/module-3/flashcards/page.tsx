"use client";
import FlashcardViewer from "@/components/FlashcardViewer";
import module3Cards from "@/data/network-plus/module3-cards.json";

export default function Module3FlashcardsPage() {
  return (
    <FlashcardViewer
      title="Sector 03 // Flashcards"
      description="Test your recall on cabling standards, topologies, and network devices."
      backLink="/course/network-plus/module-3"
      backLabel="Return to Sector 03 Menu"
      cards={module3Cards}
    />
  );
}