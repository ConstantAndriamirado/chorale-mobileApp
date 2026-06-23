import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppSettings } from "../../hooks/useAppSettings";
import { Song } from "../../types";

type Props = {
  song: Song;
  onPress: () => void;
};

export function SongCard({ song, onPress }: Props) {
  const { colors, fontFamilyName, fontScale } = useAppSettings();

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
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
          {song.title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.textSecondary,
              fontFamily: fontFamilyName,
              fontSize: 14 * fontScale,
            },
          ]}
        >
          {song.lyrics.slice(0, 30)}...
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 4,
  },
});
