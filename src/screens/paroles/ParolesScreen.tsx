import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SongCard } from "../../components/song/SongCard";
import songsData from "../../data/songs.json";
import { useAppSettings } from "../../hooks/useAppSettings";
import { AppStackParamList } from "../../navigation/AppNavigator";
import { Song } from "../../types";

export default function ParolesScreen() {
  const { colors, fontFamilyName, fontScale } = useAppSettings();
  const [query, setQuery] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const filteredSongs = useMemo(() => {
    if (!query) return songsData as Song[];

    const lowerQuery = query.toLowerCase();
    return (songsData as Song[]).filter(
      (song) =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.lyrics.toLowerCase().includes(lowerQuery),
    );
  }, [query]);

  const handleSelectSong = (song: Song) => {
    navigation.navigate("SongDetail", { song });
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        <Text
          style={[
            styles.heading,
            {
              color: colors.text,
              fontFamily: fontFamilyName,
              fontSize: 28 * fontScale,
            },
          ]}
        >
          Paroles
        </Text>
        <TextInput
          style={[
            styles.searchInput,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.card,
              fontFamily: fontFamilyName,
              fontSize: 16 * fontScale,
            },
          ]}
          placeholder="Rechercher un titre ou un texte..."
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={setQuery}
        />
        <ScrollView contentContainerStyle={styles.list}>
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onPress={() => handleSelectSong(song)}
            />
          ))}
          {filteredSongs.length === 0 && (
            <Text
              style={[
                styles.emptyText,
                {
                  color: colors.textSecondary,
                  fontFamily: fontFamilyName,
                  fontSize: 16 * fontScale,
                },
              ]}
            >
              Aucun résultat trouvé.
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 5,
    marginBottom: 45,
  },
  heading: {
    fontWeight: "800",
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
  },
  list: {
    paddingBottom: 30,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
  },
});
