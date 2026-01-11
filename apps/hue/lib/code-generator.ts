/**
 * Code Generator
 *
 * EditorNode JSON을 React/Next.js 코드로 변환
 * - React Component 코드
 * - Next.js Page 코드
 * - Standalone HTML (미래)
 */

import type { EditorNode } from "@/types";

/**
 * 코드 생성 옵션
 */
export interface CodeGeneratorOptions {
  /** 출력 형식 */
  format: "react-component" | "nextjs-page" | "react-snippet";
  /** 컴포넌트 이름 */
  componentName?: string;
  /** TypeScript 사용 */
  typescript?: boolean;
  /** 스타일링 방식 */
  styling?: "tailwind" | "css-modules" | "inline";
  /** SDUIRenderer 사용 vs 순수 JSX */
  useSDUIRenderer?: boolean;
  /** 들여쓰기 크기 */
  indentSize?: number;
  /** 주석 포함 */
  includeComments?: boolean;
}

const defaultOptions: CodeGeneratorOptions = {
  format: "react-component",
  componentName: "GeneratedComponent",
  typescript: true,
  styling: "tailwind",
  useSDUIRenderer: false,
  indentSize: 2,
  includeComments: true,
};

/**
 * props 객체를 JSX 속성 문자열로 변환
 */
