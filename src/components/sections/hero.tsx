import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

import TayyabHeadshot from '../../../public/images/tayyab-headshot.jpg';
import SocialIcons from '@/components/data-display/social-icons';
import Button from '@/components/general/button';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';

const HeroSection = () => {
  return (
    <Container id="hero">
      <div className="flex flex-col gap-12 md:flex-row">
        {/* Image */}
        <div className="flex items-center justify-center md:order-last md:flex-grow md:justify-end">
          <div className="relative h-[300px] w-[280px] md:h-[360px] md:w-[320px]">
            <Image
              src={TayyabHeadshot}
              alt="Muhammad Tayyab — Full Stack Developer from Lahore, Pakistan"
              className="absolute z-10 h-[280px] w-[240px] border-8 border-gray max-md:left-5 md:left-0 md:top-0 md:h-[320px] md:w-[280px]"
              style={{ objectFit: 'cover' }}
            ></Image>
            <div className="absolute h-[280px] w-[280px] border-8 border-transparent bg-gray-200 max-md:top-5 md:bottom-0 md:right-0 md:h-[320px] md:w-[280px]"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex max-w-3xl flex-grow flex-col justify-center gap-8 md:order-first md:items-start md:justify-center 2xl:gap-12">
          <div className="flex flex-col gap-2">
            <Typography variant="h1">
              Hi, I&apos;m
              <br />
              Muhammad Tayyab{' '}
              <span className="inline-block animate-waving-hand">👋</span>
            </Typography>
            <Typography>
              Muhammad Tayyab is a Full Stack and Mobile Developer in Lahore,
              Pakistan, with expertise in Angular, React.js, React Native,
              SwiftUI, and Node.js. With over three years of experience, he
              builds efficient backends and user-friendly, responsive interfaces
              — and is available for hire on freelance web and mobile projects.
              His work spans designing intuitive applications and managing
              databases with MySQL, PostgreSQL, and MongoDB, with a focus on
              quality and performance.
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <MapPin className="stroke-gray-600" aria-hidden="true" />
              <Typography>Lahore, Pakistan</Typography>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </span>
              </div>
              <Typography>Available for hire on freelance projects</Typography>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href="/#contact">Hire me</Link>
            </Button>
            <SocialIcons />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
