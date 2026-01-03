'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {
  Layout,
  CreationDetailHero,
  CreationDetailComments,
  CreationDetailAuthor,
  CreationDetailRemixes,
  CreationDetailRelated,
} from '@/components/user';
import type { CreationComment } from '@/components/user';

// Mock data - replace with API call
const mockCreation = {
  id: '1',
  title: '미래 도시 스카이라인',
  category: '건축',
  description:
    '네온 불빛이 가득한 사이버펑크 스타일의 미래 도시를 블록으로 재현했습니다. 높이 솟은 마천루들과 홀로그램 광고판, 하늘을 나는 차량들이 어우러진 2077년의 도시 풍경입니다. 총 2,847개의 블록으로 구성되어 있으며, 밤 모드에서 더욱 멋진 네온 효과를 확인하실 수 있습니다.',
  tags: ['사이버펑크', '미래도시', '네온', '마천루', 'SF'],
  stats: {
    likes: 3245,
    comments: 187,
    downloads: 892,
    views: 12487,
    remixes: 23,
  },
  imageUrl: '/images/creation/creation-1.jpg',
  badge: 'HOT',
  isLiked: true,
  isBookmarked: false,
};

const mockAuthor = {
  id: 'builder-master',
  name: '빌더마스터',
  bio: '3D 건축 전문 크리에이터',
  stats: {
    worksCount: 48,
    followers: 2300,
    totalLikes: 89000,
  },
  isFollowing: false,
};

const mockComments: CreationComment[] = [
  {
    id: '1',
    authorName: '픽셀마스터',
    authorId: 'pixel-master',
    isAuthor: false,
    content: '와 정말 대단해요! 네온 효과가 너무 멋지네요. 어떻게 이런 디테일을 표현하셨나요?',
    timeAgo: '2시간 전',
    likes: 12,
  },
  {
    id: '2',
    authorName: '빌더마스터',
    authorId: 'builder-master',
    isAuthor: true,
    content:
      '@픽셀마스터 감사합니다! 네온 효과는 반투명 블록을 여러 겹으로 쌓아서 표현했어요. 튜토리얼도 곧 올릴 예정이니 기대해주세요!',
    timeAgo: '1시간 전',
    likes: 8,
  },
  {
    id: '3',
    authorName: '건축러버',
    authorId: 'arch-lover',
    isAuthor: false,
    content: '리믹스해서 제 버전도 만들어봐도 될까요? 정말 영감을 많이 받았습니다!',
    timeAgo: '3시간 전',
    likes: 5,
  },
  {
    id: '4',
    authorName: '크리에이터J',
    authorId: 'creator-j',
    isAuthor: false,
    content: '이 작품을 VR에서 보면 정말 압도적일 것 같아요. BrickArt에도 전시해주세요!',
    timeAgo: '5시간 전',
    likes: 15,
  },
];

const mockRemixes = [
  { id: 'r1', authorName: '네온킹', imageUrl: '/images/creation/creation-2.jpg' },
  { id: 'r2', authorName: '시티빌더', imageUrl: '/images/creation/creation-3.jpg' },
  { id: 'r3', authorName: 'SF러버', imageUrl: '/images/creation/creation-4.jpg' },
  { id: 'r4', authorName: '퓨처맨', imageUrl: '/images/creation/creation-5.jpg' },
];

const mockRelated = [
  {
    id: 'rel1',
    title: '우주 정거장',
    authorName: '스페이스맨',
    likes: 1892,
    downloads: 389,
    imageUrl: '/images/creation/creation-6.jpg',
  },
  {
    id: 'rel2',
    title: '네온 캐슬',
    authorName: '판타지빌더',
    likes: 2134,
    downloads: 567,
    imageUrl: '/images/creation/creation-7.jpg',
  },
  {
    id: 'rel3',
    title: '사이버 레이서',
    authorName: '레이서킹',
    likes: 1567,
    downloads: 423,
    imageUrl: '/images/creation/creation-8.jpg',
  },
];

export default function CreationDetailPage() {
  const params = useParams();
  const creationId = params.id as string;

  // State
  const [isLiked, setIsLiked] = useState(mockCreation.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(mockCreation.isBookmarked);
  const [isFollowing, setIsFollowing] = useState(mockAuthor.isFollowing);
  const [comments, setComments] = useState(mockComments);

  // Handlers
  const handleLikeToggle = useCallback(() => {
    setIsLiked((prev) => !prev);
    // TODO: API call
  }, []);

  const handleBookmarkToggle = useCallback(() => {
    setIsBookmarked((prev) => !prev);
    // TODO: API call
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: mockCreation.title,
        text: `${mockAuthor.name}님의 창작물을 확인해보세요!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다.');
    }
  }, []);

  const handleDownload = useCallback(() => {
    console.log('Download creation:', creationId);
    // TODO: Implement download
  }, [creationId]);

  const handleFollowToggle = useCallback(() => {
    setIsFollowing((prev) => !prev);
    // TODO: API call
  }, []);

  const handleSubmitComment = useCallback((content: string) => {
    const newComment: CreationComment = {
      id: Date.now().toString(),
      authorName: '나',
      authorId: 'me',
      isAuthor: false,
      content,
      timeAgo: '방금 전',
      likes: 0,
    };
    setComments((prev) => [newComment, ...prev]);
    // TODO: API call
  }, []);

  const handleLikeComment = useCallback((commentId: string) => {
    console.log('Like comment:', commentId);
    // TODO: API call
  }, []);

  const handleReplyComment = useCallback((commentId: string) => {
    console.log('Reply to comment:', commentId);
    // TODO: Open reply input
  }, []);

  const handleRemix = useCallback(() => {
    window.location.href = `/creations/new/editor?remix=${creationId}`;
  }, [creationId]);

  return (
    <Layout>
      <div className="mx-auto max-w-[1320px] px-4 py-6 md:px-10 md:py-10">
        <div className="grid gap-6 md:gap-10 lg:grid-cols-2">
          {/* Main Content */}
          <div>
            <CreationDetailHero
              id={creationId}
              title={mockCreation.title}
              category={mockCreation.category}
              description={mockCreation.description}
              tags={mockCreation.tags}
              stats={mockCreation.stats}
              badge={mockCreation.badge}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
              onLikeToggle={handleLikeToggle}
              onBookmarkToggle={handleBookmarkToggle}
              onShare={handleShare}
              onDownload={handleDownload}
            />

            <CreationDetailComments
              comments={comments}
              totalCount={mockCreation.stats.comments}
              onSubmitComment={handleSubmitComment}
              onLikeComment={handleLikeComment}
              onReplyComment={handleReplyComment}
            />
          </div>

          {/* Sidebar */}
          <div>
            <CreationDetailAuthor
              id={mockAuthor.id}
              name={mockAuthor.name}
              bio={mockAuthor.bio}
              stats={mockAuthor.stats}
              isFollowing={isFollowing}
              onFollowToggle={handleFollowToggle}
            />

            <CreationDetailRemixes
              remixes={mockRemixes}
              totalCount={mockCreation.stats.remixes}
              originalCreationId={creationId}
              onRemix={handleRemix}
            />

            <CreationDetailRelated items={mockRelated} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
