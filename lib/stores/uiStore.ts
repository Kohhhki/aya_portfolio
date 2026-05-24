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