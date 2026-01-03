'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

type OrderStatus = 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface SellerOrderRowProps {
  orderId: string;
  productName: string;
  amount: number;
  status: OrderStatus;
  href?: string;
}

const statusStyles: Record<OrderStatus, { label: string; className: string }> = {
  new: {
    label: '신규',
    className: 'bg-blue-100 text-pixar-blue',
  },
  processing: {
    label: '준비중',
    className: 'bg-yellow-100 text-yellow-700',
  },
  shipped: {
    label: '배송중',
    className: 'bg-green-100 text-pixar-green',
  },
  delivered: {
    label: '배송완료',
    className: 'bg-gray-100 text-gray-600',
  },
  cancelled: {
    label: '취소',
    className: 'bg-red-100 text-red-500',
  },
};

export function SellerOrderRow({
  orderId,
  productName,
  amount,
  status,
  href,
}: SellerOrderRowProps) {
  const statusStyle = statusStyles[status];

  const content = (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4 last:border-b-0">
      <span className="w-24 shrink-0 text-sm font-semibold text-pixar-blue">{orderId}</span>
      <span className="flex-1 truncate text-sm font-semibold text-gray-900">{productName}</span>
      <span className="w-24 text-center">
        <span
          className={cn(
            'inline-block rounded-full px-3 py-1 text-xs font-semibold',
            statusStyle.className
          )}
        >
          {statusStyle.label}
        </span>
      </span>
      <span className="w-24 text-right text-sm font-bold text-gray-900">
        {amount.toLocaleString()}원
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:bg-gray-50">
        {content}
      </Link>
    );
  }

  return content;
}
