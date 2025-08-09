import { Github, Twitter, Linkedin } from 'lucide-react';

import LogoJavascript from '/public/images/logos/icon-javascript.svg';
import LogoTypescript from '/public/images/logos/icon-typescript.svg';
import LogoReact from '/public/images/logos/icon-react.svg';
import LogoAngular from '/public/images/logos/icon-angular.svg';
import LogoMySQL from '/public/images/logos/icon-mysql.svg';
import LogoDocker from '/public/images/logos/icon-docker.svg';
import LogoStripe from '/public/images/logos/icon-stripe.svg';
import LogoAWS from '/public/images/logos/icon-aws.svg';
import LogoBootstrap from '/public/images/logos/icon-bootstrap.svg';
import LogoNodejs from '/public/images/logos/icon-nodejs.svg';
import LogoExpress from '/public/images/logos/icon-express.svg';
import LogoExpressLight from '/public/images/logos/icon-express-light.svg';
import LogoPostgreSQL from '/public/images/logos/icon-postgresql.svg';
import LogoMongoDB from '/public/images/logos/icon-mongodb.svg';
import LogoSass from '/public/images/logos/icon-sass.svg';
import LogoTailwindcss from '/public/images/logos/icon-tailwindcss.svg';
import LogoGit from '/public/images/logos/icon-git.svg';

import LogoEfani from '/public/images/logos/logo-efani.svg';
import LogoEfaniDark from '/public/images/logos/logo-efani-dark.svg';
import LogoInqiludioDigital from '/public/images/logos/logo-inqiludio-digital.svg';
import LogoInqiludioDigitalDark from '/public/images/logos/logo-inqiludio-digital-dark.svg';

import ProjectTalkMotion from '/public/images/project-talkmotion.jpg';
import ProjectWAF from '/public/images/project-waf.jpg';
import ProjectBlackSeal from '/public/images/project-blackseal.png';
import ProjectVisaBookings from '/public/images/project-visabookings.png';
import ProjectWorkConnect from '/public/images/project-workconnect.png';

import AvatarOsama from '/public/images/avatar-osama-yawar.png';
import AvatarVincent from '/public/images/avatar-vincent-ochs.jpeg';
import AvatarGabriel from '/public/images/avatar-gabriel-tannous.jpeg';

import {
  ExperienceDetails,
  ProjectDetails,
  TechDetails,
  TestimonialDetails,
} from '@/lib/types';

export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/meetayyab',
  GITHUB_REPO: 'https://github.com/meetayyab/iamtayyab.com',
  TWITTER: 'https://twitter.com/Tayyab_3411',
};

export const NAV_LINKS = [
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Work',
    href: '#work',
  },
  {
    label: 'Testimonials',
    href: '#testimonials',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
];

export const SOCIAL_LINKS = [
  {
    icon: Github,
    url: 'https://github.com/muhammadtayyab3411',
  },
  {
    icon: Twitter,
    url: 'https://twitter.com/Tayyab_3411',
  },
  {
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/immtayyab',
  },
];

export const TECHNOLOGIES: TechDetails[] = [
  {
    label: 'Javascript',
    logo: LogoJavascript,
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    label: 'Typescript',
    logo: LogoTypescript,
    url: 'https://www.typescriptlang.org/',
  },
  {
    label: 'React',
    logo: LogoReact,
    url: 'https://react.dev/',
  },
  {
    label: 'Angular',
    logo: LogoAngular,
    url: 'https://angular.io/',
  },
  {
    label: 'Node.js',
    logo: LogoNodejs,
    url: 'https://nodejs.org/en',
  },
  {
    label: 'Express.js',
    logo: LogoExpress,
    darkModeLogo: LogoExpressLight,
    url: 'https://expressjs.com/',
  },
  {
    label: 'PostgreSQL',
    logo: LogoPostgreSQL,
    url: 'https://www.postgresql.org/',
  },
  {
    label: 'MySQL',
    logo: LogoMySQL,
    url: 'https://www.mysql.com/',
  },
  {
    label: 'MongoDB',
    logo: LogoMongoDB,
    url: 'https://www.mongodb.com/',
  },
  {
    label: 'Git',
    logo: LogoGit,
    url: 'https://git-scm.com/',
  },
  {
    label: 'Docker',
    logo: LogoDocker,
    url: 'https://docker.com/',
  },
  {
    label: 'Stripe',
    logo: LogoStripe,
    url: 'https://stripe.com/',
  },
  {
    label: 'AWS',
    logo: LogoAWS,
    url: 'https://aws.amazon.com/',
  },
  {
    label: 'Sass/Scss',
    logo: LogoSass,
    url: 'https://sass-lang.com/',
  },
  {
    label: 'Tailwindcss',
    logo: LogoTailwindcss,
    url: 'https://tailwindcss.com/',
  },
  {
    label: 'Bootstrap',
    logo: LogoBootstrap,
    url: 'https://getbootstrap.com/',
  },
];

