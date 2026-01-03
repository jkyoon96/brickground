'use client';

import { RotateCcw, Home, ZoomIn, ZoomOut, Focus, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ViewerControlsProps {
  isAutoRotating?: boolean;
  onToggleAutoRotate?: () => void;
  onResetCamera?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFocusSelected?: () => void;
  onClearSelection?: () => void;
}

export function ViewerControls({
  isAutoRotating = false,
  onToggleAutoRotate,
  onResetCamera,
  onZoomIn,
  onZoomOut,
  onFocusSelected,
  onClearSelection,
}: ViewerControlsProps) {
  return (
    <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/60 p-3 backdrop-blur-md md:gap-3 md:px-5 md:py-3">
      <Button
        onClick={onToggleAutoRotate}
        variant="ghost"
        size="icon"
        className={cn(
          'h-10 w-10 md:h-11 md:w-11',
          isAutoRotating ? 'bg-pixar-blue text-white hover:bg-pixar-blue/90' : 'bg-white/10 text-white hover:bg-pixar-blue'
        )}
        title="자동 회전"
      >
        <RotateCcw className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
      <Button
        onClick={onResetCamera}
        variant="ghost"
        size="icon"
        className="h-10 w-10 bg-white/10 text-white hover:bg-pixar-blue md:h-11 md:w-11"
        title="카메라 리셋"
      >
        <Home className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <div className="h-6 w-px bg-white/20" />

      <Button
        onClick={onZoomIn}
        variant="ghost"
        size="icon"
        className="h-10 w-10 bg-white/10 text-white hover:bg-pixar-blue md:h-11 md:w-11"
        title="확대"
      >
        <ZoomIn className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
      <Button
        onClick={onZoomOut}
        variant="ghost"
        size="icon"
        className="h-10 w-10 bg-white/10 text-white hover:bg-pixar-blue md:h-11 md:w-11"
        title="축소"
      >
        <ZoomOut className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <div className="h-6 w-px bg-white/20" />

      <Button
        onClick={onFocusSelected}
        variant="ghost"
        size="icon"
        className="h-10 w-10 bg-white/10 text-white hover:bg-pixar-blue md:h-11 md:w-11"
        title="선택 객체로 이동"
      >
        <Focus className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
      <Button
        onClick={onClearSelection}
        variant="ghost"
        size="icon"
        className="h-10 w-10 bg-white/10 text-white hover:bg-pixar-blue md:h-11 md:w-11"
        title="선택 해제"
      >
        <XCircle className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
    </div>
  );
}
