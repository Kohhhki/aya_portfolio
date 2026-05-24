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
