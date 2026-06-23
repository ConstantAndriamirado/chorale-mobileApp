import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import songsData from '../../data/songs.json';
import { DownloadRow } from '../../components/player/DownloadRow';
import { isDownloaded, simulateDownload } from '../../services/download/downloadService';
import { Song } from '../../types';
import { Colors } from '../../constants/theme';

export default function PlaybackScreen() {
  const [downloadStates, setDownloadStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadState = async () => {
      const states: Record<string, boolean> = {};
      for (const song of songsData as Song[]) {
        if (song.hasPlayback) {
          states[song.id] = await isDownloaded(song.playbackFileName);
        }
      }
      setDownloadStates(states);
    };
    loadState();
  }, []);

  const handleDownload = async (song: Song) => {
    if (!song.hasPlayback) return;
    await simulateDownload(song, 'playback');
    setDownloadStates((prev) => ({ ...prev, [song.id]: true }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Playback</Text>
        {(songsData as Song[]).filter((song) => song.hasPlayback).map((song) => (
          <DownloadRow
            key={song.id}
            title={song.title}
            downloaded={!!downloadStates[song.id]}
            onDownload={() => handleDownload(song)}
            type="Playback"
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.grey,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 16,
  },
});
