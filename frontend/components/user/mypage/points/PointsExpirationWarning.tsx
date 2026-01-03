'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PointsExpirationWarningProps {
  expiringPoints: number;
  expirationDate: string;
  onShopClick?: () => void;
}

export function PointsExpirationWarning({
  expiringPoints,
  expirationDate,
  onShopClick,
}: PointsExpirationWarningProps) {
  return (
    <div className="mb-6 flex flex-col items-center gap-3 rounded-2xl border border-[rgba(0,102,255,0.2)] bg-gradient-to-br from-[rgba(0,102,255,0.1)] to-[rgba(59,130,246,0.05)] p-4 text-center md:flex-row md:gap-4 md:p-5 md:text-left">
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(0,102,255,0.2)] md:h-12 md:w-12">
        <AlertCircle className="h-5 w-5 text-[#0066FF] md:h-6 md:w-6" />
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="font-bold text-[#0066FF]">
          {expiringPoints.toLocaleString()}P가 30일 내 소멸 예정이에요!
        </p>
        <p className="text-sm text-[#64748B]">소멸 예정일: {expirationDate}</p>
      </div>

      {/* Button */}
      <Button
        onClick={onShopClick}
        className="w-full rounded-xl bg-[#0066FF] px-4 py-2.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,102,255,0.3)] md:w-auto"
      >
        쇼핑하러 가기
      </Button>
    </div>
  );
}

export default PointsExpirationWarning;
