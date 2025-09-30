import React from 'react';

interface ChatBubbleIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function ChatBubbleIcon({ size = 22, color = '#444', className = '' }: ChatBubbleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
} 