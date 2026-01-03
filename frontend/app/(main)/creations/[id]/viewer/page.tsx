'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {
  CreationViewerHeader,
  CreationViewer3DScene,
  CreationViewerPanel,
} from '@/components/user';

// Mock data - replace with API call
const mockCreationData = {
  id: '1',
  title: '미래 도시 스카이라인',
  author: {
    name: '빌더마스터',
    followers: 2345,
    worksCount: 48,
    isFollowing: false,
  },
  date: '2025.01.15',
  views: 12487,
  isLiked: true,
  isBookmarked: false,
};

export default function CreationViewerPage() {
  const params = useParams();
  const creationId = params.id as string;

  // State
  const [isLiked, setIsLiked] = useState(mockCreationData.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(mockCreationData.isBookmarked);
  const [isFollowing, setIsFollowing] = useState(mockCreationData.author.isFollowing);
  const [autoRotate, setAutoRotate] = useState(true);

  // Handlers
  const handleLikeToggle = useCallback(() => {
    setIsLiked((prev) => !prev);
    // TODO: API call to toggle like
  }, []);

  const handleBookmarkToggle = useCallback(() => {
    setIsBookmarked((prev) => !prev);
    // TODO: API call to toggle bookmark
  }, []);

  const handleShare = useCallback(() => {
    // TODO: Open share dialog
    if (navigator.share) {
      navigator.share({
        title: mockCreationData.title,
        text: `${mockCreationData.author.name}님의 창작물을 확인해보세요!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다.');
    }
  }, []);

  const handleRemix = useCallback(() => {
    // TODO: Navigate to editor with remix data
    window.location.href = `/creations/new/editor?remix=${creationId}`;
  }, [creationId]);

  const handleDownload = useCallback(() => {
    // TODO: Open download modal or start download
    console.log('Download creation:', creationId);
  }, [creationId]);

  const handleExport = useCallback((format: string) => {
    console.log('Exporting as:', format);
    // TODO: Implement actual export functionality
  }, []);

  const handleFollowToggle = useCallback(() => {
    setIsFollowing((prev) => !prev);
    // TODO: API call to toggle follow
  }, []);

  const handleScreenshot = useCallback(() => {
    console.log('Taking screenshot');
    // TODO: Implement screenshot functionality
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#1a1a2e]">
      {/* Header */}
      <CreationViewerHeader
        title={mockCreationData.title}
        author={mockCreationData.author.name}
        date={mockCreationData.date}
        views={mockCreationData.views}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        onLikeToggle={handleLikeToggle}
        onBookmarkToggle={handleBookmarkToggle}
        onShare={handleShare}
        onRemix={handleRemix}
        onDownload={handleDownload}
      />

      {/* Main Layout */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* 3D Viewer */}
        <CreationViewer3DScene
          autoRotate={autoRotate}
          onAutoRotateChange={setAutoRotate}
          onScreenshot={handleScreenshot}
        />

        {/* Right Panel */}
        <CreationViewerPanel
          author={{
            ...mockCreationData.author,
            isFollowing,
          }}
          onExport={handleExport}
          onFollowToggle={handleFollowToggle}
        />
      </div>
    </div>
  );
}
