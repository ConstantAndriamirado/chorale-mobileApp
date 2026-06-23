import React from "react";
import { View, ViewStyle } from "react-native";
import { useAppSettings } from "../../hooks/useAppSettings";

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function Card({ children, style }: CardProps) {
  const { colors } = useAppSettings();

  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 16,
          elevation: 4,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
