/**
 * AI Service
 *
 * Hue 에디터의 AI 기능 핵심 서비스
 * - 텍스트 생성 (카피라이팅)
 * - 컴포넌트 생성
 * - 페이지 생성
 * - 스트리밍 지원
 */

import type { EditorNode } from "@/types";

// ========== 톤앤매너 ==========

/**
 * 텍스트 톤앤매너
 * - formal: 신뢰감 있고 정중한 비즈니스 문체 (B2B, 금융, 법률)
 * - casual: 친근하고 부드러운 말투 (커뮤니티, 블로그)
 * - punchy: 짧고 강렬한 카피라이팅 (광고, CTA)
 * - playful: 재치있고 위트있는 (게임, 엔터테인먼트)
 */
export type ToneAndManner = "formal" | "casual" | "punchy" | "playful";

export const TONE_PROMPTS: Record<ToneAndManner, string> = {
  formal: "신뢰감 있고 정중한 비즈니스 문체로 작성해주세요.",
  casual: "친구에게 말하듯 친근하고 부드러운 말투로 작성해주세요.",
  punchy: "짧고 강렬하며 행동을 유도하는 카피라이팅으로 작성해주세요.",
  playful: "재치있고 위트있는 톤으로 작성해주세요.",
};

export const TONE_LABELS: Record<ToneAndManner, string> = {
  formal: "전문적인",
  casual: "친근한",
  punchy: "강렬한",
  playful: "재치있는",
};

// ========== 공통 타입 ==========

export interface AIServiceConfig {
  /** API 키 */
  apiKey?: string;
  /** 모델 (gpt-4o, claude-3.5-sonnet, gemini-pro 등) */
  model?: string;
  /** API 엔드포인트 */
  endpoint?: string;
  /** 스트리밍 활성화 */
  streaming?: boolean;
  /** 타임아웃 (ms) */
  timeout?: number;
}

export interface AIError {
  code: string;
  message: string;
}

// ========== 텍스트 생성 ==========

export interface TextGenerationRequest {
  /** 사용자 프롬프트 */
  prompt: string;
  /** 톤앤매너 */
  tone?: ToneAndManner;
  /** 컨텍스트 */
  context?: {
    /** 노드 타입 (H1, Text, Button 등) */
    nodeType?: string;
    /** 상위 섹션 정보 */
    parentContext?: string;
    /** 브랜드/서비스 이름 */
    brandName?: string;
    /** 언어 */
    language?: "ko" | "en";
  };
  /** 최대 대안 개수 */
  maxAlternatives?: number;
}

export interface TextGenerationResponse {
  /** 메인 텍스트 */
  text: string;
  /** 대안 텍스트들 */
  alternatives?: string[];
  /** 사용된 톤 */
  tone: ToneAndManner;
}

// ========== 컴포넌트 생성 ==========

export interface ComponentGenerationRequest {
  /** 사용자 프롬프트 (예: "3개 카드가 있는 기능 소개 섹션") */
  prompt: string;
  /** 컨텍스트 */
  context?: {
    /** 부모 노드 */
    parentNode?: EditorNode;
    /** 형제 노드들 */
    siblings?: EditorNode[];
    /** 테마 색상 */
    themeColors?: string[];
  };
  /** 톤앤매너 (텍스트 콘텐츠에 적용) */
  tone?: ToneAndManner;
}

export interface ComponentGenerationResponse {
  /** 생성된 노드 */
  node: EditorNode;
  /** 대안 노드들 */
  alternatives?: EditorNode[];
  /** 설명 */
  explanation?: string;
}

// ========== 페이지 생성 ==========

export interface PageGenerationRequest {
  /** 페이지 설명 */
  description: string;
  /** 섹션 목록 (예: ['hero', 'features', 'pricing', 'footer']) */
  sections?: string[];
  /** 스타일 */
  style?: "minimal" | "modern" | "playful" | "corporate";
  /** 톤앤매너 */
  tone?: ToneAndManner;
  /** 브랜드/서비스 이름 */
  brandName?: string;
}

export interface PageGenerationResponse {
  /** 전체 페이지 스키마 */
  schema: EditorNode;
  /** 섹션별 분류 */
  sectionBreakdown?: {
    id: string;
    name: string;
    description: string;
  }[];
}

// ========== 스트리밍 ==========

export interface StreamingCallbacks {
  /** 노드가 생성될 때마다 호출 */
  onNodeGenerated?: (node: EditorNode, index: number) => void;
  /** 텍스트 청크가 생성될 때마다 호출 */
  onTextChunk?: (chunk: string) => void;
  /** 진행률 업데이트 */
  onProgress?: (progress: number) => void;
  /** 완료 */
  onComplete?: () => void;
  /** 에러 */
  onError?: (error: AIError) => void;
}

// ========== AI 서비스 인터페이스 ==========

