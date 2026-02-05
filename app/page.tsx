import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import WhyWins from '@/components/home/WhyWins';
import TrustSection from '@/components/home/TrustSection';
import CurrentMetaBanner from '@/components/meta/CurrentMetaBanner';

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
