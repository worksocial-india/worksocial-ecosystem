import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// ⬇️ Match filenames exactly (case + .jsx)
import Home from "./pages/Home.jsx";
import Calculators from "./pages/Calculators.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Emi from "./pages/emi.jsx";
import Eligibility from "./pages/Eligibility.jsx";
import PartPrepaymentCalculator from "./pages/part-payment.jsx";
import AmortizationCalculator from "./pages/amortization.jsx";

export default function App() {
  const location = useLocation();
  const firstLoadSentRef = useRef(false);

  // GA page views on route change (skip first load)
  useEffect(() => {
    if (!firstLoadSentRef.current) {
      firstLoadSentRef.current = true;
      return;
    }
    window.gtag?.("event", "page_view", {
      page_title: document.title,
      page_path: location.pathname + location.search,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* primary routes — all lowercase */}
        <Route path="/" element={<Home />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/calculators/emi" element={<Emi />} />
        <Route path="/calculators/eligibility" element={<Eligibility />} />
        <Route path="/calculators/part-payment" element={<PartPrepaymentCalculator />} />
        <Route path="/calculators/amortization" element={<AmortizationCalculator />} />

        {/* redirects for legacy uppercase URLs (so old links keep working) */}
        <Route path="/Calculators/*" element={<Navigate to="/calculators" replace />} />
        <Route path="/About" element={<Navigate to="/about" replace />} />
        <Route path="/Contact" element={<Navigate to="/contact" replace />} />
        <Route path="/Calculators/emi" element={<Navigate to="/calculators/emi" replace />} />
        <Route path="/Calculators/Eligibility" element={<Navigate to="/calculators/eligibility" replace />} />
        <Route path="/Calculators/part-payment" element={<Navigate to="/calculators/part-payment" replace />} />
        <Route path="/Calculators/amortization" element={<Navigate to="/calculators/amortization" replace />} />

        {/* fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}
