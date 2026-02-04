import { Metadata } from 'next';
import Link from 'next/link';
import { Wallet, CircleDollarSign, Lock, Gift, Clock, AlertTriangle } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how the Pimp My Meta migration vault works and how to participate.',
};

const steps = [
  {
    icon: Wallet,
    title: 'Connect & Deposit',
    description: 'Connect your Solana wallet and deposit the current trending token during the deposit window.',
    details: [
      'Deposit window opens before each migration',
      'Typical window: 1-24 hours (announced in advance)',
      'Deposit any amount of the current token',
      'No minimum or maximum limits',
    ],
  },
  {
    icon: CircleDollarSign,
    title: 'Withdraw Anytime',
    description: 'Your position is unlocked until migration starts. Withdraw anytime before the swap executes.',
    details: [
      'Full control of your funds before migration',
      'Instant withdrawal (just gas fees)',
      'Change your mind? Pull out anytime',
      'Lock happens only when migration starts',
    ],
  },
  {
    icon: Lock,
    title: 'Migration Executes',
    description: 'When the team triggers migration, vault automatically swaps: current token → SOL → next meta token.',
    details: [
      'Triggered manually by team (for now)',
      'All user funds swapped together (better pricing)',
      'Executes via Raydium/Jupiter on-chain',
      'Locked during swap (~1-10 minutes)',
    ],
  },
  {
    icon: Gift,
    title: 'Claim New Tokens',
    description: 'After migration completes, claim your new meta tokens. Simple, automated, trustless.',
    details: [
      'Claim available immediately after swap',
      'New tokens credited to your vault position',
      'Withdraw to your wallet anytime',
      'Position becomes the new current token',
    ],
  },
];

const migrationPhases = [
  {
    phase: 'Deposits Open',
    color: 'text-green-400',
    icon: Clock,
    description: 'Users can deposit current token and withdraw anytime.',
  },
  {
    phase: 'Deposits Closed',
    color: 'text-yellow-400',
    icon: AlertTriangle,
    description: 'Window closed. Waiting for migration to be triggered.',
  },
  {
    phase: 'Migrating',
    color: 'text-primary',
    icon: Lock,
    description: 'Swap executing on-chain. Funds temporarily locked.',
  },
  {
    phase: 'Completed',
    color: 'text-green-400',
    icon: Gift,
    description: 'New tokens ready to claim. Withdraw anytime.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="py-20 bg-gradient-to-b from-background via-card to-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              How It Works
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, automated meta migrations. Deposit once, surf the waves.
          </p>
        </div>

        {/* 4 Steps */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">The Migration Flow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} hover className="relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg glow-primary">
                    {index + 1}
                  </div>
                  <CardHeader className="pt-6">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary flex-shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Migration Phases */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Migration Phases</h2>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                {migrationPhases.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${item.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold mb-1 ${item.color}`}>
                          {item.phase}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Key Rules */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Key Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-green-400">✓ What You Can Do</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Deposit current token during open window</li>
                  <li>• Withdraw your position before migration starts</li>
                  <li>• Claim new tokens after migration completes</li>
                  <li>• Verify all transactions on Solscan</li>
                  <li>• DYOR on the next meta token</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-red-400">✗ What You Can't Do</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Withdraw during active migration (locked)</li>
                  <li>• Deposit after window closes</li>
                  <li>• Control which token is chosen as next meta</li>
                  <li>• Guarantee profit (market risk exists)</li>
                  <li>• Reverse a completed migration</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Fees */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Fees</h2>
          <Card glow>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <p className="text-6xl font-bold text-primary mb-2">0%</p>
                <p className="text-xl text-muted-foreground">Protocol Fee (for now)</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Currently, there is <strong className="text-foreground">zero protocol fee</strong>.
                You only pay standard Solana network fees (~0.000005 SOL per transaction).
              </p>
              <p className="text-xs text-muted-foreground">
                A small protocol fee may be introduced in the future to sustain development.
                Any fee will be clearly displayed in the UI before you deposit.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* What This Protects / Doesn't Protect */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">What This Protects vs. Doesn't</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-green-500/50">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Lock className="h-6 w-6" />
                  What the Vault DOES Protect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Custody risk:</strong> Devs cannot withdraw your deposited funds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Transparency:</strong> All swaps happen on-chain, publicly verifiable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Control:</strong> Withdraw anytime before migration starts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>Automation:</strong> No manual trading, swaps execute via contract</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/50">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  What the Vault DOESN'T Protect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span><strong>Market risk:</strong> Token prices can crash, you can lose value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span><strong>Slippage:</strong> Large swaps may get worse prices than expected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span><strong>New token rug:</strong> Next meta token could be a scam/rug</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span><strong>MEV/sandwich:</strong> Bots can frontrun swaps in some conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span><strong>Smart contract bugs:</strong> Code audited but risk never zero</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-yellow-400">Always DYOR:</strong> Research the next meta token
              before depositing. The vault makes migrations easier, but it doesn't eliminate crypto
              risk. Never invest more than you can afford to lose.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link href="/vault">
            <Button size="lg" className="mb-4">
              Open Vault to Deposit
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Ready to surf the meta? Connect your wallet and deposit.
          </p>
        </div>
      </div>
    </div>
  );
}
