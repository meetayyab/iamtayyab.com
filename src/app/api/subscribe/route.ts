import {
  clean,
  clientKey,
  createSubscriber,
  hasWriteAccess,
  isValidEmail,
  rateLimit,
} from '@/lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!rateLimit(`subscribe:${clientKey(request)}`).ok) {
    return Response.json({ error: 'Too many attempts. Try again shortly.' }, { status: 429 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (clean(body.website, 100)) return Response.json({ ok: true });

  const email = clean(body.email, 254);
  if (!isValidEmail(email)) {
    return Response.json({ error: 'That email address does not look right.' }, { status: 400 });
  }

  if (!hasWriteAccess()) {
    console.error('[subscribe] SANITY_WRITE_TOKEN missing — signup not stored:', email);
    return Response.json({ error: 'Signups are not configured yet.' }, { status: 503 });
  }

  try {
    await createSubscriber(email, clean(body.sourceUrl, 500));
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[subscribe] failed:', err);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
