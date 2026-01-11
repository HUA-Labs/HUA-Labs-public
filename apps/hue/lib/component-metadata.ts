/**
 * Component Metadata System
 *
 * SDUI 레지스트리의 각 컴포넌트에 대한 메타데이터 정의
 * - 팔레트 표시용 정보
 * - 속성 편집기용 스키마
 */

import type { ComponentMetadata, ComponentCategory, PropSchema } from "@/types";

/**
 * 공통 props 스키마
 */
const commonProps: PropSchema[] = [
  {
    name: "className",
    displayName: "CSS 클래스",
    type: "string",
    description: "추가 CSS 클래스",
    group: "스타일",
  },
];

/**
 * 텍스트 정렬 prop (기본값: center)
 */
const alignProp: PropSchema = {
  name: "align",
  displayName: "정렬",
  type: "select",
  options: [
    { label: "왼쪽", value: "left" },
    { label: "중앙", value: "center" },
    { label: "오른쪽", value: "right" },
  ],
  defaultValue: "center",
  group: "레이아웃",
};

/**
 * 타이포그래피 스타일 props
 */
const typographyStyleProps: PropSchema[] = [
  {
    name: "fontSize",
    displayName: "폰트 크기",
    type: "select",
    options: [
      { label: "기본", value: "" },
      { label: "12px (xs)", value: "12px" },
      { label: "14px (sm)", value: "14px" },
      { label: "16px (base)", value: "16px" },
      { label: "18px (lg)", value: "18px" },
      { label: "20px (xl)", value: "20px" },
      { label: "24px (2xl)", value: "24px" },
      { label: "30px (3xl)", value: "30px" },
      { label: "36px (4xl)", value: "36px" },
      { label: "48px (5xl)", value: "48px" },
      { label: "60px (6xl)", value: "60px" },
    ],
    defaultValue: "",
    group: "타이포그래피",
  },
  {
    name: "lineHeight",
    displayName: "줄 높이",
    type: "select",
    options: [
      { label: "기본", value: "" },
      { label: "1.0 (빽빽)", value: "1" },
      { label: "1.2 (촘촘)", value: "1.2" },
      { label: "1.4 (본문)", value: "1.4" },
      { label: "1.5 (보통)", value: "1.5" },
      { label: "1.6 (여유)", value: "1.6" },
      { label: "1.8 (넓음)", value: "1.8" },
      { label: "2.0 (아주 넓음)", value: "2" },
    ],
    defaultValue: "",
    group: "타이포그래피",
  },
  {
    name: "fontWeight",
    displayName: "두께",
    type: "select",
    options: [
      { label: "기본", value: "" },
      { label: "가늘게 (300)", value: "300" },
      { label: "보통 (400)", value: "400" },
      { label: "중간 (500)", value: "500" },
      { label: "굵게 (600)", value: "600" },
      { label: "두껍게 (700)", value: "700" },
      { label: "아주 두껍게 (800)", value: "800" },
    ],
    defaultValue: "",
    group: "타이포그래피",
  },
  {
    name: "letterSpacing",
    displayName: "자간",
    type: "select",
    options: [
      { label: "기본", value: "" },
      { label: "좁게 (-0.05em)", value: "-0.05em" },
      { label: "약간 좁게 (-0.025em)", value: "-0.025em" },
      { label: "보통 (0)", value: "0" },
      { label: "약간 넓게 (0.025em)", value: "0.025em" },
      { label: "넓게 (0.05em)", value: "0.05em" },
      { label: "아주 넓게 (0.1em)", value: "0.1em" },
    ],
    defaultValue: "",
    group: "타이포그래피",
  },
];

/**
 * 레이아웃 컴포넌트
 */
