'use client';

import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import {
  Layout,
  ClassListHero,
  ClassStatsSection,
  ClassFilterBar,
  ClassCard,
  UpcomingClassSection,
} from '@/components/user';
import type {
  ClassCategory,
  ClassSortOption,
  ClassBadgeType,
  ClassStatusType,
  ClassType,
  UpcomingClass,
} from '@/components/user';

// Mock data
interface ClassItem {
  id: string;
  title: string;
  classType: ClassType;
  targetAge: string;
  schedule: string;
  location: string;
  price: number;
  priceUnit: string;
  badge?: ClassBadgeType;
  status: ClassStatusType;
  iconType: 'puzzle' | 'palette' | 'cube' | 'bot' | 'blocks' | 'gamepad';
}

const mockClasses: ClassItem[] = [
  {
    id: '1',
    title: '브릭 테크닉 자동차 조립 체험',
    classType: 'experience',
    targetAge: '초등 1-3학년',
    schedule: '매주 토요일 10:00 - 12:00',
    location: '서울 강남구 삼성동',
    price: 35000,
    priceUnit: '회',
    badge: 'popular',
    status: 'open',
    iconType: 'puzzle',
  },
  {
    id: '2',
    title: '픽셀아트 DotArt 창작 수업',
    classType: 'afterSchool',
    targetAge: '초등 전학년',
    schedule: '매주 화/목 15:00 - 16:30',
    location: '서울 서초구 반포동',
    price: 120000,
    priceUnit: '월',
    badge: 'new',
    status: 'few',
    iconType: 'palette',
  },
  {
    id: '3',
    title: '3D Creation 원데이 체험',
    classType: 'oneDay',
    targetAge: '초등 4-6학년',
    schedule: '1월 15일 (토) 14:00 - 17:00',
    location: '서울 송파구 잠실동',
    price: 45000,
    priceUnit: '회',
    status: 'open',
    iconType: 'cube',
  },
  {
    id: '4',
    title: '브릭 마인드스톰 로봇 코딩',
    classType: 'regular',
    targetAge: '중등 1-3학년',
    schedule: '매주 수요일 17:00 - 19:00',
    location: '경기 성남시 분당구',
    price: 180000,
    priceUnit: '월',
    badge: 'soon',
    status: 'open',
    iconType: 'bot',
  },
  {
    id: '5',
    title: '유아 창의블록 놀이교실',
    classType: 'experience',
    targetAge: '5-7세',
    schedule: '매주 금요일 16:00 - 17:00',
    location: '서울 마포구 합정동',
    price: 25000,
    priceUnit: '회',
    status: 'open',
    iconType: 'blocks',
  },
  {
    id: '6',
    title: '전략 보드게임 사고력 교실',
    classType: 'afterSchool',
    targetAge: '초등 3-6학년',
    schedule: '매주 월/수 15:30 - 17:00',
    location: '서울 용산구 이태원동',
    price: 100000,
    priceUnit: '월',
    status: 'closed',
    iconType: 'gamepad',
  },
];

const mockUpcomingClasses: UpcomingClass[] = [
  {
    id: '1',
    month: 'Jan',
    day: 15,
    dayOfWeek: '토요일',
    time: '10:00 AM',
    title: '브릭 테크닉 자동차 조립 체험',
    location: '서울 강남구 삼성동',
  },
  {
    id: '2',
    month: 'Jan',
    day: 16,
    dayOfWeek: '화요일',
    time: '15:00 PM',
    title: '픽셀아트 DotArt 창작 수업',
    location: '서울 서초구 반포동',
  },
  {
    id: '4',
    month: 'Jan',
    day: 18,
    dayOfWeek: '수요일',
    time: '17:00 PM',
    title: '브릭 마인드스톰 로봇 코딩',
    location: '경기 성남시 분당구',
  },
  {
    id: '5',
    month: 'Jan',
    day: 20,
    dayOfWeek: '금요일',
    time: '16:00 PM',
    title: '유아 창의블록 놀이교실',
    location: '서울 마포구 합정동',
  },
];

export default function ClassListPage() {
  const [category, setCategory] = useState<ClassCategory>('all');
  const [sort, setSort] = useState<ClassSortOption>('popular');

  // Filter classes by category
  const filteredClasses =
    category === 'all'
      ? mockClasses
      : mockClasses.filter((c) => c.classType === category);

  // Handlers
  const handleSearch = useCallback((query: string) => {
    console.log('Search:', query);
  }, []);

  const handleCategoryChange = useCallback((cat: ClassCategory) => {
    setCategory(cat);
  }, []);

  const handleSortChange = useCallback((s: ClassSortOption) => {
    setSort(s);
  }, []);

  const handleLocationFilter = useCallback(() => {
    console.log('Open location filter');
  }, []);

  const handleFilterClick = useCallback(() => {
    console.log('Open filter modal');
  }, []);

  const handleApply = useCallback((id: string) => {
    console.log('Apply for class:', id);
  }, []);

  const handleLoadMore = useCallback(() => {
    console.log('Load more classes');
  }, []);

  const handleViewAllUpcoming = useCallback(() => {
    console.log('View all upcoming classes');
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <ClassListHero onSearch={handleSearch} />

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-3 py-6 md:px-10 md:py-10">
        {/* Stats Section */}
        <ClassStatsSection />

        {/* Filter Bar */}
        <ClassFilterBar
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
          selectedSort={sort}
          onSortChange={handleSortChange}
          onLocationFilter={handleLocationFilter}
          onFilterClick={handleFilterClick}
        />

        {/* Class Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {filteredClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              id={classItem.id}
              title={classItem.title}
              classType={classItem.classType}
              targetAge={classItem.targetAge}
              schedule={classItem.schedule}
              location={classItem.location}
              price={classItem.price}
              priceUnit={classItem.priceUnit}
              badge={classItem.badge}
              status={classItem.status}
              iconType={classItem.iconType}
              onApply={handleApply}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center py-8 md:py-12">
          <button
            onClick={handleLoadMore}
            className="flex w-full items-center justify-center gap-2 rounded-[20px] border-2 border-[#E2E8F0] bg-white px-8 py-3 font-bold text-[#1E293B] transition-all hover:border-[#10B981] hover:bg-[#10B981] hover:text-white md:w-auto md:px-12 md:py-4"
          >
            <Plus className="h-5 w-5" />
            더 보기
          </button>
        </div>

        {/* Upcoming Classes */}
        <UpcomingClassSection
          classes={mockUpcomingClasses}
          onViewAll={handleViewAllUpcoming}
        />
      </main>
    </Layout>
  );
}
