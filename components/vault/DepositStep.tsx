'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Info, AlertTriangle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatTokenAmount } from '@/lib/utils';

interface DepositStepProps {
  selectedToken: string;
  onNext: (amount: number, slippage: number) => void;
  onBack: () => void;
}

const DepositStep: FC<DepositStepProps> = ({ selectedToken, onNext, onBack }) => {
  const [amount, setAmount] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(100); // 1% in basis points

  // Mock balance - Replace with actual token balance fetch
  const mockBalance = 10000;

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimals
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
      onNext(numAmount, slippage);
    }
  };

  const isValid = amount && parseFloat(amount) > 0 && parseFloat(amount) <= mockBalance;

  // Calculate estimated output (mock calculation)
  const estimatedOutput = amount ? parseFloat(amount) * 0.98 : 0; // 2% estimated slippage

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
            <Coins className="h-10 w-10 text-accent" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Deposit Amount</h2>
          <p className="text-muted-foreground">
            Enter the amount you want to migrate
          </p>
        </div>

        {/* Token Info */}
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Old Token</span>
            <span className="text-sm font-mono">{selectedToken.slice(0, 8)}...</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Your Balance</span>
            <span className="text-sm font-bold">{formatTokenAmount(mockBalance)}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Amount to Migrate</label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-4 pr-20 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-2xl font-bold"
            />
            <button
              onClick={handleMaxClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-primary/20 text-primary rounded text-sm font-semibold hover:bg-primary/30 transition-colors"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Slippage Settings */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Slippage Tolerance</label>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {(slippage / 100).toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {[50, 100, 300, 500].map((bps) => (
              <button
                key={bps}
                onClick={() => setSlippage(bps)}
                className={`flex-1 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                  slippage === bps
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {(bps / 100).toFixed(1)}%
              </button>
            ))}
          </div>
        </div>

        {/* Estimated Output */}
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 border border-primary/50 rounded-lg p-4 mb-6"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Estimated Output</span>
              <span className="text-lg font-bold text-primary">
                ~{formatTokenAmount(estimatedOutput)} tokens
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Final amount may vary based on market conditions and actual slippage
            </p>
          </motion.div>
        )}

        {/* Warnings */}
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-yellow-400 mb-1">Important</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Migrations are irreversible once confirmed</li>
                <li>• Estimated network fee: ~0.000005 SOL</li>
                <li>• Actual output may differ due to market volatility</li>
                <li>• Always verify transaction details before signing</li>
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
            Continue to Review
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default DepositStep;
