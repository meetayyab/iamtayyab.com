import { SOCIAL_LINKS } from '@/lib/data';

const SocialIcons = () => {
  return (
    <div className="flex gap-1">
      {SOCIAL_LINKS.map((socialLink) => (
        <a
          key={socialLink.label}
          href={socialLink.url}
          target="_blank"
          rel="me noopener noreferrer"
          aria-label={socialLink.label}
          className="relative flex items-center justify-center rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:stroke-gray-600 [&_svg]:hover:stroke-gray-700"
        >
          <socialLink.icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
