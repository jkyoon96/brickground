'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  Layout,
  ClassDetailHero,
  ClassInfoSection,
  ClassDescriptionSection,
  ClassCurriculumSection,
  ClassInstructorCard,
  ClassReviewsSection,
  ClassApplyCard,
  ClassScheduleCard,
  ClassLocationCard,
} from '@/components/user';
import type {
  ClassInfoItem,
  CurriculumItem,
  InstructorInfo,
  ReviewRatingDistribution,
  ClassReview,
  ScheduleItem,
} from '@/components/user';

// Mock data
const mockClassData = {
  id: '1',
  title: '브릭 테크닉 자동차 조립 체험',
  classType: 'experience' as const,
  badge: 'popular' as const,
  status: 'open' as const,
  iconType: 'puzzle' as const,
  targetAge: '초등 1-3학년',
  duration: '2시간',
  location: '서울 강남구',
  rating: 4.9,
  reviewCount: 128,
  price: 35000,
  priceUnit: '회',
};

const mockClassInfo: ClassInfoItem[] = [
  { label: '수업 일시', value: '매주 토요일 10:00 - 12:00', icon: 'calendar' },
  { label: '수업 장소', value: '서울 강남구 삼성동 123-45', icon: 'mapPin' },
  { label: '대상 연령', value: '초등학교 1-3학년', icon: 'users' },
  { label: '정원', value: '최대 12명', icon: 'userCheck' },
  { label: '수업 시간', value: '2시간', icon: 'clock' },
  { label: '준비물', value: '없음 (모든 재료 제공)', icon: 'package' },
];

const mockDescriptionParagraphs = [
  '브릭 테크닉 자동차 조립 체험은 아이들이 직접 브릭 테크닉 세트를 조립하며 기계공학의 원리를 배우는 체험 수업입니다.',
  '이 수업을 통해 아이들은:',
  '수업에서 사용하는 모든 브릭 세트는 제공되며, 완성된 작품은 집으로 가져갈 수 있습니다.',
];

const mockBulletPoints = [
  '기어, 축, 모터 등 기계 부품의 원리를 이해합니다',
  '설명서를 읽고 따라하는 집중력을 기릅니다',
  '완성 후 작동 원리를 직접 확인하며 성취감을 느낍니다',
  '친구들과 함께 협동하며 사회성을 발달시킵니다',
];

const mockCurriculum: CurriculumItem[] = [
  {
    number: 1,
    title: '오리엔테이션 (15분)',
    description: '브릭 테크닉 소개 및 안전 교육, 오늘 만들 자동차 모델 소개',
  },
  {
    number: 2,
    title: '기초 조립 (30분)',
    description: '섀시와 바퀴 조립, 기어 박스 만들기',
  },
  {
    number: 3,
    title: '본체 조립 (45분)',
    description: '자동차 본체와 조향 장치 조립, 디테일 파츠 장착',
  },
  {
    number: 4,
    title: '완성 및 테스트 (30분)',
    description: '완성된 자동차 테스트 및 작동 원리 설명, 사진 촬영',
  },
];

const mockInstructor: InstructorInfo = {
  name: '김블록 선생님',
  role: '브릭 공인 강사 (LEGO Certified Professional)',
  bio: '10년 이상의 브릭 교육 경력을 가진 전문 강사입니다. 아이들의 눈높이에 맞춘 재미있고 교육적인 수업을 진행합니다. 현재까지 2,000명 이상의 수강생을 지도했습니다.',
};

const mockReviewDistribution: ReviewRatingDistribution = {
  star5: 85,
  star4: 12,
  star3: 3,
  star2: 0,
  star1: 0,
};

const mockReviews: ClassReview[] = [
  {
    id: '1',
    userName: '김**',
    userInitial: '김',
    rating: 5,
    date: '2024.01.10',
    content:
      '아이가 너무 좋아했어요! 선생님이 친절하게 설명해주셔서 2시간이 금방 갔습니다. 완성된 자동차를 집에 가져와서 계속 가지고 놀아요.',
  },
  {
    id: '2',
    userName: '이**',
    userInitial: '이',
    rating: 5,
    date: '2024.01.08',
    content:
      '집중력이 약한 아이인데 수업 시간 동안 정말 집중해서 만들더라구요. 다음에 또 신청하려고 합니다!',
  },
];

