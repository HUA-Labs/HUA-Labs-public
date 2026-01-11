"use client";

/**
 * Editor Toolbar
 *
 * 상단 툴바 - undo/redo, zoom, save 등
 */

import { useState, useRef, useEffect } from "react";
import { Icon, Button, cn } from "@hua-labs/ui";
import {
  useEditorStore,
  useViewport,
  useHistoryStore,
  useCanUndo,
  useCanRedo,
  performUndo,
  performRedo,
  useProjectStore,
  useCurrentProject,
  useContextStore,
  useContextPanelOpen,
  useHueTranslation,
} from "@/store";
import { SettingsModal } from "@/components/settings";
import { generateCode } from "@/lib/code-generator";

type ViewportSize = "mobile" | "tablet" | "desktop";

/**
 * Context Panel 토글 버튼
 */
function ContextPanelToggle() {
  const isPanelOpen = useContextPanelOpen();
  const { togglePanel } = useContextStore();
  const { t } = useHueTranslation();

  return (
    <Button
      variant={isPanelOpen ? "secondary" : "ghost"}
      size="sm"
      onClick={togglePanel}
      title={`${t.panels.context} (C)`}
    >
      <Icon name="zap" size={16} />
      <span className="ml-1.5 text-xs">{t.panels.context}</span>
    </Button>
  );
}

interface EditorToolbarProps {
  onToggleSchemaViewer?: () => void;
  schemaViewerOpen?: boolean;
  onTogglePreview?: () => void;
  viewportSize?: ViewportSize;
  onViewportSizeChange?: (size: ViewportSize) => void;
}

