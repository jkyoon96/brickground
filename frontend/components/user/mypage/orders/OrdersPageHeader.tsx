'use client';

import { ShoppingBag } from 'lucide-react';

interface OrdersPageHeaderProps {
  title?: string;
}

export function OrdersPageHeader({ title = '주문 내역' }: OrdersPageHeaderProps) {
  return (
    <h1 className="mb-6 flex items-center gap-3 text-xl font-extrabold text-[#1E293B] md:mb-8 md:text-2xl lg:text-[28px]">
      <ShoppingBag className="h-6 w-6 text-[#0066FF] md:h-8 md:w-8" />
      {title}
    </h1>
  );
}

export default OrdersPageHeader;
