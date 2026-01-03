'use client';

import { Truck, Check, Package, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

type DeliveryStepStatus = 'completed' | 'active' | 'pending';

interface DeliveryStep {
  id: string;
  label: string;
  date: string;
  status: DeliveryStepStatus;
  icon: 'check' | 'package' | 'truck' | 'home';
}

interface DeliveryTimelineProps {
  steps: DeliveryStep[];
}

const iconMap = {
  check: Check,
  package: Package,
  truck: Truck,
  home: Home,
};

export function DeliveryTimeline({ steps }: DeliveryTimelineProps) {
  const activeIndex = steps.findIndex((step) => step.status === 'active');
  const progressWidth = activeIndex >= 0 ? `${(activeIndex / (steps.length - 1)) * 100}%` : '0%';

  return (
    <div className="mb-6 rounded-[20px] bg-white p-6 shadow-[0_4px_20px_rgba(107,203,119,0.15)] md:p-7">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2.5">
        <Truck className="h-[22px] w-[22px] text-[#0066FF]" />
        <h3 className="text-lg font-bold text-[#1E293B]">배송 현황</h3>
      </div>

      {/* Timeline */}
      <div className="relative flex justify-between">
        {/* Background Line */}
        <div className="absolute left-10 right-10 top-5 h-1 rounded-sm bg-[#E2E8F0]" />

        {/* Progress Line */}
        <div
          className="absolute left-10 top-5 h-1 rounded-sm bg-[#6BCB77] transition-all duration-500"
          style={{ width: `calc(${progressWidth} - 40px)` }}
        />

        {/* Steps */}
        {steps.map((step) => {
          const Icon = iconMap[step.icon];
          const isActiveOrCompleted = step.status === 'active' || step.status === 'completed';

          return (
            <div key={step.id} className="z-10 flex flex-col items-center gap-3">
              {/* Icon */}
              <div
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-full transition-colors',
                  isActiveOrCompleted ? 'bg-[#6BCB77]' : 'bg-[#E2E8F0]'
                )}
              >
                <Icon
                  className={cn(
                    'h-[22px] w-[22px]',
                    isActiveOrCompleted ? 'text-white' : 'text-[#64748B]'
                  )}
                />
              </div>

              {/* Label */}
              <span className="text-center text-sm font-semibold text-[#1E293B]">
                {step.label}
              </span>

              {/* Date */}
              <span className="text-center text-xs text-[#64748B]">{step.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeliveryTimeline;
