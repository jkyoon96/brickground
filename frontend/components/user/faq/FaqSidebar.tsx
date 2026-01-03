'use client';

import { useState } from 'react';
import {
  Search,
  Folder,
  Grid3X3,
  ShoppingBag,
  Truck,
  RefreshCcw,
  User,
  Building2,
  Palette,
  Store,
  Settings,
  MessageCircle,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface FaqCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  count: number;
}

interface FaqSidebarProps {
  categories?: FaqCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onSearch?: (query: string) => void;
  onInquiry?: () => void;
}

const defaultCategories: FaqCategory[] = [
  { id: 'all', label: '전체', icon: Grid3X3, count: 128 },
  { id: 'order', label: '주문/결제', icon: ShoppingBag, count: 32 },
  { id: 'delivery', label: '배송', icon: Truck, count: 24 },
  { id: 'return', label: '교환/반품', icon: RefreshCcw, count: 28 },
  { id: 'account', label: '회원/계정', icon: User, count: 18 },
  { id: 'brickart', label: 'BrickArt', icon: Building2, count: 15 },
  { id: 'creation', label: 'DotArt/Creation', icon: Palette, count: 11 },
  { id: 'seller', label: '판매자 문의', icon: Store, count: 8 },
  { id: 'etc', label: '기타', icon: Settings, count: 12 },
];

export function FaqSidebar({
  categories = defaultCategories,
  selectedCategory,
  onCategoryChange,
  onSearch,
  onInquiry,
}: FaqSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  return (
    <aside className="flex flex-col gap-4 md:gap-6">
      {/* Search Card */}
      <div className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,206,201,0.15)] md:p-6">
        <form onSubmit={handleSearchSubmit}>
          <div className="flex items-center gap-2.5 rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
            <Search className="h-5 w-5 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="FAQ 검색..."
              className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-[#94A3B8]"
            />
          </div>
        </form>
      </div>

      {/* Category Card */}
      <div className="rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,206,201,0.15)] md:p-6">
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-[#1E293B] md:mb-4">
          <Folder className="h-5 w-5 text-[#00CEC9]" />
          카테고리
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <Button
                key={category.id}
                variant="ghost"
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  'flex h-auto items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors md:px-4 md:py-3',
                  isActive
                    ? 'bg-[rgba(0,206,201,0.1)] text-[#00CEC9]'
                    : 'text-[#64748B] hover:bg-[#F8FAFC]'
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-[18px] w-[18px]" />
                  {category.label}
                </span>
                <span
                  className={cn(
                    'rounded-[10px] px-2.5 py-0.5 text-xs',
                    isActive ? 'bg-[#00CEC9] text-white' : 'bg-[#F8FAFC]'
                  )}
                >
                  {category.count}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Contact Box */}
      <div className="rounded-[20px] bg-white p-4 text-center shadow-[0_4px_20px_rgba(0,206,201,0.15)] md:p-6">
        <h4 className="mb-2 text-[15px] font-bold text-[#1E293B]">
          원하는 답변을 못 찾으셨나요?
        </h4>
        <p className="mb-4 text-[13px] text-[#64748B]">
          1:1 문의로 직접 질문해 주세요
        </p>
        <Button
          onClick={onInquiry}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00CEC9] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#00B8B3]"
        >
          <MessageCircle className="h-[18px] w-[18px]" />
          1:1 문의하기
        </Button>
      </div>
    </aside>
  );
}

export default FaqSidebar;
