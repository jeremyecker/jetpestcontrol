import Link from 'next/link';
import { SITE_NAME, PHONE, PHONE_HREF, GEO, FOOTER_LINKS, SERVICES } from '@/site.config';
import { getTownsByCounty, getTownCount } from '@/lib/db';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const countyGroups = getTownsByCounty();
  const totalCount = getTownCount();

  return (
    <footer className="bg-brand-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛡️</span>
              <span className="font-bold text-lg">{SITE_NAME}</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted local pest control experts serving all of {GEO.region}, {GEO.stateCode}.
              Licensed, insured, and committed to protecting your home.
            </p>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 text-brand-accent font-bold text-lg hover:text-orange-400 transition-colors"
            >
              📞 {PHONE}
            </a>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-brand-accent text-sm font-medium hover:text-orange-400 transition-colors"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {countyGroups.map((group) => (
                <li key={group.countySlug}>
                  <span className="text-gray-300 text-xs font-semibold uppercase tracking-wider">{group.county}</span>
                  <ul className="mt-1 space-y-1">
                    {group.towns.slice(0, 4).map((town) => (
                      <li key={town.slug}>
                        <Link
                          href={`/${group.countySlug}/${town.slug}`}
                          className="text-gray-400 text-sm hover:text-white transition-colors"
                        >
                          {town.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="text-brand-accent text-sm font-medium hover:text-orange-400 transition-colors"
                >
                  All {totalCount}+ Towns →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-lg mb-4 mt-6">Legal</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-sm">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Serving {GEO.region}, {GEO.stateCode} • Licensed & Insured
          </p>
        </div>
      </div>
    </footer>
  );
}
