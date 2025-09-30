'use client';
import { useSessionStore } from '@/stores/sessionStore';
import type { Session } from '@/types/session';
import { useState, useEffect, useRef } from 'react';
import { MoreVertical, X, Menu, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { getOrCreateUserId } from '@/shared/user';
import SideBarIcon from './icons/SideBarIcon';
import NewChatIcon from './icons/NewChatIcon';
import ConfigIcon from './icons/ConfigIcon';
import SettingsModal from './SettingsModal';
import { useTheme } from './ThemeProvider';
import { useState as useReactState } from 'react';
import { signOut } from 'next-auth/react';
import LoginModal from './LoginModal';

function formatTime(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  ) {
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString('ko-KR');
}

interface SessionSidebarProps {
  onToggle?: (isOpen: boolean) => void;
  onNewChat?: () => void;
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

export default function SessionSidebar({ onToggle, onNewChat }: SessionSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    sessions,
    currentSession,
    setCurrentSession,
    deleteSession,
    updateSession,
    isSidebarOpen,
    setSidebarOpen
  } = useSessionStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { colors, theme } = useTheme();
  const baseIconClass = 'w-6 h-6 transition-colors duration-200';
  const hoverClass = 'hover:scale-110 transition-transform duration-200';
  const sessionItemClass = 'hover:opacity-80';
  const sessionItemActiveClass = 'font-semibold';
  const sidebarTopBottomClass = '';
  const [hoveredId, setHoveredId] = useReactState<string | null>(null);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 600 : false;

  const userId = getOrCreateUserId();
  const userSessions = sessions[userId] || {};

  const hasSessions = Object.values(userSessions).filter(
    session => session.messages && session.messages.length > 0 && session.title.trim() !== ''
  ).length > 0;

  const handleClose = () => {
    setSidebarOpen(false);
  };

  const handleNewChat = () => {
    if (Object.keys(userSessions).length >= 10) {
      setShowLimitModal(true);
    } else {
      onNewChat?.();
    }
  };

  const handleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditValue(title);
    setMenuOpenId(null);
  };

  const handleEditSave = (id: string) => {
    updateSession(id, { title: editValue.trim() || 'New Chat' });
    setEditingId(null);
    setEditValue('');
  };

  const handleMenuClick = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.left - 40, y: rect.top });
    setMenuOpenId(menuOpenId === sessionId ? null : sessionId);
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuOpenId && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    }
    if (menuOpenId) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpenId]);

  return (
    <>
      {/* 모바일: 오버레이 + 사이드바 */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30"
          onClick={handleClose}
        />
      )}
      <AnimatePresence>
        {isMobile ? (
          isSidebarOpen && (
            <motion.aside
              key="mobile-sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="fixed left-0 top-0 h-full z-40 bg-white shadow-lg transition-all"
              style={{ width: '80vw', maxWidth: 400, background: colors.sidebarBg }}
            >
              {/* 상단 아이콘 영역: 토글 버튼 + 새 채팅 버튼 */}
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.div
                    key="sidebar-buttons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className={
                      `flex flex-row flex-none items-center justify-between px-4 pt-3 pb-1 gap-1 z-10 ${sidebarTopBottomClass}`
                    }
                  >
                    <button
                      className={`p-2 rounded-fulltransition flex items-center justify-center`}
                      onClick={handleClose}
                      style={{ color: colors.primaryForeground }}
                      title="사이드바 닫기"
                    >
                      <SideBarIcon size={24} className={`${baseIconClass} ${hoverClass}`} style={{ color: colors.primaryForeground }} />
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-10 h-10 flex items-center justify-center"
                      onClick={handleNewChat}
                      title="새 채팅"
                      style={{ color: colors.primaryForeground }}
                    >
                      <NewChatIcon size={24} color={colors.primaryForeground} className={`${baseIconClass} ${hoverClass}`} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
              {isSidebarOpen && (
                <div className="flex-1 overflow-y-auto">
                  <ul className="list-none p-0 m-0 bg-transparent">
                    {Object.entries(userSessions)
                      .filter(([, session]) => session.messages && session.messages.length > 0 && session.title.trim() !== '')
                      .sort(([, a], [, b]) => {
                        const aTime = new Date(a.updatedAt || a.createdAt).getTime();
                        const bTime = new Date(b.updatedAt || b.createdAt).getTime();
                        return bTime - aTime;
                      })
                      .map(([id, session]) => {
                        const isActive = currentSession?.id === id;
                        const isHovered = hoveredId === id;
                        return (
                          <motion.li
                            key={id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="relative group bg-transparent"
                          >
                            <div
                              onClick={() => {
                                setCurrentSession(session);
                                router.push(`/chat/${session.id}`);
                              }}
                              className={`w-full text-left px-4 py-2.5 transition-colors duration-200 ${isActive ? sessionItemActiveClass : sessionItemClass}`}
                              style={{
                                background: isActive ? colors.primary : isHovered ? colors.sidebarHoverBg : 'transparent',
                                color: isActive ? colors.primaryForeground : colors.sidebarInactiveText,
                                cursor: 'pointer',
                              }}
                              tabIndex={0}
                              role="button"
                              onKeyDown={e => {
                                if (e.key === 'Enter') {
                                  setCurrentSession(session);
                                  router.push(`/chat/${session.id}`);
                                }
                              }}
                              onMouseEnter={() => setHoveredId(id)}
                              onMouseLeave={() => setHoveredId(null)}
                            >
                              <div className="flex items-center justify-between gap-2 flex-1 min-w-0">
                                <div className="min-w-0 flex-1">
                                  <p className={`text-sm truncate ${isActive ? 'font-semibold' : 'font-medium'}`}
                                    style={{ color: isActive ? colors.primaryForeground : colors.sidebarInactiveText }}>
                                    {editingId === id ? (
                                      <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => handleEditSave(id)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            handleEditSave(id);
                                          }
                                        }}
                                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                                        autoFocus
                                      />
                                    ) : (
                                      session.title
                                    )}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span
                                      className="text-xs flex items-center gap-1"
                                      style={{ color: isActive ? colors.primaryForeground : colors.sidebarInactiveText }}
                                    >
                                      <span style={{ fontSize: 10 }}>💬</span>
                                      {session.messages.length}
                                    </span>
                                    <span
                                      className="text-xs flex-shrink-0"
                                      style={{ color: isActive ? colors.primaryForeground : colors.sidebarInactiveTimestamp }}
                                    >
                                      · {formatTime(session.updatedAt || session.createdAt)}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  onClick={e => { e.stopPropagation(); handleMenuClick(e, id); }}
                                  className="p-1.5 rounded-full hover:bg-muted/50 transition-colors duration-200"
                                  style={{ color: isActive ? colors.primaryForeground : colors.sidebarInactiveText }}
                                >
                                  <MoreVertical size={24} className={`${baseIconClass} ${hoverClass}`} />
                                </button>
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    {/* 세션이 하나도 없을 때 안내 메시지와 새 채팅 버튼 */}
                    {Object.values(userSessions).filter(session => session.messages && session.messages.length > 0 && session.title.trim() !== '').length === 0 && (
                      <div className="flex flex-col items-center justify-center py-20 text-center select-none" style={{ color: colors.mutedForeground }}>
                        <div className="text-3xl mb-2">😊</div>
                        <p className="mb-4 text-lg font-semibold">대화를 시작해보세요!</p>
                      </div>
                    )}
                  </ul>
                </div>
              )}
              {/* 하단 버튼 바텀 고정 */}
              <div className="absolute bottom-0 left-0 w-full flex flex-row items-center justify-between px-4 py-3 bg-opacity-80" style={{ background: colors.sidebarBg }}>
                <button
                  className="p-2 rounded-full transition-colors duration-200 group"
                  style={{ background: 'transparent', color: colors.primary }}
                  title="로그아웃"
                  onClick={() => setShowLogoutModal(true)}
                >
                  <User className={`${baseIconClass} ${hoverClass}`}/>
                </button>
                <button
                  className="p-2 rounded-full transition-colors duration-200 group"
                  title="설정"
                  onClick={() => setSettingsOpen(true)}
                  style={{ background: 'transparent', color: colors.primary }}
                >
                  <ConfigIcon className={`${baseIconClass} ${hoverClass}`} style={{ color: theme === 'sum-prism' ? '#be185d' : colors.primary }} />
                </button>
              </div>
            </motion.aside>
          )
        ) : (
          isSidebarOpen && (
            <motion.aside
              key="pc-sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="w-[320px] h-full bg-white shadow-lg"
              style={{ background: colors.sidebarBg }}
            >
              {/* 상단 아이콘 영역: 토글 버튼 + 새 채팅 버튼 */}
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.div
                    key="sidebar-buttons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className={
                      `flex flex-row flex-none items-center justify-between px-4 pt-3 pb-1 gap-1 z-10 ${sidebarTopBottomClass}`
                    }
                  >
                    <button
                      className={`p-2 rounded-fulltransition flex items-center justify-center`}
                      onClick={handleClose}
                      style={{ color: colors.primaryForeground }}
                      title="사이드바 닫기"
                    >
                      <SideBarIcon size={24} className={`${baseIconClass} ${hoverClass}`} style={{ color: colors.primaryForeground }} />
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-10 h-10 flex items-center justify-center"
                      onClick={handleNewChat}
                      title="새 채팅"
                      style={{ color: colors.primaryForeground }}
                    >
                      <NewChatIcon size={24} color={colors.primaryForeground} className={`${baseIconClass} ${hoverClass}`} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
              {isSidebarOpen && (
                <div className="flex-1 overflow-y-auto">
                  <ul className="list-none p-0 m-0 bg-transparent">
                    {Object.entries(userSessions)
                      .filter(([, session]) => session.messages && session.messages.length > 0 && session.title.trim() !== '')
                      .sort(([, a], [, b]) => {
                        const aTime = new Date(a.updatedAt || a.createdAt).getTime();
                        const bTime = new Date(b.updatedAt || b.createdAt).getTime();
                        return bTime - aTime;
                      })
                      .map(([id, session]) => {
                        const isActive = currentSession?.id === id;
                        const isHovered = hoveredId === id;
                        return (
                          <motion.li
                            key={id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="relative group bg-transparent"
                          >
                            <div
                              onClick={() => {
                                setCurrentSession(session);
                                router.push(`/chat/${session.id}`);
                              }}
                              className={`w-full text-left px-4 py-2.5 transition-colors duration-200 ${isActive ? sessionItemActiveClass : sessionItemClass}`}
                              style={{
                                background: isActive ? colors.primary : isHovered ? colors.sidebarHoverBg : 'transparent',
                                color: isActive ? colors.primaryForeground : colors.sidebarInactiveText,
                                cursor: 'pointer',
                              }}
                              tabIndex={0}
                              role="button"
                              onKeyDown={e => {
                                if (e.key === 'Enter') {
                                  setCurrentSession(session);
                                  router.push(`/chat/${session.id}`);
                                }
                              }}
                              onMouseEnter={() => setHoveredId(id)}
                              onMouseLeave={() => setHoveredId(null)}
                            >
                              <div className="flex items-center justify-between gap-2 flex-1 min-w-0">
                                <div className="min-w-0 flex-1">
                                  <p className={`text-sm truncate ${isActive ? 'font-semibold' : 'font-medium'}`}
                                    style={{ color: isActive ? colors.primaryForeground : colors.sidebarInactiveText }}>
                                    {editingId === id ? (
                                      <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => handleEditSave(id)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            handleEditSave(id);
                                          }
                                        }}
                                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                                        autoFocus
                                      />
                                    ) : (
                                      session.title
                                    )}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span
                                      className="text-xs flex items-center gap-1"
                                      style={{ color: isActive ? colors.primaryForeground : colors.sidebarInactiveText }}
                                    >
                                      <span style={{ fontSize: 10 }}>💬</span>
                                      {session.messages.length}
                                    </span>
                                    <span
                                      className="text-xs flex-shrink-0"
                                      style={{ color: isActive ? colors.primaryForeground : colors.sidebarInactiveTimestamp }}
                                    >
                                      · {formatTime(session.updatedAt || session.createdAt)}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  onClick={e => { e.stopPropagation(); handleMenuClick(e, id); }}
                                  className="p-1.5 rounded-full hover:bg-muted/50 transition-colors duration-200"
                                  style={{ color: isActive ? colors.primaryForeground : colors.sidebarInactiveText }}
                                >
                                  <MoreVertical size={24} className={`${baseIconClass} ${hoverClass}`} />
                                </button>
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    {/* 세션이 하나도 없을 때 안내 메시지와 새 채팅 버튼 */}
                    {Object.values(userSessions).filter(session => session.messages && session.messages.length > 0 && session.title.trim() !== '').length === 0 && (
                      <div className="flex flex-col items-center justify-center py-20 text-center select-none" style={{ color: colors.mutedForeground }}>
                        <div className="text-3xl mb-2">😊</div>
                        <p className="mb-4 text-lg font-semibold">대화를 시작해보세요!</p>
                      </div>
                    )}
                  </ul>
                </div>
              )}
              {/* 하단 버튼 바텀 고정 */}
              <div className="absolute bottom-0 left-0 w-full flex flex-row items-center justify-between px-4 py-3 bg-opacity-80" style={{ background: colors.sidebarBg }}>
                <button
                  className="p-2 rounded-full transition-colors duration-200 group"
                  style={{ background: 'transparent', color: colors.primary }}
                  title="로그아웃"
                  onClick={() => setShowLogoutModal(true)}
                >
                  <User className={`${baseIconClass} ${hoverClass}`}/>
                </button>
                <button
                  className="p-2 rounded-full transition-colors duration-200 group"
                  title="설정"
                  onClick={() => setSettingsOpen(true)}
                  style={{ background: 'transparent', color: colors.primary }}
                >
                  <ConfigIcon className={`${baseIconClass} ${hoverClass}`} style={{ color: theme === 'sum-prism' ? '#be185d' : colors.primary }} />
                </button>
              </div>
            </motion.aside>
          )
        )}
      </AnimatePresence>
      {/* 모바일에서만 보이는 딤드 오버레이 */}
      {typeof window !== 'undefined' && menuOpenId && createPortal(
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            left: menuPosition.x,
            top: menuPosition.y,
            zIndex: 50
          }}
          className="w-36 bg-background text-foreground rounded-lg shadow-lg"
          onClick={e => e.stopPropagation()}
        >
          <motion.button
            whileHover={{ backgroundColor: colors.popoverHoverBg }}
            whileTap={{ backgroundColor: colors.popoverHoverBg }}
            className="block w-full text-left px-4 py-2.5 text-sm text-popover-foreground transition-colors first:rounded-t-lg"
            onClick={() => handleEdit(menuOpenId, userSessions[menuOpenId]?.title || '')}
          >
            이름 변경
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: '#ffeaea' }}
            whileTap={{ backgroundColor: '#ffd6d6' }}
            className="block w-full text-left px-4 py-2.5 text-sm text-destructive transition-colors last:rounded-b-lg"
            onClick={() => { 
              deleteSession(menuOpenId); 
              setMenuOpenId(null);
              router.replace('/');
            }}
          >
            삭제
          </motion.button>
        </motion.div>,
        document.body
      )}

      {showLimitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 max-w-sm w-full mx-4" style={{ background: colors.background }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">세션 제한</h3>
              <button
                onClick={() => setShowLimitModal(false)}
                className="p-1 rounded-lg transition-colors"
                style={{ background: colors.muted }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-4" style={{ color: colors.mutedForeground }}>
              최대 10개의 세션만 생성할 수 있습니다. 새로운 세션을 만들기 위해서는 기존 세션을 삭제해주세요.
            </p>
            <button
              onClick={() => setShowLimitModal(false)}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      {/* 로그아웃 확인 모달 */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-background rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center border"
               style={{ borderColor: colors.border, background: colors.background }}>
            <div className="text-lg font-semibold mb-4" style={{ color: colors.foreground }}>로그아웃 하시겠습니까?</div>
            <div className="flex gap-4 w-full">
              <button
                className="flex-1 py-2 rounded-lg font-bold bg-muted hover:bg-primary text-primary hover:text-primaryForeground transition-colors"
                style={{ background: colors.muted, color: colors.primary }}
                onClick={() => setShowLogoutModal(false)}
              >
                취소
              </button>
              <button
                className="flex-1 py-2 rounded-lg font-bold bg-[#d32f2f] text-white hover:bg-[#b71c1c] transition-colors"
                onClick={async () => {
                  setShowLogoutModal(false);
                  await signOut({ redirect: false });
                  setShowLoginModal(true);
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 로그아웃 후 로그인 모달 */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
} 