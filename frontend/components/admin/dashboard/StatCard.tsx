'use client';

import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
  };
  description?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  default: {
    icon: 'bg-muted text-muted-foreground',
    change: {
      increase: 'text-green-600',
      decrease: 'text-red-600',
      neutral: 'text-muted-foreground',
    },
  },
  primary: {
    icon: 'bg-primary/10 text-primary',
    change: {
      increase: 'text-green-600',
      decrease: 'text-red-600',
      neutral: 'text-muted-foreground',
    },
  },
  success: {
    icon: 'bg-green-100 text-green-600',
    change: {
      increase: 'text-green-600',
      decrease: 'text-red-600',
      neutral: 'text-muted-foreground',
    },
  },
  warning: {
    icon: 'bg-yellow-100 text-yellow-600',
    change: {
      increase: 'text-green-600',
      decrease: 'text-red-600',
      neutral: 'text-muted-foreground',
    },
  },
  danger: {
    icon: 'bg-red-100 text-red-600',
    change: {
      increase: 'text-green-600',
      decrease: 'text-red-600',
      neutral: 'text-muted-foreground',
    },
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  change,
  description,
  variant = 'default',
  className,
}: StatCardProps) {
  const styles = variantStyles[variant];

  const TrendIcon =
    change?.type === 'increase'
      ? TrendingUp
      : change?.type === 'decrease'
      ? TrendingDown
      : Minus;

  return (
    <div
      className={cn(
        'bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <div className="flex items-center gap-1 text-sm">
              <TrendIcon
                className={cn('w-4 h-4', styles.change[change.type])}
              />
              <span className={cn('font-medium', styles.change[change.type])}>
                {change.type === 'decrease' ? '-' : change.type === 'increase' ? '+' : ''}
                {Math.abs(change.value)}%
              </span>
              {change.period && (
                <span className="text-muted-foreground">{change.period}</span>
              )}
            </div>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-lg', styles.icon)}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
