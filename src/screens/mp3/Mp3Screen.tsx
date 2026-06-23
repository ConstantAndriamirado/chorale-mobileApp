import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DownloadRow } from "../../components/player/DownloadRow";
import songsData from "../../data/songs.json";
import { useAppSettings } from "../../hooks/useAppSettings";
import {
  isDownloaded,
  simulateDownload,
  verifyInternetConnection,
} from "../../services/download/downloadService";
import { Song } from "../../types";

export default function Mp3Screen() {
  const { colors, fontFamilyName, fontScale } = useAppSettings();
  const [downloadStates, setDownloadStates] = useState<Record<string, boolean>>(
    {},
  );
  const [downloadingStates, setDownloadingStates] = useState<
    Record<string, boolean>
  >({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadState = async () => {
      const states: Record<string, boolean> = {};
      for (const song of songsData as Song[]) {
        if (song.hasMp3) {
          states[song.id] = await isDownloaded(song.mp3FileName);
        }
      }
      setDownloadStates(states);
    };
    loadState();
  }, []);

  const filteredSongs = useMemo(() => {
    const all = (songsData as Song[]).filter((song) => song.hasMp3);
    if (!query) return all;
    const lowerQuery = query.toLowerCase();
    return all.filter((song) => song.title.toLowerCase().includes(lowerQuery));
  }, [query]);

  const handleDownload = async (song: Song) => {
    if (!song.hasMp3) return;

    const hasConnection = await verifyInternetConnection();
    if (!hasConnection) {
      Alert.alert(
        "Connexion requise",
        "Veuillez vérifier votre connexion internet avant de télécharger.",
      );
      return;
    }

    setDownloadingStates((prev) => ({ ...prev, [song.id]: true }));
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      await simulateDownload(song, "mp3");
      setDownloadStates((prev) => ({ ...prev, [song.id]: true }));
    } finally {
      setDownloadingStates((prev) => ({ ...prev, [song.id]: false }));
    }
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
          MP3
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
          placeholder="Rechercher un titre..."
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={setQuery}
        />
        <ScrollView contentContainerStyle={styles.list}>
          {filteredSongs.map((song) => (
            <DownloadRow
              key={song.id}
              title={song.title}
              downloaded={!!downloadStates[song.id]}
              downloading={!!downloadingStates[song.id]}
              onDownload={() => handleDownload(song)}
              type="MP3"
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
    fontSize: 28,
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
