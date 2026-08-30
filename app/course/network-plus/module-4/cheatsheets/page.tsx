"use client";
import CheatsheetViewer from "@/components/CheatsheetViewer";

export default function Module4CheatsheetPage() {
  const sections = [
    {
      title: "Ethernet Copper Standards",
      content: "Cat5e: 1 Gbps / 100 MHz\nCat6: 1 Gbps (10 Gbps up to 55m) / 250 MHz\nCat6A: 10 Gbps at 100m / 500 MHz\nCat8: 25-40 Gbps up to 30m (Data Centers)."
    },
    {
      title: "T568A vs T568B",
      content: "T568A: White/Green, Green, White/Orange, Blue, White/Blue, Orange, White/Brown, Brown.\nT568B: White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown.\nStraight-Through: Same on both ends.\nCrossover: A on one end, B on the other."
    },
    {
      title: "PoE Standards",
      content: "802.3af (PoE): 15.4W\n802.3at (PoE+): 30W\n802.3bt (PoE++): 60-100W"
    },
    {
      title: "Cable Testing & Facilities",
      content: "Continuity: Checks electrical path.\nWiremap: Checks correct pinout/miswires.\nPlenum: Fire-resistant jacket for HVAC spaces.\nMDF/IDF: Main Distribution Frame connects to Intermediate Distribution Frames."
    }
  ];

  return (
    <CheatsheetViewer
      title="Sector 04 // Cheatsheets"
      description="Quick reference for cabling, pinouts, and physical infrastructure."
      backLink="/course/network-plus/module-4"
      backLabel="Return to Sector 04 Menu"
      sections={sections}
    />
  );
}