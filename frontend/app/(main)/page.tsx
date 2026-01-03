'use client';

import { useState, useCallback } from 'react';
import { Building2, Palette, ShoppingBag, BookOpen } from 'lucide-react';
import { Layout } from '@/components/user';
import {
  HomeHero,
  QuickAccessGrid,
  HomeSectionTitle,
  HomeBrickArtCard,
  HomeDotArtCard,
  HomeProductCard,
  HomeManualCard,
  CategoryPills,
  NewsletterSection,
} from '@/components/user/home';
import type {
  HomeBrickArtItem,
  HomeDotArtItem,
  HomeProductItem,
  HomeManualItem,
  CategoryPillItem,
} from '@/components/user/home';

// Mock data
const mockBrickArtItems: HomeBrickArtItem[] = [
  {
    id: '1',
    title: '테크닉 갤러리',
    category: '테크닉',
    imageUrl: '/images/brickart/sopoong-1.jpg',
    viewerUrl: '/brickart/1',
    detailUrl: '/brickart/1/detail',
    likeCount: 3245,
    viewCount: 12500,
    badge: 'hot',
  },
  {
    id: '2',
    title: '미니 하우스 컬렉션',
    category: '미니어처',
    imageUrl: '/images/brickart/sopoong-2.jpg',
    viewerUrl: '/brickart/2',
    detailUrl: '/brickart/2/detail',
    likeCount: 2891,
    viewCount: 8300,
    badge: 'new',
  },
  {
    id: '3',
    title: '우주 탐험관',
    category: '우주',
    imageUrl: '/images/brickart/sopoong-3.jpg',
    viewerUrl: '/brickart/3',
    detailUrl: '/brickart/3/detail',
    likeCount: 4123,
    viewCount: 15200,
  },
  {
    id: '4',
    title: '슈퍼카 쇼룸',
    category: '자동차',
    imageUrl: '/images/brickart/sopoong-4.jpg',
    viewerUrl: '/brickart/4',
    detailUrl: '/brickart/4/detail',
    likeCount: 1987,
    viewCount: 9800,
  },
];

const mockDotArtItems: HomeDotArtItem[] = [
  {
    id: '1',
    title: '픽셀 캐릭터',
    category: '캐릭터',
    imageUrl: '/images/dotart/dotart-1.jpg',
    viewerUrl: '/dotart/1',
    detailUrl: '/dotart/1/detail',
    likeCount: 2345,
    viewCount: 12500,
    badge: 'hot',
    isLiked: true,
  },
  {
    id: '2',
    title: '노을 진 바다',
    category: '풍경',
    imageUrl: '/images/dotart/dotart-2.jpg',
    viewerUrl: '/dotart/2',
    detailUrl: '/dotart/2/detail',
    likeCount: 1892,
    viewCount: 8700,
    badge: 'new',
  },
  {
    id: '3',
    title: '귀여운 고양이',
    category: '동물',
    imageUrl: '/images/dotart/dotart-3.jpg',
    viewerUrl: '/dotart/3',
    detailUrl: '/dotart/3/detail',
    likeCount: 1567,
    viewCount: 6300,
  },
  {
    id: '4',
    title: '픽셀 아트',
    category: '캐릭터',
    imageUrl: '/images/dotart/dotart-4.jpg',
    viewerUrl: '/dotart/4',
    detailUrl: '/dotart/4/detail',
    likeCount: 1234,
    viewCount: 5100,
    isLiked: true,
  },
];

const mockProductCategories: CategoryPillItem[] = [
  { id: 'all', label: '전체' },
  { id: 'technic', label: '테크닉' },
  { id: 'creator', label: '크리에이터' },
  { id: 'architecture', label: '아키텍처' },
  { id: 'art', label: '아트' },
  { id: 'starwars', label: '스타워즈' },
];

const mockProductItems: HomeProductItem[] = [
  {
    id: '1',
    title: '포르쉐 911 GT3 RS',
    category: '테크닉',
    imageUrl: '/images/shop/product-1.jpg',
    detailUrl: '/product/1',
    price: 129000,
    originalPrice: 159000,
    rating: 4.9,
    reviewCount: 328,
    badge: 'best',
    isLiked: false,
  },
  {
    id: '2',
    title: '에펠탑 아키텍처',
    category: '아키텍처',
    imageUrl: '/images/shop/product-2.jpg',
    detailUrl: '/product/2',
    price: 89000,
    rating: 4.8,
    reviewCount: 156,
    badge: 'new',
  },
  {
    id: '3',
    title: '보타닉 가든 세트',
    category: '크리에이터',
    imageUrl: '/images/shop/product-3.jpg',
    detailUrl: '/product/3',
    price: 65000,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: '4',
    title: '픽셀 아트 프레임',
    category: '아트',
    imageUrl: '/images/shop/product-4.jpg',
    detailUrl: '/product/4',
    price: 38250,
    originalPrice: 45000,
    rating: 4.9,
    reviewCount: 245,
    badge: 'sale',
    badgeText: '15% OFF',
    isLiked: true,
  },
];

