'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

interface ContinueShoppingProps {
  href?: string;
}

export function ContinueShopping({ href = '/product' }: ContinueShoppingProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-[#E2E8F0] bg-white px-4 py-4 text-sm font-semibold text-[#64748B] transition-colors hover:border-[#FF6B35] hover:text-[#FF6B35] md:text-[15px]"
    >
      <Plus className="h-5 w-5" />
      쇼핑 계속하기
    </Link>
  );
}

export default ContinueShopping;
