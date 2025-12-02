export type TranslationRecord = Record<string, unknown>;

export type TranslationLoader = (
  language: string,
  namespace: string
) => Promise<TranslationRecord>;

export interface ApiLoaderOptions {
  translationApiPath?: string;
  baseUrl?: string;
  localFallbackBaseUrl?: string;
  cacheTtlMs?: number;
  disableCache?: boolean;
  requestInit?:
    | RequestInit
    | ((language: string, namespace: string) => RequestInit | undefined);
  fetcher?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  logger?: Pick<typeof console, 'log' | 'warn' | 'error'>;
  /** 재시도 횟수 (기본값: 0, 재시도 안 함) */
  retryCount?: number;
  /** 재시도 지연 시간 (밀리초, 기본값: 1000) */
  retryDelay?: number;
}

export interface PreloadOptions {
  logger?: Pick<typeof console, 'log' | 'warn'>;
  suppressErrors?: boolean;
}

export type DefaultTranslations = Record<
  string,
  Record<string, TranslationRecord>
>;

