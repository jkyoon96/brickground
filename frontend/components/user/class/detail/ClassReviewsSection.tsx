'use client';

import { MessageSquare, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReviewRatingDistribution {
  star5: number;
  star4: number;
  star3: number;
  star2: number;
  star1: number;
}

export interface ClassReview {
  id: string;
  userName: string;
  userInitial: string;
  rating: number;
  date: string;
  content: string;
}

interface ClassReviewsSectionProps {
  averageRating: number;
  totalReviews: number;
  distribution: ReviewRatingDistribution;
  reviews: ClassReview[];
}

export function ClassReviewsSection({
  averageRating,
  totalReviews,
  distribution,
  reviews,
}: ClassReviewsSectionProps) {
  const distributionData = [
    { label: '5점', percentage: distribution.star5 },
    { label: '4점', percentage: distribution.star4 },
    { label: '3점', percentage: distribution.star3 },
    { label: '2점', percentage: distribution.star2 },
    { label: '1점', percentage: distribution.star1 },
  ];

  return (
    <section className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(16,185,129,0.15)] md:p-8">
      {/* Section Title */}
      <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold text-[#1E293B] md:mb-6 md:gap-2.5 md:text-xl">
        <MessageSquare className="h-5 w-5 text-[#10B981] md:h-6 md:w-6" />
        수강 후기
      </h2>

      {/* Summary */}
      <div className="mb-4 flex flex-col gap-4 rounded-[20px] bg-[#F8FAFC] p-4 md:mb-6 md:flex-row md:items-center md:gap-6 md:p-6">
        {/* Score */}
        <div className="text-center">
          <div className="text-4xl font-extrabold leading-none text-[#10B981] md:text-5xl">
            {averageRating.toFixed(1)}
          </div>
          <div className="mt-1 text-xs text-[#64748B] md:text-sm">
            {totalReviews}개 리뷰
          </div>
        </div>

        {/* Distribution Bars */}
        <div className="flex-1 space-y-2">
          {distributionData.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-6 text-xs font-semibold text-[#1E293B] md:text-[13px]">
                {item.label}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded bg-[#E2E8F0]">
                <div
                  className="h-full rounded bg-[#10B981]"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Items */}
      <div className="space-y-3 md:space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl bg-[#F8FAFC] p-3 md:p-5"
          >
            {/* Header */}
            <div className="mb-2 flex items-start justify-between md:mb-3">
              {/* User */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E2E8F0] text-xs font-bold text-[#64748B] md:h-10 md:w-10 md:text-sm">
                  {review.userInitial}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E293B] md:text-sm">
                    {review.userName}
                  </div>
                  <div className="text-[10px] text-[#64748B] md:text-xs">
                    {review.date}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'h-3 w-3 md:h-3.5 md:w-3.5',
                      star <= review.rating
                        ? 'fill-[#FFD93D] text-[#FFD93D]'
                        : 'fill-[#E2E8F0] text-[#E2E8F0]'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <p className="text-xs leading-relaxed text-[#64748B] md:text-sm md:leading-[1.6]">
              {review.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ClassReviewsSection;
