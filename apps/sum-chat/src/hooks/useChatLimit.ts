import { useState, useEffect } from 'react';

const CHAT_LIMIT = 10;
const CHAT_COUNT_KEY = 'chat_count';

export function useChatLimit() {
  const [chatCount, setChatCount] = useState(0);

  useEffect(() => {
    const savedCount = localStorage.getItem(CHAT_COUNT_KEY);
    if (savedCount) {
      setChatCount(parseInt(savedCount, 10));
    }
  }, []);

  const incrementChatCount = () => {
    const newCount = chatCount + 1;
    setChatCount(newCount);
    localStorage.setItem(CHAT_COUNT_KEY, newCount.toString());
  };

  const isLimitReached = chatCount >= CHAT_LIMIT;

  return {
    chatCount,
    isLimitReached,
    incrementChatCount,
  };
} 