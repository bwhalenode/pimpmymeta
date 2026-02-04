'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, ArrowRightLeft, ExternalLink, Gift } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatTokenAmount, sleep } from '@/lib/utils';
import {
  getCurrentToken,
  getNextToken,
  getMigrationWindow,
  getMigrationPhaseLabel,
  MOCK_VAULT_STATE,
} from '@/lib/meta/mockMetas';
import { MIGRATION_PHASES, SOLANA_CONFIG } from '@/lib/constants';

interface MigrationStatusStepProps {
  depositedAmount: number;
  onBack: () => void;
  onComplete: () => void;
}

const MigrationStatusStep: FC<MigrationStatusStepProps> = ({
  depositedAmount,
  onBack,
  onComplete,
}) => {
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [txSignature, setTxSignature] = useState('');

  const currentToken = getCurrentToken();
  const nextToken = getNextToken();
  const migrationWindow = getMigrationWindow();

  const isMigrating = migrationWindow.phase === MIGRATION_PHASES.MIGRATING;
  const isCompleted = migrationWindow.phase === MIGRATION_PHASES.COMPLETED;

  // Mock conversion rate (replace with actual oracle/AMM data)
  const conversionRate = 1.02; // Example: 1 current token = 1.02 next tokens
  const estimatedReceive = depositedAmount * conversionRate;
  const feeBps = SOLANA_CONFIG.feeBps;
  const feeAmount = feeBps > 0 ? (estimatedReceive * feeBps) / 10000 : 0;
  const finalAmount = estimatedReceive - feeAmount;

  const handleClaim = async () => {
    setClaiming(true);

    // TODO: Replace with actual claim transaction
    console.log('[DEMO] Claiming new tokens...');
    await sleep(2000);

    setTxSignature('5' + 'x'.repeat(87));
    setClaimed(true);
    setClaiming(false);
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
          <div
            className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isCompleted && !claimed
                ? 'bg-green-500/20'
                : isMigrating
                ? 'bg-primary/10'
                : 'bg-muted'
            }`}
          >
            {isMigrating ? (
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            ) : isCompleted && !claimed ? (
              <Gift className="h-10 w-10 text-green-400" />
            ) : claimed ? (
              <CheckCircle className="h-10 w-10 text-green-400" />
            ) : (
              <ArrowRightLeft className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
          <h2 className="text-3xl font-bold mb-2">Migration Status</h2>
          <p className="text-muted-foreground">
            {isMigrating
              ? 'Migration in progress...'
              : isCompleted && !claimed
              ? 'Ready to claim your new tokens!'
              : claimed
              ? 'Successfully claimed!'
              : 'Waiting for migration to start'}
          </p>
        </div>

        {/* Migration Phase Status */}
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold">Current Phase</span>
            <Badge
              variant={
                isCompleted ? 'success' : isMigrating ? 'primary' : 'muted'
              }
            >
              {getMigrationPhaseLabel(migrationWindow.phase)}
            </Badge>
          </div>

          {/* Migration Progress Steps */}
          <div className="space-y-3">
            <ProgressItem
              label="Deposits Closed"
              completed={migrationWindow.phase !== MIGRATION_PHASES.DEPOSITS_OPEN}
              active={migrationWindow.phase === MIGRATION_PHASES.DEPOSITS_CLOSED}
            />
            <ProgressItem
              label="Swapping Tokens"
              completed={isCompleted}
              active={isMigrating}
            />
            <ProgressItem
              label="Ready to Claim"
              completed={claimed}
              active={isCompleted && !claimed}
            />
          </div>
        </div>

        {/* Token Conversion Summary */}
        <div className="bg-primary/10 border border-primary/50 rounded-lg p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <div className="text-center flex-1">
              <p className="text-xs text-muted-foreground mb-1">You Deposited</p>
              <p className="text-xl font-bold text-foreground">
                {formatTokenAmount(depositedAmount)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {currentToken.ticker}
              </p>
            </div>

            <ArrowRightLeft className="h-6 w-6 text-primary flex-shrink-0 mx-4" />

            <div className="text-center flex-1">
              <p className="text-xs text-muted-foreground mb-1">You Receive</p>
              <p className="text-xl font-bold text-primary">
                ~{formatTokenAmount(finalAmount)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {nextToken?.ticker || 'New Token'}
              </p>
            </div>
          </div>

          {/* Fee Display */}
          {feeBps > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Protocol Fee ({feeBps / 100}%)</span>
              <span className="font-mono">-{formatTokenAmount(feeAmount)}</span>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Actual amount may vary based on final swap execution and market conditions
          </p>
        </div>

        {/* Vault Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Total Deposited (All Users)</p>
            <p className="text-lg font-bold">{formatTokenAmount(MOCK_VAULT_STATE.totalDeposited)}</p>
          </div>
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Participants</p>
            <p className="text-lg font-bold">{MOCK_VAULT_STATE.userCount}</p>
          </div>
        </div>

        {/* Transaction Signature */}
        {txSignature && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-6"
          >
            <p className="text-sm font-semibold text-green-400 mb-2">
              Claim Successful!
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs font-mono text-muted-foreground truncate flex-1">
                {txSignature}
              </p>
              <a
                href={`https://solscan.io/tx/${txSignature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1 text-xs flex-shrink-0"
              >
                View
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          {!claimed && (
            <Button variant="outline" onClick={onBack} size="lg" className="flex-1">
              Back to Position
            </Button>
          )}

          {isCompleted && !claimed && (
            <Button onClick={handleClaim} disabled={claiming} size="lg" className="flex-1">
              {claiming ? 'Claiming...' : 'Claim New Tokens'}
            </Button>
          )}

          {claimed && (
            <Button onClick={onComplete} size="lg" className="w-full">
              Complete
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

interface ProgressItemProps {
  label: string;
  completed: boolean;
  active: boolean;
}

const ProgressItem: FC<ProgressItemProps> = ({ label, completed, active }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
          completed
            ? 'bg-green-500/20 border-2 border-green-500'
            : active
            ? 'bg-primary/20 border-2 border-primary'
            : 'bg-background border-2 border-border'
        }`}
      >
        {completed ? (
          <CheckCircle className="h-4 w-4 text-green-400" />
        ) : active ? (
          <Loader2 className="h-4 w-4 text-primary animate-spin" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-muted" />
        )}
      </div>
      <span
        className={`text-sm ${
          active || completed ? 'text-foreground font-medium' : 'text-muted-foreground'
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default MigrationStatusStep;
