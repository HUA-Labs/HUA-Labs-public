'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Session, SessionStore, SessionMessage } from '@/types/session';
import { getOrCreateUserId } from '@/shared/user';

export type { SessionMessage };

// 디폴트 톤/모드 상수
const DEFAULT_TONE = 'companion';
const DEFAULT_MODE = 'listener';

export const useSessionStore = create<SessionStore & { hydrated: boolean }>()(
  persist(
    (set, get) => ({
      sessions: {} as Record<string, Record<string, Session>>,
      currentSession: null,
      isSidebarOpen: true,
      isLoading: true,
      hydrated: false,
      
      // 세션 관련 액션
      createSession: async (initialMessage?: string) => {
        const userId = getOrCreateUserId();
        const sessionId = uuidv4();
        const newSession: Session = {
          id: sessionId,
          userId,
          title: 'New Chat',
          messages: initialMessage ? [{
            id: uuidv4(),
            role: 'user',
            content: initialMessage,
            timestamp: new Date().toISOString(),
            tone: DEFAULT_TONE,
            mode: DEFAULT_MODE,
            tier: '1.0',
            auto: true
          }] : [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isArchived: false,
          tone: DEFAULT_TONE,
          mode: DEFAULT_MODE,
          tier: '1.0',
          slipCount: 0,
          isSlipped: false,
          slipRecords: []
        };

        set((state) => {
          const userSessions = state.sessions[userId] || {};
          return {
            sessions: { ...state.sessions, [userId]: { ...userSessions, [sessionId]: newSession } },
            currentSession: newSession
          };
        });

        if (initialMessage) {
          try {
            const res = await fetch('/api/session-title', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: initialMessage })
            });
            const data = await res.json();
            const title = data.title || 'New Chat';
            set((state) => ({
              sessions: {
                ...state.sessions,
                [userId]: {
                  ...state.sessions[userId],
                  [sessionId]: {
                    ...state.sessions[userId][sessionId],
                    title
                  }
                }
              }
            }));
          } catch (error) {
            set((state) => ({
              sessions: {
                ...state.sessions,
                [userId]: {
                  ...state.sessions[userId],
                  [sessionId]: {
                    ...state.sessions[userId][sessionId],
                    title: 'New Chat'
                  }
                }
              }
            }));
          }
        }

        return newSession;
      },

      setCurrentSession: (session) => {
        set({ currentSession: session });
      },

      updateSession: (sessionId, updates) => {
        const userId = getOrCreateUserId();
        set((state) => {
          const userSessions = state.sessions[userId] || {};
          const session = userSessions[sessionId];
          if (!session) return state;
          // title만 변경하는 경우 updatedAt을 갱신하지 않음
          const onlyTitle = Object.keys(updates).length === 1 && Object.prototype.hasOwnProperty.call(updates, 'title');
          return {
            sessions: {
              ...state.sessions,
              [userId]: {
                ...userSessions,
                [sessionId]: {
                  ...session,
                  ...updates,
                  ...(onlyTitle ? {} : { updatedAt: new Date().toISOString() })
                }
              }
            }
          };
        });
      },

      deleteSession: (sessionId) => {
        const userId = getOrCreateUserId();
        set((state) => {
          const userSessions = { ...state.sessions[userId] };
          delete userSessions[sessionId];
          return {
            sessions: { ...state.sessions, [userId]: userSessions },
            currentSession: state.currentSession?.id === sessionId ? null : state.currentSession
          };
        });
      },

      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
      },

      setSidebarOpen: (isOpen) => {
        set({ isSidebarOpen: isOpen });
      },

      setSessionTone: (sessionId, tone) => {
        const userId = getOrCreateUserId();
        set((state) => {
          const userSessions = state.sessions[userId] || {};
          const session = userSessions[sessionId];
          if (!session) return state;

          return {
            sessions: {
              ...state.sessions,
              [userId]: {
                ...userSessions,
                [sessionId]: {
                  ...session,
                  tone,
                  updatedAt: new Date().toISOString()
                }
              }
            }
          };
        });
      },

      setSessionMode: (sessionId, mode) => {
        const userId = getOrCreateUserId();
        set((state) => {
          const userSessions = state.sessions[userId] || {};
          const session = userSessions[sessionId];
          if (!session) return state;

          return {
            sessions: {
              ...state.sessions,
              [userId]: {
                ...userSessions,
                [sessionId]: {
                  ...session,
                  mode,
                  updatedAt: new Date().toISOString()
                }
              }
            }
          };
        });
      },

      setSessionTier: (sessionId, tier) => {
        const userId = getOrCreateUserId();
        set((state) => {
          const userSessions = state.sessions[userId] || {};
          const session = userSessions[sessionId];
          if (!session) return state;

          return {
            sessions: {
              ...state.sessions,
              [userId]: {
                ...userSessions,
                [sessionId]: {
                  ...session,
                  tier,
                  updatedAt: new Date().toISOString()
                }
              }
            }
          };
        });
      },

      setSlipped: (sessionId, isSlipped) => {
        const userId = getOrCreateUserId();
        set((state) => {
          const userSessions = state.sessions[userId] || {};
          const session = userSessions[sessionId];
          if (!session) return state;

          return {
            sessions: {
              ...state.sessions,
              [userId]: {
                ...userSessions,
                [sessionId]: {
                  ...session,
                  isSlipped,
                  updatedAt: new Date().toISOString()
                }
              }
            }
          };
        });
      },

      incrementSlip: (sessionId) => {
        const userId = getOrCreateUserId();
        set((state) => {
          const userSessions = state.sessions[userId] || {};
          const session = userSessions[sessionId];
          if (!session) return state;

          return {
            sessions: {
              ...state.sessions,
              [userId]: {
                ...userSessions,
                [sessionId]: {
                  ...session,
                  slipCount: session.slipCount + 1,
                  updatedAt: new Date().toISOString()
                }
              }
            }
          };
        });
      },

      addMessage: (sessionId: string, message: SessionMessage) => {
        const userId = getOrCreateUserId();
        set((state) => {
          const userSessions = state.sessions[userId] || {};
          const session = userSessions[sessionId];
          if (!session) return state;
          // currentSession.messages와 useChatStore().messages를 동기화
          if (state.currentSession && state.currentSession.id === sessionId) {
            state.currentSession.messages = [...session.messages, message];
            // useChatStore().setMessages도 동기화
            try {
              // useChatStore는 훅이지만, zustand의 getState/setState로 직접 접근 가능
              require('@/stores/chatStore').useChatStore.getState().setMessages([...session.messages, message]);
            } catch {}
          }
          return {
            sessions: {
              ...state.sessions,
              [userId]: {
                ...userSessions,
                [sessionId]: {
                  ...session,
                  messages: [...session.messages, message],
                  updatedAt: new Date().toISOString()
                }
              }
            }
          };
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      }
    }),
    {
      name: 'session-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessions: state.sessions,
        isSidebarOpen: state.isSidebarOpen
      }),
    }
  )
);

