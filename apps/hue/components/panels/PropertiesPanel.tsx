"use client";

/**
 * Properties Panel
 *
 * 오른쪽 패널 - 선택된 컴포넌트의 속성 편집
 * 선택 없을 때는 프로젝트 설정 및 빠른 작업 표시
 */

import { useState } from "react";
import { Icon, Input, Label, Button, cn } from "@hua-labs/ui";
import { useEditorStore, useSelectedNode, useProjectStore, useCurrentProject, usePreviewContext } from "@/store";
import { getComponentMetadata } from "@/lib/component-metadata";
import {
  evaluateCondition,
  hasCondition,
  createEmptyCondition,
  addConditionRule,
  removeConditionRule,
  updateConditionRule,
  type Condition,
  type ConditionRule,
  type ConditionOperator,
} from "@/lib/condition-evaluator";
import type { PropSchema, EditorNode, EventHandlers } from "@/types";
import { ColorPicker, ActionEditor } from "@/components/properties";

/**
 * 속성 필드 렌더러
 */
function PropertyField({
  schema,
  value,
  onChange,
}: {
  schema: PropSchema;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const id = `prop-${schema.name}`;

  switch (schema.type) {
    case "string":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id} className="text-xs">
            {schema.displayName}
          </Label>
          <Input
            id={id}
            type="text"
            value={(value as string) || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={schema.defaultValue as string}
            className="h-8 text-sm"
          />
        </div>
      );

    case "number":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id} className="text-xs">
            {schema.displayName}
          </Label>
          <Input
            id={id}
            type="number"
            value={(value as number) ?? schema.defaultValue ?? ""}
            onChange={(e) => {
              const val = Number(e.target.value);
              // min/max 제약 적용
              if (schema.min !== undefined && val < schema.min) {
                onChange(schema.min);
              } else if (schema.max !== undefined && val > schema.max) {
                onChange(schema.max);
              } else {
                onChange(val);
              }
            }}
            min={schema.min}
            max={schema.max}
            className="h-8 text-sm"
          />
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-center justify-between">
          <Label htmlFor={id} className="text-xs">
            {schema.displayName}
          </Label>
          <button
            id={id}
            role="switch"
            aria-checked={Boolean(value)}
            onClick={() => onChange(!value)}
            className="relative w-10 h-5 rounded-full transition-colors"
            style={{
              backgroundColor: value ? "#14b8a6" : "hsl(var(--muted-foreground) / 0.3)",
              border: "1px solid",
              borderColor: value ? "#14b8a6" : "hsl(var(--border))",
            }}
          >
            <span
              className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
              style={{
                transform: value ? "translateX(1.25rem)" : "translateX(0)",
              }}
            />
          </button>
        </div>
      );

    case "select":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id} className="text-xs">
            {schema.displayName}
          </Label>
          <select
            id={id}
            value={String(value ?? schema.defaultValue ?? "")}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-8 px-2 text-sm bg-background text-foreground border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50"
            style={{ colorScheme: "dark light" }}
          >
            {schema.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

    case "color":
      return (
        <div className="space-y-1.5">
          <Label htmlFor={id} className="text-xs">
            {schema.displayName}
          </Label>
          <ColorPicker
            value={(value as string) || (schema.defaultValue as string) || "#3b82f6"}
            onChange={onChange}
          />
        </div>
      );

    default:
      return (
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">
            {schema.displayName}
          </Label>
          <p className="text-xs text-muted-foreground">
            미지원 타입: {schema.type}
          </p>
        </div>
      );
  }
}

/**
 * 자식 텍스트 편집기 (줄바꿈 지원)
 * children이 undefined/null일 때도 빈 문자열로 편집 가능
 */
function ChildrenEditor({
  node,
  onUpdate,
}: {
  node: EditorNode;
  onUpdate: (children: string) => void;
}) {
  // Array 타입 children은 노드 자식이므로 텍스트 에디터 표시 안 함
  if (Array.isArray(node.children)) return null;

  // undefined/null도 빈 문자열로 처리
  const textValue = typeof node.children === "string" ? node.children : "";

  return (
    <div className="space-y-1.5">
      <Label className="text-xs">텍스트 내용</Label>
      <textarea
        value={textValue}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="텍스트 입력..."
        rows={3}
        className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md resize-y focus:outline-none focus:ring-1 focus:ring-primary/50"
      />
    </div>
  );
}

