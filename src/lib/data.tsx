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

import AvatarOsama from '/public/images/avatar-osama-yawar.png';

import {
  ExperienceDetails,
  ProjectDetails,
  TechDetails,
  TestimonialDetails,
} from '@/lib/types';

export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/muhamamdtayyab3411',
  GITHUB_REPO: 'https://github.com/muhammadtayyab/iamtayyab.com',
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
    url: 'https://www.linkedin.com/in/muhammad-tayyab-a12258228/',
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
    position: 'Full Stack Developer',
    startDate: new Date(2023, 3),
    currentlyWorkHere: true,
    summary: [
      'Developed applications with the MEAN stack, leveraging Node.js, Angular, TypeScript, PostgreSQL, Stripe for payments, and Git for version control.',
      'Specialized in building scalable backend APIs, ensuring fast and efficient web applications.',
      'Managed databases with precision, designing effective schemas in PostgreSQL and working with both NoSQL and SQL databases, consistently delivering high-quality results.'
    ],
  },
  {
    logo: LogoInqiludioDigital,
    darkModeLogo: LogoInqiludioDigitalDark,
    logoAlt: 'Inqiludio Digital logo',
    position: 'MERN Developer',
    startDate: new Date(2022, 8),
    endDate: new Date(2023, 3),
    summary: [
      'Developed several applications using React.js, focusing on user interfaces, data visualizations, and dynamic web components.',
      'Built scalable APIs with Express.js and Node.js to create fast and efficient web applications.',
      'Designed schemas for both NoSQL and SQL databases, like MongoDB and MySQL, consistently delivering high-quality results that met or exceeded expectations and deadlines.',
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
];

export const TESTIMONIALS: TestimonialDetails[] = [
  {
    personName: 'Osama Yawar',
    personAvatar: AvatarOsama,
    title: 'Head of Engineering at Efani',
    testimonial:
      'An ambitious team player to work with. He has been a great help in solving complex problems. His dedication, expertise and habit of taking ownership added value to our company. Highly recommended !!',
  },
];
