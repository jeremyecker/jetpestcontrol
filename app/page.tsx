import { SITE_NAME, GEO, SERVICES, PHONE, PHONE_HREF, GMB } from '@/site.config';
import { REGIONS } from '@/hub.config';
import { localBusinessSchema } from '@/lib/seo';
import { getTownCount, getTownsByRegion } from '@/lib/db';
import Schema from '@/components/seo/Schema';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import ServicesGrid from '@/components/sections/ServicesGrid';
import ReviewsSection from '@/components/sections/ReviewsSection';
import TownGrid from '@/components/sections/TownGrid';
import CTABanner from '@/components/sections/CTABanner';
import FAQSection from '@/components/sections/FAQSection';
import NewYorkNetwork from '@/components/sections/NewYorkNetwork';

const townCount = getTownCount();

const homepageFAQs = [
  {
    question: 'Are your treatments safe for kids and pets?',
    answer: `Absolutely \u2014 we use EPA-approved products and Integrated Pest Management (IPM) techniques specifically chosen to be gentle around children and pets.`,
  },
  {
    question: `What areas do you cover?`,
    answer: `We serve communities across ${GEO.region}. If you're in our service area, we're here to help.`,
  },
  {
    question: 'How quickly can someone come?',
    answer: `We offer same-day service availability for homeowners who need help fast. Call or fill out the form to check today's schedule.`,
  },
  {
    question: 'How much does pest control cost?',
    answer: `Every home is different. We offer free, no-obligation estimates \u2014 call or submit the form for a quote specific to your situation.`,
  },
  {
    question: 'What if pests return after treatment?',
    answer: `We stand behind our work. If pests return between scheduled treatments, we'll come back at no additional cost.`,
  },
  {
    question: 'Are you a local company?',
    answer: `Yes! ${SITE_NAME} is locally owned and operated. Our technicians live in the same communities we serve.`,
  },
];

// Show 5 towns from each region for a balanced homepage display
const mixedTowns = REGIONS.flatMap(r => getTownsByRegion(r.slug).slice(0, 5));

export default function HomePage() {
  return (
    <>
      <Schema data={localBusinessSchema()} />
      <Hero />
      <TrustBar />
      <ServicesGrid limit={6} />
      <ReviewsSection limit={3} />
      <TownGrid towns={mixedTowns} />
      <FAQSection faqs={homepageFAQs} />
      <NewYorkNetwork />
      <CTABanner />
    </>
  );
}
