'use client';

import { CreditCard } from 'lucide-react';

export type PaymentMethod = '' | 'card' | 'kakao' | 'naver' | 'toss' | 'transfer';

interface PaymentMethodSelectProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

export function PaymentMethodSelect({ value, onChange }: PaymentMethodSelectProps) {
  return (
    <section className="mb-5 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:mb-6 md:p-7">
      {/* Title */}
      <h2 className="mb-4 flex items-center gap-2 border-b border-[#E2E8F0] pb-4 text-sm font-bold text-[#1E293B] md:mb-6 md:gap-2.5 md:pb-4 md:text-lg">
        <CreditCard className="h-5 w-5 text-[#10B981] md:h-[22px] md:w-[22px]" />
        결제 방법
      </h2>

      {/* Select */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as PaymentMethod)}
        className="w-full cursor-pointer rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-3 text-sm transition-colors focus:border-[#10B981] focus:outline-none md:px-4 md:text-[15px]"
      >
        <option value="">결제 방법을 선택해주세요</option>
        <option value="card">신용/체크카드</option>
        <option value="kakao">카카오페이</option>
        <option value="naver">네이버페이</option>
        <option value="toss">토스페이</option>
        <option value="transfer">계좌이체</option>
      </select>
    </section>
  );
}

export default PaymentMethodSelect;
