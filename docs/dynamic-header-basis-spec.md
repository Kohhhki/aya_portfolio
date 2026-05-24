# Dynamic Header Layout — Implementation Spec

## Overview

このドキュメントは「スクロール連動動的ヘッダー」レイアウトを  
新規 Next.js プロジェクト（create-next-app）の `src` 相当ディレクトリに  
再現するための仕様書です。別プロジェクト上の Agent が読んで実装できるよう  
コード・設計方針・ファイルツリーをすべて記述しています。

---

## 動作仕様

| 端末 | 挙動 |
|------|------|
| モバイル (< 768px) | 下スクロールでヘッダーが上へスライドアウト、上スクロールで戻る |
| PC / タブレット (≥ 768px) | ヘッダーは常に表示（固定） |

- ヘッダー高さは CSS 変数 `--header-height` としてランタイムで `document.documentElement` に注入される
- `StickyWrapper` コンポーネントはこの変数を利用して、サブヘッダー等の sticky 要素の `top` を自動追従させる
- スクロール検知は 10px のしきい値でノイズを除去する
- アニメーションはすべて Framer Motion（duration 0.3s easeOut）

---

## セットアップ手順

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --no-src-dir
cd my-app
```

> **重要**: `--no-src-dir` を指定して `src/` を作らず、プロジェクトルートに `app/` `lib/` を置く構成にすること。

---

## 必須パッケージ

```bash
npm install zustand framer-motion next-themes react-icons
```

| パッケージ | 用途 |
|-----------|------|
| `zustand` | グローバル状態管理（scroll方向、header高さ、モバイル判定、エラー、toast） |
| `framer-motion` | ヘッダーのスライドアニメーション、StickyWrapper、通知カードのアニメーション |
| `next-themes` | ダーク/ライトモード切り替え（`next-themes` v0.4+） |
| `react-icons` | アイコン（MdMenu, MdClose, MdErrorOutline, MdCheckCircle, MdWarningAmber 等） |

---

## tsconfig.json パスエイリアス

`create-next-app` が生成した `tsconfig.json` の `paths` を確認し、以下になっていることを確認する。

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

`src/` を使わない場合はこのままで OK。`src/` を使う場合は `"./*"` → `"./src/*"` に変更する。

---

## ファイルツリー

以下のファイルをすべて作成する。既存ファイル（`app/page.tsx` 等）は適宜置き換える。

```
app/
  layout.tsx                        ← ルートレイアウト（置き換え）
  globals.css                       ← グローバルCSS（置き換え）
  page.tsx                          ← サンプルページ（置き換え可）
  _components/
    layout/
      templates/
        header.tsx
        scrollDetector.tsx
        errorViewer.tsx
        toastViewer.tsx
      ingredients/
        errorCard.tsx
        toastCard.tsx
        pageTitle.tsx
        mobileMenu.tsx              ← 必要に応じて実装（後述）
    common/
      templates/
        stickyWrapper.tsx
    providers/
      themeProvider.tsx
  rootClient.tsx

lib/
  stores/
    uiStore.ts
    errorStore.ts
    toastStore.ts
  hooks/
    useStickyTop.ts
    useHeaderHeight.ts
  types/
    error.ts
```

---

## 実装コード

### `lib/types/error.ts`

```typescript
export type ErrorScheme = {
  code: string;
  message: string;
  details?: unknown;
};
```

---

### `lib/stores/uiStore.ts`

```typescript
import { create } from 'zustand';

type ScrollDirection = 'up' | 'down' | 'left' | 'right';

interface UiState {
  scrollDirection: ScrollDirection;
  setScrollDirection: (direction: ScrollDirection) => void;

  headerHeight: number;
  setHeaderHeight: (height: number) => void;

  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  scrollDirection: 'up',
  setScrollDirection: (direction) => set({ scrollDirection: direction }),

  headerHeight: 60,
  setHeaderHeight: (height) => set({ headerHeight: height }),

  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
}));
```

---

### `lib/stores/errorStore.ts`

```typescript
import { ErrorScheme } from '@/lib/types/error';
import { create } from 'zustand';

type ErrorWithId = ErrorScheme & { id: string };

