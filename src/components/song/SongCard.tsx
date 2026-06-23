import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Song } from '../../types';
import { Colors } from '../../constants/theme';

type Props = {
  song: Song;
  onPress: () => void;
};

export function SongCard({ song, onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.subtitle}>{song.lyrics.slice(0, 60)}...</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{song.hasSolfa ? 'Solfa' : '...'}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
  },
  subtitle: {
    marginTop: 4,
    color: '#64748B',
  },
  badge: {
    backgroundColor: Colors.sky,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  badgeText: {
    color: Colors.white,
    fontWeight: '700',
  },
});
