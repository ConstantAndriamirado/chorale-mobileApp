import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';
export type FontSizeOption = 'small' | 'medium' | 'large';

export type SettingsState = {
  theme: ThemeMode;
  fontSize: FontSizeOption;
  setTheme: (theme: ThemeMode) => void;
  setFontSize: (fontSize: FontSizeOption) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: 'medium',
      setTheme: (theme: ThemeMode) => set({ theme }),
      setFontSize: (fontSize: FontSizeOption) => set({ fontSize }),
    }),
    {
      name: 'afi-chorale-settings',
    }
  )
);
