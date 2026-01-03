'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Smile,
  Cat,
  Cookie,
  Flower2,
  Building,
  Car,
  Gamepad2,
  Shapes,
  Globe,
  Link,
  Lock,
  FileText,
  Eye,
  Image,
  Wand2,
  Upload,
  Edit,
  Images,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface WizardData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  visibility: 'public' | 'link' | 'private';
  licenses: string[];
  thumbnail?: string;
}

interface DotArtSaveWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: WizardData) => void;
  onContinueEditing: () => void;
  onGoToGallery: () => void;
  defaultTitle?: string;
}

const categories = [
  { id: 'character', label: '캐릭터', icon: Smile },
  { id: 'animal', label: '동물', icon: Cat },
  { id: 'food', label: '음식', icon: Cookie },
  { id: 'nature', label: '자연', icon: Flower2 },
  { id: 'building', label: '건물', icon: Building },
  { id: 'vehicle', label: '탈것', icon: Car },
  { id: 'game', label: '게임', icon: Gamepad2 },
  { id: 'other', label: '기타', icon: Shapes },
];

const visibilityOptions = [
  {
    id: 'public',
    title: '전체 공개',
    description: '모든 사용자가 작품을 볼 수 있습니다. 검색 결과와 갤러리에 노출됩니다.',
    icon: Globe,
  },
  {
    id: 'link',
    title: '링크 공유',
    description: '링크를 아는 사람만 볼 수 있습니다. 검색 결과에는 노출되지 않습니다.',
    icon: Link,
  },
  {
    id: 'private',
    title: '비공개',
    description: '나만 볼 수 있습니다. 다른 사용자에게 노출되지 않습니다.',
    icon: Lock,
  },
];

const licenseOptions = [
  { id: 'view', label: '보기 허용' },
  { id: 'download', label: '다운로드 허용' },
  { id: 'remix', label: '수정/리믹스 허용' },
  { id: 'commercial', label: '상업적 이용 허용' },
];

