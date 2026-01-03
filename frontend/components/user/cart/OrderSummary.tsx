'use client';

import Link from 'next/link';
import {
  Receipt,
  Ticket,
  CreditCard,
  Wallet,
  Smartphone,
  Building,
  ShieldCheck,
  Truck,
  RefreshCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  itemCount: number;
  availableCoupons?: number;
  couponCode?: string;
  onCouponApply?: (code: string) => void;
  onCheckout?: () => void;
}

export function OrderSummary({
  subtotal,
  discount,
  shippingFee,
  total,
  itemCount,
  availableCoupons = 0,
  couponCode = '',
  onCouponApply,
  onCheckout,
}: OrderSummaryProps) {
  const formatPrice = (price: number) => price.toLocaleString();

  const handleCouponSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get('couponCode') as string;
    if (code && onCouponApply) {
      onCouponApply(code);
    }
  };

  return (
    <div className="sticky top-10 h-fit rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-7">
      {/* Title */}
      <h2 className="mb-5 flex items-center gap-2.5 text-lg font-extrabold text-[#1E293B] md:mb-6 md:text-xl">
        <Receipt className="h-5 w-5 text-[#FF6B35] md:h-6 md:w-6" />
        주문 요약
      </h2>

      {/* Summary Rows */}
      <div className="space-y-0">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] py-3">
          <span className="text-sm text-[#64748B] md:text-[15px]">상품 금액</span>
          <span className="text-base font-bold text-[#1E293B]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-[#E2E8F0] py-3">
          <span className="text-sm text-[#64748B] md:text-[15px]">상품 할인</span>
          <span className="text-base font-bold text-[#FF6B6B]">-{formatPrice(discount)}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-[#64748B] md:text-[15px]">배송비</span>
          <span className="text-base font-bold text-[#6BCB77]">
            {shippingFee === 0 ? '무료' : formatPrice(shippingFee)}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-[#E2E8F0]" />

      {/* Total */}
      <div className="mb-5 flex items-baseline justify-between md:mb-6">
        <span className="text-base font-bold text-[#1E293B] md:text-lg">총 결제 금액</span>
        <span className="text-2xl font-extrabold text-[#FF6B35] md:text-[28px]">
          {formatPrice(total)}
          <span className="text-base md:text-lg">원</span>
        </span>
      </div>

      {/* Coupon Section */}
      <div className="mb-5 rounded-xl bg-[#F8FAFC] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-[#1E293B]">
            <Ticket className="h-4 w-4 text-[#FF6B35]" />
            쿠폰 적용
          </span>
          {availableCoupons > 0 && (
            <Link href="/mypage/coupons" className="text-xs text-[#0066FF] hover:underline">
              사용 가능 쿠폰 {availableCoupons}장
            </Link>
          )}
        </div>
        <form onSubmit={handleCouponSubmit} className="flex flex-col gap-2 md:flex-row">
          <input
            type="text"
            name="couponCode"
            defaultValue={couponCode}
            placeholder="쿠폰 코드 입력"
            className="flex-1 rounded-xl border-2 border-[#E2E8F0] px-3 py-2.5 text-sm outline-none focus:border-[#FF6B35]"
          />
          <Button
            type="submit"
            className="w-full rounded-xl bg-[#1E293B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0f172a] md:w-auto"
          >
            적용
          </Button>
        </form>
      </div>

      {/* Checkout Button */}
      <Button
        variant="gradient"
        onClick={onCheckout}
        className="flex w-full items-center justify-center gap-2.5 rounded-[20px] bg-gradient-to-r from-[#FF6B35] to-[#FFD93D] px-6 py-4 text-base font-bold text-white shadow-[0_4px_15px_rgba(255,107,53,0.4)] transition-transform hover:-translate-y-0.5 md:py-[18px] md:text-lg"
      >
        <CreditCard className="h-5 w-5 md:h-[22px] md:w-[22px]" />
        주문하기 ({itemCount}개 상품)
      </Button>

      {/* Payment Methods */}
      <div className="mt-5 flex items-center justify-center gap-3 border-t border-[#E2E8F0] pt-5 md:gap-4">
        {[CreditCard, Wallet, Smartphone, Building].map((Icon, index) => (
          <div
            key={index}
            className="flex h-6 w-10 items-center justify-center rounded bg-[#F8FAFC]"
          >
            <Icon className="h-4 w-4 text-[#64748B]" />
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="mt-5 space-y-2.5">
        {[
          { icon: ShieldCheck, text: '안전한 결제 시스템' },
          { icon: Truck, text: '5만원 이상 무료배송' },
          { icon: RefreshCcw, text: '30일 이내 무료 교환/반품' },
        ].map(({ icon: Icon, text }, index) => (
          <div key={index} className="flex items-center gap-2.5 text-xs text-[#64748B] md:text-[13px]">
            <Icon className="h-4 w-4 flex-shrink-0 text-[#6BCB77] md:h-[18px] md:w-[18px]" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderSummary;
