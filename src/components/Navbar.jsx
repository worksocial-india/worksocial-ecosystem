import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    [
      "inline-block",
      "no-underline",                 // remove underline
      "visited:no-underline",        // also for visited state
      "transition-colors",
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-gray-900 visited:text-gray-700",
    ].join(" ");

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight no-underline text-gray-900">
          WorkSocial
        </Link>

        {/* use space-x-* to force spacing between links */}
        <nav className="flex items-center space-x-6 text-sm">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/calculators" className={linkClass}>Calculators</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
