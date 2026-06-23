import { ColorValue } from 'react-native';

export const Colors = {
  blue: '#0077CC',
  sky: '#38BDF8',
  white: '#FFFFFF',
  grey: '#F3F4F6',
  dark: '#0F172A',
  text: '#0F172A',
  textLight: '#F8FAFC',
  card: '#FFFFFF',
  cardDark: '#1E293B',
};

export const typography = {
  small: 14,
  medium: 16,
  large: 18,
};

export type ThemeColors = {
  background: ColorValue;
  card: ColorValue;
  text: ColorValue;
  primary: ColorValue;
  border: ColorValue;
};
