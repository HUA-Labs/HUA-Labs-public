export interface SessionMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  tone: string;
  mode: string;
  tier: string;
  auto?: boolean;
  style?: {
    minHeight?: string;
    backgroundColor?: string;
  };
}

export interface Session {
  id: string;
  userId: string;
  title: string;
  messages: SessionMessage[];
  slipCount: number;
  isSlipped: boolean;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  tone: string;
  mode: string;
  tier: string;
  lastEthicsTriggered?: string;
  slipRecords: Array<{
    type: string;
    level: 'low' | 'high';
    timestamp: string;
  }>;
}

export interface SessionStore {
  sessions: Record<string, Record<string, Session>>;
  currentSession: Session | null;
  isSidebarOpen: boolean;
  isLoading: boolean;
  createSession: (initialMessage?: string) => Promise<Session>;
  setCurrentSession: (session: Session | null) => void;
  updateSession: (sessionId: string, updates: Partial<Session>) => void;
  deleteSession: (sessionId: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSessionTone: (sessionId: string, tone: string) => void;
  setSessionMode: (sessionId: string, mode: string) => void;
  setSessionTier: (sessionId: string, tier: string) => void;
  setSlipped: (sessionId: string, isSlipped: boolean) => void;
  incrementSlip: (sessionId: string) => void;
  addMessage: (sessionId: string, message: SessionMessage) => void;
  setLoading: (loading: boolean) => void;
} 