'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DotArtToolbar,
  DotArtSideTools,
  DotArtCanvas,
  DotArtRightPanel,
  DotArtSaveWizard,
  DotArt3DPreviewModal,
  DotArtExportModal,
  DotArtSizeModal,
} from '@/components/user';

type Tool = 'pen' | 'eraser' | 'fill' | 'pick';

interface HistoryEntry {
  pixels: string[][];
}

// Create empty pixel grid
const createEmptyGrid = (size: number): string[][] => {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(''));
};

export default function DotArtCreatePage() {
  const router = useRouter();

  // Canvas state
  const [canvasSize, setCanvasSize] = useState(32);
  const [pixels, setPixels] = useState<string[][]>(() => createEmptyGrid(32));
  const [projectName, setProjectName] = useState('새 작품');

  // Tool state
  const [selectedTool, setSelectedTool] = useState<Tool>('pen');
  const [selectedColor, setSelectedColor] = useState('#F8F8F8');
  const [selectedColorId, setSelectedColorId] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [showColorIds, setShowColorIds] = useState(false);

  // Feature state
  const [musicMode, setMusicMode] = useState(false);
  const [isTracePlaying, setIsTracePlaying] = useState(false);

  // History for undo/redo
  const [history, setHistory] = useState<HistoryEntry[]>([{ pixels: createEmptyGrid(32) }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Modal states
  const [isSaveWizardOpen, setIsSaveWizardOpen] = useState(false);
  const [is3DPreviewOpen, setIs3DPreviewOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState({ message: '', isVisible: false });

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
    setTimeout(() => setToast({ message: '', isVisible: false }), 2000);
  };

  // Count used colors
  const usedColorsCount = new Set(
    pixels.flat().filter((color) => color !== '')
  ).size;

  // Push to history
  const pushHistory = useCallback(
    (newPixels: string[][]) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ pixels: newPixels.map((row) => [...row]) });
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex]
  );

  // Handle pixel change
  const handlePixelChange = useCallback(
    (x: number, y: number, color: string) => {
      setPixels((prev) => {
        const newPixels = prev.map((row) => [...row]);
        newPixels[y][x] = color;
        return newPixels;
      });
    },
    []
  );

  // Commit changes to history (on mouse up)
  const commitToHistory = useCallback(() => {
    pushHistory(pixels);
  }, [pixels, pushHistory]);

  // Handle color pick
  const handleColorPick = useCallback((color: string) => {
    setSelectedColor(color);
    setSelectedTool('pen');
    showToast(`색상 선택: ${color}`);
  }, []);

  // Undo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPixels(history[historyIndex - 1].pixels.map((row) => [...row]));
      showToast('실행 취소');
    }
  }, [history, historyIndex]);

  // Redo
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPixels(history[historyIndex + 1].pixels.map((row) => [...row]));
      showToast('다시 실행');
    }
  }, [history, historyIndex]);

  // Clear canvas
  const handleClear = useCallback(() => {
    const emptyGrid = createEmptyGrid(canvasSize);
    setPixels(emptyGrid);
    pushHistory(emptyGrid);
    showToast('캔버스가 초기화되었습니다');
  }, [canvasSize, pushHistory]);

  // Rotate canvas 90 degrees clockwise
  const handleRotate = useCallback(() => {
    setPixels((prev) => {
      const size = prev.length;
      const rotated = createEmptyGrid(size);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          rotated[x][size - 1 - y] = prev[y][x];
        }
      }
      return rotated;
    });
    showToast('시계방향 90도 회전');
  }, []);

  // Flip horizontal
  const handleFlipH = useCallback(() => {
    setPixels((prev) => prev.map((row) => [...row].reverse()));
    showToast('좌우 반전');
  }, []);

  // Flip vertical
  const handleFlipV = useCallback(() => {
    setPixels((prev) => [...prev].reverse().map((row) => [...row]));
    showToast('상하 반전');
  }, []);

  // Change canvas size
  const handleSizeChange = useCallback(
    (newSize: number) => {
      if (newSize !== canvasSize) {
        const newGrid = createEmptyGrid(newSize);
        // Copy existing pixels if possible
        const minSize = Math.min(canvasSize, newSize);
        for (let y = 0; y < minSize; y++) {
          for (let x = 0; x < minSize; x++) {
            newGrid[y][x] = pixels[y]?.[x] || '';
          }
        }
        setCanvasSize(newSize);
        setPixels(newGrid);
        setHistory([{ pixels: newGrid.map((row) => [...row]) }]);
        setHistoryIndex(0);
        showToast(`캔버스 크기: ${newSize}x${newSize}`);
      }
    },
    [canvasSize, pixels]
  );

  // Color select
  const handleColorSelect = useCallback((color: string, id: number) => {
    setSelectedColor(color);
    setSelectedColorId(id);
  }, []);

  // Export PNG
  const handleExportPNG = useCallback(() => {
    // Create canvas for export
    const canvas = document.createElement('canvas');
    const cellSize = 16;
    canvas.width = canvasSize * cellSize;
    canvas.height = canvasSize * cellSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw pixels
    for (let y = 0; y < canvasSize; y++) {
      for (let x = 0; x < canvasSize; x++) {
        const color = pixels[y]?.[x];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }

    // Download
    const link = document.createElement('a');
    link.download = `${projectName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('PNG 내보내기 완료');
  }, [canvasSize, pixels, projectName]);

  // Export block guide
  const handleExportBlockGuide = useCallback(() => {
    showToast('블록 가이드 내보내기 준비 중...');
  }, []);

  // Save wizard
  const handleSave = useCallback(
    (data: any) => {
      console.log('Saving:', { ...data, pixels, canvasSize });
      showToast('저장 완료!');
    },
    [pixels, canvasSize]
  );

  // Import image
  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const img = new Image();
      img.onload = () => {
        // Create canvas for resizing
        const canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw resized image
        ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);

        // Convert to pixel array
        const newPixels = createEmptyGrid(canvasSize);
        for (let y = 0; y < canvasSize; y++) {
          for (let x = 0; x < canvasSize; x++) {
            const i = (y * canvasSize + x) * 4;
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const a = imageData.data[i + 3];

            if (a > 128) {
              newPixels[y][x] = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
            }
          }
        }

        setPixels(newPixels);
        pushHistory(newPixels);
        showToast('이미지를 가져왔습니다');
      };
      img.src = URL.createObjectURL(file);
    };
    input.click();
  }, [canvasSize, pushHistory]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          handleUndo();
        } else if (e.key === 'y') {
          e.preventDefault();
          handleRedo();
        }
      } else {
        switch (e.key.toLowerCase()) {
          case 'p':
            setSelectedTool('pen');
            break;
          case 'e':
            setSelectedTool('eraser');
            break;
          case 'g':
            setSelectedTool('fill');
            break;
          case 'i':
            setSelectedTool('pick');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Back handler
  const handleBack = useCallback(() => {
    if (
      confirm('작업 중인 내용이 저장되지 않을 수 있습니다. 나가시겠습니까?')
    ) {
      router.push('/dotart');
    }
  }, [router]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#1a1a2e]">
      {/* Top Toolbar */}
      <DotArtToolbar
        projectName={projectName}
        canvasSize={canvasSize}
        selectedTool={selectedTool}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onProjectNameChange={setProjectName}
        onSizeClick={() => setIsSizeModalOpen(true)}
        onToolSelect={setSelectedTool}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        onImport={handleImport}
        onExport={() => setIsExportModalOpen(true)}
        on3DView={() => setIs3DPreviewOpen(true)}
        onSave={() => setIsSaveWizardOpen(true)}
        onBack={handleBack}
      />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side Tools */}
        <DotArtSideTools
          selectedTool={selectedTool}
          showColorIds={showColorIds}
          onToolSelect={setSelectedTool}
          onToggleColorIds={() => setShowColorIds(!showColorIds)}
        />

        {/* Canvas Area */}
        <DotArtCanvas
          canvasSize={canvasSize}
          pixels={pixels}
          selectedColor={selectedColor}
          tool={selectedTool}
          showGrid={showGrid}
          onPixelChange={handlePixelChange}
          onColorPick={handleColorPick}
          onRotate={handleRotate}
          onFlipH={handleFlipH}
          onFlipV={handleFlipV}
          onGridToggle={setShowGrid}
        />

        {/* Right Panel */}
        <DotArtRightPanel
          selectedColor={selectedColor}
          selectedColorId={selectedColorId}
          canvasSize={canvasSize}
          musicMode={musicMode}
          showColorIds={showColorIds}
          usedColorsCount={usedColorsCount}
          onColorSelect={handleColorSelect}
          onColorInputChange={(color) => {
            setSelectedColor(color);
          }}
          onSizeSelect={(size) => {
            setIsSizeModalOpen(true);
          }}
          onMusicModeToggle={setMusicMode}
          onTracePlay={() => setIsTracePlaying(true)}
          onTraceStop={() => setIsTracePlaying(false)}
          isTracePlaying={isTracePlaying}
        />
      </div>

      {/* Modals */}
      <DotArtSaveWizard
        isOpen={isSaveWizardOpen}
        onClose={() => setIsSaveWizardOpen(false)}
        onSave={handleSave}
        onContinueEditing={() => setIsSaveWizardOpen(false)}
        onGoToGallery={() => router.push('/dotart')}
        defaultTitle={projectName}
      />

      <DotArt3DPreviewModal
        isOpen={is3DPreviewOpen}
        onClose={() => setIs3DPreviewOpen(false)}
        pixels={pixels}
        canvasSize={canvasSize}
      />

      <DotArtExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExportPNG={handleExportPNG}
        onExportBlockGuide={handleExportBlockGuide}
      />

      <DotArtSizeModal
        isOpen={isSizeModalOpen}
        currentSize={canvasSize}
        onClose={() => setIsSizeModalOpen(false)}
        onApply={handleSizeChange}
      />

      {/* Toast */}
      {toast.isVisible && (
        <div className="fixed bottom-24 left-1/2 z-[1001] -translate-x-1/2 rounded-3xl bg-[#252542] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          {toast.message}
        </div>
      )}
    </div>
  );
}
