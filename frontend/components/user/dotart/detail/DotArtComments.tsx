'use client';

import { useState } from 'react';
import { MessageCircle, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  avatarGradient?: string;
  text: string;
  date: string;
  likeCount: number;
  isLiked?: boolean;
}

interface DotArtCommentsProps {
  comments: Comment[];
  totalCount: number;
  onSubmitComment: (text: string) => void;
  onLikeComment: (commentId: string) => void;
  onReplyComment: (commentId: string) => void;
}

export function DotArtComments({
  comments,
  totalCount,
  onSubmitComment,
  onLikeComment,
  onReplyComment,
}: DotArtCommentsProps) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim()) {
      onSubmitComment(commentText.trim());
      setCommentText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-[#1E293B]">
          <MessageCircle className="h-5 w-5 text-[#9B5DE5]" />
          댓글
        </h3>
        <span className="text-sm text-[#64748B]">{totalCount.toLocaleString()}개</span>
      </div>

      {/* Comment Input */}
      <div className="mb-6 flex gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#9B5DE5]">
          <User className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-1 gap-2.5">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="댓글을 입력하세요..."
            className="flex-1 rounded-xl border-2 border-[#E2E8F0] px-4 py-3 text-sm outline-none transition-colors focus:border-[#9B5DE5]"
          />
          <Button
            onClick={handleSubmit}
            disabled={!commentText.trim()}
            className="rounded-xl bg-[#9B5DE5] px-5 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          >
            등록
          </Button>
        </div>
      </div>

      {/* Comment List */}
      <div className="flex flex-col gap-5">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            {/* Avatar */}
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  comment.avatarGradient ||
                  'linear-gradient(135deg, #9B5DE5 0%, #F15BB5 100%)',
              }}
            >
              <User className="h-5 w-5 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-sm font-bold text-[#1E293B]">
                  {comment.authorName}
                </span>
                <span className="text-xs text-[#64748B]">{comment.date}</span>
              </div>
              <p className="mb-2 text-sm leading-relaxed text-[#1E293B]">
                {comment.text}
              </p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLikeComment(comment.id)}
                  className={cn(
                    'flex h-auto items-center gap-1 px-1 py-0 text-xs text-[#64748B] transition-colors hover:bg-transparent hover:text-[#FF6B6B]',
                    comment.isLiked && 'text-[#FF6B6B]'
                  )}
                >
                  <Heart
                    className={cn('h-3.5 w-3.5', comment.isLiked && 'fill-current')}
                  />
                  {comment.likeCount}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onReplyComment(comment.id)}
                  className="flex h-auto items-center gap-1 px-1 py-0 text-xs text-[#64748B] transition-colors hover:bg-transparent hover:text-[#9B5DE5]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  답글
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DotArtComments;
