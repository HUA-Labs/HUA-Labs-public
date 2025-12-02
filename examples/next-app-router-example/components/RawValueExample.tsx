/**
 * Raw Value Example Component
 * 
 * Demonstrates:
 * - Using getRawValue to get arrays and objects
 * - Accessing nested translation values
 */
'use client';

import { useTranslation } from '@hua-labs/i18n-core';

/**
 * Display array and object translation raw values returned by `getRawValue` in a simple example UI.
 *
 * Renders two sections ("Array Example" and "Object Example") that each show a list when the corresponding raw value is present; uses `currentLanguage` as the root element key.
 *
 * @returns A JSX element containing sections for the array and object examples; each section renders a list when its value exists.
 */
export function RawValueExample() {
  const { getRawValue, currentLanguage } = useTranslation();

  // Get array value
  const arrayExample = getRawValue('examples:arrayExample') as string[] | undefined;
  
  // Get object value
  const objectExample = getRawValue('examples:objectExample') as Record<string, string> | undefined;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg" key={currentLanguage}>
      <h2 className="text-2xl font-semibold mb-4 translation-content">getRawValue Example (Arrays/Objects)</h2>
      <div className="space-y-4">
        <div className="translation-content">
          <h3 className="font-semibold mb-2">Array Example:</h3>
          {arrayExample && (
            <ul className="list-disc list-inside space-y-1">
              {arrayExample.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="translation-content">
          <h3 className="font-semibold mb-2">Object Example:</h3>
          {objectExample && (
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(objectExample).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}</strong>: {value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
