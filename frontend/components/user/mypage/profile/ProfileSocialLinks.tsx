'use client';

import { Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type SocialProvider = 'kakao' | 'naver' | 'google' | 'apple';

export interface SocialLinkStatus {
  provider: SocialProvider;
  isLinked: boolean;
}

interface ProfileSocialLinksProps {
  links: SocialLinkStatus[];
  onLink?: (provider: SocialProvider) => void;
  onUnlink?: (provider: SocialProvider) => void;
}

const providerConfig: Record<SocialProvider, {
  name: string;
  bgColor: string;
  textColor: string;
  icon: string;
}> = {
  kakao: {
    name: '카카오',
    bgColor: '#FEE500',
    textColor: '#3C1E1E',
    icon: 'K',
  },
  naver: {
    name: '네이버',
    bgColor: '#03C75A',
    textColor: '#FFFFFF',
    icon: 'N',
  },
  google: {
    name: 'Google',
    bgColor: '#EA4335',
    textColor: '#FFFFFF',
    icon: 'G',
  },
  apple: {
    name: 'Apple',
    bgColor: '#000000',
    textColor: '#FFFFFF',
    icon: '',
  },
};

export function ProfileSocialLinks({ links, onLink, onUnlink }: ProfileSocialLinksProps) {
  return (
    <div className="mb-6 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
      {/* Header */}
      <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-[#1E293B]">
        <Link2 className="h-5 w-5 text-[#0066FF]" />
        소셜 계정 연동
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {links.map((link) => {
          const config = providerConfig[link.provider];
          return (
            <div
              key={link.provider}
              className="flex items-center gap-3 rounded-[14px] border border-[#E2E8F0] p-3 transition-all hover:border-[#0066FF] md:p-4"
            >
              {/* Icon */}
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg md:h-10 md:w-10"
                style={{ background: config.bgColor }}
              >
                {link.provider === 'apple' ? (
                  <svg
                    className="h-4 w-4 md:h-5 md:w-5"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                ) : (
                  <span
                    className="text-xs font-bold md:text-sm"
                    style={{ color: config.textColor }}
                  >
                    {config.icon}
                  </span>
                )}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#1E293B]">{config.name}</p>
                <p
                  className={cn(
                    'text-xs',
                    link.isLinked ? 'text-[#6BCB77]' : 'text-[#94A3B8]'
                  )}
                >
                  {link.isLinked ? '연동됨' : '미연동'}
                </p>
              </div>

              {/* Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  link.isLinked
                    ? onUnlink?.(link.provider)
                    : onLink?.(link.provider)
                }
                className="shrink-0 rounded-xl border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-transparent"
              >
                {link.isLinked ? '해제' : '연동'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileSocialLinks;
