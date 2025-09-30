'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Switch } from './ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { useThemeStore } from '@/stores/themeStore';
import { useState } from 'react';
import React from 'react';
import { useTheme } from './ThemeProvider';

function useIsMobile() {
  // 간단한 반응형 훅 (600px 이하를 모바일로 간주)
  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const modeOptions = [
  { value: 'system', label: '시스템' },
  { value: 'light', label: '라이트' },
  { value: 'dark', label: '다크' },
  { value: 'default', label: '기본(테마만)' },
];

export default function SettingsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { mode, setMode, theme, setTheme } = useThemeStore();
  const { colors } = useTheme();
  const [tab, setTab] = useState('graphic');
  const isMobile = useIsMobile();

  const tabList = [
    { value: 'general', label: '일반' },
    { value: 'graphic', label: '그래픽' },
    { value: 'account', label: '계정' },
  ];

  // 모드 변경 시 테마 자동 해제
  const handleModeChange = (newMode: string) => {
    setMode(newMode as any);
    if (newMode !== 'default' && theme !== 'default') {
      setTheme('default');
    }
  };

  const GraphicTabContent = (
    <div className="shadow-lg rounded-xl p-6 flex flex-col gap-6" style={{ background: colors.background, color: colors.foreground }}>
      <div>
        <span className="font-medium text-base block mb-2">모드 변경</span>
        <div className="flex gap-2">
          {modeOptions.map(opt => (
            <button
              key={opt.value}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors`}
              style={{
                background: mode === opt.value ? colors.primary : colors.muted,
                color: mode === opt.value ? colors.primaryForeground : colors.mutedForeground,
                boxShadow: mode === opt.value ? '0 2px 8px 0 rgba(0,0,0,0.08)' : undefined
              }}
              onClick={() => handleModeChange(opt.value)}
              type="button"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        {mode === 'default' && (
          <>
            <span className="font-medium block mb-2">테마 선택</span>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-full" style={{ background: colors.inputBg, color: colors.inputText, borderColor: colors.border }}>
                <SelectValue placeholder="테마를 선택하세요" style={{ color: colors.inputText, opacity: 1 }} />
              </SelectTrigger>
              <SelectContent style={{ background: colors.background, color: colors.foreground }}>
                <SelectItem value="sum-prism">프리즘 (분홍)</SelectItem>
                <SelectItem value="hyper-tomato">하이퍼 토마토 (레드)</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="p-0 max-h-[90vh] rounded-t-xl shadow-lg" style={{ background: colors.background, color: colors.foreground }}>
          <SheetHeader>
            <SheetTitle>설정</SheetTitle>
          </SheetHeader>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="flex w-full justify-around sticky top-0 z-10" style={{ background: colors.background }}>
              {tabList.map(t => (
                <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
              ))}
            </TabsList>
            {tabList.map(t => (
              <TabsContent key={t.value} value={t.value} style={{ background: colors.background, color: colors.foreground }}>
                {t.value === 'graphic' ? GraphicTabContent : <div className="p-4">{t.label} 설정 (내용 준비중)</div>}
              </TabsContent>
            ))}
          </Tabs>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 rounded-xl shadow-lg" style={{ background: colors.background, color: colors.foreground }}>
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>설정</DialogTitle>
        </DialogHeader>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="flex w-full justify-around sticky top-0 z-10" style={{ background: colors.background }}>
            {tabList.map(t => (
              <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
            ))}
          </TabsList>
          {tabList.map(t => (
            <TabsContent key={t.value} value={t.value} style={{ background: colors.background, color: colors.foreground }}>
              {t.value === 'graphic' ? GraphicTabContent : <div className="p-6">{t.label} 설정 (내용 준비중)</div>}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 