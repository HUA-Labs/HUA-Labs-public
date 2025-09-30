import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MessageBubble from './MessageBubble';

interface ChatMessageListProps {
  groupedMessages: Record<string, any[]>;
  displayedParagraphs: string[];
  currentSessionId?: string;
}

type ChatListItem =
  | { type: 'date'; date: string }
  | { type: 'message'; message: any }
  | { type: 'animated'; paragraphs: string[] };

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
  // 모든 메시지와 애니메이션 문단을 하나의 배열로 합침
  const allItems: ChatListItem[] = [
    ...Object.entries(groupedMessages).flatMap(([date, messages], index) => [
      ...(index > 0 ? [{ type: 'date' as const, date }] : []),
      ...messages.map((message) => ({ type: 'message' as const, message }))
    ]),
    ...(displayedParagraphs.length > 0
      ? [{ type: 'animated' as const, paragraphs: displayedParagraphs }]
      : [])
  ];

  return (
    <div>
      <AnimatePresence mode="wait">
        {allItems.map((item, idx) => {
          if (item.type === 'date') {
            return <DateDivider key={item.date} date={item.date} />;
          } else if (item.type === 'message') {
            const { message } = item;
            return (
              <motion.div
                key={message.id + '_' + message.timestamp}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} direction-ltr mb-8`}
              >
                <MessageBubble message={message} />
              </motion.div>
            );
          } else if (item.type === 'animated') {
            return (
              <motion.div
                key={"animated-paragraphs"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start direction-ltr"
              >
                <div className="w-full">
                  {item.paragraphs.map((p: string, idx: number) => (
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
            );
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
};

export default ChatMessageList; 