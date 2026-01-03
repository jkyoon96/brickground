'use client';

import { useState, useCallback } from 'react';
import { Save } from 'lucide-react';
import {
  Layout,
  MypageSidebar,
  ProfilePageHeader,
  ProfilePhotoCard,
  ProfileBasicInfoForm,
  ProfilePasswordForm,
  ProfileSocialLinks,
  ProfileNotificationSettings,
  ProfileDangerZone,
} from '@/components/user';
import type {
  ProfileBasicInfo,
  PasswordFormData,
  SocialLinkStatus,
  SocialProvider,
  NotificationSettings,
} from '@/components/user';

// Mock data
const mockBasicInfo: ProfileBasicInfo = {
  email: 'brick@email.com',
  name: '김브릭',
  nickname: '브릭마스터',
  phone: '010-1234-5678',
  zipCode: '06234',
  address: '서울특별시 강남구 테헤란로 123',
  addressDetail: '브릭타워 15층',
  birthDate: '1990-05-15',
};

const mockSocialLinks: SocialLinkStatus[] = [
  { provider: 'kakao', isLinked: true },
  { provider: 'naver', isLinked: false },
  { provider: 'google', isLinked: false },
  { provider: 'apple', isLinked: false },
];

const mockNotificationSettings: NotificationSettings = {
  email: true,
  sms: true,
  push: false,
  marketing: true,
};

export default function MypageProfilePage() {
  const [basicInfo, setBasicInfo] = useState<ProfileBasicInfo>(mockBasicInfo);
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [socialLinks, setSocialLinks] = useState<SocialLinkStatus[]>(mockSocialLinks);
  const [notifications, setNotifications] = useState<NotificationSettings>(mockNotificationSettings);

  // Handlers
  const handleAvatarChange = useCallback(() => {
    console.log('Change avatar');
  }, []);

  const handlePhoneVerify = useCallback(() => {
    console.log('Verify phone');
  }, []);

  const handleAddressSearch = useCallback(() => {
    console.log('Search address');
  }, []);

  const handleSocialLink = useCallback((provider: SocialProvider) => {
    console.log('Link social:', provider);
    setSocialLinks((prev) =>
      prev.map((link) =>
        link.provider === provider ? { ...link, isLinked: true } : link
      )
    );
  }, []);

  const handleSocialUnlink = useCallback((provider: SocialProvider) => {
    console.log('Unlink social:', provider);
    setSocialLinks((prev) =>
      prev.map((link) =>
        link.provider === provider ? { ...link, isLinked: false } : link
      )
    );
  }, []);

  const handleWithdraw = useCallback(() => {
    console.log('Withdraw account');
  }, []);

  const handleCancel = useCallback(() => {
    console.log('Cancel changes');
  }, []);

  const handleSave = useCallback(() => {
    console.log('Save profile:', { basicInfo, passwordData, notifications });
  }, [basicInfo, passwordData, notifications]);

  return (
    <Layout>
      <div className="mx-auto flex max-w-[1320px] flex-col lg:flex-row">
        {/* Sidebar */}
        <MypageSidebar
          userName="홍길동"
          userEmail="hong@email.com"
          userLevel="VIP"
        />

        {/* Content Area */}
        <main className="flex-1 bg-[#F8FAFC] p-4 md:p-6 lg:p-8">
          {/* Page Title */}
          <ProfilePageHeader />

          {/* Profile Photo */}
          <ProfilePhotoCard onAvatarChange={handleAvatarChange} />

          {/* Basic Info Form */}
          <ProfileBasicInfoForm
            data={basicInfo}
            onChange={setBasicInfo}
            onPhoneVerify={handlePhoneVerify}
            onAddressSearch={handleAddressSearch}
          />

          {/* Password Form */}
          <ProfilePasswordForm
            data={passwordData}
            onChange={setPasswordData}
          />

          {/* Social Links */}
          <ProfileSocialLinks
            links={socialLinks}
            onLink={handleSocialLink}
            onUnlink={handleSocialUnlink}
          />

          {/* Notification Settings */}
          <ProfileNotificationSettings
            settings={notifications}
            onChange={setNotifications}
          />

          {/* Danger Zone */}
          <ProfileDangerZone onWithdraw={handleWithdraw} />

          {/* Save Buttons */}
          <div className="flex flex-col justify-center gap-3 pt-4 md:flex-row md:gap-4">
            <button
              onClick={handleCancel}
              className="w-full rounded-[14px] border-2 border-[#E2E8F0] bg-[#F8FAFC] px-6 py-3 text-sm font-bold text-[#64748B] transition-all hover:border-[#64748B] md:w-auto md:px-8 md:py-3.5 md:text-[15px]"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#0066FF] to-[#3B82F6] px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,102,255,0.3)] md:w-auto md:px-8 md:py-3.5 md:text-[15px]"
            >
              <Save className="h-5 w-5" />
              변경사항 저장
            </button>
          </div>
        </main>
      </div>
    </Layout>
  );
}
