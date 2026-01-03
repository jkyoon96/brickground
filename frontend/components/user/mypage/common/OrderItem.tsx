'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Box, Palette, Gift, Package, LucideIcon } from 'lucide-react';

type OrderStatus = 'preparing' | 'shipping' | 'delivered' | 'cancelled';

interface OrderItemProps {
  id: string;
  name: string;
  date: string;
  status: OrderStatus;
  price: number;
  icon?: LucideIcon;
  href?: string;
}

const statusStyles: Record<OrderStatus, { label: string; className: string }> = {
  preparing: {
    label: '상품준비중',
    className: 'bg-yellow-100 text-yellow-700',
  },
  shipping: {
    label: '배송중',
    className: 'bg-blue-100 text-pixar-blue',
  },
  delivered: {
    label: '배송완료',
    className: 'bg-green-100 text-pixar-green',
  },
  cancelled: {
    label: '주문취소',
    className: 'bg-gray-100 text-gray-500',
  },
};

const defaultIcons: LucideIcon[] = [Box, Palette, Gift, Package];

export function OrderItem({
  id,
  name,
  date,
  status,
  price,
  icon,
  href,
}: OrderItemProps) {
  const statusInfo = statusStyles[status];
  const Icon = icon || defaultIcons[Math.floor(Math.random() * defaultIcons.length)];

  const content = (
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100 md:gap-4 md:p-4">
      {/* Product Image Placeholder */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-200 md:h-14 md:w-14">
        <Icon className="h-5 w-5 text-gray-500 md:h-6 md:w-6" />
      </div>

      {/* Order Info */}
      <div className="min-w-[150px] flex-1">
        <div className="text-sm font-semibold text-gray-900 md:text-base">{name}</div>
        <div className="text-xs text-gray-500 md:text-sm">{date}</div>
      </div>

      {/* Status Badge */}
      <span
        className={cn(
          'shrink-0 rounded-full px-3 py-1 text-xs font-bold',
          statusInfo.className
        )}
      >
        {statusInfo.label}
      </span>

      {/* Price */}
      <div className="w-full text-left text-sm font-bold text-gray-900 md:w-auto md:text-base">
        {price.toLocaleString()}원
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
