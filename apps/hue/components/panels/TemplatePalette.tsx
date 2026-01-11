"use client";

/**
 * Template Palette
 *
 * 템플릿 목록 및 드래그앤드롭
 * - 기본 제공 템플릿
 * - 사용자 정의 템플릿
 * - 카테고리별 필터
 */

import { useState } from "react";
import { Icon, Button, cn } from "@hua-labs/ui";
import {
  useTemplateStore,
  useEditorStore,
  useSelectedNode,
  TEMPLATE_CATEGORIES,
  type TemplateCategory,
  type Template,
} from "@/store";
import { cloneNode } from "@/lib/schema-utils";
import { useHueTranslation } from "@/hooks/useHueTranslation";
import type { EditorNode } from "@/types";

/**
 * 템플릿 카드
 */
function TemplateCard({
  template,
  onUse,
  onDelete,
}: {
  template: Template;
  onUse: () => void;
  onDelete?: () => void;
}) {
  const categoryMeta = TEMPLATE_CATEGORIES[template.category];

  return (
    <div
      className={cn(
        "group relative p-3 rounded-lg border border-border bg-card",
        "hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer"
      )}
      onClick={onUse}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("template", JSON.stringify(template));
        e.dataTransfer.effectAllowed = "copy";
      }}
    >
      {/* 카테고리 아이콘 */}
      <div className="flex items-start justify-between mb-2">
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon name={categoryMeta.icon as any} size={16} className="text-primary" />
        </div>
        {template.isPro && (
          <span className="px-1.5 py-0.5 text-[10px] bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded font-medium">
            Pro
          </span>
        )}
        {template.isBuiltIn && !template.isPro && (
          <span className="px-1.5 py-0.5 text-[10px] bg-muted text-muted-foreground rounded">
            기본
          </span>
        )}
        {!template.isBuiltIn && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
          >
            <Icon name="close" size={12} />
          </button>
        )}
      </div>

      {/* 이름 */}
      <h4 className="text-sm font-medium truncate">{template.name}</h4>

      {/* 설명 */}
      {template.description && (
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {template.description}
        </p>
      )}

      {/* 사용 횟수 */}
      {template.useCount > 0 && (
        <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
          <Icon name="zap" size={10} />
          {template.useCount}회 사용
        </div>
      )}
    </div>
  );
}

/**
 * 현재 선택 노드를 템플릿으로 저장
 */
function SaveAsTemplateButton() {
  const selectedNode = useSelectedNode();
  const { addTemplate } = useTemplateStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TemplateCategory>("custom");

  if (!selectedNode) return null;

  const handleSave = () => {
    if (!name.trim()) return;

    addTemplate({
      name: name.trim(),
      description: description.trim() || undefined,
      category,
      node: selectedNode,
    });

    setIsOpen(false);
    setName("");
    setDescription("");
    setCategory("custom");
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs"
        onClick={() => setIsOpen(true)}
      >
        <Icon name="save" size={12} className="mr-1.5" />
        선택 노드를 템플릿으로 저장
      </Button>
    );
  }

  return (
    <div className="p-3 border border-border rounded-lg bg-card space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">템플릿 저장</h4>
        <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
          <Icon name="close" size={14} />
        </button>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="템플릿 이름"
          className="w-full h-8 px-2 text-sm bg-background border border-input rounded-md"
          autoFocus
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명 (선택)"
          className="w-full h-8 px-2 text-sm bg-background border border-input rounded-md"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TemplateCategory)}
          className="w-full h-8 px-2 text-sm bg-background border border-input rounded-md"
        >
          {Object.entries(TEMPLATE_CATEGORIES).map(([key, meta]) => (
            <option key={key} value={key}>{meta.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsOpen(false)}>
          취소
        </Button>
        <Button size="sm" className="flex-1" onClick={handleSave} disabled={!name.trim()}>
          저장
        </Button>
      </div>
    </div>
  );
}

/**
 * 템플릿 팔레트
 */
export function TemplatePalette() {
  const { templates, deleteTemplate, incrementUseCount } = useTemplateStore();
  const { addNode } = useEditorStore();
  const schema = useEditorStore((s) => s.schema);
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "all">("all");

  const filteredTemplates = selectedCategory === "all"
    ? templates
    : templates.filter((t) => t.category === selectedCategory);

  const handleUseTemplate = (template: Template) => {
    // 노드 복제 (새 ID 생성)
    const clonedNode = cloneNode(template.node);

    // 루트에 추가
    addNode(schema.id, clonedNode);

    // 사용 횟수 증가
    incrementUseCount(template.id);
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm("이 템플릿을 삭제할까요?")) {
      deleteTemplate(id);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="p-3 border-b border-border">
        <h2 className="text-sm font-medium flex items-center gap-1.5">
          <Icon name="bookmark" size={14} />
          템플릿
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          드래그하거나 클릭하여 추가
        </p>
      </div>

      {/* 카테고리 필터 */}
      <div className="p-2 border-b border-border">
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-2 py-1 text-xs rounded-md transition-colors",
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            전체
          </button>
          {Object.entries(TEMPLATE_CATEGORIES).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as TemplateCategory)}
              className={cn(
                "px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1",
                selectedCategory === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <Icon name={meta.icon as any} size={10} />
              {meta.label}
            </button>
          ))}
        </div>
      </div>

      {/* 템플릿 목록 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* 선택 노드 저장 버튼 */}
        <SaveAsTemplateButton />

        {/* 템플릿 그리드 */}
        <div className="grid gap-2">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={() => handleUseTemplate(template)}
              onDelete={template.isBuiltIn ? undefined : () => handleDeleteTemplate(template.id)}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="folder" size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">템플릿이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemplatePalette;