type StoreConfig = {
  error: ErrorWithId[];
  appendError: (error: ErrorScheme) => void;
  deleteError: (id: string) => void;
};

export const errorStore = create<StoreConfig>((set) => ({
  error: [],
  appendError: (error) =>
    set((state) => ({
      error: [...state.error, { ...error, id: crypto.randomUUID() }],
    })),
  deleteError: (id) =>
    set((state) => ({
      error: state.error.filter((e) => e.id !== id),
    })),
}));
```

---

### `lib/stores/toastStore.ts`

```typescript
import { create } from 'zustand';

export type ToastTone = 'success' | 'info' | 'warning';

export type Toast = {
  id: string;
  tone: ToastTone;
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  /** ms。undefined = デフォルト値使用。0 = 自動消去しない */
  durationMs?: number;
  createdAt: number;
};

export type ToastInput = Omit<Toast, 'id' | 'createdAt'>;

type ToastStore = {
  toasts: Toast[];
  showToast: (input: ToastInput) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
};

function generateId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `toast_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export const toastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  showToast: (input) => {
    const id = generateId();
    set({ toasts: [...get().toasts, { id, createdAt: Date.now(), ...input }] });
    return id;
  },
  dismissToast: (id) =>
    set({ toasts: get().toasts.filter((t) => t.id !== id) }),
  clearToasts: () => set({ toasts: [] }),
}));

// コンポーネント外から呼べるヘルパー
export const showSuccessToast = (
  message: string,
  opts?: Partial<Omit<ToastInput, 'message' | 'tone'>>
) => toastStore.getState().showToast({ tone: 'success', message, ...opts });

export const showInfoToast = (
  message: string,
  opts?: Partial<Omit<ToastInput, 'message' | 'tone'>>
) => toastStore.getState().showToast({ tone: 'info', message, ...opts });

export const showWarningToast = (
  message: string,
  opts?: Partial<Omit<ToastInput, 'message' | 'tone'>>
) => toastStore.getState().showToast({ tone: 'warning', message, ...opts });
```

---

### `lib/hooks/useStickyTop.ts`

```typescript
'use client';

import { useUiStore } from '@/lib/stores/uiStore';
import { useMemo } from 'react';

/**
 * モバイルでヘッダーが非表示のとき sticky 要素の top を 0 にし、
 * 表示のときは headerHeight に揃える。
 * PCでは常に top=0（ヘッダーは fixed で常時表示）。
 */
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
```

---

### `lib/hooks/useHeaderHeight.ts`

```typescript
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useUiStore } from '@/lib/stores/uiStore';

/**
 * ヘッダー要素に渡す ref。ResizeObserver でヘッダー高さを監視し uiStore に反映する。
 * 使い方: const headerRef = useHeaderHeight(); <header ref={headerRef}>
 */
export const useHeaderHeight = () => {
  const setHeaderHeight = useUiStore((state) => state.setHeaderHeight);
  const observer = useRef<ResizeObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
      if (node) {
        observer.current = new ResizeObserver((entries) => {
          for (const entry of entries) {
            setHeaderHeight(entry.contentRect.height);
          }
        });
        observer.current.observe(node);
      }
    },
    [setHeaderHeight]
  );

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return ref;
};
```

---

### `app/_components/providers/themeProvider.tsx`

```tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

---

### `app/_components/layout/templates/scrollDetector.tsx`

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { useUiStore } from '@/lib/stores/uiStore';
import { usePathname } from 'next/navigation';

/**
 * DOM に何もレンダリングしない。window の scroll イベントを監視して
 * uiStore の scrollDirection を更新するだけの副作用コンポーネント。
 *
 * しきい値 10px: マイクロスクロール（慣性・バウンス）を除外するため。
 * ルート変化時に方向を 'up' にリセットして新ページがヘッダーを隠さないようにする。
 */
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
      if (currentScrollY < 0) return; // iOS オーバースクロール除外

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
```

---

### `app/_components/layout/ingredients/pageTitle.tsx`

サイト名・ロゴをここで設定する。プロジェクトごとに変更すること。

