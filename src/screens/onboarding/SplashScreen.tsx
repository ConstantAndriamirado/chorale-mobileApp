import { useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSettings } from "../../hooks/useAppSettings";

export default function SplashScreen() {
  const navigation = useNavigation();
  const { colors, fontFamilyName, fontScale } = useAppSettings();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("Onboarding" as never);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Video
        source={require("../../assets/videos/logo-animation.mp4")}
        style={[styles.video, { backgroundColor: colors.card }]}
        useNativeControls={false}
        shouldPlay
        isLooping
        resizeMode={ResizeMode.CONTAIN}
        isMuted={false}
      />
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            fontFamily: fontFamilyName,
            fontSize: 28 * fontScale,
          },
        ]}
      >
        AFI Chorale
      </Text>
      <Text
        style={[
          styles.subtitle,
          {
            color: colors.textSecondary,
            fontFamily: fontFamilyName,
            fontSize: 16 * fontScale,
          },
        ]}
      >
        Antema Fiderana FJKM Fehizoro Mampiray
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  video: {
    width: 300,
    height: 300,
    marginBottom: 24,
    borderRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});
