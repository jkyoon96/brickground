'use client';

import { Check, Hash } from 'lucide-react';

interface OrderCompleteSuccessProps {
  orderNumber: string;
  title?: string;
  message?: string;
}

export function OrderCompleteSuccess({
  orderNumber,
  title = '주문이 완료되었습니다!',
  message = '주문해주셔서 감사합니다. 주문 내역은 마이페이지에서 확인하실 수 있습니다.',
}: OrderCompleteSuccessProps) {
  return (
    <div className="mb-10 text-center md:mb-12">
      {/* Success Icon with Animation */}
      <div className="mx-auto mb-6 flex h-20 w-20 animate-bounce-once items-center justify-center rounded-full bg-gradient-to-br from-[#6BCB77] to-[#4ECDC4] md:mb-7 md:h-[120px] md:w-[120px]">
        <Check className="h-10 w-10 text-white md:h-[60px] md:w-[60px]" />
      </div>

      {/* Title */}
      <h1 className="mb-3 text-2xl font-extrabold text-[#6BCB77] md:text-[32px]">{title}</h1>

      {/* Message */}
      <p className="mb-5 text-sm text-[#64748B] md:text-base">{message}</p>

      {/* Order Number */}
      <div className="mt-5 inline-flex items-center gap-2 rounded-[20px] bg-white px-5 py-3 shadow-[0_4px_20px_rgba(107,203,119,0.15)] md:px-6">
        <Hash className="h-[18px] w-[18px] text-[#0066FF]" />
        <span className="text-sm font-semibold text-[#1E293B] md:text-base">
          주문번호: <span className="text-[#0066FF]">{orderNumber}</span>
        </span>
      </div>
    </div>
  );
}

export default OrderCompleteSuccess;
