/**
 * @hua-labs/hua-ux
 * 
 * Ship UX faster: UI + motion + i18n, pre-wired.
 * A framework for React product teams.
 */

// Re-export UI components
// Note: Button and Card are overridden below with branded versions
// Note: useScrollProgress is excluded to avoid conflict with motion-core's version
export {
  // UI Components - Core
  Button as UIButton,
  Action,
  Input,
  NumberInput,
  FormControl,
  useFormValidation,
  Link,
  Icon,
  EmotionIcon,
  StatusIcon,
  LoadingIcon,
  SuccessIcon,
  ErrorIcon,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Modal,
  // UI Components - Layout
  Container,
  Grid,
  Stack,
  Divider,
  Card as UICard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  Panel,
  ActionToolbar,
  ComponentLayout,
  // UI Components - Navigation
  Navigation,
  NavigationList,
  NavigationItem,
  NavigationContent,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  PaginationOutlined,
  PaginationMinimal,
  PaginationWithInfo,
  PageNavigation,
  PageTransition,
  // UI Components - Data Display
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  Badge,
  Progress,
  ProgressSuccess,
  ProgressWarning,
  ProgressError,
  ProgressInfo,
  ProgressGroup,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SkeletonRectangle,
  SkeletonRounded,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonImage,
  SkeletonUserProfile,
  SkeletonList,
  SkeletonTable,
  // UI Components - Feedback
  Alert,
  AlertSuccess,
  AlertWarning,
  AlertError,
  AlertInfo,
  ToastProvider,
  useToast,
  useToastSafe,
  LoadingSpinner,
  Tooltip,
  TooltipLight,
  TooltipDark,
  // UI Components - Code Display
  CodeBlock,
  InlineCode,
  // UI Components - Overlay
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  DropdownMenu,
  DropdownGroup,
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
  BottomSheet,
  BottomSheetHeader,
  BottomSheetContent,
  ConfirmModal,
  // UI Components - Form
  Form,
  FormField,
  FormGroup,
  Label,
  Checkbox,
  Radio,
  Select,
  SelectOption,
  Switch,
  Slider,
  Textarea,
  DatePicker,
  Upload,
  Autocomplete,
  ColorPicker,
  // UI Components - Interactive
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsPills,
  TabsUnderline,
  TabsCards,
  Menu,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  MenuHorizontal,
  MenuVertical,
  MenuCompact,
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuGroup,
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandSeparator,
  CommandEmpty,
  CommandDialog,
  // UI Components - Specialized
  ScrollArea,
  ScrollToTop,
  ThemeProvider,
  ThemeToggle,
  Toggle,
  useTheme,
  // Icons and Types
  iconCategories,
  emotionIcons,
  statusIcons,
  iconNames,
  iconProviderMapping,
  isValidIconName,
  getIconNameForProvider,
  ICON_ALIASES,
  resolveIconAlias,
  getIconAliases,
  IconProvider,
  useIconContext,
  defaultIconConfig,
  getDefaultStrokeWidth,
  // Utilities
  merge,
  mergeIf,
  mergeMap,
  cn,
  formatRelativeTime,
  Slot,
  composeRefs,
  mergeProps,
  // Style System
  createColorStyles,
  useColorStyles,
  createVariantStyles,
  createSizeStyles,
  createRoundedStyles,
  createShadowStyles,
  createHoverStyles,
  HUA_SPRING_EASING,
  withDarkMode,
  createGradient,
  withOpacity,
  isTextWhite,
  isGradientVariant,
  responsive,
  conditionalClass,
  // Micro Motion System
  useMicroMotion,
  getMicroMotionClasses,
  EASING_FUNCTIONS,
  DURATIONS,
  COMPONENT_MOTION_DEFAULTS,
  CSS_MOTION_VARS,
  // Motion & Interaction Hooks (except useScrollProgress - use motion-core's version)
  useInView,
  useMouse,
  useReducedMotion,
  useWindowSize,
  // Convenience aliases
  Btn,
  Act,
  Inp,
  Lnk,
  Ic,
  Avt,
  Mdl,
  Cont,
  Crd,
  Tbl,
  Frm,
  Alt,
  Loading,
} from '@hua-labs/ui'

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
  // Dashboard components
  SectionHeader,
  StatsPanel,
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

// Re-export Pro features (advanced motion hooks)
// Note: Pro package is dist-only (source not included in npm)
// Framework users get Pro features included, individual package users need Pro license
export * from '@hua-labs/pro'
