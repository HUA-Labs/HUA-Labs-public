"use client";

/**
 * Action Editor
 *
 * 노드의 이벤트 액션을 편집하는 컴포넌트
 * - onClick, onSubmit, onChange 등 이벤트 선택
 * - navigate, api, setState, toast 등 액션 타입 선택
 * - 각 액션 타입별 설정 UI
 */

import { useState } from "react";
import { Icon, Button, Input, Label, cn } from "@hua-labs/ui";
import { nanoid } from "nanoid";
import type {
  EditorAction,
  ActionType,
  EventHandlers,
  NavigateActionConfig,
  ApiActionConfig,
  SetStateActionConfig,
  ToastActionConfig,
  ModalActionConfig,
} from "@/types/editor";
import { useHueTranslation } from "@/store";

/**
 * 이벤트 타입 옵션
 */
const EVENT_OPTIONS: Array<{ value: keyof EventHandlers; label: string; icon: string }> = [
  { value: "onClick", label: "클릭", icon: "pointer" },
  { value: "onSubmit", label: "제출", icon: "check" },
  { value: "onChange", label: "변경", icon: "edit" },
  { value: "onFocus", label: "포커스", icon: "target" },
  { value: "onBlur", label: "블러", icon: "eyeOff" },
  { value: "onLoad", label: "로드", icon: "refresh" },
];

/**
 * 액션 타입 옵션
 */
const ACTION_TYPE_OPTIONS: Array<{ value: ActionType; label: string; icon: string; description: string }> = [
  { value: "navigate", label: "페이지 이동", icon: "link", description: "다른 페이지로 이동" },
  { value: "setState", label: "상태 변경", icon: "edit", description: "컨텍스트 상태 업데이트" },
  { value: "toast", label: "토스트 알림", icon: "bell", description: "알림 메시지 표시" },
  { value: "modal", label: "모달", icon: "square", description: "모달 열기/닫기" },
  { value: "api", label: "API 호출", icon: "globe", description: "서버 요청 보내기" },
  { value: "analytics", label: "분석 이벤트", icon: "barChart", description: "이벤트 트래킹" },
  { value: "custom", label: "커스텀", icon: "code", description: "커스텀 핸들러 호출" },
];

/**
 * Toast variant 옵션
 */
const TOAST_VARIANTS = [
  { value: "default", label: "기본" },
  { value: "success", label: "성공" },
  { value: "error", label: "에러" },
  { value: "warning", label: "경고" },
  { value: "info", label: "정보" },
];

/**
 * HTTP 메서드 옵션
 */
const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

/**
 * 빈 액션 생성
 */
function createEmptyAction(type: ActionType): EditorAction {
  const id = nanoid();

  switch (type) {
    case "navigate":
      return {
        id,
        type: "navigate",
        config: { path: "/" } as NavigateActionConfig,
      };
    case "api":
      return {
        id,
        type: "api",
        config: { endpoint: "/api/", method: "GET" } as ApiActionConfig,
      };
    case "setState":
      return {
        id,
        type: "setState",
        config: { path: "", value: "" } as SetStateActionConfig,
      };
    case "toast":
      return {
        id,
        type: "toast",
        config: { message: "", variant: "default", duration: 3000 } as ToastActionConfig,
      };
    case "modal":
      return {
        id,
        type: "modal",
        config: { action: "open", modalId: "" } as ModalActionConfig,
      };
    case "analytics":
      return {
        id,
        type: "analytics",
        config: { event: "", properties: {} },
      };
    case "custom":
    default:
      return {
        id,
        type: "custom",
        config: { handler: "", args: {} },
      };
  }
}

/**
 * Navigate 액션 설정 UI
 */
