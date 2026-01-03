'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Key } from 'lucide-react';
import { BrandSection, LoginForm } from '@/components/user';
import { useAuthStore } from '@/lib/stores/authStore';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    // Mock login: user1@brickground.com / 1
    if (data.email === 'user1@brickground.com' && data.password === '1') {
      // Login success - store user info
      login({
        email: data.email,
        name: '브릭마스터',
      });
      router.push('/');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
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
      <div className="flex w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl md:min-h-[600px]">
        {/* Brand Section */}
        <BrandSection />

        {/* Form Section */}
        <div className="flex flex-1 flex-col justify-center p-6 md:p-12 lg:p-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 font-display text-2xl font-extrabold text-gray-900 md:text-3xl">
              로그인
            </h1>
            <p className="text-sm text-gray-500 md:text-base">
              브릭 창작의 세계에 오신 것을 환영합니다
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Login Form */}
          <LoginForm
            onSubmit={handleSubmit}
            onKakaoLogin={handleKakaoLogin}
            onNaverLogin={handleNaverLogin}
            onGoogleLogin={handleGoogleLogin}
          />

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            아직 계정이 없으신가요?{' '}
            <Link href="/register" className="font-semibold text-pixar-blue hover:underline">
              회원가입
            </Link>
          </p>

          {/* Navigation Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:bg-pixar-blue hover:text-white"
            >
              <UserPlus className="h-4 w-4" />
              회원가입
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
