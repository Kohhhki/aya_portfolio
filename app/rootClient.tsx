'use client';

import ScrollDetector from '@/app/_components/layout/templates/scrollDetector';
import { useCallback, useEffect } from 'react';
import { useUiStore } from '@/lib/stores/uiStore';
import { motion } from 'framer-motion';
import Header from '@/app/_components/layout/templates/header';
import ErrorViewer from '@/app/_components/layout/templates/errorViewer';
import ToastViewer from '@/app/_components/layout/templates/toastViewer';

export default function RootClient({ children }: { children: React.ReactNode }) {
  const isMobile = useUiStore((state) => state.isMobile);
  const scrollDirection = useUiStore((state) => state.scrollDirection);
  const setIsMobile = useUiStore((state) => state.setIsMobile);
  const headerHeight = useUiStore((state) => state.headerHeight);
  const setHeaderHeight = useUiStore((state) => state.setHeaderHeight);

  const isHeaderHidden = isMobile && scrollDirection === 'down';

  const updateLayout = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const height = mobile ? 50 : 60;
    setHeaderHeight(height);
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  }, [setIsMobile, setHeaderHeight]);

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  return (
    <main className="w-full md:h-full h-auto">
      <ErrorViewer />
      <ToastViewer />
      <ScrollDetector />

      <motion.div
        initial={false}
        animate={{ y: isHeaderHidden ? -headerHeight : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <Header />
      </motion.div>

      <motion.div
        className="w-full md:h-full h-auto box-border relative"
        initial={false}
        animate={{ paddingTop: isHeaderHidden ? 0 : headerHeight }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </main>
  );
}
