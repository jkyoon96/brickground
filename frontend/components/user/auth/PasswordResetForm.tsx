'use client';

import { useState } from 'react';
import { Lock, Check, Info } from 'lucide-react';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui';

interface PasswordResetFormProps {
  onSubmit?: (newPassword: string) => void;
  loading?: boolean;
}

export function PasswordResetForm({ onSubmit, loading = false }: PasswordResetFormProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      onSubmit?.(newPassword);
    }
  };

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="mb-2 font-display text-xl font-extrabold text-gray-900 md:text-2xl">
          비밀번호 재설정
        </h1>
        <p className="text-sm text-gray-500">새로운 비밀번호를 입력해주세요</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New Password */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">새 비밀번호</label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="8자 이상, 영문+숫자+특수문자"
            icon={<Lock className="h-5 w-5" />}
            required
          />
          <p className="flex items-center gap-1 text-xs text-gray-500">
            <Info className="h-3.5 w-3.5" />
            영문, 숫자, 특수문자를 조합하여 8자 이상
          </p>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">새 비밀번호 확인</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력"
            icon={<Lock className="h-5 w-5" />}
            error={confirmPassword !== '' && !passwordsMatch}
            required
          />
          {confirmPassword && !passwordsMatch && (
            <p className="text-xs text-red-500">비밀번호가 일치하지 않습니다</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="h-12 w-full"
          size="lg"
          loading={loading}
          disabled={!passwordsMatch}
        >
          <Check className="h-5 w-5" />
          비밀번호 재설정
        </Button>
      </form>
    </div>
  );
}
