'use client';

import { useSearchParams } from 'next/navigation';
import {
  Layout,
  OrderCompleteSuccess,
  OrderInfoCard,
  DeliveryTimeline,
  OrderCompleteActions,
} from '@/components/user';

// Mock data - In production, this would come from API based on orderId
const mockOrderData = {
  orderNumber: 'ORD-20260101-001234',
  deliveryAddress: {
    name: '홍길동',
    phone: '010-1234-5678',
    zipCode: '12345',
    address: '서울특별시 강남구 테헤란로 123',
    addressDetail: '브릭타워 5층 502호',
  },
  paymentInfo: {
    method: '신용카드 (삼성카드)',
    paidAt: '2026.01.01 14:30',
  },
  items: [
    {
      id: '1',
      name: '브릭 테크닉 람보르기니 시안 FKP 37',
      option: '선물포장: O',
      quantity: 1,
      price: 489000,
      imageGradient: 'linear-gradient(135deg, #FF6B35, #FFD93D)',
    },
    {
      id: '2',
      name: '건담 RG 1/144 사자비 스페셜 에디션',
      quantity: 1,
      price: 68000,
      imageGradient: 'linear-gradient(135deg, #0066FF, #4ECDC4)',
    },
    {
      id: '3',
      name: '카탄: 확장판 시나리오 컬렉션',
      quantity: 2,
      price: 70000,
      imageGradient: 'linear-gradient(135deg, #6BCB77, #9B59B6)',
    },
  ],
  priceSummary: {
    subtotal: 717000,
    productDiscount: 90000,
    shippingFee: 0,
    total: 627000,
  },
  deliverySteps: [
    {
      id: 'payment',
      label: '결제 완료',
      date: '01.01 14:30',
      status: 'active' as const,
      icon: 'check' as const,
    },
    {
      id: 'preparing',
      label: '상품 준비중',
      date: '예정',
      status: 'pending' as const,
      icon: 'package' as const,
    },
    {
      id: 'shipping',
      label: '배송중',
      date: '예정',
      status: 'pending' as const,
      icon: 'truck' as const,
    },
    {
      id: 'delivered',
      label: '배송 완료',
      date: '01.03~04 예정',
      status: 'pending' as const,
      icon: 'home' as const,
    },
  ],
};

export default function OrderCompletePage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  // In production, fetch order data based on orderId
  const orderData = mockOrderData;

  return (
    <Layout>
      <main className="mx-auto max-w-[1320px] px-4 py-10 md:px-10 md:py-[60px]">
        {/* Success Section */}
        <OrderCompleteSuccess orderNumber={orderData.orderNumber} />

        {/* Order Info Card */}
        <OrderInfoCard
          deliveryAddress={orderData.deliveryAddress}
          paymentInfo={orderData.paymentInfo}
          items={orderData.items}
          priceSummary={orderData.priceSummary}
        />

        {/* Delivery Timeline */}
        <DeliveryTimeline steps={orderData.deliverySteps} />

        {/* Action Buttons & Additional Info */}
        <OrderCompleteActions orderId={orderId || undefined} />
      </main>
    </Layout>
  );
}
