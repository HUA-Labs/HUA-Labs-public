import { PreloadOptions, TranslationLoader } from './types';

const defaultLogger = console;

/**
 * Preloads a set of namespaces for a given language using the provided loader.
 *
 * @param language - Target language code to load namespaces for
 * @param namespaces - Array of namespace names to preload
 * @param loader - Asynchronous function that loads a specific language/namespace pair
 * @param options - Optional settings; may include `logger` for messages and `suppressErrors` to suppress warning logs
 * @returns An object with `fulfilled` — array of namespace strings that loaded successfully — and `rejected` — array of error reasons for failed loads
 */
export async function preloadNamespaces(
  language: string,
  namespaces: string[],
  loader: TranslationLoader,
  options: PreloadOptions = {}
) {
  const logger = options.logger ?? defaultLogger;

  const results = await Promise.allSettled(
    namespaces.map(async (namespace) => {
      await loader(language, namespace);
      return namespace;
    })
  );

  const fulfilled = results.filter(
    (result): result is PromiseFulfilledResult<string> =>
      result.status === 'fulfilled'
  );
  const rejected = results.filter(
    (result): result is PromiseRejectedResult => result.status === 'rejected'
  );

  if (fulfilled.length > 0) {
    logger.log?.(
      `[i18n-loaders] Preloaded ${fulfilled.length}/${namespaces.length} namespaces for ${language}`
    );
  }

  if (rejected.length > 0 && !options.suppressErrors) {
    logger.warn?.(
      `[i18n-loaders] Failed to preload ${rejected.length} namespaces for ${language}`
    );
  }

  return {
    fulfilled: fulfilled.map((result) => result.value),
    rejected: rejected.map((result) => result.reason)
  };
}

/**
 * Preloads the given namespaces for every language in `languages` except `currentLanguage`.
 *
 * @param currentLanguage - Language code to exclude from preloading
 * @param languages - Candidate language codes to warm as fallbacks
 * @param namespaces - Namespaces to preload for each fallback language
 * @param loader - Function that loads a specific language/namespace pair
 * @param options - Optional preload settings (e.g., logger, suppressErrors)
 * @returns An array of results, one per target fallback language, where each result contains `fulfilled` (loaded namespace names) and `rejected` (error reasons) arrays; returns an empty array if no fallback languages are targeted
 */
export async function warmFallbackLanguages(
  currentLanguage: string,
  languages: string[],
  namespaces: string[],
  loader: TranslationLoader,
  options: PreloadOptions = {}
) {
  const targets = languages.filter((language) => language !== currentLanguage);
  if (targets.length === 0) {
    return [];
  }

  return Promise.all(
    targets.map((language) =>
      preloadNamespaces(language, namespaces, loader, options)
    )
  );
}
