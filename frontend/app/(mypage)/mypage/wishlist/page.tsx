'use client';

import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import {
  Layout,
  WishlistPageHeader,
  WishlistFilterBar,
  WishlistCard,
  MypageSidebar,
} from '@/components/user';
import type { WishlistCategory, WishlistBadgeType } from '@/components/user';

// Mock data
interface WishlistItem {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  badge?: WishlistBadgeType;
  isSoldOut?: boolean;
  category: 'brickart' | 'dotart' | 'shop';
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    imageUrl: '/images/shop/1000000106.jpg',
    title: '레고 테크닉 포르쉐 911 GT3 RS',
    price: 129000,
    originalPrice: 159000,
    discountPercent: 20,
    badge: 'sale',
    category: 'shop',
  },
  {
    id: '2',
    imageUrl: '/images/shop/1000000104.jpg',
    title: 'DotArt 픽셀 캔버스 프로',
    price: 89000,
    badge: 'new',
    category: 'dotart',
  },
  {
    id: '3',
    imageUrl: '/images/shop/1000000103.jpg',
    title: 'BrickArt 프리미엄 스킨 패키지',
    price: 45000,
    category: 'brickart',
  },
  {
    id: '4',
    imageUrl: '/images/shop/1000000101.jpg',
    title: '한정판 브릭 피규어 세트',
    price: 65000,
    badge: 'soldout',
    isSoldOut: true,
    category: 'shop',
  },
  {
    id: '5',
    imageUrl: '/images/shop/1000000097.jpg',
    title: 'Creation 3D 모델링 툴킷',
    price: 102000,
    originalPrice: 120000,
    discountPercent: 15,
    badge: 'sale',
    category: 'shop',
  },
  {
    id: '6',
    imageUrl: '/images/shop/1000000094.jpg',
    title: '브릭 아트 픽셀 프레임',
    price: 35000,
    category: 'brickart',
  },
];

const categoryTabs = [
  { value: 'all' as WishlistCategory, label: '전체', count: 23 },
  { value: 'brickart' as WishlistCategory, label: 'BrickArt', count: 5 },
  { value: 'dotart' as WishlistCategory, label: 'DotArt', count: 8 },
  { value: 'shop' as WishlistCategory, label: 'Shop', count: 10 },
];

export default function MypageWishlistPage() {
  const [category, setCategory] = useState<WishlistCategory>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filter items by category
  const filteredItems =
    category === 'all'
      ? mockWishlistItems
      : mockWishlistItems.filter((item) => item.category === category);

  const isAllSelected =
    filteredItems.length > 0 &&
    filteredItems.every((item) => selectedIds.has(item.id));

  // Handlers
  const handleCategoryChange = useCallback((newCategory: WishlistCategory) => {
    setCategory(newCategory);
  }, []);

  const handleSelectAllToggle = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map((item) => item.id)));
    }
  }, [isAllSelected, filteredItems]);

  const handleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleRemove = useCallback((id: string) => {
    console.log('Remove from wishlist:', id);
  }, []);

  const handleAddToCart = useCallback((id: string) => {
    console.log('Add to cart:', id);
  }, []);

  const handleNotifyRestock = useCallback((id: string) => {
    console.log('Notify restock:', id);
  }, []);

  const handleDeleteSelected = useCallback(() => {
    console.log('Delete selected:', Array.from(selectedIds));
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleAddSelectedToCart = useCallback(() => {
    console.log('Add selected to cart:', Array.from(selectedIds));
  }, [selectedIds]);

  const handleLoadMore = useCallback(() => {
    console.log('Load more wishlist items');
  }, []);

  return (
    <Layout>
      <div className="mx-auto flex max-w-[1320px] flex-col lg:flex-row">
        {/* Sidebar */}
        <MypageSidebar
          userName="홍길동"
          userEmail="hong@email.com"
          userLevel="VIP"
        />

        {/* Content Area */}
        <main className="flex-1 bg-[#F8FAFC] p-4 md:p-6 lg:p-8">
          {/* Page Title */}
          <WishlistPageHeader />

          {/* Filter & Actions */}
          <WishlistFilterBar
            categories={categoryTabs}
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
            isAllSelected={isAllSelected}
            onSelectAllToggle={handleSelectAllToggle}
            onDeleteSelected={handleDeleteSelected}
            onAddSelectedToCart={handleAddSelectedToCart}
            selectedCount={selectedIds.size}
          />

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <WishlistCard
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
                originalPrice={item.originalPrice}
                discountPercent={item.discountPercent}
                badge={item.badge}
                isSoldOut={item.isSoldOut}
                isSelected={selectedIds.has(item.id)}
                onSelect={handleSelect}
                onRemove={handleRemove}
                onAddToCart={handleAddToCart}
                onNotifyRestock={handleNotifyRestock}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center py-6">
            <button
              onClick={handleLoadMore}
              className="flex items-center gap-2 rounded-[28px] border-2 border-[#E2E8F0] bg-white px-6 py-3.5 font-semibold text-[#1E293B] transition-all hover:-translate-y-0.5 hover:border-[#0066FF] hover:text-[#0066FF] hover:shadow-[0_4px_12px_rgba(0,102,255,0.15)]"
            >
              <Plus className="h-5 w-5" />
              <span>더보기</span>
              <span className="rounded-xl bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#64748B]">
                17개 더보기
              </span>
            </button>
          </div>
        </main>
      </div>
    </Layout>
  );
}