export interface AIService {
  /** 텍스트 생성 */
  generateText(request: TextGenerationRequest): Promise<TextGenerationResponse>;

  /** 컴포넌트 생성 */
  generateComponent(request: ComponentGenerationRequest): Promise<ComponentGenerationResponse>;

  /** 페이지 생성 */
  generatePage(request: PageGenerationRequest): Promise<PageGenerationResponse>;

  /** 스트리밍 페이지 생성 */
  generatePageStreaming?(
    request: PageGenerationRequest,
    callbacks: StreamingCallbacks
  ): Promise<void>;

  /** 설정 업데이트 */
  configure(config: Partial<AIServiceConfig>): void;
}

// ========== 시스템 프롬프트 ==========

const SYSTEM_PROMPTS = {
  textGeneration: `당신은 웹사이트 카피라이터입니다.
사용자의 요청에 맞는 텍스트를 생성합니다.
주어진 톤앤매너를 정확히 따르세요.
한국어로 작성하세요.`,

  componentGeneration: `당신은 SDUI 컴포넌트 생성 전문가입니다.
사용자의 요청을 EditorNode JSON 구조로 변환합니다.

사용 가능한 컴포넌트 타입:
- 레이아웃: Box, Flex, Grid, Section, Container, Spacer, Divider
- 타이포그래피: Text, H1, H2, H3, H4, Link
- UI: Button, Badge, Avatar, Card, CardHeader, CardTitle, CardContent, CardFooter
- 폼: Input, Textarea, Label, Checkbox, Switch
- 아이콘: Icon (name으로 아이콘 지정)

JSON 형식으로만 응답하세요.`,

  pageGeneration: `당신은 랜딩페이지 디자이너입니다.
사용자의 요청을 완전한 페이지 구조(EditorNode)로 변환합니다.

반응형 클래스를 사용하세요 (sm:, md:, lg:).
각 섹션은 Section 컴포넌트로 감싸세요.
id는 고유하게 nanoid 형식으로 생성하세요.

JSON 형식으로만 응답하세요.`,
};

// ========== Mock 구현 (개발용) ==========

/**
 * Mock AI Service - 개발/테스트용
 */
export class MockAIService implements AIService {
  private config: AIServiceConfig = {};

  configure(config: Partial<AIServiceConfig>) {
    this.config = { ...this.config, ...config };
  }

  async generateText(request: TextGenerationRequest): Promise<TextGenerationResponse> {
    // 시뮬레이션 딜레이
    await new Promise((resolve) => setTimeout(resolve, 500));

    const tone = request.tone || "casual";
    const samples: Record<ToneAndManner, string[]> = {
      formal: [
        "고객님의 성공적인 비즈니스를 위해 최선을 다하겠습니다.",
        "신뢰할 수 있는 파트너로서 함께 성장하겠습니다.",
        "전문적인 서비스로 최상의 결과를 제공합니다.",
      ],
      casual: [
        "함께하면 뭐든 쉬워져요!",
        "지금 바로 시작해보세요 :)",
        "궁금한 건 언제든 물어봐요~",
      ],
      punchy: [
        "지금 시작하세요.",
        "단 3분. 그게 전부입니다.",
        "더 이상 기다리지 마세요.",
      ],
      playful: [
        "와우! 이거 진짜 대박이에요 ✨",
        "준비됐나요? 모험을 떠나볼까요!",
        "재미없으면 환불해드릴게요 (농담)",
      ],
    };

    const texts = samples[tone];
    const randomIndex = Math.floor(Math.random() * texts.length);

    return {
      text: texts[randomIndex],
      alternatives: texts.filter((_, i) => i !== randomIndex),
      tone,
    };
  }

  async generateComponent(
    request: ComponentGenerationRequest
  ): Promise<ComponentGenerationResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 간단한 카드 컴포넌트 생성
    const node: EditorNode = {
      id: `ai-${Date.now()}`,
      type: "Card",
      props: { className: "p-6" },
      children: [
        {
          id: `ai-title-${Date.now()}`,
          type: "H3",
          props: { align: "left" },
          children: request.prompt.slice(0, 20) + "...",
        },
        {
          id: `ai-text-${Date.now()}`,
          type: "Text",
          props: { variant: "muted" },
          children: "AI가 생성한 컴포넌트입니다.",
        },
      ],
    };

