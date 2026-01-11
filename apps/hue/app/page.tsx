"use client";

/**
 * SDUI Visual Editor - 메인 페이지
 *
 * 드래그앤드롭으로 UI를 만들고 JSON 스키마로 내보내는 비주얼 에디터
 */

import { useEffect, useState, useRef } from "react";
import { Icon, cn } from "@hua-labs/ui";
import { EditorLayout, Canvas, PreviewCanvas } from "@/components/editor";
import { EditorToolbar } from "@/components/toolbar";
import { ComponentPalette, ComponentTree, PropertiesPanel, ContextPanel, TemplatePalette } from "@/components/panels";
import { useEditorStore, setupHistorySync, useProjectStore, useContextPanelOpen } from "@/store";

const AUTO_SAVE_DELAY = 1000; // 1초 디바운스

type LeftPanelTab = "components" | "templates" | "layers";

/**
 * 왼쪽 패널 (컴포넌트 + 템플릿 + 레이어 탭)
 */
function LeftPanel() {
  const [activeTab, setActiveTab] = useState<LeftPanelTab>("components");

  return (
    <div className="h-full flex flex-col">
      {/* 탭 헤더 */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("components")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors",
            activeTab === "components"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon name="square" size={14} />
          컴포넌트
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors",
            activeTab === "templates"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon name="bookmark" size={14} />
          템플릿
        </button>
        <button
          onClick={() => setActiveTab("layers")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors",
            activeTab === "layers"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon name="menu" size={14} />
          레이어
        </button>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "components" && <ComponentPalette />}
        {activeTab === "templates" && <TemplatePalette />}
        {activeTab === "layers" && <ComponentTree />}
      </div>
    </div>
  );
}

/**
 * JSON 스키마 뷰어 (하단 패널)
 */
function SchemaViewer() {
  const schema = useEditorStore((s) => s.schema);
  const { exportToJson } = useProjectStore();

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
          {exportToJson()}
        </pre>
      </div>
    </div>
  );
}

type EditorMode = "edit" | "preview";
type ViewportSize = "mobile" | "tablet" | "desktop";

const VIEWPORT_WIDTHS: Record<ViewportSize, number | null> = {
  mobile: 375,
  tablet: 768,
  desktop: null, // null = 전체 너비
};

export default function EditorPage() {
  const [schemaViewerOpen, setSchemaViewerOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [mode, setMode] = useState<EditorMode>("edit");
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
  const contextPanelOpen = useContextPanelOpen();
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { createProject, currentProjectId, loadProject, saveProject } = useProjectStore();
  const schema = useEditorStore((s) => s.schema);

  // Hydration 체크
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 모드 전환 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // input/textarea에서는 무시
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "p" || e.key === "P") {
        setMode("preview");
      } else if (e.key === "e" || e.key === "E" || e.key === "Escape") {
        setMode("edit");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 히스토리 동기화 설정
  useEffect(() => {
    const unsubscribe = setupHistorySync();
    return () => unsubscribe();
  }, []);

  // 프로젝트가 없으면 기본 프로젝트 생성 (hydration 이후에만)
  useEffect(() => {
    if (!isHydrated) return;

    if (!currentProjectId) {
      createProject("새 프로젝트");
    } else {
      // 기존 프로젝트 로드
      loadProject(currentProjectId);
    }
  }, [isHydrated, currentProjectId, createProject, loadProject]);

  // 자동저장: schema 변경 감지
  useEffect(() => {
    if (!isHydrated || !currentProjectId) return;

    // 이전 타이머 클리어
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    // 디바운스 저장
    autoSaveTimerRef.current = setTimeout(() => {
      saveProject();
    }, AUTO_SAVE_DELAY);

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [schema, isHydrated, currentProjectId, saveProject]);

  // 미리보기 모드
  if (mode === "preview") {
    return (
      <div className="h-screen flex flex-col bg-background">
        <PreviewCanvas viewportWidth={VIEWPORT_WIDTHS[viewportSize]} />
      </div>
    );
  }

  // 편집 모드
  const viewportWidth = VIEWPORT_WIDTHS[viewportSize];

  return (
    <EditorLayout
      toolbar={
        <EditorToolbar
          onToggleSchemaViewer={() => setSchemaViewerOpen((prev) => !prev)}
          schemaViewerOpen={schemaViewerOpen}
          onTogglePreview={() => setMode("preview")}
          viewportSize={viewportSize}
          onViewportSizeChange={setViewportSize}
        />
      }
      leftPanel={<LeftPanel />}
      centerPanel={<Canvas viewportWidth={viewportWidth} />}
      rightPanel={<PropertiesPanel />}
      contextPanel={<ContextPanel />}
      contextPanelOpen={contextPanelOpen}
      bottomPanel={<SchemaViewer />}
      bottomPanelOpen={schemaViewerOpen}
    />
  );
}