```tsx
import { useRouter } from 'next/navigation';

export default function PageTitle() {
  const router = useRouter();
  return (
    <div
      className="w-fit h-fit flex flex-row items-center gap-2 cursor-pointer"
      onClick={() => router.push('/')}
    >
      {/* ロゴ画像がある場合は <img src="/logo.svg" ... /> に置き換える */}
      <h1 className="text-2xl text-foreground-0 font-semibold uppercase pt-1">
        MySite
      </h1>
    </div>
  );
}
```

---

### `app/_components/layout/templates/header.tsx`

```tsx
'use client';

import { useState, memo } from 'react';
import { MdMenu } from 'react-icons/md';
import PageTitle from '@/app/_components/layout/ingredients/pageTitle';

/**
 * ヘッダー本体。fixed コンテナは rootClient.tsx 側で管理するため、
 * このコンポーネント自身は sticky/fixed を持たない。
 *
 * モバイルメニューが必要な場合は MobileMenu コンポーネントを別途実装して追加する。
 */
const Header = memo(function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="block w-full h-[50px] md:h-[60px] bg-background-1/80 backdrop-blur-md border-b border-foreground-0/8 box-border transition-all duration-300">
      <div className="px-6 w-full h-full flex items-center max-w-[1440px] mx-auto gap-1 sm:gap-2 md:gap-4 lg:gap-8">
        <button
          className="lg:hidden p-2 -ml-2 hover:bg-foreground-0/8 rounded-full transition-colors cursor-pointer"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <MdMenu size={24} className="text-foreground-0" />
        </button>

        <PageTitle />

        {/* ナビゲーションリンクをここに追加 */}
        <div className="flex items-center flex-1 justify-end gap-4">
          {/* 例: <Link href="/about">About</Link> */}
        </div>
      </div>

      {/* MobileMenu を使う場合はここで展開 */}
      {/* <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} /> */}
    </header>
  );
});

export default Header;
```

---

### `app/_components/layout/ingredients/errorCard.tsx`

```tsx
'use client';

import { ErrorScheme } from '@/lib/types/error';
import { MdClose, MdErrorOutline } from 'react-icons/md';
import { motion } from 'framer-motion';
import { memo } from 'react';

interface Props {
  error: ErrorScheme;
  onDelete: () => void;
}

const ErrorCard = memo(function ErrorCard({ error, onDelete }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="w-full max-w-sm bg-background-1 border-l-4 border-accent-warning shadow-lg rounded-r-lg py-4 pl-4 pr-10 flex gap-4 items-start relative pointer-events-auto"
    >
      <div className="bg-accent-warning/10 p-2 rounded-full flex-shrink-0">
        <MdErrorOutline className="text-accent-warning" size={24} />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="text-[10px] font-bold text-foreground-1 uppercase tracking-wider mb-1">
          {error.code}
        </div>
        <div className="text-sm font-medium text-foreground-0 leading-relaxed break-words">
          {error.message}
        </div>
        {typeof error.details === 'string' && (
          <div className="mt-2 text-xs text-foreground-1/60 italic break-words">
            {error.details}
          </div>
        )}
      </div>
      <button
        onClick={onDelete}
        className="p-1 hover:bg-grass rounded-full transition-colors cursor-pointer absolute top-2 right-2"
      >
        <MdClose size={20} className="text-foreground-1" />
      </button>
    </motion.div>
  );
});

export default ErrorCard;
```

---

### `app/_components/layout/templates/errorViewer.tsx`

```tsx
'use client';

import { errorStore } from '@/lib/stores/errorStore';
import ErrorCard from '@/app/_components/layout/ingredients/errorCard';
import { AnimatePresence } from 'framer-motion';

export default function ErrorViewer() {
  const errors = errorStore((state) => state.error);
  const deleteError = errorStore((state) => state.deleteError);

  return (
    <div className="fixed bottom-4 right-4 z-[999] flex flex-col gap-3 items-end pointer-events-none w-fit max-w-[calc(100vw-2rem)]">
      <AnimatePresence initial={false}>
        {errors.map((error) => (
          <ErrorCard
            key={error.id}
            error={error}
            onDelete={() => deleteError(error.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
```

---

