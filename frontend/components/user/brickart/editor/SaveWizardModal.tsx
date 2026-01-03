'use client';

import { useState } from 'react';
import {
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Camera,
  Upload,
  Globe,
  Link,
  Lock,
  FileText,
  Eye,
  Smile,
  Cat,
  Car,
  Building,
  Bot,
  Armchair,
  TreePine,
  Shapes,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface SaveWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SaveData) => void;
  objectCount: number;
  onCaptureThumbnail?: () => Promise<string>;
}

interface SaveData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  visibility: 'public' | 'link' | 'private';
  licenses: string[];
}

const categories = [
  { id: 'character', name: '캐릭터', icon: Smile },
  { id: 'animal', name: '동물', icon: Cat },
  { id: 'vehicle', name: '탈것', icon: Car },
  { id: 'building', name: '건물', icon: Building },
  { id: 'mecha', name: '로봇/메카', icon: Bot },
  { id: 'furniture', name: '가구', icon: Armchair },
  { id: 'nature', name: '자연', icon: TreePine },
  { id: 'other', name: '기타', icon: Shapes },
];

const visibilityOptions = [
  {
    id: 'public',
    title: '전체 공개',
    desc: '모든 사용자가 작품을 볼 수 있습니다. 검색 결과와 갤러리에 노출됩니다.',
    icon: Globe,
  },
  {
    id: 'link',
    title: '링크 공유',
    desc: '링크를 아는 사람만 볼 수 있습니다. 검색 결과에는 노출되지 않습니다.',
    icon: Link,
  },
  {
    id: 'private',
    title: '비공개',
    desc: '나만 볼 수 있습니다. 다른 사용자에게 노출되지 않습니다.',
    icon: Lock,
  },
];

const licenseOptions = [
  { id: 'view', label: '보기 허용' },
  { id: 'download', label: '다운로드 허용' },
  { id: 'remix', label: '수정/리믹스 허용' },
  { id: 'commercial', label: '상업적 이용 허용' },
];

