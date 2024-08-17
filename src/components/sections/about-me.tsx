import Image from 'next/image';

import TayyabFullPose from '/public/images/tayyab-full-pose.jpg';
import Tag from '@/components/data-display/tag';
import Container from '@/components/layout/container';
import Typography from '@/components/general/typography';
import Link from '@/components/navigation/link';
import { EXTERNAL_LINKS } from '@/lib/data';

const AboutMeSection = () => {
  return (
    <Container className="bg-gray-50" id="about">
      <div className="self-center">
        <Tag label="About me" />
      </div>

      <div className="flex w-full flex-col justify-between gap-12 md:flex-row">
        {/* Image */}
        <div className="flex justify-center md:order-first md:justify-end">
          <div className="relative h-[380px] w-[320px] md:h-[460px] md:w-[380px] lg:h-[520px] lg:w-[440px]">
            <Image
              src={TayyabFullPose}
              alt="Fullpose of Tayyab"
              className="absolute z-10 h-[360px] w-[280px] border-8 border-gray-50 max-md:left-5 md:right-0 md:top-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]"
              style={{ objectFit: 'cover' }}
            ></Image>
            <div className="absolute h-[360px] w-[320px] border-8 border-transparent bg-gray-200 max-md:top-5 md:bottom-0 md:left-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex max-w-xl flex-col gap-6">
          <Typography variant="h3">
            Curious about me? Here you have it:
          </Typography>
          <Typography>
            I&apos;m a dedicated,{' '}
            <Link
              noCustomization
              externalLink
              withUnderline
              href={EXTERNAL_LINKS.GITHUB}
            >
              Full Stack Developer
            </Link>{' '}
            with a strong focus on creating seamless user experiences and
            efficient web solutions. Specializing in Angular, React.js, and
            Node.js, I bring both the technical and visual aspects of digital
            products to life. I&apos;m passionate about developing intuitive,
            responsive interfaces and writing clean, high-performance code. My
            commitment to delivering top-quality work drives me to constantly
            innovate and excel in every project.
          </Typography>
          <Typography>
            I began my web development career in 2022, and since then, I&apos;ve
            continually expanded my skills. Each project has fueled my growth as
            a full stack developer, driving my passion for creating efficient,
            user-friendly web applications.
          </Typography>
          <Typography>
            I&apos;m constantly evolving by tackling new challenges and
            expanding my knowledge daily. I&apos;m passionate about
            understanding user behavior and creating web applications that
            deliver valuable experiences for all users.
          </Typography>
          <Typography>
            I am very much a progressive thinker and enjoy working on products
            end to end, from ideation all the way to development.
          </Typography>
          <Typography>Finally, some quick bits about me.</Typography>
          <div className="flex flex-col gap-2 md:flex-row md:gap-6">
            <ul className="flex list-inside list-disc flex-col gap-2">
              <Typography component="li">
              BS in Computer Science
              </Typography>
              <Typography component="li">Freelancer</Typography>
            </ul>
            <ul className="flex list-inside list-disc flex-col gap-2">
              <Typography component="li">Full Stack Developer</Typography>
              <Typography component="li">Problem Solver</Typography>
            </ul>
          </div>
          <Typography>
            One last thing, I&apos;m available for freelance work, so feel free
            to reach out and say hello! I promise I don&apos;t bite 😉
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default AboutMeSection;
