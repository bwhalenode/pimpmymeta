'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Info, AlertTriangle, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatTokenAmount } from '@/lib/utils';
import { getCurrentToken, getMigrationWindow, areDepositsAllowed, getMigrationPhaseLabel } from '@/lib/meta/mockMetas';
import CountdownTimer from '@/components/meta/CountdownTimer';
import { SOLANA_CONFIG } from '@/lib/constants';

interface DepositCurrentTokenStepProps {
  onNext: (amount: number) => void;
  onBack: () => void;
}

const DepositCurrentTokenStep: FC<DepositCurrentTokenStepProps> = ({ onNext, onBack }) => {
  const [amount, setAmount] = useState<string>('');

  const currentToken = getCurrentToken();
  const migrationWindow = getMigrationWindow();
  const depositsAllowed = areDepositsAllowed(migrationWindow.phase);

  // Mock balance - Replace with actual token balance fetch
  const mockBalance = 10000;

  const handleAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleMaxClick = () => {
    setAmount(mockBalance.toString());
  };

  const handleContinue = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && numAmount <= mockBalance) {
      onNext(numAmount);
    }
  };

  const isValid = amount && parseFloat(amount) > 0 && parseFloat(amount) <= mockBalance && depositsAllowed;

  const feeBps = SOLANA_CONFIG.feeBps;
  const feePercent = feeBps / 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
            {currentToken.emoji || '💰'}
          </div>
          <h2 className="text-3xl font-bold mb-2">Deposit Current Token</h2>
          <p className="text-muted-foreground">
            Deposit {currentToken.ticker} to participate in the next migration
          </p>
        </div>

        {/* Migration Status */}
        <div className={`rounded-lg p-4 mb-6 ${
          depositsAllowed ? 'bg-green-500/10 border border-green-500/50' : 'bg-red-500/10 border border-red-500/50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">
              {depositsAllowed ? '✅ Deposits Open' : '🔒 Deposits Closed'}
            </span>
            <Badge variant={depositsAllowed ? 'success' : 'danger'}>
              {getMigrationPhaseLabel(migrationWindow.phase)}
            </Badge>
          </div>

          {depositsAllowed && migrationWindow.depositsCloseAt && (
            <div className="mt-4">
              <CountdownTimer
                targetDate={migrationWindow.depositsCloseAt}
                label="Deposits Close In"
              />
            </div>
          )}
        </div>

        {/* Token Info */}
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Current Token</span>
            <span className="font-bold">{currentToken.name} ({currentToken.ticker})</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Contract Address</span>
            <span className="text-xs font-mono">{currentToken.contractAddress.slice(0, 8)}...</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Your Balance</span>
            <span className="text-sm font-bold">{formatTokenAmount(mockBalance)}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Amount to Deposit</label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              disabled={!depositsAllowed}
              className="w-full px-4 py-4 pr-20 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-2xl font-bold disabled:opacity-50"
            />
            <button
              onClick={handleMaxClick}
              disabled={!depositsAllowed}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-primary/20 text-primary rounded text-sm font-semibold hover:bg-primary/30 transition-colors disabled:opacity-50"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Fee Display */}
        {feeBps > 0 && (
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Protocol Fee</span>
              </div>
              <span className="text-sm font-bold">{feePercent}%</span>
            </div>
          </div>
        )}

        {/* Important Info */}
        <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <Clock className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-400 mb-1">How It Works</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Deposit current token during the deposit window</li>
                <li>• Withdraw anytime before migration starts</li>
                <li>• Once migration starts, funds are locked temporarily</li>
                <li>• After migration completes, claim your new tokens</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Warnings */}
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-yellow-400 mb-1">Important</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Deposits are non-custodial but locked during migration</li>
                <li>• Migration is triggered by team (for now)</li>
                <li>• Output depends on market conditions and slippage</li>
                <li>• Always verify contract addresses before depositing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} size="lg" className="flex-1">
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!isValid}
            size="lg"
            className="flex-1"
          >
            {depositsAllowed ? 'Deposit Tokens' : 'Deposits Closed'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default DepositCurrentTokenStep;
