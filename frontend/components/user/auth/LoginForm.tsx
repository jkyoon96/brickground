'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui';
import { SocialLoginButtons } from './SocialLoginButtons';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  onKakaoLogin?: () => void;
  onNaverLogin?: () => void;
  onGoogleLogin?: () => void;
  loading?: boolean;
}

export function LoginForm({
  onSubmit,
  onKakaoLogin,
  onNaverLogin,
  onGoogleLogin,
  loading = false,
}: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Social Login */}
      <SocialLoginButtons
        onKakaoClick={onKakaoLogin}
        onNaverClick={onNaverLogin}
        onGoogleClick={onGoogleLogin}
      />

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-500">또는 이메일로 로그인</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">이메일</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          icon={<Mail className="h-5 w-5" />}
          required
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">비밀번호</label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            icon={<Lock className="h-5 w-5" />}
            className="pr-12"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 cursor-pointer accent-pixar-blue"
          />
          <label htmlFor="rememberMe" className="cursor-pointer text-sm text-gray-900">
            로그인 상태 유지
          </label>
        </div>
        <Link
          href="/password-reset"
          className="text-sm font-semibold text-pixar-blue hover:underline"
        >
          비밀번호 찾기
        </Link>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="h-12 w-full" size="lg" loading={loading}>
        <LogIn className="h-5 w-5" />
        로그인
      </Button>
    </form>
  );
}
