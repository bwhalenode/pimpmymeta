import { Metadata } from 'next';
import VaultFlow from '@/components/vault/VaultFlow';

export const metadata: Metadata = {
  title: 'Migration Vault',
  description: 'Non-custodial vault for automated token migrations on Solana.',
};

export default function VaultPage() {
  return (
    <div className="py-20 bg-gradient-to-b from-background via-card to-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Migration Vault
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deposit the current trending token. Automated migration when the next meta emerges.
          </p>
        </div>

        {/* Vault Flow */}
        <VaultFlow />

        {/* Security Notice */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-muted/30 border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              🔒 What the Vault Protects
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li>
                • <strong>Non-custodial:</strong> Devs cannot withdraw your deposited funds.
                Smart contract enforces rules.
              </li>
              <li>
                • <strong>Withdraw anytime:</strong> Pull your position out before migration
                starts. Locked only during active swap.
              </li>
              <li>
                • <strong>Open Source:</strong> Verify the contract code yourself.
              </li>
              <li>
                • <strong>Does NOT protect against:</strong> Market volatility, slippage,
                new token rugs, or MEV. Always DYOR.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
