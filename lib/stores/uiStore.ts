import { create } from 'zustand';

type ScrollDirection = 'up' | 'down' | 'left' | 'right';

interface UiState {
  scrollDirection: ScrollDirection;
  setScrollDirection: (direction: ScrollDirection) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  scrollDirection: 'up',
  setScrollDirection: (direction) => set({ scrollDirection: direction }),
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
}));