function propsToJSX(props: Record<string, any> | undefined, indent: string): string {
  if (!props || Object.keys(props).length === 0) return "";

  const entries = Object.entries(props).filter(([_, v]) => v !== undefined && v !== "");

  if (entries.length === 0) return "";

  // 짧으면 한 줄로
  if (entries.length <= 2) {
    return entries
      .map(([key, value]) => {
        if (typeof value === "string") return `${key}="${value}"`;
        if (typeof value === "boolean") return value ? key : "";
        if (typeof value === "number") return `${key}={${value}}`;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join(" ");
  }

  // 길면 멀티라인
  return (
    "\n" +
    entries
      .map(([key, value]) => {
        if (typeof value === "string") return `${indent}  ${key}="${value}"`;
        if (typeof value === "boolean") return value ? `${indent}  ${key}` : "";
        if (typeof value === "number") return `${indent}  ${key}={${value}}`;
        return `${indent}  ${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join("\n") +
    `\n${indent}`
  );
}

/**
 * EditorNode를 JSX 문자열로 변환 (재귀)
 */
function nodeToJSX(node: EditorNode, indentLevel: number, indentSize: number): string {
  const indent = " ".repeat(indentLevel * indentSize);
  const childIndent = " ".repeat((indentLevel + 1) * indentSize);

  const { type, props, children } = node;

  // props 문자열 생성
  const propsStr = propsToJSX(props, indent);
  const propsWithSpace = propsStr ? ` ${propsStr}` : "";

  // children 처리
  if (!children) {
    // Self-closing
    return `${indent}<${type}${propsWithSpace} />`;
  }

  if (typeof children === "string") {
    // 텍스트 children - 짧으면 한 줄
    if (children.length < 50 && !children.includes("\n")) {
      return `${indent}<${type}${propsWithSpace}>${children}</${type}>`;
    }
    // 긴 텍스트는 멀티라인
    return `${indent}<${type}${propsWithSpace}>\n${childIndent}${children}\n${indent}</${type}>`;
  }

  if (Array.isArray(children)) {
    // 배열 children
    const childrenJSX = children
      .map((child) => nodeToJSX(child, indentLevel + 1, indentSize))
      .join("\n");
    return `${indent}<${type}${propsWithSpace}>\n${childrenJSX}\n${indent}</${type}>`;
  }

  return `${indent}<${type}${propsWithSpace} />`;
}

/**
 * 사용된 컴포넌트 타입들 추출
 */
function extractComponentTypes(node: EditorNode): Set<string> {
  const types = new Set<string>();
  types.add(node.type);

  if (Array.isArray(node.children)) {
    node.children.forEach((child) => {
      extractComponentTypes(child).forEach((t) => types.add(t));
    });
  }

  return types;
}

/**
 * 컴포넌트 import 문 생성
 */
function generateImports(types: Set<string>, options: CodeGeneratorOptions): string {
  // 레이아웃 컴포넌트
  const layoutComponents = ["Box", "Flex", "Grid", "Section", "Container", "Spacer", "Divider"];
  // 타이포그래피
  const typographyComponents = ["Text", "H1", "H2", "H3", "H4", "Link"];
  // UI 컴포넌트
  const uiComponents = [
    "Button",
    "Badge",
    "Avatar",
    "Input",
    "Textarea",
    "Label",
    "Checkbox",
    "Switch",
    "Card",
    "CardHeader",
    "CardTitle",
    "CardDescription",
    "CardContent",
    "CardFooter",
    "Alert",
    "Skeleton",
    "Progress",
    "Icon",
    "Image",
  ];
  // Pro 컴포넌트
  const proComponents = ["Header", "HeroSection", "ScrollProgress", "Accordion", "Tabs"];

  const usedLayout = layoutComponents.filter((c) => types.has(c));
  const usedTypography = typographyComponents.filter((c) => types.has(c));
  const usedUI = uiComponents.filter((c) => types.has(c));
  const usedPro = proComponents.filter((c) => types.has(c));

  const imports: string[] = [];

  // 커스텀 컴포넌트로 가정 (실제로는 @hua-labs/ui에서 가져옴)
  const allUsed = [...usedLayout, ...usedTypography, ...usedUI, ...usedPro];

  if (allUsed.length > 0) {
    // 줄바꿈 포맷팅
    if (allUsed.length <= 4) {
      imports.push(`import { ${allUsed.join(", ")} } from "@/components/ui";`);
    } else {
      imports.push(
        `import {\n  ${allUsed.join(",\n  ")},\n} from "@/components/ui";`
      );
    }
  }

  return imports.join("\n");
}

/**
 * React Component 코드 생성
 */
function generateReactComponent(
  schema: EditorNode,
  options: CodeGeneratorOptions
): string {
  const { componentName, typescript, includeComments, indentSize } = options;
  const types = extractComponentTypes(schema);
  const imports = generateImports(types, options);
  const jsx = nodeToJSX(schema, 1, indentSize!);

  const typeAnnotation = typescript ? ": React.FC" : "";

  let code = "";

  if (includeComments) {
    code += `/**\n * ${componentName}\n * \n * Generated by Hue - HUA Labs Visual Editor\n */\n\n`;
  }

  code += `"use client";\n\n`;
  code += imports ? `${imports}\n\n` : "";
  code += `export const ${componentName}${typeAnnotation} = () => {\n`;
  code += `  return (\n`;
  code += jsx;
  code += `\n  );\n`;
  code += `};\n\n`;
  code += `export default ${componentName};\n`;

  return code;
}

/**
 * Next.js Page 코드 생성
 */
function generateNextJSPage(
  schema: EditorNode,
  options: CodeGeneratorOptions
): string {
  const { componentName, includeComments, indentSize } = options;
  const types = extractComponentTypes(schema);
  const imports = generateImports(types, options);
  const jsx = nodeToJSX(schema, 2, indentSize!);

  let code = "";

  if (includeComments) {
    code += `/**\n * ${componentName} Page\n * \n * Generated by Hue - HUA Labs Visual Editor\n */\n\n`;
  }

  code += imports ? `${imports}\n\n` : "";
  code += `export default function ${componentName}Page() {\n`;
  code += `  return (\n`;
  code += `    <main className="min-h-screen">\n`;
  code += jsx;
  code += `\n    </main>\n`;
  code += `  );\n`;
  code += `}\n`;

  return code;
}

/**
 * React Snippet (SDUIRenderer 사용)
 */
function generateReactSnippet(
  schema: EditorNode,
  options: CodeGeneratorOptions
): string {
  const { includeComments } = options;
  const schemaJson = JSON.stringify(schema, null, 2);

  let code = "";

  if (includeComments) {
    code += `// Generated by Hue - HUA Labs Visual Editor\n\n`;
  }

  code += `import { SDUIRenderer } from "@hua-labs/ui/sdui";\n\n`;
  code += `const schema = ${schemaJson};\n\n`;
  code += `export default function Page() {\n`;
  code += `  return <SDUIRenderer schema={schema} />;\n`;
  code += `}\n`;

  return code;
}

/**
 * 코드 생성 메인 함수
 */
export function generateCode(
  schema: EditorNode,
  options: Partial<CodeGeneratorOptions> = {}
): string {
  const opts = { ...defaultOptions, ...options };

  switch (opts.format) {
    case "react-component":
      return generateReactComponent(schema, opts);
    case "nextjs-page":
      return generateNextJSPage(schema, opts);
    case "react-snippet":
      return generateReactSnippet(schema, opts);
    default:
      return generateReactComponent(schema, opts);
  }
}

/**
 * 클립보드 복사용 포맷팅된 코드 생성
 */
export function generateCodeForClipboard(
  schema: EditorNode,
  format: CodeGeneratorOptions["format"]
): { code: string; language: string; label: string } {
  const code = generateCode(schema, { format });

  const labels: Record<string, { language: string; label: string }> = {
    "react-component": { language: "tsx", label: "React Component" },
    "nextjs-page": { language: "tsx", label: "Next.js Page" },
    "react-snippet": { language: "tsx", label: "SDUI Snippet" },
  };

  return {
    code,
    ...labels[format],
  };
}
