# Icon System Documentation

## 왜 HUA UI Icon을 사용해야 하나요? / Why use HUA UI Icon?

HUA UI의 Icon 컴포넌트는 단순히 아이콘 라이브러리를 래핑한 것이 아닙니다. 여러 아이콘 라이브러리를 통합하고, 추가 기능을 제공하는 통합 아이콘 시스템입니다.

The Icon component in HUA UI is not just a wrapper for icon libraries. It's an integrated icon system that unifies multiple icon libraries and provides additional features.

### 직접 `lucide-react`를 사용하는 것과의 차이점 / Differences from using `lucide-react` directly

| 기능 | 직접 사용 | HUA UI Icon |
|------|----------|-------------|
| **다중 라이브러리 지원** | 각 라이브러리마다 다른 컴포넌트 import 필요 | 하나의 `<Icon>` 컴포넌트로 모든 라이브러리 사용 |
| **아이콘 이름 매핑** | 라이브러리마다 다른 이름을 알아야 함 (Home vs House) | 하나의 이름으로 모든 라이브러리에서 작동 |
| **직관적인 이름** | 정확한 아이콘 이름만 사용 가능 | `back`, `prev`, `gear`, `spinner` 등 Alias 지원 |
| **전역 설정** | 각 컴포넌트마다 props 반복 | IconProvider로 한 번 설정 |
| **감정/상태 아이콘** | 직접 아이콘 이름 지정 | `emotion="happy"`, `status="loading"` 등 의미 기반 |
| **색상 변형** | 매번 className 작성 | `variant="success"` 등으로 자동 색상 적용 |
| **애니메이션** | CSS 직접 작성 | `spin`, `pulse`, `bounce` prop으로 간단하게 |
| **SSR 안전** | 직접 처리 필요 | 자동으로 hydration 오류 방지 |
| **타입 안전성** | 문자열로 아이콘 이름 (오타 가능) | IconName 타입으로 컴파일 타임 체크 |

### 예시 비교

```tsx
// ❌ 직접 lucide-react 사용
import { Heart, Loader2, AlertCircle } from 'lucide-react'

<Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
<Loader2 className="h-6 w-6 animate-spin text-blue-600" />
<AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />

// ✅ HUA UI Icon 사용
import { Icon } from '@hua-labs/ui'

<Icon name="heart" variant="error" size={24} />
<Icon name="loader" status="loading" spin variant="primary" />
<Icon name="alertCircle" variant="warning" size={24} />
```

## 현재 상태 / Current Status

### 아키텍처 / Architecture
- **Provider 패턴 / Provider Pattern**: React Context API 기반 / Based on React Context API
- **상태관리 / State Management**: 서비스 레벨에서 Zustand 등으로 관리 (패키지 의존성 없음) / Managed with Zustand, etc. at service level (no package dependency)
- **지원 세트 / Supported Sets**: Lucide (기본 / default), Phosphor, Untitled (준비 중 / in preparation)
- **기본 동작 / Default Behavior**: IconProvider 없이도 사용 가능 (기본값 자동 적용) / Can be used without IconProvider (default values automatically applied)

### 파일 구조 / File Structure
```
hua-ui/src/components/Icon/
├── Icon.tsx           # Icon 컴포넌트 / Icon component
├── IconProvider.tsx   # Context Provider
├── icon-store.ts      # 타입 정의 및 기본값 / Type definitions and defaults
└── index.ts           # 통합 export / Unified export
```

### 주요 기능 / Key Features
- 전역 아이콘 설정 (Provider) / Global icon settings (Provider)
- 다중 아이콘 세트 지원 (Lucide, Phosphor) / Multiple icon set support (Lucide, Phosphor)
- 세트별 자동 매핑 (PROJECT_ICONS) / Automatic mapping by set (PROJECT_ICONS)
- Tree-shaking 지원 / Tree-shaking support
- SSR 안전 (hydration 방지) / SSR safe (prevents hydration errors)
- 애니메이션 지원 (spin, pulse, bounce) / Animation support (spin, pulse, bounce)
- Variant 지원 (primary, success, error 등) / Variant support (primary, success, error, etc.)
- 감정/상태 아이콘 매핑 / Emotion/status icon mapping

