'use client';

import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
}

interface NotificationSettingItem {
  key: keyof NotificationSettings;
  title: string;
  description: string;
}

interface ProfileNotificationSettingsProps {
  settings: NotificationSettings;
  onChange: (settings: NotificationSettings) => void;
}

const settingItems: NotificationSettingItem[] = [
  {
    key: 'email',
    title: '이메일 알림',
    description: '주문, 배송, 이벤트 소식을 이메일로 받아요',
  },
  {
    key: 'sms',
    title: 'SMS 알림',
    description: '주문, 배송 알림을 문자로 받아요',
  },
  {
    key: 'push',
    title: '푸시 알림',
    description: '앱 푸시 알림을 받아요',
  },
  {
    key: 'marketing',
    title: '마케팅 수신 동의',
    description: '이벤트, 할인 정보를 받아요',
  },
];

export function ProfileNotificationSettings({
  settings,
  onChange,
}: ProfileNotificationSettingsProps) {
  const handleToggle = (key: keyof NotificationSettings) => {
    onChange({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="mb-6 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
      {/* Header */}
      <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-[#1E293B]">
        <Bell className="h-5 w-5 text-[#0066FF]" />
        알림 설정
      </h3>

      <div className="space-y-4">
        {settingItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between py-2"
          >
            <div>
              <p className="font-semibold text-[#1E293B]">{item.title}</p>
              <p className="text-sm text-[#94A3B8]">{item.description}</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => handleToggle(item.key)}
              className={cn(
                'relative h-6 w-11 shrink-0 cursor-pointer rounded-[13px] p-0 transition-all md:h-[26px] md:w-12',
                settings[item.key]
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#3B82F6]'
                  : 'bg-[#E2E8F0]'
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all md:h-[22px] md:w-[22px]',
                  settings[item.key]
                    ? 'left-[20px] md:left-[24px]'
                    : 'left-0.5'
                )}
              />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileNotificationSettings;
