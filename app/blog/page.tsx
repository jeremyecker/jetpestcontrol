import type { Metadata } from 'next';
import Link from 'next/link';
import { GEO, SITE_NAME } from '@/site.config';
import { generatePageMetadata } from '@/lib/seo';
import { getAllBlogPosts } from '@/lib/blog-posts';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import Card from '@/components/ui/Card';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = generatePageMetadata({
  title: `Pest Control Blog \u2014 Tips & Guides`,
  description: `Expert pest control tips and guides for homeowners across ${GEO.region}. Stay informed about common pests, prevention tips, and treatment options.`,
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Breadcrumbs items={[{ label: 'Blog' }]} />

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="heading-1 mb-4">Pest Control Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert tips, guides, and insights for homeowners across {GEO.region} from the {SITE_NAME} team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.slug} href={`/blog/${post.slug}`}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <h2 className="text-lg font-bold text-brand-dark mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm flex-1 mb-3">{post.description}</p>
                  <span className="text-brand-primary text-sm font-semibold">Read More \u2192</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
