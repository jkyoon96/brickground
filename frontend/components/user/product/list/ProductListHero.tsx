'use client';

import Link from 'next/link';
import { ShoppingBag, Flame, Percent } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProductListHeroProps {
  onPopularClick?: () => void;
  onSaleClick?: () => void;
}

export function ProductListHero({ onPopularClick, onSaleClick }: ProductListHeroProps) {
  return (
    <section className="bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] px-4 py-8 text-center text-white md:px-10 md:py-[60px]">
      {/* Badge */}
      <div className="mb-3 inline-flex items-center gap-2 rounded-3xl bg-white/20 px-4 py-2.5 text-xs font-semibold md:mb-5 md:px-5 md:py-2.5 md:text-sm">
        <ShoppingBag className="h-4 w-4 md:h-[18px] md:w-[18px]" />
        BrickGround Shop
      </div>

      {/* Title */}
      <h1 className="mb-3 text-[22px] font-extrabold md:mb-4 md:text-[42px]">Product Gallery</h1>

      {/* Description */}
      <p className="mx-auto mb-6 max-w-[600px] text-[13px] opacity-90 md:mb-8 md:text-lg">
        레고, 피규어, 보드게임 등 다양한 상품을 만나보세요
      </p>

      {/* Actions */}
      <div className="flex flex-col justify-center gap-3 md:flex-row md:items-center md:gap-4">
        <Button
          variant="secondary"
          onClick={onPopularClick}
          className="h-12 rounded-[28px] bg-white px-6 text-sm font-bold text-[#FF6B35] shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-105 hover:bg-white md:px-8 md:text-base"
        >
          <Flame className="h-5 w-5" />
          인기상품
        </Button>

        <Button
          variant="outline"
          onClick={onSaleClick}
          className="h-12 rounded-[28px] border-2 border-white bg-transparent px-6 text-sm font-bold text-white hover:bg-white/10 md:px-8 md:text-base"
        >
          <Percent className="h-5 w-5" />
          특가 세일
        </Button>
      </div>
    </section>
  );
}

export default ProductListHero;
