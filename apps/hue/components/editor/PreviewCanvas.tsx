"use client";

/**
 * Preview Canvas
 *
 * 미리보기 모드 - 에디터 UI 없이 순수 렌더링
 */

import { type ReactNode } from "react";
import { cn } from "@hua-labs/ui";
import { SDUIRenderer, defaultRegistry } from "@hua-labs/ui/sdui";
import { useSchema, useViewport } from "@/store";
import { editorNodeToSDUI } from "@/types";

interface PreviewCanvasProps {
  className?: string;
  /** 뷰포트 너비 (반응형 미리보기) */
  viewportWidth?: number | null;
}

/**
 * 뷰포트 사이즈 라벨
 */
function getViewportLabel(width: number | null | undefined): string {
  if (!width) return "데스크톱";
  if (width <= 375) return "모바일";
  if (width <= 768) return "태블릿";
  return "데스크톱";
}

/**
 * 미리보기 캔버스
 */
export function PreviewCanvas({ className, viewportWidth }: PreviewCanvasProps) {
  const schema = useSchema();
  const viewport = useViewport();

  // EditorNode를 SDUINode로 변환
  const sduiSchema = editorNodeToSDUI(schema);

  const viewportLabel = getViewportLabel(viewportWidth);
  const isResponsive = viewportWidth !== null && viewportWidth !== undefined;

  return (
    <div className={cn("h-full flex flex-col bg-background", className)}>
      {/* 프리뷰 헤더 */}
      <div className="flex-shrink-0 px-4 py-2 bg-card/50 border-b border-border flex items-center justify-center gap-2">
        <span className="text-xs text-muted-foreground">미리보기 모드</span>
        {isResponsive && (
          <>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs font-medium text-primary">
              {viewportLabel} ({viewportWidth}px)
            </span>
          </>
        )}
        <span className="text-xs text-muted-foreground">•</span>
        <span className="text-xs text-muted-foreground">ESC 또는 E 키로 편집 모드</span>
      </div>

      {/* 캔버스 영역 */}
      <div className={cn(
        "flex-1 overflow-auto p-8",
        isResponsive && "flex justify-center"
      )}>
        <div
          className={cn(
            "min-h-full bg-card rounded-lg border shadow-sm transition-all origin-top",
            isResponsive ? "border-primary/30" : "border-border"
          )}
          style={{
            transform: `scale(${viewport.zoom})`,
            width: isResponsive ? viewportWidth : `${100 / viewport.zoom}%`,
            maxWidth: isResponsive ? viewportWidth : undefined,
          }}
        >
          <div className="p-4">
            <SDUIRenderer schema={sduiSchema} components={defaultRegistry} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewCanvas;
