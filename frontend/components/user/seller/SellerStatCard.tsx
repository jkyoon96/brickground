'use client';

import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

type StatCardVariant = 'blue' | 'yellow' | 'green' | 'red';

interface SellerStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    text: string;
  };
  variant?: StatCardVariant;
  className?: string;
}

const variantStyles: Record<StatCardVariant, { border: string; icon: string }> = {
  blue: {
    border: 'before:bg-pixar-blue',
    icon: 'bg-pixar-blue',
  },
  yellow: {
    border: 'before:bg-pixar-yellow',
    icon: 'bg-gradient-to-br from-pixar-yellow to-yellow-500',
  },
  green: {
    border: 'before:bg-pixar-green',
    icon: 'bg-gradient-to-br from-pixar-green to-green-600',
  },
  red: {
    border: 'before:bg-red-500',
    icon: 'bg-gradient-to-br from-red-400 to-red-600',
  },
};

export function SellerStatCard({
  icon: Icon,
  label,
  value,
  trend,
  variant = 'blue',
  className,
}: SellerStatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(0,102,255,0.1)]',
        'before:absolute before:left-0 before:top-0 before:h-full before:w-1',
        styles.border,
        className
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <span className="text-sm font-semibold text-gray-500">{label}</span>
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            styles.icon
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Value */}
      <div className="text-2xl font-extrabold text-gray-900 md:text-3xl">{value}</div>

      {/* Trend */}
      {trend && (
        <div
          className={cn(
            'mt-2 inline-flex items-center gap-1 text-xs font-semibold',
            trend.direction === 'up' && 'text-pixar-green',
            trend.direction === 'down' && 'text-red-500',
            trend.direction === 'neutral' && 'text-gray-500'
          )}
        >
          {trend.direction === 'up' && <TrendingUp className="h-3.5 w-3.5" />}
          {trend.direction === 'down' && <TrendingDown className="h-3.5 w-3.5" />}
          {trend.text}
        </div>
      )}
    </div>
  );
}
