'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface EmptyCartProps {
  onShopNow?: () => void;
}

export function EmptyCart({ onShopNow }: EmptyCartProps) {
  return (
    <div className="rounded-[20px] bg-white px-6 py-12 text-center shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:px-10 md:py-16">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F8FAFC] md:h-[100px] md:w-[100px]">
        <ShoppingCart className="h-10 w-10 text-[#64748B] md:h-12 md:w-12" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-[#1E293B] md:text-xl">장바구니가 비어있습니다</h3>
      <p className="mb-6 text-sm text-[#64748B]">마음에 드는 상품을 담아보세요!</p>
      <Link
        href="/products"
        onClick={onShopNow}
        className="inline-block rounded-[20px] bg-[#FF6B35] px-8 py-3.5 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
      >
        쇼핑하러 가기
      </Link>
    </div>
  );
}

export default EmptyCart;
