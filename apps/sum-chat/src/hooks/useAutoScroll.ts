import { useRef, useState, useEffect, RefObject, useCallback } from 'react';

export function useAutoScroll(deps: any[] = []) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const setIsAtBottomCallback = useCallback((value: boolean) => {
    setIsAtBottom(value);
  }, []);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
      setIsAtBottom(isBottom);
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // deps 변경 시 스크롤 위치 체크
  useEffect(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
      setIsAtBottom(isBottom);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  // 외부에서 ref, isAtBottom, setIsAtBottom 사용 가능
  return { containerRef, isAtBottom, setIsAtBottom: setIsAtBottomCallback };
} 