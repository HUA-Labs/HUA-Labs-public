/**
 * Action Engine
 *
 * 에디터에서 정의된 액션을 실행하는 엔진
 * - 액션 체이닝 (onSuccess, onError)
 * - 조건부 실행
 * - 에러 핸들링
 */

import { nanoid } from "nanoid";
import type {
  EditorAction,
  ActionType,
  ActionConfig,
  ActionContext,
  ActionResult,
  ActionHandler,
  NavigateActionConfig,
  ApiActionConfig,
  SetStateActionConfig,
  ToastActionConfig,
  ModalActionConfig,
  AnalyticsActionConfig,
  CustomActionConfig,
} from "@/types/editor";
import { evaluateCondition } from "./condition-evaluator";

/**
 * 액션 핸들러 레지스트리
 */
const actionHandlers: Record<ActionType, ActionHandler> = {
  navigate: handleNavigate,
  api: handleApi,
  setState: handleSetState,
  toast: handleToast,
  modal: handleModal,
  analytics: handleAnalytics,
  custom: handleCustom,
};

/**
 * 액션 실행
 */
export async function executeAction(
  action: EditorAction,
  context: ActionContext
): Promise<ActionResult> {
  // 비활성화된 액션 스킵
  if (action.disabled) {
    return { success: true, data: { skipped: true } };
  }

  // 조건 체크
  if (action.condition) {
    const shouldExecute = evaluateCondition(action.condition, context.state);
    if (!shouldExecute) {
      return { success: true, data: { skipped: true, reason: "condition" } };
    }
  }

  // 핸들러 가져오기
  const handler = actionHandlers[action.type];
  if (!handler) {
    return {
      success: false,
      error: { message: `Unknown action type: ${action.type}` },
    };
  }

  try {
    // 액션 실행
    const result = await handler(action.config, context);

    // 성공 시 체이닝
    if (result.success && action.onSuccess?.length) {
      for (const nextAction of action.onSuccess) {
        await executeAction(nextAction, {
          ...context,
          state: { ...context.state, _lastResult: result.data },
        });
      }
    }

    // 실패 시 체이닝
    if (!result.success && action.onError?.length) {
      for (const nextAction of action.onError) {
        await executeAction(nextAction, {
          ...context,
          state: { ...context.state, _lastError: result.error },
        });
      }
    }

    return result;
  } catch (error) {
    const errorResult: ActionResult = {
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Unknown error",
      },
    };

    // 에러 시 체이닝
    if (action.onError?.length) {
      for (const nextAction of action.onError) {
        await executeAction(nextAction, {
          ...context,
          state: { ...context.state, _lastError: errorResult.error },
        });
      }
    }

    return errorResult;
  }
}

/**
 * 여러 액션 순차 실행
 */
export async function executeActions(
  actions: EditorAction[],
  context: ActionContext
): Promise<ActionResult[]> {
  const results: ActionResult[] = [];

  for (const action of actions) {
    const result = await executeAction(action, context);
    results.push(result);

    // 실패하면 중단 (옵션으로 변경 가능)
    if (!result.success) {
      break;
    }
  }

  return results;
}

// ============================================
// 액션 핸들러 구현
// ============================================

/**
 * Navigate 액션
 */
async function handleNavigate(
  config: ActionConfig,
  context: ActionContext
): Promise<ActionResult> {
  const { path, query, newTab, replace } = config as NavigateActionConfig;

  let url = path;

  // 쿼리 파라미터 추가
  if (query && Object.keys(query).length > 0) {
    const params = new URLSearchParams(query);
    url = `${path}?${params.toString()}`;
  }

  // 새 탭에서 열기
  if (newTab) {
    window.open(url, "_blank");
  } else {
    context.navigate(path, { replace });
  }

  return { success: true, data: { navigatedTo: url } };
}

/**
 * API 액션
 */
