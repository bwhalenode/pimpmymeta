'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, ArrowDownLeft } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatTokenAmount } from '@/lib/utils';
import { getCurrentToken, getMigrationWindow, areWithdrawalsAllowed, getMigrationPhaseLabel } from '@/lib/meta/mockMetas';

interface ManagePositionStepProps {
  depositedAmount: number;
  onNext: () => void;
  onBack: () => void;
}

const ManagePositionStep: FC<ManagePositionStepProps> = ({
  depositedAmount,
  onNext,
  onBack,
}) => {
  const [withdrawing, setWithdrawing] = useState(false);

  const currentToken = getCurrentToken();
  const migrationWindow = getMigrationWindow();
  const canWithdraw = areWithdrawalsAllowed(migrationWindow.phase);

  const handleWithdraw = async () => {
    setWithdrawing(true);
    // TODO: Implement actual withdrawal transaction
    console.log('[DEMO] Withdrawing position...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setWithdrawing(false);
    // After successful withdrawal, go back to deposit step
    onBack();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
            <Wallet className="h-10 w-10 text-accent" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Your Vault Position</h2>
          <p className="text-muted-foreground">
            Manage your deposited tokens and prepare for migration
          </p>
        </div>

        {/* Position Summary */}
        <div className="bg-primary/10 border border-primary/50 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-2">Deposited Amount</p>
            <p className="text-4xl font-bold text-primary">
              {formatTokenAmount(depositedAmount)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {currentToken.ticker}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Current Token</p>
              <p className="text-sm font-bold">{currentToken.name}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <Badge variant={canWithdraw ? 'success' : 'warning'}>
                {canWithdraw ? 'Unlocked' : 'Locked'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Migration Status */}
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">Migration Phase</span>
            <Badge variant="muted">
              {getMigrationPhaseLabel(migrationWindow.phase)}
            </Badge>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Withdrawals:</span>
              <span className={canWithdraw ? 'text-green-400' : 'text-red-400'}>
                {canWithdraw ? 'Enabled' : 'Disabled (Migration Active)'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4 mb-6">
          <Button
            variant="outline"
            size="lg"
            onClick={handleWithdraw}
            disabled={!canWithdraw || withdrawing}
            className="w-full group"
          >
            <ArrowDownLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            {withdrawing ? 'Withdrawing...' : 'Withdraw Position'}
          </Button>

          <Button
            size="lg"
            onClick={onNext}
            className="w-full group"
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            View Migration Status
          </Button>
        </div>

        {/* Info */}
        {!canWithdraw && (
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-yellow-400">Locked:</strong> Your position is currently locked
              because migration is in progress. You'll be able to withdraw or claim your new tokens
              once the migration completes.
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default ManagePositionStep;
