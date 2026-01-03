'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  User,
  Puzzle,
  Package,
  Eye,
  ShoppingCart,
  Heart,
  Share2,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Part {
  id: string;
  name: string;
  displayName: string;
  color: string;
  assemblyLevel: number;
  isVisible?: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  meta: string;
  icon: 'home' | 'building' | 'store';
}

interface ViewerSidebarProps {
  mallName: string;
  sellerName: string;
  stats: {
    parts: number;
    views: number;
    likes: number;
  };
  parts: Part[];
  products: Product[];
  selectedPartId?: string;
  onPartSelect?: (partId: string) => void;
  onPartVisibilityToggle?: (partId: string) => void;
  onProductFocus?: (productId: string) => void;
  onAddToCart?: (productId?: string) => void;
  onToggleLike?: () => void;
  onShare?: () => void;
  isLiked?: boolean;
}

export function ViewerSidebar({
  mallName,
  sellerName,
  stats,
  parts,
  products,
  selectedPartId,
  onPartSelect,
  onPartVisibilityToggle,
  onProductFocus,
  onAddToCart,
  onToggleLike,
  onShare,
  isLiked = false,
}: ViewerSidebarProps) {
  const [activeTab, setActiveTab] = useState<'parts' | 'products'>('parts');

  const iconMap = {
    home: Home,
    building: Package,
    store: Package,
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border-l border-gray-200 bg-white lg:w-[380px]">
      {/* Header */}
      <div className="border-b border-gray-100 p-4 md:p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pixar-blue">
            <Home className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{mallName}</h2>
            <p className="flex items-center gap-1.5 text-sm text-gray-500">
              <User className="h-3.5 w-3.5" />
              {sellerName}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 flex gap-6">
          <div className="text-center">
            <div className="text-xl font-extrabold text-gray-900">{stats.parts}</div>
            <div className="text-xs text-gray-500">부품</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-extrabold text-gray-900">
              {stats.views >= 1000 ? `${(stats.views / 1000).toFixed(1)}K` : stats.views}
            </div>
            <div className="text-xs text-gray-500">조회</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-extrabold text-gray-900">
              {stats.likes >= 1000 ? `${(stats.likes / 1000).toFixed(1)}K` : stats.likes}
            </div>
            <div className="text-xs text-gray-500">좋아요</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <Button
          onClick={() => setActiveTab('parts')}
          variant="ghost"
          className={cn(
            'flex-1 rounded-none border-b-2 py-3 text-sm font-semibold',
            activeTab === 'parts'
              ? 'border-pixar-blue text-pixar-blue'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          )}
        >
          부품 목록
        </Button>
        <Button
          onClick={() => setActiveTab('products')}
          variant="ghost"
          className={cn(
            'flex-1 rounded-none border-b-2 py-3 text-sm font-semibold',
            activeTab === 'products'
              ? 'border-pixar-blue text-pixar-blue'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          )}
        >
          상품
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5">
        {activeTab === 'parts' ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
                <Puzzle className="h-5 w-5 text-pixar-blue" />
                부품 ({parts.length})
              </h3>
              <Button variant="link" size="sm" className="h-auto p-0 text-sm font-semibold">
                전체 보기
              </Button>
            </div>

            <div className="space-y-2">
              {parts.map((part) => (
                <div
                  key={part.id}
                  onClick={() => onPartSelect?.(part.id)}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-colors',
                    selectedPartId === part.id
                      ? 'border-pixar-blue bg-blue-50'
                      : 'border-transparent bg-gray-50 hover:bg-blue-50'
                  )}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                    style={{ backgroundColor: part.color }}
                  >
                    L{part.assemblyLevel}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-gray-900">
                      {part.displayName}
                    </div>
                    <div className="text-xs text-gray-500">조립 단계: {part.assemblyLevel}</div>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPartVisibilityToggle?.(part.id);
                    }}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'h-5 w-5 rounded border-2 p-0',
                      part.isVisible !== false
                        ? 'border-pixar-blue bg-pixar-blue hover:bg-pixar-blue/90'
                        : 'border-gray-300 bg-white hover:bg-gray-50'
                    )}
                  >
                    {part.isVisible !== false && <Check className="h-3 w-3 text-white" />}
                  </Button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
                <Package className="h-5 w-5 text-pixar-blue" />
                상품 목록
              </h3>
              <Link href="/brickarts/1/products" className="text-sm font-semibold text-pixar-blue">
                전체보기
              </Link>
            </div>

            <div className="space-y-3">
              {products.map((product) => {
                const Icon = iconMap[product.icon] || Package;
                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-blue-50"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-200">
                      <Icon className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-base font-bold text-pixar-blue">
                        {product.price.toLocaleString()}원
                      </div>
                      <div className="text-xs text-gray-500">{product.meta}</div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Button
                        onClick={() => onProductFocus?.(product.id)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg border border-gray-200 bg-white hover:border-pixar-blue hover:text-pixar-blue"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => onAddToCart?.(product.id)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg border border-gray-200 bg-white hover:border-pixar-blue hover:text-pixar-blue"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-gray-100 p-4 md:p-5">
        <Button className="mb-3 w-full" size="lg" onClick={() => onAddToCart?.()}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          장바구니에 담기
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onToggleLike}>
            <Heart className={cn('mr-2 h-4 w-4', isLiked && 'fill-red-500 text-red-500')} />
            찜하기
          </Button>
          <Button variant="outline" className="flex-1" onClick={onShare}>
            <Share2 className="mr-2 h-4 w-4" />
            공유
          </Button>
        </div>
      </div>
    </div>
  );
}