    return {
      node,
      explanation: "기본 카드 컴포넌트가 생성되었습니다.",
    };
  }

  async generatePage(request: PageGenerationRequest): Promise<PageGenerationResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const sections = request.sections || ["hero", "features", "cta"];
    const children: EditorNode[] = [];

    if (sections.includes("hero")) {
      children.push({
        id: `hero-${Date.now()}`,
        type: "Section",
        props: { className: "py-20 text-center" },
        children: [
          {
            id: `hero-title-${Date.now()}`,
            type: "H1",
            props: { align: "center" },
            children: request.brandName || "환영합니다",
          },
          {
            id: `hero-desc-${Date.now()}`,
            type: "Text",
            props: { variant: "lead", align: "center" },
            children: request.description.slice(0, 100),
          },
        ],
      });
    }

    if (sections.includes("features")) {
      children.push({
        id: `features-${Date.now()}`,
        type: "Section",
        props: { className: "py-16" },
        children: [
          {
            id: `features-grid-${Date.now()}`,
            type: "Grid",
            props: { cols: 3, gap: 6 },
            children: [1, 2, 3].map((i) => ({
              id: `feat-${i}-${Date.now()}`,
              type: "Card",
              props: { className: "p-6" },
              children: [
                {
                  id: `feat-title-${i}-${Date.now()}`,
                  type: "H4",
                  children: `기능 ${i}`,
                },
              ],
            })),
          },
        ],
      });
    }

    if (sections.includes("cta")) {
      children.push({
        id: `cta-${Date.now()}`,
        type: "Section",
        props: { className: "py-16 text-center bg-primary/5" },
        children: [
          {
            id: `cta-title-${Date.now()}`,
            type: "H2",
            props: { align: "center" },
            children: "지금 시작하세요",
          },
          {
            id: `cta-btn-${Date.now()}`,
            type: "Button",
            props: { size: "lg" },
            children: "무료로 시작하기",
          },
        ],
      });
    }

    return {
      schema: {
        id: `page-${Date.now()}`,
        type: "Box",
        children,
      },
      sectionBreakdown: sections.map((s) => ({
        id: s,
        name: s.charAt(0).toUpperCase() + s.slice(1),
        description: `${s} 섹션`,
      })),
    };
  }
}

// ========== OpenAI 구현 (실제 연동) ==========

/**
 * OpenAI API 연동 서비스
 */
export class OpenAIService implements AIService {
  private config: AIServiceConfig;

  constructor(config: AIServiceConfig = {}) {
    this.config = {
      model: "gpt-4o-mini",
      timeout: 30000,
      streaming: false,
      ...config,
    };
  }

  configure(config: Partial<AIServiceConfig>) {
    this.config = { ...this.config, ...config };
  }

  private async callAPI(messages: { role: string; content: string }[]): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error("OpenAI API 키가 설정되지 않았습니다.");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API 오류: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  }

  async generateText(request: TextGenerationRequest): Promise<TextGenerationResponse> {
    const tone = request.tone || "casual";
    const tonePrompt = TONE_PROMPTS[tone];

    const messages = [
      { role: "system", content: SYSTEM_PROMPTS.textGeneration },
      {
        role: "user",
        content: `${tonePrompt}\n\n요청: ${request.prompt}\n\n컨텍스트: ${JSON.stringify(request.context || {})}`,
      },
    ];

    const response = await this.callAPI(messages);

    return {
      text: response,
      tone,
    };
  }

  async generateComponent(
    request: ComponentGenerationRequest
  ): Promise<ComponentGenerationResponse> {
    const messages = [
      { role: "system", content: SYSTEM_PROMPTS.componentGeneration },
      {
        role: "user",
        content: `다음 요청에 맞는 EditorNode JSON을 생성하세요:\n\n${request.prompt}\n\n컨텍스트: ${JSON.stringify(request.context || {})}`,
      },
    ];

    const response = await this.callAPI(messages);

    try {
      const node = JSON.parse(response);
      return { node };
    } catch {
      throw new Error("AI 응답을 JSON으로 파싱할 수 없습니다.");
    }
  }

  async generatePage(request: PageGenerationRequest): Promise<PageGenerationResponse> {
    const messages = [
      { role: "system", content: SYSTEM_PROMPTS.pageGeneration },
      {
        role: "user",
        content: `다음 요청에 맞는 전체 페이지 EditorNode JSON을 생성하세요:

설명: ${request.description}
섹션: ${(request.sections || ["hero", "features", "cta"]).join(", ")}
스타일: ${request.style || "modern"}
브랜드: ${request.brandName || "미정"}
톤: ${request.tone || "casual"}`,
      },
    ];

    const response = await this.callAPI(messages);

    try {
      const schema = JSON.parse(response);
      return { schema };
    } catch {
      throw new Error("AI 응답을 JSON으로 파싱할 수 없습니다.");
    }
  }
}

// ========== 서비스 인스턴스 ==========

/** 기본 AI 서비스 (Mock - 개발용) */
export const defaultAIService: AIService = new MockAIService();

/** AI 서비스 팩토리 */
export function createAIService(
  provider: "mock" | "openai" = "mock",
  config: AIServiceConfig = {}
): AIService {
  switch (provider) {
    case "openai":
      return new OpenAIService(config);
    default:
      return new MockAIService();
  }
}
