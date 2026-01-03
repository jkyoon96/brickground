'use client';

import { useState } from 'react';
import { MessageCircle, User, Send, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface CreationComment {
  id: string;
  authorName: string;
  authorId: string;
  isAuthor: boolean;
  content: string;
  timeAgo: string;
  likes: number;
  isLiked?: boolean;
}

interface CreationDetailCommentsProps {
  comments: CreationComment[];
  totalCount: number;
  onSubmitComment: (content: string) => void;
  onLikeComment: (commentId: string) => void;
  onReplyComment: (commentId: string) => void;
}

export function CreationDetailComments({
  comments,
  totalCount,
  onSubmitComment,
  onLikeComment,
  onReplyComment,
}: CreationDetailCommentsProps) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (commentText.trim()) {
      onSubmitComment(commentText.trim());
      setCommentText('');
    }
  };

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_4px_20px_rgba(0,206,201,0.15)] md:p-7">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-bold text-[#1E293B] md:text-lg">
          <MessageCircle className="h-5 w-5 text-[#00CEC9] md:h-[22px] md:w-[22px]" />
          댓글
        </h2>
        <span className="rounded-xl bg-[#00CEC9] px-3 py-1 text-xs font-bold text-white">
          {totalCount}
        </span>
      </div>

      {/* Comment Input */}
      <div className="mb-6 flex flex-col gap-3 border-b border-[#E2E8F0] pb-6 md:flex-row md:gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00CEC9] to-[#00D4FF] md:h-11 md:w-11">
          <User className="h-5 w-5 text-white md:h-[22px] md:w-[22px]" />
        </div>
        <div className="flex-1">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="mb-3 h-[70px] w-full resize-none rounded-xl border-2 border-[#E2E8F0] px-4 py-3 text-sm font-medium text-[#1E293B] placeholder-[#94A3B8] outline-none transition-colors focus:border-[#00CEC9] md:h-20"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!commentText.trim()}
              className="rounded-[20px] bg-[#00CEC9] px-5 py-2.5 text-sm font-semibold hover:bg-[#00b8b3]"
            >
              <Send className="h-4 w-4" />
              등록
            </Button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div className="flex flex-col gap-5">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 md:gap-4">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F8FAFC] md:h-10 md:w-10">
              <User className="h-4 w-4 text-[#64748B] md:h-5 md:w-5" />
            </div>
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-[#1E293B]">{comment.authorName}</span>
                {comment.isAuthor && (
                  <span className="rounded-lg bg-[#00CEC9] px-2 py-0.5 text-[10px] font-bold text-white">
                    작성자
                  </span>
                )}
                <span className="text-xs text-[#64748B]">{comment.timeAgo}</span>
              </div>
              <p className="mb-2.5 text-sm leading-relaxed text-[#64748B]">{comment.content}</p>
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLikeComment(comment.id)}
                  className="h-auto p-0 text-xs text-[#64748B] hover:text-[#00CEC9] hover:bg-transparent"
                >
                  <Heart className="h-3.5 w-3.5" />
                  좋아요 {comment.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onReplyComment(comment.id)}
                  className="h-auto p-0 text-xs text-[#64748B] hover:text-[#00CEC9] hover:bg-transparent"
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

export default CreationDetailComments;
