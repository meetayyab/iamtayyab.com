import Script from 'next/script';
import { Inter } from 'next/font/google';
import { Metadata, Viewport } from 'next';

import './globals.css';
import Header from '@/components/layout/header';
import { Providers } from '@/lib/providers';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

const title = 'Muhammad Tayyab | Full Stack Developer From Peshawar, Pakistan.';
const description =
  'A dedicated Full Stack Developer who specializes in building web applications using React.js, Angular & Node.js, from Peshawar, Pakistan.';
const url = 'https://www.iamtayyab.com';

const GTM_ID = 'GTM-P5F4JJ5T';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  keywords: [
    'Software Developer',
    'Full Stack Developer',
    'Muhammad Tayyab',
    'Tayyab',
    'Web Developer',
    'JavaScript Developer',
    'React',
    'Node',
  ],
  creator: 'Muhammad Tayyab',
  alternates: {
    canonical: url,
  },
  openGraph: {
    type: 'website',
    url,
    title,
    description,
    siteName: title,
    locale: 'en_US',
    images: [
      {
        url: '/images/open-graph-tayyab.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@iamtayyabx',
    site: '@iamtayyabx',
    images: '/images/open-graph-tayyab.png',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className={`${inter.className} bg-gray text-gray-600 antialiased`}>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>
          <Header />
          <main className="flex min-h-screen w-full flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
