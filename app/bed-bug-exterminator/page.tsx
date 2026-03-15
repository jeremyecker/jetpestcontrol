import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bed Bug Exterminator | NYC & Long Island | Jet Pest Control',
  description: 'Professional bed bug extermination in Brooklyn, Queens, Manhattan, Nassau & Suffolk County. Heat treatment, K-9 detection, guaranteed results. Call (718) 710-0330.',
  alternates: {
    canonical: 'https://jetpestcontrol.com/bed-bug-exterminator',
  },
};

const REGIONS = [
  {
    slug: 'brooklyn',
    name: 'Brooklyn',
    desc: 'Serving all 30 Brooklyn neighborhoods — brownstones to high-rises.',
    towns: ['Williamsburg', 'Park Slope', 'Bay Ridge', 'Bushwick', 'Crown Heights', 'Flatbush'],
  },
  {
    slug: 'queens',
    name: 'Queens',
    desc: 'Full Queens coverage — Astoria, Flushing, Jamaica & all 33 communities.',
    towns: ['Astoria', 'Flushing', 'Jamaica', 'Forest Hills', 'Jackson Heights', 'Howard Beach'],
  },
  {
    slug: 'manhattan',
    name: 'Manhattan',
    desc: 'All 32 Manhattan neighborhoods — Midtown to Harlem.',
    towns: ['Midtown', 'Upper East Side', 'Harlem', 'Greenwich Village', 'Tribeca', 'Chelsea'],
  },
  {
    slug: 'nassau',
    name: 'Nassau County',
    desc: 'Covering all 70 Nassau communities — Garden City to Long Beach.',
    towns: ['Garden City', 'Hempstead', 'Levittown', 'Freeport', 'Massapequa', 'Great Neck'],
  },
  {
    slug: 'suffolk',
    name: 'Suffolk County',
    desc: 'Serving 101 Suffolk communities — Huntington to Montauk.',
    towns: ['Huntington', 'Babylon', 'Smithtown', 'Islip', 'Brookhaven', 'Patchogue'],
  },
];

export default function Page() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ["LocalBusiness", "PestControlService"],
    name: 'Jet Pest Control',
    url: 'https://jetpestcontrol.com',
    telephone: '+17187100330',
    image: 'https://jetpestcontrol.com/images/og-default.jpg',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What areas does Jet Pest Control serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Jet Pest Control serves Brooklyn (30 neighborhoods), Queens (33 communities), Manhattan (32 neighborhoods), Nassau County (70 communities), and Suffolk County (101 communities). Call (718) 710-0330 for NYC or (516) 774-5051 for Long Island.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast can Jet respond?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer same-day service availability across all five regions. Call before noon for same-afternoon service.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-[#1B3A5C] text-white py-16 px-4" aria-label="Hero">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-blue-200 mb-3 font-medium">
            Brooklyn &middot; Queens &middot; Manhattan &middot; Nassau &middot; Suffolk — Licensed &amp; Local
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Bed Bug Exterminator — NYC &amp; Long Island
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Bed bugs spread fast. Jet&apos;s licensed technicians cover all of NYC and Long Island with thorough, effective treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:7187100330"
              className="inline-flex items-center gap-2 bg-white text-[#1B3A5C] font-bold text-lg px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              📞 NYC: (718) 710-0330
            </a>
            <a
              href="tel:5167745051"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors"
            >
              📞 LI: (516) 774-5051
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 border-b border-gray-200 py-4 px-4">
        <ul className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-700 font-medium">
          {['Licensed & Insured', 'Same-Day Service Available', 'Free Inspection', 'Local Technicians', 'Satisfaction Guaranteed'].map(item => (
            <li key={item} className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#1B3A5C]" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Region cards */}
      <section className="py-14 px-4" aria-label="Service regions">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Choose Your Region
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {REGIONS.map(region => (
              <div key={region.slug} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{region.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{region.desc}</p>
                <ul className="text-xs text-gray-500 space-y-1 mb-5">
                  {region.towns.map(t => <li key={t}>📍 {t}</li>)}
                </ul>
                <Link
                  href={`/${region.slug}/bed-bug-exterminator/`}
                  className="block w-full text-center bg-[#1B3A5C] text-white font-semibold py-2.5 rounded-lg hover:bg-blue-900 transition-colors text-sm"
                >
                  View {region.name} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-gray-50" aria-label="FAQ">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-5">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What areas does Jet Pest Control serve?</h3>
              <p className="text-gray-600 text-sm">Jet Pest Control serves Brooklyn (30 neighborhoods), Queens (33 communities), Manhattan (32 neighborhoods), Nassau County (70 communities), and Suffolk County (101 communities) — 266 communities total across NYC and Long Island.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">How fast can Jet respond?</h3>
              <p className="text-gray-600 text-sm">We offer same-day service availability across all five regions. Call (718) 710-0330 for NYC service or (516) 774-5051 for Long Island. Calling before noon typically gets you same-afternoon service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B3A5C] py-14 px-4 text-white text-center" aria-label="CTA">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8">Same-day service available across NYC and Long Island.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:7187100330" className="bg-white text-[#1B3A5C] font-bold text-lg px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors">
              📞 NYC: (718) 710-0330
            </a>
            <a href="tel:5167745051" className="border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors">
              📞 LI: (516) 774-5051
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
