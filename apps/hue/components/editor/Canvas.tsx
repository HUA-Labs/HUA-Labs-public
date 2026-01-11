"use client";

/**
 * Canvas
 *
 * 중앙 캔버스 영역 - 드롭존 + 에디터 프리뷰
 */

import { useCallback, useState, useEffect, useRef, type DragEvent, type ReactNode, type MouseEvent } from "react";
import { Icon, cn } from "@hua-labs/ui";
import { defaultRegistry } from "@hua-labs/ui/sdui";
import {
  useEditorStore,
  useSchema,
  useSelection,
  useHover,
  useViewport,
  usePreviewContext,
} from "@/store";
import { createNode } from "@/lib/schema-utils";
import { getComponentMetadata } from "@/lib/component-metadata";
import { evaluateCondition, hasCondition } from "@/lib/condition-evaluator";
import type { EditorNode } from "@/types";

interface CanvasProps {
  className?: string;
  viewportWidth?: number | null; // null = 전체 너비
}

/** 컨테이너 타입 (테두리 표시용) */
const CONTAINER_TYPES = ["Box", "Flex", "Grid", "Section", "Container", "Card", "CardHeader", "CardContent", "CardFooter", "Header", "Alert"];

/** 빈 상태 표시가 필요한 타입 */
const EMPTY_DISPLAY_TYPES = ["Link", "Button", "Badge", "Label", "Text", "H1", "H2", "H3", "H4"];

/** 인라인 컴포넌트 (wrapper를 inline-block으로) */
const INLINE_TYPES = ["Link", "Button", "Badge", "Icon", "Checkbox", "Switch"];

/**
 * 컨텍스트 메뉴
 */
function ContextMenu({
  x,
  y,
  nodeId,
  onClose,
}: {
  x: number;
  y: number;
  nodeId: string;
  onClose: () => void;
}) {
  const { deleteNode, duplicateNode } = useEditorStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  // 메뉴 위치 조정 (화면 경계 체크)
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const padding = 8;
      let newX = x;
      let newY = y;

      // 오른쪽 경계
      if (x + rect.width > window.innerWidth - padding) {
        newX = x - rect.width;
      }
      // 하단 경계
      if (y + rect.height > window.innerHeight - padding) {
        newY = y - rect.height;
      }
      // 왼쪽/상단 경계
      if (newX < padding) newX = padding;
      if (newY < padding) newY = padding;

      setPosition({ x: newX, y: newY });
    }
  }, [x, y]);

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const menuItems = [
    { label: "복제", icon: "copy", shortcut: "Ctrl+D", action: () => { duplicateNode(nodeId); onClose(); } },
    { label: "삭제", icon: "delete", shortcut: "Del", action: () => { deleteNode(nodeId); onClose(); }, danger: true },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-[100] min-w-[160px] bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-xl py-1 text-sm"
      style={{ left: position.x, top: position.y }}
    >
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          onClick={item.action}
          className={cn(
            "w-full px-3 py-1.5 flex items-center gap-2 hover:bg-accent transition-colors text-left",
            item.danger && "text-destructive hover:bg-destructive/10"
          )}
        >
          <Icon name={item.icon as "copy"} size={14} />
          <span className="flex-1">{item.label}</span>
          <span className="text-xs text-muted-foreground">{item.shortcut}</span>
        </button>
      ))}
    </div>
  );
}

/**
 * 드롭 인디케이터 (노드 사이에 드롭 가능하게)
 */
function DropIndicator({
  parentId,
  index,
  isLast = false,
}: {
  parentId: string;
  index: number;
  isLast?: boolean;
}) {
  const [isActive, setIsActive] = useState(false);
  const { moveNodeTo, addNode, select } = useEditorStore();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActive(true);
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = () => {
    setIsActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActive(false);

    // 기존 노드 이동
    const dragNodeId = e.dataTransfer.getData("dragNodeId");
    if (dragNodeId) {
      moveNodeTo(dragNodeId, parentId, index);
      return;
    }

    // 새 컴포넌트 추가
    const componentType = e.dataTransfer.getData("componentType");
    if (componentType) {
      const metadata = getComponentMetadata(componentType);
      if (!metadata) return;

      const defaultChildren = metadata.childrenType === "text"
        ? metadata.displayName
        : metadata.allowsChildren
          ? []
          : undefined;

      const newNode = createNode(componentType, metadata.defaultProps, defaultChildren);
      addNode(parentId, newNode, index);
      select(newNode.id);
    }
  };

  return (
    <div
      className="py-1"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={cn(
          "h-1 rounded transition-all",
          isActive ? "bg-primary h-2" : "bg-transparent"
        )}
      />
    </div>
  );
}

