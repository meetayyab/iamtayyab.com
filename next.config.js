/** @type {import('next').NextConfig} */
const noImageIndexHeaders = [
  {
    key: 'X-Robots-Tag',
    value: 'noimageindex, noindex',
  },
];

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async headers() {
    return [
      {
        source: '/images/testimonials/:path*',
        headers: noImageIndexHeaders,
      },
      {
        source: '/_next/static/media/:file(avatar-.*)',
        headers: noImageIndexHeaders,
      },
      {
        source: '/_next/image',
        has: [
          {
            type: 'query',
            key: 'url',
            value: '(?:(?:.*(?:testimonials|avatar-(?:osama-yawar|vincent-ochs|gabriel-tannous))).*)',
          },
        ],
        headers: noImageIndexHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
