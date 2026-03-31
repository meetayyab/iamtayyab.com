import HeroSection from '@/components/sections/hero';
import ContactSection from '@/components/sections/contact';
import AboutMeSection from '@/components/sections/about-me';
import SkillsSection from '@/components/sections/skills';
import ExperienceSection from '@/components/sections/experiences';
import TestimonialsSection from '@/components/sections/testimonials';
import WorkSection from '@/components/sections/work';
import BlogPreviewSection from '@/components/sections/blog-preview';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Tayyab',
  url: 'https://www.iamtayyab.com',
  jobTitle: 'Full Stack Developer',
  description:
    'Full Stack and Mobile Developer specializing in Angular, React.js, React Native, SwiftUI, and Node.js, based in Peshawar, Pakistan.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Peshawar',
    addressCountry: 'PK',
  },
  image: 'https://www.iamtayyab.com/images/tayyab-headshot.jpg',
  sameAs: [
    'https://github.com/meetayyab',
    'https://x.com/iamtayyabx',
    'https://www.linkedin.com/in/immtayyab',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Muhammad Tayyab',
  url: 'https://www.iamtayyab.com',
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      <ExperienceSection />
      <WorkSection />
      <BlogPreviewSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
