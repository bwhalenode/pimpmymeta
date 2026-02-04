'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { Wallet, AlertTriangle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ConnectWalletStepProps {
  onNext: () => void;
}

const ConnectWalletStep: FC<ConnectWalletStepProps> = ({ onNext }) => {
  const { connected, publicKey } = useWallet();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Connect your Solana wallet to begin the migration process
          </p>
        </div>

        {!connected ? (
          <>
            <div className="flex justify-center mb-6">
              <WalletMultiButton />
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-4">
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
          </>
        ) : (
          <>
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-6 text-center">
              <p className="text-green-400 font-semibold mb-1">Wallet Connected!</p>
              <p className="text-sm text-muted-foreground">
                {publicKey?.toString()}
              </p>
            </div>

            <Button onClick={onNext} size="lg" className="w-full">
              Continue to Token Selection
            </Button>
          </>
        )}
      </Card>
    </motion.div>
  );
};

export default ConnectWalletStep;
