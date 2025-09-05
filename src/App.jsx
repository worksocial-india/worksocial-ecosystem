import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Calculators from "./pages/Calculators";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EMI from "./pages/EMI";
import Eligibility from "./pages/Eligibility";
import PartPrepaymentCalculator from "./pages/part-payment";
import AmortizationCalculator from "./pages/amortization";

export default function App() {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    const page_path = location.pathname + location.search;
    const page_location = window.location.href;

    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_path,
        page_location,
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
        <Route path="/calculators/emi" element={<EMI />} />
        <Route path="/calculators/eligibility" element={<Eligibility />} />
        <Route path="/calculators/part-payment" element={<PartPrepaymentCalculator />} />
        <Route path="/calculators/amortization" element={<AmortizationCalculator />} />
      </Routes>
      <Footer />
    </div>
  );
}
