import type { Metadata } from 'next';
import { GEO, SITE_NAME, PHONE, PHONE_HREF, GMB } from '@/site.config';
import { generatePageMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import TrustBar from '@/components/sections/TrustBar';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = generatePageMetadata({
  title: `About Us — Discreet Professional Pest Control`,
  description: `${SITE_NAME} provides discreet, professional pest control across Brooklyn, Queens, Manhattan, Nassau & Suffolk. 5.0 stars. Unmarked trucks. Licensed & insured.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'About Us' }]} />
      <TrustBar />

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 prose-content">
          <h1 className="heading-1 mb-6">Professional Pest Control — Done Discreetly</h1>

          <p className="text-lg text-gray-600 mb-8">
            {SITE_NAME} provides professional pest control across Brooklyn, Queens, Manhattan,
            Nassau County, and Suffolk County. We understand that pest problems can feel
            embarrassing — that&apos;s why discretion is at the core of everything we do.
            Our technicians arrive in unmarked trucks, work quickly and quietly, and leave
            your home pest-free without the neighbors knowing a thing. It&apos;s pest control
            done right, with your privacy in mind.
          </p>

          <h2>What Sets Us Apart</h2>
          <p>
            We built {SITE_NAME} around a simple idea: you deserve pest control that&apos;s
            effective and respectful. Your apartment building shouldn&apos;t have roaches in
            the hallways. Your brownstone shouldn&apos;t have mice in the walls. Your Long Island
            home shouldn&apos;t have termites eating the foundation while you sleep.
          </p>
          <p>
            Every treatment plan is customized to your situation. We don&apos;t do one-size-fits-all
            spray-and-pray. Our technicians assess your specific problem, explain the treatment
            options, and use targeted solutions that are tough on pests and safe for your family
            and pets. We use EPA-approved products and Integrated Pest Management techniques —
            the same science-based approach trusted by hospitals and schools.
          </p>

          <h2>Why NYC &amp; Long Island Residents Trust Us</h2>
          <ul>
            <li>
              <strong>Discreet, unmarked trucks:</strong> No giant bug logos parked outside your
              building. Our vehicles are completely unmarked, and our technicians arrive looking
              professional — not like an exterminator from a horror movie. Your privacy matters to us.
            </li>
            <li>
              <strong>City and suburb expertise:</strong> We know the unique challenges of pest control
              in high-rise apartments, pre-war brownstones, and suburban colonials. From Manhattan
              cockroaches to Suffolk County ticks — we&apos;ve seen it all and we know how to fix it.
            </li>
            <li>
              <strong>5-star rated service:</strong> Our perfect 5.0-star rating isn&apos;t an
              accident — it&apos;s the result of treating every customer&apos;s home like our own.
              We show up on time, communicate clearly, and don&apos;t leave until the job is done right.
            </li>
            <li>
              <strong>Fast response, even in the city:</strong> We know that finding bed bugs
              in a Manhattan apartment or rats in a Brooklyn basement is an emergency. Same-day
              service is available because your problem shouldn&apos;t wait until next week.
            </li>
            <li>
              <strong>Transparent pricing:</strong> You&apos;ll know exactly what the treatment costs
              before we start. Free estimates, no hidden fees, no pressure to sign up for services
              you don&apos;t need. Honest work at honest prices.
            </li>
          </ul>

          <h2>Serving 261 Towns Across NYC &amp; Long Island</h2>
          <p>
            From the brownstones of Park Slope to the beach houses of the Hamptons, from the
            bustling streets of Flushing to the family neighborhoods of Massapequa — we cover
            261 towns across five boroughs and counties. Whether you&apos;re in a Midtown high-rise
            or a Cape Cod in Levittown, our team is just a phone call away.
          </p>

          <h2>Let Us Help</h2>
          <p>
            Whether you&apos;ve spotted signs of a pest problem or you want the peace of mind
            that comes with a professional inspection, call us at{' '}
            <a href={PHONE_HREF} className="font-bold">{PHONE}</a>. We&apos;ll listen,
            give you honest advice, and schedule a discreet visit if needed. No pressure,
            no judgment — just professional pest control from a team that respects your home
            and your privacy.
          </p>
        </div>
      </section>

      <CTABanner
        title="Ready to Protect Your Home?"
        subtitle="Discreet, professional pest control across NYC & Long Island. Free estimates, unmarked trucks, 5-star service."
      />
    </>
  );
}
