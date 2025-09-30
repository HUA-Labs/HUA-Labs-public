import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import SideBarIcon from './icons/SideBarIcon';
import NewChatIcon from './icons/NewChatIcon';
import { useSessionStore } from '@/stores/sessionStore';
import { useTheme } from './ThemeProvider';

interface SessionHeaderProps {
  sessionName: React.ReactNode;
  sessionId: string;
  onRename?: (name: string) => void;
  isSidebarOpen?: boolean;
  handleToggle?: () => void;
  handleNewChat?: () => void;
  showShareButton?: boolean;
}

function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

export default function SessionHeader({ sessionName, sessionId, onRename, isSidebarOpen, handleToggle, handleNewChat, showShareButton = false }: SessionHeaderProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(typeof sessionName === 'string' ? sessionName : '');
  const { setSidebarOpen } = useSessionStore(state => ({
    setSidebarOpen: state.setSidebarOpen,
  }));
  const { colors } = useTheme();
  const baseIconClass = 'w-6 h-6 transition-colors duration-200';
  const hoverClass = 'hover:scale-110 transition-transform duration-200';
  const isMobile = useIsMobile();

  const handleDoubleClick = () => {
    if (typeof sessionName === 'string') setEditing(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleBlur = () => {
    setEditing(false);
    if (typeof sessionName === 'string' && onRename && name.trim() && name !== sessionName) onRename(name.trim());
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleBlur();
  };

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/chat/${sessionId}`;
      await navigator.clipboard.writeText(shareUrl);
      alert('대화 링크가 클립보드에 복사되었습니다!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('링크 복사에 실패했습니다.');
    }
  };

  // PC: 사이드바 열림(타이틀만), 닫힘(슬라이드/새채팅/타이틀)
  // 모바일: 항상 메뉴/타이틀/새채팅
  return (
    <header
      className="w-full mx-auto px-8 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm"
      style={{ background: colors.background, color: colors.foreground, borderBottom: `1px solid ${colors.border}` }}
    >
      {/* 왼쪽: PC(사이드바 닫힘) 또는 모바일에서 슬라이드/메뉴 버튼 */}
      {((!isMobile && isSidebarOpen === false) || isMobile) && (
        <button
          className="p-2 rounded-full flex items-center justify-center"
          onClick={() => setSidebarOpen(true)}
          style={{ minWidth: 40, minHeight: 40, height: 40, width: 40 }}
          title="사이드바 열기"
        >
          <SideBarIcon size={24} color={colors.primary} className={`${baseIconClass} ${hoverClass}`} />
        </button>
      )}
      {/* 가운데: 세션 타이틀 (수정 가능) */}
      <div className="flex-1 flex justify-center items-center min-w-0" onDoubleClick={handleDoubleClick}>
        {typeof sessionName === 'string' && editing ? (
          <input
            className="text-lg font-bold bg-transparent border-b focus:outline-none px-1 py-0.5 w-40"
            style={{ borderColor: colors.primary, color: colors.primary }}
            value={name as string}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={30}
          />
        ) : typeof sessionName === 'string' ? (
          <span
            className="font-bold truncate cursor-default"
            title={sessionName as string}
            style={{ color: colors.foreground }}
          >
            {sessionName}
          </span>
        ) : (
          <span className="flex items-center justify-center">{sessionName}</span>
        )}
      </div>
      {/* 오른쪽: PC(사이드바 닫힘) 또는 모바일에서 새채팅 버튼 */}
      {((!isMobile && isSidebarOpen === false) || isMobile) && handleNewChat && (
        <button
          className="w-10 h-10 flex items-center justify-center ml-2"
          onClick={handleNewChat}
          title="새 채팅"
        >
          <NewChatIcon size={24} color={colors.primary} className={`${baseIconClass} ${hoverClass}`} />
        </button>
      )}
      {/* 공유 버튼 (옵션) */}
      {showShareButton && (
        <button
          className="p-2 rounded flex items-center justify-center ml-2"
          title="대화 공유하기"
          onClick={handleShare}
          style={{ color: colors.primary }}
        >
          {React.createElement(Share2 as any, { className: `${baseIconClass} ${hoverClass}`, style: { color: colors.primary } })}
        </button>
      )}
    </header>
  );
} 