'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/resume', label: 'Resume' },
  { href: '/blog', label: 'Blog' },
];

function ThemeToggle({
  theme,
  onToggle,
  className,
}: {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className: string;
}) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${nextTheme === 'dark' ? 'Dark' : 'Light'} theme`}
      title={`Switch to ${nextTheme === 'dark' ? 'Dark' : 'Light'} theme`}
      className={`${className} cursor-pointer rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900`}
    >
      {theme === 'dark' ? (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      ) : (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
        </svg>
      )}
    </button>
  );
}

/** Renders responsive site navigation with the current route highlighted. */
export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  }

  return (
    <nav className="print:hidden bg-background border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-900 tracking-tight">
          RRK
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href) ?? false;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-0.5'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggle theme={theme} onToggle={toggleTheme} className="ml-1" />
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          className="md:hidden p-1 text-gray-800"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href) ?? false;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggle theme={theme} onToggle={toggleTheme} className="mt-1 self-start" />
        </div>
      )}
    </nav>
  );
}
