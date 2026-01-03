'use client';

import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CheckoutSummaryProps {
  subtotal: number;
  productDiscount?: number;
  couponDiscount?: number;
  pointsUsed?: number;
  shippingFee: number;
  onPay?: () => void;
  isAgreementChecked?: boolean;
}

export function CheckoutSummary({
  subtotal,
  productDiscount = 0,
  couponDiscount = 0,
  pointsUsed = 0,
  shippingFee,
  onPay,
  isAgreementChecked = false,
}: CheckoutSummaryProps) {
  const formatPrice = (value: number) => {
    return value.toLocaleString('ko-KR');
  };

  const totalDiscount = productDiscount + couponDiscount + pointsUsed;
  const total = subtotal - totalDiscount + shippingFee;

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-6">
      <h2 className="mb-4 text-base font-bold text-[#1E293B] md:text-lg">결제 금액</h2>

      {/* Price Breakdown */}
      <div className="mb-4 space-y-3 border-b border-[#E2E8F0] pb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#64748B]">상품금액</span>
          <span className="text-sm font-medium text-[#1E293B]">{formatPrice(subtotal)}원</span>
        </div>

        {productDiscount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#64748B]">상품할인</span>
            <span className="text-sm font-medium text-[#FF6B35]">
              -{formatPrice(productDiscount)}원
            </span>
          </div>
        )}

        {couponDiscount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#64748B]">쿠폰할인</span>
            <span className="text-sm font-medium text-[#FF6B35]">
              -{formatPrice(couponDiscount)}원
            </span>
          </div>
        )}

        {pointsUsed > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#64748B]">포인트 사용</span>
            <span className="text-sm font-medium text-[#FF6B35]">
              -{formatPrice(pointsUsed)}원
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#64748B]">배송비</span>
          <span className="text-sm font-medium text-[#1E293B]">
            {shippingFee === 0 ? '무료' : `${formatPrice(shippingFee)}원`}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-base font-bold text-[#1E293B]">총 결제금액</span>
        <span className="text-xl font-bold text-[#FF6B35] md:text-2xl">
          {formatPrice(total)}원
        </span>
      </div>

      {/* Pay Button */}
      <Button
        variant="gradient"
        onClick={onPay}
        disabled={!isAgreementChecked}
        className="w-full rounded-[20px] bg-[#FF6B35] py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#E55A2B] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#94A3B8]"
      >
        {formatPrice(total)}원 결제하기
      </Button>

      {/* Security Note */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#94A3B8]">
        <Shield className="h-3.5 w-3.5" />
        <span>안전한 결제 시스템으로 보호됩니다</span>
      </div>
    </div>
  );
}

export default CheckoutSummary;
