'use client';

import { useState, useCallback } from 'react';
import {
  EditorSidebarLeft,
  EditorToolbar,
  EditorSidebarRight,
  EditorStatusBar,
  EditorCanvas,
  SaveWizardModal,
} from '@/components/user';

type TransformMode = 'select' | 'translate' | 'rotate' | 'scale';

interface EditorObject {
  id: string;
  name: string;
  type: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  visible: boolean;
  assemblyLevel: number;
}

// Generate unique ID
const generateId = () => `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Initial sample objects
const initialObjects: EditorObject[] = [
  {
    id: 'sample_1',
    name: 'Box 1',
    type: 'box',
    position: [0, 0.5, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    color: '#0066FF',
    visible: true,
    assemblyLevel: 1,
  },
  {
    id: 'sample_2',
    name: 'Sphere 1',
    type: 'sphere',
    position: [2, 0.5, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    color: '#FF6B6B',
    visible: true,
    assemblyLevel: 2,
  },
];

export default function BrickArtCreatePage() {
  // Editor state
  const [objects, setObjects] = useState<EditorObject[]>(initialObjects);
  const [selectedObjectId, setSelectedObjectId] = useState<string | undefined>();
  const [transformMode, setTransformMode] = useState<TransformMode>('translate');
  const [selectedColor, setSelectedColor] = useState('#0066FF');
  const [assemblyLevelFilter, setAssemblyLevelFilter] = useState(20);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  // Undo/Redo state
  const [history, setHistory] = useState<EditorObject[][]>([initialObjects]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
    setTimeout(() => setToast({ message: '', isVisible: false }), 2000);
  };

  // Get selected object
  const selectedObject = objects.find((obj) => obj.id === selectedObjectId);

  // Add to history
  const pushHistory = useCallback((newObjects: EditorObject[]) => {
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), newObjects]);
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  // Add primitive
  const handleAddPrimitive = (type: string) => {
    const typeNames: Record<string, string> = {
      box: 'Box',
      sphere: 'Sphere',
      cylinder: 'Cylinder',
      cone: 'Cone',
      torus: 'Torus',
      plane: 'Plane',
      brick1x1: '1x1 Brick',
      brick2x1: '2x1 Brick',
      brick2x2: '2x2 Brick',
      brick4x2: '4x2 Brick',
    };

    const count = objects.filter((o) => o.type === type).length + 1;
    const newObject: EditorObject = {
      id: generateId(),
      name: `${typeNames[type] || type} ${count}`,
      type,
      position: [0, 0.5, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: selectedColor,
      visible: true,
      assemblyLevel: 0,
    };

    const newObjects = [...objects, newObject];
    setObjects(newObjects);
    setSelectedObjectId(newObject.id);
    pushHistory(newObjects);
    showToast(`${newObject.name} 추가됨`);
  };

  // Handle object transform
  const handleObjectTransform = (
    id: string,
    transform: {
      position?: [number, number, number];
      rotation?: [number, number, number];
      scale?: [number, number, number];
    }
  ) => {
    setObjects((prev) =>
      prev.map((obj) =>
        obj.id === id
          ? {
              ...obj,
              ...(transform.position && { position: transform.position }),
              ...(transform.rotation && { rotation: transform.rotation }),
              ...(transform.scale && { scale: transform.scale }),
            }
          : obj
      )
    );
  };

  // Copy selected
  const handleCopy = () => {
    if (!selectedObject) return;

    const newObject: EditorObject = {
      ...selectedObject,
      id: generateId(),
      name: `${selectedObject.name} 복사본`,
      position: [
        selectedObject.position[0] + 1,
        selectedObject.position[1],
        selectedObject.position[2],
      ],
    };

    const newObjects = [...objects, newObject];
    setObjects(newObjects);
    setSelectedObjectId(newObject.id);
    pushHistory(newObjects);
    showToast('객체 복사됨');
  };

  // Delete selected
  const handleDelete = () => {
    if (!selectedObjectId) return;

    const newObjects = objects.filter((obj) => obj.id !== selectedObjectId);
    setObjects(newObjects);
    setSelectedObjectId(undefined);
    pushHistory(newObjects);
    showToast('객체 삭제됨');
  };

  // Toggle visibility
  const handleToggleVisibility = () => {
    if (!selectedObjectId) return;

    const newObjects = objects.map((obj) =>
      obj.id === selectedObjectId ? { ...obj, visible: !obj.visible } : obj
    );
    setObjects(newObjects);
    showToast(
      objects.find((o) => o.id === selectedObjectId)?.visible
        ? '객체 숨김'
        : '객체 표시'
    );
  };

  // Toggle visibility from sidebar
  const handleObjectVisibilityToggle = (id: string) => {
    setObjects((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, visible: !obj.visible } : obj))
    );
  };

  // Delete from sidebar
  const handleObjectDelete = (id: string) => {
    const newObjects = objects.filter((obj) => obj.id !== id);
    setObjects(newObjects);
    if (selectedObjectId === id) {
      setSelectedObjectId(undefined);
    }
    pushHistory(newObjects);
    showToast('객체 삭제됨');
  };

  // Undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setObjects(history[historyIndex - 1]);
      showToast('실행 취소');
    }
  };

  // Redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setObjects(history[historyIndex + 1]);
      showToast('다시 실행');
    }
  };

  // Assembly level change
  const handleAssemblyLevelChange = (level: number) => {
    if (!selectedObjectId) return;

    setObjects((prev) =>
      prev.map((obj) =>
        obj.id === selectedObjectId ? { ...obj, assemblyLevel: level } : obj
      )
    );
  };

  // Transform change from sidebar
  const handleTransformChange = (transform: {
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number };
    scale: { x: number; y: number; z: number };
  }) => {
    if (!selectedObjectId) return;

    setObjects((prev) =>
      prev.map((obj) =>
        obj.id === selectedObjectId
          ? {
              ...obj,
              position: [transform.position.x, transform.position.y, transform.position.z],
              rotation: [transform.rotation.x, transform.rotation.y, transform.rotation.z],
              scale: [transform.scale.x, transform.scale.y, transform.scale.z],
            }
          : obj
      )
    );
  };

  // Export functions
  const handleExportPNG = () => showToast('PNG 내보내기 준비 중...');
  const handleExportGLTF = () => showToast('GLTF 내보내기 준비 중...');
  const handleExportSTL = () => showToast('STL 내보내기 준비 중...');

  // Save
  const handleSave = (data: any) => {
    console.log('Saving:', data, objects);
    showToast('저장 완료!');
  };

  // Get selected info for status bar
  const getSelectedInfo = () => {
    if (!selectedObject) return '선택 없음';
    return `${selectedObject.name} (${selectedObject.type})`;
  };

  // Scene objects for sidebar
  const sceneObjects = objects.map((obj) => ({
    id: obj.id,
    name: obj.name,
    color: obj.color,
    visible: obj.visible,
    assemblyLevel: obj.assemblyLevel,
  }));

  // Selected object for sidebar
  const selectedForSidebar = selectedObject
    ? {
        id: selectedObject.id,
        name: selectedObject.name,
        transform: {
          position: {
            x: selectedObject.position[0],
            y: selectedObject.position[1],
            z: selectedObject.position[2],
          },
          rotation: {
            x: selectedObject.rotation[0],
            y: selectedObject.rotation[1],
            z: selectedObject.rotation[2],
          },
          scale: {
            x: selectedObject.scale[0],
            y: selectedObject.scale[1],
            z: selectedObject.scale[2],
          },
        },
        assemblyLevel: selectedObject.assemblyLevel,
      }
    : undefined;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <EditorSidebarLeft
        selectedColor={selectedColor}
        onColorSelect={setSelectedColor}
        onPrimitiveAdd={handleAddPrimitive}
      />

      {/* Main Editor */}
      <div className="flex flex-1 flex-col">
        {/* Toolbar */}
        <EditorToolbar
          transformMode={transformMode}
          onTransformModeChange={setTransformMode}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onCopy={handleCopy}
          onDelete={handleDelete}
          onToggleVisibility={handleToggleVisibility}
          onFocusSelected={() => showToast('선택 객체로 이동')}
          onResetCamera={() => showToast('카메라 리셋')}
          onExportPNG={handleExportPNG}
          onExportGLTF={handleExportGLTF}
          onExportSTL={handleExportSTL}
          onSave={() => setIsSaveModalOpen(true)}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          hasSelection={!!selectedObjectId}
        />

        {/* Canvas */}
        <EditorCanvas
          objects={objects}
          selectedObjectId={selectedObjectId}
          transformMode={transformMode}
          assemblyLevelFilter={assemblyLevelFilter}
          onObjectSelect={setSelectedObjectId}
          onObjectTransform={handleObjectTransform}
        />

        {/* Status Bar */}
        <EditorStatusBar
          objectCount={objects.length}
          selectedInfo={getSelectedInfo()}
        />
      </div>

      {/* Right Sidebar */}
      <EditorSidebarRight
        selectedObject={selectedForSidebar}
        sceneObjects={sceneObjects}
        onTransformChange={handleTransformChange}
        onAssemblyLevelChange={handleAssemblyLevelChange}
        onObjectSelect={setSelectedObjectId}
        onObjectVisibilityToggle={handleObjectVisibilityToggle}
        onObjectDelete={handleObjectDelete}
        assemblyLevelFilter={assemblyLevelFilter}
        onAssemblyLevelFilterChange={setAssemblyLevelFilter}
      />

      {/* Save Wizard Modal */}
      <SaveWizardModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSave}
        objectCount={objects.length}
      />

      {/* Toast */}
      {toast.isVisible && (
        <div className="fixed bottom-20 left-1/2 z-[1000] -translate-x-1/2 rounded-lg bg-black/85 px-6 py-3 text-[13px] font-semibold text-white">
          {toast.message}
        </div>
      )}
    </div>
  );
}
