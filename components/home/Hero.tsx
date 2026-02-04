'use client';

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import ShrimpEasterEgg from '@/components/ShrimpEasterEgg';

const Hero: FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card py-20 md:py-32">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Surf the meta.
              </span>
              <br />
              <span className="text-foreground">Keep the shrimp.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Trustless token migrations on Solana. Chase the latest meme meta while
              your shrimp stays safe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/vault">
                <Button size="xl" className="group">
                  Open Migration Vault
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/trust">
                <Button size="xl" variant="outline" className="group">
                  <Shield className="mr-2 h-5 w-5" />
                  How It's Trustless
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Fully Audited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>Zero Custody</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <span>Instant Swaps</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Shrimp Visual (Placeholder) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <ShrimpEasterEgg>
              <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
                {/* Placeholder Shrimp Icon - Replace with actual SVG/Image */}
                <div className="w-full h-full rounded-full bg-gradient-primary glow-primary flex items-center justify-center">
                  <span className="text-8xl md:text-9xl">🦐</span>
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card border border-primary rounded-full px-4 py-2 glow-primary">
                  <span className="text-sm font-bold text-primary">
                    Click me 5 times!
                  </span>
                </div>
              </div>
            </ShrimpEasterEgg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
