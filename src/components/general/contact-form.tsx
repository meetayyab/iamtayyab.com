'use client';

import { useId, useRef, useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

import { trackFormError, trackFormStart, trackLead } from '@/lib/analytics';
import { mergeClasses } from '@/lib/utils';

const PROJECT_TYPES = [
  { value: '', label: 'What do you need?' },
  { value: 'new-web', label: 'New build (web)' },
  { value: 'new-mobile', label: 'New build (mobile)' },
  { value: 'existing', label: 'Add to an existing product' },
  { value: 'rescue', label: 'Fix / rescue a stalled project' },
  { value: 'retainer', label: 'Ongoing retainer' },
  { value: 'other', label: 'Something else' },
];

const BUDGETS = [
  { value: '', label: 'Budget range' },
  { value: 'under-5k', label: 'Under $5k' },
  { value: '5-15k', label: '$5k – $15k' },
  { value: '15-50k', label: '$15k – $50k' },
  { value: '50k-plus', label: '$50k+' },
  { value: 'retainer', label: 'Monthly retainer' },
  { value: 'unsure', label: 'Not sure yet' },
];

const fieldClasses =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-violet-900/40';

type Props = {
  /** Where this instance lives, so GTM can attribute the lead. */
  sourceLabel?: string;
  className?: string;
};

const ContactForm = ({ sourceLabel = 'contact-section', className }: Props) => {
  const formName = 'contact';
  const id = useId();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const started = useRef(false);

  const handleFirstInput = () => {
    if (started.current) return;
    started.current = true;
    trackFormStart(formName);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrors({});
    setMessage('');

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const payload = {
      ...data,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      sourceLabel,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrors(json.errors || {});
        setMessage(json.error || 'Something went wrong. Please try again.');
        trackFormError(formName, json.error || `http_${res.status}`);
        return;
      }

      setStatus('success');
      trackLead(formName, {
        project_type: data.projectType || undefined,
        budget: data.budget || undefined,
        cta_location: sourceLabel,
      });
    } catch {
      setStatus('error');
      setMessage('Could not reach the server. Please try again, or email me directly.');
      trackFormError(formName, 'network');
    }
  }

  if (status === 'success') {
    return (
      <div
        className={mergeClasses(
          'rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-900/50 dark:bg-emerald-950/30',
          className
        )}
        role="status"
      >
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="text-lg font-semibold text-gray-900 dark:text-zinc-50">Got it — thank you.</p>
        <p className="mt-1 text-[15px] text-gray-600 dark:text-zinc-300">
          I read every message myself and usually reply within one working day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onInput={handleFirstInput}
      className={mergeClasses('flex w-full flex-col gap-4', className)}
      noValidate
    >
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-zinc-300">
            Your name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            className={fieldClasses}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-zinc-300">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="jane@company.com"
            className={fieldClasses}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-company`} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Company or product <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <input
          id={`${id}-company`}
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Acme, or acme.com"
          className={fieldClasses}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-projectType`} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-zinc-300">
            Project type
          </label>
          <select id={`${id}-projectType`} name="projectType" className={fieldClasses} defaultValue="">
            {PROJECT_TYPES.map((o) => (
              <option key={o.value} value={o.value} disabled={o.value === ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-budget`} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-zinc-300">
            Budget
          </label>
          <select id={`${id}-budget`} name="budget" className={fieldClasses} defaultValue="">
            {BUDGETS.map((o) => (
              <option key={o.value} value={o.value} disabled={o.value === ''}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-zinc-300">
          What are you building?
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          placeholder="A sentence or two about the product, where it is today, and what you need next."
          className={mergeClasses(fieldClasses, 'resize-y')}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      {status === 'error' && message && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send project details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400 dark:text-zinc-500">
        No newsletter signup, no CRM sequence — this goes straight to me.
      </p>
    </form>
  );
};

export default ContactForm;
