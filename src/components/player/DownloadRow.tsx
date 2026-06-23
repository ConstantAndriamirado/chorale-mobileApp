import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useAppSettings } from "../../hooks/useAppSettings";

type Props = {
  title: string;
  downloaded: boolean;
  downloading?: boolean;
  onDownload: () => void;
  type: "Solfa" | "MP3" | "Playback";
};

export function DownloadRow({
  title,
  downloaded,
  downloading = false,
  onDownload,
  type,
}: Props) {
  const { colors, fontFamilyName, fontScale } = useAppSettings();
  const iconName = downloaded ? "cloud-done" : "cloud-download";
  const buttonColor = downloaded ? "#22C55E" : colors.primary;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontFamily: fontFamilyName,
              fontSize: 16 * fontScale,
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.status,
            {
              color: colors.textSecondary,
              fontFamily: fontFamilyName,
              fontSize: 14 * fontScale,
            },
          ]}
        >
          {downloaded ? "Téléchargé" : `${type} non téléchargé`}
        </Text>
      </View>
      <Pressable
        onPress={onDownload}
        disabled={downloading}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: buttonColor },
          pressed && !downloading && styles.pressed,
          downloading && styles.disabled,
        ]}
      >
        {downloading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <MaterialIcons name={iconName} size={24} color={colors.white} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontWeight: "700",
  },
  status: {
    marginTop: 6,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.8,
  },
});