### `app/_components/layout/ingredients/toastCard.tsx`

```tsx
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

/**
 * 設計上の注意:
 * タイマーの deps に onDismiss 関数を含めると、親再レンダーごとに参照が変わって
 * setTimeout が張り直され、最初のトーストが永遠に消えないバグになる。
 * そのため toastStore.getState().dismissToast() を effect 内で直接呼ぶ。
 */
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
```

---

### `app/_components/layout/templates/toastViewer.tsx`

```tsx
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
```

---

### `app/_components/common/templates/stickyWrapper.tsx`

```tsx
'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { useStickyTop } from '@/lib/hooks/useStickyTop';
import React from 'react';

interface StickyWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

/**
 * ヘッダーの開閉アニメーションに連動して top をアニメーションさせる sticky ラッパー。
 *
 * 使い方:
 *   <StickyWrapper className="bg-background-1 border-b ...">
 *     <TabBar />
 *   </StickyWrapper>
 *
 * ヘッダーが隠れているとき (scroll down, mobile) → top: 0
 * ヘッダーが表示されているとき → top: headerHeight (px)
 */
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
```

---

### `app/rootClient.tsx`

ヘッダーのスライドアニメーション・モバイル判定・CSS変数注入を担うクライアントルート。

```tsx
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

  // モバイルでかつ下スクロール中のときだけヘッダーを隠す
  const isHeaderHidden = isMobile && scrollDirection === 'down';

  const updateLayout = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const height = mobile ? 50 : 60;
    setHeaderHeight(height);
    // sticky 要素から参照できるよう CSS 変数として公開
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  }, [setIsMobile, setHeaderHeight]);

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  return (
    <main className="w-full md:h-full h-auto">
      {/* グローバル通知レイヤー */}
      <ErrorViewer />
      <ToastViewer />

      {/* スクロール方向検知（レンダリングなし） */}
      <ScrollDetector />

      {/* ヘッダー: fixed で画面上部に固定。モバイル下スクロールで -headerHeight ずらす */}
      <motion.div
        initial={false}
        animate={{ y: isHeaderHidden ? -headerHeight : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <Header />
      </motion.div>

      {/* コンテンツ: ヘッダーが表示中は paddingTop でずれを補正 */}
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
```

---

### `app/layout.tsx`

create-next-app が生成したファイルを以下で**置き換え**る。

```tsx
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import RootClient from '@/app/rootClient';
import { ThemeProvider } from '@/app/_components/providers/themeProvider';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'My App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootClient>{children}</RootClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

### `app/globals.css`

create-next-app が生成したファイルを以下で**置き換え**る。

```css
@import "tailwindcss";

html {
  overflow-y: scroll;
}

@media (min-width: 768px) {
  html { height: 100svh; }
  body { height: 100%; }
}

/* ========== Design Tokens ========== */

.light {
  --background-0: #f8f9ff;
  --background-1: #ffffff;
  --foreground-0: #48484e;
  --foreground-1: #63636e;
  --accent-0: #3b82f6;      /* プロジェクトのブランドカラーに変更 */
  --accent-1: #0cecfa;
  --grass: #e6e8ed;
  --accent-warning: #fb123e;
}

.dark {
  --background-0: #1a1a1a;
  --background-1: #232323;
  --foreground-0: #ededed;
  --foreground-1: #aeaeae;
  --accent-0: #3b82f6;
  --accent-1: #0cecfa;
  --grass: #474747;
  --accent-warning: #fb123e;
}

/* Tailwind v4 カスタムトークン */
@theme inline {
  --color-background-0: var(--background-0);
  --color-background-1: var(--background-1);
  --color-foreground-0: var(--foreground-0);
  --color-foreground-1: var(--foreground-1);
  --color-accent-0: var(--accent-0);
  --color-accent-1: var(--accent-1);
  --color-grass: var(--grass);
  --color-accent-warning: var(--accent-warning);
}

body {
  background: var(--background-1);
  color: var(--foreground-0);
}

/* スクロールバー非表示ユーティリティ */
@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

