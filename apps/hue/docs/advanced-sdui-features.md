# Hue Advanced Features - Phase 2+ 기획

## 개요

Hue 에디터의 확장 기능들. 단순 UI 빌더에서 **동적 로직 지원 시스템**으로 발전.

---

## 1. Conditional Rendering (조건부 렌더링)

### 문제
"로그인한 사용자에게만 이 버튼 보여줘" 같은 조건부 UI를 어떻게 표현할 것인가?

### 스키마 확장

```typescript
interface EditorNode {
  id: string;
  type: string;
  props?: Record<string, unknown>;
  children?: EditorNode[] | string;

  // 조건부 렌더링
  condition?: {
    type: "show" | "hide";           // 조건 충족 시 보이기/숨기기
    rules: ConditionRule[];          // 규칙 배열 (AND 연산)
    operator?: "and" | "or";         // 규칙 간 연산자 (기본: and)
  };
}

interface ConditionRule {
  field: string;                     // 참조할 필드 (e.g., "user.isLoggedIn")
  operator: "eq" | "neq" | "gt" | "lt" | "gte" | "lte" | "contains" | "exists";
  value?: unknown;                   // 비교 값
}
```

### 예시

```json
{
  "type": "Button",
  "props": { "children": "프리미엄 업그레이드" },
  "condition": {
    "type": "show",
    "rules": [
      { "field": "user.isLoggedIn", "operator": "eq", "value": true },
      { "field": "user.plan", "operator": "neq", "value": "premium" }
    ]
  }
}
```

→ 로그인 O + 프리미엄 아닌 사용자에게만 표시

### 에디터 UI

```
┌─────────────────────────────────┐
│ 조건부 표시                      │
├─────────────────────────────────┤
│ [✓] 조건부 렌더링 사용           │
│                                 │
│ 조건 충족 시: [보이기 ▼]         │
│                                 │
│ 규칙 1:                         │
│ ┌───────────┬────────┬────────┐ │
│ │user.isLoggedIn│ = │ true │ │
│ └───────────┴────────┴────────┘ │
│                                 │
│ [AND ▼]                         │
│                                 │
│ 규칙 2:                         │
│ ┌───────────┬────────┬────────┐ │
│ │user.plan  │ ≠ │ premium│ │
│ └───────────┴────────┴────────┘ │
│                                 │
│ [+ 규칙 추가]                    │
└─────────────────────────────────┘
```

### Context 제공

렌더링 시점에 조건 평가를 위한 컨텍스트 주입:

```tsx
<SDUIRenderer
  schema={schema}
  context={{
    user: {
      isLoggedIn: true,
      plan: "free",
      role: "member",
    },
    app: {
      theme: "dark",
      locale: "ko",
    },
  }}
/>
```

### 구현 전략

1. **SDUIRenderer 확장**: 렌더링 전 condition 평가
2. **에디터 UI**: 속성 패널에 "조건" 탭 추가
3. **프리뷰 모드**: 테스트 컨텍스트 주입 가능

---

## 2. Event Flow (이벤트 흐름)

### 문제
"버튼 클릭 → API 호출 → 성공하면 토스트 → 페이지 이동" 같은 액션 체인을 어떻게 정의할 것인가?

### 스키마 확장

```typescript
interface EditorNode {
  // ... 기존 필드

  // 이벤트 액션
  actions?: {
    [eventName: string]: Action[];  // e.g., "onClick", "onSubmit"
  };
}

interface Action {
  type: ActionType;
  config: ActionConfig;
  onSuccess?: Action[];   // 성공 시 다음 액션
  onError?: Action[];     // 실패 시 다음 액션
}

type ActionType =
  | "navigate"       // 페이지 이동
  | "api"            // API 호출
  | "setState"       // 상태 변경
  | "toast"          // 토스트 메시지
  | "modal"          // 모달 열기/닫기
  | "analytics"      // 이벤트 트래킹
  | "custom";        // 커스텀 핸들러
```

### 예시

```json
{
  "type": "Button",
  "props": { "children": "구매하기" },
  "actions": {
    "onClick": [
      {
        "type": "api",
        "config": {
          "method": "POST",
          "endpoint": "/api/orders",
          "body": { "productId": "{{product.id}}" }
        },
        "onSuccess": [
          {
            "type": "toast",
            "config": { "message": "주문이 완료되었습니다!", "variant": "success" }
          },
          {
            "type": "navigate",
            "config": { "to": "/orders/{{response.orderId}}" }
          }
        ],
        "onError": [
          {
            "type": "toast",
            "config": { "message": "주문에 실패했습니다.", "variant": "error" }
          }
        ]
      }
    ]
  }
}
```

