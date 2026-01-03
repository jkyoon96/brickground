'use client';

import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import {
  Layout,
  ProductListHero,
  ProductStatsSection,
  ProductFilterBar,
  ProductListCard,
  CartFAB,
} from '@/components/user';

type SortOption = 'popular' | 'newest' | 'priceAsc' | 'priceDesc' | 'rating';
type ViewMode = 'grid' | 'list';
type BadgeType = 'hot' | 'new' | 'sale';

interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  rating: number;
  reviewCount: number;
  currentPrice: number;
  originalPrice?: number;
  discountPercent?: number;
  tags: string[];
  badge?: BadgeType;
  badgeText?: string;
  isWishlisted: boolean;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: '레고 테크닉 람보르기니 시안 FKP 37',
    category: '레고 / 테크닉',
    imageUrl: '/images/product/product-1.jpg',
    rating: 4.9,
    reviewCount: 128,
    currentPrice: 489000,
    originalPrice: 549000,
    discountPercent: 11,
    tags: ['무료배송', '오늘출발'],
    badge: 'hot',
    badgeText: 'HOT',
    isWishlisted: true,
  },
  {
    id: '2',
    name: '건담 RG 1/144 사자비 스페셜 에디션',
    category: '피규어 / 건담',
    imageUrl: '/images/product/product-2.jpg',
    rating: 4.8,
    reviewCount: 89,
    currentPrice: 68000,
    tags: ['무료배송'],
    badge: 'new',
    badgeText: 'NEW',
    isWishlisted: false,
  },
  {
    id: '3',
    name: '카탄: 확장판 시나리오 컬렉션',
    category: '보드게임',
    imageUrl: '/images/product/product-3.jpg',
    rating: 4.7,
    reviewCount: 256,
    currentPrice: 35000,
    originalPrice: 50000,
    discountPercent: 30,
    tags: ['특가'],
    badge: 'sale',
    badgeText: '30%',
    isWishlisted: false,
  },
  {
    id: '4',
    name: '스마트 코딩 로봇 큐브로이드 프로',
    category: '교육완구',
    imageUrl: '/images/product/product-4.jpg',
    rating: 4.6,
    reviewCount: 78,
    currentPrice: 129000,
    tags: ['무료배송', '인기'],
    isWishlisted: false,
  },
  {
    id: '5',
    name: '레고 시티 경찰서 세트 (60316)',
    category: '레고 / 시티',
    imageUrl: '/images/product/product-5.jpg',
    rating: 4.5,
    reviewCount: 192,
    currentPrice: 89000,
    tags: ['무료배송'],
    isWishlisted: false,
  },
  {
    id: '6',
    name: '레고 디즈니 캐슬 71040',
    category: '레고 / 디즈니',
    imageUrl: '/images/product/product-6.jpg',
    rating: 4.9,
    reviewCount: 312,
    currentPrice: 449000,
    originalPrice: 499000,
    discountPercent: 10,
    tags: ['무료배송', '베스트'],
    badge: 'hot',
    badgeText: 'HOT',
    isWishlisted: false,
  },
  {
    id: '7',
    name: '라벤스부르거 3D 퍼즐 - 에펠탑',
    category: '퍼즐',
    imageUrl: '/images/product/product-7.jpg',
    rating: 4.4,
    reviewCount: 67,
    currentPrice: 42000,
    tags: ['무료배송'],
    isWishlisted: false,
  },
  {
    id: '8',
    name: '레고 아이디어스 NASA 스페이스 셔틀',
    category: '레고 / 아이디어스',
    imageUrl: '/images/product/product-8.jpg',
    rating: 4.8,
    reviewCount: 145,
    currentPrice: 289000,
    tags: ['무료배송', '인기'],
    badge: 'new',
    badgeText: 'NEW',
    isWishlisted: false,
  },
];

export default function ProductListPage() {
  // State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [products, setProducts] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  // Handlers
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    // TODO: Filter products by category
  }, []);

  const handleSortChange = useCallback((sort: SortOption) => {
    setSortOption(sort);
    // TODO: Sort products
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  const handleFilterClick = useCallback(() => {
    // TODO: Open filter modal
    console.log('Open filter modal');
  }, []);

  const handleWishlistToggle = useCallback((productId: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, isWishlisted: !product.isWishlisted } : product
      )
    );
    // TODO: API call
  }, []);

  const handlePopularClick = useCallback(() => {
    setSortOption('popular');
    setSelectedCategory('popular');
  }, []);

  const handleSaleClick = useCallback(() => {
    // TODO: Filter by sale products
    console.log('Show sale products');
  }, []);

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    // TODO: Load more products
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <ProductListHero onPopularClick={handlePopularClick} onSaleClick={handleSaleClick} />

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-3 py-6 md:px-10 md:py-10">
        {/* Stats Section */}
        <ProductStatsSection />

        {/* Filter Bar */}
        <ProductFilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onFilterClick={handleFilterClick}
        />

        {/* Product Grid */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4'
              : 'flex flex-col gap-4'
          }
        >
          {products.map((product) => (
            <ProductListCard
              key={product.id}
              {...product}
              onWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-10 flex justify-center md:mt-12">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-[20px] border-2 border-[#E2E8F0] bg-white px-8 py-4 text-sm font-bold text-[#1E293B] transition-colors hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-white disabled:opacity-50 md:w-auto md:text-base"
          >
            <Plus className="h-5 w-5" />
            더 보기
          </button>
        </div>
      </main>

      {/* Cart FAB */}
      <CartFAB itemCount={cartCount} />
    </Layout>
  );
}
