'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS, PHONE, PHONE_HREF, SITE_NAME } from '@/site.config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-brand-dark text-lg">{SITE_NAME}</span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block px-6 py-3 text-lg font-medium text-gray-700 hover:bg-brand-light hover:text-brand-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="p-4 border-t bg-brand-light space-y-3">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 bg-brand-accent text-white font-bold text-lg py-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <span>📞</span>
              Call {PHONE}
            </a>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-brand-primary text-white font-bold text-lg py-4 rounded-lg hover:bg-brand-secondary transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
