import Image from 'next/image';
import { SITE_NAME, GEO, PHONE, PHONE_HREF, GMB } from '@/site.config';
import { BRAND } from '@/hub.config';
import LeadForm from '@/components/forms/LeadForm';

interface HeroProps {
  title?: string;
  subtitle?: string;
  showForm?: boolean;
}

// Unsplash: "gray wooden house" by Todd Kent — free commercial license
const HERO_IMAGE = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80';

export default function Hero({
  title,
  subtitle,
  showForm = true,
}: HeroProps) {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = BRAND.yearFounded ? currentYear - BRAND.yearFounded : 0;

  const defaultTitle = `Protecting ${GEO.region} Homes & Families from Pests`;
  const defaultSubtitle = `Your neighbors trust us — families across ${GEO.region} have trusted ${SITE_NAME} for expert pest control. Family-friendly treatments for homes with kids and pets.`;

  const heroBadge = yearsInBusiness > 0
    ? `${yearsInBusiness}+ Years Serving the ${GEO.region}`
    : '⭐ Trusted Local Experts';

  return (
    <section className="relative overflow-hidden">
      {/* Desktop: Suburban home background image */}
      <div className="hidden lg:block absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt={`Suburban home in ${GEO.region}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/60 via-brand-primary/40 to-brand-primary/20" />
      </div>

      {/* Mobile: Solid gradient (no image, faster load) */}
      <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className={`grid ${showForm ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-8 lg:gap-12 items-center`}>
          {/* Left: Text Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>⭐</span>
              <span>{heroBadge}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              {title || defaultTitle}
            </h1>

            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-xl">
              {subtitle || defaultSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
              >
                📞 Call {PHONE}
              </a>
            </div>

            {/* Trust indicators — family-focused */}
            <div className="flex flex-wrap gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1">🐾 Kid & Pet Friendly</span>
              <span className="flex items-center gap-1">🏡 Locally Owned & Operated</span>
              <span className="flex items-center gap-1">✅ Licensed & Insured</span>
            </div>
          </div>

          {/* Right: Lead Form */}
          {showForm && (
            <div className="lg:pl-4">
              <LeadForm variant="hero" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
