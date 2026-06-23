import React from 'react';
import { Pressable, Text, StyleSheet, PressableProps } from 'react-native';
import { Colors } from '../../constants/theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
} & PressableProps;

export function Button({ title, onPress, variant = 'primary', ...props }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      {...props}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.textSecondary]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.blue,
  },
  secondary: {
    backgroundColor: Colors.grey,
  },
  text: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  textSecondary: {
    color: Colors.text,
  },
  pressed: {
    opacity: 0.85,
  },
});
