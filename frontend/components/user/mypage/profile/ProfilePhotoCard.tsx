'use client';

import { User, Camera } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProfilePhotoCardProps {
  avatarUrl?: string;
  onAvatarChange?: () => void;
}

export function ProfilePhotoCard({ avatarUrl, onAvatarChange }: ProfilePhotoCardProps) {
  return (
    <div className="mb-6 rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(0,102,255,0.1)] md:p-6">
      <div className="py-4 text-center">
        {/* Avatar */}
        <div className="relative mx-auto h-20 w-20 md:h-[120px] md:w-[120px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#0066FF] to-[#3B82F6] text-white">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 md:h-14 md:w-14" />
            )}
          </div>

          {/* Edit Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onAvatarChange}
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full border-2 border-[#E2E8F0] bg-white hover:border-[#0066FF] hover:text-[#0066FF] md:h-9 md:w-9"
          >
            <Camera className="h-4 w-4 text-[#64748B]" />
          </Button>
        </div>

        <p className="mt-4 text-sm text-[#94A3B8]">
          프로필 사진을 클릭하여 변경하세요
        </p>
      </div>
    </div>
  );
}

export default ProfilePhotoCard;
