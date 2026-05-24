'use client';

import { useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import {
  MdCheckCircle,
  MdClose,
  MdInfoOutline,
  MdWarningAmber,
} from 'react-icons/md';
import { toastStore, type Toast } from '@/lib/stores/toastStore';

interface Props {
  toast: Toast;
}

const DEFAULT_DURATION_MS: Record<Toast['tone'], number> = {
  success: 2600,
  info: 4000,
  warning: 6000,
};

const TONE_STYLES = {
  success: {
    border: 'border-accent-0',
    iconWrapper: 'bg-accent-0/10',
    icon: 'text-accent-0',
    Icon: MdCheckCircle,
  },
  info: {
    border: 'border-foreground-1/40',
    iconWrapper: 'bg-foreground-1/10',
    icon: 'text-foreground-1',
    Icon: MdInfoOutline,
  },
  warning: {
    border: 'border-accent-warning',
    iconWrapper: 'bg-accent-warning/10',
    icon: 'text-accent-warning',
    Icon: MdWarningAmber,
  },
} satisfies Record<
  Toast['tone'],
  { border: string; iconWrapper: string; icon: string; Icon: React.ComponentType<{ size?: number; className?: string }> }
>;

const ToastCard = memo(function ToastCard({ toast }: Props) {
  const tone = TONE_STYLES[toast.tone];

  useEffect(() => {
    const duration = toast.durationMs ?? DEFAULT_DURATION_MS[toast.tone];
    if (duration <= 0) return;
    const handle = window.setTimeout(() => {
      toastStore.getState().dismissToast(toast.id);
    }, duration);
    return () => window.clearTimeout(handle);
  }, [toast.id, toast.tone, toast.durationMs]);

  const Icon = tone.Icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.94, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      className={`w-full max-w-sm bg-background-1 border-l-4 ${tone.border} shadow-lg rounded-r-lg py-3.5 pl-4 pr-10 flex gap-4 items-start relative pointer-events-auto`}
    >
      <div className={`${tone.iconWrapper} p-2 rounded-full flex-shrink-0`}>
        <Icon size={22} className={tone.icon} />
      </div>
      <div className="flex-1 overflow-hidden">
        {toast.title && (
          <div className="text-[10px] font-bold text-foreground-1 uppercase tracking-wider mb-1">
            {toast.title}
          </div>
        )}
        <div className="text-sm font-medium text-foreground-0 leading-relaxed break-words">
          {toast.message}
        </div>
        {toast.action && (
          <button
            type="button"
            onClick={() => {
              toast.action!.onClick();
              toastStore.getState().dismissToast(toast.id);
            }}
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-accent-0 uppercase hover:opacity-80 transition-opacity cursor-pointer"
          >
            {toast.action.label}
            <span aria-hidden>→</span>
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => toastStore.getState().dismissToast(toast.id)}
        className="p-1 hover:bg-grass rounded-full transition-colors cursor-pointer absolute top-2 right-2"
        aria-label="dismiss"
      >
        <MdClose size={18} className="text-foreground-1" />
      </button>
    </motion.div>
  );
});

export default ToastCard;
