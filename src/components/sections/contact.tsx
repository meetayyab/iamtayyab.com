'use client';

import { useState } from 'react';
import { CalendarDays, Copy, Mail, Phone } from 'lucide-react';

import SocialIcons from '@/components/data-display/social-icons';
import Tag from '@/components/data-display/tag';
import ContactForm from '@/components/general/contact-form';
import IconButton from '@/components/general/icon-button';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';
import { trackBookingClick } from '@/lib/analytics';
import { BOOKING_URL } from '@/lib/site';
import { copyTextToClipboard } from '@/lib/utils';

let email = 'meetayyab@gmail.com';
let phone = '+92 3230190586';

type CopyValue = 'email' | 'phone';

const ContactSection = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [copiedValueType, setCopiedValueType] = useState<CopyValue | null>(
    null
  );

  const handleCopyClick = async (text: string, type: CopyValue) => {
    try {
      await copyTextToClipboard(text);
      setIsCopied(true);
      setCopiedValueType(type);
      let timoutId: any = setTimeout(() => {
        setIsCopied(false);
        setCopiedValueType(null);
        clearTimeout(timoutId);
      }, 1500);
    } catch (error) {
      setIsCopied(false);
      setCopiedValueType(null);
      alert('Unable to copy!');
    }
  };

  return (
    <Container id="contact">
      <div className="flex flex-col items-center gap-4">
        <div className="self-center">
          <Tag label="Get in touch" />
        </div>
        <Typography variant="h2" className="text-center">
          Tell me about your project
        </Typography>
        <Typography variant="subtitle" className="max-w-xl text-center">
          Building a web or mobile product and need someone who can ship it end to
          end? Send me the details and I&apos;ll reply with how I&apos;d approach it,
          a rough timeline, and whether I&apos;m the right fit — usually within one
          working day.
        </Typography>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-10">
        <ContactForm sourceLabel="contact-section" className="w-full" />

        {BOOKING_URL && (
          <div className="flex flex-col items-center gap-2">
            <Typography className="text-center text-sm text-gray-500">
              Prefer to talk it through?
            </Typography>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackBookingClick('contact-section')}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-[15px] font-semibold text-gray-800 transition-colors hover:border-violet-300 hover:text-violet-700 dark:border-zinc-700 dark:text-zinc-100"
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Book a 20-minute call
            </a>
          </div>
        )}

        {/* Direct details, for people who would rather not use a form. */}
        <div className="flex w-full flex-col items-center gap-3 border-t border-gray-100 pt-8 dark:border-zinc-800">
          <Typography className="text-center text-sm text-gray-500">
            Or reach me directly
          </Typography>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" aria-hidden="true" />
              <a
                href={`mailto:${email}`}
                className="text-[15px] font-medium text-gray-700 underline-offset-2 hover:text-violet-600 hover:underline dark:text-zinc-200"
              >
                {email}
              </a>
              <IconButton
                size="md"
                onClick={() => handleCopyClick(email, 'email')}
                showTooltip={isCopied && copiedValueType === 'email'}
                tooltipText="Copied!"
                aria-label="Copy email address"
              >
                <Copy aria-hidden="true" />
              </IconButton>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" aria-hidden="true" />
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="text-[15px] font-medium text-gray-700 underline-offset-2 hover:text-violet-600 hover:underline dark:text-zinc-200"
              >
                {phone}
              </a>
              <IconButton
                size="md"
                onClick={() => handleCopyClick(phone.replace(/\s/g, ''), 'phone')}
                showTooltip={isCopied && copiedValueType === 'phone'}
                tooltipText="Copied!"
                aria-label="Copy phone number"
              >
                <Copy aria-hidden="true" />
              </IconButton>
            </div>
          </div>
          <div className="mt-2 flex flex-col items-center gap-2">
            <SocialIcons />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactSection;
