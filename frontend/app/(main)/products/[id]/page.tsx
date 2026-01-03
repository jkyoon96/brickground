'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRight, Truck, Clock, Package, ShieldCheck } from 'lucide-react';
import {
  Layout,
  ProductGallery,
  ProductHeader,
  ProductPrice,
  ProductOptions,
  ProductActions,
  ProductDetailTabs,
  RelatedProductCard,
  VRPreviewFAB,
} from '@/components/user';

// Mock product data
const mockProduct = {
  id: '1',
  name: '브릭 테크닉 람보르기니 시안 FKP 37 (42115)',
  tags: [
    { label: 'HOT', variant: 'hot' as const },
    { label: 'BEST', variant: 'default' as const },
    { label: '무료배송', variant: 'default' as const },
  ],
  mall: {
    name: 'BrickGround 공식몰',
    href: '/seller/brickground',
  },
  stats: {
    rating: 4.9,
    reviewCount: 128,
    views: 12400,
    purchases: 892,
  },
  currentPrice: 489000,
  originalPrice: 549000,
  discountPercent: 11,
  savings: 60000,
  points: 4890,
  images: [
    { id: '1', src: '/images/product/product-1.jpg', alt: '브릭 테크닉 람보르기니' },
    { id: '2', src: '/images/product/product-2.jpg', alt: '썸네일 2' },
    { id: '3', src: '/images/product/product-3.jpg', alt: '썸네일 3' },
    { id: '4', src: '/images/product/product-4.jpg', alt: '썸네일 4' },
    { id: '5', src: '/images/product/product-5.jpg', alt: '썸네일 5' },
  ],
  has3DPreview: true,
  optionGroups: [
    {
      title: '패키지 선택',
      options: [
        { id: 'basic', label: '기본 패키지', price: 0 },
        { id: 'display', label: '디스플레이 케이스 포함', price: 35000 },
        { id: 'tools', label: '조립 도구 세트 포함', price: 15000 },
      ],
    },
    {
      title: '추가 구성품',
      options: [
        { id: 'led', label: 'LED 라이트 키트', price: 45000 },
        { id: 'motor', label: '파워 펑션 모터', price: 65000 },
        { id: 'remote', label: '리모컨 세트', price: 89000, isDisabled: true, disabledReason: '품절' },
      ],
      multiple: true,
    },
  ],
  deliveryInfo: [
    { icon: 'truck' as const, label: '배송비', value: '무료배송', highlight: true },
    { icon: 'clock' as const, label: '배송예정', value: '내일(화) 도착 예정' },
    { icon: 'package' as const, label: '판매자', value: 'BrickGround 공식몰' },
    { icon: 'shield' as const, label: '보증', value: '정품 보증 - 7일 무료 반품' },
  ],
  tabs: [
    { id: 'description', label: '상품설명', icon: 'detail' as const },
    { id: 'detail', label: '상세정보', icon: 'detail' as const },
    { id: 'review', label: '리뷰', icon: 'review' as const, count: 128 },
    { id: 'qna', label: 'Q&A', icon: 'qna' as const, count: 23 },
    { id: 'shipping', label: '배송/교환', icon: 'shipping' as const },
  ],
};

const mockRelatedProducts = [
  { id: '2', title: '브릭 테크닉 포르쉐 911', price: 189000, imageUrl: '/images/product/product-6.jpg' },
  { id: '3', title: '브릭 테크닉 부가티 시론', price: 459000, imageUrl: '/images/product/product-7.jpg' },
  { id: '4', title: '브릭 테크닉 페라리 데이토나', price: 529000, imageUrl: '/images/product/product-8.jpg' },
  { id: '5', title: 'LED 라이트 키트', price: 45000, imageUrl: '/images/product/product-9.jpg' },
  { id: '6', title: '디스플레이 케이스', price: 35000, imageUrl: '/images/product/product-10.jpg' },
];

