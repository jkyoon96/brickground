'use client';

import { Lightbulb, Check } from 'lucide-react';

interface TipItem {
  text: string;
  highlight?: string;
}

interface PointsTipBoxProps {
  tips?: TipItem[];
}

const defaultTips: TipItem[] = [
  { text: '상품 구매 시 결제금액의 ', highlight: '최대 5%', },
  { text: '상품 리뷰 작성 시 ', highlight: '최대 1,500P', },
  { text: '출석 체크 시 ', highlight: '매일 100P', },
];

export function PointsTipBox({ tips = defaultTips }: PointsTipBoxProps) {
  return (
    <div className="rounded-2xl border border-[rgba(162,155,254,0.2)] bg-gradient-to-br from-[rgba(162,155,254,0.1)] to-[rgba(129,140,248,0.05)] p-4 md:p-5">
      {/* Header */}
      <h4 className="mb-3 flex items-center gap-2 font-bold text-[#A29BFE]">
        <Lightbulb className="h-5 w-5" />
        포인트 적립 TIP
      </h4>

      {/* Tips List */}
      <ul className="space-y-2 text-sm text-[#64748B]">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-[#A29BFE]" />
            <span>
              {tip.text}
              {tip.highlight && (
                <strong className="text-[#1E293B]">{tip.highlight}</strong>
              )}
              {tip.text.includes('결제금액의') && ' 적립 (등급별 상이)'}
              {tip.text.includes('리뷰 작성') && ' 적립'}
              {tip.text.includes('출석 체크') && ' 적립'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PointsTipBox;
