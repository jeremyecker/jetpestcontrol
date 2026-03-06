import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, GEO, PHONE, HOURS, GMB, SERVICES, EMAIL, SEO } from '@/site.config';
import { canonicalUrl } from '@/lib/utils';
import type { FAQ, BreadcrumbItem, Town } from '@/lib/types';

/**
 * Generate page metadata with canonical URL
 */
export function generatePageMetadata({
  title,
  description,
  path = '/',
  noindex = false,
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
  ogImage?: string;
}): Metadata {
  const canonical = canonicalUrl(path);
  const resolvedOgImage = ogImage || SEO.ogImage;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: resolvedOgImage }],
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

/**
 * LocalBusiness JSON-LD schema (homepage)
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    image: `${SITE_URL}/images/og-default.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: GEO.countyFull,
      addressRegion: GEO.stateCode,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '07:00',
        closes: '17:00',
      },
    ],
    aggregateRating: GMB.reviewsEnabled
      ? {
          '@type': 'AggregateRating',
          ratingValue: GMB.rating,
          bestRating: 5,
        }
      : undefined,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${GEO.countyFull}, ${GEO.stateCode}`,
    },
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pest Control Services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
  };
}

/**
 * Service schema for service pages
 */
export function serviceSchema(serviceName: string, serviceSlug: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    url: `${SITE_URL}/services/${serviceSlug}`,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      telephone: PHONE,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${GEO.countyFull}, ${GEO.stateCode}`,
    },
    serviceType: serviceName,
  };
}

/**
 * FAQPage schema
 */
export function faqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList schema
 */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? canonicalUrl(item.href) : undefined,
    })),
  };
}

/**
 * Article schema for blog posts
 */
export function articleSchema({
  title,
  description,
  slug,
  date,
  author,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: image || `${SITE_URL}/images/og-default.jpg`,
  };
}

/**
 * Town-specific LocalBusiness + ServiceArea schema
 */
export function townSchema(town: Town) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: `${SITE_URL}/${town.slug}`,
    telephone: PHONE,
    areaServed: {
      '@type': 'City',
      name: town.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: `${GEO.countyFull}, ${GEO.stateCode}`,
      },
    },
  };
}
