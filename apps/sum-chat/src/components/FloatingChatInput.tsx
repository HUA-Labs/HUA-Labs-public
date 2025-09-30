import { forwardRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import SendIcon from './icons/SendIcon';
import { useTheme } from '../components/ThemeProvider';

interface FloatingChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  children?: React.ReactNode; // 추가 버튼/영역
}

const FloatingChatInput = forwardRef<HTMLTextAreaElement, FloatingChatInputProps>(
  ({ value, onChange, onSubmit, disabled = false, placeholder = '메시지를 입력하세요...', autoFocus = false, children }, ref) => {
    const { colors } = useTheme();

    return (
      <div className="w-full max-w-[768px] flex flex-col gap-2 mx-auto">
        <form onSubmit={onSubmit} className={`w-full rounded-2xl shadow-lg px-4 py-3 flex flex-col gap-2`} style={{ background: colors.inputBg }}>
          <TextareaAutosize
            ref={ref}
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSubmit(e as any);
              }
            }}
            placeholder={placeholder}
            minRows={1}
            maxRows={6}
            className={`resize-none rounded-xl border-none bg-transparent p-2 focus:outline-none text-base w-full placeholder:text-[${colors.inputPlaceholder}]`}
            style={{
              background: 'transparent',
              color: colors.inputText,
              caretColor: colors.inputFocus,
            }}
            disabled={disabled}
            autoFocus={autoFocus}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!value.trim() || disabled}
              style={{ background: colors.primary, color: colors.primaryForeground, minWidth: 24, minHeight: 24, border: `1.5px solid ${colors.inputFocus}` }}
              className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all disabled:opacity-50 disabled:cursor-default`}
              title="전송"
              aria-label="전송"
            >
              <SendIcon size={24} />
            </button>
          </div>
        </form>
        {/* 추가 버튼/영역 */}
        {children && (
          <div className="flex justify-center mt-1">{children}</div>
        )}
      </div>
    );
  }
);

FloatingChatInput.displayName = 'FloatingChatInput';

export default FloatingChatInput; 