const layoutComponents: ComponentMetadata[] = [
  {
    type: "Box",
    displayName: "박스",
    category: "layout",
    icon: "folder",
    description: "기본 컨테이너",
    allowsChildren: true,
    childrenType: "nodes",
    propSchema: [
      {
        name: "justify",
        displayName: "주축 정렬",
        type: "select",
        options: [
          { label: "없음", value: "" },
          { label: "시작", value: "start" },
          { label: "중앙", value: "center" },
          { label: "끝", value: "end" },
          { label: "균등", value: "between" },
        ],
        defaultValue: "",
        group: "레이아웃",
      },
      {
        name: "align",
        displayName: "교차축 정렬",
        type: "select",
        options: [
          { label: "없음", value: "" },
          { label: "시작", value: "start" },
          { label: "중앙", value: "center" },
          { label: "끝", value: "end" },
          { label: "늘리기", value: "stretch" },
        ],
        defaultValue: "",
        group: "레이아웃",
      },
      {
        name: "backgroundColor",
        displayName: "배경색",
        type: "color",
        defaultValue: "",
        group: "스타일",
      },
      ...commonProps,
    ],
    defaultProps: {},
  },
  {
    type: "Spacer",
    displayName: "공백",
    category: "layout",
    icon: "minus",
    description: "빈 공간 (void)",
    allowsChildren: false,
    propSchema: [
      {
        name: "size",
        displayName: "크기",
        type: "number",
        defaultValue: 16,
        min: 1,
        group: "레이아웃",
      },
      ...commonProps,
    ],
    defaultProps: { size: 16 },
  },
  {
    type: "Flex",
    displayName: "Flex",
    category: "layout",
    icon: "folder",
    description: "Flexbox 레이아웃",
    allowsChildren: true,
    childrenType: "nodes",
    propSchema: [
      {
        name: "direction",
        displayName: "방향",
        type: "select",
        options: [
          { label: "가로", value: "row" },
          { label: "세로", value: "column" },
        ],
        defaultValue: "row",
        group: "레이아웃",
      },
      {
        name: "justify",
        displayName: "주축 정렬",
        type: "select",
        options: [
          { label: "시작", value: "start" },
          { label: "중앙", value: "center" },
          { label: "끝", value: "end" },
          { label: "균등", value: "between" },
        ],
        defaultValue: "center",
        group: "레이아웃",
      },
      {
        name: "align",
        displayName: "교차축 정렬",
        type: "select",
        options: [
          { label: "시작", value: "start" },
          { label: "중앙", value: "center" },
          { label: "끝", value: "end" },
          { label: "늘리기", value: "stretch" },
        ],
        defaultValue: "center",
        group: "레이아웃",
      },
      {
        name: "gap",
        displayName: "간격",
        type: "number",
        defaultValue: 0,
        min: 0,
        group: "레이아웃",
      },
      ...commonProps,
    ],
    defaultProps: { direction: "row", justify: "center", align: "center", gap: 4 },
  },
  {
    type: "Grid",
    displayName: "Grid",
    category: "layout",
    icon: "folder",
    description: "Grid 레이아웃",
    allowsChildren: true,
    childrenType: "nodes",
    propSchema: [
      {
        name: "cols",
        displayName: "열 수",
        type: "number",
        defaultValue: 1,
        min: 1,
        group: "레이아웃",
      },
      {
        name: "gap",
        displayName: "간격",
        type: "number",
        defaultValue: 4,
        min: 0,
        group: "레이아웃",
      },
      ...commonProps,
    ],
    defaultProps: { cols: 2, gap: 4 },
  },
  {
    type: "Section",
    displayName: "섹션",
    category: "layout",
    icon: "folder",
    description: "페이지 섹션",
    allowsChildren: true,
    childrenType: "nodes",
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "Container",
    displayName: "컨테이너",
    category: "layout",
    icon: "folder",
    description: "최대 너비 컨테이너",
    allowsChildren: true,
    childrenType: "nodes",
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "Divider",
    displayName: "구분선",
    category: "layout",
    icon: "folder",
    description: "수평 구분선",
    allowsChildren: false,
    propSchema: [...commonProps],
    defaultProps: {},
  },
];

/**
 * 타이포그래피 컴포넌트
 */
