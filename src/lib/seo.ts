export const SITE_URL = 'https://www.iamtayyab.com';
export const PERSON_NAME = 'Muhammad Tayyab';
export const PERSON_JOB_TITLE = 'Full Stack Developer';
export const PERSON_IMAGE = `${SITE_URL}/images/tayyab-headshot.jpg`;

export const PERSON_DESCRIPTION =
  'Full Stack and Mobile Developer specializing in Angular, React.js, React Native, SwiftUI, and Node.js, based in Peshawar, Pakistan. Available for freelance web and mobile projects.';

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
      'Muhammad Tayyab is a Full Stack and Mobile Developer based in Peshawar, Pakistan. He specializes in Angular, React.js, React Native, SwiftUI, and Node.js, and builds web and mobile products end to end.',
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

export function buildPersonSchema(extras: Record<string, unknown> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSON_NAME,
    url: SITE_URL,
    jobTitle: PERSON_JOB_TITLE,
    description: PERSON_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Peshawar',
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
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: PERSON_NAME,
    url: SITE_URL,
    description: PERSON_DESCRIPTION,
    author: {
      '@type': 'Person',
      name: PERSON_NAME,
      url: SITE_URL,
    },
  };
}

export function buildProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Muhammad Tayyab — Full Stack & Mobile Development',
    url: SITE_URL,
    description:
      'Freelance full stack and mobile development services including Angular, React.js, React Native, SwiftUI, and Node.js applications. Based in Peshawar, Pakistan.',
    provider: {
      '@type': 'Person',
      name: PERSON_NAME,
      url: SITE_URL,
      jobTitle: PERSON_JOB_TITLE,
      sameAs: PERSON_SAME_AS,
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Full Stack Web Development',
      'Mobile App Development',
      'React Native Development',
      'Angular Development',
      'Node.js Backend Development',
    ],
  };
}

export function buildBlogPostingAuthor() {
  return {
    '@type': 'Person',
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
