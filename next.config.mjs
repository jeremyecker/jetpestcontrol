/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  async redirects() {
    return [
      // www → non-www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.jetpestcontrol.com' }],
        destination: 'https://jetpestcontrol.com/:path*',
        permanent: true,
      },
      // Cross-region corrections — neighborhood in wrong borough
      { source: '/manhattan/astoria', destination: '/queens/astoria', permanent: true },
      { source: '/manhattan/brooklyn-heights', destination: '/brooklyn/brooklyn-heights', permanent: true },
      { source: '/manhattan/dumbo', destination: '/brooklyn/dumbo', permanent: true },
      { source: '/manhattan/jackson-heights', destination: '/queens/jackson-heights', permanent: true },
      { source: '/manhattan/williamsburg', destination: '/brooklyn/williamsburg', permanent: true },
      { source: '/brooklyn/astoria', destination: '/queens/astoria', permanent: true },
      { source: '/brooklyn/long-island-city', destination: '/queens/long-island-city', permanent: true },
      { source: '/brooklyn/ridgewood', destination: '/queens/ridgewood', permanent: true },
      { source: '/queens/bushwick', destination: '/brooklyn/bushwick', permanent: true },
      { source: '/queens/greenpoint', destination: '/brooklyn/greenpoint', permanent: true },
      { source: '/queens/williamsburg', destination: '/brooklyn/williamsburg', permanent: true },
      // Slug corrections
      { source: '/brooklyn/bed-stuy', destination: '/brooklyn/bedford-stuyvesant', permanent: true },
      // County corrections — town in wrong county
      { source: '/nassau/amityville', destination: '/suffolk/amityville', permanent: true },
      { source: '/suffolk/massapequa', destination: '/nassau/massapequa', permanent: true },
    ];
  },
};

export default nextConfig;
