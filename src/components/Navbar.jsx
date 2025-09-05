import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const closeBtnRef = useRef(null);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Focus close button when panel opens
  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  // Esc key to close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const linkClass = ({ isActive }) =>
    [
      "block no-underline",
      "px-4 py-2 md:px-0 md:py-0",
      "transition-colors",
      isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-gray-900",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto max-w-screen-xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight no-underline text-gray-900"
          aria-label="WorkSocial India Home"
        >
          WorkSocial
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/calculators" className={linkClass}>Calculators</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* RIGHT-SIDE DESKTOP CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/919999571688" // replace with your WhatsApp number
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-green-500 text-white hover:bg-green-600 no-underline"
            onClick={() =>
              window.gtag?.("event", "click", {
                event_category: "nav",
                event_label: "whatsapp_cta_desktop",
              })
            }
          >
            WhatsApp
          </a>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(o => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={[
          "fixed md:hidden inset-y-0 right-0 w-full max-w-sm bg-white border-l shadow-xl",
          "transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="px-4 py-3 flex items-center justify-between border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button
            ref={closeBtnRef}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-3 space-y-2 text-sm">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/calculators" className={linkClass}>Calculators</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>

          {/* MOBILE CTA */}
          <div className="pt-2 mt-2 border-t">
            <a
              href="https://wa.me/919999571688" // replace with your number
              className="block w-full text-center rounded-xl px-4 py-2 font-semibold bg-green-500 text-white no-underline"
              onClick={() => {
                setOpen(false);
                window.gtag?.("event", "click", {
                  event_category: "nav",
                  event_label: "whatsapp_cta_mobile",
                });
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
