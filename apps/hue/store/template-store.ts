/**
 * Template Store
 *
 * 템플릿 저장/관리
 * - 사용자 정의 템플릿
 * - 기본 제공 템플릿
 * - localStorage 영속화
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { EditorNode } from "@/types";

/**
 * 템플릿 카테고리
 */
export type TemplateCategory =
  | "layout"      // 레이아웃 조합
  | "card"        // 카드 패턴
  | "hero"        // 히어로 섹션
  | "form"        // 폼 패턴
  | "navigation"  // 네비게이션
  | "custom";     // 사용자 정의

/**
 * 템플릿 정의
 */
export interface Template {
  id: string;
  name: string;
  description?: string;
  category: TemplateCategory;
  thumbnail?: string;
  /** 템플릿 노드 (저장 시 ID 재생성 필요) */
  node: EditorNode;
  /** 생성 시간 */
  createdAt: number;
  /** 사용 횟수 */
  useCount: number;
  /** 기본 제공 여부 */
  isBuiltIn?: boolean;
  /** Pro 템플릿 여부 */
  isPro?: boolean;
}

/**
 * 템플릿 스토어 상태
 */
interface TemplateState {
  templates: Template[];
}

/**
 * 템플릿 스토어 액션
 */
interface TemplateActions {
  addTemplate: (template: Omit<Template, "id" | "createdAt" | "useCount">) => string;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  incrementUseCount: (id: string) => void;
  getTemplatesByCategory: (category: TemplateCategory) => Template[];
  getRecentTemplates: (limit?: number) => Template[];
  getPopularTemplates: (limit?: number) => Template[];
}

/**
 * 기본 제공 템플릿
 */
