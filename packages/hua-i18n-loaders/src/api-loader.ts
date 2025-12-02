import { ApiLoaderOptions, TranslationLoader, TranslationRecord } from './types';

interface CacheEntry {
  data: TranslationRecord;
  expiresAt: number;
}

const FIVE_MINUTES = 5 * 60 * 1000;

const defaultFetcher = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init);

export function createApiTranslationLoader(
  options: ApiLoaderOptions = {}
): TranslationLoader {
  const translationApiPath = options.translationApiPath ?? '/api/translations';
  const cacheTtlMs = options.cacheTtlMs ?? FIVE_MINUTES;
  const fetcher = options.fetcher ?? defaultFetcher;
  const logger = options.logger ?? console;
  const retryCount = options.retryCount ?? 0;
  const retryDelay = options.retryDelay ?? 1000;
  const localCache = new Map<string, CacheEntry>();
  const inFlightRequests = new Map<string, Promise<TranslationRecord>>();

  const buildUrl = (language: string, namespace: string) => {
    const safeNamespace = namespace.replace(/[^a-zA-Z0-9-_]/g, '');
    const path = `${translationApiPath}/${language}/${safeNamespace}`;

    if (typeof window !== 'undefined') {
      return path;
    }

    if (options.baseUrl) {
      return `${options.baseUrl}${path}`;
    }

    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return `${process.env.NEXT_PUBLIC_SITE_URL}${path}`;
    }

    if (process.env.VERCEL_URL) {
      const vercelUrl = process.env.VERCEL_URL.startsWith('http')
        ? process.env.VERCEL_URL
        : `https://${process.env.VERCEL_URL}`;
      return `${vercelUrl}${path}`;
    }

    const fallbackBase = options.localFallbackBaseUrl ?? 'http://localhost:3000';
    return `${fallbackBase}${path}`;
  };

  const getRequestInit = (language: string, namespace: string): RequestInit => {
    if (typeof options.requestInit === 'function') {
      return options.requestInit(language, namespace) ?? {};
    }

    return options.requestInit ?? {};
  };

  const getCached = (cacheKey: string) => {
    if (options.disableCache) {
      return null;
    }

    const entry = localCache.get(cacheKey);
    if (!entry) {
      return null;
    }

    if (entry.expiresAt < Date.now()) {
      localCache.delete(cacheKey);
      return null;
    }

    return entry.data;
  };

  const setCached = (cacheKey: string, data: TranslationRecord) => {
    if (options.disableCache) {
      return;
    }

    localCache.set(cacheKey, {
      data,
      expiresAt: Date.now() + cacheTtlMs
    });
  };

  const loadTranslations: TranslationLoader = async (language, namespace) => {
    const cacheKey = `${language}:${namespace}`;
    const cached = getCached(cacheKey);

    if (cached) {
      return cached;
    }

    const inFlight = inFlightRequests.get(cacheKey);
    if (inFlight) {
      return inFlight;
    }

    const url = buildUrl(language, namespace);
    const requestInit = getRequestInit(language, namespace);

    const performRequest = async (attempt: number): Promise<TranslationRecord> => {
      try {
        const response = await fetcher(url, {
          cache: 'no-store',
          ...requestInit
        });

        if (!response.ok) {
          throw new Error(
            `[i18n-loaders] Failed to load ${language}/${namespace} (${response.status})`
          );
        }

        const data = (await response.json()) as TranslationRecord;
        setCached(cacheKey, data);
        return data;
      } catch (error) {
        // 재시도 가능한 에러인지 확인 (네트워크 에러, 5xx 에러 등)
        const isRetryable = 
          error instanceof TypeError || // 네트워크 에러
          (error instanceof Error && error.message.includes('Failed to fetch')) ||
          (error instanceof Error && error.message.includes('NetworkError'));

        if (isRetryable && attempt < retryCount) {
          logger.warn?.(
            `[i18n-loaders] Translation fetch failed (attempt ${attempt + 1}/${retryCount + 1}), retrying...`,
            language,
            namespace,
            error
          );
          
          // 지수 백오프: 각 재시도마다 지연 시간 증가
          const delay = retryDelay * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
          
          return performRequest(attempt + 1);
        }

        // 재시도 불가능하거나 재시도 횟수 초과
        logger.warn?.(
          '[i18n-loaders] translation fetch failed',
          language,
          namespace,
          error
        );
        throw error;
      }
    };

    const requestPromise = performRequest(0)
      .finally(() => {
        inFlightRequests.delete(cacheKey);
      });

    inFlightRequests.set(cacheKey, requestPromise);
    return requestPromise;
  };

  return loadTranslations;
}

