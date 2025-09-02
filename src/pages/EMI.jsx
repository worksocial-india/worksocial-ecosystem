import { useState, useMemo } from "react";

export default function EMI() {
  // Inputs (defaults)
  const [principal, setPrincipal] = useState(3000000); // ₹30,00,000
  const [annualRate, setAnnualRate] = useState(8.5);   // % p.a.
  const [years, setYears] = useState(20);              // years

  // EMI maths
  const { emi, totalPayment, totalInterest } = useMemo(() => {
    const n = Math.max(1, Math.round(years * 12));      // months
    const r = (annualRate / 100) / 12;                  // monthly rate

    if (principal <= 0 || n <= 0) {
      return { emi: 0, totalPayment: 0, totalInterest: 0 };
    }

    // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
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

  // Amortization schedule (full), we will render first 12 rows
  const schedule = useMemo(() => {
    const rows = [];
    const n = Math.max(1, Math.round(years * 12));
    const r = (annualRate / 100) / 12;
    if (principal <= 0 || n <= 0) return rows;

    let bal = principal;
    for (let m = 1; m <= n; m++) {
      let interest = r * bal;
      let pay = emi;

      // 0% interest edge case
      if (r === 0) {
        interest = 0;
        const remainingMonths = n - m + 1;
        pay = bal / remainingMonths;
      }

      let principalPay = Math.min(pay - interest, bal);
      if (principalPay < 0) principalPay = 0;
      bal = Math.max(0, bal - principalPay);

      rows.push({
        month: m,
        emi: pay,
        interest,
        principal: principalPay,
        balance: bal,
      });

      if (bal <= 0) break;
    }
    return rows;
  }, [principal, annualRate, years, emi]);

  // CSV download
  const downloadCSV = () => {
    const header = "Month,EMI,Interest,Principal,Balance";
    const lines = schedule.map(r =>
      [
        r.month,
        Math.round(r.emi),
        Math.round(r.interest),
        Math.round(r.principal),
        Math.round(r.balance)
      ].join(",")
    );
    const csv = [header, ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emi_schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const fmt = (x) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(x || 0);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">EMI Calculator</h1>

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

      {/* Results */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm text-gray-600">Monthly EMI</div>
          <div className="mt-1 text-2xl font-semibold">{fmt(emi)}</div>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm text-gray-600">Total Interest</div>
          <div className="mt-1 text-2xl font-semibold">{fmt(totalInterest)}</div>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm text-gray-600">Total Payment</div>
          <div className="mt-1 text-2xl font-semibold">{fmt(totalPayment)}</div>
        </div>
      </div>

      {/* Donut + Table */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donut: Principal vs Interest */}
        <div className="rounded-2xl border bg-white p-5 flex items-center justify-center">
          {(() => {
            const principalTotal = principal;
            const interestTotal = totalInterest;
            const total = Math.max(1, principalTotal + interestTotal);

            const size = 160;
            const radius = 60;
            const stroke = 16;
            const circumference = 2 * Math.PI * radius;
            const interestDash = (interestTotal / total) * circumference;

            return (
              <div className="text-center">
                <svg width={size} height={size} viewBox="0 0 160 160" className="mx-auto">
                  <g transform="translate(80,80) rotate(-90)">
                    {/* base ring */}
                    <circle r={radius} cx="0" cy="0" fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
                    {/* interest arc */}
                    <circle
                      r={radius}
                      cx="0"
                      cy="0"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth={stroke}
                      strokeLinecap="round"
                      strokeDasharray={`${interestDash} ${circumference - interestDash}`}
                    />
                  </g>
                </svg>
                <div className="mt-3 text-sm flex items-center justify-center gap-4">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-blue-600"></span>
                    Interest
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-gray-300"></span>
                    Principal
                  </span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Table: first 12 rows + CSV */}
        <div className="rounded-2xl border bg-white p-5 overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Amortization (First 12 Months)</h2>
            <button
              onClick={downloadCSV}
              className="rounded-lg bg-blue-600 px-3 py-2 text-white text-sm font-medium hover:bg-blue-700"
            >
              Download CSV
            </button>
          </div>
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-600">
              <tr>
                <th className="py-2 pr-4">Month</th>
                <th className="py-2 pr-4">EMI</th>
                <th className="py-2 pr-4">Interest</th>
                <th className="py-2 pr-4">Principal</th>
                <th className="py-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.slice(0, 12).map((r) => (
                <tr key={r.month} className="border-t">
                  <td className="py-2 pr-4">{r.month}</td>
                  <td className="py-2 pr-4">{fmt(r.emi)}</td>
                  <td className="py-2 pr-4">{fmt(r.interest)}</td>
                  <td className="py-2 pr-4">{fmt(r.principal)}</td>
                  <td className="py-2">{fmt(r.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-gray-500">
            Showing first 12 rows. Use “Download CSV” for the full schedule.
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1), where r = annual%/12/100 and n = months.
      </p>
    </main>
  );
}
