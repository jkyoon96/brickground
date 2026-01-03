'use client';

import { PlusCircle, MinusCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PointTransactionType = 'earn' | 'use' | 'expire';

interface PointHistoryItemProps {
  type: PointTransactionType;
  title: string;
  description: string;
  amount: number;
  expirationDate?: string;
}

const typeConfig = {
  earn: {
    icon: PlusCircle,
    bgColor: 'bg-[rgba(107,203,119,0.1)]',
    iconColor: 'text-[#6BCB77]',
    amountColor: 'text-[#6BCB77]',
    prefix: '+',
  },
  use: {
    icon: MinusCircle,
    bgColor: 'bg-[rgba(0,102,255,0.1)]',
    iconColor: 'text-[#0066FF]',
    amountColor: 'text-[#0066FF]',
    prefix: '-',
  },
  expire: {
    icon: XCircle,
    bgColor: 'bg-[rgba(148,163,184,0.1)]',
    iconColor: 'text-[#94A3B8]',
    amountColor: 'text-[#94A3B8]',
    prefix: '-',
  },
};

export function PointHistoryItem({
  type,
  title,
  description,
  amount,
  expirationDate,
}: PointHistoryItemProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col gap-3 border-b border-[#E2E8F0] px-4 py-4 transition-all last:border-b-0 hover:bg-[rgba(0,102,255,0.03)] md:flex-row md:items-center md:gap-4 md:px-5 md:py-5">
      {/* Icon */}
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] md:h-12 md:w-12',
          config.bgColor
        )}
      >
        <Icon className={cn('h-5 w-5 md:h-6 md:w-6', config.iconColor)} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-[#1E293B]">{title}</p>
        <p className="text-sm text-[#94A3B8]">{description}</p>
      </div>

      {/* Amount */}
      <div className="text-left md:text-right">
        <p className={cn('text-base font-extrabold md:text-lg', config.amountColor)}>
          {config.prefix}
          {Math.abs(amount).toLocaleString()} P
        </p>
        {expirationDate && (
          <p className="text-xs text-[#94A3B8]">유효기간: {expirationDate}</p>
        )}
      </div>
    </div>
  );
}

export default PointHistoryItem;
