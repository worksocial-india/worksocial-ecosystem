import { Link } from "react-router-dom";

const tools = [
  { title: "EMI Calculator", desc: "Monthly EMI, total interest, schedule.", path: "/calculators/emi" },
  { title: "Eligibility", desc: "Max loan based on income & obligations.", path: "/calculators/eligibility" },
  { title: "Part-Payment", desc: "Impact of extra payments on tenure/EMI.", path: "/calculators/part-payment" },
  { title: "Amortization", desc: "Full payment table with breakdowns.", path: "/calculators/amortization" },
];



export default function Calculators() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Calculators</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((t) => (
          <Link
            key={t.title}
            to={t.path}
            className="block rounded-2xl border bg-white p-5 hover:shadow-md transition-shadow no-underline"
          >
            <div className="text-lg font-semibold text-gray-900">{t.title}</div>
            <p className="mt-1 text-sm text-gray-600">{t.desc}</p>
            <div className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium">
              Open
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
