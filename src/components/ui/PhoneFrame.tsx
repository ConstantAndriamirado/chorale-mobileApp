import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

type Props = {
  children: React.ReactNode;
};

const PhoneFrame = ({ children }: Props) => {
  const { width: w, height: h } = Dimensions.get("window");

  // target device ratio roughly similar to many phones
  const targetWidth = Math.min(420, Math.round(w * 0.95));
  const targetHeight = Math.round((targetWidth / 390) * 844);

  return (
    <View style={styles.outer}>
      <View
        style={[
          styles.frame,
          { width: targetWidth, height: Math.min(targetHeight, h - 12) },
        ]}
      >
        <SafeAreaView style={styles.inner}>{children}</SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  frame: {
    borderRadius: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  inner: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default PhoneFrame;
