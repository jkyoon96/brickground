'use client';

import { Sparkles, Play, Compass, Boxes } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface BannerSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

interface HomeHeroProps {
  slides?: BannerSlide[];
  currentSlide?: number;
  onSlideChange?: (index: number) => void;
}

const defaultSlides: BannerSlide[] = [
  {
    id: '1',
    badge: 'NEW COLLECTION',
    title: '나만의 브릭 세상을\n만들어보세요!',
    subtitle: 'BrickArt에서 3D 공간을 경험하고,\nDotArt로 픽셀 아트를 창작해보세요.',
    primaryButton: { label: '시작하기', href: '/dotart/editor' },
    secondaryButton: { label: '둘러보기' },
  },
];

export function HomeHero({
  slides = defaultSlides,
  currentSlide = 0,
  onSlideChange,
}: HomeHeroProps) {
  const slide = slides[currentSlide] || slides[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0066FF] via-[#3D8BFF] to-[#00CEC9] px-4 py-10 md:px-6 md:py-[60px]">
      {/* Decorative circles */}
      <div className="absolute -right-[50px] -top-[50px] h-[200px] w-[200px] rounded-full bg-white/10 md:-right-[100px] md:-top-[100px] md:h-[400px] md:w-[400px]" />
      <div className="absolute -bottom-[75px] -left-[50px] h-[250px] w-[250px] rounded-full bg-[rgba(255,217,61,0.15)] md:-bottom-[150px] md:-left-[100px] md:h-[500px] md:w-[500px]" />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        <div className="rounded-[20px] bg-white/10 p-6 backdrop-blur-[10px] md:rounded-3xl md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            {/* Text Content */}
            <div className="order-2 text-center text-white md:order-1 md:text-left">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(255,217,61,0.3)] px-4 py-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                {slide.badge}
              </span>
              <h1 className="mb-4 whitespace-pre-line text-[1.5rem] font-extrabold leading-tight md:text-5xl">
                {slide.title}
              </h1>
              <p className="mb-8 whitespace-pre-line text-[0.95rem] opacity-90 md:text-lg">
                {slide.subtitle}
              </p>
              <div className="flex flex-col justify-center gap-3 md:flex-row md:justify-start md:gap-4">
                <Link
                  href={slide.primaryButton.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FFD93D] px-6 py-3.5 text-base font-bold text-[#1E293B] transition-transform hover:scale-105 md:w-auto md:px-8 md:py-4 md:text-lg"
                >
                  <Play className="h-5 w-5" />
                  {slide.primaryButton.label}
                </Link>
                {slide.secondaryButton.href ? (
                  <Link
                    href={slide.secondaryButton.href}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/20 px-6 py-3.5 text-base font-bold text-white transition-transform hover:scale-105 md:w-auto md:px-8 md:py-4 md:text-lg"
                  >
                    <Compass className="h-5 w-5" />
                    {slide.secondaryButton.label}
                  </Link>
                ) : (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={slide.secondaryButton.onClick}
                    className="w-full rounded-2xl bg-white/20 text-white hover:bg-white/30 hover:scale-105 md:w-auto"
                  >
                    <Compass className="h-5 w-5" />
                    {slide.secondaryButton.label}
                  </Button>
                )}
              </div>
            </div>

            {/* Floating Icon */}
            <div className="order-1 text-center md:order-2">
              <div className="mx-auto flex h-[120px] w-[120px] animate-bounce items-center justify-center rounded-full bg-white/15 md:h-64 md:w-64">
                <Boxes className="h-14 w-14 text-white/80 md:h-32 md:w-32" />
              </div>
            </div>
          </div>

          {/* Banner Dots */}
          {slides.length > 1 && (
            <div className="mt-4 flex justify-center gap-2 md:mt-6">
              {slides.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => onSlideChange?.(index)}
                  className={cn(
                    'h-2.5 cursor-pointer rounded-full p-0 min-w-0',
                    index === currentSlide
                      ? 'w-8 bg-white hover:bg-white'
                      : 'w-2.5 bg-white/40 hover:bg-white/60'
                  )}
                  aria-label={`슬라이드 ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
export type { BannerSlide };
