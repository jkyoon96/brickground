'use client';

interface ProductPriceProps {
  currentPrice: number;
  originalPrice?: number;
  discountPercent?: number;
  savings?: number;
  points?: number;
}

export function ProductPrice({
  currentPrice,
  originalPrice,
  discountPercent,
  savings,
  points,
}: ProductPriceProps) {
  const formatPrice = (price: number) => `₩${price.toLocaleString()}`;

  const calculatedDiscount =
    discountPercent ?? (originalPrice ? Math.round((1 - currentPrice / originalPrice) * 100) : 0);
  const calculatedSavings = savings ?? (originalPrice ? originalPrice - currentPrice : 0);

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-6">
      {/* Price Row */}
      <div className="mb-2 flex flex-wrap items-baseline gap-3">
        <span className="text-[32px] font-extrabold text-[#1E293B] md:text-[40px]">
          {formatPrice(currentPrice)}
        </span>
        {originalPrice && (
          <span className="text-base text-[#64748B] line-through md:text-xl">
            {formatPrice(originalPrice)}
          </span>
        )}
        {calculatedDiscount > 0 && (
          <span className="text-base font-bold text-[#FF6B6B] md:text-xl">
            {calculatedDiscount}% 할인
          </span>
        )}
      </div>

      {/* Info Row */}
      {(calculatedSavings > 0 || points) && (
        <p className="text-sm text-[#64748B]">
          {calculatedSavings > 0 && (
            <span className="font-bold text-[#6BCB77]">
              {formatPrice(calculatedSavings)} 절약!
            </span>
          )}
          {calculatedSavings > 0 && points && <span> - </span>}
          {points && <span>적립 {points.toLocaleString()}P</span>}
        </p>
      )}
    </div>
  );
}

export default ProductPrice;
