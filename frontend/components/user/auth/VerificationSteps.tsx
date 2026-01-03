'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface Step {
  label: string;
}

interface VerificationStepsProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function VerificationSteps({ steps, currentStep, className }: VerificationStepsProps) {
  return (
    <div className={cn('flex gap-4 md:gap-8', className)}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={index} className="relative flex flex-1 flex-col items-center gap-2">
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'absolute left-[60%] top-4 hidden h-0.5 w-[80%] md:block',
                  isCompleted ? 'bg-pixar-green' : 'bg-gray-200'
                )}
              />
            )}

            {/* Step number */}
            <div
              className={cn(
                'z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold md:h-8 md:w-8 md:text-sm',
                isCompleted && 'bg-pixar-green text-white',
                isActive && 'bg-pixar-blue text-white',
                !isCompleted && !isActive && 'bg-gray-200 text-gray-500'
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
            </div>

            {/* Step label */}
            <span
              className={cn(
                'text-center text-[10px] font-semibold md:text-xs',
                isCompleted || isActive ? 'text-gray-900' : 'text-gray-500'
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
