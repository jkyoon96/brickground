'use client';

import Image from 'next/image';
import { Package, Star, MessageCircle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface OrderDetailItemProps {
  id: string;
  name: string;
  brand: string;
  imageUrl?: string;
  imageGradient?: string;
  option?: string;
  quantity: number;
  price: number;
  onWriteReview?: (id: string) => void;
  onInquiry?: (id: string) => void;
  onReorder?: (id: string) => void;
}

export function OrderDetailItem({
  id,
  name,
  brand,
  imageUrl,
  imageGradient = 'linear-gradient(135deg, #FF6B35, #FFD93D)',
  option,
  quantity,
  price,
  onWriteReview,
  onInquiry,
  onReorder,
}: OrderDetailItemProps) {
  const formatPrice = (value: number) => {
    return value.toLocaleString('ko-KR');
  };

  return (
    <div className="mb-3 flex flex-wrap gap-3 rounded-xl bg-[#F8FAFC] p-4 last:mb-0 md:gap-5 md:p-5">
      {/* Product Image */}
      <div
        className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl md:h-[100px] md:w-[100px]"
        style={{ background: imageGradient }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={100}
            height={100}
            className="rounded-xl object-cover"
          />
        ) : (
          <Package className="h-7 w-7 text-white/50 md:h-10 md:w-10" />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-[calc(100%-100px)] md:min-w-0">
        <p className="mb-1 text-[11px] text-[#64748B] md:text-xs">{brand}</p>
        <p className="mb-2 text-[13px] font-bold text-[#1E293B] md:text-base">{name}</p>
        {option && (
          <p className="mb-3 text-xs text-[#64748B] md:text-[13px]">{option}</p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => onWriteReview?.(id)}
            className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#1E293B] transition-colors hover:border-[#0066FF] hover:text-[#0066FF] md:px-3.5 md:py-2 md:text-xs"
          >
            <Star className="h-3.5 w-3.5 md:h-[14px] md:w-[14px]" />
            리뷰 작성
          </Button>
          <Button
            variant="outline"
            onClick={() => onInquiry?.(id)}
            className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#1E293B] transition-colors hover:border-[#0066FF] hover:text-[#0066FF] md:px-3.5 md:py-2 md:text-xs"
          >
            <MessageCircle className="h-3.5 w-3.5 md:h-[14px] md:w-[14px]" />
            문의
          </Button>
          <Button
            variant="outline"
            onClick={() => onReorder?.(id)}
            className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#1E293B] transition-colors hover:border-[#0066FF] hover:text-[#0066FF] md:px-3.5 md:py-2 md:text-xs"
          >
            <Repeat className="h-3.5 w-3.5 md:h-[14px] md:w-[14px]" />
            재구매
          </Button>
        </div>
      </div>

      {/* Price & Quantity */}
      <div className="flex w-full items-center justify-between border-t border-[#E2E8F0] pt-3 md:w-auto md:min-w-[120px] md:flex-col md:items-end md:justify-center md:border-t-0 md:pt-0">
        <span className="text-base font-extrabold text-[#1E293B] md:mb-1 md:text-lg">
          {formatPrice(price)}원
        </span>
        <span className="text-xs text-[#64748B] md:text-[13px]">수량: {quantity}개</span>
      </div>
    </div>
  );
}

export default OrderDetailItem;
