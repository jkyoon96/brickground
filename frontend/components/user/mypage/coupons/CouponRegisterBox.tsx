'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CouponRegisterBoxProps {
  onRegister?: (code: string) => void;
}

export function CouponRegisterBox({ onRegister }: CouponRegisterBoxProps) {
  const [code, setCode] = useState('');

  const handleRegister = () => {
    if (code.trim()) {
      onRegister?.(code.trim());
      setCode('');
    }
  };

  return (
    <div className="mb-6 flex flex-col items-center gap-3 rounded-[20px] border border-[rgba(0,102,255,0.2)] bg-gradient-to-br from-[rgba(0,102,255,0.1)] to-[rgba(59,130,246,0.05)] p-4 text-center md:flex-row md:gap-4 md:p-6 md:text-left">
      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[rgba(0,102,255,0.2)] md:h-12 md:w-12">
        <Plus className="h-5 w-5 text-[#0066FF] md:h-6 md:w-6" />
      </div>

      {/* Input */}
      <div className="w-full flex-1">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="쿠폰 코드를 입력해 주세요"
          className="w-full rounded-xl border-2 border-[#E2E8F0] px-4 py-2.5 text-sm transition-colors focus:border-[#0066FF] focus:outline-none md:py-3"
        />
      </div>

      {/* Button */}
      <Button
        variant="gradient"
        onClick={handleRegister}
        className="w-full rounded-xl bg-gradient-to-r from-[#0066FF] to-[#3B82F6] px-6 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,102,255,0.3)] md:w-auto md:px-8 md:py-3"
      >
        쿠폰 등록
      </Button>
    </div>
  );
}

export default CouponRegisterBox;
