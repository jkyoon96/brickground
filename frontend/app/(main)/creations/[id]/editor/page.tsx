'use client';

import { useState, useCallback } from 'react';
import {
  CreationEditorToolbar,
  CreationElementPanel,
  Creation3DCanvas,
  CreationPropertiesPanel,
  CreationExportModal,
  CreationSaveWizard,
} from '@/components/user';

type EditMode = 'select' | 'translate' | 'rotate' | 'scale';
type ExportFormat = 'png' | 'gltf' | 'stl' | 'obj';

interface SceneObject {
  id: string;
  type: string;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  visible: boolean;
}

interface Transform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

const defaultTransform: Transform = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
};

export default function CreationEditorPage() {
  // Project state
  const [projectName, setProjectName] = useState('새 프로젝트');
  const [editMode, setEditMode] = useState<EditMode>('select');

  // Scene state
  const [objects, setObjects] = useState<SceneObject[]>([
    {
      id: '1',
      type: 'box',
      name: '큐브 1',
      position: [0, 0.5, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#00CEC9',
      visible: true,
    },
  ]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>('1');
  const [showGrid, setShowGrid] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#00CEC9');

  // Modal state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSaveWizardOpen, setIsSaveWizardOpen] = useState(false);

  // History state (for undo/redo)
  const [history, setHistory] = useState<SceneObject[][]>([objects]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Get selected object
  const selectedObject = objects.find((obj) => obj.id === selectedObjectId);
  const selectedTransform: Transform = selectedObject
    ? {
        position: selectedObject.position,
        rotation: selectedObject.rotation,
        scale: selectedObject.scale,
      }
    : defaultTransform;

  // Layers for properties panel
  const layers = objects.map((obj) => ({
    id: obj.id,
    name: obj.name,
    type: obj.type,
    visible: obj.visible,
  }));

  // Save to history
  const saveToHistory = useCallback(
    (newObjects: SceneObject[]) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newObjects);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex]
  );

  // Handlers
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setObjects(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setObjects(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const handleCopy = useCallback(() => {
    if (!selectedObject) return;
    const newObject: SceneObject = {
      ...selectedObject,
      id: Date.now().toString(),
      name: `${selectedObject.name} (복사본)`,
      position: [
        selectedObject.position[0] + 1,
        selectedObject.position[1],
        selectedObject.position[2],
      ],
    };
    const newObjects = [...objects, newObject];
    setObjects(newObjects);
    saveToHistory(newObjects);
    setSelectedObjectId(newObject.id);
  }, [objects, selectedObject, saveToHistory]);

  const handleDelete = useCallback(() => {
    if (!selectedObjectId) return;
    const newObjects = objects.filter((obj) => obj.id !== selectedObjectId);
    setObjects(newObjects);
    saveToHistory(newObjects);
    setSelectedObjectId(newObjects.length > 0 ? newObjects[0].id : null);
  }, [objects, selectedObjectId, saveToHistory]);

  const handleAddElement = useCallback(
    (shapeId: string) => {
      const shapeNames: Record<string, string> = {
        box: '큐브',
        sphere: '구',
        cylinder: '원기둥',
        cone: '콘',
        torus: '토러스',
        plane: '평면',
        dodecahedron: '12면체',
        icosahedron: '20면체',
      };

      const newObject: SceneObject = {
        id: Date.now().toString(),
        type: shapeId,
        name: `${shapeNames[shapeId] || shapeId} ${objects.length + 1}`,
        position: [0, 0.5, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        color: selectedColor,
        visible: true,
      };

      const newObjects = [...objects, newObject];
      setObjects(newObjects);
      saveToHistory(newObjects);
      setSelectedObjectId(newObject.id);
    },
    [objects, selectedColor, saveToHistory]
  );

  const handleColorChange = useCallback(
    (color: string) => {
      setSelectedColor(color);
      if (!selectedObjectId) return;

      const newObjects = objects.map((obj) =>
        obj.id === selectedObjectId ? { ...obj, color } : obj
      );
      setObjects(newObjects);
      saveToHistory(newObjects);
    },
    [objects, selectedObjectId, saveToHistory]
  );

  const handleTransformChange = useCallback(
    (transform: Transform) => {
      if (!selectedObjectId) return;

      const newObjects = objects.map((obj) =>
        obj.id === selectedObjectId
          ? {
              ...obj,
              position: transform.position,
              rotation: transform.rotation,
              scale: transform.scale,
            }
          : obj
      );
      setObjects(newObjects);
      saveToHistory(newObjects);
    },
    [objects, selectedObjectId, saveToHistory]
  );

  const handleLayerSelect = useCallback((id: string) => {
    setSelectedObjectId(id);
  }, []);

  const handleLayerVisibilityToggle = useCallback(
    (id: string) => {
      const newObjects = objects.map((obj) =>
        obj.id === id ? { ...obj, visible: !obj.visible } : obj
      );
      setObjects(newObjects);
      saveToHistory(newObjects);
    },
    [objects, saveToHistory]
  );

  const handleLayerDelete = useCallback(
    (id: string) => {
      const newObjects = objects.filter((obj) => obj.id !== id);
      setObjects(newObjects);
      saveToHistory(newObjects);
      if (selectedObjectId === id) {
        setSelectedObjectId(newObjects.length > 0 ? newObjects[0].id : null);
      }
    },
    [objects, selectedObjectId, saveToHistory]
  );

  const handleLayerRename = useCallback(
    (id: string, name: string) => {
      const newObjects = objects.map((obj) =>
        obj.id === id ? { ...obj, name } : obj
      );
      setObjects(newObjects);
    },
    [objects]
  );

  const handleAddLayer = useCallback(() => {
    handleAddElement('box');
  }, [handleAddElement]);

  const handleExport = useCallback((format: ExportFormat) => {
    console.log('Exporting as:', format);
    // TODO: Implement actual export functionality
    setIsExportModalOpen(false);
  }, []);

  const handleSave = useCallback(
    (data: {
      title: string;
      description: string;
      category: string;
      tags: string[];
      visibility: string;
      allowComments: boolean;
      allowDownload: boolean;
      licenseType: string;
    }) => {
      console.log('Saving creation:', data);
      // TODO: Implement actual save functionality
      setIsSaveWizardOpen(false);
    },
    []
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#1a1a2e]">
      {/* Toolbar */}
      <CreationEditorToolbar
        projectName={projectName}
        onProjectNameChange={setProjectName}
        onUndo={handleUndo}
        onRedo={handleRedo}
        editMode={editMode}
        onEditModeChange={setEditMode}
        onCopy={handleCopy}
        onDelete={handleDelete}
        onExport={() => setIsExportModalOpen(true)}
        onSave={() => setIsSaveWizardOpen(true)}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Elements */}
        <CreationElementPanel onAddElement={handleAddElement} />

        {/* Center - 3D Canvas */}
        <Creation3DCanvas
          objects={objects.filter((obj) => obj.visible)}
          selectedObjectId={selectedObjectId}
          showGrid={showGrid}
          onSelectObject={setSelectedObjectId}
          onShowGridChange={setShowGrid}
        />

        {/* Right Panel - Properties */}
        <CreationPropertiesPanel
          selectedColor={selectedColor}
          transform={selectedTransform}
          layers={layers}
          selectedLayerId={selectedObjectId}
          onColorChange={handleColorChange}
          onTransformChange={handleTransformChange}
          onLayerSelect={handleLayerSelect}
          onLayerVisibilityToggle={handleLayerVisibilityToggle}
          onLayerDelete={handleLayerDelete}
          onLayerRename={handleLayerRename}
          onAddLayer={handleAddLayer}
        />
      </div>

      {/* Export Modal */}
      <CreationExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />

      {/* Save Wizard */}
      <CreationSaveWizard
        isOpen={isSaveWizardOpen}
        onClose={() => setIsSaveWizardOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
