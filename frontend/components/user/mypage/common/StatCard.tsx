'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type StatCardVariant = 'blue' | 'yellow' | 'green' | 'red';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  variant?: StatCardVariant;
  className?: string;
}

const variantStyles: Record<StatCardVariant, string> = {
  blue: 'bg-pixar-blue',
  yellow: 'bg-gradient-to-br from-pixar-yellow to-yellow-500',
  green: 'bg-gradient-to-br from-pixar-green to-green-600',
  red: 'bg-gradient-to-br from-red-400 to-red-600',
};

export function StatCard({ icon: Icon, value, label, variant = 'blue', className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6',
        className
      )}
    >
      <div
        className={cn(
          'mb-4 flex h-10 w-10 items-center justify-center rounded-xl md:h-12 md:w-12',
          variantStyles[variant]
        )}
      >
        <Icon className="h-5 w-5 text-white md:h-6 md:w-6" />
      </div>
      <div className="text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl">{value}</div>
      <div className="text-xs text-gray-500 md:text-sm">{label}</div>
    </div>
  );
}
