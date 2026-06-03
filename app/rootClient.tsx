'use client';

import { motion } from 'framer-motion';
import { useUiStore } from '@/lib/stores/uiStore';
import Header from '@/app/_components/layout/templates/header';
import ScrollDetector from '@/app/_components/layout/templates/scrollDetector';
import ErrorViewer from '@/app/_components/layout/templates/errorViewer';
import ToastViewer from '@/app/_components/layout/templates/toastViewer';

export default function RootClient({ children }: { children: React.ReactNode }) {
  const scrollDirection = useUiStore((state) => state.scrollDirection);

  const isHeaderHidden = scrollDirection === 'down';

  return (
    <>
      <ErrorViewer />
      <ToastViewer />
      <ScrollDetector />

      <motion.div
        className="fixed top-5 left-0 right-0 flex justify-center z-50 pointer-events-none"
        initial={false}
        animate={{ y: isHeaderHidden ? -110 : 0 }}
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
