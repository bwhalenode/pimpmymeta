'use client';

import Link from 'next/link';
import { Copy, ExternalLink, TrendingUp, Clock } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getCurrentToken, getNextToken, getMigrationWindow } from '@/lib/meta/mockMetas';
import { EXTERNAL_LINKS } from '@/lib/constants';
import CountdownTimer from '@/components/meta/CountdownTimer';

export default function CurrentTokenPage() {
  const currentToken = getCurrentToken();
  const nextToken = getNextToken();
  const migrationWindow = getMigrationWindow();

  return (
    <div className="py-20 bg-gradient-to-b from-background via-card to-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 text-6xl">
            {currentToken.emoji}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Current Token
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This is the active token in the migration vault. Deposit now to participate in the next meta.
          </p>
        </div>

        {/* Current Token Card */}
        <section className="mb-16">
          <Card glow className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-3xl">{currentToken.name}</CardTitle>
                <Badge variant="success">ACTIVE TOKEN</Badge>
              </div>
              <CardDescription className="text-lg">
                <span className="font-mono text-primary">{currentToken.ticker}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{currentToken.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
                  <p className="text-lg font-bold text-primary">{currentToken.marketCap}</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">24h Volume</p>
                  <p className="text-lg font-bold text-primary">{currentToken.volume24h}</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">24h Change</p>
                  <p className={`text-lg font-bold ${
                    (currentToken.priceChange24h || 0) > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {currentToken.priceChange24h?.toFixed(2)}%
                  </p>
                </div>
              </div>

              {/* Contract Address */}
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <p className="text-xs text-muted-foreground mb-2">Contract Address</p>
                <div className="flex items-center gap-3">
                  <code className="flex-1 font-mono text-sm text-primary break-all">
                    {currentToken.contractAddress}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(currentToken.contractAddress)}
                    className="flex-shrink-0 p-2 hover:bg-primary/10 rounded transition-colors"
                    title="Copy address"
                  >
                    <Copy className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <a
                    href={`https://solscan.io/token/${currentToken.contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 hover:bg-primary/10 rounded transition-colors"
                    title="View on Solscan"
                  >
                    <ExternalLink className="h-5 w-5 text-muted-foreground" />
                  </a>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-2 gap-4">
                <Link href="/vault">
                  <Button size="lg" className="w-full">
                    Deposit to Vault
                  </Button>
                </Link>
                <a
                  href={`${EXTERNAL_LINKS.jupiter}${currentToken.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="w-full">
                    Buy on Jupiter
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Next Token */}
        {nextToken && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Next Migration Target</h2>
            <Card hover>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{nextToken.emoji}</span>
                    <div>
                      <CardTitle className="text-2xl">{nextToken.name}</CardTitle>
                      <CardDescription>
                        <span className="font-mono">{nextToken.ticker}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="primary">NEXT META</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{nextToken.description}</p>

                {/* Migration Countdown */}
                {migrationWindow.migrationStartsAt && (
                  <div className="bg-primary/10 border border-primary/50 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                      <h3 className="text-lg font-semibold">Migration Timeline</h3>
                    </div>
                    <CountdownTimer
                      targetDate={migrationWindow.migrationStartsAt}
                      label="Migration Starts In"
                    />
                  </div>
                )}

                {/* Next Token Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
                    <p className="text-sm font-bold">{nextToken.marketCap}</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">24h Volume</p>
                    <p className="text-sm font-bold">{nextToken.volume24h}</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">24h Change</p>
                    <p className={`text-sm font-bold ${
                      (nextToken.priceChange24h || 0) > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {nextToken.priceChange24h?.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* How to Buy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How to Buy Current Token</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hover>
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <CardTitle>Raydium</CardTitle>
                  <Badge variant="primary">DEX</Badge>
                </div>
                <CardDescription>
                  Trade directly on Raydium for best liquidity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={`${EXTERNAL_LINKS.raydium}?inputMint=sol&outputMint=${currentToken.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full group">
                    Buy on Raydium
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card hover>
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <CardTitle>Jupiter</CardTitle>
                  <Badge variant="secondary">Aggregator</Badge>
                </div>
                <CardDescription>
                  Get the best price across all Solana DEXs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={`${EXTERNAL_LINKS.jupiter}${currentToken.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full group">
                    Buy on Jupiter
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Quick Start Guide
                </h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Get a Solana wallet (Phantom, Solflare, etc.)</li>
                  <li>2. Fund your wallet with SOL</li>
                  <li>3. Go to Jupiter or Raydium</li>
                  <li>4. Swap SOL for {currentToken.ticker}</li>
                  <li>5. Deposit to vault for automated migration</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Chart Placeholder */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Live Chart</h2>
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-muted-foreground mb-4">
                    Chart embed will be added here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Integrate DexScreener, Birdeye, or similar chart widget
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
