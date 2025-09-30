import React from 'react';
import ScrollDownButton from '../ScrollDownButton'; // Assuming path is correct
import FloatingChatInput from '../FloatingChatInput'; // Assuming path is correct

interface ChatInputZoneProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isChatLoading: boolean;
  guestChatLimitReached: boolean;
  isSlipped: boolean | undefined;
  isAtBottom: boolean;
  onScrollDownClick: () => void;
  placeholderText: string;
}

export default function ChatInputZone({
  input,
  setInput,
  onSubmit,
  isChatLoading,
  guestChatLimitReached,
  isSlipped,
  isAtBottom,
  onScrollDownClick,
  placeholderText,
}: ChatInputZoneProps) {
  return (
    <div className="flex-none">
      <div className="max-w-[768px] mx-auto px-4 pb-8">
        <div className="relative">
          <ScrollDownButton
            isVisible={!isAtBottom}
            onClick={onScrollDownClick}
          />
          <FloatingChatInput
            value={input}
            onChange={setInput}
            onSubmit={onSubmit}
            disabled={isChatLoading || guestChatLimitReached || isSlipped}
            placeholder={placeholderText}
            autoFocus={false} // Or make this a prop if needed
          />
        </div>
        {guestChatLimitReached && (
          <div className="text-center text-sm text-red-500 mt-2">
            비로그인 사용자는 한 세션당 3회까지만 대화할 수 있습니다.<br />
            로그인하면 제한 없이 대화할 수 있습니다.
          </div>
        )}
      </div>
    </div>
  );
}
