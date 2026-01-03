'use client';

import { useState, useCallback, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';

interface NewsletterSectionProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  onSubscribe?: (email: string) => void;
}

export function NewsletterSection({
  title = '뉴스레터 구독하고 특별 혜택 받기!',
  subtitle = '신상품 소식과 회원 전용 할인 쿠폰을 가장 먼저 받아보세요.',
  placeholder = '이메일 주소 입력',
  buttonText = '구독하기',
  onSubscribe,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (email.trim()) {
        onSubscribe?.(email);
        setEmail('');
      }
    },
    [email, onSubscribe]
  );

  return (
    <section className="mx-auto max-w-[1320px] px-4 py-8 md:px-6 md:py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFD93D] to-[#FF9F43] p-6 md:rounded-[32px] md:p-12">
        {/* Decorative circle */}
        <div className="absolute -right-[50px] -top-[50px] h-[200px] w-[200px] rounded-full bg-white/20" />

        <div className="relative z-10 text-center">
          <h2 className="mb-2 text-xl font-extrabold text-[#1E293B] md:mb-3 md:text-3xl">
            {title}
          </h2>
          <p className="mb-4 text-sm text-[#64748B] md:mb-6 md:text-base">
            {subtitle}
          </p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 md:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="w-full flex-1 rounded-2xl border-none bg-white px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#1E293B]/20 md:py-4"
              required
            />
            <Button
              type="submit"
              className="w-full rounded-2xl bg-[#1E293B] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0F172A] md:w-auto md:px-8 md:py-4"
            >
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
