import Link from 'next/link';
import type { Metadata } from 'next';
import { SERVICES } from '@/lib/services';
import { BRAND, REGIONS } from '@/hub.config';

const serviceArea = REGIONS.map(r => r.name).join(', ').replace(/, ([^,]*)$/, ' & $1');

const genericDescriptions: Record<string, string> = {
  'ant-control': 'Keep ants out of your kitchen and away from your family. Effective, family-friendly treatments.',
  'termite-treatment': 'Protect your biggest investment. Expert termite inspections and treatment to keep your home protected.',
  'bed-bug-removal': "Help your family sleep easy again. Thorough bed bug removal that's gentle on your home.",
  'rodent-control': "Mice and rats don't belong near your family. We remove them and seal entry points so they stay out.",
  'cockroach-control': 'A clean home deserves to stay that way. Complete cockroach elimination that protects your family.',
  'mosquito-control': 'Take back your backyard. Kid and pet-friendly mosquito treatments so your family can enjoy the outdoors.',
  'spider-control': 'No more surprises in the basement or garage. Thorough spider removal for your whole home.',
  'wasp-hornet-removal': "Protect your kids and pets from stinging insects. We'll remove nests from your yard, porch, and eaves.",
  'flea-tick-treatment': 'Protect your family and furry friends. Professional flea and tick control for your home and yard.',
  'wildlife-removal': 'Raccoons in the attic? Squirrels in the walls? Humane removal that protects your family.',
  'commercial-pest-control': 'Customized pest management for local businesses. Discreet, reliable, and effective.',
};

export const metadata: Metadata = {
  title: `Pest Control Services | ${BRAND.name}`,
  description: `Full pest control services for ${serviceArea}. Family-safe treatments, same-day service available.`,
};

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Pest Control Services
        </h1>
        <p className="text-xl text-gray-600">
          Serving {serviceArea} with professional, family-safe pest control.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(service => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 p-6 group"
          >
            <div className="text-4xl mb-3">{service.icon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
              {service.name}
            </h2>
            <p className="text-gray-600 text-sm">
              {genericDescriptions[service.slug] || `Professional ${service.name.toLowerCase()} services.`}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
