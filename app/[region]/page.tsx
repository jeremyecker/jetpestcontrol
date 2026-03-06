import { notFound } from 'next/navigation';
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
      answer: `Every home is different. Call us or fill out the form for a free, no-obligation estimate \u2014 no surprise charges, no pressure.`,
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
      <CTABanner region={region} phone={BRAND.phone} phoneFormatted={BRAND.phoneFormatted} />
    </>
  );
}
