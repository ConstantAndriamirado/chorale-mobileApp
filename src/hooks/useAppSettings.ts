import { Platform } from "react-native";
import {
    FontFamilyOption,
    ThemeMode,
    useSettingsStore,
} from "../services/storage/storage";

export type AppColorPalette = {
  background: string;
  card: string;
  white: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  secondaryBackground: string;
  placeholder: string;
};

const lightColors: AppColorPalette = {
  background: "#FFFFFF",
  card: "#FFFFFF",
  white: "#FFFFFF",
  text: "#0F172A",
  textSecondary: "#475569",
  border: "#E5E7EB",
  primary: "#0077CC",
  secondaryBackground: "#F8FAFC",
  placeholder: "#94A3B8",
};

const darkColors: AppColorPalette = {
  background: "#0F172A",
  card: "#1E293B",
  white: "#FFFFFF",
  text: "#ECEDEE",
  textSecondary: "#94A3B8",
  border: "#334155",
  primary: "#38BDF8",
  secondaryBackground: "#111827",
  placeholder: "#94A3B8",
};

const fontFamilyMap: Record<FontFamilyOption, string | undefined> = {
  System: undefined,
  Sans: Platform.select({
    ios: "System",
    android: "sans-serif",
    web: "system-ui, sans-serif",
    default: "sans-serif",
  }),
  Serif: Platform.select({
    ios: "Times New Roman",
    android: "serif",
    web: "Georgia, serif",
    default: "serif",
  }),
  Mono: Platform.select({
    ios: "Courier New",
    android: "monospace",
    web: "Courier New, monospace",
    default: "monospace",
  }),
  Rounded: Platform.select({
    ios: "rounded",
    android: "sans-serif-rounded",
    web: "ui-rounded, system-ui",
    default: "sans-serif",
  }),
  Roboto: Platform.select({
    ios: "System",
    android: "Roboto",
    web: "Roboto, system-ui, sans-serif",
    default: "sans-serif",
  }),
  Arial: Platform.select({
    ios: "Arial",
    android: "sans-serif",
    web: "Arial, sans-serif",
    default: "Arial",
  }),
  Georgia: Platform.select({
    ios: "Georgia",
    android: "serif",
    web: "Georgia, serif",
    default: "Georgia",
  }),
  Courier: Platform.select({
    ios: "Courier",
    android: "monospace",
    web: "Courier, monospace",
    default: "monospace",
  }),
  Times: Platform.select({
    ios: "Times New Roman",
    android: "serif",
    web: "Times New Roman, serif",
    default: "serif",
  }),
  Verdana: Platform.select({
    ios: "Verdana",
    android: "sans-serif",
    web: "Verdana, sans-serif",
    default: "Verdana",
  }),
  Tahoma: Platform.select({
    ios: "Tahoma",
    android: "sans-serif",
    web: "Tahoma, sans-serif",
    default: "Tahoma",
  }),
  Palatino: Platform.select({
    ios: "Palatino",
    android: "serif",
    web: "Palatino, serif",
    default: "Palatino",
  }),
  Chalkboard: Platform.select({
    ios: "Chalkboard SE",
    android: "sans-serif",
    web: "Comic Sans MS, cursive",
    default: "sans-serif",
  }),
  "Comic Sans": Platform.select({
    ios: "Comic Sans MS",
    android: "casual",
    web: "Comic Sans MS, cursive",
    default: "sans-serif",
  }),
};

export function getAppColors(theme: ThemeMode): AppColorPalette {
  return theme === "dark" ? darkColors : lightColors;
}

export function getAppFontFamily(fontFamily: FontFamilyOption) {
  return fontFamilyMap[fontFamily];
}

export function useAppSettings() {
  const theme = useSettingsStore((state) => state.theme);
  const fontScale = useSettingsStore((state) => state.fontScale);
  const fontFamily = useSettingsStore((state) => state.fontFamily);
  const onboardingComplete = useSettingsStore(
    (state) => state.onboardingComplete,
  );
  const setOnboardingComplete = useSettingsStore(
    (state) => state.setOnboardingComplete,
  );

  return {
    theme,
    fontScale,
    fontFamily,
    colors: getAppColors(theme),
    fontFamilyName: getAppFontFamily(fontFamily),
    onboardingComplete,
    setOnboardingComplete,
  };
}
