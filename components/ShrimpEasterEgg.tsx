'use client';

import { FC, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';

interface ShrimpEasterEggProps {
  children: React.ReactNode;
}

const ShrimpEasterEgg: FC<ShrimpEasterEggProps> = ({ children }) => {
  const [clickCount, setClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 5) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setClickCount(0);
      }, 5000);
    }

    // Reset counter after 2 seconds of no clicks
    setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/90 border-2 border-primary rounded-lg p-8 glow-primary animate-pulse-glow">
              <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SURF THE META! 🦐
              </h2>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={handleClick}
        className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
      >
        {children}
      </div>
    </>
  );
};

export default ShrimpEasterEgg;
