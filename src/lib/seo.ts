export const SITE_URL = 'https://www.iamtayyab.com';
export const PERSON_ID = `${SITE_URL}/#person`;
export const SERVICE_ID = `${SITE_URL}/#service`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const PERSON_NAME = 'Muhammad Tayyab';
export const PERSON_JOB_TITLE = 'Full Stack and Mobile Developer';
export const PERSON_IMAGE = `${SITE_URL}/images/tayyab-headshot.jpg`;

export const PERSON_DESCRIPTION =
  'Full Stack and Mobile Developer specializing in Angular, React.js, React Native, SwiftUI, and Node.js, based in Lahore, Pakistan. Available for freelance web and mobile projects.';

export const SOCIAL_URLS = {
  github: 'https://github.com/meetayyab',
  linkedin: 'https://www.linkedin.com/in/immtayyab',
  x: 'https://x.com/iamtayyabx',
} as const;

export const PERSON_SAME_AS = [
  SOCIAL_URLS.github,
  SOCIAL_URLS.x,
  SOCIAL_URLS.linkedin,
];

/** Skills that appear on the live site (hero, skills grid, projects). */
export const KNOWS_ABOUT = [
  'JavaScript',
  'TypeScript',
  'React',
  'React Native',
  'Angular',
  'Node.js',
  'Express.js',
  'SwiftUI',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Docker',
  'AWS',
  'Stripe',
  'Tailwind CSS',
  'Bootstrap',
  'Sass',
  'Git',
  'Full Stack Development',
  'Mobile App Development',
];

export type FaqItem = {
  question: string;
  answer: string;
};

/** Visible hire FAQ on the homepage — keep JSON-LD in sync with this copy. */
export const HIRE_FAQS: FaqItem[] = [
  {
    question: 'Who is Muhammad Tayyab?',
    answer:
      'Muhammad Tayyab is a Full Stack and Mobile Developer based in Lahore, Pakistan. He specializes in Angular, React.js, React Native, SwiftUI, and Node.js, and builds web and mobile products end to end.',
  },
  {
    question: 'What kind of projects can I hire Muhammad Tayyab for?',
    answer:
      'You can hire him for full stack web apps, React Native and SwiftUI mobile apps, Node.js backends, billing and subscription systems, dashboards, and database-backed products using PostgreSQL, MySQL, or MongoDB.',
  },
  {
    question: 'How do I contact Muhammad Tayyab for freelance work?',
    answer:
      'Email meetayyab@gmail.com, call or message +92 3230190586, or reach out via GitHub, LinkedIn, or X. He is available for new freelance projects.',
  },
];

/** Strip a trailing brand suffix so layout title.template does not duplicate it. */
export function stripBrandSuffix(title: string): string {
  return title.replace(/\s*\|\s*Muhammad Tayyab\s*$/i, '').trim();
}

function portableTextPlain(block: any): string {
  if (!block?.children || !Array.isArray(block.children)) return '';
  return block.children.map((child: any) => child?.text ?? '').join('').trim();
}

/**
 * Extract FAQPage Q&A only when the post body has an H2 FAQ section with
 * H3 questions followed by answer paragraphs (matches visible content).
 */
export function extractFaqFromPortableText(body: unknown): FaqItem[] {
  if (!Array.isArray(body)) return [];

  const faqs: FaqItem[] = [];
  let inFaq = false;
  let currentQuestion: string | null = null;
  let answerParts: string[] = [];

  const flush = () => {
    if (currentQuestion && answerParts.length > 0) {
      faqs.push({
        question: currentQuestion,
        answer: answerParts.join(' ').replace(/\s+/g, ' ').trim(),
      });
    }
    currentQuestion = null;
    answerParts = [];
  };

  for (const block of body) {
    if (!block || block._type !== 'block') continue;

    const style = block.style || 'normal';
    const text = portableTextPlain(block);
    if (!text) continue;

    if (style === 'h2') {
      const isFaqHeading =
        /^faq$/i.test(text) || /^frequently asked questions$/i.test(text);
      if (isFaqHeading) {
        flush();
        inFaq = true;
        continue;
      }
      if (inFaq) {
        flush();
        inFaq = false;
      }
      continue;
    }

    if (!inFaq) continue;

    if (style === 'h3') {
      flush();
      currentQuestion = text;
      continue;
    }

    if ((style === 'normal' || style === 'blockquote') && currentQuestion) {
      answerParts.push(text);
    }
  }

  flush();
  return faqs;
}