async function handleApi(
  config: ActionConfig,
  context: ActionContext
): Promise<ActionResult> {
  const { endpoint, method, body, headers, resultPath } =
    config as ApiActionConfig;

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: { message: data.message || "API error", code: String(response.status) },
      };
    }

    // 결과를 상태에 저장
    if (resultPath) {
      context.setState(resultPath, data);
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Network error",
      },
    };
  }
}

/**
 * SetState 액션
 */
async function handleSetState(
  config: ActionConfig,
  context: ActionContext
): Promise<ActionResult> {
  const { path, value, valueType, sourcePath } =
    config as SetStateActionConfig;

  let resolvedValue = value;

  // 값 타입에 따라 실제 값 결정
  switch (valueType) {
    case "fromState":
      if (sourcePath) {
        resolvedValue = getNestedValue(context.state, sourcePath);
      }
      break;
    case "fromEvent":
      if (context.event && "target" in context.event) {
        const target = context.event.target as HTMLInputElement;
        resolvedValue = target.value;
      }
      break;
    case "expression":
      // 간단한 표현식 평가 (보안상 eval 대신 제한적 구현)
      // TODO: 안전한 표현식 평가기 구현
      break;
    default:
      // static - 그대로 사용
      break;
  }

  context.setState(path, resolvedValue);

  return { success: true, data: { path, value: resolvedValue } };
}

/**
 * Toast 액션
 */
async function handleToast(
  config: ActionConfig,
  context: ActionContext
): Promise<ActionResult> {
  const toastConfig = config as ToastActionConfig;
  context.toast(toastConfig);
  return { success: true, data: { shown: true } };
}

/**
 * Modal 액션
 */
async function handleModal(
  config: ActionConfig,
  context: ActionContext
): Promise<ActionResult> {
  const modalConfig = config as ModalActionConfig;
  context.modal(modalConfig);
  return { success: true, data: { action: modalConfig.action } };
}

/**
 * Analytics 액션
 */
async function handleAnalytics(
  config: ActionConfig,
  _context: ActionContext
): Promise<ActionResult> {
  const { event, properties, provider } = config as AnalyticsActionConfig;

  try {
    switch (provider) {
      case "gtag":
        if (typeof window !== "undefined" && "gtag" in window) {
          (window as any).gtag("event", event, properties);
        }
        break;
      case "mixpanel":
        if (typeof window !== "undefined" && "mixpanel" in window) {
          (window as any).mixpanel.track(event, properties);
        }
        break;
      case "amplitude":
        if (typeof window !== "undefined" && "amplitude" in window) {
          (window as any).amplitude.track(event, properties);
        }
        break;
      default:
        // 커스텀 또는 콘솔 로깅
        console.log("[Analytics]", event, properties);
    }

    return { success: true, data: { tracked: event } };
  } catch (error) {
    return {
      success: false,
      error: { message: "Analytics tracking failed" },
    };
  }
}

/**
 * Custom 액션
 */
async function handleCustom(
  config: ActionConfig,
  context: ActionContext
): Promise<ActionResult> {
  const { handler, args } = config as CustomActionConfig;

  if (!context.customHandlers?.[handler]) {
    return {
      success: false,
      error: { message: `Custom handler not found: ${handler}` },
    };
  }

  try {
    const data = await context.customHandlers[handler](args || {});
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Custom handler error",
      },
    };
  }
}

// ============================================
// 유틸리티 함수
// ============================================

/**
 * 중첩 객체에서 값 가져오기
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object") {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

/**
 * 새 액션 생성 헬퍼
 */
export function createAction(
  type: ActionType,
  config: ActionConfig,
  options?: Partial<Pick<EditorAction, "onSuccess" | "onError" | "condition">>
): EditorAction {
  return {
    id: nanoid(),
    type,
    config,
    ...options,
  };
}

/**
 * 액션 핸들러 등록 (확장용)
 */
export function registerActionHandler(
  type: ActionType,
  handler: ActionHandler
): void {
  actionHandlers[type] = handler;
}
