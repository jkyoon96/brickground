'use client';

import { Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export type CouponType = 'percent' | 'fixed' | 'freeShip';
export type CouponCategory = 'all' | 'dotart' | 'brickart' | 'creation';

interface CouponCardProps {
  id: string;
  type: CouponType;
  discountValue: number;
  title: string;
  description: string;
  minOrderAmount?: number;
  maxDiscount?: number;
  expirationDate: string;
  daysLeft?: number;
  category?: CouponCategory;
  isUsed?: boolean;
  isExpired?: boolean;
  gradientColors?: [string, string];
  onUse?: (id: string) => void;
}

const typeConfig = {
  percent: {
    badgeLabel: '정률할인',
    badgeClass: 'bg-[rgba(0,102,255,0.1)] text-[#0066FF]',
    defaultGradient: ['#0066FF', '#3B82F6'],
  },
  fixed: {
    badgeLabel: '정액할인',
    badgeClass: 'bg-[rgba(162,155,254,0.1)] text-[#A29BFE]',
    defaultGradient: ['#A29BFE', '#818CF8'],
  },
  freeShip: {
    badgeLabel: '무료배송',
    badgeClass: 'bg-[rgba(0,206,201,0.1)] text-[#00CEC9]',
    defaultGradient: ['#00CEC9', '#00D4FF'],
  },
};

const categoryConfig: Record<CouponCategory, { label: string; color: string; bgColor: string }> = {
  all: { label: '', color: '', bgColor: '' },
  dotart: { label: 'DotArt', color: '#FF9F43', bgColor: 'rgba(255,159,67,0.1)' },
  brickart: { label: 'BrickArt', color: '#6BCB77', bgColor: 'rgba(107,203,119,0.1)' },
  creation: { label: 'Creation', color: '#0066FF', bgColor: 'rgba(0,102,255,0.1)' },
};

export function CouponCard({
  id,
  type,
  discountValue,
  title,
  description,
  minOrderAmount,
  maxDiscount,
  expirationDate,
  daysLeft,
  category = 'all',
  isUsed = false,
  isExpired = false,
  gradientColors,
  onUse,
}: CouponCardProps) {
  const config = typeConfig[type];
  const catConfig = categoryConfig[category];
  const [colorStart, colorEnd] = gradientColors || config.defaultGradient;

  const isDisabled = isUsed || isExpired;

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all md:flex-row',
        isDisabled
          ? 'opacity-50 grayscale'
          : 'hover:-translate-y-1 hover:border-[#0066FF] hover:shadow-[0_12px_30px_rgba(0,102,255,0.15)]'
      )}
    >
      {/* Left Section */}
      <div
        className="relative flex w-full flex-col items-center justify-center px-4 py-5 text-white md:w-[140px] md:px-6 md:py-6"
        style={{ background: `linear-gradient(135deg, ${colorStart} 0%, ${colorEnd} 100%)` }}
      >
        {/* Dashed border on desktop */}
        <div className="absolute bottom-5 right-0 top-5 hidden w-px md:block" style={{
          background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.3) 0, rgba(255,255,255,0.3) 8px, transparent 8px, transparent 16px)'
        }} />

        {type === 'freeShip' ? (
          <>
            <Truck className="mb-1 h-8 w-8 md:h-10 md:w-10" />
            <p className="text-sm">무료배송</p>
          </>
        ) : type === 'percent' ? (
          <>
            <p className="text-2xl font-bold md:text-3xl">{discountValue}%</p>
            <p className="text-sm opacity-80">할인</p>
          </>
        ) : (
          <>
            <p className="text-xl font-bold md:text-2xl">{discountValue.toLocaleString()}</p>
            <p className="text-sm opacity-80">원 할인</p>
          </>
        )}
      </div>

      {/* Right Section */}
      <div className="flex flex-1 flex-col justify-between p-4 md:p-6">
        {/* Top */}
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={cn('inline-flex rounded-[20px] px-2.5 py-1 text-[11px] font-bold', config.badgeClass)}>
              {config.badgeLabel}
            </span>
            {daysLeft !== undefined && daysLeft <= 7 && (
              <span className="inline-flex rounded-[20px] bg-[rgba(255,159,67,0.1)] px-2.5 py-1 text-[11px] font-bold text-[#FF9F43]">
                D-{daysLeft}
              </span>
            )}
            {category !== 'all' && (
              <span
                className="rounded-lg px-2 py-1 text-xs font-bold"
                style={{ background: catConfig.bgColor, color: catConfig.color }}
              >
                {catConfig.label}
              </span>
            )}
          </div>
          <h3 className="mb-1 text-base font-bold text-[#1E293B] md:text-lg">{title}</h3>
          <p className="text-sm text-[#94A3B8]">
            {description}
            {maxDiscount && ` (최대 ${maxDiscount.toLocaleString()}원)`}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-[#64748B]">
            {minOrderAmount ? (
              <p>{minOrderAmount.toLocaleString()}원 이상 구매 시</p>
            ) : (
              <p>금액 제한 없음</p>
            )}
            <p className={daysLeft !== undefined && daysLeft <= 7 ? 'text-[#FF9F43]' : ''}>
              유효기간: {expirationDate}
            </p>
          </div>
          <Button
            variant="gradient"
            onClick={() => onUse?.(id)}
            disabled={isDisabled}
            className="w-full rounded-xl bg-gradient-to-r from-[#0066FF] to-[#3B82F6] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,102,255,0.3)] md:w-auto"
          >
            {isUsed ? '사용완료' : isExpired ? '기간만료' : '사용하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CouponCard;
