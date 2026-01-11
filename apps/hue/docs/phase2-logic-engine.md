# Hue Phase 2: Logic Engine

> "언제, 누구에게 보여줄까" - 조건부 렌더링의 시작

## 개요

Phase 1에서는 **"무엇을 보여줄까(UI)"**를 구현했다면,
Phase 2에서는 **"언제, 누구에게 보여줄까(Logic)"**를 구현합니다.

## 핵심 컴포넌트

### 1. ConditionEvaluator

스키마의 `condition` 필드를 읽어서 현재 `context`와 대조해 `boolean`을 반환하는 함수.

```typescript
// lib/condition-evaluator.ts
import { get } from 'lodash-es'; // 또는 직접 구현

export interface ConditionRule {
  field: string;           // context 경로 (예: "user.isLoggedIn", "cart.items.length")
  operator: ConditionOperator;
  value: unknown;
}

export type ConditionOperator =
  | 'eq'      // ===
  | 'neq'     // !==
  | 'gt'      // >
  | 'gte'     // >=
  | 'lt'      // <
  | 'lte'     // <=
  | 'contains'// includes
  | 'startsWith'
  | 'endsWith'
  | 'exists'  // !== undefined
  | 'empty';  // [], '', null, undefined

export interface Condition {
  rules: ConditionRule[];
  operator?: 'and' | 'or'; // 기본값: 'and'
}

export function evaluateCondition(condition: Condition | undefined, context: Record<string, unknown>): boolean {
  // 조건이 없으면 항상 true
  if (!condition || !condition.rules || condition.rules.length === 0) {
    return true;
  }

  const { rules, operator = 'and' } = condition;

  const results = rules.map((rule) => {
    const value = get(context, rule.field);
    return evaluateRule(rule, value);
  });

  return operator === 'and'
    ? results.every(Boolean)
    : results.some(Boolean);
}

function evaluateRule(rule: ConditionRule, value: unknown): boolean {
  switch (rule.operator) {
    case 'eq':
      return value === rule.value;
    case 'neq':
      return value !== rule.value;
    case 'gt':
      return typeof value === 'number' && value > (rule.value as number);
    case 'gte':
      return typeof value === 'number' && value >= (rule.value as number);
    case 'lt':
      return typeof value === 'number' && value < (rule.value as number);
    case 'lte':
      return typeof value === 'number' && value <= (rule.value as number);
    case 'contains':
      return typeof value === 'string' && value.includes(rule.value as string);
    case 'startsWith':
      return typeof value === 'string' && value.startsWith(rule.value as string);
    case 'endsWith':
      return typeof value === 'string' && value.endsWith(rule.value as string);
    case 'exists':
      return value !== undefined && value !== null;
    case 'empty':
      return value === '' || value === null || value === undefined ||
             (Array.isArray(value) && value.length === 0);
    default:
      return true;
  }
}
```

### 2. Context Store

에디터에서 모킹 가능한 컨텍스트 상태 관리.

```typescript
// store/context-store.ts
import { create } from 'zustand';

interface ContextState {
  // 미리 정의된 컨텍스트 변수들
  context: Record<string, unknown>;

  // 액션
  setContextValue: (path: string, value: unknown) => void;
  resetContext: () => void;
  loadPreset: (preset: 'guest' | 'member' | 'admin') => void;
}

const defaultContext = {
  user: {
    isLoggedIn: false,
    name: '',
    role: 'guest',
    subscription: 'free',
  },
  cart: {
    items: [],
    total: 0,
  },
  app: {
    theme: 'light',
    locale: 'ko',
  },
};

const presets = {
  guest: {
    user: { isLoggedIn: false, name: '', role: 'guest', subscription: 'free' },
  },
  member: {
    user: { isLoggedIn: true, name: '홍길동', role: 'member', subscription: 'pro' },
  },
  admin: {
    user: { isLoggedIn: true, name: '관리자', role: 'admin', subscription: 'enterprise' },
  },
};

export const useContextStore = create<ContextState>((set) => ({
  context: defaultContext,

  setContextValue: (path, value) =>
    set((state) => {
      // lodash set 사용 또는 직접 구현
      const newContext = { ...state.context };
      // set(newContext, path, value);
      return { context: newContext };
    }),

  resetContext: () => set({ context: defaultContext }),

  loadPreset: (preset) =>
    set((state) => ({
      context: { ...state.context, ...presets[preset] },
    })),
}));
```

## 에디터 UI 연동

### Context Panel