## 사용법

### 일반적인 사용 방법 / Common Usage

**IconProvider 없이 사용하는 방법 / Usage without IconProvider:**

```tsx
import { Icon } from '@hua-labs/ui'

// 1. 기본 사용 / Basic usage
<Icon name="arrowLeft" className="h-4 w-4" />

// 2. 버튼 내부 / Inside button
<Button>
  <Icon name="refresh" className="h-4 w-4 mr-2" />
  새로고침 / Refresh
</Button>

// 3. 링크 아이콘 / Link icon
<Link href="/admin">
  <Icon name="arrowLeft" className="h-4 w-4" />
</Link>

// 4. 상태 표시 / Status indicator
<Icon name="warning" className="h-6 w-6 text-yellow-600 mr-3" />

// 5. 큰 아이콘 / Large icon
<Icon name="barChart" className="h-12 w-12 text-gray-400" />
```

**특징 / Features:**
- IconProvider 없이도 즉시 사용 가능 / Can be used immediately without IconProvider
- 기본값 자동 적용: `phosphor`, `regular`, `size: 20` / Default values automatically applied
- 각 아이콘마다 `size`, `className` 등으로 개별 설정 가능 / Individual settings per icon via `size`, `className`, etc.
- 기존 코드 수정 불필요 / No need to modify existing code

### 1. 기본 사용 (IconProvider 없이) / Basic Usage (without IconProvider)

**가장 간단한 사용법 / Simplest usage:**

```tsx
import { Icon } from '@hua-labs/ui'

// 기본값 사용 (phosphor, regular, size: 20) / Using default values
<Icon name="heart" />
<Icon name="user" size={24} />
<Icon name="settings" variant="primary" />
```

**기본값 / Default values:**
- `set`: `phosphor`
- `weight`: `regular`
- `size`: `20`
- `color`: `currentColor`

### 2. IconProvider와 함께 사용 (권장) / Using with IconProvider (Recommended)

**전역 설정으로 일관성 유지 / Maintain consistency with global settings:**

```tsx
import { Icon, IconProvider } from '@hua-labs/ui'

// layout.tsx에서 전역 설정 / Global settings in layout.tsx
<IconProvider set="phosphor" weight="regular" size={20}>
  <App />
</IconProvider>

// 그 후 어디서나 / Then anywhere
<Icon name="heart" />  // Provider 설정 자동 적용 / Provider settings automatically applied
<Icon name="user" size={24} />  // size만 오버라이드 / Only size overridden
```

**Next.js App Router 적용 예시 / Next.js App Router example:**

```tsx
// app/layout.tsx
import { IconProvider } from '@hua-labs/ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          <IconProvider set="phosphor" weight="regular" size={20}>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </IconProvider>
        </Providers>
      </body>
    </html>
  )
}
```

### 3. Zustand와 통합 / Integration with Zustand

```tsx
import { create } from 'zustand'
import { IconProvider, type IconConfig } from '@hua-labs/ui'

// 서비스 레벨에서 상태관리
const useAppStore = create((set) => ({
  iconConfig: {
    set: 'phosphor' as const,
    weight: 'regular' as const,
    size: 20,
    color: 'currentColor',
    strokeWidth: 1.25,
  },
  updateIconConfig: (config: Partial<IconConfig>) => 
    set((state) => ({
      iconConfig: { ...state.iconConfig, ...config }
    }))
}))

// App에서 사용
function App() {
  const iconConfig = useAppStore(state => state.iconConfig)
  
  return (
    <IconProvider {...iconConfig}>
      <YourApp />
    </IconProvider>
  )
}
```

### 4. 개별 아이콘 오버라이드 / Individual Icon Override

