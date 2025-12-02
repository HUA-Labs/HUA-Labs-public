import {
  DefaultTranslations,
  TranslationLoader,
  TranslationRecord
} from './types';

/**
 * Wraps a TranslationLoader to provide per-language/namespace default translations and merge them with remote results.
 *
 * Uses the entry from `defaults[language]?.[namespace]` as a fallback when the remote loader returns null/undefined/empty object or when the loader throws; when both fallback and remote translations exist, returns a deep-merged translation record where remote values override defaults.
 *
 * @param loader - The original TranslationLoader to wrap
 * @param defaults - Mapping of language -> namespace -> default translations
 * @returns A TranslationLoader that applies the described fallback and merge behavior
 * @throws Re-throws the original loader error if the loader fails and no fallback is available
 */
export function withDefaultTranslations(
  loader: TranslationLoader,
  defaults: DefaultTranslations
): TranslationLoader {
  return async (language, namespace) => {
    const fallback = defaults[language]?.[namespace];

    try {
      const remote = await loader(language, namespace);
      
      // API 응답이 빈 객체이거나 null/undefined인 경우 fallback 반환
      if (!remote || (typeof remote === 'object' && Object.keys(remote).length === 0)) {
        if (fallback) {
          return fallback;
        }
        return remote || {};
      }
      
      if (!fallback) {
        return remote;
      }

      return mergeTranslations(fallback, remote);
    } catch (error) {
      if (fallback) {
        return fallback;
      }
      throw error;
    }
  };
}

/**
 * Produces a merged TranslationRecord by applying keys from `override` onto `base`.
 *
 * When a key exists in both records and both values are plain objects, those objects
 * are merged recursively; otherwise the value from `override` replaces the base value.
 *
 * @param base - The base translations to start from
 * @param override - Translations that override or extend `base`
 * @returns A new TranslationRecord containing the merged result
 */
function mergeTranslations(
  base: TranslationRecord,
  override: TranslationRecord
): TranslationRecord {
  const result: TranslationRecord = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (isPlainObject(value) && isPlainObject(result[key])) {
      result[key] = mergeTranslations(
        result[key] as TranslationRecord,
        value as TranslationRecord
      );
      continue;
    }

    result[key] = value;
  }

  return result;
}

/**
 * Determines whether a value is a plain object (a non-null object that is not an array).
 *
 * @param value - The value to test
 * @returns `true` if `value` is a non-null object and not an array, `false` otherwise.
 */
function isPlainObject(value: unknown): value is TranslationRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
