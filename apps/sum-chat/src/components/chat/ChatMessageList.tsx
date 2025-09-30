import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MessageBubble from '../MessageBubble';

interface ChatMessageListProps {
  groupedMessages: Record<string, any[]>;
  displayedParagraphs?: string[];
  currentSessionId?: string;
}

const DateDivider = ({ date }: { date: string }) => (
  <div className="flex items-center my-12">
    <div className="flex-1 h-px bg-muted" />
    <span className="px-4 text-xs text-muted-foreground">
      {new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </span>
    <div className="flex-1 h-px bg-muted" />
  </div>
);

const ChatMessageList: React.FC<ChatMessageListProps> = ({ groupedMessages, displayedParagraphs, currentSessionId }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSessionId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {Object.entries(groupedMessages).map(([date, messages], index) => (
          <React.Fragment key={date}>
            {index > 0 && <DateDivider date={date} />}
            {messages.map((message) => (
              <motion.article
                key={message.id + '_' + message.timestamp}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} direction-ltr mb-8`}
              >
                <MessageBubble message={message} />
              </motion.article>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
      {/* 문단 단위로 페이드 인되는 답변 메시지 */}
      {(displayedParagraphs ?? []).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex justify-start direction-ltr"
        >
          <div className="w-full">
            {(displayedParagraphs ?? []).map((p, idx) => (
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
            <span className="text-xs text-muted-foreground mt-1 block">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatMessageList; 