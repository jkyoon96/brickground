'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Grid3X3, List } from 'lucide-react';
import { Layout, BrickArtCard, HeroSection } from '@/components/user';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

// Mock data
const mockBrickArts = [
  {
    id: '1',
    title: '미니어처 하우스 컬렉션',
    image: '/images/brickart/sopoong-1.jpg',
    author: { name: '홍길동의 공방' },
    views: 12500,
    likes: 2300,
    productCount: 24,
    badges: ['hot' as const],
  },
  {
    id: '2',
    title: '판타지 피규어 월드',
    image: '/images/brickart/sopoong-2.jpg',
    author: { name: '크리에이터 스튜디오' },
    views: 8200,
    likes: 1800,
    productCount: 18,
    badges: ['new' as const],
  },
  {
    id: '3',
    title: '픽셀 아트 DIY 숍',
    image: '/images/brickart/sopoong-3.jpg',
    author: { name: '도트 공방' },
    views: 6700,
    likes: 1200,
    productCount: 32,
    badges: [],
  },
  {
    id: '4',
    title: '미니 정원 컬렉션',
    image: '/images/brickart/sopoong-4.jpg',
    author: { name: '그린 가든' },
    views: 5100,
    likes: 980,
    productCount: 15,
    badges: [],
  },
  {
    id: '5',
    title: '클래식 카 모델',
    image: '/images/brickart/sopoong-5.jpg',
    author: { name: '모델 팩토리' },
    views: 4300,
    likes: 756,
    productCount: 12,
    badges: [],
  },
  {
    id: '6',
    title: '건축 모형 갤러리',
    image: '/images/brickart/sopoong-6.jpg',
    author: { name: '아키텍트 랩' },
    views: 3800,
    likes: 621,
    productCount: 8,
    badges: [],
  },
  {
    id: '7',
    title: '뮤직 인스트루먼트',
    image: '/images/brickart/sopoong-7.jpg',
    author: { name: '사운드 크래프트' },
    views: 2900,
    likes: 512,
    productCount: 20,
    badges: [],
  },
  {
    id: '8',
    title: '레트로 게임 컬렉션',
    image: '/images/brickart/sopoong-8.jpg',
    author: { name: '게임 아카이브' },
    views: 2100,
    likes: 385,
    productCount: 28,
    badges: ['new' as const],
  },
];

const categories = [
  { id: 'all', label: '전체' },
  { id: 'popular', label: '인기' },
  { id: 'new', label: '신규' },
  { id: 'hobby', label: '취미/DIY' },
  { id: 'figure', label: '피규어' },
  { id: 'interior', label: '인테리어' },
];

const sortOptions = [
  { value: 'popular', label: '인기순' },
  { value: 'latest', label: '최신순' },
  { value: 'views', label: '조회순' },
  { value: 'likes', label: '좋아요순' },
];

export default function BrickArtListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const handleLikeToggle = (id: string) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pixar-blue to-[#0052CC] px-4 py-10 text-center text-white md:px-8 md:py-16">
        {/* Decorative circles */}
        <div className="absolute -right-24 -top-36 h-96 w-96 rounded-full bg-pixar-yellow/15" />
        <div className="absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-white/10" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="mb-3 text-2xl font-extrabold md:text-4xl lg:text-5xl">
            BrickArt
          </h1>
          <p className="mb-6 text-sm opacity-90 md:text-lg">
            나만의 3D 브릭 공간에서 창작물을 전시하고 공유하세요
          </p>

          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Search:', searchQuery);
            }}
            className="mx-auto flex max-w-[600px] flex-col gap-3 md:flex-row md:items-center"
          >
            <div className="flex h-12 flex-1 items-center gap-3 rounded-[28px] bg-white px-4 shadow-[0_4px_20px_rgba(0,0,0,0.1)] md:px-6">
              <Search className="h-5 w-5 text-[#64748B]" />
              <input
                type="text"
                placeholder="BrickArt 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-none bg-transparent text-sm text-[#1E293B] outline-none placeholder:text-[#94A3B8] md:text-base"
              />
            </div>
            <Button
              type="submit"
              variant="toy"
              className="h-12 w-full rounded-[28px] px-6 text-sm font-bold md:w-auto md:px-8 md:text-base"
            >
              검색
            </Button>
          </form>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-4 py-8 md:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'shrink-0 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all',
                  selectedCategory === category.id
                    ? 'border-pixar-blue bg-gradient-to-r from-pixar-blue to-[#0052CC] text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-pixar-blue'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Sort & View Toggle */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm font-semibold text-gray-700 focus:border-pixar-blue focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="flex overflow-hidden rounded-xl border-2 border-gray-200 bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'flex items-center justify-center px-3.5 py-2.5 transition-colors',
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-pixar-blue to-[#0052CC] text-white'
                    : 'text-gray-500 hover:bg-gray-50'
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'flex items-center justify-center px-3.5 py-2.5 transition-colors',
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-pixar-blue to-[#0052CC] text-white'
                    : 'text-gray-500 hover:bg-gray-50'
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockBrickArts.map((item) => (
            <BrickArtCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              author={item.author}
              views={item.views}
              likes={item.likes}
              productCount={item.productCount}
              badges={item.badges}
              isLiked={likedItems.has(item.id)}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-pixar-blue px-10 font-bold text-pixar-blue hover:bg-pixar-blue hover:text-white"
          >
            <Plus className="mr-2 h-5 w-5" />
            더 보기
          </Button>
        </div>
      </main>

      {/* Floating Action Button */}
      <Link
        href="/brickarts/new/editor"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-pixar-blue to-[#0052CC] px-6 py-4 font-bold text-white shadow-lg shadow-pixar-blue/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-pixar-blue/50 md:bottom-10 md:right-10"
      >
        <Plus className="h-5 w-5" />
        <span>BrickArt 생성</span>
      </Link>
    </Layout>
  );
}
