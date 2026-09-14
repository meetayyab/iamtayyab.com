import { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe2,
  MapPin,
  MessageCircle,
  Rocket,
  Sparkles,
} from 'lucide-react';

import HireHubHero from '../../../public/images/hire-hub-hero.jpg';

import Tag from '@/components/data-display/tag';
import Button from '@/components/general/button';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';
import Link from '@/components/navigation/link';
import {
  buildLandingPageGraph,
  LANDING_PAGE_DESCRIPTION,
  LANDING_PAGE_TITLE,
  LANDING_PAGE_URL,
  SITE_URL,
} from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = {
  title: LANDING_PAGE_TITLE,
  description: LANDING_PAGE_DESCRIPTION,
  alternates: {
    canonical: LANDING_PAGE_URL,
  },
  openGraph: {
    title: `${LANDING_PAGE_TITLE} — Hire for US & UK Startups | Muhammad Tayyab`,
    description: LANDING_PAGE_DESCRIPTION,
    url: LANDING_PAGE_URL,
    type: 'website',
    siteName: 'Muhammad Tayyab',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/images/open-graph-tayyab.png`,
        width: 1200,
        height: 630,
        alt: 'Muhammad Tayyab — Full Stack Developer Pakistan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${LANDING_PAGE_TITLE} — Hire for US & UK Startups | Muhammad Tayyab`,
    description: LANDING_PAGE_DESCRIPTION,
    creator: '@iamtayyabx',
    site: '@iamtayyabx',
    images: `${SITE_URL}/images/open-graph-tayyab.png`,
  },
};

const OUTCOMES = [
  {
    headline: '~$70K in billing fees cut',
    detail:
      'Built a custom subscription system to replace Stripe Subscriptions — flexible billing, trials, and auto-retry without the platform tax.',
  },
  {
    headline: '~90% fewer support tickets',
    detail:
      'Shipped an internal support dashboard unifying billing, accounts, and line management so ops could resolve issues faster.',
  },
  {
    headline: 'DripScore on the App Store',
    detail:
      'Own product under dawnapps.co — AI outfit rating shipped end to end, from SwiftUI mobile to backend and App Store release.',
    links: [
      {
        label: 'App Store',
        href: 'https://apps.apple.com/us/app/dripscore-ai-outfit-rating/id6770945493',
      },
      { label: 'dawnapps.co', href: 'https://dawnapps.co' },
    ],
  },
] as const;

const DELIVERABLES = [
  'Next.js and React frontends that match your design system',
  'Node.js APIs, databases, and billing (Stripe and custom)',
  'React Native and SwiftUI mobile when you need iOS or cross-platform',
  'Deployment, monitoring, and iteration — not just handoff tickets',
] as const;

const AUDIENCE = [
  'US and UK startup founders who need a senior IC, not a dev shop',
  'Seed to Series A teams shipping web or mobile products under real deadlines',
  'Engineering leads who want one accountable owner across stack layers',
] as const;

const ENGAGEMENT = [
  {
    title: 'Async-first',
    detail:
      'Written updates, Loom walkthroughs, and clear PRs so your team stays in the loop without constant meetings.',
  },
  {
    title: 'UTC+5 overlap',
    detail:
      'Based in Lahore, Pakistan — morning overlap with US East Coast and afternoon overlap with UK/EU for standups and reviews.',
  },
  {
    title: 'Direct line',
    detail:
      'You work with me directly: scoping, build, and ship. No account managers or hidden bench.',
  },
] as const;

const RELATED_POSTS = [
  {
    title: 'How to Hire a Full Stack Developer in Pakistan (2026)',
    href: '/blog/hire-full-stack-developer-pakistan-2026',
    description:
      'Screening, time zones, contracts, and what good offshore hiring looks like.',
  },
  {
    title: 'What US Startups Pay Full Stack Developers in Pakistan',
    href: '/blog/what-us-startups-pay-full-stack-pakistan',
    description:
      'Rate bands, engagement models, and how to budget without guessing.',
  },
] as const;

function SectionHeader({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Tag label={tag} />
      <Typography variant="h2" className="text-center">
        {title}
      </Typography>
      {subtitle ? (
        <Typography variant="subtitle" className="max-w-2xl text-center">
          {subtitle}
        </Typography>
      ) : null}
    </div>
  );
}

function ContactCta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-violet-200 bg-gradient-to-br from-violet-50/90 via-gray to-indigo-50/60 px-6 py-8 text-center shadow-sm dark:border-violet-400/30 dark:from-violet-500/10 dark:via-gray-100 dark:to-indigo-500/5">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="flex max-w-md flex-col gap-2">
        <Typography variant="h3" className="text-lg">
          {title}
        </Typography>
        <Typography className="text-gray-600">{description}</Typography>
      </div>
      <Button asChild>
        <Link href="/#contact" noCustomization>
          Get in touch
        </Link>
      </Button>
    </div>
  );
}

