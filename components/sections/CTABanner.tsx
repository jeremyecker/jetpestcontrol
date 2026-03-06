import { PHONE, PHONE_HREF, GEO } from '@/site.config';
import Button from '@/components/ui/Button';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
}

export default function CTABanner({
  title = `Keep Your ${GEO.region} Home Pest-Free`,
  subtitle = 'Your family deserves a home without pests. Get a free estimate from your local experts — family-friendly treatments, honest pricing, and we stand behind our work.',
}: CTABannerProps) {
  return (
    <section className="bg-gradient-to-r from-brand-primary to-brand-secondary py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">{subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-brand-accent text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
          >
            📞 Call {PHONE}
          </a>
          <Button href="/contact" variant="outline" size="lg" className="!border-white !text-white hover:!bg-white/10">
            Get Your Free Estimate
          </Button>
        </div>
      </div>
    </section>
  );
}
