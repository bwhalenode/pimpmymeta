'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, AlertTriangle, Info } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { isValidSolanaAddress } from '@/lib/utils';

interface ConnectWalletStepProps {
  onNext: () => void;
}

const ConnectWalletStep: FC<ConnectWalletStepProps> = ({ onNext }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleAddressChange = (value: string) => {
    setWalletAddress(value);
    setIsValid(value.length === 0 || isValidSolanaAddress(value));
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-2xl mx-auto">
        {/* Demo Mode Banner */}
        <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-400 mb-1">Demo Mode</p>
              <p className="text-muted-foreground">
                Wallet connection and on-chain program integration coming soon.
                This is a UI demonstration only.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Enter Wallet Address (Optional)</h2>
          <p className="text-muted-foreground">
            Enter your Solana wallet address or skip to explore the vault demo
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            Solana Wallet Address (Optional)
          </label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder="Enter your Solana wallet address or leave empty"
            className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono ${
              !isValid ? 'border-red-500' : 'border-border'
            }`}
          />
          {!isValid && walletAddress && (
            <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
              <AlertTriangle className="h-4 w-4" />
              <span>Invalid Solana address format</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            Your address is not stored or used. This is for demonstration purposes only.
          </p>
        </div>

        {walletAddress && isValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-6 text-center"
          >
            <p className="text-green-400 font-semibold mb-1">Address Recognized!</p>
            <p className="text-sm text-muted-foreground font-mono break-all">
              {walletAddress}
            </p>
          </motion.div>
        )}

        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-yellow-400 mb-1">Security Reminder</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Never share your seed phrase with anyone</li>
                <li>• Always verify the URL before connecting</li>
                <li>• Only approve transactions you understand</li>
                <li>• We will never ask for your private keys</li>
              </ul>
            </div>
          </div>
        </div>

        <Button onClick={handleContinue} size="lg" className="w-full" disabled={!isValid}>
          Continue to Deposit (Demo)
        </Button>
      </Card>
    </motion.div>
  );
};

export default ConnectWalletStep;
