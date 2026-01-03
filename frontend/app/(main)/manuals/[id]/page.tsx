'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ManualViewerTopBar,
  ManualViewerSidebar,
  ManualViewerContent,
  ManualViewerInfoPanel,
  ManualViewerFloatingNav,
} from '@/components/user';

// Mock data
const mockManual = {
  id: '1',
  title: '레고 테크닉 람보르기니 시안 FKP 37 조립 설명서',
  productId: 'prod-123',
  totalPages: 368,
  fileSize: '45.2 MB',
  language: '한국어',
  updatedAt: '2025.12.15',
};

const mockProduct = {
  id: 'prod-123',
  name: '레고 테크닉 람보르기니 시안 FKP 37',
  price: '489,000원',
  imageGradient: 'linear-gradient(135deg, #FF6B35, #FFD93D)',
};

const mockTableOfContents = [
  { id: 'toc-1', number: 1, title: '프론트 섀시', pageRange: '1-45' },
  { id: 'toc-2', number: 2, title: '리어 섀시', pageRange: '46-120' },
  { id: 'toc-3', number: 3, title: '엔진 & 기어박스', pageRange: '121-210' },
  { id: 'toc-4', number: 4, title: '바디 조립', pageRange: '211-320' },
  { id: 'toc-5', number: 5, title: '마무리', pageRange: '321-368' },
];

const mockSteps = [
  {
    number: 1,
    title: '리어 서스펜션 조립',
    parts: [
      { name: 'Technic Beam', quantity: 2 },
      { name: 'Connector Pin', quantity: 4 },
      { name: 'Axle 6L', quantity: 1 },
    ],
  },
];

export default function ManualViewerPage() {
  const router = useRouter();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(92);
  const [zoom, setZoom] = useState(100);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTocId, setActiveTocId] = useState('toc-2');

  // Generate thumbnail pages around current page
  const thumbnailPages = useMemo(() => {
    const pages = [];
    for (let i = currentPage - 1; i <= currentPage + 3; i++) {
      if (i > 0 && i <= mockManual.totalPages) {
        pages.push({ pageNumber: i });
      }
    }
    return pages;
  }, [currentPage]);

  // Calculate progress
  const progressPercent = useMemo(() => {
    return Math.round((currentPage / mockManual.totalPages) * 100);
  }, [currentPage]);

  // Handlers
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(mockManual.totalPages, prev + 1));
  }, []);

  const handleFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleLastPage = useCallback(() => {
    setCurrentPage(mockManual.totalPages);
  }, []);

  const handleBookmark = useCallback(() => {
    setIsBookmarked((prev) => !prev);
  }, []);

  const handleSearch = useCallback(() => {
    console.log('Open search modal');
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(200, prev + 25));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(50, prev - 25));
  }, []);

  const handleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  const handleDownload = useCallback(() => {
    console.log('Download manual');
  }, []);

  const handleTocClick = useCallback((id: string) => {
    setActiveTocId(id);
    // Find the TOC item and navigate to its first page
    const tocItem = mockTableOfContents.find((item) => item.id === id);
    if (tocItem) {
      const firstPage = parseInt(tocItem.pageRange.split('-')[0], 10);
      setCurrentPage(firstPage);
    }
  }, []);

  const handleAddToCart = useCallback((productId: string) => {
    console.log('Add to cart:', productId);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#1E1E2E]">
      {/* Top Bar */}
      <ManualViewerTopBar
        title={mockManual.title}
        productLink={`/product/${mockProduct.id}`}
        currentPage={currentPage}
        totalPages={mockManual.totalPages}
        zoom={zoom}
        isSidebarOpen={isSidebarOpen}
        isBookmarked={isBookmarked}
        onBack={handleBack}
        onPageChange={handlePageChange}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onBookmark={handleBookmark}
        onSearch={handleSearch}
        onToggleSidebar={handleToggleSidebar}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFullscreen={handleFullscreen}
        onDownload={handleDownload}
      />

      {/* Main Viewer */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Thumbnails */}
        <ManualViewerSidebar
          pages={thumbnailPages}
          currentPage={currentPage}
          isOpen={isSidebarOpen}
          onPageSelect={handlePageChange}
          onClose={handleToggleSidebar}
        />

        {/* PDF Viewer Content */}
        <ManualViewerContent
          stepLabel={`STEP ${Math.floor(currentPage / 8) + 1}`}
          steps={mockSteps}
          currentPage={currentPage}
          totalPages={mockManual.totalPages}
          progressPercent={progressPercent}
          zoom={zoom}
        />

        {/* Right Info Panel */}
        <ManualViewerInfoPanel
          info={{
            totalPages: mockManual.totalPages,
            fileSize: mockManual.fileSize,
            language: mockManual.language,
            updatedAt: mockManual.updatedAt,
          }}
          product={mockProduct}
          tableOfContents={mockTableOfContents}
          activeTocId={activeTocId}
          onTocClick={handleTocClick}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Floating Navigation */}
      <ManualViewerFloatingNav
        currentPage={currentPage}
        totalPages={mockManual.totalPages}
        onFirstPage={handleFirstPage}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onLastPage={handleLastPage}
        onSliderChange={handlePageChange}
      />
    </div>
  );
}
