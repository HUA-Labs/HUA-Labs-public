# Hue AI Features 계획

> AI 기능 통합 지점 및 구조 설계

## 개요

Hue 에디터에 AI 기능을 통합할 수 있는 지점들을 정리하고, 각 기능의 구현 방향을 문서화합니다.

---

## 1. 컴포넌트 생성 AI

### 위치
- `ComponentPalette` 상단 또는 별도 탭
- 캔버스 우클릭 컨텍스트 메뉴

### 기능
```
사용자 입력: "3개 카드가 있는 기능 소개 섹션 만들어줘"
AI 출력: EditorNode JSON 구조
```

### 구현 방향
```typescript
interface AIComponentRequest {
  prompt: string;
  context?: {
    parentNode?: EditorNode;
    siblings?: EditorNode[];
    projectTheme?: ThemeConfig;
  };
}

interface AIComponentResponse {
  node: EditorNode;
  alternatives?: EditorNode[];  // 여러 대안 제시
  explanation?: string;
}
```

### 프롬프트 전략
- 현재 스키마의 컴포넌트 타입 목록 주입
- 테마/브랜드 컬러 컨텍스트 주입
- 예시 템플릿 few-shot 주입

---

## 2. 속성 편집 AI 어시스턴트

### 위치
- `PropertiesPanel` 내 AI 버튼
- className 입력 필드 옆 마법봉 아이콘

### 기능
```
사용자 입력: "이 버튼을 더 눈에 띄게 해줘"
AI 출력: props 변경 제안 (variant, size, className 등)
```

### 구현 방향
```typescript
interface AIPropsRequest {
  node: EditorNode;
  prompt: string;
  availableProps: PropDefinition[];
}

interface AIPropsResponse {
  updatedProps: Record<string, any>;
  explanation: string;
  diff?: {
    before: Record<string, any>;
    after: Record<string, any>;
  };
}
```

---

## 3. 텍스트 콘텐츠 생성

### 위치
- 텍스트 인라인 편집 시 AI 버튼
- `PropertiesPanel`의 children 필드

### 기능
```
사용자 입력: "SaaS 제품 소개 문구 써줘"
AI 출력: 카피라이팅 텍스트
```

### 구현 방향
```typescript
interface AITextRequest {
  context: {
    nodeType: string;  // H1, Text, Button 등
    parentContext?: string;  // 상위 섹션 정보
    brand?: BrandInfo;
    tone?: 'formal' | 'casual' | 'playful';
    language?: 'ko' | 'en';
  };
  prompt: string;
}

interface AITextResponse {
  text: string;
  alternatives?: string[];
}
```

---

## 4. 레이아웃 추천

### 위치
- 빈 캔버스 또는 빈 섹션에 추천 표시
- 컴포넌트 추가 시 자동 제안

### 기능
```
상황: 사용자가 Button 3개를 추가함
AI 제안: "Flex로 가로 배치할까요?" + 원클릭 적용
```

### 구현 방향
```typescript
interface LayoutSuggestion {
  trigger: 'add_node' | 'select_multiple' | 'empty_container';
  suggestion: {
    wrapper?: EditorNode;
    rearrangement?: NodeRearrangement;
  };
  reason: string;
}
```

---

## 5. 전체 페이지 생성

### 위치
- 새 프로젝트 생성 시
- "AI로 페이지 만들기" 버튼

### 기능
```
사용자 입력: "스타트업 랜딩페이지 만들어줘. 히어로, 기능 소개, 가격표, 푸터 포함"
AI 출력: 전체 페이지 EditorNode 트리
```

### 구현 방향
```typescript
interface AIPageRequest {
  description: string;
  sections?: string[];  // ['hero', 'features', 'pricing', 'footer']
  style?: 'minimal' | 'modern' | 'playful';
  colorScheme?: string;
}

interface AIPageResponse {
  schema: EditorNode;
  sectionBreakdown: {
    id: string;
    name: string;
    description: string;
  }[];
}
```

---

## 6. i18n 번역 지원 (구현 완료)

