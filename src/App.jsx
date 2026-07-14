import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import JoinEmployee from "./pages/JoinEmployee";
import JoinChannelPartner from "./pages/JoinChannelPartner";
import LoanComparison from "./pages/LoanComparison";
import EligibilityLTVCalculator from "./pages/EligibilityLTVCalculator";
import BankDocuments from "./pages/BankDocuments";
import Roi from "./pages/Roi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/join-employee" element={<JoinEmployee />} />
          <Route path="/join-channel-partner" element={<JoinChannelPartner />} />
          <Route path="/loan-comparison" element={<LoanComparison />} />
          <Route path="/eligibility-calculator" element={<EligibilityLTVCalculator />} />
          <Route path="/bank-documents" element={<BankDocuments />} />
          <Route path="/roi" element={<Roi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
