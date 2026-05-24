'use client';

import { useUiStore } from '@/lib/stores/uiStore';
import { useMemo } from 'react';

export function useStickyTop() {
  const isMobile = useUiStore((state) => state.isMobile);
  const scrollDirection = useUiStore((state) => state.scrollDirection);
  const headerHeight = useUiStore((state) => state.headerHeight);

  const top = useMemo(() => {
    if (!isMobile) return 0;
    return scrollDirection === 'down' ? 0 : headerHeight;
  }, [isMobile, scrollDirection, headerHeight]);

  return { top, isMobile, scrollDirection, headerHeight };
}
