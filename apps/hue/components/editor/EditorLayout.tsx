"use client";

/**
 * Editor Layout
 *
 * 3패널 리사이저블 레이아웃
 * - 왼쪽: 컴포넌트 팔레트
 * - 중앙: 캔버스
 * - 오른쪽: 속성 패널
 * - 패널 폴딩 지원
 */

import { useState, useCallback, useRef, useEffect, type ReactNode } from "react";
import { cn, Icon } from "@hua-labs/ui";
import { useContextStore, useEditorStore, performUndo, performRedo } from "@/store";
import { findNodeById, cloneNode, findParentNode } from "@/lib/schema-utils";
import type { EditorNode } from "@/types";

interface EditorLayoutProps {
  /** 왼쪽 패널 (컴포넌트 팔레트) */
  leftPanel: ReactNode;
  /** 중앙 패널 (캔버스) */
  centerPanel: ReactNode;
  /** 오른쪽 패널 (속성) */
  rightPanel: ReactNode;
  /** 컨텍스트 패널 (조건부 렌더링 테스트) */
  contextPanel?: ReactNode;
  /** 컨텍스트 패널 열림 상태 */
  contextPanelOpen?: boolean;
  /** 상단 툴바 */
  toolbar?: ReactNode;
  /** 하단 패널 (JSON 뷰어) */
  bottomPanel?: ReactNode;
  /** 하단 패널 열림 상태 */
  bottomPanelOpen?: boolean;
}

/**
 * 리사이즈 핸들
 */
function ResizeHandle({
  orientation,
  onResize,
}: {
  orientation: "vertical" | "horizontal";
  onResize: (delta: number) => void;
}) {
  const isDragging = useRef(false);
  const startPos = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      startPos.current = orientation === "vertical" ? e.clientX : e.clientY;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging.current) return;
        const currentPos =
          orientation === "vertical" ? moveEvent.clientX : moveEvent.clientY;
        const delta = currentPos - startPos.current;
        startPos.current = currentPos;
        onResize(delta);
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [orientation, onResize]
  );

  return (
    <div
      className={cn(
        "flex-shrink-0 bg-border hover:bg-primary/20 transition-colors",
        orientation === "vertical"
          ? "w-1 cursor-col-resize"
          : "h-1 cursor-row-resize"
      )}
      onMouseDown={handleMouseDown}
    />
  );
}

/**
 * 패널 폴드 토글 버튼
 */
function FoldButton({
  direction,
  isOpen,
  onClick,
}: {
  direction: "left" | "right";
  isOpen: boolean;
  onClick: () => void;
}) {
  const iconName = direction === "left"
    ? (isOpen ? "chevronLeft" : "chevronRight")
    : (isOpen ? "chevronRight" : "chevronLeft");

  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10",
        "w-4 h-12 flex items-center justify-center",
        "bg-card border border-border rounded-sm",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        "transition-all duration-200",
        direction === "left" ? "-right-2" : "-left-2"
      )}
      title={isOpen ? "패널 접기" : "패널 펼치기"}
    >
      <Icon name={iconName} size={12} />
    </button>
  );
}

/**
 * 접힌 패널 복구 탭 (아이콘)
 */
function CollapsedPanelTab({
  label,
  icon,
  side,
  onClick,
}: {
  label: string;
  icon: string;
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-20",
        "flex items-center justify-center",
        "w-6 h-10",
        "bg-card border border-border",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        "transition-all duration-200",
        side === "left"
          ? "left-0 rounded-r-md border-l-0"
          : "right-0 rounded-l-md border-r-0"
      )}
      title={`${label} 패널 열기`}
    >
      <Icon
        name={side === "left" ? "chevronRight" : "chevronLeft"}
        size={14}
      />
    </button>
  );
}

/**
 * 에디터 레이아웃
 */
