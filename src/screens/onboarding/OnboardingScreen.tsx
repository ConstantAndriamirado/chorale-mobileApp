import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import onboardingData from "../../data/onboarding.json";
import { useAppSettings } from "../../hooks/useAppSettings";
import { OnboardingItem } from "../../types";

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = onboardingData as OnboardingItem[];

  useEffect(() => {
    if (activeIndex >= slides.length) {
      navigation.navigate("Main" as never);
    }
  }, [activeIndex, navigation, slides.length]);

  const handleContinue = () => {
    if (activeIndex === slides.length - 1) {
      navigation.navigate("Main" as never);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const { colors, fontFamilyName, fontScale } = useAppSettings();
  const slide = slides[activeIndex];
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>{slide.icon}</Text>
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
          {slide.title}
        </Text>
        <Text
          style={[
            styles.description,
            {
              color: colors.textSecondary,
              fontFamily: fontFamilyName,
              fontSize: 16 * fontScale,
            },
          ]}
        >
          {slide.description}
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.dot,
                index === activeIndex && { backgroundColor: colors.primary },
              ]}
            />
          ))}
        </View>
        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleContinue}
        >
          <Text
            style={[
              styles.buttonText,
              { fontFamily: fontFamilyName, fontSize: 16 * fontScale },
            ]}
          >
            {activeIndex === slides.length - 1 ? "Commencer" : "Suivant"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    marginTop: 80,
  },
  icon: {
    fontSize: 72,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    marginBottom: 40,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 6,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
