import type { Metadata } from 'next';
import Link from 'next/link';
import { COMMERCIAL_VERTICALS } from '@/lib/jet-commercial-data';
import { BRAND } from '@/hub.config';

export const metadata: Metadata = {
  title: 'Commercial Pest Control NYC & Long Island | Jet Pest Control',
  description: 'Professional commercial pest control for NYC restaurants, apartment buildings, hotels, schools, healthcare, retail & more. Serving Brooklyn, Queens, Manhattan, Nassau & Suffolk County. (718) 710-0330.',
};

const VERTICAL_DESCRIPTIONS: Record<string, string> = {
  restaurants: 'NYC DOH-compliant programs protecting your letter grade, kitchen, and reputation.',
  'apartments-multifamily': 'HPD-compliant IPM for NYC apartment buildings under Local Law 55.',
  'hotels-hospitality': 'Discreet, K-9 bed bug inspections and guest-experience-focused pest management.',
  'schools-daycare': 'Child-safe, NYC DOE-compliant IPM with pesticide notification compliance.',
  healthcare: 'Zero-tolerance programs for hospitals, clinics, and Long Island medical campuses.',
  retail: 'Stockroom protection and discreet customer-area treatment for NYC retail corridors.',
  offices: 'After-hours pest management for Midtown towers, Downtown Brooklyn, and Long Island offices.',
  'property-management': 'Portfolio-wide contracts with HPD complaint response and consolidated reporting.',
  'real-estate-wdo': 'NY state WDO inspections, termite certificates, and pre-listing pest services.',
  'short-term-rentals': 'K-9 inspection certificates and rapid response for NYC Airbnb and STR hosts.',
};

export default function CommercialPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BRAND.name,
    telephone: `+1${BRAND.phone}`,
    url: `https://${BRAND.domain}`,
    areaServed: ['Brooklyn', 'Queens', 'Manhattan', 'Nassau County', 'Suffolk County'],
    description: 'Professional commercial pest control for NYC and Long Island businesses.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#1B3A5C] to-[#2A5C8F] text-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-5xl mb-4">🏙️</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Commercial Pest Control &mdash; NYC &amp; Long Island
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mb-8">
              Jet Pest Control serves businesses across Brooklyn, Queens, Manhattan, Nassau County, and Suffolk County. 
              NYC&apos;s commercial density, aging building infrastructure, and regulatory complexity create unique pest 
              management challenges that require licensed, experienced professionals &mdash; not generic service contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:+1${BRAND.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {BRAND.phoneFormatted}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#1B3A5C] font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-[#1B3A5C] py-4 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Licensed NY DEC
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Serving NYC &amp; Long Island Since {BRAND.yearFounded}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Discreet Commercial Service
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free Estimates
              </span>
            </div>
          </div>
        </section>

        {/* Verticals Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-4 text-center">
              Commercial Pest Control by Industry
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12 text-lg">
              Select your industry below for specific pest threats, our approach, and NYC/Long Island regulatory considerations relevant to your business.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMMERCIAL_VERTICALS.map(vertical => (
                <Link
                  key={vertical.slug}
                  href={`/commercial/${vertical.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-[#1B3A5C] transition-all"
                >
                  <div className="text-4xl mb-4">{vertical.icon}</div>
                  <h3 className="text-xl font-bold text-[#1B3A5C] mb-3 group-hover:text-[#2A5C8F] transition-colors">
                    {vertical.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {VERTICAL_DESCRIPTIONS[vertical.slug]}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vertical.pests.slice(0, 3).map(pest => (
                      <span key={pest} className="text-xs bg-blue-50 text-[#1B3A5C] px-2 py-1 rounded-full font-medium">
                        {pest}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[#E63946] font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Jet for Commercial */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-12 text-center">
              Why NYC &amp; Long Island Businesses Choose Jet
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '📋',
                  title: 'Regulatory Expertise',
                  description: 'We know NYC DOHMH, HPD, DOE IPM, Local Law 55, NY state WDO requirements, and Joint Commission standards. Our service documentation is built for compliance.',
                },
                {
                  icon: '🔒',
                  title: 'Discreet Service',
                  description: 'Unmarked vehicles, professional protocols, and after-hours scheduling mean pest control is invisible to your customers, guests, and tenants.',
                },
                {
                  icon: '⚡',
                  title: 'Fast Response',
                  description: 'Emergency response available for active violations, guest complaints, and inspection-driven situations. We understand your business can\'t wait days for service.',
                },
                {
                  icon: '📄',
                  title: 'Documentation Ready',
                  description: 'Every service visit generates written reports, service logs, and treatment records — the documentation your compliance program, regulatory inspectors, and legal defense require.',
                },
                {
                  icon: '🗺️',
                  title: 'True Local Coverage',
                  description: 'From Midtown Manhattan to Montauk, we service commercial properties across all five boroughs and both Long Island counties under a single provider relationship.',
                },
                {
                  icon: '🔬',
                  title: 'IPM-Certified Programs',
                  description: 'Integrated Pest Management is our standard approach — starting with the least-toxic methods and escalating only as warranted by pest pressure.',
                },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-[#1B3A5C] text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-4 bg-[#E63946] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Protect Your NYC or Long Island Business?
            </h2>
            <p className="text-red-100 text-lg mb-8">
              Free estimates for all commercial accounts. No obligation, no sales pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:+1${BRAND.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#E63946] font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {BRAND.phoneFormatted}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#1B3A5C] hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
