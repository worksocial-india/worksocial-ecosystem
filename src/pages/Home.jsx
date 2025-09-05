import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      {/* HERO */}
      <section className="bg-neutral-800 text-white rounded-2xl mt-6">
        <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* LEFT: Headline + copy */}
            <div>
              <h1 className="h1-fluid tracking-tight">
                loan moves— <br className="hidden sm:block" />
                EMI, eligibility & part-payment in seconds.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-neutral-200 max-w-prose">
                WorkSocial India helps customers and bankers cut through the noise—clear numbers,
                clean UX, and shareable outputs tailored for Indian lending.
              </p>
            </div>

            {/* RIGHT: CTA block (right-aligned on desktop) */}
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                to="/calculators/emi"
                className="w-full md:w-auto inline-flex justify-center rounded-xl px-5 py-3 font-semibold bg-white text-neutral-900"
              >
                Calculate EMI
              </Link>

              <Link
                to="/calculators/eligibility"
                className="w-full md:w-auto inline-flex justify-center rounded-xl px-5 py-3 font-semibold bg-neutral-700"
              >
                Check Eligibility
              </Link>

              <Link
                to="/calculators/part-payment"
                className="w-full md:w-auto inline-flex justify-center rounded-xl px-5 py-3 font-semibold bg-neutral-700"
              >
                Part-Payment Savings
              </Link>

              <a
                href="https://wa.me/91XXXXXXXXXX"  /* <-- put your WhatsApp number */
                className="w-full md:w-auto inline-flex justify-center rounded-xl px-5 py-3 font-semibold bg-green-500 text-neutral-900"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* KPI / chart under the two columns, full width */}
          <div className="mt-8 rounded-2xl bg-white/10 p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm sm:text-base">Typical EMI (₹50L • 8.5% • 20y)</span>
              <span className="text-xs sm:text-sm rounded-full bg-white/20 px-2 py-1">Real-time</span>
            </div>
            <div className="mt-4 h-40 w-full rounded-xl bg-white/5 flex items-center justify-center">
              <span className="text-sm text-neutral-300">Minimal chart placeholder</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
