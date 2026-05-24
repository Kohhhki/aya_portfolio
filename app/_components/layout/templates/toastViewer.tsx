'use client';

import { AnimatePresence } from 'framer-motion';
import { toastStore } from '@/lib/stores/toastStore';
import ToastCard from '@/app/_components/layout/ingredients/toastCard';

export default function ToastViewer() {
  const toasts = toastStore((state) => state.toasts);

  return (
    <div
      className="fixed bottom-20 right-4 z-[999] flex flex-col gap-3 items-end pointer-events-none w-fit max-w-[calc(100vw-2rem)]"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
