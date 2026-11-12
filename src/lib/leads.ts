import 'server-only';
import { createClient } from 'next-sanity';

/**
 * Server-side writes for lead capture.
 *
 * Leads and newsletter signups are stored as Sanity documents so they show up in
 * Studio with no third-party service required. If RESEND_API_KEY and
 * LEAD_NOTIFY_EMAIL are set, a notification email is sent as well — that part is
 * best-effort and never fails the submission.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN;

export function hasWriteAccess() {
  return Boolean(projectId && token);
}

function writeClient() {
  if (!hasWriteAccess()) throw new Error('SANITY_WRITE_TOKEN (or SANITY_TOKEN) is not configured');
  return createClient({
    projectId: projectId!,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    useCdn: false,
    token,
  });
}

/** Deliberately permissive: reject the obviously-broken, not the merely unusual. */
export function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) && value.length <= 254;
}

export function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export type LeadInput = {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
  sourceUrl?: string;
  sourceLabel?: string;
};

export async function createLead(input: LeadInput) {
  const doc = {
    _type: 'lead',
    name: input.name,
    email: input.email,
    company: input.company || undefined,
    projectType: input.projectType || undefined,
    budget: input.budget || undefined,
    message: input.message,
    sourceUrl: input.sourceUrl || undefined,
    sourceLabel: input.sourceLabel || undefined,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  const created = await writeClient().create(doc);
  void notifyByEmail(input);
  return created;
}

export async function createSubscriber(email: string, sourceUrl?: string) {
  const client = writeClient();
  const existing = await client.fetch<string | null>(
    `*[_type == "subscriber" && lower(email) == lower($email)][0]._id`,
    { email }
  );
  if (existing) {
    // Re-subscribing is not an error, and must not look like one to the visitor.
    await client.patch(existing).set({ status: 'subscribed' }).commit();
    return { alreadySubscribed: true };
  }
  await client.create({
    _type: 'subscriber',
    email,
    status: 'subscribed',
    sourceUrl: sourceUrl || undefined,
    createdAt: new Date().toISOString(),
  });
  return { alreadySubscribed: false };
}

/** Best-effort notification. Never throws into the request path. */
async function notifyByEmail(lead: LeadInput) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || 'leads@iamtayyab.com';
  if (!key || !to) return;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: lead.email,
        subject: `New enquiry: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
        text: [
          `Name: ${lead.name}`,
          `Email: ${lead.email}`,
          lead.company ? `Company: ${lead.company}` : null,
          lead.projectType ? `Project type: ${lead.projectType}` : null,
          lead.budget ? `Budget: ${lead.budget}` : null,
          lead.sourceUrl ? `From: ${lead.sourceUrl}` : null,
          '',
          lead.message,
        ]
          .filter(Boolean)
          .join('\n'),
      }),
    });
  } catch {
    // Swallow: the lead is already saved in Sanity.
  }
}

/**
 * Small in-memory throttle. Serverless instances are short-lived, so this stops
 * casual hammering rather than a determined attacker — the honeypot and Sanity's
 * own auth do the rest.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  entry.count += 1;
  if (entry.count > limit) return { ok: false };
  return { ok: true };
}

export function clientKey(req: Request) {
  const fwd = req.headers.get('x-forwarded-for') || '';
  return fwd.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}
