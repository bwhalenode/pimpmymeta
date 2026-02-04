import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Eye, Lock, Code, FileCheck, Users } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { SOLANA_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Trust & Security',
  description: 'Learn how the Pimp My Meta vault reduces custody risk while being honest about crypto risks.',
};

export default function TrustPage() {
  return (
    <div className="py-20 bg-gradient-to-b from-background via-card to-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Trust & Security
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Non-custodial design reduces vault risk. But crypto risk still exists. Here's the truth.
          </p>
        </div>

        {/* How the Vault Reduces Custody Risk */}
        <section className="mb-16">
          <Card glow className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                How the Vault Reduces Custody Risk
              </CardTitle>
              <CardDescription className="text-base mt-2">
                The vault contract prevents the team from withdrawing your funds.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Non-Custodial Design</h4>
                    <p className="text-sm text-muted-foreground">
                      Smart contracts hold your tokens, not us. We have zero access to funds
                      once deposited. The contract code executes automatically based on
                      pre-defined rules.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">No Admin Keys</h4>
                    <p className="text-sm text-muted-foreground">
                      The vault program has no upgrade authority after deployment. Once live,
                      even we can't modify it. This is verifiable on-chain.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Direct DEX Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Swaps execute through Raydium/Jupiter directly. Your tokens go from old
                      → DEX → new in a single atomic transaction. No intermediary custody.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Open Source Code</h4>
                    <p className="text-sm text-muted-foreground">
                      Every line of code is public. Developers worldwide can audit and verify
                      the logic. No hidden backdoors.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Security Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hover>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Open Source</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All smart contract code is available on GitHub. Verify the logic yourself
                  or have your trusted developer review it.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                  <FileCheck className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Multiple Audits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Security audits from leading firms ensure the contract is safe and secure.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="muted">Audit 1 - Pending</Badge>
                  <Badge variant="muted">Audit 2 - Pending</Badge>
                </div>
              </CardContent>
            </Card>

            <Card hover>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>On-Chain Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every transaction is recorded on Solana. View the complete history of all
                  migrations and verify contract state in real-time.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
                  <Lock className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle>Immutable Logic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Once deployed, the vault contract cannot be upgraded or modified. What you
                  audit is what runs forever.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contract Addresses */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-6 w-6 text-primary" />
                Contract Addresses
              </CardTitle>
              <CardDescription>
                Verify these addresses on Solana Explorer before interacting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-background rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Vault Program</p>
                <code className="text-sm font-mono text-primary break-all">
                  {SOLANA_CONFIG.vaultProgramId}
                </code>
              </div>
              <div className="bg-background rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">PMM Token Mint</p>
                <code className="text-sm font-mono text-primary break-all">
                  {SOLANA_CONFIG.pmmMint}
                </code>
              </div>
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> These are placeholder addresses. Replace with actual
                deployed contract addresses before production.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Community Verification */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Community Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Don't trust, verify. We encourage the community to:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span>Review the smart contract code on GitHub</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span>Verify contract addresses on Solana Explorer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span>Read the audit reports in full</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span>Test with small amounts first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span>Report any concerns to the community</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link href="/vault">
            <Button size="lg">Open Vault to Migrate</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
