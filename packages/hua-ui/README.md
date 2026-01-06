# @hua-labs/ui

Modern React UI component library with 70+ production-ready components.
70개 이상의 프로덕션 레디 React UI 컴포넌트 라이브러리

[![npm version](https://img.shields.io/npm/v/@hua-labs/ui.svg)](https://www.npmjs.com/package/@hua-labs/ui)
[![npm downloads](https://img.shields.io/npm/dw/@hua-labs/ui.svg)](https://www.npmjs.com/package/@hua-labs/ui)
[![license](https://img.shields.io/npm/l/@hua-labs/ui.svg)](https://github.com/HUA-Labs/HUA-Labs-public/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-16.8%2B-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

> **⚠️ Alpha Release**: This package is currently in alpha. APIs may change before the stable release.

---

[English](#english) | [한국어](#korean)

## English

### Overview
Accessible, TypeScript-native component library for React applications. Provides modular entry points for optimal bundle size and comprehensive dark mode support.

## Features

- 70+ production-ready components
- Modular entry points for bundle optimization
- Full TypeScript support
- Dark mode support
- Accessible (ARIA attributes, keyboard navigation)
- Responsive design
- Tree-shaking friendly
- Zero external dependencies (except React)
- Tailwind CSS based styling

## Installation

```bash
npm install @hua-labs/ui
# or
yarn add @hua-labs/ui
# or
pnpm add @hua-labs/ui
```

### Peer Dependencies

```bash
# Required
npm install react react-dom

# Optional (for Phosphor Icons support)
npm install @phosphor-icons/react
```

### ?뷀듃由??ъ씤??

HUA UI??**Core**, **Form**, **Advanced** ?뷀듃由щ줈 ?섎돥?덈떎. ?꾩슂??而댄룷?뚰듃留??좏깮?곸쑝濡?import?섏뿬 踰덈뱾 ?ш린瑜?理쒖쟻?뷀븷 ???덉뒿?덈떎.

| Entry | Path | ?ㅻ챸 |
|-------|------|------|
| Core | `@hua-labs/ui` | 踰꾪듉/?덉씠?꾩썐/?곗씠???쒖떆 ??湲곕낯 而댄룷?뚰듃? ?좏떥 (?遺遺꾩쓽 ?쇰컲?곸씤 ??媛쒕컻 媛?? |
| Form | `@hua-labs/ui/form` | 紐⑤뱺 ??而댄룷?뚰듃 (Input, Select, DatePicker, Upload, Autocomplete ?? |
| Navigation | `@hua-labs/ui/navigation` | ?洹쒕え ??援ъ“???꾩슂???ㅻ퉬寃뚯씠??(PageNavigation, PageTransition) |
| Feedback | `@hua-labs/ui/feedback` | 湲濡쒕쾶 ?곹깭 愿由ш? ?꾩슂??Toast (ToastProvider, useToast) |
| Advanced (all) | `@hua-labs/ui/advanced` | ??쒕낫???꾩젽 + 怨좉툒 紐⑥뀡 ?꾩껜 |
| Dashboard widgets | `@hua-labs/ui/advanced/dashboard` | StatCard, TransactionsTable, TrendChart ???곗씠???꾩젽 |
| Motion/Experimental | `@hua-labs/ui/advanced/motion` | AdvancedPageTransition ??紐⑥뀡/?ㅽ뿕 湲곕뒫 |

```tsx
// Core 而댄룷?뚰듃 (媛???먯＜ ?ъ슜?섎뒗 而댄룷?뚰듃??
import { Button, Card, Table, Badge, Alert, Modal, Drawer } from '@hua-labs/ui';

// Form 而댄룷?뚰듃留?(踰덈뱾 理쒖쟻??
import { Input, Select, DatePicker, Form } from '@hua-labs/ui/form';

// Navigation 而댄룷?뚰듃 (?洹쒕え ?깆뿉?쒕쭔 ?꾩슂)
import { PageNavigation, PageTransition } from '@hua-labs/ui/navigation';

// Feedback 而댄룷?뚰듃 (Toast - 湲濡쒕쾶 ?곹깭 愿由?
import { ToastProvider, useToast } from '@hua-labs/ui/feedback';
import '@hua-labs/ui/styles/toast.css';

// Advanced ?꾩껜
import { StatCard, DashboardSidebar } from '@hua-labs/ui/advanced';

// ?꾩슂???곸뿭留??좏깮?곸쑝濡?
import { TransactionsTable } from '@hua-labs/ui/advanced/dashboard';
import { AdvancedPageTransition } from '@hua-labs/ui/advanced/motion';
```

**李멸퀬**: ?쒕툕?⑦궎吏 遺꾨━ 遺꾩꽍 臾몄꽌??瑜?李멸퀬?섏꽭??

## Bundle Optimization

HUA UI??紐⑤뱢 ?⑥쐞 踰덈뱾留곴낵 tree-shaking??吏?먰빀?덈떎. ?꾩슂??而댄룷?뚰듃留??좏깮?곸쑝濡?import?섏뿬 踰덈뱾 ?ш린瑜?理쒖쟻?뷀븷 ???덉뒿?덈떎.

### 踰덈뱾 理쒖쟻???꾨왂

- **Core**: 媛???먯＜ ?ъ슜?섎뒗 80% 而댄룷?뚰듃 ?ы븿 (?遺遺꾩쓽 ?쇰컲?곸씤 ??媛쒕컻 媛??
- **Form / Navigation / Feedback**: ?꾩슂??寃쎌슦?먮쭔 ?좏깮?곸쑝濡?import
- **Advanced / Dashboard / Motion**: ?洹쒕え ?깆뿉?쒕쭔 ?ъ슜?섎뒗 ?뱀닔 而댄룷?뚰듃

### ?ъ슜 ?덉떆

#### Next.js (Turbopack)

```tsx
// 沅뚯옣: ?꾩슂???쒕툕?⑦궎吏留?import (tree-shaking ?먮룞 ?곸슜)
import { Input, Select, DatePicker } from '@hua-labs/ui/form';
import { PageTransition } from '@hua-labs/ui/navigation';
import { ToastProvider, useToast } from '@hua-labs/ui/feedback';

// Core ?꾩껜瑜?遺덈윭?ㅼ? ?딆쑝誘濡?踰덈뱾 ?ш린 理쒖쟻??
```

#### Vite / Webpack

```tsx
// 沅뚯옣: ?쒕툕?⑦궎吏 ?ъ슜
import { Input } from '@hua-labs/ui/form';
import { PageTransition } from '@hua-labs/ui/navigation';

// 鍮꾧텒?? Core?먯꽌 紐⑤뱺 而댄룷?뚰듃 import (踰덈뱾 ?ш린 利앷?)
import { Input, PageTransition, ToastProvider } from '@hua-labs/ui';
```

### Tree-shaking

紐⑤뱺 ?뷀듃由??ъ씤?몃뒗 ESM ?뺤떇?쇰줈 ?쒓났?섎ŉ, 理쒖떊 踰덈뱾??Next.js Turbopack, Vite, Webpack 5+)?먯꽌 tree-shaking???먮룞?쇰줈 ?곸슜?⑸땲??

**理쒖쟻????*:
- ?꾩슂??而댄룷?뚰듃留?import
- ?쒕툕?⑦궎吏 ?쒖슜 (Form, Navigation, Feedback)
- Advanced 而댄룷?뚰듃???ㅼ젣濡??ъ슜???뚮쭔 import

**李멸퀬**: Core?먯꽌??紐⑤뱺 而댄룷?뚰듃瑜?import?????덉뒿?덈떎 (?섏쐞 ?명솚??. ?쒕툕?⑦궎吏??踰덈뱾 ?ш린 理쒖쟻?붾? ?꾪븳 ?좏깮?ы빆?낅땲?? Next.js + Turbopack ?섍꼍?먯꽌 tree-shaking???먮룞 ?곸슜?⑸땲??

## Quick Start

```tsx
import { Button, Input, Card, ThemeProvider } from '@hua-labs/ui';

function App() {
  return (
    <ThemeProvider>
      <div>
        <Button>Click me</Button>
        <Input placeholder="Enter text" />
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            Card content
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
```

### CSS ?ㅽ???import (Toast 而댄룷?뚰듃 ?ъ슜 ??

Toast 而댄룷?뚰듃???좊땲硫붿씠?섏쓣 ?ъ슜?섎젮硫?CSS ?뚯씪??import?댁빞 ?⑸땲??

```css
/* globals.css ?먮뒗 硫붿씤 CSS ?뚯씪??異붽? */
@import '@hua-labs/ui/styles/toast.css';
```

?먮뒗 JavaScript/TypeScript?먯꽌:

```tsx
// app/layout.tsx ?먮뒗 _app.tsx
import '@hua-labs/ui/styles/toast.css';
```

## Core Components

### Basic UI

#### Button

```tsx
import { Button } from '@hua-labs/ui';

<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="gradient">Gradient</Button>
<Button variant="neon">Neon</Button>
<Button variant="glass">Glass</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
```

#### Action

Advanced button component with additional effects and styles.

```tsx
import { Action } from '@hua-labs/ui';

<Action actionType="primary">Primary Action</Action>
<Action actionType="secondary">Secondary Action</Action>
<Action actionType="magical">Magical</Action>
<Action actionType="cyberpunk">Cyberpunk</Action>
<Action feedback="ripple">Ripple Effect</Action>
<Action feedback="particle">Particle Effect</Action>
<Action particleEffect rippleEffect>Multiple Effects</Action>
```

#### Input

```tsx
import { Input } from '@hua-labs/ui';

<Input placeholder="Enter text" />
<Input type="password" />
<Input disabled />
<Input error="Error message" />
```

#### Icon

```tsx
import { Icon } from '@hua-labs/ui';

<Icon name="heart" />
<Icon name="star" size="lg" />
<Icon name="user" className="text-blue-500" />
```

Supports Lucide React icons and optional Phosphor Icons.

#### Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@hua-labs/ui';

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Layout Components

#### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@hua-labs/ui';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

#### Panel

Advanced card component with more styling options.

```tsx
import { Panel } from '@hua-labs/ui';

<Panel style="elevated" padding="large">
  Elevated panel
</Panel>
<Panel style="outline" padding="medium">
  Outline panel
</Panel>
```

#### Container

```tsx
import { Container } from '@hua-labs/ui';

<Container size="sm">Small container</Container>
<Container size="md">Medium container</Container>
<Container size="lg">Large container</Container>
<Container size="xl">Extra large container</Container>
```

#### Grid

```tsx
import { Grid } from '@hua-labs/ui';

<Grid cols={3} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

#### Stack

```tsx
import { Stack } from '@hua-labs/ui';

<Stack direction="vertical" gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

### Navigation Components

#### Navigation

```tsx
import { Navigation, NavigationList, NavigationItem, NavigationContent } from '@hua-labs/ui';

<Navigation defaultValue="tab1">
  <NavigationList>
    <NavigationItem value="tab1">Tab 1</NavigationItem>
    <NavigationItem value="tab2">Tab 2</NavigationItem>
  </NavigationList>
  <NavigationContent value="tab1">Tab 1 content</NavigationContent>
  <NavigationContent value="tab2">Tab 2 content</NavigationContent>
</Navigation>
```

#### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@hua-labs/ui';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab2">Tab 2 content</TabsContent>
</Tabs>
```

#### Breadcrumb

```tsx
import { Breadcrumb, BreadcrumbItem } from '@hua-labs/ui';

<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem>Current</BreadcrumbItem>
</Breadcrumb>
```

#### Pagination

```tsx
import { Pagination, PaginationWithInfo } from '@hua-labs/ui';

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log(page)}
/>

<PaginationWithInfo
  currentPage={1}
  totalPages={10}
  totalItems={100}
  itemsPerPage={10}
  onPageChange={(page) => console.log(page)}
/>
```

### Form Components

#### Form

```tsx
import { Form, FormField, FormGroup } from '@hua-labs/ui';

<Form onSubmit={handleSubmit}>
  <FormGroup>
    <FormField label="Name" required>
      <Input name="name" />
    </FormField>
    <FormField label="Email" required>
      <Input type="email" name="email" />
    </FormField>
  </FormGroup>
</Form>
```

#### Select

```tsx
import { Select, SelectOption } from '@hua-labs/ui';

<Select value={value} onValueChange={setValue}>
  <SelectOption value="option1">Option 1</SelectOption>
  <SelectOption value="option2">Option 2</SelectOption>
</Select>
```

#### Checkbox

```tsx
import { Checkbox } from '@hua-labs/ui';

<Checkbox checked={checked} onCheckedChange={setChecked}>
  Accept terms
</Checkbox>
```

#### Radio

```tsx
import { Radio } from '@hua-labs/ui';

<Radio value="option1" checked={value === "option1"} onChange={handleChange}>
  Option 1
</Radio>
```

#### Switch

```tsx
import { Switch } from '@hua-labs/ui';

<Switch checked={enabled} onCheckedChange={setEnabled} />
```

#### Textarea

```tsx
import { Textarea } from '@hua-labs/ui';

<Textarea placeholder="Enter text" rows={4} />
```

#### Slider

```tsx
import { Slider } from '@hua-labs/ui';

<Slider
  value={value}
  onValueChange={setValue}
  min={0}
  max={100}
  step={1}
/>
```

### Feedback Components

#### Alert

```tsx
import { Alert, AlertSuccess, AlertWarning, AlertError, AlertInfo } from '@hua-labs/ui';

<Alert>Default alert</Alert>
<AlertSuccess>Success message</AlertSuccess>
<AlertWarning>Warning message</AlertWarning>
<AlertError>Error message</AlertError>
<AlertInfo>Info message</AlertInfo>
```

#### Toast

```tsx
import { ToastProvider, useToast } from '@hua-labs/ui';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}

function Component() {
  const { addToast } = useToast();
  
  const handleClick = () => {
    addToast({
      title: "Success",
      description: "Operation completed",
      variant: "success"
    });
  };
  
  return <Button onClick={handleClick}>Show Toast</Button>;
}
```

#### LoadingSpinner

```tsx
import { LoadingSpinner } from '@hua-labs/ui';

<LoadingSpinner />
<LoadingSpinner size="sm" />
<LoadingSpinner size="lg" />
<LoadingSpinner color="primary" />
```

#### Tooltip

```tsx
import { Tooltip, TooltipLight, TooltipDark } from '@hua-labs/ui';

<Tooltip content="Tooltip text">
  <Button>Hover me</Button>
</Tooltip>
```

### Overlay Components

#### Modal

```tsx
import { Modal } from '@hua-labs/ui';

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <div className="p-6">
    <h2>Modal Title</h2>
    <p>Modal content</p>
  </div>
</Modal>
```

#### ConfirmModal

```tsx
import { ConfirmModal } from '@hua-labs/ui';

<ConfirmModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleConfirm}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
/>
```

#### Drawer

```tsx
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from '@hua-labs/ui';

<Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <DrawerHeader>Drawer Title</DrawerHeader>
  <DrawerContent>
    Drawer content
  </DrawerContent>
  <DrawerFooter>
    Footer actions
  </DrawerFooter>
</Drawer>
```

#### BottomSheet

```tsx
import { BottomSheet } from '@hua-labs/ui';

<BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <div className="p-6">
    <h2>Bottom Sheet Title</h2>
    <p>Bottom sheet content</p>
  </div>
</BottomSheet>
```

#### Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent } from '@hua-labs/ui';

<Popover>
  <PopoverTrigger>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    Popover content
  </PopoverContent>
</Popover>
```

#### Dropdown

```tsx
import { Dropdown, DropdownMenu, DropdownItem, DropdownSeparator, DropdownLabel, DropdownGroup } from '@hua-labs/ui';

<Dropdown>
  <DropdownMenu>
    <DropdownLabel>My Account</DropdownLabel>
    <DropdownSeparator />
    <DropdownGroup>
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
    </DropdownGroup>
    <DropdownSeparator />
    <DropdownItem>Logout</DropdownItem>
  </DropdownMenu>
</Dropdown>
```

### Data Display Components

#### Table

```tsx
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from '@hua-labs/ui';

<Table>
  <TableCaption>Table caption</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Badge

```tsx
import { Badge } from '@hua-labs/ui';

<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
```

#### Progress

```tsx
import { Progress, ProgressSuccess, ProgressWarning, ProgressError, ProgressInfo } from '@hua-labs/ui';

<Progress value={50} />
<ProgressSuccess value={75} />
<ProgressWarning value={50} />
<ProgressError value={25} />
<ProgressInfo value={60} />
```

#### Skeleton

```tsx
import { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard, SkeletonAvatar } from '@hua-labs/ui';

<Skeleton className="h-4 w-full" />
<SkeletonText lines={3} />
<SkeletonCircle size={40} />
<SkeletonCard />
<SkeletonAvatar />
```

### Interactive Components

#### Accordion

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@hua-labs/ui';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Item 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### Menu

```tsx
import { Menu, MenuItem, MenuSeparator, MenuLabel, MenuHorizontal, MenuVertical } from '@hua-labs/ui';

<Menu>
  <MenuItem>Item 1</MenuItem>
  <MenuItem>Item 2</MenuItem>
  <MenuSeparator />
  <MenuLabel>Label</MenuLabel>
  <MenuItem>Item 3</MenuItem>
</Menu>
```

#### Command

```tsx
import { Command, CommandInput, CommandList, CommandItem, CommandGroup, CommandEmpty } from '@hua-labs/ui';

<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### Scroll Components

#### ScrollToTop

```tsx
import { ScrollToTop } from '@hua-labs/ui';

<ScrollToTop 
  className="fixed bottom-6 right-6"
  threshold={150}
/>
```

#### ScrollProgress

```tsx
import { ScrollProgress } from '@hua-labs/ui';

<ScrollProgress />
```

#### ScrollIndicator

```tsx
import { ScrollIndicator } from '@hua-labs/ui';

<ScrollIndicator />
```

#### ScrollArea

```tsx
import { ScrollArea } from '@hua-labs/ui';

<ScrollArea className="h-72">
  <div>Scrollable content</div>
</ScrollArea>
```

### Theme Components

#### ThemeProvider

```tsx
import { ThemeProvider } from '@hua-labs/ui';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

#### ThemeToggle

```tsx
import { ThemeToggle } from '@hua-labs/ui';

<ThemeToggle />
```

### Specialized Components

#### ChatMessage

```tsx
import { ChatMessage } from '@hua-labs/ui';

<ChatMessage
  message="Hello, world!"
  sender="user"
  timestamp={new Date()}
/>
```

#### EmotionAnalysis

```tsx
import { EmotionAnalysis } from '@hua-labs/ui';

<EmotionAnalysis
  emotions={['joy', 'sadness', 'anger']}
  intensity={[0.8, 0.3, 0.2]}
/>
```

#### EmotionSelector

```tsx
import { EmotionSelector } from '@hua-labs/ui';

<EmotionSelector
  value={selectedEmotion}
  onValueChange={setSelectedEmotion}
/>
```

#### InfoCard

```tsx
import { InfoCard } from '@hua-labs/ui';

<InfoCard
  title="Information"
  description="This is an info card"
  variant="info"
/>
```

#### FeatureCard

```tsx
import { FeatureCard } from '@hua-labs/ui';

<FeatureCard
  title="Feature"
  description="Feature description"
  icon={<Icon name="star" />}
/>
```

### Dashboard Components

Dashboard components are available from the advanced export:

```tsx
import {
  StatCard,
  QuickActionCard,
  DashboardGrid,
  ActivityFeed,
  ProfileCard,
  MembershipBadge,
  MiniBarChart,
  SummaryCard,
  NotificationCard,
  MetricCard,
  ProgressCard
} from '@hua-labs/ui';
```

Or import from the dashboard subpath:

```tsx
import * from '@hua-labs/ui/advanced/dashboard';
```

### Advanced Page Transitions

Advanced page transition components are available from the advanced export:

```tsx
import {
  AdvancedPageTransition,
  usePageTransition,
  usePageTransitionManager
} from '@hua-labs/ui/advanced';
```

## Utilities

### merge

Smart class merging utility that resolves duplicate Tailwind classes.

```tsx
import { merge } from '@hua-labs/ui';

const className = merge("px-2 py-1", "px-4"); // "py-1 px-4"
const className2 = merge("text-red-500", "text-blue-500"); // "text-blue-500"
```

### mergeIf

Conditional class merging.

```tsx
import { mergeIf } from '@hua-labs/ui';

const className = mergeIf(isActive, "bg-blue-500", "bg-gray-200");
const className2 = mergeIf(isLoading, "opacity-50 cursor-not-allowed");
```

### mergeMap

Object-based conditional class merging.

```tsx
import { mergeMap } from '@hua-labs/ui';

const className = mergeMap({
  "bg-blue-500": isPrimary,
  "bg-gray-500": !isPrimary,
  "text-white": true,
  "opacity-50": isDisabled
});
```

### cn

Alias for `merge` (for compatibility with shadcn/ui).

```tsx
import { cn } from '@hua-labs/ui';

const className = cn("px-2", "py-1");
```

### formatRelativeTime

Format a date as relative time (e.g., "諛⑷툑 ??, "5遺???, "2?쒓컙 ??, "3????). Returns absolute date for dates older than 7 days.

```tsx
import { formatRelativeTime } from '@hua-labs/ui';

formatRelativeTime(new Date()) // "諛⑷툑 ??
formatRelativeTime(new Date(Date.now() - 5 * 60000)) // "5遺???
formatRelativeTime(new Date(Date.now() - 2 * 3600000)) // "2?쒓컙 ??
formatRelativeTime(new Date(Date.now() - 3 * 86400000)) // "3????
formatRelativeTime(new Date("2024-01-01")) // "2024. 1. 1." (7???댁긽 寃쎄낵)
```

## Icon Support

The Icon component supports multiple icon libraries:

- Lucide React (default, included)
- Phosphor Icons (optional, requires `@phosphor-icons/react`)

```tsx
import { Icon } from '@hua-labs/ui';

// Lucide icons (default)
<Icon name="heart" />
<Icon name="star" />

// Phosphor icons (if installed)
<Icon name="heart" provider="phosphor" />
```

## Exports

### Main Export

```tsx
import { Button, Input, Card } from '@hua-labs/ui';
```

### Advanced Exports

```tsx
import * from '@hua-labs/ui/advanced';
import * from '@hua-labs/ui/advanced/dashboard';
import * from '@hua-labs/ui/advanced/motion';
```

### Style Exports

```tsx
import '@hua-labs/ui/styles/toast.css';
```

## Development

### Build

```bash
pnpm build
```

### Development Mode

```bash
pnpm dev
```

### Type Check

```bash
pnpm type-check
```

### Lint

```bash
pnpm lint
```

### Test

```bash
pnpm test
```

## Requirements

- React >= 16.8.0
- React DOM >= 16.8.0
- Tailwind CSS (for styling)
- Optional: @phosphor-icons/react (for Phosphor icon support)

## License

MIT License

## 臾몄꽌

- [?꾪궎?띿쿂 臾몄꽌](./docs/ARCHITECTURE.md) - ?꾩껜 ?꾪궎?띿쿂 諛??ㅺ퀎 ?먯튃
- [?⑦궎吏 援ъ“](./docs/PACKAGE_STRUCTURE.md) - ?붾젆?좊━ 援ъ“ 諛??뚯씪 議곗쭅
- [媛쒕컻 媛?대뱶](./docs/DEVELOPMENT_GUIDE.md) - 而댄룷?뚰듃 異붽? 諛?媛쒕컻 媛?대뱶
- [紐⑤끂?덊룷/硫?곕젅???명솚??(./docs/MONOREPO_COMPATIBILITY.md) - 紐⑤끂?덊룷 諛?硫?곕젅???섍꼍 ?명솚??
- [?꾩씠肄??쒖뒪??(./docs/ICON_SYSTEM.md) - ?꾩씠肄??쒖뒪??媛?대뱶

## Repository

https://github.com/HUA-Labs/HUA-Labs-public

