import { MetadataRoute } from 'next';

/** Paths that must stay out of image search (testimonial client avatars). */
const TESTIMONIAL_IMAGE_DISALLOW = [
  '/images/testimonials/',
  '/_next/static/media/avatar-',
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...TESTIMONIAL_IMAGE_DISALLOW],
      },
      {
        userAgent: 'Googlebot-Image',
        disallow: [...TESTIMONIAL_IMAGE_DISALLOW],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
    ],
    sitemap: 'https://www.iamtayyab.com/sitemap.xml',
  };
}
