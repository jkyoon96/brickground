'use client';

import { ShoppingCart } from 'lucide-react';

interface CartPageHeaderProps {
  itemCount: number;
}

export function CartPageHeader({ itemCount }: CartPageHeaderProps) {
  return (
    <div className="bg-[#FF6B35] px-4 py-6 text-white md:px-10 md:py-10">
      <div className="mx-auto flex max-w-[1320px] items-center gap-3 md:gap-4">
        <h1 className="flex items-center gap-2 text-xl font-extrabold md:gap-3 md:text-[32px]">
          <ShoppingCart className="h-6 w-6 md:h-9 md:w-9" />
          장바구니
        </h1>
        <span className="rounded-[20px] bg-white/20 px-3 py-1 text-sm font-semibold md:px-4 md:py-1.5 md:text-base">
          {itemCount}개 상품
        </span>
      </div>
    </div>
  );
}

export default CartPageHeader;
