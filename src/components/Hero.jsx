import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/* top gradient bg */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"></div>

      {/* subtle pattern */}
      <svg
        className="absolute inset-0 -z-10 opacity-10"
        width="100%" height="100%" preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* container */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: copy + CTAs */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <span>🏦 Home Loan Toolkit</span>
              <span className="opacity-80">Made for India</span>
            </div>

            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
              Make smarter home-loan moves—
              <span className="block">EMI, eligibility & part-payment in seconds.</span>
            </h1>

            <p className="mt-4 text-white/90 md:text-lg">
              WorkSocial India helps customers and bankers cut through the noise—clear
              numbers, clean UX, and shareable outputs tailored for Indian lending.
            </p>

            {/* primary CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/calculators/emi"
                className="rounded-xl bg-white text-indigo-700 font-semibold px-5 py-3 hover:opacity-95 shadow"
              >
                Calculate EMI
              </Link>
              <Link
                to="/calculators/eligibility"
                className="rounded-xl bg-white/10 text-white font-semibold px-5 py-3 hover:bg-white/15 border border-white/20"
              >
                Check Eligibility
              </Link>
              <Link
                to="/calculators/part-payment"
                className="rounded-xl bg-white/10 text-white font-semibold px-5 py-3 hover:bg-white/15 border border-white/20"
              >
                Part-Payment Savings
              </Link>
              <a
                href="https://wa.me/918000000000?text=Hi%20WorkSocial%20India%20—%20I%20want%20help%20with%20my%20home%20loan."
                target="_blank" rel="noopener noreferrer"
                className="rounded-xl bg-[#25D366] text-white font-semibold px-5 py-3 hover:opacity-95"
                title="WhatsApp us"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* trust row */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-white/90">
              <div className="rounded-lg bg-white/10 px-3 py-2 border border-white/10">
                🇮🇳 Indian amortization rules
              </div>
              <div className="rounded-lg bg-white/10 px-3 py-2 border border-white/10">
                📄 PDF/XLSX exports
              </div>
              <div className="rounded-lg bg-white/10 px-3 py-2 border border-white/10">
                🔒 No login required
              </div>
              <div className="rounded-lg bg-white/10 px-3 py-2 border border-white/10">
                🚀 Mobile-first UX
              </div>
            </div>
          </div>

          {/* Right: illustration / KPI card */}
          <div className="relative">
            <div className="mx-auto max-w-md">
              <div className="rounded-3xl bg-white shadow-xl p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Typical EMI (₹50L • 8.5% • 20y)</div>
                    <div className="text-3xl font-bold">₹43,391</div>
                  </div>
                  <span className="text-xs rounded-full bg-green-100 text-green-700 px-2 py-1">
                    Real-time
                  </span>
                </div>

                <div className="mt-4 h-28 w-full rounded-xl bg-gradient-to-r from-indigo-100 to-pink-100 grid place-items-center text-gray-600 text-sm">
                  Minimal chart placeholder
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl bg-gray-50 p-3 border">
                    <div className="text-gray-500">Tenure</div>
                    <div className="font-semibold">240 mo</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3 border">
                    <div className="text-gray-500">Total Interest</div>
                    <div className="font-semibold">₹54.1L</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3 border">
                    <div className="text-gray-500">Savings w/ Part-Pay</div>
                    <div className="font-semibold">Up to ₹9.8L</div>
                  </div>
                </div>

                <Link
                  to="/calculators/emi"
                  className="mt-5 block text-center rounded-xl bg-indigo-600 text-white font-semibold px-5 py-3 hover:opacity-95"
                >
                  Start with EMI →
                </Link>
              </div>

              {/* floating badge */}
              <div className="absolute -bottom-4 -left-6 rotate-[-4deg]">
                <div className="rounded-2xl backdrop-blur bg-white/70 border px-4 py-2 shadow text-sm">
                  🎯 Built for bankers & customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