function NavigateConfigEditor({
  config,
  onChange,
}: {
  config: NavigateActionConfig;
  onChange: (config: NavigateActionConfig) => void;
}) {
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">경로</Label>
        <Input
          value={config.path || ""}
          onChange={(e) => onChange({ ...config, path: e.target.value })}
          placeholder="/dashboard"
          className="h-7 text-xs mt-1"
        />
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-1.5 text-xs">
          <input
            type="checkbox"
            checked={config.newTab || false}
            onChange={(e) => onChange({ ...config, newTab: e.target.checked })}
            className="rounded"
          />
          새 탭
        </label>
        <label className="flex items-center gap-1.5 text-xs">
          <input
            type="checkbox"
            checked={config.replace || false}
            onChange={(e) => onChange({ ...config, replace: e.target.checked })}
            className="rounded"
          />
          히스토리 대체
        </label>
      </div>
    </div>
  );
}

/**
 * SetState 액션 설정 UI
 */
function SetStateConfigEditor({
  config,
  onChange,
}: {
  config: SetStateActionConfig;
  onChange: (config: SetStateActionConfig) => void;
}) {
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">상태 경로</Label>
        <Input
          value={config.path || ""}
          onChange={(e) => onChange({ ...config, path: e.target.value })}
          placeholder="user.name"
          className="h-7 text-xs mt-1"
        />
      </div>
      <div>
        <Label className="text-xs">값</Label>
        <Input
          value={String(config.value ?? "")}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "true") onChange({ ...config, value: true });
            else if (val === "false") onChange({ ...config, value: false });
            else if (!isNaN(Number(val)) && val !== "") onChange({ ...config, value: Number(val) });
            else onChange({ ...config, value: val });
          }}
          placeholder="새 값"
          className="h-7 text-xs mt-1"
        />
      </div>
    </div>
  );
}

/**
 * Toast 액션 설정 UI
 */
function ToastConfigEditor({
  config,
  onChange,
}: {
  config: ToastActionConfig;
  onChange: (config: ToastActionConfig) => void;
}) {
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">메시지</Label>
        <Input
          value={config.message || ""}
          onChange={(e) => onChange({ ...config, message: e.target.value })}
          placeholder="저장되었습니다!"
          className="h-7 text-xs mt-1"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label className="text-xs">스타일</Label>
          <select
            value={config.variant || "default"}
            onChange={(e) => onChange({ ...config, variant: e.target.value as ToastActionConfig["variant"] })}
            className="w-full h-7 px-2 text-xs bg-background border border-input rounded mt-1"
          >
            {TOAST_VARIANTS.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>
        <div className="w-20">
          <Label className="text-xs">시간(ms)</Label>
          <Input
            type="number"
            value={config.duration || 3000}
            onChange={(e) => onChange({ ...config, duration: Number(e.target.value) })}
            className="h-7 text-xs mt-1"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Modal 액션 설정 UI
 */
function ModalConfigEditor({
  config,
  onChange,
}: {
  config: ModalActionConfig;
  onChange: (config: ModalActionConfig) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange({ ...config, action: "open" })}
          className={cn(
            "flex-1 h-7 text-xs rounded border",
            config.action === "open"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-input hover:bg-muted"
          )}
        >
          열기
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...config, action: "close" })}
          className={cn(
            "flex-1 h-7 text-xs rounded border",
            config.action === "close"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-input hover:bg-muted"
          )}
        >
          닫기
        </button>
      </div>
      {config.action === "open" && (
        <div>
          <Label className="text-xs">모달 ID</Label>
          <Input
            value={config.modalId || ""}
            onChange={(e) => onChange({ ...config, modalId: e.target.value })}
            placeholder="confirm-dialog"
            className="h-7 text-xs mt-1"
          />
        </div>
      )}
    </div>
  );
}

/**
 * API 액션 설정 UI
 */