```
┌─────────────────────────────────────┐
│ 🎭 Preview Context                  │
├─────────────────────────────────────┤
│                                     │
│ Preset: [Guest] [Member] [Admin]    │
│                                     │
│ ── user ──────────────────────────  │
│ isLoggedIn    [toggle switch]       │
│ name          [__________________]  │
│ role          [member ▼]            │
│ subscription  [pro ▼]               │
│                                     │
│ ── cart ──────────────────────────  │
│ items.length  [_3___]               │
│ total         [_25000_]             │
│                                     │
└─────────────────────────────────────┘
```

### Condition Badge

조건이 있는 노드에 배지 표시:

```tsx
// 캔버스 노드에 조건 배지
{node.condition && (
  <div className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-purple-500 text-white text-[10px] rounded-full">
    조건
  </div>
)}

// 조건이 false일 때 반투명 처리
<div className={cn(
  "node-wrapper",
  !evaluateCondition(node.condition, context) && "opacity-30"
)}>
  {/* 노드 렌더링 */}
</div>
```

## 도파민 포인트

잼민이 피드백에서 강조한 **"도파민 터지는 순간"**:

> Context Mocking: 에디터 한쪽에서 `isLoggedIn: true/false`를 딸깍거릴 때마다,
> 캔버스 위의 버튼이 스르륵 나타났다 사라졌다 하는 경험

이 경험을 구현하려면:
1. Context Store에서 값 변경
2. Canvas가 context를 구독
3. 조건 평가 후 노드 표시/숨김 애니메이션

```tsx
// Canvas에서 조건부 렌더링
import { useToggleMotion, useFadeIn } from '@hua-labs/motion-core';

function ConditionalNode({ node }: { node: EditorNode }) {
  const context = useContextStore((s) => s.context);
  const isVisible = evaluateCondition(node.condition, context);

  // useToggleMotion으로 토글 애니메이션
  const { ref, style, toggle } = useToggleMotion({
    duration: 200,
    easing: 'easeOut',
  });

  // isVisible 변경 시 토글
  useEffect(() => {
    toggle(isVisible);
  }, [isVisible, toggle]);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0.3,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      <NodeRenderer node={node} />
    </div>
  );
}

// 노드 렌더링 시
{nodes.map((node) => (
  <ConditionalNode key={node.id} node={node} />
))}
```

## 속성 패널 - 조건 탭

```
┌─────────────────────────────────────┐
│ [속성] [스타일] [조건] [이벤트]      │
├─────────────────────────────────────┤
│                                     │
│ ▼ 조건 그룹 1 (AND)                 │
│   ┌──────────────────────────────┐  │
│   │ user.isLoggedIn  [eq] [true] │  │
│   │ [x]                          │  │
│   └──────────────────────────────┘  │
│   ┌──────────────────────────────┐  │
│   │ user.role  [eq] [member ▼]   │  │
│   │ [x]                          │  │
│   └──────────────────────────────┘  │
│                                     │
│   [+ 조건 추가]                      │
│                                     │
│ [+ 그룹 추가 (OR)]                   │
│                                     │
└─────────────────────────────────────┘
```

## 스키마 구조

```typescript
interface SDUINode {
  type: string;
  key?: string;
  props?: Record<string, unknown>;
  children?: SDUINode[] | string;

  // Phase 2: 조건부 렌더링
  condition?: {
    rules: Array<{
      field: string;      // "user.isLoggedIn"
      operator: string;   // "eq", "neq", "gt", etc.
      value: unknown;     // true, "admin", 100
    }>;
    operator?: 'and' | 'or';
  };
}
```

## 구현 로드맵

### Step 1: Core 구현
- [ ] `evaluateCondition` 함수 구현
- [ ] `useContextStore` 스토어 생성
- [ ] 테스트 작성

### Step 2: 에디터 UI
- [ ] Context Panel 컴포넌트
- [ ] Preset 버튼 (Guest/Member/Admin)
- [ ] 개별 필드 토글/입력

### Step 3: 캔버스 연동
- [ ] 노드에 조건 배지 표시
- [ ] 조건 false 시 반투명 처리
- [ ] 애니메이션 추가 (framer-motion)

### Step 4: 속성 패널
- [ ] 조건 탭 추가
- [ ] 조건 규칙 에디터 UI
- [ ] AND/OR 그룹 지원

## 참고

- lodash/get: 깊은 경로 접근 (예: `user.profile.settings.theme`)
- `@hua-labs/motion-core`: 노드 표시/숨김 애니메이션 (자체 모션 라이브러리)
- `@hua-labs/hua-ux`: UX 프레임워크 (모션 + 인터랙션)
- Zustand subscribeWithSelector: 세밀한 상태 구독

---

*Phase 1: UI 빌더 → Phase 2: Logic Engine → Phase 3: Event Actions → Phase 4: Data Loading*
