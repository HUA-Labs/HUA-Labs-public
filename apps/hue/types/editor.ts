/**
 * SDUI Editor - Type Definitions
 *
 * 에디터 전용 타입 정의
 */

import type { SDUINode, SDUIAction, SDUICondition } from "@hua-labs/ui/sdui";
import type { Condition } from "@/lib/condition-evaluator";

/**
 * 에디터 노드 - SDUINode에 에디터 전용 필드 추가
 */
export interface EditorNode extends Omit<SDUINode, "children"> {
  /** 고유 ID (nanoid) */
  id: string;
  /** 자식 노드들 (에디터용) */
  children?: EditorNode[] | string;
  /** 접힘 상태 (트리뷰용) */
  collapsed?: boolean;
  /** 잠금 상태 (편집 불가) */
  locked?: boolean;
  /** 조건부 렌더링 (Phase 2) */
  condition?: Condition;
  /** 이벤트 액션 (Phase 3) */
  actions?: EventHandlers;
}

/**
 * 노드 선택 상태
 */
export interface Selection {
  /** 선택된 노드 ID */
  nodeId: string | null;
  /** 다중 선택 (미래 확장용) */
  nodeIds?: string[];
}

/**
 * 호버 상태
 */
export interface HoverState {
  /** 호버 중인 노드 ID */
  nodeId: string | null;
  /** 드롭 타겟 위치 */
  dropPosition?: "before" | "after" | "inside";
}

/**
 * 드래그 상태
 */
export interface DragState {
  /** 드래그 중인 노드 ID (캔버스 내 이동) */
  nodeId: string | null;
  /** 팔레트에서 드래그 중인 컴포넌트 타입 */
  componentType: string | null;
  /** 드래그 소스 */
  source: "palette" | "canvas" | null;
}

/**
 * 캔버스 뷰포트 상태
 */
export interface ViewportState {
  /** 줌 레벨 (0.25 ~ 2.0) */
  zoom: number;
  /** 패닝 오프셋 X */
  panX: number;
  /** 패닝 오프셋 Y */
  panY: number;
}

/**
 * 프로젝트 정보
 */
export interface Project {
  /** 프로젝트 ID */
  id: string;
  /** 프로젝트 이름 */
  name: string;
  /** 루트 노드 */
  root: EditorNode;
  /** 생성 시간 */
  createdAt: number;
  /** 수정 시간 */
  updatedAt: number;
  /** 썸네일 (base64 또는 URL) */
  thumbnail?: string;
}

/**
 * 히스토리 항목
 */
export interface HistoryEntry {
  /** 스키마 스냅샷 */
  schema: EditorNode;
  /** 타임스탬프 */
  timestamp: number;
  /** 액션 설명 */
  description?: string;
}

/**
 * 컴포넌트 카테고리
 */
export type ComponentCategory =
  | "layout"
  | "typography"
  | "form"
  | "display"
  | "feedback"
  | "advanced";

/**
 * 속성 타입
 */
export type PropType =
  | "string"
  | "number"
  | "boolean"
  | "select"
  | "color"
  | "spacing"
  | "size"
  | "variant"
  | "icon"
  | "children"
  | "action"
  | "condition";

/**
 * 속성 스키마
 */
export interface PropSchema {
  /** 속성 이름 */
  name: string;
  /** 표시 이름 (한국어) */
  displayName: string;
  /** 속성 타입 */
  type: PropType;
  /** 기본값 */
  defaultValue?: unknown;
  /** select 타입일 때 옵션들 */
  options?: Array<{ label: string; value: string }>;
  /** 설명 */
  description?: string;
  /** 필수 여부 */
  required?: boolean;
  /** 그룹 (속성 패널 섹션) */
  group?: string;
  /** 최소값 (number 타입) */
  min?: number;
  /** 최대값 (number 타입) */
  max?: number;
}

/**
 * 컴포넌트 메타데이터
 */
