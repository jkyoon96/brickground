'use client';

import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DeliveryAddress {
  id: string;
  name: string;
  phone: string;
  address: string;
  addressDetail?: string;
  isDefault?: boolean;
}

interface DeliveryAddressCardProps {
  address: DeliveryAddress;
  deliveryRequest?: string;
  deliveryRequestOptions?: string[];
  onChangeAddress?: () => void;
  onDeliveryRequestChange?: (request: string) => void;
}

const defaultDeliveryOptions = [
  '부재시 문 앞에 놓아주세요',
  '경비실에 맡겨주세요',
  '배송 전 연락 부탁드립니다',
  '직접 입력',
];

export function DeliveryAddressCard({
  address,
  deliveryRequest = '',
  deliveryRequestOptions = defaultDeliveryOptions,
  onChangeAddress,
  onDeliveryRequestChange,
}: DeliveryAddressCardProps) {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(255,107,53,0.15)] md:p-6">
      {/* Section Title */}
      <div className="mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-[#FF6B35]" />
        <h2 className="text-base font-bold text-[#1E293B] md:text-lg">배송지 정보</h2>
      </div>

      {/* Address Card */}
      <div className="mb-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#1E293B]">{address.name}</span>
            {address.isDefault && (
              <span className="rounded-full bg-[#FF6B35] px-2 py-0.5 text-xs font-medium text-white">
                기본
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={onChangeAddress}
            className="text-sm font-medium text-[#FF6B35] hover:underline"
          >
            변경
          </Button>
        </div>
        <p className="mb-1 text-sm text-[#64748B]">{address.phone}</p>
        <p className="text-sm text-[#64748B]">
          {address.address}
          {address.addressDetail && ` ${address.addressDetail}`}
        </p>
      </div>

      {/* Delivery Request */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#1E293B]">배송 요청사항</label>
        <div className="relative">
          <select
            value={deliveryRequest}
            onChange={(e) => onDeliveryRequestChange?.(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 pr-10 text-sm text-[#1E293B] outline-none transition-colors focus:border-[#FF6B35]"
          >
            <option value="">배송 요청사항을 선택해주세요</option>
            {deliveryRequestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]" />
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddressCard;
