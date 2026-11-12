import {
  clean,
  clientKey,
  createLead,
  hasWriteAccess,
  isValidEmail,
  rateLimit,
} from '@/lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientKey(request)}`).ok) {
    return Response.json({ error: 'Too many submissions. Try again in a minute.' }, { status: 429 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real people leave this hidden field empty.
  if (clean(body.website, 100)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 254);
  const message = clean(body.message, 5000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Please tell me your name.';
  if (!isValidEmail(email)) errors.email = 'Please enter an email address I can reply to.';
  if (message.length < 10) errors.message = 'A sentence or two about the project is enough.';
  if (Object.keys(errors).length) {
    return Response.json({ error: 'Please check the form.', errors }, { status: 400 });
  }

  if (!hasWriteAccess()) {
    // Don't drop the lead silently: make it findable in the logs and tell the
    // visitor the truth rather than showing a fake success state.
    console.error('[contact] SANITY_WRITE_TOKEN missing — lead not stored:', { name, email });
    return Response.json(
      { error: 'The form is not configured yet. Please email meetayyab@gmail.com directly.' },
      { status: 503 }
    );
  }

  try {
    await createLead({
      name,
      email,
      company: clean(body.company, 160),
      projectType: clean(body.projectType, 60),
      budget: clean(body.budget, 60),
      message,
      sourceUrl: clean(body.sourceUrl, 500),
      sourceLabel: clean(body.sourceLabel, 120),
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contact] failed to store lead:', err);
    return Response.json(
      { error: 'Something went wrong saving that. Please email meetayyab@gmail.com directly.' },
      { status: 500 }
    );
  }
}