export interface ComponentMetadata {
  /** 컴포넌트 타입 (레지스트리 키) */
  type: string;
  /** 표시 이름 (한국어) */
  displayName: string;
  /** 카테고리 */
  category: ComponentCategory;
  /** 아이콘 이름 */
  icon: string;
  /** 기본 props */
  defaultProps?: Record<string, unknown>;
  /** 속성 스키마 */
  propSchema: PropSchema[];
  /** 자식 허용 여부 */
  allowsChildren: boolean;
  /** 자식 타입 */
  childrenType?: "text" | "nodes" | "both";
  /** 설명 */
  description?: string;
  /** Pro 전용 여부 */
  isPro?: boolean;
}

/**
 * 에디터 설정
 */
export interface EditorSettings {
  /** 그리드 표시 */
  showGrid: boolean;
  /** 그리드 크기 */
  gridSize: number;
  /** 스냅 투 그리드 */
  snapToGrid: boolean;
  /** 아웃라인 표시 */
  showOutlines: boolean;
  /** 자동 저장 */
  autoSave: boolean;
  /** 자동 저장 간격 (ms) */
  autoSaveInterval: number;
}

/**
 * 클립보드 아이템
 */
export interface ClipboardItem {
  /** 노드 데이터 */
  node: EditorNode;
  /** 복사 시간 */
  timestamp: number;
}

/**
 * EditorNode를 SDUINode로 변환 (내보내기용)
 */
export function editorNodeToSDUI(node: EditorNode): SDUINode {
  const { id, collapsed, locked, children, ...rest } = node;

  const sduiNode: SDUINode = {
    ...rest,
    key: id,
  };

  if (children) {
    if (typeof children === "string") {
      sduiNode.children = children;
    } else {
      sduiNode.children = children.map(editorNodeToSDUI);
    }
  }

  return sduiNode;
}

/**
 * SDUINode를 EditorNode로 변환 (가져오기용)
 */
export function sduiToEditorNode(
  node: SDUINode,
  generateId: () => string
): EditorNode {
  const { key, children, ...rest } = node;

  const editorNode: EditorNode = {
    ...rest,
    id: key || generateId(),
  };

  if (children) {
    if (typeof children === "string") {
      editorNode.children = children;
    } else {
      editorNode.children = children.map((child) =>
        sduiToEditorNode(child, generateId)
      );
    }
  }

  return editorNode;
}

// ============================================
// Phase 3: Action System Types
// ============================================

/**
 * 액션 타입
 */
export type ActionType =
  | "navigate"   // 페이지 이동
  | "api"        // API 호출
  | "setState"   // 상태 변경
  | "toast"      // 토스트 알림
  | "modal"      // 모달 열기/닫기
  | "analytics"  // 분석 이벤트
  | "custom";    // 커스텀 액션

/**
 * Navigate 액션 설정
 */
export interface NavigateActionConfig {
  /** 이동할 경로 */
  path: string;
  /** 쿼리 파라미터 */
  query?: Record<string, string>;
  /** 새 탭에서 열기 */
  newTab?: boolean;
  /** replace (히스토리 대체) */
  replace?: boolean;
}

/**
 * API 액션 설정
 */
export interface ApiActionConfig {
  /** API 엔드포인트 */
  endpoint: string;
  /** HTTP 메서드 */
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** 요청 바디 (동적 값 지원) */
  body?: Record<string, unknown>;
  /** 요청 헤더 */
  headers?: Record<string, string>;
  /** 응답을 저장할 상태 경로 */
  resultPath?: string;
}

/**
 * SetState 액션 설정
 */
export interface SetStateActionConfig {
  /** 상태 경로 (예: "form.name") */
  path: string;
  /** 설정할 값 (정적 또는 동적) */
  value: unknown;
  /** 값 소스 타입 */
  valueType?: "static" | "fromEvent" | "fromState" | "expression";
  /** fromState일 때 참조할 경로 */
  sourcePath?: string;
}

/**
 * Toast 액션 설정
 */
