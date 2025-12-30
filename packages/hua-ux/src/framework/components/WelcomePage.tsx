/**
 * @hua-labs/hua-ux/framework - WelcomePage
 * 
 * Default welcome page component for new projects
 * Similar to Next.js default welcome page
 */

'use client';

import React from 'react';
import { HuaUxPage } from './HuaUxPage';
import { Button, Card, Badge } from '@hua-labs/ui';
import { useTranslation } from '@hua-labs/i18n-core';
import type { HuaUxPageProps } from '../types';

export interface WelcomePageProps extends Omit<HuaUxPageProps, 'children'> {
  /**
   * Project name to display
   */
  projectName?: string;
  
  /**
   * Show framework features
   */
  showFeatures?: boolean;
  
  /**
   * Show quick links
   */
  showQuickLinks?: boolean;
  
  /**
   * Custom content to display
   */
  children?: React.ReactNode;
}

/**
 * WelcomePage Component
 * 
 * Default welcome page for new hua-ux projects.
 * Displays project information, framework features, and quick links.
 * 
 * @example
 * ```tsx
 * // app/page.tsx
 * import { WelcomePage } from '@hua-labs/hua-ux/framework';
 * 
 * export default function HomePage() {
 *   return <WelcomePage projectName="My App" />;
 * }
 * ```
 */
export function WelcomePage({
  projectName = 'My App',
  showFeatures = true,
  showQuickLinks = true,
  children,
  ...pageProps
}: WelcomePageProps) {
  const { t, currentLanguage } = useTranslation();

  const features = [
    {
      title: t('features.ui.title', 'UI Components'),
      description: t('features.ui.description', 'Pre-built, accessible components'),
      icon: '🎨',
    },
    {
      title: t('features.i18n.title', 'i18n Support'),
      description: t('features.i18n.description', 'Multi-language support out of the box'),
      icon: '🌐',
    },
    {
      title: t('features.motion.title', 'Motion'),
      description: t('features.motion.description', 'Smooth animations and transitions'),
      icon: '✨',
    },
    {
      title: t('features.ai.title', 'AI-First'),
      description: t('features.ai.description', 'Built for vibe coding with AI'),
      icon: '🤖',
    },
  ];

  const quickLinks = [
    {
      title: t('links.docs.title', 'Documentation'),
      description: t('links.docs.description', 'Learn more about hua-ux'),
      href: 'https://github.com/HUA-Labs/HUA-Labs-public',
      external: true,
    },
    {
      title: t('links.examples.title', 'Examples'),
      description: t('links.examples.description', 'See examples and patterns'),
      href: '/examples',
      external: false,
    },
    {
      title: t('links.github.title', 'GitHub'),
      description: t('links.github.description', 'View source code'),
      href: 'https://github.com/HUA-Labs/HUA-Labs-public',
      external: true,
    },
  ];

  return (
    <HuaUxPage
      title={t('welcome.title', 'Welcome')}
      description={t('welcome.description', `Get started by editing app/page.tsx`)}
      vibe="clean"
      {...pageProps}
    >
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {projectName}
              </h1>
              <Badge variant="secondary" className="text-sm">
                {t('badge.alpha', 'Alpha')}
              </Badge>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('welcome.subtitle', 'Built with @hua-labs/hua-ux')}
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              {t('welcome.description', 'Get started by editing app/page.tsx')}
            </p>
          </div>

          {/* Custom Content */}
          {children && (
            <div className="flex justify-center">
              {children}
            </div>
          )}

          {/* Features Grid */}
          {showFeatures && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Links */}
          {showQuickLinks && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickLinks.map((link, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{link.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {link.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => {
                        if (link.external) {
                          window.open(link.href, '_blank', 'noopener,noreferrer');
                        } else {
                          window.location.href = link.href;
                        }
                      }}
                    >
                      {t('links.visit', 'Visit')} →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Footer Info */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <p>
              {t('footer.language', 'Language')}: <strong>{currentLanguage}</strong>
            </p>
            <p>
              {t('footer.framework', 'Framework')}: <strong>@hua-labs/hua-ux</strong>
            </p>
          </div>
        </div>
      </div>
    </HuaUxPage>
  );
}
