import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <header className="relative h-[85vh] md:h-screen">
      {/* Background image with responsive sources */}
      <picture>
        {/* Desktop image */}
        <source media="(min-width: 768px)" srcSet="/images/hero-bg-desktop.jpg" />
        {/* Mobile image */}
        <img
          src="/images/hero-bg-mobile.jpg"
          alt="Home loan hero"
          className="
            absolute inset-0 -z-20 h-full w-full object-cover
            object-[20%_center] md:object-center
          "
        />
      </picture>

      {/* Left-to-right gradient overlay for copy legibility */}
      <div
        className="
          absolute inset-0 -z-10
          bg-gradient-to-r from-black/75 via-black/55 to-black/10
        "
      />

      {/* Optional subtle vignette at edges for depth */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(transparent,rgba(0,0,0,0.35))]" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 h-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center h-full">
          {/* LEFT: Copy + CTAs */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-sm ring-1 ring-white/15">
              <span>🏦 Home Loan Toolkit</span>
              <span className="opacity-80">Made for India</span>
            </div>

            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]">
              Make smarter home-loan moves—
              <span className="block">EMI, eligibility & part-payment in seconds.</span>
            </h1>

            <p className="mt-4 text-white/90 md:text-lg max-w-xl">
              WorkSocial India helps customers and bankers cut through the noise—clear
              numbers, clean UX, and shareable outputs tailored for Indian lending.
            </p>

            {/* Primary CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/calculators/emi"
                className="rounded-xl bg-white text-indigo-700 font-semibold px-5 py-3 hover:opacity-95 shadow ring-1 ring-white/30"
              >
                Calculate EMI
              </Link>
              <Link
                to="/calculators/eligibility"
                className="rounded-xl bg-white/10 text-white font-semibold px-5 py-3 hover:bg-white/15 ring-1 ring-white/20"
              >
                Check Eligibility
              </Link>
              <Link
                to="/calculators/part-payment"
                className="rounded-xl bg-white/10 text-white font-semibold px-5 py-3 hover:bg-white/15 ring-1 ring-white/20"
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

            {/* Trust chips */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-white/90">
              <div className="rounded-lg bg-white/10 px-3 py-2 ring-1 ring-white/10">🇮🇳 Indian amortization rules</div>
              <div className="rounded-lg bg-white/10 px-3 py-2 ring-1 ring-white/10">📄 PDF/XLSX exports</div>
              <div className="rounded-lg bg-white/10 px-3 py-2 ring-1 ring-white/10">🔒 No login required</div>
              <div className="rounded-lg bg-white/10 px-3 py-2 ring-1 ring-white/10">🚀 Mobile-first UX</div>
            </div>
          </div>

          {/* RIGHT: KPI glass card */}
          <div className="relative">
            <div className="mx-auto max-w-md">
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl p-6 ring-1 ring-black/5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-700">Typical EMI (₹50L • 8.5% • 20y)</div>
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
                  <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-black/5">
                    <div className="text-gray-500">Tenure</div>
                    <div className="font-semibold">240 mo</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-black/5">
                    <div className="text-gray-500">Total Interest</div>
                    <div className="font-semibold">₹54.1L</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-black/5">
                    <div className="text-gray-500">Savings w/ Part-Pay</div>
                    <div className="font-semibold">Up to ₹9.8L</div>
                  </div>
                </div>

                <Link
                  to="/calculators/emi"
                  className="mt-5 block text-center rounded-xl bg-indigo-600 text-white font-semibold px-5 py-3 hover:opacity-95 shadow"
                >
                  Start with EMI →
                </Link>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-6 rotate-[-4deg]">
              <div className="rounded-2xl backdrop-blur bg-white/70 ring-1 ring-black/10 px-4 py-2 shadow text-sm">
                🎯 Built for bankers & customers
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
