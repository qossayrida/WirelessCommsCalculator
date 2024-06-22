import HomePage from "./pages/HomePage.js";
import ResourceAllocation from "./pages/ResourceAllocation.js";
import SignalProcessing from "./pages/SignalProcessing.js";
import MultipleAccessThroughput from "./pages/MultipleAccessThroughput.js";
import TransmissionPower from "./pages/TransmissionPower.js";
import CellularSystemDesign from "./pages/CellularSystemDesign";


var dashRoutes = [
  {
    path: "/home-page",
    name: "Home page",
    icon: "design_app",
    component: <HomePage />,
    layout: "/admin",
  },
  {
    path: "/signal-processing",
    name: "Signal Processing",
    icon: "media-2_sound-wave",
    component: <SignalProcessing />,
    layout: "/admin",
  },
  {
    path: "/resource-allocation",
    name: "Resource Allocation",
    icon: "text_align-left",
    component: <ResourceAllocation />,
    layout: "/admin",
  },
  {
    path: "/transmission-power",
    name: "Transmission Power",
    icon: "business_chart-bar-32",
    component: <TransmissionPower />,
    layout: "/admin",
  },
  {
    path: "/multiple-access-throughput.js",
    name: "Multiple Access Throughput",
    icon: "ui-1_send",
    component: <MultipleAccessThroughput />,
    layout: "/admin",
  },
  {
    path: "/cellular-system-design",
    name: "Cellular System Design",
    icon: "business_globe",
    component: <CellularSystemDesign />,
    layout: "/admin",
  },
];
export default dashRoutes;
