import { Routes, Route } from "react-router-dom";
import AgriWebHomePage from "./pages/Home.Page"
import FarmProducePage from "./pages/FarmProduct.Page";
import SupplyTrackingPage from "./pages/SupplyTracking"
import SmartContractsPage from "./pages/SmartContract.Page";
import MarketInsightsPage from "./pages/MarkitingInsight.Page"
function App() {
  return (
    <Routes>
      <Route path="/" element={<AgriWebHomePage />}/>
      <Route path="/farm-produce" element={<FarmProducePage />}/>
      <Route path="/supply-tracking" element={<SupplyTrackingPage />}/>
       <Route path="/smart-contracts" element={<SmartContractsPage />}/>
        <Route path="/market-insights" element={<MarketInsightsPage />}/>
    </Routes>
  );
}

export default App;