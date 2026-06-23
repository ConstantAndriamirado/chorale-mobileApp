import React from "react";
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
} from "react-native";
import { useAppSettings } from "../../hooks/useAppSettings";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
} & PressableProps;

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  ...props
}: ButtonProps) {
  const { colors, fontFamilyName } = useAppSettings();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variant === "primary"
          ? [styles.primary, { backgroundColor: colors.primary }]
          : [
              styles.secondary,
              {
                backgroundColor: colors.secondaryBackground,
                borderColor: colors.border,
                borderWidth: 1,
              },
            ],
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={!disabled && !loading ? onPress : undefined}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? colors.white : colors.text}
        />
      ) : (
        <Text
          style={[
            styles.text,
            { fontFamily: fontFamilyName },
            variant === "secondary" && [
              styles.textSecondary,
              { color: colors.text },
            ],
            disabled && styles.textDisabled,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {},
  secondary: {},
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  textSecondary: {},
  textDisabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.85,
  },
});