const BUILT_IN_TEMPLATES: Template[] = [
  // ========== HERO 섹션 ==========
  {
    id: "builtin-hero-simple",
    name: "심플 히어로",
    description: "제목 + 설명 + 버튼 조합",
    category: "hero",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    node: {
      id: "hero-root",
      type: "Section",
      props: { className: "py-16 md:py-24 text-center px-4" },
      children: [
        {
          id: "hero-title",
          type: "H1",
          props: { align: "center", className: "text-3xl md:text-5xl" },
          children: "멋진 제목을 입력하세요",
        },
        {
          id: "hero-desc",
          type: "Text",
          props: { variant: "lead", align: "center", className: "mt-4 max-w-2xl mx-auto text-base md:text-lg" },
          children: "여기에 설명을 입력하세요. 방문자에게 서비스의 가치를 전달하세요.",
        },
        {
          id: "hero-cta",
          type: "Flex",
          props: { justify: "center", gap: 3, className: "mt-8 flex-col sm:flex-row" },
          children: [
            {
              id: "hero-btn-primary",
              type: "Button",
              props: { variant: "default", size: "lg" },
              children: "시작하기",
            },
            {
              id: "hero-btn-secondary",
              type: "Button",
              props: { variant: "outline", size: "lg" },
              children: "더 알아보기",
            },
          ],
        },
      ],
    },
  },
  {
    id: "builtin-hero-gradient",
    name: "그라데이션 히어로",
    description: "그라데이션 배경 + 중앙 정렬",
    category: "hero",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    isPro: true,
    node: {
      id: "hero-gradient",
      type: "Section",
      props: { className: "py-24 md:py-32 text-center px-4 bg-gradient-to-b from-primary/10 to-background" },
      children: [
        {
          id: "hero-badge",
          type: "Box",
          props: { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6" },
          children: "✨ 새로운 기능 출시",
        },
        {
          id: "hero-title",
          type: "H1",
          props: { align: "center", className: "text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text" },
          children: "혁신적인 솔루션",
        },
        {
          id: "hero-desc",
          type: "Text",
          props: { variant: "lead", align: "center", className: "mt-6 max-w-3xl mx-auto" },
          children: "더 빠르고 효율적인 방식으로 목표를 달성하세요.",
        },
        {
          id: "hero-cta",
          type: "Flex",
          props: { justify: "center", gap: 4, className: "mt-10" },
          children: [
            { id: "btn-start", type: "Button", props: { size: "lg" }, children: "무료로 시작하기" },
            { id: "btn-demo", type: "Button", props: { variant: "ghost", size: "lg" }, children: "데모 보기 →" },
          ],
        },
      ],
    },
  },

  // ========== CARD 패턴 ==========
  {
    id: "builtin-card-feature",
    name: "기능 카드",
    description: "아이콘 + 제목 + 설명 카드",
    category: "card",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    node: {
      id: "feature-card",
      type: "Card",
      props: { className: "p-6" },
      children: [
        {
          id: "feature-icon",
          type: "Icon",
          props: { name: "star", size: 32, className: "text-primary mb-4" },
        },
        {
          id: "feature-title",
          type: "H4",
          props: { align: "left" },
          children: "기능 제목",
        },
        {
          id: "feature-desc",
          type: "Text",
          props: { variant: "muted", align: "left", className: "mt-2" },
          children: "이 기능에 대한 설명을 입력하세요.",
        },
      ],
    },
  },
  {
    id: "builtin-card-testimonial",
    name: "후기 카드",
    description: "사용자 후기/리뷰 카드",
    category: "card",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    node: {
      id: "testimonial-card",
      type: "Card",
      props: { className: "p-6" },
      children: [
        {
          id: "quote",
          type: "Text",
          props: { className: "text-lg italic" },
          children: "\"정말 훌륭한 서비스입니다. 강력 추천합니다!\"",
        },
        {
          id: "author-row",
          type: "Flex",
          props: { align: "center", gap: 3, className: "mt-4" },
          children: [
            { id: "avatar", type: "Box", props: { className: "w-10 h-10 rounded-full bg-muted" } },
            {
              id: "author-info",
              type: "Box",
              children: [
                { id: "author-name", type: "Text", props: { className: "font-medium" }, children: "김철수" },
                { id: "author-role", type: "Text", props: { variant: "muted", className: "text-sm" }, children: "CEO, 스타트업" },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: "builtin-card-pricing",
    name: "프라이싱 카드",
    description: "가격표 카드",
    category: "card",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    isPro: true,
    node: {
      id: "pricing-card",
      type: "Card",
      props: { className: "p-6 text-center" },
      children: [
        { id: "plan-name", type: "Text", props: { className: "text-sm font-medium text-muted-foreground uppercase tracking-wide" }, children: "Pro" },
        { id: "price-row", type: "Flex", props: { justify: "center", align: "baseline", gap: 1, className: "mt-4" }, children: [
          { id: "currency", type: "Text", props: { className: "text-2xl" }, children: "₩" },
          { id: "price", type: "Text", props: { className: "text-5xl font-bold" }, children: "29,000" },
          { id: "period", type: "Text", props: { variant: "muted" }, children: "/월" },
        ]},
        { id: "desc", type: "Text", props: { variant: "muted", className: "mt-2" }, children: "성장하는 팀을 위한 플랜" },
        { id: "features", type: "Flex", props: { direction: "column", gap: 2, className: "mt-6 text-left" }, children: [
          { id: "f1", type: "Flex", props: { align: "center", gap: 2 }, children: [
            { id: "f1-icon", type: "Icon", props: { name: "check", size: 16, className: "text-primary" } },
            { id: "f1-text", type: "Text", children: "무제한 프로젝트" },
          ]},
          { id: "f2", type: "Flex", props: { align: "center", gap: 2 }, children: [
            { id: "f2-icon", type: "Icon", props: { name: "check", size: 16, className: "text-primary" } },
            { id: "f2-text", type: "Text", children: "우선 지원" },
          ]},
          { id: "f3", type: "Flex", props: { align: "center", gap: 2 }, children: [
            { id: "f3-icon", type: "Icon", props: { name: "check", size: 16, className: "text-primary" } },
            { id: "f3-text", type: "Text", children: "고급 분석" },
          ]},
        ]},
        { id: "cta-btn", type: "Button", props: { className: "w-full mt-6" }, children: "시작하기" },
      ],
    },
  },

  // ========== LAYOUT 레이아웃 ==========
  {
    id: "builtin-grid-features",
    name: "기능 그리드 (3열)",
    description: "3개 기능 카드 그리드",
    category: "layout",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    node: {
      id: "features-grid",
      type: "Grid",
      props: { cols: 1, className: "sm:grid-cols-2 lg:grid-cols-3", gap: 6 },
      children: [
        {
          id: "feat1",
          type: "Card",
          props: { className: "p-6" },
          children: [
            { id: "feat1-icon", type: "Icon", props: { name: "zap", size: 28, className: "text-primary mb-3" } },
            { id: "feat1-title", type: "H4", props: { align: "left" }, children: "빠른 속도" },
            { id: "feat1-desc", type: "Text", props: { variant: "muted", align: "left", className: "mt-2" }, children: "빠르고 효율적인 성능을 제공합니다." },
          ],
        },
        {
          id: "feat2",
          type: "Card",
          props: { className: "p-6" },
          children: [
            { id: "feat2-icon", type: "Icon", props: { name: "shield", size: 28, className: "text-primary mb-3" } },
            { id: "feat2-title", type: "H4", props: { align: "left" }, children: "안전한 보안" },
            { id: "feat2-desc", type: "Text", props: { variant: "muted", align: "left", className: "mt-2" }, children: "최고 수준의 보안을 보장합니다." },
          ],
        },
        {
          id: "feat3",
          type: "Card",
          props: { className: "p-6" },
          children: [
            { id: "feat3-icon", type: "Icon", props: { name: "heart", size: 28, className: "text-primary mb-3" } },
            { id: "feat3-title", type: "H4", props: { align: "left" }, children: "사용자 친화적" },
            { id: "feat3-desc", type: "Text", props: { variant: "muted", align: "left", className: "mt-2" }, children: "누구나 쉽게 사용할 수 있습니다." },
          ],
        },
      ],
    },
  },
  {
    id: "builtin-pricing-section",
    name: "프라이싱 섹션",
    description: "3개 플랜 가격표",
    category: "layout",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    isPro: true,
    node: {
      id: "pricing-section",
      type: "Section",
      props: { className: "py-16 px-4" },
      children: [
        { id: "section-title", type: "H2", props: { align: "center" }, children: "심플한 가격 정책" },
        { id: "section-desc", type: "Text", props: { variant: "lead", align: "center", className: "mt-2" }, children: "숨겨진 비용 없이 투명한 가격" },
        {
          id: "pricing-grid",
          type: "Grid",
          props: { cols: 1, className: "sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mt-12", gap: 6 },
          children: [
            // Free
            { id: "plan-free", type: "Card", props: { className: "p-6 text-center" }, children: [
              { id: "free-name", type: "Text", props: { className: "font-medium" }, children: "Free" },
              { id: "free-price", type: "Text", props: { className: "text-4xl font-bold mt-4" }, children: "₩0" },
              { id: "free-desc", type: "Text", props: { variant: "muted", className: "mt-2" }, children: "개인 사용자용" },
              { id: "free-btn", type: "Button", props: { variant: "outline", className: "w-full mt-6" }, children: "시작하기" },
            ]},
            // Pro (highlighted)
            { id: "plan-pro", type: "Card", props: { className: "p-6 text-center border-primary ring-1 ring-primary" }, children: [
              { id: "pro-badge", type: "Box", props: { className: "inline-block px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full mb-4" }, children: "인기" },
              { id: "pro-name", type: "Text", props: { className: "font-medium" }, children: "Pro" },
              { id: "pro-price", type: "Text", props: { className: "text-4xl font-bold mt-4" }, children: "₩29,000" },
              { id: "pro-desc", type: "Text", props: { variant: "muted", className: "mt-2" }, children: "팀 협업용" },
              { id: "pro-btn", type: "Button", props: { className: "w-full mt-6" }, children: "시작하기" },
            ]},
            // Enterprise
            { id: "plan-ent", type: "Card", props: { className: "p-6 text-center" }, children: [
              { id: "ent-name", type: "Text", props: { className: "font-medium" }, children: "Enterprise" },
              { id: "ent-price", type: "Text", props: { className: "text-4xl font-bold mt-4" }, children: "문의" },
              { id: "ent-desc", type: "Text", props: { variant: "muted", className: "mt-2" }, children: "대기업용 맞춤형" },
              { id: "ent-btn", type: "Button", props: { variant: "outline", className: "w-full mt-6" }, children: "문의하기" },
            ]},
          ],
        },
      ],
    },
  },

  // ========== FORM 폼 ==========
  {
    id: "builtin-form-contact",
    name: "연락처 폼",
    description: "이름 + 이메일 + 메시지 폼",
    category: "form",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    node: {
      id: "contact-form",
      type: "Card",
      props: { className: "p-6 max-w-md w-full" },
      children: [
        { id: "form-title", type: "H3", props: { align: "left" }, children: "문의하기" },
        {
          id: "form-fields",
          type: "Flex",
          props: { direction: "column", gap: 4, className: "mt-4" },
          children: [
            {
              id: "field-name",
              type: "Box",
              children: [
                { id: "label-name", type: "Label", children: "이름" },
                { id: "input-name", type: "Input", props: { placeholder: "홍길동" } },
              ],
            },
            {
              id: "field-email",
              type: "Box",
              children: [
                { id: "label-email", type: "Label", children: "이메일" },
                { id: "input-email", type: "Input", props: { placeholder: "example@email.com" } },
              ],
            },
            {
              id: "field-message",
              type: "Box",
              children: [
                { id: "label-message", type: "Label", children: "메시지" },
                { id: "input-message", type: "Textarea", props: { placeholder: "문의 내용을 입력하세요", rows: 4 } },
              ],
            },
            { id: "submit-btn", type: "Button", props: { className: "w-full" }, children: "보내기" },
          ],
        },
      ],
    },
  },
  {
    id: "builtin-form-login",
    name: "로그인 폼",
    description: "이메일 + 비밀번호 로그인",
    category: "form",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    node: {
      id: "login-form",
      type: "Card",
      props: { className: "p-8 max-w-sm w-full" },
      children: [
        { id: "form-title", type: "H2", props: { align: "center" }, children: "로그인" },
        { id: "form-desc", type: "Text", props: { variant: "muted", align: "center", className: "mt-2" }, children: "계정에 로그인하세요" },
        {
          id: "form-fields",
          type: "Flex",
          props: { direction: "column", gap: 4, className: "mt-6" },
          children: [
            {
              id: "field-email",
              type: "Box",
              children: [
                { id: "label-email", type: "Label", children: "이메일" },
                { id: "input-email", type: "Input", props: { type: "email", placeholder: "you@example.com" } },
              ],
            },
            {
              id: "field-password",
              type: "Box",
              children: [
                { id: "pw-label-row", type: "Flex", props: { justify: "between", align: "center" }, children: [
                  { id: "label-pw", type: "Label", children: "비밀번호" },
                  { id: "forgot-link", type: "Text", props: { className: "text-sm text-primary cursor-pointer" }, children: "비밀번호 찾기" },
                ]},
                { id: "input-pw", type: "Input", props: { type: "password", placeholder: "••••••••" } },
              ],
            },
            { id: "login-btn", type: "Button", props: { className: "w-full" }, children: "로그인" },
          ],
        },
        { id: "signup-link", type: "Flex", props: { justify: "center", gap: 1, className: "mt-4 text-sm" }, children: [
          { id: "signup-text-1", type: "Text", children: "계정이 없으신가요?" },
          { id: "signup-text-2", type: "Text", props: { className: "text-primary font-medium cursor-pointer" }, children: "가입하기" },
        ]},
      ],
    },
  },
  {
    id: "builtin-form-signup",
    name: "회원가입 폼",
    description: "이름 + 이메일 + 비밀번호",
    category: "form",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    node: {
      id: "signup-form",
      type: "Card",
      props: { className: "p-8 max-w-sm w-full" },
      children: [
        { id: "form-title", type: "H2", props: { align: "center" }, children: "회원가입" },
        { id: "form-desc", type: "Text", props: { variant: "muted", align: "center", className: "mt-2" }, children: "새 계정을 만드세요" },
        {
          id: "form-fields",
          type: "Flex",
          props: { direction: "column", gap: 4, className: "mt-6" },
          children: [
            { id: "field-name", type: "Box", children: [
              { id: "label-name", type: "Label", children: "이름" },
              { id: "input-name", type: "Input", props: { placeholder: "홍길동" } },
            ]},
            { id: "field-email", type: "Box", children: [
              { id: "label-email", type: "Label", children: "이메일" },
              { id: "input-email", type: "Input", props: { type: "email", placeholder: "you@example.com" } },
            ]},
            { id: "field-pw", type: "Box", children: [
              { id: "label-pw", type: "Label", children: "비밀번호" },
              { id: "input-pw", type: "Input", props: { type: "password", placeholder: "8자 이상" } },
            ]},
            { id: "field-pw2", type: "Box", children: [
              { id: "label-pw2", type: "Label", children: "비밀번호 확인" },
              { id: "input-pw2", type: "Input", props: { type: "password", placeholder: "비밀번호 재입력" } },
            ]},
            { id: "signup-btn", type: "Button", props: { className: "w-full" }, children: "가입하기" },
          ],
        },
        { id: "login-link", type: "Flex", props: { justify: "center", gap: 1, className: "mt-4 text-sm" }, children: [
          { id: "login-text-1", type: "Text", children: "이미 계정이 있으신가요?" },
          { id: "login-text-2", type: "Text", props: { className: "text-primary font-medium cursor-pointer" }, children: "로그인" },
        ]},
      ],
    },
  },

  // ========== NAVIGATION 네비게이션 ==========
  {
    id: "builtin-nav-header",
    name: "헤더 네비게이션",
    description: "로고 + 메뉴 + 버튼 헤더",
    category: "navigation",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    node: {
      id: "header-nav",
      type: "Box",
      props: { className: "w-full border-b border-border py-4 px-4 md:px-8" },
      children: [
        {
          id: "nav-content",
          type: "Flex",
          props: { justify: "between", align: "center", className: "max-w-6xl mx-auto" },
          children: [
            { id: "logo", type: "Text", props: { className: "text-xl font-bold" }, children: "Logo" },
            { id: "nav-links", type: "Flex", props: { gap: 6, className: "hidden md:flex" }, children: [
              { id: "link1", type: "Text", props: { className: "text-sm text-muted-foreground hover:text-foreground cursor-pointer" }, children: "기능" },
              { id: "link2", type: "Text", props: { className: "text-sm text-muted-foreground hover:text-foreground cursor-pointer" }, children: "가격" },
              { id: "link3", type: "Text", props: { className: "text-sm text-muted-foreground hover:text-foreground cursor-pointer" }, children: "문서" },
              { id: "link4", type: "Text", props: { className: "text-sm text-muted-foreground hover:text-foreground cursor-pointer" }, children: "블로그" },
            ]},
            { id: "nav-cta", type: "Flex", props: { gap: 2 }, children: [
              { id: "login-btn", type: "Button", props: { variant: "ghost", size: "sm" }, children: "로그인" },
              { id: "signup-btn", type: "Button", props: { size: "sm" }, children: "시작하기" },
            ]},
          ],
        },
      ],
    },
  },
  {
    id: "builtin-nav-footer",
    name: "푸터",
    description: "로고 + 링크 그룹 + 저작권",
    category: "navigation",
    createdAt: Date.now(),
    useCount: 0,
    isBuiltIn: true,
    node: {
      id: "footer",
      type: "Box",
      props: { className: "w-full border-t border-border py-12 px-4 md:px-8 bg-muted/30" },
      children: [
        {
          id: "footer-content",
          type: "Box",
          props: { className: "max-w-6xl mx-auto" },
          children: [
            {
              id: "footer-grid",
              type: "Grid",
              props: { cols: 2, className: "md:grid-cols-4", gap: 8 },
              children: [
                { id: "col1", type: "Box", children: [
                  { id: "col1-title", type: "Text", props: { className: "font-semibold mb-4" }, children: "제품" },
                  { id: "col1-links", type: "Flex", props: { direction: "column", gap: 2 }, children: [
                    { id: "c1l1", type: "Text", props: { variant: "muted", className: "text-sm cursor-pointer hover:text-foreground" }, children: "기능" },
                    { id: "c1l2", type: "Text", props: { variant: "muted", className: "text-sm cursor-pointer hover:text-foreground" }, children: "가격" },
                    { id: "c1l3", type: "Text", props: { variant: "muted", className: "text-sm cursor-pointer hover:text-foreground" }, children: "통합" },
                  ]},
                ]},
                { id: "col2", type: "Box", children: [
                  { id: "col2-title", type: "Text", props: { className: "font-semibold mb-4" }, children: "회사" },
                  { id: "col2-links", type: "Flex", props: { direction: "column", gap: 2 }, children: [
                    { id: "c2l1", type: "Text", props: { variant: "muted", className: "text-sm cursor-pointer hover:text-foreground" }, children: "소개" },
                    { id: "c2l2", type: "Text", props: { variant: "muted", className: "text-sm cursor-pointer hover:text-foreground" }, children: "블로그" },
                    { id: "c2l3", type: "Text", props: { variant: "muted", className: "text-sm cursor-pointer hover:text-foreground" }, children: "채용" },
                  ]},
                ]},
                { id: "col3", type: "Box", children: [
                  { id: "col3-title", type: "Text", props: { className: "font-semibold mb-4" }, children: "리소스" },
                  { id: "col3-links", type: "Flex", props: { direction: "column", gap: 2 }, children: [
                    { id: "c3l1", type: "Text", props: { variant: "muted", className: "text-sm cursor-pointer hover:text-foreground" }, children: "문서" },
                    { id: "c3l2", type: "Text", props: { variant: "muted", className: "text-sm cursor-pointer hover:text-foreground" }, children: "가이드" },
                    { id: "c3l3", type: "Text", props: { variant: "muted", className: "text-sm cursor-pointer hover:text-foreground" }, children: "API" },
                  ]},
                ]},
                { id: "col4", type: "Box", children: [
                  { id: "col4-title", type: "Text", props: { className: "font-semibold mb-4" }, children: "법적 고지" },
                  { id: "col4-links", type: "Flex", props: { direction: "column", gap: 2 }, children: [
                    { id: "c4l1", type: "Text", props: { variant: "muted", className: "text-sm cursor-pointer hover:text-foreground" }, children: "개인정보처리방침" },
                    { id: "c4l2", type: "Text", props: { variant: "muted", className: "text-sm cursor-pointer hover:text-foreground" }, children: "이용약관" },
                  ]},
                ]},
              ],
            },
            { id: "footer-bottom", type: "Flex", props: { justify: "between", align: "center", className: "mt-12 pt-8 border-t border-border" }, children: [
              { id: "copyright", type: "Text", props: { variant: "muted", className: "text-sm" }, children: "© 2025 Company. All rights reserved." },
              { id: "social-links", type: "Flex", props: { gap: 4 }, children: [
                { id: "social1", type: "Icon", props: { name: "twitter", size: 20, className: "text-muted-foreground hover:text-foreground cursor-pointer" } },
                { id: "social2", type: "Icon", props: { name: "github", size: 20, className: "text-muted-foreground hover:text-foreground cursor-pointer" } },
              ]},
            ]},
          ],
        },
      ],
    },
  },
];

/**
 * 템플릿 스토어
 */
export const useTemplateStore = create<TemplateState & TemplateActions>()(
  persist(
    (set, get) => ({
      templates: BUILT_IN_TEMPLATES,

      addTemplate: (template) => {
        const id = nanoid();
        const newTemplate: Template = {
          ...template,
          id,
          createdAt: Date.now(),
          useCount: 0,
        };
        set((state) => ({
          templates: [...state.templates, newTemplate],
        }));
        return id;
      },

      updateTemplate: (id, updates) => {
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
      },

      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id || t.isBuiltIn),
        }));
      },

      incrementUseCount: (id) => {
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id ? { ...t, useCount: t.useCount + 1 } : t
          ),
        }));
      },

      getTemplatesByCategory: (category) => {
        return get().templates.filter((t) => t.category === category);
      },

      getRecentTemplates: (limit = 5) => {
        return [...get().templates]
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, limit);
      },

      getPopularTemplates: (limit = 5) => {
        return [...get().templates]
          .sort((a, b) => b.useCount - a.useCount)
          .slice(0, limit);
      },
    }),
    {
      name: "hue-templates",
      partialize: (state) => ({
        // 사용자 정의 템플릿만 저장 (빌트인은 코드에서 제공)
        templates: state.templates.filter((t) => !t.isBuiltIn),
      }),
      merge: (persisted, current) => ({
        ...current,
        templates: [
          ...BUILT_IN_TEMPLATES,
          ...((persisted as TemplateState)?.templates || []),
        ],
      }),
    }
  )
);

/**
 * 카테고리 메타데이터
 */
export const TEMPLATE_CATEGORIES: Record<TemplateCategory, { label: string; icon: string }> = {
  layout: { label: "레이아웃", icon: "square" },
  card: { label: "카드", icon: "creditCard" },
  hero: { label: "히어로", icon: "star" },
  form: { label: "폼", icon: "fileText" },
  navigation: { label: "네비게이션", icon: "menu" },
  custom: { label: "사용자 정의", icon: "folder" },
};