### 에디터 UI - Flow 시각화

```
┌─────────────────────────────────────────────┐
│ 이벤트: onClick                              │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐                               │
│  │ API 호출  │                               │
│  │ POST      │                               │
│  │ /orders   │                               │
│  └────┬─────┘                               │
│       │                                     │
│   ┌───┴───┐                                 │
│   ↓       ↓                                 │
│ 성공    실패                                 │
│   │       │                                 │
│   ↓       ↓                                 │
│ ┌────┐ ┌────┐                               │
│ │토스트│ │토스트│                             │
│ │성공 │ │실패 │                              │
│ └──┬─┘ └────┘                               │
│    │                                        │
│    ↓                                        │
│ ┌────┐                                      │
│ │이동 │                                      │
│ │/orders│                                   │
│ └────┘                                      │
│                                             │
│ [+ 액션 추가]                                │
└─────────────────────────────────────────────┘
```

### 템플릿 문법

`{{변수}}` 문법으로 동적 값 참조:

- `{{user.id}}` - 컨텍스트 값
- `{{product.price}}` - props 또는 상위 데이터
- `{{response.data}}` - 이전 액션 결과
- `{{input.email}}` - 폼 입력값

### 구현 전략

1. **액션 실행 엔진**: 액션 타입별 핸들러 매핑
2. **플로우 에디터**: 노드 기반 시각적 편집 (Phase 3)
3. **디버그 모드**: 액션 실행 로그 표시

---

## 3. Skeleton / Loading State (로딩 상태)

### 문제
데이터 로딩 중에 스켈레톤을 보여주고, 로드 완료 시 실제 컴포넌트로 교체하려면?

### 스키마 확장

```typescript
interface EditorNode {
  // ... 기존 필드

  // 로딩 상태
  loading?: {
    enabled: boolean;
    skeleton?: EditorNode;         // 커스텀 스켈레톤 (없으면 자동 생성)
    dataSource?: string;           // 의존하는 데이터 소스 (e.g., "user", "products")
    timeout?: number;              // 로딩 타임아웃 (ms)
  };
}
```

### 예시 1: 자동 스켈레톤

```json
{
  "type": "Card",
  "props": { "className": "p-4" },
  "loading": {
    "enabled": true,
    "dataSource": "user"
  },
  "children": [
    { "type": "H2", "children": "{{user.name}}" },
    { "type": "Text", "children": "{{user.email}}" }
  ]
}
```

→ `user` 데이터 로딩 중: Card 영역에 자동 스켈레톤
→ 로딩 완료: 실제 내용 표시

### 예시 2: 커스텀 스켈레톤

```json
{
  "type": "Card",
  "loading": {
    "enabled": true,
    "dataSource": "products",
    "skeleton": {
      "type": "Flex",
      "props": { "direction": "column", "gap": 2 },
      "children": [
        { "type": "Skeleton", "props": { "className": "h-48 w-full" } },
        { "type": "Skeleton", "props": { "className": "h-4 w-3/4" } },
        { "type": "Skeleton", "props": { "className": "h-4 w-1/2" } }
      ]
    }
  },
  "children": [
    { "type": "Image", "props": { "src": "{{product.image}}" } },
    { "type": "H3", "children": "{{product.name}}" },
    { "type": "Text", "children": "{{product.price}}원" }
  ]
}
```

### 에디터 UI

```
┌─────────────────────────────────┐
│ 로딩 상태                        │
├─────────────────────────────────┤
│ [✓] 로딩 상태 사용               │
│                                 │
│ 데이터 소스:                     │
│ ┌─────────────────────────────┐ │
│ │ products                 ▼ │ │
│ └─────────────────────────────┘ │
│                                 │
│ 스켈레톤:                        │
│ ○ 자동 생성                     │
│ ● 커스텀 정의                   │
│                                 │
│ ┌─────────────────────────────┐ │
│ │  ┌────────────────────┐    │ │
│ │  │ ░░░░░░░░░░░░░░░░░░ │    │ │
│ │  │ ░░░░░░░░░░         │    │ │
│ │  │ ░░░░░░             │    │ │
│ │  └────────────────────┘    │ │
│ └─────────────────────────────┘ │
│ [스켈레톤 편집]                  │
│                                 │
│ 타임아웃: 10000 ms               │
└─────────────────────────────────┘
```