const typographyComponents: ComponentMetadata[] = [
  {
    type: "Text",
    displayName: "텍스트",
    category: "typography",
    icon: "fileText",
    description: "일반 텍스트",
    allowsChildren: true,
    childrenType: "text",
    propSchema: [
      {
        name: "variant",
        displayName: "스타일",
        type: "select",
        options: [
          { label: "본문", value: "body" },
          { label: "흐린", value: "muted" },
          { label: "리드", value: "lead" },
        ],
        defaultValue: "body",
        group: "스타일",
      },
      alignProp,
      ...typographyStyleProps,
      ...commonProps,
    ],
    defaultProps: { variant: "body", align: "center" },
  },
  {
    type: "H1",
    displayName: "제목 1",
    category: "typography",
    icon: "fileText",
    description: "가장 큰 제목",
    allowsChildren: true,
    childrenType: "text",
    propSchema: [alignProp, ...typographyStyleProps, ...commonProps],
    defaultProps: { align: "center" },
  },
  {
    type: "H2",
    displayName: "제목 2",
    category: "typography",
    icon: "fileText",
    description: "두 번째 제목",
    allowsChildren: true,
    childrenType: "text",
    propSchema: [alignProp, ...typographyStyleProps, ...commonProps],
    defaultProps: { align: "center" },
  },
  {
    type: "H3",
    displayName: "제목 3",
    category: "typography",
    icon: "fileText",
    description: "세 번째 제목",
    allowsChildren: true,
    childrenType: "text",
    propSchema: [alignProp, ...typographyStyleProps, ...commonProps],
    defaultProps: { align: "center" },
  },
  {
    type: "H4",
    displayName: "제목 4",
    category: "typography",
    icon: "fileText",
    description: "네 번째 제목",
    allowsChildren: true,
    childrenType: "text",
    propSchema: [alignProp, ...typographyStyleProps, ...commonProps],
    defaultProps: { align: "center" },
  },
  {
    type: "Link",
    displayName: "링크",
    category: "typography",
    icon: "link",
    description: "하이퍼링크 (인라인)",
    allowsChildren: true,
    childrenType: "text",
    propSchema: [
      {
        name: "href",
        displayName: "URL",
        type: "string",
        defaultValue: "https://",
        description: "https:// 또는 / 로 시작",
        group: "속성",
      },
      {
        name: "target",
        displayName: "열기 방식",
        type: "select",
        options: [
          { label: "새 탭", value: "_blank" },
          { label: "현재 탭", value: "_self" },
        ],
        defaultValue: "_blank",
        group: "속성",
      },
      ...commonProps,
    ],
    defaultProps: { href: "https://", target: "_blank" },
  },
];

/**
 * 폼 컴포넌트
 */
const formComponents: ComponentMetadata[] = [
  {
    type: "Button",
    displayName: "버튼",
    category: "form",
    icon: "zap",
    description: "클릭 가능한 버튼",
    allowsChildren: true,
    childrenType: "text",
    propSchema: [
      {
        name: "variant",
        displayName: "스타일",
        type: "select",
        options: [
          { label: "기본", value: "default" },
          { label: "보조", value: "secondary" },
          { label: "아웃라인", value: "outline" },
          { label: "고스트", value: "ghost" },
          { label: "링크", value: "link" },
          { label: "위험", value: "destructive" },
        ],
        defaultValue: "default",
        group: "스타일",
      },
      {
        name: "size",
        displayName: "크기",
        type: "select",
        options: [
          { label: "작게", value: "sm" },
          { label: "보통", value: "default" },
          { label: "크게", value: "lg" },
        ],
        defaultValue: "default",
        group: "스타일",
      },
      ...commonProps,
    ],
    defaultProps: { variant: "default", size: "default" },
  },
  {
    type: "Input",
    displayName: "입력",
    category: "form",
    icon: "edit",
    description: "텍스트 입력 필드",
    allowsChildren: false,
    propSchema: [
      {
        name: "placeholder",
        displayName: "플레이스홀더",
        type: "string",
        defaultValue: "입력하세요...",
        group: "속성",
      },
      {
        name: "type",
        displayName: "타입",
        type: "select",
        options: [
          { label: "텍스트", value: "text" },
          { label: "이메일", value: "email" },
          { label: "비밀번호", value: "password" },
          { label: "숫자", value: "number" },
        ],
        defaultValue: "text",
        group: "속성",
      },
      ...commonProps,
    ],
    defaultProps: { placeholder: "입력하세요...", type: "text" },
  },
  {
    type: "Textarea",
    displayName: "텍스트영역",
    category: "form",
    icon: "edit",
    description: "여러 줄 텍스트 입력",
    allowsChildren: false,
    propSchema: [
      {
        name: "placeholder",
        displayName: "플레이스홀더",
        type: "string",
        defaultValue: "입력하세요...",
        group: "속성",
      },
      ...commonProps,
    ],
    defaultProps: { placeholder: "입력하세요..." },
  },
  {
    type: "Checkbox",
    displayName: "체크박스",
    category: "form",
    icon: "check",
    description: "체크박스",
    allowsChildren: false,
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "Switch",
    displayName: "스위치",
    category: "form",
    icon: "check",
    description: "토글 스위치",
    allowsChildren: false,
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "Label",
    displayName: "레이블",
    category: "form",
    icon: "fileText",
    description: "폼 레이블",
    allowsChildren: true,
    childrenType: "text",
    propSchema: [...commonProps],
    defaultProps: {},
  },
];

