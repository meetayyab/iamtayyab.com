'use client';

import { useId, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

import Tag from '@/components/data-display/tag';
import Button from '@/components/general/button';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';
import Link from '@/components/navigation/link';
import { HIRE_FAQS } from '@/lib/seo';
import { mergeClasses } from '@/lib/utils';

const HireFaqSection = () => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <Container id="faq" className="bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="self-center">
          <Tag label="FAQ" />
        </div>
        <Typography variant="h2" className="text-center">
          Hiring FAQ
        </Typography>
        <Typography variant="subtitle" className="max-w-xl text-center">
          Quick answers if you are looking to hire Muhammad Tayyab for full stack
          or mobile development.
        </Typography>
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray shadow-md dark:border-gray-300 dark:bg-gray-100 dark:shadow-2xl">
          {HIRE_FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div
                key={item.question}
                className={mergeClasses(
                  'border-b border-gray-100 last:border-b-0 dark:border-gray-300',
                  isOpen && 'bg-violet-50/50 dark:bg-violet-500/5'
                )}
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className={mergeClasses(
                      'flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors md:px-6',
                      'hover:bg-violet-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500 dark:hover:bg-violet-500/10',
                      isOpen && 'border-l-4 border-l-violet-500'
                    )}
                  >
                    <span className="text-base font-semibold leading-snug text-gray-900 md:text-lg">
                      {item.question}
                    </span>
                    <span
                      className={mergeClasses(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-gray text-gray-600 transition-all duration-300 dark:border-gray-300 dark:bg-gray-50',
                        isOpen &&
                          'rotate-180 border-violet-200 bg-violet-100 text-violet-700 dark:border-violet-400/40 dark:bg-violet-500/20 dark:text-violet-300'
                      )}
                      aria-hidden="true"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={mergeClasses(
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden">
                    <p
                      className={mergeClasses(
                        'm-0 px-5 pb-5 text-[15px] leading-relaxed text-gray-600 md:px-6',
                        isOpen && 'border-l-4 border-l-violet-500'
                      )}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-violet-200 bg-gradient-to-br from-violet-50/90 via-gray to-indigo-50/60 px-6 py-8 text-center shadow-sm dark:border-violet-400/30 dark:from-violet-500/10 dark:via-gray-100 dark:to-indigo-500/5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex max-w-md flex-col gap-2">
            <Typography variant="h3" className="text-lg">
              Still have a question?
            </Typography>
            <Typography className="text-gray-600">
              Tell me about the product, timeline, and stack — I usually reply
              within a day.
            </Typography>
          </div>
          <Button asChild>
            <Link href="/#contact" noCustomization>
              Get in touch
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default HireFaqSection;
