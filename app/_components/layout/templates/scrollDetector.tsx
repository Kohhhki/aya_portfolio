'use client';

import { useEffect, useRef } from 'react';
import { useUiStore } from '@/lib/stores/uiStore';
import { usePathname } from 'next/navigation';

export default function ScrollDetector() {
  const setScrollDirection = useUiStore((state) => state.setScrollDirection);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setScrollDirection('up');
  }, [pathname, setScrollDirection]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 0) return;

      const diff = currentScrollY - lastScrollY.current;
      const threshold = 10;

      if (Math.abs(diff) > threshold) {
        setScrollDirection(diff > 0 ? 'down' : 'up');
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollDirection]);

  return null;
}