/* ローディングシマー */
.shimmer {
  background: linear-gradient(
    110deg,
    var(--background-0) 0%,
    var(--background-1) 40%,
    var(--background-0) 80%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
```

---

### `app/page.tsx`（動作確認用サンプル）

```tsx
import { showSuccessToast } from '@/lib/stores/toastStore';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-foreground-0">Hello</h1>
      <p className="text-foreground-1 mt-2">
        スクロールしてヘッダーの動作を確認してください。
      </p>
      {/* 高さを作るためのダミーコンテンツ */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="mt-4 p-4 bg-background-0 rounded-lg">
          Section {i + 1}
        </div>
      ))}
    </div>
  );
}
```

---

## StickyWrapper の使い方

ページ内でサブヘッダーや Tab バーを sticky にしたい場合:

```tsx
import StickyWrapper from '@/app/_components/common/templates/stickyWrapper';

export default function SomePage() {
  return (
    <>
      <StickyWrapper className="bg-background-1 border-b border-foreground-0/8 px-6 py-2">
        <TabBar />
      </StickyWrapper>
      <main>{/* ... */}</main>
    </>
  );
}
```

ヘッダーが隠れているとき: `top: 0`（スクリーン最上部に吸着）  
ヘッダーが表示中: `top: headerHeight px`（ヘッダーの直下に吸着）

---

## Toast / Error の発火方法

```typescript
// どこからでも呼べる（コンポーネント外でも OK）
import { showSuccessToast, showInfoToast, showWarningToast } from '@/lib/stores/toastStore';
import { errorStore } from '@/lib/stores/errorStore';

showSuccessToast('保存しました');
showInfoToast('ログインが必要です', { action: { label: 'ログイン', onClick: () => router.push('/login') } });
showWarningToast('通信が不安定です', { durationMs: 0 }); // 0 = 手動で閉じるまで消えない

errorStore.getState().appendError({ code: 'FETCH_FAILED', message: 'データの取得に失敗しました' });
```

---

## 状態フロー図

```
window scroll event
  └─ ScrollDetector (useEffect)
       └─ |diff| > 10px ?
            ├─ yes, diff > 0 → setScrollDirection('down')
            └─ yes, diff < 0 → setScrollDirection('up')

uiStore.scrollDirection / isMobile / headerHeight
  ├─ rootClient.tsx
  │    ├─ Header の motion.div: y = isHeaderHidden ? -headerHeight : 0
  │    └─ content の motion.div: paddingTop = isHeaderHidden ? 0 : headerHeight
  └─ useStickyTop()
       └─ StickyWrapper: top = (isMobile && down) ? 0 : headerHeight

window resize event
  └─ rootClient.tsx updateLayout()
       ├─ setIsMobile(innerWidth < 768)
       ├─ setHeaderHeight(mobile ? 50 : 60)
       └─ CSS変数: --header-height = headerHeight + 'px'
```

---

## カスタマイズポイント

| 場所 | 変更内容 |
|------|---------|
| `app/globals.css` `.light` / `.dark` | ブランドカラーを `--accent-0` に設定 |
| `app/_components/layout/ingredients/pageTitle.tsx` | サイト名・ロゴを変更 |
| `app/_components/layout/templates/header.tsx` | ナビゲーションリンクを追加 |
| `rootClient.tsx` `updateLayout()` | ヘッダー高さ（50px/60px）を変更 |
| `scrollDetector.tsx` `threshold` | スクロール感度を調整（デフォルト: 10px） |

---

## 注意事項

1. **Tailwind v4** を前提としている。`@theme inline` と `@utility` 記法を使用。v3 の場合は `tailwind.config.ts` に `extend.colors` でトークンを定義すること。
2. ヘッダーは `fixed` で配置されるため、コンテンツ側の `paddingTop` は必須。`rootClient.tsx` が自動管理するが、`layout.tsx` 直下に直接 `<main>` 等を置く場合は別途 `pt-[--header-height]` を付けること。
3. `errorStore` と `toastStore` は Zustand の `create` を使っているが **Provider 不要**。どのコンポーネントからも `import { errorStore } from '...'` だけで使える。
4. `useHeaderHeight` hook は ResizeObserver を使うため SSR 時には動かない。`'use client'` を忘れずに付けること。