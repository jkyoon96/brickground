'use client';

import { Info } from 'lucide-react';

interface CouponInfoBoxProps {
  notices?: string[];
}

const defaultNotices = [
  '쿠폰은 주문당 1개만 사용 가능합니다.',
  '일부 쿠폰은 특정 카테고리에만 적용됩니다.',
  '유효기간이 지난 쿠폰은 자동 소멸됩니다.',
  '주문 취소 시 사용한 쿠폰은 자동 복원됩니다.',
];

export function CouponInfoBox({ notices = defaultNotices }: CouponInfoBoxProps) {
  return (
    <div className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
      <h4 className="mb-3 flex items-center gap-2 font-bold text-[#1E293B]">
        <Info className="h-5 w-5 text-[#0066FF]" />
        쿠폰 사용 안내
      </h4>
      <ul className="space-y-2 text-sm text-[#64748B]">
        {notices.map((notice, index) => (
          <li key={index}>* {notice}</li>
        ))}
      </ul>
    </div>
  );
}

export default CouponInfoBox;
