import { useMemo, useState } from "react";

export default function Eligibility() {
    
  // Inputs (tweak defaults as you like)
  const [monthlyIncome, setMonthlyIncome] = useState(75000); // ₹ per month
  const [existingEmi, setExistingEmi] = useState(0);         // ₹ per month
  const [foirPct, setFoirPct] = useState(45);                // % of income allowed for EMIs
  const [annualRate, setAnnualRate] = useState(8.5);         // % p.a.
  const [years, setYears] = useState(20);                    // tenure in years

  // Helpers
  const fmt = (x) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Math.max(0, x || 0));

  // Core math:
  // MaxEMI = income * FOIR - existing obligations
  // Loan P (from EMI) = E * ((1+r)^n - 1) / (r * (1+r)^n), r = rate/12/100, n = months
  const { maxEmi, eligibleLoan } = useMemo(() => {
    const foir = Math.max(0, Math.min(100, foirPct)) / 100; // clamp 0–1
    const n = Math.max(1, Math.round(years * 12));          // months
    const r = (annualRate / 100) / 12;                      // monthly rate

    const E = Math.max(0, monthlyIncome * foir - existingEmi); // ₹/month
    if (E <= 0) return { maxEmi: 0, eligibleLoan: 0 };

    let P = 0;
    if (r === 0) {
      P = E * n; // simple sum if 0% rate
    } else {
      const pow = Math.pow(1 + r, n);
      P = E * (pow - 1) / (r * pow);
    }
    return { maxEmi: E, eligibleLoan: P };
  }, [monthlyIncome, existingEmi, foirPct, annualRate, years]);

  // Quick FOIR presets
  const applyPreset = (p) => setFoirPct(p);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Eligibility Calculator</h1>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Income */}
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Monthly Income (₹)</div>
          <input
            type="number"
            className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            min={10000}
            max={500000}
            step={1000}
          />
          <input
            type="range"
            className="mt-2 w-full"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            min={10000}
            max={500000}
            step={1000}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹10k</span><span>₹5L</span>
          </div>
        </label>

        {/* Existing EMIs */}
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Existing EMIs (₹/month)</div>
          <input
            type="number"
            className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-600"
            value={existingEmi}
            onChange={(e) => setExistingEmi(Number(e.target.value))}
            min={0}
            max={300000}
            step={1000}
          />
          <input
            type="range"
            className="mt-2 w-full"
            value={existingEmi}
            onChange={(e) => setExistingEmi(Number(e.target.value))}
            min={0}
            max={300000}
            step={1000}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹0</span><span>₹3L</span>
          </div>
        </label>

        {/* FOIR */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 mb-1">FOIR (Fixed Obligations to Income Ratio)</div>
            <div className="flex gap-2">
              <button
                className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
                onClick={() => applyPreset(35)}
              >
                Conservative 35%
              </button>
              <button
                className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
                onClick={() => applyPreset(40)}
              >
                Self-employed 40%
              </button>
              <button
                className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
                onClick={() => applyPreset(45)}
              >
                Salaried 45%
              </button>
              <button
                className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
                onClick={() => applyPreset(50)}
              >
                Aggressive 50%
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="number"
              className="w-28 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
              value={foirPct}
              onChange={(e) => setFoirPct(Number(e.target.value))}
              min={20}
              max={70}
              step={1}
            />
            <input
              type="range"
              className="flex-1"
              value={foirPct}
              onChange={(e) => setFoirPct(Number(e.target.value))}
              min={20}
              max={70}
              step={1}
            />
          </div>
        </div>

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
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1y</span><span>40y</span>
          </div>
        </label>
      </div>

      {/* Results */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm text-gray-600">Eligible Loan Amount</div>
          <div className="mt-1 text-2xl font-semibold">{fmt(eligibleLoan)}</div>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm text-gray-600">Max EMI (as per FOIR)</div>
          <div className="mt-1 text-2xl font-semibold">{fmt(maxEmi)}</div>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm text-gray-600">Inputs</div>
          <div className="mt-1 text-sm text-gray-700">
            {years}y @ {annualRate}% p.a., FOIR {foirPct}%.
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Notes: Eligibility is estimated using FOIR = (allowed EMI % of income) and standard EMI maths.
        Lenders may apply other criteria (age, credit score, LTV, employer category, etc.).
      </p>
    </main>
  );
}
