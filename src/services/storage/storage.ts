import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";
export type FontFamilyOption =
  | "System"
  | "Sans"
  | "Serif"
  | "Mono"
  | "Rounded"
  | "Roboto"
  | "Arial"
  | "Georgia"
  | "Courier"
  | "Times"
  | "Verdana"
  | "Tahoma"
  | "Palatino"
  | "Chalkboard"
  | "Comic Sans";

export type SettingsState = {
  theme: ThemeMode;
  fontScale: number;
  fontFamily: FontFamilyOption;
  onboardingComplete: boolean;
  setTheme: (theme: ThemeMode) => void;
  setFontScale: (fontScale: number) => void;
  setFontFamily: (fontFamily: FontFamilyOption) => void;
  setOnboardingComplete: (done: boolean) => void;
};

const asyncStorage = {
  getItem: async (name: string) => {
    return await AsyncStorage.getItem(name);
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "light",
      fontScale: 1,
      fontFamily: "System",
      onboardingComplete: false,
      setTheme: (theme: ThemeMode) => set({ theme }),
      setFontScale: (fontScale: number) => set({ fontScale }),
      setFontFamily: (fontFamily: FontFamilyOption) => set({ fontFamily }),
      setOnboardingComplete: (done: boolean) =>
        set({ onboardingComplete: done }),
    }),
    {
      name: "afi-chorale-settings",
      storage: asyncStorage,
    },
  ),
);
