'use client';

import Image from 'next/image';
import { Package } from 'lucide-react';

interface CheckoutOrderItemProps {
  id: string;
  name: string;
  brand: string;
  imageUrl?: string;
  option?: string;
  quantity: number;
  price: number;
}

export function CheckoutOrderItem({
  name,
  brand,
  imageUrl,
  option,
  quantity,
  price,
}: CheckoutOrderItemProps) {
  const formatPrice = (value: number) => {
    return value.toLocaleString('ko-KR');
  };

  return (
    <div className="flex gap-3 py-3 first:pt-0 last:pb-0">
      {/* Product Image */}
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-[#F8FAFC] md:h-20 md:w-20">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-6 w-6 text-[#94A3B8]" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-center">
        <p className="mb-0.5 text-xs text-[#64748B]">{brand}</p>
        <p className="mb-1 line-clamp-1 text-sm font-medium text-[#1E293B]">{name}</p>
        {option && <p className="text-xs text-[#94A3B8]">{option}</p>}
      </div>

      {/* Price & Quantity */}
      <div className="flex flex-shrink-0 flex-col items-end justify-center">
        <p className="text-sm font-bold text-[#1E293B]">{formatPrice(price)}원</p>
        <p className="text-xs text-[#64748B]">{quantity}개</p>
      </div>
    </div>
  );
}

export default CheckoutOrderItem;