```tsx
// Provider 설정을 오버라이드 / Override Provider settings
<Icon 
  name="heart" 
  provider="lucide"  // 전역 설정 무시 / Ignore global settings
  size={32}           // 전역 size 무시 / Ignore global size
  weight="bold"       // Phosphor weight 오버라이드 / Override Phosphor weight
/>
```

### 5. 애니메이션 / Animation

```tsx
<Icon name="loader" spin />
<Icon name="heart" pulse />
<Icon name="bell" bounce />
<Icon name="star" animated />
```

### 6. Variant

```tsx
<Icon name="check" variant="success" />
<Icon name="alert" variant="error" />
<Icon name="info" variant="primary" />
```

### 7. 감정/상태 아이콘 / Emotion/Status Icons

```tsx
<Icon emotion="happy" />
<Icon status="loading" spin />
<Icon status="success" variant="success" />
```

#### 감정 아이콘 매핑표 / Emotion Icon Mapping

| emotion | 매핑된 아이콘 / Mapped Icon | 설명 / Description |
|---------|--------------|------|
| `happy` | `smile` | 행복한 표정 / Happy expression |
| `sad` | `frown` | 슬픈 표정 / Sad expression |
| `neutral` | `meh` | 무표정 / Neutral expression |
| `excited` | `laugh` | 신나는 표정 / Excited expression |
| `angry` | `angry` | 화난 표정 / Angry expression |
| `love` | `heart` | 하트 아이콘 / Heart icon |
| `like` | `thumbsUp` | 좋아요 / Like |
| `dislike` | `thumbsDown` | 싫어요 / Dislike |

#### 상태 아이콘 매핑표 / Status Icon Mapping

| status | 매핑된 아이콘 / Mapped Icon | 설명 / Description |
|--------|--------------|------|
| `loading` | `loader` | 로딩 중 / Loading |
| `success` | `success` (checkCircle) | 성공 / Success |
| `error` | `error` (xCircle) | 에러 / Error |
| `warning` | `warning` (alertCircle) | 경고 / Warning |
| `info` | `info` | 정보 / Info |
| `locked` | `lock` | 잠금 / Locked |
| `unlocked` | `unlock` | 잠금 해제 / Unlocked |
| `visible` | `eye` | 보임 / Visible |
| `hidden` | `eyeOff` | 숨김 / Hidden |

### 8. 특화된 아이콘 컴포넌트 / Specialized Icon Components

```tsx
import { LoadingIcon, SuccessIcon, ErrorIcon, EmotionIcon, StatusIcon } from '@hua-labs/ui'

<LoadingIcon />
<SuccessIcon />
<ErrorIcon />
<EmotionIcon emotion="happy" />
<StatusIcon status="success" />
```

## 지원하는 아이콘 세트 / Supported Icon Sets

### Lucide Icons (기본 / Default)
- **패키지 / Package**: `lucide-react` (의존성 포함 / included as dependency)
- **특징 / Features**: strokeWidth 기반 / strokeWidth-based
- **기본값 / Default**: strokeWidth 1.25

### Phosphor Icons
- **패키지 / Package**: `@phosphor-icons/react` (dependency - 자동 설치됨 / automatically installed)
- **특징 / Features**: weight 기반 (thin, light, regular, bold, duotone, fill) / weight-based
- **기본값 / Default**: weight "regular"
- **설치 / Installation**: 별도 설치 불필요 (패키지에 포함됨) / No separate installation needed (included in package)

### Untitled Icons
- **상태 / Status**: 준비 중 / In preparation
- **특징 / Features**: SVG 기반 / SVG-based
- **API 차이점 / API Differences**: 
  - `weight` prop 지원 안 함 (Phosphor 전용) / `weight` prop not supported (Phosphor only)
  - `strokeWidth` 사용 (Lucide와 동일) / Uses `strokeWidth` (same as Lucide)
  - Provider에서 `weight` 설정 시 무시되고 `strokeWidth` 사용 / `weight` setting in Provider is ignored, uses `strokeWidth`

## API Reference

