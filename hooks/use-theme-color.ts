/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useAppSettings, type AppColorPalette } from "@/hooks/useAppSettings";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof AppColorPalette,
) {
  const { theme, colors } = useAppSettings();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[colorName];
  }
}
