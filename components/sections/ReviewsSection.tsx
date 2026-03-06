import { GMB, GEO, SITE_NAME, REVIEWS } from '@/site.config';
import Card from '@/components/ui/Card';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  );
}

interface ReviewsSectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

export default function ReviewsSection({
  title = `What ${GEO.region} Families Are Saying`,
  subtitle = `Trusted by families across ${GEO.region}`,
  limit = 6,
}: ReviewsSectionProps) {
  if (REVIEWS.length === 0) return null;

  const reviews = REVIEWS.slice(0, limit);

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <StarRating rating={5} />
            <span className="text-lg font-semibold text-brand-dark">
              {GMB.rating} out of 5
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-2">{title}</h2>
          <p className="text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} hover={false} className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={review.rating} />
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-gray-700 text-sm flex-1 mb-3">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {review.author[0]}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-800">{review.author}</span>
                  {review.location && (
                    <span className="block text-xs text-gray-400">{review.location}</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={GMB.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-secondary transition-colors"
          >
            See Our Reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
