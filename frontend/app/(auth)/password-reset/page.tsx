'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Key, Lock, Check, ArrowLeft, LogIn, UserPlus } from 'lucide-react';
import { Input, Button } from '@/components/ui';
import { BrandSection } from '@/components/user';
import { cn } from '@/lib/utils';

type Step = 'email' | 'verify' | 'reset' | 'complete';

export default function PasswordResetPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const steps = [
    { id: 'email', label: '이메일 입력', number: 1 },
    { id: 'verify', label: '인증코드 확인', number: 2 },
    { id: 'reset', label: '새 비밀번호', number: 3 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: API call to send verification code
      console.log('Request code for:', email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep('verify');
    } catch {
      setError('인증코드 발송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: API call to verify code
      console.log('Verify code:', code);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep('reset');
    } catch {
      setError('인증코드가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // TODO: API call to reset password
      console.log('Reset password for:', email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep('complete');
    } catch {
      setError('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'verify') setStep('email');
    else if (step === 'reset') setStep('verify');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 md:p-10">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl md:min-h-[600px]">
        {/* Brand Section */}
        <BrandSection tagline="비밀번호 재설정" />

        {/* Form Section */}
        <div className="flex flex-1 flex-col justify-center p-6 md:p-12 lg:p-16">
          {step !== 'complete' ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="mb-2 font-display text-2xl font-extrabold text-gray-900 md:text-3xl">
                  비밀번호 찾기
                </h1>
                <p className="text-sm text-gray-500 md:text-base">
                  가입하신 이메일로 인증코드를 보내드립니다
                </p>
              </div>

              {/* Progress Steps */}
              <div className="mb-8 flex items-center justify-center gap-2">
                {steps.map((s, index) => (
                  <div key={s.id} className="flex items-center">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors',
                        index <= currentStepIndex
                          ? 'bg-pixar-blue text-white'
                          : 'bg-gray-200 text-gray-500'
                      )}
                    >
                      {index < currentStepIndex ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        s.number
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          'mx-2 h-1 w-8 rounded-full transition-colors md:w-12',
                          index < currentStepIndex ? 'bg-pixar-blue' : 'bg-gray-200'
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Email Input */}
              {step === 'email' && (
                <form onSubmit={handleRequestCode} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">이메일</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="가입하신 이메일을 입력하세요"
                      icon={<Mail className="h-5 w-5" />}
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <Button type="submit" className="h-12 w-full" size="lg" loading={loading}>
                    <Mail className="h-5 w-5" />
                    인증코드 받기
                  </Button>
                </form>
              )}

              {/* Step 2: Verify Code */}
              {step === 'verify' && (
                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div className="rounded-xl bg-blue-50 p-4">
                    <p className="text-sm text-blue-700">
                      <strong>{email}</strong>으로 인증코드를 발송했습니다.
                      <br />
                      이메일을 확인해주세요.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">인증코드</label>
                    <Input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="6자리 인증코드 입력"
                      icon={<Key className="h-5 w-5" />}
                      maxLength={6}
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12"
                      onClick={handleBack}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Button type="submit" className="h-12 flex-1" size="lg" loading={loading}>
                      <Check className="h-5 w-5" />
                      인증 확인
                    </Button>
                  </div>
                </form>
              )}

              {/* Step 3: Reset Password */}
              {step === 'reset' && (
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">새 비밀번호</label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="8자 이상, 영문+숫자+특수문자"
                      icon={<Lock className="h-5 w-5" />}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">새 비밀번호 확인</label>
                    <Input
                      type="password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      placeholder="비밀번호를 다시 입력하세요"
                      icon={<Lock className="h-5 w-5" />}
                      required
                    />
                    {password && passwordConfirm && password !== passwordConfirm && (
                      <p className="text-xs text-red-500">비밀번호가 일치하지 않습니다</p>
                    )}
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12"
                      onClick={handleBack}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      type="submit"
                      className="h-12 flex-1"
                      size="lg"
                      loading={loading}
                      disabled={!password || !passwordConfirm || password !== passwordConfirm}
                    >
                      <Lock className="h-5 w-5" />
                      비밀번호 재설정
                    </Button>
                  </div>
                </form>
              )}
            </>
          ) : (
            /* Complete */
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="mb-2 text-2xl font-extrabold text-gray-900">
                비밀번호가 변경되었습니다
              </h2>
              <p className="mb-8 text-gray-500">
                새로운 비밀번호로 로그인해주세요
              </p>
              <Link href="/login">
                <Button className="h-12 w-full" size="lg">
                  <LogIn className="h-5 w-5" />
                  로그인하기
                </Button>
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          {step !== 'complete' && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:bg-pixar-blue hover:text-white"
              >
                <LogIn className="h-4 w-4" />
                로그인
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:bg-pixar-blue hover:text-white"
              >
                <UserPlus className="h-4 w-4" />
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
