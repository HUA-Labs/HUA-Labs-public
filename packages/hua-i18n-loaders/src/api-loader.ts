import { ApiLoaderOptions, TranslationLoader, TranslationRecord } from './types';

interface CacheEntry {
  data: TranslationRecord;
  expiresAt: number;
}

const FIVE_MINUTES = 5 * 60 * 1000;

const defaultFetcher = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init);

/**
 * Determines whether an error should be considered retryable.
 *
 * Considers network-level failures and server/timeouts as retryable.
 *
 * @param error - The thrown value to evaluate; may be an Error, a response-like object with a `status` number, or any other value.
 * @returns `true` if the error is likely transient and a retry may succeed (network errors, common fetch failure messages, HTTP 5xx, or 408), `false` otherwise.
 */
function isRetryableError(error: unknown): boolean {
  // 네트워크 에러 (TypeError)
  if (error instanceof TypeError) {
    return true;
  }

  // Fetch API 에러 메시지 확인
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (
      message.includes('failed to fetch') ||
      message.includes('networkerror') ||
      message.includes('network request failed')
    ) {
      return true;
    }
  }

  // Response 객체가 있는 경우 HTTP 상태 코드 확인
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status;
    // 5xx 서버 에러는 재시도 가능
    if (status >= 500 && status < 600) {
      return true;
    }
    // 408 Request Timeout도 재시도 가능
    if (status === 408) {
      return true;
    }
  }

  return false;
}

/**
 * Creates a TranslationLoader that fetches translations from an HTTP API with optional caching, request deduplication, and retry behavior.
 *
 * @param options - Configuration for the loader. Recognized fields:
 *   - translationApiPath: base path for the translations API (default "/api/translations")
 *   - baseUrl: absolute URL prefix used on the server when building request URLs
 *   - localFallbackBaseUrl: fallback server base URL when no env/baseUrl is provided (default "http://localhost:3000")
 *   - cacheTtlMs: milliseconds to keep cached translations (default 5 minutes)
 *   - disableCache: if true, disables in-memory caching
 *   - fetcher: custom fetch-like function to perform requests
 *   - requestInit: RequestInit object or a function (language, namespace) => RequestInit for per-call init
 *   - logger: logger with optional warn method (defaults to console)
 *   - retryCount: number of retry attempts for retryable errors (default 0)
 *   - retryDelay: base delay in milliseconds for exponential backoff between retries (default 1000)
 * @returns A TranslationLoader function that retrieves translation records for a given language and namespace; successful results are cached per language/namespace and concurrent requests for the same key are deduplicated.
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
        // 재시도 가능한 에러인지 확인
        const isRetryable = isRetryableError(error);

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
