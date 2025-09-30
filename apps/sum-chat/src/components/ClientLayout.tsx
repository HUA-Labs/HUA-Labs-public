'use client';

import { useRouter } from 'next/navigation';
import SessionSidebar from './SessionSidebar';
import { useSessionStore } from '@/stores/sessionStore';
import { LayoutSidebarProvider } from './LayoutSidebarContext';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const isSidebarOpen = useSessionStore(state => state.isSidebarOpen);
  const setIsSidebarOpen = useSessionStore(state => state.setSidebarOpen);
  const handleToggle = useSessionStore(state => state.toggleSidebar);
  const [hydrated, setHydrated] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleNewChat = () => {
    router.push('/');
  };

  if (!hydrated) {
    return null;
  }

  return (
    <LayoutSidebarProvider value={{ isSidebarOpen, handleToggle, handleNewChat, setIsSidebarOpen }}>
      <div className="flex h-screen overflow-hidden" style={{ background: colors.background }}>
        {/* 사이드바: 항상 렌더링 */}
        <div>
          <SessionSidebar 
            onToggle={handleToggle}
            onNewChat={handleNewChat}
          />
        </div>
        <main className="flex-1 overflow-auto transition-all duration-200 min-h-0">
          {children}
        </main>
      </div>
    </LayoutSidebarProvider>
  );
} 