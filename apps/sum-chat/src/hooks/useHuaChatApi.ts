import { useState, useCallback } from 'react';
import { useSessionStore } from '@/stores/sessionStore';
import type { Session, SessionMessage } from '@/types/session';
import { v4 as uuidv4 } from 'uuid';

interface UseHuaChatApiProps {
  currentSession: Session | null;
  selectedMode: string;
  selectedTone: string;
  system_tier: string;
  user: string;
  resonance_pattern: string;
  onNewAssistantMessage: (message: SessionMessage) => void;
  setIsChatLoading: (loading: boolean) => void; // To control ChatUI's loading state
}

export const useHuaChatApi = ({
  currentSession,
  selectedMode,
  selectedTone,
  system_tier,
  user,
  resonance_pattern,
  onNewAssistantMessage,
  setIsChatLoading,
}: UseHuaChatApiProps) => {
  const [isLoading, setIsLoading] = useState(false); // Internal loading state for the hook
  const [error, setError] = useState<Error | null>(null);

  const { 
    addMessage, 
    setSlipped, 
    incrementSlip, 
    setSessionTone: setStoreSessionTone, 
    setSessionMode: setStoreSessionMode, 
    setSessionTier 
  } = useSessionStore();

  const submitQuery = useCallback(async (text: string) => {
    if (!text.trim()) return;
    if (!currentSession) {
      // This case should ideally be handled by the UI before calling submitQuery
      console.error('No current session');
      setError(new Error('No current session'));
      return;
    }

    setIsLoading(true);
    setIsChatLoading(true);
    setError(null);

    const userMessage: SessionMessage = {
      id: uuidv4(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      tone: selectedTone, // Or derive from currentSession if appropriate
      mode: selectedMode,   // Or derive from currentSession if appropriate
      tier: system_tier   // Or derive from currentSession if appropriate
    };
    addMessage(currentSession.id, userMessage);

    try {
      const response = await fetch('/api/hua', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          input: text,
          config: {
            user,
            resonance_pattern,
            system_tier,
            mode: selectedMode,
            tone_filter: selectedTone
          },
          session_id: currentSession.id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'API 요청 실패');
      }

      const data = await response.json();

      if (data.error) {
        console.error('API Error:', data.error);
        throw new Error(data.error);
      }
      
      if (!data.response) {
        console.error('No response content from API');
        throw new Error('No response content from API');
      }

      if (data.rhythm) {
        console.log('[RHYTHM from Hook]', data.rhythm);
        if (data.rhythm.tone && data.rhythm.mode && data.rhythm.tier) {
          setStoreSessionTone(currentSession.id, data.rhythm.tone);
          setStoreSessionMode(currentSession.id, data.rhythm.mode);
          setSessionTier(currentSession.id, data.rhythm.tier.toString());
        }
      }

      const assistantMessage: SessionMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
        tone: data.rhythm?.tone || selectedTone,
        mode: data.rhythm?.mode || selectedMode,
        tier: data.rhythm?.tier?.toString() || system_tier
      };
      onNewAssistantMessage(assistantMessage);

      if (data.slip_reason) {
        setSlipped(currentSession.id, true);
        incrementSlip(currentSession.id);
      }
    } catch (err) {
      console.error('SubmitQuery Error:', err);
      setError(err as Error);
      const errorMessage: SessionMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: '죄송합니다. 오류가 발생했습니다. ' + (err as Error).message,
        timestamp: new Date().toISOString(),
        tone: selectedTone,
        mode: selectedMode,
        tier: system_tier
      };
      onNewAssistantMessage(errorMessage); // Propagate error as a message
    } finally {
      setIsLoading(false);
      setIsChatLoading(false);
    }
  }, [
    currentSession, 
    selectedMode, 
    selectedTone, 
    system_tier, 
    user, 
    resonance_pattern, 
    onNewAssistantMessage, 
    setIsChatLoading, 
    addMessage, 
    setSlipped, 
    incrementSlip, 
    setStoreSessionTone, 
    setStoreSessionMode, 
    setSessionTier
  ]);

  const submitMessageQuery = useCallback(async (message: string) => {
    if (!message.trim()) return;
    if (!currentSession) {
      console.error('No current session for submitMessageQuery');
      setError(new Error('No current session for submitMessageQuery'));
      return;
    }

    let retryCount = 0;
    const maxRetries = 3;

    setIsLoading(true);
    setIsChatLoading(true);
    setError(null);

    while (retryCount < maxRetries) {
      try {
        const response = await fetch('/api/hua', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            input: message,
            config: {
              user,
              resonance_pattern,
              system_tier,
              mode: selectedMode,
              tone_filter: selectedTone
            },
            session_id: currentSession.id
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'API 요청 실패');
        }

        const data = await response.json();
        if (data.error) {
          console.error('API Error:', data.error);
          throw new Error(data.error);
        }

        if (!data.response) {
          console.error('No response content from API');
          throw new Error('No response content from API');
        }
        
        if (data.rhythm) {
          console.log('[RHYTHM from Hook]', data.rhythm);
          if (data.rhythm.tone && data.rhythm.mode && data.rhythm.tier) {
            setStoreSessionTone(currentSession.id, data.rhythm.tone);
            setStoreSessionMode(currentSession.id, data.rhythm.mode);
            setSessionTier(currentSession.id, data.rhythm.tier.toString());
          }
        }

        const assistantMessage: SessionMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
          tone: data.rhythm?.tone || selectedTone,
          mode: data.rhythm?.mode || selectedMode,
          tier: data.rhythm?.tier?.toString() || system_tier
        };
        onNewAssistantMessage(assistantMessage);

        if (data.slip_reason) {
          setSlipped(currentSession.id, true);
          incrementSlip(currentSession.id);
        }
        break; // Success, exit retry loop
      } catch (err) {
        console.error(`SubmitMessageQuery Attempt ${retryCount + 1} failed:`, err);
        retryCount++;
        setError(err as Error); // Set error state

        if (retryCount === maxRetries) {
          const errorMessage: SessionMessage = {
            id: uuidv4(),
            role: 'assistant',
            content: '죄송합니다. 서버와의 통신에 문제가 발생했습니다. 잠시 후 다시 시도해주세요. ' + (err as Error).message,
            timestamp: new Date().toISOString(),
            tone: selectedTone,
            mode: selectedMode,
            tier: system_tier
          };
          onNewAssistantMessage(errorMessage); // Propagate final error as message
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      } finally {
        if (retryCount === maxRetries || !error) { // Only set loading to false if it's the last retry or successful
          setIsLoading(false);
          setIsChatLoading(false);
        }
      }
    }
  }, [
    currentSession, 
    selectedMode, 
    selectedTone, 
    system_tier, 
    user, 
    resonance_pattern, 
    onNewAssistantMessage, 
    setIsChatLoading, 
    setSlipped, 
    incrementSlip, 
    setStoreSessionTone, 
    setStoreSessionMode, 
    setSessionTier,
    error
  ]);

  return { submitQuery, submitMessageQuery, isLoading, error };
};
