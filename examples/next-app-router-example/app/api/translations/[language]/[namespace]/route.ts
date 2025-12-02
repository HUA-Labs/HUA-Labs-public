/**
 * Translation API Route
 * 
 * This route provides translations for the API loader
 * In production, you would load from file system or database
 * 
 * Route: /api/translations/[language]/[namespace]
 */
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ language: string; namespace: string }> }
) {
  try {
    const { language, namespace } = await params;

    // Validate language
    const supportedLanguages = ['ko', 'en', 'ja', 'zh', 'es', 'fr'];
    if (!supportedLanguages.includes(language)) {
      return NextResponse.json(
        { error: 'Unsupported language' },
        { status: 400 }
      );
    }

    // Validate namespace
    const supportedNamespaces = ['common', 'pages', 'examples'];
    if (!supportedNamespaces.includes(namespace)) {
      return NextResponse.json(
        { error: 'Unsupported namespace' },
        { status: 400 }
      );
    }

    // Try to load from translations directory
    const translationPath = join(
      process.cwd(),
      'translations',
      language,
      `${namespace}.json`
    );

    try {
      const fileContent = await readFile(translationPath, 'utf-8');
      const translation = JSON.parse(fileContent);

      // Cache headers for production
      return NextResponse.json(translation, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          'Content-Type': 'application/json',
        },
      });
    } catch (fileError) {
      // If file doesn't exist, return 404
      // All translation files should exist in production
      console.error(`Translation file not found: ${translationPath}`, fileError);
      return NextResponse.json(
        { error: 'Translation file not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error loading translation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

