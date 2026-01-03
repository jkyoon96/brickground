'use client';

import { Receipt, CheckCircle, MapPin, CreditCard, Package } from 'lucide-react';
import Image from 'next/image';

interface DeliveryAddress {
  name: string;
  phone: string;
  zipCode: string;
  address: string;
  addressDetail?: string;
}

interface PaymentInfo {
  method: string;
  paidAt: string;
}

interface OrderItem {
  id: string;
  name: string;
  option?: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  imageGradient?: string;
}

interface PriceSummary {
  subtotal: number;
  productDiscount?: number;
  couponDiscount?: number;
  pointsUsed?: number;
  shippingFee: number;
  total: number;
}

interface OrderInfoCardProps {
  deliveryAddress: DeliveryAddress;
  paymentInfo: PaymentInfo;
  items: OrderItem[];
  priceSummary: PriceSummary;
}

export function OrderInfoCard({
  deliveryAddress,
  paymentInfo,
  items,
  priceSummary,
}: OrderInfoCardProps) {
  const formatPrice = (value: number) => {
    return value.toLocaleString('ko-KR');
  };

  return (
    <div className="mb-6 rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(107,203,119,0.15)] md:p-8">
      {/* Card Header */}
      <div className="mb-6 flex items-center justify-between border-b border-[#E2E8F0] pb-5">
        <h3 className="flex items-center gap-2.5 text-lg font-bold text-[#1E293B]">
          <Receipt className="h-[22px] w-[22px] text-[#6BCB77]" />
          주문 정보
        </h3>
        <div className="flex items-center gap-1.5 rounded-[20px] bg-[rgba(107,203,119,0.15)] px-4 py-2 text-sm font-semibold text-[#6BCB77]">
          <CheckCircle className="h-4 w-4" />
          결제 완료
        </div>
      </div>

      {/* Order Info Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {/* Delivery Address */}
        <div>
          <h4 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[#64748B]">
            <MapPin className="h-4 w-4" />
            배송지
          </h4>
          <div className="rounded-xl bg-[#F8FAFC] p-4">
            <div className="leading-[1.8] text-sm">
              <strong className="mb-1 block text-[15px] text-[#1E293B]">
                {deliveryAddress.name} / {deliveryAddress.phone}
              </strong>
              <span className="text-[#64748B]">
                [{deliveryAddress.zipCode}] {deliveryAddress.address}
                {deliveryAddress.addressDetail && <br />}
                {deliveryAddress.addressDetail}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div>
          <h4 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[#64748B]">
            <CreditCard className="h-4 w-4" />
            결제 정보
          </h4>
          <div className="rounded-xl bg-[#F8FAFC] p-4">
            <div className="flex justify-between py-2">
              <span className="text-sm text-[#64748B]">결제 수단</span>
              <span className="text-sm font-semibold text-[#1E293B]">{paymentInfo.method}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-[#64748B]">결제 일시</span>
              <span className="text-sm font-semibold text-[#1E293B]">{paymentInfo.paidAt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-7 border-t border-[#E2E8F0] pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-base font-bold text-[#1E293B]">
            <Package className="h-5 w-5 text-[#FF6B35]" />
            주문 상품
          </h4>
          <span className="text-sm text-[#64748B]">총 {items.length}개</span>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl bg-[#F8FAFC] p-4"
            >
              {/* Item Image */}
              <div
                className="flex h-[70px] w-[70px] flex-shrink-0 items-center justify-center rounded-[10px]"
                style={{
                  background: item.imageGradient || 'linear-gradient(135deg, #FF6B35, #FFD93D)',
                }}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded-[10px] object-cover"
                  />
                ) : (
                  <Package className="h-7 w-7 text-white/50" />
                )}
              </div>

              {/* Item Details */}
              <div className="flex flex-1 flex-col justify-center">
                <p className="mb-1 text-sm font-semibold text-[#1E293B]">{item.name}</p>
                {item.option && (
                  <p className="text-xs text-[#64748B]">{item.option}</p>
                )}
              </div>

              {/* Item Price */}
              <div className="flex flex-shrink-0 flex-col items-end justify-center">
                <p className="text-[15px] font-bold text-[#1E293B]">
                  {formatPrice(item.price)}원
                </p>
                <p className="text-xs text-[#64748B]">수량: {item.quantity}개</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mt-6 border-t border-[#E2E8F0] pt-6">
        <div className="space-y-2.5">
          <div className="flex justify-between py-1">
            <span className="text-sm text-[#64748B]">상품 금액</span>
            <span className="text-sm font-semibold text-[#1E293B]">
              {formatPrice(priceSummary.subtotal)}원
            </span>
          </div>

          {priceSummary.productDiscount && priceSummary.productDiscount > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-sm text-[#64748B]">상품 할인</span>
              <span className="text-sm font-semibold text-[#FF6B6B]">
                -{formatPrice(priceSummary.productDiscount)}원
              </span>
            </div>
          )}

          {priceSummary.couponDiscount && priceSummary.couponDiscount > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-sm text-[#64748B]">쿠폰 할인</span>
              <span className="text-sm font-semibold text-[#FF6B6B]">
                -{formatPrice(priceSummary.couponDiscount)}원
              </span>
            </div>
          )}

          {priceSummary.pointsUsed && priceSummary.pointsUsed > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-sm text-[#64748B]">포인트 사용</span>
              <span className="text-sm font-semibold text-[#FF6B6B]">
                -{formatPrice(priceSummary.pointsUsed)}원
              </span>
            </div>
          )}

          <div className="flex justify-between py-1">
            <span className="text-sm text-[#64748B]">배송비</span>
            <span className="text-sm font-semibold text-[#1E293B]">
              {priceSummary.shippingFee === 0 ? '무료' : `${formatPrice(priceSummary.shippingFee)}원`}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="mt-4 flex items-baseline justify-between border-t-2 border-[#E2E8F0] pt-5">
          <span className="text-base font-bold text-[#1E293B]">총 결제 금액</span>
          <span className="text-[28px] font-extrabold text-[#6BCB77]">
            {formatPrice(priceSummary.total)}
            <span className="text-base">원</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderInfoCard;
