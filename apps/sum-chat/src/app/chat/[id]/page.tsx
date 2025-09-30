'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSessionStore } from '@/stores/sessionStore';
import { useChatStore } from '@/stores/chatStore';
import ChatUI from '@/components/ChatUI';
import SessionHeader from '@/components/SessionHeader';
import { useLayoutSidebar } from '@/components/LayoutSidebarContext';
import { getOrCreateUserId } from '@/shared/user';
import { useUIStore } from '@/stores/uiStore';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { sessions, setCurrentSession, updateSession, isLoading } = useSessionStore();
  const { setMessages } = useChatStore();
  const { isSidebarOpen, handleToggle, handleNewChat, setIsSidebarOpen } = useLayoutSidebar();
  const { sessionModes, sessionTones, setSessionMode, setSessionTone } = useUIStore();
  const toggleSidebar = useSessionStore(state => state.toggleSidebar);

  const userId = getOrCreateUserId();
  const idParam = params?.id;
  const sessionId = Array.isArray(idParam) ? idParam[0] : idParam ?? '';
  const session = sessionId ? sessions[userId]?.[sessionId] : undefined;

  const prevSessionId = useRef<string | null>(null);

  // 모드/톤 프리셋 (ChatUI와 동일하게)
  const modeOptions = [
    { value: 'listener', label: '리스너' },
    { value: 'analyst', label: '분석가' },
    { value: 'companion', label: '동반자' },
    { value: 'guide', label: '가이드' }
  ];
  const toneOptions = [
    { value: 'companion', label: '따뜻함' },
    { value: 'warm', label: '포근함' },
    { value: 'cool', label: '차분함' },
    { value: 'minimal', label: '미니멀' }
  ];
  const selectedMode = (session && sessionModes[session.id]) || 'auto';
  const selectedTone = (session && sessionTones[session.id]) || 'auto';
  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (session) setSessionMode(session.id, e.target.value);
  };
  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (session) setSessionTone(session.id, e.target.value);
  };

  useEffect(() => {
    if (isLoading) return;
    if (params?.id && session) {
      if (session.id !== prevSessionId.current) {
        setCurrentSession(session);
        prevSessionId.current = session.id;
      }
    }
    if (!session && !isLoading) {
      router.replace('/');
    }
  }, [params?.id, isLoading, session, router, setCurrentSession]);

  if (!session) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="text-muted-foreground text-lg">세션을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <SessionHeader
        sessionName={session.title}
        sessionId={session.id}
        onRename={(title) => updateSession(session.id, { title })}
        isSidebarOpen={isSidebarOpen}
        handleToggle={toggleSidebar}
        handleNewChat={handleNewChat}
      />
      <ChatUI
        user="devin"
        resonance_pattern="gentle"
        system_tier="4.0"
        mode={selectedMode}
        tone_filter={selectedTone}
      />
    </div>
  );
} 