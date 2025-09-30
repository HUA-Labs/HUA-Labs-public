import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionStore } from '@/stores/sessionStore';
import type { Session } from '@/types/session';

const SessionList: React.FC = () => {
  const { sessions, currentSession, setCurrentSession } = useSessionStore();
  const sessionsArray = Object.values(sessions).flatMap(userSessions => 
    Object.values(userSessions)
  );

  const handleSessionClick = (id: string) => {
    const session = sessionsArray.find(s => s.id === id);
    setCurrentSession(session || null);
  };

  const formatDate = (date: string) => {
    const today = new Date();
    const sessionDate = new Date(date);
    const isToday = sessionDate.toDateString() === today.toDateString();
    const isYesterday = new Date(today.setDate(today.getDate() - 1)).toDateString() === sessionDate.toDateString();

    if (isToday) {
      return '오늘';
    } else if (isYesterday) {
      return '어제';
    } else {
      return sessionDate.toLocaleDateString('ko-KR', {
        month: 'numeric',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none p-4 border-b">
        <h2 className="text-lg font-semibold">대화 목록</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {sessionsArray.map((session: Session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => handleSessionClick(session.id)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  currentSession?.id === session.id
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : ''
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">
                      {session.title || '새 대화'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      {formatDate(session.updatedAt)}
                    </span>
                  </div>
                  {session.messages?.[0] && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                      {session.messages[0].content}
                    </p>
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SessionList; 