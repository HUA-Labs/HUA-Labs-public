'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/stores/sessionStore';
import { useChatStore } from '@/stores/chatStore';
import FloatingChatInput from './FloatingChatInput';
import SessionHeader from './SessionHeader';
import { useLayoutSidebar } from './LayoutSidebarContext';
import { v4 as uuidv4 } from 'uuid';
import { motion} from 'framer-motion';
import SumBrandLogo from './icons/SumBrandLogo';
import { useTheme } from './ThemeProvider';
import { useSession } from 'next-auth/react';
import LoginModal from './LoginModal';
import { getOrCreateUserId } from '@/shared/user';

export default function StartChat() {
  const router = useRouter();
  const { createSession, setCurrentSession, sessions } = useSessionStore();
  const { setMessages, setLoading } = useChatStore();
  const [input, setInput] = useState('');
  const { isSidebarOpen, handleToggle, handleNewChat } = useLayoutSidebar();
  const toggleSidebar = useSessionStore(state => state.toggleSidebar);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { colors } = useTheme();
  const bgStyle = { background: colors.background, color: colors.foreground };
  const logoColor = colors.inputText || colors.primary || colors.foreground;
  const { data: session } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 비로그인 사용자는 세션 1개까지만 생성 가능
    if (!session) {
      const guestSessions = Object.values(sessions[getOrCreateUserId()] || {});
      if (guestSessions.length >= 1) {
        setShowLoginModal(true);
        return;
      }
      const count = Number(localStorage.getItem('guest_chat_count') || '0');
      if (count >= 3) {
        setShowLoginModal(true);
        return;
      }
      localStorage.setItem('guest_chat_count', String(count + 1));
    }

    try {
      setIsTransitioning(true);
      setLoading(true);
      
      // 1. 사용자 메시지를 즉시 표시
      const userMessage = {
        id: uuidv4(),
        role: 'user' as const,
        content: input,
        timestamp: new Date().toISOString(),
        tone: 'companion',
        mode: 'listener',
        tier: '1.0'
      };

      setMessages([userMessage]);

      // 2. 새 세션 생성 (initialMessage 포함)
      const newSession = await createSession(input);
      setCurrentSession(newSession);

      // 3. 채팅방으로 이동 (애니메이션 후)
      setTimeout(() => {
        router.push(`/chat/${newSession.id}`);
      }, 500);

    } catch (error) {
      console.error('Error:', error);
      setIsTransitioning(false);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <SessionHeader
        sessionName={
          <div className="group">
            <SumBrandLogo size={32} color={logoColor} className="mx-auto transition-colors duration-200 group-hover:fill-[#3977F2] cursor-pointer" />
          </div>
        }
        sessionId=""
        isSidebarOpen={isSidebarOpen}
        handleToggle={toggleSidebar}
        handleNewChat={handleNewChat}
        showShareButton={false}
      />
      <div className="flex flex-col h-[calc(100vh-54px)]" style={bgStyle}>
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h1 className="text-2xl font-bold mb-4">숨을 크게 쉬어보세요</h1>
            <p style={{ color: colors.foreground }}>
              당신의 다음 말을 기다리고 있어요
            </p>
          </motion.div>
          {/* 입력창 애니메이션 */}
          <motion.div 
            className="w-full max-w-[768px] px-4"
            initial={{ y: 0 }}
            animate={isTransitioning ? { y: 'calc(100vh - 650px)' } : { y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="relative">
              {React.createElement(FloatingChatInput as any, {
                value: input,
                onChange: setInput,
                onSubmit: handleSubmit,
                disabled: false,
                placeholder: "어떤 말이라도 듣고 있어요."
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 