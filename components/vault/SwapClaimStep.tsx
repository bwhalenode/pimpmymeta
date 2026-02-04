'use client';

import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatTokenAmount, sleep } from '@/lib/utils';
import { vaultClient } from '@/lib/solana/vaultClient';

interface SwapClaimStepProps {
  selectedToken: string;
  amount: number;
  slippage: number;
  onBack: () => void;
  onComplete: () => void;
}

type TxStatus = 'idle' | 'depositing' | 'swapping' | 'claiming' | 'completed' | 'error';

const SwapClaimStep: FC<SwapClaimStepProps> = ({
  selectedToken,
  amount,
  slippage,
  onBack,
  onComplete,
}) => {
  const { publicKey, sendTransaction } = useWallet();
  const [status, setStatus] = useState<TxStatus>('idle');
  const [txSignature, setTxSignature] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleExecute = async () => {
    if (!publicKey) {
      setError('Wallet not connected');
      return;
    }

    try {
      setError('');

      // Step 1: Deposit
      setStatus('depositing');
      await sleep(2000); // Simulate transaction time
      console.log('[DEMO] Depositing tokens...');

      // Step 2: Swap
      setStatus('swapping');
      await sleep(3000); // Simulate swap time
      console.log('[DEMO] Executing swap via Jupiter/Raydium...');

      // Step 3: Claim
      setStatus('claiming');
      await sleep(2000); // Simulate claim time
      console.log('[DEMO] Claiming new tokens...');

      // Mock transaction signature
      setTxSignature('5' + 'x'.repeat(87));
      setStatus('completed');

      // TODO: Replace with actual smart contract calls
      // const depositTx = await vaultClient.depositTokens(publicKey, {
      //   oldTokenMint: selectedToken,
      //   amount,
      //   slippageBps: slippage,
      // });
      // const depositSig = await sendTransaction(depositTx, connection);
      // await connection.confirmTransaction(depositSig);
      //
      // const swapTx = await vaultClient.executeSwap(publicKey, { vaultPubkey: '...' });
      // const swapSig = await sendTransaction(swapTx, connection);
      // await connection.confirmTransaction(swapSig);
      //
      // const claimTx = await vaultClient.claimTokens(publicKey, { vaultPubkey: '...' });
      // const claimSig = await sendTransaction(claimTx, connection);
      // await connection.confirmTransaction(claimSig);
      // setTxSignature(claimSig);
    } catch (err) {
      console.error('[ERROR]', err);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Transaction failed');
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'depositing':
        return 'Depositing tokens to vault...';
      case 'swapping':
        return 'Executing swap on-chain...';
      case 'claiming':
        return 'Claiming your new tokens...';
      case 'completed':
        return 'Migration complete!';
      case 'error':
        return 'Transaction failed';
      default:
        return 'Ready to execute migration';
    }
  };

  const isProcessing = ['depositing', 'swapping', 'claiming'].includes(status);

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
              status === 'completed'
                ? 'bg-green-500/20'
                : status === 'error'
                ? 'bg-red-500/20'
                : 'bg-primary/10'
            }`}
          >
            {isProcessing ? (
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            ) : status === 'completed' ? (
              <CheckCircle className="h-10 w-10 text-green-400" />
            ) : status === 'error' ? (
              <AlertCircle className="h-10 w-10 text-red-400" />
            ) : (
              <CheckCircle className="h-10 w-10 text-primary" />
            )}
          </div>
          <h2 className="text-3xl font-bold mb-2">Review & Execute</h2>
          <p className="text-muted-foreground">{getStatusMessage()}</p>
        </div>

        {/* Transaction Summary */}
        <div className="bg-muted/30 rounded-lg p-6 mb-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Migrating From</span>
            <span className="font-mono text-sm">{selectedToken.slice(0, 12)}...</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-bold">{formatTokenAmount(amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Slippage Tolerance</span>
            <span className="font-bold">{(slippage / 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimated Fee</span>
            <span className="font-bold">~0.000005 SOL</span>
          </div>
        </div>

        {/* Status Progress */}
        <div className="mb-6 space-y-3">
          <StatusItem
            label="1. Deposit to Vault"
            active={status === 'depositing'}
            completed={['swapping', 'claiming', 'completed'].includes(status)}
          />
          <StatusItem
            label="2. Execute Swap"
            active={status === 'swapping'}
            completed={['claiming', 'completed'].includes(status)}
          />
          <StatusItem
            label="3. Claim New Tokens"
            active={status === 'claiming'}
            completed={status === 'completed'}
          />
        </div>

        {/* Transaction Signature */}
        {txSignature && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-6"
          >
            <p className="text-sm font-semibold text-green-400 mb-2">
              Transaction Successful
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-sm font-semibold text-red-400 mb-1">Error</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          {status !== 'completed' && (
            <Button
              variant="outline"
              onClick={onBack}
              size="lg"
              className="flex-1"
              disabled={isProcessing}
            >
              Back
            </Button>
          )}

          {status === 'idle' && (
            <Button onClick={handleExecute} size="lg" className="flex-1">
              Execute Migration
            </Button>
          )}

          {status === 'completed' && (
            <Button onClick={onComplete} size="lg" className="w-full">
              Start New Migration
            </Button>
          )}

          {status === 'error' && (
            <Button onClick={handleExecute} variant="secondary" size="lg" className="flex-1">
              Retry
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

interface StatusItemProps {
  label: string;
  active: boolean;
  completed: boolean;
}

const StatusItem: FC<StatusItemProps> = ({ label, active, completed }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
          completed
            ? 'border-green-500 bg-green-500/20'
            : active
            ? 'border-primary bg-primary/20'
            : 'border-border bg-background'
        }`}
      >
        {completed ? (
          <CheckCircle className="h-5 w-5 text-green-400" />
        ) : active ? (
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-muted" />
        )}
      </div>
      <span
        className={`text-sm font-medium ${
          active || completed ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        {label}
      </span>
      {active && <Badge variant="primary">In Progress</Badge>}
      {completed && <Badge variant="success">Done</Badge>}
    </div>
  );
};

export default SwapClaimStep;
