'use client';

import { FC, useEffect, useState } from 'react';
import { formatTimeRemaining } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
}

const CountdownTimer: FC<CountdownTimerProps> = ({ targetDate, label = 'Migration Window' }) => {
  const [timeRemaining, setTimeRemaining] = useState(formatTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const isExpired =
    timeRemaining.days === 0 &&
    timeRemaining.hours === 0 &&
    timeRemaining.minutes === 0 &&
    timeRemaining.seconds === 0;

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">{label}</p>
        <p className="text-lg font-bold text-red-400">Expired</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-3">{label}</p>
      <div className="grid grid-cols-4 gap-2">
        <TimeUnit value={timeRemaining.days} label="Days" />
        <TimeUnit value={timeRemaining.hours} label="Hours" />
        <TimeUnit value={timeRemaining.minutes} label="Mins" />
        <TimeUnit value={timeRemaining.seconds} label="Secs" />
      </div>
    </div>
  );
};

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: FC<TimeUnitProps> = ({ value, label }) => {
  return (
    <div className="bg-background border border-border rounded-lg p-2">
      <div className="text-2xl font-bold text-primary">{value.toString().padStart(2, '0')}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

export default CountdownTimer;
