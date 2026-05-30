'use client';

import { motion } from 'framer-motion';
import { showSuccessToast, showInfoToast } from '@/lib/stores/toastStore';
import {
  MdAutoAwesome,
  MdCode,
  MdPalette,
  MdSpeed,
  MdShield,
  MdDevices,
  MdArrowForward,
} from 'react-icons/md';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

const FEATURES = [
  {
    icon: MdSpeed,
    title: 'Blazing Fast',
    description:
      'Built on Next.js 16 with App Router. Server components, streaming, and edge-ready by default.',
  },
  {
    icon: MdPalette,
    title: 'Design System',
    description:
      'Apple-inspired tokens, dark mode via next-themes, and Tailwind v4 — all wired up out of the box.',
  },
  {
    icon: MdShield,
    title: 'Type-Safe API',
    description:
      'Zod validation at every boundary. Error handling with structured error codes and friendly messages.',
  },
  {
    icon: MdDevices,
    title: 'Responsive',
    description:
      'Dynamic header that hides on mobile scroll and stays visible on desktop. Works beautifully everywhere.',
  },
  {
    icon: MdCode,
    title: 'Clean Architecture',
    description:
      'Feature-based directory structure with services, repositories, and hooks cleanly separated.',
  },
  {
    icon: MdAutoAwesome,
    title: 'Toast & Errors',
    description:
      'Global notification system powered by Zustand + Framer Motion. Call showSuccessToast() from anywhere.',
  },
];

const STATS = [
  { value: '16', label: 'Next.js' },
  { value: 'v4', label: 'Tailwind' },
  { value: '0ms', label: 'Style flash' },
  { value: '∞', label: 'Possibilities' },
];

export default function Home() {
  return (
    <div className="bg-background-1 overflow-hidden">

    </div>
  );
}
