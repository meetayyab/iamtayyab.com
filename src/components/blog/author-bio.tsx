import Link from 'next/link';
import { SOCIAL_LINKS } from '@/lib/data';
import Typography from '@/components/general/typography';

const AuthorBio = () => {
  return (
    <aside className="mt-12 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white shadow-sm">
          T
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div>
            <Typography variant="h3" className="text-lg">
              Written by Muhammad Tayyab
            </Typography>
            <Typography className="mt-1 text-sm text-gray-600">
              Full Stack and Mobile Developer in Lahore, Pakistan. Builds with
              Angular, React.js, React Native, SwiftUI, and Node.js. Available
              for freelance web and mobile projects.
            </Typography>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/#contact"
              className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700 transition-colors hover:border-violet-300 hover:bg-violet-100"
            >
              Contact
            </Link>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-200 bg-gray px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-violet-300 hover:text-violet-700"
              >
                {social.label === 'Twitter / X' ? 'X' : social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AuthorBio;
