'use client';

import { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Smile,
  Building2,
  Car,
  Home,
  Sparkles,
  Settings,
  TreePine,
  Shapes,
  X,
  Globe,
  Link,
  Lock,
  Camera,
  Upload,
  Image as ImageIcon,
  FileText,
  Palette,
  CheckCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type WizardStep = 1 | 2 | 3;
type Visibility = 'public' | 'link' | 'private';

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

const categories: Category[] = [
  { id: 'character', label: '캐릭터', icon: Smile },
  { id: 'architecture', label: '건축물', icon: Building2 },
  { id: 'vehicle', label: '탈것', icon: Car },
  { id: 'interior', label: '인테리어', icon: Home },
  { id: 'abstract', label: '추상/아트', icon: Sparkles },
  { id: 'mechanical', label: '기계장치', icon: Settings },
  { id: 'nature', label: '자연', icon: TreePine },
  { id: 'other', label: '기타', icon: Shapes },
];

interface VisibilityOption {
  id: Visibility;
  icon: LucideIcon;
  title: string;
  description: string;
}

const visibilityOptions: VisibilityOption[] = [
  {
    id: 'public',
    icon: Globe,
    title: '전체 공개',
    description: '모든 사용자가 작품을 볼 수 있습니다. 검색 결과와 갤러리에 노출됩니다.',
  },
  {
    id: 'link',
    icon: Link,
    title: '링크 공유',
    description: '링크를 아는 사람만 볼 수 있습니다. 검색 결과에는 노출되지 않습니다.',
  },
  {
    id: 'private',
    icon: Lock,
    title: '비공개',
    description: '나만 볼 수 있습니다. 다른 사용자에게 노출되지 않습니다.',
  },
];

interface CreationSaveWizardProps {
  isOpen: boolean;
  initialTitle?: string;
  onClose: () => void;
  onSave: (data: {
    title: string;
    description: string;
    category: string;
    tags: string[];
    visibility: Visibility;
    allowRemix: boolean;
    allowDownload: boolean;
  }) => void;
  onCaptureThumbnail: () => void;
}

export function CreationSaveWizard({
  isOpen,
  initialTitle = '새 창작물',
  onClose,
  onSave,
  onCaptureThumbnail,
}: CreationSaveWizardProps) {
  const [step, setStep] = useState<WizardStep>(1);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('public');
  const [allowRemix, setAllowRemix] = useState(false);
  const [allowDownload, setAllowDownload] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim() && tags.length < 10) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      title,
      description,
      category: selectedCategory || '',
      tags,
      visibility,
      allowRemix,
      allowDownload,
    });
    setIsSaved(true);
  };

  const stepTitles = ['작품 정보 입력', '공개 설정', '검토 및 저장'];

  const renderStepContent = () => {
    if (isSaved) {
      return (
        <div className="py-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 animate-[successPop_0.5s_ease] items-center justify-center rounded-full bg-[#6BCB77]">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-3 text-2xl font-bold text-white">저장 완료!</h3>
          <p className="mb-6 text-sm text-[#a0a0b0]">
            작품이 성공적으로 저장되었습니다.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="rounded-lg bg-[#1a1a2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3d3d5c]"
            >
              닫기
            </Button>
            <Button
              variant="gradient"
              onClick={() => window.open(`/creation/${Date.now()}`, '_blank')}
              className="rounded-lg bg-gradient-to-r from-[#00CEC9] to-[#00D4FF] px-5 py-2.5 text-sm font-semibold"
            >
              작품 보기
            </Button>
          </div>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                작품명 <span className="text-[#FF6B6B]">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="작품의 제목을 입력하세요"
                className="w-full rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] px-4 py-3 text-sm text-white outline-none focus:border-[#00CEC9]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                작품 설명
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="작품에 대한 설명을 입력하세요"
                className="min-h-[100px] w-full resize-y rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] px-4 py-3 text-sm text-white outline-none focus:border-[#00CEC9]"
              />
              <p className="mt-1.5 text-xs text-[#a0a0b0]">
                작품의 특징이나 제작 의도를 설명해주세요
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                카테고리 <span className="text-[#FF6B6B]">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {categories.map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant="ghost"
                    onClick={() => setSelectedCategory(id)}
                    className={cn(
                      'flex h-auto flex-col items-center gap-2 rounded-[10px] border-2 px-3 py-3 text-[13px]',
                      selectedCategory === id
                        ? 'border-[#00CEC9] bg-[#00CEC9] text-white hover:bg-[#00b8b3]'
                        : 'border-[#3d3d5c] bg-[#1a1a2e] text-white hover:border-[#00CEC9] hover:bg-[#1a1a2e]'
                    )}
                  >
                    <Icon className="h-6 w-6" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                태그
              </label>
              <div className="flex min-h-[50px] flex-wrap gap-2 rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] p-3">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 rounded-2xl bg-[#00CEC9] px-3 py-1.5 text-[13px] text-white"
                  >
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(i)}
                      className="h-auto p-0 hover:bg-transparent"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="태그 입력 후 Enter"
                  className="min-w-[100px] flex-1 border-none bg-transparent text-sm text-white outline-none"
                />
              </div>
              <p className="mt-1.5 text-xs text-[#a0a0b0]">
                쉼표 또는 Enter로 태그를 추가하세요 (최대 10개)
              </p>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                썸네일
              </label>
              <div className="flex gap-5">
                <div className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-[#3d3d5c] bg-[#1a1a2e] text-[#a0a0b0]">
                  <ImageIcon className="h-8 w-8" />
                  <span className="text-[13px]">미리보기</span>
                </div>
                <div className="flex-1 space-y-2">
                  <Button
                    variant="ghost"
                    onClick={onCaptureThumbnail}
                    className="w-full rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] py-3 text-[13px] text-white hover:border-[#00CEC9] hover:bg-[#1a1a2e]"
                  >
                    <Camera className="h-[18px] w-[18px]" />
                    현재 뷰에서 캡처
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] py-3 text-[13px] text-white hover:border-[#00CEC9] hover:bg-[#1a1a2e]"
                  >
                    <Upload className="h-[18px] w-[18px]" />
                    이미지 업로드
                  </Button>
                  <p className="text-xs text-[#a0a0b0]">권장 크기: 400x400px</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            {/* Visibility */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                공개 범위 <span className="text-[#FF6B6B]">*</span>
              </label>
              <div className="space-y-3">
                {visibilityOptions.map(({ id, icon: Icon, title, description }) => (
                  <Button
                    key={id}
                    variant="ghost"
                    onClick={() => setVisibility(id)}
                    className={cn(
                      'flex h-auto w-full items-start gap-4 rounded-[10px] border-2 p-4 text-left',
                      visibility === id
                        ? 'border-[#00CEC9] bg-[#00CEC9]/10 hover:bg-[#00CEC9]/15'
                        : 'border-[#3d3d5c] bg-[#1a1a2e] hover:border-[#00CEC9] hover:bg-[#1a1a2e]'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2',
                        visibility === id
                          ? 'border-[#00CEC9] bg-[#00CEC9]'
                          : 'border-[#3d3d5c]'
                      )}
                    >
                      {visibility === id && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div
                      className={cn(
                        'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
                        visibility === id ? 'bg-[#00CEC9]' : 'bg-[#3d3d5c]'
                      )}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="mb-1 text-[15px] font-semibold text-white">
                        {title}
                      </div>
                      <div className="text-[13px] text-[#a0a0b0]">{description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* License */}
            <div className="border-t border-[#3d3d5c] pt-6">
              <label className="mb-2 block text-sm font-semibold text-white">
                라이선스 설정
              </label>
              <p className="mb-3 text-xs text-[#a0a0b0]">
                다른 사용자가 이 작품을 어떻게 사용할 수 있는지 설정합니다.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setAllowRemix(!allowRemix)}
                  className={cn(
                    'h-auto justify-start gap-3 rounded-[10px] border-2 p-3.5',
                    allowRemix
                      ? 'border-[#00CEC9] bg-[#00CEC9]/10 hover:bg-[#00CEC9]/15'
                      : 'border-[#3d3d5c] bg-[#1a1a2e] hover:border-[#00CEC9] hover:bg-[#1a1a2e]'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded border-2',
                      allowRemix ? 'border-[#00CEC9] bg-[#00CEC9]' : 'border-[#3d3d5c]'
                    )}
                  >
                    {allowRemix && <Check className="h-3.5 w-3.5 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-white">리믹스 허용</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setAllowDownload(!allowDownload)}
                  className={cn(
                    'h-auto justify-start gap-3 rounded-[10px] border-2 p-3.5',
                    allowDownload
                      ? 'border-[#00CEC9] bg-[#00CEC9]/10 hover:bg-[#00CEC9]/15'
                      : 'border-[#3d3d5c] bg-[#1a1a2e] hover:border-[#00CEC9] hover:bg-[#1a1a2e]'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded border-2',
                      allowDownload
                        ? 'border-[#00CEC9] bg-[#00CEC9]'
                        : 'border-[#3d3d5c]'
                    )}
                  >
                    {allowDownload && <Check className="h-3.5 w-3.5 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-white">다운로드 허용</span>
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {/* Basic Info Review */}
            <div className="rounded-[10px] bg-[#1a1a2e] p-5">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#00CEC9]">
                <FileText className="h-4 w-4" />
                기본 정보
              </h4>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-[100px] text-[13px] text-[#a0a0b0]">작품명</span>
                  <span className="flex-1 text-[13px] text-white">{title}</span>
                </div>
                <div className="flex">
                  <span className="w-[100px] text-[13px] text-[#a0a0b0]">카테고리</span>
                  <span className="flex-1 text-[13px] text-white">
                    {categories.find((c) => c.id === selectedCategory)?.label || '-'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-[100px] text-[13px] text-[#a0a0b0]">태그</span>
                  <div className="flex flex-1 flex-wrap gap-1.5">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-xl bg-[#3d3d5c] px-2.5 py-1 text-xs text-white"
                      >
                        {tag}
                      </span>
                    ))}
                    {tags.length === 0 && (
                      <span className="text-[13px] text-[#a0a0b0]">-</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Visibility Review */}
            <div className="rounded-[10px] bg-[#1a1a2e] p-5">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#00CEC9]">
                <Globe className="h-4 w-4" />
                공개 설정
              </h4>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-[100px] text-[13px] text-[#a0a0b0]">공개 범위</span>
                  <span className="flex-1 text-[13px] text-white">
                    {visibilityOptions.find((v) => v.id === visibility)?.title}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-[100px] text-[13px] text-[#a0a0b0]">리믹스</span>
                  <span className="flex-1 text-[13px] text-white">
                    {allowRemix ? '허용' : '비허용'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-[100px] text-[13px] text-[#a0a0b0]">다운로드</span>
                  <span className="flex-1 text-[13px] text-white">
                    {allowDownload ? '허용' : '비허용'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80">
      <div className="flex max-h-[90vh] w-[90%] max-w-[700px] flex-col overflow-hidden rounded-2xl bg-[#252542]">
        {/* Header */}
        <div className="border-b border-[#3d3d5c] p-6">
          {!isSaved && (
            <>
              <div className="mb-4 flex justify-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      'flex items-center gap-2 rounded-[20px] px-4 py-2 text-[13px] transition-colors',
                      step === s
                        ? 'bg-[#00CEC9] text-white'
                        : step > s
                          ? 'bg-[#6BCB77] text-white'
                          : 'bg-[#1a1a2e] text-[#a0a0b0]'
                    )}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                      {step > s ? <Check className="h-3.5 w-3.5" /> : s}
                    </span>
                    {stepTitles[s - 1]}
                  </div>
                ))}
              </div>
              <h2 className="text-center text-xl font-bold text-white">
                {stepTitles[step - 1]}
              </h2>
            </>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">{renderStepContent()}</div>

        {/* Footer */}
        {!isSaved && (
          <div className="flex justify-between gap-3 border-t border-[#3d3d5c] px-6 py-5">
            <Button
              variant="outline"
              onClick={step === 1 ? onClose : () => setStep((step - 1) as WizardStep)}
              className="min-w-[100px] rounded-lg border border-[#3d3d5c] bg-[#1a1a2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3d3d5c] hover:border-[#3d3d5c]"
            >
              <ChevronLeft className="h-[18px] w-[18px]" />
              {step === 1 ? '취소' : '이전'}
            </Button>
            <Button
              variant="gradient"
              onClick={step === 3 ? handleSave : () => setStep((step + 1) as WizardStep)}
              disabled={step === 1 && (!title.trim() || !selectedCategory)}
              className="min-w-[100px] rounded-lg bg-gradient-to-r from-[#00CEC9] to-[#00D4FF] px-5 py-2.5 text-sm font-semibold"
            >
              {step === 3 ? '저장하기' : '다음'}
              {step < 3 && <ChevronRight className="h-[18px] w-[18px]" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreationSaveWizard;