/**
 * 연산자 옵션
 */
const OPERATOR_OPTIONS: Array<{ value: ConditionOperator; label: string }> = [
  { value: "eq", label: "=" },
  { value: "neq", label: "≠" },
  { value: "gt", label: ">" },
  { value: "gte", label: "≥" },
  { value: "lt", label: "<" },
  { value: "lte", label: "≤" },
  { value: "exists", label: "존재함" },
  { value: "notExists", label: "존재안함" },
  { value: "empty", label: "비어있음" },
  { value: "notEmpty", label: "값있음" },
  { value: "contains", label: "포함" },
];

/**
 * 자주 쓰는 필드 옵션
 */
const FIELD_SUGGESTIONS = [
  { value: "user.isLoggedIn", label: "로그인 여부" },
  { value: "user.role", label: "사용자 역할" },
  { value: "user.subscription", label: "구독 유형" },
  { value: "cart.itemCount", label: "장바구니 수량" },
  { value: "cart.total", label: "장바구니 총액" },
  { value: "app.theme", label: "테마" },
  { value: "app.locale", label: "언어" },
  { value: "app.isMobile", label: "모바일 여부" },
  { value: "app.isLoading", label: "로딩 상태" },
];

/**
 * 단일 조건 규칙 편집
 */
function RuleEditor({
  rule,
  index,
  onUpdate,
  onRemove,
}: {
  rule: ConditionRule;
  index: number;
  onUpdate: (updates: Partial<ConditionRule>) => void;
  onRemove: () => void;
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const needsValue = !["exists", "notExists", "empty", "notEmpty"].includes(rule.operator);

  return (
    <div className="flex items-start gap-1.5 group">
      {/* 필드 선택/입력 */}
      <div className="relative flex-1 min-w-0">
        <input
          type="text"
          value={rule.field}
          onChange={(e) => onUpdate({ field: e.target.value })}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="필드 경로"
          className="w-full h-7 px-2 text-xs bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 z-10 mt-1 py-1 bg-popover border border-border rounded-md shadow-lg max-h-40 overflow-auto">
            {FIELD_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion.value}
                type="button"
                className="w-full px-2 py-1 text-left text-xs hover:bg-accent"
                onMouseDown={() => onUpdate({ field: suggestion.value })}
              >
                <span className="font-mono text-primary">{suggestion.value}</span>
                <span className="ml-2 text-muted-foreground">{suggestion.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 연산자 */}
      <select
        value={rule.operator}
        onChange={(e) => onUpdate({ operator: e.target.value as ConditionOperator })}
        className="h-7 px-1 text-xs bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
      >
        {OPERATOR_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* 값 입력 */}
      {needsValue && (
        <input
          type="text"
          value={String(rule.value ?? "")}
          onChange={(e) => {
            // 자동 타입 변환
            const val = e.target.value;
            if (val === "true") onUpdate({ value: true });
            else if (val === "false") onUpdate({ value: false });
            else if (!isNaN(Number(val)) && val !== "") onUpdate({ value: Number(val) });
            else onUpdate({ value: val });
          }}
          placeholder="값"
          className="w-16 h-7 px-2 text-xs bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
      )}

      {/* 삭제 버튼 */}
      <button
        type="button"
        onClick={onRemove}
        className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
        title="규칙 삭제"
      >
        <Icon name="close" size={12} />
      </button>
    </div>
  );
}

/**
 * 조건 편집기
 */
function ConditionEditor({
  node,
  onUpdate,
}: {
  node: EditorNode;
  onUpdate: (condition: Condition | undefined) => void;
}) {
  const context = usePreviewContext();
  const condition = node.condition;
  const nodeHasCondition = hasCondition(condition);
  const conditionMet = evaluateCondition(condition, context);

  const handleAddRule = () => {
    const newCondition = condition
      ? addConditionRule(condition, { field: "", operator: "eq", value: true })
      : addConditionRule(createEmptyCondition(), { field: "user.isLoggedIn", operator: "eq", value: true });
    onUpdate(newCondition);
  };

  const handleRemoveRule = (index: number) => {
    if (!condition) return;
    const updated = removeConditionRule(condition, index);
    // 규칙이 없으면 조건 제거
    if (updated.rules.length === 0) {
      onUpdate(undefined);
    } else {
      onUpdate(updated);
    }
  };

  const handleUpdateRule = (index: number, updates: Partial<ConditionRule>) => {
    if (!condition) return;
    onUpdate(updateConditionRule(condition, index, updates));
  };

  const handleOperatorChange = (operator: "and" | "or") => {
    if (!condition) return;
    onUpdate({ ...condition, operator });
  };

  return (
    <div className="space-y-3">
      {/* 헤더 + 상태 */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Icon name="eye" size={12} />
          조건부 렌더링
        </h3>
        {nodeHasCondition && (
          <span
            className={cn(
              "px-1.5 py-0.5 text-[10px] font-medium rounded flex items-center gap-1",
              conditionMet
                ? "bg-green-500/20 text-green-600"
                : "bg-amber-500/20 text-amber-600"
            )}
          >
            <Icon name={conditionMet ? "check" : "close"} size={10} />
            {conditionMet ? "표시됨" : "숨겨짐"}
          </span>
        )}
      </div>

      {/* 조건 규칙 목록 */}
      {nodeHasCondition && condition && (
        <div className="space-y-2">
          {/* 논리 연산자 선택 (2개 이상일 때만) */}
          {condition.rules.length > 1 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">조건 연결:</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => handleOperatorChange("and")}
                  className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-medium",
                    condition.operator !== "or"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  AND
                </button>
                <button
                  type="button"
                  onClick={() => handleOperatorChange("or")}
                  className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-medium",
                    condition.operator === "or"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  OR
                </button>
              </div>
            </div>
          )}

          {/* 규칙들 */}
          <div className="space-y-1.5">
            {condition.rules.map((rule, index) => (
              <RuleEditor
                key={index}
                rule={rule}
                index={index}
                onUpdate={(updates) => handleUpdateRule(index, updates)}
                onRemove={() => handleRemoveRule(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 규칙 추가 버튼 */}
      <Button
        variant="outline"
        size="sm"
        className="w-full h-7 text-xs"
        onClick={handleAddRule}
      >
        <Icon name="add" size={12} className="mr-1" />
        {nodeHasCondition ? "규칙 추가" : "조건 추가"}
      </Button>

      {/* 도움말 */}
      {!nodeHasCondition && (
        <p className="text-[10px] text-muted-foreground">
          조건을 추가하면 Context Panel에서 토글하여 미리볼 수 있어요
        </p>
      )}
    </div>
  );
}

/**
 * 프로젝트 설정 패널 (선택 없을 때)
 */
function ProjectSettingsPanel() {
  const currentProject = useCurrentProject();
  const { createProject, renameProject, exportToJson, importFromJson } = useProjectStore();
  const { resetSchema } = useEditorStore();
  const [showProjects, setShowProjects] = useState(false);
  const projects = useProjectStore((s) => s.projects);
  const { loadProject, deleteProject } = useProjectStore();

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = e.target?.result as string;
          importFromJson(json);
        } catch (err) {
          alert("JSON 파일을 불러오는데 실패했어요.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleNewProject = () => {
    const name = prompt("새 프로젝트 이름:", "새 프로젝트");
    if (name) {
      createProject(name);
    }
  };

  const formatDate = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 60000) return "방금 전";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-border">
        <h2 className="text-sm font-medium">설정</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* 프로젝트 정보 */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Icon name="folder" size={12} />
            프로젝트
          </h3>
          {currentProject && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">이름</span>
                <span className="font-medium">{currentProject.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">수정</span>
                <span className="text-xs">{formatDate(currentProject.updatedAt)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border" />

        {/* 빠른 작업 */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Icon name="zap" size={12} />
            빠른 작업
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="justify-start text-xs h-8"
              onClick={handleNewProject}
            >
              <Icon name="add" size={14} className="mr-1.5" />
              새 프로젝트
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="justify-start text-xs h-8"
              onClick={() => setShowProjects(!showProjects)}
            >
              <Icon name="folder" size={14} className="mr-1.5" />
              프로젝트 목록
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="justify-start text-xs h-8"
              onClick={handleImport}
            >
              <Icon name="upload" size={14} className="mr-1.5" />
              가져오기
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="justify-start text-xs h-8"
              onClick={resetSchema}
            >
              <Icon name="delete" size={14} className="mr-1.5" />
              캔버스 비우기
            </Button>
          </div>
        </div>

        {/* 프로젝트 목록 */}
        {showProjects && (
          <>
            <div className="border-t border-border" />
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                저장된 프로젝트 ({projects.length})
              </h3>
              <div className="space-y-1">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md text-sm cursor-pointer transition-colors",
                      project.id === currentProject?.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                    onClick={() => loadProject(project.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(project.updatedAt)}
                      </p>
                    </div>
                    {project.id !== currentProject?.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`"${project.name}" 프로젝트를 삭제할까요?`)) {
                            deleteProject(project.id);
                          }
                        }}
                      >
                        <Icon name="close" size={12} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="border-t border-border" />

        {/* 도움말 */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Icon name="helpCircle" size={12} />
            단축키
          </h3>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>미리보기</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">P</kbd>
            </div>
            <div className="flex justify-between">
              <span>편집 모드</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">E / ESC</kbd>
            </div>
            <div className="flex justify-between">
              <span>복제</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Ctrl+D</kbd>
            </div>
            <div className="flex justify-between">
              <span>삭제</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Delete</kbd>
            </div>
            <div className="flex justify-between">
              <span>왼쪽 패널</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">[</kbd>
            </div>
            <div className="flex justify-between">
              <span>오른쪽 패널</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">]</kbd>
            </div>
            <div className="flex justify-between">
              <span>컨텍스트</span>
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">C</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 속성 패널
 */
export function PropertiesPanel() {
  const selectedNode = useSelectedNode();
  const { updateProps, updateChildren, updateCondition, updateActions, deleteNode, duplicateNode } =
    useEditorStore();

  if (!selectedNode) {
    return <ProjectSettingsPanel />;
  }

  const metadata = getComponentMetadata(selectedNode.type);

  const handlePropChange = (name: string, value: unknown) => {
    updateProps(selectedNode.id, { [name]: value });
  };

  const handleChildrenChange = (children: string) => {
    updateChildren(selectedNode.id, children);
  };

  const handleConditionChange = (condition: Condition | undefined) => {
    updateCondition(selectedNode.id, condition);
  };

  const handleActionsChange = (actions: EventHandlers | undefined) => {
    updateActions(selectedNode.id, actions);
  };

  // 그룹별로 props 분류
  const propsByGroup = metadata?.propSchema.reduce(
    (acc, prop) => {
      const group = prop.group || "기본";
      if (!acc[group]) acc[group] = [];
      acc[group].push(prop);
      return acc;
    },
    {} as Record<string, PropSchema[]>
  ) || {};

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium">속성</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {metadata?.displayName || selectedNode.type}
            </p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => duplicateNode(selectedNode.id)}
              title="복제"
            >
              <Icon name="copy" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteNode(selectedNode.id)}
              title="삭제"
              className="text-destructive hover:text-destructive"
            >
              <Icon name="delete" size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* 속성 목록 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* 텍스트 자식 편집 */}
        {(metadata?.childrenType === "text" || metadata?.childrenType === "both") && (
          <div className="pb-3 border-b border-border">
            <ChildrenEditor node={selectedNode} onUpdate={handleChildrenChange} />
          </div>
        )}

        {/* 그룹별 속성 */}
        {Object.entries(propsByGroup).map(([group, props]) => (
          <div key={group} className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {group}
            </h3>
            {props.map((prop) => (
              <PropertyField
                key={prop.name}
                schema={prop}
                value={selectedNode.props?.[prop.name]}
                onChange={(value) => handlePropChange(prop.name, value)}
              />
            ))}
          </div>
        ))}

        {/* 조건부 렌더링 */}
        <div className="pt-3 border-t border-border">
          <ConditionEditor node={selectedNode} onUpdate={handleConditionChange} />
        </div>

        {/* 이벤트 액션 */}
        <div className="pt-3 border-t border-border">
          <ActionEditor actions={selectedNode.actions} onChange={handleActionsChange} />
        </div>

        {/* 노드 정보 */}
        <div className="pt-3 border-t border-border space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            정보
          </h3>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>타입: {selectedNode.type}</p>
            <p>ID: {selectedNode.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesPanel;
