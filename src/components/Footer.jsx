import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  const link = "no-underline text-gray-600 hover:text-gray-900";
  const aLink = "no-underline text-gray-600 hover:text-gray-900";

  return (
    <footer className="mt-16 border-t bg-white">
      <div className="max-w-5xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4 text-sm">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="text-xl font-extrabold tracking-tight text-gray-900">WorkSocial</div>
          <p className="mt-2 text-gray-600">
            Tools for smarter home-loan decisions and banker–customer collaboration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div className="font-semibold text-gray-900 mb-2">Quick Links</div>
          <ul className="space-y-1">
            <li><Link to="/" className={link}>Home</Link></li>
            <li><Link to="/calculators" className={link}>Calculators</Link></li>
            <li><Link to="/about" className={link}>About</Link></li>
            <li><Link to="/contact" className={link}>Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="font-semibold text-gray-900 mb-2">Contact</div>
          <ul className="space-y-1 text-gray-600">
            <li>Email: <a className={aLink} href="mailto:arun.singh@worksocial.org">arun.singh@worksocial.org</a></li>
            <li>Website: <a className={aLink} href="https://www.worksocial.org" target="_blank" rel="noreferrer">worksocial.org</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <div className="font-semibold text-gray-900 mb-2">Social</div>
          <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a className={aLink} href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.94 8.5v9h-3v-9h3ZM5.44 3.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM21 13.38V17.5c0 2.21-1.79 4-4 4h-2v-7c0-1.1-.9-2-2-2s-2 .9-2 2v7H9v-9h2v1.01A3.99 3.99 0 0 1 14 10c2.21 0 4 1.79 4 4v-.62h3Z" fill="currentColor"/>
              </svg>
            </a>
            {/* YouTube */}
            <a className={aLink} href="https://www.youtube.com/@worksocial" target="_blank" rel="noreferrer" aria-label="YouTube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21.58 7.2a3 3 0 0 0-2.12-2.13C17.98 4.5 12 4.5 12 4.5s-5.98 0-7.46.57A3 3 0 0 0 2.42 7.2 31.62 31.62 0 0 0 2 12c0 1.65.2 3.3.42 4.8a3 3 0 0 0 2.12 2.13C5.98 19.5 12 19.5 12 19.5s5.98 0 7.46-.57a3 3 0 0 0 2.12-2.13c.22-1.5.42-3.15.42-4.8 0-1.65-.2-3.3-.42-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-5xl mx-auto px-4 py-4 text-xs text-gray-500">
          © {year} WorkSocial India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