### IconProvider Props

```tsx
interface IconProviderProps {
  set?: 'lucide' | 'phosphor' | 'untitled'  // 기본: 'phosphor' / Default: 'phosphor'
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'duotone' | 'fill'  // 기본: 'regular' / Default: 'regular'
  size?: number  // 기본: 20 / Default: 20
  color?: string  // 기본: 'currentColor' / Default: 'currentColor'
  strokeWidth?: number  // Lucide/Untitled용, 기본: 1.25 / For Lucide/Untitled, default: 1.25
  children: React.ReactNode
}
```

### Icon Props

```tsx
interface IconProps {
  name: IconName  // 필수 / Required
  size?: number | string  // Provider 설정 오버라이드 / Override Provider settings
  className?: string
  emotion?: 'happy' | 'sad' | 'neutral' | 'excited' | 'angry' | 'love' | 'like' | 'dislike'
  status?: 'loading' | 'success' | 'error' | 'warning' | 'info' | 'locked' | 'unlocked' | 'visible' | 'hidden'
  provider?: IconSet  // Provider 설정 오버라이드 / Override Provider settings
  weight?: PhosphorWeight  // Phosphor weight 오버라이드 / Override Phosphor weight
  animated?: boolean
  pulse?: boolean
  spin?: boolean
  bounce?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted'
}
```

## 아이콘 매핑 / Icon Mapping

### PROJECT_ICONS 매핑 / PROJECT_ICONS Mapping

아이콘 이름은 `PROJECT_ICONS`에서 자동 매핑됩니다 / Icon names are automatically mapped in `PROJECT_ICONS`:

```tsx
// 예시 / Example
'home' → Lucide: 'Home', Phosphor: 'House'
'settings' → Lucide: 'Settings', Phosphor: 'Gear'
```

### Icon Alias 시스템 / Icon Alias System

여러 이름이 같은 아이콘을 가리키도록 하는 alias 시스템을 제공합니다. DX 향상을 위해 직관적인 이름들을 지원합니다.

Provides an alias system that allows multiple names to point to the same icon. Supports intuitive names for better developer experience.

**사용 예시 / Usage example:**
```tsx
// 모두 같은 아이콘 (arrowLeft) / All point to the same icon (arrowLeft)
<Icon name="back" />
<Icon name="prev" />
<Icon name="previous" />
<Icon name="arrowLeft" />
```

**주요 Alias / Main Aliases:**

| 카테고리 / Category | Alias | 실제 아이콘 / Actual Icon |
|---------------------|-------|---------------------------|
| Navigation | `back`, `prev`, `previous` | `arrowLeft` |
| Navigation | `forward`, `next` | `arrowRight` |
| Actions | `plus`, `new` | `add` |
| Actions | `remove`, `trash` | `delete` |
| Actions | `pencil`, `modify` | `edit` |
| Status | `spinner`, `loading`, `wait` | `loader` |
| Status | `checkmark`, `checkCircle` | `success` |
| Status | `fail`, `cross`, `xCircle` | `error` |
| Status | `alert`, `caution` | `warning` |
| User | `person`, `account`, `profile` | `user` |
| Settings | `gear`, `config`, `preferences`, `prefs` | `settings` |
| Close | `close`, `cancel` | `x` |
| Mail | `email`, `envelope` | `mail` |
| Eye | `show`, `view` | `eye` |
| Eye | `hide`, `hidden` | `eyeOff` |

**Alias 확인 / Checking Aliases:**

`resolveIconAlias` 함수는 alias를 실제 아이콘 이름으로 변환합니다. `getIconAliases` 함수는 특정 아이콘의 모든 alias를 반환합니다.

The `resolveIconAlias` function converts an alias to the actual icon name. The `getIconAliases` function returns all aliases for a specific icon.

