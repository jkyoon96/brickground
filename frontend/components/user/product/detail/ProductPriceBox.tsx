'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui';

interface ProductPriceBoxProps {
  originalPrice: number;
  salePrice: number;
  discountRate?: number;
  minQuantity?: number;
  maxQuantity?: number;
  onAddToCart?: (quantity: number) => void;
  onBuyNow?: (quantity: number) => void;
}

export function ProductPriceBox({
  originalPrice,
  salePrice,
  discountRate,
  minQuantity = 1,
  maxQuantity = 99,
  onAddToCart,
  onBuyNow,
}: ProductPriceBoxProps) {
  const [quantity, setQuantity] = useState(minQuantity);

  const calculatedDiscount = discountRate ?? Math.round((1 - salePrice / originalPrice) * 100);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(minQuantity, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(maxQuantity, prev + 1));
  };

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-soft md:p-7">
      {/* Original Price Row */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">정가</span>
          <p className="text-base text-gray-400 line-through">
            {originalPrice.toLocaleString()}원
          </p>
        </div>
        {calculatedDiscount > 0 && (
          <span className="rounded-lg bg-pixar-error px-2.5 py-1 text-sm font-bold text-white">
            {calculatedDiscount}% OFF
          </span>
        )}
      </div>

      {/* Sale Price Row */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm text-gray-500">판매가</span>
        <span className="text-2xl font-extrabold text-pixar-blue md:text-[32px]">
          {salePrice.toLocaleString()}원
        </span>
      </div>

      {/* Quantity Row */}
      <div className="mb-5 flex items-center justify-between border-y border-gray-200 py-4">
        <span className="font-semibold text-gray-900">수량</span>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleDecrease}
            disabled={quantity <= minQuantity}
            variant="secondary"
            size="icon"
            className="h-9 w-9 hover:bg-pixar-blue/10"
          >
            <Minus className="h-[18px] w-[18px] text-gray-700" />
          </Button>
          <span className="w-12 text-center text-lg font-bold">{quantity}</span>
          <Button
            onClick={handleIncrease}
            disabled={quantity >= maxQuantity}
            variant="secondary"
            size="icon"
            className="h-9 w-9 hover:bg-pixar-blue/10"
          >
            <Plus className="h-[18px] w-[18px] text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 md:flex-row">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 gap-2 border-2 border-pixar-blue text-pixar-blue hover:bg-pixar-blue/10"
          onClick={() => onAddToCart?.(quantity)}
        >
          <ShoppingCart className="h-5 w-5" />
          장바구니
        </Button>
        <Button
          size="lg"
          className="flex-[2] gap-2"
          onClick={() => onBuyNow?.(quantity)}
        >
          <CreditCard className="h-5 w-5" />
          바로 구매
        </Button>
      </div>
    </div>
  );
}