/**
 * 컨테이너 끝 드롭존 (자식 추가용) - 호버/드래그 시에만 표시
 */
function ContainerAddZone({ parentId, childCount, isVisible }: { parentId: string; childCount: number; isVisible: boolean }) {
  const [isActive, setIsActive] = useState(false);
  const { moveNodeTo, addNode, select } = useEditorStore();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActive(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = () => {
    setIsActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActive(false);

    // 기존 노드 이동
    const dragNodeId = e.dataTransfer.getData("dragNodeId");
    if (dragNodeId) {
      moveNodeTo(dragNodeId, parentId, childCount);
      return;
    }

    // 새 컴포넌트 추가
    const componentType = e.dataTransfer.getData("componentType");
    if (componentType) {
      const metadata = getComponentMetadata(componentType);
      if (!metadata) return;

      const defaultChildren = metadata.childrenType === "text"
        ? metadata.displayName
        : metadata.allowsChildren
          ? []
          : undefined;

      const newNode = createNode(componentType, metadata.defaultProps, defaultChildren);
      addNode(parentId, newNode);
      select(newNode.id);
    }
  };

  // 안 보일 때도 드래그 받을 수 있게 최소 영역 유지
  if (!isVisible && !isActive) {
    return (
      <div
        className="h-2 opacity-0"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />
    );
  }

  return (
    <div
      className={cn(
        "py-1 px-2 border-2 border-dashed rounded flex items-center justify-center text-xs transition-all",
        isActive
          ? "border-primary bg-primary/10 text-primary"
          : "border-border/30 text-muted-foreground/50 bg-muted/30"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Icon name="add" size={12} className="mr-1" />
      추가
    </div>
  );
}

/**
 * 에디터용 노드 렌더러
 * - 클릭으로 선택
 * - 드래그로 재배치
 * - 호버 효과
 * - 컨테이너 테두리 표시
 * - 빈 컴포넌트 플레이스홀더
 */
function EditorNodeRenderer({ node, parentId, index }: { node: EditorNode; parentId?: string; index?: number }) {
  const selection = useSelection();
  const hover = useHover();
  const context = usePreviewContext();
  const { select, setHover, moveNodeTo, deleteNode, duplicateNode, addNode } = useEditorStore();

  const metadata = getComponentMetadata(node.type);

  // 조건부 렌더링 평가
  const nodeHasCondition = hasCondition(node.condition);
  const conditionMet = evaluateCondition(node.condition, context);

  // 액션 여부 체크
  const nodeHasActions = node.actions && Object.values(node.actions).some(arr => arr && arr.length > 0);
  const actionCount = nodeHasActions
    ? Object.values(node.actions!).reduce((sum, arr) => sum + (arr?.length || 0), 0)
    : 0;

  const isSelected = selection.nodeId === node.id;
  const isHovered = hover.nodeId === node.id;
  const isContainer = CONTAINER_TYPES.includes(node.type);
  const isInline = INLINE_TYPES.includes(node.type);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // 컴포넌트 가져오기
  const Component = defaultRegistry[node.type];
  if (!Component) {
    return (
      <div className="p-2 border border-destructive/50 bg-destructive/10 rounded text-xs text-destructive">
        Unknown: {node.type}
      </div>
    );
  }

  // Props 처리
  const props = node.props || {};

  // Children 처리
  let children: ReactNode = null;
  const hasChildren = node.children && (
    typeof node.children === "string"
      ? node.children.length > 0
      : node.children.length > 0
  );

  if (typeof node.children === "string") {
    // 줄바꿈 지원: \n을 <br/>로 변환
    const lines = node.children.split("\n");
    if (lines.length > 1) {
      children = lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ));
    } else {
      children = node.children;
    }
  } else if (Array.isArray(node.children) && node.children.length > 0) {
    const childElements = node.children.map((child, idx) => (
      <div key={child.id}>
        {/* 노드 앞 드롭 인디케이터 */}
        <DropIndicator parentId={node.id} index={idx} />
        <EditorNodeRenderer node={child} parentId={node.id} index={idx} />
      </div>
    ));
    // 노드 자식을 받는 컨테이너만 추가 드롭존 표시
    const showAddZone = isContainer && metadata?.childrenType === "nodes";
    if (showAddZone) {
      children = (
        <>
          {childElements}
          <ContainerAddZone
            parentId={node.id}
            childCount={node.children.length}
            isVisible={isSelected}
          />
        </>
      );
    } else {
      children = childElements;
    }
  }

  // 드래그 핸들러
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.dataTransfer.setData("dragNodeId", node.id);
    e.dataTransfer.setData("dragParentId", parentId || "");
    e.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isContainer) return;
    setIsDragOver(true);
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    // 컨테이너가 아니면 이벤트를 DropIndicator로 전파
    if (!isContainer) return;

    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    // 기존 노드 이동 (dragNodeId)
    const dragNodeId = e.dataTransfer.getData("dragNodeId");
    if (dragNodeId) {
      if (dragNodeId === node.id) return;

      // 자기 자신 안으로 드롭 방지 (순환 참조)
      const isDescendant = (checkNode: EditorNode, targetId: string): boolean => {
        if (checkNode.id === targetId) return true;
        if (Array.isArray(checkNode.children)) {
          return checkNode.children.some((c) => isDescendant(c, targetId));
        }
        return false;
      };

      if (isDescendant(node, dragNodeId)) {
        console.warn("자기 자신 안으로 이동할 수 없어요");
        return;
      }

      moveNodeTo(dragNodeId, node.id, 0);
      return;
    }

    // 새 컴포넌트 추가 (componentType)
    const componentType = e.dataTransfer.getData("componentType");
    if (componentType) {
      const newMeta = getComponentMetadata(componentType);
      if (!newMeta) return;

      const defaultChildren = newMeta.childrenType === "text"
        ? newMeta.displayName
        : newMeta.allowsChildren
          ? []
          : undefined;

      const newNode = createNode(componentType, newMeta.defaultProps, defaultChildren);
      addNode(node.id, newNode);
      select(newNode.id);
    }
  };

  // 빈 컴포넌트 플레이스홀더
  const showPlaceholder = !hasChildren && EMPTY_DISPLAY_TYPES.includes(node.type);
  if (showPlaceholder) {
    children = <span className="text-muted-foreground/50">{metadata?.displayName || node.type}</span>;
  }

  // 빈 컨테이너 플레이스홀더
  const showContainerPlaceholder = !hasChildren && isContainer;

  // void 엘리먼트 체크 (children 안 받음)
  const voidElements = ["Spacer", "Divider", "Input", "Textarea", "Checkbox", "Switch", "Progress", "Skeleton", "Image", "Icon", "ScrollProgress"];
  const isVoidElement = voidElements.includes(node.type);

  return (
    <div
      draggable
      className={cn(
        "relative group/node cursor-grab active:cursor-grabbing",
        // 인라인 컴포넌트는 inline-block
        isInline ? "inline-block" : "block",
        // 선택/호버 테두리
        isSelected && "ring-2 ring-primary ring-offset-1",
        isHovered && !isSelected && "ring-1 ring-primary/50",
        // 컨테이너 점선 테두리
        isContainer && !isSelected && !isHovered && "border border-dashed border-border/50",
        // 드래그 상태
        isDragging && "opacity-50",
        isDragOver && isContainer && "ring-2 ring-primary/50 bg-primary/5",
        // 조건부 렌더링: 조건 미충족 시 반투명
        nodeHasCondition && !conditionMet && "opacity-30"
      )}
      onClick={(e) => {
        e.stopPropagation();
        select(node.id);
        setContextMenu(null);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        select(node.id);
        setContextMenu({ x: e.clientX, y: e.clientY });
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        setHover(node.id);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setHover(null);
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* 컨텍스트 메뉴 */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          nodeId={node.id}
          onClose={() => setContextMenu(null)}
        />
      )}
      {/* 선택 레이블 + 조건 뱃지 + 삭제 버튼 */}
      {(isSelected || isHovered) && (
        <div
          className={cn(
            "absolute -top-5 left-0 flex items-center gap-1 z-20",
          )}
        >
          <span
            className={cn(
              "px-1.5 py-0.5 text-[10px] font-medium rounded-sm whitespace-nowrap",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {metadata?.displayName || node.type}
          </span>
          {/* 조건부 렌더링 뱃지 */}
          {nodeHasCondition && (
            <span
              className={cn(
                "px-1 py-0.5 text-[10px] font-medium rounded-sm flex items-center gap-0.5",
                conditionMet
                  ? "bg-green-500/20 text-green-600"
                  : "bg-amber-500/20 text-amber-600"
              )}
              title={conditionMet ? "조건 충족" : "조건 미충족 (숨김)"}
            >
              <Icon name={conditionMet ? "check" : "eye"} size={10} />
              {conditionMet ? "ON" : "OFF"}
            </span>
          )}
          {/* 액션 뱃지 */}
          {nodeHasActions && (
            <span
              className="px-1 py-0.5 text-[10px] font-medium rounded-sm flex items-center gap-0.5 bg-violet-500/20 text-violet-600"
              title={`${actionCount}개 액션`}
            >
              <Icon name="zap" size={10} />
              {actionCount}
            </span>
          )}
          {isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNode(node.id);
              }}
              className="w-4 h-4 flex items-center justify-center bg-destructive text-destructive-foreground rounded-sm hover:bg-destructive/80 transition-colors"
              title="삭제 (Delete)"
            >
              <Icon name="close" size={10} />
            </button>
          )}
        </div>
      )}

      {/* 실제 컴포넌트 렌더링 */}
      {isVoidElement ? (
        <Component {...props} />
      ) : showContainerPlaceholder ? (
        <Component {...props}>
          <div className="min-h-[40px] flex items-center justify-center text-xs text-muted-foreground/30 p-2 italic">
            비어있음
          </div>
        </Component>
      ) : (
        <Component {...props}>{children}</Component>
      )}
    </div>
  );
}