export interface ToastActionConfig {
  /** 토스트 메시지 */
  message: string;
  /** 토스트 타입 */
  variant?: "default" | "success" | "error" | "warning" | "info";
  /** 표시 시간 (ms) */
  duration?: number;
  /** 액션 버튼 */
  action?: {
    label: string;
    onClick?: EditorAction;
  };
}

/**
 * Modal 액션 설정
 */
export interface ModalActionConfig {
  /** 모달 동작 */
  action: "open" | "close";
  /** 모달 ID (open시) */
  modalId?: string;
  /** 모달에 전달할 데이터 */
  data?: Record<string, unknown>;
}

/**
 * Analytics 액션 설정
 */
export interface AnalyticsActionConfig {
  /** 이벤트 이름 */
  event: string;
  /** 이벤트 속성 */
  properties?: Record<string, unknown>;
  /** 분석 제공자 */
  provider?: "gtag" | "mixpanel" | "amplitude" | "custom";
}

/**
 * Custom 액션 설정
 */
export interface CustomActionConfig {
  /** 핸들러 이름 */
  handler: string;
  /** 핸들러에 전달할 인자 */
  args?: Record<string, unknown>;
}

/**
 * 액션 설정 유니온 타입
 */
export type ActionConfig =
  | NavigateActionConfig
  | ApiActionConfig
  | SetStateActionConfig
  | ToastActionConfig
  | ModalActionConfig
  | AnalyticsActionConfig
  | CustomActionConfig;

/**
 * 에디터 액션 정의 (체이닝 지원)
 */
export interface EditorAction {
  /** 액션 ID (에디터에서 관리용) */
  id: string;
  /** 액션 타입 */
  type: ActionType;
  /** 액션 설정 */
  config: ActionConfig;
  /** 성공 시 실행할 후속 액션 */
  onSuccess?: EditorAction[];
  /** 실패 시 실행할 후속 액션 */
  onError?: EditorAction[];
  /** 액션 비활성화 */
  disabled?: boolean;
  /** 실행 조건 */
  condition?: Condition;
}

/**
 * 이벤트 핸들러 맵
 */
export interface EventHandlers {
  onClick?: EditorAction[];
  onSubmit?: EditorAction[];
  onChange?: EditorAction[];
  onFocus?: EditorAction[];
  onBlur?: EditorAction[];
  onHover?: EditorAction[];
  onLoad?: EditorAction[];
}

/**
 * 액션 실행 컨텍스트
 */
export interface ActionContext {
  /** 이벤트 객체 */
  event?: Event;
  /** 현재 상태 */
  state: Record<string, unknown>;
  /** 상태 업데이트 함수 */
  setState: (path: string, value: unknown) => void;
  /** 네비게이션 함수 */
  navigate: (path: string, options?: { replace?: boolean; newTab?: boolean }) => void;
  /** 토스트 함수 */
  toast: (config: ToastActionConfig) => void;
  /** 모달 함수 */
  modal: (config: ModalActionConfig) => void;
  /** 커스텀 핸들러 맵 */
  customHandlers?: Record<string, (args: Record<string, unknown>) => Promise<unknown>>;
}

/**
 * 액션 실행 결과
 */
export interface ActionResult {
  /** 성공 여부 */
  success: boolean;
  /** 결과 데이터 (API 응답 등) */
  data?: unknown;
  /** 에러 정보 */
  error?: {
    message: string;
    code?: string;
  };
}

/**
 * 액션 핸들러 타입
 */
export type ActionHandler = (
  config: ActionConfig,
  context: ActionContext
) => Promise<ActionResult>;

/**
 * EditorNode에 actions 필드 추가를 위한 확장 타입
 */
export interface EditorNodeWithActions extends EditorNode {
  /** 이벤트 핸들러 */
  actions?: EventHandlers;
}

/**
 * Re-export SDUI types
 */
export type { SDUINode, SDUIAction, SDUICondition };