export function SaveWizardModal({
  isOpen,
  onClose,
  onSave,
  objectCount,
  onCaptureThumbnail,
}: SaveWizardModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [saveComplete, setSaveComplete] = useState(false);

  const [formData, setFormData] = useState<SaveData>({
    title: '새 BrickArt 작품',
    description: '',
    category: '',
    tags: [],
    visibility: 'public',
    licenses: ['view'],
  });

  const [tagInput, setTagInput] = useState('');

  if (!isOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().replace(',', '');
      if (tag && formData.tags.length < 10 && !formData.tags.includes(tag)) {
        setFormData({ ...formData, tags: [...formData.tags, tag] });
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleCaptureThumbnail = async () => {
    if (onCaptureThumbnail) {
      const thumbnail = await onCaptureThumbnail();
      setFormData({ ...formData, thumbnail });
    }
  };

  const handleLicenseToggle = (licenseId: string) => {
    setFormData({
      ...formData,
      licenses: formData.licenses.includes(licenseId)
        ? formData.licenses.filter((l) => l !== licenseId)
        : [...formData.licenses, licenseId],
    });
  };

  const handleSave = () => {
    onSave(formData);
    setSaveComplete(true);
  };

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || '-';

  const getVisibilityName = (id: string) =>
    visibilityOptions.find((v) => v.id === id)?.title || '-';

  const renderStep1 = () => (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-900">
          작품명 <span className="text-pixar-error">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-pixar-blue focus:outline-none"
          placeholder="작품의 제목을 입력하세요"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-900">
          작품 설명
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="min-h-[100px] w-full resize-y rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-pixar-blue focus:outline-none"
          placeholder="작품에 대한 설명을 입력하세요"
        />
        <p className="mt-1.5 text-xs text-gray-500">
          작품의 특징이나 제작 의도를 설명해주세요
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-900">
          카테고리 <span className="text-pixar-error">*</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Button
                key={cat.id}
                onClick={() => setFormData({ ...formData, category: cat.id })}
                variant="ghost"
                className={cn(
                  'flex h-auto flex-col items-center gap-2 rounded-lg border-2 p-3 text-[13px]',
                  formData.category === cat.id
                    ? 'border-pixar-blue bg-pixar-blue text-white hover:bg-pixar-blue/90'
                    : 'border-gray-200 bg-gray-50 hover:border-pixar-blue'
                )}
              >
                <Icon className="h-6 w-6" />
                {cat.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-900">
          태그
        </label>
        <div className="flex min-h-[50px] flex-wrap gap-2 rounded-lg border-2 border-gray-200 bg-gray-50 p-3">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full bg-pixar-blue px-3 py-1.5 text-[13px] text-white"
            >
              {tag}
              <Button
                onClick={() => handleRemoveTag(tag)}
                variant="ghost"
                size="icon"
                className="h-3.5 w-3.5 p-0 hover:bg-transparent"
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
            className="min-w-[100px] flex-1 bg-transparent text-sm outline-none"
            placeholder="태그 입력 후 Enter"
          />
        </div>
        <p className="mt-1.5 text-xs text-gray-500">
          쉼표 또는 Enter로 태그를 추가하세요 (최대 10개)
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-900">
          썸네일
        </label>
        <div className="flex gap-5">
          <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
            {formData.thumbnail ? (
              <img
                src={formData.thumbnail}
                alt="썸네일"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Camera className="h-8 w-8" />
                <span className="text-[13px]">미리보기</span>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <Button
              onClick={handleCaptureThumbnail}
              variant="outline"
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 py-3 text-[13px] hover:border-pixar-blue"
            >
              <Camera className="h-[18px] w-[18px]" />
              현재 뷰에서 캡처
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 py-3 text-[13px] hover:border-pixar-blue"
            >
              <Upload className="h-[18px] w-[18px]" />
              이미지 업로드
            </Button>
            <p className="text-xs text-gray-500">권장 크기: 400x400px</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-900">
          공개 범위 <span className="text-pixar-error">*</span>
        </label>
        <div className="space-y-3">
          {visibilityOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = formData.visibility === opt.id;
            return (
              <Button
                key={opt.id}
                onClick={() =>
                  setFormData({
                    ...formData,
                    visibility: opt.id as SaveData['visibility'],
                  })
                }
                variant="ghost"
                className={cn(
                  'flex h-auto w-full items-start gap-4 rounded-lg border-2 p-4 text-left',
                  isActive
                    ? 'border-pixar-blue bg-pixar-blue/5 hover:bg-pixar-blue/10'
                    : 'border-gray-200 bg-gray-50 hover:border-pixar-blue'
                )}
              >
                <div
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full border-2',
                    isActive ? 'border-pixar-blue bg-pixar-blue' : 'border-gray-300'
                  )}
                >
                  {isActive && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <div
                  className={cn(
                    'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full',
                    isActive ? 'bg-pixar-blue text-white' : 'bg-gray-200'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-gray-900">
                    {opt.title}
                  </div>
                  <div className="mt-1 text-[13px] text-gray-500">{opt.desc}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <label className="mb-2 block text-sm font-semibold text-gray-900">
          라이선스 설정
        </label>
        <p className="mb-3 text-xs text-gray-500">
          다른 사용자가 이 작품을 어떻게 사용할 수 있는지 설정합니다.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {licenseOptions.map((opt) => {
            const isActive = formData.licenses.includes(opt.id);
            return (
              <Button
                key={opt.id}
                onClick={() => handleLicenseToggle(opt.id)}
                variant="ghost"
                className={cn(
                  'flex h-auto items-center justify-start gap-3 rounded-lg border-2 p-3.5',
                  isActive
                    ? 'border-pixar-blue bg-pixar-blue/5 hover:bg-pixar-blue/10'
                    : 'border-gray-200 bg-gray-50 hover:border-pixar-blue'
                )}
              >
                <div
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded border-2',
                    isActive ? 'border-pixar-blue bg-pixar-blue' : 'border-gray-300'
                  )}
                >
                  {isActive && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {opt.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="rounded-lg bg-gray-50 p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-pixar-blue">
          <FileText className="h-4 w-4" />
          작품 정보
        </div>
        <div className="space-y-2 text-[13px]">
          <div className="flex">
            <span className="w-24 text-gray-500">작품명</span>
            <span className="flex-1 text-gray-900">{formData.title || '-'}</span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500">설명</span>
            <span className="flex-1 text-gray-900">
              {formData.description || '-'}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500">카테고리</span>
            <span className="flex-1 text-gray-900">
              {getCategoryName(formData.category)}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500">태그</span>
            <div className="flex flex-1 flex-wrap gap-1.5">
              {formData.tags.length > 0
                ? formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-200 px-2.5 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))
                : '-'}
            </div>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500">객체 수</span>
            <span className="flex-1 text-gray-900">{objectCount}개</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-pixar-blue">
          <Eye className="h-4 w-4" />
          공개 설정
        </div>
        <div className="space-y-2 text-[13px]">
          <div className="flex">
            <span className="w-24 text-gray-500">공개 범위</span>
            <span className="flex-1 text-gray-900">
              {getVisibilityName(formData.visibility)}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500">라이선스</span>
            <span className="flex-1 text-gray-900">
              {formData.licenses
                .map((l) => licenseOptions.find((o) => o.id === l)?.label)
                .join(', ') || '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="py-10 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 animate-[successPop_0.5s_ease] items-center justify-center rounded-full bg-pixar-green">
        <Check className="h-10 w-10 text-white" />
      </div>
      <h3 className="mb-3 text-2xl font-bold text-gray-900">
        저장이 완료되었습니다!
      </h3>
      <p className="mb-6 text-sm text-gray-500">
        BrickArt 작품이 성공적으로 저장되었습니다.
        <br />
        갤러리에서 작품을 확인할 수 있습니다.
      </p>
      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={onClose}>
          에디터로 돌아가기
        </Button>
        <Button onClick={() => (window.location.href = '/brickart')}>
          갤러리 보기
        </Button>
      </div>
    </div>
  );

  const steps = [
    { num: 1, label: '작품 정보' },
    { num: 2, label: '공개 설정' },
    { num: 3, label: '검토 및 저장' },
  ];

  const titles = ['작품 정보 입력', '공개 설정', '검토 및 저장'];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
      <div className="flex max-h-[90vh] w-[90%] max-w-[700px] flex-col overflow-hidden rounded-2xl bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          {!saveComplete && (
            <>
              <div className="mb-4 flex justify-center gap-2">
                {steps.map((step) => (
                  <div
                    key={step.num}
                    className={cn(
                      'flex items-center gap-2 rounded-full px-4 py-2 text-[13px] transition-colors',
                      currentStep === step.num
                        ? 'bg-pixar-blue text-white'
                        : currentStep > step.num
                          ? 'bg-pixar-green text-white'
                          : 'bg-gray-100 text-gray-500'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                        currentStep >= step.num ? 'bg-white/20' : 'bg-black/10'
                      )}
                    >
                      {currentStep > step.num ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        step.num
                      )}
                    </span>
                    {step.label}
                  </div>
                ))}
              </div>
              <h2 className="text-center text-xl font-bold text-gray-900">
                {titles[currentStep - 1]}
              </h2>
            </>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {saveComplete
            ? renderSuccess()
            : currentStep === 1
              ? renderStep1()
              : currentStep === 2
                ? renderStep2()
                : renderStep3()}
        </div>

        {/* Footer */}
        {!saveComplete && (
          <div className="flex justify-between gap-3 border-t border-gray-200 p-5">
            <Button
              variant="outline"
              onClick={() =>
                currentStep === 1 ? onClose() : setCurrentStep(currentStep - 1)
              }
            >
              <ChevronLeft className="mr-1 h-[18px] w-[18px]" />
              {currentStep === 1 ? '취소' : '이전'}
            </Button>
            <Button
              onClick={() =>
                currentStep < 3 ? setCurrentStep(currentStep + 1) : handleSave()
              }
            >
              {currentStep < 3 ? '다음' : '저장하기'}
              <ChevronRight className="ml-1 h-[18px] w-[18px]" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
