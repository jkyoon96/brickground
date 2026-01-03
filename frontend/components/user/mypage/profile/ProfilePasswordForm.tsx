'use client';

import { useState } from 'react';
import { Lock, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfilePasswordFormProps {
  data: PasswordFormData;
  onChange: (data: PasswordFormData) => void;
  onSubmit?: (data: PasswordFormData) => Promise<boolean>;
}

export function ProfilePasswordForm({ data, onChange, onSubmit }: ProfilePasswordFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: keyof PasswordFormData, value: string) => {
    onChange({ ...data, [field]: value });
    setError('');
    setSuccess(false);
  };

  // Validation
  const isPasswordValid = data.newPassword.length >= 8;
  const isPasswordMatch = data.newPassword === data.confirmPassword && data.confirmPassword.length > 0;
  const isFormValid = data.currentPassword.length > 0 && isPasswordValid && isPasswordMatch;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Mock validation: current password must be "1"
      if (data.currentPassword !== '1') {
        setError('현재 비밀번호가 올바르지 않습니다.');
        setLoading(false);
        return;
      }

      if (onSubmit) {
        const result = await onSubmit(data);
        if (result) {
          setSuccess(true);
          onChange({ currentPassword: '', newPassword: '', confirmPassword: '' });
        }
      } else {
        // Default mock behavior
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSuccess(true);
        onChange({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch {
      setError('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
      {/* Header */}
      <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-[#1E293B]">
        <Lock className="h-5 w-5 text-[#0066FF]" />
        비밀번호 변경
      </h3>

      {/* Success Message */}
      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-600">
          <Check className="h-5 w-5" />
          비밀번호가 성공적으로 변경되었습니다.
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-bold text-[#1E293B]">
            현재 비밀번호
          </label>
          <input
            type="password"
            value={data.currentPassword}
            onChange={(e) => handleChange('currentPassword', e.target.value)}
            placeholder="현재 비밀번호 입력"
            className="w-full max-w-[400px] rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-2.5 text-sm transition-all focus:border-[#0066FF] focus:shadow-[0_0_0_4px_rgba(0,102,255,0.1)] focus:outline-none md:px-4 md:py-3.5 md:text-[15px]"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-[#1E293B]">
            새 비밀번호
          </label>
          <input
            type="password"
            value={data.newPassword}
            onChange={(e) => handleChange('newPassword', e.target.value)}
            placeholder="새 비밀번호 입력"
            className="w-full max-w-[400px] rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-2.5 text-sm transition-all focus:border-[#0066FF] focus:shadow-[0_0_0_4px_rgba(0,102,255,0.1)] focus:outline-none md:px-4 md:py-3.5 md:text-[15px]"
          />
          <p className="mt-1 text-xs text-[#94A3B8]">
            8자 이상, 영문/숫자/특수문자 포함
          </p>
          {data.newPassword.length > 0 && !isPasswordValid && (
            <p className="mt-1 text-xs text-red-500">비밀번호는 8자 이상이어야 합니다.</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-[#1E293B]">
            새 비밀번호 확인
          </label>
          <input
            type="password"
            value={data.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="새 비밀번호 다시 입력"
            className="w-full max-w-[400px] rounded-xl border-2 border-[#E2E8F0] bg-white px-3 py-2.5 text-sm transition-all focus:border-[#0066FF] focus:shadow-[0_0_0_4px_rgba(0,102,255,0.1)] focus:outline-none md:px-4 md:py-3.5 md:text-[15px]"
          />
          {data.confirmPassword.length > 0 && !isPasswordMatch && (
            <p className="mt-1 text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            loading={loading}
            className="bg-[#0066FF] hover:bg-[#0052CC] rounded-xl"
          >
            <Lock className="h-5 w-5" />
            비밀번호 변경
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePasswordForm;