```tsx
import { resolveIconAlias, getIconAliases } from '@hua-labs/ui'

// Alias 해결 (역방향 매핑) / Resolve alias (reverse mapping)
const actualName1 = resolveIconAlias('back')         // 'arrowLeft'
const actualName2 = resolveIconAlias('gear')        // 'settings'
const actualName3 = resolveIconAlias('preferences') // 'settings'
const actualName4 = resolveIconAlias('spinner')     // 'loader'
const actualName5 = resolveIconAlias('email')       // 'mail'
const actualName6 = resolveIconAlias('close')       // 'x'
const actualName7 = resolveIconAlias('remove')      // 'delete'

// 특정 아이콘의 모든 alias 가져오기 / Get all aliases for a specific icon
const aliases1 = getIconAliases('arrowLeft')
// ['back', 'prev', 'previous']

const aliases2 = getIconAliases('settings')
// ['gear', 'config', 'preferences', 'prefs']

const aliases3 = getIconAliases('loader')
// ['spinner', 'loading', 'wait']

const aliases4 = getIconAliases('user')
// ['person', 'account', 'profile']
```


### 매핑되지 않은 아이콘 사용 / Using Unmapped Icons

**매핑되지 않은 아이콘도 사용 가능합니다 / Unmapped icons can also be used!**

`icons.ts`나 `PROJECT_ICONS`에 없는 아이콘도 동적으로 로드할 수 있습니다. Lucide와 Phosphor 모두 지원합니다.

Icons not in `icons.ts` or `PROJECT_ICONS` can be dynamically loaded. Both Lucide and Phosphor are supported.

```tsx
// icons.ts에 없는 아이콘도 동적으로 로드됨 / Icons not in icons.ts are dynamically loaded
<Icon name="someNewIcon" />              // 동적 로딩 / Dynamic loading
<Icon name="Zap" provider="lucide" />    // Lucide: PascalCase 시도 / Lucide: tries PascalCase
<Icon name="zap" provider="phosphor" />  // Phosphor: 동적 로딩 / Phosphor: dynamic loading
```

**동작 방식 / How it works:**

1. 먼저 `icons.ts`에서 찾기 (Lucide만, 실제 사용되는 아이콘만 포함) / First search in `icons.ts` (Lucide only, only includes actually used icons)
2. 없으면 `PROJECT_ICONS`에서 매핑 확인 / If not found, check mapping in `PROJECT_ICONS`
3. 없으면 동적으로 해당 provider에서 가져오기 (fallback) / If not found, dynamically load from the provider (fallback)

**Lucide provider 동작 / Lucide provider behavior:**
- PascalCase 변환 시도 (예: `zap` → `Zap`) / Tries PascalCase conversion (e.g., `zap` → `Zap`)
- 원본 이름 그대로 시도 / Tries original name as-is
- camelCase 변환 시도 / Tries camelCase conversion

**Phosphor provider 동작 / Phosphor provider behavior:**
- PascalCase 변환 시도 (예: `house` → `House`) / Tries PascalCase conversion (e.g., `house` → `House`)
- camelCase를 PascalCase로 변환 시도 (예: `arrowLeft` → `ArrowLeft`) / Tries converting camelCase to PascalCase (e.g., `arrowLeft` → `ArrowLeft`)
- 원본 이름 그대로 시도 / Tries original name as-is

**제한사항 / Limitations:**
- 아이콘을 찾을 수 없으면 빈 원형 아이콘 표시 (콘솔 경고) / Displays empty circle icon with console warning if icon not found
- Phosphor Icons는 동적 import로 로드되므로 초기 로딩 시 약간의 지연 가능 / Phosphor Icons may have slight delay on initial load due to dynamic import

**장점 / Benefits:**
- 번들 크기 최적화 (실제 사용되는 아이콘만 포함) / Bundle size optimization (only includes actually used icons)
- 새로운 아이콘도 즉시 사용 가능 (Lucide, Phosphor 모두) / New icons can be used immediately (both Lucide and Phosphor)
- 점진적 마이그레이션 가능 / Progressive migration possible

## 주의사항 / Notes

### SSR (Server-Side Rendering)

