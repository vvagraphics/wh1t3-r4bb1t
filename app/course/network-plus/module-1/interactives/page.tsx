import InteractiveViewer from "@/components/InteractiveViewer";
import OsiDragAndDrop from "@/components/Interactives/Module1/OsiDragAndDrop";
import TrafficTypeSimulator from "@/components/Interactives/Module1/TrafficTypeSimulator";
import PduEncapsulation from "@/components/Interactives/Module1/PduEncapsulation";
import NetworkLabMatrix from "@/components/Interactives/Module1/NetworkLabMatrix";
import SubnetCalculator from "@/components/Interactives/Module1/SubnetCalculator";

export default function Module1InteractivesPage() {
  const module1Simulations = [
    {
      id: "osi-triage",
      label: "01: OSI Layer Triage",
      component: <OsiDragAndDrop />,
    },
    {
      id: "traffic-flow",
      label: "02: Traffic Flow",
      component: <TrafficTypeSimulator />,
    },
    {
      id: "pdu-encap",
      label: "03: PDU Encapsulation",
      component: <PduEncapsulation />,
    },
    {
      id: "lab-matrix",
      label: "04: Network Lab Matrix",
      component: <NetworkLabMatrix />,
    },
    {
      id: "subnet-calc",
      label: "05: Subnet Calculator",
      component: <SubnetCalculator />,
    },
  ];

  return (
    <InteractiveViewer
      title="Interactive Protocols"
      description="Execute simulation environments to test theoretical knowledge."
      backLink="/course/network-plus/module-1"
      backLabel="Back to Module 01 Hub"
      simulations={module1Simulations}
    />
  );
}