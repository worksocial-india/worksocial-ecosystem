import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="bg-white">
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          WorkSocial India
        </h1>
        <p className="mt-3 text-lg text-gray-700">
          Smart tools for home loans and confident financial decisions.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            to="/calculators"
            className="inline-block rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700"
          >
            Try Calculators
          </Link>
          <Link
            to="/contact"
            className="inline-block rounded-xl border border-gray-300 px-5 py-3 text-gray-700 hover:bg-gray-100"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
