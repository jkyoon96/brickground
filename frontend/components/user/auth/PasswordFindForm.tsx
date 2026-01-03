'use client';

import { useState } from 'react';
import { Mail, Hash, Send, Clock, Info } from 'lucide-react';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui';
import { VerificationSteps } from './VerificationSteps';

const steps = [
  { label: '이메일 입력' },
  { label: '인증 확인' },
  { label: '재설정' },
];

interface PasswordFindFormProps {
  onRequestCode?: (email: string) => Promise<boolean>;
  onVerifyCode?: (code: string) => Promise<boolean>;
  onSubmit?: (email: string) => void;
  loading?: boolean;
}

export function PasswordFindForm({
  onRequestCode,
  onVerifyCode,
  onSubmit,
  loading = false,
}: PasswordFindFormProps) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleRequestCode = async () => {
    if (!email) return;
    setCodeLoading(true);
    try {
      const success = await onRequestCode?.(email);
      if (success !== false) {
        setIsCodeSent(true);
        setCurrentStep(2);
      }
    } finally {
      setCodeLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return;
    setVerifyLoading(true);
    try {
      const success = await onVerifyCode?.(code);
      if (success !== false) {
        setIsCodeVerified(true);
        setCurrentStep(3);
      }
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCodeVerified) {
      onSubmit?.(email);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="mb-2 font-display text-xl font-extrabold text-gray-900 md:text-2xl">
          비밀번호 찾기
        </h1>
        <p className="text-sm text-gray-500">
          가입한 이메일로 비밀번호 재설정 링크를 보내드립니다
        </p>
      </div>

      {/* Steps */}
      <VerificationSteps steps={steps} currentStep={currentStep} />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">이메일</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="가입한 이메일 주소"
                icon={<Mail className="h-5 w-5" />}
                disabled={isCodeSent}
                required
              />
            </div>
            <Button
              type="button"
              onClick={handleRequestCode}
              disabled={!email || isCodeSent}
              loading={codeLoading}
              className="shrink-0"
            >
              인증 요청
            </Button>
          </div>
        </div>

        {/* Verification Code */}
        {isCodeSent && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">인증번호</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="6자리 인증번호"
                  icon={<Hash className="h-5 w-5" />}
                  maxLength={6}
                  disabled={isCodeVerified}
                  required
                />
              </div>
              <Button
                type="button"
                onClick={handleVerifyCode}
                disabled={!code || code.length < 6 || isCodeVerified}
                loading={verifyLoading}
                className="shrink-0"
              >
                확인
              </Button>
            </div>
            <p className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              인증번호는 5분 후 만료됩니다
            </p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="h-12 w-full"
          size="lg"
          loading={loading}
          disabled={!isCodeVerified}
        >
          <Send className="h-5 w-5" />
          재설정 링크 받기
        </Button>
      </form>
    </div>
  );
}
