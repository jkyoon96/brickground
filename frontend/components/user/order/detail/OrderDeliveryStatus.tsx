'use client';

import { MapPin, Bell, Check, Package, Truck, Home, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type DeliveryStepStatus = 'completed' | 'current' | 'pending';

interface DeliveryStep {
  id: string;
  label: string;
  date: string;
  status: DeliveryStepStatus;
  icon: 'check' | 'package' | 'truck' | 'home';
}

interface DeliveryLog {
  time: string;
  status: string;
  location: string;
}

interface OrderDeliveryStatusProps {
  steps: DeliveryStep[];
  courier?: string;
  trackingNumber?: string;
  logs?: DeliveryLog[];
  onNotificationSettings?: () => void;
  onCopyTrackingNumber?: (trackingNumber: string) => void;
}

const iconMap = {
  check: Check,
  package: Package,
  truck: Truck,
  home: Home,
};

export function OrderDeliveryStatus({
  steps,
  courier,
  trackingNumber,
  logs = [],
  onNotificationSettings,
  onCopyTrackingNumber,
}: OrderDeliveryStatusProps) {
  const currentIndex = steps.findIndex((step) => step.status === 'current');
  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const progressPercent =
    currentIndex >= 0
      ? ((completedCount + 0.5) / (steps.length - 1)) * 100
      : (completedCount / (steps.length - 1)) * 100;

  const handleCopyTracking = () => {
    if (trackingNumber) {
      navigator.clipboard.writeText(trackingNumber);
      onCopyTrackingNumber?.(trackingNumber);
    }
  };

  return (
    <div className="mb-6 rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-7">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2.5 text-base font-bold text-[#1E293B] md:text-lg">
          <MapPin className="h-5 w-5 text-[#0066FF] md:h-[22px] md:w-[22px]" />
          배송 현황
        </h2>
        <Button
          variant="outline"
          onClick={onNotificationSettings}
          className="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-transparent px-3 py-2 text-xs font-semibold text-[#1E293B] transition-colors hover:border-[#0066FF] hover:text-[#0066FF] md:px-4 md:text-[13px]"
        >
          <Bell className="h-3.5 w-3.5 md:h-[14px] md:w-[14px]" />
          알림 설정
        </Button>
      </div>

      {/* Timeline - Desktop */}
      <div className="relative hidden justify-between px-5 md:flex">
        {/* Background Line */}
        <div className="absolute left-[60px] right-[60px] top-[22px] h-1 rounded-sm bg-[#E2E8F0]" />
        {/* Progress Line */}
        <div
          className="absolute left-[60px] top-[22px] h-1 rounded-sm bg-[#0066FF] transition-all duration-500"
          style={{ width: `calc(${progressPercent}% - 40px)` }}
        />

        {steps.map((step) => {
          const Icon = iconMap[step.icon];
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';

          return (
            <div key={step.id} className="z-10 flex flex-col items-center gap-3">
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full transition-all',
                  isCompleted && 'bg-[#0066FF]',
                  isCurrent && 'animate-pulse border-[3px] border-[#0066FF] bg-white',
                  !isCompleted && !isCurrent && 'bg-[#E2E8F0]'
                )}
              >
                <Icon
                  className={cn(
                    'h-[22px] w-[22px]',
                    isCompleted && 'text-white',
                    isCurrent && 'text-[#0066FF]',
                    !isCompleted && !isCurrent && 'text-[#64748B]'
                  )}
                />
              </div>
              <span className="text-center text-sm font-semibold text-[#1E293B]">
                {step.label}
              </span>
              <span className="text-center text-xs text-[#64748B]">{step.date}</span>
            </div>
          );
        })}
      </div>

      {/* Timeline - Mobile (Vertical) */}
      <div className="flex flex-col gap-5 md:hidden">
        {steps.map((step) => {
          const Icon = iconMap[step.icon];
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';

          return (
            <div key={step.id} className="flex items-center gap-4">
              <div
                className={cn(
                  'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all',
                  isCompleted && 'bg-[#0066FF]',
                  isCurrent && 'animate-pulse border-[3px] border-[#0066FF] bg-white',
                  !isCompleted && !isCurrent && 'bg-[#E2E8F0]'
                )}
              >
                <Icon
                  className={cn(
                    'h-4 w-4',
                    isCompleted && 'text-white',
                    isCurrent && 'text-[#0066FF]',
                    !isCompleted && !isCurrent && 'text-[#64748B]'
                  )}
                />
              </div>
              <div className="flex-1">
                <span className="text-[13px] font-semibold text-[#1E293B]">{step.label}</span>
                <span className="ml-2 text-[11px] text-[#64748B]">{step.date}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Detail */}
      {(courier || trackingNumber || logs.length > 0) && (
        <div className="mt-6 rounded-xl bg-[#F8FAFC] p-4 md:p-5">
          {/* Courier & Tracking */}
          {(courier || trackingNumber) && (
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
              {courier && (
                <span className="text-[15px] font-bold text-[#1E293B]">{courier}</span>
              )}
              {trackingNumber && (
                <Button
                  variant="ghost"
                  onClick={handleCopyTracking}
                  className="flex items-center gap-1 text-sm text-[#0066FF] hover:underline"
                >
                  {trackingNumber}
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          )}

          {/* Delivery Logs */}
          {logs.length > 0 && (
            <div className="mt-4 space-y-0">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 border-b border-[#E2E8F0] py-3 last:border-b-0 md:flex-row md:gap-4"
                >
                  <span className="w-[100px] flex-shrink-0 text-[11px] text-[#64748B] md:text-xs">
                    {log.time}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1E293B] md:text-sm">
                      {log.status}
                    </p>
                    <p className="mt-0.5 text-xs text-[#64748B] md:text-[13px]">{log.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderDeliveryStatus;
