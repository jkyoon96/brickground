'use client';

import Link from 'next/link';
import { Calendar, Clock, Users, CheckCircle, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ClassApplyCardProps {
  price: number;
  priceUnit: string;
  nextClassDate: string;
  nextClassTime: string;
  spotsLeft: number;
  applyLink?: string;
  isWishlisted?: boolean;
  onApply?: () => void;
  onWishlistToggle?: () => void;
  disabled?: boolean;
}

export function ClassApplyCard({
  price,
  priceUnit,
  nextClassDate,
  nextClassTime,
  spotsLeft,
  applyLink = '#',
  isWishlisted = false,
  onApply,
  onWishlistToggle,
  disabled = false,
}: ClassApplyCardProps) {
  const isFewSpots = spotsLeft <= 3;

  return (
    <div className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:p-7">
      {/* Price */}
      <div className="mb-4 flex items-baseline gap-2 md:mb-5">
        <span className="text-2xl font-extrabold text-[#10B981] md:text-4xl">
          {price.toLocaleString()}원
        </span>
        <span className="text-sm text-[#64748B] md:text-base">/{priceUnit}</span>
      </div>

      {/* Info Rows */}
      <div className="mb-4 flex flex-col gap-3 border-b border-[#E2E8F0] pb-4 md:mb-6 md:gap-4 md:pb-6">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-xs text-[#64748B] md:text-sm">
            <Calendar className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            다음 수업
          </span>
          <span className="text-xs font-bold text-[#1E293B] md:text-sm">{nextClassDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-xs text-[#64748B] md:text-sm">
            <Clock className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            시간
          </span>
          <span className="text-xs font-bold text-[#1E293B] md:text-sm">{nextClassTime}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-xs text-[#64748B] md:text-sm">
            <Users className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            잔여석
          </span>
          <span
            className={cn(
              'text-xs font-bold md:text-sm',
              isFewSpots ? 'text-[#FF6B6B]' : 'text-[#1E293B]'
            )}
          >
            {spotsLeft}자리 남음
          </span>
        </div>
      </div>

      {/* Apply Button */}
      {onApply ? (
        <Button
          size="lg"
          onClick={onApply}
          disabled={disabled}
          className={cn(
            'mb-3 w-full rounded-xl',
            disabled
              ? 'bg-[#94A3B8] hover:bg-[#94A3B8]'
              : 'bg-[#10B981] hover:bg-[#059669]'
          )}
        >
          <CheckCircle className="h-5 w-5 md:h-[22px] md:w-[22px]" />
          수업 신청하기
        </Button>
      ) : (
        <Button
          asChild
          size="lg"
          className={cn(
            'mb-3 w-full rounded-xl',
            disabled
              ? 'pointer-events-none bg-[#94A3B8]'
              : 'bg-[#10B981] hover:bg-[#059669]'
          )}
        >
          <Link href={applyLink}>
            <CheckCircle className="h-5 w-5 md:h-[22px] md:w-[22px]" />
            수업 신청하기
          </Link>
        </Button>
      )}

      {/* Wishlist Button */}
      <Button
        variant="outline"
        onClick={onWishlistToggle}
        className={cn(
          'w-full rounded-xl border-2',
          isWishlisted
            ? 'border-[#10B981] bg-[rgba(16,185,129,0.1)] text-[#10B981] hover:bg-[rgba(16,185,129,0.15)]'
            : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] hover:border-[#10B981] hover:bg-[#F8FAFC]'
        )}
      >
        <Heart
          className={cn(
            'h-4 w-4 md:h-[18px] md:w-[18px]',
            isWishlisted && 'fill-[#10B981]'
          )}
        />
        {isWishlisted ? '관심 등록됨' : '관심 등록'}
      </Button>
    </div>
  );
}

export default ClassApplyCard;
