'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Package } from 'lucide-react';
import {
  Layout,
  CheckoutPageHeader,
  DeliveryAddressCard,
  CheckoutOrderItem,
  DiscountSection,
  PaymentMethodSelector,
  CheckoutSummary,
  AgreementCheckboxes,
} from '@/components/user';
import type { PaymentMethodType } from '@/components/user';

interface OrderItem {
  id: string;
  name: string;
  brand: string;
  imageUrl?: string;
  option?: string;
  quantity: number;
  price: number;
  originalPrice?: number;
}

interface AgreementItem {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
  detailUrl?: string;
}

// Mock data
const mockAddress = {
  id: '1',
  name: '홍길동',
  phone: '010-1234-5678',
  address: '서울시 강남구 테헤란로 123',
  addressDetail: '브릭타워 15층',
  isDefault: true,
};

const mockOrderItems: OrderItem[] = [
  {
    id: '1',
    name: '브릭 테크닉 람보르기니 시안 FKP 37',
    brand: '브릭 / 테크닉',
    imageUrl: '/images/products/lego-lambo.jpg',
    option: '선물포장: O',
    quantity: 1,
    price: 489000,
    originalPrice: 549000,
  },
  {
    id: '2',
    name: '건담 RG 1/144 사자비 스페셜 에디션',
    brand: '피규어 / 건담',
    imageUrl: '/images/products/gundam-sazabi.jpg',
    quantity: 1,
    price: 68000,
  },
];

const initialAgreements: AgreementItem[] = [
  {
    id: 'terms',
    label: '이용약관 동의',
    required: true,
    checked: false,
    detailUrl: '/policy/terms',
  },
  {
    id: 'privacy',
    label: '개인정보 수집 및 이용 동의',
    required: true,
    checked: false,
    detailUrl: '/policy/privacy',
  },
  {
    id: 'marketing',
    label: '마케팅 정보 수신 동의',
    required: false,
    checked: false,
    detailUrl: '/policy/marketing',
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [deliveryRequest, setDeliveryRequest] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('credit_card');
  const [appliedCouponDiscount, setAppliedCouponDiscount] = useState(0);
  const [appliedPoints, setAppliedPoints] = useState(0);
  const [agreements, setAgreements] = useState<AgreementItem[]>(initialAgreements);

  // Computed values
  const subtotal = useMemo(() => {
    return mockOrderItems.reduce(
      (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
      0
    );
  }, []);

  const productDiscount = useMemo(() => {
    return mockOrderItems.reduce((sum, item) => {
      if (item.originalPrice) {
        return sum + (item.originalPrice - item.price) * item.quantity;
      }
      return sum;
    }, 0);
  }, []);

  const total = useMemo(() => {
    return mockOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, []);

  const shippingFee = total >= 50000 ? 0 : 3000;

  const isAllAgreementsRequired = useMemo(() => {
    return agreements.filter((a) => a.required).every((a) => a.checked);
  }, [agreements]);

  // Handlers
  const handleChangeAddress = useCallback(() => {
    // TODO: Open address selection modal
    console.log('Change address');
  }, []);

  const handleCouponApply = useCallback((code: string) => {
    console.log('Apply coupon:', code);
    // Mock: Apply 10% discount
    setAppliedCouponDiscount(10000);
  }, []);

  const handlePointsApply = useCallback((points: number) => {
    setAppliedPoints(points);
  }, []);

  const handleAgreementChange = useCallback((id: string, checked: boolean) => {
    setAgreements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, checked } : a))
    );
  }, []);

  const handleSelectAllAgreements = useCallback((checked: boolean) => {
    setAgreements((prev) => prev.map((a) => ({ ...a, checked })));
  }, []);

  const handlePay = useCallback(() => {
    if (!isAllAgreementsRequired) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    // TODO: Process payment
    console.log('Processing payment...', {
      paymentMethod,
      deliveryRequest,
      appliedCouponDiscount,
      appliedPoints,
    });

    router.push('/order/complete');
  }, [
    isAllAgreementsRequired,
    paymentMethod,
    deliveryRequest,
    appliedCouponDiscount,
    appliedPoints,
    router,
  ]);

  return (
    <Layout>
      <CheckoutPageHeader />

      <main className="mx-auto max-w-[1320px] px-4 py-6 md:px-10 md:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Delivery Address */}
            <DeliveryAddressCard
              address={mockAddress}
              deliveryRequest={deliveryRequest}
              onChangeAddress={handleChangeAddress}
              onDeliveryRequestChange={setDeliveryRequest}
            />

            {/* Order Items */}
            <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-6">
              <div className="mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-[#FF6B35]" />
                <h2 className="text-base font-bold text-[#1E293B] md:text-lg">
                  주문 상품 ({mockOrderItems.length}개)
                </h2>
              </div>
              <div className="divide-y divide-[#E2E8F0]">
                {mockOrderItems.map((item) => (
                  <CheckoutOrderItem key={item.id} {...item} />
                ))}
              </div>
            </div>

            {/* Discount Section */}
            <DiscountSection
              availableCoupons={3}
              availablePoints={5000}
              appliedCouponDiscount={appliedCouponDiscount}
              appliedPoints={appliedPoints}
              onCouponApply={handleCouponApply}
              onPointsApply={handlePointsApply}
            />

            {/* Payment Method */}
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />

            {/* Agreements */}
            <AgreementCheckboxes
              agreements={agreements}
              onAgreementChange={handleAgreementChange}
              onSelectAll={handleSelectAllAgreements}
            />
          </div>

          {/* Right Column - Summary */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <CheckoutSummary
              subtotal={subtotal}
              productDiscount={productDiscount}
              couponDiscount={appliedCouponDiscount}
              pointsUsed={appliedPoints}
              shippingFee={shippingFee}
              isAgreementChecked={isAllAgreementsRequired}
              onPay={handlePay}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
