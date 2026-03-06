import { TRUST_STATS } from '@/site.config';

export default function TrustBar() {
  return (
    <section className="bg-brand-light border-y border-green-200">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {TRUST_STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl lg:text-3xl mb-1">{stat.icon}</div>
              <div className="font-bold text-lg lg:text-xl text-brand-dark">{stat.value}</div>
              <div className="text-xs lg:text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
