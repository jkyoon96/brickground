'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  Settings2,
  Info,
  Image as ImageIcon,
  Film,
  Box,
  Sliders,
  Sun,
  Contrast,
  Square,
  Grid3X3,
  Minus,
  Plus,
  User,
  Sparkles,
  Building2,
  Rocket,
  Car,
  Trees,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type TabType = 'export' | 'settings' | 'info';

interface ExportOption {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
}

interface RenderSetting {
  id: string;
  icon: LucideIcon;
  label: string;
  type: 'slider' | 'toggle';
  value?: number;
  enabled?: boolean;
}

interface RelatedWork {
  id: string;
  title: string;
  icon: LucideIcon;
  gradient: string;
}

interface Author {
  name: string;
  followers: number;
  worksCount: number;
  isFollowing: boolean;
}

const exportOptions: ExportOption[] = [
  { id: 'png', icon: ImageIcon, label: 'PNG', description: '스크린샷' },
  { id: 'gif', icon: Film, label: 'GIF', description: '애니메이션' },
  { id: 'gltf', icon: Box, label: 'GLTF', description: '3D 모델' },
  { id: 'obj', icon: Box, label: 'OBJ', description: '3D 메쉬' },
];

const defaultSettings: RenderSetting[] = [
  { id: 'brightness', icon: Sun, label: '밝기', type: 'slider', value: 100 },
  { id: 'contrast', icon: Contrast, label: '대비', type: 'slider', value: 50 },
  { id: 'shadow', icon: Square, label: '그림자', type: 'toggle', enabled: true },
  { id: 'wireframe', icon: Grid3X3, label: '와이어프레임', type: 'toggle', enabled: false },
];

const relatedWorks: RelatedWork[] = [
  { id: '1', title: '네온 타워', icon: Building2, gradient: 'from-[#00CEC9] to-[#00D4FF]' },
  { id: '2', title: '우주 정거장', icon: Rocket, gradient: 'from-[#9B5DE5] to-[#F15BB5]' },
  { id: '3', title: '사이버 카', icon: Car, gradient: 'from-[#FFD93D] to-[#FF6B6B]' },
  { id: '4', title: '미래 공원', icon: Trees, gradient: 'from-[#6BCB77] to-[#4D96FF]' },
];

interface CreationViewerPanelProps {
  author: Author;
  onExport: (format: string) => void;
  onFollowToggle: () => void;
}

