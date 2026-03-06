// components/sections/NewYorkNetwork.tsx
import { NETWORK_SITES } from '@/site.config';

export default function NewYorkNetwork() {
  if (NETWORK_SITES.length === 0) return null;

  return (
    <section className="bg-blue-50 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-3">
          Our Pest Control Network
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          We&apos;re part of a trusted network of local pest control experts. Find a provider near you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NETWORK_SITES.map((site) => (
            <a
              key={site.url}
              href={site.url}
              className="block bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow text-left"
            >
              <div className="text-3xl mb-2">{site.emoji}</div>
              <h3 className="text-lg font-semibold text-blue-800 mb-1">{site.name}</h3>
              <p className="text-sm text-gray-500">{site.description}</p>
              <span className="inline-block mt-3 text-blue-600 text-sm font-medium">Visit site →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
