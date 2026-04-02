import { Routes, Route } from "react-router-dom";
import AgriWebHomePage from "./pages/Home.Page";
import FarmProducePage from "./pages/FarmProduct.Page";
import SupplyTrackingPage from "./pages/SupplyTracking";
import SmartContractsPage from "./pages/SmartContract.Page";
import MarketInsightsPage from "./pages/MarkitingInsight.Page";
import RegistrationPage from "./pages/Registration.Page";
import RoleSelection from "./pages/Roles.Page";
import AboutPage from "./pages/About.page";
function App() {
  return (
    <Routes>
      <Route path="/" element={<AgriWebHomePage />} />
      <Route path="/farm-produce" element={<FarmProducePage />} />
      <Route path="/supply-tracking" element={<SupplyTrackingPage />} />
      <Route path="/smart-contracts" element={<SmartContractsPage />} />
      <Route path="/market-insights" element={<MarketInsightsPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/getstarted" element={<RoleSelection />} />
       <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
