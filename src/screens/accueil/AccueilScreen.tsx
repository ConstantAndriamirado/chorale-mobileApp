import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import songsData from '../../data/songs.json';
import { Card } from '../../components/common/Card';
import { Colors } from '../../constants/theme';

export default function AccueilScreen() {
  const songs = songsData;
  const downloadedSolfa = songs.filter((song) => song.hasSolfa).length;
  const downloadedMp3 = songs.filter((song) => song.hasMp3).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Bienvenue à AFI Chorale</Text>
        <Text style={styles.subtitle}>Votre espace de ressources chorales, local et accessible.</Text>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Statistiques</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{songs.length}</Text>
              <Text style={styles.statLabel}>Chansons</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{downloadedSolfa}</Text>
              <Text style={styles.statLabel}>Solfa</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{downloadedMp3}</Text>
              <Text style={styles.statLabel}>MP3</Text>
            </View>
          </View>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Mode déconnecté</Text>
          <Text style={styles.cardText}>Téléchargez les ressources pour les consulter même sans connexion internet.</Text>
        </Card>
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
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
    color: Colors.dark,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.blue,
  },
  statLabel: {
    marginTop: 6,
    color: '#475569',
  },
  cardText: {
    color: '#475569',
    lineHeight: 22,
  },
});