/**
 * 디스플레이 컴포넌트
 */
const displayComponents: ComponentMetadata[] = [
  {
    type: "Card",
    displayName: "카드",
    category: "display",
    icon: "folder",
    description: "카드 컨테이너",
    allowsChildren: true,
    childrenType: "nodes",
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "CardHeader",
    displayName: "카드 헤더",
    category: "display",
    icon: "folder",
    description: "카드 헤더 영역",
    allowsChildren: true,
    childrenType: "nodes",
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "CardTitle",
    displayName: "카드 제목",
    category: "display",
    icon: "fileText",
    description: "카드 제목",
    allowsChildren: true,
    childrenType: "text",
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "CardDescription",
    displayName: "카드 설명",
    category: "display",
    icon: "fileText",
    description: "카드 설명 텍스트",
    allowsChildren: true,
    childrenType: "text",
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "CardContent",
    displayName: "카드 콘텐츠",
    category: "display",
    icon: "folder",
    description: "카드 본문 영역",
    allowsChildren: true,
    childrenType: "nodes",
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "CardFooter",
    displayName: "카드 푸터",
    category: "display",
    icon: "folder",
    description: "카드 하단 영역",
    allowsChildren: true,
    childrenType: "nodes",
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "Badge",
    displayName: "뱃지",
    category: "display",
    icon: "star",
    description: "상태/태그 표시",
    allowsChildren: true,
    childrenType: "text",
    propSchema: [
      {
        name: "variant",
        displayName: "스타일",
        type: "select",
        options: [
          { label: "기본", value: "default" },
          { label: "보조", value: "secondary" },
          { label: "아웃라인", value: "outline" },
          { label: "위험", value: "destructive" },
        ],
        defaultValue: "default",
        group: "스타일",
      },
      ...commonProps,
    ],
    defaultProps: { variant: "default" },
  },
  {
    type: "Avatar",
    displayName: "아바타",
    category: "display",
    icon: "user",
    description: "사용자 프로필 이미지",
    allowsChildren: true,
    childrenType: "nodes",
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "Image",
    displayName: "이미지",
    category: "display",
    icon: "image",
    description: "이미지",
    allowsChildren: false,
    propSchema: [
      {
        name: "src",
        displayName: "이미지 URL",
        type: "string",
        defaultValue: "https://via.placeholder.com/150",
        group: "속성",
      },
      {
        name: "alt",
        displayName: "대체 텍스트",
        type: "string",
        defaultValue: "이미지",
        group: "속성",
      },
      ...commonProps,
    ],
    defaultProps: { src: "https://via.placeholder.com/150", alt: "이미지" },
  },
  {
    type: "Icon",
    displayName: "아이콘",
    category: "display",
    icon: "star",
    description: "아이콘",
    allowsChildren: false,
    propSchema: [
      {
        name: "name",
        displayName: "아이콘 이름",
        type: "string",
        defaultValue: "star",
        description: "예: star, heart, home, check...",
        group: "속성",
      },
      {
        name: "size",
        displayName: "크기",
        type: "number",
        defaultValue: 24,
        min: 1,
        group: "속성",
      },
      ...commonProps,
    ],
    defaultProps: { name: "star", size: 24 },
  },
];

