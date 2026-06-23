import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Button } from '../../components/common/Button';
import { Colors } from '../../constants/theme';
import { AppStackParamList } from '../../navigation/AppNavigator';

export default function SongDetailScreen() {
  const route = useRoute<RouteProp<AppStackParamList, 'SongDetail'>>();
  const { song } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.lyrics}>{song.lyrics}</Text>
        <View style={styles.actions}> 
          <Button title="Ouvrir Solfa" onPress={() => {}} variant="primary" />
          <Button title="Ouvrir MP3" onPress={() => {}} variant="secondary" />
          <Button title="Ouvrir Playback" onPress={() => {}} variant="secondary" />
        </View>
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
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 16,
  },
  lyrics: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'column',
    rowGap: 12,
  },
});
