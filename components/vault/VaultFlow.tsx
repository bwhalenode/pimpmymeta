'use client';

import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProgressStepper from '@/components/ui/ProgressStepper';
import { VAULT_STEPS } from '@/lib/constants';
import ConnectWalletStep from './ConnectWalletStep';
import DepositCurrentTokenStep from './DepositCurrentTokenStep';
import ManagePositionStep from './ManagePositionStep';
import MigrationStatusStep from './MigrationStatusStep';

const VaultFlow: FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [depositedAmount, setDepositedAmount] = useState<number>(0);

  const handleStepComplete = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDeposit = (amount: number) => {
    setDepositedAmount(amount);
    handleStepComplete();
  };

  const handleFlowComplete = () => {
    // Reset to wallet connect
    setCurrentStep(1);
    setDepositedAmount(0);
  };

  return (
    <div className="space-y-12">
      {/* Progress Stepper */}
      <ProgressStepper steps={VAULT_STEPS} currentStep={currentStep} />

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <ConnectWalletStep key="step1" onNext={handleStepComplete} />
        )}

        {currentStep === 2 && (
          <DepositCurrentTokenStep
            key="step2"
            onNext={handleDeposit}
            onBack={handleStepBack}
          />
        )}

        {currentStep === 3 && (
          <ManagePositionStep
            key="step3"
            depositedAmount={depositedAmount}
            onNext={handleStepComplete}
            onBack={handleStepBack}
          />
        )}

        {currentStep === 4 && (
          <MigrationStatusStep
            key="step4"
            depositedAmount={depositedAmount}
            onBack={handleStepBack}
            onComplete={handleFlowComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VaultFlow;
