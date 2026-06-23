import { MaterialIcons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
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

type ModalAction = {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
};

type ModalConfig = {
  title: string;
  message: string;
  actions: ModalAction[];
};

export default function SongDetailScreen() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const route = useRoute<RouteProp<AppStackParamList, "SongDetail">>();
  const { song } = route.params;
  const { colors, fontFamilyName, fontScale } = useAppSettings();
  // Download states
  const [solfaDownloaded, setSolfaDownloaded] = useState(false);
  const [mp3Downloaded, setMp3Downloaded] = useState(false);
  const [playbackDownloaded, setPlaybackDownloaded] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const openModal = (
    title: string,
    message: string,
    actions: ModalAction[],
  ) => {
    setModalConfig({ title, message, actions });
  };

  const closeModal = () => {
    setModalConfig(null);
  };

  useEffect(() => {
    if (!modalConfig) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);
      return;
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, modalConfig, scaleAnim]);

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
      openModal("Solfa", "Ouverture du fichier Solfa", [
        { text: "OK", onPress: closeModal },
      ]);
    } else {
      if (!song.hasSolfa) {
        openModal("Info", "Solfa non disponible pour cette chanson", [
          { text: "OK", onPress: closeModal },
        ]);
        return;
      }
      navigation.navigate("Main", {
        screen: "Solfa",
      });
    }
  };

  // MP3 button handler
  const handleMp3Press = () => {
    if (mp3Downloaded) {
      openModal("Lecteur MP3", "Ouverture du lecteur pour ce fichier", [
        { text: "OK", onPress: closeModal },
      ]);
    } else {
      if (!song.hasMp3) {
        openModal("Info", "MP3 non disponible pour cette chanson", [
          { text: "OK", onPress: closeModal },
        ]);
        return;
      }
      openModal("Lire MP3", "Sélectionnez une option", [
        {
          text: "Jouer en ligne",
          onPress: () => {
            openModal("Lecture", "Lecture en ligne du fichier MP3", [
              { text: "OK", onPress: closeModal },
            ]);
          },
        },
        {
          text: "Télécharger",
          onPress: () => {
            navigation.navigate("Main", {
              screen: "MP3",
            });
          },
        },
        {
          text: "Annuler",
          onPress: closeModal,
          style: "cancel",
        },
      ]);
    }
  };

  // Playback button handler
  const handlePlaybackPress = () => {
    if (playbackDownloaded) {
      openModal("Lecteur Playback", "Ouverture du lecteur pour ce fichier", [
        { text: "OK", onPress: closeModal },
      ]);
    } else {
      if (!song.hasPlayback) {
        openModal("Info", "Playback non disponible pour cette chanson", [
          { text: "OK", onPress: closeModal },
        ]);
        return;
      }
      openModal("Lire Playback", "Sélectionnez une option", [
        {
          text: "Jouer en ligne",
          onPress: () => {
            openModal("Lecture", "Lecture en ligne du fichier Playback", [
              { text: "OK", onPress: closeModal },
            ]);
          },
        },
        {
          text: "Télécharger",
          onPress: () => {
            navigation.navigate("Main", {
              screen: "Playback",
            });
          },
        },
        {
          text: "Annuler",
          onPress: closeModal,
          style: "cancel",
        },
      ]);
    }
  };

  // Get button text
  const getSolfaButtonText = () => {
    if (!song.hasSolfa) return "Solfa indisponible";
    return solfaDownloaded ? "Ouvrir Solfa" : "⬇ Solfa";
  };

  const getMp3ButtonText = () => {
    if (!song.hasMp3) return "MP3 indisponible";
    return mp3Downloaded ? "Jouer MP3" : "⬇ MP3";
  };

  const getPlaybackButtonText = () => {
    if (!song.hasPlayback) return "Playback indisponible";
    return playbackDownloaded ? "Jouer Playback" : "⬇ Playback";
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
            backgroundColor: colors.card,
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
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

      <Modal
        transparent
        visible={Boolean(modalConfig)}
        animationType="none"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Pressable
            style={styles.modalPressArea}
            onPress={(event) => event.stopPropagation()}
          >
            <Animated.View
              style={[
                styles.modalCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <Text
                style={[
                  styles.modalTitle,
                  { color: colors.text, fontFamily: fontFamilyName },
                ]}
              >
                {modalConfig?.title}
              </Text>
              <Text
                style={[
                  styles.modalMessage,
                  { color: colors.textSecondary, fontFamily: fontFamilyName },
                ]}
              >
                {modalConfig?.message}
              </Text>

              <View style={styles.modalActions}>
                {modalConfig?.actions.map((action, index) => (
                  <Pressable
                    key={`${action.text}-${index}`}
                    onPress={() => {
                      closeModal();
                      action.onPress?.();
                    }}
                    style={[
                      styles.modalActionButton,
                      action.style === "cancel"
                        ? [
                            styles.cancelButton,
                            { backgroundColor: colors.secondaryBackground },
                          ]
                        : [
                            styles.primaryButton,
                            { backgroundColor: colors.primary },
                          ],
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalActionText,
                        {
                          color:
                            action.style === "cancel"
                              ? colors.text
                              : colors.white,
                          fontFamily: fontFamilyName,
                        },
                      ]}
                    >
                      {action.text}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Animated.View>
          </Pressable>
        </Pressable>
      </Modal>
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
    marginTop: 5,
  },
  scrollContent: {
    padding: 20,
  },
  lyrics: {
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
    borderTopWidth: 1,
  },
  buttonScaleWrapper: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(2, 8, 23, 0.5)",
  },
  modalPressArea: {
    alignItems: "center",
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    overflow: "hidden",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "left",
  },
  modalMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    textAlign: "left",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    flexWrap: "wrap",
  },
  modalActionButton: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minWidth: 76,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {},
  cancelButton: {},
  modalActionText: {
    fontSize: 13,
    fontWeight: "700",
  },
});