/**
 * 피드백 컴포넌트
 */
const feedbackComponents: ComponentMetadata[] = [
  {
    type: "Alert",
    displayName: "알림",
    category: "feedback",
    icon: "alertCircle",
    description: "알림 메시지",
    allowsChildren: true,
    childrenType: "nodes",
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "Progress",
    displayName: "프로그레스",
    category: "feedback",
    icon: "activity",
    description: "진행률 표시",
    allowsChildren: false,
    propSchema: [
      {
        name: "value",
        displayName: "값",
        type: "number",
        defaultValue: 50,
        group: "속성",
      },
      ...commonProps,
    ],
    defaultProps: { value: 50 },
  },
  {
    type: "Skeleton",
    displayName: "스켈레톤",
    category: "feedback",
    icon: "loader",
    description: "로딩 스켈레톤",
    allowsChildren: false,
    propSchema: [...commonProps],
    defaultProps: {},
  },
];

/**
 * 고급 컴포넌트
 */
const advancedComponents: ComponentMetadata[] = [
  {
    type: "Header",
    displayName: "헤더",
    category: "advanced",
    icon: "menu",
    description: "네비게이션 헤더 (GNB)",
    allowsChildren: true,
    childrenType: "nodes",
    isPro: true,
    propSchema: [
      {
        name: "overlay",
        displayName: "오버레이 모드",
        type: "boolean",
        defaultValue: false,
        description: "히어로 섹션 위에 겹치게 배치",
        group: "레이아웃",
      },
      {
        name: "sticky",
        displayName: "스크롤 고정",
        type: "boolean",
        defaultValue: true,
        description: "스크롤 시 상단에 고정 (오버레이 꺼짐 시)",
        group: "레이아웃",
      },
      {
        name: "transparent",
        displayName: "투명 배경",
        type: "boolean",
        defaultValue: false,
        description: "배경을 투명하게",
        group: "스타일",
      },
      {
        name: "blur",
        displayName: "배경 블러",
        type: "boolean",
        defaultValue: true,
        description: "배경 블러 효과 (투명 아닐 때)",
        group: "스타일",
      },
      ...commonProps,
    ],
    defaultProps: {
      overlay: false,
      sticky: true,
      transparent: false,
      blur: true,
    },
  },
  {
    type: "HeroSection",
    displayName: "히어로 섹션",
    category: "advanced",
    icon: "star",
    description: "페이지 상단 히어로 영역",
    allowsChildren: false,
    isPro: true,
    propSchema: [
      {
        name: "title",
        displayName: "제목",
        type: "string",
        defaultValue: "환영합니다",
        group: "콘텐츠",
      },
      {
        name: "subtitle",
        displayName: "부제목",
        type: "string",
        defaultValue: "",
        group: "콘텐츠",
      },
      {
        name: "description",
        displayName: "설명",
        type: "string",
        defaultValue: "여기에 설명을 입력하세요",
        group: "콘텐츠",
      },
      {
        name: "size",
        displayName: "크기",
        type: "select",
        options: [
          { label: "작게", value: "sm" },
          { label: "보통", value: "md" },
          { label: "크게", value: "lg" },
          { label: "아주 크게", value: "xl" },
          { label: "전체 화면", value: "full" },
        ],
        defaultValue: "lg",
        group: "레이아웃",
      },
      {
        name: "background",
        displayName: "배경",
        type: "select",
        options: [
          { label: "없음", value: "none" },
          { label: "그라데이션", value: "gradient" },
        ],
        defaultValue: "none",
        group: "스타일",
      },
      ...commonProps,
    ],
    defaultProps: {
      title: "환영합니다",
      description: "여기에 설명을 입력하세요",
      size: "lg",
    },
  },
  {
    type: "ScrollProgress",
    displayName: "스크롤 프로그레스",
    category: "advanced",
    icon: "activity",
    description: "페이지 스크롤 진행률 표시",
    allowsChildren: false,
    isPro: true,
    propSchema: [...commonProps],
    defaultProps: {},
  },
  {
    type: "Accordion",
    displayName: "아코디언",
    category: "advanced",
    icon: "chevronDown",
    description: "접이식 콘텐츠 패널",
    allowsChildren: false,
    isPro: true,
    propSchema: [
      {
        name: "type",
        displayName: "모드",
        type: "select",
        options: [
          { label: "단일 열기", value: "single" },
          { label: "다중 열기", value: "multiple" },
        ],
        defaultValue: "single",
        group: "동작",
      },
      {
        name: "collapsible",
        displayName: "모두 닫기 허용",
        type: "boolean",
        defaultValue: true,
        description: "단일 모드에서 열린 아이템 닫기 허용",
        group: "동작",
      },
      ...commonProps,
    ],
    defaultProps: {
      type: "single",
      collapsible: true,
      items: [
        { title: "항목 1", content: "첫 번째 항목의 내용입니다." },
        { title: "항목 2", content: "두 번째 항목의 내용입니다." },
        { title: "항목 3", content: "세 번째 항목의 내용입니다." },
      ],
    },
  },
  {
    type: "Tabs",
    displayName: "탭",
    category: "advanced",
    icon: "folder",
    description: "탭 네비게이션",
    allowsChildren: false,
    isPro: true,
    propSchema: [
      {
        name: "variant",
        displayName: "스타일",
        type: "select",
        options: [
          { label: "기본", value: "default" },
          { label: "알약", value: "pills" },
          { label: "밑줄", value: "underline" },
          { label: "카드", value: "cards" },
        ],
        defaultValue: "default",
        group: "스타일",
      },
      ...commonProps,
    ],
    defaultProps: {
      variant: "default",
      tabs: [
        { label: "탭 1", content: "첫 번째 탭의 내용입니다." },
        { label: "탭 2", content: "두 번째 탭의 내용입니다." },
        { label: "탭 3", content: "세 번째 탭의 내용입니다." },
      ],
    },
  },
];