function ApiConfigEditor({
  config,
  onChange,
}: {
  config: ApiActionConfig;
  onChange: (config: ApiActionConfig) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="w-24">
          <Label className="text-xs">메서드</Label>
          <select
            value={config.method || "GET"}
            onChange={(e) => onChange({ ...config, method: e.target.value as ApiActionConfig["method"] })}
            className="w-full h-7 px-2 text-xs bg-background border border-input rounded mt-1"
          >
            {HTTP_METHODS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <Label className="text-xs">엔드포인트</Label>
          <Input
            value={config.endpoint || ""}
            onChange={(e) => onChange({ ...config, endpoint: e.target.value })}
            placeholder="/api/users"
            className="h-7 text-xs mt-1"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs">결과 저장 경로</Label>
        <Input
          value={config.resultPath || ""}
          onChange={(e) => onChange({ ...config, resultPath: e.target.value })}
          placeholder="response.data"
          className="h-7 text-xs mt-1"
        />
      </div>
    </div>
  );
}

/**
 * 단일 액션 편집기
 */
function SingleActionEditor({
  action,
  onChange,
  onRemove,
}: {
  action: EditorAction;
  onChange: (action: EditorAction) => void;
  onRemove: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const actionMeta = ACTION_TYPE_OPTIONS.find((a) => a.value === action.type);

  const handleTypeChange = (type: ActionType) => {
    const newAction = createEmptyAction(type);
    onChange({ ...newAction, id: action.id });
  };

  const handleConfigChange = (config: EditorAction["config"]) => {
    onChange({ ...action, config });
  };

  return (
    <div className="border border-border rounded-md overflow-hidden">
      {/* 액션 헤더 */}
      <div
        className="flex items-center gap-2 px-2 py-1.5 bg-muted/50 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <Icon
          name={expanded ? "chevronDown" : "chevronRight"}
          size={12}
          className="text-muted-foreground"
        />
        <Icon name={actionMeta?.icon as any || "zap"} size={12} className="text-primary" />
        <span className="flex-1 text-xs font-medium">{actionMeta?.label || action.type}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="p-0.5 text-muted-foreground hover:text-destructive"
        >
          <Icon name="close" size={12} />
        </button>
      </div>

      {/* 액션 설정 */}
      {expanded && (
        <div className="p-2 space-y-3">
          {/* 타입 선택 */}
          <div>
            <Label className="text-xs text-muted-foreground">액션 타입</Label>
            <div className="grid grid-cols-4 gap-1 mt-1">
              {ACTION_TYPE_OPTIONS.slice(0, 4).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleTypeChange(opt.value)}
                  className={cn(
                    "p-1.5 rounded text-center border transition-colors",
                    action.type === opt.value
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-input hover:bg-muted text-muted-foreground"
                  )}
                  title={opt.description}
                >
                  <Icon name={opt.icon as any} size={14} className="mx-auto" />
                  <span className="text-[10px] block mt-0.5">{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1 mt-1">
              {ACTION_TYPE_OPTIONS.slice(4).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleTypeChange(opt.value)}
                  className={cn(
                    "p-1.5 rounded text-center border transition-colors",
                    action.type === opt.value
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-input hover:bg-muted text-muted-foreground"
                  )}
                  title={opt.description}
                >
                  <Icon name={opt.icon as any} size={14} className="mx-auto" />
                  <span className="text-[10px] block mt-0.5">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 타입별 설정 UI */}
          <div className="pt-2 border-t border-border">
            {action.type === "navigate" && (
              <NavigateConfigEditor
                config={action.config as NavigateActionConfig}
                onChange={handleConfigChange}
              />
            )}
            {action.type === "setState" && (
              <SetStateConfigEditor
                config={action.config as SetStateActionConfig}
                onChange={handleConfigChange}
              />
            )}
            {action.type === "toast" && (
              <ToastConfigEditor
                config={action.config as ToastActionConfig}
                onChange={handleConfigChange}
              />
            )}
            {action.type === "modal" && (
              <ModalConfigEditor
                config={action.config as ModalActionConfig}
                onChange={handleConfigChange}
              />
            )}
            {action.type === "api" && (
              <ApiConfigEditor
                config={action.config as ApiActionConfig}
                onChange={handleConfigChange}
              />
            )}
            {(action.type === "analytics" || action.type === "custom") && (
              <p className="text-xs text-muted-foreground">
                {action.type === "analytics" ? "분석 이벤트 설정" : "커스텀 핸들러 설정"}
                (추후 지원)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 이벤트별 액션 그룹 편집기
 */
function EventActionsEditor({
  eventType,
  actions,
  onChange,
}: {
  eventType: keyof EventHandlers;
  actions: EditorAction[];
  onChange: (actions: EditorAction[]) => void;
}) {
  const eventMeta = EVENT_OPTIONS.find((e) => e.value === eventType);

  const handleAddAction = () => {
    const newAction = createEmptyAction("navigate");
    onChange([...actions, newAction]);
  };

  const handleUpdateAction = (index: number, action: EditorAction) => {
    const updated = [...actions];
    updated[index] = action;
    onChange(updated);
  };

  const handleRemoveAction = (index: number) => {
    onChange(actions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium flex items-center gap-1.5">
          <Icon name={eventMeta?.icon as any || "zap"} size={12} className="text-primary" />
          {eventMeta?.label || eventType}
          {actions.length > 0 && (
            <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full">
              {actions.length}
            </span>
          )}
        </h4>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs"
          onClick={handleAddAction}
        >
          <Icon name="add" size={12} className="mr-1" />
          추가
        </Button>
      </div>

      {actions.length > 0 && (
        <div className="space-y-2">
          {actions.map((action, index) => (
            <SingleActionEditor
              key={action.id}
              action={action}
              onChange={(a) => handleUpdateAction(index, a)}
              onRemove={() => handleRemoveAction(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * 액션 편집기 메인 컴포넌트
 */
interface ActionEditorProps {
  actions?: EventHandlers;
  onChange: (actions: EventHandlers | undefined) => void;
}

export function ActionEditor({ actions, onChange }: ActionEditorProps) {
  const { t } = useHueTranslation();
  const [activeEvents, setActiveEvents] = useState<Set<keyof EventHandlers>>(
    new Set(actions ? (Object.keys(actions) as (keyof EventHandlers)[]).filter(k => actions[k]?.length) : [])
  );

  const handleToggleEvent = (eventType: keyof EventHandlers) => {
    const newActive = new Set(activeEvents);
    if (newActive.has(eventType)) {
      newActive.delete(eventType);
      // 해당 이벤트의 액션 제거
      const updated = { ...actions };
      delete updated[eventType];
      onChange(Object.keys(updated).length > 0 ? updated : undefined);
    } else {
      newActive.add(eventType);
    }
    setActiveEvents(newActive);
  };

  const handleActionsChange = (eventType: keyof EventHandlers, eventActions: EditorAction[]) => {
    if (eventActions.length === 0) {
      const updated = { ...actions };
      delete updated[eventType];
      onChange(Object.keys(updated).length > 0 ? updated : undefined);
    } else {
      onChange({ ...actions, [eventType]: eventActions });
    }
  };

  const hasAnyAction = actions && Object.values(actions).some(arr => arr && arr.length > 0);

  return (
    <div className="space-y-3">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Icon name="zap" size={12} />
          이벤트 액션
        </h3>
        {hasAnyAction && (
          <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/20 text-primary">
            활성
          </span>
        )}
      </div>

      {/* 이벤트 토글 버튼 */}
      <div className="flex flex-wrap gap-1">
        {EVENT_OPTIONS.map((event) => {
          const isActive = activeEvents.has(event.value);
          const hasActions = actions?.[event.value]?.length;
          return (
            <button
              key={event.value}
              type="button"
              onClick={() => handleToggleEvent(event.value)}
              className={cn(
                "px-2 py-1 text-xs rounded border transition-colors flex items-center gap-1",
                isActive || hasActions
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-background border-input text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon name={event.icon as any} size={10} />
              {event.label}
              {hasActions ? ` (${hasActions})` : ""}
            </button>
          );
        })}
      </div>

      {/* 활성화된 이벤트별 액션 편집 */}
      {Array.from(activeEvents).map((eventType) => (
        <div key={eventType} className="pt-2 border-t border-border/50">
          <EventActionsEditor
            eventType={eventType}
            actions={actions?.[eventType] || []}
            onChange={(eventActions) => handleActionsChange(eventType, eventActions)}
          />
        </div>
      ))}

      {/* 안내 메시지 */}
      {!hasAnyAction && activeEvents.size === 0 && (
        <p className="text-[10px] text-muted-foreground">
          이벤트를 선택하여 클릭, 제출 등의 동작을 정의하세요
        </p>
      )}
    </div>
  );
}

export default ActionEditor;
