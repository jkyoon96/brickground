'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import {
  Layout,
  MypageSidebar,
  CartItemCard,
  CartSelectAll,
  OrderSummary,
  ContinueShopping,
  EmptyCart,
} from '@/components/user';

interface CartItemOption {
  label: string;
  value: string;
}

interface CartItemTag {
  label: string;
  type: 'freeShipping' | 'todayDelivery' | 'default';
}

interface CartItem {
  id: string;
  name: string;
  brand: string;
  imageUrl?: string;
  options: CartItemOption[];
  tags: CartItemTag[];
  quantity: number;
  currentPrice: number;
  originalPrice?: number;
  isSelected: boolean;
}

// Mock data
const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: '브릭 테크닉 람보르기니 시안 FKP 37',
    brand: '브릭 / 테크닉',
    imageUrl: '/images/products/lego-lambo.jpg',
    options: [
      { label: '수량', value: '1개' },
      { label: '선물포장', value: 'O' },
    ],
    tags: [
      { label: '무료배송', type: 'freeShipping' },
      { label: '오늘출발', type: 'todayDelivery' },
    ],
    quantity: 1,
    currentPrice: 489000,
    originalPrice: 549000,
    isSelected: true,
  },
  {
    id: '2',
    name: '건담 RG 1/144 사자비 스페셜 에디션',
    brand: '피규어 / 건담',
    imageUrl: '/images/products/gundam-sazabi.jpg',
    options: [{ label: '수량', value: '1개' }],
    tags: [{ label: '무료배송', type: 'freeShipping' }],
    quantity: 1,
    currentPrice: 68000,
    isSelected: true,
  },
  {
    id: '3',
    name: '카탄: 확장판 시나리오 컬렉션',
    brand: '보드게임',
    imageUrl: '/images/products/catan-expansion.jpg',
    options: [{ label: '수량', value: '2개' }],
    tags: [{ label: '무료배송', type: 'freeShipping' }],
    quantity: 2,
    currentPrice: 35000,
    originalPrice: 50000,
    isSelected: true,
  },
];

export default function MypageCartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Computed values
  const selectedItems = useMemo(
    () => cartItems.filter((item) => item.isSelected),
    [cartItems]
  );

  const isAllSelected = useMemo(
    () => cartItems.length > 0 && cartItems.every((item) => item.isSelected),
    [cartItems]
  );

  const subtotal = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => sum + (item.originalPrice || item.currentPrice) * item.quantity,
      0
    );
  }, [selectedItems]);

  const discount = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      if (item.originalPrice) {
        return sum + (item.originalPrice - item.currentPrice) * item.quantity;
      }
      return sum;
    }, 0);
  }, [selectedItems]);

  const total = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => sum + item.currentPrice * item.quantity,
      0
    );
  }, [selectedItems]);

  const shippingFee = total >= 50000 ? 0 : 3000;

  // Handlers
  const handleSelectAll = useCallback(() => {
    const newSelectedState = !isAllSelected;
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, isSelected: newSelectedState }))
    );
  }, [isAllSelected]);

  const handleSelectItem = useCallback((itemId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  }, []);

  const handleRemoveItem = useCallback((itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const handleDeleteSelected = useCallback(() => {
    setCartItems((prev) => prev.filter((item) => !item.isSelected));
  }, []);

  const handleQuantityChange = useCallback((itemId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity,
              options: item.options.map((opt) =>
                opt.label === '수량' ? { ...opt, value: `${quantity}개` } : opt
              ),
            }
          : item
      )
    );
  }, []);

  const handleCouponApply = useCallback((code: string) => {
    console.log('Apply coupon:', code);
    // TODO: API call to validate and apply coupon
  }, []);

  const handleCheckout = useCallback(() => {
    router.push('/checkout');
  }, [router]);

  return (
    <Layout>
      <div className="mx-auto flex max-w-[1320px] flex-col lg:flex-row">
        <MypageSidebar
          userName="김브릭"
          userEmail="brick@email.com"
          userLevel="GOLD"
          userPoints={12500}
        />

        <main className="flex-1 bg-[#F8FAFC] p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-[#1E293B]">
              <ShoppingCart className="h-7 w-7 text-[#0066FF]" />
              장바구니
            </h1>
            <p className="mt-1 text-sm text-[#64748B]">
              총 {cartItems.length}개의 상품
            </p>
          </div>

          {/* Empty cart */}
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
              {/* Cart Items Section */}
              <div className="space-y-4 md:space-y-6">
                <CartSelectAll
                  selectedCount={selectedItems.length}
                  totalCount={cartItems.length}
                  isAllSelected={isAllSelected}
                  onSelectAll={handleSelectAll}
                  onDeleteSelected={handleDeleteSelected}
                />

                {/* Cart Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItemCard
                      key={item.id}
                      {...item}
                      onSelect={handleSelectItem}
                      onRemove={handleRemoveItem}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>

                {/* Continue Shopping */}
                <ContinueShopping />
              </div>

              {/* Order Summary */}
              <div>
                <OrderSummary
                  subtotal={subtotal}
                  discount={discount}
                  shippingFee={shippingFee}
                  total={total + shippingFee}
                  itemCount={selectedItems.length}
                  availableCoupons={3}
                  onCouponApply={handleCouponApply}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
