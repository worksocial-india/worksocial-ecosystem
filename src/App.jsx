import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Calculators from "./pages/Calculators";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Emi from "./pages/emi.jsx";
import Eligibility from "./pages/Eligibility";
import PartPrepaymentCalculator from "./pages/part-payment";
import AmortizationCalculator from "./pages/amortization";

export default function App() {
  const location = useLocation();
  const firstLoadSentRef = useRef(false);

  // Track page views on route change (skip first load; GA snippet already fired)
  useEffect(() => {
    if (!firstLoadSentRef.current) {
      firstLoadSentRef.current = true;
      return;
    }
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        // debug_mode: true, // uncomment to see events in DebugView
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Calculators" element={<Calculators />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Calculators/emi" element={<Emi />} />
        <Route path="/Calculators/Eligibility" element={<Eligibility />} />
        <Route path="/Calculators/part-payment" element={<PartPrepaymentCalculator />} />
        <Route path="/Calculators/amortization" element={<AmortizationCalculator />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}
