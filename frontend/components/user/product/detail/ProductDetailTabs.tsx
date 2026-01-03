'use client';

import { useState } from 'react';
import { FileText, Star, HelpCircle, Info, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Tab {
  id: string;
  label: string;
  icon: 'detail' | 'review' | 'qna' | 'shipping';
  count?: number;
}

interface ProductDetailTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  children?: React.ReactNode;
}

const iconMap = {
  detail: FileText,
  review: Star,
  qna: HelpCircle,
  shipping: Info,
};

export function ProductDetailTabs({
  tabs,
  defaultTab,
  onTabChange,
  children,
}: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="mt-6 md:mt-10">
      {/* Tab Buttons */}
      <div className="mb-6 rounded-[20px] bg-white p-2 shadow-soft">
        <div className="flex flex-wrap gap-1 md:gap-2">
          {tabs.map((tab) => {
            const Icon = iconMap[tab.icon];
            return (
              <Button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors md:px-6 md:py-3.5 md:text-[15px]',
                  'min-w-[calc(50%-0.25rem)] md:min-w-0 h-auto',
                  activeTab === tab.id
                    ? ''
                    : 'text-gray-500'
                )}
              >
                <Icon className="hidden h-[18px] w-[18px] md:block" />
                {tab.label}
                {tab.count !== undefined && (
                  <span className="hidden md:inline">({tab.count.toLocaleString()})</span>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="rounded-[20px] bg-white p-5 shadow-soft md:p-8">
        {children || (
          <div className="py-16 text-center text-gray-500">
            <ImageIcon className="mx-auto mb-4 h-16 w-16 opacity-50" />
            <p className="text-base">상품 상세 이미지 및 설명이 표시됩니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
