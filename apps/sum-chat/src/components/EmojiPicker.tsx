'use client';

import { useState, useRef, useEffect } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmojiPicker({ onEmojiSelect, isOpen, onClose }: EmojiPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={pickerRef}
      className="absolute bottom-full mb-2 z-50"
    >
      <Picker
        data={data}
        onEmojiSelect={(emoji: any) => {
          onEmojiSelect(emoji.native);
          onClose();
        }}
        theme="light"
        set="native"
        previewPosition="none"
        skinTonePosition="none"
      />
    </div>
  );
} 