// 하이드레이션 완료 후 hydrated를 true로 변경
if (typeof window !== 'undefined') {
  useSessionStore.persist.onFinishHydration(() => {
    useSessionStore.setState({ hydrated: true });
  });
}

// 하이드레이션 즉시 실행 및 초기 상태 복원
if (typeof window !== 'undefined') {
  const initializeStore = async () => {
    try {
      // 하이드레이션 실행
      const store = useSessionStore.getState();
      store.setLoading(true);
      await useSessionStore.persist.rehydrate();

      // 상태 복원
      const state = useSessionStore.getState();
      const pathSegments = window.location.pathname.split('/');
      const sessionId = pathSegments[pathSegments.length - 1];

      // 루트 경로가 아닌 경우에만 세션 복원
      if (pathSegments.length > 1 && pathSegments[1] !== '') {
        if (sessionId && sessionId !== 'new' && sessionId !== '') {
          const userId = getOrCreateUserId();
          const session = state.sessions[userId]?.[sessionId];
          if (session) {
            // 세션이 있으면 해당 세션 유지
            state.setCurrentSession(session);
            // 메시지 복원
            try {
              require('@/stores/chatStore').useChatStore.getState().setMessages(session.messages);
            } catch {}
            // 메시지 복원을 위해 약간의 지연 추가
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      }

      // 모든 초기화가 완료된 후 로딩 상태 해제
      await new Promise(resolve => setTimeout(resolve, 300));
      store.setLoading(false);
    } catch (error) {
      console.error('Failed to initialize store:', error);
      // 에러 발생 시에도 로딩 상태는 해제
      useSessionStore.getState().setLoading(false);
    }
  };

  // 초기화 실행
  initializeStore();
} 