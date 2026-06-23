import { MaterialIcons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "../../components/common/Button";
import { useAppSettings } from "../../hooks/useAppSettings";
import { AppStackParamList } from "../../navigation/AppNavigator";
import { isDownloaded } from "../../services/download/downloadService";

export default function SongDetailScreen() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const route = useRoute<RouteProp<AppStackParamList, "SongDetail">>();
  const { song } = route.params;
  const { colors, fontFamilyName, fontScale } = useAppSettings();
  // Download states
  const [solfaDownloaded, setSolfaDownloaded] = useState(false);
  const [mp3Downloaded, setMp3Downloaded] = useState(false);
  const [playbackDownloaded, setPlaybackDownloaded] = useState(false);

  // Load download states
  useEffect(() => {
    const checkDownloads = async () => {
      if (song.hasSolfa) {
        const solfa = await isDownloaded(song.solfaFileName);
        setSolfaDownloaded(solfa);
      }
      if (song.hasMp3) {
        const mp3 = await isDownloaded(song.mp3FileName);
        setMp3Downloaded(mp3);
      }
      if (song.hasPlayback) {
        const pb = await isDownloaded(song.playbackFileName);
        setPlaybackDownloaded(pb);
      }
    };
    checkDownloads();
  }, [song]);

  // Solfa button handler
  const handleSolfaPress = () => {
    if (solfaDownloaded) {
      Alert.alert("Info", "Ouverture du fichier Solfa");
    } else {
      if (!song.hasSolfa) {
        Alert.alert("Info", "Solfa non disponible pour cette chanson");
        return;
      }
      // Navigate to nested Solfa tab via Main
      navigation.navigate("Main", {
        screen: "Solfa",
      });
    }
  };

  // MP3 button handler
  const handleMp3Press = () => {
    if (mp3Downloaded) {
      Alert.alert("Lecteur MP3", "Ouverture du lecteur pour ce fichier");
    } else {
      if (!song.hasMp3) {
        Alert.alert("Info", "MP3 non disponible pour cette chanson");
        return;
      }
      // Show alert with options
      Alert.alert("Lire MP3", "Sélectionnez une option", [
        {
          text: "Jouer en ligne",
          onPress: () => {
            Alert.alert("Lecteur", "Lecture en ligne du fichier MP3", [
              { text: "OK" },
            ]);
          },
        },
        {
          text: "Télécharger",
          onPress: () => {
            // Navigate to nested MP3 tab via Main
            navigation.navigate("Main", {
              screen: "MP3",
            });
          },
        },
        {
          text: "Annuler",
          onPress: () => {},
          style: "cancel",
        },
      ]);
    }
  };

  // Playback button handler
  const handlePlaybackPress = () => {
    if (playbackDownloaded) {
      Alert.alert("Lecteur Playback", "Ouverture du lecteur pour ce fichier");
    } else {
      if (!song.hasPlayback) {
        Alert.alert("Info", "Playback non disponible pour cette chanson");
        return;
      }
      // Show alert with options
      Alert.alert("Lire Playback", "Sélectionnez une option", [
        {
          text: "Jouer en ligne",
          onPress: () => {
            Alert.alert("Lecteur", "Lecture en ligne du fichier Playback", [
              { text: "OK" },
            ]);
          },
        },
        {
          text: "Télécharger",
          onPress: () => {
            // Navigate to nested Playback tab via Main
            navigation.navigate("Main", {
              screen: "Playback",
            });
          },
        },
        {
          text: "Annuler",
          onPress: () => {},
          style: "cancel",
        },
      ]);
    }
  };

  // Get button text
  const getSolfaButtonText = () => {
    if (!song.hasSolfa) return "Solfa indisponible";
    return solfaDownloaded ? "Ouvrir Solfa" : "Télécharger Solfa";
  };

  const getMp3ButtonText = () => {
    if (!song.hasMp3) return "MP3 indisponible";
    return mp3Downloaded ? "Jouer MP3" : "Télécharger MP3";
  };

  const getPlaybackButtonText = () => {
    if (!song.hasPlayback) return "Playback indisponible";
    return playbackDownloaded ? "Jouer Playback" : "Télécharger Playback";
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      {/* Header with back button */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.text,
              fontFamily: fontFamilyName,
              fontSize: 18 * fontScale,
            },
          ]}
        >
          {song.title}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Scrollable lyrics */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {
            backgroundColor: colors.background,
            paddingBottom: Dimensions.get("window").height * 0.22,
          },
        ]}
      >
        <Text
          style={[
            styles.lyrics,
            {
              color: colors.textSecondary,
              fontSize: 16 * fontScale,
              fontFamily: fontFamilyName,
            },
          ]}
        >
          {song.lyrics}
        </Text>
      </ScrollView>

      {/* Bottom action buttons positioned at 70% of screen height */}
      <View
        style={[
          styles.buttonContainer,
          {
            borderTopColor: colors.border,
            position: "absolute",
            left: 0,
            right: 0,
            top: Dimensions.get("window").height * 0.8,
            zIndex: 10,
          },
        ]}
      >
        <View style={styles.buttonScaleWrapper}>
          <Button
            title={getSolfaButtonText()}
            onPress={handleSolfaPress}
            variant="primary"
            disabled={!song.hasSolfa}
          />
        </View>
        <View style={styles.buttonScaleWrapper}>
          <Button
            title={getMp3ButtonText()}
            onPress={handleMp3Press}
            variant="secondary"
            disabled={!song.hasMp3}
          />
        </View>
        <View style={styles.buttonScaleWrapper}>
          <Button
            title={getPlaybackButtonText()}
            onPress={handlePlaybackPress}
            variant="secondary"
            disabled={!song.hasPlayback}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 24,
  },
  scrollContent: {
    padding: 20,
  },
  lyrics: {
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    gap: 5,
    borderTopWidth: 1,
  },
  buttonScaleWrapper: {
    transform: [{ scaleY: 0.95 }],
  },
});
