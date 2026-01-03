'use client';

import { useState } from 'react';
import { Tag, Coins } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DiscountSectionProps {
  availableCoupons?: number;
  availablePoints?: number;
  appliedCouponDiscount?: number;
  appliedPoints?: number;
  onCouponApply?: (code: string) => void;
  onPointsApply?: (points: number) => void;
}

export function DiscountSection({
  availableCoupons = 0,
  availablePoints = 0,
  appliedCouponDiscount = 0,
  appliedPoints = 0,
  onCouponApply,
  onPointsApply,
}: DiscountSectionProps) {
  const [couponCode, setCouponCode] = useState('');
  const [pointsInput, setPointsInput] = useState('');

  const formatNumber = (value: number) => {
    return value.toLocaleString('ko-KR');
  };

  const handleCouponApply = () => {
    if (couponCode.trim()) {
      onCouponApply?.(couponCode);
      setCouponCode('');
    }
  };

  const handlePointsApply = () => {
    const points = parseInt(pointsInput, 10);
    if (!isNaN(points) && points > 0) {
      onPointsApply?.(Math.min(points, availablePoints));
    }
  };

  const handleUseAllPoints = () => {
    setPointsInput(String(availablePoints));
    onPointsApply?.(availablePoints);
  };

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-6">
      <h2 className="mb-4 text-base font-bold text-[#1E293B] md:text-lg">할인 적용</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Coupon Input */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Tag className="h-4 w-4 text-[#FF6B35]" />
            <span className="text-sm font-medium text-[#1E293B]">쿠폰</span>
            {availableCoupons > 0 && (
              <span className="text-xs text-[#64748B]">
                (사용 가능 {availableCoupons}장)
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="쿠폰 코드 입력"
              className="flex-1 rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#FF6B35]"
            />
            <Button
              onClick={handleCouponApply}
              className="flex-shrink-0 rounded-xl bg-[#1E293B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#334155]"
            >
              적용
            </Button>
          </div>
          {appliedCouponDiscount > 0 && (
            <p className="mt-2 text-sm text-[#6BCB77]">
              -{formatNumber(appliedCouponDiscount)}원 할인 적용됨
            </p>
          )}
        </div>

        {/* Points Input */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Coins className="h-4 w-4 text-[#FFD93D]" />
            <span className="text-sm font-medium text-[#1E293B]">포인트</span>
            <span className="text-xs text-[#64748B]">
              (사용 가능 {formatNumber(availablePoints)}P)
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={pointsInput}
              onChange={(e) => setPointsInput(e.target.value)}
              placeholder="0"
              min="0"
              max={availablePoints}
              className="flex-1 rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#FF6B35]"
            />
            <Button
              variant="outline"
              onClick={handleUseAllPoints}
              className="flex-shrink-0 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm font-medium text-[#64748B] transition-colors hover:border-[#FF6B35] hover:text-[#FF6B35]"
            >
              전액
            </Button>
            <Button
              onClick={handlePointsApply}
              className="flex-shrink-0 rounded-xl bg-[#1E293B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#334155]"
            >
              적용
            </Button>
          </div>
          {appliedPoints > 0 && (
            <p className="mt-2 text-sm text-[#6BCB77]">
              -{formatNumber(appliedPoints)}P 사용됨
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscountSection;
