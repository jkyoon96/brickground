'use client';

import Link from 'next/link';
import { LogIn, Key } from 'lucide-react';
import { BrandSection, RegisterForm } from '@/components/user';

export default function RegisterPage() {
  const handleSubmit = (data: {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    nickname: string;
    phone: string;
  }, agreements: string[]) => {
    // TODO: Implement registration logic
    console.log('Register:', data, 'Agreements:', agreements);
  };

  const handleKakaoLogin = () => {
    // TODO: Implement Kakao OAuth
    console.log('Kakao login');
  };

  const handleNaverLogin = () => {
    // TODO: Implement Naver OAuth
    console.log('Naver login');
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 md:p-10">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl md:min-h-[700px]">
        {/* Brand Section */}
        <BrandSection />

        {/* Form Section */}
        <div className="flex flex-1 flex-col justify-center p-6 md:p-12 lg:p-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 font-display text-2xl font-extrabold text-gray-900 md:text-3xl">
              회원가입
            </h1>
            <p className="text-sm text-gray-500 md:text-base">
              브릭 창작의 세계에서 새로운 경험을 시작하세요
            </p>
          </div>

          {/* Register Form */}
          <RegisterForm
            onSubmit={handleSubmit}
            onKakaoLogin={handleKakaoLogin}
            onNaverLogin={handleNaverLogin}
            onGoogleLogin={handleGoogleLogin}
          />

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="font-semibold text-pixar-blue hover:underline">
              로그인
            </Link>
          </p>

          {/* Navigation Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:bg-pixar-blue hover:text-white"
            >
              <LogIn className="h-4 w-4" />
              로그인
            </Link>
            <Link
              href="/password-reset"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:bg-pixar-blue hover:text-white"
            >
              <Key className="h-4 w-4" />
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
