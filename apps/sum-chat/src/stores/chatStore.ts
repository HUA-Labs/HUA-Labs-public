import { create } from 'zustand';
import { ChatState } from '@/types/chat';

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((state) => {
      const exists = state.messages.some(
        m => m.id === message.id && m.timestamp === message.timestamp
      );
      if (exists) return state;
      return { messages: [...state.messages, message] };
    }),
  setLoading: (isLoading) => set({ isLoading }),
  setMessages: (messages) => {
    // id+timestamp 기준으로 중복 제거
    const unique = messages.filter(
      (msg, idx, arr) =>
        arr.findIndex(
          m => m.id === msg.id && m.timestamp === msg.timestamp
        ) === idx
    );
    set({ messages: unique });
  },
})); 