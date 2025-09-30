import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessageList from './ChatMessageList';
import type { SessionMessage } from '@/types/session';
import { useTheme } from '../ThemeProvider'; // For colors, if needed for animated message timestamp

interface ChatMessagesAreaProps {
  groupedMessages: Record<string, SessionMessage[]>;
  displayedParagraphs: string[];
  currentSessionId: string | undefined;
  // shouldShowPreResponseSpace: boolean; // Removed
  messagesContainerRef: React.RefObject<HTMLDivElement>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
  isFading: boolean;
  // getContrastColor is defined locally or passed if it were more complex
}

// Copied from ChatUI.tsx, can be moved to a utils file if used elsewhere
const getContrastColor = (bg: string) => {
  if (!bg) return '#222'; // Default for safety
  const hex = bg.replace('#', '');
  if (hex.length !== 6) return '#222'; // Basic validation for hex length
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 180 ? '#222' : '#fff';
};

export default function ChatMessagesArea({
  groupedMessages,
  displayedParagraphs,
  currentSessionId,
  // shouldShowPreResponseSpace, // Removed
  messagesContainerRef,
  scrollAreaRef,
  onScroll,
  isFading,
}: ChatMessagesAreaProps) {
  const { colors } = useTheme();

  return (
    <main
      ref={scrollAreaRef}
      className={`chat-session flex-1 overflow-y-auto min-h-0${isFading ? ' transition-opacity opacity-10' : ''}`}
      onScroll={onScroll}
      style={{ background: colors.background }} // Ensure background is applied if not inherited
    >
      <div className="max-w-[768px] mx-auto px-4 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSessionId} // Keyed by session ID for re-animation on session change
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatMessageList
              groupedMessages={groupedMessages}
              // displayedParagraphs is rendered separately below for the specific animation
              currentSessionId={currentSessionId}
            />
          </motion.div>
          {/* 문단 단위로 페이드 인되는 답변 메시지 - This is the animated part */}
          {displayedParagraphs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} // This exit might not be visible if pendingAssistantMessage clears it
              transition={{ duration: 0.3 }}
              className="flex justify-start direction-ltr" // Ensure this class matches what was in ChatUI
            >
              <div className="w-full"> {/* Ensure this class matches what was in ChatUI */}
                {displayedParagraphs.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="whitespace-pre-wrap mb-4" // Ensure this class matches
                  >
                    {p}
                  </motion.p>
                ))}
                <span
                  className="text-xs mt-1 block" // Ensure this class matches
                  style={{ color: getContrastColor(colors.background) }}
                >
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* 프리-리스폰스 공간: 답변 시작 전 AI가 곧 답변할 자리 - This block is now removed */}
        {/* 오토스크롤용 더미 div */}
        <div ref={messagesContainerRef} />
      </div>
    </main>
  );
}
