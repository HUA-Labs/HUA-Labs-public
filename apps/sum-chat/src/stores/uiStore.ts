'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  sessionModes: Record<string, string>;
  sessionTones: Record<string, string>;
  setSessionMode: (sessionId: string, mode: string) => void;
  setSessionTone: (sessionId: string, tone: string) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      sessionModes: {},
      sessionTones: {},
      setSessionMode: (sessionId, mode) => set((state) => ({
        sessionModes: { ...state.sessionModes, [sessionId]: mode }
      })),
      setSessionTone: (sessionId, tone) => set((state) => ({
        sessionTones: { ...state.sessionTones, [sessionId]: tone }
      }))
    }),
    { name: 'sum-ui-store' }
  )
); 