export function EditorLayout({
  leftPanel,
  centerPanel,
  rightPanel,
  contextPanel,
  contextPanelOpen = false,
  toolbar,
  bottomPanel,
  bottomPanelOpen = false,
}: EditorLayoutProps) {
  // 패널 너비 (픽셀)
  const [leftWidth, setLeftWidth] = useState(260);
  const [rightWidth, setRightWidth] = useState(280);
  const [contextPanelWidth] = useState(280);
  const [bottomHeight, setBottomHeight] = useState(200);

  // 패널 폴딩 상태
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  // 최소/최대 크기
  const MIN_PANEL_WIDTH = 200;
  const MAX_PANEL_WIDTH = 400;
  const MIN_BOTTOM_HEIGHT = 100;
  const MAX_BOTTOM_HEIGHT = 400;

  const handleLeftResize = useCallback((delta: number) => {
    setLeftWidth((prev) =>
      Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, prev + delta))
    );
  }, []);

  const handleRightResize = useCallback((delta: number) => {
    setRightWidth((prev) =>
      Math.max(MIN_PANEL_WIDTH, Math.min(MAX_PANEL_WIDTH, prev - delta))
    );
  }, []);

  const handleBottomResize = useCallback((delta: number) => {
    setBottomHeight((prev) =>
      Math.max(MIN_BOTTOM_HEIGHT, Math.min(MAX_BOTTOM_HEIGHT, prev - delta))
    );
  }, []);

  // 컨텍스트 패널 토글
  const { togglePanel: toggleContextPanel } = useContextStore();

  // 에디터 액션
  const selection = useEditorStore((s) => s.selection);
  const schema = useEditorStore((s) => s.schema);
  const deleteNode = useEditorStore((s) => s.deleteNode);
  const addNode = useEditorStore((s) => s.addNode);

  // 클립보드 (복사된 노드)
  const clipboardRef = useRef<EditorNode | null>(null);

  // 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // input/textarea에서는 무시
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Ctrl+Z - Undo / Ctrl+Shift+Z - Redo
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          performRedo();
        } else {
          performUndo();
        }
        return;
      }

      // Ctrl+Y - Redo (Windows 스타일)
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        performRedo();
        return;
      }

      // Delete / Backspace - 선택 노드 삭제
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selection.nodeId && selection.nodeId !== "root") {
          e.preventDefault();
          deleteNode(selection.nodeId);
        }
        return;
      }

      // Ctrl+C - 복사
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        if (selection.nodeId && selection.nodeId !== "root") {
          const node = findNodeById(schema, selection.nodeId);
          if (node) {
            clipboardRef.current = node;
            // 복사 완료 피드백 (선택적)
          }
        }
        return;
      }

      // Ctrl+V - 붙여넣기
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        if (clipboardRef.current) {
          e.preventDefault();
          const cloned = cloneNode(clipboardRef.current);
          // 선택된 노드가 있으면 그 노드의 부모에, 없으면 루트에 추가
          const targetParentId = selection.nodeId || "root";
          addNode(targetParentId, cloned);
        }
        return;
      }

      // Ctrl+D - 복제 (기존 duplicateNode 활용)
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        if (selection.nodeId && selection.nodeId !== "root") {
          e.preventDefault();
          const node = findNodeById(schema, selection.nodeId);
          if (node) {
            const parent = findParentNode(schema, selection.nodeId);
            if (parent) {
              const cloned = cloneNode(node);
              addNode(parent.id, cloned);
            }
          }
        }
        return;
      }

      // [ - 왼쪽 패널 토글
      if (e.key === "[") {
        setLeftOpen((prev) => !prev);
      }
      // ] - 오른쪽 패널 토글
      else if (e.key === "]") {
        setRightOpen((prev) => !prev);
      }
      // C - 컨텍스트 패널 토글
      else if (e.key === "c" || e.key === "C") {
        toggleContextPanel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleContextPanel, selection.nodeId, schema, deleteNode, addNode]);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* 툴바 */}
      {toolbar && (
        <div className="flex-shrink-0 border-b border-border">{toolbar}</div>
      )}

      {/* 메인 영역 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽 패널 */}
        <div
          className="relative flex-shrink-0 border-r border-border editor-panel overflow-hidden transition-all duration-300 ease-in-out"
          style={{ width: leftOpen ? leftWidth : 0 }}
        >
          <div
            className="h-full transition-opacity duration-200"
            style={{ opacity: leftOpen ? 1 : 0, width: leftWidth }}
          >
            {leftPanel}
          </div>
          <FoldButton
            direction="left"
            isOpen={leftOpen}
            onClick={() => setLeftOpen(!leftOpen)}
          />
        </div>

        {/* 왼쪽 패널 접힘 탭 */}
        {!leftOpen && (
          <CollapsedPanelTab
            label="컴포넌트"
            icon="square"
            side="left"
            onClick={() => setLeftOpen(true)}
          />
        )}

        {/* 왼쪽 리사이즈 핸들 */}
        {leftOpen && (
          <ResizeHandle orientation="vertical" onResize={handleLeftResize} />
        )}

        {/* 중앙 영역 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 캔버스 */}
          <div className="flex-1 overflow-hidden">{centerPanel}</div>

          {/* 하단 패널 토글 영역 */}
          {bottomPanel && bottomPanelOpen && (
            <>
              <ResizeHandle
                orientation="horizontal"
                onResize={handleBottomResize}
              />
              <div
                className="flex-shrink-0 border-t border-border overflow-hidden"
                style={{ height: bottomHeight }}
              >
                {bottomPanel}
              </div>
            </>
          )}
        </div>

        {/* 오른쪽 리사이즈 핸들 */}
        {rightOpen && (
          <ResizeHandle orientation="vertical" onResize={handleRightResize} />
        )}

        {/* 오른쪽 패널 접힘 탭 */}
        {!rightOpen && (
          <CollapsedPanelTab
            label="속성"
            icon="settings"
            side="right"
            onClick={() => setRightOpen(true)}
          />
        )}

        {/* 오른쪽 패널 */}
        <div
          className="relative flex-shrink-0 border-l border-border editor-panel overflow-hidden transition-all duration-300 ease-in-out"
          style={{ width: rightOpen ? rightWidth : 0 }}
        >
          <div
            className="h-full transition-opacity duration-200"
            style={{ opacity: rightOpen ? 1 : 0, width: rightWidth }}
          >
            {rightPanel}
          </div>
          <FoldButton
            direction="right"
            isOpen={rightOpen}
            onClick={() => setRightOpen(!rightOpen)}
          />
        </div>

        {/* 컨텍스트 패널 (조건부 렌더링) */}
        {contextPanel && (
          <div
            className="flex-shrink-0 border-l border-border editor-panel overflow-hidden transition-all duration-300 ease-in-out"
            style={{ width: contextPanelOpen ? contextPanelWidth : 0 }}
          >
            <div
              className="h-full transition-opacity duration-200"
              style={{ opacity: contextPanelOpen ? 1 : 0, width: contextPanelWidth }}
            >
              {contextPanel}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditorLayout;
