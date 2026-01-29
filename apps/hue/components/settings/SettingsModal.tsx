"use client";

/**
 * Settings Modal
 *
 * 설정 모달
 * - 언어 설정 (한국어/영어)
 * - 테마 설정 (추후 확장)
 */

import { Modal, cn } from "@hua-labs/ui";
import { useHueTranslation, LANGUAGES, type Language } from "@/store";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { t, language, setLanguage, languages } = useHueTranslation();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.settings.title}
      size="sm"
    >
      <div className="space-y-6 pt-4">
        {/* 언어 설정 */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            {t.settings.language}
          </label>
          <div className="flex gap-2">
            {(Object.keys(languages) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={cn(
                  "flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                  "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2",
                  language === lang
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-foreground hover:bg-muted"
                )}
              >
                <span className="block">{languages[lang].nativeName}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {languages[lang].name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <hr className="border-border" />

        {/* 단축키 정보 */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            {t.shortcuts.title}
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <ShortcutItem keys="Ctrl+Z" label={t.shortcuts.undo} />
            <ShortcutItem keys="Ctrl+Y" label={t.shortcuts.redo} />
            <ShortcutItem keys="Ctrl+C" label={t.shortcuts.copy} />
            <ShortcutItem keys="Ctrl+V" label={t.shortcuts.paste} />
            <ShortcutItem keys="Ctrl+D" label={t.shortcuts.duplicate} />
            <ShortcutItem keys="Del" label={t.shortcuts.delete} />
            <ShortcutItem keys="P" label={t.shortcuts.preview} />
            <ShortcutItem keys="E" label={t.shortcuts.edit} />
            <ShortcutItem keys="[" label={t.shortcuts.toggleLeftPanel} />
            <ShortcutItem keys="]" label={t.shortcuts.toggleRightPanel} />
            <ShortcutItem keys="C" label={t.shortcuts.toggleContextPanel} />
          </div>
        </div>

        {/* 닫기 버튼 */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
            )}
          >
            {t.settings.close}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/**
 * 단축키 아이템
 */
function ShortcutItem({ keys, label }: { keys: string; label: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded bg-muted/50">
      <span className="text-muted-foreground">{label}</span>
      <kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono text-[10px]">
        {keys}
      </kbd>
    </div>
  );
}

export default SettingsModal;
