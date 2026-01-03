'use client';

import { Receipt, CreditCard, MapPin } from 'lucide-react';

interface PaymentSummaryData {
  subtotal: number;
  productDiscount?: number;
  couponDiscount?: number;
  pointsUsed?: number;
  shippingFee: number;
  total: number;
}

interface PaymentMethodData {
  type: string;
  cardNumber?: string;
  paidAt: string;
}

interface DeliveryAddressData {
  name: string;
  phone: string;
  zipCode: string;
  address: string;
  addressDetail?: string;
  request?: string;
}

interface OrderPaymentSummaryProps {
  payment: PaymentSummaryData;
  paymentMethod: PaymentMethodData;
  deliveryAddress: DeliveryAddressData;
}

export function OrderPaymentSummary({
  payment,
  paymentMethod,
  deliveryAddress,
}: OrderPaymentSummaryProps) {
  const formatPrice = (value: number) => {
    return value.toLocaleString('ko-KR');
  };

  return (
    <div className="space-y-6">
      {/* Payment Amount */}
      <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#1E293B] md:text-base">
          <Receipt className="h-[18px] w-[18px] text-[#0066FF]" />
          결제 금액
        </h3>

        <div className="space-y-0">
          <div className="flex justify-between border-b border-[#E2E8F0] py-2.5">
            <span className="text-[13px] text-[#64748B] md:text-sm">상품 금액</span>
            <span className="text-[13px] font-semibold text-[#1E293B] md:text-sm">
              {formatPrice(payment.subtotal)}원
            </span>
          </div>

          {payment.productDiscount && payment.productDiscount > 0 && (
            <div className="flex justify-between border-b border-[#E2E8F0] py-2.5">
              <span className="text-[13px] text-[#64748B] md:text-sm">상품 할인</span>
              <span className="text-[13px] font-semibold text-[#FF6B6B] md:text-sm">
                -{formatPrice(payment.productDiscount)}원
              </span>
            </div>
          )}

          {payment.couponDiscount && payment.couponDiscount > 0 && (
            <div className="flex justify-between border-b border-[#E2E8F0] py-2.5">
              <span className="text-[13px] text-[#64748B] md:text-sm">쿠폰 할인</span>
              <span className="text-[13px] font-semibold text-[#FF6B6B] md:text-sm">
                -{formatPrice(payment.couponDiscount)}원
              </span>
            </div>
          )}

          {payment.pointsUsed && payment.pointsUsed > 0 && (
            <div className="flex justify-between border-b border-[#E2E8F0] py-2.5">
              <span className="text-[13px] text-[#64748B] md:text-sm">포인트 사용</span>
              <span className="text-[13px] font-semibold text-[#FF6B6B] md:text-sm">
                -{formatPrice(payment.pointsUsed)}원
              </span>
            </div>
          )}

          <div className="flex justify-between py-2.5">
            <span className="text-[13px] text-[#64748B] md:text-sm">배송비</span>
            <span className="text-[13px] font-semibold text-[#1E293B] md:text-sm">
              {payment.shippingFee === 0 ? '무료' : `${formatPrice(payment.shippingFee)}원`}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="mt-2 flex items-baseline justify-between border-t-2 border-[#E2E8F0] pt-4">
          <span className="text-sm font-bold text-[#1E293B] md:text-[15px]">총 결제 금액</span>
          <span className="text-xl font-extrabold text-[#0066FF] md:text-2xl">
            {formatPrice(payment.total)}원
          </span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#1E293B] md:text-base">
          <CreditCard className="h-[18px] w-[18px] text-[#0066FF]" />
          결제 수단
        </h3>

        <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-3 md:gap-4 md:p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white md:h-11 md:w-11">
            <CreditCard className="h-5 w-5 text-[#1E293B] md:h-[22px] md:w-[22px]" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#1E293B] md:text-[15px]">
              {paymentMethod.type}
              {paymentMethod.cardNumber && ` (${paymentMethod.cardNumber})`}
            </p>
            <p className="text-xs text-[#64748B] md:text-[13px]">{paymentMethod.paidAt} 결제</p>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#1E293B] md:text-base">
          <MapPin className="h-[18px] w-[18px] text-[#0066FF]" />
          배송지
        </h3>

        <div className="rounded-xl bg-[#F8FAFC] p-3 leading-[1.8] text-[13px] md:p-4 md:text-sm">
          <strong className="mb-1 block text-sm font-semibold text-[#1E293B] md:text-[15px]">
            {deliveryAddress.name} / {deliveryAddress.phone}
          </strong>
          <span className="text-[#64748B]">
            [{deliveryAddress.zipCode}] {deliveryAddress.address}
            {deliveryAddress.addressDetail && (
              <>
                <br />
                {deliveryAddress.addressDetail}
              </>
            )}
          </span>
          {deliveryAddress.request && (
            <>
              <br />
              <br />
              <span className="text-[#0066FF]">요청사항: {deliveryAddress.request}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderPaymentSummary;
