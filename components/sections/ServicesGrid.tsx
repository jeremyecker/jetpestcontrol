import { SERVICES, GEO } from '@/site.config';
import Card from '@/components/ui/Card';

interface ServicesGridProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewAll?: boolean;
}

export default function ServicesGrid({
  title = `Our Most Popular Services`,
  subtitle = `These are the pest problems ${GEO.region} families call us about most. We handle all types of pests — see our full list for more.`,
  limit,
  showViewAll = true,
}: ServicesGridProps) {
  const services = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.slug} href={`/services/${service.slug}`}>
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
              <span className="inline-block mt-3 text-brand-primary text-sm font-semibold">
                Learn More →
              </span>
            </Card>
          ))}
        </div>

        {showViewAll && limit && limit < SERVICES.length && (
          <div className="text-center mt-8">
            <a
              href="/services"
              className="text-brand-primary hover:text-brand-secondary font-semibold"
            >
              View All Our Services →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
