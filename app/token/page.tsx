'use client';

import { Copy, ExternalLink, TrendingUp } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { TOKENOMICS, SOLANA_CONFIG, EXTERNAL_LINKS } from '@/lib/constants';

export default function TokenPage() {
  return (
    <div className="py-20 bg-gradient-to-b from-background via-card to-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Badge variant="primary" className="text-base px-4 py-2">
              {TOKENOMICS.ticker}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Pimp My Meta Token
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {TOKENOMICS.description}
          </p>
        </div>

        {/* Contract Address */}
        <section className="mb-16">
          <Card glow>
            <CardHeader>
              <CardTitle>Contract Address</CardTitle>
              <CardDescription>Always verify this address before trading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 bg-background rounded-lg p-4">
                <code className="flex-1 font-mono text-sm text-primary break-all">
                  {SOLANA_CONFIG.pmmMint}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(SOLANA_CONFIG.pmmMint)}
                  className="flex-shrink-0 p-2 hover:bg-primary/10 rounded transition-colors"
                  title="Copy address"
                >
                  <Copy className="h-5 w-5 text-muted-foreground" />
                </button>
                <a
                  href={`https://solscan.io/token/${SOLANA_CONFIG.pmmMint}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-2 hover:bg-primary/10 rounded transition-colors"
                  title="View on Solscan"
                >
                  <ExternalLink className="h-5 w-5 text-muted-foreground" />
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                <strong>WARNING:</strong> This is a placeholder address. Replace with actual
                contract address before launch.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Tokenomics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Tokenomics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover>
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">
                  {TOKENOMICS.totalSupply}
                </CardTitle>
                <CardDescription>Total Supply</CardDescription>
              </CardHeader>
            </Card>

            <Card hover>
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-secondary">
                  {TOKENOMICS.decimals}
                </CardTitle>
                <CardDescription>Decimals</CardDescription>
              </CardHeader>
            </Card>

            <Card hover>
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-accent">100%</CardTitle>
                <CardDescription>Liquidity Locked</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Community Airdrop</span>
                    <span className="font-bold">40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Liquidity Pool</span>
                    <span className="font-bold">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Development</span>
                    <span className="font-bold">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Marketing</span>
                    <span className="font-bold">10%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  <strong>Note:</strong> Distribution percentages are placeholder examples.
                  Update with actual tokenomics before launch.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Buy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How to Buy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hover>
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <CardTitle>Raydium</CardTitle>
                  <Badge variant="primary">DEX</Badge>
                </div>
                <CardDescription>
                  Trade directly on Raydium for the best liquidity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href={EXTERNAL_LINKS.raydium} target="_blank" rel="noopener noreferrer">
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
                <a href={EXTERNAL_LINKS.jupiter} target="_blank" rel="noopener noreferrer">
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
                  <li>2. Fund your wallet with SOL (buy from exchanges like Coinbase)</li>
                  <li>3. Go to Raydium or Jupiter</li>
                  <li>4. Paste the current token contract address</li>
                  <li>5. Swap SOL for the current token</li>
                  <li>6. Confirm transaction in your wallet</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Chart Embed */}
        <section className="mb-16">
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

        {/* Utility & Benefits */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Token Utility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hover>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Low Migration Fees</h3>
                <p className="text-sm text-muted-foreground">
                  Vault migrations have minimal fees to sustain the platform
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Governance Rights</h3>
                <p className="text-sm text-muted-foreground">
                  Vote on which new metas to add to the migration vault
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Early Access</h3>
                <p className="text-sm text-muted-foreground">
                  Get priority access to new meta migrations before public launch
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Revenue Share</h3>
                <p className="text-sm text-muted-foreground">
                  Stakers receive a portion of protocol fees from vault migrations
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
