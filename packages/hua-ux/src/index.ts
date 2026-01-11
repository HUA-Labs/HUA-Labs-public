/**
 * @hua-labs/hua-ux
 * 
 * Ship UX faster: UI + motion + i18n, pre-wired.
 * A framework for React product teams.
 */

// Re-export UI components
// Note: Button and Card are overridden below with branded versions
export * from '@hua-labs/ui'

// Re-export advanced UI components (LanguageToggle, Emotion*, Scrollbar, etc.)
// Note: Using explicit exports to avoid naming conflicts with main exports
export {
  // Advanced Specialized components
  Bookmark,
  ChatMessage,
  EmotionAnalysis,
  EmotionButton,
  EmotionMeter,
  EmotionSelector,
  LanguageToggle,
  ScrollIndicator,
  ScrollProgress,
  Scrollbar,
  FeatureCard,
  HeroSection,
  InfoCard,
  // Dashboard widgets
  SummaryCard,
  ProgressCard,
  ProfileCard,
  BarChart,
  MiniBarChart,
  TrendChart,
  // Motion components
  AdvancedPageTransition,
  usePageTransitionManager,
} from '@hua-labs/ui/advanced'

// Override Button and Card with branded versions for automatic branding
// When branding is configured, these components automatically use branding colors
// When branding is not configured, they work exactly like the original components
export { BrandedButton as Button, BrandedCard as Card } from './framework'

// Re-export Button and Card types (they're compatible with BrandedButton and BrandedCard)
export type { ButtonProps } from '@hua-labs/ui'
export type { CardProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps } from '@hua-labs/ui'

// Re-export Motion hooks
export * from '@hua-labs/motion-core'

// Re-export i18n core
export * from '@hua-labs/i18n-core'

// Re-export i18n Zustand adapter
export * from '@hua-labs/i18n-core-zustand'

// Re-export state management
export * from '@hua-labs/state'
