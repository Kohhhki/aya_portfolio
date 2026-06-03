'use client';

import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUiStore } from '@/lib/stores/uiStore';
import Header from '@/app/_components/layout/templates/header';
import ScrollDetector from '@/app/_components/layout/templates/scrollDetector';
import ErrorViewer from '@/app/_components/layout/templates/errorViewer';
import ToastViewer from '@/app/_components/layout/templates/toastViewer';

export default function RootClient({ children }: { children: React.ReactNode }) {
  const isMobile = useUiStore((state) => state.isMobile);
  const scrollDirection = useUiStore((state) => state.scrollDirection);
  const setIsMobile = useUiStore((state) => state.setIsMobile);

  const isHeaderHidden = isMobile && scrollDirection === 'down';

  const updateMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, [setIsMobile]);

  useEffect(() => {
    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, [updateMobile]);

  return (
    <>
      <ErrorViewer />
      <ToastViewer />
      <ScrollDetector />

      <motion.div
        className="fixed top-5 left-0 right-0 flex justify-center z-50 pointer-events-none"
        initial={false}
        animate={{ y: isHeaderHidden ? -80 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="pointer-events-auto">
          <Header />
        </div>
      </motion.div>

      {children}
    </>
  );
}