### 데이터 소스 연동

```tsx
<SDUIRenderer
  schema={schema}
  dataSources={{
    user: {
      loading: false,
      data: { name: "홍길동", email: "hong@example.com" },
      error: null,
    },
    products: {
      loading: true,   // 아직 로딩 중
      data: null,
      error: null,
    },
  }}
/>
```

### 자동 스켈레톤 생성 알고리즘

1. 컴포넌트 타입 분석
2. children 구조 분석
3. 적절한 Skeleton 조합 생성

```typescript
function generateAutoSkeleton(node: EditorNode): EditorNode {
  switch (node.type) {
    case "H1":
    case "H2":
      return { type: "Skeleton", props: { className: "h-8 w-3/4" } };
    case "Text":
      return { type: "Skeleton", props: { className: "h-4 w-full" } };
    case "Image":
      return { type: "Skeleton", props: { className: "h-48 w-full rounded" } };
    case "Avatar":
      return { type: "Skeleton", props: { className: "h-10 w-10 rounded-full" } };
    case "Button":
      return { type: "Skeleton", props: { className: "h-9 w-24 rounded" } };
    // ...
  }
}
```

---

## 4. 통합 예시: 프로필 카드

```json
{
  "type": "Card",
  "loading": {
    "enabled": true,
    "dataSource": "user"
  },
  "children": [
    {
      "type": "Flex",
      "props": { "gap": 4, "align": "center" },
      "children": [
        { "type": "Avatar", "props": { "src": "{{user.avatar}}" } },
        {
          "type": "Box",
          "children": [
            { "type": "H3", "children": "{{user.name}}" },
            { "type": "Text", "props": { "variant": "muted" }, "children": "{{user.email}}" }
          ]
        }
      ]
    },
    {
      "type": "Button",
      "props": { "variant": "outline", "children": "프로필 수정" },
      "condition": {
        "type": "show",
        "rules": [
          { "field": "user.id", "operator": "eq", "value": "{{currentUser.id}}" }
        ]
      },
      "actions": {
        "onClick": [
          { "type": "navigate", "config": { "to": "/profile/edit" } }
        ]
      }
    },
    {
      "type": "Button",
      "props": { "variant": "primary", "children": "팔로우" },
      "condition": {
        "type": "show",
        "rules": [
          { "field": "user.id", "operator": "neq", "value": "{{currentUser.id}}" },
          { "field": "user.isFollowing", "operator": "eq", "value": false }
        ]
      },
      "actions": {
        "onClick": [
          {
            "type": "api",
            "config": { "method": "POST", "endpoint": "/api/follow/{{user.id}}" },
            "onSuccess": [
              { "type": "toast", "config": { "message": "팔로우했습니다!" } },
              { "type": "setState", "config": { "path": "user.isFollowing", "value": true } }
            ]
          }
        ]
      }
    }
  ]
}
```

---

## 구현 로드맵

### Phase 2: 조건부 렌더링
1. [ ] `condition` 스키마 정의
2. [ ] SDUIRenderer에 조건 평가 로직 추가
3. [ ] 에디터 속성 패널에 조건 UI 추가
4. [ ] 프리뷰에서 컨텍스트 모의 입력

### Phase 3: 이벤트 액션
1. [ ] `actions` 스키마 정의
2. [ ] 액션 실행 엔진 구현
3. [ ] 기본 액션 타입 구현 (navigate, toast, setState)
4. [ ] 에디터에 액션 편집 UI
5. [ ] API 호출 액션 + 체이닝

### Phase 4: 로딩 상태
1. [ ] `loading` 스키마 정의
2. [ ] dataSource 연동 시스템
3. [ ] 자동 스켈레톤 생성
4. [ ] 커스텀 스켈레톤 편집

### Phase 5: 플로우 에디터 (Optional)
1. [ ] 노드 기반 시각적 플로우 편집기
2. [ ] 디버그/시뮬레이션 모드
3. [ ] 플로우 템플릿

---

## 커뮤니티 피드백 (잼민이)

### 1. 에디터 UX 개선 - 조건 시각화

조건이 걸린 컴포넌트는 에디터에서 시각적으로 구분:

```
┌─────────────────────────────────┐
│ [👁 조건] 프리미엄 업그레이드      │  ← 배지 표시
│           (반투명 오버레이)        │  ← 반투명 처리
└─────────────────────────────────┘
```

구현 아이디어:
- 조건 있는 노드: `opacity-60` + 상단에 조건 아이콘
- 호버 시 조건 요약 툴팁
- 클릭하면 속성 패널 조건 탭으로 이동

