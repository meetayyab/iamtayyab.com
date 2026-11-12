'use client';

import Link from 'next/link';

import { trackCtaClick } from '@/lib/analytics';
import { WORK_WITH_ME_HREF } from '@/lib/site';

/**
 * A quiet mid-article prompt, placed roughly a third of the way down so it is
 * seen by readers who never reach the end. Styled as an editorial aside rather
 * than an ad, so it does not read as an interruption.
 */
const InlineCta = () => {
  return (
    <aside className="my-10 rounded-xl border-l-4 border-violet-400 bg-violet-50/70 py-4 pl-5 pr-4 dark:border-violet-500 dark:bg-zinc-800/60">
      <p className="text-[15px] leading-relaxed text-gray-700 dark:text-zinc-200">
        <span className="font-semibold text-gray-900 dark:text-zinc-50">Short on time?</span> This
        is the kind of work I do for startups every week — audits, upgrades and the shipping that
        follows.{' '}
        <Link
          href={WORK_WITH_ME_HREF}
          onClick={() => trackCtaClick('mid-article', 'Hand this to me', WORK_WITH_ME_HREF)}
          className="font-medium text-violet-600 underline underline-offset-2 hover:text-violet-800 dark:text-violet-400"
        >
          Hand it to me instead
        </Link>
        .
      </p>
    </aside>
  );
};

export default InlineCta;
