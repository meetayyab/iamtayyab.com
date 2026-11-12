/**
 * GTM dataLayer events.
 *
 * Without these, GTM records pageviews and nothing else — there is no way to tell
 * which posts produce enquiries. Every conversion-relevant interaction pushes a
 * named event with enough context to attribute it to a page and a CTA.
 *
 * In GTM, create a Custom Event trigger per event name below, then mark
 * `generate_lead` (and optionally `newsletter_subscribe` / `booking_click`) as
 * conversions in GA4.
 */

type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function push(payload: DataLayerEvent) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** A CTA button or link was clicked. `location` says where on the page it lives. */
export function trackCtaClick(location: string, label: string, destination?: string) {
  push({ event: 'cta_click', cta_location: location, cta_label: label, cta_destination: destination });
}

/** Fired once per form, when the visitor first types into it. */
export function trackFormStart(formName: string) {
  push({ event: 'form_start', form_name: formName });
}

/** A lead was successfully submitted — this is the conversion. */
export function trackLead(formName: string, meta: Record<string, unknown> = {}) {
  push({ event: 'generate_lead', form_name: formName, ...meta });
}

/** The form was submitted but rejected (validation or server error). */
export function trackFormError(formName: string, reason: string) {
  push({ event: 'form_error', form_name: formName, error_reason: reason });
}

export function trackNewsletterSignup(location: string) {
  push({ event: 'newsletter_subscribe', signup_location: location });
}

export function trackBookingClick(location: string) {
  push({ event: 'booking_click', cta_location: location });
}
