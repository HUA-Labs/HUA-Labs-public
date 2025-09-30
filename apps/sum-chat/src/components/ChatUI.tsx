'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSessionStore } from '@/stores/sessionStore';
import type { SessionMessage, Session } from '@/types/session';
import { useChatStore } from '@/stores/chatStore';
import { useChatLimit } from '../hooks/useChatLimit';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import { useLayoutSidebar } from './LayoutSidebarContext';
// import ScrollDownButton from './ScrollDownButton'; // Now used in ChatInputZone
// import FloatingChatInput from './FloatingChatInput'; // Now used in ChatInputZone
// import { v4 as uuidv4 } from 'uuid'; // Now handled by the hook
import { useTheme } from './ThemeProvider';
import ChatMessageList from './chat/ChatMessageList';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { useSession } from 'next-auth/react';
import LoginModal from './LoginModal';
import { useHuaChatApi } from '../hooks/useHuaChatApi'; 
import { useAnimatedAssistantMessage } from '../hooks/useAnimatedAssistantMessage'; 
import ChatMessagesArea from './chat/ChatMessagesArea'; 
import ChatInputZone from './chat/ChatInputZone'; // Import the new ChatInputZone sub-component

interface ChatUIProps {
  user: string;
  resonance_pattern: string;
  system_tier: string;
  mode: string;
  tone_filter: string;
}

// Markdown utility functions (splitMarkdownBlocks, ensureTableSpacing, ensureTableWithDescription)
// have been moved to src/lib/markdownUtils.ts or removed if unused.

// getContrastColor 함수 선언을 렌더링 코드 위로 이동
function getContrastColor(bg: string) {
  if (!bg) return '#222';
  const hex = bg.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 180 ? '#222' : '#fff';
}

// DateDivider is used by ChatMessageList, so it's not directly needed here if ChatMessageList handles its own imports.
// It seems ChatMessageList.tsx is where DateDivider is defined or imported.

