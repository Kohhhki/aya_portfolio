'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-1.5 rounded-lg hover:bg-foreground-0/8 transition-colors cursor-pointer text-foreground-1 hover:text-foreground-0"
      aria-label="toggle theme"
    >
      {theme === 'dark'
        ? <MdLightMode size={20} />
        : <MdDarkMode size={20} />
      }
    </button>
  );
}
