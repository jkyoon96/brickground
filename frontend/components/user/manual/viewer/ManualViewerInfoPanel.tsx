'use client';

import Link from 'next/link';
import { Info, Package, List, Box, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ManualInfo {
  totalPages: number;
  fileSize: string;
  language: string;
  updatedAt: string;
}

interface RelatedProduct {
  id: string;
  name: string;
  price: string;
  imageGradient?: string;
}

interface TableOfContentsItem {
  id: string;
  number: number;
  title: string;
  pageRange: string;
}

interface ManualViewerInfoPanelProps {
  info: ManualInfo;
  product?: RelatedProduct;
  tableOfContents: TableOfContentsItem[];
  activeTocId?: string;
  onTocClick?: (id: string) => void;
  onAddToCart?: (productId: string) => void;
}

export function ManualViewerInfoPanel({
  info,
  product,
  tableOfContents,
  activeTocId,
  onTocClick,
  onAddToCart,
}: ManualViewerInfoPanelProps) {
  return (
    <div className="hidden w-[280px] flex-col gap-5 overflow-y-auto bg-[#2D2D3F] p-5 lg:flex">
      {/* Manual Info Section */}
      <div className="rounded-xl bg-white/5 p-4">
        <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-white">
          <Info className="h-4 w-4 text-[#9B59B6]" />
          매뉴얼 정보
        </div>
        <div className="space-y-0">
          <div className="flex items-center justify-between border-b border-white/5 py-2">
            <span className="text-[13px] text-white/60">총 페이지</span>
            <span className="text-[13px] font-semibold text-white">
              {info.totalPages} 페이지
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 py-2">
            <span className="text-[13px] text-white/60">파일 크기</span>
            <span className="text-[13px] font-semibold text-white">
              {info.fileSize}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 py-2">
            <span className="text-[13px] text-white/60">언어</span>
            <span className="text-[13px] font-semibold text-white">
              {info.language}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-[13px] text-white/60">업데이트</span>
            <span className="text-[13px] font-semibold text-white">
              {info.updatedAt}
            </span>
          </div>
        </div>
      </div>

      {/* Related Product Section */}
      {product && (
        <div className="rounded-xl bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-white">
            <Package className="h-4 w-4 text-[#9B59B6]" />
            연관 상품
          </div>
          <div className="flex gap-3">
            <div
              className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[10px]"
              style={{
                background:
                  product.imageGradient ||
                  'linear-gradient(135deg, #FF6B35, #FFD93D)',
              }}
            >
              <Box className="h-8 w-8 text-white/70" />
            </div>
            <div className="flex-1">
              <Link href={`/products/${product.id}`}>
                <h4 className="mb-1 text-sm font-semibold text-white hover:underline">
                  {product.name}
                </h4>
              </Link>
              <p className="mb-2 text-base font-bold text-[#FFD93D]">
                {product.price}
              </p>
              <Button
                onClick={() => onAddToCart?.(product.id)}
                className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#9B59B6] py-2 text-xs font-semibold text-white hover:bg-[#8E44AD]"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                장바구니 담기
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table of Contents Section */}
      <div className="rounded-xl bg-white/5 p-4">
        <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-white">
          <List className="h-4 w-4 text-[#9B59B6]" />
          목차
        </div>
        <div className="flex flex-col gap-1">
          {tableOfContents.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onTocClick?.(item.id)}
              className={cn(
                'h-auto flex items-center justify-start gap-2.5 rounded-lg px-3 py-2.5 text-left',
                activeTocId === item.id
                  ? 'bg-[#9B59B6]'
                  : 'bg-white/5 hover:bg-[#9B59B6]/20'
              )}
            >
              <div
                className={cn(
                  'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-[11px] font-bold',
                  activeTocId === item.id
                    ? 'bg-white text-[#9B59B6]'
                    : 'bg-white/10 text-white'
                )}
              >
                {item.number}
              </div>
              <span
                className={cn(
                  'text-[13px]',
                  activeTocId === item.id ? 'text-white' : 'text-white/80'
                )}
              >
                {item.title} ({item.pageRange})
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManualViewerInfoPanel;
