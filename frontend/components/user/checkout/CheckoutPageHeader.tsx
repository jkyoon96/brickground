'use client';

import { CreditCard } from 'lucide-react';

interface CheckoutPageHeaderProps {
  title?: string;
}

export function CheckoutPageHeader({ title = '결제하기' }: CheckoutPageHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-[#FF6B35] to-[#FF8F5A] px-4 py-6 md:px-10 md:py-8">
      <div className="mx-auto flex max-w-[1320px] items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 md:h-14 md:w-14">
          <CreditCard className="h-6 w-6 text-white md:h-7 md:w-7" />
        </div>
        <h1 className="text-xl font-bold text-white md:text-2xl">{title}</h1>
      </div>
    </header>
  );
}

export default CheckoutPageHeader;
