'use client';

import Image from 'next/image';
import { Loader, Truck, Check, CreditCard, XCircle, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type OrderProductStatus = 'paid' | 'preparing' | 'shipping' | 'completed' | 'canceled';

interface OrderProductItemProps {
  id: string;
  imageUrl?: string;
  status: OrderProductStatus;
  statusDate?: string;
  title: string;
  option: string;
  price: number;
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'outline';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const statusConfig: Record<
  OrderProductStatus,
  { label: string; icon: LucideIcon; className: string }
> = {
  paid: {
    label: '결제완료',
    icon: CreditCard,
    className: 'bg-[rgba(0,102,255,0.1)] text-[#0066FF]',
  },
  preparing: {
    label: '상품준비중',
    icon: Loader,
    className: 'bg-[rgba(255,217,61,0.2)] text-[#F59E0B]',
  },
  shipping: {
    label: '배송중',
    icon: Truck,
    className: 'bg-[rgba(0,206,201,0.1)] text-[#00CEC9]',
  },
  completed: {
    label: '배송완료',
    icon: Check,
    className: 'bg-[rgba(107,203,119,0.1)] text-[#6BCB77]',
  },
  canceled: {
    label: '취소/반품',
    icon: XCircle,
    className: 'bg-[rgba(148,163,184,0.1)] text-[#94A3B8]',
  },
};

export function OrderProductItem({
  id,
  imageUrl,
  status,
  statusDate,
  title,
  option,
  price,
  primaryAction,
  secondaryAction,
}: OrderProductItemProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="flex flex-wrap items-start gap-3 border-b border-[#E2E8F0] py-4 last:border-b-0 md:flex-nowrap md:gap-4">
      {/* Product Image */}
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-[#F8FAFC] md:h-20 md:w-20">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#94A3B8]">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-[20px] px-2.5 py-1 text-[11px] font-bold md:text-xs',
              config.className
            )}
          >
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </span>
          {statusDate && (
            <span className="text-xs text-[#94A3B8]">{statusDate}</span>
          )}
        </div>
        <p className="mb-1 truncate font-semibold text-[#1E293B] md:text-base">
          {title}
        </p>
        <p className="text-xs text-[#64748B] md:text-sm">{option}</p>
      </div>

      {/* Price */}
      <div className="w-auto text-right md:min-w-[100px]">
        <p className="text-base font-bold text-[#1E293B] md:text-lg">
          {price.toLocaleString()}원
        </p>
      </div>

      {/* Actions */}
      <div className="mt-2 flex w-full flex-row justify-end gap-2 md:mt-0 md:w-auto md:flex-col">
        {primaryAction && (
          <Button
            variant={primaryAction.variant === 'primary' ? 'gradient' : 'outline'}
            onClick={primaryAction.onClick}
            className={cn(
              'rounded-xl px-4 py-2 text-xs font-semibold md:text-sm',
              primaryAction.variant === 'primary'
                ? 'bg-gradient-to-r from-[#0066FF] to-[#3B82F6] text-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,102,255,0.3)]'
                : 'border border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF]'
            )}
          >
            {primaryAction.label}
          </Button>
        )}
        {secondaryAction && (
          <Button
            variant="outline"
            onClick={secondaryAction.onClick}
            className="rounded-xl border border-[#E2E8F0] px-4 py-2 text-xs font-semibold text-[#64748B] transition-all hover:border-[#0066FF] hover:text-[#0066FF] md:text-sm"
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}

export default OrderProductItem;
