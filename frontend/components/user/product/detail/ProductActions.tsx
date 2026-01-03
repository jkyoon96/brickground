'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart, CreditCard, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ProductActionsProps {
  minQuantity?: number;
  maxQuantity?: number;
  isWishlisted?: boolean;
  onAddToCart?: (quantity: number) => void;
  onBuyNow?: (quantity: number) => void;
  onWishlistToggle?: () => void;
}

export function ProductActions({
  minQuantity = 1,
  maxQuantity = 99,
  isWishlisted = false,
  onAddToCart,
  onBuyNow,
  onWishlistToggle,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(minQuantity);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(minQuantity, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(maxQuantity, prev + 1));
  };

  return (
    <div className="space-y-6">
      {/* Quantity Control */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-[#1E293B] md:text-[15px]">수량</h3>
        <div className="inline-flex items-center gap-1 rounded-xl bg-[#F8FAFC] p-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrease}
            disabled={quantity <= minQuantity}
            className="h-10 w-10 rounded-lg bg-white shadow-sm hover:bg-[#FF6B35]/10 md:h-11 md:w-11"
          >
            <Minus className="h-5 w-5 text-[#1E293B]" />
          </Button>
          <input
            type="text"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val >= minQuantity && val <= maxQuantity) {
                setQuantity(val);
              }
            }}
            className="w-14 bg-transparent text-center text-lg font-bold text-[#1E293B] outline-none md:w-16 md:text-xl"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleIncrease}
            disabled={quantity >= maxQuantity}
            className="h-10 w-10 rounded-lg bg-white shadow-sm hover:bg-[#FF6B35]/10 md:h-11 md:w-11"
          >
            <Plus className="h-5 w-5 text-[#1E293B]" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 md:flex-row">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onAddToCart?.(quantity)}
          className="flex-1 rounded-xl border-2 border-[#FF6B35] bg-white text-[#FF6B35] hover:-translate-y-0.5 hover:bg-white"
        >
          <ShoppingCart className="h-5 w-5 md:h-[22px] md:w-[22px]" />
          장바구니
        </Button>
        <Button
          variant="gradient"
          size="lg"
          onClick={() => onBuyNow?.(quantity)}
          className="flex-[2] rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FFD93D] shadow-[0_4px_15px_rgba(255,107,53,0.3)] hover:-translate-y-0.5"
        >
          <CreditCard className="h-5 w-5 md:h-[22px] md:w-[22px]" />
          바로 구매
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onWishlistToggle}
          className={cn(
            'h-[52px] w-full rounded-xl border-2 md:h-auto md:w-[60px]',
            isWishlisted
              ? 'border-[#FF6B6B] bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20'
              : 'border-[#E2E8F0] bg-white hover:border-[#FF6B6B] hover:bg-white'
          )}
        >
          <Heart
            className={cn(
              'h-6 w-6',
              isWishlisted ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-[#64748B]'
            )}
          />
        </Button>
      </div>
    </div>
  );
}

export default ProductActions;
