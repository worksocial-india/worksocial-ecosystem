import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    [
      "block no-underline",             // remove underline
      "px-4 py-2 md:px-0 md:py-0",      // comfy touch targets on mobile
      "transition-colors",
      isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-gray-900",
    ].join(" ");

  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight no-underline text-gray-900">
          WorkSocial
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/calculators" className={linkClass}>Calculators</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(o => !o)}
        >
          {/* icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      <div id="mobile-menu" className={open ? "md:hidden border-t" : "hidden"}>
        <div className="px-4 py-3 space-y-2 text-sm">
          <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/calculators" className={linkClass} onClick={() => setOpen(false)}>Calculators</NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink>
        </div>
      </div>
    </header>
  );
}