/**
 * 캔버스
 */
export function Canvas({ className, viewportWidth }: CanvasProps) {
  const schema = useSchema();
  const selection = useSelection();
  const viewport = useViewport();
  const { select, addNode, setHover, clearHover, deleteNode, duplicateNode, moveNodeTo } = useEditorStore();

  // 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // input/textarea에서는 무시
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Delete/Backspace: 삭제
      if ((e.key === "Delete" || e.key === "Backspace") && selection.nodeId) {
        e.preventDefault();
        deleteNode(selection.nodeId);
      }

      // Ctrl+D: 복제
      if ((e.ctrlKey || e.metaKey) && e.key === "d" && selection.nodeId) {
        e.preventDefault();
        duplicateNode(selection.nodeId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selection.nodeId, deleteNode, duplicateNode]);

  // 드롭 대상 결정 (자식을 허용하는 노드 찾기)
  const getDropTarget = useCallback(
    (selectedId: string | null): string => {
      if (!selectedId) return schema.id;

      // 선택된 노드의 메타데이터 확인
      const findNode = (node: EditorNode, id: string): EditorNode | null => {
        if (node.id === id) return node;
        if (Array.isArray(node.children)) {
          for (const child of node.children) {
            const found = findNode(child, id);
            if (found) return found;
          }
        }
        return null;
      };

      const selectedNode = findNode(schema, selectedId);
      if (!selectedNode) return schema.id;

      const selectedMeta = getComponentMetadata(selectedNode.type);

      // 선택된 노드가 자식을 허용하면 거기에 추가
      if (selectedMeta?.allowsChildren) {
        return selectedId;
      }

      // 아니면 부모 찾기
      const findParent = (
        node: EditorNode,
        targetId: string,
        parent: EditorNode | null = null
      ): EditorNode | null => {
        if (node.id === targetId) return parent;
        if (Array.isArray(node.children)) {
          for (const child of node.children) {
            const found = findParent(child, targetId, node);
            if (found) return found;
          }
        }
        return null;
      };

      const parent = findParent(schema, selectedId);
      return parent?.id || schema.id;
    },
    [schema]
  );

  // 드롭 처리 (새 컴포넌트 추가)
  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const componentType = e.dataTransfer.getData("componentType");
      if (!componentType) return;

      const metadata = getComponentMetadata(componentType);
      if (!metadata) return;

      // 새 노드 생성
      const defaultChildren = metadata.childrenType === "text"
        ? metadata.displayName
        : metadata.allowsChildren
          ? []
          : undefined;

      const newNode = createNode(
        componentType,
        metadata.defaultProps,
        defaultChildren
      );

      // 선택된 노드가 자식을 허용하면 거기에, 아니면 부모에 추가
      const targetId = getDropTarget(selection.nodeId);
      addNode(targetId, newNode);
      select(newNode.id);
    },
    [selection.nodeId, addNode, select, getDropTarget]
  );

  // 루트 레벨로 노드 이동 처리
  const handleRootDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // 기존 노드 이동 (dragNodeId)
      const dragNodeId = e.dataTransfer.getData("dragNodeId");
      if (dragNodeId) {
        // 루트 레벨로 이동
        moveNodeTo(dragNodeId, schema.id, -1); // -1 = 맨 뒤에 추가
        return;
      }

      // 새 컴포넌트 추가 (componentType)
      const componentType = e.dataTransfer.getData("componentType");
      if (componentType) {
        const metadata = getComponentMetadata(componentType);
        if (!metadata) return;

        const defaultChildren = metadata.childrenType === "text"
          ? metadata.displayName
          : metadata.allowsChildren
            ? []
            : undefined;

        const newNode = createNode(
          componentType,
          metadata.defaultProps,
          defaultChildren
        );

        addNode(schema.id, newNode);
        select(newNode.id);
      }
    },
    [schema.id, moveNodeTo, addNode, select]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  // 빈 캔버스 체크
  const isEmpty =
    !schema.children ||
    (Array.isArray(schema.children) && schema.children.length === 0);

  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* 캔버스 영역 */}
      <div
        className="flex-1 editor-canvas overflow-auto p-8"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => select(null)} // 빈 곳 클릭시 선택 해제
      >
        {/* 반응형 뷰포트 컨테이너 */}
        <div
          className={cn(
            "mx-auto transition-all duration-300",
            viewportWidth && "bg-muted/30 p-4 rounded-xl"
          )}
          style={{
            maxWidth: viewportWidth ? `${viewportWidth + 32}px` : undefined,
          }}
        >
          {/* 뷰포트 사이즈 표시 */}
          {viewportWidth && (
            <div className="text-center text-xs text-muted-foreground mb-2">
              {viewportWidth}px
            </div>
          )}
          <div
            className={cn(
              "min-h-full bg-card rounded-lg border shadow-sm transition-transform origin-top-left",
              viewportWidth ? "border-primary/30" : "border-border"
            )}
            style={{
              transform: `scale(${viewport.zoom})`,
              width: viewportWidth ? `${viewportWidth}px` : `${100 / viewport.zoom}%`,
            }}
          >
          {isEmpty ? (
            // 빈 캔버스 상태
            <div
              className="h-96 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-lg m-4"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add("border-primary", "bg-primary/5");
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove("border-primary", "bg-primary/5");
              }}
              onDrop={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                e.currentTarget.classList.remove("border-primary", "bg-primary/5");
                handleDrop(e);
              }}
            >
              <Icon name="add" size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium mb-2">캔버스가 비어있어요</p>
              <p className="text-sm">왼쪽에서 컴포넌트를 드래그해서 놓아주세요</p>
            </div>
          ) : (
            // 에디터 프리뷰 (선택/호버 지원)
            <div
              className="p-4 min-h-[200px]"
              onClick={(e) => {
                // 빈 영역 클릭시 선택 해제
                if (e.target === e.currentTarget) {
                  select(null);
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                // 기존 노드 이동일 때만 move 효과
                const dragNodeId = e.dataTransfer.types.includes("dragnodeid");
                e.dataTransfer.dropEffect = dragNodeId ? "move" : "copy";
              }}
              onDrop={handleRootDrop}
            >
              {Array.isArray(schema.children) &&
                schema.children.map((child, idx) => (
                  <div key={child.id}>
                    {/* 노드 앞 드롭 인디케이터 */}
                    <DropIndicator parentId={schema.id} index={idx} />
                    <EditorNodeRenderer node={child} parentId={schema.id} index={idx} />
                    {/* 마지막 노드 뒤 드롭 인디케이터 */}
                    {idx === (schema.children as EditorNode[]).length - 1 && (
                      <DropIndicator parentId={schema.id} index={idx + 1} isLast />
                    )}
                  </div>
                ))}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
