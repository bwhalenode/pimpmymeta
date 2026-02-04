'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, AlertCircle } from 'lucide-react';
import { MOCK_METAS, getCurrentMeta } from '@/lib/meta/mockMetas';
import { isValidSolanaAddress } from '@/lib/utils';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface SelectTokenStepProps {
  onNext: (selectedToken: string) => void;
  onBack: () => void;
}

const SelectTokenStep: FC<SelectTokenStepProps> = ({ onNext, onBack }) => {
  const [selectedToken, setSelectedToken] = useState<string>('');
  const [customAddress, setCustomAddress] = useState<string>('');
  const [useCustom, setUseCustom] = useState(false);
  const [addressError, setAddressError] = useState<string>('');

  const currentMeta = getCurrentMeta();
  const candidateMetas = MOCK_METAS.filter((m) => m.status === 'candidate');

  const handleCustomAddressChange = (value: string) => {
    setCustomAddress(value);
    if (value && !isValidSolanaAddress(value)) {
      setAddressError('Invalid Solana address');
    } else {
      setAddressError('');
    }
  };

  const handleContinue = () => {
    const token = useCustom ? customAddress : selectedToken;
    if (token && (!useCustom || isValidSolanaAddress(token))) {
      onNext(token);
    }
  };

  const isValid = useCustom
    ? customAddress && isValidSolanaAddress(customAddress)
    : !!selectedToken;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
            <ArrowDownUp className="h-10 w-10 text-secondary" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Select Old Token</h2>
          <p className="text-muted-foreground">
            Choose the token you want to migrate from
          </p>
        </div>

        {/* Target Token Display */}
        <div className="bg-primary/10 border border-primary/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">MIGRATING TO</p>
              <p className="text-lg font-bold text-primary">
                {currentMeta?.pimpedName} ({currentMeta?.pimpedTicker})
              </p>
            </div>
            <Badge variant="primary">CURRENT META</Badge>
          </div>
        </div>

        {/* Token Selection Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3">
            Select from Recent Metas:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {candidateMetas.map((meta) => (
              <button
                key={meta.id}
                onClick={() => {
                  setSelectedToken(meta.contractAddress || '');
                  setUseCustom(false);
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedToken === meta.contractAddress && !useCustom
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{meta.name}</span>
                  <Badge variant="muted">{meta.ticker}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {meta.contractAddress?.slice(0, 8)}...
                  {meta.contractAddress?.slice(-8)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Address Input */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Or paste custom address:</label>
            <button
              onClick={() => setUseCustom(!useCustom)}
              className="text-xs text-primary hover:underline"
            >
              {useCustom ? 'Use preset' : 'Use custom'}
            </button>
          </div>

          {useCustom && (
            <div>
              <input
                type="text"
                value={customAddress}
                onChange={(e) => handleCustomAddressChange(e.target.value)}
                placeholder="Enter token mint address"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
              />
              {addressError && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
                  <AlertCircle className="h-4 w-4" />
                  <span>{addressError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pimp Meter Animation (Fun Element) */}
        {(selectedToken || (useCustom && isValid)) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-secondary/10 border border-secondary/50 rounded-lg p-4 mb-6 text-center"
          >
            <p className="text-sm font-semibold text-secondary mb-2">
              🎉 PIMP METER: READY
            </p>
            <div className="w-full bg-background rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="bg-gradient-secondary h-2 rounded-full"
              />
            </div>
          </motion.div>
        )}

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
            Continue to Deposit
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default SelectTokenStep;
