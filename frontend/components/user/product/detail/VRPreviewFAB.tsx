'use client';

import { Glasses } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface VRPreviewFABProps {
  onClick?: () => void;
}

export function VRPreviewFAB({ onClick }: VRPreviewFABProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-8 right-8 z-50 h-16 w-16 shadow-[0_4px_20px_rgba(0,102,255,0.4)] transition-transform hover:scale-110"
      aria-label="VR 미리보기"
    >
      <Glasses className="h-7 w-7" />
    </Button>
  );
}
