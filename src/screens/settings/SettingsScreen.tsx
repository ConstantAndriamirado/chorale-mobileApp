import React, { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button } from "../../components/common/Button";
import { getAppColors } from "../../hooks/useAppSettings";
import {
  FontFamilyOption,
  useSettingsStore,
} from "../../services/storage/storage";

const fontFamilyOptions = [
  "System",
  "Sans",
  "Serif",
  "Mono",
  "Rounded",
  "Roboto",
  "Arial",
  "Georgia",
  "Courier",
  "Times",
  "Verdana",
  "Tahoma",
  "Palatino",
  "Chalkboard",
  "Comic Sans",
] as const;

type FontFamilyKey = (typeof fontFamilyOptions)[number];

const fontFamilyMap: Record<FontFamilyKey, string | undefined> = {
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

const fontSizeMin = 0.85;
const fontSizeMax = 1.6;

export default function SettingsScreen() {
  const savedTheme = useSettingsStore(
    (state: { theme: "light" | "dark" }) => state.theme,
  );
  const savedFontScale = useSettingsStore(
    (state: { fontScale: number }) => state.fontScale,
  );
  const savedFontFamily = useSettingsStore(
    (state: { fontFamily: FontFamilyOption }) => state.fontFamily,
  );
  const setTheme = useSettingsStore(
    (state: { setTheme: (theme: "light" | "dark") => void }) => state.setTheme,
  );
  const setFontScale = useSettingsStore(
    (state: { setFontScale: (fontScale: number) => void }) =>
      state.setFontScale,
  );
  const setFontFamily = useSettingsStore(
    (state: { setFontFamily: (fontFamily: FontFamilyOption) => void }) =>
      state.setFontFamily,
  );

  const [localTheme, setLocalTheme] = useState<"light" | "dark">(savedTheme);
  const [localFontScale, setLocalFontScale] = useState(savedFontScale);
  const [localFontFamily, setLocalFontFamily] = useState(savedFontFamily);
  const [sliderWidth, setSliderWidth] = useState(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setLocalTheme(savedTheme);
    setLocalFontScale(savedFontScale);
    setLocalFontFamily(savedFontFamily);
  }, [savedTheme, savedFontScale, savedFontFamily]);

  const previewFamily = fontFamilyMap[localFontFamily];
  const colors = getAppColors(localTheme);
  const sliderPercent =
    sliderWidth > 0
      ? ((localFontScale - fontSizeMin) / (fontSizeMax - fontSizeMin)) * 100
      : 0;

  const handleSliderPress = ({ nativeEvent }: any) => {
    if (sliderWidth <= 0) return;
    const positionX = nativeEvent.locationX;
    const nextPercent = Math.max(0, Math.min(1, positionX / sliderWidth));
    const nextScale =
      Math.round(
        (fontSizeMin + nextPercent * (fontSizeMax - fontSizeMin)) * 100,
      ) / 100;
    setLocalFontScale(nextScale);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top", "bottom"]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <Text
          style={[
            styles.heading,
            { color: colors.text, fontFamily: fontFamilyMap[localFontFamily] },
          ]}
        >
          Paramètres
        </Text>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
                fontFamily: fontFamilyMap[localFontFamily],
              },
            ]}
          >
            Thème
          </Text>
          <View style={styles.optionRow}>
            <Pressable
              style={[
                styles.optionButton,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.secondaryBackground,
                },
                localTheme === "light" && { backgroundColor: colors.card },
                localTheme === "dark" &&
                  localTheme === "dark" && { backgroundColor: colors.card },
                localTheme === "light" &&
                  localTheme === "light" && { backgroundColor: colors.card },
                localTheme === "light" &&
                  localTheme === "light" && { borderColor: colors.primary },
                localTheme === "light" &&
                  localTheme === "light" && { borderWidth: 1 },
              ]}
              onPress={() => setLocalTheme("light")}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: colors.text,
                    fontFamily: fontFamilyMap[localFontFamily],
                  },
                  localTheme === "light" && { color: colors.primary },
                ]}
              >
                Clair
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.optionButton,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.secondaryBackground,
                },
                localTheme === "dark" && { backgroundColor: colors.card },
                localTheme === "dark" && { borderColor: colors.primary },
                localTheme === "dark" && { borderWidth: 1 },
              ]}
              onPress={() => setLocalTheme("dark")}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: colors.text,
                    fontFamily: fontFamilyMap[localFontFamily],
                  },
                  localTheme === "dark" && { color: colors.primary },
                ]}
              >
                Sombre
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
                fontFamily: fontFamilyMap[localFontFamily],
              },
            ]}
          >
            Taille de police
          </Text>
          <Text
            style={[
              styles.sliderLabel,
              {
                color: colors.textSecondary,
                fontFamily: fontFamilyMap[localFontFamily],
              },
            ]}
          >
            {Math.round(localFontScale * 100)}% de taille de texte
          </Text>
          <Pressable
            onPress={handleSliderPress}
            onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
            style={styles.sliderTrack}
          >
            <View
              style={[
                styles.sliderFill,
                { width: `${Math.min(100, Math.max(0, sliderPercent))}%` },
              ]}
            />
            <View
              style={[
                styles.sliderThumb,
                { left: `${Math.min(100, Math.max(0, sliderPercent))}%` },
              ]}
            />
          </Pressable>
          <Text
            style={[
              styles.sliderHint,
              localTheme === "dark" && styles.sliderHintDark,
            ]}
          >
            Touchez la barre pour ajuster la taille de police de façon
            progressive.
          </Text>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
                fontFamily: fontFamilyMap[localFontFamily],
              },
            ]}
          >
            Style de police
          </Text>
          <View style={styles.fontOptionsContainer}>
            {fontFamilyOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() => setLocalFontFamily(option)}
                style={[
                  styles.fontOption,
                  { backgroundColor: colors.card },
                  localFontFamily === option && {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.fontOptionText,
                    { color: colors.text, fontFamily: fontFamilyMap[option] },
                    localFontFamily === option && { color: colors.white },
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.previewCard, { backgroundColor: colors.card }]}>
          <Text
            style={[
              styles.previewTitle,
              {
                color: colors.text,
                fontFamily: fontFamilyMap[localFontFamily],
              },
            ]}
          >
            Aperçu
          </Text>
          <Text
            style={[
              styles.previewText,
              {
                color: colors.textSecondary,
                fontSize: 16 * localFontScale,
                fontFamily: previewFamily,
              },
            ]}
          >
            AFI Chorale - aperçu de la police et de la taille choisies.
          </Text>
        </View>

        <Button
          title="Enregistrer"
          onPress={() => {
            setTheme(localTheme);
            setFontScale(localFontScale);
            setFontFamily(localFontFamily);
          }}
          variant="primary"
          disabled={
            localTheme === savedTheme &&
            localFontScale === savedFontScale &&
            localFontFamily === savedFontFamily
          }
        />

        <Text
          style={[
            styles.note,
            {
              color: colors.textSecondary,
              fontFamily: fontFamilyMap[localFontFamily],
            },
          ]}
        >
          Les paramètres sont enregistrés et s’appliquent à tout le système.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    marginTop: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 14,
    fontWeight: "700",
  },
  optionRow: {
    flexDirection: "row",
  },
  optionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    marginRight: 12,
  },
  optionText: {
    fontWeight: "700",
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 14,
    fontWeight: "700",
  },
  sliderTrack: {
    position: "relative",
    height: 12,
    borderRadius: 999,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  sliderFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
  },
  sliderThumb: {
    position: "absolute",
    top: -6,
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#3B82F6",
    transform: [{ translateX: -12 }],
  },
  sliderHint: {
    marginTop: 12,
    color: "#64748B",
    lineHeight: 20,
  },
  sliderHintDark: {
    color: "#94A3B8",
  },
  fontOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  fontOption: {
    minWidth: 96,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  fontOptionText: {
    fontWeight: "700",
    textAlign: "center",
  },
  previewCard: {
    padding: 18,
    borderRadius: 20,
    marginTop: 8,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  previewText: {
    lineHeight: 24,
  },
  note: {
    marginTop: 20,
    lineHeight: 22,
  },
});
