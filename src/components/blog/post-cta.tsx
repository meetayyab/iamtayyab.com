'use client';

import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';

import { trackBookingClick, trackCtaClick } from '@/lib/analytics';
import { BOOKING_URL, HIRE_HUB_HREF, WORK_WITH_ME_HREF } from '@/lib/site';

/**
 * The primary conversion point for a post. One main action, stated plainly.
 * Socials deliberately live elsewhere so nothing competes with it here.
 */
const PostCta = () => {
  return (
    <section
      aria-labelledby="post-cta-heading"
      className="mt-14 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-7 md:p-9 dark:border-violet-900/40 dark:from-violet-950/30 dark:to-indigo-950/30"
    >
      <h2
        id="post-cta-heading"
        className="text-2xl font-bold leading-snug tracking-tight text-gray-900 dark:text-zinc-50"
      >
        Need this done properly, without hiring a team?
      </h2>
      <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-gray-600 dark:text-zinc-300">
        I build and ship web and mobile products for startups in the US, UK and EU — Next.js,
        Node.js and React Native, from the API to the App Store listing. Tell me what you&apos;re
        building and I&apos;ll reply with how I&apos;d approach it, what it would take, and whether
        I&apos;m the right fit.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={WORK_WITH_ME_HREF}
          onClick={() => trackCtaClick('post-end', 'Tell me about your project', WORK_WITH_ME_HREF)}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-violet-700"
        >
          Tell me about your project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>

        {BOOKING_URL && (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackBookingClick('post-end')}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-[15px] font-semibold text-gray-800 transition-colors hover:border-violet-300 hover:text-violet-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Book a 20-minute call
          </a>
        )}
      </div>

      <p className="mt-5 text-sm text-gray-500 dark:text-zinc-400">
        Want the detail first?{' '}
        <Link
          href={HIRE_HUB_HREF}
          onClick={() => trackCtaClick('post-end-secondary', 'How I work with teams', HIRE_HUB_HREF)}
          className="font-medium text-violet-600 underline underline-offset-2 hover:text-violet-800 dark:text-violet-400"
        >
          How I work with teams, rates and engagement models
        </Link>
        .
      </p>
    </section>
  );
};

export default PostCta;
