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