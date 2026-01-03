'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface QuickActionGridProps {
  actions: QuickAction[];
}

export function QuickActionGrid({ actions }: QuickActionGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="flex flex-col items-center gap-2 rounded-xl bg-gray-50 px-2 py-3 text-center transition-all hover:-translate-y-1 hover:bg-pixar-blue hover:text-white md:gap-3 md:px-4 md:py-5"
        >
          <action.icon className="h-5 w-5 text-pixar-blue transition-colors group-hover:text-white md:h-6 md:w-6 [.hover\:bg-pixar-blue:hover_&]:text-white" />
          <span className="text-[10px] font-semibold text-gray-900 transition-colors md:text-xs [.hover\:bg-pixar-blue:hover_&]:text-white">
            {action.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