### 위치
- 언어 전환 시 자동 번역 제안
- `ContextPanel`의 번역 버튼

### 기능
```
현재 언어: ko
대상 언어: en
AI: 모든 텍스트 노드 번역
```

### 구현 상태
- `lib/i18n-ai.ts`에 기본 구조 구현됨
- 실제 AI 호출은 미연결

---

## 7. 접근성 검사 및 수정 제안

### 위치
- 툴바의 접근성 검사 버튼
- 내보내기 전 자동 검사

### 기능
```
AI: "이미지에 alt 텍스트가 없습니다. 추가할까요?"
AI: "색상 대비가 낮습니다. 더 진한 색상을 사용할까요?"
```

### 구현 방향
```typescript
interface A11yIssue {
  nodeId: string;
  type: 'missing_alt' | 'low_contrast' | 'missing_label' | 'keyboard_trap';
  severity: 'error' | 'warning' | 'info';
  suggestion: {
    description: string;
    autoFix?: () => void;
  };
}
```

---

## 8. 스타일 일관성 검사

### 위치
- 툴바 또는 우측 패널
- 저장/내보내기 시 자동

### 기능
```
AI: "버튼 스타일이 3가지로 섞여있습니다. 통일할까요?"
AI: "간격(gap)이 2, 3, 4, 6으로 불규칙합니다."
```

---

## 톤앤매너 (Tone & Manner)

> 잼민이 제안 반영

텍스트 생성 시 톤앤매너 파라미터를 지원하여 브랜드/타겟에 맞는 문체 적용:

| 톤 | 설명 | 프롬프트 주입 | 추천 타겟 |
|----|------|--------------|----------|
| `formal` | 전문적인 | "신뢰감 있고 정중한 비즈니스 문체로" | B2B, 금융, 법률 |
| `casual` | 친근한 | "친구에게 말하듯 친근하고 부드러운 말투로" | 커뮤니티, 블로그 |
| `punchy` | 강렬한 | "짧고 강렬하며 행동을 유도하는 카피라이팅" | 광고, CTA 버튼 |
| `playful` | 재치있는 | "재치있고 위트있는 톤으로" | 게임, 엔터테인먼트 |

```typescript
// lib/ai-service.ts
export type ToneAndManner = "formal" | "casual" | "punchy" | "playful";

interface TextGenerationRequest {
  prompt: string;
  tone?: ToneAndManner;
  context?: { ... };
}
```

---

## 스트리밍 지원

> 잼민이 제안 - "노드가 툭툭 나타나는 연출"

페이지 생성 시 전체 JSON을 기다리는 대신, 노드가 하나씩 생성되면서 캔버스에 나타나는 연출:

```typescript
interface StreamingCallbacks {
  /** 노드가 생성될 때마다 호출 */
  onNodeGenerated?: (node: EditorNode, index: number) => void;
  /** 텍스트 청크가 생성될 때마다 호출 */
  onTextChunk?: (chunk: string) => void;
  /** 진행률 업데이트 */
  onProgress?: (progress: number) => void;
  /** 완료 */
  onComplete?: () => void;
}

// 사용 예시
aiService.generatePageStreaming(request, {
  onNodeGenerated: (node, index) => {
    // 캔버스에 노드 추가 + 애니메이션
    addNodeWithAnimation(node);
  },
  onProgress: (p) => setProgress(p),
});
```

이 연출은 "AI가 실시간으로 조립하고 있다"는 시각적 쾌감을 줍니다.

---

## 구현 우선순위

| 순위 | 기능 | 난이도 | 가치 |
|-----|------|-------|-----|
| 1 | 텍스트 콘텐츠 생성 | 낮음 | 높음 |
| 2 | 컴포넌트 생성 AI | 중간 | 높음 |
| 3 | 전체 페이지 생성 | 높음 | 매우 높음 |
| 4 | 속성 편집 어시스턴트 | 중간 | 중간 |
| 5 | 레이아웃 추천 | 중간 | 중간 |
| 6 | 접근성 검사 | 낮음 | 중간 |
| 7 | 스타일 일관성 | 낮음 | 낮음 |

