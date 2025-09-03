import { useMemo, useState } from "react";

/** --- small helpers --- */
const fmtINR = (n, frac = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  }).format(Math.max(0, Number.isFinite(n) ? n : 0));

/** EMI for principal P, monthly rate r, months n */
const emi = (P, r, n) => {
  if (n <= 0) return 0;
  if (r === 0) return P / n;
  const pow = Math.pow(1 + r, n);
  return (P * r * pow) / (pow - 1);
};

/** Build amortization schedule (optionally with prepayment) */
function buildSchedule({
  principal,
  annualRatePct,
  months,
  prepayType, // 'lump' | 'regular' | 'none'
  lumpSum = 0,
  lumpAtMonth = 0, // 1-based
  extraMonthly = 0,
}) {
  const r = annualRatePct / 100 / 12;
  const baseEmi = emi(principal, r, months);

  let balance = principal;
  let m = 0;
  let totalInterest = 0;
  const rows = [];

  while (balance > 0 && m < 1200) {
    m += 1;

    // base payment
    let payThisMonth = baseEmi;

    // add regular prepayment if applicable
    if (prepayType === "regular" && extraMonthly > 0) {
      payThisMonth += extraMonthly;
    }

    // interest for the month
    const interest = balance * r;
    let principalPart = payThisMonth - interest;

    // if lump sum month, add it as principal reduction
    let lump = 0;
    if (prepayType === "lump" && lumpAtMonth > 0 && m === lumpAtMonth) {
      lump = Math.min(lumpSum, Math.max(0, balance - principalPart));
      principalPart += lump;
    }

    // cap to remaining balance
    if (principalPart > balance) principalPart = balance;

    balance -= principalPart;
    totalInterest += interest;

    rows.push({
      month: m,
      emi: payThisMonth,
      interest,
      principal: principalPart,
      lump,
      balance,
    });

    if (balance <= 0.01) break;
  }

  return {
    baseEmi,
    totalInterest,
    monthsPaid: m,
    rows,
  };
}