export function DotArtSaveWizard({
  isOpen,
  onClose,
  onSave,
  onContinueEditing,
  onGoToGallery,
  defaultTitle = '',
}: DotArtSaveWizardProps) {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<WizardData>({
    title: defaultTitle,
    description: '',
    category: '',
    tags: [],
    visibility: 'public',
    licenses: ['view'],
    thumbnail: undefined,
  });
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (data.tags.length < 10 && !data.tags.includes(tagInput.trim())) {
        setData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleToggleLicense = (license: string) => {
    setData((prev) => ({
      ...prev,
      licenses: prev.licenses.includes(license)
        ? prev.licenses.filter((l) => l !== license)
        : [...prev.licenses, license],
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save
      onSave(data);
      setIsSuccess(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    setStep(1);
    setIsSuccess(false);
    onClose();
  };

  const canProceed = () => {
    if (step === 1) {
      return data.title.trim() && data.category;
    }
    return true;
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return '작품 정보 입력';
      case 2:
        return '공개 설정';
      case 3:
        return '검토 및 저장';
      default:
        return '';
    }
  };

  const getCategoryLabel = (id: string) => {
    return categories.find((c) => c.id === id)?.label || id;
  };

  const getVisibilityLabel = (id: string) => {
    return visibilityOptions.find((v) => v.id === id)?.title || id;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="flex max-h-[90vh] w-[90%] max-w-[700px] flex-col overflow-hidden rounded-2xl bg-[#252542]"
      >
        {/* Header */}
        {!isSuccess && (
          <div className="border-b border-[#3d3d5c] p-6">
            {/* Steps */}
            <div className="mb-4 flex justify-center gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn(
                    'flex items-center gap-2 rounded-[20px] px-4 py-2 text-[13px] transition-colors',
                    step === s
                      ? 'bg-[#9B5DE5] text-white'
                      : step > s
                        ? 'bg-[#6BCB77] text-white'
                        : 'bg-[#1a1a2e] text-[#a0a0b0]'
                  )}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                    {step > s ? <Check className="h-3.5 w-3.5" /> : s}
                  </span>
                  <span>
                    {s === 1 ? '작품 정보' : s === 2 ? '공개 설정' : '검토 및 저장'}
                  </span>
                </div>
              ))}
            </div>
            <h2 className="text-center text-xl font-bold text-white">{getStepTitle()}</h2>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#6BCB77]"
                >
                  <Check className="h-10 w-10 text-white" />
                </motion.div>
                <h3 className="mb-3 text-2xl font-bold text-white">
                  저장이 완료되었습니다!
                </h3>
                <p className="mb-6 text-sm text-[#a0a0b0]">
                  작품이 성공적으로 저장되었습니다.
                  <br />
                  갤러리에서 작품을 확인할 수 있습니다.
                </p>
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleClose();
                      onContinueEditing();
                    }}
                    className="flex items-center gap-1.5 rounded-[10px] border-2 border-[#3d3d5c] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#9B5DE5]"
                  >
                    <Edit className="h-[18px] w-[18px]" />
                    계속 편집
                  </Button>
                  <Button
                    onClick={() => {
                      handleClose();
                      onGoToGallery();
                    }}
                    className="flex items-center gap-1.5 rounded-[10px] bg-[#9B5DE5] px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                  >
                    <Images className="h-[18px] w-[18px]" />
                    갤러리로 이동
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Step 1: 작품 정보 */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Title */}
                    <div className="mb-5">
                      <label className="mb-2 block text-sm font-semibold text-white">
                        작품명 <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <input
                        type="text"
                        value={data.title}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, title: e.target.value }))
                        }
                        placeholder="작품의 제목을 입력하세요"
                        className="w-full rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] px-4 py-3 text-sm text-white outline-none focus:border-[#9B5DE5]"
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                      <label className="mb-2 block text-sm font-semibold text-white">
                        작품 설명
                      </label>
                      <textarea
                        value={data.description}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, description: e.target.value }))
                        }
                        placeholder="작품에 대한 설명을 입력하세요"
                        className="min-h-[100px] w-full resize-y rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] px-4 py-3 text-sm text-white outline-none focus:border-[#9B5DE5]"
                      />
                      <p className="mt-1.5 text-xs text-[#a0a0b0]">
                        작품의 특징이나 제작 의도를 설명해주세요
                      </p>
                    </div>

                    {/* Category */}
                    <div className="mb-5">
                      <label className="mb-2 block text-sm font-semibold text-white">
                        카테고리 <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {categories.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <Button
                              key={cat.id}
                              variant="ghost"
                              onClick={() =>
                                setData((prev) => ({ ...prev, category: cat.id }))
                              }
                              className={cn(
                                'h-auto rounded-[10px] border-2 p-3 text-center text-[13px] transition-colors',
                                data.category === cat.id
                                  ? 'border-[#9B5DE5] bg-[#9B5DE5] text-white'
                                  : 'border-[#3d3d5c] bg-[#1a1a2e] text-white hover:border-[#9B5DE5]'
                              )}
                            >
                              <Icon className="mx-auto mb-2 h-6 w-6" />
                              {cat.label}
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-5">
                      <label className="mb-2 block text-sm font-semibold text-white">
                        태그
                      </label>
                      <div className="flex min-h-[50px] flex-wrap gap-2 rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] p-3">
                        {data.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1.5 rounded-2xl bg-[#9B5DE5] px-3 py-1.5 text-[13px] text-white"
                          >
                            {tag}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveTag(tag)}
                              className="flex h-auto items-center p-0 hover:bg-transparent"
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </span>
                        ))}
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleAddTag}
                          placeholder="태그 입력 후 Enter"
                          className="min-w-[100px] flex-1 border-none bg-transparent text-sm text-white outline-none"
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-[#a0a0b0]">
                        쉼표 또는 Enter로 태그를 추가하세요 (최대 10개)
                      </p>
                    </div>

                    {/* Thumbnail */}
                    <div className="mb-5">
                      <label className="mb-2 block text-sm font-semibold text-white">
                        썸네일
                      </label>
                      <div className="flex items-start gap-5">
                        <div className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-[#3d3d5c] bg-[#1a1a2e] text-[13px] text-[#a0a0b0]">
                          <Image className="h-8 w-8" />
                          <span>미리보기</span>
                        </div>
                        <div className="flex-1">
                          <Button
                            variant="outline"
                            className="mb-2 flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] px-3 py-3 text-[13px] text-white transition-colors hover:border-[#9B5DE5]"
                          >
                            <Wand2 className="h-[18px] w-[18px]" />
                            현재 작품에서 자동 생성
                          </Button>
                          <Button
                            variant="outline"
                            className="flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] px-3 py-3 text-[13px] text-white transition-colors hover:border-[#9B5DE5]"
                          >
                            <Upload className="h-[18px] w-[18px]" />
                            이미지 업로드
                          </Button>
                          <p className="mt-2 text-xs text-[#a0a0b0]">
                            권장 크기: 400x400px, 최대 2MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: 공개 설정 */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Visibility */}
                    <div className="mb-5">
                      <label className="mb-2 block text-sm font-semibold text-white">
                        공개 범위 <span className="text-[#FF6B6B]">*</span>
                      </label>
                      <div className="flex flex-col gap-3">
                        {visibilityOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <Button
                              key={option.id}
                              variant="ghost"
                              onClick={() =>
                                setData((prev) => ({
                                  ...prev,
                                  visibility: option.id as WizardData['visibility'],
                                }))
                              }
                              className={cn(
                                'flex h-auto items-start gap-4 rounded-[10px] border-2 p-4 text-left transition-colors',
                                data.visibility === option.id
                                  ? 'border-[#9B5DE5] bg-[#9B5DE5]/10'
                                  : 'border-[#3d3d5c] bg-[#1a1a2e] hover:border-[#9B5DE5]'
                              )}
                            >
                              <div
                                className={cn(
                                  'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2',
                                  data.visibility === option.id
                                    ? 'border-[#9B5DE5] bg-[#9B5DE5]'
                                    : 'border-[#3d3d5c]'
                                )}
                              >
                                {data.visibility === option.id && (
                                  <div className="h-2 w-2 rounded-full bg-white" />
                                )}
                              </div>
                              <div
                                className={cn(
                                  'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
                                  data.visibility === option.id
                                    ? 'bg-[#9B5DE5]'
                                    : 'bg-[#3d3d5c]'
                                )}
                              >
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="mb-1 text-[15px] font-semibold text-white">
                                  {option.title}
                                </div>
                                <div className="text-[13px] text-[#a0a0b0]">
                                  {option.description}
                                </div>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* License */}
                    <div className="mt-6 border-t border-[#3d3d5c] pt-6">
                      <label className="mb-2 block text-sm font-semibold text-white">
                        라이선스 설정
                      </label>
                      <p className="mb-3 text-xs text-[#a0a0b0]">
                        다른 사용자가 이 작품을 어떻게 사용할 수 있는지 설정합니다.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {licenseOptions.map((license) => (
                          <Button
                            key={license.id}
                            variant="ghost"
                            onClick={() => handleToggleLicense(license.id)}
                            className={cn(
                              'flex h-auto items-center gap-3 rounded-[10px] border-2 p-3.5 transition-colors',
                              data.licenses.includes(license.id)
                                ? 'border-[#9B5DE5] bg-[#9B5DE5]/10'
                                : 'border-[#3d3d5c] bg-[#1a1a2e] hover:border-[#9B5DE5]'
                            )}
                          >
                            <div
                              className={cn(
                                'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2',
                                data.licenses.includes(license.id)
                                  ? 'border-[#9B5DE5] bg-[#9B5DE5]'
                                  : 'border-[#3d3d5c]'
                              )}
                            >
                              {data.licenses.includes(license.id) && (
                                <Check className="h-3.5 w-3.5 text-white" />
                              )}
                            </div>
                            <span className="text-sm font-medium text-white">
                              {license.label}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: 검토 */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Work Info */}
                    <div className="mb-4 rounded-[10px] bg-[#1a1a2e] p-5">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#9B5DE5]">
                        <FileText className="h-4 w-4" />
                        작품 정보
                      </div>
                      <div className="mb-2 flex">
                        <span className="w-[100px] text-[13px] text-[#a0a0b0]">작품명</span>
                        <span className="flex-1 text-[13px] text-white">{data.title}</span>
                      </div>
                      <div className="mb-2 flex">
                        <span className="w-[100px] text-[13px] text-[#a0a0b0]">설명</span>
                        <span className="flex-1 text-[13px] text-white">
                          {data.description || '-'}
                        </span>
                      </div>
                      <div className="mb-2 flex">
                        <span className="w-[100px] text-[13px] text-[#a0a0b0]">카테고리</span>
                        <span className="flex-1 text-[13px] text-white">
                          {getCategoryLabel(data.category)}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-[100px] text-[13px] text-[#a0a0b0]">태그</span>
                        <div className="flex flex-1 flex-wrap gap-1.5">
                          {data.tags.length > 0 ? (
                            data.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-xl bg-[#3d3d5c] px-2.5 py-1 text-xs text-white"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-[13px] text-white">-</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Visibility Info */}
                    <div className="rounded-[10px] bg-[#1a1a2e] p-5">
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#9B5DE5]">
                        <Eye className="h-4 w-4" />
                        공개 설정
                      </div>
                      <div className="mb-2 flex">
                        <span className="w-[100px] text-[13px] text-[#a0a0b0]">공개 범위</span>
                        <span className="flex-1 text-[13px] text-white">
                          {getVisibilityLabel(data.visibility)}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-[100px] text-[13px] text-[#a0a0b0]">라이선스</span>
                        <span className="flex-1 text-[13px] text-white">
                          {data.licenses
                            .map(
                              (l) => licenseOptions.find((opt) => opt.id === l)?.label || l
                            )
                            .join(', ')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!isSuccess && (
          <div className="flex justify-between gap-3 border-t border-[#3d3d5c] p-5">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={step === 1}
              className={cn(
                'flex min-w-[120px] items-center justify-center gap-1.5 rounded-[10px] border-2 border-[#3d3d5c] px-5 py-2.5 text-sm font-semibold text-white transition-colors',
                step === 1
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:border-[#9B5DE5] hover:text-[#9B5DE5]'
              )}
            >
              <ArrowLeft className="h-[18px] w-[18px]" />
              이전
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="rounded-[10px] border-2 border-[#3d3d5c] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#9B5DE5]"
              >
                취소
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className={cn(
                  'flex min-w-[120px] items-center justify-center gap-1.5 rounded-[10px] bg-[#9B5DE5] px-5 py-2.5 text-sm font-semibold text-white transition-colors',
                  !canProceed() && 'cursor-not-allowed opacity-50'
                )}
              >
                {step === 3 ? '저장' : '다음'}
                {step < 3 && <ArrowRight className="h-[18px] w-[18px]" />}
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default DotArtSaveWizard;
