import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

type Props = {
  title: string;
  downloaded: boolean;
  onDownload: () => void;
  type: 'Solfa' | 'MP3' | 'Playback';
};

export function DownloadRow({ title, downloaded, onDownload, type }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.status}>{downloaded ? 'Téléchargé' : `${type} non téléchargé`}</Text>
      </View>
      <Pressable onPress={onDownload} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>{downloaded ? 'Ouvrir' : 'Télécharger'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
  },
  status: {
    marginTop: 6,
    color: '#64748B',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: Colors.blue,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