export default function PartPrepaymentCalculator() {
  // -------- form state --------
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(10);

  const [tab, setTab] = useState("lump"); // 'lump' | 'regular'
  const [lumpAmount, setLumpAmount] = useState(50000);
  const [lumpMonth, setLumpMonth] = useState(12);

  const [extraMonthly, setExtraMonthly] = useState(5000);

  // -------- calculations --------
  const months = useMemo(() => Math.max(1, Math.round(years * 12)), [years]);

  const base = useMemo(
    () =>
      buildSchedule({
        principal: amount,
        annualRatePct: rate,
        months,
        prepayType: "none",
      }),
    [amount, rate, months]
  );

  const withPrepay = useMemo(() => {
    if (tab === "lump") {
      return buildSchedule({
        principal: amount,
        annualRatePct: rate,
        months,
        prepayType: "lump",
        lumpSum: Math.max(0, lumpAmount),
        lumpAtMonth: Math.max(1, Math.min(months, Math.round(lumpMonth))),
      });
    }
    return buildSchedule({
      principal: amount,
      annualRatePct: rate,
      months,
      prepayType: "regular",
      extraMonthly: Math.max(0, extraMonthly),
    });
  }, [tab, amount, rate, months, lumpAmount, lumpMonth, extraMonthly]);

  const interestSaved = Math.max(0, base.totalInterest - withPrepay.totalInterest);
  const monthsSaved = Math.max(0, base.monthsPaid - withPrepay.monthsPaid);

  // -------- UI --------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* top gradient strip */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center text-sm py-2">
        Calculate savings from lump sum or regular additional payments
      </div>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Part-Payment Calculator</h1>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white p-5 shadow-sm">
            <div className="text-sm opacity-90">Total Interest Saved</div>
            <div className="text-3xl font-semibold mt-1">{fmtINR(interestSaved)}</div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-5 shadow-sm">
            <div className="text-sm opacity-90">Time Saved</div>
            <div className="text-3xl font-semibold mt-1">
              {monthsSaved} {monthsSaved === 1 ? "month" : "months"}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <div className="text-sm text-gray-600">Base Monthly EMI</div>
            <div className="text-3xl font-semibold mt-1">{fmtINR(base.baseEmi)}</div>
          </div>
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: form */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Loan Details</h2>

            {/* amount/rate/term */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="block">
                <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
                <input
                  type="number"
                  className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min={10000}
                  step={1000}
                />
              </label>

              <label className="block">
                <div className="text-sm text-gray-600 mb-1">Interest Rate (%)</div>
                <input
                  type="number"
                  className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                  min={0}
                  max={30}
                  step={0.05}
                />
              </label>

              <label className="block">
                <div className="text-sm text-gray-600 mb-1">Loan Term (Years)</div>
                <input
                  type="number"
                  className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
                  value={years}
                  onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
                  min={1}
                  max={40}
                  step={0.5}
                />
              </label>
            </div>

            {/* tabs */}
            <div className="mt-6">
              <div className="text-sm text-gray-800 mb-1">Part Payment Type</div>
              <div className="inline-flex rounded-xl border overflow-hidden">
                <button
                  onClick={() => setTab("lump")}
                  className={`px-5 py-2 text-sm font-medium ${
                    tab === "lump"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  Lump Sum
                </button>
                <button
                  onClick={() => setTab("regular")}
                  className={`px-5 py-2 text-sm font-medium ${
                    tab === "regular"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  Regular Payment
                </button>
              </div>
            </div>

            {/* tab fields */}
            {tab === "lump" ? (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <div className="text-sm text-gray-600 mb-1">Lump Sum Amount</div>
                  <input
                    type="number"
                    className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
                    value={lumpAmount}
                    onChange={(e) => setLumpAmount(Number(e.target.value))}
                    min={0}
                    step={1000}
                  />
                </label>

                <label className="block">
                  <div className="text-sm text-gray-600 mb-1">Payment After (Months)</div>
                  <input
                    type="number"
                    className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
                    value={lumpMonth}
                    onChange={(e) => setLumpMonth(Number(e.target.value))}
                    min={1}
                    max={months}
                    step={1}
                  />
                </label>
              </div>
            ) : (
              <div className="mt-4">
                <label className="block">
                  <div className="text-sm text-gray-600 mb-1">Extra Payment Every Month</div>
                  <input
                    type="number"
                    className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
                    value={extraMonthly}
                    onChange={(e) => setExtraMonthly(Number(e.target.value))}
                    min={0}
                    step={500}
                  />
                </label>
              </div>
            )}

            {/* calculate button (reactive anyway) */}
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-white font-semibold shadow-sm hover:opacity-95"
              onClick={() => {
                document.getElementById("comparison")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Calculate Savings
            </button>
          </section>

          {/* Right: results & schedule */}
          <section className="space-y-6">
            {/* Comparison */}
            <div id="comparison" className="rounded-2xl bg-white p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Comparison</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border p-4">
                  <div className="font-medium mb-2">Without Part Payment</div>
                  <div className="text-sm text-gray-600 flex justify-between">
                    <span>Monthly EMI:</span>
                    <span className="font-medium text-gray-900">{fmtINR(base.baseEmi)}</span>
                  </div>
                  <div className="text-sm text-gray-600 flex justify-between mt-1">
                    <span>Total Interest:</span>
                    <span className="font-medium text-gray-900">{fmtINR(base.totalInterest)}</span>
                  </div>
                  <div className="text-sm text-gray-600 flex justify-between mt-1">
                    <span>Loan Duration:</span>
                    <span className="font-medium text-gray-900">{base.monthsPaid} months</span>
                  </div>
                </div>

                <div className="rounded-xl border p-4">
                  <div className="font-medium mb-2">With Part Payment</div>
                  <div className="text-sm text-gray-600 flex justify-between">
                    <span>Monthly EMI:</span>
                    <span className="font-medium text-gray-900">
                      {fmtINR(tab === "regular" ? base.baseEmi + extraMonthly : base.baseEmi)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 flex justify-between mt-1">
                    <span>Total Interest:</span>
                    <span className="font-medium text-gray-900">
                      {fmtINR(withPrepay.totalInterest)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 flex justify-between mt-1">
                    <span>Loan Duration:</span>
                    <span className="font-medium text-gray-900">{withPrepay.monthsPaid} months</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule preview */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Payment Schedule Preview</h3>

              <div className="max-h-80 overflow-y-auto divide-y rounded-xl border">
                {withPrepay.rows.slice(0, 120).map((row) => (
                  <div key={row.month} className="px-4 py-3 flex items-start justify-between">
                    <div>
                      <div className="font-medium">Month {row.month}</div>
                      <div className="text-xs text-gray-500">
                        Principal: {fmtINR(row.principal)} • Interest: {fmtINR(row.interest)}
                        {row.lump ? (
                          <span className="ml-2 text-indigo-600 font-medium">
                            + Lump: {fmtINR(row.lump)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">EMI: {fmtINR(row.emi)}</div>
                      <div className="text-xs text-gray-500">Balance: {fmtINR(row.balance)}</div>
                    </div>
                  </div>
                ))}
                {withPrepay.rows.length > 120 && (
                  <div className="px-4 py-2 text-xs text-gray-500 text-center">
                    Showing first 120 months…
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
