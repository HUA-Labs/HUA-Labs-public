import { ChevronDown } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ScrollDownButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

export default function ScrollDownButton({ onClick, isVisible }: ScrollDownButtonProps) {
  const { colors } = useTheme();
  if (!isVisible) return null;
  return (
    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
      <button
        onClick={onClick}
        className="rounded-full p-2 shadow-xl transition-colors"
        style={{ background: colors.primary, color: colors.primaryForeground }}
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  );
} 