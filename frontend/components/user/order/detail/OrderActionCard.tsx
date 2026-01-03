'use client';

import { Download, RefreshCcw, XCircle, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface OrderActionCardProps {
  canCancel?: boolean;
  canExchange?: boolean;
  supportPhone?: string;
  onDownloadReceipt?: () => void;
  onExchangeReturn?: () => void;
  onCancelOrder?: () => void;
}

export function OrderActionCard({
  canCancel = true,
  canExchange = true,
  supportPhone = '1588-1234',
  onDownloadReceipt,
  onExchangeReturn,
  onCancelOrder,
}: OrderActionCardProps) {
  return (
    <div className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
      {/* Action Buttons */}
      <div className="space-y-2.5">
        <Button
          onClick={onDownloadReceipt}
          className="w-full rounded-xl bg-[#0066FF] hover:bg-[#0052CC]"
        >
          <Download className="h-[18px] w-[18px]" />
          영수증 다운로드
        </Button>

        {canExchange && (
          <Button
            variant="outline"
            onClick={onExchangeReturn}
            className="w-full rounded-xl border-2 border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-white"
          >
            <RefreshCcw className="h-[18px] w-[18px]" />
            교환/반품 신청
          </Button>
        )}

        {canCancel && (
          <Button
            variant="outline"
            onClick={onCancelOrder}
            className="w-full rounded-xl border-2 border-[#FF6B6B] bg-white text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white"
          >
            <XCircle className="h-[18px] w-[18px]" />
            주문 취소
          </Button>
        )}
      </div>

      {/* Help Section */}
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-[rgba(0,102,255,0.05)] p-3 md:gap-4 md:p-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0066FF] md:h-10 md:w-10">
          <Headphones className="h-4 w-4 text-white md:h-5 md:w-5" />
        </div>
        <div className="text-[13px] md:text-sm">
          <p className="mb-0.5 font-semibold text-[#1E293B]">도움이 필요하신가요?</p>
          <p className="text-xs text-[#64748B] md:text-[13px]">고객센터 {supportPhone}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderActionCard;