**현재 구현 / Current implementation:**
- 모든 아이콘은 **hydration mismatch 방지**를 위해 클라이언트에서만 렌더링됩니다 / All icons are rendered only on the client to prevent hydration mismatch
- SSR 시 빈 `<span>` 요소가 렌더링되고, 클라이언트에서 실제 아이콘으로 교체됩니다 / Empty `<span>` elements are rendered during SSR, replaced with actual icons on the client

**세트별 SSR 지원 / SSR support by set:**
- **Lucide**: SSR-safe (하지만 현재는 클라이언트 전용으로 제한) / SSR-safe (but currently limited to client-only)
- **Phosphor**: Dynamic import 사용 (SSR 시 클라이언트에서만 로드) / Uses dynamic import (loaded only on client during SSR)
- **Untitled**: SVG 기반이므로 SSR 가능 (구현 시) / SSR possible since SVG-based (when implemented)

**권장사항 / Recommendations:**
- Next.js App Router 사용 시 `'use client'` 지시어 필요 / `'use client'` directive required when using Next.js App Router
- SSR이 중요한 경우, 아이콘 영역에 스켈레톤 UI 추가 고려 / Consider adding skeleton UI to icon areas if SSR is important

### Phosphor 초기화 / Phosphor Initialization
- Phosphor Icons는 동적 로딩으로 약간의 지연 가능 / Phosphor Icons may have slight delay due to dynamic loading
- 첫 사용 시에만 로드되며, 이후 캐시됨 / Loaded only on first use, then cached

### Provider 선택사항 / Provider Optional
- IconProvider 없이 사용하면 기본값 사용 (`phosphor`, `regular`, `size: 20`) / Uses default values when used without IconProvider
- 서비스 레벨에서 Zustand 등으로 관리 권장 / Recommended to manage with Zustand at service level

### 타입 안전성 / Type Safety
- `IconName` 타입으로 아이콘 이름 제한 / Icon names restricted by `IconName` type
- 존재하지 않는 아이콘 사용 시 콘솔 경고 / Console warning when using non-existent icons

### Variant/Animated와 Tailwind CSS 충돌 / Variant/Animated and Tailwind CSS Conflicts

**충돌 없음 / No conflicts:**
- Icon의 `variant` prop은 **내부 클래스**로 적용 (`text-blue-600` 등) / Icon's `variant` prop is applied as **internal classes** (`text-blue-600`, etc.)
- Icon의 `animated`, `spin`, `pulse`, `bounce`는 **별도 클래스**로 적용 / Icon's `animated`, `spin`, `pulse`, `bounce` are applied as **separate classes**
- Tailwind의 `animate-spin`, `text-success` 등과 **독립적으로 동작** / **Operates independently** from Tailwind's `animate-spin`, `text-success`, etc.

**사용 예시 / Usage example:**
```tsx
// Icon의 variant와 Tailwind 클래스 함께 사용 가능 / Can use Icon's variant with Tailwind classes
<Icon name="check" variant="success" className="ml-2" />

// Icon의 spin과 Tailwind 애니메이션 충돌 없음 / No conflict between Icon's spin and Tailwind animations
<Icon name="loader" spin className="animate-pulse" />
```

### Tree-shaking 지원 / Tree-shaking Support

**세트별 Tree-shaking 상태 / Tree-shaking status by set:**

| 세트 / Set | Tree-shaking | 설명 / Description |
|------|-------------|------|
| **Lucide** | 지원 / Supported | ESM 기반, 사용하지 않는 아이콘 자동 제거 / ESM-based, automatically removes unused icons |
| **Phosphor** | ESM/Dynamic | Dynamic import 사용 시 선택적 로딩 / Selective loading when using dynamic import |
| **Untitled** | 제한적 / Limited | SVG 파일 기반이므로 번들러 설정 필요 / Requires bundler configuration since SVG-based |

