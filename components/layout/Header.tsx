'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS, SITE_NAME, PHONE, PHONE_HREF } from '@/site.config';
import MobileMenu from './MobileMenu';
import Button from '@/components/ui/Button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-2xl">🛡️</span>
              <span className="font-bold text-lg lg:text-xl text-brand-dark leading-tight">
                {SITE_NAME}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-primary rounded-lg hover:bg-brand-light transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={PHONE_HREF}
                className="font-bold text-brand-primary text-lg hover:text-brand-secondary transition-colors"
              >
                {PHONE}
              </a>
              <Button href="/contact" variant="accent" size="sm">
                Free Quote
              </Button>
            </div>

            {/* Mobile: Phone + Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-accent text-white"
                aria-label="Call us"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
