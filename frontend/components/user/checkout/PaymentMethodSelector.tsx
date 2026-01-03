'use client';

import { CreditCard, Wallet, Building2, Receipt, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type PaymentMethodType =
  | 'credit_card'
  | 'kakao_pay'
  | 'naver_pay'
  | 'bank_transfer'
  | 'virtual_account'
  | 'toss_pay';

interface PaymentMethod {
  id: PaymentMethodType;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

interface PaymentMethodSelectorProps {
  selectedMethod?: PaymentMethodType;
  onMethodChange?: (method: PaymentMethodType) => void;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit_card',
    label: '신용/체크카드',
    icon: <CreditCard className="h-6 w-6" />,
  },
  {
    id: 'kakao_pay',
    label: '카카오페이',
    icon: <Wallet className="h-6 w-6" />,
  },
  {
    id: 'naver_pay',
    label: '네이버페이',
    icon: <Wallet className="h-6 w-6" />,
  },
  {
    id: 'bank_transfer',
    label: '계좌이체',
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    id: 'virtual_account',
    label: '가상계좌',
    icon: <Receipt className="h-6 w-6" />,
  },
  {
    id: 'toss_pay',
    label: '토스페이',
    icon: <Smartphone className="h-6 w-6" />,
  },
];

export function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-6">
      <h2 className="mb-4 text-base font-bold text-[#1E293B] md:text-lg">결제 수단</h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {paymentMethods.map((method) => (
          <Button
            key={method.id}
            variant="ghost"
            onClick={() => onMethodChange?.(method.id)}
            className={cn(
              'flex h-auto flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
              selectedMethod === method.id
                ? 'border-[#FF6B35] bg-[#FFF5F0]'
                : 'border-[#E2E8F0] bg-white hover:border-[#FF6B35]/50'
            )}
          >
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full',
                selectedMethod === method.id
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-[#F8FAFC] text-[#64748B]'
              )}
            >
              {method.icon}
            </div>
            <span
              className={cn(
                'text-sm font-medium',
                selectedMethod === method.id ? 'text-[#FF6B35]' : 'text-[#1E293B]'
              )}
            >
              {method.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export type { PaymentMethodType };
export default PaymentMethodSelector;