export function CreationViewerPanel({
  author,
  onExport,
  onFollowToggle,
}: CreationViewerPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('export');
  const [settings, setSettings] = useState(defaultSettings);

  const tabs = [
    { id: 'export' as const, icon: Download, label: '내보내기' },
    { id: 'settings' as const, icon: Settings2, label: '설정' },
    { id: 'info' as const, icon: Info, label: '정보' },
  ];

  const handleSettingChange = (id: string, value: number | boolean) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id
          ? setting.type === 'slider'
            ? { ...setting, value: value as number }
            : { ...setting, enabled: value as boolean }
          : setting
      )
    );
  };

  return (
    <div className="flex w-full flex-col overflow-y-auto border-l border-[#3d3d5c] bg-[#252542] md:w-[380px]">
      {/* Tabs */}
      <div className="border-b border-[#3d3d5c] p-4 md:p-6">
        <div className="mb-5 flex gap-1">
          {tabs.map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant={activeTab === id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(id)}
              className={cn(
                'flex-1 rounded-lg px-3 py-2.5 text-[13px] font-semibold',
                activeTab === id
                  ? 'bg-[#00CEC9] text-white hover:bg-[#00b8b3]'
                  : 'bg-[#1a1a2e] text-[#a0a0b0] hover:text-white hover:bg-[#1a1a2e]'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>

        {/* Tab Content: Export */}
        {activeTab === 'export' && (
          <div className="grid grid-cols-2 gap-3">
            {exportOptions.map(({ id, icon: Icon, label, description }) => (
              <Button
                key={id}
                variant="ghost"
                onClick={() => onExport(id)}
                className="flex h-auto flex-col items-center gap-2 rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] p-5 hover:border-[#00CEC9] hover:bg-[#1a1a2e]"
              >
                <Icon className="h-7 w-7 text-[#00CEC9]" />
                <span className="text-[13px] font-semibold text-white">{label}</span>
                <small className="text-[11px] text-[#a0a0b0]">{description}</small>
              </Button>
            ))}
          </div>
        )}

        {/* Tab Content: Settings */}
        {activeTab === 'settings' && (
          <div>
            {settings.map(({ id, icon: Icon, label, type, value, enabled }) => (
              <div
                key={id}
                className="flex items-center justify-between border-b border-[#3d3d5c] py-3.5 last:border-b-0"
              >
                <div className="flex items-center gap-2.5 text-sm text-white">
                  <Icon className="h-[18px] w-[18px] text-[#a0a0b0]" />
                  {label}
                </div>

                {type === 'slider' ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSettingChange(id, Math.max(0, (value || 0) - 10))}
                      className="h-8 w-8 rounded-lg bg-[#1a1a2e] text-white hover:bg-[#3d3d5c]"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="min-w-[50px] text-center text-[13px] font-semibold text-[#00CEC9]">
                      {value}%
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSettingChange(id, Math.min(100, (value || 0) + 10))}
                      className="h-8 w-8 rounded-lg bg-[#1a1a2e] text-white hover:bg-[#3d3d5c]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <label className="relative h-6 w-11 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => handleSettingChange(id, e.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="absolute inset-0 rounded-3xl bg-[#3d3d5c] transition-colors peer-checked:bg-[#00CEC9]" />
                    <span className="absolute bottom-[3px] left-[3px] h-[18px] w-[18px] rounded-full bg-white transition-transform peer-checked:translate-x-5" />
                  </label>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Info (placeholder) */}
        {activeTab === 'info' && (
          <div className="text-center text-sm text-[#a0a0b0]">
            <p>작품 상세 정보가 여기에 표시됩니다.</p>
          </div>
        )}
      </div>

      {/* Render Settings Section (when not on settings tab) */}
      {activeTab !== 'settings' && (
        <div className="border-b border-[#3d3d5c] p-4 md:p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
            <Sliders className="h-5 w-5 text-[#00CEC9]" />
            렌더링 설정
          </h3>
          <div>
            {settings.slice(0, 2).map(({ id, icon: Icon, label, value }) => (
              <div
                key={id}
                className="flex items-center justify-between border-b border-[#3d3d5c] py-3.5 last:border-b-0"
              >
                <div className="flex items-center gap-2.5 text-sm text-white">
                  <Icon className="h-[18px] w-[18px] text-[#a0a0b0]" />
                  {label}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSettingChange(id, Math.max(0, (value || 0) - 10))}
                    className="h-8 w-8 rounded-lg bg-[#1a1a2e] text-white hover:bg-[#3d3d5c]"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="min-w-[50px] text-center text-[13px] font-semibold text-[#00CEC9]">
                    {value}%
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSettingChange(id, Math.min(100, (value || 0) + 10))}
                    className="h-8 w-8 rounded-lg bg-[#1a1a2e] text-white hover:bg-[#3d3d5c]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Author Section */}
      <div className="border-b border-[#3d3d5c] p-4 md:p-6">
        <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
          <User className="h-5 w-5 text-[#00CEC9]" />
          창작자
        </h3>
        <div className="flex items-center gap-4 rounded-[10px] bg-[#1a1a2e] p-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#00CEC9] to-[#00D4FF]">
            <User className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="mb-1 text-base font-bold text-white">{author.name}</div>
            <div className="text-xs text-[#a0a0b0]">
              팔로워 {author.followers.toLocaleString()} / 작품 {author.worksCount}개
            </div>
          </div>
          <Button
            variant={author.isFollowing ? 'outline' : 'default'}
            onClick={onFollowToggle}
            className={cn(
              'rounded-[20px] px-5 py-2.5 text-[13px] font-semibold',
              author.isFollowing
                ? 'border-2 border-[#3d3d5c] bg-transparent text-white hover:bg-transparent hover:border-[#00CEC9]'
                : 'bg-[#00CEC9] text-white hover:bg-[#00b8b3]'
            )}
          >
            {author.isFollowing ? '팔로잉' : '팔로우'}
          </Button>
        </div>
      </div>

      {/* Related Works Section */}
      <div className="p-4 md:p-6">
        <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
          <Sparkles className="h-5 w-5 text-[#00CEC9]" />
          관련 작품
        </h3>
        <div className="grid grid-cols-4 gap-2 md:grid-cols-2 md:gap-3">
          {relatedWorks.map(({ id, title, icon: Icon, gradient }) => (
            <Link
              key={id}
              href={`/creations/${id}`}
              className="group relative aspect-square overflow-hidden rounded-[10px]"
            >
              <div
                className={cn(
                  'flex h-full w-full items-center justify-center bg-gradient-to-br transition-transform group-hover:scale-110',
                  gradient
                )}
              >
                <Icon className="h-6 w-6 text-white md:h-8 md:w-8" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-2.5">
                <span className="text-[10px] font-semibold text-white md:text-[11px]">
                  {title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreationViewerPanel;
