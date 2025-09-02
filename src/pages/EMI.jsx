import { useState, useMemo } from "react";

export default function EMI() {
  // Inputs (defaults you can tweak)
  const [principal, setPrincipal] = useState(3000000);   // ₹30 lakh
  const [annualRate, setAnnualRate] = useState(8.5);     // % per annum
  const [years, setYears] = useState(20);                // tenure in years

  // Core maths
  const { emi, totalPayment, totalInterest } = useMemo(() => {
    const n = Math.max(1, Math.round(years * 12));           // months
    const r = (annualRate / 100) / 12;                        // monthly rate

    if (principal <= 0 || n <= 0) {
      return { emi: 0, totalPayment: 0, totalInterest: 0 };
    }

    // EMI formula:
    // E = P * r * (1+r)^n / ((1+r)^n - 1)
    let E = 0;
    if (r === 0) {
      E = principal / n;
    } else {
      const pow = Math.pow(1 + r, n);
      E = principal * r * pow / (pow - 1);
    }
    const tp = E * n;
    const ti = tp - principal;
    return { emi: E, totalPayment: tp, totalInterest: ti };
  }, [principal, annualRate, years]);

  const fmt = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">EMI Calculator</h1>

      {/* Inputs */}
      {/* Inputs (with synced sliders) */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-5">

  {/* Loan Amount */}
  <label className="block">
    <div className="text-sm text-gray-600 mb-1">Loan Amount (₹)</div>
    <input
      type="number"
      className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
      value={principal}
      onChange={(e) => setPrincipal(Number(e.target.value))}
      min={100000}
      max={20000000}
      step={10000}
    />
    <input
      type="range"
      className="mt-2 w-full"
      value={principal}
      onChange={(e) => setPrincipal(Number(e.target.value))}
      min={100000}
      max={20000000}
      step={10000}
      aria-label="Loan amount"
    />
    <div className="flex justify-between text-xs text-gray-500 mt-1">
      <span>₹1L</span><span>₹2Cr</span>
    </div>
  </label>

  {/* Interest Rate */}
  <label className="block">
    <div className="text-sm text-gray-600 mb-1">Interest Rate (% p.a.)</div>
    <input
      type="number"
      className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
      value={annualRate}
      onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
      min={5}
      max={16}
      step={0.05}
    />
    <input
      type="range"
      className="mt-2 w-full"
      value={annualRate}
      onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
      min={5}
      max={16}
      step={0.05}
      aria-label="Interest rate"
    />
    <div className="flex justify-between text-xs text-gray-500 mt-1">
      <span>5%</span><span>16%</span>
    </div>
  </label>

  {/* Tenure */}
  <label className="block">
    <div className="text-sm text-gray-600 mb-1">Tenure (years)</div>
    <input
      type="number"
      className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
      value={years}
      onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
      min={1}
      max={40}
      step={0.5}
    />
    <input
      type="range"
      className="mt-2 w-full"
      value={years}
      onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
      min={1}
      max={40}
      step={0.5}
      aria-label="Tenure (years)"
    />
    <div className="flex justify-between text-xs text-gray-500 mt-1">
      <span>1y</span><span>40y</span>
    </div>
  </label>

</div>


      <p className="mt-4 text-xs text-gray-500">
        Formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1), where r = annual%/12/100 and n = months.
      </p>
    </main>
  );
}
