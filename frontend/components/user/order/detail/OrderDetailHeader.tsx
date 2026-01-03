'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Truck, CheckCircle, XCircle, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type OrderStatus = 'pending' | 'preparing' | 'shipping' | 'delivered' | 'cancelled';

interface OrderDetailHeaderProps {
  orderNumber: string;
  status: OrderStatus;
  onBack?: () => void;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; icon: React.ReactNode; colorClass: string }
> = {
  pending: {
    label: '결제 대기',
    icon: <Package className="h-5 w-5" />,
    colorClass: 'text-[#64748B]',
  },
  preparing: {
    label: '상품 준비중',
    icon: <Package className="h-5 w-5" />,
    colorClass: 'text-[#FFD93D]',
  },
  shipping: {
    label: '배송중',
    icon: <Truck className="h-5 w-5" />,
    colorClass: 'text-[#0066FF]',
  },
  delivered: {
    label: '배송 완료',
    icon: <CheckCircle className="h-5 w-5" />,
    colorClass: 'text-[#6BCB77]',
  },
  cancelled: {
    label: '주문 취소',
    icon: <XCircle className="h-5 w-5" />,
    colorClass: 'text-[#FF6B6B]',
  },
};

export function OrderDetailHeader({
  orderNumber,
  status,
  onBack,
}: OrderDetailHeaderProps) {
  const router = useRouter();
  const config = statusConfig[status];

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0066FF] to-[#4ECDC4] px-4 py-6 text-white md:px-10 md:py-10">
      <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30 md:h-11 md:w-11"
          >
            <ArrowLeft className="h-5 w-5 text-white md:h-[22px] md:w-[22px]" />
          </Button>
          <div>
            <h1 className="mb-1 text-[22px] font-extrabold md:text-[28px]">주문 상세</h1>
            <span className="text-xs opacity-80 md:text-sm">주문번호: {orderNumber}</span>
          </div>
        </div>

        <div
          className={cn(
            'flex items-center gap-2 rounded-3xl bg-white px-4 py-2 text-sm font-bold md:px-6 md:py-3 md:text-base',
            config.colorClass
          )}
        >
          {config.icon}
          {config.label}
        </div>
      </div>
    </div>
  );
}

export type { OrderStatus };
export default OrderDetailHeader;
