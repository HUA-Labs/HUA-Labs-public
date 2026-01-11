/**
 * Condition Evaluator
 *
 * 조건 스키마를 평가하여 boolean 반환
 * Phase 2: Logic Engine 핵심 함수
 */

/**
 * 조건 연산자 타입
 */
export type ConditionOperator =
  | "eq" // ===
  | "neq" // !==
  | "gt" // >
  | "gte" // >=
  | "lt" // <
  | "lte" // <=
  | "contains" // includes (문자열/배열)
  | "notContains" // !includes
  | "startsWith" // 문자열 시작
  | "endsWith" // 문자열 끝
  | "exists" // !== undefined && !== null
  | "notExists" // === undefined || === null
  | "empty" // '', [], null, undefined, {}
  | "notEmpty"; // !empty

/**
 * 단일 조건 규칙
 */
export interface ConditionRule {
  /** context 경로 (예: "user.isLoggedIn", "cart.items.length") */
  field: string;
  /** 비교 연산자 */
  operator: ConditionOperator;
  /** 비교할 값 */
  value?: unknown;
}

/**
 * 조건 그룹
 */
export interface Condition {
  /** 조건 규칙들 */
  rules: ConditionRule[];
  /** 규칙 간 연산자 (기본: and) */
  operator?: "and" | "or";
}

/**
 * 깊은 경로로 객체 값 가져오기 (lodash/get 대체)
 *
 * @example
 * getByPath({ user: { name: "홍길동" } }, "user.name") // "홍길동"
 * getByPath({ items: [1, 2, 3] }, "items.length") // 3
 * getByPath({ items: [{ id: 1 }] }, "items.0.id") // 1
 */
export function getByPath(obj: unknown, path: string): unknown {
  if (!obj || !path) return undefined;

  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined;
    }

    if (typeof current === "object") {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return current;
}

/**
 * 값이 비어있는지 확인
 */
function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (value === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  return false;
}

/**
 * 단일 규칙 평가
 */
function evaluateRule(rule: ConditionRule, context: object): boolean {
  const value = getByPath(context, rule.field);

  switch (rule.operator) {
    case "eq":
      return value === rule.value;

    case "neq":
      return value !== rule.value;

    case "gt":
      return typeof value === "number" && value > (rule.value as number);

    case "gte":
      return typeof value === "number" && value >= (rule.value as number);

    case "lt":
      return typeof value === "number" && value < (rule.value as number);

    case "lte":
      return typeof value === "number" && value <= (rule.value as number);

    case "contains":
      if (typeof value === "string") {
        return value.includes(rule.value as string);
      }
      if (Array.isArray(value)) {
        return value.includes(rule.value);
      }
      return false;

    case "notContains":
      if (typeof value === "string") {
        return !value.includes(rule.value as string);
      }
      if (Array.isArray(value)) {
        return !value.includes(rule.value);
      }
      return true;

    case "startsWith":
      return typeof value === "string" && value.startsWith(rule.value as string);

    case "endsWith":
      return typeof value === "string" && value.endsWith(rule.value as string);

    case "exists":
      return value !== undefined && value !== null;

    case "notExists":
      return value === undefined || value === null;

    case "empty":
      return isEmpty(value);

    case "notEmpty":
      return !isEmpty(value);

    default:
      // 알 수 없는 연산자는 true로 처리 (관대한 평가)
      console.warn(`Unknown condition operator: ${rule.operator}`);
      return true;
  }
}

/**
 * 조건 평가
 *
 * @param condition - 평가할 조건
 * @param context - 컨텍스트 데이터
 * @returns 조건 충족 여부
 *
 * @example
 * // 로그인 사용자만 보이는 버튼
 * evaluateCondition(
 *   { rules: [{ field: "user.isLoggedIn", operator: "eq", value: true }] },
 *   { user: { isLoggedIn: true } }
 * ) // true
 *
 * @example
 * // 장바구니에 아이템이 있을 때만 보이는 버튼
 * evaluateCondition(
 *   { rules: [{ field: "cart.items", operator: "notEmpty" }] },
 *   { cart: { items: [{ id: 1 }] } }
 * ) // true
 *
 * @example
 * // AND 조건: 로그인 + Pro 사용자
 * evaluateCondition(
 *   {
 *     rules: [
 *       { field: "user.isLoggedIn", operator: "eq", value: true },
 *       { field: "user.subscription", operator: "eq", value: "pro" }
 *     ],
 *     operator: "and"
 *   },
 *   { user: { isLoggedIn: true, subscription: "pro" } }
 * ) // true
 */
export function evaluateCondition(
  condition: Condition | undefined | null,
  context: object
): boolean {
  // 조건이 없으면 항상 true (무조건 표시)
  if (!condition || !condition.rules || condition.rules.length === 0) {
    return true;
  }

  const { rules, operator = "and" } = condition;

  const results = rules.map((rule) => evaluateRule(rule, context));

  return operator === "and" ? results.every(Boolean) : results.some(Boolean);
}

/**
 * 조건이 있는지 확인
 */
export function hasCondition(condition: Condition | undefined | null): boolean {
  return !!(condition && condition.rules && condition.rules.length > 0);
}

/**
 * 빈 조건 생성
 */
export function createEmptyCondition(): Condition {
  return {
    rules: [],
    operator: "and",
  };
}

/**
 * 조건 규칙 추가
 */
export function addConditionRule(
  condition: Condition,
  rule: ConditionRule
): Condition {
  return {
    ...condition,
    rules: [...condition.rules, rule],
  };
}

/**
 * 조건 규칙 제거
 */
export function removeConditionRule(
  condition: Condition,
  index: number
): Condition {
  return {
    ...condition,
    rules: condition.rules.filter((_, i) => i !== index),
  };
}

/**
 * 조건 규칙 업데이트
 */
export function updateConditionRule(
  condition: Condition,
  index: number,
  updates: Partial<ConditionRule>
): Condition {
  return {
    ...condition,
    rules: condition.rules.map((rule, i) =>
      i === index ? { ...rule, ...updates } : rule
    ),
  };
}
