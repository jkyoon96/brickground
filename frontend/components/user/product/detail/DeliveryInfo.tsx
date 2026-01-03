'use client';

import { Truck, Package, Calendar, RefreshCw } from 'lucide-react';

interface DeliveryItem {
  icon: 'package' | 'calendar' | 'refresh';
  text: string;
  highlight?: string;
}

interface DeliveryInfoProps {
  items: DeliveryItem[];
}

const iconMap = {
  package: Package,
  calendar: Calendar,
  refresh: RefreshCw,
};

export function DeliveryInfo({ items }: DeliveryInfoProps) {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-soft md:p-6">
      {/* Title */}
      <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
        <Truck className="h-5 w-5 text-pixar-blue" />
        배송 정보
      </h3>

      {/* Items */}
      <div className="divide-y divide-gray-100">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={index} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <Icon className="h-[18px] w-[18px] flex-shrink-0 text-gray-400" />
              <span className="text-sm text-gray-500">
                {item.highlight ? (
                  <>
                    {item.text.split(item.highlight)[0]}
                    <strong className="text-gray-900">{item.highlight}</strong>
                    {item.text.split(item.highlight)[1]}
                  </>
                ) : (
                  item.text
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
