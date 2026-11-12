/**
 * Conversion-path configuration.
 *
 * BOOKING_URL is read from NEXT_PUBLIC_BOOKING_URL (a Cal.com / Calendly link).
 * When it is unset the booking buttons are simply not rendered, so an unset value
 * degrades to the contact form rather than to a dead link.
 */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || '';

export const CONTACT_EMAIL = 'meetayyab@gmail.com';

/** Where "work with me" CTAs point. Audience-neutral by design. */
export const WORK_WITH_ME_HREF = '/#contact';

/** The hire hub, for readers who want the detailed offer before enquiring. */
export const HIRE_HUB_HREF = '/full-stack-developer-pakistan';
