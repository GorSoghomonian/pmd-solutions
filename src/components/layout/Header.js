'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pacifico } from 'next/font/google';

// Font configuration - could be moved to a shared fonts file
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
});

export default function Header() {
  const pathname = usePathname();
  
  // TODO: Make navigation items configurable/dynamic for easier maintenance
  // TODO: Add mobile menu for responsive design
  // TODO: Replace hardcoded "Logo" text with actual logo image
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-black/10 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between px-8 py-4">
          {/* Logo - currently just text placeholder */}
          <div
            className={`text-2xl font-bold text-black ${pacifico.className}`}
            aria-label="Logo"
          >
            Logo
          </div>

          {/* Navigation Menu - TODO: Add mobile hamburger menu */}
          <ul className="flex items-center gap-8 font-medium text-gray-700">
            <li>
              <Link href="/">
                <span className={pathname === '/home' ? "text-blue-600" : "hover:text-blue-600 transition"}>
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className={pathname === '/about' ? "text-blue-600" : "hover:text-blue-600 transition"}>About</span>
              </Link>
            </li>
            <li>
              <Link href="/industries">
                <span className={pathname === '/industries' ? "text-blue-600" : "hover:text-blue-600 transition"}>Industries</span>
              </Link>
            </li>
            <li>
              <Link href="/services">
                {/* TODO: Implement actual dropdown menu for Services */}
                <span className={pathname === '/services' ? "text-blue-600" : "hover:text-blue-600 transition"}>
                  Services ▾
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