/**
 * 전체 컴포넌트 메타데이터
 */
export const componentMetadata: ComponentMetadata[] = [
  ...layoutComponents,
  ...typographyComponents,
  ...formComponents,
  ...displayComponents,
  ...feedbackComponents,
  ...advancedComponents,
];

/**
 * 카테고리별 컴포넌트 그룹
 */
export const componentsByCategory: Record<ComponentCategory, ComponentMetadata[]> = {
  layout: layoutComponents,
  typography: typographyComponents,
  form: formComponents,
  display: displayComponents,
  feedback: feedbackComponents,
  advanced: advancedComponents,
};

/**
 * 카테고리 정보
 */
export const categoryInfo: Record<ComponentCategory, { displayName: string; icon: string }> = {
  layout: { displayName: "레이아웃", icon: "folder" },
  typography: { displayName: "타이포그래피", icon: "fileText" },
  form: { displayName: "폼", icon: "edit" },
  display: { displayName: "디스플레이", icon: "monitor" },
  feedback: { displayName: "피드백", icon: "bell" },
  advanced: { displayName: "고급", icon: "sparkles" },
};

/**
 * 컴포넌트 타입으로 메타데이터 찾기
 */
export function getComponentMetadata(type: string): ComponentMetadata | undefined {
  return componentMetadata.find((c) => c.type === type);
}

/**
 * 카테고리 순서
 */
export const categoryOrder: ComponentCategory[] = [
  "layout",
  "typography",
  "form",
  "display",
  "feedback",
  "advanced",
];
