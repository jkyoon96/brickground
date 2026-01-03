'use client';

import { MessageCircle, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SocialLoginButtonsProps {
  onKakaoClick?: () => void;
  onNaverClick?: () => void;
  onGoogleClick?: () => void;
}

export function SocialLoginButtons({
  onKakaoClick,
  onNaverClick,
  onGoogleClick,
}: SocialLoginButtonsProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      {/* Kakao */}
      <Button
        type="button"
        variant="ghost"
        onClick={onKakaoClick}
        className="h-12 flex-1 border-2 border-[#FEE500] bg-[#FEE500] text-black hover:bg-[#FEE500]/90 hover:-translate-y-0.5 hover:shadow-lg rounded-xl"
      >
        <MessageCircle className="h-5 w-5" />
        <span>카카오</span>
      </Button>

      {/* Naver */}
      <Button
        type="button"
        variant="ghost"
        onClick={onNaverClick}
        className="h-12 flex-1 border-2 border-[#03C75A] bg-[#03C75A] text-white hover:bg-[#03C75A]/90 hover:-translate-y-0.5 hover:shadow-lg rounded-xl"
      >
        <span className="text-base font-extrabold">N</span>
        <span>네이버</span>
      </Button>

      {/* Google */}
      <Button
        type="button"
        variant="ghost"
        onClick={onGoogleClick}
        className="h-12 flex-1 border-2 border-gray-200 bg-white text-gray-900 hover:bg-gray-50 hover:-translate-y-0.5 hover:border-pixar-blue hover:shadow-lg rounded-xl"
      >
        <Chrome className="h-5 w-5" />
        <span>구글</span>
      </Button>
    </div>
  );
}
