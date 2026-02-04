'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { getCurrentMeta, type Meta } from '@/lib/meta/mockMetas';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const CurrentMetaBanner: FC = () => {
  const [currentMeta, setCurrentMeta] = useState<Meta | null>(null);

  useEffect(() => {
    const meta = getCurrentMeta();
    setCurrentMeta(meta || null);
  }, []);

  if (!currentMeta) return null;

  return (
    <section className="py-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Left: Current Meta Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-primary glow-primary flex items-center justify-center text-3xl">
              🐧
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="success">CURRENT META</Badge>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold">
                {currentMeta.name} Meta ({currentMeta.ticker})
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentMeta.description}
              </p>
            </div>
          </div>

          {/* Right: Stats & CTA */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-6 text-center md:text-left">
              <div>
                <p className="text-xs text-muted-foreground">Market Cap</p>
                <p className="text-lg font-bold text-primary">{currentMeta.marketCap}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">24h Volume</p>
                <p className="text-lg font-bold text-primary">{currentMeta.volume24h}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">24h Change</p>
                <p
                  className={`text-lg font-bold ${
                    (currentMeta.priceChange24h || 0) > 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {currentMeta.priceChange24h?.toFixed(2)}%
                </p>
              </div>
            </div>

            <Link href="/meta-tracker">
              <Button variant="outline" className="group">
                View All Metas
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentMetaBanner;
