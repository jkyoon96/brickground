'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Package } from 'lucide-react';
import {
  Layout,
  OrderDetailHeader,
  OrderDeliveryStatus,
  OrderDetailItem,
  OrderPaymentSummary,
  OrderActionCard,
} from '@/components/user';
import type { OrderStatus } from '@/components/user';

// Mock data - In production, fetch based on order ID
const mockOrderData = {
  orderNumber: 'ORD-20260101-001234',
  status: 'shipping' as OrderStatus,
  deliverySteps: [
    {
      id: 'payment',
      label: '결제 완료',
      date: '01.01 14:30',
      status: 'completed' as const,
      icon: 'check' as const,
    },
    {
      id: 'preparing',
      label: '상품 준비',
      date: '01.01 18:00',
      status: 'completed' as const,
      icon: 'package' as const,
    },
    {
      id: 'shipping',
      label: '배송중',
      date: '01.02 09:30',
      status: 'current' as const,
      icon: 'truck' as const,
    },
    {
      id: 'delivered',
      label: '배송 완료',
      date: '01.03 예정',
      status: 'pending' as const,
      icon: 'home' as const,
    },
  ],
  courier: 'CJ대한통운',
  trackingNumber: '123456789012',
  deliveryLogs: [
    { time: '01.02 09:30', status: '배송 출발', location: '강남 물류센터' },
    { time: '01.02 06:00', status: '간선 상차', location: '용인 Hub' },
    { time: '01.01 18:00', status: '집하 완료', location: '판매자 발송' },
  ],
  items: [
    {
      id: '1',
      name: '레고 테크닉 람보르기니 시안 FKP 37',
      brand: '레고 / 테크닉',
      option: '선물포장: O',
      quantity: 1,
      price: 489000,
      imageGradient: 'linear-gradient(135deg, #FF6B35, #FFD93D)',
    },
    {
      id: '2',
      name: '건담 RG 1/144 사자비 스페셜 에디션',
      brand: '피규어 / 건담',
      quantity: 1,
      price: 68000,
      imageGradient: 'linear-gradient(135deg, #0066FF, #4ECDC4)',
    },
    {
      id: '3',
      name: '카탄: 확장판 시나리오 컬렉션',
      brand: '보드게임',
      quantity: 2,
      price: 70000,
      imageGradient: 'linear-gradient(135deg, #6BCB77, #9B59B6)',
    },
  ],
  payment: {
    subtotal: 717000,
    productDiscount: 90000,
    shippingFee: 0,
    total: 627000,
  },
  paymentMethod: {
    type: '삼성카드',
    cardNumber: '****1234',
    paidAt: '2026.01.01 14:30',
  },
  deliveryAddress: {
    name: '홍길동',
    phone: '010-1234-5678',
    zipCode: '12345',
    address: '서울특별시 강남구 테헤란로 123',
    addressDetail: '브릭타워 5층 502호',
    request: '문 앞에 놓아주세요',
  },
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  // In production, fetch order data based on orderId
  const orderData = mockOrderData;

  // Handlers
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleNotificationSettings = useCallback(() => {
    console.log('Open notification settings');
  }, []);

  const handleCopyTrackingNumber = useCallback((trackingNumber: string) => {
    console.log('Copied tracking number:', trackingNumber);
  }, []);

  const handleWriteReview = useCallback((itemId: string) => {
    router.push(`/review/write?productId=${itemId}&orderId=${orderId}`);
  }, [router, orderId]);

  const handleInquiry = useCallback((itemId: string) => {
    router.push(`/inquiry?productId=${itemId}`);
  }, [router]);

  const handleReorder = useCallback((itemId: string) => {
    console.log('Reorder item:', itemId);
  }, []);

  const handleDownloadReceipt = useCallback(() => {
    console.log('Download receipt');
  }, []);

  const handleExchangeReturn = useCallback(() => {
    router.push(`/order/${orderId}/exchange`);
  }, [router, orderId]);

  const handleCancelOrder = useCallback(() => {
    if (confirm('주문을 취소하시겠습니까?')) {
      console.log('Cancel order:', orderId);
    }
  }, [orderId]);

  return (
    <Layout>
      {/* Page Header */}
      <OrderDetailHeader
        orderNumber={orderData.orderNumber}
        status={orderData.status}
        onBack={handleBack}
      />

      {/* Main Content */}
      <main className="mx-auto max-w-[1320px] px-4 py-5 md:px-10 md:py-10">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
          {/* Left Column - Delivery Status & Order Items */}
          <div>
            {/* Delivery Status */}
            <OrderDeliveryStatus
              steps={orderData.deliverySteps}
              courier={orderData.courier}
              trackingNumber={orderData.trackingNumber}
              logs={orderData.deliveryLogs}
              onNotificationSettings={handleNotificationSettings}
              onCopyTrackingNumber={handleCopyTrackingNumber}
            />

            {/* Order Items */}
            <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-7">
              <div className="mb-4 flex items-center gap-2.5">
                <Package className="h-5 w-5 text-[#0066FF] md:h-[22px] md:w-[22px]" />
                <h2 className="text-base font-bold text-[#1E293B] md:text-lg">주문 상품</h2>
              </div>

              {orderData.items.map((item) => (
                <OrderDetailItem
                  key={item.id}
                  {...item}
                  onWriteReview={handleWriteReview}
                  onInquiry={handleInquiry}
                  onReorder={handleReorder}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-5 lg:space-y-6">
            {/* Payment Summary, Method & Delivery Address */}
            <OrderPaymentSummary
              payment={orderData.payment}
              paymentMethod={orderData.paymentMethod}
              deliveryAddress={orderData.deliveryAddress}
            />

            {/* Action Buttons */}
            <OrderActionCard
              canCancel={orderData.status === 'pending' || orderData.status === 'preparing'}
              canExchange={orderData.status === 'delivered'}
              onDownloadReceipt={handleDownloadReceipt}
              onExchangeReturn={handleExchangeReturn}
              onCancelOrder={handleCancelOrder}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
