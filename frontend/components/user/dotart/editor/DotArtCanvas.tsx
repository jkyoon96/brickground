'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import {
  ZoomOut,
  ZoomIn,
  Maximize2,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface DotArtCanvasProps {
  canvasSize: number;
  pixels: string[][];
  selectedColor: string;
  tool: 'pen' | 'eraser' | 'fill' | 'pick';
  showGrid: boolean;
  onPixelChange: (x: number, y: number, color: string) => void;
  onColorPick: (color: string) => void;
  onRotate: () => void;
  onFlipH: () => void;
  onFlipV: () => void;
  onGridToggle: (show: boolean) => void;
}

export function DotArtCanvas({
  canvasSize,
  pixels,
  selectedColor,
  tool,
  showGrid,
  onPixelChange,
  onColorPick,
  onRotate,
  onFlipH,
  onFlipV,
  onGridToggle,
}: DotArtCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(100);
  const [isDrawing, setIsDrawing] = useState(false);

  const CELL_SIZE = 16;
  const canvasPixelSize = canvasSize * CELL_SIZE;

  // Draw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#252542';
    ctx.fillRect(0, 0, canvasPixelSize, canvasPixelSize);

    // Draw pixels
    for (let y = 0; y < canvasSize; y++) {
      for (let x = 0; x < canvasSize; x++) {
        const color = pixels[y]?.[x];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = 'rgba(128, 128, 128, 0.3)';
      ctx.lineWidth = 1;

      for (let i = 0; i <= canvasSize; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvasPixelSize);
        ctx.stroke();

        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvasPixelSize, i * CELL_SIZE);
        ctx.stroke();
      }

      // Major grid lines every 8 cells
      ctx.strokeStyle = 'rgba(128, 128, 128, 0.7)';
      for (let i = 0; i <= canvasSize; i += 8) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvasPixelSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvasPixelSize, i * CELL_SIZE);
        ctx.stroke();
      }
    }
  }, [canvasSize, canvasPixelSize, pixels, showGrid]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Handle mouse events
  const getPixelCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL_SIZE);
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL_SIZE);

    if (x >= 0 && x < canvasSize && y >= 0 && y < canvasSize) {
      return { x, y };
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    handleDraw(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    handleDraw(e);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getPixelCoords(e);
    if (!coords) return;

    const { x, y } = coords;

    switch (tool) {
      case 'pen':
        onPixelChange(x, y, selectedColor);
        break;
      case 'eraser':
        onPixelChange(x, y, '');
        break;
      case 'pick':
        const color = pixels[y]?.[x];
        if (color) {
          onColorPick(color);
        }
        break;
      case 'fill':
        // Fill is handled on click only
        if (e.type === 'mousedown') {
          floodFill(x, y, selectedColor);
        }
        break;
    }
  };

  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const targetColor = pixels[startY]?.[startX] || '';
    if (targetColor === fillColor) return;

    const stack: [number, number][] = [[startX, startY]];
    const visited = new Set<string>();

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      const key = `${x},${y}`;

      if (visited.has(key)) continue;
      if (x < 0 || x >= canvasSize || y < 0 || y >= canvasSize) continue;

      const currentColor = pixels[y]?.[x] || '';
      if (currentColor !== targetColor) continue;

      visited.add(key);
      onPixelChange(x, y, fillColor);

      stack.push([x + 1, y]);
      stack.push([x - 1, y]);
      stack.push([x, y + 1]);
      stack.push([x, y - 1]);
    }
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 25));
  const handleFit = () => setZoom(100);

  const cursorStyle =
    tool === 'pen' || tool === 'eraser' || tool === 'fill'
      ? 'crosshair'
      : tool === 'pick'
        ? 'copy'
        : 'default';

  return (
    <div
      ref={containerRef}
      className="relative flex flex-1 items-center justify-center overflow-hidden"
      style={{
        background: `
          linear-gradient(45deg, #1e1e32 25%, transparent 25%),
          linear-gradient(-45deg, #1e1e32 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #1e1e32 75%),
          linear-gradient(-45deg, transparent 75%, #1e1e32 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      }}
    >
      {/* Canvas Container */}
      <div
        className="relative origin-center"
        style={{ transform: `scale(${zoom / 100})` }}
      >
        <canvas
          ref={canvasRef}
          width={canvasPixelSize}
          height={canvasPixelSize}
          style={{ cursor: cursorStyle }}
          className="rounded border-2 border-gray-600 shadow-[0_0_40px_rgba(155,93,229,0.2)]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>

      {/* Canvas Controls */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-3xl bg-[#252542] p-2 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          title="축소"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
        >
          <ZoomOut className="h-[18px] w-[18px]" />
        </Button>
        <span className="flex min-w-[60px] items-center justify-center px-4 text-sm font-semibold text-[#a0a0b0]">
          {zoom}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          title="확대"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
        >
          <ZoomIn className="h-[18px] w-[18px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFit}
          title="화면에 맞추기"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
        >
          <Maximize2 className="h-[18px] w-[18px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRotate}
          title="시계방향 90도 회전"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
        >
          <RotateCw className="h-[18px] w-[18px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onFlipH}
          title="좌우반전"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
        >
          <FlipHorizontal className="h-[18px] w-[18px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onFlipV}
          title="상하반전"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
        >
          <FlipVertical className="h-[18px] w-[18px]" />
        </Button>
      </div>

      {/* Grid Toggle */}
      <div className="absolute right-6 top-6 flex items-center gap-2 rounded-[20px] bg-[#252542] px-4 py-2">
        <span className="text-[13px] text-[#a0a0b0]">그리드</span>
        <label className="relative h-6 w-11 cursor-pointer">
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => onGridToggle(e.target.checked)}
            className="peer sr-only"
          />
          <span
            className={cn(
              'absolute inset-0 rounded-3xl transition-colors',
              showGrid ? 'bg-[#9B5DE5]' : 'bg-[#3d3d5c]'
            )}
          />
          <span
            className={cn(
              'absolute bottom-[3px] left-[3px] h-[18px] w-[18px] rounded-full bg-white transition-transform',
              showGrid && 'translate-x-5'
            )}
          />
        </label>
      </div>
    </div>
  );
}

export default DotArtCanvas;
