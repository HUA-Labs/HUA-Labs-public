/**
 * Context Store
 *
 * 에디터에서 미리보기용 컨텍스트 데이터 관리
 * Phase 2: Logic Engine - 조건부 렌더링 테스트용
 */

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getByPath } from "@/lib/condition-evaluator";

/**
 * 기본 컨텍스트 구조
 */
export interface PreviewContext {
  user: {
    isLoggedIn: boolean;
    name: string;
    email: string;
    role: "guest" | "member" | "admin";
    subscription: "free" | "pro" | "enterprise";
    avatar?: string;
  };
  cart: {
    items: Array<{ id: string; name: string; price: number }>;
    total: number;
    itemCount: number;
  };
  app: {
    theme: "light" | "dark" | "system";
    locale: "ko" | "en" | "ja";
    isMobile: boolean;
    isLoading: boolean;
  };
  // 커스텀 필드 (사용자 정의)
  custom: Record<string, unknown>;
}

/**
 * 프리셋 타입
 */
export type ContextPreset = "guest" | "member" | "admin" | "proUser" | "emptyCart" | "fullCart";

/**
 * 프리셋 정의
 */
const presets: Record<ContextPreset, Partial<PreviewContext>> = {
  guest: {
    user: {
      isLoggedIn: false,
      name: "",
      email: "",
      role: "guest",
      subscription: "free",
    },
    cart: {
      items: [],
      total: 0,
      itemCount: 0,
    },
  },
  member: {
    user: {
      isLoggedIn: true,
      name: "홍길동",
      email: "hong@example.com",
      role: "member",
      subscription: "free",
    },
  },
  admin: {
    user: {
      isLoggedIn: true,
      name: "관리자",
      email: "admin@example.com",
      role: "admin",
      subscription: "enterprise",
    },
  },
  proUser: {
    user: {
      isLoggedIn: true,
      name: "Pro 사용자",
      email: "pro@example.com",
      role: "member",
      subscription: "pro",
    },
  },
  emptyCart: {
    cart: {
      items: [],
      total: 0,
      itemCount: 0,
    },
  },
  fullCart: {
    cart: {
      items: [
        { id: "1", name: "상품 A", price: 10000 },
        { id: "2", name: "상품 B", price: 25000 },
        { id: "3", name: "상품 C", price: 15000 },
      ],
      total: 50000,
      itemCount: 3,
    },
  },
};

/**
 * 기본 컨텍스트
 */
const defaultContext: PreviewContext = {
  user: {
    isLoggedIn: false,
    name: "",
    email: "",
    role: "guest",
    subscription: "free",
  },
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
  },
  app: {
    theme: "light",
    locale: "ko",
    isMobile: false,
    isLoading: false,
  },
  custom: {},
};

/**
 * Context Store 상태
 */
interface ContextState {
  /** 현재 컨텍스트 데이터 */
  context: PreviewContext;
  /** 현재 프리셋 (없으면 custom) */
  currentPreset: ContextPreset | "custom";
  /** Context Panel 열림 상태 */
  isPanelOpen: boolean;
}

/**
 * Context Store 액션
 */
interface ContextActions {
  /** 특정 경로의 값 설정 */
  setValue: (path: string, value: unknown) => void;
  /** 프리셋 적용 */
  applyPreset: (preset: ContextPreset) => void;
  /** 컨텍스트 초기화 */
  resetContext: () => void;
  /** 전체 컨텍스트 설정 */
  setContext: (context: Partial<PreviewContext>) => void;
  /** 커스텀 필드 설정 */
  setCustomField: (key: string, value: unknown) => void;
  /** 커스텀 필드 제거 */
  removeCustomField: (key: string) => void;
  /** 패널 토글 */
  togglePanel: () => void;
  /** 패널 열기/닫기 */
  setPanel: (open: boolean) => void;
  /** 특정 경로의 값 가져오기 */
  getValue: (path: string) => unknown;
}

/**
 * 깊은 경로로 객체 값 설정 (제네릭 지원)
 */
function setByPath<T extends object>(obj: T, path: string, value: unknown): T {
  const keys = path.split(".");
  const result = { ...obj } as T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = { ...current[key] };
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

/**
 * Context Store
 */
export const useContextStore = create<ContextState & ContextActions>()(
  subscribeWithSelector((set, get) => ({
    context: defaultContext,
    currentPreset: "guest",
    isPanelOpen: false,

    setValue: (path, value) =>
      set((state) => ({
        context: setByPath(state.context, path, value),
        currentPreset: "custom",
      })),

    applyPreset: (preset) =>
      set((state) => {
        const presetData = presets[preset];
        return {
          context: {
            ...state.context,
            // Deep merge for nested objects
            user: { ...state.context.user, ...presetData.user },
            cart: { ...state.context.cart, ...presetData.cart },
            app: { ...state.context.app, ...presetData.app },
          },
          currentPreset: preset,
        };
      }),

    resetContext: () =>
      set({
        context: defaultContext,
        currentPreset: "guest",
      }),

    setContext: (partial) =>
      set((state) => ({
        context: {
          ...state.context,
          ...partial,
        },
        currentPreset: "custom",
      })),

    setCustomField: (key, value) =>
      set((state) => ({
        context: {
          ...state.context,
          custom: {
            ...state.context.custom,
            [key]: value,
          },
        },
        currentPreset: "custom",
      })),

    removeCustomField: (key) =>
      set((state) => {
        const { [key]: _, ...rest } = state.context.custom;
        return {
          context: {
            ...state.context,
            custom: rest,
          },
        };
      }),

    togglePanel: () =>
      set((state) => ({
        isPanelOpen: !state.isPanelOpen,
      })),

    setPanel: (open) =>
      set({
        isPanelOpen: open,
      }),

    getValue: (path) => {
      const { context } = get();
      return getByPath(context, path);
    },
  }))
);

/**
 * 컨텍스트만 구독하는 셀렉터
 */
export const usePreviewContext = () => useContextStore((s) => s.context);

/**
 * 패널 상태만 구독
 */
export const useContextPanelOpen = () => useContextStore((s) => s.isPanelOpen);

/**
 * 현재 프리셋만 구독
 */
export const useCurrentPreset = () => useContextStore((s) => s.currentPreset);

/**
 * 프리셋 목록
 */
export const CONTEXT_PRESETS: Array<{ id: ContextPreset; label: string; description: string }> = [
  { id: "guest", label: "게스트", description: "비로그인 사용자" },
  { id: "member", label: "회원", description: "일반 로그인 사용자" },
  { id: "proUser", label: "Pro 회원", description: "Pro 구독 사용자" },
  { id: "admin", label: "관리자", description: "관리자 권한" },
  { id: "emptyCart", label: "빈 장바구니", description: "장바구니 비어있음" },
  { id: "fullCart", label: "장바구니 있음", description: "상품 3개 담김" },
];
