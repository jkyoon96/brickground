'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Layout,
  SearchHero,
  SearchResultsHeader,
  ActiveFilters,
  SearchPagination,
  RelatedSearches,
  SearchProductCard,
} from '@/components/user';

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

interface Filter {
  id: string;
  label: string;
}

// Mock data
const mockSuggestions = [
  '브릭 테크닉',
  '브릭 시티',
  '브릭 스타워즈',
  '브릭 해리포터',
  '브릭 디즈니',
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: '브릭 테크닉 람보르기니 시안',
    category: '브릭 / 테크닉',
    rating: 4.9,
    reviewCount: 128,
    currentPrice: 489000,
    originalPrice: 549000,
    discountPercent: 11,
    tags: ['무료배송'],
    badge: 'hot',
    badgeText: 'HOT',
    isWishlisted: false,
  },
  {
    id: '2',
    name: '브릭 시티 경찰서 세트',
    category: '브릭 / 시티',
    rating: 4.5,
    reviewCount: 89,
    currentPrice: 89000,
    tags: ['무료배송'],
    badge: 'new',
    badgeText: 'NEW',
    isWishlisted: false,
  },
  {
    id: '3',
    name: '브릭 디즈니 캐슬 71040',
    category: '브릭 / 디즈니',
    rating: 4.9,
    reviewCount: 312,
    currentPrice: 449000,
    originalPrice: 499000,
    discountPercent: 10,
    tags: ['무료배송'],
    isWishlisted: false,
  },
  {
    id: '4',
    name: '브릭 아이디어스 NASA 셔틀',
    category: '브릭 / 아이디어스',
    rating: 4.8,
    reviewCount: 145,
    currentPrice: 231200,
    originalPrice: 289000,
    discountPercent: 20,
    tags: ['무료배송', '특가'],
    badge: 'sale',
    badgeText: '20%',
    isWishlisted: false,
  },
  {
    id: '5',
    name: '브릭 해리포터 호그와트 성',
    category: '브릭 / 해리포터',
    rating: 4.7,
    reviewCount: 234,
    currentPrice: 599000,
    tags: ['무료배송'],
    isWishlisted: false,
  },
  {
    id: '6',
    name: '브릭 스타워즈 밀레니엄 팔콘',
    category: '브릭 / 스타워즈',
    rating: 4.9,
    reviewCount: 567,
    currentPrice: 899000,
    tags: ['무료배송', '베스트'],
    isWishlisted: false,
  },
  {
    id: '7',
    name: '브릭 크리에이터 모던하우스',
    category: '브릭 / 크리에이터',
    rating: 4.6,
    reviewCount: 178,
    currentPrice: 129000,
    tags: ['무료배송'],
    badge: 'hot',
    badgeText: 'HOT',
    isWishlisted: false,
  },
  {
    id: '8',
    name: '브릭 보태닉 분재 트리',
    category: '브릭 / 보태닉 컬렉션',
    rating: 4.5,
    reviewCount: 98,
    currentPrice: 69000,
    tags: ['무료배송'],
    badge: 'new',
    badgeText: 'NEW',
    isWishlisted: false,
  },
];

const mockRelatedSearches = [
  '브릭 테크닉',
  '브릭 스타워즈',
  '브릭 해리포터',
  '브릭 디즈니',
  '브릭 시티',
  '브릭 마블',
  '브릭 닌자고',
  '브릭 아키텍처',
];

type SortOption = 'popular' | 'newest' | 'priceAsc' | 'priceDesc' | 'rating';

const sortLabels: Record<SortOption, string> = {
  popular: '인기순',
  newest: '최신순',
  priceAsc: '낮은가격순',
  priceDesc: '높은가격순',
  rating: '평점순',
};

export default function ProductSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [query, setQuery] = useState(searchParams.get('q') || '브릭');
  const [products, setProducts] = useState(mockProducts);
  const [filters, setFilters] = useState<Filter[]>([
    { id: 'keyword', label: '브릭' },
    { id: 'freeShipping', label: '무료배송' },
    { id: 'priceRange', label: '₩100,000 이하' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const totalCount = 456;
  const totalPages = 5;

  // Handlers
  const handleSearch = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      router.push(`/product/search?q=${encodeURIComponent(newQuery)}`);
      // TODO: API call
    },
    [router]
  );

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion);
    // TODO: API call
  }, []);

  const handleFilterClick = useCallback(() => {
    // TODO: Open filter modal
    console.log('Open filter modal');
  }, []);

  const handleSortClick = useCallback(() => {
    // Cycle through sort options
    const options: SortOption[] = ['popular', 'newest', 'priceAsc', 'priceDesc', 'rating'];
    const currentIndex = options.indexOf(sortOption);
    const nextIndex = (currentIndex + 1) % options.length;
    setSortOption(options[nextIndex]);
    // TODO: API call
  }, [sortOption]);

  const handleRemoveFilter = useCallback((filterId: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== filterId));
    // TODO: API call
  }, []);

  const handleClearAllFilters = useCallback(() => {
    setFilters([]);
    // TODO: API call
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // TODO: API call
  }, []);

  const handleWishlistToggle = useCallback((productId: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, isWishlisted: !product.isWishlisted }
          : product
      )
    );
    // TODO: API call
  }, []);

  const handleRelatedSearchClick = useCallback(
    (keyword: string) => {
      handleSearch(keyword);
    },
    [handleSearch]
  );

  return (
    <Layout>
      {/* Search Hero */}
      <SearchHero
        initialQuery={query}
        suggestions={mockSuggestions}
        onSearch={handleSearch}
        onSuggestionClick={handleSuggestionClick}
      />

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-4 py-6 md:px-10 md:py-10">
        {/* Results Header */}
        <SearchResultsHeader
          query={query}
          totalCount={totalCount}
          onFilterClick={handleFilterClick}
          onSortClick={handleSortClick}
          sortLabel={sortLabels[sortOption]}
        />

        {/* Active Filters */}
        <ActiveFilters
          filters={filters}
          onRemove={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        {/* Product Grid */}
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <SearchProductCard
              key={product.id}
              {...product}
              highlightKeyword={query}
              onWishlistToggle={handleWishlistToggle}
            />
          ))}
        </div>

        {/* Pagination */}
        <SearchPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Related Searches */}
        <RelatedSearches
          keywords={mockRelatedSearches}
          onKeywordClick={handleRelatedSearchClick}
        />
      </main>
    </Layout>
  );
}
