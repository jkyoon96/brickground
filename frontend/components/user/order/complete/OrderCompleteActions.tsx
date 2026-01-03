'use client';

import Link from 'next/link';
import { List, ShoppingBag, Mail, Headphones, RefreshCcw } from 'lucide-react';

interface OrderCompleteActionsProps {
  orderId?: string;
  onViewOrders?: () => void;
  onContinueShopping?: () => void;
}

export function OrderCompleteActions({
  orderId,
  onViewOrders,
  onContinueShopping,
}: OrderCompleteActionsProps) {
  return (
    <div>
      {/* Action Buttons */}
      <div className="flex flex-col justify-center gap-3 md:flex-row md:gap-4">
        <Link
          href={orderId ? `/orders/${orderId}` : '/mypage/orders'}
          onClick={onViewOrders}
          className="flex items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r from-[#FF6B35] to-[#FFD93D] px-10 py-4 text-base font-bold text-white shadow-[0_4px_15px_rgba(255,107,53,0.3)] transition-transform hover:-translate-y-0.5"
        >
          <List className="h-5 w-5" />
          주문 내역 보기
        </Link>

        <Link
          href="/products"
          onClick={onContinueShopping}
          className="flex items-center justify-center gap-2 rounded-[20px] border-2 border-[#E2E8F0] bg-white px-10 py-4 text-base font-bold text-[#1E293B] transition-colors hover:border-[#0066FF] hover:text-[#0066FF]"
        >
          <ShoppingBag className="h-5 w-5" />
          쇼핑 계속하기
        </Link>
      </div>

      {/* Additional Info */}
      <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-[#E2E8F0] pt-8 md:flex-row md:gap-10">
        <div className="flex items-center gap-2.5 text-sm text-[#64748B]">
          <Mail className="h-5 w-5 text-[#6BCB77]" />
          주문 확인 메일이 발송되었습니다
        </div>
        <div className="flex items-center gap-2.5 text-sm text-[#64748B]">
          <Headphones className="h-5 w-5 text-[#6BCB77]" />
          문의: 1588-1234
        </div>
        <div className="flex items-center gap-2.5 text-sm text-[#64748B]">
          <RefreshCcw className="h-5 w-5 text-[#6BCB77]" />
          30일 이내 무료 교환/반품
        </div>
      </div>
    </div>
  );
}

export default OrderCompleteActions;
