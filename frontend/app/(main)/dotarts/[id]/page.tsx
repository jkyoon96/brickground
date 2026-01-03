'use client';

import { useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  Header,
  Footer,
  Breadcrumb,
  DotArtDetailPreview,
  DotArtDetailActions,
  DotArtComments,
  DotArtAuthorCard,
  DotArtInfoCard,
  DotArtRelatedWorks,
} from '@/components/user';
import type { Comment } from '@/components/user';

// Mock data - would come from API
const mockDotArtData = {
  id: '1',
  title: '귀여운 고양이',
  description:
    '사랑스러운 주황색 고양이를 픽셀 아트로 표현했습니다. 따뜻한 색감으로 귀여움을 극대화했어요!',
  imageUrl: '/images/dotart/dotart-1.jpg',
  isHot: true,
  has3D: true,
  likeCount: 2847,
  commentCount: 156,
  viewCount: 12543,
  canvasSize: 32,
  colorCount: 12,
  createdAt: '2024년 12월 28일',
  tags: ['고양이', '동물', '귀여움', '픽셀아트', '3D'],
  author: {
    name: '픽셀마스터',
    username: 'pixelmaster',
    stats: {
      artworks: 142,
      followers: '8.5K',
      likes: '24.7K',
    },
  },
  relatedWorks: [
    { id: '2', title: '관련 작품 1', imageUrl: '/images/dotart/dotart-2.jpg' },
    { id: '3', title: '관련 작품 2', imageUrl: '/images/dotart/dotart-3.jpg' },
    { id: '4', title: '관련 작품 3', imageUrl: '/images/dotart/dotart-4.jpg' },
    { id: '5', title: '관련 작품 4', imageUrl: '/images/dotart/dotart-5.jpg' },
  ],
};

const mockComments: Comment[] = [
  {
    id: '1',
    authorName: '도트러버',
    avatarGradient: 'linear-gradient(135deg, #4D96FF 0%, #6BCB77 100%)',
    text: '와 정말 귀엽네요! 고양이 표정이 너무 사랑스러워요',
    date: '2시간 전',
    likeCount: 24,
    isLiked: false,
  },
  {
    id: '2',
    authorName: '픽셀아티스트',
    avatarGradient: 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)',
    text: '색상 조합이 정말 예쁘네요. 어떤 팔레트 사용하셨나요?',
    date: '5시간 전',
    likeCount: 12,
    isLiked: false,
  },
  {
    id: '3',
    authorName: '게임덕후',
    avatarGradient: 'linear-gradient(135deg, #F15BB5 0%, #9B5DE5 100%)',
    text: '3D로 보니까 더 멋지네요! 블록으로 만들어보고 싶어요',
    date: '1일 전',
    likeCount: 38,
    isLiked: true,
  },
];

export default function DotArtDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // State
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState<Comment[]>(mockComments);

  // Handlers
  const handleView3D = useCallback(() => {
    router.push(`/dotarts/${id}/viewer`);
  }, [router, id]);

  const handleLikeToggle = useCallback(() => {
    setIsLiked((prev) => !prev);
  }, []);

  const handleCommentClick = useCallback(() => {
    const commentSection = document.querySelector('.comments-section');
    commentSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleRemix = useCallback(() => {
    router.push(`/dotarts/new/editor?remix=${id}`);
  }, [router, id]);

  const handleBookmarkToggle = useCallback(() => {
    setIsBookmarked((prev) => !prev);
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: mockDotArtData.title,
        text: `${mockDotArtData.author.name}님의 도트아트 작품을 확인하세요!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다.');
    }
  }, []);

  const handleReport = useCallback(() => {
    console.log('Report clicked');
  }, []);

  const handleSubmitComment = useCallback((text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      authorName: '나',
      avatarGradient: 'linear-gradient(135deg, #9B5DE5 0%, #F15BB5 100%)',
      text,
      date: '방금 전',
      likeCount: 0,
      isLiked: false,
    };
    setComments((prev) => [newComment, ...prev]);
  }, []);

  const handleLikeComment = useCallback((commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likeCount: comment.isLiked ? comment.likeCount - 1 : comment.likeCount + 1,
            }
          : comment
      )
    );
  }, []);

  const handleReplyComment = useCallback((commentId: string) => {
    console.log('Reply to comment:', commentId);
  }, []);

  const handleFollow = useCallback(() => {
    setIsFollowing((prev) => !prev);
  }, []);

  const handleProfileClick = useCallback(() => {
    router.push(`/user/${mockDotArtData.author.username}`);
  }, [router]);

  const handleRelatedWorkClick = useCallback(
    (workId: string) => {
      router.push(`/dotart/${workId}/detail`);
    },
    [router]
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <main className="mx-auto max-w-[1320px] px-10 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-[#64748B]">
          <Link href="/" className="text-[#9B5DE5] hover:underline">
            홈
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/dotarts" className="text-[#9B5DE5] hover:underline">
            DotArt
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>{mockDotArtData.title}</span>
        </nav>

        {/* Detail Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Artwork */}
          <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,102,255,0.1)]">
            <DotArtDetailPreview
              imageUrl={mockDotArtData.imageUrl}
              title={mockDotArtData.title}
              isHot={mockDotArtData.isHot}
              has3D={mockDotArtData.has3D}
              onView3D={handleView3D}
            />

            <DotArtDetailActions
              likeCount={mockDotArtData.likeCount}
              commentCount={mockDotArtData.commentCount}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
              onLikeToggle={handleLikeToggle}
              onCommentClick={handleCommentClick}
              onRemix={handleRemix}
              onBookmarkToggle={handleBookmarkToggle}
              onShare={handleShare}
              onReport={handleReport}
            />

            <div className="comments-section">
              <DotArtComments
                comments={comments}
                totalCount={mockDotArtData.commentCount}
                onSubmitComment={handleSubmitComment}
                onLikeComment={handleLikeComment}
                onReplyComment={handleReplyComment}
              />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="flex flex-col gap-6">
            <DotArtAuthorCard
              name={mockDotArtData.author.name}
              username={mockDotArtData.author.username}
              stats={mockDotArtData.author.stats}
              isFollowing={isFollowing}
              onFollow={handleFollow}
              onProfileClick={handleProfileClick}
            />

            <DotArtInfoCard
              title={mockDotArtData.title}
              description={mockDotArtData.description}
              tags={mockDotArtData.tags}
              canvasSize={mockDotArtData.canvasSize}
              createdAt={mockDotArtData.createdAt}
              viewCount={mockDotArtData.viewCount}
              colorCount={mockDotArtData.colorCount}
            />

            <DotArtRelatedWorks
              works={mockDotArtData.relatedWorks}
              onWorkClick={handleRelatedWorkClick}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
