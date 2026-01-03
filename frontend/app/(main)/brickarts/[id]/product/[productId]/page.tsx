'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ChevronRight } from 'lucide-react';
import {
  Layout,
  Breadcrumb,
  ProductGallery,
  ProductHeader,
  ProductPriceBox,
  DeliveryInfo,
  SellerInfo,
  ProductDetailTabs,
  RelatedProductCard,
  VRPreviewFAB,
} from '@/components/user';

// Mock data
const mockProduct = {
  id: 'product-1',
  title: '북유럽 스타일 프리미엄 3인용 패브릭 소파',
  images: [
    { id: '1', src: '/images/products/sofa-1.jpg', alt: '소파 이미지 1' },
    { id: '2', src: '/images/products/sofa-2.jpg', alt: '소파 이미지 2' },
    { id: '3', src: '/images/products/sofa-3.jpg', alt: '소파 이미지 3' },
    { id: '4', src: '/images/products/sofa-4.jpg', alt: '소파 이미지 4' },
    { id: '5', src: '/images/products/sofa-5.jpg', alt: '소파 이미지 5' },
  ],
  tags: [
    { label: '베스트', variant: 'hot' as const },
    { label: '무료배송' },
    { label: '3D' },
  ],
  mall: {
    name: '코스모스 리빙',
    href: '/brickart/cosmos-living',
  },
  stats: {
    rating: 4.8,
    reviewCount: 324,
    views: 12847,
    purchases: 1234,
  },
  originalPrice: 890000,
  salePrice: 667500,
  discountRate: 25,
  delivery: [
    { icon: 'package' as const, text: '무료배송 (도서산간 제외)', highlight: '무료배송' },
    { icon: 'calendar' as const, text: '오늘 주문 시 1/3(금) 도착 예정', highlight: '1/3(금) 도착 예정' },
    { icon: 'refresh' as const, text: '7일 이내 무료 반품', highlight: '무료 반품' },
  ],
  seller: {
    name: '코스모스 리빙',
    description: '프리미엄 가구 전문 판매자',
    href: '/brickart/cosmos-living',
    stats: {
      rating: 4.9,
      responseRate: '98%',
      responseTime: '2시간',
    },
  },
};

const mockRelatedProducts = [
  { id: 'r1', title: '북유럽 LED 플로어 스탠드', price: 189000, image: '/images/products/lamp.jpg' },
  { id: 'r2', title: '원목 사이드 테이블', price: 145000, image: '/images/products/table.jpg' },
  { id: 'r3', title: '모던 아트 포스터 세트', price: 78000, image: '/images/products/poster.jpg' },
  { id: 'r4', title: '세라믹 화분 세트', price: 56000, image: '/images/products/pot.jpg' },
];

const tabs = [
  { id: 'detail', label: '상품 상세', icon: 'detail' as const },
  { id: 'review', label: '리뷰', icon: 'review' as const, count: 324 },
  { id: 'qna', label: 'Q&A', icon: 'qna' as const, count: 18 },
  { id: 'shipping', label: '배송/교환', icon: 'shipping' as const },
];

export default function BrickArtProductPage({
  params,
}: {
  params: { id: string; productId: string };
}) {
  const router = useRouter();
  const [toast, setToast] = useState({ message: '', isVisible: false });

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
    setTimeout(() => setToast({ message: '', isVisible: false }), 2000);
  };

  const handleAddToCart = (quantity: number) => {
    showToast(`${quantity}개 장바구니에 담았습니다`);
  };

  const handleBuyNow = (quantity: number) => {
    router.push(`/checkout?productId=${params.productId}&quantity=${quantity}`);
  };

  const handleView3D = () => {
    router.push(`/brickarts/${params.id}/viewer`);
  };

  const breadcrumbItems = [
    { label: '홈', href: '/' },
    { label: 'BrickArt', href: '/brickart' },
    { label: mockProduct.mall.name, href: mockProduct.mall.href },
    { label: mockProduct.title },
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-4 pb-16 md:px-10">
        {/* Product Layout */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Gallery */}
          <ProductGallery
            images={mockProduct.images}
            has3DPreview
            onView3D={handleView3D}
          />

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <ProductHeader
              title={mockProduct.title}
              tags={mockProduct.tags}
              mall={mockProduct.mall}
              stats={mockProduct.stats}
            />

            <ProductPriceBox
              originalPrice={mockProduct.originalPrice}
              salePrice={mockProduct.salePrice}
              discountRate={mockProduct.discountRate}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />

            <DeliveryInfo items={mockProduct.delivery} />

            <SellerInfo {...mockProduct.seller} />
          </div>
        </div>

        {/* Product Detail Tabs */}
        <ProductDetailTabs tabs={tabs} defaultTab="detail" />

        {/* Related Products */}
        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-xl font-extrabold text-gray-900 md:text-2xl">
              <Sparkles className="h-6 w-6 text-pixar-blue md:h-7 md:w-7" />
              이 상품과 함께 많이 본 상품
            </h2>
            <Link
              href="/brickarts/products"
              className="flex items-center gap-1 text-sm font-semibold text-pixar-blue hover:underline"
            >
              전체보기
              <ChevronRight className="h-[18px] w-[18px]" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
            {mockRelatedProducts.map((product) => (
              <RelatedProductCard
                key={product.id}
                {...product}
                href={`/brickart/${params.id}/product/${product.id}`}
              />
            ))}
          </div>
        </section>
      </main>

      {/* VR Preview FAB */}
      <VRPreviewFAB onClick={handleView3D} />

      {/* Toast */}
      {toast.isVisible && (
        <div className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-black/80 px-6 py-3 text-sm font-semibold text-white">
          {toast.message}
        </div>
      )}
    </Layout>
  );
}
