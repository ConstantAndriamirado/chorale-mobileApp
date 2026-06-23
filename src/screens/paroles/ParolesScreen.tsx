import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import songsData from '../../data/songs.json';
import { SongCard } from '../../components/song/SongCard';
import { Colors } from '../../constants/theme';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { Song } from '../../types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


export default function ParolesScreen() {
  const [query, setQuery] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const filteredSongs = useMemo(() => {
    if (!query) return songsData as Song[];

    const lowerQuery = query.toLowerCase();
    return (songsData as Song[]).filter(
      (song) => song.title.toLowerCase().includes(lowerQuery) || song.lyrics.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const handleSelectSong = (song: Song) => {
    navigation.navigate('SongDetail', { song });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Paroles</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un titre ou un texte..."
          placeholderTextColor="#94A3B8"
          value={query}
          onChangeText={setQuery}
        />
        <ScrollView contentContainerStyle={styles.list}>
          {filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} onPress={() => handleSelectSong(song)} />
          ))}
          {filteredSongs.length === 0 && <Text style={styles.emptyText}>Aucun résultat trouvé.</Text>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.grey,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    color: Colors.dark,
    backgroundColor: Colors.white,
  },
  list: {
    paddingBottom: 30,
  },
  emptyText: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 40,
  },
});
