import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary/20 text-primary border border-primary/50',
        secondary: 'bg-secondary/20 text-secondary border border-secondary/50',
        success: 'bg-green-500/20 text-green-400 border border-green-500/50',
        warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50',
        danger: 'bg-red-500/20 text-red-400 border border-red-500/50',
        muted: 'bg-muted text-muted-foreground border border-border',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
