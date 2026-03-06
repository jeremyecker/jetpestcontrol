import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, SEO, GEO, PHONE, EMAIL, SERVICES } from '@/site.config';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
  },
  openGraph: {
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "PestControlService"],
  "name": SITE_NAME,
  "url": SITE_URL,
  "telephone": PHONE,
  "email": EMAIL,
  "priceRange": "$$",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": GEO.region,
  },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": GEO.stateCode,
    "addressCountry": "US",
  },
  "openingHours": "Mo-Su 07:00-21:00",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Pest Control Services",
    "itemListElement": SERVICES.slice(0, 6).map(s => ({
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": s.name },
    })),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* GA4 */}
        {ga4Id && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${ga4Id}');
                `,
              }}
            />
          </>
        )}
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