### 2. 복합 조건 - 재귀적 구조

AND/OR 중첩을 위한 그룹 구조:

```typescript
interface ConditionGroup {
  operator: "and" | "or";
  rules: (ConditionRule | ConditionGroup)[];  // 재귀 가능
}

// 예: (A AND B) OR (C AND D)
condition: {
  type: "show",
  rules: {
    operator: "or",
    rules: [
      {
        operator: "and",
        rules: [
          { field: "user.isLoggedIn", operator: "eq", value: true },
          { field: "user.plan", operator: "eq", value: "free" }
        ]
      },
      {
        operator: "and",
        rules: [
          { field: "user.role", operator: "eq", value: "admin" }
        ]
      }
    ]
  }
}
```

→ Phase 2에서는 단순 AND/OR만, Phase 3에서 중첩 지원

### 3. 시장 전략

| Phase | 타겟 시장 | 예시 |
|-------|----------|------|
| 1-2 | 마케팅/랜딩 페이지 | 회사 소개, 프로모션 |
| 3-4 | 어드민/대시보드 | 백오피스, 관리 도구 |
| 5+ | 서비스 프로토타이핑 | MVP, PoC |

핵심 차별점:
- 노코드 한계 → **커스텀 패키지(npm)** 확장
- 스키마 명확 → **개발자 친화적 로우코드**

### 4. 다음 구현 우선순위

잼민이 제안 기반:

1. **ConditionEvaluator** - 조건 평가 엔진
   ```typescript
   function evaluateCondition(
     condition: Condition,
     context: Context
   ): boolean
   ```

2. **executeActions** - 액션 실행 엔진
   ```typescript
   async function executeActions(
     actions: Action[],
     context: Context
   ): Promise<void>
   ```

3. **에디터 시각화** - 조건/액션 있는 노드 표시

### 5. 구현 디테일 (잼민이 2차 피드백)

#### Action Engine - Context Pipeline

```typescript
async function executeActions(actions: Action[], initialContext: Context) {
  let currentContext = { ...initialContext };

  for (const action of actions) {
    const result = await handlerMap[action.type](action.config, currentContext);

    if (result.success) {
      // 결과값을 컨텍스트에 병합 ({{response.orderId}} 사용 가능)
      currentContext = { ...currentContext, response: result.data };
      if (action.onSuccess) {
        await executeActions(action.onSuccess, currentContext);
      }
    } else {
      if (action.onError) {
        await executeActions(action.onError, currentContext);
      }
      break; // 에러 시 체인 중단
    }
  }
}
```

#### Condition Evaluator - 안전한 값 추출

`lodash/get` 또는 자체 구현으로 문자열 경로에서 안전하게 값 추출:

```typescript
import { get } from "lodash-es";

function evaluateRule(rule: ConditionRule, context: Context): boolean {
  const value = get(context, rule.field); // "user.plan" → context.user.plan

  switch (rule.operator) {
    case "eq": return value === rule.value;
    case "neq": return value !== rule.value;
    case "gt": return value > rule.value;
    case "exists": return value !== undefined && value !== null;
    case "contains":
      return Array.isArray(value)
        ? value.includes(rule.value)
        : String(value).includes(String(rule.value));
    // ...
  }
}
```

#### 에디터 시각화 상세

| 기능 | 시각화 | 효과 |
|------|--------|------|
| Conditional | 노드 우측 상단 `[👁]` 배지 + 툴팁 | 로직 유무 즉시 파악 |
| Action | 클릭 시 Flow Diagram 사이드바 | 이벤트 흐름 가독성 |
| Skeleton | 상단 `[Loading Mode]` 토글 | 로딩 UI 즉시 테스트 |

#### Custom 액션 타입 (확장성)

개발자가 직접 함수 주입 가능한 통로:

```typescript
// 커스텀 핸들러 등록
registerActionHandler("myCustomAction", async (config, context) => {
  // 개발자 정의 로직
  const result = await myBusinessLogic(config.params);
  return { success: true, data: result };
});

// 스키마에서 사용
{
  "type": "custom",
  "config": {
    "handler": "myCustomAction",
    "params": { "foo": "bar" }
  }
}
```

---

## 참고

- Hue 에디터: `apps/hue`
- SDUI 렌더러: `packages/hua-ui/src/sdui/SDUIRenderer.tsx`
- 컴포넌트 레지스트리: `packages/hua-ui/src/sdui/registry.tsx`