export default function FullStackDeveloperPakistanPage() {
  const landingGraphJsonLd = buildLandingPageGraph();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingGraphJsonLd) }}
      />

      {/* Hero */}
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:items-center">
          <div className="flex flex-col items-center gap-6 text-center md:max-w-2xl md:items-start md:text-left">
            <Tag label="Hire" />
            <Typography variant="h1" className="max-w-4xl">
              Full Stack Developer Pakistan
            </Typography>
            <Typography variant="subtitle" className="max-w-2xl">
              For US and UK founders hiring offshore — one senior engineer in
              Lahore who owns web, mobile, and backend and ships like part of
              your team.
            </Typography>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 md:justify-start">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                Lahore, Pakistan
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                Available for new engagements
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 md:justify-start">
              <Button asChild>
                <Link href="/#contact" noCustomization>
                  Hire me
                </Link>
              </Button>
              <Link
                href="https://www.linkedin.com/in/immtayyab"
                externalLink
                noCustomization
                className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              >
                LinkedIn profile
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="flex w-full items-center justify-center md:order-last md:ml-auto md:w-auto md:flex-grow md:justify-end">
            <div className="relative h-[240px] w-full max-w-[480px] overflow-hidden rounded-2xl border border-gray-100 shadow-md dark:border-gray-300 sm:h-[280px] md:h-[320px] md:w-[480px]">
              <Image
                src={HireHubHero}
                alt="Distributed team collaborating on a product — remote full stack development for US and UK startups"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Who this is for */}
      <Container className="bg-gray-50">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <SectionHeader
            tag="Audience"
            title="Built for US & UK startups"
            subtitle="Pakistan is a credibility signal for cost-efficient senior talent — this page is written for Western founders evaluating hire, not a local job market."
          />
          <ul className="flex flex-col gap-4">
            {AUDIENCE.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-gray-100 bg-gray px-5 py-4 shadow-sm dark:border-gray-300 dark:bg-gray-100"
              >
                <Globe2
                  className="mt-0.5 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400"
                  aria-hidden="true"
                />
                <Typography className="text-left">{item}</Typography>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* What you get */}
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <SectionHeader
            tag="Scope"
            title="What you get"
            subtitle="Full stack ownership — from interface to infrastructure — so you are not coordinating three contractors."
          />
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DELIVERABLES.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-300 dark:bg-gray-100"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <Typography className="text-left text-[15px] leading-relaxed">
                  {item}
                </Typography>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Next.js',
              'React',
              'Node.js',
              'TypeScript',
              'React Native',
              'SwiftUI',
              'PostgreSQL',
              'Stripe',
            ].map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>
        </div>
      </Container>

      {/* Proof */}
      <Container className="bg-gray-50">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <SectionHeader
            tag="Outcomes"
            title="Proof, not promises"
            subtitle="Recent results from production systems and my own product work."
          />
          <div className="flex flex-col gap-4">
            {OUTCOMES.map((outcome) => (
              <article
                key={outcome.headline}
                className="rounded-2xl border border-gray-100 bg-gray p-6 shadow-sm dark:border-gray-300 dark:bg-gray-100"
              >
                <div className="mb-2 flex items-start gap-3">
                  <Sparkles
                    className="mt-1 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400"
                    aria-hidden="true"
                  />
                  <Typography
                    variant="h3"
                    className="text-lg md:text-xl"
                    component="h3"
                  >
                    {outcome.headline}
                  </Typography>
                </div>
                <Typography className="pl-8 text-[15px] leading-relaxed">
                  {outcome.detail}
                </Typography>
                {'links' in outcome && outcome.links ? (
                  <div className="mt-4 flex flex-wrap gap-3 pl-8">
                    {outcome.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        externalLink
                        noCustomization
                        className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
                      >
                        {link.label}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </Container>

      {/* How engagement works */}
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <SectionHeader
            tag="Process"
            title="How we work together"
            subtitle="Structured for distributed teams — clear async rhythm with real-time overlap when it matters."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ENGAGEMENT.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-300 dark:bg-gray-100"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
                  {item.title === 'Async-first' ? (
                    <Rocket className="h-5 w-5" aria-hidden="true" />
                  ) : item.title === 'UTC+5 overlap' ? (
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  )}
                </div>
                <Typography variant="h3" className="text-lg" component="h3">
                  {item.title}
                </Typography>
                <Typography className="text-[15px] leading-relaxed">
                  {item.detail}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Rates pointer */}
      <Container className="bg-gray-50">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-gray-100 bg-gray p-6 shadow-sm dark:border-gray-300 dark:bg-gray-100 md:p-8">
            <Typography variant="h3" className="mb-3 text-lg md:text-xl">
              Rate context
            </Typography>
            <Typography className="mb-4 text-[15px] leading-relaxed">
              I do not publish a personal rate card here — benchmarks change by
              seniority, stack, and engagement length. For current US-market
              bands and how founders budget offshore hires, see the dedicated
              guide (third-party ranges, not a quote).
            </Typography>
            <Link
              href="/blog/what-us-startups-pay-full-stack-pakistan"
              noCustomization
              className="inline-flex items-center gap-1.5 font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
            >
              What US startups pay full stack developers in Pakistan
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>

      {/* Related reading */}
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <SectionHeader
            tag="Guides"
            title="Related reading"
            subtitle="Deeper dives on hiring, rates, and working with Pakistan-based developers."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {RELATED_POSTS.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                noCustomization
                className="group flex flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-all hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md dark:border-gray-300 dark:bg-gray-100 dark:hover:border-violet-400/40"
              >
                <Typography
                  variant="h3"
                  className="text-base transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400"
                  component="h3"
                >
                  {post.title}
                </Typography>
                <Typography className="text-sm leading-relaxed">
                  {post.description}
                </Typography>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-violet-600 dark:text-violet-400">
                  Read article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>

      {/* Final CTA */}
      <Container className="bg-gray-50">
        <div className="mx-auto max-w-3xl">
          <ContactCta
            title="Ready to hire a full stack developer in Pakistan?"
            description="Share your product, timeline, and stack — I usually reply within a day. No pitch deck required."
          />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link
              href="https://github.com/meetayyab"
              externalLink
              noCustomization
              className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/immtayyab"
              externalLink
              noCustomization
              className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400"
            >
              LinkedIn
            </Link>
            <Link
              href="https://x.com/iamtayyabx"
              externalLink
              noCustomization
              className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400"
            >
              X
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
