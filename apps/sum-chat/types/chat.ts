export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Message) => void;
  setLoading: (isLoading: boolean) => void;
} 