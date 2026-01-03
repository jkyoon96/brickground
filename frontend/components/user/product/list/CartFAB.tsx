'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface CartFABProps {
  itemCount: number;
}

export function CartFAB({ itemCount }: CartFABProps) {
  if (itemCount === 0) return null;

  return (
    <Link
      href="/mypage/carts"
      className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-center gap-2.5 rounded-[32px] bg-gradient-to-r from-[#FF6B35] to-[#FFD93D] px-6 py-3.5 text-sm font-bold text-white shadow-[0_6px_25px_rgba(255,107,53,0.4)] transition-transform hover:-translate-y-1 md:bottom-10 md:left-auto md:right-10 md:px-8 md:py-[18px] md:text-base"
    >
      <ShoppingCart className="h-5 w-5 md:h-[22px] md:w-[22px]" />
      장바구니 ({itemCount})
    </Link>
  );
}

export default CartFAB;
