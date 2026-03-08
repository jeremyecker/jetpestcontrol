import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLeadCapturePage } from '@/lib/jet-lead-capture-data';

const PHONE = "(800) 990-9296";
const PHONE_HREF = "tel:8009909296";

const REGION_TOWNS: Record<string, string[]> = {
  brooklyn: ['Williamsburg', 'Park Slope', 'Bed-Stuy', 'Bushwick', 'Flatbush', 'Bay Ridge', 'Canarsie', 'Sunset Park', 'Crown Heights', 'Greenpoint'],
  queens: ['Astoria', 'Flushing', 'Jamaica', 'Jackson Heights', 'Forest Hills', 'Ridgewood', 'Bayside', 'Corona', 'Howard Beach', 'Woodside'],
  manhattan: ['Upper East Side', 'Upper West Side', 'Harlem', 'Chelsea', 'Greenwich Village', 'Midtown', 'Tribeca', 'Lower East Side', 'East Village', 'Washington Heights'],
  nassau: ['Garden City', 'Hempstead', 'Levittown', 'Long Beach', 'Freeport', 'Valley Stream', 'Mineola', 'Hicksville', 'Great Neck', 'Oceanside'],
  suffolk: ['Huntington', 'Babylon', 'Brentwood', 'Hauppauge', 'Patchogue', 'Smithtown', 'East Hampton', 'Riverhead', 'Commack', 'Bay Shore'],
};

function toTownSlug(town: string) {
  return town.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

interface LeadCapturePageProps {
  region: string;
  leadType: string;
}

export default function LeadCapturePage({ region, leadType }: LeadCapturePageProps) {
  const page = getLeadCapturePage(region, leadType);
  if (!page) notFound();

  const towns = REGION_TOWNS[region] || [];
  const regionDisplay = page!.regionDisplay;
  const p = page!;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: 'Jet Pest Control',
        telephone: PHONE,
        url: 'https://jetpestcontrol.com',
        areaServed: regionDisplay,
        serviceType: p.title,
        priceRange: '$$',
        openingHours: 'Mo-Su 07:00-21:00',
      },
      {
        '@type': 'FAQPage',
        mainEntity: p.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jetpestcontrol.com' },
          { '@type': 'ListItem', position: 2, name: regionDisplay, item: `https://jetpestcontrol.com/${region}` },
          { '@type': 'ListItem', position: 3, name: p.title, item: `https://jetpestcontrol.com/${region}/${leadType}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            {' / '}
            <Link href={`/${region}`} className="hover:text-white">{regionDisplay}</Link>
            {' / '}
            <span>{p.title}</span>
          </nav>
          <h1 className="text-4xl font-bold mb-4">{p.h1}</h1>
          <p className="text-xl text-blue-200 mb-8">Licensed &amp; Insured &middot; Same-Day Service &middot; Guaranteed Results</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="bg-yellow-400 text-blue-900 font-bold py-4 px-8 rounded-lg text-lg hover:bg-yellow-300 transition">
              Call {PHONE}
            </a>
            <Link href="/contact" className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-blue-900 transition">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-yellow-400 py-3 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-blue-900 font-semibold text-sm">
          <span>Same-Day Service Available</span>
          <span>Licensed NY DEC Technicians</span>
          <span>100% Satisfaction Guaranteed</span>
          <span>Serving All of {regionDisplay}</span>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-12">

        <section className="mb-12">
          {p.intro.split('\n\n').map((para, i) => (
            <p key={i} className="text-gray-700 text-lg leading-relaxed mb-4">{para}</p>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our {p.title} Services in {regionDisplay}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {p.services.map((service) => (
              <div key={service} className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="font-semibold text-blue-900 text-sm">{service}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why {regionDisplay} Residents Choose Jet Pest Control</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Same-Day Response', 'Call before noon and we arrive the same afternoon.'],
              ['Licensed NY DEC Technicians', 'Every technician is licensed by New York State DEC and fully insured.'],
              ['Integrated Pest Management', 'We identify root causes and entry points, not just symptoms.'],
              ['Service Guarantee', 'If pests return within the treatment period, we come back at no charge.'],
              ['Family and Pet Safe', 'EPA-registered products applied with strict safety protocols.'],
              ['Local Experts', `We know ${regionDisplay}'s housing stock and local pest pressures intimately.`],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-4">
                <div>
                  <h3 className="font-bold text-gray-900">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {p.faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {towns.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">We Serve All of {regionDisplay}</h2>
            <p className="text-gray-600 mb-4">Jet Pest Control provides {p.title.toLowerCase()} service throughout {regionDisplay}, including:</p>
            <div className="flex flex-wrap gap-2">
              {towns.map(town => (
                <Link key={town} href={`/${region}/${toTownSlug(town)}`}
                  className="bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 rounded text-sm hover:bg-blue-100 transition">
                  {town}
                </Link>
              ))}
              <Link href={`/${region}`}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                View All {regionDisplay} Towns
              </Link>
            </div>
          </section>
        )}

        <section className="bg-blue-900 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">{p.title} in {regionDisplay}</h2>
          <p className="text-blue-200 mb-6">Same-day service &middot; Licensed technicians &middot; Guaranteed results</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition">
              {PHONE}
            </a>
            <Link href="/contact" className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-900 transition">
              Get a Free Quote
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
