'use client';

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { type Meta } from '@/lib/meta/mockMetas';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import CountdownTimer from './CountdownTimer';

interface MetaCardProps {
  meta: Meta;
  index: number;
}

const MetaCard: FC<MetaCardProps> = ({ meta, index }) => {
  const statusConfig = {
    current: { badge: 'success', text: 'CURRENT META' },
    candidate: { badge: 'primary', text: 'CANDIDATE' },
    past: { badge: 'muted', text: 'PAST META' },
  };

  const config = statusConfig[meta.status];
  const priceChange = meta.priceChange24h || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card hover glow={meta.status === 'current'} className="h-full">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="text-4xl">
              {meta.status === 'current' && '🐧'}
              {meta.status === 'candidate' && meta.name === 'Frog' && '🐸'}
              {meta.status === 'candidate' && meta.name === 'Cat' && '🐱'}
              {meta.status === 'past' && '🐕'}
            </div>
            <Badge variant={config.badge as any}>{config.text}</Badge>
          </div>
          <CardTitle>{meta.name} Meta</CardTitle>
          <CardDescription>
            <span className="font-mono">{meta.ticker}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{meta.description}</p>

          {/* Pimped Version */}
          <div className="bg-primary/10 border border-primary/50 rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground mb-1">PIMPED VERSION</p>
            <p className="font-bold text-primary">
              {meta.pimpedName} ({meta.pimpedTicker})
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Market Cap</p>
              <p className="text-sm font-bold">{meta.marketCap}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">24h Volume</p>
              <p className="text-sm font-bold">{meta.volume24h}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <p className="text-xs text-muted-foreground">24h Change:</p>
            <div
              className={`flex items-center gap-1 ${
                priceChange > 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {priceChange > 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="text-sm font-bold">{priceChange.toFixed(2)}%</span>
            </div>
          </div>

          {/* Countdown for Candidates */}
          {meta.status === 'candidate' && meta.migrationDate && (
            <div className="mb-4">
              <CountdownTimer targetDate={meta.migrationDate} label="Migration Opens In" />
            </div>
          )}

          {/* Contract Address */}
          <div className="text-xs">
            <p className="text-muted-foreground mb-1">Contract:</p>
            <p className="font-mono text-primary truncate">{meta.contractAddress}</p>
          </div>
        </CardContent>

        <CardFooter className="gap-2">
          <Link href="/vault" className="flex-1">
            <Button
              size="sm"
              className="w-full"
              variant={meta.status === 'current' ? 'primary' : 'outline'}
              disabled={meta.status === 'past'}
            >
              {meta.status === 'past' ? 'Migrated' : 'Migrate Now'}
            </Button>
          </Link>
          <a
            href={`https://dexscreener.com/solana/${meta.contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button size="sm" variant="ghost">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MetaCard;
