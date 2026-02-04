import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import WhyWins from '@/components/home/WhyWins';
import TrustSection from '@/components/home/TrustSection';
import CurrentMetaBanner from '@/components/meta/CurrentMetaBanner';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Surf the meta. Keep the shrimp. Trustless token migrations on Solana.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <CurrentMetaBanner />
      <WhyWins />
      <TrustSection />
    </>
  );
}
