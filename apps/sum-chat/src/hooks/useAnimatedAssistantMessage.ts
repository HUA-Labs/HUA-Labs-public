import { useState, useEffect } from 'react';
import type { SessionMessage } from '@/types/session';
import { useSessionStore } from '@/stores/sessionStore';

interface UseAnimatedAssistantMessageProps {
  pendingMessage: SessionMessage | null;
  onAnimationComplete: (message: SessionMessage) => void;
  currentSessionId: string | undefined;
}

export const useAnimatedAssistantMessage = ({
  pendingMessage,
  onAnimationComplete,
  currentSessionId,
}: UseAnimatedAssistantMessageProps) => {
  const [displayedParagraphs, setDisplayedParagraphs] = useState<string[]>([]);
  const { addMessage } = useSessionStore();

  useEffect(() => {
    if (!pendingMessage || !pendingMessage.content) {
      if (displayedParagraphs.length > 0) setDisplayedParagraphs([]);
      return;
    }

    // Split content into paragraphs. Handles various newline combinations.
    const paragraphs = pendingMessage.content.split(/\n{2,}/g).map(p => p.trim()).filter(Boolean);
    
    // If there are no actual paragraphs, treat the whole content as one if it exists
    if (paragraphs.length === 0 && pendingMessage.content.trim()) {
        paragraphs.push(pendingMessage.content.trim());
    }
    
    setDisplayedParagraphs([]); // Reset for the new message

    let i = 0;
    let cancelled = false;

    function showNextParagraph() {
      if (cancelled || !currentSessionId || !pendingMessage) return;

      setDisplayedParagraphs(prev => [...prev, paragraphs[i]]);
      i++;

      if (i < paragraphs.length) {
        setTimeout(showNextParagraph, 500); // Adjust delay as needed
      } else {
        // All paragraphs displayed
        setTimeout(() => {
          if (cancelled || !currentSessionId || !pendingMessage) return;
          
          // Add the fully processed message to the store
          addMessage(currentSessionId, pendingMessage);
          
          // Notify ChatUI that animation is complete
          onAnimationComplete(pendingMessage);
          
          // Optional: Clear displayedParagraphs after a short delay, 
          // or let ChatUI handle it by pendingMessage becoming null.
          // For now, we let the clearing happen when pendingMessage changes.
          // setDisplayedParagraphs([]); 
        }, 400); // Adjust delay as needed
      }
    }

    if (paragraphs.length > 0) {
      showNextParagraph();
    } else {
      // If there's no content to animate (e.g. empty string after trim)
      // but there is a pendingMessage object (e.g. for error messages with no real content)
      // still call addMessage and onAnimationComplete
      if (currentSessionId && pendingMessage) {
        addMessage(currentSessionId, pendingMessage);
        onAnimationComplete(pendingMessage);
      }
    }

    return () => {
      cancelled = true;
      // Do not clear displayedParagraphs here immediately on cleanup
      // as it might cause a flicker if pendingMessage changes rapidly.
      // Clearing is handled at the start of the effect or by ChatUI.
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingMessage, currentSessionId, addMessage, onAnimationComplete]); 
  // Explicitly not adding displayedParagraphs to dependency array to avoid re-triggering on its own updates.

  return { displayedParagraphs };
};
