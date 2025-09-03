import { useState, useMemo } from "react";

/** --- Helpers --- */
const fmtINR = (n, frac = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: frac,
    maximumFractionDigits: frac,
  }).format(Math.max(0, Number.isFinite(n) ? n : 0));

const emi = (P, r, n) => {
  if (n <= 0) return 0;
  if (r === 0) return P / n;
  const pow = Math.pow(1 + r, n);
  return (P * r * pow) / (pow - 1);
};

function buildSchedule(P, annualRate, months) {
  const r = annualRate / 100 / 12;
  const e = emi(P, r, months);
  let balance = P;
  const rows = [];
  let totalInterest = 0;

  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    let principal = e - interest;
    if (principal > balance) principal = balance;
    balance -= principal;
    totalInterest += interest;
    rows.push({
      month: m,
      emi: e,
      interest,
      principal,
      balance: balance > 0 ? balance : 0,
    });
    if (balance <= 0) break;
  }
  return { emi: e, rows, totalInterest };
}

export default function AmortizationCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const months = useMemo(() => Math.max(1, Math.round(years * 12)), [years]);
  const { emi: monthlyEmi, rows, totalInterest } = useMemo(
    () => buildSchedule(amount, rate, months),
    [amount, rate, months]
  );

  // -------- Lazy exporters (no top-level heavy imports) --------
  const exportExcel = async () => {
    try {
      const XLSX = await import("xlsx");
      const { utils } = XLSX;
      const data = rows.map((r) => ({
        Month: r.month,
        EMI: Math.round(r.emi),
        Principal: Math.round(r.principal),
        Interest: Math.round(r.interest),
        Balance: Math.round(r.balance),
      }));
      const ws = utils.json_to_sheet(data);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Amortization");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const { saveAs } = await import("file-saver");
      saveAs(new Blob([wbout], { type: "application/octet-stream" }), "amortization.xlsx");
    } catch (e) {
      console.error(e);
      alert("Excel export failed. Run: npm i xlsx file-saver");
    }
  };

  const exportPDF = async () => {
    try {
      const jsPDFModule = await import("jspdf");
      const jsPDF = jsPDFModule.default || jsPDFModule; // handle CJS/ESM
      await import("jspdf-autotable"); // attaches autoTable to jsPDF
      const doc = new jsPDF();
      doc.text("Amortization Schedule", 14, 15);
      const head = [["Month", "EMI", "Principal", "Interest", "Balance"]];
      const body = rows.map((r) => [
        r.month,
        fmtINR(r.emi),
        fmtINR(r.principal),
        fmtINR(r.interest),
        fmtINR(r.balance),
      ]);
      // @ts-ignore (plugin adds autoTable)
      doc.autoTable({ head, body, startY: 20, styles: { fontSize: 8 } });
      doc.save("amortization.pdf");
    } catch (e) {
      console.error(e);
      alert("PDF export failed. Run: npm i jspdf jspdf-autotable");
    }
  };

  const shareWhatsApp = () => {
    const yearsPart = Math.floor(months / 12);
    const monthsPart = months % 12;
    const tenureText =
      yearsPart > 0
        ? `${yearsPart} yr${yearsPart > 1 ? "s" : ""}${monthsPart ? ` ${monthsPart} mo` : ""}`
        : `${monthsPart} mo`;
    const msg =
      `*WorkSocial India – Amortization Summary*\n\n` +
      `• Loan Amount: ${fmtINR(amount)}\n` +
      `• Interest Rate: ${rate}% p.a.\n` +
      `• Tenure: ${months} months (${tenureText})\n` +
      `• Monthly EMI: ${fmtINR(monthlyEmi)}\n` +
      `• Total Interest: ${fmtINR(totalInterest)}\n` +
      `• Total Payment: ${fmtINR(amount + totalInterest)}\n\n` +
      `Calculate your schedule:\nhttps://worksocial.in/calculators/amortization`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center text-sm py-2">
        Amortization schedule – full month-by-month breakdown
      </div>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Amortization Calculator</h1>

        {/* Inputs */}
        <section className="rounded-2xl bg-white p-6 shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
              <input
                type="number"
                className="w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={10000}
                step={10000}
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
                step={1}
              />
            </label>
          </div>
        </section>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <div className="text-sm text-gray-600">Monthly EMI</div>
            <div className="text-2xl font-semibold mt-1">{fmtINR(monthlyEmi)}</div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <div className="text-sm text-gray-600">Total Interest Payable</div>
            <div className="text-2xl font-semibold mt-1">{fmtINR(totalInterest)}</div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <div className="text-sm text-gray-600">Total Payment</div>
            <div className="text-2xl font-semibold mt-1">{fmtINR(amount + totalInterest)}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={exportExcel} className="rounded-xl bg-green-600 text-white px-4 py-2 shadow hover:opacity-90">
            Export Excel
          </button>
          <button onClick={exportPDF} className="rounded-xl bg-red-600 text-white px-4 py-2 shadow hover:opacity-90">
            Export PDF
          </button>
          <button onClick={shareWhatsApp} className="rounded-xl bg-[#25D366] text-white px-4 py-2 shadow hover:opacity-90" title="Share summary on WhatsApp">
            Share on WhatsApp
          </button>
        </div>

        {/* Schedule */}
        <section className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Amortization Schedule</h2>
          <div className="max-h-[600px] overflow-y-auto divide-y border rounded-xl">
            {rows.map((row) => (
              <div key={row.month} className="grid grid-cols-5 gap-2 px-4 py-2 text-sm text-gray-700">
                <div>Month {row.month}</div>
                <div>EMI: {fmtINR(row.emi)}</div>
                <div>Principal: {fmtINR(row.principal)}</div>
                <div>Interest: {fmtINR(row.interest)}</div>
                <div>Balance: {fmtINR(row.balance)}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
