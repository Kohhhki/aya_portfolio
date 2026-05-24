'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { useStickyTop } from '@/lib/hooks/useStickyTop';
import React from 'react';

interface StickyWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export default function StickyWrapper({
  children,
  className,
  ...props
}: StickyWrapperProps) {
  const { top } = useStickyTop();

  return (
    <motion.div
      initial={false}
      animate={{ top }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`sticky z-30 ${className ?? ''}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