export const EXPERIENCES: ExperienceDetails[] = [
  {
    logo: LogoEfani,
    darkModeLogo: LogoEfaniDark, 
    logoAlt: 'Efani logo',
    position: 'Full Stack Engineer',
    startDate: new Date(2023, 3),
    currentlyWorkHere: true,
    summary: [
      'Built a custom subscription system to replace Stripe Subscriptions, supporting flexible billing intervals, trials, and auto-retry. This saved the company over $70,000 annually in fees.',
      'Created an internal support dashboard combining billing, account, and line management tools. This helped reduce support tickets by 90% and sped up issue resolution.',
      'Developed an affiliate dashboard that tracks orders and commissions in real time, leading to a 30% increase in affiliate sales.',
      'Automated sales call analysis by using OpenPhone transcripts with a HuggingFace AI model. Reduced monthly AI costs from $28,800 to about $200 and improved sales process compliance.',
      'Led a small cross-functional team of developers, designers, and testers. Took ownership of task planning, code reviews, and mentoring junior engineers.'
    ],
  },
  {
    logo: LogoInqiludioDigital,
    darkModeLogo: LogoInqiludioDigitalDark,
    logoAlt: 'Inqiludio Digital logo',
    position: 'Software Engineer',
    startDate: new Date(2022, 8),
    endDate: new Date(2023, 3),
    summary: [
      'Facilitated communication for 10,000 individuals by developing an AI-based app translating sign language and voice.',
      'Developed a React-based dashboard to manage, list, and train language conversion models for enhanced accuracy and usability.',
      'Leveraged Media pipe Holistic libraries to accurately capture user gestures for real-time sign language recognition.',
      'Reduced server costs by 25% by optimizing resource allocation and leveraging cloud solutions.',
      'Improved deployment speed by 50% by introducing automated CI/CD pipelines and optimizing workflows.'
    ],
  },
];

export const PROJECTS: ProjectDetails[] = [
  {
    name: 'Talk Motion',
    description:
      'Talk-motion brings the world of Deaf and speaking people together, reuniting families, friends and colleagues with the power of artificial intelligence.',
    url: 'https://talk-motion.com',
    previewImage: ProjectTalkMotion,
    technologies: [
      'React',
      'Redux',
      'Ant Design',
      'Stripe',
      'Express.js',
      'PostgreSQL',
      'Styled Components',
    ],
  },
  {
    name: 'Black Seal Protection',
    description: 'Mobile security platform providing comprehensive SIM protection tools, device security analysis, and breach monitoring to reduce account compromise risks for users.',
    url: 'https://apps.apple.com/us/app/black-seal-protection/id6742754502',
    previewImage: ProjectBlackSeal,
    technologies: [
      'SwiftUI',
      'Xcode',
      'Node.js',
      'PostgreSQL',
      'Heroku',
      'Atom SDK',
    ],
  },
  {
    name: 'VisaBookings',
    description:
      'Platform for booking Schengen visa flight reservations, travel insurance, and hotel bookings with integrated payment processing and real-time pricing for travelers.',
    url: 'https://visabookings.com/',
    previewImage: ProjectVisaBookings,
    technologies: [
      'Node.js',
      'PostgreSQL',
      'Stripe',
      'AWS',
    ],
  },
  {
    name: 'WAF Automation',
    description:
      'A service platform to build custom AI solutions in computer vision and VR with the platform best-in-class integrations.',
    url: 'https://wafautomation.com/',
    previewImage: ProjectWAF,
    technologies: [
      'Angular',
      'RxJS',
      'Typescript',
      'Booking Services',
      'Email Automation',
      'Tailwindcss',
      'Express.js',
      'PostgreSQL',
    ],
  },
  {
    name: 'WorkConnect',
    description:
      'A comprehensive cross-platform job marketplace connecting clients with skilled workers, featuring real-time messaging, AI document verification, and secure payment processing across web and mobile interfaces.',
    url: 'https://workconnect-web-sf58.vercel.app/',
    previewImage: ProjectWorkConnect,
    technologies: [
      'Next.js',
      'React Native',
      'Django REST Framework',
      'PostgreSQL',
      'WebSocket',
      'Stripe',
    ],
  },
];

export const TESTIMONIALS: TestimonialDetails[] = [
  {
    personName: 'Osama Yawar',
    personAvatar: AvatarOsama,
    title: 'Head of Engineering - Efani',
    testimonial:
      'An ambitious team player to work with. He has been a great help in solving complex problems. His dedication, expertise and habit of taking ownership added value to our company. Highly recommended !!',
  },
  {
    personName: 'Vincent Ochs',
    personAvatar: AvatarVincent,
    title: 'Founder - Kairos',
    testimonial:
      `This guy knows exactly what he is been doing and also contributes to the task by providing his own solutions and thoughts. He works independently and made sure I can follow on the way along. I can suggest anyone to work with him`,
  },
  {
    personName: 'Gabriel Tannous',
    personAvatar: AvatarGabriel,
    title: 'Lead Software Engineer - Lumachain',
    testimonial:
      'Excellent collaboration throughout the entire project. Tayyab consistently delivered high-quality work on time and maintained clear communication. His professionalism and reliability make him someone I would definitely work with again on future projects.',
  },
];