**최적화 팁 / Optimization tips:**
- Lucide: 자동으로 tree-shaking 됨 / Automatically tree-shaken
- Phosphor: Dynamic import로 필요한 아이콘만 로드 / Load only needed icons via dynamic import
- Untitled: SVG 파일을 개별 import하여 번들러가 최적화하도록 설정 / Configure bundler to optimize by importing SVG files individually

## 완료된 개선사항 / Completed Improvements

1. 파일 구조 정리 (Icon 폴더로 통합) / File structure organized (consolidated into Icon folder)
2. Context API 기반 Provider 구현 / Provider implementation based on Context API
3. 서비스 레벨 상태관리 지원 (Zustand 등) / Service-level state management support (Zustand, etc.)
4. 타입 정의 정리 / Type definitions organized
5. strokeWidth 기본값 함수 추가 / Added default strokeWidth function
6. 통합 export (index.ts) / Unified export (index.ts)

## 타입 자동 생성 / Type Auto-generation

### IconName 타입 자동 생성 스크립트 / IconName Type Auto-generation Script

아이콘 이름의 타입 안전성을 보장하기 위해 자동 생성 스크립트를 제공합니다.

Provides an auto-generation script to ensure type safety for icon names.

**사용법 / Usage:**
```bash
pnpm generate:icon-types
```

**동작 방식 / How it works:**
1. `src/lib/icons.ts` 파일을 스캔 / Scans `src/lib/icons.ts` file
2. `icons` 객체의 모든 키를 추출 / Extracts all keys from `icons` object
3. `src/lib/icon-names.generated.ts` 파일 생성 / Generates `src/lib/icon-names.generated.ts` file

**장점 / Benefits:**
- 이름 충돌 방지 / Prevents name conflicts
- 업데이트 누락 방지 / Prevents missed updates
- 오타 방지 / Prevents typos
- 타입 안전성 향상 / Improves type safety

**주의사항 / Notes:**
- 생성된 파일은 자동 생성 파일이므로 수동 수정 금지 / Do not manually edit generated files
- 아이콘 추가/삭제 후 스크립트 재실행 필요 / Re-run script after adding/removing icons

## 향후 개선 계획 / Future Improvements

### 1. 기능 개선 / Feature Improvements
- [ ] Untitled Icons 구현 / Implement Untitled Icons
- [ ] 테마별 weight 자동 분기 (라이트/다크) / Automatic weight branching by theme (light/dark)
- [ ] 아이콘 로딩 에러 처리 개선 / Improve icon loading error handling
- [ ] Phosphor 초기화 캐싱 / Phosphor initialization caching

### 2. 성능 최적화 / Performance Optimization
- [ ] 아이콘 컴포넌트 메모이제이션 / Icon component memoization
- [ ] 불필요한 리렌더링 방지 / Prevent unnecessary re-renders
- [ ] 아이콘 프리로딩 옵션 / Icon preloading option

### 3. 문서화 / Documentation
- [x] 감정/상태 아이콘 매핑표 추가 / Added emotion/status icon mapping table
- [x] SSR 주의사항 명확화 / Clarified SSR notes
- [x] Tree-shaking 체크리스트 추가 / Added Tree-shaking checklist
- [x] Variant/Tailwind 충돌 설명 추가 / Added Variant/Tailwind conflict explanation
- [ ] 아이콘 목록 문서화 / Document icon list
- [ ] 마이그레이션 가이드 / Migration guide
- [ ] Storybook 스토리 추가 / Add Storybook stories

### 4. 테스트 / Testing
- [ ] Icon 컴포넌트 테스트 / Icon component tests
- [ ] IconProvider 테스트 / IconProvider tests
- [ ] 아이콘 매핑 테스트 / Icon mapping tests
- [ ] SSR 테스트 / SSR tests

## 변경 이력 / Changelog

### v1.0.0 (현재 / Current)
- IconProvider 패턴 도입 / Introduced IconProvider pattern
- Context API 기반 전역 설정 / Global settings based on Context API
- Phosphor Icons 지원 / Phosphor Icons support
- Zustand 통합 지원 / Zustand integration support
