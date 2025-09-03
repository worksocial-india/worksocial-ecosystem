import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Calculators from "./pages/Calculators";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EMI from "./pages/EMI";
import Eligibility from "./pages/Eligibility";
import PartPrepaymentCalculator from "./pages/part-payment";
import AmortizationCalculator from "./pages/Amortization";




export default function App() {
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