export function buildPersonSchema(extras: Record<string, unknown> = {}) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSON_NAME,
    url: SITE_URL,
    jobTitle: PERSON_JOB_TITLE,
    description: PERSON_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'PK',
    },
    image: PERSON_IMAGE,
    sameAs: PERSON_SAME_AS,
    knowsAbout: KNOWS_ABOUT,
    ...extras,
  };
}

export function buildWebsiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: PERSON_NAME,
    url: SITE_URL,
    description: PERSON_DESCRIPTION,
    publisher: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
  };
}

export function buildProfessionalServiceSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: 'Muhammad Tayyab — Full Stack & Mobile Development',
    url: SITE_URL,
    image: `${SITE_URL}/images/open-graph-tayyab.png`,
    description:
      'Freelance full stack and mobile development services including Angular, React.js, React Native, SwiftUI, and Node.js applications. Based in Lahore, Pakistan.',
    provider: { '@id': PERSON_ID },
    areaServed: ['PK', 'Worldwide'],
    serviceType: [
      'Full Stack Web Development',
      'Mobile App Development',
      'React Native Development',
      'Angular Development',
      'Node.js Backend Development',
    ],
  };
}

/** Linked Person + ProfessionalService + WebSite for the homepage. */
export function buildHomepageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonSchema(),
      buildProfessionalServiceSchema(),
      buildWebsiteSchema(),
    ],
  };
}

export function buildBlogPostingAuthor() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSON_NAME,
    url: SITE_URL,
    jobTitle: PERSON_JOB_TITLE,
    description: PERSON_DESCRIPTION,
    image: PERSON_IMAGE,
    sameAs: PERSON_SAME_AS,
  };
}

export function buildFaqPageSchema(questions: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export const LANDING_PAGE_PATH = '/full-stack-developer-pakistan';
export const LANDING_PAGE_URL = `${SITE_URL}${LANDING_PAGE_PATH}`;
export const LANDING_PAGE_ID = `${LANDING_PAGE_URL}/#webpage`;
export const LANDING_SERVICE_ID = `${LANDING_PAGE_URL}/#service`;

export const LANDING_PAGE_TITLE = 'Full Stack Developer Pakistan';
export const LANDING_PAGE_DESCRIPTION =
  'Hire a full stack developer in Pakistan for your US or UK startup. Next.js, React, Node.js, and mobile — async-first delivery from Lahore with proven billing and product outcomes.';

/** Linked Person + ProfessionalService + WebPage for the hire landing page. */
export function buildLandingPageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonSchema(),
      {
        ...buildProfessionalServiceSchema(),
        '@id': LANDING_SERVICE_ID,
        url: LANDING_PAGE_URL,
        description:
          'Full stack and mobile development for US and UK startups. Next.js, React, Node.js, React Native, and SwiftUI — based in Lahore, Pakistan.',
        areaServed: ['US', 'GB', 'Worldwide'],
      },
      {
        '@type': 'WebPage',
        '@id': LANDING_PAGE_ID,
        name: `${LANDING_PAGE_TITLE} — Hire for US & UK Startups`,
        description: LANDING_PAGE_DESCRIPTION,
        url: LANDING_PAGE_URL,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/open-graph-tayyab.png`,
        },
      },
    ],
  };
}

export function buildBlogCollectionSchema(
  posts: Array<{ title: string; slug: { current: string }; publishedAt?: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/blog#collection`,
    name: 'Blog — Writings by Muhammad Tayyab',
    description:
      'Web development articles and engineering insights from Muhammad Tayyab, Full Stack and Mobile Developer in Lahore, Pakistan.',
    url: `${SITE_URL}/blog`,
    isPartOf: { '@id': WEBSITE_ID },
    author: { '@id': PERSON_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug.current}`,
        name: post.title,
      })),
    },
  };
}
