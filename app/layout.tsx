import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Pimp My Meta',
    template: '%s | Pimp My Meta',
  },
  description: SITE_CONFIG.description,
  keywords: ['Solana', 'DeFi', 'Token Migration', 'Meme Rotation', 'Meta Surfing', 'Crypto', 'PMM'],
  authors: [{ name: 'Pimp My Meta' }],
  creator: 'Pimp My Meta',
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: 'Pimp My Meta',
    description: SITE_CONFIG.description,
    siteName: 'Pimp My Meta',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Pimp My Meta - Surf the meta. Rotate fast. Stay ahead.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pimp My Meta',
    description: SITE_CONFIG.description,
    images: ['/og.png'],
    creator: '@pimpmymeta',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
