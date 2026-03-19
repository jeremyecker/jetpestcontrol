import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getRegion, getRegionGMB } from '@/lib/regions';
import { getTownsByRegion } from '@/lib/db';
import { localBusinessSchema } from '@/lib/seo';
import { BRAND } from '@/hub.config';
import Schema from '@/components/seo/Schema';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import ServicesGrid from '@/components/sections/ServicesGrid';
import NAPBlock from '@/components/sections/NAPBlock';
import TownGrid from '@/components/sections/TownGrid';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';
import ReviewsSection from '@/components/sections/ReviewsSection';

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) return {};
  return {
    title: region.metaTitle,
    description: region.metaDescription,
    alternates: { canonical: `https://${BRAND.domain}/${regionSlug}` },
    openGraph: {
      title: region.metaTitle,
      description: region.metaDescription,
      url: `https://${BRAND.domain}/${regionSlug}`,
      images: [{ url: `https://${BRAND.domain}/og-image.png` }],
      type: 'website',
      locale: 'en_US',
      siteName: BRAND.name,
    },
  };
}

export async function generateStaticParams() {
  const { getAllRegionSlugs } = await import('@/lib/regions');
  return getAllRegionSlugs().map(slug => ({ region: slug }));
}

export default async function RegionHomePage({ params }: { params: Promise<{ region: string }> }) {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);
  if (!region) notFound();

  const gmb = getRegionGMB(region);
  const schema = localBusinessSchema(region, gmb);
  const regionTowns = getTownsByRegion(regionSlug);

  const faqs = [
    {
      question: 'Are your treatments safe for kids and pets?',
      answer: `Absolutely. We use EPA-approved products and Integrated Pest Management (IPM) techniques chosen to be gentle around children and pets.`,
    },
    {
      question: `What areas of ${region.name} do you cover?`,
      answer: `We serve all of ${region.name}${region.counties.length > 1 ? ` and surrounding counties including ${region.counties.slice(1).join(', ')}` : ''}. If you're in the area, we can help.`,
    },
    {
      question: 'How quickly can you respond?',
      answer: `We offer same-day service availability for ${region.name} homeowners who need help fast.`,
    },
    {
      question: 'How much does pest control cost?',
      answer: `Every home is different. Call us or fill out the form for a free, no-obligation estimate — no surprise charges, no pressure.`,
    },
    {
      question: 'What if pests return after treatment?',
      answer: `We stand behind our work. If pests return between scheduled treatments, we'll come back at no additional cost.`,
    },
    {
      question: 'Are you a local company?',
      answer: `Yes. ${BRAND.name} serves ${region.name} with local technicians who know the area and the pest pressures specific to this region.`,
    },
  ];

  return (
    <>
      {schema && <Schema data={schema} />}
      <Hero
        title={region.heroHeadline}
        subtitle={region.heroSubhead}
        heroImage={region.heroImage}
        phone={BRAND.phone}
        phoneFormatted={BRAND.phoneFormatted}
        regionSlug={region.slug}
      />
      <TrustBar />
      <ServicesGrid region={region} limit={6} />
      {gmb && gmb.reviewCount > 0 && <ReviewsSection limit={3} />}
      {gmb && <NAPBlock gmb={gmb} region={region} />}
      <TownGrid
        towns={regionTowns}
        limit={15}
        title={`Your Neighbors in ${region.shortName || region.name} Trust Us`}
        subtitle={`We serve families in all ${region.townCount} communities across ${region.name}. Find your community below.`}
      />
      <FAQSection faqs={faqs} />
      {/* Regional Quick Links — de-orphan about/service-areas sub-pages */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">More from {BRAND.name} in {region.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link href={`/${regionSlug}/about/`} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <span className="text-2xl mb-1">ℹ️</span>
              <span className="font-medium text-sm text-gray-900">About Us</span>
              <span className="text-xs text-gray-500">{region.shortName || region.name}</span>
            </Link>
            <Link href={`/${regionSlug}/service-areas/`} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <span className="text-2xl mb-1">📍</span>
              <span className="font-medium text-sm text-gray-900">Service Areas</span>
              <span className="text-xs text-gray-500">{region.shortName || region.name}</span>
            </Link>
            <Link href={`/${regionSlug}/services/`} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <span className="text-2xl mb-1">🛡️</span>
              <span className="font-medium text-sm text-gray-900">All Services</span>
              <span className="text-xs text-gray-500">{region.shortName || region.name}</span>
            </Link>
            <Link href={`/${regionSlug}/contact/`} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <span className="text-2xl mb-1">📞</span>
              <span className="font-medium text-sm text-gray-900">Contact Us</span>
              <span className="text-xs text-gray-500">{region.shortName || region.name}</span>
            </Link>
          </div>
        </div>
      </section>
      <CTABanner region={region} phone={BRAND.phone} phoneFormatted={BRAND.phoneFormatted} />
    </>
  );
}
