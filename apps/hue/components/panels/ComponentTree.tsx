"use client";

/**
 * Component Tree
 *
 * 배치된 컴포넌트의 트리 구조 표시 + 드래그앤드롭 재정렬
 */

import { useState, useCallback, type DragEvent } from "react";
import { Icon, cn } from "@hua-labs/ui";
import { useEditorStore, useSchema, useSelection } from "@/store";
import { getComponentMetadata } from "@/lib/component-metadata";
import type { EditorNode } from "@/types";

/**
 * 트리 노드 아이템
 */
function TreeNode({
  node,
  depth = 0,
  parentId,
  index,
}: {
  node: EditorNode;
  depth?: number;
  parentId: string | null;
  index: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);
  const selection = useSelection();
  const { select, moveNodeTo, deleteNode } = useEditorStore();
  const metadata = getComponentMetadata(node.type);

  const hasChildren = Array.isArray(node.children) && node.children.length > 0;
  const isSelected = selection.nodeId === node.id;

  // 드래그 시작
  const handleDragStart = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.dataTransfer.setData("nodeId", node.id);
      e.dataTransfer.setData("sourceParentId", parentId || "");
      e.dataTransfer.setData("sourceIndex", String(index));
      e.dataTransfer.effectAllowed = "move";
    },
    [node.id, parentId, index]
  );

  // 드래그 오버
  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  // 드롭 - 이 노드의 자식으로 추가
  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const draggedNodeId = e.dataTransfer.getData("nodeId");
      if (!draggedNodeId || draggedNodeId === node.id) return;

      // 자기 자신 안으로 드롭 방지
      const isDescendant = (parent: EditorNode, targetId: string): boolean => {
        if (parent.id === targetId) return true;
        if (Array.isArray(parent.children)) {
          return parent.children.some((child) => isDescendant(child, targetId));
        }
        return false;
      };

      // 드래그한 노드 찾기
      const findNode = (root: EditorNode, id: string): EditorNode | null => {
        if (root.id === id) return root;
        if (Array.isArray(root.children)) {
          for (const child of root.children) {
            const found = findNode(child, id);
            if (found) return found;
          }
        }
        return null;
      };

      const schema = useEditorStore.getState().schema;
      const draggedNode = findNode(schema, draggedNodeId);
      if (draggedNode && isDescendant(draggedNode, node.id)) {
        console.warn("자기 자신의 자식으로 이동할 수 없어요");
        return;
      }

      // 컴포넌트가 자식을 허용하는지 확인
      const targetMeta = getComponentMetadata(node.type);
      if (!targetMeta?.allowsChildren) {
        console.warn("이 컴포넌트는 자식을 받을 수 없어요");
        return;
      }

      // 맨 앞에 추가
      moveNodeTo(draggedNodeId, node.id, 0);
    },
    [node.id, node.type, moveNodeTo]
  );

  // 삭제
  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      deleteNode(node.id);
    },
    [node.id, deleteNode]
  );

  return (
    <div className="select-none">
      {/* 노드 아이템 */}
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={(e) => {
          e.stopPropagation();
          select(node.id);
        }}
        className={cn(
          "group flex items-center gap-1 px-2 py-1 rounded-sm cursor-pointer",
          "hover:bg-accent/50 transition-colors",
          isSelected && "bg-primary/10 text-primary",
          isDragOver && "bg-primary/20 ring-1 ring-primary"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {/* 확장/축소 버튼 */}
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="p-0.5 hover:bg-accent rounded"
          >
            <Icon
              name={expanded ? "chevronDown" : "chevronRight"}
              size={12}
              className="text-muted-foreground"
            />
          </button>
        ) : (
          <span className="w-4" />
        )}

        {/* 아이콘 */}
        <Icon
          name={(metadata?.icon as "folder") || "box"}
          size={14}
          className="text-muted-foreground"
        />

        {/* 이름 */}
        <span className="flex-1 text-xs truncate">
          {metadata?.displayName || node.type}
        </span>

        {/* 삭제 버튼 */}
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/20 rounded transition-opacity"
        >
          <Icon name="close" size={12} className="text-destructive" />
        </button>
      </div>

      {/* 자식 노드들 + 드롭존 */}
      {hasChildren && expanded && (
        <div>
          {(node.children as EditorNode[]).map((child, idx) => (
            <div key={child.id}>
              {/* 노드 앞 드롭존 */}
              <DropZone parentId={node.id} index={idx} depth={depth + 1} />
              <TreeNode
                node={child}
                depth={depth + 1}
                parentId={node.id}
                index={idx}
              />
              {/* 마지막 노드 뒤 드롭존 */}
              {idx === (node.children as EditorNode[]).length - 1 && (
                <DropZone parentId={node.id} index={idx + 1} depth={depth + 1} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * 드롭존 (형제로 추가)
 */
function DropZone({
  parentId,
  index,
  depth,
}: {
  parentId: string;
  index: number;
  depth: number;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { moveNodeTo } = useEditorStore();

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const draggedNodeId = e.dataTransfer.getData("nodeId");
      if (!draggedNodeId) return;

      moveNodeTo(draggedNodeId, parentId, index);
    },
    [parentId, index, moveNodeTo]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="py-0.5"
      style={{ marginLeft: `${depth * 12 + 8}px` }}
    >
      <div
        className={cn(
          "h-0.5 mx-2 rounded transition-all",
          isDragOver ? "h-1 bg-primary" : "bg-transparent"
        )}
      />
    </div>
  );
}

/**
 * 컴포넌트 트리
 */
export function ComponentTree() {
  const schema = useSchema();
  const { select } = useEditorStore();

  const isEmpty =
    !schema.children ||
    (Array.isArray(schema.children) && schema.children.length === 0);

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="p-3 border-b border-border">
        <h2 className="text-sm font-medium">레이어</h2>
        <p className="text-xs text-muted-foreground mt-1">
          드래그로 순서 변경
        </p>
      </div>

      {/* 트리 */}
      <div
        className="flex-1 p-2 overflow-y-auto"
        onClick={() => select(null)}
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Icon name="menu" size={24} className="mb-2 opacity-30" />
            <p className="text-sm">컴포넌트가 없어요</p>
          </div>
        ) : (
          <>
            {/* 루트 노드 표시 */}
            <div className="text-xs text-muted-foreground px-2 py-1 flex items-center gap-1">
              <Icon name="file" size={12} />
              <span>Root</span>
            </div>

            {/* 자식 노드들 + 드롭존 */}
            {Array.isArray(schema.children) &&
              schema.children.map((child, idx) => (
                <div key={child.id}>
                  {/* 노드 앞 드롭존 */}
                  <DropZone parentId={schema.id} index={idx} depth={1} />
                  <TreeNode
                    node={child}
                    depth={1}
                    parentId={schema.id}
                    index={idx}
                  />
                  {/* 마지막 노드 뒤 드롭존 */}
                  {idx === (schema.children as EditorNode[]).length - 1 && (
                    <DropZone parentId={schema.id} index={idx + 1} depth={1} />
                  )}
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ComponentTree;
