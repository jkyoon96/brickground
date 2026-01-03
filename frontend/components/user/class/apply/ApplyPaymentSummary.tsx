'use client';

import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PaymentRow {
  label: string;
  amount: number;
  isDiscount?: boolean;
}

interface ApplyPaymentSummaryProps {
  rows: PaymentRow[];
  totalAmount: number;
  onSubmit: () => void;
  disabled?: boolean;
  submitLabel?: string;
}

export function ApplyPaymentSummary({
  rows,
  totalAmount,
  onSubmit,
  disabled = false,
  submitLabel = '결제하기',
}: ApplyPaymentSummaryProps) {
  return (
    <div className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:p-6">
      {/* Title */}
      <h3 className="mb-4 text-sm font-bold text-[#1E293B] md:mb-5 md:text-base">결제 정보</h3>

      {/* Payment Rows */}
      <div className="mb-4 space-y-3 border-b border-[#E2E8F0] pb-4 md:mb-5 md:pb-5">
        {rows.map((row, index) => (
          <div
            key={index}
            className={cn(
              'flex items-center justify-between text-xs md:text-sm',
              row.isDiscount ? 'text-[#10B981]' : 'text-[#1E293B]'
            )}
          >
            <span>{row.label}</span>
            <span>
              {row.isDiscount ? '-' : ''}
              {Math.abs(row.amount).toLocaleString()}원
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mb-5 flex items-center justify-between md:mb-6">
        <span className="text-sm font-bold text-[#1E293B] md:text-base">총 결제금액</span>
        <span className="text-xl font-extrabold text-[#10B981] md:text-[28px]">
          {totalAmount.toLocaleString()}원
        </span>
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={disabled}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold text-white transition-all md:py-[18px] md:text-lg',
          disabled
            ? 'cursor-not-allowed bg-[#94A3B8]'
            : 'bg-[#10B981] hover:bg-[#059669]'
        )}
      >
        <CheckCircle className="h-5 w-5 md:h-[22px] md:w-[22px]" />
        {submitLabel}
      </button>
    </div>
  );
}

export default ApplyPaymentSummary;
