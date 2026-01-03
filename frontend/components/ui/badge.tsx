import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-pixar-blue text-white',
        secondary: 'bg-gray-100 text-gray-900',
        destructive: 'bg-red-100 text-red-700',
        outline: 'border border-gray-200 text-gray-600',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        info: 'bg-blue-100 text-blue-700',
        purple: 'bg-purple-100 text-purple-700',
        new: 'bg-gradient-to-r from-pixar-blue to-toy-cyan text-white',
        hot: 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
        sale: 'bg-gradient-to-r from-pink-500 to-red-500 text-white',
        best: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
        rental: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        premium: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-[10px]',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
