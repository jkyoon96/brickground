'use client';

import Link from 'next/link';
import { OrderProductItem, OrderProductStatus } from './OrderProductItem';

interface OrderProduct {
  id: string;
  imageUrl?: string;
  status: OrderProductStatus;
  statusDate?: string;
  title: string;
  option: string;
  price: number;
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'outline';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

interface OrderCardProps {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  products: OrderProduct[];
  totalPrice?: number;
  detailHref?: string;
}

export function OrderCard({
  orderId,
  orderNumber,
  orderDate,
  products,
  totalPrice,
  detailHref,
}: OrderCardProps) {
  const showTotal = totalPrice !== undefined && products.length > 1;

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white transition-all hover:border-[#0066FF] hover:shadow-[0_8px_30px_rgba(0,102,255,0.1)]">
      {/* Order Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 md:px-6 md:py-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <span className="font-bold text-[#1E293B]">{orderDate}</span>
          <span className="text-xs text-[#94A3B8] md:text-sm">
            주문번호: {orderNumber}
          </span>
        </div>
        <Link
          href={detailHref || `/orders/${orderId}`}
          className="text-sm font-semibold text-[#0066FF] hover:underline"
        >
          주문상세 →
        </Link>
      </div>

      {/* Order Body */}
      <div className="px-4 py-2 md:px-6 md:py-4">
        {products.map((product) => (
          <OrderProductItem key={product.id} {...product} />
        ))}

        {/* Total Price */}
        {showTotal && (
          <div className="flex justify-end border-t border-dashed border-[#E2E8F0] pt-4">
            <span className="text-[#64748B]">총 결제금액: </span>
            <span className="ml-2 font-bold text-[#0066FF]">
              {totalPrice.toLocaleString()}원
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
