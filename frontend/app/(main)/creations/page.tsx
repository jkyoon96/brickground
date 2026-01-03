'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import {
  Header,
  Footer,
  CreationHeroSection,
  CreationStatsSection,
  CreationFilterBar,
  CreationGalleryCard,
} from '@/components/user';

// Mock data
const mockCreations = [
  {
    id: '1',
    title: '미래 도시 스카이라인',
    description: '네온 불빛이 가득한 사이버펑크 스타일의 미래 도시',
    imageUrl: '/images/creation/creation-1.jpg',
    author: { name: '빌더마스터' },
    likeCount: 3245,
    commentCount: 187,
    downloadCount: 892,
    isLiked: true,
    isHot: true,
    isFeatured: true,
  },
  {
    id: '2',
    title: '슈퍼카 컬렉션',
    description: '다양한 스포츠카 모델을 블록으로 재현',
    imageUrl: '/images/creation/creation-2.jpg',
    author: { name: '레이서킹' },
    likeCount: 2891,
    commentCount: 156,
    downloadCount: 723,
    isLiked: true,
    isFeatured: true,
  },
  {
    id: '3',
    title: '귀여운 로봇 친구들',
    description: '다양한 표정의 미니 로봇 캐릭터 세트',
    imageUrl: '/images/creation/creation-3.jpg',
    author: { name: '캐릭터러버' },
    likeCount: 1567,
    commentCount: 89,
    downloadCount: 456,
    isNew: true,
  },
  {
    id: '4',
    title: '마법의 성',
    description: '동화 속에서 튀어나온 듯한 마법의 성',
    imageUrl: '/images/creation/creation-4.jpg',
    author: { name: '판타지빌더' },
    likeCount: 2134,
    commentCount: 112,
    downloadCount: 567,
    isLiked: true,
  },
  {
    id: '5',
    title: '우주 정거장',
    description: '국제 우주 정거장을 모티브로 한 창작물',
    imageUrl: '/images/creation/creation-5.jpg',
    author: { name: '스페이스맨' },
    likeCount: 1892,
    commentCount: 78,
    downloadCount: 389,
    isLiked: true,
  },
  {
    id: '6',
    title: '미니어처 정원',
    description: '작은 세계 속 아름다운 정원 풍경',
    imageUrl: '/images/creation/creation-6.jpg',
    author: { name: '자연러버' },
    likeCount: 987,
    commentCount: 45,
    downloadCount: 234,
  },
  {
    id: '7',
    title: '모던 하우스',
    description: '현대적인 감각의 미니어처 주택',
    imageUrl: '/images/creation/creation-7.jpg',
    author: { name: '홈디자이너' },
    likeCount: 1456,
    commentCount: 67,
    downloadCount: 312,
    isLiked: true,
  },
  {
    id: '8',
    title: '해적선 어드벤처',
    description: '대항해시대 해적선을 재현한 작품',
    imageUrl: '/images/creation/creation-8.jpg',
    author: { name: '캡틴블록' },
    likeCount: 1234,
    commentCount: 56,
    downloadCount: 278,
  },
];

export default function CreationListPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [creations, setCreations] = useState(mockCreations);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    // Filter logic would go here
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    // Search logic would go here
  }, []);

  const handleSortClick = useCallback(() => {
    console.log('Sort clicked');
    // Sort modal/dropdown would open here
  }, []);

  const handleTutorialClick = useCallback(() => {
    console.log('Tutorial clicked');
    // Open tutorial modal or navigate to tutorial page
  }, []);

  const handleLikeToggle = useCallback((id: string) => {
    setCreations((prev) =>
      prev.map((creation) =>
        creation.id === id
          ? {
              ...creation,
              isLiked: !creation.isLiked,
              likeCount: creation.isLiked
                ? creation.likeCount - 1
                : creation.likeCount + 1,
            }
          : creation
      )
    );
  }, []);

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Load more items
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* Hero Section */}
      <CreationHeroSection onTutorialClick={handleTutorialClick} />

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-10 py-10">
        {/* Stats Section */}
        <CreationStatsSection
          stats={{
            totalCreations: 12847,
            creators: 4523,
            likes: '89.2K',
            downloads: '34.1K',
          }}
        />

        {/* Filter Bar */}
        <CreationFilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSortClick={handleSortClick}
        />

        {/* Creation Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {creations.map((creation) => (
            <CreationGalleryCard
              key={creation.id}
              {...creation}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-[20px] border-2 border-[#E2E8F0] bg-white px-12 py-4 text-base font-bold text-[#1E293B] transition-colors hover:border-[#00CEC9] hover:bg-[#00CEC9] hover:text-white disabled:opacity-50"
          >
            <Plus className="h-5 w-5" />
            {isLoading ? '로딩 중...' : '더 보기'}
          </button>
        </div>
      </main>

      {/* Create FAB */}
      <Link
        href="/creations/new/editor"
        className="fixed bottom-10 right-10 z-50 flex items-center gap-2.5 rounded-[32px] bg-gradient-to-r from-[#00CEC9] to-[#00D4FF] px-8 py-[18px] text-base font-bold text-white shadow-[0_6px_25px_rgba(0,206,201,0.4)] transition-transform hover:-translate-y-1"
      >
        <Plus className="h-[22px] w-[22px]" />
        새 창작물
      </Link>

      <Footer />
    </div>
  );
}