const mockSchedules: ScheduleItem[] = [
  {
    id: '1',
    month: 'Jan',
    day: 15,
    dayOfWeek: '토요일',
    time: '10:00 - 12:00',
    spotsLeft: 3,
  },
  {
    id: '2',
    month: 'Jan',
    day: 22,
    dayOfWeek: '토요일',
    time: '10:00 - 12:00',
    spotsLeft: 8,
  },
  {
    id: '3',
    month: 'Jan',
    day: 29,
    dayOfWeek: '토요일',
    time: '10:00 - 12:00',
    spotsLeft: 12,
  },
];

export default function ClassDetailPage() {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = useCallback(() => {
    setIsWishlisted((prev) => !prev);
  }, []);

  const handleApply = useCallback(() => {
    console.log('Apply for class');
  }, []);

  const handleScheduleSelect = useCallback((id: string) => {
    console.log('Select schedule:', id);
  }, []);

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="mx-auto flex max-w-[1320px] items-center gap-2 overflow-x-auto whitespace-nowrap px-3 py-3 text-xs text-[#64748B] md:px-10 md:py-5 md:text-sm">
        <Link href="/" className="hover:text-[#10B981]">
          홈
        </Link>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
        <Link href="/classes" className="hover:text-[#10B981]">
          클래스
        </Link>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
        <span className="font-semibold text-[#1E293B]">{mockClassData.title}</span>
      </nav>

      {/* Main Content */}
      <main className="mx-auto grid max-w-[1320px] gap-6 px-3 pb-8 md:grid-cols-2 md:gap-10 md:px-10 md:pb-[60px]">
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Hero */}
          <ClassDetailHero
            title={mockClassData.title}
            classType={mockClassData.classType}
            badge={mockClassData.badge}
            status={mockClassData.status}
            iconType={mockClassData.iconType}
            targetAge={mockClassData.targetAge}
            duration={mockClassData.duration}
            location={mockClassData.location}
            rating={mockClassData.rating}
            reviewCount={mockClassData.reviewCount}
          />

          {/* Info Section */}
          <ClassInfoSection items={mockClassInfo} />

          {/* Description */}
          <ClassDescriptionSection
            paragraphs={mockDescriptionParagraphs}
            bulletPoints={mockBulletPoints}
          />

          {/* Curriculum */}
          <ClassCurriculumSection items={mockCurriculum} />

          {/* Instructor */}
          <ClassInstructorCard instructor={mockInstructor} />

          {/* Reviews */}
          <ClassReviewsSection
            averageRating={mockClassData.rating}
            totalReviews={mockClassData.reviewCount}
            distribution={mockReviewDistribution}
            reviews={mockReviews}
          />
        </div>

        {/* Right Column - Sidebar */}
        <aside className="flex flex-col gap-6">
          <div className="md:sticky md:top-[100px]">
            <div className="flex flex-col gap-6">
              {/* Apply Card */}
              <ClassApplyCard
                price={mockClassData.price}
                priceUnit={mockClassData.priceUnit}
                nextClassDate="1월 15일 (토)"
                nextClassTime="10:00 - 12:00"
                spotsLeft={3}
                isWishlisted={isWishlisted}
                onApply={handleApply}
                onWishlistToggle={handleWishlistToggle}
              />

              {/* Schedule Card */}
              <ClassScheduleCard
                schedules={mockSchedules}
                onScheduleSelect={handleScheduleSelect}
              />

              {/* Location Card */}
              <ClassLocationCard
                locationName="BrickGround 강남교육센터"
                address="서울 강남구 삼성동 123-45"
                directions="강남역 3번 출구 도보 5분"
              />
            </div>
          </div>
        </aside>
      </main>
    </Layout>
  );
}
