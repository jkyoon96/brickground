'use client';

import { Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface AssemblyGuidePanelProps {
  currentStep: number;
  totalSteps: number;
  isHighlightEnabled?: boolean;
  onStepChange: (step: number) => void;
  onToggleHighlight?: () => void;
}

export function AssemblyGuidePanel({
  currentStep,
  totalSteps,
  isHighlightEnabled = true,
  onStepChange,
  onToggleHighlight,
}: AssemblyGuidePanelProps) {
  const steps = Array.from({ length: totalSteps + 1 }, (_, i) => i);

  return (
    <div className="absolute bottom-24 left-4 z-10 min-w-[180px] rounded-2xl bg-black/70 p-4 backdrop-blur-md md:bottom-28 md:left-6 md:min-w-[200px]">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Layers className="h-4 w-4 text-toy-yellow" />
          조립 가이드
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/70">하이라이트</span>
          <Button
            onClick={onToggleHighlight}
            variant="ghost"
            size="icon"
            className={cn(
              'relative h-5 w-10 rounded-full p-0',
              isHighlightEnabled ? 'bg-pixar-blue hover:bg-pixar-blue/90' : 'bg-white/20 hover:bg-white/30'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform',
                isHighlightEnabled ? 'left-[22px]' : 'left-0.5'
              )}
            />
          </Button>
        </div>
      </div>

      {/* Step Buttons */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {steps.map((step) => (
          <Button
            key={step}
            onClick={() => onStepChange(step)}
            variant="ghost"
            size="icon"
            className={cn(
              'h-7 w-7 text-xs font-semibold text-white md:h-8 md:w-8',
              step === currentStep
                ? 'bg-pixar-blue hover:bg-pixar-blue/90'
                : step < currentStep
                  ? 'bg-pixar-green hover:bg-pixar-green/90'
                  : 'bg-white/10 hover:bg-white/20'
            )}
          >
            {step}
          </Button>
        ))}
      </div>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={totalSteps}
        value={currentStep}
        onChange={(e) => onStepChange(parseInt(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-pixar-blue"
      />

      {/* Step Counter */}
      <div className="mt-2 text-center text-xs text-white/60">
        단계: <span className="font-semibold text-white">{currentStep}</span> / {totalSteps}
      </div>
    </div>
  );
}
