import Link from 'next/link';
import { SOCIAL_LINKS } from '@/lib/data';
import Typography from '@/components/general/typography';

/**
 * Credibility block, not a call to action. The post CTA above it owns the
 * conversion; the social links here are deliberately small text links so they
 * do not pull a high-intent reader off the site at the moment they are ready
 * to get in touch.
 */
const AuthorBio = () => {
  return (
    <aside className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-5 md:p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-base font-bold text-white shadow-sm">
          T
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Typography variant="h3" className="text-base">
            Written by Muhammad Tayyab
          </Typography>
          <Typography className="text-sm leading-relaxed text-gray-600 dark:text-zinc-300">
            Full stack and mobile developer working with startups in the US, UK and EU. Ships
            Next.js, Node.js and React Native products, and his own apps under{' '}
            <a
              href="https://dawnapps.co"
              className="font-medium text-violet-600 underline underline-offset-2 dark:text-violet-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              dawnapps.co
            </a>
            . Based in Lahore, working across US and EU time zones.
          </Typography>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-zinc-400">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 transition-colors hover:text-violet-600 hover:underline dark:hover:text-violet-400"
              >
                {social.label === 'Twitter / X' ? 'X' : social.label}
              </a>
            ))}
            <Link
              href="/blog"
              className="underline-offset-2 transition-colors hover:text-violet-600 hover:underline dark:hover:text-violet-400"
            >
              All posts
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AuthorBio;
