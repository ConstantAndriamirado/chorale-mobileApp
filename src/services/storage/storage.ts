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
  setTheme: (theme: ThemeMode) => void;
  setFontScale: (fontScale: number) => void;
  setFontFamily: (fontFamily: FontFamilyOption) => void;
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
      setTheme: (theme: ThemeMode) => set({ theme }),
      setFontScale: (fontScale: number) => set({ fontScale }),
      setFontFamily: (fontFamily: FontFamilyOption) => set({ fontFamily }),
    }),
    {
      name: "afi-chorale-settings",
      storage: asyncStorage,
    },
  ),
);
