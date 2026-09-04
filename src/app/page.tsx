export const revalidate = 60;

import HeroSection from '@/components/sections/hero';
import ContactSection from '@/components/sections/contact';
import AboutMeSection from '@/components/sections/about-me';
import SkillsSection from '@/components/sections/skills';
import ExperienceSection from '@/components/sections/experiences';
import TestimonialsSection from '@/components/sections/testimonials';
import WorkSection from '@/components/sections/work';
import BlogPreviewSection from '@/components/sections/blog-preview';
import HireFaqSection from '@/components/sections/hire-faq';
import { buildFaqPageSchema, buildHomepageGraph, HIRE_FAQS } from '@/lib/seo';

const homepageGraphJsonLd = buildHomepageGraph();
const faqJsonLd = buildFaqPageSchema(HIRE_FAQS);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageGraphJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <AboutMeSection />
      <SkillsSection />
      <ExperienceSection />
      <WorkSection />
      <BlogPreviewSection />
      <TestimonialsSection />
      <HireFaqSection />
      <ContactSection />
    </>
  );
}