export default function ChatUI({
  user,
  resonance_pattern,
  system_tier = '1.0',
  mode: initialMode = 'listener',
  tone_filter: initialTone = 'companion'
}: ChatUIProps) {
  const { data: userSession } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { colors } = useTheme();
  const { 
    currentSession, 
    addMessage,
    setSlipped, 
    incrementSlip,
    createSession,
    setCurrentSession,
    sessions,
    isLoading,
    isSidebarOpen,
    setSessionTone: setStoreSessionTone, // Renamed to avoid conflict with UIStore's setSessionTone
    setSessionMode: setStoreSessionMode, // Renamed to avoid conflict with UIStore's setSessionMode
    setSessionTier
  } = useSessionStore();
  const { messages, addMessage: addChatMessage, isLoading: isChatLoading, setLoading, setMessages } = useChatStore();
  const [input, setInput] = useState('');
  // const inputRef = useRef<HTMLTextAreaElement>(null); // Unused
  const [isDark, setIsDark] = useState(false);
  const { chatCount, isLimitReached, incrementChatCount } = useChatLimit();
  // const [tokenUsage, setTokenUsage] = useState<{ // Unused
  //   prompt_tokens: number;
  //   completion_tokens: number;
  //   total_tokens: number;
  // } | null>(null);

  const [isFading, setIsFading] = useState(false);
  
  // UIStore에서 세션별 모드/톤 상태 가져오기
  const { sessionModes, sessionTones, setSessionMode, setSessionTone } = useUIStore(); // These are for UI display and selection
  
  // Calculate sessionId, selectedMode, selectedTone before useHuaChatApi
  const sessionId = currentSession?.id;
  const selectedMode = (sessionId && sessionModes[sessionId]) || initialMode;
  const selectedTone = (sessionId && sessionTones[sessionId]) || initialTone;

  // Hook for API calls
  const { submitQuery, submitMessageQuery /*, isLoading: apiIsLoading, error: apiError */ } = useHuaChatApi({
    currentSession,
    selectedMode, // Now defined
    selectedTone, // Now defined
    system_tier,
    user,
    resonance_pattern,
    onNewAssistantMessage: (assistantMsgFromServer: SessionMessage) => { // Explicit type added here
      // Remove the placeholder before setting the new message for animation
      const currentMessages = useChatStore.getState().messages;
      const filteredMessages = currentMessages.filter(msg => msg.id !== 'ASSISTANT_PLACEHOLDER_ID');
      useChatStore.getState().setMessages(filteredMessages);

      setPendingAssistantMessage(assistantMsgFromServer); // Then set the actual message to start animation
    },
    setIsChatLoading: setLoading, // Pass setLoading from useChatStore
  });
  
  // 모드/톤 프리셋 (실제 프리셋은 modules에서 불러올 수도 있음)
  // These can remain here as they are not directly used by useHuaChatApi
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
  // Note: sessionId, selectedMode, selectedTone declarations were moved up.
  // The handleModeChange and handleToneChange handlers use the already moved sessionId
  // and the setSessionMode/setSessionTone from useUIStore, so they are fine.

  // 드롭다운 변경 핸들러
  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (sessionId) {
      const newMode = e.target.value;
      setSessionMode(sessionId, newMode); // Update uiStore (useUIStore's setSessionMode)
      if (newMode !== 'auto') {
        setStoreSessionMode(sessionId, newMode); // Update sessionStore (useSessionStore's setSessionMode)
      }
      // If newMode is 'auto', sessionStore will be updated by the next API call's rhythm data if available,
      // or it will remain as is if no rhythm data comes, reflecting the last manual or API-driven state.
    }
  };
  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (sessionId) {
      const newTone = e.target.value;
      setSessionTone(sessionId, newTone); // Update uiStore (useUIStore's setSessionTone)
      if (newTone !== 'auto') {
        setStoreSessionTone(sessionId, newTone); // Update sessionStore (useSessionStore's setSessionTone)
      }
      // If newTone is 'auto', similar logic to mode applies.
    }
  };

  // const [showScrollDown, setShowScrollDown] = useState(false); // Unused, isAtBottom from useAutoScroll is used
  // const [displayedAssistantMessage, setDisplayedAssistantMessage] = useState<string | null>(null); // Unused
  // const typingIntervalRef = useRef<NodeJS.Timeout | null>(null); // Unused
  const [pendingAssistantMessage, setPendingAssistantMessage] = useState<SessionMessage | null>(null);
  // const [displayedParagraphs, setDisplayedParagraphs] = useState<string[]>([]); // Handled by useAnimatedAssistantMessage hook
  // const [pendingParagraphs, setPendingParagraphs] = useState<string[] | null>(null); // Unused
  // const [hasInitialScroll, setHasInitialScroll] = useState(false); // Unused

  const { handleToggle, handleNewChat } = useLayoutSidebar();

  // Animated assistant message hook - Moved before useAutoScroll
  const handleAnimationComplete = useCallback((messageCompleted: SessionMessage) => {
    setPendingAssistantMessage(null);
  }, []);
  const { displayedParagraphs } = useAnimatedAssistantMessage({
    pendingMessage: pendingAssistantMessage,
    onAnimationComplete: handleAnimationComplete,
    currentSessionId: currentSession?.id,
  });

  // 최초 메시지 처리 여부 플래그 (중복 API 호출 방지)
  const isFirstMessageHandled = useRef(false);

  // useAutoScroll 훅 사용
  const { containerRef: messagesContainerRef, isAtBottom, setIsAtBottom } = useAutoScroll([
    messages.length, 
    displayedParagraphs.length, // Now defined
    currentSession?.id
  ]);

  // 중복 메시지 제거: id+timestamp 조합이 같은 메시지는 한 번만 남김
  const uniqueMessages = messages.filter(
    (msg, idx, arr) =>
      arr.findIndex(
        m => m.id === msg.id && m.timestamp === msg.timestamp
      ) === idx
  );

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [guestChatLimitReached, setGuestChatLimitReached] = useState(false);

  const sidebarWidth = 320; // 실제 사이드바 너비(px)로 조정
  const loginModalClass = isSidebarOpen
    ? 'fixed top-1/2 left-[calc(50%+160px)] -translate-x-1/2 -translate-y-1/2 z-50'
    : 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50';

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkModeMediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModeMediaQuery.addEventListener('change', handler);
    return () => darkModeMediaQuery.removeEventListener('change', handler);
  }, []);

  // 컴포넌트 언마운트 시 sessionStorage 정리 (세션별)
  useEffect(() => {
    return () => {
      if (currentSession) {
        sessionStorage.removeItem(`firstMessageSent_${currentSession.id}`);
        isFirstMessageHandled.current = false;
      }
    };
  }, [currentSession]);

  // 로딩 상태 통합
  const isChatUILoading = isLoading || isChatLoading;

  // 새로고침 시에도 플레이스홀더 표시
  useEffect(() => {
    if (isChatLoading && uniqueMessages.length > 0) {
      const lastMessage = uniqueMessages[uniqueMessages.length - 1];
      if (lastMessage.role === 'user') {
        // Placeholder message logic can remain, or be adapted if the hook signals very early loading
        // For now, keep it as is, as setPendingAssistantMessage will eventually show the real message
        const placeholderMessage = {
          id: 'ASSISTANT_PLACEHOLDER_ID', // Assign a constant ID
          role: 'assistant' as const,
          content: `
            <div class="flex space-x-2 bg-background/80 dark:bg-[#222324] rounded-xl px-3 py-2 shadow mb-4">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
            <div style="min-height: 400px;"></div>
          `,
            timestamp: new Date().toISOString(),
            tone: selectedTone,
            mode: selectedMode,
            tier: system_tier
          };
        setMessages([...uniqueMessages, placeholderMessage]);
      }
    }
  }, [isChatLoading, uniqueMessages, selectedTone, selectedMode, system_tier, setMessages]);

  // handleFormSubmit에서만 submitQuery 호출
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isChatLoading) return;
    let session = currentSession;
    if (!session) {
      alert('세션이 없습니다. 새로고침 해주세요.');
      return;
    }
    // 비로그인 사용자는 세션별 메시지 3개까지만 허용
    if (!userSession) {
      const key = `guest_chat_count_${session.id}`;
      const count = Number(localStorage.getItem(key) || '0');
      if (count >= 3) {
        setIsLoginModalOpen(true);
        setGuestChatLimitReached(true);
        return;
      }
      localStorage.setItem(key, String(count + 1));
    }

    if (isLimitReached) {
      setIsLoginModalOpen(true);
      return;
    }

    // 최초 메시지라면 세션별로 sessionStorage 플래그 저장 및 중복 방지 플래그 세팅
    // This specific UI logic can remain here or be managed alongside the hook call if needed
    if (
      session.messages.length === 0 &&
      !sessionStorage.getItem(`firstMessageSent_${session.id}`)
    ) {
      sessionStorage.setItem(`firstMessageSent_${session.id}`, 'true');
      isFirstMessageHandled.current = true; // This flag might still be useful for UI logic
    }
    
    setInput(''); // 입력 즉시 비우기
    await submitQuery(input); // 오직 여기서만 API 호출!
  };

  // 최초 user 메시지에 대한 assistant 답변 자동 호출 (세션별, 최초 1회만, 중복 방지)
  // This useEffect will now use submitMessageQuery from the hook
  useEffect(() => {
    if (!currentSession || !currentSession.id) return;
    // setTimeout으로 한 틱 뒤에 조건 체크 (Strict Mode/Hot Reload 방어)
    const timeout = setTimeout(() => {
      if (sessionStorage.getItem(`firstMessageSent_${currentSession.id}`)) return; // Already handled or being handled
      if (
        currentSession.messages.length === 1 &&
        currentSession.messages[0].role === 'user' &&
        currentSession.messages[0].auto === true &&
        !currentSession.messages.find(msg => msg.role === 'assistant') && // Ensure no assistant message yet
        !isChatLoading // Ensure not already loading from another source
      ) {
        // 답변 요청 플래그를 먼저 세팅
        sessionStorage.setItem(`firstMessageSent_${currentSession.id}`, Date.now().toString());
        submitMessageQuery(currentSession.messages[0].content);
      }
    }, 0);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSession, submitMessageQuery, isChatLoading]); // Added submitMessageQuery and isChatLoading to dependencies

  // 답변이 오면 자동으로 스크롤이 맨 아래로 이동
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setIsAtBottom(true);
    }
  }, [uniqueMessages.length, displayedParagraphs.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // 세션 변경 감지
  useEffect(() => {
    if (currentSession?.id) {
      setLoading(true); // 세션 변경 시 즉시 로딩 상태로
      const sessionMessages = currentSession.messages || [];
      setMessages(sessionMessages);
        setLoading(false);
    }
  }, [currentSession?.id, currentSession?.messages, setMessages, setLoading]);

  // 세션 변경 시 항상 최근 채팅(맨 아래)으로 이동
  useEffect(() => {
    if (currentSession?.id && messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ behavior: 'auto' });
      setIsAtBottom(true);
    }
  }, [currentSession?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // 세션 변경/새로고침 시 스크롤 위치에 따라 바텀다운 버튼 노출
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (el) {
      const isBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 2;
      setIsAtBottom(isBottom);
    }
  }, [currentSession?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // 새로고침(최초 진입) 시에도 항상 최근 채팅(맨 아래)으로 이동 (setTimeout으로 렌더링 후 보장)
  useEffect(() => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        setIsAtBottom(true);
      }
    }, 0);
  }, [currentSession?.id, uniqueMessages.length, displayedParagraphs.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // 답변 문단 출력이 모두 끝난 직후 (i.e., pendingAssistantMessage becomes null after animation)
  // and no new paragraphs are being displayed, scroll to bottom.
  useEffect(() => {
    if (pendingAssistantMessage === null && displayedParagraphs.length === 0) {
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
          setIsAtBottom(true);
        }
      }, 0); // Small delay to ensure DOM updates.
    }
  }, [pendingAssistantMessage, displayedParagraphs.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // 메시지를 날짜별로 그룹화
  const groupedMessages = uniqueMessages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, typeof uniqueMessages>); // Ensure SessionMessage[] type for values

  // const scrollAreaRef = useRef<HTMLDivElement>(null); // This was the duplicate, removed. The one at line ~143 is used.

  const handleScroll = useCallback(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const isBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 2;
    setIsAtBottom(isBottom);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // shouldShowPreResponseSpace는 렌더링 코드 위에 const로 선언
  const shouldShowPreResponseSpace = isChatLoading && displayedParagraphs.length === 0;

  // 1. 세션 로딩 중이면 전체 화면 로딩만 반환
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-100" />
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-200" />
            </div>
            <p className="text-muted-foreground">세션을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. 세션이 진짜로 없을 때만 fallback 안내
  if (!currentSession) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="text-lg">세션을 찾을 수 없습니다.</div>
      </div>
    );
  }

  // 3. 정상 UI (채팅 로딩은 기존처럼 하단에만 표시, 입력창과 겹치지 않게 위치 조정)

  return (
    <>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => { setIsLoginModalOpen(false); setGuestChatLimitReached(false); }}
        className={loginModalClass}
      />
      <div
        className="flex flex-col h-[calc(100vh-54px)] transition-colors"
        style={{ background: colors.background }}
      >
        {/* 채팅 메시지 영역 - Now handled by ChatMessagesArea */}
        <main 
          ref={scrollAreaRef}
          className={`chat-session flex-1 overflow-y-auto min-h-0${isFading ? ' transition-opacity opacity-10' : ''}`}
          onScroll={() => {
            const el = scrollAreaRef.current;
            if (!el) return;
            const isBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 2;
            setIsAtBottom(isBottom);
          }}
        >
          <div className="max-w-[768px] mx-auto px-4 pt-8">
            <AnimatePresence mode="wait">
              {displayedParagraphs.length > 0 ? (
              <motion.div
                  key="animated-paragraphs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start direction-ltr"
              >
                <div className="w-full">
                  {displayedParagraphs.map((p, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      className="whitespace-pre-wrap mb-4"
                    >
                      {p}
                    </motion.p>
                  ))}
                    <span
                      className="text-xs mt-1 block"
                      style={{ color: getContrastColor(colors.background) }}
                    >
                      {pendingAssistantMessage && new Date(pendingAssistantMessage.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
              ) : (
                <motion.div
                  key="message-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatMessageList
                    groupedMessages={groupedMessages}
                    displayedParagraphs={[]}
                    currentSessionId={currentSession?.id}
                  />
                </motion.div>
            )}
          </AnimatePresence>
          {/* 프리-리스폰스 공간: 답변 시작 전 AI가 곧 답변할 자리 */}
          {shouldShowPreResponseSpace && (
            <div className="flex justify-start">
              <div style={{ minHeight: '120px' }} className="w-full flex items-center">
                  <div className="flex space-x-2 bg-muted rounded-xl px-3 py-2 shadow">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
              </div>
            </div>
          )}
            {/* 오토스크롤용 더미 div */}
            <div ref={messagesContainerRef} />
        </div>
        </main>

        {/* 바텀 입력창 영역 - Now handled by ChatInputZone */}
        <ChatInputZone
          input={input}
          setInput={setInput}
          onSubmit={handleFormSubmit}
          isChatLoading={isChatUILoading}
          guestChatLimitReached={guestChatLimitReached}
          isSlipped={currentSession?.isSlipped}
          isAtBottom={isAtBottom}
          onScrollDownClick={() => { // Define the handler inline or pass a memoized one
            setIsFading(true);
            messagesContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
            setIsAtBottom(true);
            setTimeout(() => setIsFading(false), 400);
          }}
          placeholderText={guestChatLimitReached ? '로그인 시 더 많은 대화를 할 수 있습니다.' : '어떤 말이라도 듣고 있어요.'}
        />
      </div>
    </>
  );
} 