const mockManualItems: HomeManualItem[] = [
  {
    id: '1',
    title: '포르쉐 911 GT3 RS 조립 가이드',
    category: '테크닉',
    categoryType: 'technic',
    pageCount: 328,
    format: 'PDF',
    detailUrl: '/manual/1',
  },
  {
    id: '2',
    title: '에펠탑 아키텍처 조립 가이드',
    category: '아키텍처',
    categoryType: 'architecture',
    pageCount: 156,
    format: 'PDF',
    detailUrl: '/manual/2',
  },
  {
    id: '3',
    title: '픽셀 아트 프레임 조립 가이드',
    category: '아트',
    categoryType: 'art',
    pageCount: 48,
    format: 'PDF',
    detailUrl: '/manual/3',
  },
];

export default function HomePage() {
  const [selectedProductCategory, setSelectedProductCategory] = useState('all');
  const [dotArtItems, setDotArtItems] = useState(mockDotArtItems);
  const [productItems, setProductItems] = useState(mockProductItems);

  const handleDotArtLikeToggle = useCallback((id: string) => {
    setDotArtItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  }, []);

  const handleProductLikeToggle = useCallback((id: string) => {
    setProductItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  }, []);

  const handleNewsletterSubscribe = useCallback((email: string) => {
    console.log('Newsletter subscription:', email);
  }, []);

  const handleExploreClick = useCallback(() => {
    const section = document.getElementById('featured-brickart');
    if (section) {
      const offset = 100;
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <HomeHero
        slides={[
          {
            id: '1',
            badge: 'NEW COLLECTION',
            title: '나만의 브릭 세상을\n만들어보세요!',
            subtitle: 'BrickArt에서 3D 공간을 경험하고,\nDotArt로 픽셀 아트를 창작해보세요.',
            primaryButton: { label: '시작하기', href: '/dotarts/editor' },
            secondaryButton: { label: '둘러보기', onClick: handleExploreClick },
          },
        ]}
      />

      {/* Quick Access Grid */}
      <QuickAccessGrid />

      {/* Recommended BrickArt */}
      <section id="featured-brickart" className="mx-auto max-w-[1320px] px-4 py-8 md:px-6 md:py-12">
        <HomeSectionTitle
          icon={<Building2 className="h-4 w-4 text-white md:h-5 md:w-5" />}
          iconBackground="linear-gradient(135deg, #0066FF 0%, #00CEC9 100%)"
          title="추천 BrickArt"
          moreLink="/brickarts"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {mockBrickArtItems.map((item) => (
            <HomeBrickArtCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Best DotArt */}
      <section className="mx-auto max-w-[1320px] px-4 py-8 md:px-6 md:py-12">
        <HomeSectionTitle
          icon={<Palette className="h-4 w-4 text-white md:h-5 md:w-5" />}
          iconBackground="linear-gradient(135deg, #A29BFE 0%, #818CF8 100%)"
          title="베스트 DotArt"
          moreLink="/dotarts"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {dotArtItems.map((item) => (
            <HomeDotArtCard
              key={item.id}
              item={item}
              onLikeToggle={handleDotArtLikeToggle}
            />
          ))}
        </div>
      </section>

      {/* Recommended Products */}
      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-[1320px] px-4 md:px-6">
          <HomeSectionTitle
            icon={<ShoppingBag className="h-4 w-4 text-white md:h-5 md:w-5" />}
            iconBackground="#FF9F43"
            title="추천 상품"
            moreLink="/products"
          />
          <CategoryPills
            categories={mockProductCategories}
            selectedId={selectedProductCategory}
            onSelect={setSelectedProductCategory}
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {productItems.map((item) => (
              <HomeProductCard
                key={item.id}
                item={item}
                onLikeToggle={handleProductLikeToggle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Manuals */}
      <section className="mx-auto max-w-[1320px] px-4 py-8 md:px-6 md:py-12">
        <HomeSectionTitle
          icon={<BookOpen className="h-4 w-4 text-white md:h-5 md:w-5" />}
          iconBackground="linear-gradient(135deg, #A29BFE 0%, #818CF8 100%)"
          title="추천 매뉴얼"
          moreLink="/manuals"
        />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
          {mockManualItems.map((item) => (
            <HomeManualCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection onSubscribe={handleNewsletterSubscribe} />
    </Layout>
  );
}