const deliveryIcons = {
  truck: Truck,
  clock: Clock,
  package: Package,
  shield: ShieldCheck,
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  // State
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({
    '0': ['basic'],
    '1': [],
  });
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Handlers
  const handleOptionChange = useCallback((groupIndex: number, optionId: string) => {
    setSelectedOptions((prev) => {
      const key = groupIndex.toString();
      const group = mockProduct.optionGroups[groupIndex];
      const current = prev[key] || [];

      if (group.multiple) {
        // Toggle for multiple selection
        if (current.includes(optionId)) {
          return { ...prev, [key]: current.filter((id) => id !== optionId) };
        }
        return { ...prev, [key]: [...current, optionId] };
      }

      // Single selection
      return { ...prev, [key]: [optionId] };
    });
  }, []);

  const handleAddToCart = useCallback((quantity: number) => {
    console.log('Add to cart:', { productId, quantity, selectedOptions });
    // TODO: Add to cart API
  }, [productId, selectedOptions]);

  const handleBuyNow = useCallback((quantity: number) => {
    console.log('Buy now:', { productId, quantity, selectedOptions });
    router.push('/checkout');
  }, [productId, selectedOptions, router]);

  const handleWishlistToggle = useCallback(() => {
    setIsWishlisted((prev) => !prev);
    // TODO: Wishlist API
  }, []);

  const handleView3D = useCallback(() => {
    router.push(`/products/${productId}/view`);
  }, [router, productId]);

  const handleVRPreview = useCallback(() => {
    router.push(`/vrmall/product/${productId}`);
  }, [router, productId]);

  // Breadcrumb
  const breadcrumbItems = [
    { label: '홈', href: '/' },
    { label: '상품', href: '/products' },
    { label: '브릭 / 테크닉', href: '/products?category=lego-technic' },
    { label: mockProduct.name },
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-2 px-4 py-3 text-xs text-[#64748B] md:px-10 md:py-5 md:text-sm">
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-[#FF6B35]">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[#1E293B]">{item.label}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-4 pb-10 md:px-10 md:pb-16">
        {/* Product Detail Grid */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:mb-16 md:gap-16 lg:grid-cols-2">
          {/* Image Gallery */}
          <ProductGallery
            images={mockProduct.images}
            has3DPreview={mockProduct.has3DPreview}
            onView3D={handleView3D}
          />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header with tags, title, stats */}
            <ProductHeader
              title={mockProduct.name}
              tags={mockProduct.tags}
              mall={mockProduct.mall}
              stats={mockProduct.stats}
            />

            {/* Price */}
            <ProductPrice
              currentPrice={mockProduct.currentPrice}
              originalPrice={mockProduct.originalPrice}
              discountPercent={mockProduct.discountPercent}
              savings={mockProduct.savings}
              points={mockProduct.points}
            />

            {/* Options */}
            <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-6">
              <ProductOptions
                groups={mockProduct.optionGroups}
                selectedOptions={selectedOptions}
                onOptionChange={handleOptionChange}
              />
            </div>

            {/* Quantity & Actions */}
            <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-6">
              <ProductActions
                isWishlisted={isWishlisted}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onWishlistToggle={handleWishlistToggle}
              />
            </div>

            {/* Delivery Info */}
            <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-6">
              {mockProduct.deliveryInfo.map((item, index) => {
                const Icon = deliveryIcons[item.icon];
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b border-[#E2E8F0] py-3.5 last:border-b-0 last:pb-0 first:pt-0"
                  >
                    <Icon className="h-5 w-5 flex-shrink-0 text-[#FF6B35] md:h-[22px] md:w-[22px]" />
                    <span className="w-20 text-sm text-[#64748B] md:w-24 md:text-[14px]">
                      {item.label}
                    </span>
                    <span
                      className={`text-sm font-semibold md:text-[15px] ${
                        item.highlight ? 'text-[#6BCB77]' : 'text-[#1E293B]'
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <ProductDetailTabs
          tabs={mockProduct.tabs}
          defaultTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Related Products */}
        <section className="mt-10 rounded-[20px] bg-white p-6 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:mt-12 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#1E293B] md:text-[22px]">
              함께 보면 좋은 상품
            </h2>
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm font-semibold text-[#FF6B35] md:text-[15px]"
            >
              더보기
              <ChevronRight className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-5">
            {mockRelatedProducts.map((product) => (
              <RelatedProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                href={`/products/${product.id}`}
              />
            ))}
          </div>
        </section>
      </main>

      {/* VR Preview FAB */}
      <VRPreviewFAB onClick={handleVRPreview} />
    </Layout>
  );
}
