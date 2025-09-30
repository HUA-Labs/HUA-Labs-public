export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  tone: string;
  mode: string;
  tier: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Message) => void;
  setLoading: (isLoading: boolean) => void;
  setMessages: (messages: Message[]) => void;
} 