---

## 공통 인프라

### AI 서비스 추상화
```typescript
// lib/ai-service.ts
interface AIService {
  generateComponent(request: AIComponentRequest): Promise<AIComponentResponse>;
  generateText(request: AITextRequest): Promise<AITextResponse>;
  suggestProps(request: AIPropsRequest): Promise<AIPropsResponse>;
  generatePage(request: AIPageRequest): Promise<AIPageResponse>;
  checkAccessibility(schema: EditorNode): Promise<A11yIssue[]>;
}

// 구현체
class OpenAIService implements AIService { ... }
class ClaudeService implements AIService { ... }
class LocalLLMService implements AIService { ... }
```

### 프롬프트 템플릿 관리
```typescript
// lib/ai-prompts.ts
const PROMPTS = {
  COMPONENT_GENERATION: `
    You are a UI component generator for a React-based SDUI system.
    Available component types: {{componentTypes}}
    Theme colors: {{themeColors}}

    Generate a JSON structure for: {{userPrompt}}
  `,
  // ...
};
```

### 컨텍스트 수집기
```typescript
// lib/ai-context.ts
function collectAIContext(): AIContext {
  return {
    componentTypes: getRegisteredComponents(),
    currentSchema: useEditorStore.getState().schema,
    selectedNode: getSelectedNode(),
    themeConfig: getThemeConfig(),
    i18n: getCurrentLanguage(),
  };
}
```

---

## 스토어 확장

```typescript
// store/ai-store.ts
interface AIState {
  isGenerating: boolean;
  lastGeneration?: {
    type: 'component' | 'text' | 'page';
    result: any;
    timestamp: number;
  };
  history: AIGenerationRecord[];
  preferences: {
    autoSuggest: boolean;
    defaultModel: 'gpt-4' | 'claude' | 'local';
    temperature: number;
  };
}

interface AIActions {
  generate(type: string, request: any): Promise<any>;
  applyGeneration(id: string): void;
  revertGeneration(id: string): void;
  updatePreferences(prefs: Partial<AIState['preferences']>): void;
}
```

---

## UI 컴포넌트

### AIButton
```tsx
// components/ai/AIButton.tsx
function AIButton({
  onGenerate,
  context,
  size = 'sm',
  variant = 'ghost'
}: AIButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setIsOpen(true)}>
        <Icon name="sparkles" /> AI
      </Button>
      <AIDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        context={context}
        onGenerate={onGenerate}
      />
    </>
  );
}
```

### AIDialog
```tsx
// components/ai/AIDialog.tsx
function AIDialog({ open, onClose, context, onGenerate }: AIDialogProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    const result = await onGenerate(prompt, context);
    setResult(result);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI 어시스턴트</DialogTitle>
        </DialogHeader>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="원하는 것을 설명해주세요..."
        />
        <Button onClick={handleGenerate} disabled={isLoading}>
          {isLoading ? <Spinner /> : '생성'}
        </Button>
        {result && <AIResultPreview result={result} />}
      </DialogContent>
    </Dialog>
  );
}
```

---

## Basic vs Pro 구분

### Basic (무료)
- 텍스트 콘텐츠 생성 (일일 10회)
- 기본 레이아웃 추천
- 접근성 기본 검사

### Pro
- 무제한 AI 생성
- 전체 페이지 생성
- 고급 컴포넌트 생성
- 스타일 일관성 검사
- 커스텀 프롬프트 템플릿
- AI 히스토리 및 즐겨찾기

---

## 다음 단계

1. [ ] `lib/ai-service.ts` 기본 구조 생성
2. [ ] `store/ai-store.ts` 생성
3. [ ] `components/ai/AIButton.tsx` 생성
4. [ ] 텍스트 생성 기능 먼저 구현
5. [ ] PropertiesPanel에 AI 버튼 추가
6. [ ] 컴포넌트 생성 기능 구현
7. [ ] 전체 페이지 생성 기능 구현
