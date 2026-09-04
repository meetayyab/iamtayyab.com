import Tag from '@/components/data-display/tag';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';
import { HIRE_FAQS } from '@/lib/seo';

const HireFaqSection = () => {
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

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        {HIRE_FAQS.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl border border-gray-100 bg-gray p-6 shadow-sm"
          >
            <Typography variant="h3" className="mb-2 text-lg">
              {item.question}
            </Typography>
            <Typography className="text-gray-600">{item.answer}</Typography>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HireFaqSection;
