"use client";

/**
 * Context Panel
 *
 * 미리보기용 컨텍스트 데이터 편집 패널
 * Phase 2: Logic Engine - 조건부 렌더링 테스트
 */

import { useState } from "react";
import { Icon, Button, cn } from "@hua-labs/ui";
import {
  useContextStore,
  usePreviewContext,
  useCurrentPreset,
  CONTEXT_PRESETS,
  type ContextPreset,
} from "@/store";

/**
 * 토글 스위치
 */
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-foreground">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
          checked ? "bg-primary" : "bg-muted"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-4" : "translate-x-0.5"
          )}
        />
      </button>
    </label>
  );
}

/**
 * 셀렉트
 */
function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 px-2 text-xs rounded border border-border bg-background"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * 숫자 입력
 */
function NumberInput({
  value,
  onChange,
  label,
  min = 0,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-foreground">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-7 w-20 px-2 text-xs rounded border border-border bg-background text-right"
      />
    </div>
  );
}

/**
 * 텍스트 입력
 */
function TextInput({
  value,
  onChange,
  label,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm text-foreground shrink-0">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 flex-1 px-2 text-xs rounded border border-border bg-background"
      />
    </div>
  );
}

/**
 * 섹션 헤더
 */
function SectionHeader({ title, icon }: { title: string; icon: string }) {
  return (
    <h4 className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
      <Icon name={icon as any} size={12} />
      {title}
    </h4>
  );
}

/**
 * Context Panel
 */
export function ContextPanel() {
  const context = usePreviewContext();
  const currentPreset = useCurrentPreset();
  const { setValue, applyPreset, resetContext } = useContextStore();

  return (
    <div className="h-full flex flex-col bg-card">
      {/* 헤더 */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Icon name="zap" size={14} className="text-primary" />
            Preview Context
          </h3>
          <Button variant="ghost" size="sm" onClick={resetContext} title="초기화">
            <Icon name="refresh" size={14} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          토글하면 캔버스에 실시간 반영
        </p>
      </div>

      {/* 프리셋 버튼 */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-border">
        <SectionHeader title="프리셋" icon="bookmark" />
        <div className="flex flex-wrap gap-1.5">
          {CONTEXT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className={cn(
                "px-2 py-1 text-xs rounded-md transition-colors",
                currentPreset === preset.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              )}
              title={preset.description}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* User 섹션 */}
        <section className="space-y-3">
          <SectionHeader title="User" icon="user" />

          <Toggle
            checked={context.user.isLoggedIn}
            onChange={(v) => setValue("user.isLoggedIn", v)}
            label="로그인 상태"
          />

          {context.user.isLoggedIn && (
            <>
              <TextInput
                value={context.user.name}
                onChange={(v) => setValue("user.name", v)}
                label="이름"
                placeholder="홍길동"
              />

              <Select
                value={context.user.role}
                onChange={(v) => setValue("user.role", v)}
                label="역할"
                options={[
                  { value: "guest", label: "게스트" },
                  { value: "member", label: "회원" },
                  { value: "admin", label: "관리자" },
                ]}
              />

              <Select
                value={context.user.subscription}
                onChange={(v) => setValue("user.subscription", v)}
                label="구독"
                options={[
                  { value: "free", label: "Free" },
                  { value: "pro", label: "Pro" },
                  { value: "enterprise", label: "Enterprise" },
                ]}
              />
            </>
          )}
        </section>

        {/* Cart 섹션 */}
        <section className="space-y-3">
          <SectionHeader title="Cart" icon="bookmark" />

          <NumberInput
            value={context.cart.itemCount}
            onChange={(v) => setValue("cart.itemCount", v)}
            label="상품 수"
          />

          <NumberInput
            value={context.cart.total}
            onChange={(v) => setValue("cart.total", v)}
            label="총액"
          />
        </section>

        {/* App 섹션 */}
        <section className="space-y-3">
          <SectionHeader title="App" icon="settings" />

          <Select
            value={context.app.theme}
            onChange={(v) => setValue("app.theme", v)}
            label="테마"
            options={[
              { value: "light", label: "라이트" },
              { value: "dark", label: "다크" },
              { value: "system", label: "시스템" },
            ]}
          />

          <Select
            value={context.app.locale}
            onChange={(v) => setValue("app.locale", v)}
            label="언어"
            options={[
              { value: "ko", label: "한국어" },
              { value: "en", label: "English" },
              { value: "ja", label: "日本語" },
            ]}
          />

          <Toggle
            checked={context.app.isMobile}
            onChange={(v) => setValue("app.isMobile", v)}
            label="모바일"
          />

          <Toggle
            checked={context.app.isLoading}
            onChange={(v) => setValue("app.isLoading", v)}
            label="로딩 중"
          />
        </section>
      </div>

      {/* 현재 상태 미리보기 */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-border">
        <details className="text-xs">
          <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
            현재 컨텍스트 (JSON)
          </summary>
          <pre className="mt-2 p-2 bg-muted rounded text-[10px] overflow-auto max-h-32">
            {JSON.stringify(context, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}

export default ContextPanel;