export function EditorToolbar({
  onToggleSchemaViewer,
  schemaViewerOpen,
  onTogglePreview,
  viewportSize = "desktop",
  onViewportSizeChange,
}: EditorToolbarProps) {
  const { zoomIn, zoomOut, resetZoom, schema } = useEditorStore();
  const viewport = useViewport();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const currentProject = useCurrentProject();
  const { saveProject, exportToJson, renameProject } = useProjectStore();
  const hasUnsavedChanges = useHistoryStore((s) => s.hasUnsavedChanges());
  const { t } = useHueTranslation();

  // 설정 모달 상태
  const [settingsOpen, setSettingsOpen] = useState(false);

  // 프로젝트 이름 편집 상태
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingName]);

  const handleStartEdit = () => {
    if (currentProject) {
      setEditName(currentProject.name);
      setIsEditingName(true);
    }
  };

  const handleFinishEdit = () => {
    if (currentProject && editName.trim()) {
      renameProject(currentProject.id, editName.trim());
    }
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFinishEdit();
    } else if (e.key === "Escape") {
      setIsEditingName(false);
    }
  };

  const handleSave = () => {
    saveProject();
  };

  // 내보내기 드롭다운 상태
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target as Node)) {
        setExportMenuOpen(false);
      }
    };
    if (exportMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [exportMenuOpen]);

  // 클립보드 복사
  const handleCopyToClipboard = async () => {
    const json = exportToJson();
    try {
      await navigator.clipboard.writeText(json);
      setCopyFeedback(t.toast.copied);
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback(t.common.error);
      setTimeout(() => setCopyFeedback(null), 2000);
    }
    setExportMenuOpen(false);
  };

  // 파일 다운로드
  const handleDownload = () => {
    const json = exportToJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentProject?.name || "schema"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportMenuOpen(false);
  };

  // React 스니펫 복사 (SDUI)
  const handleCopyReactSnippet = async () => {
    const componentName = (currentProject?.name || "MyPage")
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/^[0-9]/, "_") || "GeneratedPage";

    const code = generateCode(schema, {
      format: "react-snippet",
      componentName,
    });

    try {
      await navigator.clipboard.writeText(code);
      setCopyFeedback("SDUI Snippet 복사됨");
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback(t.common.error);
      setTimeout(() => setCopyFeedback(null), 2000);
    }
    setExportMenuOpen(false);
  };

  // React Component 코드 복사
  const handleCopyReactComponent = async () => {
    const componentName = (currentProject?.name || "MyPage")
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/^[0-9]/, "_") || "GeneratedComponent";

    const code = generateCode(schema, {
      format: "react-component",
      componentName,
    });

    try {
      await navigator.clipboard.writeText(code);
      setCopyFeedback("React Component 복사됨");
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback(t.common.error);
      setTimeout(() => setCopyFeedback(null), 2000);
    }
    setExportMenuOpen(false);
  };

  // Next.js Page 코드 복사
  const handleCopyNextJSPage = async () => {
    const componentName = (currentProject?.name || "MyPage")
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/^[0-9]/, "_") || "GeneratedPage";

    const code = generateCode(schema, {
      format: "nextjs-page",
      componentName,
    });

    try {
      await navigator.clipboard.writeText(code);
      setCopyFeedback("Next.js Page 복사됨");
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback(t.common.error);
      setTimeout(() => setCopyFeedback(null), 2000);
    }
    setExportMenuOpen(false);
  };

  const zoomPercent = Math.round(viewport.zoom * 100);

  return (
    <>
      <header className="h-12 bg-card flex items-center px-4 gap-2">
        {/* 로고 */}
        <div className="flex items-center gap-2 mr-4">
          <Icon name="edit" size={20} className="text-primary" />
          <span className="font-semibold">{t.app.name}</span>
          {currentProject && (
            <>
              <span className="text-muted-foreground">/</span>
              {isEditingName ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={handleFinishEdit}
                  onKeyDown={handleKeyDown}
                  className="text-sm bg-transparent border-b border-primary outline-none px-1 min-w-[100px]"
                />
              ) : (
                <button
                  onClick={handleStartEdit}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  title={t.toolbar.projectName}
                >
                  {currentProject.name}
                </button>
              )}
              {hasUnsavedChanges && (
                <span className="w-2 h-2 rounded-full bg-primary" title={t.project.modified} />
              )}
            </>
          )}
        </div>

        <div className="flex-1" />

        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={performUndo}
            disabled={!canUndo}
            title={`${t.toolbar.undo} (Ctrl+Z)`}
          >
            <Icon name="arrowLeft" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={performRedo}
            disabled={!canRedo}
            title={`${t.toolbar.redo} (Ctrl+Y)`}
          >
            <Icon name="arrowRight" size={16} />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        {/* Zoom */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={zoomOut} title="Zoom Out">
            <Icon name="search" size={16} />
          </Button>
          <button
            className="text-xs text-muted-foreground w-14 text-center hover:text-foreground"
            onClick={resetZoom}
            title="Reset Zoom"
          >
            {zoomPercent}%
          </button>
          <Button variant="ghost" size="sm" onClick={zoomIn} title="Zoom In">
            <Icon name="search" size={16} />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        {/* 반응형 뷰포트 */}
        <div className="flex items-center gap-0.5 bg-muted/50 rounded-md p-0.5">
          <Button
            variant={viewportSize === "mobile" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onViewportSizeChange?.("mobile")}
            title={`${t.canvas.mobile} (375px)`}
            className="h-7 px-2"
          >
            <Icon name="phone" size={14} />
          </Button>
          <Button
            variant={viewportSize === "tablet" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onViewportSizeChange?.("tablet")}
            title={`${t.canvas.tablet} (768px)`}
            className="h-7 px-2"
          >
            <Icon name="book" size={14} />
          </Button>
          <Button
            variant={viewportSize === "desktop" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onViewportSizeChange?.("desktop")}
            title={`${t.canvas.desktop}`}
            className="h-7 px-2"
          >
            <Icon name="monitor" size={14} />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        {/* 미리보기 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onTogglePreview}
          title={`${t.toolbar.preview} (P)`}
        >
          <Icon name="eye" size={16} />
          <span className="ml-1.5 text-xs">{t.toolbar.preview}</span>
        </Button>

        {/* JSON 토글 */}
        <Button
          variant={schemaViewerOpen ? "secondary" : "ghost"}
          size="sm"
          onClick={onToggleSchemaViewer}
          title={t.panels.schema}
        >
          <Icon name="fileText" size={16} />
          <span className="ml-1.5 text-xs">JSON</span>
        </Button>

        {/* Context Panel 토글 */}
        <ContextPanelToggle />

        <div className="w-px h-6 bg-border mx-2" />

        {/* 저장 & 내보내기 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          disabled={!currentProject}
          title={`${t.toolbar.save} (Ctrl+S)`}
        >
          <Icon name="save" size={16} />
          <span className="ml-1.5 text-xs">{t.toolbar.save}</span>
        </Button>
        {/* 내보내기 드롭다운 */}
        <div className="relative" ref={exportMenuRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExportMenuOpen(!exportMenuOpen)}
            title={t.toolbar.export}
          >
            <Icon name="download" size={16} />
            <span className="ml-1.5 text-xs">{t.toolbar.export}</span>
            <Icon name="chevronDown" size={12} className="ml-1" />
          </Button>

          {/* 드롭다운 메뉴 */}
          {exportMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-md shadow-lg z-50 py-1">
              <div className="px-3 py-1.5 text-xs text-muted-foreground font-medium">JSON</div>
              <button
                onClick={handleCopyToClipboard}
                className="w-full px-3 py-2 text-sm text-left hover:bg-muted flex items-center gap-2"
              >
                <Icon name="copy" size={14} />
                {t.export.copyToClipboard}
              </button>
              <button
                onClick={handleDownload}
                className="w-full px-3 py-2 text-sm text-left hover:bg-muted flex items-center gap-2"
              >
                <Icon name="download" size={14} />
                {t.export.download}
              </button>
              <div className="my-1 border-t border-border" />
              <div className="px-3 py-1.5 text-xs text-muted-foreground font-medium">코드 생성</div>
              <button
                onClick={handleCopyReactComponent}
                className="w-full px-3 py-2 text-sm text-left hover:bg-muted flex items-center gap-2"
              >
                <Icon name="zap" size={14} />
                React Component
              </button>
              <button
                onClick={handleCopyNextJSPage}
                className="w-full px-3 py-2 text-sm text-left hover:bg-muted flex items-center gap-2"
              >
                <Icon name="monitor" size={14} />
                Next.js Page
              </button>
              <button
                onClick={handleCopyReactSnippet}
                className="w-full px-3 py-2 text-sm text-left hover:bg-muted flex items-center gap-2"
              >
                <Icon name="fileText" size={14} />
                SDUI Snippet
              </button>
            </div>
          )}

          {/* 복사 피드백 토스트 */}
          {copyFeedback && (
            <div className="absolute right-0 top-full mt-1 px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-md shadow-lg whitespace-nowrap">
              {copyFeedback}
            </div>
          )}
        </div>

        {/* 설정 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSettingsOpen(true)}
          title={t.toolbar.settings}
        >
          <Icon name="settings" size={16} />
        </Button>
      </header>

      {/* 설정 모달 */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}

export default EditorToolbar;
