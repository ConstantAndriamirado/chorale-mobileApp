import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/common/Card";
import songsData from "../../data/songs.json";
import { useAppSettings } from "../../hooks/useAppSettings";

export default function AccueilScreen() {
  const { colors, fontFamilyName, fontScale } = useAppSettings();
  const songs = songsData;
  const downloadedSolfa = songs.filter((song) => song.hasSolfa).length;
  const downloadedMp3 = songs.filter((song) => song.hasMp3).length;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.container}>
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
          Bienvenue à AFI Chorale
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.textSecondary,
              fontFamily: fontFamilyName,
              fontSize: 16 * fontScale,
            },
          ]}
        >
          Votre espace de ressources chorales, local et accessible.
        </Text>
        <Card style={styles.card}>
          <Text
            style={[
              styles.cardTitle,
              {
                color: colors.text,
                fontFamily: fontFamilyName,
                fontSize: 18 * fontScale,
              },
            ]}
          >
            Statistiques
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  {
                    color: colors.primary,
                    fontFamily: fontFamilyName,
                    fontSize: 28 * fontScale,
                  },
                ]}
              >
                {songs.length}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color: colors.textSecondary,
                    fontFamily: fontFamilyName,
                    fontSize: 14 * fontScale,
                  },
                ]}
              >
                Chansons
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  {
                    color: colors.primary,
                    fontFamily: fontFamilyName,
                    fontSize: 28 * fontScale,
                  },
                ]}
              >
                {downloadedSolfa}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color: colors.textSecondary,
                    fontFamily: fontFamilyName,
                    fontSize: 14 * fontScale,
                  },
                ]}
              >
                Solfa
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                style={[
                  styles.statValue,
                  {
                    color: colors.primary,
                    fontFamily: fontFamilyName,
                    fontSize: 28 * fontScale,
                  },
                ]}
              >
                {downloadedMp3}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color: colors.textSecondary,
                    fontFamily: fontFamilyName,
                    fontSize: 14 * fontScale,
                  },
                ]}
              >
                MP3
              </Text>
            </View>
          </View>
        </Card>
        <Card style={styles.card}>
          <Text
            style={[
              styles.cardTitle,
              {
                color: colors.text,
                fontFamily: fontFamilyName,
                fontSize: 18 * fontScale,
              },
            ]}
          >
            Mode déconnecté
          </Text>
          <Text
            style={[
              styles.cardText,
              {
                color: colors.textSecondary,
                fontFamily: fontFamilyName,
                fontSize: 16 * fontScale,
              },
            ]}
          >
            Téléchargez les ressources pour les consulter même sans connexion
            internet.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    marginTop: 5,
    marginBottom: 45,
  },
  heading: {
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: "800",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontWeight: "800",
  },
  statLabel: {
    marginTop: 6,
  },
  cardText: {
    lineHeight: 22,
  },
});
