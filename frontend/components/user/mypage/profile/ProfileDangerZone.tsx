'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProfileDangerZoneProps {
  onWithdraw?: () => void;
}

export function ProfileDangerZone({ onWithdraw }: ProfileDangerZoneProps) {
  return (
    <div className="mb-6 rounded-2xl border border-[rgba(255,107,107,0.2)] bg-[rgba(255,107,107,0.05)] p-4 md:p-5">
      {/* Header */}
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#FF6B6B]">
        <AlertTriangle className="h-5 w-5" />
        계정 관리
      </h3>

      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div>
          <p className="font-semibold text-[#1E293B]">회원 탈퇴</p>
          <p className="text-sm text-[#94A3B8]">
            탈퇴 시 모든 데이터가 삭제됩니다
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onWithdraw}
          className="w-full rounded-xl bg-[rgba(255,107,107,0.1)] text-[#FF6B6B] hover:bg-[rgba(255,107,107,0.2)] hover:text-[#FF6B6B] md:w-auto"
        >
          회원 탈퇴
        </Button>
      </div>
    </div>
  );
}

export default ProfileDangerZone;
