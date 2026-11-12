'use client';

import { useId, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

import { trackNewsletterSignup } from '@/lib/analytics';
import { mergeClasses } from '@/lib/utils';

type Props = {
  location?: string;
  className?: string;
  heading?: string;
  blurb?: string;
};

const NewsletterForm = ({
  location = 'blog-post',
  className,
  heading = 'Get the next one by email',
  blurb = 'One email per week: what changed in the App Store, Google Play, Next.js and the AI tooling, and what it means for a small team shipping product. No spam, unsubscribe anytime.',
}: Props) => {
  const id = useId();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setError('');

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setError(json.error || 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
      trackNewsletterSignup(location);
    } catch {
      setStatus('error');
      setError('Could not reach the server. Please try again.');
    }
  }

  return (
    <aside
      className={mergeClasses(
        'mt-12 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-7 dark:border-zinc-800 dark:bg-zinc-900/60',
        className
      )}
    >
      <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-50">{heading}</h2>
      <p className="mt-1.5 text-[15px] leading-relaxed text-gray-600 dark:text-zinc-300">{blurb}</p>

      {status === 'success' ? (
        <p className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-emerald-700 dark:text-emerald-400" role="status">
          <Check className="h-4 w-4" aria-hidden="true" />
          You&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row" noValidate>
          <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor={`${id}-website`}>Website</label>
            <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="w-full flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:ring-violet-900/40"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-gray-700 disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            Subscribe
          </button>
        </form>
      )}

      {status === 'error' && error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </aside>
  );
};

export default NewsletterForm;
