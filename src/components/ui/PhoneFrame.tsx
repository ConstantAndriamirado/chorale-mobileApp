import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSettings } from "../../hooks/useAppSettings";

type Props = {
  children: React.ReactNode;
};

const PhoneFrame = ({ children }: Props) => {
  const { colors } = useAppSettings();

  return (
    <View style={[styles.outer, { backgroundColor: colors.background }]}>
      <View style={[styles.frame, { backgroundColor: colors.background }]}>
        <SafeAreaView
          style={[styles.inner, { backgroundColor: colors.background }]}
          edges={["top", "bottom"]}
        >
          {children}
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  frame: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 0,
    overflow: "hidden",
  },
  inner: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default PhoneFrame;
